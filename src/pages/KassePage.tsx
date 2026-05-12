import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Cloud, Phone,
  Link2, Plus, Minus, CheckCircle2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Navbar from "@/components/landing/Navbar";
import { getCTAConfig } from "@/data/cta-config";
import { buildOrgGraph } from "@/data/schemaOrg";
import { PACKAGES, buildPackageSoftwareNode } from "@/data/packages";

const KASSE_PACKAGE = PACKAGES.find((p) => p.slug === "/produkte/pakete/kassensystem")!;
const KASSE_GRAPH = buildOrgGraph([buildPackageSoftwareNode(KASSE_PACKAGE)]);

// Below-the-fold — code-split to shrink the KassePage chunk.
const Footer = lazy(() => import("@/components/landing/Footer"));
const GoogleReviewsGrid = lazy(() => import("@/components/GoogleReviewsGrid"));
const CTASection = lazy(() =>
  import("@/components/CTASection").then((m) => ({ default: m.CTASection }))
);

// ─── Assets ──────────────────────────────────────────────────────────────────
import heroPosImg       from "@/assets/heroes/hero-pos-system.png";
import tischImg         from "@/assets/addons/Tisch System.png";
import fahrerImg        from "@/assets/addons/Fahrer-App und Liefergebiete.png";
import statistikImg     from "@/assets/kassensystem/Statistiken.png";
import slideTischImg     from "@/assets/addons/2 - Tisch Funktion.png";
import slideGpsImg       from "@/assets/addons/3 - Liefergebiete.png";
import slideStatistikImg from "@/assets/kassensystem/4 - Statistiken.png";
import zahlungsmethodenImg from "@/assets/addons/9 - Zahlungsmethoden.png";
import plattformenImg   from "@/assets/addons/Alle Plattformen.png";
import anruferImg       from "@/assets/kassensystem/Automatische Anruferkennung .png";
import liefergebImg     from "@/assets/addons/Liefergebiete.png";
import zahlenImg        from "@/assets/kassensystem/Immer alle Zahlen im Griff haben.png";
import zahlungenImg     from "@/assets/hardware/Alle Zahlungen Terminal.png";
import selfOrderImg     from "@/assets/mockups/Self-Ordering Terminal Mock Up.png";
import selfOrder11Img   from "@/assets/addons/11 - Self Ordering.png";
import ecKartenImg      from "@/assets/hardware/13 - EC-Kartengeräte.png";
import barSystemImg     from "@/assets/addons/Bar System mit Order Man.png";
import lizenzImg        from "@/assets/kassensystem/Eine Lizenz für Bis zu 4 Kassen.png";
import mitarbeiterImg   from "@/assets/kassensystem/Mitarbeiterverwaltung .png";
import qrImg            from "@/assets/mockups/QR-Code System Mock Up.png";
import selfOrderTermImg from "@/assets/addons/selfordering-terminals.png";
import selbstBestellenImg from "@/assets/addons/15 - Selbst bestellen.png";
import ordermanImg      from "@/assets/mockups/Orderman MockUp.png";
import hwEloFront      from "@/assets/hardware/Hardware - Elo Front.png";
import hwEloSchraeg    from "@/assets/hardware/Hardware - Elo Schrägt.png";
import hwEloHinten     from "@/assets/hardware/Hardware - Elo Hinten.png";
import hwEloPorts      from "@/assets/hardware/Hardware - Elo Ports.png";
import hwEloSeite      from "@/assets/hardware/Hardware - Elo Seite.png";
import hwEloDblFront   from "@/assets/hardware/Hardware - Elo Double Screen Front.png";
import hwEloDblSchraeg from "@/assets/hardware/Hardware - Elo Double Screen Schräg.png";
import hwEloDblHinten  from "@/assets/hardware/Hardware - Elo Double Screen Hinten.png";
import hwEloDblPorts   from "@/assets/hardware/Hardware - Elo Double Screen Ports.png";
import hwSurfaceFront  from "@/assets/hardware/Hardware - Microsoft Surface Tablet Front.png";
import hwSurfaceSchraeg from "@/assets/hardware/Hardware - Microsoft Surface Tablet Schräg.png";
import hwSurfaceHinten from "@/assets/hardware/Hardware - Microsoft Surface Tablet Hinten.png";
import hwSurfaceSeite  from "@/assets/hardware/Hardware - Microsoft Surface Tablet Seite.png";
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSanjayaImg   from "@/assets/team/team-sanjaya-pattiyage.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";
import logoKojo         from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoIlSorriso    from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoArtemis      from "@/assets/logos/kunden/logo-artemis.png";
import logoTake         from "@/assets/logos/kunden/logo-take.png";
import logoBurger       from "@/assets/logos/kunden/logo-burger-brothers.png";
const POSSection = lazy(() => import("@/components/landing/POSSection"));
const PickUpScreenSection = lazy(() => import("@/components/landing/PickUpScreenSection"));

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const renderFaqLinks = (text: string, lp: (p: string) => string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={lp(m[2])} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

const FaqItem = ({ q, a, lp }: { q: string; a: string; lp: (p: string) => string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg leading-snug group-hover:text-cyan-brand transition-colors duration-200">
          {q}
        </span>
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
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">{renderFaqLinks(a, lp)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Static image maps ───────────────────────────────────────────────────────

const benefitIcons = [ShieldCheck, Cloud, Phone, Link2];

const featureCard3Imgs = [tischImg, fahrerImg, statistikImg];

const squareTileImgs = [plattformenImg, anruferImg, fahrerImg, zahlenImg, zahlungsmethodenImg];

const featureCard5Imgs = [selfOrder11Img, barSystemImg, lizenzImg, ecKartenImg, mitarbeiterImg];

const slideImgs = [slideTischImg, slideStatistikImg, slideGpsImg];

const alternatingImgs = [selbstBestellenImg, selfOrderTermImg, ordermanImg, zahlungenImg];
const alternatingConfig = [
  { imgLeft: true, bg: "#0A264A", light: false, cta: true, learnMoreSlug: "/produkte/add-ons/qr-code-tischsystem" },
  { imgLeft: false, bg: "#081628", light: true, cta: false, learnMoreSlug: "/produkte/add-ons/kiosk" },
  { imgLeft: true, bg: "#0A264A", light: false, cta: true, learnMoreSlug: null },
  { imgLeft: false, bg: "#081628", light: true, cta: false, learnMoreSlug: null },
];

const customerLogos = [
  { src: logoKojo,      alt: "Kojo Sushi" },
  { src: logoIlSorriso, alt: "Il Sorriso Pizzeria" },
  { src: logoArtemis,   alt: "Artemis" },
  { src: logoTake,      alt: "Take" },
  { src: logoBurger,    alt: "Burger Brothers" },
];

const teamMemberImgs = [teamSanjayaImg, teamReneImg, teamSalvatoreImg, teamAndrejImg];

const langFlags = ["🇩🇪", "🇬🇧", "🇮🇹", "🇮🇷", "🇷🇺", "🇱🇰"];
const langColors = [
  "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300",
  "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
  "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300",
  "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
  "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300",
  "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300",
];

// ─── Hardware images ─────────────────────────────────────────────────────────

const HW_IMAGES = [
  [hwEloFront, hwEloSchraeg, hwEloHinten, hwEloPorts, hwEloSeite],
  [hwEloDblFront, hwEloDblSchraeg, hwEloDblHinten, hwEloDblPorts],
  [hwSurfaceFront, hwSurfaceSchraeg, hwSurfaceHinten, hwSurfaceSeite],
];

// ─── Schema ──────────────────────────────────────────────────────────────────

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
    { "@type": "ListItem", position: 3, name: "Kassensystem", item: "https://gastro-master.de/produkte/pakete/kassensystem" },
  ],
};

// ─── Slideshow ────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 50 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -50 }),
};

