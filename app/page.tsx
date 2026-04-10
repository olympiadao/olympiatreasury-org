import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NavHeader } from "@/components/sections/NavHeader";
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <Suspense>
            <DashboardHero />
            <BalanceChart />
            <TreasuryFundingSection />
            <TransactionsSection />
            <AboutSection />
          </Suspense>
        </main>
      </HydrationBoundary>
      <FooterSection />
    </>
  );
}
