export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Olympia" className="mb-8 h-16 w-16" />

        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--brand-amber)]">
          Olympia Treasury
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Demo v0.1
        </h1>

        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
          Protocol-controlled vault for Ethereum Classic.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
          Live demo deployment — real-time monitoring of the ECIP-1112 protocol
          vault. Treasury balance, basefee inflows, withdrawal outflows, and
          public metrics for full transparency.
        </p>
      </div>
    </main>
  );
}
