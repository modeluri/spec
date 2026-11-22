#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Local stdio MCP server for Model URI (zero external dependencies).
// Usage: node cli/mcp.mjs [--registry <file>] [--incompatible <file>]
import { readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { createMcpHandler } from "./mcp-core.mjs";

const args = process.argv.slice(2);
const take = (flag) => {
  const i = args.indexOf(flag);
  return i < 0 ? null : args.splice(i, 2)[1];
};

const regPath = take("--registry") ?? new URL("../registry.json", import.meta.url);
const incPath = take("--incompatible") ?? new URL("../incompatible.json", import.meta.url);

const [registry, incompatible] = await Promise.all([
  readFile(regPath, "utf8").then(JSON.parse),
  readFile(incPath, "utf8").then(JSON.parse).catch(() => ({ entries: [] })),
]);

const { handleJsonRpc } = createMcpHandler({ registry, incompatible });

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }) + "\n");
    return;
  }
  const reply = Array.isArray(parsed)
    ? parsed.map(handleJsonRpc).filter(Boolean)
    : handleJsonRpc(parsed);
  if (reply && (!Array.isArray(reply) || reply.length > 0)) {
    process.stdout.write(JSON.stringify(reply) + "\n");
  }
});
