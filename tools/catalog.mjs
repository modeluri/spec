// SPDX-License-Identifier: MIT
// Shared helpers for reading the local models.dev snapshot and resolving host native IDs.
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

export const DEFAULT_CATALOG_PATH = new URL("./snapshot/catalog.json", import.meta.url);
export const DEFAULT_META_PATH = new URL("./snapshot/meta.json", import.meta.url);
export const DEFAULT_HF_CACHE_PATH = new URL("../.cache/hf-licenses.json", import.meta.url);

// Publisher slugs whose first-party API uses a different provider ID in models.dev.
export const FIRST_PARTY_PROVIDERS = {
  inclusionai: ["bailing"],
  zhipuai: ["zhipuai", "zai"],
  alibaba: ["alibaba", "alibaba-cn"],
  amazon: ["nova"],
  meituan: ["longcat"],
  moonshotai: ["moonshotai", "moonshotai-cn"],
  minimax: ["minimax", "minimax-cn"],
  tencent: ["tencent-tokenhub"],
  "bytedance-seed": ["volcengine", "volcengine-coding-plan"],
  stepfun: ["stepfun", "stepfun-ai"],
  xiaomi: ["xiaomi", "xiaomi-token-plan-ams", "xiaomi-token-plan-sgp", "xiaomi-token-plan-cn"],
  fireworks: ["fireworks-ai"],
};

const BEDROCK_PREFIX_RE = /^(us|eu|au|jp|in|ca|apac|global|us-gov)\./;
const OPENROUTER_VARIANT_RE = /:(free|nitro|extended|online|exacto)$/;
const DATED_ID_RE = /-(?:\d{4}-\d{2}-\d{2}|\d{8})$/;

function pickBedrockId(ids) {
  const sorted = [...ids].sort((a, b) => a.length - b.length || a.localeCompare(b));
  return sorted.find((id) => !BEDROCK_PREFIX_RE.test(id))
    ?? sorted.find((id) => id.startsWith("global."))
    ?? sorted[0];
}

function pickOpenRouterId(ids, canonicalId) {
  const bare = ids.filter((id) => !OPENROUTER_VARIANT_RE.test(id));
  const pool = bare.length ? bare : ids;
  const exact = pool.find((id) => id === canonicalId);
  if (exact) return exact;
  const undated = pool.filter((id) => !DATED_ID_RE.test(id));
  const finalPool = undated.length ? undated : pool;
  return [...finalPool].sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
}

function pickFireworksId(ids) {
  const sorted = [...ids].sort((a, b) => a.length - b.length || a.localeCompare(b));
  return sorted.find((id) => id.startsWith("accounts/fireworks/models/")) ?? sorted[0];
}

function pickShortest(ids) {
  return [...ids].sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
}

export const EXTENDED_HOSTS = [
  { host: "bedrock", providers: ["amazon-bedrock"], pick: pickBedrockId },
  { host: "vertex", providers: ["google-vertex", "google-vertex-anthropic"], pick: pickShortest },
  { host: "azure", providers: ["azure"], pick: pickShortest },
  { host: "openrouter", providers: ["openrouter"], pick: pickOpenRouterId },
  { host: "vercel", providers: ["vercel"], pick: pickShortest },
  { host: "huggingface", providers: ["huggingface"], pick: pickShortest },
  { host: "deepinfra", providers: ["deepinfra"], pick: pickShortest },
  { host: "together", providers: ["togetherai"], pick: pickShortest },
  { host: "fireworks", providers: ["fireworks-ai"], pick: pickFireworksId },
  { host: "groq", providers: ["groq"], pick: pickShortest },
  { host: "ollama", providers: ["ollama-cloud"], pick: pickShortest },
];

export async function loadCatalog(catalogPath = DEFAULT_CATALOG_PATH) {
  if (!existsSync(catalogPath)) {
    throw new Error(`Local catalog not found at ${catalogPath}. Save models.dev catalog.json?type=all there first.`);
  }
  const raw = JSON.parse(await readFile(catalogPath, "utf8"));
  if (!raw?.models || !raw?.providers) {
    throw new Error(`Invalid catalog format in ${catalogPath}: expected { providers, models }.`);
  }
  return raw;
}

