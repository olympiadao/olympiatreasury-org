# OlympiaTreasury.org — Claude Code Instructions

## Project Context

Landing page for the Olympia Treasury — the protocol-controlled vault at the center of the Olympia upgrade for Ethereum Classic. Displays treasury details, contract addresses, fund flow, governance stages, and security model.

**URL:** https://olympiatreasury.org
**Repo:** `olympiadao/olympiatreasury-org`
**Deploy:** Vercel

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
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
  layout.tsx      # Root layout, Inter + JetBrains Mono
  page.tsx        # Main page (imports all sections)
components/
  sections/       # Page sections (NavHeader, Hero, etc.)
lib/
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

## Content Source

All copy from `/media/dev/2tb/dev/olympiadao/olympia-framework/README.md`

## Key Addresses

- Treasury: `0xd6165F3aF4281037bce810621F62B43077Fb0e37`
- Network: Mordor testnet (chain 63)
- Activation: block 15,800,850 (~March 28, 2026)

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
