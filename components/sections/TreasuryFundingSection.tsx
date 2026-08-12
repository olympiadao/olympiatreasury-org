import {
  ArrowRight,
  Coins,
  Landmark,
  Vault,
  Vote,
  Globe,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const flowSteps = [
  // The first two nodes carry the base-fee/tip split; only the base fee flows on.
  { icon: ArrowRight, label: "Transactions", sublabel: "Base fee + priority tip" },
  { icon: Coins, label: "Base Fee Only", sublabel: "Tips stay with the miner" },
  { icon: Vault, label: "Vault", sublabel: "Credited by consensus" },
  { icon: Landmark, label: "Treasury", sublabel: "Swept in, held under governance" },
  { icon: Vote, label: "Proposals", sublabel: "Voted, queued, executed" },
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
              Where the money comes from, and what it costs a miner.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mt-12 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-8">
              <p className="text-lg font-semibold">
                Base-fee revenue funds Ethereum Classic&rsquo;s own development
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                The base fee is not the transaction fee. Under EIP-1559 a transaction
                pays a base fee <em>plus</em> a priority-fee tip, and Ethereum burns its
                base fee while paying the tip to the block producer. Ethereum Classic has
                no base fee at all until ECIP-1111 introduces one — so nothing here is
                being taken from somewhere else. It is credited to the Vault at block
                finalization, and a 1 gwei floor keeps the revenue from decaying to zero
                at low utilization. Priority-fee tips and ECIP-1017 block rewards are
                untouched by the whole suite. Revenue scales linearly with gas consumed,
                so it grows with adoption automatically and without governance action,
                from usage rather than from a foundation or a donor.
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
                <div className="relative grid grid-cols-6 gap-2">
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
