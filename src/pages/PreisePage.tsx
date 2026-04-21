import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ShoppingCart,
  Smartphone,
  Globe,
  Monitor,
  Percent,
  Truck,
  QrCode,
  ShoppingBag,
  Link2,
  Zap,
  MessageCircle,
  FileCheck,
  Gift,
  Infinity,
  TrendingUp,
  Plus,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SlimPricingSection from "@/components/landing/SlimPricingSection";
import imgWebshop     from "@/assets/screenshots/take-startbild.jpeg";
import imgApp         from "@/assets/mockups/Mock Up - Branding Hero.png";
import imgKasse       from "@/assets/heroes/hero-pos-system.png";
import imgWebseite    from "@/assets/heroes/Hero - Gastro Master.png";
import imgFahrerApp   from "@/assets/addons/addon-frankfurt-gps.png";
import imgQrTisch     from "@/assets/addons/addon-qr-tischsystem.png";
import imgSelfOrder   from "@/assets/addons/selfordering-terminals.png";
import imgKasseHW     from "@/assets/hardware/kassenhardware.png";
import imgQrFlyer     from "@/assets/mockups/Mock Up - Flyer.png";
import payPaypal      from "@/assets/logos/partner/partner-paypal.png";
import payStripe      from "@/assets/logos/partner/partner-stripe.png";
import payApple       from "@/assets/logos/payment/Logo - Apple Pay.png";
import payGoogle      from "@/assets/logos/payment/pay-google.png";
import payVisa        from "@/assets/logos/payment/pay-visa.png";
import payMastercard  from "@/assets/logos/payment/pay-mastercard.png";
import payKlarna      from "@/assets/logos/payment/pay-klarna.png";

// ─── SEO / Schema ───────────────────────────────────────────────────────────

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Preise", item: "https://gastro-master.de/preise" },
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet das Kassensystem von Gastro Master?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Gastro Master Kassensystem ist ab 69 € pro Monat (netto) erhältlich. Die Cloud-Kassensoftware ist monatlich kündbar mit 3 Monaten Kündigungsfrist. Sie läuft auf Windows-Computern und beinhaltet TSE-Zertifizierung, GoBD-Konformität sowie persönlichen Support.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch sind die Einrichtungskosten bei Gastro Master?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Einrichtungskosten besprechen wir individuell im persönlichen Beratungsgespräch — je nach Umfang deines Betriebs. Die Webseite hat eine Mindestvertragslaufzeit von 12 Monaten. Webshop, App und Kassensystem sind monatlich kündbar mit 3 Monaten Kündigungsfrist.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Webseite und Bestellsystem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Webseite (ab 49 €/Monat) ist eine professionelle Restaurant-Website ohne Bestellfunktion – ideal als digitale Visitenkarte. Das Bestellsystem (ab 79 €/Monat) enthält zusätzlich einen Online-Bestellshop mit 0 % Provision, über den deine Kunden direkt bestellen können.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich mit einem Paket mehrere Standorte betreiben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Pakete unterstützen mehrere Standorte und Filialen. Beim Kassensystem sind bis zu 4 Kassen mit einer Lizenz inklusive. Für größere Franchise-Systeme gibt es individuelle Lösungen.",
      },
    },
    {
      "@type": "Question",
      name: "Fallen Transaktionsgebühren an?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gastro Master erhebt 0 % Provision. Die Zahlungsanbieter (Stripe, PayPal etc.) erheben eigene Transaktionsgebühren. Mit der optionalen Transaktions-Umlage kannst du diese transparent an deine Kunden weitergeben.",
      },
    },
    {
      "@type": "Question",
      name: "Welches Paket ist das Richtige für meinen Betrieb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für eine reine Online-Präsenz eignet sich die Webseite (ab 49 €/Monat). Willst du online Bestellungen entgegennehmen, ist das Bestellsystem (ab 79 €/Monat) die Wahl. Für die eigene Bestell-App empfehlen wir App + Bestellsystem ab 149 €/Monat. Das Kassensystem (ab 69 €/Monat) ergänzt alle Pakete für den stationären Betrieb.",
      },
    },
  ],
};

