import { Vault, ExternalLink } from "lucide-react";

const TREASURY_ADDRESS = "0xd6165F3aF4281037bce810621F62B43077Fb0e37";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--brand-amber-border)] bg-[var(--brand-amber-subtle)] px-4 py-2 text-sm font-medium text-[var(--brand-amber)]">
        <Vault size={16} />
        ECIP-1112 · Protocol-Controlled Treasury
      </div>

      <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Olympia{" "}
        <span className="text-[var(--brand-green)]">Treasury</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
        A non-inflationary, immutable vault for Ethereum Classic protocol
        revenue. Receives EIP-1559 basefee, disburses funds only through
        on-chain governance.
      </p>

      <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-6 py-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Treasury Contract
        </p>
        <code className="font-mono text-sm text-[var(--brand-green)] sm:text-base">
          {TREASURY_ADDRESS}
        </code>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={`https://etc-mordor.blockscout.com/address/${TREASURY_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-8 py-3.5 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
        >
          View on Explorer
          <ExternalLink size={16} />
        </a>
        <a
          href="https://olympiadao.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-8 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
        >
          OlympiaDAO
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
