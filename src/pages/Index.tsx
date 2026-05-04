import { lazy, Suspense, useEffect } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import HeroScrollSection from "@/components/landing/HeroScrollSection";
import { getCTAConfig } from "@/data/cta-config";
import { buildOrgGraph, SITE_URL, ORG_ID } from "@/data/schemaOrg";

const HOME_GRAPH = buildOrgGraph([
  {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Gastro Master", item: SITE_URL },
    ],
  },
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: "Gastro Master – Mehr Gewinn durch Direktbestellungen",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    inLanguage: "de-DE",
  },
]);

// Below-the-fold sections — code-split to keep the initial bundle small.
const GoogleReviewsGrid = lazy(() => import("@/components/GoogleReviewsGrid"));
const TrustedBrandsSection = lazy(() => import("@/components/landing/TrustedBrandsSection"));
const ProductShowcaseAccordionSection = lazy(() => import("@/components/landing/ProductShowcaseAccordionSection"));
const CalculatorSection = lazy(() => import("@/components/landing/CalculatorSection"));
const TargetGroupSection = lazy(() => import("@/components/landing/TargetGroupSection"));
const VideoTestimonialSection = lazy(() => import("@/components/landing/VideoTestimonialSection"));
const AppShowcaseSection = lazy(() => import("@/components/landing/AppShowcaseSection"));
const SlimPricingSection = lazy(() => import("@/components/landing/SlimPricingSection"));
const POSSection = lazy(() => import("@/components/landing/POSSection"));
const DifferentiationSection = lazy(() => import("@/components/landing/DifferentiationSection"));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection"));
const IntegrationSliderSection = lazy(() => import("@/components/landing/IntegrationSliderSection"));
const HomeTeamCTA = lazy(() => import("@/components/HomeTeamCTA"));
const CTASection = lazy(() =>
  import("@/components/CTASection").then((m) => ({ default: m.CTASection }))
);
const Footer = lazy(() => import("@/components/landing/Footer"));

// Preload all lazy chunks once the browser is idle so they are warm
// by the time the user scrolls — keeps Suspense fallbacks invisible
// without bloating the initial parse/exec budget.
const prefetchBelowFold = () => {
  void import("@/components/GoogleReviewsGrid");
  void import("@/components/landing/TrustedBrandsSection");
  void import("@/components/landing/ProductShowcaseAccordionSection");
  void import("@/components/landing/CalculatorSection");
  void import("@/components/landing/TargetGroupSection");
  void import("@/components/landing/VideoTestimonialSection");
  void import("@/components/landing/AppShowcaseSection");
  void import("@/components/landing/SlimPricingSection");
  void import("@/components/landing/POSSection");
  void import("@/components/landing/DifferentiationSection");
  void import("@/components/landing/ProcessSection");
  void import("@/components/landing/IntegrationSliderSection");
  void import("@/components/HomeTeamCTA");
  void import("@/components/CTASection");
  void import("@/components/landing/Footer");
};

const Index = () => {
  const { t } = useTranslation("common");
  useSeoMeta({
    title: t("seo.indexTitle"),
    description: t("seo.indexDescription"),
    canonical: "https://gastro-master.de/",
  });

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(prefetchBelowFold);
    } else {
      const t = setTimeout(prefetchBelowFold, 200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_GRAPH) }}
      />
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      {/* ATTENTION */}
      <HeroScrollSection />
      <Suspense fallback={null}>
        <GoogleReviewsGrid />
        <TrustedBrandsSection />
        {/* INTEREST */}
        <ProductShowcaseAccordionSection />
        <CalculatorSection />
        <TargetGroupSection />
        <VideoTestimonialSection />
        <AppShowcaseSection animate={false} showFloatingFood={false} carousel={true} />
        {/* DESIRE */}
        <SlimPricingSection />
        <POSSection />
        <DifferentiationSection />
        <ProcessSection />
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
      </Suspense>
    </div>
  );
};

export default Index;
