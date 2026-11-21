# Model URI

A sane, canonical URI for any AI model, and a moratorium on opaque model names.

```text
model:anthropic/text/core:5.5@bedrock
```

- Site: <https://modeluri.org>
- Specification: [SPEC.md](SPEC.md), working draft 0.2.0
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

`node cli/model-uri.mjs aliases --format litellm` prints a [LiteLLM](https://docs.litellm.ai) proxy `model_list` that makes every model URI in the registry usable as a model name. The generated file is [`aliases/litellm.yaml`](aliases/litellm.yaml). It covers the publishers' own APIs only, and it was checked with LiteLLM 1.110.2 (proxy and `Router`, backend mocked: names with `:` and `/` load and route, calls to the real APIs were not made).

The registry is a first seed: tiers are assigned by the rule in SPEC.md section 3.2 from the [models.dev](https://models.dev) catalogue, and none is declared by a publisher.

## Sign

The moratorium is an appeal. By signing, developers ask publishers, routers, gateways and inference engines to adopt the four commitments listed on the [site](https://modeluri.org), and adopt model URIs in their own configuration files and documentation, with the native name as a fallback until both sides support them.

To sign, add one line to [SIGNATORIES.md](SIGNATORIES.md) and open a pull request.

## Object

Open an [issue](https://github.com/modeluri/spec/issues). The most useful ones are:

- a real model the grammar cannot express;
- two real models that collide on the same model URI;
- a tier the price-list rule gets wrong.

## Repository layout

| Path | Content |
| --- | --- |
| `SPEC.md` | The specification |
| `registry.json` | The public registry of model URIs |
| `incompatible.json` | Catalogue models that do not fit the standard, with reasons |
| `cli/` | The resolver (`model-uri.mjs`) and its tests: `node --test cli/` |
| `tools/` | Builds `registry.json` and `incompatible.json` from the models.dev catalogue |
| `aliases/` | Gateway alias files generated from the registry |
| `SIGNATORIES.md` | People and organisations who signed |

## Licence

- Specification (`SPEC.md`): [CC BY 4.0](LICENSE).
- Registry (`registry.json`, `incompatible.json`, `tools/classification.mjs`) and generated alias files (`aliases/`): dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- Code (`cli/`, `tools/*.mjs` except `tools/classification.mjs`) and code snippets in the specification: [MIT](LICENSE-CODE).

## Citation

Cite the version you read. [`CITATION.cff`](CITATION.cff) has the metadata, and the "Cite this repository" button on GitHub turns it into BibTeX or APA.

Initiated by [Franz Mozzi](https://franzmozzi.github.io/) ([ORCID 0009-0000-5937-0899](https://orcid.org/0009-0000-5937-0899)).
