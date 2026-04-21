import React, { useState, useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Star,
  UtensilsCrossed, Coffee, Truck, Store, Building2,
  ShoppingCart, Smartphone, Globe, Monitor, Percent,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TargetGroupSection from "@/components/landing/TargetGroupSection";

/* ─── Helpers ────────────────────────────────────────────── */

function renderWithLinks(text: string, lp: (p: string) => string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link key={key++} to={lp(match[2])} className="text-cyan-brand hover:underline font-medium">
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/* ─── Static maps (icons + hrefs — not translatable) ─────── */

const SOLUTION_ICONS = [UtensilsCrossed, Coffee, Truck, Store, Building2];
const SOLUTION_HREFS = [
  "/loesungen/restaurant",
  "/loesungen/cafe-baeckerei",
  "/loesungen/lieferservice-gruenden",
  "/loesungen/lieferdienst",
  "/loesungen/franchise",
];

const PRODUCT_ICONS = [Monitor, ShoppingCart, Smartphone, Globe, Percent];
const PRODUCT_HREFS = [
  "/produkte/pakete/kassensystem",
  "/produkte/pakete/online-bestellshop",
  "/produkte/pakete/bestell-app",
  "/produkte/pakete/webseite",
  "/produkte/add-ons/transaktionsumlage",
];

const TARGET_GROUP_HREFS: Record<string, string> = {
  lieferdienst: "/loesungen/lieferdienst",
  franchise: "/loesungen/franchise",
  ghost: "/loesungen/lieferservice-gruenden",
  einzelhandel: "/loesungen/restaurant",
  baeckerei: "/loesungen/cafe-baeckerei",
  pizzeria: "/loesungen/lieferdienst",
  asiatisch: "/loesungen/lieferdienst",
  indisch: "/loesungen/lieferdienst",
  burger: "/loesungen/lieferdienst",
  eis: "/loesungen/cafe-baeckerei",
  "baeckerei-sub": "/loesungen/cafe-baeckerei",
  "franchise-sub": "/loesungen/franchise",
};

/* ─── Page ───────────────────────────────────────────────── */

const LoesungenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, ready } = useTranslation("loesungen");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  /* ─── Data from i18n ─────────────────────────────────────── */
  const solutionItems = arr("solutions.items") as { label: string; problem: string; tagline: string }[];
  const productItems = arr("products.items") as { name: string; tagline: string }[];
  const trustItems = arr("trust.items") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];

  /* ─── Schema ─────────────────────────────────────────────── */
  const SCHEMA_FAQ = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question", name: q,
      acceptedAnswer: { "@type": "Answer", text: plainText(a) },
    })),
  }), [faqItems]);

  const SCHEMA_ARTICLE = useMemo(() => ({
    "@context": "https://schema.org", "@type": "Article",
    headline: t("schema.articleHeadline"),
    description: t("schema.articleDescription"),
    url: t("schema.articleUrl"),
    publisher: { "@type": "Organization", name: "Gastro Master", url: "https://gastro-master.de" },
    datePublished: t("schema.datePublished"),
    dateModified: t("schema.dateModified"),
  }), [t]);

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  if (!ready || faqItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────────── */}
      <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-cyan-brand" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6">
              {t("hero.h1Before")}{" "}
              <span className="text-gradient-brand">{t("hero.h1Highlight")}</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
              {t("hero.subtitle")}
            </p>

            {/* GEO Definition Block */}
            <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-white/10 bg-white/5 text-left">
              <p className="text-white/40 text-xs leading-relaxed">
                <span className="text-white/60 font-semibold">Gastro Master</span>{" "}
                {t("hero.geoBlock")}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to={lp("/kontakt")}
                className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <p className="text-white/40 text-sm mt-5">
              {t("hero.trustLine")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: TARGET GROUP SECTION ─────────────────────────────── */}
      <TargetGroupSection
        getSolutionHref={(group, sub) => {
          const raw = TARGET_GROUP_HREFS[sub ?? group];
          return raw ? lp(raw) : null;
        }}
        ctaLabel={t("targetGroup.ctaLabel")}
      />

      {/* ── S3: LÖSUNGS-CARDS ────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
              {t("solutions.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("solutions.title")}
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/45 text-base max-w-xl mx-auto">
              {t("solutions.subtitle")}
            </p>
          </motion.div>

          {/* SEO/GEO text */}
          <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl border border-[#0A264A]/[0.07] dark:border-white/[0.07] bg-[#f8fafc] dark:bg-white/[0.03] text-left">
            <p className="text-[#0A264A]/50 dark:text-white/40 text-xs leading-relaxed">
              {t("solutions.geoBlock")}
            </p>
          </div>

          {/* 3+2 grid — 5 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {solutionItems.map((s, i) => {
              const Icon = SOLUTION_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group rounded-2xl bg-[#0A264A]/[0.03] dark:bg-white/[0.04] border border-[#0A264A]/[0.08] dark:border-white/[0.07] hover:border-cyan-brand/30 hover:bg-[#0A264A]/[0.05] dark:hover:bg-white/[0.07] transition-all duration-300 p-7 flex flex-col lg:col-span-2 ${
                    i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-brand/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6 text-cyan-brand" />}
                    </div>
                    <span className="text-xs font-bold text-[#0A264A]/40 dark:text-white/35 uppercase tracking-widest">
                      {s.label}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white leading-snug mb-3 flex-1">
                    {s.problem}
                  </h3>
                  <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-6">
                    {s.tagline}
                  </p>

                  <Link
                    to={lp(SOLUTION_HREFS[i])}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform w-full md:w-auto self-start"
                  >
                    {t("solutions.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKT-SCHNELLÜBERSICHT ─────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">
              {t("products.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              {t("products.title")}
            </h2>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              {t("products.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productItems.map((p, i) => {
              const Icon = PRODUCT_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={lp(PRODUCT_HREFS[i])}
                    className="group block rounded-2xl bg-white/[0.06] border border-white/[0.09] hover:border-cyan-brand/30 hover:bg-white/[0.09] transition-all duration-300 p-5 text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-brand/15 flex items-center justify-center mx-auto mb-3">
                      {Icon && <Icon className="w-5 h-5 text-cyan-brand" />}
                    </div>
                    <h3 className="font-black text-white text-sm mb-1">{p.name}</h3>
                    <p className="text-white/45 text-xs leading-snug">{p.tagline}</p>
                    <div className="mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 justify-center">
                      {t("products.moreLabel")} <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to={lp("/produkte")} className="text-cyan-brand font-semibold hover:underline text-sm">
              {t("products.allProductsLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: IMPULS-CTA ───────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              {t("impulse.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
              {t("impulse.title")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {t("impulse.subtitle")}
            </p>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to={lp("/kontakt")}
                className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/20"
              >
                {t("impulse.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S6: TRUST-STRIP ──────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10 border-y border-white/[0.06]">
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

      {/* ── S7: FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              {t("faq.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-base max-w-xl mx-auto">
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
                  <span className="font-bold text-[#0A264A] dark:text-white text-base">
                    {item.q}
                  </span>
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

      <Footer />
    </div>
  );
};

export default LoesungenPage;
