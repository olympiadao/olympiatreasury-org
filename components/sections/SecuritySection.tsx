import { ShieldCheck, Lock, Server } from "lucide-react";

const layers = [
  {
    icon: ShieldCheck,
    title: "Protocol Consensus",
    description:
      "Client implementations enforce ECIP-1112 rules. Consensus ensures only authorized governance calls can move funds. Any change requires a new ECIP and network upgrade.",
  },
  {
    icon: Lock,
    title: "Contract Immutability",
    description:
      "No proxy patterns, no admin keys, no upgrade paths. Built on OpenZeppelin v5.6. The treasury reduces reliance on trusted custodians — security depends on protocol correctness.",
  },
  {
    icon: Server,
    title: "Sanctions Defense",
    description:
      "Three-layer defense: OFAC screening at proposal level, transaction-level compliance checks, and emergency pause capability. Designed to satisfy regulatory requirements without compromising decentralization.",
  },
];

export function SecuritySection() {
  return (
    <section className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Security Model
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          Security tied to Ethereum Classic itself. Node operators don&apos;t manage
          treasury keys — funds are controlled by protocol rules, not wallets.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-brand)]"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <layer.icon
                size={32}
                className="mb-4 text-[var(--brand-green)]"
              />
              <h3 className="mb-3 text-lg font-semibold">{layer.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
