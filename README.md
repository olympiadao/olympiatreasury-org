# OlympiaTreasury.org

Live treasury monitoring dashboard for the Olympia protocol-controlled vault on Ethereum Classic. Read-only — no wallet required.

**URL:** [olympiatreasury.org](https://olympiatreasury.org)

## Features

- Real-time treasury balance and KPI cards (Balance, Mined Income, BaseFee, Donations, Withdrawals, Transactions)
- Balance history chart with light/dark theme support
- Transaction table (inflows/outflows) with Blockscout links
- Multi-chain support: ETC Mainnet (61) + Mordor Testnet (63) via URL-based chain selector
- About section: fund flow, invariants, security layers, roadmap stages, deployed contracts
- ECIP-1017 era disinflation reward calculation (client-side)
- Light/dark theme toggle
- Responsive, mobile-first

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS 4, CSS custom properties |
| Data | Blockscout API v2, @tanstack/react-query |
| Charts | Recharts |
| Icons | Lucide React |
| Package Manager | pnpm 10 |

## Deployed Contracts (Demo v0.3)

Nine contracts deployed via deterministic **CREATE2** (salt: `OLYMPIA_DEMO_V0_3`) + Treasury via **CREATE**. Identical addresses on Mordor Testnet (63) + ETC Mainnet (61). All source verified on Blockscout.

All addresses in [`lib/contracts.json`](lib/contracts.json) — single source of truth.

## Quick Start

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
| `main` | Production — deployed after Olympia activates on ETC mainnet |
| `demo_v0.3` | Active development — 9 contracts, on-chain SVG, sybil resistance |
| `demo_v0.2` | Preserved — spec-compliant, multi-chain, 7 CREATE2 contracts |
| `demo_v0.1` | Preserved snapshot — fast-iteration development, not ECIP-aligned |

## Related Repos

- [olympia-treasury-contract](https://github.com/olympiadao/olympia-treasury-contract) — Treasury vault (pure Solidity, no OZ)
- [olympia-governance-contracts](https://github.com/olympiadao/olympia-governance-contracts) — Governor, Executor, ECFPRegistry, NFT, Sanctions
- [olympia-brand](https://github.com/olympiadao/olympia-brand) — Design tokens, logos, favicons
- [olympiadao-org](https://github.com/olympiadao/olympiadao-org) — Landing page
- [ethereumclassicdao-org](https://github.com/EthereumClassicDAO/ethereumclassicdao-org) — Institutional website
- [olympia-app](https://github.com/olympiadao/olympia-app) — Governance UI
