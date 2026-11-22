// SPDX-License-Identifier: MIT
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SUPPORTED_PROTOCOLS, checkHttpHeaders, createMcpHandler } from "./mcp-core.mjs";

const read = (f) => JSON.parse(readFileSync(new URL(`../${f}`, import.meta.url), "utf8"));
const registry = read("registry.json");
const incompatible = read("incompatible.json");
const { handleJsonRpc } = createMcpHandler({ registry, incompatible });

const call = (method, params, id = 1) => handleJsonRpc({ jsonrpc: "2.0", id, method, params });
const callTool = (name, args) => {
  const res = call("tools/call", { name, arguments: args });
  assert.ok(!res.error, JSON.stringify(res.error));
  return { isError: Boolean(res.result.isError), data: JSON.parse(res.result.content[0].text) };
};

test("MCP initialize, notifications, ping, tools/list, and resources/list", () => {
  const init = call("initialize", { protocolVersion: "2025-03-26", clientInfo: { name: "test", version: "1" } });
  assert.equal(init.result.protocolVersion, "2025-03-26");
  assert.equal(init.result.serverInfo.name, "modeluri");
  assert.ok(init.result.capabilities.tools);
  assert.ok(init.result.capabilities.resources);

  assert.equal(handleJsonRpc({ jsonrpc: "2.0", method: "notifications/initialized" }), null);
  assert.deepEqual(call("ping").result, {});

  const tools = call("tools/list").result.tools.map((t) => t.name);
  assert.deepEqual(tools, ["resolve_model_uri", "lookup_native_model", "list_models", "validate_model_uri"]);

  const resources = call("resources/list").result.resources.map((r) => r.uri);
  assert.deepEqual(resources, ["modeluri://specials", "modeluri://summary"]);
});

test("resolve_model_uri resolves current, pinned, @bedrock, and @local, and flags errors", () => {
  const bedrock = callTool("resolve_model_uri", { uri: "model:anthropic/text/core@bedrock" });
  assert.equal(bedrock.isError, false);
  assert.equal(bedrock.data.ok, true);
  assert.equal(bedrock.data.uri, "model:anthropic/text/core:5.5@bedrock");
  assert.equal(bedrock.data.native, "anthropic.claude-sonnet-5-5");
  assert.match(bedrock.data.hint, /inference profile/);
  assert.equal(bedrock.data.license, "proprietary");

  const local = callTool("resolve_model_uri", { uri: "model:baai/embed/core-open:m3@local" });
  assert.equal(local.isError, false);
  assert.equal(local.data.native, "BAAI/bge-m3");
  assert.equal(local.data.license, "MIT");

  const closedLocal = callTool("resolve_model_uri", { uri: "model:openai/text/core@local" });
  assert.equal(closedLocal.isError, true);
  assert.match(closedLocal.data.error, /closed model/);
});

test("lookup_native_model finds current, superseded, and incompatible entries", () => {
  const current = callTool("lookup_native_model", { query: "claude-sonnet-5-5", host: "anthropic" });
  assert.equal(current.isError, false);
  assert.equal(current.data.registry_matches[0].uri, "model:anthropic/text/core:5.5");
  assert.equal(current.data.registry_matches[0].current, true);

  const old = callTool("lookup_native_model", { query: "Qwen/Qwen3.5-35B-A3B", host: "huggingface" });
  assert.equal(old.isError, false);
  const hit = old.data.registry_matches.find((m) => m.uri === "model:alibaba/text/core-open/35b-a3b:3.5");
  assert.ok(hit);
  assert.equal(hit.current, false);
  assert.equal(hit.superseded_by, "model:alibaba/text/core-open/35b-a3b:3.6");

  const inc = callTool("lookup_native_model", { query: "qwen-flash" });
  assert.ok(inc.data.incompatible_matches.some((m) => m.id === "alibaba/qwen-flash" && m.reason === "rolling-alias"));
});

test("list_models filters by tier, scope, weights, and host", () => {
  const openCore = callTool("list_models", { scope: "text", tier: "core", weights: "open", host: "local", limit: 10 });
  assert.equal(openCore.isError, false);
  assert.ok(openCore.data.total > 0);
  assert.ok(openCore.data.models.length <= 10);
  for (const m of openCore.data.models) {
    assert.match(m.uri, /\/text\/core.*-open/);
    assert.equal(m.current, true);
    assert.ok(typeof m.native === "string" && m.native.includes("/"));
  }
});

test("validate_model_uri checks syntax, canonical form, rule 8, and registry membership", () => {
  const latest = callTool("validate_model_uri", { uri: "model:openai/text/core:latest" });
  assert.equal(latest.data.valid, true);
  assert.equal(latest.data.is_canonical, false);
  assert.equal(latest.data.canonical, "model:openai/text/core");
  assert.ok(latest.data.warnings.some((w) => w.includes(":latest")));

  const unreg = callTool("validate_model_uri", { uri: "model:acme/text/core-cybersec@mycloud" });
  assert.equal(unreg.data.valid, true);
  assert.equal(unreg.data.warnings.length, 3);

  const badLocal = callTool("validate_model_uri", { uri: "model:openai/text/core@local" });
  assert.equal(badLocal.data.valid, false);
  assert.ok(badLocal.data.errors.some((e) => e.includes("rule 8")));
});

