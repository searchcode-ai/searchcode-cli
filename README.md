<!--
  GENERATED. This repository is produced from the searchcode.ai customer API contract.
  Edits here are overwritten on the next contract change — open an issue instead.
-->

# @searchcode/cli

[![npm](https://img.shields.io/npm/v/@searchcode/cli.svg)](https://www.npmjs.com/package/@searchcode/cli) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Search the source code of the public web from your terminal. Find every site running a library,
embedding an endpoint, or carrying a tracking id — then look up what any of those domains is
built with.

Powered by [searchcode.ai](https://searchcode.ai).

## Install

```bash
npm install -g @searchcode/cli
```

Or run it without installing:

```bash
npx @searchcode/cli search --q "js.stripe.com/v3"
```

## Set up

```bash
export SEARCHCODE_API_KEY="your-key"
```

[Get a key](https://searchcode.ai/). The free plan needs no card, and
[free source search in the browser](https://searchcode.ai/) needs no account at all.

## Examples

```bash
# every site embedding the Stripe v3 script
searchcode search --q "js.stripe.com/v3"

# narrow to one top-level domain, as raw JSON
searchcode search --q "js.stripe.com/v3" --tld de --json

# what is this domain built with?
searchcode profile --domain example.com

# how many sites use React?
searchcode count --kind tech --signal React
```

## Commands

| Command | Credits | Plan | What it does |
| --- | --- | --- | --- |
| `search` | 5 | Free | Search the source code of the public web |
| `count` | 1 | Free | Count the sites carrying one signal |
| `tech-sites` | 3 | Free | List every site using a technology |
| `export` | 5 | Solo | Export matching domains in bulk |
| `profile` | 3 | Pro | Show what one domain is built with |
| `read` | 5 | Pro | Read the retained source behind a search hit |
| `owner` | 5 | Pro | Find domains sharing a tracking identifier |
| `domains` | 1 | Free | Browse the ranked domain index |
| `shops` | 1 | Enterprise | Browse captured e-commerce storefronts |
| `shop-stats` | 1 | Enterprise | Aggregate statistics over the shop catalog |
| `products` | 2 | Enterprise | Read captured product records |
| `shops-discover` | 1 | Enterprise | Discover storefronts with resumable paging |
| `catalog` | 2 | Enterprise | Read a store catalog page by page |
| `catalog-doc` | 2 | Enterprise | Fetch one catalog document |

Run `searchcode <command> --help` for a command's arguments and flags.

## Global flags

| Flag | Effect |
| --- | --- |
| `--json` | print the raw API response instead of the readable rendering |
| `--key` | override `SEARCHCODE_API_KEY` for one call |
| `--help` | show help for the command, or the command list |

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | success |
| 1 | the API returned an error (the message says what and why) |
| 2 | your command was wrong: unknown command, missing argument, or no key |

## How this repository is produced

Every file here is generated from the searchcode.ai customer API contract. When the API changes,
the contract changes, these packages are regenerated, their tests run, and a new version is
published. That is why the commands, tools, credit costs and plan requirements documented here
can never drift from what the API actually does.

Found a problem? [Open an issue](https://github.com/searchcode-ai) — please don't send a pull request against generated
files, they are overwritten on the next contract change.

## Links

- [Documentation](https://searchcode.ai/docs/)
- [Free source search, no account needed](https://searchcode.ai/)
- [Plans and pricing](https://searchcode.ai/docs/plans/)
- Contact: hello@searchcode.ai

## License

MIT
