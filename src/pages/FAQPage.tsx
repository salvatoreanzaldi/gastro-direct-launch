import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useLangPath } from "@/components/LanguageLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Truck, Store, UtensilsCrossed, Coffee, Building2,
  Monitor, ShoppingCart, Printer, ChevronDown, ArrowRight, Search, X, Phone, Mail, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

/* ─── Types ──────────────────────────────────────────────── */

interface FAQItem { id: string; q: string; a: string; source?: string; sourceHref?: string; }
interface FAQCategoryData { id: string; label: string; items: FAQItem[]; }
interface FAQCategory extends FAQCategoryData { Icon: React.ElementType; }

/* ─── Icon Map ───────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ElementType> = {
  "allgemein": HelpCircle,
  "lieferdienst-gruenden": Truck,
  "lieferdienst-erweitern": Store,
  "restaurant-kassensystem": UtensilsCrossed,
  "cafe-baeckerei": Coffee,
  "franchise": Building2,
  "produkte-technik": Monitor,
  "bestellung-betrieb": ShoppingCart,
  "bondrucker-hardware": Printer,
  "zahlen-trends": TrendingUp,
};

/* ─── Page ───────────────────────────────────────────────── */

const FAQPage = () => {
  const { t } = useTranslation("faq");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/faq",
  });

  /* ─── Helpers (lp-aware) ────────────────────────────────── */

  function renderWithLinks(text: string): React.ReactNode {
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

  const plainText = (txt: string) => txt.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  /* ─── Build categories from JSON ────────────────────────── */

  const categories: FAQCategory[] = useMemo(() => {
    const raw = arr("categories") as FAQCategoryData[];
    return raw.map(cat => ({
      ...cat,
      Icon: ICON_MAP[cat.id] || HelpCircle,
    }));
  }, [t]);

  /* ─── Schema ─────────────────────────────────────────────── */

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t("schema.breadcrumb.home"), "item": "https://gastro-master.de/" },
      { "@type": "ListItem", "position": 2, "name": t("schema.breadcrumb.faq"), "item": "https://gastro-master.de/faq" },
    ],
  };

  const SCHEMA_ORGANIZATION = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t("schema.org.name"),
    "url": "https://gastro-master.de",
    "telephone": "+49-6081-9128913",
    "email": "info@gastro-master.de",
    "areaServed": "DE",
    "sameAs": [
      "https://www.instagram.com/gastromasterde",
      "https://www.facebook.com/gastromasterde",
      "https://www.youtube.com/@Gastro-Master",
    ],
  };

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.flatMap(cat =>
      cat.items.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": plainText(item.a) },
      }))
    ),
  };

  /* ─── Logic ──────────────────────────────────────────────── */

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const results: { cat: FAQCategory; item: FAQItem }[] = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        if (plainText(item.q).toLowerCase().includes(q) || plainText(item.a).toLowerCase().includes(q)) {
          results.push({ cat, item });
        }
      }
    }
    return results;
  }, [searchQuery, categories]);

  const totalCount = categories.reduce((acc, c) => acc + c.items.length, 0);

  /* ─── Trust bar ──────────────────────────────────────────── */

  const trustItems = arr("trustBar") as { value: string; label: string }[];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORGANIZATION) }} />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.10), transparent 70%)" }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-white/35 text-xs mb-6">
            <Link to={lp("/")} className="hover:text-white/60 transition-colors">{t("breadcrumb.home")}</Link>
            <span>›</span>
            <span className="text-white/55">{t("breadcrumb.faq")}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              {t("hero.badge", { count: totalCount, catCount: categories.length })}
            </div>
            <p className="text-white/35 text-xs mb-4">{t("hero.lastUpdate")}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-4">
              {t("hero.title1")}<br />
              <span className="text-gradient-brand">{t("hero.title2")}</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              {t("hero.subtitle")}
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t("hero.searchPlaceholder")}
                className="w-full bg-white/10 border border-white/15 text-white placeholder-white/35 rounded-xl pl-12 pr-12 py-4 text-base focus:outline-none focus:border-cyan-brand/50 focus:bg-white/15 transition-all duration-200"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category quick-jump */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto">
              {categories.map(cat => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white/8 border border-white/12 text-white/60 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-200 justify-center"
                >
                  <cat.Icon className="w-3 h-3 shrink-0" />
                  {cat.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST-BAR ────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10 border-b border-white/[0.06]">
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

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <div className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">

          {/* Search Results */}
          {filteredResults !== null ? (
            <div>
              <p className="text-[#0A264A]/50 dark:text-white/40 text-sm mb-6">
                {filteredResults.length === 0
                  ? t("search.noResults", { query: searchQuery })
                  : t(filteredResults.length !== 1 ? "search.resultsPlural" : "search.results", { count: filteredResults.length, query: searchQuery })}
              </p>
              {filteredResults.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[#0A264A]/40 dark:text-white/35 text-base mb-4">{t("search.noMatch")}</p>
                  <Link to={lp("/kontakt")} className="inline-flex items-center gap-2 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-transform">
                    {t("search.askDirectly")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.map(({ cat, item }) => (
                    <FAQItemCard key={item.id} item={item} isOpen={openItems.has(item.id)} onToggle={() => toggleItem(item.id)} categoryLabel={cat.label} renderWithLinks={renderWithLinks} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Full Category View */
            <div className="space-y-16">
              {categories.map((cat, catIdx) => (
                <motion.section
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.04 }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0A264A] flex items-center justify-center flex-shrink-0">
                      <cat.Icon className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white leading-tight">
                        {cat.label}
                      </h2>
                      <span className="text-[#0A264A]/40 dark:text-white/35 text-xs">{t("search.questionsCount", { count: cat.items.length })}</span>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-2">
                    {cat.items.map(item => (
                      <FAQItemCard key={item.id} item={item} isOpen={openItems.has(item.id)} onToggle={() => toggleItem(item.id)} renderWithLinks={renderWithLinks} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              {t("cta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col items-center gap-5">
              <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link to={lp("/kontakt")} className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 shadow-lg">
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <div className="flex flex-col items-center gap-3">
                <a href="tel:+4960819128913" className="text-white/75 hover:text-[#ED8400] transition-colors text-base font-medium inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t("cta.phone")}
                </a>
                <a href="mailto:info@gastro-master.de" className="text-white/75 hover:text-[#ED8400] transition-colors text-base font-medium inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t("cta.email")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── FAQ Item Card ──────────────────────────────────────── */

interface FAQItemCardProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  categoryLabel?: string;
  renderWithLinks: (text: string) => React.ReactNode;
}

const FAQItemCard = ({ item, isOpen, onToggle, categoryLabel, renderWithLinks }: FAQItemCardProps) => (
  <div className="rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] overflow-hidden">
    {categoryLabel && (
      <div className="px-6 pt-4 pb-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A264A]/35 dark:text-white/30">{categoryLabel}</span>
      </div>
    )}
    <h3 className="text-base">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-[#0A264A] dark:text-white text-base leading-snug">
          {item.q}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#0A264A]/35 dark:text-white/35 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-6 pb-5">
            <p className="text-[#0A264A]/60 dark:text-white/55 text-sm leading-relaxed">
              {renderWithLinks(item.a)}
            </p>
            {item.source && (
              <p className="mt-2 text-[#94A3B8] text-[11px] italic">
                {t("common:sourceLabel")}:{" "}
                {item.sourceHref ? (
                  <a
                    href={item.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-cyan-brand transition-colors"
                  >
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default FAQPage;
