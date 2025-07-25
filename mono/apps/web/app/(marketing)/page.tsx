"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TargetUsersSection } from "@/components/sections/target-users-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PricingSection } from "@/components/marketing/pricing-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TargetUsersSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
