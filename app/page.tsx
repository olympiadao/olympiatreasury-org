import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/sections/NavHeaderFallback";
import { TreasuryHeroHeader } from "@/components/sections/TreasuryHeroHeader";
import { DashboardHero } from "@/components/sections/DashboardHero";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { VaultToTreasurySection } from "@/components/sections/VaultToTreasurySection";
import { TreasuryFundingSection } from "@/components/sections/TreasuryFundingSection";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { fetchStats, fetchTransactions, fetchBalanceHistory } from "@/lib/treasury";
import { DEFAULT_CHAIN_ID } from "@/lib/config";

export const revalidate = 600;

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["treasury", "stats", DEFAULT_CHAIN_ID],
      queryFn: () => fetchStats(DEFAULT_CHAIN_ID),
    }),
    queryClient.prefetchQuery({
      queryKey: ["treasury", "transactions", DEFAULT_CHAIN_ID],
      queryFn: () => fetchTransactions(DEFAULT_CHAIN_ID),
    }),
    queryClient.prefetchQuery({
      queryKey: ["treasury", "balanceHistory", DEFAULT_CHAIN_ID],
      queryFn: () => fetchBalanceHistory(DEFAULT_CHAIN_ID),
    }),
  ]);

  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      {/* Server-rendered: H1 + subtitle + CTA buttons always visible to crawlers */}
      <TreasuryHeroHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          {/* Every Suspense boundary needs a fallback: without one nothing is
              prerendered. */}
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-lg font-semibold">Vault and Treasury at a Glance</h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-[var(--text-muted)]">
                  <li>In the Vault: arrived and not yet swept</li>
                  <li>In the Treasury: funds under governance control</li>
                  <li>Last sweep: when the Vault was last emptied into the Treasury</li>
                  <li>Total received: lifetime inflow to the Vault, from every source</li>
                  <li>Mined to the Vault: miners choosing it as coinbase</li>
                  <li>Contributions: transfers sent from any address</li>
                  <li>Swept to the Treasury: the one route out of the Vault</li>
                  <li>Disbursed: paid out by executed proposals</li>
                  <li>Transactions: every movement at both addresses</li>
                </ul>
              </div>
            </div>
          }>
            <DashboardHero />
          </Suspense>
          {/* useSearchParams() opts these out of static prerender, so the fallback
              is what a crawler sees and carries the real heading. */}
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-lg font-semibold">Balance History</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Both balances over time: base-fee revenue arriving in the Olympia
                  Sovereignty Vault, and the sweeps that move it to the Treasury.
                </p>
              </div>
            </div>
          }>
            <BalanceChart />
          </Suspense>
          <VaultToTreasurySection />
          <TreasuryFundingSection />
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-lg font-semibold">Recent Transactions</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Every movement at both addresses: contributions in, sweeps from the
                  Vault to the Treasury, and disbursements executed by governance.
                </p>
              </div>
            </div>
          }>
            <TransactionsSection />
          </Suspense>
          {/* No Suspense: with no address to read, this section takes no chain
              parameter, so it needs no useSearchParams(). A crawler gets the contracts
              rather than a fallback carrying only the heading. */}
          <AboutSection />
        </main>
      </HydrationBoundary>
      <FooterSection />
    </>
  );
}
