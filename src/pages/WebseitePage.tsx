import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2, Star,
  Globe, Images, Instagram, Mail, Users, Briefcase,
  Building2, Link2, Search, MapPin, TrendingUp,
  UtensilsCrossed, Coffee, Wrench, GraduationCap,
  ConciergeBell, Store, Hotel, Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { GlobeStickers } from "@/components/ui/cobe-globe-stickers";
import { useIsMobile } from "@/hooks/use-mobile";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";

// ─── Assets ───────────────────────────────────────────────────────────────────
import heroGastroMaster from "@/assets/heroes/Hero - Gastro Master.png";
import heroBaeckerei    from "@/assets/heroes/Hero - Bäckerei Zimmer.png";
import heroEtManus      from "@/assets/heroes/Hero - Et Manus.png";
import heroDT           from "@/assets/heroes/Hero - DT.png";
import heroDandT        from "@/assets/heroes/Hero - D&T.png";
import logoKojo         from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoIlSorriso    from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoBurger       from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoArtemis      from "@/assets/logos/kunden/logo-artemis.png";
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";

// ─── Webpage Zielgruppen-Mockups ─────────────────────────────────────────────
import wpRestaurantDesktop   from "@/assets/webpage/Restaurant - Desktop.png";
import wpRestaurantMobile    from "@/assets/webpage/Restaurant - Mobile.png";
import wpRestaurantTablet    from "@/assets/webpage/Restaurant - Tablet.png";
import wpBarDesktop          from "@/assets/webpage/Bar - Desktop.png";
import wpBarMobile           from "@/assets/webpage/Bar - Mobile.png";
import wpBarTablet           from "@/assets/webpage/Bar - Tablet.png";
import wpFranchiseDesktop    from "@/assets/webpage/Franchise - Desktop.png";
import wpFranchiseMobile     from "@/assets/webpage/Franchise - Mobile.png";
import wpFranchiseTablet     from "@/assets/webpage/Franchise - Tablet.png";
import wpBaeckereiDesktop    from "@/assets/webpage/Bäckerei - Desktop.png";
import wpBaeckereiMobile     from "@/assets/webpage/Bäckerei - Mobile.png";
import wpBaeckereiTablet     from "@/assets/webpage/Bäckerei - Tablet.png";
import wpSchulenDesktop      from "@/assets/webpage/Schulen - Desktop.png";
import wpSchulenMobile       from "@/assets/webpage/Schulen - Mobile.png";
import wpSchulenTablet       from "@/assets/webpage/Schulen - Tablet.png";
import wpDienstleisterDesktop from "@/assets/webpage/Dienstleister - Desktop.png";
import wpDienstleisterMobile  from "@/assets/webpage/Dienstleister - Mobile.png";
import wpDienstleisterTablet  from "@/assets/webpage/Dienstleister - Tablet.png";
import wpImmobilienDesktop   from "@/assets/webpage/Immobilien - Desktop.png";
import wpImmobilienMobile    from "@/assets/webpage/Immobilien - Mobile.png";
import wpImmobilienTablet    from "@/assets/webpage/Immobilien - Tablet.png";
import wpFinanzenDesktop     from "@/assets/webpage/Finanzen - Desktop.png";
import wpFinanzenMobile      from "@/assets/webpage/Finanzen - Mobile.png";
import wpFinanzenTablet      from "@/assets/webpage/Finanzen - Tablet.png";

const ZIELGRUPPEN = [
  { label: "Restaurant", desktop: wpRestaurantDesktop, mobile: wpRestaurantMobile, tablet: wpRestaurantTablet },
  { label: "Bar", desktop: wpBarDesktop, mobile: wpBarMobile, tablet: wpBarTablet },
  { label: "Franchise", desktop: wpFranchiseDesktop, mobile: wpFranchiseMobile, tablet: wpFranchiseTablet },
  { label: "Bäckerei", desktop: wpBaeckereiDesktop, mobile: wpBaeckereiMobile, tablet: wpBaeckereiTablet },
  { label: "Schulen", desktop: wpSchulenDesktop, mobile: wpSchulenMobile, tablet: wpSchulenTablet },
  { label: "Dienstleister", desktop: wpDienstleisterDesktop, mobile: wpDienstleisterMobile, tablet: wpDienstleisterTablet },
  { label: "Immobilien", desktop: wpImmobilienDesktop, mobile: wpImmobilienMobile, tablet: wpImmobilienTablet },
  { label: "Finanzen", desktop: wpFinanzenDesktop, mobile: wpFinanzenMobile, tablet: wpFinanzenTablet },
];

