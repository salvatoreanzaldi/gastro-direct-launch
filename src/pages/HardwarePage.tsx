import { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";

// ─── Assets: Kasse ────────────────────────────────────────────────────────────
import kassenhardwareImg   from "@/assets/hardware/kassenhardware.png";
import hwEloFront          from "@/assets/hardware/Hardware - Elo Front.png";
import hwEloSchraeg        from "@/assets/hardware/Hardware - Elo Schrägt.png";
import hwEloHinten         from "@/assets/hardware/Hardware - Elo Hinten.png";
import hwEloPorts          from "@/assets/hardware/Hardware - Elo Ports.png";
import hwEloSeite          from "@/assets/hardware/Hardware - Elo Seite.png";
import hwEloDblFront       from "@/assets/hardware/Hardware - Elo Double Screen Front.png";
import hwEloDblSchraeg     from "@/assets/hardware/Hardware - Elo Double Screen Schräg.png";
import hwEloDblHinten      from "@/assets/hardware/Hardware - Elo Double Screen Hinten.png";
import hwEloDblPorts       from "@/assets/hardware/Hardware - Elo Double Screen Ports.png";
import hwSurfaceFront      from "@/assets/hardware/Hardware - Microsoft Surface Tablet Front.png";
import hwSurfaceSchraeg    from "@/assets/hardware/Hardware - Microsoft Surface Tablet Schräg.png";
import hwSurfaceHinten     from "@/assets/hardware/Hardware - Microsoft Surface Tablet Hinten.png";
import hwSurfaceSeite      from "@/assets/hardware/Hardware - Microsoft Surface Tablet Seite.png";

// ─── Assets: Terminals ────────────────────────────────────────────────────────
import adyenS1F2L          from "@/assets/hardware/Adyen POS-Terminal - S1F2L.png";
import adyenS1F2LUmfang    from "@/assets/hardware/Adyen POS-Terminal - S1F2L Umfang.png";
import adyenS1F2LSchraeg   from "@/assets/hardware/Adyen POS-Terminal - S1F2L Schräg.png";
import adyenAMS1           from "@/assets/hardware/Adyen AMS1 Terminal.png";
import adyenAMS1Schraeg    from "@/assets/hardware/Adyen AMS1 Terminal Schräg.png";

// ─── Assets: Drucker ─────────────────────────────────────────────────────────
import gm80mm              from "@/assets/hardware/Gastro Master - 80mm Drucker.png";
import gm80mmOben          from "@/assets/hardware/Gastro Master - 80mm Drucker Oben.png";
import gm80mmOffen         from "@/assets/hardware/Gastro Master - 80mm Drucker Offen.png";
import gm80mmOffenSchraeg  from "@/assets/hardware/Gastro Master - 80mm Drucker Offen Schräg.png";
import gm80mmOffenSeite    from "@/assets/hardware/Gastro Master - 80mm Drucker Offen Seite.png";
import gm80mmUnten         from "@/assets/hardware/Gastro Master - 80mm Drucker Unten.png";
import epson               from "@/assets/hardware/Epson Bondrucker TM-M30III.png";
import epsonFrontal        from "@/assets/hardware/Epson Bondrucker TM-M30III Frontal.png";
import epsonSeite          from "@/assets/hardware/Epson Bondrucker TM-M30III Seite.png";
import epsonT20            from "@/assets/hardware/Epson Bondrucker TM-T20III.png";
import epsonT20_2          from "@/assets/hardware/Epson Bondrucker TM-T20III 2.png";
import epsonT20_3          from "@/assets/hardware/Epson Bondrucker TM-T20III 3.png";
import gm58mm              from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker.png";
import gm58mm_2            from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker 2.png";
import gm58mm_3            from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker 3.png";

// ─── Assets: Zubehör ─────────────────────────────────────────────────────────
import schublade           from "@/assets/hardware/Gastro Master - Kassenschublade.png";
import schubladeOffen      from "@/assets/hardware/Gastro Master - Kassenschublade Offen.png";
import staender            from "@/assets/hardware/Tablet Ständer.png";
import staenderSeite       from "@/assets/hardware/Tablet Ständer Seite.png";
import staenderAusgefahren from "@/assets/hardware/Tablet Ständer Ausgefahren.png";
import schutzhuelle1       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 1.png";
import schutzhuelle2       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 2.png";
import schutzhuelle3       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 3.png";
import lanKabel            from "@/assets/hardware/Lan Kabel.png";

// ─── Static image sets ────────────────────────────────────────────────────────
const KASSE_IMAGES = [
  [hwEloFront, hwEloSchraeg, hwEloHinten, hwEloPorts, hwEloSeite],
  [hwEloDblFront, hwEloDblSchraeg, hwEloDblHinten, hwEloDblPorts],
  [hwSurfaceFront, hwSurfaceSchraeg, hwSurfaceHinten, hwSurfaceSeite],
];

const TERMINAL_IMAGES = [
  [adyenS1F2L, adyenS1F2LUmfang, adyenS1F2LSchraeg],
  [adyenAMS1, adyenAMS1Schraeg],
  [gm58mm, gm58mm_2, gm58mm_3],
];

const PRINTER_IMAGES = [
  [gm80mm, gm80mmOben, gm80mmOffen, gm80mmOffenSchraeg, gm80mmOffenSeite, gm80mmUnten],
  [epson, epsonFrontal, epsonSeite],
  [epsonT20, epsonT20_2, epsonT20_3],
];

const ACCESSORY_IMAGES = [
  [schublade, schubladeOffen],
  [staender, staenderSeite, staenderAusgefahren],
  [schutzhuelle1, schutzhuelle2, schutzhuelle3],
  [lanKabel],
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = { title: string; desc: string; features: string[]; labels: string[] };
type FaqItem = { q: string; a: string };

// ─── HwCard ──────────────────────────────────────────────────────────────────
const HwCard = ({ product, images, index, lp, inquiryCta }: {
  product: Product;
  images: string[];
  index: number;
  lp: (p: string) => string;
  inquiryCta: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-white/[0.04] overflow-hidden hover:border-cyan-brand/30 hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-square bg-white dark:bg-white/[0.02] p-6 flex items-center justify-center">
          <img
            src={images[current]}
            alt={`${product.title} — ${product.labels[current]}`}
            className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]"
            onClick={() => setLightbox(true)}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A264A]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0A264A]"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A264A]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0A264A]"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? "bg-cyan-brand w-5" : "bg-[#0A264A]/20 dark:bg-white/20 hover:bg-[#0A264A]/40"}`}
              />
            ))}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#0A264A] dark:text-white mb-2">{product.title}</h3>
          <p className="text-[#0A264A]/60 dark:text-white/50 text-sm leading-relaxed mb-4">{product.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.map(f => (
              <span key={f} className="text-xs font-medium text-cyan-brand bg-cyan-brand/10 px-2.5 py-1 rounded-full">{f}</span>
            ))}
          </div>
          <Link to={lp("/kontakt")} className="inline-flex items-center gap-1.5 text-cyan-brand text-sm font-semibold hover:gap-2.5 transition-all duration-200">
            {inquiryCta} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[current]}
                alt={`${product.title} — ${product.labels[current]} (vergrößert)`}
                className="w-full h-full object-contain rounded-2xl"
              />
              {images.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {product.title} — {product.labels[current]}
                </span>
              </div>
              <button onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg leading-none">
                ×
              </button>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === current ? "bg-cyan-brand w-6" : "bg-white/30 hover:bg-white/50"}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── CategorySection ──────────────────────────────────────────────────────────
const CategorySection = ({
  badge, headline, sub, products, imageSet, lp, inquiryCta, cols, bg,
}: {
  badge: string; headline: string; sub: string;
  products: Product[]; imageSet: string[][];
  lp: (p: string) => string; inquiryCta: string;
  cols: string; bg: string;
}) => (
  <section className={`${bg} px-5 md:px-8 lg:px-16 py-12 md:py-16 border-t border-[#0A264A]/[0.06] dark:border-white/[0.04]`}>
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-12"
      >
        <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{badge}</span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0A264A] dark:text-white">{headline}</h2>
        <p className="text-[#0A264A]/55 dark:text-white/45 text-lg mt-3 max-w-2xl">{sub}</p>
      </motion.div>
      <div className={`grid grid-cols-1 ${cols} gap-6`}>
        {products.map((p, i) => (
          <HwCard
            key={p.title}
            product={p}
            images={imageSet[i] ?? [imageSet[0][0]]}
            index={i}
            lp={lp}
            inquiryCta={inquiryCta}
          />
        ))}
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const HardwarePage = () => {
  const { t, ready } = useTranslation("hardware");
  const lp = useLangPath();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const kasseProducts    = arr("sections.kasse.products")      as Product[];
  const terminalProducts = arr("sections.terminals.products")  as Product[];
  const printerProducts  = arr("sections.printers.products")   as Product[];
  const accessoryProducts = arr("sections.accessories.products") as Product[];
  const faqItems         = arr("faq.items")                    as FaqItem[];

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de" },
      { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
      { "@type": "ListItem", position: 3, name: "Hardware", item: "https://gastro-master.de/produkte/hardware" },
    ],
  };

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/hardware",
  });

  return (
    <div className={`min-h-screen transition-opacity duration-300 ${!ready ? "opacity-0" : "opacity-100"}`} style={{ backgroundColor: "#0A264A" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="mesh-gradient min-h-[80vh] flex items-center px-5 md:px-8 lg:px-16 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#007DCF]/8 blur-[180px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-8"
            >
              {t("hero.h1")}{" "}
              <span className="text-gradient-brand">{t("hero.h1Highlight")}</span>
              {" "}{t("hero.h1Suffix")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative flex lg:hidden items-center justify-center my-8"
            >
              <div className="absolute inset-0 bg-[#007DCF]/12 blur-[80px] rounded-full scale-75" />
              <img src={kassenhardwareImg} alt={t("hero.heroImgAlt")} className="relative z-10 w-full max-w-sm drop-shadow-2xl" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-white/55 max-w-xl leading-relaxed mb-12"
            >
              {t("hero.sub")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={lp("/kontakt")}
                className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
              >
                {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#produkte"
                className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 transition-all"
              >
                {t("hero.cta2")}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-[#007DCF]/10 blur-[100px] rounded-full scale-75" />
            <img src={kassenhardwareImg} alt={t("hero.heroImgAlt")} className="relative z-10 w-full max-w-lg drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ─────────────────────────────────────────────── */}
      <div id="produkte">
        <CategorySection
          badge={t("sections.kasse.badge")}
          headline={t("sections.kasse.headline")}
          sub={t("sections.kasse.sub")}
          products={kasseProducts}
          imageSet={KASSE_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          cols="sm:grid-cols-3"
          bg="bg-white dark:bg-[#111111]"
        />

        <CategorySection
          badge={t("sections.terminals.badge")}
          headline={t("sections.terminals.headline")}
          sub={t("sections.terminals.sub")}
          products={terminalProducts}
          imageSet={TERMINAL_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          cols="sm:grid-cols-2 lg:grid-cols-3"
          bg="bg-[#F5F7FA] dark:bg-[#0A264A]/25"
        />

        <CategorySection
          badge={t("sections.printers.badge")}
          headline={t("sections.printers.headline")}
          sub={t("sections.printers.sub")}
          products={printerProducts}
          imageSet={PRINTER_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          cols="sm:grid-cols-2 lg:grid-cols-3"
          bg="bg-white dark:bg-[#111111]"
        />

        <CategorySection
          badge={t("sections.accessories.badge")}
          headline={t("sections.accessories.headline")}
          sub={t("sections.accessories.sub")}
          products={accessoryProducts}
          imageSet={ACCESSORY_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          cols="sm:grid-cols-2 lg:grid-cols-3"
          bg="bg-[#F5F7FA] dark:bg-[#0A264A]/25"
        />
      </div>

      {/* ── CTA DARK ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              {t("cta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t("cta.headline")}</h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl mx-auto">{t("cta.sub")}</p>
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("cta.button")} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16 border-t border-[#0A264A]/[0.06] dark:border-white/[0.04]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white">{t("faq.headline")}</h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-base mt-3">{t("faq.sub")}</p>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#f8fafc] dark:bg-white/[0.04] hover:bg-[#f0f4f8] dark:hover:bg-white/[0.06] transition-colors"
                >
                  <span className="font-semibold text-[#0A264A] dark:text-white text-sm pr-4">{item.q}</span>
                  {openFaq === i
                    ? <Minus className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                    : <Plus className="w-4 h-4 text-[#0A264A]/40 dark:text-white/40 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 py-4 text-[#0A264A]/65 dark:text-white/50 text-sm leading-relaxed bg-white dark:bg-white/[0.02]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CTA ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <HomeTeamCTA />
      </div>
      <div className="md:hidden">
        <CTASection {...getCTAConfig("/produkte/pakete/kassensystem")} />
      </div>

      <Footer />
    </div>
  );
};

export default HardwarePage;
