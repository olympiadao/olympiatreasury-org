import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const stages = [
  {
    title: "Consensus Upgrades",
    status: "complete" as const,
    description:
      "EIP-1559 fee market, protocol treasury funded by basefee revenue, and EVM alignment in a single upgrade. Every Ethereum tool and framework works on ETC without modification.",
    deliverables: [
      "EIP-1559 fee market (ECIP-1111)",
      "Protocol treasury funded by basefee (ECIP-1112)",
      "EVM alignment: Dencun, Pectra and Fusaka, carried into Glamsterdam (ECIP-1121)",
    ],
  },
  {
    title: "Core Governance",
    status: "active" as const,
    description:
      "On-chain governance with membership-based voting and a full proposal lifecycle: submit, vote, queue, execute. Core development funding moves to an open, transparent, on-chain process.",
    deliverables: [
      "Governance and treasury contracts with timelock execution",
      "Membership-based voting with sanctions compliance",
      "Open proposal process with competitive bidding",
    ],
  },
  {
    title: "Prediction Markets",
    status: "research" as const,
    description:
      "Futarchy runs as a Child-DAO producing financially-backed public signals alongside on-chain member votes. Its outcomes reach the main Governor as ordinary proposals; binding authority stays with Ethereum Classic's Olympia DAO.",
    deliverables: [
      "Conditional outcome tokens",
      "Market signals submitted as ordinary proposals (ECIP-1117)",
      "Market infrastructure funded by executed proposals (ECIP-1118)",
      "Open participation for any stakeholder",
    ],
  },
  {
    title: "Treasury Distribution",
    status: "future" as const,
    description:
      "Governance-controlled smoothing curve (ECIP-1115) optionally supplements miner security budgets as fixed-emission block subsidies decline. It operates on Treasury-held basefee after deposit, leaving consensus-layer rewards untouched, while ECIP-1017 block rewards still secure the network.",
    deliverables: [
      "Treasury smoothing algorithm (ECIP-1115)",
      "Modeling through ECIP-1017 emission events",
      "Parameters adjustable without a hard fork",
    ],
  },
  {
    title: "Protocol Integration",
    status: "future" as const,
    description:
      "ECIP-1116 is the sequenced follow-on: once a curve is proven under ECIP-1115, a hard fork embeds it in block finalization. The smoothed miner allocation is then paid by the protocol rather than disbursed from the Treasury, and is no longer governance-adjustable.",
    deliverables: [
      "Proven L-curve hardened into consensus (ECIP-1116)",
      "Miner allocation paid at block finalization, outside governance",
    ],
  },
];

const statusConfig = {
  complete: { label: "Complete", className: "badge-complete" },
  active: { label: "Active", className: "badge-active" },
  research: { label: "Research", className: "badge-research" },
  future: { label: "Future", className: "badge-future" },
};

export function RoadmapSection() {
  return (
    <>
      <SectionDivider />
      <section aria-labelledby="roadmap-heading" className="section-gradient relative py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 id="roadmap-heading" className="text-3xl font-bold tracking-tight">
              Olympia Roadmap
            </h2>
            <p className="mt-3 text-base text-[var(--text-muted)]">
              Five stages from consensus upgrades to permanent protocol
              integration.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-0">
            {stages.map((stage, i) => {
              const config = statusConfig[stage.status];
              return (
                <FadeIn key={stage.title} delay={i * 80}>
                  <div className="relative flex gap-6 pb-8">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 shrink-0 rounded-full ${
                          stage.status === "complete"
                            ? "bg-[var(--brand-green)]"
                            : stage.status === "active"
                              ? "bg-[var(--brand-green)] animate-pulse"
                              : "bg-[var(--border-default)]"
                        }`}
                      />
                      {i < stages.length - 1 && (
                        <div className="mt-1 h-full w-px bg-[var(--border-default)]" />
                      )}
                    </div>

                    <div className="-mt-1 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-base font-semibold">
                          {stage.title}
                        </p>
                        <span className={config.className}>
                          {config.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                        {stage.description}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {stage.deliverables.map((d) => (
                          <li
                            key={d}
                            className="text-xs text-[var(--text-subtle)] before:mr-2 before:content-['·']"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
