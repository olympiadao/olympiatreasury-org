# GitHub Copilot Instructions — olympiatreasury-org

This file is self-contained. Copilot reads `AGENTS.md` on some surfaces and not others,
so everything needed to work in this repo is repeated here. When the two disagree,
`AGENTS.md` at the repo root is the one to correct, and this file follows it.

## Project

Live monitoring dashboard for Ethereum Classic's base-fee revenue, **from the ECIP-1112
Olympia Sovereignty Vault that receives it to the ECIP-1113 Olympia Treasury that holds
it**. It displays each address's balance, transaction history, inflow and sweep KPIs, a
balance chart, the contract architecture, and governance context. Read-only: no wallet
is connected and none should be added.

Deployed to Vercel at olympiatreasury.org.

## The two contracts — read this before writing any copy

**This is the single most important thing about this site, and the site was once wrong
about it.** Its title and meta description described *one* contract that both received
the base fee and disbursed it. No such contract exists; that was the pre-respec
architecture, and the respec split it in two.

| | **Olympia Sovereignty Vault** | **Olympia Treasury** |
|---|---|---|
| Spec | **ECIP-1112** | **ECIP-1113 §1.3** |
| Is | the permanent hardcoded `BASEFEE` destination | the stock OpenZeppelin `TimelockController` |
| Funds | **land** here | **live** here while governance decides |
| Balance means | revenue arrived and not yet swept | funds under governance control |
| Lifetime | **immutable, never replaced** | replaceable by governance, no fork |

Present the two as **one system with two addresses**, never as one contract. The domain
name is not a mistake: this is the treasury dashboard, and the Vault is the front door
to the treasury.

- **The Treasury is emphatically not immutable.** **Exactly one contract in Olympia is
  permanent, and it is the Vault.** Everything downstream is replaceable by ordinary
  governance without a fork.
- **Never attribute the Treasury to ECIP-1112.** That ECIP specifies the Vault alone.
- **"Sovereignty Vault" names the contract, never the money.** A lowercase "sovereignty
  vault" standing for the fund reads as the Treasury. This repo has zero; keep it there.
- **A near-empty Vault is the system working** — revenue completed its journey, rather
  than revenue missing.

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
  sections/   → page sections (NavHeader, DashboardHero, BalanceChart,
                VaultToTreasurySection, …)
  ui/         → FadeIn, SectionDivider, PropertyCard, Accordion, AddressLink
lib/          → config.ts (chains + the two monitored addresses),
                contracts.json (architecture, no addresses),
                treasury.ts (Blockscout fetchers + ECIP-1017 rewards),
                hooks/, providers.tsx, utils.ts
