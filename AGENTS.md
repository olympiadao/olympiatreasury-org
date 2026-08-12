# AGENTS.md — olympiatreasury-org

Live monitoring dashboard for Ethereum Classic's base-fee revenue, **from the
ECIP-1112 Olympia Sovereignty Vault that receives it to the ECIP-1113 Olympia Treasury
that holds it**. Read-only: it displays each address's balance, transaction history,
inflow and sweep KPIs, a balance chart, the contract architecture, and governance
context. No wallet is required and none is connected.

- **Domain:** olympiatreasury.org
- **Repo:** `olympiadao/olympiatreasury-org`
- **Deploy:** Vercel
- **Branches:** `main` plus `demo_v*` version branches. Work on `main`; version
  branches take cherry-picks from it.

---

## The two contracts — read this before writing any copy

**This is the single most important thing about this site, and the site was once
wrong about it.** Its title and meta description described *one* contract that both
received the base fee and disbursed it. No such contract exists. That was the
pre-respec architecture, and the respec split it in two.

| | **Olympia Sovereignty Vault** | **Olympia Treasury** |
|---|---|---|
| Spec | **ECIP-1112** | **ECIP-1113 §1.3** |
| Is | the permanent hardcoded `BASEFEE` destination | the stock OpenZeppelin `TimelockController` |
| Funds | **land** here | **live** here while governance decides |
| Balance means | revenue arrived and not yet swept | funds under governance control |
| Changes by | consensus credit in, `sweep()` out | `sweep()` in, executed proposals out |
| Lifetime | **immutable, never replaced** | replaceable by governance, no fork |

**The domain name is not a mistake and needs no reconciling.** This is the treasury
dashboard; the Vault is the front door to the treasury. Present the two as **one
system with two addresses**, never as one contract.

- **The Treasury is emphatically not immutable.** It is replaceable by ordinary
  governance without a fork. **Exactly one contract in Olympia is permanent, and it is
  the Vault.** Everything downstream — Governor, Timelock, CoreNFT, sanctions oracle,
  OFP Registry — is replaceable. That asymmetry is the whole design and is this site's
  most interesting story.
- **Never attribute the Treasury to ECIP-1112.** ECIP-1112 specifies the Vault and only
  the Vault.
- **"Sovereignty Vault" is the contract's name, not a name for the fund**, and the fund
  is not a thing any ECIP specifies. A lowercase "sovereignty vault" standing for the
  money reads as the Treasury. This repo has zero; keep it there.
- **A near-empty Vault is the system working.** A reader seeing an empty Vault and a
  funded Treasury must read that as revenue having completed its journey, not as
  revenue missing.

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
  page.tsx              → dashboard; prefetches chain data server-side, then
                          hydrates the live sections
  upgrade/page.tsx      → Olympia upgrade explainer (ECIPs, EIP set, client guides, FAQ)
  globals.css           → design tokens + Tailwind @theme (light + dark)
  sitemap.ts, manifest.ts, robots.txt/route.ts, not-found.tsx
components/
  sections/             → NavHeader, TreasuryHeroHeader, DashboardHero, BalanceChart,
                          VaultToTreasurySection, TreasuryFundingSection,
                          TransactionsSection, AboutSection, AboutContractsClient,
                          RoadmapSection, FooterSection
  ui/                   → FadeIn, SectionDivider, PropertyCard, Accordion, AddressLink
  chain-selector.tsx, theme-provider.tsx, theme-toggle.tsx
lib/
  config.ts             → chain config (Mordor 63, ETC 61), the two monitored
                          addresses per chain, Blockscout API bases
  contracts.json        → the contract architecture: name, spec and role per
                          contract. Carries no addresses, by design
  treasury.ts           → Blockscout fetchers + ECIP-1017 reward computation
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
- **Two addresses per chain, in `lib/config.ts`:** `vault` (the base-fee destination)
  and `treasury` (the Timelock it sweeps into). Both are chain configuration. Never
  hardcode an address in a component.
- **`lib/contracts.json` carries no addresses and must not be given any.** It publishes
  the architecture — `name` / `spec` / `role` per contract — so a contract's role can be
  corrected without anyone guessing a deployment. ECIP-1112 requires the Vault's real
  deployed address to be published **with the network it is on**, and makes Mainnet's
  and Mordor's independent values.
- **Block rewards are computed client-side**, not read from Blockscout:
  `ecip1017Reward()` in `lib/treasury.ts` implements ECIP-1017's era schedule because
  Blockscout reports Mordor rewards incorrectly. Era length differs per chain — 2,000,000
  blocks on Mordor, 5,000,000 on mainnet — and lives in `lib/config.ts`.
- Chain selection is a URL search param (`?chain=63`), read through `use-chain.ts`.

### What this dashboard may and may not display

