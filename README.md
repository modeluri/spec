# Sane Model URI

A sane, canonical URI for any AI model, and a moratorium on opaque model names.

```text
model:anthropic/text/core:5.5@bedrock
```

- Site: <https://sanemodeluri.org>
- Specification: [SPEC.md](SPEC.md), working draft 0.1
- Signatories: [SIGNATORIES.md](SIGNATORIES.md)
- Registry: [registry.json](registry.json)

## Sign

Add one line to [SIGNATORIES.md](SIGNATORIES.md) and open a pull request. Signing means you will use model URIs in your own configuration files and documentation.

## Object

Open an [issue](https://github.com/sanemodeluri/spec/issues). The most useful ones are:

- a real model the grammar cannot express;
- two real models that collide on the same model URI;
- a tier the price-list rule gets wrong.

## Repository layout

| Path | Content |
| --- | --- |
| `SPEC.md` | The specification |
| `registry.json` | The public registry of model URIs |
| `SIGNATORIES.md` | People and organisations who signed |
| `site/` | The static page served at sanemodeluri.org |

The site has no build step, no JavaScript and no tracking.

## Licence

The specification and the site are under [CC BY 4.0](LICENSE). The registry (`registry.json`) is dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

Initiated by [Franz Mozzi](https://franzmozzi.github.io/).
