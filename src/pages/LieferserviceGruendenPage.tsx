import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Building2, ClipboardList, Target, Monitor,
  ChevronDown, ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProblemSection from "@/components/landing/ProblemSection";
import imgWebshop     from "@/assets/loesungen/Loesung - Webshop.png";
import imgApp         from "@/assets/loesungen/Loesung - Bestell-App.png";
import imgKasse       from "@/assets/loesungen/Loesung - Kasse.png";
import imgWebseite    from "@/assets/loesungen/Loesung - Webpage.png";
import imgTransaktion from "@/assets/loesungen/Loesung - Zahlungsgebühren.png";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderWithLinks(text: string, lp: (p: string) => string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<Link key={key++} to={lp(match[2])} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{match[1]}</Link>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

// ─── Static maps ─────────────────────────────────────────────────────────────
const topImages = [imgWebshop, imgApp, imgKasse];
const topHrefs  = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/pakete/kassensystem"];
const bottomImages = [imgWebseite, imgTransaktion];
const bottomHrefs  = ["/produkte/pakete/webseite", "/produkte/add-ons/transaktionsumlage"];

const stepIcons: LucideIcon[] = [Monitor, Target, Building2, ClipboardList];

// ─── Page Component ──────────────────────────────────────────────────────────

const LieferserviceGruendenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useTranslation("lieferservice-gruenden");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  // ─── Data from i18n ──────────────────────────────────────────────────
  const statsItems = arr("stats.items") as { value: string; label: string; source: string; href: string }[];
  const topCards = arr("products.topCards") as { title: string; alt: string; tagline: string }[];
  const bottomCards = arr("products.bottomCards") as { title: string; alt: string; tagline: string }[];
  const compareRows = arr("compare.rows") as { label: string; own: string; ownGood: boolean; platform: string; platformBad: boolean }[];
  const stepsItems = arr("steps.items") as { num: string; title: string; text: string; highlight: string; featured?: boolean; products?: { label: string; href: string }[] }[];
  const trustItems = arr("trust.items") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const ctaTrustItems = arr("cta.trustItems") as { value: string; label: string }[];
  const trustPills = arr("hero.trustPills") as string[];

  // ─── Schema ──────────────────────────────────────────────────────────
  const howToSteps = arr("schema.howToSteps") as { name: string; text: string }[];
  const breadcrumbs = arr("schema.breadcrumbs") as { name: string; item: string }[];

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
    headline: t("schema.articleHeadline"),
    description: t("schema.articleDescription"),
    author:    { "@type": "Organization", name: "Gastro Master", url: "https://gastro-master.de" },
    publisher: { "@type": "Organization", name: "Gastro Master", url: "https://gastro-master.de" },
    datePublished: "2026-01-01",
    dateModified:  "2026-03-28",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://gastro-master.de/loesungen/lieferservice-gruenden",
    },
  };

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const SCHEMA_HOWTO = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("schema.howToName"),
    description: t("schema.howToDescription"),
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/loesungen/lieferservice-gruenden",
  });

  if (!faqItems.length) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A264A]">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-36 pb-24 px-5 md:px-8 lg:px-16">
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-white/35 text-sm font-medium mb-5">
            {t("hero.breadcrumbSolutions")}{" "}
            <span className="text-white/20 mx-2">→</span>
            <span className="text-cyan-brand">{t("hero.breadcrumbCurrent")}</span>
          </p>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6"
          >
            {t("hero.h1")}{" "}
            <span className="text-gradient-brand">{t("hero.h1Highlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
          >
            {t("hero.subline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#steps"
              className="text-white/50 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white/70 transition-colors"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.10] text-white/65 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand flex-shrink-0" />
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="border-l-2 border-cyan-brand/50 bg-white/[0.04] rounded-r-lg px-4 py-3 max-w-2xl"
          >
            <span className="text-cyan-brand/70 text-[10px] font-bold uppercase tracking-widest block mb-1">
              {t("hero.definitionLabel")}
            </span>
            <p className="text-white/45 text-xs leading-relaxed">
              {t("hero.definitionText")}{" "}
              <strong className="text-white/65 font-semibold">{t("hero.definitionHighlight")}</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: MARKTSTATISTIKEN ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("stats.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              {t("stats.title")}
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg">
              {t("stats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {statsItems.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl p-6 border ${
                  i === 0
                    ? "bg-[#0A264A] border-transparent"
                    : "bg-white dark:bg-white/[0.04] border-[#0A264A]/[0.08] dark:border-white/[0.08]"
                }`}
              >
                <p
                  className={`text-3xl md:text-4xl font-black tracking-tight leading-none mb-2 ${
                    i === 0 ? "text-cyan-brand" : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-sm leading-snug mb-4 ${
                    i === 0 ? "text-white/55" : "text-[#0A264A]/50 dark:text-white/50"
                  }`}
                >
                  {stat.label}
                </p>
                <a
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] underline underline-offset-2 inline-flex items-center gap-1 ${
                    i === 0
                      ? "text-white/25 hover:text-cyan-brand"
                      : "text-[#0A264A]/25 dark:text-white/25 hover:text-cyan-brand"
                  } transition-colors`}
                >
                  {t("stats.sourceLabel")} {stat.source}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={lp("/kontakt")}
              className="inline-flex items-center gap-2 text-[#0A264A] dark:text-white font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              {t("stats.cta")}
              <ArrowRight className="w-4 h-4 text-cyan-brand" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: PRODUKT-BUNDLE ────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("products.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              {t("products.title")}
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {t("products.subtitle")}
            </p>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {topCards.map((card, i) => (
              <motion.div
                key={topHrefs[i]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48 bg-white dark:bg-black">
                  <img src={topImages[i]} alt={card.alt} className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-white font-bold text-base mb-1">{card.title}</p>
                  <p className="text-white/55 text-xs mb-3">{card.tagline}</p>
                  <Link to={lp(topHrefs[i])} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">
                    {t("products.moreLabel")} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {bottomCards.map((card, i) => (
              <motion.div
                key={bottomHrefs[i]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24 + i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-40 bg-white dark:bg-black">
                  <img src={bottomImages[i]} alt={card.alt} className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-white font-bold text-base mb-1">{card.title}</p>
                  <p className="text-white/55 text-xs mb-3">{card.tagline}</p>
                  <Link to={lp(bottomHrefs[i])} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">
                    {t("products.moreLabel")} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={lp("/kontakt")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-base shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
            >
              {t("products.cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S4: VERGLEICHSTABELLE ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              {t("compare.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              {t("compare.title")}
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg max-w-xl mx-auto">
              {t("compare.subtitle")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] shadow-lg">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/45 dark:text-white/30 font-semibold text-xs uppercase tracking-wider text-left px-6 py-4 w-[38%]">
                    {t("compare.thCriterion")}
                  </th>
                  <th className="bg-[#0A264A] px-6 py-4 text-center">
                    <span className="text-cyan-brand text-[10px] font-bold uppercase tracking-widest block mb-0.5">
                      {t("compare.thRecommended")}
                    </span>
                    <span className="text-white font-bold text-sm">{t("compare.thOwnLabel")}</span>
                    <span className="text-white/40 text-xs font-normal block">{t("compare.thOwnSub")}</span>
                  </th>
                  <th className="bg-[#fff8f0] dark:bg-amber-950/30 px-6 py-4 text-center">
                    <span className="text-amber-800 dark:text-amber-400 font-bold text-sm">
                      {t("compare.thPlatformLabel")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#fafafa] dark:bg-white/[0.02]"}
                  >
                    <td className="px-6 py-4 text-sm text-[#0A264A]/60 dark:text-white/50 font-medium border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-center text-sm border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-[#0A264A]/[0.02] dark:bg-white/[0.01]">
                      <span className={row.ownGood ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-[#0A264A]/55 dark:text-white/45"}>
                        {row.own}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-amber-50/50 dark:bg-amber-950/10">
                      <span className={row.platformBad ? "text-red-500 font-bold" : "text-[#0A264A]/55 dark:text-white/45"}>
                        {row.platform}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10"
          >
            <div className="flex-1">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                {t("compare.savingsLabel")}
              </p>
              <p className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                {t("compare.savingsTitle")}{" "}
                <span className="text-amber-400">{t("compare.savingsHighlight")}</span>{" "}
                {t("compare.savingsTitleSuffix")}
              </p>
              <p className="text-white/55 text-sm">
                {t("compare.savingsText")}{" "}
                <Link to={lp("/preise")} className="text-cyan-brand/70 underline underline-offset-2 hover:text-cyan-brand transition-colors">
                  {t("compare.savingsLink")}
                </Link>
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <div className="md:text-right">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  {t("compare.savingsAmountLabel")}
                </p>
                <p className="text-5xl font-black text-cyan-brand leading-none">{t("compare.savingsAmount")}</p>
                <p className="text-white/35 text-xs mt-1">{t("compare.savingsAmountSub")}</p>
              </div>
              <Link
                to={lp("/kontakt")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-sm whitespace-nowrap hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
              >
                {t("compare.savingsCta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S4B: PROBLEM SECTION ────────────────────────────────────────────────── */}
      <ProblemSection />

      {/* ── S5: SCHRITT-FÜR-SCHRITT ─────────────────────────────────────────── */}
      <section id="steps" className="bg-[#0A264A] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10 bg-white/15" />
            <span className="text-white/35 text-xs font-bold uppercase tracking-widest">
              {t("steps.headerLabel")}
            </span>
            <div className="h-px w-10 bg-white/15" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            {t("steps.title")}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mb-14">
            {t("steps.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stepsItems.map((step, i) => {
              const Icon = stepIcons[i] || Monitor;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-2xl p-7 md:p-8 overflow-hidden ${
                    step.featured
                      ? "border border-cyan-brand/30 bg-cyan-brand/[0.06]"
                      : "border border-white/[0.08] bg-white/[0.04]"
                  }`}
                >
                  <span className="absolute top-3 right-5 text-7xl font-black text-white/[0.04] leading-none select-none pointer-events-none">
                    {step.num}
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-cyan-brand" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-7 mb-4">{step.text}</p>

                  <div className="rounded-xl bg-cyan-brand/[0.08] border border-cyan-brand/[0.15] px-4 py-3 text-cyan-brand text-sm font-medium">
                    {step.highlight}
                  </div>

                  {step.products && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {step.products.map((p) => (
                        <Link
                          key={p.href}
                          to={lp(p.href)}
                          className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-1.5 text-white/65 text-xs font-medium hover:border-cyan-brand hover:text-cyan-brand transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand opacity-60 flex-shrink-0" />
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] py-8 px-5 md:px-8 lg:px-16 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustItems.map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-cyan-brand font-black text-lg leading-none">{value}</span>
                <span className="text-white/40 text-sm leading-snug max-w-[120px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              {t("faq.title")}
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-base">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/[0.04] rounded-2xl border border-[#0A264A]/[0.07] dark:border-white/[0.07] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-[#0A264A] dark:text-white text-[15px] pr-4 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-brand flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-[#0A264A]/65 dark:text-white/55 leading-7 border-t border-[#0A264A]/[0.05] dark:border-white/[0.05] pt-4">
                        {renderWithLinks(item.a, lp)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: CTA-ABSCHLUSS ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }}
        />

        <div className="max-w-2xl mx-auto relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.08] text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            {t("cta.badge")}
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5"
          >
            {t("cta.title")}{" "}
            <span className="text-cyan-brand">{t("cta.titleHighlight")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10"
          >
            {t("cta.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {ctaTrustItems.map(({ value, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm">
                <span className="text-white/70 font-semibold">{value}</span>
                <span className="text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LieferserviceGruendenPage;
