import { Suspense } from "react";
import { NavHeader } from "@/components/sections/NavHeader";
import { DashboardHero } from "@/components/sections/DashboardHero";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { TreasuryFundingSection } from "@/components/sections/TreasuryFundingSection";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Suspense>
        <NavHeader />
      </Suspense>
      <main>
        <Suspense>
          <DashboardHero />
          <BalanceChart />
          <TreasuryFundingSection />
          <TransactionsSection />
          <AboutSection />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}
