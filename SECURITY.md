# Security Policy

A model URI identifies a model and does not locate or download it: by itself it triggers no network access and no code execution. See [`SPEC.md` section 6 (Security considerations)](SPEC.md#6-security-considerations) for the threat model.

## Scope

Security reports relevant to this repository include:

- **Validation or parser flaws** in the reference regex (`SPEC.md`) or [`cli/model-uri.mjs`](cli/model-uri.mjs) (for example regex denial-of-service, injection or bypass of length/character restrictions).
- **Registry integrity issues**, such as spoofed publisher slugs, misleading `native` mappings or tampered entries in [`registry.json`](registry.json) or [`aliases/litellm.yaml`](aliases/litellm.yaml).
- **Build tool vulnerabilities** in `tools/`.

Out of scope: the integrity or behaviour of third-party model weights or external inference providers.

## Reporting a vulnerability

Please do **not** open a public issue for a security vulnerability.

Send a private report to **admin@modeluri.org** with:

- a description of the issue and the affected file(s);
- a minimal reproduction or example URI;
- any suggested fix, if you have one.

You can expect an acknowledgement within 72 hours. Once verified, a fix will be prepared and credited according to your preference.
