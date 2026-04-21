import React, { useState, useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, ExternalLink, Monitor, ShoppingCart,
  Smartphone, Globe, Percent, Flame, Eye, Layers,
  MessageCircle, Settings, Rocket, Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

import imgWebshop     from "@/assets/loesungen/Loesung - Webshop.png";
import imgApp         from "@/assets/loesungen/Loesung - Bestell-App.png";
import imgKasse       from "@/assets/loesungen/Loesung - Kasse.png";
import imgWebseite    from "@/assets/loesungen/Loesung - Webpage.png";
import imgTransaktion from "@/assets/loesungen/Loesung - Zahlungsgebühren.png";

// ─── Static maps ────────────────────────────────────────────────────────────
const productImages = [imgWebshop, imgApp, imgKasse, imgTransaktion, imgWebseite];
const productHrefs  = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/pakete/kassensystem", "/produkte/add-ons/transaktionsumlage", "/produkte/pakete/webseite"];
const productIcons  = [<ShoppingCart className="w-4 h-4" />, <Smartphone className="w-4 h-4" />, <Monitor className="w-4 h-4" />, <Percent className="w-4 h-4" />, <Globe className="w-4 h-4" />];
const problemIcons  = [Flame, Eye, Layers];
const stepIcons     = [MessageCircle, Settings, Rocket, Headphones];

// ─── Helpers ────────────────────────────────────────────────────────────────

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
const plainText = (txt: string) => txt.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

function renderHighlight(text: string): React.ReactNode {
  const match = text.match(/^(.*)<highlight>(.*?)<\/highlight>(.*)$/);
  if (!match) return text;
  return <>{match[1]}<span className="text-amber-400">{match[2]}</span>{match[3]}</>;
}

// ─── Page ───────────────────────────────────────────────────────────────────

const GhostKitchenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useTranslation("ghost-kitchen");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  // ─── Data from i18n ─────────────────────────────────────────────────────
  const statsItems = arr("stats.items") as { value: string; label: string; source: string; href: string; isCta?: boolean }[];
  const problemItems = arr("problem.items") as { title: string; text: string }[];
  const productItems = arr("products.items") as { title: string; tagline: string }[];
  const conceptCards = arr("concept.cards") as { title: string; text: string }[];
  const conceptRows = arr("concept.compareRows") as { label: string; restaurant: string; lieferdienst: string; ghost: string }[];
  const compareRows = arr("comparison.rows") as { label: string; gm: string; gmGood: boolean; platform: string; platformBad: boolean }[];
  const onboardingSteps = arr("onboarding.steps") as { num: string; title: string; text: string }[];
  const trustItems = arr("trust.items") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const ctaTrustItems = arr("cta.trustItems") as string[][];

  // ─── Schema ─────────────────────────────────────────────────────────────
  const SCHEMA_FAQ = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: plainText(a) } })),
  }), [faqItems]);

  const SCHEMA_BREADCRUMB = useMemo(() => ({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("schema.breadcrumbHome"), item: "https://gastro-master.de/" },
      { "@type": "ListItem", position: 2, name: t("schema.breadcrumbParent"), item: "https://gastro-master.de/loesungen" },
      { "@type": "ListItem", position: 3, name: t("schema.breadcrumbCurrent"), item: "https://gastro-master.de/loesungen/ghost-kitchen" },
    ],
  }), [t]);

  const SCHEMA_HOWTO = useMemo(() => ({
    "@context": "https://schema.org", "@type": "HowTo",
    name: t("schema.howToName"),
    description: t("schema.howToDescription"),
    step: onboardingSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  }), [t, onboardingSteps]);

  if (faqItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-36 pb-24 px-5 md:px-8 lg:px-16">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-white/35 text-sm font-medium mb-5">
            {t("hero.breadcrumbParent")} <span className="text-white/20 mx-2">→</span> <span className="text-cyan-brand">{t("hero.breadcrumbCurrent")}</span>
          </p>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6">
            {t("hero.badge")}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
            {t("hero.h1Line1")}{" "}<span className="text-gradient-brand">{t("hero.h1Highlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
            {t("hero.subtitle")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8">
            <Link to={lp("/kontakt")} className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              {t("hero.cta")} <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#produkte" className="text-white/50 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white/70 transition-colors">{t("hero.ctaSecondary")}</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-3">
            {(arr("hero.trustPills") as string[]).map(pill => (
              <span key={pill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.10] text-white/65 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand flex-shrink-0" />{pill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S2: MARKET STATS ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">{t("stats.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">{t("stats.title")}</h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg">{t("stats.subtitle")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {statsItems.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl p-6 border ${i === 0 ? "bg-[#0A264A] border-transparent" : stat.isCta ? "border-2 border-cyan-brand bg-cyan-brand/5" : "bg-white dark:bg-white/[0.04] border-[#0A264A]/[0.08] dark:border-white/[0.08]"}`}>
                <p className={`text-3xl md:text-4xl font-black tracking-tight leading-none mb-2 ${i === 0 ? "text-cyan-brand" : stat.isCta ? "text-cyan-brand" : "text-[#0A264A] dark:text-white"}`}>{stat.value}</p>
                <p className={`text-sm leading-snug mb-4 ${i === 0 ? "text-white/55" : "text-[#0A264A]/50 dark:text-white/50"}`}>{stat.label}</p>
                <a href={stat.isCta ? lp(stat.href) : stat.href} target={stat.isCta ? "_self" : "_blank"} rel="noopener noreferrer"
                  className={`text-[11px] underline underline-offset-2 inline-flex items-center gap-1 transition-colors ${i === 0 ? "text-white/25 hover:text-cyan-brand" : stat.isCta ? "text-cyan-brand font-semibold hover:text-cyan-brand/80" : "text-[#0A264A]/25 dark:text-white/25 hover:text-cyan-brand"}`}>
                  {stat.isCta ? <>{t("stats.ctaLabel")} <ArrowRight className="w-3 h-3" /></> : <>{stat.source} <ExternalLink className="w-2.5 h-2.5" /></>}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEMS ──────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">{t("problem.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t("problem.title")}</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">{t("problem.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemItems.map((p, i) => {
              const Icon = problemIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4"><Icon className="w-6 h-6" /></div>
                  <h3 className="font-bold text-foreground text-base mb-2">{p.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{p.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUCT SHOWCASE ──────────────────────────────────────── */}
      <section id="produkte" className="px-5 md:px-8 lg:px-16 py-20 md:py-28" style={{ backgroundColor: "#0A264A" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">{t("products.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t("products.title")}</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">{t("products.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {productItems.slice(0, 3).map((p, i) => (
              <motion.div key={productHrefs[i]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group">
                <div className="relative overflow-hidden h-48 bg-white dark:bg-black">
                  <img src={productImages[i]} alt={p.title} className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">{productIcons[i]}{p.title}</div>
                </div>
                <div className="p-5">
                  <p className="text-white/70 text-sm leading-snug mb-3">{p.tagline}</p>
                  <Link to={lp(productHrefs[i])} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">{t("products.moreLabel")} <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {productItems.slice(3).map((p, i) => (
              <motion.div key={productHrefs[3 + i]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 + i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group">
                <div className="relative overflow-hidden h-40 bg-white dark:bg-black">
                  <img src={productImages[3 + i]} alt={p.title} className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">{productIcons[3 + i]}{p.title}</div>
                </div>
                <div className="p-5">
                  <p className="text-white/70 text-sm leading-snug mb-3">{p.tagline}</p>
                  <Link to={lp(productHrefs[3 + i])} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">{t("products.moreLabel")} <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: GHOST KITCHEN ERKLÄRT ─────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">{t("concept.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-4">{t("concept.title")}</h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg max-w-2xl mx-auto">{t("concept.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {conceptCards.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] p-7 bg-[#f8fafc] dark:bg-white/[0.03]">
                <h3 className="text-lg font-bold text-[#0A264A] dark:text-white mb-3">{item.title}</h3>
                <p className="text-[#0A264A]/60 dark:text-white/50 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Concept Comparison Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h3 className="text-2xl font-black text-[#0A264A] dark:text-white text-center mb-8">{t("concept.compareTitle")}</h3>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] shadow-lg">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/45 dark:text-white/30 font-semibold text-xs uppercase tracking-wider text-left px-6 py-4 w-[25%]">{t("concept.compareHeaders.feature")}</th>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/70 dark:text-white/60 font-semibold px-6 py-4 text-center">{t("concept.compareHeaders.restaurant")}</th>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/70 dark:text-white/60 font-semibold px-6 py-4 text-center">{t("concept.compareHeaders.lieferdienst")}</th>
                  <th className="bg-[#0A264A] px-6 py-4 text-center">
                    <span className="text-cyan-brand text-[10px] font-bold uppercase tracking-widest block mb-0.5">{t("concept.compareHeaders.recommended")}</span>
                    <span className="text-white font-bold">{t("concept.compareHeaders.ghost")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {conceptRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#fafafa] dark:bg-white/[0.02]"}>
                    <td className="px-6 py-4 text-[#0A264A]/60 dark:text-white/50 font-medium border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.label}</td>
                    <td className="px-6 py-4 text-center text-[#0A264A]/55 dark:text-white/45 border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.restaurant}</td>
                    <td className="px-6 py-4 text-center text-[#0A264A]/55 dark:text-white/45 border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.lieferdienst}</td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-[#0A264A]/[0.02] dark:bg-white/[0.01]">{row.ghost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── S6: COMPARISON TABLE (GM vs Plattformen) ──────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t("comparison.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t("comparison.title")}</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">{t("comparison.subtitle")}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-lg">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[35%]">{t("comparison.headers.feature")}</th>
                  <th className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider block mb-1">{t("comparison.headers.gmRecommended")}</span>
                    <span className="font-black text-foreground text-base">{t("comparison.headers.gm")}</span>
                  </th>
                  <th className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-semibold">{t("comparison.headers.platform")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}>
                    <td className="p-4 text-foreground/70 font-medium">{row.label}</td>
                    <td className="p-4 text-center"><span className={`font-semibold ${row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>{row.gm}</span></td>
                    <td className="p-4 text-center"><span className={row.platformBad ? "text-red-500" : "text-foreground/70"}>{row.platform}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Savings Callout */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10">
            <div className="flex-1">
              <p className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                {renderHighlight(t("comparison.savingsTitle"))}
              </p>
              <p className="text-white/55 text-sm">{t("comparison.savingsSubtitle")}</p>
            </div>
            <Link to={lp("/kontakt")} className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-sm whitespace-nowrap hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              {t("comparison.savingsCta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── S7: IMPLEMENTATION STEPS ──────────────────────────────────── */}
      <section className="bg-[#0A264A] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10 bg-white/15" /><span className="text-white/35 text-xs font-bold uppercase tracking-widest">{t("onboarding.overline")}</span><div className="h-px w-10 bg-white/15" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">{t("onboarding.title")}</h2>
          <p className="text-white/50 text-lg max-w-xl mb-14">{t("onboarding.subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onboardingSteps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-2xl p-7 md:p-8 overflow-hidden ${i === 0 ? "border border-cyan-brand/30 bg-cyan-brand/[0.06]" : "border border-white/[0.08] bg-white/[0.04]"}`}>
                  <span className="absolute top-3 right-5 text-7xl font-black text-white/[0.04] leading-none select-none pointer-events-none">{step.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5"><Icon className="w-5 h-5 text-cyan-brand" /></div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="text-sm text-white/55 leading-7">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S8: TRUST STRIP ───────────────────────────────────────────── */}
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

      {/* ── S9: FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">{t("faq.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">{t("faq.title")}</h2>
            <p className="text-foreground/50 text-base">{t("faq.subtitle")}</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-background overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground text-[15px] pr-4 leading-snug">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-brand flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div key="content" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm text-foreground/65 leading-7 border-t border-border pt-4">{renderWithLinks(item.a, lp)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10: CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            {t("cta.title")} <span className="text-cyan-brand">{t("cta.titleHighlight")}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10">
            {t("cta.subtitle")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to={lp("/kontakt")} className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              {t("cta.button")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {ctaTrustItems.map(([val, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-sm">
                <span className="text-white/70 font-semibold">{val}</span>
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

export default GhostKitchenPage;
