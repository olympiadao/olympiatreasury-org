import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const stages = [
  {
    title: "Consensus Upgrades",
    status: "complete" as const,
    description:
      "Adds the most widely adopted transaction type to Ethereum Classic, ensuring continued network support by exchanges, wallets, and modern development tooling. Independent client implementations complete.",
    deliverables: [
      "EIP-1559 fee market with predictable gas pricing",
      "Dynamic gas limits",
      "Basefee introduced — previously set to be destroyed, now funds the treasury",
      "Miner tips and block rewards untouched",
      "Core development and infrastructure funded without new issuance",
    ],
  },
  {
    title: "Core Governance",
    status: "active" as const,
    description:
      "Governance and treasury contracts deployed. Membership-based voting. Full proposal lifecycle: submit, vote, queue, execute. Moves core development, critical infrastructure, and long-term network security from private balance sheets to an open, transparent, and permissionless framework — bringing stability to the most critical and historically unstable aspects of Ethereum Classic since the Ethereum Foundation forked to its own chain in 2016.",
    deliverables: [
      "Governance and treasury contracts",
      "Membership-based voting system",
      "Sanctions compliance layer",
      "Open, transparent funding proposals with competitive bidding",
      "Free market pricing for network maintenance",
      "Removes organizational overhead from the funding pipeline",
      "Open to qualified professionals across the EVM ecosystem",
      "Donation pipeline for stakeholders without fielding a team",
    ],
  },
  {
    title: "Prediction Markets",
    status: "research" as const,
    description:
      "Futarchy-assisted governance uses prediction markets to inform treasury allocation. In a futarchy market, participants stake on the expected outcome of a proposal — if funded, does the network benefit? Market prices aggregate public opinion into a measurable signal that governance can act on. This opens protocol-level decision making to broad public participation beyond NFT holders, replacing opaque insider consensus with transparent, financially-backed forecasting. This stage requires the Fusaka EVM alignment delivered by Olympia (ECIP-1121). Research phase exploring conditional token frameworks.",
    deliverables: [
      "Conditional outcome tokens",
      "Market-informed proposal ranking",
      "User acquisition and on-chain transaction flywheel",
      "Financially incentivized public interest in protocol development",
      "Additive market sentiment to complement siloed GitHub discussion threads",
    ],
  },
  {
    title: "Treasury Distribution",
    status: "future" as const,
    description:
      "As Ethereum Classic's fixed-emission schedule reduces block subsidies over time, basefee revenue held in the treasury can optionally be redistributed back to miners to supplement long-term network security. ECIP-1115 defines a governance-layer smoothing mechanism — an L-curve that spreads these optional payouts across a configurable future window, reducing per-block volatility and providing a more predictable revenue profile. Critically, this is entirely optional and governance-controlled: no miner entitlement is created, consensus-layer rewards and tips remain untouched, and parameters can be adjusted or disabled without a hard fork.",
    deliverables: [
      "Treasury smoothing algorithm",
      "Smoothing allocation amount experiments",
      "Multi-algorithm modeling for stable miner security budget through ECIP-1017 emission reduction events",
      "Miner impact analysis",
    ],
  },
  {
    title: "Protocol Integration",
    status: "future" as const,
    description:
      "Permanent consensus integration of proven governance mechanisms. Moving governance from contract layer to protocol layer.",
    deliverables: [
      "Consensus-level governance",
      "Immutable treasury rules",
      "Long-term sustainability",
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
      <section className="section-gradient relative py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight">
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