public/       → llms.txt, logo.svg, og-image.png, chain icons
```

A page imports section components. Do not inline sections into a page file.

## Data

- **One upstream: Blockscout API v2**, chain-aware via `lib/config.ts` — Mordor
  (chain 63) and ETC mainnet (chain 61).
- **Two addresses per chain, in `lib/config.ts`:** `vault` (the base-fee destination)
  and `treasury` (the Timelock it sweeps into). Both are chain configuration. Never
  hardcode an address in a component, and never copy one into an instruction file — a
  stale copy will be wrong.
- **`lib/contracts.json` carries no addresses and must not be given any.** It publishes
  the architecture — `name` / `spec` / `role` per contract. ECIP-1112 requires the
  Vault's real deployed address to be published with the network it is on, and makes
  Mainnet's and Mordor's independent values.
- **Block rewards are computed client-side** by `ecip1017Reward()` in `lib/treasury.ts`,
  because Blockscout reports Mordor rewards incorrectly. Era length is per-chain and
  lives in `lib/config.ts`.
- Chain selection is a URL search param (`?chain=63`).

### What this dashboard may and may not display

- **The ECIP-1111 credit is a direct state write that executes no EVM code** — no
  event, no `receive()` body, no counter. **A "total received" figure cannot come from
  contract state**; it is derived from block headers (`gasUsed × baseFeePerGas`) or an
  explorer's balance history, and the site says which.
- **The Vault must not track received value in a state variable** (ECIP-1112 §"No
  Internal Accounting"). There is no on-chain total to read.
- **`Swept(destination, amount)` is the only event.** Anything presented as a receipt
  log is a sweep log, and the two differ.
- **A balance delta between sweeps is not base-fee revenue** — sweeps are
  caller-chosen and direct contributions are an intended path. Label a lifetime inflow
  figure as total received, never as base-fee revenue.
- **Nothing causes `sweep()` to be called.** It is permissionless *and* unincentivized.
  **Time since last sweep, and balance sitting unswept, are exactly what a monitoring
  dashboard should surface.**

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

**The Vault (ECIP-1112)**

- No owner, no role, no setter, no parameter. Its whole behavior is to receive value and
  forward it, unchanged, to one address fixed at construction — the ECIP-1113 Timelock.
- **`sweep()` is permissionless *because* `destination` is immutable** — a caller
  chooses only *when* the balance moves, never *where*. This is the exact inversion of
  the OP Stack `BaseFeeVault` pattern, whose `recipient` is mutable state behind a
  proxy, and that is the one property of that design that must not be copied.
- **There is no minimum sweep threshold**, deliberately. A disbursement batch should
  lead with a `sweep()`, because a proposal executing while the balance still sits in
  the Vault reverts on insufficient value in the Timelock.
- **Nothing is predicted.** ECIP-1112 forbids `CREATE2` derivation, an init-code freeze
  and reserved deployer nonces as the basis of the consensus commitment. **Never write
  `CREATE2`, a salt, or a reserved nonce into site copy, and never claim addresses are
  identical across the two networks.** An address-derivation explanation describes a
  design that no longer exists and is deleted rather than corrected.

**The base fee (ECIP-1111)**

- **Ethereum Classic has no base fee today** — EIP-1559 is not active here, so the
  component does not exist rather than being zero. ECIP-1111 *introduces* it and directs
  it to the Vault instead of burning it as Ethereum does.
- **Never write "the burned half, redirected", or that ETC's base fee is burned or
  discarded today.** Nothing is currently burned, so nothing changes destination.
  ECIP-1112 §"Simple Summary" prohibits all three phrasings in terms.
- **"The burned half" is correct only of *Ethereum*,** which does burn its base fee.
  That contrast is the explanation the site needs; keep those uses.
- Base fee is not the transaction fee: a transaction pays base fee **plus** a priority
  tip, and tips and ECIP-1017 block rewards are untouched by the whole suite.
- **Write "base fee" or "base-fee", never "basefee" as one word.**
- ECIP-1111 §Rationale is the only source for a gas or utilization figure, and it
  publishes no revenue figure at all. Never publish a value for `f`, `N` or `L(j)`.

**Governance (ECIP-1113/1114/1119)**

- **There is no separate executor contract, and none may be introduced.** Execution is
  `TimelockController.execute()`/`executeBatch()` gated on `EXECUTOR_ROLE`, granted to
  the Governor and to nothing else. **`OlympiaExecutor` does not exist** — never name
  it, and never write "Governor → Timelock → Executor → Treasury".
- **The binding sanctions checkpoint is `Governor._executeOperations`, a `virtual`
  override rather than a contract.** It sits above the Timelock and screens every
  externally-directed target. The OFP Registry's submission check is a fail-fast
  convenience, not a second barrier. The guarantee is over receipt, not participation.
- The Treasury validates nothing about proposals; integrity comes from OpenZeppelin
  Governor 5.x.
- **CoreNFT is the governance token**: soulbound, one *non-delegable* vote per member,
  delegation locked to self. Supply is unbounded; membership grows by governance
  proposal and is revocable and resignable by burn. Admission is **earned, never
  bought**, and no identity verification is required or may be imposed. **Never write
  "there is no governance token"** — Olympia lacks a *fungible, transferable,
  purchasable* token, which is a different claim. Never describe membership as closed,
  exclusive, or a fixed council.
- Approval is a **strict majority** of For over Against (`GovernorCountingSimple`),
  Abstain counting toward quorum only. No configurable percentage, no supermajority.
  Never write "≥60%".
- Funding proposals are **OFPs** (Olympia Funding Proposals, ECIP-1114). **Never
  "ECFP".** Submission is permissionless and carries no bond, gated only by
  `proposalThreshold()` against the author. The Registry is the standard path, **not a
  chokepoint** — `Governor.propose()` is public, and a direct proposal reaches the same
  pipeline. The path to funds is exclusive; the Registry is not.
- **ECIP-1118 is milestone-gated disbursement**, available to **any** Olympia funding
  proposal, not only futarchy-originated ones.

**Affiliated DAOs and futarchy (ECIP-1113 §6, ECIP-1117/1118)**

- **"Child-DAO" is retired.** The term is **Affiliated DAO**: a separate,
  mission-scoped body working *alongside* Olympia DAO, not beneath it.
- **Futarchy decides allocation. "A signal layer, never binding" is wrong.** Olympia DAO
  decides *whether and how much* to seed a season, in a binding CoreNFT vote competing
  against client maintenance and security response. **Within a seeded season the market
  decides who receives grants** — ECIP-1113 §6: once transferred, *"Olympia DAO has no
  say in how it is allocated."* Write **"the public decides to whom"**; never
  "advisory", "signal only", or "never binding".
- **The allocation unit is a SEASON, not a round.** A season is seeded before it opens,
  must not draw on another season's seed or roll a remainder forward, and is never
  automatic.
- No base fee is routed to any Affiliated DAO; its infrastructure is funded by an
  ordinary executed OFP, and it holds no Treasury-facing interface. Collateral is ETC
  and Classic USD, custodied by the Conditional Token Framework. Markets are open to
  anyone holding either — access to governance is gated, influence over it is not.
- Gitcoin and Optimism are the stated inspiration for the grants model; no claim about
  what either actually did may appear. Write the mechanism, not the precedent.

**Smoothing, EVM alignment, clients**

- Smoothing is two-stage: ECIP-1115 at the contract layer, adjustable without a fork;
  ECIP-1116 hardens the proven curve into block finalization at a later, separate hard
  fork, paid by the protocol rather than the Treasury.
- Olympia advances the execution layer through Dencun, Pectra and Fusaka, and carries
  that work into Glamsterdam. Do not write "full Glamsterdam parity".
- Fukuii is ETC's first native client; Core-Geth is a go-ethereum derivative; Besu,
  Erigon, Ethrex, Go-Ethereum, Nethermind and Reth are ETC **plugins**, never
  "overlays". **Do not write which specs any client currently tracks.**
- Write "Ethereum Classic's Olympia DAO", never "OlympiaDAO" as one word.

## The ECIP allow-list

**No ECIP number outside the eleven appears in Olympia content**, except an ECIP the
site legitimately references in its own right — ECIP-1017, ECIP-1100, ECIP-1109,
ECIP-1051, ECIP-1098, ECIP-1099 and ECIP-1000.

The eleven, stated positively: **ECIP-1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118,
1119, 1121, 1122.** This is an allow-list rather than a deny-list on purpose: a rule
that names a number in order to forbid it puts that number in the file, and the file is
what a session writes from.

## Write the completed product

This site describes a released upgrade with a live Treasury. A reader arriving in two
years must find copy still true, with nothing to update — page copy, headings, titles,
meta descriptions, OG tags, structured data, `sitemap` and `llms.txt` equally.

**Banned:** "will", "is planned", "upcoming", "coming soon", "currently", "as of
today", "recently", "now live", "so far", "to date", "pending", "not yet", a countdown,
a progress bar, a "Stage N complete" badge, an implementation-status matrix, or a
calendar date presented as news.

**A structural fact is timeless even when it concerns ordering** — ECIP-1116 activates
at a later, separate hard fork; a season is seeded before it allocates; contracts are
deployed before the activation block. Do not delete staging from the architecture; what
is banned is narrating where anyone stands inside it.

**Never delete a client endpoint, repository, contract address, or integration detail.**
A live balance rendered from chain state at request time is data, not copy, and is
exactly right for this site. A hardcoded figure is a timestamp in disguise.

## Protected files

Do not modify without an explicit request:

- `app/globals.css` — design tokens
- `app/layout.tsx` — root layout, fonts, metadata, JSON-LD
- `public/logo.svg`, `public/og-image.png`, `app/icon.svg`, `app/favicon.ico`
- `tsconfig.json`, `next.config.ts`

## Dependency updates are not automated here

**`.github/dependabot.yml` was removed by operator decision on 2026-08-12**, together
with the five open version-bump PRs and their branches. **Its absence is a decision,
not a gap: do not re-add it as a conformance fix.** Version updates are off, automated
security-fix PRs are off, and Dependabot alerts remain on — alerts notify and open
nothing. Every dependency change is a deliberate, manual act, and removing the config
also removed this repo's cooldown gate, so the release-age check comes from the
machine-wide package-manager setting alone.

## Never

- Commit `.env` files, credentials, or anything under `.local/`
- Add a wallet connector — this dashboard is read-only by design
- Use `any` without justification, or silence a type error with `@ts-ignore`
- Use a color outside the Olympia palette
- Put an address into `lib/contracts.json`, or invent one anywhere
- Re-add `.github/dependabot.yml` — see above
