import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, Star, ChevronDown, CheckCircle2,
  Printer, Truck, QrCode, Monitor, Hand,
  Zap, Plus, Layers, Puzzle, Sparkles,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { buildOrgGraph } from "@/data/schemaOrg";
import { ADD_ONS, buildAddOnProductNode, buildAddOnsCatalogNode } from "@/data/addOns";

const ADDON_HUB_GRAPH = buildOrgGraph([
  ...ADD_ONS.map(buildAddOnProductNode),
  buildAddOnsCatalogNode(),
]);

import imgQrFlyer       from "@/assets/mockups/Mock Up - Flyer.png";
import imgFahrerApp     from "@/assets/addons/addon-frankfurt-gps.png";
import imgQrTisch       from "@/assets/addons/addon-qr-tischsystem.png";
import imgBildschirm    from "@/assets/addons/pickup-screen.jpeg";
import imgKiosk         from "@/assets/addons/selfordering-terminals.png";

// Static fields that don't need translation
const ADDON_STATIC = [
  { icon: Printer, href: "/produkte/add-ons/qr-code-flyer",       image: imgQrFlyer,    imageBg: "bg-[#0A264A]",  imageFit: "object-contain p-6",         accentColor: "from-amber-400/20 to-cyan-brand/10" },
  { icon: Truck,   href: "/produkte/add-ons/fahrer-app-gps",      image: imgFahrerApp,  imageBg: "bg-white",       imageFit: "object-contain p-3 scale-105", accentColor: "from-cyan-brand/20 to-emerald-400/10" },
  { icon: QrCode,  href: "/produkte/add-ons/qr-code-tischsystem", image: imgQrTisch,    imageBg: "bg-[#0A264A]",  imageFit: "object-cover",                accentColor: "from-cyan-brand/20 to-purple-400/10" },
  { icon: Monitor, href: "/produkte/add-ons/bildschirmfunktion",   image: imgBildschirm, imageBg: "bg-[#0A264A]",  imageFit: "object-cover",                accentColor: "from-emerald-400/20 to-cyan-brand/10" },
  { icon: Hand,    href: "/produkte/add-ons/kiosk",                image: imgKiosk,      imageBg: "bg-[#0A264A]",  imageFit: "object-contain p-4",          accentColor: "from-amber-400/20 to-cyan-brand/10" },
];

const VALUE_ICONS = [Puzzle, Layers, Sparkles];

// ─── Schema ─────────────────────────────────────────────────────────────────
const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Add-Ons", item: "https://gastro-master.de/produkte/add-ons" },
  ],
};

// ─── renderFaqLinks ──────────────────────────────────────────────────────────
const renderFaqLinks = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const [, anchor, href] = match;
      return (
        <Link key={i} to={href} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">
          {anchor}
        </Link>
      );
    }
    return part;
  });
};

// ─── AddOn Card ──────────────────────────────────────────────────────────────
type AddOnTranslated = {
  badge: string; title: string; price: string; desc: string;
  benefits: string[]; compatibility: string;
};

