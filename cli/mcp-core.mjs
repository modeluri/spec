// SPDX-License-Identifier: MIT
// Pure-ESM Model Context Protocol (MCP) JSON-RPC handler for Model URI.
// Shared between the local stdio server (cli/mcp.mjs) and the remote Cloudflare Worker (https://modeluri.org/mcp).
import { URI_RE, SELF_HOSTED, parse, resolve } from "./model-uri.mjs";

// 2026-07-28 is stateless (no initialize, version in every request's _meta); the older ones negotiate with initialize.
export const STATELESS_PROTOCOL = "2026-07-28";
const INITIALIZE_PROTOCOLS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
export const SUPPORTED_PROTOCOLS = [STATELESS_PROTOCOL, ...INITIALIZE_PROTOCOLS];
const META = "io.modelcontextprotocol/";
const CACHEABLE = new Set(["server/discover", "tools/list", "resources/list", "resources/read"]);
const INSTRUCTIONS =
  "Use resolve_model_uri to turn a canonical Model URI (e.g. model:anthropic/text/core@bedrock) into a verified native model ID, lookup_native_model to check if a hardcoded model ID is current or superseded, list_models to find cross-publisher equivalents, and validate_model_uri to lint URIs.";

const decodeHeader = (v) => {
  const m = /^=\?base64\?(.*)\?=$/.exec(v ?? "");
  if (!m) return v;
  try { return new TextDecoder().decode(Uint8Array.from(atob(m[1]), (c) => c.charCodeAt(0))); } catch { return null; }
};

/**
 * Streamable HTTP checks of protocol 2026-07-28: the MCP-Protocol-Version, Mcp-Method and Mcp-Name headers must mirror the body.
 * Returns a JSON-RPC error reply (sent with 400) or null. `header` reads a request header by name.
 */
export function checkHttpHeaders(msg, header) {
  const id = msg && !Array.isArray(msg) ? (msg.id ?? null) : null;
  const fail = (code, message, data) => ({ jsonrpc: "2.0", id, error: { code, message, ...(data && { data }) } });
  const hv = header("MCP-Protocol-Version");
  if (hv && !SUPPORTED_PROTOCOLS.includes(hv)) return fail(-32022, "Unsupported protocol version", { supported: SUPPORTED_PROTOCOLS, requested: hv });
  if (Array.isArray(msg)) return hv && hv > "2025-03-26" ? fail(-32600, `JSON-RPC batches are not part of protocol ${hv}`) : null;
  const bv = msg?.params?._meta?.[`${META}protocolVersion`];
  if (hv !== STATELESS_PROTOCOL && bv !== STATELESS_PROTOCOL) return null;
  if (hv !== bv) return fail(-32020, `Header mismatch: MCP-Protocol-Version header ${hv ?? "(missing)"} does not match body ${bv ?? "(missing)"}`);
  if (header("Mcp-Method") !== msg.method) return fail(-32020, `Header mismatch: Mcp-Method header does not match body method ${msg.method}`);
  const name = msg.method === "tools/call" ? msg.params?.name : msg.method === "resources/read" ? msg.params?.uri : undefined;
  if (name !== undefined && decodeHeader(header("Mcp-Name")) !== name) return fail(-32020, "Header mismatch: Mcp-Name header does not match the body");
  return null;
}

const SCOPES = ["text", "omni", "image", "video", "audio", "tts", "transcribe", "embed", "rerank", "decision"];
const TIERS = ["nano", "light", "core", "high", "max", "ultra"];

const slotOf = (g) => [g.publisher, g.scope, g.tier, g.special, g.access, g.weights, g.size, g.quant].join("|");

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

