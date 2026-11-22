# Model URI

Working draft 0.2.0, 22 November 2026

A sane, canonical URI for any AI model.

This is a working draft. Everything here can change. Objections and edge cases are welcome as [issues](https://github.com/modeluri/spec/issues).

## 1. Purpose

A model URI says what role a model plays in its publisher's lineup, who may use it, how it is licensed and where it runs, in words that mean the same thing at every publisher. Change the publisher, keep the rest, and you get that publisher's equivalent model.

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
scope      = "text" / "omni" / "image" / "video" / "audio" / "tts" / "transcribe" / "embed" / "rerank" / "decision"
tier       = "nano" / "light" / "core" / "high" / "max" / "ultra"
special    = 1*LOWER                       ; registered in the registry, not an access or weights keyword
access     = "restricted" / "gov" / "internal"
weights    = "weights" / "open"
size       = params [ "-a" params ]        ; total, then active: 35b-a3b
params     = 1*DIGIT [ "." 1*DIGIT ] ( "m" / "b" / "t" )
quant      = 1*LOWER 1*DIGIT *( LOWER / DIGIT )   ; q4, q8, fp8, fp16, mxfp4, int4
version    = "latest" / 1*( LOWER / DIGIT / "." )
derivation = author "-" kind
author     = LOWER *( LOWER / DIGIT / "-" )
kind       = "abliterated" / "ft" / "merge" / "distill"
host       = LOWER *( LOWER / DIGIT )      ; "local", "edge" or a registered host
```

A size always starts with a digit and a quantisation always starts with a letter, so a parser tells them apart without a vocabulary, also when only one of the two is present.

Reference regex:

```text
^model:(?<publisher>[a-z][a-z0-9-]*)/(?<scope>text|omni|image|video|audio|tts|transcribe|embed|rerank|decision)/(?<tier>nano|light|core|high|max|ultra)(?:-(?<special>(?!(?:restricted|gov|internal|weights|open)(?=[-/:~@]|$))[a-z]+))?(?:-(?<access>restricted|gov|internal))?(?:-(?<weights>weights|open))?(?:/(?<size>\d+(?:\.\d+)?[mbt](?:-a\d+(?:\.\d+)?[mbt])?))?(?:/(?<quant>[a-z]+\d+[a-z0-9]*))?(?::(?<version>latest|[a-z0-9.]+))?(?:~(?<author>[a-z][a-z0-9-]*)-(?<kind>abliterated|ft|merge|distill))?(?:@(?<host>[a-z][a-z0-9]*))?$
```

Under RFC 3986 a model URI has the scheme `model`, no authority and a rootless path. The form `model://` is not a model URI.

Lowercase ASCII only, 128 characters at most. One rule sits outside the regex: `local` and `edge` hosts need a `weights` suffix (section 4, rule 8). After the scheme, the separators `/`, `:`, `~` and `@` never appear inside a part, so parsing is unambiguous.

## 3. Components

| Part | Question it answers | Values | Decided by |
| --- | --- | --- | --- |
| `publisher` | Who made the model? | A registered organisation name: `anthropic`, `google`, `alibaba` | Registry |
| `scope` | What does it produce? | `text`, `omni`, `image`, `video`, `audio`, `tts`, `transcribe`, `embed`, `rerank`, `decision` | Specification |
| `tier` | Which role in the lineup? | `nano`, `light`, `core`, `high`, `max`, `ultra` | Publisher, otherwise registry |
| `special` | What is it published for? | A registered specialisation: `code`, `rt`, `base`, `guard`, `ocr`, `translate`, `research`, `gui`, `robotics`, `roleplay`, `medical`, `finance`, `legal`, `voiceclone`, `voicedesign`; absent means general use | Registry |
| `access` | Who may use it? | `restricted`, `gov`, `internal`; absent means anyone | Publisher |
| `weights` | Can the weights be downloaded, under which kind of licence? | `weights`, `open`; absent means closed | The licence |
| `size` | How big is it? | Total parameters, plus active ones for MoE: `35b-a3b` | Publisher |
| `quant` | At what precision does it run? | `q4`, `q8`, `fp8`, `mxfp4`; absent means as published | Whoever runs it |
| `version` | Which release? | Absent means the current model; otherwise the publisher's release number | Publisher |
| `derivation` | Did a third party modify it, and how? | Author and kind: `huihui-abliterated` | Whoever derived it |
| `host` | Where does it run? | `local`, `edge`, or a registered host; absent means the publisher's API | Whoever deploys |

`publisher` is always the operating organisation that publishes the model and signs its model cards and licence, never a model brand, family or parent holding company: `alibaba` rather than `qwen`, `google` rather than `alphabet`, `gemini` or `gemma`, `meta` rather than `llama` or `muse`, `deepseek` rather than `high-flyer`, `moonshotai` rather than `kimi`. The registry assigns one canonical lowercase slug per organisation and freezes it.

There is no `family` component. Adding commercial family names would break portability across publishers (principle 1). `scope`, `tier`, `special`, `weights` (`-open`/`-weights`/closed) and `size` separate a publisher's models; when two parallel families from the same publisher still collide on the same slot (for example `codestral` and `devstral`, or separate vision-only and text-only checkpoints of the same release), the primary model holds the slot and the overlapping sibling stays out of the registry as `slot-collision` (section 5.1).

### 3.1 Scope

The scope names the model's primary output contract, so that two models on the same publisher and rung never collide across incompatible tasks.

| Scope | Contract |
| --- | --- |
| `text` | Language generation, whatever inputs it accepts (including vision or audio input with text output) |
| `omni` | Native input and output across several modalities (for example text and audio, or with `-rt` for real-time duplex voice) |
| `image` | Image generation or editing |
| `video` | Video generation (including synchronised audio) |
| `audio` | Non-speech audio and music generation |
| `tts` | Text-to-speech synthesis |
| `transcribe` | Speech-to-text transcription (batch, or streaming with `-rt`) |
| `embed` | Vector embeddings |
| `rerank` | Relevance scoring and reranking |
| `decision` | Calibrated probabilities or typed discrete decisions (yes/no, choice, score, tag) without free-text generation |

A general language model that accepts audio input for chat or tool use stays `text`; `transcribe` is only for dedicated speech-to-text models. A model whose primary output is images or video stays `image` or `video` even when it also emits text or a soundtrack.

### 3.2 Tier

The tier is a role in the lineup, on one scale shared by every publisher.

| Tier | Role |
| --- | --- |
| `nano` | The smallest and cheapest, for simple high-volume tasks |
| `light` | Fast and inexpensive |
| `core` | The publisher's everyday default |
| `high` | A step above the default, for harder work |
| `max` | Just below the flagship |
| `ultra` | The publisher's flagship |

`core` and `ultra` anchor the scale. The other rungs may stay empty.

A **slot** is everything in a model URI before the version: publisher, scope, tier, suffixes, size and quantisation. `model:anthropic/text/ultra` and `model:anthropic/text/ultra-restricted` are two slots on the same rung, and so are `model:alibaba/text/core-open/27b` and `model:alibaba/text/core-open/35b-a3b`.

A publisher that adopts the standard:

- declares the tier of every model at release;
- keeps at most one generally available model per slot, so that a new model in an occupied slot replaces the previous one;
- fits its lineup to the scale, and not the other way round. A lineup that needs more than six rungs in one scope is too crowded to be understood.

For a publisher that has not adopted it, the registry assigns the tier: `core` is the model the publisher presents as its everyday default, `ultra` is its flagship, and the others are placed by list price of output tokens, filling first the rungs closest to `core`. Where there is no price list, parameter count is used. When two models cost the same, the publisher's own description decides.

**Same rung, same role.** Moving from `model:openai/text/core` to `model:google/text/core` gives you the other publisher's everyday default. Quality, price and behaviour still differ, and the registry records them.

The tier is a role and nothing else. Who may use a model and how it is licensed are separate parts.

### 3.3 Suffixes: special, access, weights

After the tier come up to three suffixes. Each answers one question and has a fixed position: `special`, then `access`, then `weights`. `access` and `weights` are closed vocabularies in this specification; `special` is a controlled vocabulary maintained in the registry (`specials`, section 5), so new real-world specialisations (such as `cybersec` or `math`) can be registered without changing the grammar or breaking parsers. A parser returns them as three separate fields.

**Special: what is it published for?**

Initial registered values (maintained in `registry.json` under `specials`):

- `code`: published as specialised for code.
- `rt`: real-time streaming or duplex interaction (such as live voice on `omni` or streaming speech-to-text on `transcribe`).
- `base`: pre-trained weights without instruction tuning.
- `guard`: safety, content moderation or prompt-injection guardrails.
- `ocr`: document optical character recognition and layout extraction.
- `translate`: dedicated machine translation.
- `research`: autonomous multi-step deep research and report synthesis.
- `gui`: graphical user interface grounding and control (desktop computer use, browser automation and mobile device agents).
- `robotics`: embodied robotics reasoning and physical-world control.
- `roleplay`: character-driven dialogue and interactive roleplay.
- `medical`: clinical, healthcare and biomedical specialisation.
- `finance`: financial analysis, markets and accounting specialisation.
- `legal`: legal reasoning, statutory analysis and compliance specialisation.
- `voiceclone`: voice cloning from a reference speaker sample (on `tts`).
- `voicedesign`: generating a synthetic voice from a text description (on `tts`).

Instruction-tuned models are the default and carry no suffix; `base` marks the exception for general-use pre-trained checkpoints. `special` takes at most one value by design so identifiers stay short and unambiguous: when a publisher ships both an instruction-tuned and a base checkpoint of a specialised model (for example Qwen2.5-Coder-32B-Instruct and Qwen2.5-Coder-32B), the instruction-tuned model holds the `-code` slot (`model:alibaba/text/core-code-open/32b:2.5`) and the raw base checkpoint stays out of the registry as `slot-collision` (section 5.1).

**Access: who may use it?**

- `restricted`: granted to selected operators only.
- `gov`: an edition that only government bodies may use.
- `internal`: used inside the publisher, not released.

A model with no access suffix is available to anyone who can pay for it or download it.

**Weights: can they be downloaded, and under which kind of licence?**

- `open`: downloadable, under an unmodified licence approved by the Open Source Initiative (such as `Apache-2.0`, `MIT` or `AGPL-3.0-only`).
- `weights`: downloadable, under any other licence (such as non-commercial terms, RAIL, modified OSI licences like Modified MIT, model-specific licences like `OpenMDW-1.1`, or the publisher's own terms).

A model with no weights suffix is closed and reachable through an API only. The suffix is mandatory whenever it applies. The exact licence goes in the registry as a canonical SPDX identifier when one exists (for example `Apache-2.0`, `MIT`, `CC-BY-NC-4.0`), or the publisher's own licence name otherwise, and `"proprietary"` for closed models. If a downloadable model has no verifiable licence, it stays out of the registry (section 5.1).

Extended reasoning and serving latency modes (such as fast or high-speed tiers) are request or deployment parameters, and vision input is registry data; none of them belongs in the identifier. A new `special` value is added to the registry only when at least one real published model needs it to avoid colliding with the general lineup; unregistered specialisations stay out of the registry (section 5.1) until registered.

### 3.4 Size

The size is the parameter count in millions (`m`), billions (`b`) or trillions (`t`), and it is optional. It is used where one release ships in several sizes and the tier alone cannot tell them apart. Each size is a slot of its own, so a 27b and a 35b-a3b model can both be current on `core`.

- A size without `-a` is a dense model: `32b`, `1t`.
- A size with `-a` is a mixture of experts, total then active: `35b-a3b`, `2.4t-a95b`.

Architecture is therefore read from the size. There is no `moe` or `dense` suffix.

`size` records verifiable physical parameter counts only: total parameters, and active parameters after `-a` when sparse. Expert-count shorthands (such as `8x7b` instead of `47b-a13b`) and proprietary "effective" counts (such as `E4B`) are not valid sizes. If a publisher does not disclose verifiable counts, omit `size` when the tier alone distinguishes the release, or leave the model out of the registry as incompatible (section 5.1) rather than bending the grammar.

### 3.5 Quant

The quantisation is a property of the weights being run, not of the place where they run. It is omitted when the weights run at the precision the publisher released.

It applies to any host. `model:alibaba/text/core-open/35b-a3b/fp8:3.6@somehost` says that a hosting provider serves quantised weights.

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

When the host is missing, the model runs on the publisher's own API. Other hosts are registered names: the keys of `native` in the registry, such as `bedrock`, `vertex`, `azure`, `openrouter`, `together` or `groq`.

`local` and `edge` mean self-hosted inference, on your own hardware or on a device. They apply only to models with a `weights` suffix, because a closed model cannot be self-hosted: `model:openai/text/core@local` is not a valid model URI. A resolver turns them into the repository the weights are published in, the registry key `huggingface`. When the URI asks for a quantisation the registry does not list, the resolver returns the weights as released and says so, because whoever self-hosts chooses the precision (section 3.5).

An environment with compliance requirements is a host of its own, for example `azuregov`. That is different from the `gov` access suffix: the host says where an ordinary model runs, the suffix says the edition itself is reserved.

## 4. Rules

1. **One slot, one model.** For a publisher that adopts the standard, a model URI without a version points to exactly one model at any time, and one with a version points to exactly one release forever.
2. **Pinned versions never change.** An updated model gets a new version. Silent updates under an existing version are not allowed.
3. **Frozen tier.** A pinned model URI keeps the tier of its release forever. Logs, configurations and benchmarks do not break.
4. **No version means the current model.** With size and quantisation, it follows both: `model:alibaba/text/core-open/35b-a3b/mxfp4@local` is the newest release with those parameters at that precision, and it stays where it is if the next generation drops that size. A resolver always reports the pinned model URI it resolved to, and says so when a sized alias has stopped moving.
5. **Same rung, same role.** Changing the publisher keeps the role, not the results.
6. **Canonical form.** All lowercase, scheme `model:` always present, suffixes in the fixed order `special`, `access`, `weights`, version left out when it means the current model, host left out when it is the publisher's own API.
7. **Unknown values.** A parser rejects scopes, tiers, access values and weights values it does not know. It accepts `publisher`, `special` and `host` names that are syntactically valid but unregistered, and flags them.
8. **Self-hosting needs weights.** `@local` and `@edge` are valid only together with `-open` or `-weights`. A parser rejects them on a closed model.

## 5. Registry

The registry covers what the identifier leaves out: the native name to call, the licence, the controlled vocabulary of `special` values, and the tiers of publishers that have not adopted the standard. It is the file [`registry.json`](registry.json) in this repository: an object with the specification version it follows (`spec`), the snapshot date (`updated`), its licence (`license`), a `note`, the registered `specials` map and the list of `entries`.

`registry.json` and `incompatible.json` are generated by `tools/build-registry.mjs` from the classification table `tools/classification.mjs` and a snapshot of the models.dev catalogue committed in `tools/snapshot/`, so that anyone can rebuild them and get the same files. Changes go through pull requests on the classification table, never on the generated files. The build rejects invalid or unpinned model URIs, unregistered `special` values, missing evidence, a licence that contradicts the `weights` suffix, two current models in one slot, and catalogue models that are not accounted for.

Each entry holds:

- `uri`: the pinned model URI.
- `native`: the real identifier for each host, for example the string passed to the API. It is empty only for a release no host serves any more. The key is the host name; the publisher's own API uses the publisher's name. For downloadable models, `huggingface` holds the repository of the published weights, which is also what `@local` and `@edge` resolve to.
- `released`: the release date.
- `license`: `"proprietary"` for closed models (no weights suffix); a canonical SPDX identifier of an unmodified OSI-approved licence for `-open` models; or an SPDX identifier / the publisher's exact licence name for `-weights` models. It justifies the `weights` suffix.
- `tier_source`: `publisher` if the tier is declared, `registry` if it is assigned with the rule in section 3.2.
- `evidence`: a link to the price list, model card or announcement that justifies the tier.
- `current`: `true` if the model is on sale and holds its slot, so that a model URI without a version resolves to it. At most one entry per slot is current. A pinned URI resolves to any entry, current or not. A withdrawn release keeps its entry with `current: false`, so its pinned URI still answers and the resolver says that no host serves it.

Example entry:

```json
{
  "uri": "model:example/text/core:2.0",
  "native": { "example": "example-standard-2-0", "bedrock": "example.standard-2-0-v1" },
  "released": "2026-01-15",
  "license": "proprietary",
  "tier_source": "registry",
  "evidence": "https://example.com/pricing",
  "current": true
}
```

Governance:

- A tier assigned by the registry without `evidence` is not accepted.
- A publisher can always replace a registry-assigned tier with its own. This applies to future releases only.
- The lists of scopes, tiers, access values and weights values are closed and part of the specification. Publishers, specialisations (`special`) and hosts are registered names.
- Adding a scope, tier, access or weights value takes an issue and a new minor version. Adding a `special` value takes a pull request on the registry with at least one real published model that would otherwise collide with the general lineup.
- The specification follows semantic versioning and stays `0.x` while it is a draft.

Seed data should not be compiled by hand. Open catalogues such as [models.dev](https://github.com/anomalyco/models.dev) already hold native identifiers, prices and capabilities. The registry adds only the classification on top.

### 5.1 Incompatible models

Models from external catalogues that cannot be assigned a canonical model URI without bending the grammar or guessing unverifiable facts are recorded in [`incompatible.json`](incompatible.json) rather than forced into the registry. A resolver never resolves entries from `incompatible.json`.

Each entry holds:

- `id`: the external catalogue identifier (for example `org/model`), unique across the file.
- `publisher`: the publisher's slug (`publisher` grammar rule).
- `name`: optional human-readable model name.
- `reason`: one value from the closed list below.
- `conflicts_with`: the model URI (pinned or unversioned slot) that the model collides with; required when `reason` is `slot-collision` or `parameter-split`.
- `detail`: a short factual explanation of why the model does not fit.
- `evidence`: an HTTPS link to the model card, price list or catalogue record that supports the classification.

Closed list of `reason` values:

| Reason | Meaning |
| --- | --- |
| `rolling-alias` | Unpinned pointer whose underlying model changes silently (violates rule 2) |
| `opaque-size` | Non-physical or proprietary parameter label (such as `E4B` or `8x7b`) where verifiable counts are absent and size is needed to distinguish the release |
| `parameter-split` | A request parameter or serving mode (such as reasoning toggle or latency tier) exposed as a separate model ID |
| `slot-collision` | Two distinct models or parallel families from the same publisher occupy the same slot without a distinguishing component, or a lineup exceeds six rungs in one scope |
| `unmapped-special` | Specialisation not in the registry's `specials` vocabulary (section 3.3) that would otherwise collide with the general lineup |
| `unmapped-scope` | Output contract outside the closed `scope` set |
| `missing-evidence` | Verifiable tier, licence or model-card facts are absent, so the tier or `weights`/`open` suffix cannot be assigned honestly |

Example entry:

```json
{
  "id": "google/gemma-4-E4B-it",
  "publisher": "google",
  "name": "Gemma 4 E4B IT",
  "reason": "opaque-size",
  "detail": "Published with a proprietary effective-parameter label (E4B) rather than verifiable total and active parameter counts.",
  "evidence": "https://huggingface.co/google/gemma-4-E4B-it"
}
```

Rules:

- **Mutual exclusion.** A model must not appear in both `registry.json` and `incompatible.json`.
- **Not for out-of-scope records.** Third-party derivations (`~author-kind`), dated snapshot duplicates of an already-registered release, and private or restricted models that are expressible by the grammar but not publicly on sale do not belong in `incompatible.json`. The classification table lists them as skipped, so that every catalogue model is accounted for, and they are not published.
- **Exit path.** When a publisher publishes verifiable facts or a clean versioned ID, or a future minor version of this specification expands a closed vocabulary, the entry moves from `incompatible.json` to `registry.json`.

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

Existing identifiers say which model it is, but to know its role you still need to know the commercial name, and to switch publisher you need a new one. Model URI adds only that, and relies on them for everything else.

| System | Form | What it solves | What it leaves open |
| --- | --- | --- | --- |
| [OpenRouter](https://openrouter.ai/docs/guides/routing/model-variants/overview) | `author/slug[:variant]` | Unique, resolvable ID; suffixes control routing and pricing | The slug is the commercial name |
| [Hugging Face](https://huggingface.co/docs/huggingface_hub/en/package_reference/hf_uris) | `hf://org/model@revision` | Locates a repository and a revision | The name is free-form |
| [purl](https://github.com/package-url/purl-spec) | `pkg:huggingface/org/model@commit` | Identity for software inventories and SBOMs | No classification |
| Ollama | `model:tag` | Size and quantisation in the tag | Informal convention, commercial name |
| MLflow | `models:/name/version` | Points into a model registry | Unregistered scheme, local to one registry |
| [models.dev](https://github.com/anomalyco/models.dev) | `provider/model` plus metadata | A catalogue of prices, limits and capabilities | A database, not a naming scheme |

The `native` field of the registry points to these identifiers. A model URI always translates into one of them.

## 8. Examples

Tiers are assigned with the registry rule from the publishers' own descriptions and price lists as of 21 November 2026. No publisher has declared them.

| Model | Model URI | What it shows |
| --- | --- | --- |
| GPT-6.2 Astra | `model:openai/text/ultra:6.2` | "Our most capable model": the flagship |
| GPT-6.2 Sol | `model:openai/text/core:6.2` | "Our go-to model for everyday work": the default |
| GPT-6.1 Terra | `model:openai/text/light:6.1` | |
| GPT-6 Luna | `model:openai/text/nano:6` | `high` and `max` stay empty |
| Gemini 4 Carbon | `model:google/text/ultra:4` | "Our strongest reasoning model" |
| Gemini 4 Argon | `model:google/text/max:4` | |
| Gemini 4 Neon | `model:google/text/high:4` | Three Gemini 4 models share version `4`; the tier keeps them apart |
| Gemini 4 Hydrogen | `model:google/text/core:4` | Built "for everyday coding and agentic workflows" |
| Gemini 3.8 Flash | `model:google/text/light:3.8` | Older line, still on sale: it fills `light` |
| Claude Haiku 5.5 | `model:anthropic/text/light:5.5` | |
| Claude Sonnet 5.5 | `model:anthropic/text/core:5.5` | |
| Claude Opus 5.5 | `model:anthropic/text/high:5.5` | The rung closest to `core` is filled first |
| Claude Fable 5.2 | `model:anthropic/text/ultra:5.2` | |
| Claude Mythos 5.2 | `model:anthropic/text/ultra-restricted:5.2` | Same rung, selected operators only; not in the registry, which lists models on sale |
| Claude Sonnet 5.5 on Bedrock | `model:anthropic/text/core:5.5@bedrock` | Publisher and host are separate |
| A government-only edition | `model:example/text/core-gov:2.0` | Access reserved to government bodies |
| A model used inside its publisher | `model:example/text/ultra-internal:3.0` | Not released |
| Mistral Codestral, current | `model:mistral/text/core-code` | Specialisation, no version |
| Meta Llama Guard 4, 12B | `model:meta/text/core-guard-weights/12b:4@local` | Safety guardrail (`guard`) |
| LightOnOCR 3, 0.8B | `model:lightonai/text/core-ocr-open/0.8b:3@local` | Document OCR (`ocr`) |
| Cohere North Small Translate 1.0 | `model:cohere/text/light-translate-weights:1.0` | Dedicated translation (`translate`), non-commercial licence (`weights`) |
| Gemini 3.5 Live Translate Preview | `model:google/omni/core-translate:3.5` | Live speech translation (`omni` + `translate`) |
| Gemini Deep Research Preview | `model:google/text/core-research:2026.04` | Autonomous deep research (`research`) |
| Gemini 2.5 Computer Use | `model:google/text/core-gui:2.5` | GUI and computer control (`gui`) |
| Gemini Robotics-ER 1.6 | `model:google/text/core-robotics:1.6@orcarouter` | Embodied robotics (`robotics`) |
| Baichuan M2, 32B | `model:baichuan/text/core-medical-open/32b:2@local` | Medical domain (`medical`) |
| Ling 3.0 Flash Fin | `model:inclusionai/text/core-finance-open:3.0@local` | Finance domain (`finance`) |
| Doubao Seed Character | `model:bytedance-seed/text/core-roleplay:26.06` | Character dialogue (`roleplay`) |
| Qwen 3.5 MoE base, 35B total, 3B active | `model:alibaba/text/core-base-open/35b-a3b:3.5@local` | Pre-trained weights without instruction tuning (`base`) |
| Qwen 3.6 MoE, 35B total, 3B active, MXFP4 | `model:alibaba/text/core-open/35b-a3b/mxfp4:3.6@local` | Open licence, size, precision, version and host, each on its own |
| The newest Qwen at that size and precision | `model:alibaba/text/core-open/35b-a3b/mxfp4@local` | Follows new releases and keeps the hardware footprint |
| The same model, abliterated by a third party | `model:alibaba/text/core-open/35b-a3b/q4:3.6~huihui-abliterated@local` | Derivation |
| Gemma 4, 26B total, 4B active, Q4 | `model:google/text/core-open/26b-a4b/q4:4@local` | Downloadable under Apache-2.0 (`open`) |
| Meta Llama 4 Maverick | `model:meta/text/core-weights:4@local` | Downloadable under the publisher's community licence (`weights`) |
| Whisper large-v3, FP16 | `model:openai/transcribe/high-open/fp16:3@local` | Speech-to-text (`transcribe`) |
| Gemini 3.5 Transcribe Live | `model:google/transcribe/core-rt:3.5@vercel` | Streaming speech-to-text (`-rt`) |
| Gemini 3.1 Flash TTS Preview | `model:google/tts/core:3.1` | Text-to-speech (`tts`) |
| MiMo-V2.5-TTS VoiceClone | `model:xiaomi/tts/core-voiceclone:2.5` | Voice cloning (`tts` + `voiceclone`) |
| MiMo-V2.5-TTS VoiceDesign | `model:xiaomi/tts/core-voicedesign:2.5` | A voice generated from a text description (`tts` + `voicedesign`) |
| Lyria 3 Pro Preview | `model:google/audio/core:3` | Non-speech audio and music (`audio`) |
| GPT Realtime 2.1 | `model:openai/omni/core-rt:2.1` | Real-time duplex voice (`omni` + `-rt`) |
| Jev 1.14 | `model:typesafe/decision/core:1.14.0@openrouter` | Typed probabilistic decision (`decision`) |
| BGE-M3 | `model:baai/embed/core-open:m3@local` | Non-numeric version |

Every pinned model URI in this table is in the registry, except the illustrative rows: the `example` publisher, `-restricted` and `-internal` models, and rows with a quantisation or a derivation. Whisper large-v3 is not in the models.dev catalogue and is illustrative too. The `weights` and `open` suffixes follow the licences recorded in the registry and must be checked against each model card.

### Switching publisher

| Role | OpenAI | Google | Anthropic |
| --- | --- | --- | --- |
| Flagship | `model:openai/text/ultra` | `model:google/text/ultra` | `model:anthropic/text/ultra` |
| Everyday default | `model:openai/text/core` | `model:google/text/core` | `model:anthropic/text/core` |
| Fast and inexpensive | `model:openai/text/light` | `model:google/text/light` | `model:anthropic/text/light` |

The `nano` rung is not filled everywhere: Google has only older Flash-Lite releases and Anthropic has none, so a resolver reports that the rung has no current model instead of guessing. A pinned version, such as `model:google/text/nano:3.5`, still resolves.

## 9. The `model` scheme

The scheme `model` is not in the [IANA registry of URI schemes](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml) as of its update of 17 November 2026. A provisional registration under [RFC 7595](https://www.rfc-editor.org/rfc/rfc7595.html) will be requested.

RFC 7595 recommends avoiding very general scheme names. The name `model` is general by design. The scheme identifies AI models of any publisher and any modality, not a product or a protocol, so a coined or branded name would reintroduce the opacity this specification exists to remove.

## 10. Open questions

- Are six rungs enough, and are `high` and `max` acceptable names when at least one publisher also uses them as levels of reasoning effort?
- Will two publishers with four models each place them on the same rungs? The line between `high` and `max` is thin, and the rule "fill the rungs closest to `core` first" may not be enough.
- Should an empty rung fall back to the nearest filled one, or always be reported as empty?
- Tier of open-weights models: role within the publisher's family, or fixed bands by parameter count?
- Third-party quantisations: whoever quantised the weights does not appear. Should it?
- Is the list of derivation kinds complete, and how are chained derivations written?
- Access: should research previews have their own value?
- Should `special` remain single, or allow multiple values in alphabetical order (for example `-base-code` or `-rt-voiceclone`)?