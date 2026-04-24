import { useTranslation } from "react-i18next";
import {
  Hand, TrendingUp, Clock, Languages, CreditCard, Bell,
  Users, Timer, UserX, Banknote,
  Pizza, Coffee, Utensils,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import HardwareSection from "@/components/addon/HardwareSection";
import heroImage from "@/assets/addons/selfordering-terminals.png";

const PROBLEM_ICONS = [Users, UserX, Timer, TrendingUp];
const SOLUTION_ICONS = [Hand, CreditCard, TrendingUp, Bell];
const FEATURE_ICONS = [Hand, TrendingUp, Languages, CreditCard, Clock, Bell];
const USECASE_ICONS = [Pizza, Coffee, Utensils];
const INTERNAL_LINK_PATHS = ["/produkte/pakete/kassensystem", "/loesungen/restaurant"];

const KioskPage = () => {
  const { t, ready } = useTranslation("kiosk");

  const arr = <T,>(key: string): T[] => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const problemPoints = arr<string>("problem.points").map((text, i) => ({
    icon: PROBLEM_ICONS[i],
    text,
  }));

  const solutionPoints = arr<string>("solution.points").map((text, i) => ({
    icon: SOLUTION_ICONS[i],
    text,
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
      canonical: "https://gastro-master.de/produkte/add-ons/kiosk",
      breadcrumb: { name: t("meta.breadcrumbName"), path: "/produkte/add-ons/kiosk" },
      ctaPath: "/produkte/add-ons/kiosk",
    },
    hero: {
      badge: t("hero.badge"),
      headline: t("hero.headline"),
      subline: t("hero.subline"),
      heroImage,
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
      <AddOnPageTemplate
        config={config}
        hardwareSections={{
          afterTrust: <HardwareSection variant="multicolor" />,
          beforeFeatures: <HardwareSection variant="doublescreen" />,
          beforeUseCases: <HardwareSection variant="wallmount" />,
          beforePricing: <HardwareSection variant="outdoor" />,
        }}
      />
    </div>
  );
};

export default KioskPage;
