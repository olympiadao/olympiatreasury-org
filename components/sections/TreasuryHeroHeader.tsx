import { ExternalLink } from "lucide-react";
import { CHAIN_CONFIG, DEFAULT_CHAIN_ID } from "@/lib/config";

/**
 * Reads the default chain rather than `?chain=`, so this stays server-rendered and a
 * crawler receives the H1, the subtitle and both calls to action. The live sections
 * below are the ones that follow the chain selector.
 */
const DEFAULT_CHAIN = CHAIN_CONFIG[DEFAULT_CHAIN_ID];

export function TreasuryHeroHeader() {
  return (
    <section className="px-6 pt-28 pb-2">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Olympia{" "}
              <span className="text-[var(--brand-green)]">Treasury</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">
              Live monitoring of Ethereum Classic&rsquo;s base-fee revenue, from the
              Sovereignty Vault that receives it to the Treasury that holds it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`${DEFAULT_CHAIN.explorer}/address/${DEFAULT_CHAIN.vault}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
            >
              Vault on the explorer
              <ExternalLink size={14} />
            </a>
            <a
              href={`${DEFAULT_CHAIN.explorer}/address/${DEFAULT_CHAIN.treasury}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              Treasury on the explorer
              <ExternalLink size={14} />
            </a>
            <a
              href="https://app.olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              Governance App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
