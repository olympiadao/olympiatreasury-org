# OlympiaTreasury.org — Claude Code Instructions

## Project Context

Live treasury monitoring dashboard for the ECIP-1112 protocol-controlled vault on Ethereum Classic. Displays real-time balance, transaction history, inflow/outflow KPIs, balance chart, contract addresses, and governance context. Read-only, no wallet required.

**URL:** https://olympiatreasury.org
**Repo:** `olympiadao/olympiatreasury-org`
**Deploy:** Vercel

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
- viem (RPC client, no wallet)
- @tanstack/react-query (data fetching + caching)
- recharts (balance history chart)
- Lucide React (icons)
- pnpm 10, Node 24

## Quick Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Structure

```
app/
  globals.css     # Tailwind + Olympia design tokens
  layout.tsx      # Root layout, fonts, metadata, Providers
  page.tsx        # Main page (dashboard sections)
components/
  sections/
    NavHeader.tsx           # Sticky nav
    DashboardHero.tsx       # KPI cards (balance, inflows, outflows, tx count)
    BalanceChart.tsx         # Area chart (recharts)
    TransactionsSection.tsx  # Recent inflows/outflows table
    AboutSection.tsx         # Collapsible: fund flow, invariants, security, stages, contracts
    FooterSection.tsx        # Footer links
lib/
  config.ts       # Chain config, treasury address, API URLs
  treasury.ts     # Data fetching (Blockscout API + ECIP-1017 reward calc)
  providers.tsx   # React Query provider
  hooks/
    use-treasury.ts  # React Query hooks
  utils.ts        # cn() helper
public/
  logo.svg        # Olympia torch logomark
```

## Brand

- Primary: `#00ffae` (neon green)
- Secondary: `#F59E0B` (amber — treasury accent)
- Background: `#0a0f10` (dark)
- Font: Inter (UI) + JetBrains Mono (code/addresses)
- Dark-first design, translucent cards, CSS transitions only

## Data Sources

- **All data:** Blockscout API v2 — chain-aware (Mordor: `etc-mordor.blockscout.com/api/v2`, ETC: `etc.blockscout.com/api/v2`)
- **Block rewards:** Client-side ECIP-1017 computation (`ecip1017Reward()` in `lib/treasury.ts`) — Blockscout reports incorrect Mordor rewards
- **Refresh:** Balance/stats every 10min, transactions every 5min (React Query: `refetchInterval` / `staleTime`)
- **Static copy:** Based on `/media/dev/2tb/dev/olympiadao/olympia-framework/README.md`

## Key Addresses

Production addresses TBD — deploy after Olympia activation.

Demo v0.2 (deterministic CREATE2, identical on Chain 61 + 63):
- Treasury: `0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf`
- Executor: `0x64624f74f77639cba268a6c8bedc2778b707ef9a`

## Supported Chains

- Mordor Testnet (chain 63) — default, eraLength: 2,000,000
- ETC Mainnet (chain 61) — eraLength: 5,000,000

Chain config in `lib/config.ts`. Chain selector uses URL search params (`?chain=63`).
Hooks: `lib/hooks/use-chain.ts`, `lib/hooks/use-chain-config.ts`.

## Boundaries

### Always Do
- Keep contract addresses consistent with framework README
- Use Lucide icons (not Font Awesome)
- Maintain WCAG AA contrast ratios
- Use JetBrains Mono for contract addresses

### Ask First
- Changing section order or content structure
- Adding new dependencies
- Modifying brand colors

### Never Do
- Commit secrets
- Add R3F, GSAP, or Lenis (CSS transitions only)
- Use colors outside the Olympia palette

## Protected Files

Modify with care — these affect the entire site:
- `app/globals.css` — design tokens and Tailwind theme
- `app/layout.tsx` — root layout, fonts, metadata
- `public/logo.svg` — brand logomark (do not regenerate)
- `tsconfig.json`, `next.config.ts` — build configuration

## Validation

Before every commit:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

All three must pass.
