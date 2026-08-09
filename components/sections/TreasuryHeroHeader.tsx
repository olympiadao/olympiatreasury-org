import { ExternalLink } from "lucide-react";
import { CHAIN_CONFIG } from "@/lib/config";

/**
 * Mordor is where the contract this dashboard reads is deployed; ECIP-1112 publishes
 * no mainnet address. Hardcoded rather than reading ?chain= so this stays
 * server-rendered.
 */
const DEMO_CHAIN = CHAIN_CONFIG[63];

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
            <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
              Live monitoring of the core development vault. Base fee revenue funds
              the treasury.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${DEMO_CHAIN.explorer}/address/${DEMO_CHAIN.treasury}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
            >
              Explorer · Mordor
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
