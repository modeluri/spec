# Contributing to Model URI

This is a working draft. Objections, edge cases, registry fixes and pull requests are welcome.

All participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## 1. Sign the moratorium

Add one line at the end of [`SIGNATORIES.md`](SIGNATORIES.md) with your real name, role, optional organisation and optional link, then open a pull request.

## 2. Open an objection or edge case

Use the [Objection issue template](.github/ISSUE_TEMPLATE/objection.yml). The most useful reports are:

- a real model the grammar cannot express;
- two real models that collide on the same model URI;
- a tier the price-list rule in [`SPEC.md`](SPEC.md#32-tier) gets wrong;
- a model in [`incompatible.json`](incompatible.json) that does fit, or a registry entry that should not be there.

Always include a link to the publisher's own page, model card or price list.

## 3. Update the registry or register a `special` value

`registry.json` and `incompatible.json` are generated files — do not edit them by hand.

1. Edit [`tools/classification.mjs`](tools/classification.mjs) (entries in `CLASSIFICATION`, `INCOMPATIBLE`, `SKIPPED`, or the controlled `SPECIALS` vocabulary).
   - A new `special` value requires at least one real published model that would otherwise collide with the general lineup ([`SPEC.md` section 5](SPEC.md#5-registry)).
   - Every registry entry must have a verifiable `evidence` HTTPS link and a normalised SPDX identifier or exact licence title matching its `-open` / `-weights` suffix.
2. Rebuild the generated files from the committed models.dev snapshot in [`tools/snapshot/`](tools/snapshot) (requires Node 18+ or Bun, no dependencies to install):
   ```sh
   node tools/build-registry.mjs
   node cli/model-uri.mjs aliases --format litellm > aliases/litellm.yaml
   ```
   Do not pass `--fetch` in a classification pull request: it replaces the snapshot with the live catalogue, whose new models the table does not account for yet. Refreshing the snapshot is a pull request of its own.
3. Run the test suite:
   ```sh
   node --test cli/
   ```
4. Open a pull request. CI runs the tests, rebuilds the registry from the snapshot and fails if `registry.json`, `incompatible.json` or `aliases/litellm.yaml` differ from what you committed.

To refresh the snapshot, run `node tools/build-registry.mjs --fetch`: it saves the live catalogue to `tools/snapshot/catalog.json` and the date and models.dev commit to `tools/snapshot/meta.json`. Classify or skip the new catalogue models until the build passes, then regenerate the aliases and run the tests. A snapshot refresh opened by a contributor is not merged as is: the maintainer re-runs `--fetch` and compares, since the snapshot is the build's only input from upstream. If a registered model has lost every host, set `"current": false` and keep its old identifiers in `"former_native"` (for example `{ "vercel": "liquid/d1" }`): the entry stays, so its pinned model URI still answers. The build fails on an entry with no host and no `former_native`. A registered model that models.dev marks `v2_only` leaves `catalog.json` while still on sale: `--fetch` then copies it from the previous snapshot if the experimental v2 API (`https://models.dev/experimental/v2.0/api.json`) still lists it under the same ID, records it in `meta.json` as `carried_over_v2_only`, and fails if v2 does not list it either.

## 4. Propose a change to the specification

Open an [issue](https://github.com/modeluri/spec/issues) first so the trade-offs can be discussed before editing [`SPEC.md`](SPEC.md).

If your change affects the syntax, reference regex or resolver behaviour, update [`cli/model-uri.mjs`](cli/model-uri.mjs) and [`cli/model-uri.test.mjs`](cli/model-uri.test.mjs) in the same pull request and verify that `node --test cli/` passes.

## Licences

By contributing, you agree that your contributions are licensed under the repository's terms:

- Specification (`SPEC.md`): [CC BY 4.0](LICENSE).
- Registry (`registry.json`, `incompatible.json`, `tools/classification.mjs`) and generated alias files (`aliases/`): [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- Code (`cli/`, `tools/*.mjs` except `tools/classification.mjs`): [MIT](LICENSE-CODE).