export async function loadMeta(metaPath = DEFAULT_META_PATH) {
  if (!existsSync(metaPath)) return { models_dev_commit: "HEAD", fetched_at: null };
  return JSON.parse(await readFile(metaPath, "utf8"));
}

/**
 * Build a reverse index: canonical_model_id -> Map<providerId, Array<{ id, model }>>.
 */
export function indexProvidersByCanonical(catalog) {
  const byCanonical = new Map();
  for (const [providerId, prov] of Object.entries(catalog.providers)) {
    for (const [modelId, model] of Object.entries(prov.models || {})) {
      const cid = model.canonical_model_id;
      if (!cid) continue;
      let pmap = byCanonical.get(cid);
      if (!pmap) {
        pmap = new Map();
        byCanonical.set(cid, pmap);
      }
      let list = pmap.get(providerId);
      if (!list) {
        list = [];
        pmap.set(providerId, list);
      }
      list.push({ id: modelId, model });
    }
  }
  return byCanonical;
}

/**
 * models.dev leaves `v2_only = true` models out of catalog.json (v1). For each classified id that left
 * `fresh` but is still served in the v2 API (`v2`, the experimental/v2.0/api.json object) under the same
 * canonical id, copy its lab model and provider entries from `previous` into `fresh`. Returns the ids copied.
 * shortcut: reuses the previous snapshot's v1 data, so later upstream edits to these models are missed; upgrade by reading v2 directly.
 */
export function carryOverV2Only(fresh, previous, ids, v2) {
  const inV2 = new Set();
  for (const prov of Object.values(v2 || {})) {
    for (const m of Object.values(prov?.models || {})) if (m?.canonical_id) inV2.add(m.canonical_id);
  }
  const carried = [];
  for (const id of ids) {
    if (fresh.models[id]) continue;
    if (!previous.models[id]) throw new Error(`[carry-over] ${id} is in neither the fresh nor the previous catalogue`);
    if (!inV2.has(id)) throw new Error(`[carry-over] ${id} left catalog.json and is not in the v2 API either: classify it as withdrawn`);
    fresh.models[id] = previous.models[id];
    for (const [pid, prov] of Object.entries(previous.providers)) {
      for (const [mid, m] of Object.entries(prov.models || {})) {
        if (m.canonical_model_id !== id) continue;
        fresh.providers[pid] ??= { ...prov, models: {} };
        fresh.providers[pid].models ??= {};
        fresh.providers[pid].models[mid] ??= m;
      }
    }
    carried.push(id);
  }
  return carried;
}

