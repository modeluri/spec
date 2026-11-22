#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Resolves a model URI to the native name of the model on a host, using registry.json.
// Usage: model-uri.mjs <model-uri> [--json] [--registry <file>]
//        model-uri.mjs aliases --format litellm [--registry <file>]
// Exit codes: 0 resolved, 1 not resolved (empty rung, unknown version, host does not serve it), 2 invalid input.

// SPEC.md section 2, reference regex.
export const URI_RE = /^model:(?<publisher>[a-z][a-z0-9-]*)\/(?<scope>text|omni|image|video|audio|tts|transcribe|embed|rerank|decision)\/(?<tier>nano|light|core|high|max|ultra)(?:-(?<special>(?!(?:restricted|gov|internal|weights|open)(?=[-/:~@]|$))[a-z]+))?(?:-(?<access>restricted|gov|internal))?(?:-(?<weights>weights|open))?(?:\/(?<size>\d+(?:\.\d+)?[mbt](?:-a\d+(?:\.\d+)?[mbt])?))?(?:\/(?<quant>[a-z]+\d+[a-z0-9]*))?(?::(?<version>latest|[a-z0-9.]+))?(?:~(?<author>[a-z][a-z0-9-]*)-(?<kind>abliterated|ft|merge|distill))?(?:@(?<host>[a-z][a-z0-9]*))?$/;

// Self-hosted inference: the weights must be downloadable (SPEC.md 3.8 and rule 8).
export const SELF_HOSTED = new Set(["local", "edge"]);
const closedSelfHosted = (g) => SELF_HOSTED.has(g.host) && !g.weights;

export function parse(uri) {
  if (uri.length > 128) return null;
  const m = URI_RE.exec(uri);
  if (!m) return null;
  const g = { ...m.groups };
  if (closedSelfHosted(g)) return null;
  if (g.version === "latest") g.version = undefined; // `:latest` means no version (SPEC.md 3.6)
  return g;
}

// Entries share a slot when everything but version, derivation and host is equal.
const slotOf = (g) => [g.publisher, g.scope, g.tier, g.special, g.access, g.weights, g.size, g.quant].join("|");

const HINTS = {
  bedrock: "bedrock-runtime needs a geographic or global inference profile in front of this id (us., eu., global.); the bare id works on bedrock-mantle only.",
};

/** @returns {{ok: true, uri: string, native: string, hint?: string} | {ok: false, code: 1 | 2, error: string}} */
export function resolve(registry, input) {
  const g = parse(input);
  if (!g) {
    const raw = input.length <= 128 && URI_RE.exec(input)?.groups;
    const error = raw && closedSelfHosted(raw)
      ? `closed model, no downloadable weights: @${raw.host} needs -open or -weights`
      : input.length > 128 ? "not a valid model URI: longer than 128 characters" : `not a valid model URI: ${input}`;
    return { ok: false, code: 2, error };
  }
  if (g.author) return { ok: false, code: 1, error: "derived models are not in the registry" };
  if (g.special && registry.specials && !Object.hasOwn(registry.specials, g.special)) {
    return { ok: false, code: 1, error: `unregistered special: ${g.special}` };
  }

  const selfHosted = SELF_HOSTED.has(g.host);
  const find = (q) => {
    const slot = slotOf(q);
    const inSlot = registry.entries.filter((e) => slotOf(parse(e.uri)) === slot);
    const hit = q.version ? inSlot.find((e) => parse(e.uri).version === q.version) : inSlot.find((e) => e.current);
    return { inSlot, hit };
  };
  let { inSlot, hit: entry } = find(g);
  // Whoever self-hosts picks the precision (SPEC.md 3.5): without a published quantisation, fall back to the weights as released.
  let quantFallback = false;
  if (!entry && selfHosted && g.quant) {
    const plain = find({ ...g, quant: undefined });
    if (plain.hit) ({ inSlot, hit: entry } = plain), (quantFallback = true);
  }
  if (!entry) {
    const what = g.version
      ? `no release ${g.version} on this rung`
      : inSlot.length
        ? "this rung has no current model, only older releases; pin a version to use one"
        : "this rung is empty";
    return { ok: false, code: 1, error: `${what}: ${input.split("@")[0]}` };
  }

  // local and edge resolve to the repository the weights are published in.
  const host = selfHosted ? "huggingface" : (g.host ?? g.publisher);
  const native = Object.hasOwn(entry.native, host) ? entry.native[host] : undefined;
  const base = quantFallback ? entry.uri.replace(/:(?=[^:]*$)/, `/${g.quant}:`) : entry.uri;
  const pinned = base + (g.host ? `@${g.host}` : "");
  if (!native && !Object.keys(entry.native).length) {
    return { ok: false, code: 1, error: `${entry.uri} is no longer served by any host in the registry` };
  }
  if (!native) {
    const known = registry.entries.some((e) => Object.hasOwn(e.native, g.host));
    const why = selfHosted
      ? `${entry.uri} has no published weights repository in the registry`
      : !g.host ? "no native name for the publisher's own API" : known ? `${entry.uri} is not served on ${g.host} in the registry` : `unregistered host: ${g.host}`;
    return { ok: false, code: 1, error: why };
  }
  const hint = quantFallback
    ? `the registry lists no ${g.quant} release; this is the repository of the weights as published, quantise them yourself or pick a ${g.quant} build`
    : Object.hasOwn(HINTS, g.host) ? HINTS[g.host] : undefined;
  return { ok: true, uri: pinned, native, ...(hint && { hint }) };
}

