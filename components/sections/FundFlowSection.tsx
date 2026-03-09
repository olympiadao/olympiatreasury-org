import { ArrowDown, Flame, Landmark, Users, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Flame,
    number: "01",
    title: "Basefee Collected",
    description:
      "Users submit transactions with EIP-1559-style fields (ECIP-1111). Miners receive block rewards and tips. Basefee is separated.",
  },
  {
    icon: Landmark,
    number: "02",
    title: "Treasury Accumulates",
    description:
      "Basefee is redirected by consensus to the Treasury contract. The vault accumulates protocol revenue over time. Balance and history are public.",
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Proposals Submitted",
    description:
      "Projects and contributors submit funding proposals through the process defined in ECIP-1114. Each proposal specifies recipient, amount, and milestones.",
  },
  {
    icon: Users,
    number: "04",
    title: "Governance Approves",
    description:
      "The Olympia DAO (ECIP-1113) reviews, votes, and authorizes eligible proposals. Only authorized governance calls can trigger fund releases.",
  },
];

export function FundFlowSection() {
  return (
    <section
      id="fund-flow"
      className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          From Fees to Public Goods
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          A clear line of sight from transaction fees to funded public goods on
          Ethereum Classic.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.number}>
              <div className="flex gap-6 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-200 hover:border-[var(--border-brand)]">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
                    <step.icon size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
                    Step {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown
                    size={20}
                    className="text-[var(--text-subtle)]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
