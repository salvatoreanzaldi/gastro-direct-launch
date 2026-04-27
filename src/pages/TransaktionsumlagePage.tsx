import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useLangPath } from "@/components/LanguageLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2, Star,
  TrendingUp, Wallet, CreditCard, Percent,
  Banknote, Zap, Calculator, ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";

// ─── Assets ───────────────────────────────────────────────────────────────────
import payPaypalIcon  from "@/assets/logos/payment/Logo - PayPal Icon.png";
import payStripeBlack from "@/assets/logos/payment/Logo - Stripe Black.png";
import payVisa       from "@/assets/logos/payment/pay-visa.png";
import payMastercard from "@/assets/logos/payment/pay-mastercard.png";
import payApple      from "@/assets/logos/payment/Logo - Apple Pay.png";
import payGoogle     from "@/assets/logos/payment/pay-google.png";
import payKlarna     from "@/assets/logos/payment/pay-klarna.png";
import paymentScreen from "@/assets/addons/9 - Zahlungsmethoden.png";
import logoKojo      from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoIlSorriso from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoBurger    from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoArtemis   from "@/assets/logos/kunden/logo-artemis.png";
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";

// ─── Payment Logos (module-level, reused in both heroes) ─────────────────────
const PAYMENT_LOGOS_B = [
  { src: payPaypalIcon,   alt: "PayPal",      h: "h-14" },
  { src: payStripeBlack,  alt: "Stripe",      h: "h-10" },
  { src: payVisa,         alt: "Visa",        h: "h-10" },
  { src: payMastercard,   alt: "Mastercard",  h: "h-10" },
  { src: payApple,        alt: "Apple Pay",   h: "h-14" },
  { src: payGoogle,       alt: "Google Pay",  h: "h-10" },
  { src: payKlarna,       alt: "Klarna",      h: "h-10" },
] as const;

const TESTIMONIAL_LOGOS = [logoKojo, logoIlSorriso, logoBurger, logoArtemis];

// ─── JSON-LD Schema (bleibt statisch DE für SEO) ─────────────────────────────
const FAQ_ITEMS_SCHEMA = [
  {
    q: "Darf ich Kreditkartengebühren an Kunden weitergeben?",
    a: "Ja. In Deutschland und der EU ist das Weitergeben von Zahlungsgebühren als transparente Servicegebühr (Transaktionsumlage) zulässig, sofern sie beim Checkout klar ausgewiesen wird.",
  },
  {
    q: "Wie funktioniert eine Transaktionsumlage im Restaurant?",
    a: "Wenn ein Kunde bezahlt, wird die anfallende Gebühr automatisch als separater Posten auf den Bestellbetrag aufgeschlagen und beim Checkout transparent ausgewiesen.",
  },
  {
    q: "Was kostet PayPal für Gastronomen pro Transaktion?",
    a: "PayPal berechnet für Online-Zahlungen in Deutschland 2,99 % des Transaktionsbetrags zuzüglich 0,35 € pro Transaktion.",
  },
  {
    q: "Ist die Transaktionsumlage bei Kreditkarten legal?",
    a: "Ja. Kreditkartengebühren dürfen als transparente Umlage weitergegeben werden, solange sie beim Bestellvorgang klar sichtbar ausgewiesen sind.",
  },
  {
    q: "Welche Zahlungsarten können umgelegt werden?",
    a: "Alle gängigen Zahlungsarten sind abgedeckt: PayPal, Visa, Mastercard, Apple Pay, Google Pay und Klarna.",
  },
  {
    q: "Funktioniert die Transaktionsumlage auch bei mehreren Standorten?",
    a: "Ja. Die Transaktionsumlage lässt sich standortübergreifend einrichten.",
  },
  {
    q: "Muss ich ein eigenes PayPal- und Stripe-Konto haben?",
    a: "Ja. Zahlungen landen direkt auf deinem eigenen PayPal Business- und/oder Stripe-Konto.",
  },
];

const SCHEMA_PRODUCT = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Transaktionsumlage Gastronomie",
  "description": "Add-On für Gastronomen zum transparenten Weitergeben von Zahlungsgebühren (PayPal, Kreditkarte, Apple Pay, Google Pay, Klarna) an Kunden. Kompatibel mit Gastro Master Webshop und App.",
  "brand": { "@type": "Brand", "name": "Gastro Master" },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "seller": { "@type": "Organization", "name": "Gastro Master Deutschland" },
  },
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS_SCHEMA.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://gastro-master.de/" },
    { "@type": "ListItem", "position": 2, "name": "Produkte", "item": "https://gastro-master.de/produkte" },
    { "@type": "ListItem", "position": 3, "name": "Transaktionsumlage", "item": "https://gastro-master.de/produkte/add-ons/transaktionsumlage" },
  ],
};

