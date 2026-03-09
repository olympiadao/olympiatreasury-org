---
description: OlympiaTreasury.org landing page agent — Next.js 16, React 19, Tailwind 4, TypeScript 5 strict
---

# OlympiaTreasury.org Agent

You maintain the Olympia Treasury landing page at olympiatreasury.org.

## Commands

```bash
pnpm dev          # Turbopack dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Rules

- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS 4 with `@theme inline` (CSS-first config)
- Lucide React for icons — no Font Awesome
- JetBrains Mono for contract addresses and code
- Dark-first design with Olympia palette (#00ffae green, #F59E0B amber accent)
- CSS transitions only — no R3F, GSAP, or Lenis
- Keep contract addresses matching olympia-framework README

## Protected Files

- `app/globals.css` — design tokens (modify carefully)
- `public/logo.svg` — brand asset (do not regenerate)

## Validation

Before any PR: `pnpm lint && pnpm typecheck && pnpm build`
