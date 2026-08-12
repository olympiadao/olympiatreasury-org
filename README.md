# OlympiaTreasury.org

Live monitoring dashboard for Ethereum Classic's base-fee revenue, from the Olympia Sovereignty Vault that receives it to the Olympia Treasury that holds it. Read-only — no wallet required.

Two contracts, and the difference between them is the design. The Vault (ECIP-1112) sits at the address consensus credits: no owner, no role, no setter, no parameter, and one permissionless function that forwards its whole balance to one immutable destination. That destination is the TimelockController (ECIP-1113 §1.3), which is the Olympia Treasury, and which is replaceable by ordinary governance without a fork. Exactly one contract in Olympia is permanent, and it is the Vault.

Ethereum Classic's Olympia DAO funds core development, critical infrastructure, and network security from that Treasury through on-chain governance — soulbound one-member-one-vote membership and a Governor that is the Timelock's sole executor. No multisigs. No trusted intermediaries.

## Website

[olympiatreasury.org](https://olympiatreasury.org)

## Built With

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS 4](https://tailwindcss.com)
- [viem](https://viem.sh)
- [Recharts](https://recharts.org)
- [@tanstack/react-query](https://tanstack.com/query)

## Development

```bash
pnpm install
pnpm dev        # Dev server
pnpm build      # Production build
pnpm lint       # Lint
pnpm typecheck  # Type check
```

## Related

- [olympia-treasury-contract](https://github.com/olympiadao/olympia-treasury-contract) — Sovereignty Vault
- [olympia-governance-contracts](https://github.com/olympiadao/olympia-governance-contracts) — Governor, Timelock, CoreNFT, OFP Registry
- [olympia-brand](https://github.com/olympiadao/olympia-brand) — Design tokens, logos, favicons
- [olympiadao-org](https://github.com/olympiadao/olympiadao-org) — Landing page
- [olympia-app](https://github.com/olympiadao/olympia-app) — Governance UI
- [ethereumclassicdao-org](https://github.com/EthereumClassicDAO/ethereumclassicdao-org) — Institutional website

## Ethereum Classic Core Developers

- [Cody Burns](https://github.com/realcodywburns)
- [Chris Mercer](https://github.com/chris-mercer)

## License

[Apache 2.0](LICENSE)
