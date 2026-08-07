# AGENTS.md — olympiatreasury-org

Live monitoring dashboard for the **Olympia Treasury** (ECIP-1112), the immutable,
protocol-controlled vault that receives Ethereum Classic's EIP-1559 basefee revenue.
Read-only: it displays balance, transaction history, inflow/outflow KPIs, a balance
chart, deployed contract addresses, and governance context. No wallet is required and
none is connected.

- **Domain:** olympiatreasury.org
- **Repo:** `olympiadao/olympiatreasury-org`
- **Deploy:** Vercel
- **Branches:** `main` plus `demo_v*` version branches. Work on `main`; version
  branches take cherry-picks from it.

---

## Setup and commands

```bash
pnpm install       # install dependencies
pnpm dev           # dev server (Turbopack)
pnpm build         # production build
pnpm start         # production server
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
```

**Validation before every commit:** `pnpm lint && pnpm typecheck && pnpm build`.

There is **no `test` script** in `package.json`, and no test runner is configured. Do
not assume one exists or invent a call to one. `lint` and `typecheck` are the only
gates, plus a successful build.

## Stack

Read from `package.json`; versions below are the major series actually in use.

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
| Package manager | pnpm | 10.x (`packageManager: pnpm@10.28.2`) |

## Structure

```
app/
  layout.tsx            → root layout: fonts, metadata, JSON-LD, providers
  page.tsx              → dashboard; prefetches treasury data server-side, then
                          hydrates the live sections
  upgrade/page.tsx      → Olympia upgrade explainer (ECIPs, EIP set, client guides, FAQ)
  globals.css           → design tokens + Tailwind @theme (light + dark)
  sitemap.ts, manifest.ts, robots.txt/route.ts, not-found.tsx
components/
  sections/             → NavHeader, TreasuryHeroHeader, DashboardHero, BalanceChart,
                          TreasuryFundingSection, TransactionsSection, AboutSection,
                          AboutContractsClient, RoadmapSection, FooterSection
  ui/                   → FadeIn, SectionDivider, PropertyCard, Accordion, CountdownBanner
  chain-selector.tsx, theme-provider.tsx, theme-toggle.tsx
lib/
  config.ts             → chain config (Mordor 63, ETC 61), Blockscout API bases
  contracts.json        → deployed contract addresses; single source of truth
  treasury.ts           → Blockscout fetchers + ECIP-1017 reward computation
  olympia-countdown.ts  → activation-block constant and countdown status type
  hooks/                → use-treasury, use-chain, use-chain-config
  providers.tsx, utils.ts
public/
  llms.txt              → machine-readable site summary; keep in sync with page copy
```

**Composition rule:** a page imports section components. Do not inline sections into a
page file.

## Live data

Every figure on the dashboard comes from **Blockscout API v2**, chain-aware via
`lib/config.ts` (Mordor `etc-mordor.blockscout.com/api/v2`, mainnet
`etc.blockscout.com/api/v2`). There is no second upstream.

- The page prefetches stats, transactions and balance history server-side, then React
  Query keeps them fresh on the client — balance and stats every 10 minutes,
  transactions every 5.
- **Block rewards are computed client-side**, not read from Blockscout:
  `ecip1017Reward()` in `lib/treasury.ts` implements ECIP-1017's era schedule because
  Blockscout reports Mordor rewards incorrectly. Era length differs per chain — 2,000,000
  blocks on Mordor, 5,000,000 on mainnet — and lives in `lib/config.ts`.
- Contract addresses come from `lib/contracts.json` only. Deterministic CREATE2 (salt
  `OLYMPIA_DEMO_V0_3`) gives identical addresses on both chains. Never hardcode an
  address in a component.
- Chain selection is a URL search param (`?chain=63`), read through `use-chain.ts`.

**A derived figure states its own basis.** Where a number depends on an upstream
constant that can change (block time, era length, reward schedule), read it from the
source rather than hardcoding a divisor, and label any fallback as an estimate rather
than rendering it as live.

## Design system

- **Brand:** Olympia green plus an **amber treasury accent**. Amber (`--brand-amber`)
  is this site's correct secondary accent — it is reserved to the treasury across the
  suite, so it belongs here and nowhere else. Do not strip it.
- **Theme-aware:** light and dark tokens are both defined in `globals.css`, and green
  inverts between them (`#00a872` light, `#00ffae` dark). Never hardcode `text-white`,
  `text-black`, or a brand hex in a component — use `var(--text-primary)`,
  `var(--brand-green)` and friends. A dark-theme green hardcoded into a chart renders
  at 1.32:1 on the light background.
- **Recharts is the exception, and it is still theme-aware.** Recharts needs literal
  color values, so `BalanceChart` resolves them from `resolvedTheme` in JS. Every color
  in that file must switch on `isDark`; none may be a bare hex.
- **Fonts:** Inter (body) + JetBrains Mono (code, addresses, figures) via
  `next/font/google`. Contract addresses are always `font-mono`.
- **Cards:** `rounded-xl` + `var(--border-default)` + `var(--bg-card)`, with
  `var(--card-shadow)`.
- **Icons:** Lucide only, 16–20px, on tinted `rounded-lg` backgrounds. No Font Awesome.
- **Animation:** CSS transitions and the `FadeIn` wrapper (IntersectionObserver,
  staggered delays). No R3F, GSAP, or Lenis.
- **EIP badges:** violet CSS variables (`--color-violet`), linked to
  `eips.ethereum.org`. The renderers are data-driven — adding an EIP to the array gives
  it the badge and the link automatically.