const AddOnCard = ({
  translated, icon: Icon, href, image, imageBg, imageFit, accentColor, delay, combinedWithLabel, detailsLabel,
}: {
  translated: AddOnTranslated;
  icon: React.ComponentType<{ className?: string }>;
  href: string; image: string; imageBg: string; imageFit: string; accentColor: string;
  delay: number; combinedWithLabel: string; detailsLabel: string;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="group relative rounded-3xl bg-card border border-border hover:border-cyan-brand/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
  >
    <Link to={href} className={`relative aspect-[16/10] ${imageBg} overflow-hidden block`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-60 pointer-events-none`} />
      <img src={image} alt={translated.title} loading="lazy" className={`w-full h-full ${imageFit} group-hover:scale-[1.03] transition-transform duration-500`} />
      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/45 backdrop-blur text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
        <Icon className="w-3.5 h-3.5 text-cyan-brand" />
        {translated.badge}
      </div>
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0A264A]/90 backdrop-blur text-[#0A264A] dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
        {translated.price}
      </div>
    </Link>
    <div className="p-7 flex flex-col flex-1">
      <h3 className="font-black text-2xl text-foreground mb-2 leading-snug group-hover:text-cyan-brand transition-colors">{translated.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{translated.desc}</p>
      <ul className="space-y-2 mb-6">
        {translated.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
          <Plus className="w-3 h-3" />
          {combinedWithLabel} {translated.compatibility}
        </span>
        <Link to={href} className="inline-flex items-center gap-2 text-cyan-brand font-bold text-sm group-hover:gap-3 transition-all">
          {detailsLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </motion.article>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const AddOnsPage = () => {
  const { t, ready } = useTranslation("addons-hub");
  const { t: tCommon } = useTranslation("common");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const arr = <T,>(key: string): T[] => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const addons   = arr<AddOnTranslated>("addons");
  const faqItems = arr<{ q: string; a: string }>("faq.items");
  const valueItems = arr<{ title: string; desc: string }>("valueProps.items");

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/add-ons",
  });

  const SCHEMA_ITEMLIST = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("seo.title"),
    description: t("seo.description"),
    url: "https://gastro-master.de/produkte/add-ons",
    numberOfItems: ADDON_STATIC.length,
    itemListElement: ADDON_STATIC.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: addons[i]?.title ?? "",
      url: `https://gastro-master.de${a.href}`,
    })),
  };

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
    })),
  };

  const combinedWithLabel = t("grid.combinedWith");
  const detailsLabel      = t("grid.details");

  return (
    <div className={`transition-opacity duration-300 ${!ready ? "opacity-0" : "opacity-100"}`}>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ITEMLIST) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ADDON_HUB_GRAPH) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.14), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-cyan-brand" />
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6">
                {t("hero.headline")}{" "}
                <span className="text-gradient-brand">{t("hero.headlineHighlight")}</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                {t("hero.sub")}
              </p>
              <p className="text-white/40 text-base max-w-2xl mx-auto mb-10">
                {t("hero.subSuffix")}
              </p>
              <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg inline-flex items-center gap-2 shadow-lg whitespace-nowrap">
                  {tCommon("nav.cta")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── GOOGLE REVIEWS ──────────────────────────────────────────────── */}
        <GoogleReviewsGrid />

        {/* ── WERTVERSPRECHEN ─────────────────────────────────────────────── */}
        <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("valueProps.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{t("valueProps.headline")}</h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">{t("valueProps.sub")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {valueItems.map((v, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl bg-card border border-border p-7 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-cyan-brand/15 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ADD-ON GRID ─────────────────────────────────────────────────── */}
        <section className="bg-background section-padding">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("grid.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">{t("grid.headline")}</h2>
              <p className="text-muted-foreground text-base mt-3 max-w-2xl">{t("grid.sub")}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADDON_STATIC.map((s, i) => (
                addons[i] ? (
                  <AddOnCard
                    key={s.href}
                    translated={addons[i]}
                    icon={s.icon}
                    href={s.href}
                    image={s.image}
                    imageBg={s.imageBg}
                    imageFit={s.imageFit}
                    accentColor={s.accentColor}
                    delay={(i % 2) * 0.07}
                    combinedWithLabel={combinedWithLabel}
                    detailsLabel={detailsLabel}
                  />
                ) : null
              ))}
            </div>
          </div>
        </section>

        {/* ── KOMBINATIONEN ───────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] section-padding">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("combo.badge")}</span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">{t("combo.headline")}</h2>
                <p className="text-white/65 text-base leading-relaxed mb-6">{t("combo.sub")}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/produkte/pakete/kassensystem" className="inline-flex items-center justify-center gap-2 bg-white text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
                    {t("combo.btnKasse")} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/produkte" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/[0.05] transition-colors">
                    {t("combo.btnAlleProdukte")}
                  </Link>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3">
                {ADDON_STATIC.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Link key={s.href} to={s.href} className="group flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] hover:border-cyan-brand/40 rounded-xl p-4 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-cyan-brand/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-sm font-bold leading-tight truncate group-hover:text-cyan-brand transition-colors">{addons[i]?.title ?? ""}</div>
                        <div className="text-white/45 text-xs mt-0.5 truncate">{addons[i]?.compatibility ?? ""}</div>
                      </div>
                    </Link>
                  );
                })}
                <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-dashed border-white/15 rounded-xl p-4 text-white/45 text-xs">
                  <Zap className="w-4 h-4" />
                  {t("grid.moreSoon")}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="bg-background section-padding">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("faq.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{t("faq.headline")}</h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">{t("faq.sub")}</p>
            </motion.div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <h3 className="text-base">
                    <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                      <span className="font-bold text-foreground text-base leading-snug">{item.q}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {openIdx === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: "hidden" }}>
                        <div className="px-6 pb-5">
                          <p className="text-muted-foreground text-sm leading-relaxed">{renderFaqLinks(item.a)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <div className="hidden md:block"><HomeTeamCTA /></div>
        <div className="md:hidden"><CTASection {...getCTAConfig("/produkte/add-ons")} /></div>
      </div>
      <Footer />
    </div>
  );
};

export default AddOnsPage;
