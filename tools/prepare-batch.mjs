// SPDX-License-Identifier: MIT
// Generates a compact classification dossier JSON for a batch of publishers from local caches.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import {
  DEFAULT_HF_CACHE_PATH,
  collectPricingAndStatus,
  extractHfRepo,
  indexProvidersByCanonical,
  loadCatalog,
  loadMeta,
  resolveNativeHosts,
} from "./catalog.mjs";
import { normalizeLicense, weightsSuffixFor } from "./licenses.mjs";
import { parse } from "../cli/model-uri.mjs";

const args = process.argv.slice(2);
const take = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};

const pubsArg = take("--publishers");
const outPath = take("--out");
if (!pubsArg || !outPath) {
  console.error("Usage: node tools/prepare-batch.mjs --publishers p1,p2 --out <path>");
  process.exit(2);
}

const publishers = pubsArg.split(",").map((s) => s.trim()).filter(Boolean);
const pubSet = new Set(publishers);

const [catalog, meta, regRaw] = await Promise.all([
  loadCatalog(),
  loadMeta(),
  readFile(new URL("../registry.json", import.meta.url), "utf8"),
]);
const hfCache = existsSync(DEFAULT_HF_CACHE_PATH)
  ? JSON.parse(await readFile(DEFAULT_HF_CACHE_PATH, "utf8"))
  : {};
const registry = JSON.parse(regRaw);
const byCanonical = indexProvidersByCanonical(catalog);

const existing = [];
for (const entry of registry.entries) {
  const pub = parse(entry.uri)?.publisher;
  if (!pubSet.has(pub)) continue;
  const nativeId = entry.native?.[pub];
  existing.push({
    catalog_id: nativeId ? `${pub}/${nativeId}` : null,
    ...entry,
  });
}

const commit = meta.models_dev_commit || "HEAD";
const models = [];
for (const [id, m] of Object.entries(catalog.models)) {
  const publisher = id.split("/")[0];
  if (!pubSet.has(publisher)) continue;
  const slug = id.slice(publisher.length + 1);
  const hfRepo = extractHfRepo(m.weights);
  const hfInfo = hfRepo ? hfCache[hfRepo.repo] ?? null : null;

  let normalizedLicense = null;
  if (!m.open_weights) {
    normalizedLicense = "proprietary";
  } else {
    normalizedLicense = normalizeLicense(m.license) ?? hfInfo?.normalized ?? null;
  }

  models.push({
    id,
    publisher,
    slug,
    name: m.name,
    description: m.description,
    family: m.family,
    type: m.type || "text",
    release_date: m.release_date,
    last_updated: m.last_updated,
    modalities: m.modalities,
    open_weights: m.open_weights,
    raw_license: m.license ?? null,
    hf_license: hfInfo,
    normalized_license: normalizedLicense,
    suggested_weights_suffix: m.open_weights ? weightsSuffixFor(normalizedLicense) : undefined,
    weights_urls: (m.weights || []).map((w) => w.url),
    links: m.links || [],
    default_evidence_url: `https://github.com/anomalyco/models.dev/blob/${commit}/models/${publisher}/${slug}.toml`,
    native_preview: resolveNativeHosts(catalog, byCanonical, id, publisher),
    pricing_and_status: collectPricingAndStatus(catalog, byCanonical, id, publisher),
  });
}

models.sort((a, b) =>
  a.publisher.localeCompare(b.publisher)
  || (b.release_date || "").localeCompare(a.release_date || "")
  || a.id.localeCompare(b.id)
);

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify({
  spec: "0.2.0",
  models_dev_commit: commit,
  publishers,
  model_count: models.length,
  existing_registry_entries: existing,
  models,
}, null, 2) + "\n");

console.log(`Prepared ${outPath}: ${models.length} models (${existing.length} existing registry entries)`);
