# Model URI

A sane, canonical URI for any AI model, and a moratorium on opaque model names.

```text
model:anthropic/text/core:5.5@bedrock
```

- Site: <https://modeluri.org>
- MCP server (remote, no auth): `https://modeluri.org/mcp`
- Updates: [@modeluri](https://x.com/modeluri) on X
- Specification: [SPEC.md](SPEC.md), working draft 0.3.0
- Signatories: [SIGNATORIES.md](SIGNATORIES.md)
- Registry: [registry.json](registry.json)
- Incompatible models: [incompatible.json](incompatible.json)

## Try it

Needs Node 18 or later (or Bun), nothing to install.

```text
$ node cli/model-uri.mjs model:anthropic/text/core@bedrock
model:anthropic/text/core:5.5@bedrock
anthropic.claude-sonnet-5-5
note: bedrock-runtime needs a geographic or global inference profile in front of this id (us., eu., global.); the bare id works on bedrock-mantle only.
```

For self-hosted inference, `@local` returns the repository of the published weights:

```text
$ node cli/model-uri.mjs model:baai/embed/core-open:m3@local
model:baai/embed/core-open:m3@local
BAAI/bge-m3
```

`node cli/model-uri.mjs aliases --format litellm` prints a [LiteLLM](https://docs.litellm.ai) proxy `model_list` that makes every model URI in the registry usable as a model name. The generated file is [`aliases/litellm.yaml`](aliases/litellm.yaml). It covers the publishers' own APIs only, and it was checked with LiteLLM 1.110.2 (proxy and `Router`, backend mocked: names with `:` and `/` load and route, calls to the real APIs were not made).

The registry is a first seed: tiers are assigned by the rule in SPEC.md section 3.2 from the [models.dev](https://models.dev) catalogue, and none is declared by a publisher.

`registry.json` and `incompatible.json` are generated: edit `tools/classification.mjs` (and `tools/supplement.json` for published models absent from `models.dev`), then run `node tools/build-registry.mjs`, which builds from the models.dev snapshot committed in `tools/snapshot/` plus `tools/supplement.json` (`--fetch` refreshes the snapshot from the live catalogue, `--catalog <catalog.json>` uses another file). The build fails on invalid or unpinned URIs, missing evidence, licences that contradict the `-open` / `-weights` suffix, entries left with no host and no `former_native`, upstream duplicates in `tools/supplement.json`, and two current models in one slot. CI runs the tests on every push and pull request, rebuilds the registry from the snapshot and fails when the committed files differ.

## MCP server

Read-only [Model Context Protocol](https://modelcontextprotocol.io/) tools (`resolve_model_uri`, `lookup_native_model`, `list_models`, `validate_model_uri`) and resources (`modeluri://specials`, `modeluri://summary`) so coding agents resolve current native IDs instead of guessing from stale training data.

- **Remote (Streamable HTTP, no auth):** `https://modeluri.org/mcp`
- **Local (stdio, offline):** `node cli/mcp.mjs`
- **In-browser (WebMCP):** registered automatically on [modeluri.org](https://modeluri.org) via `navigator.modelContext`

Both servers speak protocol versions 2024-11-05 to 2025-11-25 through `initialize`, and the stateless 2026-07-28 revision (`server/discover`, version in each request's `_meta`); the remote one also checks the `MCP-Protocol-Version`, `Mcp-Method` and `Mcp-Name` headers that 2026-07-28 requires.

```json
{
  "mcpServers": {
    "modeluri": {
      "url": "https://modeluri.org/mcp"
    }
  }
}
```

## Sign

The moratorium is an appeal. By signing, developers ask publishers, routers, gateways and inference engines to adopt the four commitments listed on the [site](https://modeluri.org/#moratorium), and adopt model URIs in their own configuration files and documentation, with the native name as a fallback until both sides support them.

To sign, add one line to [SIGNATORIES.md](SIGNATORIES.md) and open a pull request.

## Object

Open an [issue](https://github.com/modeluri/spec/issues). The most useful ones are:

- a real model the grammar cannot express;
- two real models that collide on the same model URI;
- a tier the price-list rule gets wrong;
- a model in `incompatible.json` that does fit, or a registry entry that should not be there.

## Repository layout

| Path | Content |
| --- | --- |
| `SPEC.md` | The specification |
| `registry.json` | The public registry of model URIs |
| `incompatible.json` | Catalogue models that do not fit the standard, with reasons |
| `cli/` | The resolver (`model-uri.mjs`), MCP server (`mcp.mjs`, `mcp-core.mjs`) and tests: `node --test cli/` |
| `tools/` | The classification table (`classification.mjs`), local supplement (`supplement.json`) and the build that turns them into `registry.json` and `incompatible.json` |
| `tools/snapshot/` | The models.dev catalogue snapshot the build reads, with its date (`meta.json`) and licence |
| `.github/workflows/` | CI: tests and a reproducible rebuild of the generated files |
| `aliases/` | Gateway alias files generated from the registry |
| `SIGNATORIES.md` | People and organisations who signed |

## Licence

- Specification (`SPEC.md`): [CC BY 4.0](LICENSE).
- Registry (`registry.json`, `incompatible.json`, `tools/classification.mjs`) and generated alias files (`aliases/`): dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- Code (`cli/`, `tools/*.mjs` except `tools/classification.mjs`) and code snippets in the specification: [MIT](LICENSE-CODE).
- models.dev snapshot (`tools/snapshot/catalog.json`): a copy of the [models.dev](https://github.com/anomalyco/models.dev) catalogue under its [MIT licence](tools/snapshot/LICENSE-models.dev).

## Citation

Cite the version you read. [`CITATION.cff`](CITATION.cff) has the metadata, and the "Cite this repository" button on GitHub turns it into BibTeX or APA.

Initiated by [Franz Mozzi](https://franzmozzi.github.io/) ([ORCID 0009-0000-5937-0899](https://orcid.org/0009-0000-5937-0899)).
