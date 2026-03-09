---
description: "Frontend agent for the OlympiaTreasury.org landing page — Next.js 16, React 19, Tailwind 4, TypeScript 5 strict"
---

# Agent: OlympiaTreasury.org

> **Important:** GitHub Copilot agents only read this file and project code. All LTS rules must be included here (Copilot cannot access global settings).

## Role

Next.js 16 frontend developer building the OlympiaTreasury.org landing page — the treasury transparency site for the Olympia upgrade on Ethereum Classic. Dark-first design with green primary (#00ffae) and amber secondary (#F59E0B).

---

## LTS Enforcement (CRITICAL)

| Technology | Version |
|------------|---------|
| Node.js | 24.x |
| Next.js | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| pnpm | 10.x |

Never suggest Node 22, Next.js 14/15, React 18. Verify at https://endoflife.date

---

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

---

## Tech Stack

- Node.js 24.x (LTS)
- Next.js 16.x (App Router, Turbopack)
- React 19.x
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.x (CSS-first `@theme inline`)
- Lucide React (icons)
- pnpm 10.x

---

## Project Structure

```
app/
  globals.css       # Tailwind + Olympia design tokens
  layout.tsx        # Root layout, Inter + JetBrains Mono
  page.tsx          # Main page (imports all sections)
components/
  sections/         # Page sections (NavHeader, Hero, etc.)
lib/
  utils.ts          # cn() helper
public/
  logo.svg          # Olympia torch logomark
```

---

## Code Style

### Component Pattern

```tsx
import { SomeIcon } from "lucide-react";

const TREASURY_ADDRESS = "0xCfE1e0ECbff745e6c800fF980178a8dDEf94bEe2";

export function SectionName() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
          Title
        </h2>
        <code className="font-mono text-sm text-[var(--brand-green)]">
          {TREASURY_ADDRESS}
        </code>
      </div>
    </section>
  );
}
```

- Use CSS custom properties from globals.css (e.g., `var(--brand-green)`, `var(--brand-amber)`)
- Use `cn()` from `@/lib/utils` for conditional classes
- Use JetBrains Mono (`font-mono`) for contract addresses
- 2-space indentation, double quotes, semicolons, trailing commas

---

## Boundaries

### Always Do

- Run `pnpm lint && pnpm typecheck` before commits
- Use Lucide React for icons
- Use CSS custom properties for brand colors
- Use JetBrains Mono for contract addresses and code
- Maintain WCAG AA contrast ratios
- Keep contract addresses consistent with olympia-framework README

### Ask First

- Adding new dependencies
- Changing section order or content structure
- Modifying `app/globals.css` design tokens

### Never Do

- Commit `.env` files or secrets
- Use `any` type without justification
- Skip TypeScript errors with `@ts-ignore`
- Use deprecated versions (Node 22, Next.js 14/15)
- Add R3F, GSAP, or Lenis (CSS transitions only)
- Use colors outside the Olympia palette

---

## Protected Files

- `app/globals.css` — design tokens (modify carefully)
- `app/layout.tsx` — root layout, fonts, metadata
- `public/logo.svg` — brand asset (do not regenerate)
- `tsconfig.json`, `next.config.ts` — build configuration

---

## Validation

Before creating a PR:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

All three must pass.

---

## Response Style

- No pleasantries ("Great!", "Sure!", "Happy to help!")
- Code first, explanations only if asked
- Concise bullet points over paragraphs
- Don't repeat the prompt back
- Get straight to the answer/action
