import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, ExternalLink,
  Clock, ShoppingCart, Users,
} from "lucide-react";
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

import imgKasse       from "@/assets/loesungen/Loesung - Kasse.png";
import imgWebshop     from "@/assets/loesungen/Loesung - Webshop.png";
import imgWebseite    from "@/assets/loesungen/Loesung - Webpage.png";
import imgApp         from "@/assets/loesungen/Loesung - Bestell-App.png";
import imgTransaktion from "@/assets/loesungen/Loesung - Zahlungsgebühren.png";

/* ─── Static maps ────────────────────────────────────────── */
const smallImages = [imgWebshop, imgWebseite, imgApp, imgTransaktion];
const smallHrefs  = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/webseite", "/produkte/pakete/bestell-app", "/produkte/add-ons/transaktionsumlage"];

const PROBLEM_ICONS = [
  <Clock className="w-6 h-6" />,
  <ShoppingCart className="w-6 h-6" />,
  <Users className="w-6 h-6" />,
];

/* ─── Page ───────────────────────────────────────────────── */

const CafeBaeckereiPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, ready } = useTranslation("cafe-baeckerei");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  // ─── Data from i18n ──────────────────────────────────────
  const trustPills = arr("hero.trustPills") as string[];
  const statsItems = arr("stats.items") as { value: string; label: string; source: string; href: string }[];
  const problemItems = arr("problem.items") as { title: string; desc: string }[];
  const featuredFeatures = arr("products.featured.features") as string[];
  const smallCards = arr("products.smallCards") as { title: string; tagline: string; features: string[] }[];
  const compareRows = arr("compare.rows") as { label: string; gm: string; gmGood: boolean; other: string; otherBad: boolean }[];
  const processSteps = arr("process.steps") as { num: string; title: string; desc: string }[];
  const trustItems = arr("trust.items") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const ctaTrustItems = arr("cta.trustItems") as string[];
  const breadcrumbs = arr("schema.breadcrumbs") as { name: string; item: string }[];

  // ─── SEO ─────────────────────────────────────────────────
  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  if (!ready) return null;

  // ─── Schema ──────────────────────────────────────────────
  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: plainText(a) },
    })),
  };

  const SCHEMA_ARTICLE = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("schema.articleHeadline"),
    description: t("schema.articleDescription"),
    url: t("schema.articleUrl"),
    publisher: { "@type": "Organization", name: "Gastro Master", url: "https://gastro-master.de" },
    datePublished: "2026-01-01",
    dateModified: "2026-03-29",
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

  return (
    <div className="min-h-screen bg-[#0A264A]">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] min-h-screen flex items-center px-5 md:px-8 lg:px-16 pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-brand/6 blur-[140px] pointer-events-none" />
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
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-8"
          >
            {t("hero.h1_1")}{" "}
            <span className="text-gradient-brand">{t("hero.h1_highlight")}</span>
            <br />{t("hero.h1_2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-10 p-4 rounded-xl border border-white/10 bg-white/5 text-left"
          >
            <p className="text-white/40 text-xs leading-relaxed">
              <span className="text-white/60 font-semibold">{t("hero.geoTitle")}</span>{" "}
              {t("hero.geoText")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-10 md:py-5 rounded-xl text-base md:text-lg inline-flex items-center justify-center gap-2 md:gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20 whitespace-nowrap"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#produkte"
              className="px-8 py-5 rounded-xl text-lg font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all text-center"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {trustPills.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white/60 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S2: STATS ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("stats.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              {t("stats.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statsItems.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 flex flex-col gap-3 ${
                  i === 0
                    ? "bg-[#0A264A] text-white"
                    : i === 3
                    ? "bg-[#0A264A]/5 dark:bg-white/5 border-2 border-cyan-brand/40"
                    : "bg-white dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10"
                }`}
              >
                <p
                  className={`text-3xl font-black ${
                    i === 0
                      ? "text-white"
                      : i === 3
                      ? "text-cyan-brand"
                      : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-sm leading-snug ${
                    i === 0 ? "text-white/70" : "text-[#0A264A]/60 dark:text-white/60"
                  }`}
                >
                  {s.label}
                </p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs flex items-center gap-1 mt-auto transition-colors ${
                    i === 0
                      ? "text-white/40 hover:text-white/70"
                      : "text-[#0A264A]/30 dark:text-white/30 hover:text-[#0A264A]/60 dark:hover:text-white/60"
                  }`}
                >
                  {s.source} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={lp("/kontakt")} className="text-cyan-brand font-semibold hover:underline text-sm">
              {t("stats.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEM ──────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              {t("problem.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("problem.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              {t("problem.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemItems.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-white/5 border border-amber-200 dark:border-amber-500/20 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  {PROBLEM_ICONS[i]}
                </div>
                <h3 className="font-bold text-[#0A264A] dark:text-white text-lg mb-2">{p.title}</h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKTE ─────────────────────────────────────────── */}
      <section id="produkte" className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("products.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              {t("products.title")}
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </div>

          {/* Featured Card: Kassensystem */}
          <div className="rounded-2xl overflow-hidden bg-white/8 border border-white/10 mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgKasse}
                  alt={t("products.featured.imgAlt")}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-brand text-[#0A264A] text-xs font-black uppercase tracking-wider">
                    {t("products.featured.badgeRecommended")}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                    {t("products.featured.badgePrice")}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{t("products.featured.title")}</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-5">
                  {t("products.featured.text")}
                </p>
                <ul className="space-y-2 mb-8">
                  {featuredFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/65 text-sm">
                      <span className="text-cyan-brand shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={lp("/produkte/pakete/kassensystem")}
                  className="inline-flex items-center gap-2 text-cyan-brand font-semibold hover:gap-3 transition-all text-sm"
                >
                  {t("products.featured.cta")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs text-center mb-5">
            {t("products.allBranded")}
          </p>

          {/* SmallProductCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smallCards.map((card, i) => (
              <Link
                key={i}
                to={lp(smallHrefs[i])}
                className="group relative rounded-2xl overflow-hidden bg-white/8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-white dark:bg-black">
                  <img
                    src={smallImages[i]}
                    alt={card.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-base mb-1">{card.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed flex-1">{card.tagline}</p>
                  {card.features && (
                    <ul className="mt-3 space-y-1.5">
                      {card.features.map((f) => (
                        <li key={f} className="text-white/55 text-xs flex items-start gap-1.5">
                          <span className="text-cyan-brand shrink-0 mt-px">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-1.5 mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("products.moreLink")} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("products.ctaPrimary")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: VERGLEICH ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0A264A]/10 dark:bg-white/10 text-[#0A264A] dark:text-white text-xs font-bold uppercase tracking-widest mb-4">
              {t("compare.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("compare.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              {t("compare.subtitle")}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#0A264A]/10 dark:border-white/10">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0A264A] text-white">
              <div className="py-4 px-5 text-sm font-semibold text-white/50">{t("compare.headerCriterion")}</div>
              <div className="py-4 px-5 text-sm font-bold text-center border-x border-white/10">
                <span className="text-cyan-brand">{t("compare.headerGM")}</span>
              </div>
              <div className="py-4 px-5 text-sm font-semibold text-center text-white/50">
                {t("compare.headerOther")}
              </div>
            </div>
            {/* Rows */}
            {compareRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-[#0A264A]/8 dark:border-white/8 ${
                  i % 2 === 0 ? "bg-white dark:bg-white/3" : "bg-[#f8fafc] dark:bg-white/2"
                }`}
              >
                <div className="py-4 px-5 text-sm font-medium text-[#0A264A] dark:text-white">
                  {row.label}
                </div>
                <div
                  className={`py-4 px-5 text-sm text-center font-semibold border-x border-[#0A264A]/8 dark:border-white/8 ${
                    row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {row.gm}
                </div>
                <div
                  className={`py-4 px-5 text-sm text-center ${
                    row.otherBad ? "text-red-500 dark:text-red-400" : "text-[#0A264A]/60 dark:text-white/60"
                  }`}
                >
                  {row.other}
                </div>
              </div>
            ))}
          </div>

          {/* CTA after compare */}
          <div className="mt-8 p-6 rounded-2xl bg-[#0A264A] text-white flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-white/75 text-sm leading-relaxed md:max-w-sm">
              {t("compare.ctaText")}
            </p>
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              {t("compare.ctaButton")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6: PROZESS ─────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              {t("process.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("process.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A264A] text-white flex items-center justify-center font-black text-lg mb-4">
                  {s.num}
                </div>
                <h3 className="font-bold text-[#0A264A] dark:text-white text-lg mb-2">{s.title}</h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 text-[#0A264A]/20 dark:text-white/20 text-xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: TRUST-STRIP ──────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white mb-1">{item.value}</p>
                <p className="text-white/50 text-xs leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S8: EPIT PAY TEASER ──────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-[#0A264A] p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  {t("epitPay.badge")}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                {t("epitPay.title")}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {t("epitPay.text")}
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-6 py-3 rounded-xl border border-white/20 text-white/40 text-sm font-semibold cursor-default select-none">
                {t("epitPay.cta")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── S9: FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0A264A]/10 dark:bg-white/10 text-[#0A264A] dark:text-white text-xs font-bold uppercase tracking-widest mb-4">
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("faq.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-xl mx-auto">
              {t("faq.subtitle")}
            </p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#0A264A]/10 dark:border-white/10 bg-[#f8fafc] dark:bg-white/5 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-[#0A264A] dark:text-white text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0A264A]/40 dark:text-white/40 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-6 pb-5 text-[#0A264A]/60 dark:text-white/60 text-sm leading-relaxed">
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

      {/* ── S10: CTA ABSCHLUSS ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8">
            {t("cta.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            {t("cta.title").split("\n").map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h2>
          <p className="text-xl text-white/55 max-w-xl mx-auto leading-relaxed mb-10">
            {t("cta.subtitle")}
          </p>
          <Link
            to={lp("/kontakt")}
            className="bg-gradient-amber text-[#0A264A] font-bold px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20 mb-10"
          >
            {t("cta.button")}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm">
            {ctaTrustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CafeBaeckereiPage;