These four facts are ECIP-1112's and they constrain the UI directly.

- **The ECIP-1111 credit is a direct state write that executes no EVM code.** No event
  fires, no `receive()` body runs, no counter increments. **A "total received" figure
  therefore cannot come from contract state** — it is derived from block headers
  (`gasUsed × baseFeePerGas`) or from an explorer's balance history, and the site says
  which.
- **The Vault MUST NOT track received value in a state variable** (ECIP-1112 §"No
  Internal Accounting"). There is no on-chain total to read, and a dashboard implying
  one is wrong about the contract.
- **`Swept(destination, amount)` is the only event**, emitted before the external call
  and carrying no governance metadata. Anything presented as a receipt log is a sweep
  log, and the two differ: value arrives many times between sweeps, and anyone may
  contribute to the Vault directly.
- **A balance delta between sweeps is not base-fee revenue.** `sweep()` is
  permissionless, so period boundaries are caller-chosen, and contributions are an
  intended path. ECIP-1115 §2.1 rejects both sources by name. Label a lifetime inflow
  figure as total received, never as base-fee revenue.

**Nothing causes `sweep()` to be called.** It is permissionless *and* unincentivized,
so at low revenue the gas can exceed the amount moved and no third party has reason to
call it. **Time since last sweep, and balance sitting unswept, are exactly what a
monitoring dashboard should surface.**

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

### The Vault (ECIP-1112)

- **It has no owner, no role, no setter, and no parameter.** Its whole behavior is to
  receive value and forward it, unchanged, to one address fixed at construction — the
  ECIP-1113 Timelock.
- **`sweep()` is permissionless *because* `destination` is immutable.** A caller
  chooses only *when* the balance moves, never *where*. This is the exact inversion of
  the OP Stack `BaseFeeVault` pattern, whose `recipient` is mutable state behind a
  proxy — and that is the one property of that design that MUST NOT be copied.
- **There is no minimum sweep threshold**, deliberately: on a low-revenue chain a
  threshold is a stranding risk.
- **A disbursement batch should lead with a `sweep()`.** A funding proposal executing
  while the balance still sits in the Vault reverts on insufficient value in the
  Timelock.
- **Nothing is predicted.** ECIP-1112 forbids `CREATE2` derivation, an init-code freeze
  and reserved deployer nonces **as the basis of the consensus commitment**, in terms.
  Clients hardcode the published deployed address and must not recompute it. **Any
  address-derivation explanation describes a design that no longer exists and is
  deleted rather than corrected** — never write `CREATE2`, a salt, or a reserved nonce
  into site copy, and never claim addresses are identical across the two networks.

### The base fee (ECIP-1111)

- **Ethereum Classic has no base fee today.** EIP-1559 is not active here, so the
  component *does not exist* rather than being zero (ECIP-1111 §"Where each gwei
  goes"). **ECIP-1111 introduces** the base fee and directs it to the Vault instead of
  burning it as Ethereum does.
- **Never write "the burned half, redirected", or that ETC's base fee is burned or
  discarded today.** Nothing is currently burned on Ethereum Classic, so nothing
  changes destination. ECIP-1112 §"Simple Summary" — this site's own subject spec —
  prohibits all three phrasings in terms.
- **"The burned half" is correct only of *Ethereum*,** which does burn its base fee.
  That contrast is the explanation this site needs; keep those uses.
- **Base fee is not the transaction fee.** A transaction pays base fee **plus** a
  priority tip. Priority tips and ECIP-1017 block rewards are untouched by the whole
  suite.
- **Write "base fee" or "base-fee", never "basefee" as one word** — that spelling
  appears nowhere in the suite.
- **ECIP-1111 §Rationale is the only source for a gas or utilization figure, and it
  publishes no revenue figure at all**, deliberately. Do not carry a number in from a
  note or a diagram, and never publish a value for `f`, `N` or `L(j)`, which are unset
  by design.

### Governance (ECIP-1113/1114/1119)

- **There is no separate executor contract, and none may be introduced.** Execution is
  `TimelockController.execute()`/`executeBatch()`, gated on `EXECUTOR_ROLE`, which
  ECIP-1113 §1.3 grants to the Governor and to nothing else. **`OlympiaExecutor` does
  not exist** — never name it, and never write "Governor → Timelock → Executor →
  Treasury".
- **The binding sanctions checkpoint is `Governor._executeOperations`, a `virtual`
  override rather than a contract** (ECIP-1119, ECIP-1113 §1.4). The gate sits *above*
  the Timelock and screens every externally-directed target of every operation. The OFP
  Registry's submission check is a fail-fast convenience, not a second independent
  barrier. The guarantee is over receipt of funds, never over participation in
  governance.
- **The Treasury validates nothing about proposals.** Proposal integrity comes from
  OpenZeppelin Governor 5.x's `proposalId = hashProposal(targets, values, calldatas,
  descriptionHash)`.
- **CoreNFT is the governance token.** Soulbound, non-transferable, one *non-delegable*
  vote per member; delegation is locked to self and `delegateBySig` reverts. Supply is
  unbounded — membership grows by governance proposal, one per admission, with no minter
  role and no admissions committee. It is revocable and resignable by burn. Admission is
  **earned, never bought**: substantive, net-positive contribution to Ethereum Classic,
  and contribution is not only code. **No identity verification is required and none may
  be imposed.** **Never write "there is no governance token"** — what Olympia lacks is a
  *fungible, transferable, purchasable* token, so there is nothing to buy, sell, lend,
  pool or accumulate, and nothing on which a market in votes could form. **Never
  describe membership as closed, exclusive, or a fixed council.**
- **Approval is a strict majority** of For over Against under `GovernorCountingSimple`,
  with Abstain counting toward quorum only. There is no configurable approval percentage
  and no supermajority. Never write "≥60%".
- **Funding proposals are OFPs** — Olympia Funding Proposals, per ECIP-1114. **Never
  "ECFP"**: that spelling predates the spec and appears in none of it.
- **Submission is permissionless and carries no bond**, subject only to the Governor's
  `proposalThreshold()` — measured against the *author's* voting power, because the
  Registry calls `proposeFor()` rather than `propose()`. Never describe a bond, a slash,
  or an "intake review": the last implies an off-chain gatekeeper ECIP-1114 forbids.
- **The OFP Registry is the standard path, not a chokepoint.** `Governor.propose()` is
  public by design, so a proposal targeting the Timelock reaches the same pipeline
  without touching the Registry. That is not a bypass — it faces identical voting,
  quorum, Timelock and gate constraints — but it arrives without a `payoutId` or
  content-addressed metadata. The *path to funds* is exclusive; the *Registry* is not.
  Never call the Registry mandatory.
- **ECIP-1118 is milestone-gated disbursement**, an alternative to lump-sum payment
  available to **any** Olympia funding proposal, not only futarchy-originated ones.

### Affiliated DAOs and futarchy (ECIP-1113 §6, ECIP-1117/1118)

- **"Child-DAO" is retired.** The term is **Affiliated DAO**: a separate,
  mission-scoped body working *alongside* Olympia DAO, not beneath it. Neither is the
  other's parent.
- **Futarchy decides allocation. "A signal layer, never binding" is wrong.** The
  distinction is two-part and both halves matter:
  - **Olympia DAO decides whether and how much to seed a season** — a binding CoreNFT
    vote in the main Governor, competing against client maintenance and security
    response. Futarchy has no authority there and no claim on the Treasury.
  - **Within a seeded season the market decides who receives grants.** ECIP-1117
    §"Simple Summary": *"the community decides which projects receive grants and the
    decision is aggregated by markets rather than by a committee."* ECIP-1113 §6: once
    transferred, *"Olympia DAO has no say in how it is allocated."*

  Write **"the public decides to whom"** — never "advisory", "signal only", or "never
  binding". The error's source is named in the spec: ECIP-1117 §"Precedent" warns that
  Optimism's October 2024 announcement scoped only its *first iteration* to *"serve an
  advisory role"*.
- **The allocation unit is a SEASON, not a round.** Do not take "round" from the spec —
  it survives there only for the *precedent* rounds Optimism and Gitcoin ran. A season
  is seeded before it opens, must not draw on another season's seed or roll a remainder
  forward, and is never automatic.
- **No base fee is routed to any Affiliated DAO.** Its infrastructure is funded by an
  ordinary executed OFP, and it holds no Treasury-facing interface.
- **Gitcoin and Optimism are the stated inspiration for the grants model.** No claim
  about what either actually did may appear on this site. Write the mechanism, not the
  precedent.

### Smoothing and EVM alignment

- **Smoothing is two-stage.** ECIP-1115 experiments at the contract layer, adjustable
  without a hard fork, while ECIP-1017 block rewards still secure the network.
  ECIP-1116 hard-forks the proven curve into block finalization at a **later, separate
  hard fork**, paid by the protocol rather than the Treasury and no longer
  governance-adjustable. Do not describe the contract layer as the only feasible
  approach.
- **Olympia EVM alignment** advances the execution layer through Dencun, Pectra and
  Fusaka, and carries that work into Glamsterdam. Do **not** claim "full Glamsterdam
  parity" — ECIP-1121 includes two of Glamsterdam's seven execution-layer EIPs
  (EIP-7975, EIP-7997); the rest are blocked on EIP-7928 and EIP-4788 dependencies, not
  on Proof-of-Stake grounds. The "independent of Proof-of-Stake and blob data
  availability" qualifier is true of the first three cycles and false of Glamsterdam.
- **Clients:** Fukuii is ETC's first native client. Core-Geth is a go-ethereum
  derivative maintained for ETC. Besu, Erigon, Ethrex, Go-Ethereum, Nethermind and Reth
  are ETC **plugins** — never "overlays". **Do not write which specs any client
  currently tracks**; that is internal engineering status and it changes.

### Naming and prohibitions

- **Naming:** "Ethereum Classic's Olympia DAO", never "OlympiaDAO" as one word.
- **Never say:** "off-chain administrative executor", "subordinate to on-chain
  governance", SHALL/MUST NOT in rendered copy, "hash-bound tuples", "governance
  pipeline".

## The ECIP allow-list

**No ECIP number outside the eleven appears in Olympia content**, except an ECIP the
site legitimately references in its own right — **ECIP-1017**, **ECIP-1100**
(`Replaced`, but still the MESS parameter authority, set default-on by ECIP-1122),
**ECIP-1109**, **ECIP-1051**, **ECIP-1098**, **ECIP-1099** (Thanos/ETChash epoch
calibration) and **ECIP-1000** (the process definition).

The eleven, stated positively: **ECIP-1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118,
1119, 1121, 1122.**

This is an allow-list rather than a deny-list on purpose. A rule that names a number in
order to forbid it puts that number in the file, and the file is what a session writes
from.

## Write the completed product

**This site describes a released upgrade with a live Treasury.** A reader arriving in
two years must find copy that is still true, with nothing to update. This governs page
copy, headings, titles, meta descriptions, OG tags, structured data, `sitemap` and
`llms.txt` equally.

**Banned constructions:** "will", "is planned", "upcoming", "coming soon", "currently",
"as of today", "at the time of writing", "recently", "now live", "so far", "to date",
"next quarter", "pending", "not yet", a countdown, a progress bar, a "Stage N complete"
badge, an implementation-status matrix, or a calendar date presented as news.

**A structural fact is timeless even when it concerns ordering.** These stay: ECIP-1116
activates at a later, separate hard fork; a season is seeded before it allocates;
contracts are deployed before the activation block. What goes is the project-status
reading of the same facts. **Do not delete staging from the architecture** — the five
stages are how the system is built; what is banned is narrating where anyone stands
inside them.

**A live balance rendered from chain state at request time is data, not copy, and is
exactly right for this site.** A hardcoded figure is a timestamp in disguise.

**Never delete a client endpoint, repository, contract address, or integration
detail.** A pass on a sibling site stripped twelve of them on the reasoning that
shipped clients track an earlier revision of the specs; that is internal engineering
work, never site content, and it had to be undone.

**Never publish internal development context.** Notes, judgment calls in progress and
operational context belong in `.local/`, which is gitignored. In-repo pointers to
machine-local paths go in `CLAUDE.local.md`, also gitignored — a machine-local absolute
path in a tracked file is a leak and is useless off this machine.

## Boundaries

**Protected — do not modify without explicit approval**

- `app/globals.css` — design tokens and Tailwind theme
- `app/layout.tsx` — root layout, fonts, metadata, JSON-LD
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
- Put an address into `lib/contracts.json`, or invent one anywhere
- Re-add `.github/dependabot.yml` — see below

## Dependency updates are not automated here

**`.github/dependabot.yml` was removed by operator decision on 2026-08-12**, together
with the five open version-bump PRs and their branches. **Its absence is a decision,
not a gap: do not re-add it as a conformance fix.** A tool or a checklist that flags
the missing file is reporting what it was told to look for, not a defect.

What that leaves, stated so nobody has to re-derive it:

| Channel | State |
|---|---|
| Version updates (scheduled bumps, the file above) | **off** |
| Security updates (automated fix PRs) | **off** — already disabled before this |
| Dependabot alerts (CVE notification, opens nothing) | **on** |

Every dependency change is therefore a deliberate, manual act. Route it to the
`sentinel` agent, and note that removing the config also removed this repo's
7-day/21-day cooldown gate, so a bump taken here gets the release-age check from the
machine-wide pnpm setting alone rather than from two independent places.

## Upstream sources of truth

The Olympia content on this site is downstream of specs that live elsewhere. When they
disagree, the spec wins and the site is corrected — and the correction is reported back
to the ECIPs repository as a finding rather than patched only here.

| Subject | Authority |
|---|---|
| Olympia ECIPs (1111–1122) | the ECIPs repository working copy, never the published register |
| EIP contents and dependencies | `eips.ethereum.org` |
| Fukuii positioning and URLs | fukuii.org and `fukuii-cli/NOTICE` |
| Monitored addresses | the chain, mirrored in `lib/config.ts` |
