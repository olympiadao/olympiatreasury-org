import { NavHeader } from "@/components/sections/NavHeader";
import { DashboardHero } from "@/components/sections/DashboardHero";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
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
        <AboutSection />
      </main>
      <FooterSection />
    </>
  );
}
