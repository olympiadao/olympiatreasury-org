import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

/*
 * Each stage used to carry an "Active / Research / Future" badge. That is an
 * implementation-status matrix: it tells a reader where the project stands rather than
 * what the system is, and every reading of it goes stale without anyone editing the
 * file. The stages themselves are structural — they are how the system is built, and
 * the order between them is a real dependency — so they stay and the position marker
 * goes. Do not reintroduce a status field here.
 */
const stages = [
  {
    title: "Consensus Upgrades",
    ecips: "ECIP-1111, 1112, 1121, 1122",
    description:
      "The hard fork, and one of only two stages that change consensus rules. The EIP-1559 fee market arrives and its base fee is credited to the Olympia Sovereignty Vault rather than burned. Every contract the fork commits to is already deployed, audited and readable on-chain before the block that starts crediting it.",
    deliverables: [
      "EIP-1559 fee market, base fee credited to the Vault (ECIP-1111)",
      "The Vault at the address consensus hardcodes, sweeping to the Timelock (ECIP-1112)",
      "EVM alignment: Dencun, Pectra and Fusaka, carried into Glamsterdam (ECIP-1121)",
      "Client security parameters: minimum miner tip, network-authoritative gas target, MESS restored (ECIP-1122)",
    ],
  },
  {
    title: "Core Governance",
    ecips: "ECIP-1113, 1114, 1119",
    description:
      "Governance becomes able to spend. These are contracts on a chain whose rules are already settled, so no fork is involved. The sanctions oracle and the OFP Registry each attach through a Timelock-gated setter and are a constructor argument to nothing, which is what lets them be audited and bound on either side of the fork.",
    deliverables: [
      "Timelock, CoreNFT and Governor, with the Governor as the Timelock's sole executor",
      "Full proposal lifecycle: submit, vote, queue, execute (ECIP-1113, ECIP-1114)",
      "One contributor, one vote, on the soulbound CoreNFT with delegation locked to self",
      "Sanctions oracle bound before any funds are spendable — until then the gate fails closed (ECIP-1119)",
    ],
  },
  {
    title: "Prediction Markets",
    ecips: "ECIP-1117, 1118",
    description:
      "An Affiliated DAO under ECIP-1113 §6: a separate, mission-scoped body working alongside Ethereum Classic's Olympia DAO rather than beneath it. Olympia DAO votes, per season, on an ordinary funding proposal that seeds a specific sum. Once seeded, the public decides to whom it goes — conditional markets aggregate the decision, and Olympia DAO has no say in how the season allocates.",
    deliverables: [
      "Open to anyone holding ETC or Classic USD, with no membership and no application",
      "Collateral custodied by the Conditional Token Framework, never by the Treasury",
      "Each season seeded by its own proposal, with no standing budget line and no rollover",
      "Milestone-gated disbursement, available to any Olympia funding proposal (ECIP-1118)",
      "Sanctions screening applies here too, because funds move (ECIP-1119)",
      "Infrastructure funded by executed proposals; no base fee is routed here",
    ],
  },
  {
    title: "Treasury Distribution",
    ecips: "ECIP-1115",
    description:
      "A smoothing curve supplements miner security budgets as fixed-emission block subsidies decline, spreading each block's contribution across a future window so the payout is steady rather than volatile. At the contract layer the allocation fraction, window and curve shape are all adjustable through governance without a fork.",
    deliverables: [
      "Smoothing at the contract layer, on Treasury-held revenue (ECIP-1115)",
      "Allocation fraction, window length and curve shape adjustable through governance",
      "Operates after the funds arrive, leaving consensus-layer rewards untouched",
      "Runs while ECIP-1017 block rewards still secure the network, so the curve is measured rather than assumed",
    ],
  },
  {
    title: "Protocol Integration",
    ecips: "ECIP-1116",
    description:
      "A second, separate hard fork, and the only other stage that changes consensus rules. Once the curve has been demonstrated in production, ECIP-1116 embeds it into block finalization. The protocol then pays it directly rather than the Treasury disbursing it, and governance can no longer adjust it — changing it afterward costs a fork.",
    deliverables: [
      "Consensus-layer hardening of the demonstrated curve (ECIP-1116)",
      "Paid at block finalization rather than disbursed, so governance leaves the payment path",
      "The Vault's share becomes the unsmoothed remainder rather than the whole base fee",
      "Cannot activate until the contract-layer stage has produced real observational data",
    ],
  },
];

export function RoadmapSection() {
  return (
    <>
      <SectionDivider />
      <section aria-labelledby="roadmap-heading" className="section-gradient relative py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 id="roadmap-heading" className="text-3xl font-bold tracking-tight">
              How Olympia Is Built
            </h2>
            <p className="mt-3 text-base text-[var(--text-muted)]">
              Five stages. The first and the last are hard forks; the middle three are
              not — they are contract deployments and governance actions on a chain whose
              consensus rules are already settled, and none of them can cause a client to
              diverge. Each stage depends only on the stages before it.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-0">
            {stages.map((stage, i) => (
              <FadeIn key={stage.title} delay={i * 80}>
                <div className="relative flex gap-6 pb-8">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-brand)] bg-[var(--background)] font-mono text-xs font-bold text-[var(--brand-green)]">
                      {i + 1}
                    </span>
                    {i < stages.length - 1 && (
                      <div className="mt-1 h-full w-px bg-[var(--border-default)]" />
                    )}
                  </div>

                  <div className="-mt-0.5 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-base font-semibold">{stage.title}</p>
                      <span className="font-mono text-[11px] text-[var(--text-subtle)]">
                        {stage.ecips}
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
