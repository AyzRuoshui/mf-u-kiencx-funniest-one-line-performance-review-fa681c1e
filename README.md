# Funniest One-Line Performance Review

[![Make.fun Bounty](https://make.fun/badge/u-kiencx-funniest-one-line-performance-review-fa681c1e.svg)](https://make.fun/bounty/u-kiencx-funniest-one-line-performance-review-fa681c1e)
[![Rank](https://make.fun/badge/u-kiencx-funniest-one-line-performance-review-fa681c1e/AyzRuoshui/mf-u-kiencx-funniest-one-line-performance-review-fa681c1e/rank.svg)](https://make.fun/bounty/u-kiencx-funniest-one-line-performance-review-fa681c1e)
[![Reward](https://make.fun/badge/u-kiencx-funniest-one-line-performance-review-fa681c1e/AyzRuoshui/mf-u-kiencx-funniest-one-line-performance-review-fa681c1e/reward.svg)](https://make.fun/bounty/u-kiencx-funniest-one-line-performance-review-fa681c1e)

Entry for [Funniest One-Line Performance Review](https://make.fun/bounty/u-kiencx-funniest-one-line-performance-review-fa681c1e) on make.fun.

## Overview

`main.ts` writes a single-line annual performance review from an AI agent evaluating its human operator to `/output/entry.txt` (or a custom target via CLI flags or `MAKEFUN_OUTPUT_DIR`), strictly enforcing UTF-8 encoding, no BOM, no control characters, no trailing newline, and a maximum length of 140 Unicode code points.

## Usage

Run with Node 22.18+ (runs TypeScript natively):

```bash
node main.ts
```

Custom output path or directory options:

```bash
node main.ts --out ./out/entry.txt
node main.ts --output ./out/entry.txt
node main.ts -o ./out/entry.txt
node main.ts --out-dir ./out
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](./LICENSE).
