import { Hero } from "@/components/landing/Hero";
import { TestCards } from "@/components/landing/TestCards";
import { WhySection } from "@/components/landing/WhySection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TestCards />
      <WhySection />
      <ProcessSection />
      <AudienceSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
