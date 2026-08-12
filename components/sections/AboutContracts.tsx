import { Lock, RefreshCw } from "lucide-react";
import architecture from "@/lib/contracts.json";

/**
 * The contract architecture, and deliberately no addresses.
 *
 * This used to publish nine demo addresses under headings that explained how each was
 * derived from a salt and an init-code hash. ECIP-1112 forbids exactly that as the
 * basis of the consensus commitment — no salted derivation, no init-code freeze, no
 * reserved deployer nonce — so the explanation described a design that no longer
 * exists and is deleted rather than corrected. Addresses the dashboard reads are
 * network configuration and live in `lib/config.ts`; `lib/contracts.json` carries
 * name, spec and role, and must not be given an address.
 *
 * With no address this takes no chain parameter, so it needs no `useSearchParams()`
 * and therefore no Suspense boundary — which is why a crawler now sees the contracts
 * rather than a fallback carrying only the heading.
 */
const contracts = Object.values(architecture.contracts);

/** ECIP-1113 §1.4, "Immutability boundary". */
const permanence = [
  {
    icon: Lock,
    title: "One contract is permanent",
    body: "The Vault sits at the address consensus credits, and changing that address takes a hard fork. It has no owner, no role, no setter and no parameter — nothing to configure, therefore nothing to misconfigure.",
  },
  {
    icon: RefreshCw,
    title: "Everything downstream is replaceable",
    body: "Governor, Timelock, CoreNFT, sanctions oracle and OFP Registry all change through ordinary governance without a fork. Making the Vault the smallest object the network is willing to make permanent is what buys that.",
  },
];

export function AboutContracts() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          The contract set
        </p>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          Six contracts. The Vault receives base-fee revenue and forwards it; the
          Timelock is the Treasury that holds it; the rest decide what leaves. Each
          links to the specification that defines it.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {contracts.map((c) => {
            const number = c.spec.replace(/[^0-9]/g, "").slice(0, 4);
            return (
              <div
                key={c.name}
                className="rounded-lg border border-[var(--border-subtle)] p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold">{c.name}</span>
                  <a
                    href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
                  >
                    {c.spec}
                  </a>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
                  {c.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          The permanence boundary
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {permanence.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
                <p.icon size={16} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {p.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
          A Treasury replacement is a governance program rather than a single act: the
          incumbent stays the standing inbox for base-fee revenue, so it forwards to its
          successor for as long as revenue keeps arriving. What it never requires is a
          fork.
        </p>
      </div>
    </div>
  );
}
