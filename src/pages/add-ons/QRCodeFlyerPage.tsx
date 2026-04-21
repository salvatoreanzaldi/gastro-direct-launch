import { useTranslation } from "react-i18next";
import {
  QrCode, Smartphone, BarChart3, Printer, Paintbrush,
  Zap, Search, Clock, MousePointerClick, Pizza, Truck, Megaphone, Target,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import flyerMockup from "@/assets/mockups/Mock Up - Flyer.png";

const PROBLEM_ICONS = [Search, Clock, BarChart3, MousePointerClick];
const SOLUTION_ICONS = [QrCode, Zap, BarChart3, Printer];
const FEATURE_ICONS = [QrCode, BarChart3, Printer, Paintbrush, Smartphone, Target];
const USECASE_ICONS = [Pizza, Truck, Megaphone];
const INTERNAL_LINK_PATHS = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app"];

const QRCodeFlyerPage = () => {
  const { t, ready } = useTranslation("qr-code-flyer");

  const arr = <T,>(key: string): T[] => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const problemPoints = arr<{ text: string }>("problem.points").map((text, i) => ({
    icon: PROBLEM_ICONS[i],
    text: text as unknown as string,
  }));

  const solutionPoints = arr<{ text: string }>("solution.points").map((text, i) => ({
    icon: SOLUTION_ICONS[i],
    text: text as unknown as string,
  }));

  const featureItems = arr<{ title: string; description: string }>("features.items").map((item, i) => ({
    icon: FEATURE_ICONS[i],
    title: item.title,
    description: item.description,
  }));

  const useCaseItems = arr<{ title: string; story: string }>("useCases.items").map((item, i) => ({
    icon: USECASE_ICONS[i],
    title: item.title,
    story: item.story,
  }));

  const stats = arr<{ value: string; label: string }>("trust.stats");

  const tiers = arr<{ qty: string; price: string }>("pricing.tiers");

  const internalLinkItems = arr<{ title: string; description: string }>("internalLinks.items").map((item, i) => ({
    to: INTERNAL_LINK_PATHS[i],
    title: item.title,
    description: item.description,
  }));

  const faqItems = arr<{ q: string; a: string }>("faq.items");

  const testimonial = t("trust.testimonial", { returnObjects: true }) as {
    quote: string; author: string; role: string;
  };

  const config: AddOnPageConfig = {
    meta: {
      title: t("meta.title"),
      description: t("meta.description"),
      canonical: "https://gastro-master.de/produkte/add-ons/qr-code-flyer",
      breadcrumb: { name: t("meta.breadcrumbName"), path: "/produkte/add-ons/qr-code-flyer" },
      ctaPath: "/produkte/add-ons/qr-code-flyer",
    },
    hero: {
      badge: t("hero.badge"),
      headline: t("hero.headline"),
      subline: t("hero.subline"),
      heroImage: flyerMockup,
    },
    problemSolution: {
      problem: { title: t("problem.title"), points: problemPoints },
      solution: { title: t("solution.title"), points: solutionPoints },
    },
    features: {
      headline: t("features.headline"),
      sub: t("features.sub"),
      items: featureItems,
    },
    useCases: {
      headline: t("useCases.headline"),
      sub: t("useCases.sub"),
      items: useCaseItems,
    },
    trust: {
      stats,
      testimonial: {
        quote: testimonial?.quote ?? "",
        author: testimonial?.author ?? "",
        role: testimonial?.role ?? "",
      },
    },
    pricing: {
      headline: t("pricing.headline"),
      price: t("pricing.price"),
      note: t("pricing.note"),
      tiersHeadline: t("pricing.tiersHeadline"),
      tiers,
      tiersNote: t("pricing.tiersNote"),
    },
    internalLinks: {
      headline: t("internalLinks.headline"),
      intro: t("internalLinks.intro"),
      items: internalLinkItems,
    },
    faq: {
      headline: t("faq.headline"),
      sub: t("faq.sub"),
      items: faqItems,
    },
  };

  return (
    <div className={`transition-opacity duration-300 ${!ready ? "opacity-0" : "opacity-100"}`}>
      <AddOnPageTemplate config={config} />
    </div>
  );
};

export default QRCodeFlyerPage;
