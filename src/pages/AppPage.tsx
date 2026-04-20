import React, { useState, useEffect, useRef } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2,
  Bell, Star, RefreshCw, Users,
  CreditCard, MapPin, Smartphone, Palette, type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CalculatorSection from "@/components/landing/CalculatorSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";

// ─── Assets ──────────────────────────────────────────────────────────────────
import iosIcon          from "@/assets/icons/iOS 26 Icon.png";
import androidIcon      from "@/assets/icons/Android Icon.png";
import phone1 from "@/assets/mockups/1 - Mock Up Small.png";
import phone2 from "@/assets/mockups/2 - Mock Up - Medium.png";
import phone3 from "@/assets/mockups/3 - Mock Up - Large.png";
import phone4 from "@/assets/mockups/4 - Mock Up Medium.png";
import phone5 from "@/assets/mockups/5 - Mock Up Small.png";
import logoKojo      from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoIlSorriso from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoBurger    from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoArtemis   from "@/assets/logos/kunden/logo-artemis.png";
import payPaypal     from "@/assets/logos/partner/partner-paypal.png";
import payApple      from "@/assets/logos/payment/Logo - Apple Pay.png";
import mockMenu      from "@/assets/mockups/Mock Up - Menu.png";
import mockLieferart from "@/assets/mockups/Mock Up - Lieferart.png";
import mockFilialen  from "@/assets/mockups/Mock Up - Filialen.png";
import mockLogin     from "@/assets/mockups/Mock Up - Registrierung.png";
import mockPush      from "@/assets/mockups/Mock Up - Push.png";
import mockZahlung   from "@/assets/mockups/Mock Up - Zahlung.png";
import mockAppStore  from "@/assets/mockups/Mock Up - App Store.png";
import mockBranding  from "@/assets/mockups/Mock Up - Branding Hero.png";
import payGoogle     from "@/assets/logos/payment/pay-google.png";
import payVisa       from "@/assets/logos/payment/pay-visa.png";
import payMastercard from "@/assets/logos/payment/pay-mastercard.png";
import payKlarna     from "@/assets/logos/payment/pay-klarna.png";
import iconAppStore      from "@/assets/icons/Icon - Apple App Store.png";
import iconGooglePlay    from "@/assets/icons/Icon - Google Play Store.png";
import socialInstagram from "@/assets/icons/Icon - Instagram.png";
import socialFacebook  from "@/assets/icons/Icon - Facebook.png";
import socialTikTok    from "@/assets/icons/Icon - TikTok.png";
import socialYoutube   from "@/assets/icons/Icon - Youtube.png";
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";

// ─── Feature card images (order must match JSON) ─────────────────────────────
const featureImages = [mockPush, mockBranding, mockLieferart, mockFilialen, mockMenu, mockLogin, mockZahlung, mockAppStore];
const featureIcons: LucideIcon[] = [Bell, Palette, MapPin, Users, RefreshCw, Star, CreditCard, Smartphone];
const testimonialLogos = [logoKojo, logoIlSorriso, logoBurger, logoArtemis];

// ─── Schema ───────────────────────────────────────────────────────────────────
const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
    { "@type": "ListItem", position: 3, name: "Bestell-App", item: "https://gastro-master.de/produkte/app" },
  ],
};