test("resources/read returns specials and summary", () => {
  const specials = JSON.parse(call("resources/read", { uri: "modeluri://specials" }).result.contents[0].text);
  assert.ok(specials.code && specials.voiceclone);

  const summary = JSON.parse(call("resources/read", { uri: "modeluri://summary" }).result.contents[0].text);
  assert.equal(summary.spec, registry.spec);
  assert.equal(summary.counts.registry_entries, registry.entries.length);
  assert.equal(summary.counts.incompatible_entries, incompatible.entries.length);
});

test("lookup_native_model finds a withdrawn release by its former native ID", () => {
  const { data } = callTool("lookup_native_model", { query: "liquid/d1" });
  const hit = data.registry_matches.find((m) => m.uri === "model:liquid/decision/core:1");
  assert.ok(hit, "withdrawn Liquid d1 not found");
  assert.deepEqual(hit.native, {});
  assert.equal(hit.former_native.vercel, "liquid/d1");
  assert.equal(callTool("resolve_model_uri", { uri: "model:liquid/decision/core:1" }).isError, true);
});

test("tool arguments are checked against the input schema", () => {
  for (const [name, args, msg] of [
    ["list_models", { tier: "mega" }, /tier must be one of/],
    ["list_models", { limit: 0 }, /limit must be at least 1/],
    ["list_models", { limit: 2.5 }, /limit must be an integer/],
    ["list_models", { current_only: "no" }, /current_only must be a boolean/],
    ["list_models", { colour: "red" }, /unknown argument: colour/],
    ["resolve_model_uri", { uri: 42 }, /uri must be a string/],
    ["lookup_native_model", [], /arguments must be an object/],
  ]) {
    const r = callTool(name, args);
    assert.equal(r.isError, true, `${name} ${JSON.stringify(args)}`);
    assert.match(r.data.error, msg);
  }
  assert.equal(callTool("list_models", { tier: "core", limit: 5 }).isError, false);
  assert.equal(callTool("list_models").isError, false);
});

test("validate_model_uri does not echo an over-long input", () => {
  const { data } = callTool("validate_model_uri", { uri: "model:" + "a".repeat(10000) });
  assert.equal(data.valid, false);
  assert.ok(data.uri.length < 100);
});

const V = "2026-07-28";
const meta = { _meta: { "io.modelcontextprotocol/protocolVersion": V } };

test("initialize negotiates every initialize-era version and falls back to the newest", () => {
  for (const v of ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"]) {
    assert.equal(call("initialize", { protocolVersion: v }).result.protocolVersion, v);
  }
  assert.equal(call("initialize", { protocolVersion: "1900-01-01" }).result.protocolVersion, "2025-11-25");
  assert.equal(call("tools/list").result.resultType, undefined);
});

test("protocol 2026-07-28: discover, resultType, caching hints, serverInfo, and errors", () => {
  const d = call("server/discover", meta).result;
  assert.deepEqual(d.supportedVersions, SUPPORTED_PROTOCOLS);
  assert.equal(d.resultType, "complete");
  assert.equal(d.cacheScope, "public");
  assert.ok(d.ttlMs > 0 && d.instructions);
  assert.equal(d._meta["io.modelcontextprotocol/serverInfo"].name, "modeluri");

  const list = call("tools/list", meta).result;
  assert.equal(list.resultType, "complete");
  assert.ok(list.ttlMs > 0 && list.tools.length === 4);
  const tool = call("tools/call", { ...meta, name: "resolve_model_uri", arguments: { uri: "model:anthropic/text/core" } }).result;
  assert.equal(tool.resultType, "complete");
  assert.equal(tool.ttlMs, undefined);
  assert.equal(call("resources/read", { ...meta, uri: "modeluri://nope" }).error.code, -32602);
  assert.equal(call("resources/read", { uri: "modeluri://nope" }).error.code, -32002);

  const bad = call("tools/list", { _meta: { "io.modelcontextprotocol/protocolVersion": "1900-01-01" } }).error;
  assert.equal(bad.code, -32022);
  assert.equal(bad.data.requested, "1900-01-01");
});

test("HTTP header checks for 2026-07-28 and batches", () => {
  const msg = { jsonrpc: "2.0", id: 1, method: "tools/call", params: { ...meta, name: "list_models", arguments: {} } };
  const h = (o) => (name) => o[name] ?? null;
  const good = { "MCP-Protocol-Version": V, "Mcp-Method": "tools/call", "Mcp-Name": "list_models" };
  assert.equal(checkHttpHeaders(msg, h(good)), null);
  assert.equal(checkHttpHeaders(msg, h({ ...good, "Mcp-Name": `=?base64?${btoa("list_models")}?=` })), null);
  for (const o of [{ ...good, "Mcp-Name": "nope" }, { ...good, "Mcp-Method": "tools/list" }, { ...good, "MCP-Protocol-Version": undefined }]) {
    assert.equal(checkHttpHeaders(msg, h(o)).error.code, -32020);
  }
  assert.equal(checkHttpHeaders(msg, h({ "MCP-Protocol-Version": "1900-01-01" })).error.code, -32022);
  // Legacy clients: no header, or an older version, need no mirrored headers.
  const legacy = { jsonrpc: "2.0", id: 1, method: "tools/list" };
  assert.equal(checkHttpHeaders(legacy, h({})), null);
  assert.equal(checkHttpHeaders(legacy, h({ "MCP-Protocol-Version": "2025-11-25" })), null);
  assert.equal(checkHttpHeaders([legacy], h({})), null);
  assert.equal(checkHttpHeaders([legacy], h({ "MCP-Protocol-Version": "2025-06-18" })).error.code, -32600);
});
