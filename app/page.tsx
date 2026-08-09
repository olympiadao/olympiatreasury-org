import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/sections/NavHeaderFallback";
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
                <h2 className="mb-6 text-lg font-semibold">Treasury at a Glance</h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-[var(--text-muted)]">
                  <li>Balance: total ETC held by the vault</li>
                  <li>BaseFee: the protocol-directed source, activating with Olympia</li>
                  <li>Mined to the Treasury: miners choosing the vault as coinbase</li>
                  <li>Donations: transfers sent from any address</li>
                  <li>Withdrawals: governance-approved OFPs paid out</li>
                  <li>Transactions: every inflow and outflow, on-chain</li>
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
                  Treasury balance history: cumulative ETC inflows to the Olympia protocol vault over time.
                </p>
              </div>
            </div>
          }>
            <BalanceChart />
          </Suspense>
          <TreasuryFundingSection />
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-lg font-semibold">Recent Transactions</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Recent treasury transactions: governance-approved withdrawals and protocol inflows.
                </p>
              </div>
            </div>
          }>
            <TransactionsSection />
          </Suspense>
          <Suspense fallback={
            <div className="px-6 py-8">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 text-lg font-semibold">About the Treasury</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  How funds flow into the vault, how the CoreNFT that governs it
                  works, the staged deployment, the core invariants, and the deployed contracts.
                </p>
              </div>
            </div>
          }>
            <AboutSection />
          </Suspense>
        </main>
      </HydrationBoundary>
      <FooterSection />
    </>
  );
}