// ─── Cursor-Tracking Glow Card ────────────────────────────────────────────────
const GlowCard = ({
  children,
  glowRgb,
  className,
  motionProps,
}: {
  children: React.ReactNode;
  glowRgb: string;
  className?: string;
  motionProps?: React.ComponentProps<typeof motion.div>;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...motionProps}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        boxShadow: hovered
          ? `0 0 70px 10px rgba(${glowRgb},0.22)`
          : "0 0 0 0 transparent",
        transition: "box-shadow 0.1s ease-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.1s ease-out",
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(${glowRgb},0.18), transparent 60%)`,
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />
      {children}
    </motion.div>
  );
};

const FlyerPriceList = () => {
  const { t } = useTranslation("app");
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const [open, setOpen] = useState(false);
  const tiers = arr("flyerTiers") as { qty: string; price: string }[];
  return (
    <div className="mt-4 relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
      >
        {t("pricing.flyerPriceListToggle")} {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 z-30 mb-2 rounded-xl bg-white dark:bg-[#111827] border border-[#0A264A]/10 dark:border-white/10 shadow-xl p-4 space-y-1.5"
          >
            {tiers.map(ti => (
              <div key={ti.qty} className="flex justify-between text-xs text-[#0A264A]/60 dark:text-white/50">
                <span>{ti.qty}</span>
                <span className="font-semibold">{ti.price}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">{renderFaqLinks(a, lp)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Hero Phone Spread (Scroll-driven) ───────────────────────────────────────
const heroPhoneData = [
  { src: phone1, alt: "Gastro Master App",         targetX: -330, targetScale: 0.80, zIndex: 1 },
  { src: phone2, alt: "Et Manus Burger App",        targetX: -165, targetScale: 0.90, zIndex: 3 },
  { src: phone3, alt: "TAKE – The Good Food App",   targetX:    0, targetScale: 1.00, zIndex: 5 },
  { src: phone4, alt: "D&T Restaurants App",        targetX:  165, targetScale: 0.90, zIndex: 3 },
  { src: phone5, alt: "Bäckerei Zimmer App",        targetX:  330, targetScale: 0.80, zIndex: 1 },
];

function PhoneScrollItem({
  src, alt, targetX, targetScale, zIndex, spread,
}: {
  src: string; alt: string; targetX: number; targetScale: number; zIndex: number;
  spread: MotionValue<number>;
}) {
  const x     = useTransform(spread, [0, 250], [targetX * 0.55, targetX]);
  const scale = useTransform(spread, [0, 250], [targetScale * 0.92, targetScale]);
  return (
    <motion.div
      style={{ x, scale, zIndex, position: "absolute" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-[190px] md:w-[220px] lg:w-[260px] object-contain drop-shadow-2xl"
        loading="eager"
      />
    </motion.div>
  );
}

function HeroPhoneSpread() {
  const { scrollY } = useScroll();
  return (
    <div className="relative h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[480px] bg-cyan-brand/12 blur-[90px] rounded-full pointer-events-none z-0" />
      {heroPhoneData.map((p, i) => (
        <PhoneScrollItem key={i} spread={scrollY} {...p} />
      ))}
    </div>
  );
}

// ─── Team CTA ────────────────────────────────────────────────────────────────
const teamImages = [teamReneImg, teamSalvatoreImg, teamAndrejImg];

const langColors = [
  "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300",
  "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
  "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300",
  "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
  "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300",
  "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300",
];

const AppTeamCTA = () => {
  const { t } = useTranslation("app");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const languages = arr("teamCta.languages") as { label: string; flag: string }[];
  const members = arr("teamCta.teamMembers") as { name: string; role: string }[];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const ti = setInterval(() => setCurrent(c => (c + 1) % teamImages.length), 4000);
    return () => clearInterval(ti);
  }, []);
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
          {/* Left: Text */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              {t("teamCta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              {t("teamCta.title")}<br />{t("teamCta.titleBr")}
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">{t("teamCta.expectTitle")}</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              {t("teamCta.expectText")}
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              {t("teamCta.expectSubtext")}
            </p>
            {/* Language pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${langColors[i] ?? ""}`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  {lang.label}
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

          {/* Right: Team Slideshow */}
          <div className="relative min-h-[380px] lg:min-h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={teamImages[current]}
                alt={members[current]?.name ?? ""}
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
                  <p className="text-white font-bold text-lg leading-tight">{members[current]?.name}</p>
                  <p className="text-white/70 text-sm">{members[current]?.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
              {teamImages.map((_, i) => (
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const AppPage = () => {
  const { t } = useTranslation("app");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const featureCardsData = arr("features.cards") as { title: string; text: string; imgAlt: string }[];
  const testimonialsData = arr("testimonials.items") as { initials: string; quote: string; name: string; restaurant: string }[];
  const statsData = arr("testimonials.stats") as { value: string; label: string }[];
  const stepsData = arr("steps.items") as { num: string; title: string; text: string }[];
  const mainFeatures = arr("pricing.mainFeatures") as string[];
  const compOthers = arr("comparison.othersItems") as string[];
  const compGm = arr("comparison.gmItems") as string[];

  // FAQ Schema (generated from translated content)
  const SCHEMA_FAQ_APP = {
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
    canonical: "https://gastro-master.de/produkte/app",
  });

  return (
    <div className="min-h-screen bg-[#0A264A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ_APP) }} />
      <Navbar />

      {/* ── S1: HERO ────────────────────────────────────────────── */}
      <section className="mesh-gradient flex flex-col pt-24 md:pt-28 pb-6 relative overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#007DCF]/10 blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 text-center relative z-10 pb-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.15] tracking-tight"
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-brand">{t("hero.titleHighlight")}</span>{" "}
            {t("hero.title2")}
          </motion.h1>
        </div>

        <div className="relative z-10 w-full mt-6 md:mt-8">
          <HeroPhoneSpread />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mx-auto px-5 text-center relative z-10 pt-8 md:pt-10 pb-4 flex flex-col items-center gap-6"
        >
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            {t("hero.subtitle")}{" "}
            <Link to={lp("/produkte/webshop")} className="text-cyan-brand/80 underline underline-offset-2 hover:opacity-80 transition-opacity">{t("hero.subtitleLinkText")}</Link>{" "}
            {t("hero.subtitleEnd")}
          </p>

          <motion.button
            onClick={() => { window.location.href = lp("/kontakt"); }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
          >
            {t("hero.cta")}
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </section>

      {/* ── S2: TRUST BAR ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1.5 leading-none">{t("trustBar.zeroPercent")}</p>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">{t("trustBar.zeroPercentLabel")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07, duration: 0.5 }}
            className="text-center flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4">
              <img src={iosIcon}     alt={t("trustBar.iosAlt")}     className="w-14 h-14 md:w-20 md:h-20 object-contain" />
              <img src={androidIcon} alt={t("trustBar.androidAlt")} className="w-14 h-14 md:w-20 md:h-20 object-contain" />
            </div>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">{t("trustBar.storesLabel")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1.5 leading-none">{t("trustBar.customers")}</p>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">{t("trustBar.customersLabel")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── S3: FEATURES ────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 pt-12 md:pt-16 pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10 max-w-2xl"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("features.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              {t("features.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              {t("features.text")}{" "}
              <Link to={lp("/loesungen/lieferservice-gruenden")} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{t("features.textLinkText")}</Link>{" "}
              {t("features.textEnd")}
            </p>
          </motion.div>

          <p className="text-xs text-[#0A264A]/35 dark:text-white/25 mb-6">
            {t("features.geoStat")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-7">
            {featureCardsData.map((f, i) => {
              const Icon = featureIcons[i];
              const img = featureImages[i];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="group bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300"
                >
                  {img ? (
                    <div className="aspect-[9/14] overflow-hidden bg-white dark:bg-black">
                      <img
                        src={img}
                        alt={f.imgAlt}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[9/14] flex items-center justify-center bg-cyan-brand/10 dark:bg-cyan-brand/5">
                      {Icon && <Icon className="w-12 h-12 text-cyan-brand opacity-60" strokeWidth={1.5} />}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && <Icon className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />}
                      <h3 className="text-[#0A264A] dark:text-white font-bold text-sm leading-snug">{f.title}</h3>
                    </div>
                    <p className="text-[#0A264A]/55 dark:text-white/45 text-sm leading-relaxed">{f.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S5: DEMO ────────────────────────────────────────────── */}
      <section className="bg-[#F0F4F8] dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("demo.badge")}</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white leading-tight mb-2">
                {t("demo.title")}
              </h2>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-base leading-relaxed max-w-xl">
                {t("demo.text")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="https://apps.apple.com/us/app/gastro-master-app/id1459431720"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
              >
                <img src={iconAppStore} alt={t("demo.appStoreAlt")} className="h-14 object-contain" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.epitglobal.gastromasterapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
              >
                <img src={iconGooglePlay} alt={t("demo.googlePlayAlt")} className="h-14 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: SOCIAL MEDIA ─────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
          >
            <div className="flex-1">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("social.badge")}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                {t("social.title")}
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                {t("social.text")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 flex-shrink-0">
              {[
                { src: socialInstagram, alt: "Instagram", label: "Instagram" },
                { src: socialFacebook,  alt: "Facebook",  label: "Facebook"  },
                { src: socialTikTok,    alt: "TikTok",    label: "TikTok"    },
                { src: socialYoutube,   alt: "YouTube",   label: "YouTube"   },
              ].map((s, i) => (
                <motion.div
                  key={s.alt}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                    <img
                      src={s.src}
                      alt={s.alt}
                      className="relative w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                  <span className="text-white/50 text-xs font-medium group-hover:text-white/85 transition-colors duration-200">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S7: TARGET GROUP ────────────────────────────────────── */}
      <TargetGroupSection />

      {/* ── S8: VERGLEICH ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("comparison.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
              {t("comparison.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg leading-relaxed max-w-2xl mx-auto">
              {t("comparison.text")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <GlowCard
              glowRgb="239,68,68"
              className="rounded-3xl border border-red-400/40 bg-gradient-to-br from-red-100 to-red-50 dark:from-[#1a0a0a]/80 dark:to-[#0d0808]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-red-500/10 dark:bg-red-500/15 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white mb-5 relative z-10">
                {t("comparison.othersTitle")}
              </h3>
              <ul className="space-y-3 relative z-10">
                {compOthers.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mt-0.5">
                      <span className="text-red-500 dark:text-red-400 text-xs font-black leading-none">✕</span>
                    </span>
                    <span className="text-[#0A264A]/70 dark:text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard
              glowRgb="34,197,94"
              className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-[#071a10]/80 dark:to-[#040f0a]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: 24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/12 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white mb-5 relative z-10">
                {t("comparison.gmTitle")}
              </h3>
              <ul className="space-y-3 relative z-10">
                {compGm.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-black leading-none">✓</span>
                    </span>
                    <span className="text-[#0A264A]/70 dark:text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ── S9: CALCULATOR ──────────────────────────────────────── */}
      <CalculatorSection />

      {/* ── S10: TESTIMONIALS ───────────────────────────────────── */}
      <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("testimonials.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {t("testimonials.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {testimonialsData.map((te, i) => (
              <motion.div
                key={te.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#FBA200] text-[#FBA200]" />
                  ))}
                </div>
                <p className="text-white/70 text-base leading-relaxed mb-6 italic">"{te.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-brand/20 border border-cyan-brand/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-brand text-xs font-black">{te.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{te.name}</p>
                    <p className="text-white/40 text-xs">{te.restaurant}</p>
                  </div>
                  {testimonialLogos[i] && (
                    <img src={testimonialLogos[i]} alt={te.restaurant} className="h-6 object-contain opacity-50 flex-shrink-0" loading="lazy" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl py-6 px-4"
              >
                <p className="text-2xl md:text-3xl font-black text-white mb-1.5 leading-none">{s.value}</p>
                <p className="text-white/40 text-xs leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11: PREISE ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-7 max-w-2xl"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("pricing.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              {t("pricing.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              {t("pricing.text")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl bg-[#0A264A] border border-cyan-brand/20 p-8 md:p-10 mb-5 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="md:w-64 flex-shrink-0">
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("pricing.mainBadge")}</span>
                <h3 className="text-white font-black text-2xl mb-3">{t("pricing.mainTitle")}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-[#ED8400] font-black text-4xl md:text-5xl leading-none whitespace-nowrap">{t("pricing.mainPrice")}</span>
                  <span className="text-white/40 text-sm mb-1">{t("pricing.mainPriceSuffix")}</span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-2.5">
                  {mainFeatures.map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-shrink-0 flex items-center gap-5">
                {[
                  { src: iosIcon,     alt: t("trustBar.iosAlt")     },
                  { src: androidIcon, alt: t("trustBar.androidAlt") },
                ].map(icon => (
                  <div key={icon.alt} className="relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-brand/35 blur-3xl scale-[2] pointer-events-none" />
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="relative w-32 h-32 object-contain drop-shadow-[0_0_24px_rgba(0,125,207,0.85)]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#ED8400] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#ED8400]/30 whitespace-nowrap"
                >
                  {t("pricing.mainCta")}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("pricing.websiteBadge")}</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">{t("pricing.websiteTitle")}</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">{t("pricing.websitePrice")}</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> {t("pricing.websitePriceSuffix")}</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                {t("pricing.websiteText")}
              </p>
              <button
                onClick={() => { window.location.href = lp("/produkte/webseite"); }}
                className="mt-5 text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                {t("pricing.websiteLink")} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("pricing.txBadge")}</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">{t("pricing.txTitle")}</h3>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-5 flex-1">
                {t("pricing.txText")}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {[
                  { src: payPaypal,     alt: "PayPal",      h: "h-12" },
                  { src: payApple,      alt: "Apple Pay",   h: "h-12" },
                  { src: payGoogle,     alt: "Google Pay",  h: "h-7"  },
                  { src: payVisa,       alt: "Visa",        h: "h-7"  },
                  { src: payMastercard, alt: "Mastercard",  h: "h-7"  },
                  { src: payKlarna,     alt: "Klarna",      h: "h-7"  },
                ].map(p => (
                  <motion.img
                    key={p.alt}
                    src={p.src}
                    alt={p.alt}
                    className={`${p.h} object-contain`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  />
                ))}
              </div>
              <button
                onClick={() => { window.location.href = lp("/produkte/transaktionsumlage"); }}
                className="text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                {t("pricing.txLink")} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest">{t("pricing.flyerBadge")}</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">{t("pricing.flyerFree")}</span>
              </div>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">{t("pricing.flyerTitle")}</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">{t("pricing.flyerPrice")}</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> {t("pricing.flyerPriceSuffix")}</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                {t("pricing.flyerText")}
              </p>
              <FlyerPriceList />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S12: HOW IT WORKS ───────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("steps.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
              {t("steps.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
              {t("steps.text")}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {stepsData.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative group"
              >
                <span className="text-[96px] md:text-[112px] font-black leading-none block mb-3 select-none text-cyan-brand/25 group-hover:text-cyan-brand/60 transition-colors duration-300 group-hover:drop-shadow-[0_0_40px_rgba(0,125,207,0.7)]">{step.num}</span>
                <h3 className="text-xl font-bold text-[#0A264A] dark:text-white mb-4 leading-snug -mt-4">{step.title}</h3>
                <p className="text-[#0A264A]/60 dark:text-white/50 leading-relaxed text-base">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S13: FAQ ────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("faq.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {t("faq.title")}
              </h2>
              <p className="text-white/40 mt-6 text-base leading-relaxed">
                {t("faq.text")}
              </p>
              <button
                onClick={() => { window.location.href = lp("/kontakt"); }}
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
              {faqItems.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} lp={lp} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S14: FINAL CTA ──────────────────────────────────────── */}
      <div className="hidden md:block">
        <AppTeamCTA />
      </div>

      {/* ── S14b: MOBILE CTA SECTION ────────────────────────────── */}
      <div className="md:hidden">
        <CTASection {...getCTAConfig("/produkte/app")} />
      </div>

      <Footer />
    </div>
  );
};

export default AppPage;