export const TOOLS = [
  {
    name: "resolve_model_uri",
    description:
      "Resolve a Model URI (e.g. 'model:anthropic/text/core@bedrock', 'model:openai/text/ultra', 'model:alibaba/text/core-open/35b-a3b@local') to the pinned URI, native model ID for the target host, licence, release date, and any operational hints.",
    inputSchema: {
      type: "object",
      properties: {
        uri: { type: "string", description: "Model URI to resolve (with or without :version or @host)." },
      },
      required: ["uri"],
      additionalProperties: false,
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
  {
    name: "lookup_native_model",
    description:
      "Reverse-lookup a native model identifier or name (e.g. 'claude-sonnet-5-5', 'gemini-3.5-flash-lite', 'Qwen/Qwen3.6-35B-A3B') to its canonical Model URI, whether it is still current or superseded (with the replacement URI), or why it is in incompatible.json.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Native model ID, Hugging Face repo, or model name substring." },
        host: { type: "string", description: "Optional host filter (e.g. 'openai', 'bedrock', 'openrouter', 'huggingface')." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
  {
    name: "list_models",
    description:
      "List or filter models in the Model URI registry by publisher, scope, tier, special, access, weights, or host. Useful for finding cross-publisher equivalents on the same rung or open-weights alternatives.",
    inputSchema: {
      type: "object",
      properties: {
        publisher: { type: "string", description: "Filter by publisher slug (e.g. 'anthropic', 'google', 'alibaba')." },
        scope: { type: "string", enum: SCOPES, description: "Filter by output scope." },
        tier: { type: "string", enum: TIERS, description: "Filter by lineup tier (lowest to highest: nano, light, core, high, max, ultra)." },
        special: { type: "string", description: "Filter by registered special suffix (e.g. 'code', 'ocr', 'rt', 'guard')." },
        access: { type: "string", enum: ["restricted", "gov", "internal"], description: "Filter by access suffix." },
        weights: { type: "string", enum: ["open", "weights", "closed"], description: "Filter by weights availability ('open' = OSI-approved, 'weights' = other downloadable, 'closed' = API-only)." },
        host: { type: "string", description: "Filter to models served on this host (e.g. 'bedrock', 'vertex', 'openrouter', 'huggingface', or 'local')." },
        current_only: { type: "boolean", description: "If true (default), return only models currently holding their slot.", default: true },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Maximum number of results (default 50, max 100).", default: 50 },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
  {
    name: "validate_model_uri",
    description:
      "Validate and parse a Model URI against the SPEC.md grammar, rule 8 (@local/@edge require -open or -weights), canonical form rules, and registered publishers/specials/hosts.",
    inputSchema: {
      type: "object",
      properties: {
        uri: { type: "string", description: "Model URI string to validate." },
      },
      required: ["uri"],
      additionalProperties: false,
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
];

export const RESOURCES = [
  {
    uri: "modeluri://specials",
    name: "Registered special suffixes",
    description: "The controlled vocabulary of registered `special` suffixes in registry.json with their definitions.",
    mimeType: "application/json",
  },
  {
    uri: "modeluri://summary",
    name: "Registry summary",
    description: "Registry metadata: spec version, update date, counts, scopes, tiers, registered publishers and hosts.",
    mimeType: "application/json",
  },
];

// The subset of JSON Schema the tool schemas above use: types, enums, integer bounds, no unknown keys.
function checkArgs(schema, args) {
  if (!args || typeof args !== "object" || Array.isArray(args)) return "arguments must be an object";
  for (const [k, v] of Object.entries(args)) {
    const p = schema.properties[k];
    if (!p) return `unknown argument: ${k}`;
    const type = p.type === "integer" ? (Number.isInteger(v) ? "integer" : typeof v) : typeof v;
    if (type !== p.type) return `${k} must be ${p.type === "integer" ? "an integer" : `a ${p.type}`}`;
    if (p.enum && !p.enum.includes(v)) return `${k} must be one of: ${p.enum.join(", ")}`;
    if (p.minimum !== undefined && v < p.minimum) return `${k} must be at least ${p.minimum}`;
    if (p.maximum !== undefined && v > p.maximum) return `${k} must be at most ${p.maximum}`;
  }
  return null;
}

function toolResult(data, isError = false) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    ...(isError && { isError: true }),
  };
}

export function createMcpHandler({ registry, incompatible = { entries: [] }, serverVersion }) {
  const version = serverVersion || registry.spec || "0.2.0";

  // Pre-index registry entries once for fast lookups.
  const indexed = registry.entries.map((entry) => ({ entry, parsed: parse(entry.uri) }));
  const publishers = new Set();
  const hosts = new Set();
  const currentBySlot = new Map();
  const entryByUri = new Map();

  for (const { entry, parsed } of indexed) {
    entryByUri.set(entry.uri, entry);
    if (parsed) {
      publishers.add(parsed.publisher);
      if (entry.current) currentBySlot.set(slotOf(parsed), entry);
    }
    for (const h of Object.keys(entry.native)) hosts.add(h);
  }

  function callTool(name, args = {}) {
    if (name === "resolve_model_uri") {
      if (typeof args.uri !== "string" || !args.uri.trim()) {
        return toolResult({ ok: false, error: "missing required string argument: uri" }, true);
      }
      const res = resolve(registry, args.uri.trim());
      if (!res.ok) return toolResult(res, true);
      const baseUri = res.uri.split("@")[0];
      const entry = entryByUri.get(baseUri) || indexed.find((x) => {
        const g = parse(res.uri);
        return x.parsed && g && slotOf({ ...x.parsed, quant: g.quant }) === slotOf(g) && x.parsed.version === g.version;
      })?.entry;
      return toolResult({
        ...res,
        ...(entry && {
          released: entry.released,
          license: entry.license,
          tier_source: entry.tier_source,
          evidence: entry.evidence,
          current: entry.current,
          available_hosts: Object.keys(entry.native),
        }),
      });
    }

    if (name === "lookup_native_model") {
      if (typeof args.query !== "string" || !args.query.trim()) {
        return toolResult({ ok: false, error: "missing required string argument: query" }, true);
      }
      const q = args.query.trim().toLowerCase();
      const hostFilter = typeof args.host === "string" && args.host.trim() ? args.host.trim().toLowerCase() : null;

      const exact = [];
      const partial = [];
      for (const { entry, parsed } of indexed) {
        const pairs = Object.entries({ ...entry.former_native, ...entry.native }).filter(([h]) => !hostFilter || h === hostFilter);
        const exactHost = pairs.find(([, id]) => id.toLowerCase() === q);
        const partialHost = !exactHost && pairs.find(([, id]) => id.toLowerCase().includes(q));
        const uriMatch = !exactHost && !partialHost && !hostFilter && entry.uri.toLowerCase().includes(q);
        if (!exactHost && !partialHost && !uriMatch) continue;

        const currentInSlot = parsed ? currentBySlot.get(slotOf(parsed)) : null;
        const record = {
          uri: entry.uri,
          current: entry.current,
          ...(entry.current ? {} : currentInSlot ? { superseded_by: currentInSlot.uri } : { superseded_by: null }),
          released: entry.released,
          license: entry.license,
          native: entry.native,
          ...(entry.former_native && { former_native: entry.former_native }),
          evidence: entry.evidence,
        };
        if (exactHost) exact.push(record);
        else partial.push(record);
      }

      const incMatches = (incompatible.entries || []).filter((item) => {
        if (hostFilter && item.publisher !== hostFilter) return false;
        return (
          item.id.toLowerCase().includes(q) ||
          (item.name && item.name.toLowerCase().includes(q))
        );
      });

      const matches = [...exact, ...partial];
      return toolResult({
        query: args.query.trim(),
        registry_matches: matches.slice(0, 20),
        total_registry_matches: matches.length,
        incompatible_matches: incMatches.slice(0, 10),
        total_incompatible_matches: incMatches.length,
      });
    }

    if (name === "list_models") {
      const currentOnly = args.current_only !== false;
      const limit = Math.min(Math.max(Number(args.limit) || 50, 1), 100);
      const targetHost = typeof args.host === "string" && args.host.trim() ? args.host.trim().toLowerCase() : null;
      const hostKey = targetHost && SELF_HOSTED.has(targetHost) ? "huggingface" : targetHost;

      const filtered = [];
      for (const { entry, parsed } of indexed) {
        if (!parsed) continue;
        if (currentOnly && !entry.current) continue;
        if (args.publisher && parsed.publisher !== args.publisher) continue;
        if (args.scope && parsed.scope !== args.scope) continue;
        if (args.tier && parsed.tier !== args.tier) continue;
        if (args.special && parsed.special !== args.special) continue;
        if (args.access && parsed.access !== args.access) continue;
        if (args.weights) {
          if (args.weights === "closed" && parsed.weights) continue;
          if (args.weights !== "closed" && parsed.weights !== args.weights) continue;
        }
        if (targetHost) {
          if (SELF_HOSTED.has(targetHost) && !parsed.weights) continue;
          if (!(hostKey in entry.native)) continue;
        }
        filtered.push({
          uri: entry.uri,
          current: entry.current,
          released: entry.released,
          license: entry.license,
          ...(hostKey ? { native: entry.native[hostKey] } : { hosts: Object.keys(entry.native) }),
        });
      }
      return toolResult({
        total: filtered.length,
        returned: Math.min(filtered.length, limit),
        models: filtered.slice(0, limit),
      });
    }

    if (name === "validate_model_uri") {
      if (typeof args.uri !== "string") {
        return toolResult({ valid: false, errors: ["uri must be a string"] }, true);
      }
      const input = args.uri.trim();
      const shown = input.length > 128 ? `${input.slice(0, 64)}…` : input;
      const errors = [];
      const warnings = [];
      if (input.length > 128) errors.push(`exceeds 128-character limit (${input.length} chars)`);
      const m = URI_RE.exec(input);
      if (!m) {
        errors.push("does not match the Model URI reference grammar (SPEC.md section 2)");
        return toolResult({ valid: false, uri: shown, errors, warnings });
      }
      const raw = { ...m.groups };
      if (SELF_HOSTED.has(raw.host) && !raw.weights) {
        errors.push(`closed model cannot be self-hosted: @${raw.host} requires -open or -weights (SPEC.md rule 8)`);
        return toolResult({ valid: false, uri: shown, errors, warnings });
      }
      if (raw.version === "latest") {
        warnings.push("':latest' is accepted but non-canonical; omit the version to mean the current model (SPEC.md section 3.6)");
      }
      if (!publishers.has(raw.publisher)) {
        warnings.push(`unregistered publisher: ${raw.publisher}`);
      }
      if (raw.special && registry.specials && !(raw.special in registry.specials)) {
        warnings.push(`unregistered special: ${raw.special}`);
      }
      if (raw.host && !SELF_HOSTED.has(raw.host) && !hosts.has(raw.host)) {
        warnings.push(`unregistered host: ${raw.host}`);
      }
      const parsed = parse(input);
      const canonical =
        `model:${parsed.publisher}/${parsed.scope}/${parsed.tier}` +
        (parsed.special ? `-${parsed.special}` : "") +
        (parsed.access ? `-${parsed.access}` : "") +
        (parsed.weights ? `-${parsed.weights}` : "") +
        (parsed.size ? `/${parsed.size}` : "") +
        (parsed.quant ? `/${parsed.quant}` : "") +
        (parsed.version ? `:${parsed.version}` : "") +
        (parsed.author ? `~${parsed.author}-${parsed.kind}` : "") +
        (parsed.host && parsed.host !== parsed.publisher ? `@${parsed.host}` : "");

      if (raw.host && raw.host === raw.publisher) {
        warnings.push(`'@${raw.host}' is redundant; omitting @host means the publisher's own API (SPEC.md rule 6)`);
      }

      return toolResult({
        valid: true,
        canonical,
        is_canonical: canonical === input,
        parsed: Object.fromEntries(Object.entries(parsed).filter(([, v]) => v !== undefined)),
        warnings,
        errors,
      });
    }

    return null;
  }

  function readResource(uri) {
    if (uri === "modeluri://specials") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(registry.specials || {}, null, 2),
          },
        ],
      };
    }
    if (uri === "modeluri://summary") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(
              {
                spec: registry.spec,
                updated: registry.updated,
                license: registry.license,
                counts: {
                  registry_entries: registry.entries.length,
                  current_slots: currentBySlot.size,
                  publishers: publishers.size,
                  hosts: hosts.size,
                  specials: Object.keys(registry.specials || {}).length,
                  incompatible_entries: (incompatible.entries || []).length,
                },
                scopes: SCOPES,
                tiers: TIERS,
                publishers: [...publishers].sort(),
                hosts: [...hosts].sort(),
              },
              null,
              2,
            ),
          },
        ],
      };
    }
    return null;
  }

  function handleJsonRpc(msg) {
    if (!msg || typeof msg !== "object" || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
      return {
        jsonrpc: "2.0",
        id: msg?.id ?? null,
        error: { code: -32600, message: "Invalid Request" },
      };
    }

    const isNotification = !("id" in msg) || msg.id === undefined;
    const requested = msg.params?._meta?.[`${META}protocolVersion`];
    const stateless = requested === STATELESS_PROTOCOL || msg.method === "server/discover";
    const err = (code, message, data) => (isNotification ? null : { jsonrpc: "2.0", id: msg.id, error: { code, message, ...(data && { data }) } });
    if (requested !== undefined && !SUPPORTED_PROTOCOLS.includes(requested)) {
      return err(-32022, "Unsupported protocol version", { supported: SUPPORTED_PROTOCOLS, requested });
    }
    const serverInfo = { name: "modeluri", version };
    const ok = (result) => {
      if (isNotification) return null;
      if (stateless) {
        // The registry changes only on deploy and holds no per-user data.
        result = { resultType: "complete", ...result, ...(CACHEABLE.has(msg.method) && { ttlMs: 3600000, cacheScope: "public" }), _meta: { [`${META}serverInfo`]: serverInfo } };
      }
      return { jsonrpc: "2.0", id: msg.id, result };
    };

    switch (msg.method) {
      case "server/discover":
        return ok({ supportedVersions: SUPPORTED_PROTOCOLS, capabilities: { tools: {}, resources: {} }, instructions: INSTRUCTIONS });
      case "initialize": {
        const clientProto = msg.params?.protocolVersion;
        const protocolVersion = INITIALIZE_PROTOCOLS.includes(clientProto) ? clientProto : INITIALIZE_PROTOCOLS[0];
        return ok({
          protocolVersion,
          capabilities: { tools: {}, resources: {} },
          serverInfo,
          instructions: INSTRUCTIONS,
        });
      }
      case "notifications/initialized":
      case "notifications/cancelled":
        return null;
      case "ping":
        return ok({});
      case "tools/list":
        return ok({ tools: TOOLS });
      case "tools/call": {
        const name = msg.params?.name;
        const tool = TOOLS.find((t) => t.name === name);
        if (!tool) return err(-32602, `Unknown tool: ${name}`);
        const args = msg.params?.arguments ?? {};
        const invalid = checkArgs(tool.inputSchema, args);
        if (invalid) return ok(toolResult({ ok: false, error: invalid }, true));
        const result = callTool(name, args);
        return ok(result);
      }
      case "resources/list":
        return ok({ resources: RESOURCES });
      case "resources/read": {
        const uri = msg.params?.uri;
        const result = readResource(uri);
        // 2026-07-28 replaced -32002 with -32602.
        if (!result) return err(stateless ? -32602 : -32002, `Resource not found: ${uri}`);
        return ok(result);
      }
      default:
        return err(-32601, `Method not found: ${msg.method}`);
    }
  }

  return { handleJsonRpc };
}
