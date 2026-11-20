# Sane Model URI

Working draft 0.1, 20 November 2026

A sane, canonical URI for any AI model.

This is a working draft. Everything here can change. Objections and edge cases are welcome as [issues](https://github.com/sanemodeluri/spec/issues).

## 1. Purpose

A model URI says what role a model plays in its publisher's lineup, who may use it and where it runs, in words that mean the same thing at every publisher. Change the publisher, keep the rest, and you get that publisher's equivalent model.

```text
model:openai/text/core
model:google/text/core
model:anthropic/text/core
```

Each line is that publisher's everyday default, today and after the next launch.

This is a proposal to publishers. It asks them to adopt one shared scale and a few rules, so that developers stop learning a new set of names with every release. The work moves to the publishers; developers only have to read.

Design principles:

1. **Portable across publishers.** The same tier means the same role at every publisher.
2. **No effort for the common case.** Without a version, a model URI always points to the current model on that rung.
3. **Verifiable facts only.** Every part can be checked against the publisher's declaration, a price list, a model card or a weights file. Opinions about quality stay out.
4. **Alongside, not instead.** Commercial names stay. The model URI lives in APIs, configuration files, model cards and logs.
5. **The model is separate from where it runs.** Who made the weights and who serves them are two different facts.
6. **Readable by eye, parseable with one regex.**

Non-goals:

- It is not a benchmark. Two models on the same rung play the same role; they do not give the same results.
- It identifies and does not locate. A model URI is not a URL and does not download a model.
- It does not describe context window, input modalities, prices or request parameters. That data belongs in the registry.

## 2. Syntax

A model URI has the fixed scheme `model:`, three required parts and eight optional ones.

```text
model:publisher/scope/tier[-special][-access][-weights][/size][/quant][:version][~derivation][@host]
```

Grammar:

```text
model-uri  = "model:" publisher "/" scope "/" tier
             [ "-" special ] [ "-" access ] [ "-" weights ]
             [ "/" size ] [ "/" quant ]
             [ ":" version ] [ "~" derivation ] [ "@" host ]
publisher  = LOWER *( LOWER / DIGIT / "-" )
scope      = "text" / "omni" / "image" / "video" / "audio" / "embed" / "rerank"
tier       = "nano" / "light" / "core" / "high" / "ultra" / "max"
special    = "code" / "rt" / "base"
access     = "restricted" / "gov" / "internal"
weights    = "weights" / "open"
size       = params [ "-a" params ]        ; total, then active: 35b-a3b
params     = 1*DIGIT [ "." 1*DIGIT ] ( "m" / "b" )
quant      = 1*LOWER 1*DIGIT *( LOWER / DIGIT )   ; q4, q8, fp8, fp16, mxfp4, int4
version    = "latest" / 1*( LOWER / DIGIT / "." )
derivation = author "-" kind
author     = LOWER *( LOWER / DIGIT / "-" )
kind       = "abliterated" / "ft" / "merge" / "distill"
host       = LOWER *( LOWER / DIGIT )      ; "local", "edge" or a registered host
```

Reference regex:

```text
^model:(?<publisher>[a-z][a-z0-9-]*)/(?<scope>text|omni|image|video|audio|embed|rerank)/(?<tier>nano|light|core|high|ultra|max)(?:-(?<special>code|rt|base))?(?:-(?<access>restricted|gov|internal))?(?:-(?<weights>weights|open))?(?:/(?<size>\d+(?:\.\d+)?[mb](?:-a\d+(?:\.\d+)?[mb])?))?(?:/(?<quant>[a-z]+\d+[a-z0-9]*))?(?::(?<version>latest|[a-z0-9.]+))?(?:~(?<author>[a-z][a-z0-9-]*)-(?<kind>abliterated|ft|merge|distill))?(?:@(?<host>[a-z][a-z0-9]*))?$
```

Under RFC 3986 a model URI has the scheme `model`, no authority and a rootless path. The form `model://` is not a model URI.

Lowercase ASCII only, 128 characters at most. After the scheme, the separators `/`, `:`, `~` and `@` never appear inside a part, so parsing is unambiguous.

## 3. Components

| Part | Question it answers | Values | Decided by |
| --- | --- | --- | --- |
| `publisher` | Who made the model? | A registered name: `anthropic`, `google`, `qwen` | Registry |
| `scope` | What does it produce? | `text`, `omni`, `image`, `video`, `audio`, `embed`, `rerank` | Specification |
| `tier` | Which role in the lineup? | `nano`, `light`, `core`, `high`, `ultra`, `max` | Publisher, otherwise registry |
| `special` | What is it published for? | `code`, `rt`, `base`; absent means general use | Publisher |
| `access` | Who may use it? | `restricted`, `gov`, `internal`; absent means anyone | Publisher |
| `weights` | Can the weights be downloaded, under which kind of licence? | `weights`, `open`; absent means closed | The licence |
| `size` | How big is it? | Total parameters, plus active ones for MoE: `35b-a3b` | Publisher |
| `quant` | At what precision does it run? | `q4`, `q8`, `fp8`, `mxfp4`; absent means as published | Whoever runs it |
| `version` | Which release? | Absent means the current model; otherwise the publisher's release number | Publisher |
| `derivation` | Did a third party modify it, and how? | Author and kind: `huihui-abliterated` | Whoever derived it |
| `host` | Where does it run? | `local`, `edge`, or a registered host; absent means the publisher's API | Whoever deploys |

### 3.1 Scope

The primary output decides the scope. `text` covers every language model, whatever inputs it accepts. `omni` is only for native input and output across several modalities.

### 3.2 Tier

The tier is a role in the lineup, on one scale shared by every publisher.

| Tier | Role |
| --- | --- |
| `nano` | The smallest and cheapest, for simple high-volume tasks |
| `light` | Fast and inexpensive |
| `core` | The publisher's everyday default |
| `high` | A step above the default, for harder work |
| `ultra` | Just below the flagship |
| `max` | The publisher's flagship |

`core` and `max` anchor the scale. The other rungs may stay empty.

A publisher that adopts the standard:

- declares the tier of every model at release;
- keeps at most one generally available model per rung, scope and combination of suffixes, so that a new model on an occupied rung replaces the previous one;
- fits its lineup to the scale, and not the other way round. A lineup that needs more than six rungs in one scope is too crowded to be understood.

For a publisher that has not adopted it, the registry assigns the tier: `core` is the model the publisher presents as its everyday default, `max` is its flagship, and the others are placed by list price of output tokens, filling first the rungs closest to `core`. Where there is no price list, parameter count is used. When two models cost the same, the publisher's own description decides.

**Same rung, same role.** Moving from `model:openai/text/core` to `model:google/text/core` gives you the other publisher's everyday default. Quality, price and behaviour still differ, and the registry records them.

The tier is a role and nothing else. Who may use a model and how it is licensed are separate parts.

### 3.3 Suffixes: special, access, weights

After the tier come up to three suffixes. Each belongs to a closed family, answers one question and has a fixed position: `special`, then `access`, then `weights`. A parser returns them as three separate fields.

**Special: what is it published for?**

- `code`: published as specialised for code.
- `rt`: real-time speech input and output.
- `base`: pre-trained weights without instruction tuning.

**Access: who may use it?**

- `restricted`: granted to selected operators only.
- `gov`: an edition that only government bodies may use.
- `internal`: used inside the publisher, not released.

A model with no access suffix is available to anyone who can pay for it or download it.

**Weights: can they be downloaded, and under which kind of licence?**

- `weights`: downloadable, under a licence that restricts use, such as non-commercial terms or the publisher's own conditions.
- `open`: downloadable, under a licence approved by the Open Source Initiative, such as Apache 2.0 or MIT.

A model with no weights suffix is closed and reachable through an API only. The suffix is mandatory whenever it applies. The exact licence goes in the registry.

Extended reasoning is a request parameter in most APIs, and vision input is registry data. Neither is part of the identifier.

### 3.4 Size

The size is the parameter count, and it is optional. It is used where one release ships in several sizes and the tier alone cannot tell them apart.

- A size without `-a` is a dense model: `32b`.
- A size with `-a` is a mixture of experts, total then active: `35b-a3b`.

Architecture is therefore read from the size. There is no `moe` or `dense` suffix.

### 3.5 Quant

The quantisation is a property of the weights being run, not of the place where they run. It is omitted when the weights run at the precision the publisher released.

It applies to any host. `model:qwen/text/core-open/35b-a3b/fp8:3.6@somehost` says that a hosting provider serves quantised weights.

### 3.6 Version

The version is optional.

- **Without a version**, a model URI points to the current model on that rung and follows it when the publisher replaces it. This is the form for configuration files and code. `:latest` means the same and is accepted, but the canonical form leaves it out.
- **With a version**, it points to one release. The version is the publisher's own release number, as the publisher writes it, and never contains size or quantisation. This is the form for logs, benchmarks and publications.

A publisher that adopts the standard never changes the model a pinned version points to. An updated model needs a new version.

### 3.7 Derivation

A derivation marks weights modified by someone other than the publisher. The publisher stays the author of the original weights, and the tier is the one of the base model.

- `abliterated`: the refusal direction was removed from the weights.
- `ft`: fine-tuned.
- `merge`: merged with other weights.
- `distill`: distilled from the base model.

Labels such as "uncensored" are not accepted, because they do not name a verifiable technique. Such a model is classified by how it was made.

### 3.8 Host

When the host is missing, the model runs on the publisher's own API. `local` and `edge` mean self-hosted inference. Other hosts are registered names: `bedrock`, `vertex`, `azure`.

An environment with compliance requirements is a host of its own, for example `azuregov`. That is different from the `gov` access suffix: the host says where an ordinary model runs, the suffix says the edition itself is reserved.

## 4. Rules

1. **One rung, one model.** For a publisher that adopts the standard, a model URI without a version points to exactly one model at any time, and one with a version points to exactly one release forever.
2. **Pinned versions never change.** An updated model gets a new version. Silent updates under an existing version are not allowed.
3. **Frozen tier.** A pinned model URI keeps the tier of its release forever. Logs, configurations and benchmarks do not break.
4. **No version means the current model.** With size and quantisation, it follows both: `model:qwen/text/core-open/35b-a3b/mxfp4@local` is the newest release with those parameters at that precision, and it stays where it is if the next generation drops that size. A resolver always reports the pinned model URI it resolved to, and says so when a sized alias has stopped moving.
5. **Same rung, same role.** Changing the publisher keeps the role, not the results.
6. **Canonical form.** All lowercase, scheme `model:` always present, suffixes in the fixed order `special`, `access`, `weights`, version left out when it means the current model, host left out when it is the publisher's own API.
7. **Unknown values.** A parser rejects scopes, tiers and suffixes it does not know. It accepts hosts that are syntactically valid but unregistered, and flags them.

## 5. Registry

The registry covers what the identifier leaves out: the native name to call, the licence, and the tiers of publishers that have not adopted the standard. It is the file [`registry.json`](registry.json) in this repository, changed through pull requests.

Each entry holds:

- `uri`: the pinned model URI.
- `native`: the real identifier for each host, for example the string passed to the API.
- `released`: the release date.
- `license`: the SPDX identifier of the licence, or the name of the publisher's own terms. It justifies the `weights` suffix.
- `tier_source`: `publisher` if the tier is declared, `registry` if it is assigned with the rule in section 3.2.
- `evidence`: a link to the price list, model card or announcement that justifies the tier.

Example entry:

```json
{
  "uri": "model:example/text/core:2.0",
  "native": { "example": "example-standard-2-0", "bedrock": "example.standard-2-0-v1" },
  "released": "2026-01-15",
  "license": "proprietary",
  "tier_source": "registry",
  "evidence": "https://example.com/pricing"
}
```

Governance:

- A tier assigned by the registry without `evidence` is not accepted.
- A publisher can always replace a registry-assigned tier with its own. This applies to future releases only.
- The lists of scopes, tiers and suffixes are closed and part of the specification. Hosts are registered names.
- Adding a value takes an issue and a new minor version.
- The specification follows semantic versioning and stays `0.x` while it is a draft.

Seed data should not be compiled by hand. Open catalogues such as [models.dev](https://github.com/sst/models.dev) already hold native identifiers, prices and capabilities. The registry adds only the classification on top.

## 6. Security considerations

A model URI identifies and does not locate: by itself it triggers no network access and no code execution. The risks are in resolution and in how the string is used.

| Risk | What happens | Mitigation |
| --- | --- | --- |
| Tampered registry or resolver | A model URI resolves to a different model than expected | Read the registry over HTTPS from a pinned version; changes only through reviewed pull requests |
| Model URI without a version | The model changes while the configuration does not | Pin the version where results must be reproducible; the resolver always reports the pinned model URI it used |
| Imitated publisher | A name close to a known one, for example a digit in place of a letter | Registered publisher names; parsers flag unregistered ones; lowercase ASCII only, so no Unicode homographs |
| Unverifiable deployment | Quantisation and host are claims by whoever deploys, not proofs | A model URI does not attest the integrity of weights; use hashes or a purl with a commit for that |
| String used in logs, paths and URLs | Unexpected characters reach sensitive contexts | Always validate with the regex before use; closed character set and a 128-character limit |

A model URI contains no personal data.

## 7. Relation to existing identifiers

Existing identifiers say which model it is, but to know its role you still need to know the commercial name, and to switch publisher you need a new one. Sane Model URI adds only that, and relies on them for everything else.

| System | Form | What it solves | What it leaves open |
| --- | --- | --- | --- |
| [OpenRouter](https://openrouter.ai/docs/guides/routing/model-variants/overview) | `author/slug[:variant]` | Unique, resolvable ID; suffixes control routing and pricing | The slug is the commercial name |
| [Hugging Face](https://huggingface.co/docs/huggingface_hub/en/package_reference/hf_uris) | `hf://org/model@revision` | Locates a repository and a revision | The name is free-form |
| [purl](https://github.com/package-url/purl-spec) | `pkg:huggingface/org/model@commit` | Identity for software inventories and SBOMs | No classification |
| Ollama | `model:tag` | Size and quantisation in the tag | Informal convention, commercial name |
| MLflow | `models:/name/version` | Points into a model registry | Unregistered scheme, local to one registry |
| [models.dev](https://github.com/sst/models.dev) | `provider/model` plus metadata | A catalogue of prices, limits and capabilities | A database, not a naming scheme |

The `native` field of the registry points to these identifiers. A model URI always translates into one of them.

## 8. Examples

Tiers are assigned with the registry rule from the publishers' own descriptions and price lists as of 20 November 2026. No publisher has declared them.

| Model | Model URI | What it shows |
| --- | --- | --- |
| GPT-6.2 Astra | `model:openai/text/max:6.2` | "Our most capable model": the flagship |
| GPT-6.2 Sol | `model:openai/text/core:6.2` | "Our go-to model for everyday work": the default |
| GPT-6.1 Terra | `model:openai/text/light:6.1` | |
| GPT-6 Luna | `model:openai/text/nano:6` | `high` and `ultra` stay empty |
| Gemini 4 Carbon | `model:google/text/max:4` | "Our strongest reasoning model" |
| Gemini 4 Argon | `model:google/text/ultra:4` | |
| Gemini 4 Neon | `model:google/text/high:4` | Three Gemini 4 models share version `4`; the tier keeps them apart |
| Gemini 4 Hydrogen | `model:google/text/core:4` | Built "for everyday coding and agentic workflows" |
| Claude Haiku 5.5 | `model:anthropic/text/light:5.5` | |
| Claude Sonnet 5.5 | `model:anthropic/text/core:5.5` | |
| Claude Opus 5.5 | `model:anthropic/text/high:5.5` | The rung closest to `core` is filled first |
| Claude Fable 5.2 | `model:anthropic/text/max:5.2` | |
| Claude Mythos 5.2 | `model:anthropic/text/max-restricted:5.2` | Same rung, selected operators only |
| Claude Sonnet 5.5 on Bedrock | `model:anthropic/text/core:5.5@bedrock` | Publisher and host are separate |
| A government-only edition | `model:example/text/core-gov:2.0` | Access reserved to government bodies |
| A model used inside its publisher | `model:example/text/max-internal:3.0` | Not released |
| Mistral Codestral, current | `model:mistral/text/core-code` | Specialisation, no version |
| Qwen 3.6 MoE, 35B total, 3B active, MXFP4 | `model:qwen/text/core-open/35b-a3b/mxfp4:3.6@local` | Open licence, size, precision, version and host, each on its own |
| The newest Qwen at that size and precision | `model:qwen/text/core-open/35b-a3b/mxfp4@local` | Follows new releases and keeps the hardware footprint |
| The same model, abliterated by a third party | `model:qwen/text/core-open/35b-a3b/q4:3.6~huihui-abliterated@local` | Derivation |
| Gemma 4, 26B total, 4B active, Q4 | `model:google/text/core-weights/26b-a4b/q4:4@local` | Downloadable under the publisher's own terms |
| Whisper large-v3, FP16 | `model:openai/audio/high-open/fp16:3@local` | A scope other than `text` |
| BGE-M3 | `model:baai/embed/core-open:m3@local` | Non-numeric version |

The `weights` and `open` suffixes follow the licences as commonly reported and must be checked against each model card.

### Switching publisher

| Role | OpenAI | Google | Anthropic |
| --- | --- | --- | --- |
| Flagship | `model:openai/text/max` | `model:google/text/max` | `model:anthropic/text/max` |
| Everyday default | `model:openai/text/core` | `model:google/text/core` | `model:anthropic/text/core` |
| Fast and inexpensive | `model:openai/text/light` | `model:google/text/light` | `model:anthropic/text/light` |

Google has no `light` model in its current Gemini 4 lineup, so a resolver reports that the rung is empty instead of guessing.

## 9. The `model` scheme

The scheme `model` is not in the [IANA registry of URI schemes](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml) as of its update of 17 November 2026. A provisional registration under [RFC 7595](https://www.rfc-editor.org/rfc/rfc7595.html) will be requested.

RFC 7595 recommends avoiding very general scheme names. The name `model` is general by design. The scheme identifies AI models of any publisher and any modality, not a product or a protocol, so a coined or branded name would reintroduce the opacity this specification exists to remove.

## 10. Open questions

- Are six rungs enough, and are `high` and `max` acceptable names when at least one publisher also uses them as levels of reasoning effort?
- Should an empty rung fall back to the nearest filled one, or always be reported as empty?
- Are the `weights` and `open` suffixes enough to separate the closed and downloadable families of one publisher, or does the syntax need a "family" part?
- Tier of open-weights models: role within the publisher's family, or fixed bands by parameter count?
- Third-party quantisations: whoever quantised the weights does not appear. Should it?
- Is the list of derivation kinds complete, and how are chained derivations written?
- Access: should research previews have their own value?
- Licences for the specification and the registry.