// LiteLLM proxy model_list: one alias per pinned URI, plus the version-less one for current models.
// Publisher APIs only: bedrock, vertex and azure need account settings (region, project, deployment) that a registry cannot hold.
const LITELLM = { anthropic: ["anthropic", "ANTHROPIC_API_KEY"], openai: ["openai", "OPENAI_API_KEY"], google: ["gemini", "GEMINI_API_KEY"], xai: ["xai", "XAI_API_KEY"] };

export function litellmAliases(registry) {
  const q = JSON.stringify;
  const out = ["# Generated by `node cli/model-uri.mjs aliases --format litellm` from registry.json. Do not edit.", "model_list:"];
  for (const e of registry.entries) {
    const publisher = parse(e.uri).publisher;
    const target = LITELLM[publisher];
    if (!target || !e.native[publisher]) continue;
    const names = e.current ? [e.uri.slice(0, e.uri.indexOf(":", 6)), e.uri] : [e.uri];
    for (const name of names)
      out.push(`  - model_name: ${q(name)}`, "    litellm_params:", `      model: ${q(`${target[0]}/${e.native[publisher]}`)}`, `      api_key: os.environ/${target[1]}`);
  }
  return out.join("\n") + "\n";
}

async function main(argv, readFile) {
  const args = argv.slice(2);
  const take = (flag) => { const i = args.indexOf(flag); return i < 0 ? null : args.splice(i, 2)[1]; };
  const regPath = take("--registry") ?? new URL("../registry.json", import.meta.url);
  const json = args.includes("--json");
  if (args[0] === "aliases") {
    if (take("--format") !== "litellm") { console.error("usage: model-uri.mjs aliases --format litellm"); return 2; }
    process.stdout.write(litellmAliases(JSON.parse(await readFile(regPath, "utf8"))));
    return 0;
  }
  const uri = args.find((a) => !a.startsWith("--"));
  if (!uri) { console.error("usage: model-uri.mjs <model-uri> [--json] [--registry <file>]"); return 2; }

  const r = resolve(JSON.parse(await readFile(regPath, "utf8")), uri);
  if (json) console.log(JSON.stringify(r));
  else if (r.ok) console.log(`${r.uri}\n${r.native}${r.hint ? `\nnote: ${r.hint}` : ""}`);
  else console.error(r.error);
  return r.ok ? 0 : r.code;
}

if (typeof process !== "undefined" && process.argv?.[1]) {
  (async () => {
    const [{ readFile, realpath }, { pathToFileURL }] = await Promise.all([import("node:fs/promises"), import("node:url")]);
    // realpath: an npm bin is a symlink, while import.meta.url is the resolved file.
    if (import.meta.url === pathToFileURL(await realpath(process.argv[1])).href) process.exitCode = await main(process.argv, readFile);
  })();
}
