# GitHub Copilot Instructions — olympiatreasury-org

This file is self-contained. Copilot reads `AGENTS.md` on some surfaces and not others,
so everything needed to work in this repo is repeated here. When the two disagree,
`AGENTS.md` at the repo root is the one to correct, and this file follows it.

## Project

Live monitoring dashboard for the **Olympia Treasury** (ECIP-1112), the immutable,
protocol-controlled vault that receives Ethereum Classic's EIP-1559 basefee revenue. It
displays balance, transaction history, inflow/outflow KPIs, a balance chart, deployed
contract addresses, and governance context. Read-only: no wallet is connected and none
should be added.

Deployed to Vercel at olympiatreasury.org.

## Commands

```bash
pnpm install       # install dependencies
pnpm dev           # dev server (Turbopack)
pnpm build         # production build
pnpm start         # production server
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
```

**Before every commit:** `pnpm lint && pnpm typecheck && pnpm build`.

There is **no `test` script** and no test runner configured. Do not assume one exists or
invent a call to one.

## Stack

Read from `package.json`; these are the major series in use.

| Layer | Technology | Version |
|-------|------------|---------|
| Runtime | Node.js | 24.x (`engines.node: >=24`) |
| Framework | Next.js | 16.x (App Router, Turbopack) |
| UI | React | 19.x |
| Language | TypeScript | 5.x, strict |
| Styling | Tailwind CSS | 4.x (CSS-first, `@theme inline`) |
| Data fetching | @tanstack/react-query | 5.x |
| Chain client | viem | 2.x (RPC only — no wallet connector) |
| Charts | Recharts | 3.x |
| Theming | next-themes | 0.4.x |
| Icons | Lucide React | latest |
| Package manager | pnpm | 10.x |

Do not suggest Node 22, Next.js 14/15, or React 18.

## Structure

```
app/          → routes, layout, globals.css, sitemap/manifest/robots
components/
  sections/   → page sections (NavHeader, DashboardHero, BalanceChart, …)
  ui/         → FadeIn, SectionDivider, PropertyCard, Accordion, CountdownBanner
lib/          → config.ts (chains), contracts.json (addresses), treasury.ts
                (Blockscout fetchers + ECIP-1017 rewards), hooks/, providers.tsx, utils.ts
public/       → llms.txt, logo.svg, og-image.png, chain icons
```

A page imports section components. Do not inline sections into a page file.

## Data

- **One upstream: Blockscout API v2**, chain-aware via `lib/config.ts` — Mordor
  (chain 63) and ETC mainnet (chain 61).
- **Block rewards are computed client-side** by `ecip1017Reward()` in `lib/treasury.ts`,
  because Blockscout reports Mordor rewards incorrectly. Era length is per-chain and
  lives in `lib/config.ts`.
- **Contract addresses come from `lib/contracts.json` only.** It is the single source of
  truth and mirrors what is deployed on-chain. Never hardcode an address in a component,
  and never copy one into an instruction file — a stale copy will be wrong.
- Chain selection is a URL search param (`?chain=63`).

## Code style

- 2-space indentation, double quotes, semicolons, trailing commas in multiline
- Use CSS custom properties from `app/globals.css` for every color
- Use `cn()` from `@/lib/utils` for conditional classes
- Use JetBrains Mono (`font-mono`) for contract addresses and numeric figures
- Use Lucide React for icons — no Font Awesome
- CSS transitions only — no GSAP, R3F, or Lenis

## Theming and contrast

Light and dark tokens are both defined in `globals.css`, and brand green **inverts**
between them (`#00a872` light, `#00ffae` dark).

- Never hardcode `text-white`, `text-black`, or a brand hex in a component. Use
  `var(--text-primary)`, `var(--brand-green)`, and friends.
- Recharts needs literal values, so `BalanceChart` resolves colors from `resolvedTheme`
  in JS. Every color there must switch on `isDark`; none may be a bare hex.
- Amber (`--brand-amber`) is this site's correct secondary accent — it is the treasury
  accent across the suite. Keep it.
- Maintain WCAG AA in **both** themes. Compute the ratio before changing a color.

## Content rules

- The Treasury validates nothing: `withdraw(recipient, amount)` checks only that the
  caller is the Executor. Proposal integrity comes from OpenZeppelin Governor 5.x.
- Governance stack: Governor 5.x → TimelockController → Executor → Treasury — the
  exclusive on-chain path to Treasury funds.
- **CoreNFT is the governance token**: soulbound, one *non-delegable* vote per member,
  delegation locked to self. Supply is unbounded; membership grows by governance
  proposal and is revocable and resignable by burn. Admission is **earned, never
  bought**. **Never write "there is no governance token"** — Olympia lacks a *fungible,
  transferable, purchasable* token, which is a different claim.
- Deployment is **staged**: Treasury at the Stage 1 hard fork via plain `CREATE`; the
  governance suite at Stage 2. Only CoreNFT/Executor/Governor use `CREATE2`. Never
  describe the whole set as "deployed via deterministic CREATE2", and never say
  deployment is simultaneous or circularly address-dependent.
- Approval is a **strict majority** of For over Against (`GovernorCountingSimple`),
  Abstain counting toward quorum only. No configurable percentage, no supermajority at
  Stage 2. Never write "≥60%".
- Funding proposals are **OFPs** (Olympia Funding Proposals, ECIP-1114). Never "ECFP".
  Submission is permissionless, gated by `proposalThreshold()` against the author. The
  Registry is the standard path, **not a chokepoint** — `Governor.propose()` is public,
  and a direct proposal reaches the same pipeline. The pipeline is exclusive; the
  Registry is not.
- Sanctions (ECIP-1119): every contract that releases value screens the recipient
  immediately before release and fails closed. For Treasury funds the **binding**
  checkpoint is the Executor; the submission check is a fail-fast convenience, not a
  second barrier. The guarantee is over receipt, not participation.
- Futarchy (ECIP-1117/1118) is a signal layer and a Child-DAO. It never binds, never
  executes itself, and receives no basefee directly. Collateral is ETC and Classic USD,
  custodied by the Conditional Token Framework. Markets are open to anyone holding
  either — access to governance is gated, influence over it is not.
- Olympia advances the execution layer through Dencun, Pectra and Fusaka, and carries
  that work into Glamsterdam. Do not write "full Glamsterdam parity".
- Activation is targeted for **2027**, never "before 2027". The activation block is TBD.
- Fukuii is ETC's first native client; Core-Geth is a go-ethereum derivative; Besu,
  Erigon, Ethrex, Go-Ethereum, Nethermind and Reth are ETC **plugins**, never "overlays".
- Write "Ethereum Classic's Olympia DAO", never "OlympiaDAO" as one word.
- Write timeless copy. No "coming soon" or "future work"; put mutable status in a badge
  or status field.

## Protected files

Do not modify without an explicit request:

- `app/globals.css` — design tokens
- `app/layout.tsx` — root layout, fonts, metadata, JSON-LD
- `lib/contracts.json` — deployed addresses
- `public/logo.svg`, `public/og-image.png`, `app/icon.svg`, `app/favicon.ico`
- `tsconfig.json`, `next.config.ts`

## Never

- Commit `.env` files, credentials, or anything under `.local/`
- Add a wallet connector — this dashboard is read-only by design
- Use `any` without justification, or silence a type error with `@ts-ignore`
- Use a color outside the Olympia palette
