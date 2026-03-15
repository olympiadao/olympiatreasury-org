import { NavHeader } from "@/components/sections/NavHeader";
import { DashboardHero } from "@/components/sections/DashboardHero";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { ContractsSection } from "@/components/sections/ContractsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        <DashboardHero />
        <BalanceChart />
        <TransactionsSection />
        <ContractsSection />
        <AboutSection />
      </main>
      <FooterSection />
    </>
  );
}
