import { Landmark, Ban, ShieldCheck, Eye } from "lucide-react";

const stats = [
  {
    icon: Landmark,
    label: "Protocol-Controlled",
    description:
      "Owned by protocol rules, not a multisig or legal entity. No emergency keys, no privileged upgrade paths.",
  },
  {
    icon: Ban,
    label: "Non-Inflationary",
    description:
      "Cannot mint ETC. Holds only what it receives from basefee redirection. Monetary policy unchanged.",
  },
  {
    icon: ShieldCheck,
    label: "Immutable Code",
    description:
      "No proxy patterns, no admin methods, no upgrade keys. Contract behavior is fixed at deployment.",
  },
  {
    icon: Eye,
    label: "Fully Transparent",
    description:
      "All inflows, outflows, and balances visible on-chain. Anyone can audit via block explorers.",
  },
];

export function OverviewSection() {
  return (
    <section id="overview" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Treasury Overview
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          The on-chain vault at the center of the Olympia upgrade. Endpoint for
          redirected basefee. Source of funds for approved public-goods proposals.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-brand)]"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <stat.icon
                size={32}
                className="mb-4 text-[var(--brand-green)]"
              />
              <h3 className="mb-2 text-lg font-semibold">{stat.label}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
