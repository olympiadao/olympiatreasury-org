import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const stages = [
  {
    title: "Consensus Upgrades",
    status: "active" as const,
    description:
      "The hard fork itself, and the only stage that changes consensus rules until the last one. The EIP-1559 fee market redirects the base fee to the Treasury rather than burning it. The Treasury contract deploys at this fork. The governance suite that spends from it does not.",
    deliverables: [
      "EIP-1559 fee market with basefee redirected to the Treasury (ECIP-1111)",
      "Treasury contract deployed at the fork (ECIP-1112)",
      "EVM alignment: Dencun, Pectra and Fusaka, carried into Glamsterdam (ECIP-1121)",
      "Client security parameters: minimum miner tip, network-authoritative gas target, MESS restored (ECIP-1122)",
    ],
  },
  {
    title: "Core Governance",
    status: "active" as const,
    description:
      "The governance suite that spends the Stage 1 vault. These are contracts on a chain whose rules are already settled, so no fork is involved; the gap after the first stage is the audit window for them, and the Treasury accrues revenue throughout it.",
    deliverables: [
      "Governance suite deploys after the fork, against addresses reserved before it",
      "Timelock, CoreNFT, Governor, Executor and OFP Registry (ECIP-1113, ECIP-1114)",
      "Full proposal lifecycle: submit, vote, queue, execute",
      "One contributor, one vote, on the soulbound CoreNFT with delegation locked to self",
      "Sanctions oracle attached last; no Treasury funds are spendable before it (ECIP-1119)",
    ],
  },
  {
    title: "Prediction Markets",
    status: "research" as const,
    description:
      "Futarchy runs as a Child-DAO producing financially backed public signals alongside core contributor votes. Anyone holding ETC or Classic USD can take a position, with no application and no contributor NFT. Participants are paid for being right, which is what makes the prices a public signal. Outcomes reach the Governor as ordinary proposals, and binding authority stays with Ethereum Classic's Olympia DAO.",
    deliverables: [
      "Open to any public participant holding ETC or Classic USD",
      "Collateral is ETC and Classic USD, both already live, custodied outside the Treasury",
      "Conditional outcome tokens on the Conditional Token Framework",
      "Market signals submitted as ordinary proposals (ECIP-1117)",
      "Market infrastructure funded by executed proposals, never by basefee (ECIP-1118)",
      "Sanctions screening applies here too, because funds move (ECIP-1119)",
      "A signal layer, never binding",
    ],
  },
  {
    title: "Treasury Distribution",
    status: "future" as const,
    description:
      "A smoothing curve supplements miner security budgets as fixed-emission block subsidies decline, spreading each block's contribution across a future window so the payout is steady rather than volatile. ECIP-1115 runs it at the contract layer, where the allocation fraction, window and curve shape are all adjustable through governance without a fork.",
    deliverables: [
      "Treasury smoothing curve at the contract layer (ECIP-1115)",
      "Allocation fraction, window length and curve shape adjustable through governance, no fork required",
      "Operates on Treasury-held base fee after deposit, leaving consensus-layer rewards untouched",
      "Runs while ECIP-1017 block rewards still secure the network, so the curve is measured rather than assumed",
    ],
  },
  {
    title: "Protocol Integration",
    status: "future" as const,
    description:
      "The second hard fork, and the only other stage that changes consensus rules. Once the curve has been demonstrated in production, ECIP-1116 embeds it into block finalization. The protocol then pays it directly rather than the Treasury disbursing it, and governance can no longer adjust it. Changing it afterward costs a fork.",
    deliverables: [
      "Consensus-layer hardening of the demonstrated curve (ECIP-1116)",
      "Paid at block finalization rather than disbursed from the Treasury, so governance leaves the payment path",
      "The Treasury's share becomes the unsmoothed remainder rather than the whole basefee",
      "Cannot activate until the contract-layer stage has produced real observational data",
    ],
  },
];

const statusConfig = {
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
              Olympia arrives in five stages. Stages 1 and 5 are hard forks; stages 2,
              3 and 4 are not. Those are contract deployments and governance actions on
              a chain whose consensus rules are already settled. Each stage depends only
              on the stages before it.
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
                          stage.status === "active"
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
