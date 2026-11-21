// SPDX-License-Identifier: MIT
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse, resolve, litellmAliases, URI_RE } from "./model-uri.mjs";
import { normalizeLicense, weightsSuffixFor, checkLicenseConsistency } from "../tools/licenses.mjs";

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const registry = JSON.parse(read("registry.json"));
const incompatible = JSON.parse(read("incompatible.json"));
const spec = read("SPEC.md");

// Section 8 of the spec: every backticked model URI in the examples is valid.
const examples = [...spec.slice(spec.indexOf("## 8. Examples"), spec.indexOf("## 9.")).matchAll(/`(model:[^`]+)`/g)].map((m) => m[1]);

test("every example in SPEC.md section 8 is valid", () => {
  assert.ok(examples.length > 20);
  for (const u of examples) assert.ok(parse(u), u);
});

test("invalid strings are rejected", () => {
  for (const u of ["Model:openai/text/core", "model://openai/text/core", "model:openai/text", "model:openai/text/mid", "model:openai/text/core-open-code", "model:openai/text/core/q4/35b", `model:openai/text/core:${"1".repeat(128)}`])
    assert.equal(parse(u), null, u);
});

test("size starts with a digit and quant with a letter, so one alone is unambiguous", () => {
  assert.equal(parse("model:alibaba/text/core-open/35b-a3b").size, "35b-a3b");
  assert.equal(parse("model:alibaba/text/core-open/mxfp4").quant, "mxfp4");
});

test("trillion-parameter sizes parse and unsupported size units are rejected", () => {
  assert.equal(parse("model:mistral/text/max/1t:4").size, "1t");
  assert.equal(parse("model:alibaba/text/max-weights/2.4t-a95b:3.8").size, "2.4t-a95b");
  assert.equal(parse("model:example/text/max/2.4t-a1.2t").size, "2.4t-a1.2t");
  assert.equal(parse("model:example/text/nano/500k"), null);
  assert.equal(parse("model:example/text/core/2.4g"), null);
});

test("URI_RE matches the reference regex in SPEC.md", () => {
  const m = spec.match(/Reference regex:\s*```text\s*([^\n]+)\s*```/);
  assert.ok(m, "Reference regex block not found in SPEC.md");
  assert.equal(new RegExp(m[1]).source, URI_RE.source);
});

test("all supported scopes and -rt combinations parse, unsupported scopes are rejected", () => {
  for (const s of ["text", "omni", "image", "video", "audio", "tts", "transcribe", "embed", "rerank", "decision"]) {
    assert.equal(parse(`model:example/${s}/core`)?.scope, s, s);
  }
  const omniRt = parse("model:openai/omni/core-rt:2.1");
  assert.equal(omniRt?.scope, "omni");
  assert.equal(omniRt?.special, "rt");
  const transcribeRt = parse("model:google/transcribe/core-rt:3.5");
  assert.equal(transcribeRt?.scope, "transcribe");
  assert.equal(transcribeRt?.special, "rt");
  for (const bad of ["speech", "stt", "realtime", "music"]) {
    assert.equal(parse(`model:example/${bad}/core`), null, bad);
  }
});

test("non-standard publisher size notations are rejected as size", () => {
  assert.equal(parse("model:mistral/text/core-open/8x7b:0.1"), null);
  assert.equal(parse("model:meta/text/core-weights/17b-16e:4"), null);
  assert.equal(parse("model:google/text/light-weights/e4b/q4:4"), null);
  assert.equal(parse("model:google/text/light-weights/e4b:4")?.size, undefined);
});

test("all supported special suffixes parse and out-of-spec specialisations are rejected", () => {
  for (const sp of ["code", "rt", "base", "guard", "ocr", "translate", "research", "gui", "robotics", "roleplay", "medical", "finance", "legal", "voiceclone", "voicedesign"]) {
    assert.equal(parse(`model:example/text/core-${sp}`)?.special, sp, sp);
  }
  const guard = parse("model:meta/text/core-guard-weights/12b:4@local");
  assert.equal(guard?.special, "guard");
  assert.equal(guard?.weights, "weights");
  assert.equal(guard?.size, "12b");
  assert.equal(guard?.version, "4");
  assert.equal(guard?.host, "local");
  const medical = parse("model:baichuan/text/core-medical-open/32b:2@local");
  assert.equal(medical?.special, "medical");
  assert.equal(medical?.weights, "open");
  assert.equal(medical?.size, "32b");
  assert.equal(medical?.version, "2");
  assert.equal(medical?.host, "local");
  const voiceclone = parse("model:xiaomi/tts/core-voiceclone:2.5");
  assert.equal(voiceclone?.scope, "tts");
  assert.equal(voiceclone?.special, "voiceclone");
  assert.equal(voiceclone?.version, "2.5");
  for (const bad of ["fast", "thinking", "reasoning", "cyber", "med", "fin", "marketing", "hr"]) {
    assert.equal(parse(`model:example/text/core-${bad}`), null, bad);
  }
});

// A small registry, so these tests do not move when the real one is updated.
const e = (uri, current, native) => ({ uri, current, native });
const fixture = { entries: [
  e("model:p/text/core:2", true, { p: "p-2", bedrock: "p.p-2" }),
  e("model:p/text/core:1", false, { p: "p-1" }),
  e("model:p/text/light:1", false, { p: "p-light-1" }),
  e("model:p/text/core-open/35b-a3b/q4:2", true, { p: "p-q4" }),
] };

test("no version resolves to the current model and reports the pinned URI", () => {
  assert.deepEqual(resolve(fixture, "model:p/text/core"), { ok: true, uri: "model:p/text/core:2", native: "p-2" });
  assert.equal(resolve(fixture, "model:p/text/core:latest").uri, "model:p/text/core:2");
});

test("a version resolves to that release, current or not", () => {
  assert.equal(resolve(fixture, "model:p/text/core:1").native, "p-1");
  assert.equal(resolve(fixture, "model:p/text/core:9").code, 1);
});

test("a host picks its own native name and keeps the host in the pinned URI", () => {
  const r = resolve(fixture, "model:p/text/core@bedrock");
  assert.equal(r.uri, "model:p/text/core:2@bedrock");
  assert.equal(r.native, "p.p-2");
  assert.match(r.hint, /inference profile/);
});

test("an empty rung, an unserved host and an unknown host are not guessed", () => {
  assert.match(resolve(fixture, "model:p/text/max").error, /empty/);
  assert.match(resolve(fixture, "model:p/text/light").error, /only older releases/);
  assert.match(resolve(fixture, "model:p/text/core@azure").error, /unregistered host/);
  assert.match(resolve(fixture, "model:p/text/core:1@bedrock").error, /not served on bedrock/);
});

test("size and quant select their own slot", () => {
  assert.equal(resolve(fixture, "model:p/text/core-open/35b-a3b/q4").native, "p-q4");
  assert.equal(resolve(fixture, "model:p/text/core-open/35b-a3b/q8").code, 1);
});

test("local and edge resolve to the published weights repository", () => {
  const reg = { entries: [
    e("model:q/text/core-open/35b-a3b:3", true, { q: "q-3", huggingface: "Q/Q-3-35B-A3B" }),
    e("model:q/text/core-open/35b-a3b:2", false, { huggingface: "Q/Q-2-35B-A3B" }),
    e("model:q/text/core-open/35b-a3b/q4:3", true, { huggingface: "Q/Q-3-35B-A3B-Q4" }),
    e("model:q/text/light-weights:1", true, { q: "q-light" }),
    e("model:q/text/max:1", true, { q: "q-max" }),
  ] };
  assert.deepEqual(resolve(reg, "model:q/text/core-open/35b-a3b@local"), { ok: true, uri: "model:q/text/core-open/35b-a3b:3@local", native: "Q/Q-3-35B-A3B" });
  assert.equal(resolve(reg, "model:q/text/core-open/35b-a3b:2@edge").native, "Q/Q-2-35B-A3B");
  // A published quantisation wins; otherwise the weights as released, with a note.
  assert.equal(resolve(reg, "model:q/text/core-open/35b-a3b/q4@local").native, "Q/Q-3-35B-A3B-Q4");
  const mx = resolve(reg, "model:q/text/core-open/35b-a3b/mxfp4@local");
  assert.equal(mx.uri, "model:q/text/core-open/35b-a3b/mxfp4:3@local");
  assert.equal(mx.native, "Q/Q-3-35B-A3B");
  assert.match(mx.hint, /no mxfp4 release/);
  // Hosted quantisations are not guessed.
  assert.equal(resolve(reg, "model:q/text/core-open/35b-a3b/mxfp4@bedrock").code, 1);
  assert.match(resolve(reg, "model:q/text/light-weights@local").error, /no published weights repository/);
});

test("a closed model cannot be self-hosted", () => {
  for (const u of ["model:q/text/max@local", "model:q/text/max:1@edge", "model:q/text/core-restricted@local"]) {
    assert.equal(parse(u), null, u);
    const r = resolve(fixture, u);
    assert.equal(r.code, 2, u);
    assert.match(r.error, /closed model, no downloadable weights/, u);
  }
  assert.ok(parse("model:q/text/core-open@local"));
  assert.ok(parse("model:q/text/max@somehost"));
});

test("registry: local resolves for downloadable models", () => {
  assert.equal(resolve(registry, "model:baai/embed/core-open:m3@local").native, "BAAI/bge-m3");
  const qwen = resolve(registry, "model:alibaba/text/core-open/35b-a3b/mxfp4@local");
  assert.equal(qwen.ok, true, qwen.error);
  assert.match(qwen.uri, /^model:alibaba\/text\/core-open\/35b-a3b\/mxfp4:[0-9.]+@local$/);
  assert.equal(resolve(registry, "model:openai/text/core@local").code, 2);
});

test("derived models and invalid input are refused", () => {
  assert.equal(resolve(fixture, "model:p/text/core~x-ft").code, 1);
  assert.equal(resolve(fixture, "nope").code, 2);
});

// The real registry.
const slotOf = (uri) => uri.slice(0, uri.indexOf(":", 6));

test("registry: valid, unique, with evidence, tier source and native name", () => {
  const uris = registry.entries.map((x) => x.uri);
  assert.equal(new Set(uris).size, uris.length);
  for (const x of registry.entries) {
    const g = parse(x.uri);
    assert.ok(g?.version, x.uri);
    assert.match(x.evidence, /^https:\/\//, x.uri);
    assert.equal(x.tier_source, "registry");
    const hostKeys = Object.keys(x.native);
    assert.ok(hostKeys.length > 0, `${x.uri} has no native hosts`);
    for (const k of hostKeys) {
      assert.ok(k === g.publisher || /^[a-z][a-z0-9]*$/.test(k), `${x.uri} has invalid native key: ${k}`);
    }
    const lic = checkLicenseConsistency(g.weights, x.license);
    assert.equal(lic.ok, true, `${x.uri}: ${lic.error}`);
  }
});

test("registry: at most one current model per rung", () => {
  const cur = registry.entries.filter((x) => x.current).map((x) => slotOf(x.uri));
  assert.equal(new Set(cur).size, cur.length);
});

test("registry: every plain versioned text example of SPEC.md section 8 is there", () => {
  // Mythos is restricted to selected operators, so the registry does not list it; the spec keeps it as an example of the `restricted` suffix.
  const known = ["model:anthropic/text/max-restricted:5.2"];
  const wanted = examples.filter((u) => /^model:(openai|google|anthropic)\/text\/[a-z-]+:[0-9.]+$/.test(u) && !known.includes(u));
  assert.ok(wanted.length >= 10);
  for (const u of wanted) assert.ok(registry.entries.some((x) => x.uri === u), `${u} is in the spec but not in the registry`);
});

test("the cross-publisher switch table resolves, and the empty rung reports itself", () => {
  for (const p of ["openai", "google", "anthropic"])
    for (const t of ["max", "core"]) assert.equal(resolve(registry, `model:${p}/text/${t}`).ok, true, `${p} ${t}`);
  assert.match(resolve(registry, "model:google/text/nano").error, /only older releases/);
});

test("litellm aliases: pinned URIs for every eligible entry, version-less ones for current models, file up to date", () => {
  const yaml = litellmAliases(registry);
  const names = [...yaml.matchAll(/model_name: "([^"]+)"/g)].map((m) => m[1]);
  const eligible = registry.entries.filter((x) => {
    const pub = parse(x.uri).publisher;
    return ["anthropic", "openai", "google", "xai"].includes(pub) && Boolean(x.native[pub]);
  });
  assert.equal(names.length, eligible.length + eligible.filter((x) => x.current).length);
  assert.equal(new Set(names).size, names.length);
  assert.equal(yaml.includes("/undefined"), false);
  assert.ok(yaml.includes('model_name: "model:anthropic/text/core"\n    litellm_params:\n      model: "anthropic/claude-sonnet-5-5"'));
  assert.equal(read("aliases/litellm.yaml"), yaml);
});

const INCOMPATIBLE_REASONS = [
  "rolling-alias",
  "opaque-size",
  "parameter-split",
  "slot-collision",
  "unmapped-special",
  "unmapped-scope",
  "missing-evidence",
];

function validateIncompatible(doc, reg) {
  assert.ok(typeof doc?.spec === "string" && doc.spec.length > 0, "spec is required");
  assert.match(doc.updated, /^\d{4}-\d{2}-\d{2}$/, "updated must be YYYY-MM-DD");
  assert.equal(doc.license, "CC0-1.0");
  assert.ok(typeof doc.note === "string" && doc.note.trim().length > 0, "note is required");
  assert.ok(Array.isArray(doc.entries), "entries must be an array");

  const registered = new Set();
  for (const e of reg.entries) {
    const pub = parse(e.uri)?.publisher;
    if (pub && e.native?.[pub]) registered.add(`${pub}/${e.native[pub]}`);
  }

  const seenIds = new Set();
  for (const entry of doc.entries) {
    assert.match(entry.id, /^[^/\s]+\/[^/\s]+$/, `invalid id: ${entry.id}`);
    assert.ok(!seenIds.has(entry.id), `duplicate id: ${entry.id}`);
    seenIds.add(entry.id);
    assert.match(entry.publisher, /^[a-z][a-z0-9-]*$/, `invalid publisher: ${entry.publisher}`);
    if ("name" in entry && entry.name !== undefined) {
      assert.ok(typeof entry.name === "string" && entry.name.trim().length > 0, `invalid name: ${entry.id}`);
    }
    assert.ok(INCOMPATIBLE_REASONS.includes(entry.reason), `invalid reason: ${entry.reason}`);
    assert.ok(typeof entry.detail === "string" && entry.detail.trim().length > 0, `missing detail: ${entry.id}`);
    assert.match(entry.evidence, /^https:\/\//, `evidence must be https: ${entry.id}`);
    if (entry.reason === "slot-collision" || entry.reason === "parameter-split") {
      assert.ok(typeof entry.conflicts_with === "string" && entry.conflicts_with.length > 0, `missing conflicts_with: ${entry.id}`);
    }
    if (entry.conflicts_with !== undefined) {
      assert.ok(parse(entry.conflicts_with) !== null, `invalid conflicts_with URI: ${entry.conflicts_with}`);
    }
    const slug = entry.id.split("/")[1];
    assert.ok(!registered.has(entry.id) && !registered.has(`${entry.publisher}/${slug}`), `overlap with registry.json: ${entry.id}`);
  }
}

test("incompatible.json conforms to SPEC.md section 5.1 and is mutually exclusive with registry.json", () => {
  const sec51 = spec.slice(spec.indexOf("### 5.1 Incompatible models"), spec.indexOf("## 6."));
  const specReasons = [...sec51.matchAll(/^\| `([a-z-]+)` \|/gm)].map((m) => m[1]);
  assert.deepEqual(specReasons, INCOMPATIBLE_REASONS);
  validateIncompatible(incompatible, registry);
});

test("validateIncompatible accepts valid entries and rejects schema or overlap errors", () => {
  const baseDoc = (entries) => ({
    spec: "0.2.0",
    updated: "2026-11-21",
    license: "CC0-1.0",
    note: "Test incompatible registry",
    entries,
  });
  const opaque = {
    id: "google/gemma-4-E4B-it",
    publisher: "google",
    name: "Gemma 4 E4B IT",
    reason: "opaque-size",
    detail: "Proprietary effective-parameter label.",
    evidence: "https://huggingface.co/google/gemma-4-E4B-it",
  };
  const split = {
    id: "xai/grok-4.20-0309-non-reasoning",
    publisher: "xai",
    reason: "parameter-split",
    conflicts_with: "model:xai/text/core:4.20",
    detail: "Reasoning toggle exposed as a separate model ID.",
    evidence: "https://models.dev",
  };
  validateIncompatible(baseDoc([opaque, split]), registry);

  assert.throws(() => validateIncompatible(baseDoc([{ ...opaque, reason: "bad-reason" }]), registry), /invalid reason/);
  assert.throws(() => validateIncompatible(baseDoc([{ ...split, conflicts_with: undefined }]), registry), /missing conflicts_with/);
  assert.throws(() => validateIncompatible(baseDoc([{ ...opaque, reason: "slot-collision" }]), registry), /missing conflicts_with/);
  assert.throws(() => validateIncompatible(baseDoc([{ ...split, conflicts_with: "not-a-uri" }]), registry), /invalid conflicts_with URI/);
  assert.throws(() => validateIncompatible(baseDoc([opaque, opaque]), registry), /duplicate id/);
  assert.throws(() => validateIncompatible(baseDoc([{ ...opaque, id: "anthropic/claude-sonnet-5-5", publisher: "anthropic" }]), registry), /overlap with registry\.json/);
});

test("license normalization and strict OSI boundary (-open vs -weights)", () => {
  assert.equal(normalizeLicense("Apache 2.0"), "Apache-2.0");
  assert.equal(normalizeLicense("apache-2.0"), "Apache-2.0");
  assert.equal(normalizeLicense("MIT License"), "MIT");
  assert.equal(normalizeLicense("AGPL-3.0"), "AGPL-3.0-only");
  assert.equal(normalizeLicense("mrl"), "Mistral Research License");
  assert.equal(normalizeLicense("mnpl"), "Mistral AI Non-Production License");
  assert.equal(normalizeLicense("llama4"), "Llama 4 Community License");
  assert.equal(normalizeLicense("llama3.2"), "Llama 3.2 Community License");
  assert.equal(normalizeLicense("llama3.1"), "Llama 3.1 Community License");
  assert.equal(normalizeLicense("llama3.3"), "Llama 3.3 Community License");
  assert.equal(normalizeLicense("modified-mit"), "Modified MIT");
  for (const osi of ["Apache 2.0", "apache-2.0", "MIT License", "AGPL-3.0"]) {
    assert.equal(weightsSuffixFor(osi), "open", osi);
  }
  for (const hfShort of ["mrl", "mnpl", "llama4", "llama3.2", "llama3.1", "llama3.3", "modified-mit"]) {
    assert.equal(weightsSuffixFor(hfShort), "weights", hfShort);
  }

  for (const nonOsi of [
    "Modified MIT",
    "OpenMDW-1.1",
    "CC-BY-NC-4.0",
    "CC-BY-4.0",
    "Gemma",
    "Gemma Terms of Use",
    "Llama 4 Community License",
    "Nace.AI Open RAIL-M",
    "DeepSeek Model License",
    "nvidia-open-model-license",
    "LFM Open License v1.0",
    "Muse Model License",
    "qwen-research",
    "qwen3.8-max",
    "MiniMax H3 Community License Agreement",
  ]) {
    assert.equal(weightsSuffixFor(nonOsi), "weights", nonOsi);
  }

  assert.equal(weightsSuffixFor("proprietary"), undefined);
  for (const missing of ["", "  ", null, undefined, "other", "Unknown", "none", "unspecified"]) {
    assert.equal(weightsSuffixFor(missing), null, String(missing));
  }

  assert.equal(checkLicenseConsistency("open", "Apache-2.0").ok, true);
  assert.equal(checkLicenseConsistency("weights", "Modified MIT").ok, true);
  assert.equal(checkLicenseConsistency("weights", "OpenMDW-1.1").ok, true);
  assert.equal(checkLicenseConsistency(undefined, "proprietary").ok, true);

  assert.equal(checkLicenseConsistency("open", "Modified MIT").ok, false);
  assert.equal(checkLicenseConsistency("open", "OpenMDW-1.1").ok, false);
  assert.equal(checkLicenseConsistency("open", "Apache 2.0").ok, false);
  assert.equal(checkLicenseConsistency("weights", "Apache-2.0").ok, false);
  assert.equal(checkLicenseConsistency("weights", "proprietary").ok, false);
  assert.equal(checkLicenseConsistency(undefined, "MIT").ok, false);
});
