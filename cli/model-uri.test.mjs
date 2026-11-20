import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse, resolve, litellmAliases } from "./model-uri.mjs";

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const registry = JSON.parse(read("registry.json"));
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
  assert.equal(parse("model:qwen/text/core-open/35b-a3b").size, "35b-a3b");
  assert.equal(parse("model:qwen/text/core-open/mxfp4").quant, "mxfp4");
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
    assert.ok(parse(x.uri)?.version, x.uri);
    assert.match(x.evidence, /^https:\/\//, x.uri);
    assert.equal(x.tier_source, "registry");
    assert.ok(x.native[parse(x.uri).publisher], `${x.uri} has no name on the publisher API`);
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

test("litellm aliases: pinned URIs for every entry, version-less ones for current models, file up to date", () => {
  const yaml = litellmAliases(registry);
  const names = [...yaml.matchAll(/model_name: "([^"]+)"/g)].map((m) => m[1]);
  assert.equal(names.length, registry.entries.length + registry.entries.filter((x) => x.current).length);
  assert.equal(new Set(names).size, names.length);
  assert.ok(yaml.includes('model_name: "model:anthropic/text/core"\n    litellm_params:\n      model: "anthropic/claude-sonnet-5-5"'));
  assert.equal(read("aliases/litellm.yaml"), yaml);
});
