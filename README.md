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

## Deployed Contracts (Demo v0.2)

All governance contracts deployed via **CREATE2** (deterministic deployer factory). Treasury deployed via **CREATE**. Identical addresses on Mordor Testnet (63) + ETC Mainnet (61). All source verified on Blockscout.

| Contract | Address |
|----------|---------|
| Treasury | [`0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf`](https://etc.blockscout.com/address/0x035b2e3c189b772e52f4c3da6c45c84a3bb871bf) |
| Executor | [`0x64624f74F77639CbA268a6c8bEDC2778B707eF9a`](https://etc.blockscout.com/address/0x64624f74f77639cba268a6c8bedc2778b707ef9a) |
| Governor | [`0xB85dbc899472756470EF4033b9637ff8fa2FD23D`](https://etc.blockscout.com/address/0xb85dbc899472756470ef4033b9637ff8fa2fd23d) |
| Timelock | [`0xA5839b3e9445f7eE7AffdBC796DC0601f9b976C2`](https://etc.blockscout.com/address/0xa5839b3e9445f7ee7affdbc796dc0601f9b976c2) |
| ECFP Registry | [`0xFB4De5674a6b9a301d16876795a74f3bdacfa722`](https://etc.blockscout.com/address/0xfb4de5674a6b9a301d16876795a74f3bdacfa722) |
| Governance NFT | [`0x73e78d3a3470396325b975FcAFA8105A89A9E672`](https://etc.blockscout.com/address/0x73e78d3a3470396325b975fcafa8105a89a9e672) |
| Sanctions Oracle | [`0xfF2B8D7937D908D81C72D20AC99302EE6ACc2709`](https://etc.blockscout.com/address/0xff2b8d7937d908d81c72d20ac99302ee6acc2709) |

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
| `demo_v0.1` | Preserved snapshot — fast-iteration development, not ECIP-aligned |
| `demo_v0.2` | Active development — spec-compliant, multi-chain, 7 CREATE2 contracts |
| `main` | Production — deployed after Olympia activates on ETC mainnet |

## Related Repos

- [olympia-treasury-contract](https://github.com/olympiadao/olympia-treasury-contract) — Treasury vault (pure Solidity, no OZ)
- [olympia-governance-contracts](https://github.com/olympiadao/olympia-governance-contracts) — Governor, Executor, ECFPRegistry, NFT, Sanctions
- [olympia-brand](https://github.com/olympiadao/olympia-brand) — Design tokens, logos, favicons
- [olympiadao-org](https://github.com/olympiadao/olympiadao-org) — Landing page
- [ethereumclassicdao-org](https://github.com/EthereumClassicDAO/ethereumclassicdao-org) — Institutional website
- [olympia-app](https://github.com/olympiadao/olympia-app) — Governance UI