const PORTFOLIO_IMGS = [heroGastroMaster, heroBaeckerei, heroEtManus, heroDT, heroDandT];
const TESTIMONIAL_LOGOS = [logoKojo, logoIlSorriso, logoBurger, logoArtemis];
const TEAM_IMGS = [teamReneImg, teamSalvatoreImg, teamAndrejImg];

const TRUST_BAR_URLS = [
  "https://aboutus.godaddy.net/newsroom/news-releases/press-release-details/2024/Gen-Z-and-Millennials-to-Small-Businesses-Get-Online-or-Get-Left-Behind/default.aspx",
  "https://www.thinkwithgoogle.com/",
  null,
];

const STAT_URLS = [
  "https://www.hubspot.com/",
  "https://www.thinkwithgoogle.com/",
  "https://www2.deloitte.com/",
];

const STAT_ICONS = [TrendingUp, MapPin, Search];

const FEATURE_ICONS = [Images, Instagram, Mail, Users, Briefcase, Building2, Link2];

const BRANCHEN_ICONS = [UtensilsCrossed, Coffee, Wrench, GraduationCap, ConciergeBell, Building2, Hotel, Store];

const LANG_META = [
  { flag: "🇩🇪", color: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300" },
  { flag: "🇬🇧", color: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300" },
  { flag: "🇮🇹", color: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300" },
  { flag: "🇮🇷", color: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300" },
  { flag: "🇷🇺", color: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300" },
  { flag: "🇱🇰", color: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300" },
];

// ─── JSON-LD Schema (bleibt statisch DE für SEO) ─────────────────────────────
const FAQ_ITEMS_SCHEMA = [
  { q: "Wie lange dauert die Erstellung einer Webseite?", a: "Eine einfache Webseite (Onepager) ist in der Regel innerhalb weniger Tage online." },
  { q: "Was ist der Unterschied zwischen Abo (49 €/Monat) und Einmalkauf?", a: "Beim monatlichen Abo übernehmen wir dauerhaft Hosting, Domain, technischen Support und Updates. Beim Einmalkauf erwirbst du die vollständige Webseite." },
  { q: "Brauche ich Technikkenntnisse, um meine Webseite zu pflegen?", a: "Nein. Im monatlichen Abo kümmern wir uns um alle technischen Aspekte." },
  { q: "Kann ich meine Webseite mit dem Gastro Master Webshop oder der App verknüpfen?", a: "Ja. Deine Gastro Master Webseite lässt sich nahtlos mit dem digitalen Bestellsystem und der eigenen Bestell-App verknüpfen." },
  { q: "Was bedeutet DSGVO-konform, und warum ist das wichtig?", a: "DSGVO-konform bedeutet, dass deine Webseite alle Anforderungen der europäischen Datenschutz-Grundverordnung erfüllt." },
  { q: "Für welche Branchen baut Gastro Master Webseiten?", a: "Unser Schwerpunkt liegt auf der Gastronomie, aber wir bauen Webseiten für jede Branche." },
  { q: "Was ist im monatlichen Abo enthalten?", a: "Das monatliche Abo umfasst: professionelles Webdesign, eigene Domain, zuverlässiges Hosting, 2 E-Mail-Postfächer, DSGVO-konforme Einrichtung, technischen Support und laufende Updates." },
];

const SCHEMA_PRODUCT = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professionelle Webseite für Gastronomie und weitere Branchen",
  "description": "Professionelle Webseite ab 49 €/Monat oder Einmalkauf ab 990 €. Für Gastronomen, Handwerker, Schulen und alle weiteren Branchen. Inkl. Domain, Hosting, DSGVO-konform.",
  "brand": { "@type": "Brand", "name": "Gastro Master" },
  "offers": [
    {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": { "@type": "UnitPriceSpecification", "billingIncrement": 1, "unitCode": "MON" },
      "seller": { "@type": "Organization", "name": "Gastro Master Deutschland" },
    },
    {
      "@type": "Offer",
      "price": "990",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "description": "Simple Website (Onepager) Einmalkauf ab 990 €",
      "seller": { "@type": "Organization", "name": "Gastro Master Deutschland" },
    },
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS_SCHEMA.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
    { "@type": "ListItem", position: 3, name: "Webseite", item: "https://gastro-master.de/produkte/webseite" },
  ],
};

// ─── Inline Components ────────────────────────────────────────────────────────
const RenderFaqLinks = ({ text, lp }: { text: string; lp: (p: string) => string }) => (
  <>
    {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
      const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (m) return <Link key={i} to={lp(m[2])} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
      return part;
    })}
  </>
);

const FaqItem = ({ q, a, lp }: { q: string; a: string; lp: (p: string) => string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg leading-snug group-hover:text-cyan-brand transition-colors duration-200">{q}</span>
        <span className="flex-shrink-0 mt-0.5 text-white/40 group-hover:text-cyan-brand transition-colors duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl"><RenderFaqLinks text={a} lp={lp} /></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamCTA = () => {
  const { t } = useTranslation("webseite");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const languages = arr("teamCta.languages") as string[];

  const roles = arr("teamCta.roles") as string[];
  const teamRoles = [
    { img: TEAM_IMGS[0], name: "René Ebert",       role: roles[0] ?? "" },
    { img: TEAM_IMGS[1], name: "Salvatore Anzaldi", role: roles[1] ?? "" },
    { img: TEAM_IMGS[2], name: "Andrej Krutsch",    role: roles[2] ?? "" },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!teamRoles.length) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % teamRoles.length), 4000);
    return () => clearInterval(timer);
  }, [teamRoles.length]);

  const member = teamRoles[current];
  if (!member) return null;

  return (
    <section className="bg-[#F0F4F8] dark:bg-[#060e1a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#0d1f35] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40 grid lg:grid-cols-2"
        >
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              {t("teamCta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t("teamCta.title") }} />
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">{t("teamCta.expectTitle")}</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              {t("teamCta.expectDesc")}
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              {t("teamCta.afterDesc")}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {languages.map((label, i) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${LANG_META[i]?.color ?? ""}`}
                >
                  <span className="text-lg leading-none">{LANG_META[i]?.flag}</span>
                  {label}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => { window.location.href = lp("/kontakt"); }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group w-fit"
            >
              {t("teamCta.cta")}
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
          <div className="relative min-h-[380px] lg:min-h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={member.img}
                alt={member.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-8 py-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white font-bold text-lg leading-tight">{member.name}</p>
                  <p className="text-white/70 text-sm">{member.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
              {teamRoles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WebseitePage = () => {
  const { t, ready } = useTranslation("webseite");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/webseite",
  });

  const isMobile = useIsMobile();
  const [activeZielgruppe, setActiveZielgruppe] = useState(0);
  const [zgPaused, setZgPaused] = useState(false);
  const zielgruppenTexts = arr("zielgruppen.texts") as string[];

  useEffect(() => {
    if (zgPaused) {
      const resume = setTimeout(() => setZgPaused(false), 12000);
      return () => clearTimeout(resume);
    }
    const interval = setInterval(() => {
      setActiveZielgruppe((prev) => (prev + 1) % ZIELGRUPPEN.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [zgPaused]);

  const trustBarItems = arr("trustBar.items") as { value: string; label: string; source: string | null }[];
  const heroIcons = [Globe, CheckCircle2, Handshake, Star];
  const heroPills = arr("hero.pills") as string[];
  const onlineStats = arr("onlinePresence.stats") as { value: string; desc: string; source: string; color: string }[];
  const featureTiles = arr("features.tiles") as { title: string; desc: string }[];
  const portfolioItems = arr("portfolio.items") as { label: string; name: string; alt: string }[];
  const branchenItems = arr("branchen.items") as string[];
  const processSteps = arr("process.steps") as { num: string; title: string; desc: string }[];
  const aboFeatures = arr("pricing.abo.features") as string[];
  const simpleFeatures = arr("pricing.simple.features") as string[];
  const individualFeatures = arr("pricing.individual.features") as string[];
  const testimonialItems = arr("testimonials.items") as { initials: string; quote: string; name: string; restaurant: string }[];
  const testimonialStats = arr("testimonials.stats") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];

  if (!ready) return null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── S1: HERO (ausgeblendet – alte Variante) ─────────────────────── */}
        {/* <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5" />
                {t("hero.badge")}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6">
                {t("hero.title1")}{" "}
                <span className="text-gradient-brand">{t("hero.titleHighlight")}</span>
                {" "}{t("hero.title2")}
              </h1>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                {t("hero.desc")}
              </p>
              <p className="text-white/45 text-base max-w-2xl mx-auto mb-10">
                {t("hero.subdesc")}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {heroPills.map((label, i) => {
                  const Icon = heroIcons[i];
                  return (
                    <div key={label} className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-white/80 text-sm font-medium">
                      {Icon && <Icon className="w-4 h-4 text-cyan-brand" />}
                      {label}
                    </div>
                  );
                })}
              </div>

              <motion.button
                onClick={() => { window.location.href = lp("/kontakt"); }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section> */}

        {/* ── S1-B: HERO (A/B-Test Variante) ────────────────────────────────── */}
        <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-24 pb-10 md:pt-32 md:pb-14">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5" />
                {t("hero_b.badge")}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-[1.15] mb-6">
                {t("hero_b.title1")}{" "}
                <span className="text-gradient-brand">{t("hero_b.titleHighlight")}</span>
                <br />
                {t("hero_b.title2")}
              </h1>

              {/* ── 3D Globe ── */}
              <div className="flex justify-center -mt-10 md:-mt-14 -mb-6 md:-mb-8">
                <div className="w-[18rem] md:w-[26rem] lg:w-[30rem]">
                  <GlobeStickers speed={0.005} />
                </div>
              </div>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-2">
                {t("hero_b.desc")}
              </p>
              <p className="text-white/45 text-base max-w-2xl mx-auto mb-4">
                {t("hero_b.subdesc")}
              </p>

              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-3 mb-4">
                {arr("hero_b.pills").map((label, i) => {
                  const Icon = heroIcons[i];
                  return (
                    <div key={label} className="flex items-center justify-center gap-1.5 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-white/80 text-sm font-medium">
                      {Icon && <Icon className="w-4 h-4 text-cyan-brand" />}
                      {label}
                    </div>
                  );
                })}
              </div>

              <motion.button
                onClick={() => { window.location.href = lp("/kontakt"); }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
              >
                {t("hero_b.cta")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ── S2: TRUST BAR ─────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {trustBarItems.map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-2 leading-none">{s.value}</p>
                <p className="text-[#0A264A]/55 dark:text-white/45 text-sm leading-snug mb-2">{s.label}</p>
                {s.source && TRUST_BAR_URLS[i] && (
                  <a href={TRUST_BAR_URLS[i]!} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-brand/70 hover:text-cyan-brand underline transition-colors">
                    {t("common:sourceLabel")}: {s.source}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── S2b: ZIELGRUPPEN-SHOWCASE ─────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("portfolio.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
                {t("portfolio.title")}
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-lg max-w-xl mx-auto">
                {t("portfolio.desc")}
              </p>
            </motion.div>

            {/* Zielgruppen-Pills */}
            <div className="grid grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-3 mb-4">
              {ZIELGRUPPEN.map((zg, i) => (
                <button
                  key={zg.label}
                  onClick={() => { setActiveZielgruppe(i); setZgPaused(true); }}
                  className={`px-3 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 text-center ${
                    activeZielgruppe === i
                      ? "bg-cyan-brand text-white shadow-lg shadow-cyan-brand/25"
                      : "bg-[#0A264A]/[0.06] dark:bg-white/[0.08] text-[#0A264A]/70 dark:text-white/60 hover:bg-[#0A264A]/[0.12] dark:hover:bg-white/[0.15]"
                  }`}
                >
                  {zg.label}
                </button>
              ))}
            </div>

            {/* Zielgruppen-Text – feste Hoehe um Layout-Sprung zu vermeiden */}
            <div className="h-[4.5rem] md:h-[3.5rem] max-w-2xl mx-auto mb-10 relative">
              {zielgruppenTexts.map((text, i) => (
                <p
                  key={i}
                  className={`absolute inset-0 text-[#0A264A]/60 dark:text-white/50 text-base md:text-lg text-center leading-relaxed transition-opacity duration-300 ${
                    i === activeZielgruppe ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Mockup-Anzeige: alle vorgeladen, nur aktive sichtbar */}
            <div className="relative">
              {ZIELGRUPPEN.map((zg, i) => (
                <div
                  key={zg.label}
                  className={`flex flex-col items-center gap-10 transition-opacity duration-500 ${
                    i === activeZielgruppe ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Mobile + Tablet nebeneinander */}
                  <div className="flex items-end justify-center gap-6 md:gap-10 w-full max-w-3xl">
                    <img
                      src={zg.mobile}
                      alt={`${zg.label} – Mobile Ansicht`}
                      className="w-[28%] md:w-[22%]"
                    />
                    <img
                      src={zg.tablet}
                      alt={`${zg.label} – Tablet Ansicht`}
                      className="w-[52%] md:w-[48%]"
                    />
                  </div>

                  {/* Desktop-Mockup im Browser-Frame */}
                  <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30 border border-[#0A264A]/10 dark:border-white/10">
                    {/* Browser Toolbar */}
                    <div className="bg-[#E8EAED] dark:bg-[#2B2B2B] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-white dark:bg-[#1A1A1A] rounded-md px-3 py-1 text-xs text-[#0A264A]/40 dark:text-white/30 font-mono truncate">
                          <span className="md:hidden">www.deine-seite.de</span>
                          <span className="hidden md:inline">www.hier-koennte-deine-seite-stehen.de</span>
                        </div>
                      </div>
                    </div>
                    {/* Screenshot */}
                    <img
                      src={zg.desktop}
                      alt={`${zg.label} – Desktop Ansicht`}
                      className="w-full block"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <motion.button
                onClick={() => { window.location.href = lp("/kontakt"); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-amber text-white dark:text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 shadow-lg"
              >
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── S3: WARUM ONLINE PRÄSENZ ──────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("onlinePresence.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t("onlinePresence.title") }} />
              <p className="text-[#0A264A]/55 dark:text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("onlinePresence.desc")}{" "}
                <Link to={lp("/loesungen/lieferservice-gruenden")} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{t("onlinePresence.descLink")}</Link>{" "}
                {t("onlinePresence.descAfter")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {onlineStats.map((stat, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-[#0A264A]/[0.03] dark:bg-white/[0.04] border border-[#0A264A]/[0.07] dark:border-white/[0.07] rounded-2xl p-8"
                  >
                    {Icon && <Icon className={`w-7 h-7 mb-4 ${stat.color}`} />}
                    <p className={`text-4xl font-black mb-3 ${stat.color}`}>{stat.value}</p>
                    <p className="text-[#0A264A]/65 dark:text-white/55 text-sm leading-relaxed mb-3">{stat.desc}</p>
                    <a href={STAT_URLS[i]} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0A264A]/35 dark:text-white/30 hover:text-cyan-brand underline transition-colors">
                      {t("common:sourceLabel")}: {stat.source}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <motion.button
                onClick={() => { window.location.href = lp("/kontakt"); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base shadow-lg"
              >
                {t("onlinePresence.cta")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── S4: FEATURES / BENTO ──────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("features.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                {t("features.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featureTiles.map((tile, i) => {
                const Icon = FEATURE_ICONS[i];
                const isLarge = i === 0 || i === 5;
                const isHighlight = i === 6;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className={`${isHighlight ? "col-span-2 lg:col-span-4 bg-cyan-brand/10 border border-cyan-brand/20 hover:bg-cyan-brand/[0.13]" : isLarge ? "col-span-2 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09]" : "col-span-1 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09]"} rounded-2xl p-7 transition-colors`}
                  >
                    {Icon && <Icon className="w-7 h-7 text-cyan-brand mb-4" />}
                    <h3 className={`text-white font-bold ${isLarge || isHighlight ? "text-lg" : "text-base"} mb-2`}>{tile.title}</h3>
                    <p className={`${isHighlight ? "text-white/60" : "text-white/50"} text-sm leading-relaxed ${isHighlight ? "max-w-2xl" : ""}`}>{tile.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── S5: PORTFOLIO SHOWCASE (ausgeblendet – ersetzt durch Zielgruppen-Showcase) ── */}
        {/* <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("portfolio.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
                {t("portfolio.title")}
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-lg max-w-xl mx-auto">
                {t("portfolio.desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-default"
                >
                  <img
                    src={PORTFOLIO_IMGS[i]}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-cyan-brand/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                      {item.label}
                    </span>
                    <p className="text-white font-bold text-base">{item.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.button
                onClick={() => { window.location.href = lp("/kontakt"); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base shadow-lg"
              >
                {t("portfolio.cta")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section> */}

        {/* ── S6: FÜR ALLE BRANCHEN ─────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("branchen.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {t("branchen.title")}
              </h2>
              <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("branchen.desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {branchenItems.map((label, i) => {
                const Icon = BRANCHEN_ICONS[i];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="flex flex-col items-center justify-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6 text-center cursor-default hover:bg-white/[0.1] transition-colors"
                  >
                    {Icon && <Icon className="w-8 h-8 text-cyan-brand" />}
                    <span className="text-white font-semibold text-sm">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── S7: WIE ES FUNKTIONIERT ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("process.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
                {t("process.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="text-[120px] font-black leading-none text-[#0A264A]/[0.05] dark:text-white/[0.05] select-none mb-4 -mt-6">{step.num}</div>
                  <h3 className="text-[#0A264A] dark:text-white font-bold text-xl mb-3 -mt-6">{step.title}</h3>
                  <p className="text-[#0A264A]/55 dark:text-white/50 text-base leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S8: PREISE ────────────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("pricing.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {t("pricing.title")}
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                {t("pricing.desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Karte 1 – Monatliches Abo (Beliebt) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="relative bg-white rounded-3xl p-8 flex flex-col shadow-2xl shadow-black/20 border-2 border-[#ED8400]/40"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#ED8400] text-white text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                    {t("pricing.abo.popular")}
                  </span>
                </div>
                <p className="text-[#0A264A]/50 text-xs font-bold uppercase tracking-widest mb-3">{t("pricing.abo.label")}</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-[#0A264A]">{t("pricing.abo.price")}</span>
                  <span className="text-[#0A264A]/50 text-base font-medium ml-2">{t("pricing.abo.per")}</span>
                </div>
                <p className="text-[#0A264A]/40 text-xs mb-7">{t("pricing.abo.note")}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {aboFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[#0A264A]/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px 6px rgba(237,132,0,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#ED8400] text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  {t("pricing.abo.cta")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Karte 2 – Simple Website Einmalkauf */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.07] border border-white/[0.12] rounded-3xl p-8 flex flex-col"
              >
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">{t("pricing.simple.label")}</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">{t("pricing.simple.price")}</span>
                </div>
                <p className="text-white/35 text-xs mb-2">{t("pricing.simple.note")}</p>
                <p className="text-[#ED8400]/80 text-xs font-semibold mb-7">{t("pricing.simple.raten")}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {t("pricing.simple.desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {simpleFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                >
                  {t("pricing.simple.cta")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Karte 3 – Individuelle Website */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-white/[0.07] border border-white/[0.12] rounded-3xl p-8 flex flex-col"
              >
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">{t("pricing.individual.label")}</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">{t("pricing.individual.price")}</span>
                </div>
                <p className="text-white/35 text-xs mb-7">{t("pricing.individual.note")}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {t("pricing.individual.desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {individualFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                >
                  {t("pricing.individual.cta")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S9: TESTIMONIALS ──────────────────────────────────────────────── */}
        <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("testimonials.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight" dangerouslySetInnerHTML={{ __html: t("testimonials.title") }} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              {testimonialItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-7"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#ED8400] text-[#ED8400]" />)}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-5">&bdquo;{item.quote}&ldquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-brand/20 flex items-center justify-center text-cyan-brand font-bold text-sm flex-shrink-0">{item.initials}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.name}</p>
                      <p className="text-white/45 text-xs">{item.restaurant}</p>
                    </div>
                    {TESTIMONIAL_LOGOS[i] && <img src={TESTIMONIAL_LOGOS[i]} alt={item.restaurant} className="h-7 object-contain ml-auto opacity-60" />}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {testimonialStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 text-center"
                >
                  <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-white/40 text-xs leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S10: FAQ ──────────────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-32"
              >
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("faq.badge")}</span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  {t("faq.title")}
                </h2>
                <p className="text-white/45 text-base leading-relaxed">
                  {t("faq.desc")}
                </p>
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/15 transition-colors"
                >
                  {t("faq.cta")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {faqItems.map(item => (
                  <FaqItem key={item.q} q={item.q} a={item.a} lp={lp} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S11: TEAM CTA ─────────────────────────────────────────────────── */}
        <TeamCTA />

        {/* ── S11b: MOBILE CTA SECTION ──────────────────────────────────────── */}
        <CTASection {...getCTAConfig("/produkte/webseite")} />

      </div>
      <Footer />
    </>
  );
};

export default WebseitePage;