// ─── Fee data per provider ────────────────────────────────────────────────────
const PROVIDERS = [
  {
    id: "paypal",      label: "PayPal",       logo: payPaypalIcon,
    rate: 0.0299, fixed: 0.35,
    source: { text: "PayPal Merchant Fees", url: "https://www.paypal.com/de/webapps/mpp/merchant-fees" },
  },
  {
    id: "kreditkarte", label: "Kreditkarte",  logo: payVisa,
    rate: 0.015,  fixed: 0.25,
    source: { text: "Stripe Pricing", url: "https://stripe.com/de/pricing" },
  },
  {
    id: "apple",       label: "Apple Pay",    logo: payApple,
    rate: 0.015,  fixed: 0.25,
    source: { text: "Stripe Pricing", url: "https://stripe.com/de/pricing" },
  },
  {
    id: "google",      label: "Google Pay",   logo: payGoogle,
    rate: 0.015,  fixed: 0.25,
    source: { text: "Stripe Pricing", url: "https://stripe.com/de/pricing" },
  },
  {
    id: "klarna",      label: "Klarna",       logo: payKlarna,
    rate: 0.0249, fixed: 0.25,
    source: { text: "Klarna Business (ca.)", url: "https://www.klarna.com/de/geschaft/" },
  },
] as const;

// Comparison table: 300 orders × 30 €
const TABLE_ROWS = [
  { provider: "PayPal",                logo: payPaypalIcon,  rate: "2,99 % + 0,35 €",      monthly: 374.10 },
  { provider: "Kreditkarte (Stripe)",  logo: payVisa,        rate: "1,50 % + 0,25 €",      monthly: 210.00 },
  { provider: "Apple Pay",             logo: payApple,       rate: "1,50 % + 0,25 €",      monthly: 210.00 },
  { provider: "Google Pay",            logo: payGoogle,      rate: "1,50 % + 0,25 €",      monthly: 210.00 },
  { provider: "Klarna",                logo: payKlarna,      rate: "ca. 2,49 % + 0,25 €",  monthly: 299.10 },
];

// ─── Team members (names stay constant) ──────────────────────────────────────
const TEAM_IMGS = [teamReneImg, teamSalvatoreImg, teamAndrejImg];
const TEAM_NAMES = ["René Ebert", "Salvatore Anzaldi", "Andrej Krutsch"];

