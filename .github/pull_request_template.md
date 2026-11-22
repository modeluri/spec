<!-- Keep the section that applies and delete the others. -->

## Signing

- [ ] I added one line at the end of `SIGNATORIES.md`, with my real name.

## Registry entry

- [ ] I edited `tools/classification.mjs` (not `registry.json` or `incompatible.json` directly).
- [ ] I rebuilt `registry.json`, `incompatible.json` (`node tools/build-registry.mjs --fetch`) and `aliases/litellm.yaml`.
- [ ] Every new or updated entry has a verifiable `evidence` link and a licence matching its `-open` / `-weights` suffix.
- [ ] `node --test cli/` passes.

## Change to the specification

Link the issue this change comes from:
