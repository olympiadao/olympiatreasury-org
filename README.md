# OlympiaTreasury.org — Demo v0.1

> **Branch:** `demo_v0.1` (preserved snapshot)
> **Superseded by:** `demo_v0.2`
>
> **Note:** Demo v0.1 was a fast-iteration development branch and is not aligned to the public Olympia ECIP specifications. See `demo_v0.2` for the spec-compliant implementation.

Treasury monitoring dashboard for the Olympia protocol-controlled vault on Ethereum Classic. Read-only — no wallet required.

## Version Context

Demo v0.1 was the initial treasury dashboard deployment. Key characteristics:

- **Single chain:** Mordor Testnet only (Chain 63)
- **Treasury:** OZ 5.6 AccessControlDefaultAdminRules (`0xd6165F3aF4281037bce810621F62B43077Fb0e37`)
- **Data:** Blockscout API v2 with client-side ECIP-1017 era reward calculation
- **Features:** KPI cards, balance chart, transaction table, collapsible about section

This branch is preserved as a historical snapshot. Active development continues on `demo_v0.2`.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
- @tanstack/react-query (data fetching)
- Recharts (balance chart)
- viem (chain definitions)
- Lucide React (icons)
- pnpm 10, Node 24

## Development

```bash
pnpm install
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `demo_v0.1` | Preserved snapshot — initial Mordor-only dashboard |
| `demo_v0.2` | Active development — multi-chain, 7 CREATE2 contracts, institutional redesign |
| `main` | Production — deployed after Olympia activates on ETC mainnet |

## Authors

- [Cody Burns](https://github.com/realcodywburns)
- [Chris Mercer](https://github.com/chris-mercer)
