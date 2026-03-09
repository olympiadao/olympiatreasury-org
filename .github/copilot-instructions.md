# GitHub Copilot Instructions: OlympiaTreasury.org

> **Important:** GitHub Copilot only reads this file and your project code. It does NOT have access to global settings. All LTS rules must be included here.

## Project

Landing page for the Olympia Treasury — protocol-controlled vault for Ethereum Classic basefee revenue. Dark-first design (#0a0f10) with green primary (#00ffae) and amber secondary (#F59E0B).

## LTS Enforcement (CRITICAL)

**ALWAYS use current stable LTS versions.**

| Technology | Version |
|------------|---------|
| Node.js | 24.x |
| Next.js | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| pnpm | 10.x |

**Never suggest:** Node 22, Next.js 14/15, React 18.

## Tech Stack

- Next.js 16.x (App Router, Turbopack)
- React 19.x, TypeScript 5.x (strict)
- Tailwind CSS 4.x (CSS-first `@theme inline`)
- Lucide React (icons)
- Inter (UI) + JetBrains Mono (code/addresses)

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Key Rules

1. Use TypeScript strict mode
2. Use CSS custom properties from `app/globals.css` for brand colors
3. Use `cn()` from `@/lib/utils` for class merging
4. Use Lucide React for icons — no Font Awesome
5. Use JetBrains Mono (`font-mono`) for contract addresses
6. CSS transitions only — no GSAP, R3F, or Lenis
7. Contract addresses must match olympia-framework README
8. Treasury address: `0xCfE1e0ECbff745e6c800fF980178a8dDEf94bEe2`

## Protected Files

Do not modify without explicit request:
- `app/globals.css` — design tokens
- `app/layout.tsx` — root layout
- `public/logo.svg` — brand logomark
- `tsconfig.json`, `next.config.ts`

## Code Style

- 2-space indentation
- Double quotes for strings
- Semicolons
- Trailing commas in multiline

## Structure

```
app/              # Pages, layout, globals, SEO files
components/
  sections/       # Page sections
lib/              # Utilities (cn helper)
public/           # Static assets (logo, OG image)
```

## Validation

Before committing:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

## Don't

- Commit .env files or secrets
- Use `any` type
- Skip type errors with `@ts-ignore`
- Use deprecated versions
- Add animation libraries

## Response Style

- Code first, explanations only if asked
- Concise bullet points over paragraphs
- Get straight to the answer
