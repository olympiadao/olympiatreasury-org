import { CircleCheck, Clock, ArrowRight } from "lucide-react";

const stages = [
  {
    number: 1,
    title: "Accumulate",
    description:
      "Treasury receives basefee deposits only. No withdrawals. Builds protocol reserve while governance layers deploy and mature.",
    ecips: ["ECIP-1111", "ECIP-1112"],
    status: "active" as const,
  },
  {
    number: 2,
    title: "Govern",
    description:
      "DAO framework activates. NFT-weighted voting on proposals. Timelock execution of approved transfers from treasury.",
    ecips: ["ECIP-1113", "ECIP-1114"],
    status: "next" as const,
  },
  {
    number: 3,
    title: "Fund",
    description:
      "Full proposal lifecycle: submit, review, vote, execute. Streaming payments with milestone-based release.",
    ecips: ["ECIP-1114", "ECIP-1115"],
    status: "planned" as const,
  },
  {
    number: 4,
    title: "Predict",
    description:
      "Futarchy module enables prediction-market governance. Augments traditional voting with market signals.",
    ecips: ["ECIP-1117"],
    status: "planned" as const,
  },
  {
    number: 5,
    title: "Optimize",
    description:
      "Sanctions defense, multi-chain bridging, and advanced allocation strategies become available.",
    ecips: ["ECIP-1118", "ECIP-1119", "ECIP-1120"],
    status: "planned" as const,
  },
];

const statusStyles = {
  active: {
    badge: "bg-[var(--brand-green-subtle)] text-[var(--brand-green)] border-[var(--border-brand)]",
    border: "border-[var(--border-brand)]",
    label: "Active",
    icon: CircleCheck,
  },
  next: {
    badge: "bg-[var(--brand-amber-subtle)] text-[var(--brand-amber)] border-[var(--brand-amber-border)]",
    border: "border-[var(--border-default)]",
    label: "Next",
    icon: ArrowRight,
  },
  planned: {
    badge: "bg-transparent text-[var(--text-subtle)] border-[var(--border-default)]",
    border: "border-[var(--border-default)]",
    label: "Planned",
    icon: Clock,
  },
};

export function StageSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Governance Stages
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          The treasury is in Stage 1 — accumulate only. Governance layers are
          deployed progressively as each stage matures.
        </p>

        <div className="space-y-4">
          {stages.map((stage) => {
            const style = statusStyles[stage.status];
            const StatusIcon = style.icon;
            return (
              <div
                key={stage.number}
                className={`rounded-xl border bg-[var(--bg-card)] p-6 transition-all duration-200 hover:-translate-y-0.5 ${style.border}`}
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-sm font-bold text-[var(--text-muted)]">
                        {stage.number}
                      </span>
                      <h3 className="text-lg font-semibold">{stage.title}</h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
                      >
                        <StatusIcon size={12} />
                        {style.label}
                      </span>
                    </div>
                    <p className="ml-11 text-sm leading-relaxed text-[var(--text-muted)]">
                      {stage.description}
                    </p>
                  </div>
                  <div className="ml-11 flex gap-2 sm:ml-0">
                    {stage.ecips.map((ecip) => (
                      <span
                        key={ecip}
                        className="rounded-full border border-[var(--border-default)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-subtle)]"
                      >
                        {ecip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