const LANG_META = [
  { flag: "🇩🇪", color: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300" },
  { flag: "🇬🇧", color: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300" },
  { flag: "🇮🇹", color: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300" },
  { flag: "🇮🇷", color: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300" },
  { flag: "🇷🇺", color: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300" },
  { flag: "🇱🇰", color: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300" },
];

const FEATURE_ICONS = [Wallet, CreditCard, Percent, Banknote, TrendingUp, CheckCircle2, Zap];
const FEATURE_SIZES: ("lg" | "sm")[] = ["lg", "sm", "sm", "sm", "lg", "sm", "sm"];

// ─── renderFaqLinks ────────────────────────────────────────────────────────────
const renderFaqLinks = (text: string, lp: (p: string) => string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={lp(m[2])} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

// ─── FaqItem ──────────────────────────────────────────────────────────────────
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

// ─── Hero Variante B – Particle Canvas ──────────────────────────────────────
const HeroParticleVariant = () => {
  const { t } = useTranslation("transaktionsumlage");
  const lp = useLangPath();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    class Particle {
      x: number; y: number;
      directionX: number; directionY: number;
      size: number; color: string;
      constructor(x: number, y: number, dirX: number, dirY: number, size: number, color: string) {
        this.x = x; this.y = y;
        this.directionX = dirX; this.directionY = dirY;
        this.size = size; this.color = color;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius + this.size) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 5;
            this.y -= (dy / dist) * force * 5;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      particles = [];
      const n = (canvas!.height * canvas!.width) / 9000;
      for (let i = 0; i < n; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        particles.push(new Particle(x, y, (Math.random() * 0.4) - 0.2, (Math.random() * 0.4) - 0.2, size, "rgba(0, 125, 207, 0.85)"));
      }
    };

    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist = (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          if (dist < (canvas!.width / 7) * (canvas!.height / 7)) {
            const opacity = 1 - dist / 20000;
            const dxm = mouse.x !== null ? particles[a].x - mouse.x : Infinity;
            const dym = mouse.y !== null ? particles[a].y - mouse.y : Infinity;
            const dmouse = Math.sqrt(dxm * dxm + dym * dym);
            ctx!.strokeStyle = dmouse < mouse.radius
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 125, 207, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.fillStyle = "#0A264A";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => p.update());
      connect();
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.2 + 0.5, duration: 0.8, ease: "easeInOut" as const },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 text-center px-5 md:px-8 max-w-5xl mx-auto py-32">

        {/* Badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/25 mb-6 backdrop-blur-sm"
        >
          <Star className="h-4 w-4 text-cyan-brand fill-cyan-brand" />
          <span className="text-sm font-bold text-white/90">{t("hero.badge")}</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-10"
        >
          <span className="text-gradient-brand">{t("hero.title1")}</span>{t("hero.title2")}
        </motion.h1>

        {/* Subline */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/55 mb-8 leading-relaxed"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Payment Logos */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8 mb-10"
        >
          {PAYMENT_LOGOS_B.map(p => (
            <motion.img
              key={p.alt} src={p.src} alt={p.alt}
              className={`${p.h} object-contain`}
              animate={{ scale: 1.1, filter: "drop-shadow(0 0 0px rgba(0,125,207,0))" }}
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 10px rgba(0,125,207,0.9)) drop-shadow(0 0 24px rgba(0,125,207,0.5))" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <motion.button
            onClick={() => { window.location.href = lp("/kontakt"); }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55)" }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-3 md:px-8 md:py-4 bg-[#ED8400] text-white font-bold rounded-xl shadow-lg shadow-[#ED8400]/30 inline-flex items-center gap-2 text-base md:text-lg whitespace-nowrap"
          >
            {t("hero.cta")}
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ─── TeamCTA ─────────────────────────────────────────────────────────────────
const TeamCTA = () => {
  const { t } = useTranslation("transaktionsumlage");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % TEAM_IMGS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const roles = arr("teamCta.teamRoles") as string[];
  const langs = arr("teamCta.langs") as string[];
  if (!roles.length || !langs.length) return null;

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
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              {t("teamCta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              {t("teamCta.title")}
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">{t("teamCta.expectLabel")}</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              {t("teamCta.expectText")}
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              {t("teamCta.setupText")}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {langs.map((label, i) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${LANG_META[i]?.color ?? ""}`}
                >
                  <span className="text-lg leading-none">{LANG_META[i]?.flag}</span>
                  {label}
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
          <div className="relative min-h-[380px] lg:min-h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={TEAM_IMGS[current]}
                alt={TEAM_NAMES[current]}
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
                  <p className="text-white font-bold text-lg leading-tight">{TEAM_NAMES[current]}</p>
                  <p className="text-white/70 text-sm">{roles[current]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
              {TEAM_IMGS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
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
const TransaktionsumlagePage = () => {
  const { t, ready } = useTranslation("transaktionsumlage");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const [activeProvider, setActiveProvider] = useState(0);
  const [orders, setOrders] = useState(300);
  const [avgCart, setAvgCart] = useState(30);

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/add-ons/transaktionsumlage",
  });

  const provider = PROVIDERS[activeProvider];
  const monthlyFee = Math.round(orders * (avgCart * provider.rate + provider.fixed) * 100) / 100;
  const yearlyFee  = Math.round(monthlyFee * 12 * 100) / 100;
  const revenue    = orders * avgCart;

  const trustBar = arr("trustBar") as { value: string; label: string }[];
  const steps = arr("howItWorks.steps") as { num: string; title: string; text: string }[];
  const featureItems = arr("features.items") as { title: string; text: string }[];
  const quotes = arr("testimonials.quotes") as { initials: string; quote: string; name: string; restaurant: string }[];
  const stats = arr("testimonials.stats") as { value: string; label: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const webshopFeatures = arr("requirements.webshop.features") as string[];
  const appFeatures = arr("requirements.appWebshop.features") as string[];

  if (!ready || !trustBar.length) return null;

  return (
    <>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <HeroParticleVariant />

        {/* ── S2: TRUST BAR ─────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 md:gap-8 items-center">
            {trustBar.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1.5 leading-none">{s.value}</p>
                <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── S3: WIE ES FUNKTIONIERT ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 md:mb-28"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("howItWorks.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
                {t("howItWorks.title")}
              </h2>
              <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
                {t("howItWorks.desc")}{" "}
                <Link to={lp("/produkte/pakete/online-bestellshop")} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{t("howItWorks.descLinkShop")}</Link>
                {" "}{t("howItWorks.descMid")}{" "}
                <Link to={lp("/produkte/pakete/bestell-app")} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{t("howItWorks.descLinkApp")}</Link>
                {" "}{t("howItWorks.descEnd")}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, i) => (
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

        {/* ── S4: ERWEITERTER RECHNER ───────────────────────────────────────── */}
        <section className="bg-[#0A264A] relative overflow-hidden px-5 md:px-8 lg:px-16 py-24 md:py-36" id="rechner">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,125,207,0.18), transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">{t("calculator.badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                {t("calculator.title")}
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                {t("calculator.desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-8 md:p-12 shadow-xl shadow-black/30"
            >
              {/* Provider Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {PROVIDERS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProvider(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      activeProvider === i
                        ? "bg-cyan-brand border-cyan-brand text-white"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
                    }`}
                  >
                    <img src={p.logo} alt={p.label} className="h-4 object-contain" />
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-2">{t("calculator.ordersLabel")}</label>
                  <input
                    type="range" min={50} max={3000} step={50} value={orders}
                    onChange={(e) => setOrders(Number(e.target.value))}
                    className="w-full accent-cyan-brand mb-2"
                  />
                  <div className="text-3xl font-black text-white">{orders}</div>
                </div>
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-2">{t("calculator.avgCartLabel")}</label>
                  <input
                    type="range" min={10} max={80} step={1} value={avgCart}
                    onChange={(e) => setAvgCart(Number(e.target.value))}
                    className="w-full accent-cyan-brand mb-2"
                  />
                  <div className="text-3xl font-black text-white">{avgCart} €</div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                <div className="bg-white/[0.08] border border-white/15 rounded-2xl p-3 md:p-5 text-center">
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">{t("calculator.revenueLabel")}</p>
                  <p className="text-2xl md:text-3xl font-black text-white">{revenue.toLocaleString("de-DE")} €</p>
                </div>
                <div className="bg-red-500/[0.15] border border-red-500/30 rounded-2xl p-3 md:p-5 text-center">
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">{t("calculator.feesLabel")}</p>
                  <p className="text-2xl md:text-3xl font-black text-red-400">
                    {monthlyFee.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="bg-emerald-500/[0.12] border border-emerald-500/25 rounded-2xl p-3 md:p-5 text-center">
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">{t("calculator.savingsLabel")}</p>
                  <p className="text-2xl md:text-3xl font-black text-emerald-400">
                    {yearlyFee.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                  </p>
                </div>
              </div>

              {/* Source */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 text-white/40 text-xs">
                <span>
                  {provider.label}: {(provider.rate * 100).toFixed(2).replace(".", ",")} % + {provider.fixed.toFixed(2).replace(".", ",")} € pro Transaktion
                </span>
                <a
                  href={provider.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-brand transition-colors"
                >
                  {t("calculator.sourceLabel")} {provider.source.text} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-center">
                <p className="text-white/65 mb-6 text-base md:text-lg">
                  {t("calculator.savingsText1")}{" "}
                  <strong className="text-cyan-brand">
                    {yearlyFee.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                  </strong>{" "}
                  {t("calculator.savingsText2")}
                </p>
                <button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
                >
                  {t("calculator.cta")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── S5: VERGLEICHSTABELLE ─────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("comparison.badge")}</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
                  {t("comparison.title")}
                </h2>
                <p className="text-[#0A264A]/55 dark:text-white/45 text-base leading-relaxed mb-8">
                  {t("comparison.desc")}
                </p>
                <div className="overflow-x-auto rounded-2xl border border-[#0A264A]/10 dark:border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0A264A] text-white">
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-tl-2xl">{t("comparison.thProvider")}</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">{t("comparison.thFees")}</th>
                        <th className="text-right px-4 py-3 font-bold text-xs uppercase tracking-wider text-red-300">{t("comparison.thWithout")}</th>
                        <th className="text-right px-4 py-3 font-bold text-xs uppercase tracking-wider text-emerald-300 rounded-tr-2xl">{t("comparison.thWith")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map((row, i) => (
                        <tr key={row.provider} className={`${i % 2 === 0 ? "bg-[#0A264A]/[0.03] dark:bg-white/[0.03]" : "bg-white dark:bg-[#111111]"}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img src={row.logo} alt={row.provider} className="h-5 object-contain flex-shrink-0" />
                              <span className="text-[#0A264A] dark:text-white font-medium text-xs">{row.provider}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#0A264A]/55 dark:text-white/45 text-xs">{row.rate}</td>
                          <td className="px-4 py-3 text-right font-bold text-red-500 dark:text-red-400">
                            {row.monthly.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">0,00 €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#0A264A]/35 dark:text-white/25 text-xs mt-3 leading-relaxed">
                  {t("comparison.sources")}{" "}
                  <a href="https://www.paypal.com/de/webapps/mpp/merchant-fees" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-brand transition-colors">PayPal Merchant Fees</a>
                  {" "}·{" "}
                  <a href="https://stripe.com/de/pricing" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-brand transition-colors">Stripe Pricing</a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={paymentScreen}
                  alt="Alle Zahlungsmethoden – Transaktionsumlage Gastronomie"
                  className="w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S6: FEATURES / BENTO ─────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("features.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                {t("features.title")}
              </h2>
              <p className="text-white/55 mt-5 text-lg max-w-xl mx-auto">
                {t("features.desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featureItems.map((feat, i) => {
                const size = FEATURE_SIZES[i] ?? "sm";
                const Icon = FEATURE_ICONS[i] ?? Zap;
                const delay = i * 0.03;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                    className={`${size === "lg" ? "col-span-2" : "col-span-1"} bg-white/[0.07] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.10] transition-colors`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyan-brand/15 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <h3 className={`text-white font-bold mb-2 ${size === "lg" ? "text-lg" : "text-base"}`}>{feat.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{feat.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── S7: PREISE / VORAUSSETZUNGEN ──────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">{t("requirements.badge")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
                {t("requirements.title")}
              </h2>
              <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("requirements.desc")}
              </p>
            </motion.div>

            {/* Base packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#0A264A] border border-cyan-brand/20 p-8 md:p-10 mb-5 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("requirements.webshop.label")}</span>
                  <h3 className="text-white font-black text-2xl mb-2">{t("requirements.webshop.name")}</h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-[#ED8400] font-black text-4xl leading-none">{t("requirements.webshop.price")}</span>
                    <span className="text-white/40 text-sm mb-1">{t("requirements.webshop.priceSuffix")}</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {webshopFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => { window.location.href = lp("/produkte/pakete/online-bestellshop"); }} className="text-cyan-brand text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                    {t("requirements.webshop.link")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-white/10 md:pl-12 pt-8 md:pt-0">
                  <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("requirements.appWebshop.label")}</span>
                  <h3 className="text-white font-black text-2xl mb-2">{t("requirements.appWebshop.name")}</h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-[#ED8400] font-black text-4xl leading-none">{t("requirements.appWebshop.price")}</span>
                    <span className="text-white/40 text-sm mb-1">{t("requirements.appWebshop.priceSuffix")}</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {appFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => { window.location.href = lp("/produkte/pakete/bestell-app"); }} className="text-cyan-brand text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                    {t("requirements.appWebshop.link")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Add-on card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">{t("requirements.addon.label")}</span>
                  <h3 className="text-[#0A264A] dark:text-white font-black text-xl mb-2">{t("requirements.addon.name")}</h3>
                  <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                    {t("requirements.addon.desc")}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {PAYMENT_LOGOS_B.map(p => (
                      <img key={p.alt} src={p.src} alt={p.alt} className={`${p.h} object-contain opacity-70`} />
                    ))}
                  </div>
                </div>
                <motion.button
                  onClick={() => { window.location.href = lp("/kontakt"); }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  className="shrink-0 bg-[#ED8400] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#ED8400]/30 whitespace-nowrap inline-flex items-center gap-2"
                >
                  {t("requirements.addon.cta")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── S8: TESTIMONIALS ──────────────────────────────────────────────── */}
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
              {quotes.map((q, i) => (
                <motion.div
                  key={q.name}
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
                  <p className="text-white/70 text-base leading-relaxed mb-6 italic">"{q.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-brand/20 border border-cyan-brand/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-brand text-xs font-black">{q.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm">{q.name}</p>
                      <p className="text-white/40 text-xs">{q.restaurant}</p>
                    </div>
                    <img src={TESTIMONIAL_LOGOS[i]} alt={q.restaurant} className="h-6 object-contain opacity-50 flex-shrink-0" loading="lazy" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
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

        {/* ── S9: FAQ ───────────────────────────────────────────────────────── */}
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
                  {t("faq.desc")}
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

        {/* ── S10: TEAM CTA ─────────────────────────────────────────────────── */}
        <div className="hidden md:block">
          <TeamCTA />
        </div>

        {/* ── S10b: MOBILE CTA SECTION ──────────────────────────────────────── */}
        <div className="md:hidden">
          <CTASection {...getCTAConfig("/produkte/add-ons/transaktionsumlage")} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TransaktionsumlagePage;