- **Contrast:** WCAG AA, verified in **both** themes. Compute the ratio before changing
  a color; a pairing that looks wrong can be correct where the token inverts.

## Content and positioning

- **Treasury (ECIP-1112) validates nothing.** `withdraw(recipient, amount)` checks only
  that the caller is the Executor. It performs no proposal validation, no metadata
  hashing, no governance logic. Proposal integrity comes from OpenZeppelin Governor
  5.x's `proposalId = hashProposal(targets, values, calldatas, descriptionHash)`.
- **Governance stack:** OpenZeppelin Governor 5.x → TimelockController → Executor →
  Treasury. Membership is non-transferable NFTs; there is no governance token.
- **Funding proposals are OFPs** — Olympia Funding Proposals, per ECIP-1114, submitted
  through the `OFPRegistry`. Not "ECFP": that spelling predates the spec and is being
  retired from the contracts as they are redeployed.
- **OFP submission is permissionless and carries no bond.** ECIP-1114 is explicit:
  submission is *"permissionless subject only to the Governor's own `proposalThreshold()`
  — no separate Registry-level bond, cooldown, or draft period"*, and the Registry
  *"implements no separate bonding, cooldown, or review-period mechanism."* OpenZeppelin
  Governor 5.x has no bond primitive either — `proposalThreshold` is a voting-power
  floor, not an escrowed deposit. Never describe a bond, a slash, or an "intake review":
  the last also implies the off-chain gatekeeper ECIP-1114 forbids. The DAO *may* later
  adopt a **refundable** deposit as an optional, opt-in mitigation; that is a future
  governance decision, not current behavior, and it is refundable rather than slashable.
- **Sanctions (ECIP-1119):** exactly two checkpoints — proposal submission and
  execution before funds leave. Both fail closed when no oracle is set.
- **Futarchy (ECIP-1117/1118):** a signal layer and a Child-DAO under ECIP-1113 §6. It
  runs its own Governor instance internally, holds no Treasury-facing interface, and is
  funded by executed proposals — no basefee is routed to it. Binding authority stays
  with the main Olympia DAO. Never describe it as determining allocation, executing
  itself, or replacing membership voting.
- **Smoothing is two-stage.** ECIP-1115 experiments at the contract layer, adjustable
  without a hard fork, while ECIP-1017 block rewards still secure the network.
  ECIP-1116 hard-forks the proven curve into block finalization, paid by the protocol
  rather than the Treasury and no longer governance-adjustable. Do not describe the
  contract layer as the only feasible approach.
- **Olympia EVM alignment:** advances the execution layer through Dencun, Pectra and
  Fusaka, and carries that work into Glamsterdam. Do **not** claim "full Glamsterdam
  parity" — ECIP-1121 includes two of Glamsterdam's seven execution-layer EIPs
  (EIP-7975, EIP-7997); the rest are blocked on EIP-7928 and EIP-4788 dependencies, not
  on Proof-of-Stake grounds. The "independent of Proof-of-Stake and blob data
  availability" qualifier is true of the first three cycles and false of Glamsterdam.
- **Activation:** targeted for **2027**, never "before 2027". The activation *block* is
  TBD. The countdown fallback date and its caption are separate strings — change both.
- **Clients:** Fukuii is ETC's first native client. Core-Geth is a go-ethereum
  derivative maintained for ETC. Besu, Erigon, Ethrex, Go-Ethereum, Nethermind and Reth
  are ETC **plugins** — never "overlays".
- **Naming:** "Ethereum Classic's Olympia DAO", never "OlympiaDAO" as one word.
- **Never say:** "off-chain administrative executor", "subordinate to on-chain
  governance", SHALL/MUST NOT in rendered copy, ECIP-1120 references, "hash-bound
  tuples", "governance pipeline".

**Write timeless.** No "future work", "coming soon", "planned post-X". Describe what a
thing is; put mutable status in a structured field such as a badge or a status
property, so changing it later is one edit rather than a prose hunt.

**Never publish internal development context.** Notes, judgment calls in progress and
operational context belong in `.local/`, which is gitignored.

## Boundaries

**Protected — do not modify without explicit approval**

- `app/globals.css` — design tokens and Tailwind theme
- `app/layout.tsx` — root layout, fonts, metadata, JSON-LD
- `lib/contracts.json` — deployed addresses; must match what is on-chain. Consumed by
  key for `treasury` and `executor` (`lib/config.ts`) and by `Object.values` everywhere
  else, so a contract's display name can be corrected but its address cannot be guessed
- `public/logo.svg`, `public/og-image.png`, `app/icon.svg`, `app/favicon.ico`,
  `public/android-chrome-*` — brand assets, do not regenerate
- `tsconfig.json`, `next.config.ts` — build configuration

**Ask first**

- Changing section order or content structure
- Adding a page beyond the existing route set
- Modifying brand colors
- Dependency changes — route these to the `sentinel` agent

**Never**

- Commit `.env` files, credentials, or anything under `.local/`
- Add a wallet connector — this dashboard is read-only by design
- Add R3F, GSAP, or Lenis
- Use a color outside the Olympia palette
- Use `any` without justification, or silence a type error with `@ts-ignore`

## Upstream sources of truth

The Olympia content on this site is downstream of specs that live elsewhere. When they
disagree, the spec wins and the site is corrected.

| Subject | Authority |
|---|---|
| Olympia ECIPs (1111–1122) | the ECIPs repository |
| EIP contents and dependencies | `eips.ethereum.org` |
| Fukuii positioning and URLs | fukuii.org and `fukuii-cli/NOTICE` |
| Deployed contract addresses | the chain, mirrored in `lib/contracts.json` |
