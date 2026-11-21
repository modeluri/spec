// SPDX-License-Identifier: MIT
// Builds registry.json and incompatible.json from the local models.dev snapshot and classification.mjs.
// Usage: node tools/build-registry.mjs [--catalog <catalog.json>] [--fetch]
import { readFile, writeFile } from "node:fs/promises";
import { CLASSIFICATION, INCOMPATIBLE, SKIPPED, SPECIALS } from "./classification.mjs";
import { URI_RE, parse } from "../cli/model-uri.mjs";
import { DEFAULT_CATALOG_PATH, indexProvidersByCanonical, loadCatalog, loadMeta, resolveNativeHosts } from "./catalog.mjs";
import { checkLicenseConsistency } from "./licenses.mjs";

const OUT_REGISTRY = new URL("../registry.json", import.meta.url);
const OUT_INCOMPATIBLE = new URL("../incompatible.json", import.meta.url);

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
const ci = args.indexOf("--catalog");
const fetchMode = args.includes("--fetch");

const catalog = ci >= 0
  ? JSON.parse(await readFile(args[ci + 1], "utf8"))
  : fetchMode
    ? await (await fetch("https://models.dev/catalog.json?type=all")).json()
    : await loadCatalog(DEFAULT_CATALOG_PATH);

if (!catalog?.models || !catalog?.providers) {
  throw new Error("Invalid catalog format: expected { providers, models } (use catalog.json?type=all).");
}

const meta = await loadMeta();
const updated = fetchMode ? new Date().toISOString().slice(0, 10) : (meta.fetched_at || "2026-11-21");
const byCanonical = indexProvidersByCanonical(catalog);

const seenModelIds = new Map();
function claimId(id, bucket) {
  if (!catalog.models[id]) throw new Error(`[${bucket}] ${id} is not in the catalogue`);
  if (seenModelIds.has(id)) throw new Error(`[${bucket}] ${id} is assigned twice (already in ${seenModelIds.get(id)})`);
  seenModelIds.set(id, bucket);
  return catalog.models[id];
}

const RESERVED_SUFFIXES = new Set(["restricted", "gov", "internal", "weights", "open"]);
for (const [k, desc] of Object.entries(SPECIALS)) {
  if (!/^[a-z]+$/.test(k) || RESERVED_SUFFIXES.has(k)) {
    throw new Error(`[specials] invalid special key: ${k}`);
  }
  if (typeof desc !== "string" || !desc.trim()) {
    throw new Error(`[specials] missing description for ${k}`);
  }
}

const seenUris = new Set();
const registeredPublisherNative = new Set();
const incompatibleIds = new Set(INCOMPATIBLE.map((x) => x.id));
const entries = CLASSIFICATION.map((item) => {
  const model = claimId(item.id, "registry");
  if (typeof item.uri !== "string" || item.uri.length > 128 || !URI_RE.test(item.uri)) {
    throw new Error(`[registry] invalid URI for ${item.id}: ${item.uri}`);
  }
  const g = parse(item.uri);
  if (!g?.version) throw new Error(`[registry] URI must be pinned with a version: ${item.uri}`);
  if (g.special && !(g.special in SPECIALS)) {
    throw new Error(`[registry] unregistered special "${g.special}" on ${item.id}: ${item.uri}`);
  }
  const catalogPub = item.id.split("/")[0];
  if (g.publisher !== catalogPub) {
    throw new Error(`[registry] publisher mismatch on ${item.id}: expected ${catalogPub}, got ${g.publisher}`);
  }
  if (seenUris.has(item.uri)) throw new Error(`[registry] ${item.uri} is assigned twice`);
  seenUris.add(item.uri);

  if (item.tier_source !== "registry" && item.tier_source !== "publisher") {
    throw new Error(`[registry] invalid tier_source on ${item.id}: ${item.tier_source}`);
  }
  if (typeof item.evidence !== "string" || !/^https:\/\//.test(item.evidence)) {
    throw new Error(`[registry] invalid evidence on ${item.id}: ${item.evidence}`);
  }
  if (typeof item.current !== "boolean") {
    throw new Error(`[registry] current must be boolean on ${item.id}`);
  }

  const lic = checkLicenseConsistency(g.weights, item.license);
  if (!lic.ok) throw new Error(`[registry] ${item.id} (${item.uri}): ${lic.error}`);

  const native = resolveNativeHosts(catalog, byCanonical, item.id, g.publisher, incompatibleIds);
  const hostKeys = Object.keys(native);
  if (hostKeys.length === 0) {
    throw new Error(`[registry] ${item.id} resolved zero native hosts`);
  }
  for (const k of hostKeys) {
    if (k !== g.publisher && !/^[a-z][a-z0-9]*$/.test(k)) {
      throw new Error(`[registry] invalid native host key on ${item.id}: ${k}`);
    }
  }
  if (native[g.publisher]) registeredPublisherNative.add(`${g.publisher}/${native[g.publisher]}`);

  return {
    uri: item.uri,
    native,
    released: model.release_date,
    license: item.license,
    tier_source: item.tier_source,
    evidence: item.evidence,
    current: item.current,
  };
});

