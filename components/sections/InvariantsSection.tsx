import { Ban, Lock, Shield, Minimize2, Eye } from "lucide-react";

const invariants = [
  {
    icon: Ban,
    number: 1,
    title: "No Minting, No Inflation",
    points: [
      "Cannot mint ETC — only holds what it receives",
      "All balances derived from on-chain inflows and outflows",
      "ETC supply governed entirely by existing block reward schedule",
    ],
  },
  {
    icon: Lock,
    number: 2,
    title: "Immutable Contract Code",
    points: [
      "No upgradeable proxy patterns",
      "No admin-only methods to alter core logic",
      "Long-term predictability for all stakeholders",
    ],
  },
  {
    icon: Shield,
    number: 3,
    title: "Protocol-Controlled, Not Multisig",
    points: [
      "Owned by protocol rules, not a wallet or legal entity",
      "Wired directly into consensus rules",
      "No emergency key that can bypass the DAO",
    ],
  },
  {
    icon: Minimize2,
    number: 4,
    title: "Minimal External Interface",
    points: [
      "Accepts protocol-directed inflows (basefee)",
      "Executes payments when instructed by authorized governance",
      "No proposal logic, voting, or business rules in the vault",
    ],
  },
  {
    icon: Eye,
    number: 5,
    title: "Transparent & Auditable",
    points: [
      "Full transaction history visible via block explorers",
      "Simple read-only methods expose balances and history",
      "Supports analytics and monitoring without special access",
    ],
  },
];

export function InvariantsSection() {
  return (
    <section id="invariants" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Core Invariants
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          ECIP-1112 is built around strict invariants that give the treasury its
          security properties and make it acceptable as a protocol-level funding
          mechanism.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invariants.map((inv) => (
            <div
              key={inv.number}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-brand)]"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
                  <inv.icon size={20} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-subtle)]">
                  Invariant {inv.number}
                </span>
              </div>
              <h3 className="mb-3 text-base font-semibold">{inv.title}</h3>
              <ul className="space-y-2">
                {inv.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-green)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[var(--brand-amber-border)] bg-[var(--brand-amber-subtle)] p-6">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            <strong className="text-[var(--brand-amber)]">
              Separation of Concerns:
            </strong>{" "}
            ECIP-1112 treats the treasury as a pure vault. All politics,
            preferences, and participation rules live in the governance layer
            (ECIP-1113/1114), not in the contract that holds funds.
          </p>
        </div>
      </div>
    </section>
  );
}