const ADDON_IMAGES = [
  { img: imgFahrerApp, imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-white flex items-center justify-center", imgClass: "w-full h-full object-contain scale-110", dark: false },
  { img: imgQrTisch,   imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden", imgClass: "w-full h-full object-cover", dark: false },
  { img: imgSelfOrder, imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-[#061830]/60 flex items-center justify-center", imgClass: "w-full h-full object-contain p-4", dark: true },
];

const INTEGRATION_ICONS = [Globe, ShoppingCart, Smartphone, Monitor];
const INTEGRATION_HREFS = ["/produkte/pakete/webseite", "/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/pakete/kassensystem"];
const INTEGRATION_COLORS = [
  "border-cyan-brand/30 bg-[#0A264A]/5 dark:bg-[#0A264A]/40",
  "border-[#ED8400]/30 bg-[#ED8400]/5 dark:bg-[#ED8400]/10",
  "border-cyan-brand/30 bg-[#0A264A]/5 dark:bg-[#0A264A]/40",
  "border-[#ED8400]/30 bg-[#ED8400]/5 dark:bg-[#ED8400]/10",
];

const STEP_ICONS = [MessageCircle, FileCheck, Gift];

const FLYER_TIERS = [
  { qty: "2.500 Stück",  price: "65,00 €"    },
  { qty: "5.000 Stück",  price: "117,00 €"   },
  { qty: "7.500 Stück",  price: "175,50 €"   },
  { qty: "10.000 Stück", price: "234,00 €"   },
  { qty: "12.500 Stück", price: "295,50 €"   },
  { qty: "15.000 Stück", price: "351,00 €"   },
  { qty: "20.000 Stück", price: "468,00 €"   },
  { qty: "30.000 Stück", price: "702,00 €"   },
  { qty: "40.000 Stück", price: "936,00 €"   },
  { qty: "50.000 Stück", price: "1.117,00 €" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FlyerPriceList = ({ label }: { label: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-auto relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-brand text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
      >
        {label} {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
            {FLYER_TIERS.map(t => (
              <div key={t.qty} className="flex justify-between text-xs text-[#0A264A]/60 dark:text-white/50">
                <span>{t.qty}</span>
                <span className="font-semibold">{t.price}</span>
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

interface FaqItem { q: string; a: string }

const FaqAccordion = ({ item, lp }: { item: FaqItem; lp: (p: string) => string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-semibold text-base leading-snug pr-2">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-brand flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm leading-relaxed pb-5">{renderFaqLinks(item.a, lp)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const PreisePage = () => {
  const { t } = useTranslation("preise");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/preise",
  });

  const [calcOrders, setCalcOrders] = useState(300);
  const [calcCart,   setCalcCart]   = useState(30);
  const paypalFee  = calcOrders * 0.5 * (calcCart * 0.0299 + 0.39);
  const stripeFee  = calcOrders * 0.5 * (calcCart * 0.015  + 0.25);
  const totalFees  = Math.round(paypalFee + stripeFee);

  const heroPills = arr("hero.pills");
  const referralSteps = arr("referral.steps") as { num: string; title: string; text: string }[];
  const kasseFeatures = arr("kasse.features");
  const addonItems = arr("addonsKasse.items") as { badge: string; title: string; price: string; priceDetail: string; features: string[] }[];
  const integrationItems = arr("integration.items") as { title: string; text: string }[];
  const faqItems = arr("faq.items") as FaqItem[];
  const flyerFeatures = arr("addonsOrder.flyerFeatures");
  const ctaTrust = arr("cta.trust");

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a] text-[#0A264A] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-28 pb-20 md:pt-36 md:pb-28 px-5 md:px-8 lg:px-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-brand/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ED8400]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {t("hero.title1")}{" "}
              <span className="bg-gradient-to-r from-cyan-brand to-[#007DCF] bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              {t("hero.desc1")}
              {" "}{t("hero.desc2")}
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {heroPills.map((pill: string) => (
                <span key={pill} className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3 text-cyan-brand flex-shrink-0" />
                  {pill}
                </span>
              ))}
            </div>

            <Link
              to={lp("/kontakt")}
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-8 py-3.5 rounded-xl text-base shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── S2: PRICING CARDS (identical to homepage) ─────────── */}
      <SlimPricingSection />

      {/* ── S3: EMPFEHLUNGSPROGRAMM ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-14 md:py-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ED8400]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 px-4 py-1.5 rounded-full mb-5">
              <Gift className="w-4 h-4 text-[#ED8400]" strokeWidth={1.75} />
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest">{t("referral.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              <span className="bg-gradient-to-r from-[#ED8400] to-[#f5a623] bg-clip-text text-transparent">{t("referral.title1")}</span>{" "}
              {t("referral.title2")}
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
              {t("referral.desc")}
            </p>
          </motion.div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {referralSteps.map((step, i) => {
              const Icon = STEP_ICONS[i] || Gift;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white/[0.06] border border-white/10 rounded-2xl px-6 py-5 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#ED8400]/15 border border-[#ED8400]/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#ED8400]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-0.5">{t("referral.stepLabel")} {step.num}</span>
                    <h3 className="text-white font-black text-base mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Klarstellung + Kein Limit — nebeneinander */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-black text-xs mt-0.5">!</span>
              <p className="text-white/60 text-sm leading-relaxed">
                <span className="text-white font-semibold">{t("referral.notice")}</span>
                {t("referral.noticeText")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="bg-[#ED8400]/10 border border-[#ED8400]/20 rounded-2xl px-5 py-4 flex items-center gap-3"
            >
              <Infinity className="w-6 h-6 text-[#ED8400] flex-shrink-0" strokeWidth={2} />
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-white font-black">{t("referral.noLimit")}</span>{" "}
                {t("referral.noLimitText")}
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to={lp("/kontakt")}
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-[#ED8400]/25 hover:scale-[1.02] transition-transform"
            >
              {t("referral.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: BESTELLSYSTEM ADD-ONS ────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("addonsOrder.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              {t("addonsOrder.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl">
              {t("addonsOrder.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">

            {/* ── Karte 1: Transaktionsumlage-Rechner ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-cyan-brand" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-brand">{t("addonsOrder.txBadge")}</span>
              </div>
              <h3 className="text-[#0A264A] dark:text-white font-black text-xl mb-1">{t("addonsOrder.txTitle")}</h3>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-sm leading-relaxed mb-6">
                {t("addonsOrder.txDesc")}
              </p>

              {/* Mini-Rechner */}
              <div className="bg-white dark:bg-[#0d1a2d] border border-[#0A264A]/10 dark:border-white/10 rounded-xl p-5 mb-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A264A]/40 dark:text-white/35 mb-5">
                  {t("addonsOrder.calcLabel")}
                </p>
                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#0A264A]/60 dark:text-white/50">{t("addonsOrder.calcOrdersLabel")}</span>
                      <span className="font-bold text-[#0A264A] dark:text-white">{calcOrders}</span>
                    </div>
                    <input
                      type="range" min={50} max={2000} step={50} value={calcOrders}
                      onChange={(e) => setCalcOrders(Number(e.target.value))}
                      className="w-full accent-cyan-brand"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#0A264A]/60 dark:text-white/50">{t("addonsOrder.calcCartLabel")}</span>
                      <span className="font-bold text-[#0A264A] dark:text-white">{calcCart} €</span>
                    </div>
                    <input
                      type="range" min={10} max={80} step={1} value={calcCart}
                      onChange={(e) => setCalcCart(Number(e.target.value))}
                      className="w-full accent-cyan-brand"
                    />
                  </div>
                </div>
                <div className="bg-[#0A264A]/[0.06] dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10 rounded-lg p-4 mb-3">
                  <p className="text-[#0A264A]/50 dark:text-white/40 text-xs mb-1">{t("addonsOrder.calcResult")}</p>
                  <p className="text-3xl font-black text-[#0A264A] dark:text-white">~{totalFees.toLocaleString("de-DE")} €</p>
                </div>
                <div className="space-y-1 text-[11px] text-[#0A264A]/40 dark:text-white/35">
                  <p>{t("addonsOrder.calcPaypal")}</p>
                  <p>{t("addonsOrder.calcStripe")}</p>
                  <p className="text-cyan-brand font-medium pt-1">{t("addonsOrder.calcSaving")}</p>
                </div>
              </div>

              {/* Zahlungs-Logos + Link */}
              <div className="mt-auto space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { src: payPaypal,     alt: "PayPal",      h: "h-7"  },
                    { src: payStripe,     alt: "Stripe",      h: "h-5"  },
                    { src: payApple,      alt: "Apple Pay",   h: "h-7"  },
                    { src: payGoogle,     alt: "Google Pay",  h: "h-6"  },
                    { src: payVisa,       alt: "Visa",        h: "h-5"  },
                    { src: payMastercard, alt: "Mastercard",  h: "h-6"  },
                    { src: payKlarna,     alt: "Klarna",      h: "h-6"  },
                  ].map((p) => (
                    <img key={p.alt} src={p.src} alt={p.alt} className={`${p.h} object-contain opacity-70 hover:opacity-100 transition-opacity`} />
                  ))}
                </div>
                <Link to={lp("/produkte/add-ons/transaktionsumlage")} className="text-cyan-brand text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                  {t("addonsOrder.txMore")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* ── Karte 2: QR-Code Flyer ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-brand">{t("addonsOrder.flyerBadge")}</span>
              </div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="text-[#0A264A] dark:text-white font-black text-xl">{t("addonsOrder.flyerTitle")}</h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-[#ED8400] font-black text-2xl">{t("addonsOrder.flyerPrice")}</span>
                  <span className="text-[#0A264A]/40 dark:text-white/40 text-xs block">{t("addonsOrder.flyerPriceDetail")}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#0A264A]/5 dark:bg-white/5 mb-5 flex items-center justify-center p-2 h-[300px]">
                <img src={imgQrFlyer} alt="QR-Code Flyer" className="h-full w-auto object-contain scale-[1.05]" />
              </div>

              {/* Highlight */}
              <div className="bg-cyan-brand/10 border border-cyan-brand/20 rounded-xl px-4 py-3 mb-5">
                <p className="text-cyan-brand text-sm font-semibold">
                  {t("addonsOrder.flyerHighlight")}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {flyerFeatures.map((f: string) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#0A264A]/65 dark:text-white/60">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-brand" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <FlyerPriceList label={t("addonsOrder.flyerPricelistLabel")} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── S4: KASSENSYSTEM FEATURED ──────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("kasse.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              {t("kasse.title")}
            </h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              {t("kasse.desc")}
            </p>
            <p className="text-white/30 text-xs italic mt-2 max-w-xl mx-auto">
              {t("kasse.legalNote")}
            </p>
          </motion.div>

          <div className="rounded-3xl border border-cyan-brand/20 overflow-hidden bg-[#061830]">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="p-8 md:p-12"
              >
                <span className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {t("kasse.cardBadge")}
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-[#ED8400] font-black text-5xl leading-none">{t("kasse.price")}</span>
                  <span className="text-white/40 text-sm mb-1">{t("kasse.priceDetail")}</span>
                </div>
                <p className="text-white/35 text-xs mb-8">{t("kasse.priceSub")}</p>
                <ul className="space-y-3 mb-8">
                  {kasseFeatures.map((f: string) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-white/80 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={lp("/kontakt")}
                  className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform"
                >
                  {t("kasse.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="relative flex justify-center items-center p-8 md:p-12"
              >
                <div className="absolute inset-0 bg-[#007DCF]/10 blur-[80px] rounded-full scale-75 pointer-events-none" />
                <img
                  src={imgKasseHW}
                  alt={t("kasse.imgAlt")}
                  className="relative z-10 w-full max-w-sm drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5: KASSENSYSTEM ADD-ONS ─────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("addonsKasse.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              {t("addonsKasse.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl">
              {t("addonsKasse.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {addonItems.map((addon, i) => {
              const imgData = ADDON_IMAGES[i];
              if (!imgData) return null;
              return (
                <motion.div
                  key={addon.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl p-7 flex flex-col ${
                    imgData.dark
                      ? "bg-[#0A264A] border border-cyan-brand/20"
                      : "bg-white dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08]"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${imgData.dark ? "text-cyan-brand" : "text-cyan-brand"}`}>
                    {addon.badge}
                  </span>
                  <div className={imgData.imgWrapperClass}>
                    <img src={imgData.img} alt={addon.title} className={imgData.imgClass} />
                  </div>
                  <h3 className={`font-black text-lg mb-1 ${imgData.dark ? "text-white" : "text-[#0A264A] dark:text-white"}`}>
                    {addon.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`font-black text-xl ${imgData.dark ? "text-[#ED8400]" : "text-[#0A264A] dark:text-white"}`}>
                      {addon.price}
                    </span>
                    <span className={`text-xs ${imgData.dark ? "text-white/40" : "text-[#0A264A]/40 dark:text-white/40"}`}>
                      {addon.priceDetail}
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {(addon.features || []).map((f: string) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${imgData.dark ? "text-white/70" : "text-[#0A264A]/65 dark:text-white/60"}`}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-brand" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-[#0A264A]/35 dark:text-white/25 text-xs mt-8">
            {t("addonsKasse.footnote")}
          </p>
        </div>
      </section>

      {/* ── S6: SO ARBEITEN PRODUKTE ZUSAMMEN ──────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("integration.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              {t("integration.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl mx-auto">
              {t("integration.desc")}
            </p>
          </motion.div>

          {/* Integration visual */}
          <div className="relative">
            {/* Center hub */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-[#0A264A] dark:bg-[#0A264A] border border-cyan-brand/30 flex flex-col items-center justify-center shadow-xl shadow-[#0A264A]/20"
              >
                <Zap className="w-7 h-7 text-cyan-brand mb-0.5" strokeWidth={1.75} />
                <span className="text-white text-[9px] font-bold uppercase tracking-widest">{t("integration.hubLabel")}</span>
              </motion.div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrationItems.map((step, i) => {
                const Icon = INTEGRATION_ICONS[i] || Globe;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                  >
                    <Link
                      to={lp(INTEGRATION_HREFS[i] || "/")}
                      className={`block rounded-2xl border p-5 text-center hover:scale-[1.02] transition-transform ${INTEGRATION_COLORS[i] || ""}`}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0A264A]/10 dark:bg-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0A264A] dark:text-white" strokeWidth={1.75} />
                        </div>
                      </div>
                      <h3 className="text-[#0A264A] dark:text-white font-black text-sm mb-1.5">{step.title}</h3>
                      <p className="text-[#0A264A]/55 dark:text-white/45 text-xs leading-relaxed">{step.text}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Connector description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 bg-[#0A264A]/[0.04] dark:bg-[#0A264A]/40 border border-[#0A264A]/10 dark:border-cyan-brand/10 rounded-2xl p-6 flex items-center gap-4"
            >
              <Link2 className="w-8 h-8 text-cyan-brand flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[#0A264A] dark:text-white font-semibold text-sm mb-1">
                  {t("integration.connTitle")}
                </p>
                <p className="text-[#0A264A]/55 dark:text-white/45 text-xs leading-relaxed">
                  {t("integration.connDesc")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S7: PREIS-FAQ ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{t("faq.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              {t("faq.title")}
            </h2>
            <p className="text-white/50 text-base">
              {t("faq.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/10 overflow-hidden px-6"
          >
            {faqItems.map((item) => (
              <FaqAccordion key={item.q} item={item} lp={lp} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S8: CTA-ABSCHLUSS ─────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0a0f1a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#0A264A]/8 dark:bg-white/8 border border-[#0A264A]/10 dark:border-white/10 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {t("cta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              {t("cta.title")}
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg leading-relaxed mb-8">
              {t("cta.desc")}
            </p>

            <Link
              to={lp("/kontakt")}
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform mb-8"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {ctaTrust.map((item: string) => (
                <span key={item} className="flex items-center gap-1.5 text-[#0A264A]/50 dark:text-white/40 text-sm">
                  <Check className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PreisePage;