// One current model per slot: same publisher, scope, tier and suffixes.
const slots = new Map();
for (const e of entries.filter((e) => e.current)) {
  const slot = e.uri.slice(0, e.uri.indexOf(":", 6));
  if (slots.has(slot)) throw new Error(`${slot} has two current models: ${slots.get(slot)} and ${e.uri}`);
  slots.set(slot, e.uri);
}

entries.sort((a, b) => a.uri.split("/")[0].localeCompare(b.uri.split("/")[0]) || b.released.localeCompare(a.released) || a.uri.localeCompare(b.uri));

const incompatibleEntries = INCOMPATIBLE.map((item) => {
  claimId(item.id, "incompatible");
  const catalogPub = item.id.split("/")[0];
  if (item.publisher !== catalogPub) {
    throw new Error(`[incompatible] publisher mismatch on ${item.id}: expected ${catalogPub}, got ${item.publisher}`);
  }
  if (!INCOMPATIBLE_REASONS.has(item.reason)) {
    throw new Error(`[incompatible] invalid reason on ${item.id}: ${item.reason}`);
  }
  if (typeof item.detail !== "string" || !item.detail.trim()) {
    throw new Error(`[incompatible] missing detail on ${item.id}`);
  }
  if (typeof item.evidence !== "string" || !/^https:\/\//.test(item.evidence)) {
    throw new Error(`[incompatible] invalid evidence on ${item.id}: ${item.evidence}`);
  }
  if ((item.reason === "slot-collision" || item.reason === "parameter-split") && (!item.conflicts_with || !parse(item.conflicts_with))) {
    throw new Error(`[incompatible] invalid or missing conflicts_with on ${item.id}`);
  }
  if (item.conflicts_with !== undefined && !parse(item.conflicts_with)) {
    throw new Error(`[incompatible] invalid conflicts_with URI on ${item.id}: ${item.conflicts_with}`);
  }
  const slug = item.id.split("/")[1];
  if (registeredPublisherNative.has(item.id) || registeredPublisherNative.has(`${item.publisher}/${slug}`)) {
    throw new Error(`[incompatible] mutual exclusion violation on ${item.id}`);
  }
  return {
    id: item.id,
    publisher: item.publisher,
    ...(item.name && { name: item.name }),
    reason: item.reason,
    ...(item.conflicts_with && { conflicts_with: item.conflicts_with }),
    detail: item.detail,
    evidence: item.evidence,
  };
});

incompatibleEntries.sort((a, b) => a.publisher.localeCompare(b.publisher) || a.id.localeCompare(b.id));

for (const item of SKIPPED) {
  claimId(item.id, "skipped");
  if (!SKIP_REASONS.has(item.skip_reason)) {
    throw new Error(`[skipped] invalid skip_reason on ${item.id}: ${item.skip_reason}`);
  }
}

const unaccounted = Object.keys(catalog.models).filter((id) => !seenModelIds.has(id));
if (unaccounted.length > 0) {
  const msg = `${unaccounted.length} catalogue models are unaccounted: ${unaccounted.slice(0, 10).join(", ")}`;
  if (!fetchMode && ci < 0) throw new Error(msg);
  console.warn(`warning: ${msg}`);
}

const registryDoc = {
  spec: "0.2.0",
  updated,
  license: "CC0-1.0",
  note: "Tiers are assigned by the registry with the rule in SPEC.md section 3.2 and frozen from release. `current` marks models on sale as of the snapshot date. Native identifiers come from https://models.dev via canonical_model_id; on bedrock the bare model id is listed when present, and bedrock-runtime needs a geographic or global inference profile (us., eu., global.) in front of it. Entries follow SPEC.md v0.2.0 and need verifiable evidence.",
  specials: SPECIALS,
  entries,
};

const incompatibleDoc = {
  spec: "0.2.0",
  updated,
  license: "CC0-1.0",
  note: "Real models from https://models.dev that cannot be assigned a canonical model URI under SPEC.md v0.2.0 without bending the grammar or guessing unverifiable facts. A resolver never resolves entries from this file. See SPEC.md, section 5.1.",
  entries: incompatibleEntries,
};

await Promise.all([
  writeFile(OUT_REGISTRY, JSON.stringify(registryDoc, null, 2) + "\n"),
  writeFile(OUT_INCOMPATIBLE, JSON.stringify(incompatibleDoc, null, 2) + "\n"),
]);

console.log(`${entries.length} registry entries (${slots.size} current), ${incompatibleEntries.length} incompatible, ${SKIPPED.length} skipped`);
