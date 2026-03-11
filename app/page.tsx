import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { FundFlowSection } from "@/components/sections/FundFlowSection";
import { ContractsSection } from "@/components/sections/ContractsSection";
import { StageSection } from "@/components/sections/StageSection";
import { InvariantsSection } from "@/components/sections/InvariantsSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        <HeroSection />
        <OverviewSection />
        <FundFlowSection />
        <ContractsSection />
        <StageSection />
        <InvariantsSection />
        <SecuritySection />
      </main>
      <FooterSection />
    </>
  );
}
