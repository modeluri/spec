// SPDX-License-Identifier: MIT
// Strictly validates a pilot or full classification batch output against SPEC.md v0.2.0 rules.
import { readFile } from "node:fs/promises";
import { URI_RE, parse } from "../cli/model-uri.mjs";
import { indexProvidersByCanonical, loadCatalog, resolveNativeHosts } from "./catalog.mjs";
import { checkLicenseConsistency } from "./licenses.mjs";

const INCOMPATIBLE_REASONS = new Set([
  "rolling-alias",
  "opaque-size",
  "parameter-split",
  "slot-collision",
  "unmapped-special",
  "unmapped-scope",
  "missing-evidence",
]);

const SKIP_REASONS = new Set([
  "third-party-derivation",
  "snapshot-duplicate",
  "restricted-not-on-sale",
]);

const args = process.argv.slice(2);
const take = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};

const inPath = take("--input");
const outPath = take("--output");
if (!inPath || !outPath) {
  console.error("Usage: node tools/validate-batch.mjs --input <batch-input.json> --output <batch-output.json>");
  process.exit(2);
}

const input = JSON.parse(await readFile(inPath, "utf8"));
const output = JSON.parse(await readFile(outPath, "utf8"));
const catalog = await loadCatalog();
const byCanonical = indexProvidersByCanonical(catalog);

const errors = [];
const warnings = [];
const inputById = new Map(input.models.map((m) => [m.id, m]));
const seenIds = new Map();

function claimId(id, bucket) {
  if (!id || !inputById.has(id)) {
    errors.push(`[${bucket}] unknown or missing catalogue id: ${id}`);
    return null;
  }
  if (seenIds.has(id)) {
    errors.push(`[${bucket}] duplicate id ${id} (already in ${seenIds.get(id)})`);
    return null;
  }
  seenIds.set(id, bucket);
  return inputById.get(id);
}

const regList = Array.isArray(output.registry) ? output.registry : (errors.push("output.registry must be an array"), []);
const incList = Array.isArray(output.incompatible) ? output.incompatible : (errors.push("output.incompatible must be an array"), []);
const skipList = Array.isArray(output.skipped) ? output.skipped : (errors.push("output.skipped must be an array"), []);

const seenUris = new Map();
const currentSlots = new Map();
const regById = new Map();

for (const entry of regList) {
  const model = claimId(entry.id, "registry");
  if (model) regById.set(entry.id, entry);

  if (typeof entry.uri !== "string" || entry.uri.length > 128 || !URI_RE.test(entry.uri)) {
    errors.push(`[registry] invalid URI for ${entry.id}: ${entry.uri}`);
    continue;
  }
  const parsed = parse(entry.uri);
  if (!parsed?.version) {
    errors.push(`[registry] URI must be pinned with a version: ${entry.uri}`);
  }
  if (model && parsed.publisher !== model.publisher) {
    errors.push(`[registry] publisher mismatch on ${entry.id}: expected ${model.publisher}, got ${parsed.publisher}`);
  }
  if (seenUris.has(entry.uri)) {
    errors.push(`[registry] duplicate URI ${entry.uri} (${seenUris.get(entry.uri)} and ${entry.id})`);
  } else {
    seenUris.set(entry.uri, entry.id);
  }
  if (typeof entry.current !== "boolean") {
    errors.push(`[registry] current must be boolean on ${entry.id}`);
  } else if (entry.current) {
    const slot = [parsed.publisher, parsed.scope, parsed.tier, parsed.special, parsed.access, parsed.weights, parsed.size, parsed.quant].join("|");
    if (currentSlots.has(slot)) {
      errors.push(`[registry] two current entries in slot ${slot}: ${currentSlots.get(slot)} and ${entry.uri}`);
    } else {
      currentSlots.set(slot, entry.uri);
    }
  }

  const licCheck = checkLicenseConsistency(parsed.weights, entry.license);
  if (!licCheck.ok) {
    errors.push(`[registry] ${entry.id} (${entry.uri}): ${licCheck.error}`);
  }

  if (typeof entry.evidence !== "string" || !/^https:\/\//.test(entry.evidence)) {
    errors.push(`[registry] evidence must be https:// on ${entry.id}`);
  }
  if (entry.tier_source !== "registry" && entry.tier_source !== "publisher") {
    errors.push(`[registry] invalid tier_source on ${entry.id}: ${entry.tier_source}`);
  }

  if (model) {
    const native = entry.native ?? resolveNativeHosts(catalog, byCanonical, entry.id, model.publisher);
    for (const hostKey of Object.keys(native)) {
      if (hostKey !== model.publisher && !/^[a-z][a-z0-9]*$/.test(hostKey)) {
        errors.push(`[registry] invalid native host key on ${entry.id}: ${hostKey}`);
      }
    }
    const hostCount = Object.keys(native).length;
    if (hostCount === 0) {
      if (!model.open_weights && !parsed.weights) {
        errors.push(`[registry] closed model ${entry.id} has zero native hosts`);
      } else {
        warnings.push(`[registry] ${entry.id} has zero native hosts`);
      }
    }
    if (model.open_weights === false && parsed.weights) {
      warnings.push(`[registry] ${entry.id} has open_weights=false in models.dev but URI uses -${parsed.weights}`);
    }
    if (model.open_weights === true && !parsed.weights) {
      warnings.push(`[registry] ${entry.id} has open_weights=true in models.dev but URI omits -open/-weights`);
    }
  }
}

