import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Monitor,
  ShoppingCart,
  Smartphone,
  Globe,
  Percent,
  PenLine,
  TrendingDown,
  HelpCircle,
} from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

function renderWithLinks(text: string, lp: (p: string) => string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<Link key={key++} to={lp(match[2])} className="text-cyan-brand hover:underline font-medium">{match[1]}</Link>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

import imgWebshop     from "@/assets/loesungen/Loesung - Webshop.png";
import imgApp         from "@/assets/loesungen/Loesung - Bestell-App.png";
import imgKasse       from "@/assets/loesungen/Loesung - Kasse.png";
import imgWebseite    from "@/assets/loesungen/Loesung - Webpage.png";
import imgTransaktion from "@/assets/loesungen/Loesung - Zahlungsgebühren.png";
import { buildOrgGraph, SITE_URL, ORG_ID } from "@/data/schemaOrg";
import { PACKAGES } from "@/data/packages";

const LIEFERDIENST_SERVICE_NODE = {
  "@type": "Service",
  "@id": `${SITE_URL}/loesungen/lieferdienst#service`,
  serviceType: "Eigener Lieferservice für Restaurants",
  name: "Eigener Lieferservice statt Lieferando — 0 % Provision",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Deutschland" },
  url: `${SITE_URL}/loesungen/lieferdienst`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pakete für Lieferdienste",
    itemListElement: PACKAGES.filter((p) =>
      ["Starter (Bestellsystem)", "Business (App + Bestellsystem)", "Kassensystem"].includes(p.name),
    ).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: { "@id": p.id },
    })),
  },
};

// ─── Static image / icon maps (order must match JSON cards) ─────────────────
const cardImages = [imgApp, imgKasse, imgWebseite, imgTransaktion];
const cardIcons  = [<Smartphone className="w-4 h-4" />, <Monitor className="w-4 h-4" />, <Globe className="w-4 h-4" />, <Percent className="w-4 h-4" />];
const cardHrefs  = ["/produkte/pakete/bestell-app", "/produkte/pakete/kassensystem", "/produkte/pakete/webseite", "/produkte/add-ons/transaktionsumlage"];
const problemIcons = [<PenLine className="w-6 h-6" />, <TrendingDown className="w-6 h-6" />, <HelpCircle className="w-6 h-6" />];

// ─── Component ───────────────────────────────────────────────────────────────

const LieferdienstPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, ready } = useTranslation("lieferdienst");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  // ─── Schema ────────────────────────────────────────────────────────────
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
    })),
  };

  const SCHEMA_ARTICLE = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("schema.headline"),
    description: t("schema.description"),
    url: "https://gastro-master.de/loesungen/lieferdienst",
    author: { "@type": "Organization", name: "Gastro Master" },
    publisher: { "@type": "Organization", name: "Gastro Master" },
  };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/loesungen/lieferdienst",
  });

  // ─── Data from JSON ────────────────────────────────────────────────────
  const stats = arr("stats.items") as { value: string; label: string; source: string; href: string; isCta?: boolean }[];
  const problems = arr("problem.items") as { title: string; text: string }[];
  const products = arr("products.cards") as { title: string; tagline: string; features?: string[] }[];
  const compareRows = arr("compare.rows") as { label: string; gm: string; platform: string }[];
  const steps = arr("process.steps") as { num: string; title: string; text: string }[];
  const trustItems = arr("trust.items") as { value: string; label: string }[];
  const heroPills = arr("hero.pills") as string[];
  const featuredTags = arr("products.featured.tags") as string[];
  const ctaPills = arr("cta.pills") as string[];

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrgGraph([LIEFERDIENST_SERVICE_NODE])),
        }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007DCF]/10 blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6"
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-brand block mt-2">
              {t("hero.titleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t("hero.subtitle1")}
            <br className="hidden md:block" />
            {t("hero.subtitle2")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-10 md:py-5 rounded-xl text-base md:text-lg inline-flex items-center gap-2 md:gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20 whitespace-nowrap"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#bestellsystem"
              className="text-white/60 hover:text-white text-base font-medium transition-colors"
            >
              {t("hero.scrollLink")}
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {heroPills.map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-medium"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-left max-w-2xl mx-auto border border-cyan-brand/20 rounded-2xl bg-cyan-brand/5 px-7 py-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand mb-2">
              {t("hero.geoTitle")}
            </p>
            <p
              className="text-white/70 text-sm leading-relaxed [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: t("hero.geoText") }}
            />
          </motion.div>

          {/* Internal link for newcomers */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-white/35 text-xs mt-6 text-center"
          >
            {t("hero.newcomerText")}{" "}
            <Link to={lp("/loesungen/lieferservice-gruenden")} className="text-cyan-brand/70 hover:text-cyan-brand underline underline-offset-2 transition-colors">
              {t("hero.newcomerLink")}
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── S2: STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              {t("stats.title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {t("stats.text")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-6 flex flex-col gap-3 ${
                  i === 0
                    ? "bg-[#0A264A] text-white"
                    : s.isCta
                    ? "border-2 border-cyan-brand bg-cyan-brand/5"
                    : "border border-border bg-background"
                }`}
              >
                <p
                  className={`text-2xl font-black leading-tight ${
                    i === 0 ? "text-white" : s.isCta ? "text-cyan-brand" : "text-foreground"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-sm leading-snug ${
                    i === 0 ? "text-white/70" : "text-foreground/60"
                  }`}
                >
                  {s.label}
                </p>
                <a
                  href={s.isCta ? lp(s.href) : s.href}
                  target={s.isCta ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`text-xs mt-auto flex items-center gap-1 transition-colors ${
                    i === 0
                      ? "text-white/40 hover:text-white/70"
                      : s.isCta
                      ? "text-cyan-brand font-semibold hover:text-cyan-brand/80"
                      : "text-foreground/30 hover:text-foreground/60"
                  }`}
                >
                  {s.isCta ? (
                    <>{t("stats.ctaText")} <ArrowRight className="w-3 h-3" /></>
                  ) : (
                    <>{s.source} <ExternalLink className="w-3 h-3" /></>
                  )}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEM ──────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              {t("problem.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {t("problem.title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {t("problem.text")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  {problemIcons[i]}
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKTE ─────────────────────────────────────────────────── */}
      <section
        id="bestellsystem"
        className="px-5 md:px-8 lg:px-16 py-20"
        style={{ backgroundColor: "#0A264A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("products.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("products.title")}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {t("products.text")}
            </p>
          </div>

          {/* Featured: Online Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <Link
              to={lp("/produkte/pakete/online-bestellshop")}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border-2 border-cyan-brand/30 hover:border-cyan-brand/60 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0 bg-white dark:bg-black">
                <img
                  src={imgWebshop}
                  alt={t("products.featured.imgAlt")}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-brand/20 backdrop-blur-sm border border-cyan-brand/30 text-cyan-brand text-xs font-bold">
                  {t("products.featured.badge")}
                </div>
              </div>
              {/* Content */}
              <div className="p-7 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="w-5 h-5 text-cyan-brand" />
                  <span className="text-cyan-brand text-sm font-bold">{t("products.featured.category")}</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-3 leading-tight">
                  {t("products.featured.title")}
                </h3>
                <p className="text-white/65 text-base leading-relaxed mb-5">
                  {t("products.featured.text")}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredTags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-cyan-brand text-sm font-semibold group-hover:gap-3 transition-all">
                  {t("products.featured.linkText")} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 2 + 2 grid for remaining products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {products.slice(0, 2).map((p, i) => (
              <SmallProductCard key={i} product={p} index={i} lp={lp} t={t} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {products.slice(2).map((p, i) => (
              <SmallProductCard key={i} product={p} index={i + 2} lp={lp} t={t} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("products.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: VERGLEICHSTABELLE ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">
              {t("compare.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {t("compare.title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {t("compare.text")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[40%]">{t("compare.colHeader")}</th>
                  <th className="p-4 text-center w-[30%]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider">
                        {t("compare.colGmBadge")}
                      </span>
                      <span className="font-black text-foreground text-base">{t("compare.colGm")}</span>
                      <span className="text-foreground/40 text-xs font-normal">{t("compare.colGmSub")}</span>
                    </div>
                  </th>
                  <th className="p-4 text-center w-[30%]">
                    <span className="font-semibold text-foreground/60">{t("compare.colPlatform")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}
                  >
                    <td className="p-4 text-foreground/70 font-medium">{row.label}</td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {row.gm}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-red-500">
                        {row.platform}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rechenbeispiel */}
          <div className="mt-6 rounded-2xl bg-[#0A264A] p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">{t("compare.calcBadge")}</p>
              <p className="text-white font-black text-lg leading-snug mb-1">
                {t("compare.calcTitle")}{" "}
                <span className="text-red-400">{t("compare.calcHighlight")}</span> {t("compare.calcTitleEnd")}
              </p>
              <p className="text-white/60 text-sm">
                {t("compare.calcText1")} <strong className="text-emerald-400">{t("compare.calcText2")}</strong> {t("compare.calcText3")} <strong className="text-white">{t("compare.calcText4")}</strong>{t("compare.calcText5")}
              </p>
            </div>
            <Link
              to={lp("/kontakt")}
              className="shrink-0 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              {t("compare.calcCta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6: PROZESS ──────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("process.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {t("process.title")}
            </h2>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto">
              {t("process.text")}
            </p>
          </div>

          <div className="relative">
            {/* Connecting line — desktop */}
            <div className="hidden md:block absolute top-[2.25rem] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-cyan-brand/25 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-[#0A264A] border-2 border-cyan-brand/30 flex items-center justify-center mb-5 relative z-10 shrink-0">
                    <span className="text-cyan-brand font-black text-lg">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S7: TRUST-STRIP ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A264A" }} className="py-10 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-white/40 text-xs uppercase tracking-widest font-bold mb-6">
            {t("trust.headline")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustItems.map((item) => (
              <div key={item.value}>
                <p className="text-2xl md:text-3xl font-black text-white">{item.value}</p>
                <p className="text-white/50 text-xs mt-1 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S8: EPIT PAY TEASER ──────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-14">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-brand/20 bg-gradient-to-br from-[#0A264A]/60 to-[#0A264A]/30 dark:from-[#0A264A]/80 dark:to-[#061830]/60 p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white font-black text-xl tracking-tight">{t("epitPay.title")}</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-brand/20 text-cyan-brand text-[10px] font-bold uppercase tracking-widest">
                  {t("epitPay.badge")}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {t("epitPay.text")}
              </p>
            </div>
            <div className="shrink-0 w-12 h-12 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center">
              <span className="text-cyan-brand font-black text-sm">EP</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S9: FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              {t("faq.title")}
            </h2>
            <p className="text-foreground/60 text-lg">
              {t("faq.text")}
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors"
                >
                  <span className="font-semibold text-foreground text-base leading-snug">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-foreground/40"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-foreground/65 text-sm leading-relaxed border-t border-border pt-4">
                        {renderWithLinks(item.a, lp)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10: CTA-ABSCHLUSS ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 py-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 120%, hsl(196, 100%, 40%), transparent 55%)" }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            {t("cta.badge")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            {t("cta.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg leading-relaxed mb-10"
          >
            {t("cta.text1")}
            <br />
            {t("cta.text2")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-12 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-white/40 text-sm"
          >
            {ctaPills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ─── Small Product Card ───────────────────────────────────────────────────────

const SmallProductCard = ({
  product,
  index,
  lp,
  t,
}: {
  product: { title: string; tagline: string; features?: string[] };
  index: number;
  lp: (p: string) => string;
  t: (key: string) => string;
}) => (
  <Link
    to={lp(cardHrefs[index])}
    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-brand/40 transition-all duration-300 block"
  >
    <div className="relative h-44 overflow-hidden bg-white dark:bg-black">
      <img
        src={cardImages[index]}
        alt={product.title}
        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
        {cardIcons[index]}
        <span className="ml-0.5">{product.title}</span>
      </div>
    </div>
    <div className="p-4">
      <p className="text-white/70 text-sm leading-snug group-hover:text-white/90 transition-colors">
        {product.tagline}
      </p>
      {product.features && (
        <ul className="mt-3 space-y-1.5">
          {product.features.map((f) => (
            <li key={f} className="text-white/55 text-xs flex items-start gap-1.5">
              <span className="text-cyan-brand shrink-0 mt-px">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-1.5 mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        {product.features ? t("products.moreFeatures") : t("products.moreInfo")} <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </Link>
);

export default LieferdienstPage;
