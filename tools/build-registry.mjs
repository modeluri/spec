// SPDX-License-Identifier: MIT
// Builds registry.json from the models.dev catalogue and the hand-made table in classification.mjs.
// Usage: node tools/build-registry.mjs [--catalog <api.json>]   (default: download https://models.dev/api.json)
import { readFile, writeFile } from "node:fs/promises";
import { CLASSIFICATION } from "./classification.mjs";
import { URI_RE } from "../cli/model-uri.mjs";

const OUT = new URL("../registry.json", import.meta.url);
const EVIDENCE = (provider, id, sha) => `https://github.com/anomalyco/models.dev/blob/${sha}/providers/${provider}/models/${id}.toml`;

const ci = process.argv.indexOf("--catalog");
const catalog = ci > 0
  ? JSON.parse(await readFile(process.argv[ci + 1], "utf8"))
  : await (await fetch("https://models.dev/api.json")).json();

// Host name in a model URI -> catalogue provider that serves it. Bedrock lists every model several times:
// the bare id is the model, the prefixed ones (us., eu., global., ...) are inference profiles of it.
const HOSTS = {
  bedrock: ["amazon-bedrock", (id) => !/^(us|eu|au|jp|in|apac|global|us-gov)\./.test(id)],
  vertex: ["google-vertex", () => true],
  azure: ["azure", () => true],
};
const VERTEX_ANTHROPIC = "google-vertex-anthropic"; // Claude on Vertex is listed apart, as "<id>@default"

function nativeNames(provider, id) {
  const native = { [provider]: id };
  for (const [host, [source, isBare]] of Object.entries(HOSTS)) {
    const models = catalog[source]?.models ?? {};
    const key = Object.keys(models).find((k) => isBare(k) && (k === id || k.endsWith(`.${id}`)));
    if (key) native[host] = key;
  }
  const claude = Object.keys(catalog[VERTEX_ANTHROPIC]?.models ?? {}).find((k) => k === `${id}@default`);
  if (claude) native.vertex = claude;
  return native;
}

const seen = new Set();
const entries = CLASSIFICATION.map(([provider, id, uri, current, sha]) => {
  const model = catalog[provider]?.models?.[id];
  if (!model) throw new Error(`${provider}/${id} is not in the catalogue`);
  if (!URI_RE.test(uri)) throw new Error(`${uri} does not match the grammar`);
  if (seen.has(uri)) throw new Error(`${uri} is assigned twice`);
  seen.add(uri);
  return {
    uri,
    native: nativeNames(provider, id),
    released: model.release_date,
    license: "proprietary",
    tier_source: "registry",
    evidence: EVIDENCE(provider, id, sha),
    current,
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

const registry = {
  spec: "0.2.0",
  updated: "2026-11-20",
  license: "CC0-1.0",
  note: "Tiers are assigned by the registry with the rule in SPEC.md section 3.2, as of 2026-11-20, and frozen from then on. `current` marks the models on sale on that date. Native names come from https://models.dev; on bedrock the bare model id is listed, and the bedrock-runtime endpoint needs a geographic or global inference profile (us., eu., global.) in front of it. Entries are added through pull requests and need an evidence link for every registry-assigned tier. See SPEC.md, section 5.",
  entries,
};
await writeFile(OUT, JSON.stringify(registry, null, 2) + "\n");
console.log(`${entries.length} entries, ${slots.size} current`);
