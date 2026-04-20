import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import HeroScrollSection from "@/components/landing/HeroScrollSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import SlimPricingSection from "@/components/landing/SlimPricingSection";
import POSSection from "@/components/landing/POSSection";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import VideoTestimonialSection from "@/components/landing/VideoTestimonialSection";
import AppShowcaseSection from "@/components/landing/AppShowcaseSection";
import ProductShowcaseAccordionSection from "@/components/landing/ProductShowcaseAccordionSection";
import FounderTrustSection from "@/components/landing/FounderTrustSection";
import ProcessSection from "@/components/landing/ProcessSection";
import PartnerSection from "@/components/landing/PartnerSection";
import IntegrationSliderSection from "@/components/landing/IntegrationSliderSection";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import TrustedBrandsSection from "@/components/landing/TrustedBrandsSection";
import Footer from "@/components/landing/Footer";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";


const Index = () => {
  const { t } = useTranslation("common");
  useSeoMeta({
    title: t("seo.indexTitle"),
    description: t("seo.indexDescription"),
    canonical: "https://gastro-master.de/",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ATTENTION */}
      <HeroScrollSection />
      {/* A/B Test */}
      {/* <HeroSectionB /> */}
      {/* <HeroSection /> */}
      <GoogleReviewsGrid />
      <TrustedBrandsSection />
      {/* <TrustSection /> */}
      {/* INTEREST */}
      <ProductShowcaseAccordionSection />
      <CalculatorSection />
      <TargetGroupSection />
      <VideoTestimonialSection />
      <AppShowcaseSection animate={false} showFloatingFood={false} carousel={true} />
      {/* <PositioningSection /> */}
      {/* <ProblemSection /> */}
      {/* <SolutionSection /> */}
      {/* <MockupShowcase /> */}
      {/* DESIRE */}
      {/* <PricingSection /> */}
      {/* <GlassyPricingSection /> */}
      <SlimPricingSection />
      <POSSection />
      {/* <PickUpScreenSection /> */}
      {/* <TransaktionsUmlageSection /> */}
      <DifferentiationSection />
      {/* <FounderTrustSection /> */}
      {/* <LanguageBadgeSection /> */}
      {/* <MomentumSection /> */}
      <ProcessSection />
      {/* <RiskReversalSection /> */}
      {/* <ReferencesSection /> */}
      {/* <PartnerSection /> */}
      <IntegrationSliderSection />

      {/* Desktop Team CTA Section */}
      <div className="hidden md:block">
        <HomeTeamCTA />
      </div>

      {/* Mobile CTA Section */}
      <div className="md:hidden">
        <CTASection {...getCTAConfig("/")} />
      </div>

      {/* ACTION */}
      <Footer />
    </div>
  );
};

export default Index;
