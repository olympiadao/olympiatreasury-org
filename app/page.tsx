import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NavHeader } from "@/components/sections/NavHeader";
import { TreasuryHeroHeader } from "@/components/sections/TreasuryHeroHeader";
import { DashboardHero } from "@/components/sections/DashboardHero";
import { BalanceChart } from "@/components/sections/BalanceChart";
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
      <Suspense>
        <NavHeader />
      </Suspense>
      {/* Server-rendered: H1 + subtitle + CTA buttons always visible to crawlers */}
      <TreasuryHeroHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          {/* CSR: countdown + chain-aware vault address + live KPI cards */}
          <Suspense>
            <DashboardHero />
          </Suspense>
          {/* CSR: balance history chart */}
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <p className="text-sm text-[var(--text-muted)]">
                  Treasury balance history: cumulative ETC inflows to the Olympia protocol vault over time.
                </p>
              </div>
            </div>
          }>
            <BalanceChart />
          </Suspense>
          <TreasuryFundingSection />
          {/* CSR: recent inflow/outflow transactions */}
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <p className="text-sm text-[var(--text-muted)]">
                  Recent treasury transactions: governance-approved withdrawals and protocol inflows.
                </p>
              </div>
            </div>
          }>
            <TransactionsSection />
          </Suspense>
          <Suspense>
            <AboutSection />
          </Suspense>
        </main>
      </HydrationBoundary>
      <FooterSection />
    </>
  );
}
