import { Cpu, ArrowDownToLine, Radio, Landmark } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * How value gets from the Vault to the Treasury.
 *
 * No other site in the Olympia set is better placed to explain this, and the dashboard
 * is unreadable without it: a reader who does not know there are two contracts reads an
 * empty Vault as revenue missing rather than as revenue that completed its journey.
 */
const steps = [
  {
    icon: Cpu,
    title: "Consensus credits the Vault",
    body: "At block finalization the client adds the block's base fee to the Vault's balance directly. That write executes no EVM code, so no receive() body runs, no event fires, and the contract cannot observe or refuse the credit. It is also why the Vault keeps no internal counter: a contract releasing funds against a total it increments would release nothing.",
  },
  {
    icon: ArrowDownToLine,
    title: "sweep() moves the balance",
    body: "Anyone may call it, and the caller pays the gas. It transfers the entire balance to one address fixed when the contract was built. There is no minimum threshold, deliberately — on a chain whose revenue is small until adoption grows, a threshold is a way for funds to be stranded below it.",
  },
  {
    icon: Radio,
    title: "Swept is emitted",
    body: "Swept(destination, amount), before the external call, and it is the only event the Vault has. It carries no proposal identifier and no governance metadata, because the Vault knows nothing about either. A sweep log is not a receipt log: value arrives many times between sweeps, and anyone may contribute directly.",
  },
  {
    icon: Landmark,
    title: "The Treasury holds it",
    body: "Until a passed proposal releases it. The Governor is the Timelock's sole executor, a mandatory delay elapses between queueing and execution, and every externally-directed target is screened immediately before the funds move.",
  },
];

export function VaultToTreasurySection() {
  return (
    <>
      <SectionDivider />
      <section
        aria-labelledby="vault-to-treasury-heading"
        className="section-alt relative py-24 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--brand-green)]">
              ECIP-1112 · ECIP-1113
            </p>
            <h2
              id="vault-to-treasury-heading"
              className="mt-2 max-w-2xl text-3xl font-bold tracking-tight"
            >
              How the money gets from one address to the other
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--text-muted)]">
              Base-fee revenue lands in the Vault and lives in the Treasury. Those are
              two contracts with two jobs, and the whole design turns on keeping them
              apart.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            {/* The path, as a rail. */}
            <ol className="relative space-y-7">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 90}>
                  <li className="relative flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-brand)] bg-[var(--background)] text-[var(--brand-green)]">
                        <step.icon size={18} aria-hidden="true" />
                      </span>
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="mt-2 w-px flex-1 bg-[var(--border-default)]"
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold">
                        <span className="mr-2 font-mono text-xs text-[var(--text-subtle)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>

            {/* Why two, offset against the rail. */}
            <div className="space-y-5 lg:pt-4">
              <FadeIn delay={120}>
                <div className="rounded-xl border border-[var(--brand-amber-border)] bg-[var(--brand-amber-subtle)] p-6">
                  <p className="text-base font-semibold">
                    Why two contracts instead of one?
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    Because the address consensus commits to can only change by hard
                    fork, and governance has to be able to change without one. Wire a
                    permanent address straight into a governance stack and every part of
                    that stack inherits the permanence.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    So the network makes the smallest possible thing permanent: a
                    contract with no owner, no role, no setter and no parameter, whose
                    entire behavior is to receive value and forward it unchanged. Nothing
                    to configure, therefore nothing to misconfigure. Everything mutable
                    lives strictly downstream — and that is what makes the Treasury
                    replaceable.
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed">
                    Exactly one contract in Olympia is permanent, and it is the Vault.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={180}>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                  <p className="text-sm font-semibold">
                    Permissionless because the destination is immutable
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    A caller of{" "}
                    <code className="font-mono text-[var(--text-primary)]">sweep()</code>{" "}
                    chooses only <em>when</em> the balance moves, never <em>where</em>.
                    There is nothing for an unauthorized caller to gain and no
                    authorization to administer. Elsewhere in the ecosystem the same
                    function is a liability, because the recipient is mutable state
                    behind a proxy — that is the one property of that design this
                    contract must not copy.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={240}>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                  <p className="text-sm font-semibold">
                    Nothing causes a sweep to happen
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    It is permissionless and unincentivized at once, so at low revenue
                    the gas can exceed the amount moved and no third party has a reason
                    to call it. A proposal that executes while the balance still sits in
                    the Vault reverts for want of funds in the Timelock, which is why a
                    disbursement batch leads with a sweep. Nothing is stranded — anyone
                    can call it at any time, including the DAO. What is required is only
                    that someone does, and the balance above is how you tell whether
                    anyone has.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
