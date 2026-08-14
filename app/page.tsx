import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { NumbersSection } from "@/components/home/numbers-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { IndustriesSection } from "@/components/home/industries-section";
import { ProcessSection } from "@/components/home/process-section";
import { WhyUs } from "@/components/home/why-us";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";
import { AuditModal } from "@/components/home/audit-modal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <NumbersSection />
      <ServicesOverview />
      <IndustriesSection />
      <ProcessSection />
      <WhyUs />
      <TestimonialsSection />
      <CtaSection />
      <AuditModal />
    </>
  );
}
