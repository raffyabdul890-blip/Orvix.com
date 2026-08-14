import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { WhyUs } from "@/components/home/why-us";
import { CtaSection } from "@/components/home/cta-section";
import { AuditModal } from "@/components/home/audit-modal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesOverview />
      <WhyUs />
      <CtaSection />
      <AuditModal />
    </>
  );
}
