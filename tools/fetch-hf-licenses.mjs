// SPDX-License-Identifier: MIT
// Fetches official model card licences from Hugging Face for open_weights models lacking `license` in models.dev.
// Results are cached locally in .cache/hf-licenses.json so repeated runs never re-query HF.
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { DEFAULT_CATALOG_PATH, DEFAULT_HF_CACHE_PATH, extractHfRepo, loadCatalog } from "./catalog.mjs";
import { normalizeLicense, weightsSuffixFor } from "./licenses.mjs";

const args = process.argv.slice(2);
const pubArgIdx = args.indexOf("--publishers");
const publisherFilter = pubArgIdx >= 0
  ? new Set(args[pubArgIdx + 1].split(",").map((s) => s.trim()).filter(Boolean))
  : null;

const catalog = await loadCatalog(DEFAULT_CATALOG_PATH);
const cache = existsSync(DEFAULT_HF_CACHE_PATH)
  ? JSON.parse(await readFile(DEFAULT_HF_CACHE_PATH, "utf8"))
  : {};

const targets = new Map();
for (const [id, m] of Object.entries(catalog.models)) {
  const pub = id.split("/")[0];
  if (publisherFilter && !publisherFilter.has(pub)) continue;
  if (!m.open_weights || m.license) continue;
  const hf = extractHfRepo(m.weights);
  if (hf && !targets.has(hf.repo)) targets.set(hf.repo, hf.url);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let newlyFetched = 0;

for (const [repo, url] of targets.entries()) {
  if (cache[repo] && cache[repo].http_status === 200) continue;
  if (repo.split("/").some((s) => s === "." || s === "..")) {
    console.warn(`skipping malformed Hugging Face repo id: ${repo}`);
    continue;
  }
  const apiUrl = `https://huggingface.co/api/models/${repo.split("/").map(encodeURIComponent).join("/")}`;
  try {
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "modeluri-registry-tool/0.2.0 (+https://modeluri.org)" },
    });
    if (!res.ok) {
      cache[repo] = {
        url,
        http_status: res.status,
        error: `HTTP ${res.status}`,
        normalized: null,
        fetched_at: new Date().toISOString().slice(0, 10),
      };
    } else {
      const data = await res.json();
      const card = data.cardData || {};
      const licField = Array.isArray(card.license) ? card.license[0] : card.license;
      const tagLic = (data.tags || []).find((t) => t.startsWith("license:"))?.slice(8);
      const rawLic = licField ?? tagLic ?? null;
      const licName = typeof card.license_name === "string" ? card.license_name.trim() : null;
      const licLink = typeof card.license_link === "string" ? card.license_link.trim() : null;
      const normalized = normalizeLicense(rawLic) ?? normalizeLicense(licName);
      cache[repo] = {
        url,
        http_status: res.status,
        license: rawLic,
        license_name: licName || undefined,
        license_link: licLink || undefined,
        normalized,
        weights_suffix: weightsSuffixFor(normalized),
        fetched_at: new Date().toISOString().slice(0, 10),
      };
    }
    newlyFetched++;
  } catch (err) {
    cache[repo] = {
      url,
      http_status: 0,
      error: String(err.message || err),
      normalized: null,
      fetched_at: new Date().toISOString().slice(0, 10),
    };
    newlyFetched++;
  }
  await sleep(120);
}

await writeFile(DEFAULT_HF_CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");

let resolved = 0;
let unresolved = 0;
for (const repo of targets.keys()) {
  if (cache[repo]?.normalized) resolved++;
  else unresolved++;
}
console.log(JSON.stringify({ checked: targets.size, newly_fetched: newlyFetched, resolved_license: resolved, unresolved }));
