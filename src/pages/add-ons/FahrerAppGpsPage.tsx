import { useTranslation } from "react-i18next";
import {
  MapPin, Navigation, Bell, WifiOff, Route,
  Search, AlertTriangle, PhoneOff, Printer,
  Pizza, Truck, Bike, Users,
} from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import heroImage from "@/assets/addons/addon-frankfurt.png";
import appleIcon from "@/assets/icons/Icon - Apple App Store.png";
import googleIcon from "@/assets/icons/Icon - Google Play Store.png";

const PROBLEM_ICONS = [Search, AlertTriangle, PhoneOff, Printer];
const SOLUTION_ICONS = [Route, MapPin, WifiOff, Bell];
const FEATURE_ICONS = [MapPin, Route, Bell, WifiOff, Navigation, Users];
const USECASE_ICONS = [Pizza, Truck, Bike];
const INTERNAL_LINK_PATHS = ["/produkte/pakete/kassensystem", "/loesungen/lieferdienst"];

const FahrerAppGpsPage = () => {
  const { t, ready } = useTranslation("fahrer-app");

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

  const appDownload = t("appDownload", { returnObjects: true }) as {
    appName: string; headline: string; sub: string;
  };

  const config: AddOnPageConfig = {
    meta: {
      title: t("meta.title"),
      description: t("meta.description"),
      canonical: "https://gastro-master.de/produkte/add-ons/fahrer-app-gps",
      breadcrumb: { name: t("meta.breadcrumbName"), path: "/produkte/add-ons/fahrer-app-gps" },
      ctaPath: "/produkte/add-ons/fahrer-app-gps",
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
    appDownload: {
      appName: appDownload?.appName ?? "",
      headline: appDownload?.headline ?? "",
      sub: appDownload?.sub ?? "",
      links: [
        {
          href: "https://apps.apple.com/de/app/gastromaster-fahrer/id6752778549",
          iconSrc: appleIcon,
          alt: "GastroMaster Fahrer im Apple App Store laden",
        },
        {
          href: "https://play.google.com/store/apps/details?id=com.epitglobal.GastroMasterFahrer&hl=de",
          iconSrc: googleIcon,
          alt: "GastroMaster Fahrer bei Google Play laden",
        },
      ],
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
      <ScrollProgressBar />
      <ScrollToTopButton />
      <AddOnPageTemplate config={config} />
    </div>
  );
};

export default FahrerAppGpsPage;