export function extractHfRepo(weights) {
  for (const w of weights || []) {
    const m = /^https:\/\/huggingface\.co\/([^/\s?#]+\/[^/\s?#]+?)(?:\.git)?\/?(?:[?#].*)?$/.exec(w?.url || "");
    if (m) return { repo: m[1], url: `https://huggingface.co/${m[1]}` };
  }
  return null;
}

function pickFirstPartyMatch(catalog, pmap, canonicalId, publisher, slug) {
  const candidates = FIRST_PARTY_PROVIDERS[publisher] ?? [publisher];
  for (const pid of candidates) {
    const hits = pmap?.get(pid);
    if (hits?.length) {
      const exact = hits.find((h) => h.id === slug);
      if (exact) return { providerId: pid, ...exact };
      const sorted = [...hits].sort((a, b) => a.id.length - b.id.length || a.id.localeCompare(b.id));
      return { providerId: pid, ...sorted[0] };
    }
    const direct = catalog.providers[pid]?.models?.[slug];
    if (direct) return { providerId: pid, id: slug, model: direct };
  }
  return null;
}

const FALLBACK_PROVIDER_PRIORITY = [
  "poe",
  "helicone",
  "zenmux",
  "fastrouter",
  "opencode",
  "venice",
  "aihubmix",
  "nano-gpt",
  "requesty",
  "aimlapi",
  "kenari",
  "qiniu-ai",
  "302ai",
];

function sanitizeHostKey(pid) {
  const clean = pid.toLowerCase().replace(/[^a-z0-9]/g, "");
  return /^[0-9]/.test(clean) ? `h${clean}` : clean;
}

/**
 * Resolve all native identifiers for a canonical model ID across first-party API and EXTENDED_HOSTS.
 */
export function resolveNativeHosts(catalog, byCanonical, canonicalId, publisher, excludedFirstParty = null) {
  const slug = canonicalId.slice(publisher.length + 1);
  let pmap = byCanonical.get(canonicalId);
  const native = {};

  const fp = pickFirstPartyMatch(catalog, pmap, canonicalId, publisher, slug);
  if (fp && !excludedFirstParty?.has(`${publisher}/${fp.id}`)) native[publisher] = fp.id;

  for (const { host, providers, pick } of EXTENDED_HOSTS) {
    for (const pid of providers) {
      const hits = pmap?.get(pid);
      if (hits?.length) {
        native[host] = pick(hits.map((h) => h.id), canonicalId);
        break;
      }
    }
  }

  if (!native.huggingface) {
    const hf = extractHfRepo(catalog.models[canonicalId]?.weights);
    if (hf) native.huggingface = hf.repo;
  }

  if (Object.keys(native).length === 0 && pmap && pmap.size > 0) {
    // The publisher's own IDs that are classified incompatible (e.g. rolling aliases) stay excluded here too.
    const firstParty = FIRST_PARTY_PROVIDERS[publisher] ?? [publisher];
    pmap = new Map([...pmap]
      .map(([pid, hits]) => [pid, firstParty.includes(pid) ? hits.filter((h) => !excludedFirstParty?.has(`${publisher}/${h.id}`)) : hits])
      .filter(([, hits]) => hits.length));
  }
  if (Object.keys(native).length === 0 && pmap && pmap.size > 0) {
    const ordered = [
      ...FALLBACK_PROVIDER_PRIORITY.filter((p) => pmap.has(p)),
      ...[...pmap.keys()].filter((p) => !FALLBACK_PROVIDER_PRIORITY.includes(p)).sort(),
    ];
    const activePid = ordered.find((pid) => pmap.get(pid).some((h) => h.model?.status !== "deprecated"));
    const chosenPid = activePid ?? ordered[0];
    if (chosenPid) {
      const hits = pmap.get(chosenPid);
      const activeHits = hits.filter((h) => h.model?.status !== "deprecated");
      const pool = activeHits.length ? activeHits : hits;
      native[sanitizeHostKey(chosenPid)] = pickShortest(pool.map((h) => h.id));
    }
  }

  return native;
}

/**
 * Collect compact pricing and status context for human/agent classification review.
 */
export function collectPricingAndStatus(catalog, byCanonical, canonicalId, publisher) {
  const slug = canonicalId.slice(publisher.length + 1);
  const pmap = byCanonical.get(canonicalId);
  const fp = pickFirstPartyMatch(catalog, pmap, canonicalId, publisher, slug);

  const hostCosts = {};
  const allStatuses = [];
  let providerCount = 0;

  if (fp?.model?.status) allStatuses.push(fp.model.status);
  if (pmap) {
    for (const [pid, hits] of pmap.entries()) {
      providerCount += hits.length;
      for (const h of hits) {
        if (h.model?.status) allStatuses.push(h.model.status);
      }
      if (["openrouter", "amazon-bedrock", "google-vertex", "azure"].includes(pid)) {
        const withCost = hits.find((h) => h.model?.cost);
        if (withCost) hostCosts[pid] = withCost.model.cost;
      }
    }
  }

  const deprecatedCount = allStatuses.filter((s) => s === "deprecated").length;
  return {
    first_party_provider: fp?.providerId ?? null,
    first_party_id: fp?.id ?? null,
    first_party_cost: fp?.model?.cost ?? null,
    first_party_status: fp?.model?.status ?? null,
    host_costs_sample: hostCosts,
    provider_count: providerCount,
    deprecated_reports: deprecatedCount,
  };
}
