import {
  ArrowRight,
  Coins,
  Landmark,
  Vote,
  Globe,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const flowSteps = [
  // The first two nodes carry the base-fee/tip split; only the base fee flows on.
  { icon: ArrowRight, label: "Transactions", sublabel: "Base fee + priority tip" },
  { icon: Coins, label: "Base Fee Only", sublabel: "The burned half, redirected" },
  { icon: Landmark, label: "Treasury", sublabel: "Protocol-managed vault" },
  { icon: Vote, label: "Governance", sublabel: "Community proposals" },
  { icon: Globe, label: "Ecosystem", sublabel: "Development funding" },
];

export function TreasuryFundingSection() {
  return (
    <>
      <SectionDivider />
      <section aria-labelledby="treasury-funding-heading" className="section-gradient relative py-28 px-6">
        <div className="relative z-10 mx-auto max-w-4xl">
          <FadeIn>
            <h2 id="treasury-funding-heading" className="text-3xl font-bold tracking-tight">
              Treasury Funding
            </h2>
            <p className="mt-3 max-w-xl text-base text-[var(--text-muted)]">
              How the Olympia Treasury is funded — sustainably and without
              impacting miners.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mt-12 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-8">
              <p className="text-lg font-semibold">
                Basefee revenue funds the Olympia Treasury
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                The base fee is not the transaction fee. Under EIP-1559 a transaction
                pays a base fee plus a priority-fee tip; Ethereum burns the base fee and
                pays the tip to the block producer. Ethereum Classic changes the
                destination of the burned half only — it is credited to the Treasury at
                block finalization, and a 1 gwei floor keeps that revenue from decaying
                to zero at low utilization. Priority-fee tips and ECIP-1017 block rewards
                continue to be paid to miners in full. Funding accrues from network usage
                rather than from any foundation or donor, without inflation or reduced
                miner compensation.
              </p>
            </div>
          </FadeIn>

          {/* Funding flow */}
          <div className="mt-12">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                Funding Flow
              </p>
            </FadeIn>

            {/* Desktop: horizontal */}
            <div className="mt-6 hidden md:block">
              <div className="relative">
                <div className="absolute top-6 left-10 right-10 h-px bg-[var(--border-default)]" />
                <div className="relative grid grid-cols-5 gap-2">
                  {flowSteps.map((step, i) => (
                    <FadeIn key={step.label} delay={i * 100}>
                      <div className="text-center">
                        <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                          <step.icon
                            size={18}
                            className="text-[var(--brand-green)]"
                          />
                        </div>
                        <p className="mt-3 text-sm font-semibold">
                          {step.label}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {step.sublabel}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="mt-6 space-y-4 md:hidden">
              {flowSteps.map((step, i) => (
                <FadeIn key={step.label} delay={i * 80}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                      <step.icon
                        size={16}
                        className="text-[var(--brand-green)]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {step.sublabel}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn>
            <div className="mt-12">
              <a
                href="https://app.olympiadao.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-green)] transition-colors hover:text-[var(--brand-green-hover)]"
              >
                Submit a Proposal
                <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