const FeatureSlideshow = ({ t }: { t: (k: string, o?: any) => any }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const slides = arr("slideshow.slides") as { label: string; title: string; text: string; tagline: string; imgAlt: string }[];

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  if (!slides.length) return null;
  const slide = slides[current];

  return (
    <div className="relative px-0 lg:px-16">
      {/* Desktop-only arrows */}
      <button
        onClick={() => go((current - 1 + slides.length) % slides.length)}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] items-center justify-center shadow-lg hover:bg-[#0A264A]/80 dark:hover:bg-white/80 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go((current + 1) % slides.length)}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] items-center justify-center shadow-lg hover:bg-[#0A264A]/80 dark:hover:bg-white/80 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="relative min-h-[640px] lg:min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 grid lg:grid-cols-2 gap-6 lg:gap-20 content-start lg:content-center items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#007DCF]/08 blur-[50px] rounded-3xl" />
              <img
                src={slideImgs[current]}
                alt={slide.imgAlt}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full rounded-2xl shadow-2xl shadow-[#0A264A]/12 border border-[#0A264A]/08"
              />
            </div>
            <div>
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
                {slide.label}
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
                {slide.title}
              </h3>
              <p className="text-[#0A264A]/60 dark:text-white/60 text-base md:text-lg leading-relaxed mb-5">
                {slide.text}
              </p>
              <p className="text-[#0A264A] dark:text-white font-bold text-base md:text-lg">
                {slide.tagline}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        {/* Mobile-only arrow left */}
        <button
          onClick={() => go((current - 1 + slides.length) % slides.length)}
          className="lg:hidden w-9 h-9 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] flex items-center justify-center shadow-md"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {slides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2.5 bg-[#0A264A] dark:bg-white"
                : "w-2.5 h-2.5 bg-[#0A264A]/25 dark:bg-white/25 hover:bg-[#0A264A]/50 dark:hover:bg-white/50"
            }`}
          />
        ))}

        {/* Mobile-only arrow right */}
        <button
          onClick={() => go((current + 1) % slides.length)}
          className="lg:hidden w-9 h-9 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] flex items-center justify-center shadow-md"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ─── Team CTA Section ─────────────────────────────────────────────────────────

const TeamCTASection = ({ t, lp }: { t: (k: string, o?: any) => any; lp: (p: string) => string }) => {
  const [current, setCurrent] = useState(0);
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const teamMembers = arr("teamCta.teamMembers") as { name: string; role: string }[];
  const languages = arr("teamCta.languages") as string[];

  useEffect(() => {
    if (!teamMembers.length) return;
    const ti = setInterval(() => setCurrent(c => (c + 1) % teamMembers.length), 4000);
    return () => clearInterval(ti);
  }, [teamMembers.length]);

  if (!teamMembers.length) return null;
  const member = teamMembers[current];

  return (
    <section className="bg-[#F0F4F8] dark:bg-[#060e1a] px-5 md:px-8 lg:px-16 py-12 md:py-16">
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
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              {t("teamCta.headline")}<br />{t("teamCta.headlineBr")}
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">{t("teamCta.expectLabel")}</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              {t("teamCta.expectText")}
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              {t("teamCta.privacyNote")}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {languages.map((label: string, i: number) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${langColors[i]}`}
                >
                  <span className="text-lg leading-none">{langFlags[i]}</span>
                  {label}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => { navigate(lp("/kontakt")); }}
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
                src={teamMemberImgs[current]}
                alt={member.name}
                loading="lazy"
                decoding="async"
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
              {teamMembers.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Hardware Section ─────────────────────────────────────────────────────────

const HwCard = ({ product, images, index, initialIndex = 0, compact = false, lp, inquiryCta }: {
  product: { title: string; desc: string; features: string[]; labels: string[] };
  images: string[];
  index: number;
  initialIndex?: number;
  compact?: boolean;
  lp: (p: string) => string;
  inquiryCta: string;
}) => {
  const [current, setCurrent] = useState(initialIndex);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      <motion.div
        initial={compact ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={compact ? undefined : { opacity: 1, y: 0 }}
        viewport={compact ? undefined : { once: true }}
        transition={compact ? undefined : { delay: index * 0.1, duration: 0.5 }}
        className="group rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-white/[0.04] overflow-hidden hover:border-cyan-brand/30 hover:shadow-xl transition-all duration-300"
      >
        <div className={`relative bg-white dark:bg-white/[0.02] flex items-center justify-center ${compact ? "h-56 p-4" : "aspect-square p-6"}`}>
          <img
            src={images[current]}
            alt={`${product.title} — ${product.labels[current]}`}
            loading="lazy"
            decoding="async"
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
                loading="lazy"
                decoding="async"
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

const HardwareSection = ({ t, lp }: { t: (k: string, o?: any) => any; lp: (p: string) => string }) => {
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const products = arr("hardware.products") as { title: string; desc: string; features: string[]; labels: string[] }[];
  const [mobileIdx, setMobileIdx] = useState(0);
  const mobileTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startMobileTimer = useCallback(() => {
    if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = setInterval(
      () => setMobileIdx(i => (i + 1) % products.length),
      7000,
    );
  }, [products.length]);

  useEffect(() => {
    startMobileTimer();
    return () => { if (mobileTimerRef.current) clearInterval(mobileTimerRef.current); };
  }, [startMobileTimer]);

  const goMobile = (idx: number) => { setMobileIdx(idx); startMobileTimer(); };

  return (
    <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("hardware.badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white">{t("hardware.headline")}</h2>
          <p className="text-[#0A264A]/55 dark:text-white/45 text-lg mt-5 max-w-2xl mx-auto">{t("hardware.sub")}</p>
        </motion.div>

        {/* Mobile: single card + dots */}
        {products.length > 0 && (
          <div className="sm:hidden">
            <HwCard
              key={products[mobileIdx]?.title}
              product={products[mobileIdx]}
              images={HW_IMAGES[mobileIdx]}
              index={mobileIdx}
              initialIndex={mobileIdx === 1 ? 1 : 0}
              compact
              lp={lp}
              inquiryCta={t("hardware.inquiryCta")}
            />
            <div className="flex justify-center gap-2 mt-5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goMobile(i)}
                  aria-label={`Produkt ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === mobileIdx
                      ? "w-5 h-2 bg-cyan-brand"
                      : "w-2 h-2 bg-[#0A264A]/20 dark:bg-white/20 hover:bg-cyan-brand/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop: 3-column grid (unverändert) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {products.map((p, i) => <HwCard key={p.title} product={p} images={HW_IMAGES[i]} index={i} initialIndex={i === 1 ? 1 : 0} lp={lp} inquiryCta={t("hardware.inquiryCta")} />)}
        </div>

        <div className="text-center mt-10">
          <Link to={lp("/produkte/hardware")} className="bg-[#0A264A] text-white font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#0A264A]/30">
            Mehr Hardware entdecken <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Wave Feature Section ─────────────────────────────────────────────────────
const WaveFeatureSection = ({ t }: { t: (k: string, o?: any) => any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(document.documentElement.classList.contains("dark"));
  const [isDark, setIsDark] = useState(isDarkRef.current);

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const cards = arr("waveFeature.cards") as { subtitle: string; title: string; text: string }[];

  useEffect(() => {
    const mo = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      isDarkRef.current = dark;
      setIsDark(dark);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    const animate = () => {
      time += 0.02;
      waveData.forEach((d) => {
        if (Math.random() < 0.01) d.targetValue = Math.random() * 0.7 + 0.1;
        d.value += (d.targetValue - d.value) * d.speed;
      });

      const dark = isDarkRef.current;
      ctx.fillStyle = dark ? "#020c1b" : "#f0f5fb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((d, i) => {
        const freq = d.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * (canvas.height / 2);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        if (dark) {
          const r = Math.round(79 + intensity * 100);
          const g = Math.round(70 + intensity * 130);
          ctx.strokeStyle = `rgba(${r},${g},229,0.6)`;
          ctx.shadowColor = `rgba(${r},${g},229,0.5)`;
        } else {
          const r = Math.round(0 + intensity * 30);
          const g = Math.round(75 + intensity * 80);
          const b = Math.round(150 + intensity * 57);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`;
          ctx.shadowColor = `rgba(${r},${g},${b},0.25)`;
        }
        ctx.lineWidth = 1 + i * 0.3;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();
    animate();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  const cardBg   = isDark ? "#0d1a2e" : "#ffffff";
  const imgBg    = isDark ? "linear-gradient(160deg, #0d1a2e 0%, #111e38 100%)" : "linear-gradient(160deg, #f0f5fb 0%, #e8f0fa 100%)";
  const gridColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(10,38,74,0.15)";
  const glowColor = isDark ? "rgba(99,102,241,0.12)" : "rgba(0,125,207,0.08)";
  const borderGrad = isDark
    ? "linear-gradient(135deg, rgba(99,102,241,0.7) 0%, rgba(237,132,0,0.5) 100%)"
    : "linear-gradient(135deg, rgba(0,125,207,0.55) 0%, rgba(237,132,0,0.45) 100%)";
  const sepColor  = isDark
    ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(237,132,0,0.3), transparent)"
    : "linear-gradient(90deg, transparent, rgba(0,125,207,0.3), rgba(237,132,0,0.25), transparent)";
  const subtitleColor = isDark ? "#7c85f0" : "#007DCF";
  const titleColor    = isDark ? "#ffffff" : "#0A264A";
  const bodyColor     = isDark ? "rgba(255,255,255,0.55)" : "rgba(10,38,74,0.58)";
  const headingColor  = isDark ? "#ffffff" : "#0A264A";
  const subColor      = isDark ? "rgba(255,255,255,0.45)" : "rgba(10,38,74,0.55)";

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            {t("waveFeature.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{ color: headingColor }}>
            {t("waveFeature.headline")}<br className="hidden md:block" /> {t("waveFeature.headlineBr")}
          </h2>
          <p className="text-lg mt-5 max-w-2xl mx-auto" style={{ color: subColor }}>
            {t("waveFeature.sub")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                animation: `wave-float ${3.5 + i * 0.4}s ease-in-out infinite`,
                background: `linear-gradient(${cardBg}, ${cardBg}) padding-box, ${borderGrad} border-box`,
                border: "1px solid transparent",
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden" style={{ background: imgBg }}>
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${gridColor} 1px, transparent 1px), linear-gradient(${gridColor} 1px, transparent 1px)`,
                    backgroundSize: "15px 15px",
                  }}
                />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${glowColor} 0%, transparent 70%)` }} />
                <img src={featureCard5Imgs[i]} alt={card.title} loading="lazy" decoding="async" className="relative z-10 w-full h-full object-contain p-3" />
              </div>

              <div className="h-px" style={{ background: sepColor }} />

              <div className="p-4 flex flex-col gap-1.5 flex-1" style={{ background: cardBg }}>
                <span className="text-[11px] font-black uppercase tracking-[0.14em] leading-none" style={{ color: subtitleColor }}>
                  {card.subtitle}
                </span>
                <h3 className="font-bold text-base leading-snug" style={{ color: titleColor }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const KassePage = () => {
  const { t, ready } = useTranslation("kasse");
  const navigate = useNavigate();
  const lp = useLangPath();

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const benefits = arr("benefits") as { title: string; text: string }[];
const tiles = arr("featuresGrid.tiles") as { title: string; text: string; tagline: string }[];
  const alternatingData = arr("alternating") as { headline: string; sub: string; text1: string; text2: string; checks: string[] }[];

  const SCHEMA_FAQ_KASSE = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
    })),
  };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/pakete/kassensystem",
  });

  return (
  <div className={`min-h-screen transition-opacity duration-300 ${!ready ? "opacity-0 lg:opacity-100" : "opacity-100"}`} style={{ backgroundColor: "#0A264A" }}>
    <ScrollProgressBar />
    <ScrollToTopButton />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ_KASSE) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(KASSE_GRAPH) }} />
    <Navbar />

    {/* ── S1: HERO ──────────────────────────────────────────── */}
    <section className="mesh-gradient min-h-[90vh] flex items-center px-5 md:px-8 lg:px-16 pt-24 pb-12 relative overflow-hidden">
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
          {/* Mobile-only Hero Image – zwischen Titel und Untertitel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex lg:hidden items-center justify-center my-8"
          >
            <div className="absolute inset-0 bg-[#007DCF]/12 blur-[80px] rounded-full scale-75" />
            <img
              src={heroPosImg}
              alt={t("hero.heroImgAlt")}
              fetchPriority="high"
              decoding="async"
              className="relative z-10 w-full max-w-sm drop-shadow-2xl"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/55 max-w-xl leading-relaxed mb-12"
          >
            {t("hero.subtitle")}{" "}
            <Link to={lp("/loesungen/restaurant")} className="text-cyan-brand/80 underline underline-offset-2 hover:opacity-80 transition-opacity">{t("hero.subtitleLinkRestaurant")}</Link>,{" "}
            <Link to={lp("/loesungen/lieferservice-gruenden")} className="text-cyan-brand/80 underline underline-offset-2 hover:opacity-80 transition-opacity">{t("hero.subtitleLinkLieferdienst")}</Link>{" "}
            {t("hero.subtitleEnd")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center sm:flex-row sm:items-start gap-4"
          >
            <button
              onClick={() => { navigate(lp("/kontakt")); }}
              className="bg-gradient-amber text-white font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#007DCF]/12 blur-[80px] rounded-full scale-75" />
          <img
            src={heroPosImg}
            alt={t("hero.heroImgAlt")}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 w-full max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>

    {/* ── S1b: GOOGLE REVIEWS ─────────────────────────────── */}
    <Suspense fallback={null}>
    <GoogleReviewsGrid />

    {/* ── S3: BENEFITS ──────────────────────────────────────── */}
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                className="group p-6 rounded-2xl bg-[#0A264A]/[0.04] dark:bg-white/[0.04] border border-[#0A264A]/[0.07] dark:border-white/[0.07] hover:border-cyan-brand/30 hover:bg-[#0A264A]/[0.07] dark:hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-[#0A264A] dark:text-white font-bold text-base leading-snug mb-2">
                  {b.title}
                </h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">
                  {b.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── S4: FEATURE SLIDESHOW ─────────────────────────────── */}
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            {t("slideshow.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A264A] dark:text-white leading-tight">
            {t("slideshow.headline")}<br className="hidden md:block" /> {t("slideshow.headlineBr")}
          </h2>
        </motion.div>
        <FeatureSlideshow t={t} />
      </div>
    </section>

    {/* ── S5: FEATURES GRID ─────────────────────────────────── */}
    <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
            {t("featuresGrid.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            {t("featuresGrid.headline")}
          </h2>
          <p className="text-white/45 text-lg mt-4 max-w-2xl mx-auto">
            {t("featuresGrid.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative flex items-start gap-5 p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-cyan-brand/30 transition-all duration-400 cursor-default overflow-hidden${i === 4 ? " md:col-span-2" : ""}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-brand/[0.05] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-brand/70 via-cyan-brand/30 to-transparent transition-all duration-500 ease-out" />

              <div className="relative flex-shrink-0 w-36 h-36 md:w-40 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <img
                  src={squareTileImgs[i]}
                  alt={tile.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.06] group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-[#0A264A]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-cyan-brand text-xs font-black">{i + 1}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 relative z-10 py-1">
                <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-2.5 group-hover:text-white transition-colors">
                  {tile.title}
                </h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed mb-3 group-hover:text-white/70 transition-colors">
                  {tile.text}
                </p>
                <p className="text-[#ED8400] font-bold text-sm md:text-base inline-flex items-center gap-1.5">
                  {tile.tagline}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── S6: SOCIAL PROOF ──────────────────────────────────── */}
    <section className="px-5 md:px-8 lg:px-16 py-16 md:py-24 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #020c1b 0%, #0a3d7a 50%, #00b4d8 100%)",
            "linear-gradient(135deg, #051e47 0%, #1565c0 50%, #004e9a 100%)",
            "linear-gradient(135deg, #020a14 0%, #0077b6 50%, #48cae4 100%)",
            "linear-gradient(135deg, #0d2b6b 0%, #023e8a 50%, #0096c7 100%)",
            "linear-gradient(135deg, #030f24 0%, #1a4fa8 50%, #00b4d8 100%)",
            "linear-gradient(135deg, #020c1b 0%, #0a3d7a 50%, #00b4d8 100%)",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, #007DCF22 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[140px] md:text-[280px] font-black text-white/[0.09] leading-none">
          {t("socialProof.watermark")}
        </span>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            {t("socialProof.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {t("socialProof.headline")}<br className="hidden md:block" /> {t("socialProof.headlineBr")}
          </h2>
          <p className="text-white/40 text-lg mt-5 max-w-xl mx-auto">
            {t("socialProof.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-8 md:gap-14 flex-wrap"
        >
          {customerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="h-10 md:h-12 object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── HARDWARE: Empfohlene Kassenhardware ──────────────── */}
    <HardwareSection t={t} lp={lp} />

    {/* ── S7b: WAVE FEATURE SECTION ─────────────────────────── */}
    <WaveFeatureSection t={t} />

    {/* ── PREISE: Die Gastro Master Cloud-Kasse ──────────────── */}
    <POSSection />

    {/* ── PICK-UP SCREEN: Dein Bildschirm. Dein Appetitanreger. */}
    <PickUpScreenSection />

    {/* ── S8: 4 ALTERNATING DETAIL-SECTIONS ────────────────── */}
    {alternatingData.map((sec, idx) => {
      const cfg = alternatingConfig[idx];
      return (
        <section
          key={sec.headline}
          className={`px-5 md:px-8 lg:px-16 py-12 md:py-16 ${
            cfg.light ? "bg-white dark:bg-[#081628]" : ""
          }`}
          style={cfg.light ? undefined : { backgroundColor: cfg.bg }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, x: cfg.imgLeft ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative ${cfg.imgLeft ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className={`absolute inset-0 blur-[60px] rounded-3xl scale-90 ${cfg.light ? "bg-[#007DCF]/8" : "bg-[#007DCF]/10"}`} />
                <img
                  src={alternatingImgs[idx]}
                  alt={sec.headline}
                  loading="lazy"
                  decoding="async"
                  className={`relative z-10 w-full rounded-3xl shadow-2xl ${
                    cfg.light
                      ? "border border-[#0A264A]/10 dark:border-white/10 shadow-black/10 dark:shadow-black/30"
                      : "border border-white/10 shadow-black/30"
                  }`}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: cfg.imgLeft ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className={cfg.imgLeft ? "lg:order-2" : "lg:order-1"}
              >
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
                  {sec.sub}
                </span>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-7 ${cfg.light ? "text-[#0A264A] dark:text-white" : "text-white"}`}>
                  {sec.headline}
                </h2>
                <p className={`text-lg leading-relaxed mb-5 ${cfg.light ? "text-[#0A264A]/60 dark:text-white/55" : "text-white/55"}`}>{sec.text1}</p>
                <p className={`text-lg leading-relaxed mb-10 ${cfg.light ? "text-[#0A264A]/60 dark:text-white/55" : "text-white/55"}`}>{sec.text2}</p>
                <ul className="space-y-3 mb-10">
                  {sec.checks.map(check => (
                    <li key={check} className={`flex items-start gap-3 text-base ${cfg.light ? "text-[#0A264A]/70 dark:text-white/70" : "text-white/70"}`}>
                      <CheckCircle2 className="w-5 h-5 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                      {check}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-8">
                  {cfg.cta && (
                    <motion.button
                      onClick={() => { navigate(lp("/kontakt")); }}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
                    >
                      {t("teamCta.cta")}
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>
                  )}
                  {cfg.learnMoreSlug && (
                    <Link
                      to={lp(cfg.learnMoreSlug)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-brand hover:gap-2.5 transition-all duration-200"
                    >
                      Mehr erfahren <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      );
    })}

    {/* ── S9: TEAM CTA ──────────────────────────────────────────── */}
    <div className="hidden md:block">
      <TeamCTASection t={t} lp={lp} />
    </div>

    {/* ── S9b: MOBILE CTA SECTION ─────────────────────────────── */}
    <div className="md:hidden">
      <CTASection {...getCTAConfig("/produkte/pakete/kassensystem")} />
    </div>

    {/* ── S10: FAQ ───────────────────────────────────────────── */}
    <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("faq.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {t("faq.headline")}<br className="hidden md:block" /> {t("faq.headlineBr")}
            </h2>
            <p className="text-white/40 mt-6 text-base leading-relaxed">
              {t("faq.sub")}
            </p>
            <button
              onClick={() => { navigate(lp("/kontakt")); }}
              className="mt-8 text-cyan-brand text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t("faq.cta")} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {faqItems.map(faq => <FaqItem key={faq.q} {...faq} lp={lp} />)}
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
    </Suspense>
  </div>
  );
};

export default KassePage;