for (const prev of input.existing_registry_entries || []) {
  if (!prev.catalog_id) continue;
  const hit = regById.get(prev.catalog_id);
  if (!hit) {
    errors.push(`[frozen] existing registry model ${prev.catalog_id} (${prev.uri}) is missing from output.registry`);
  } else if (hit.uri !== prev.uri) {
    errors.push(`[frozen] existing URI changed for ${prev.catalog_id}: expected ${prev.uri}, got ${hit.uri}`);
  }
}

const incByReason = {};
for (const entry of incList) {
  const model = claimId(entry.id, "incompatible");
  if (model && entry.publisher !== model.publisher) {
    errors.push(`[incompatible] publisher mismatch on ${entry.id}: expected ${model.publisher}, got ${entry.publisher}`);
  }
  if (!INCOMPATIBLE_REASONS.has(entry.reason)) {
    errors.push(`[incompatible] invalid reason on ${entry.id}: ${entry.reason}`);
  } else {
    incByReason[entry.reason] = (incByReason[entry.reason] || 0) + 1;
  }
  if (typeof entry.detail !== "string" || !entry.detail.trim()) {
    errors.push(`[incompatible] missing detail on ${entry.id}`);
  }
  if (typeof entry.evidence !== "string" || !/^https:\/\//.test(entry.evidence)) {
    errors.push(`[incompatible] evidence must be https:// on ${entry.id}`);
  }
  if (entry.reason === "slot-collision" || entry.reason === "parameter-split") {
    if (typeof entry.conflicts_with !== "string" || !entry.conflicts_with) {
      errors.push(`[incompatible] missing conflicts_with for ${entry.reason} on ${entry.id}`);
    }
  }
  if (entry.conflicts_with !== undefined && !parse(entry.conflicts_with)) {
    errors.push(`[incompatible] invalid conflicts_with URI on ${entry.id}: ${entry.conflicts_with}`);
  }
}

const skipByReason = {};
for (const entry of skipList) {
  claimId(entry.id, "skipped");
  if (!SKIP_REASONS.has(entry.skip_reason)) {
    errors.push(`[skipped] invalid skip_reason on ${entry.id}: ${entry.skip_reason}`);
  } else {
    skipByReason[entry.skip_reason] = (skipByReason[entry.skip_reason] || 0) + 1;
  }
  if (typeof entry.detail !== "string" || !entry.detail.trim()) {
    errors.push(`[skipped] missing detail on ${entry.id}`);
  }
}

for (const id of inputById.keys()) {
  if (!seenIds.has(id)) {
    errors.push(`[unaccounted] model ${id} was omitted from registry, incompatible, and skipped`);
  }
}

console.log(JSON.stringify({
  input_models: input.models.length,
  accounted: seenIds.size,
  registry: regList.length,
  current_slots: currentSlots.size,
  incompatible: incList.length,
  incompatible_by_reason: incByReason,
  skipped: skipList.length,
  skipped_by_reason: skipByReason,
  warnings_count: warnings.length,
  warnings,
  errors_count: errors.length,
  errors,
}, null, 2));

if (errors.length > 0) process.exit(1);
