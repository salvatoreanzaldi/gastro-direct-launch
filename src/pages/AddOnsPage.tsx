import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

import imgQrFlyer       from "@/assets/mockups/Mock Up - Flyer.png";
import imgFahrerApp     from "@/assets/addons/addon-frankfurt-gps.png";
import imgQrTisch       from "@/assets/addons/addon-qr-tischsystem.png";
import imgBildschirm    from "@/assets/addons/pickup-screen.jpeg";
import imgKiosk         from "@/assets/addons/selfordering-terminals.png";

// ─── Add-On-Daten ───────────────────────────────────────────────────────────
const ADD_ONS = [
  {
    icon: Printer,
    badge: "Marketing \u00B7 Top-Seller",
    title: "QR-Code Flyer",
    price: "ab 65 \u20AC / 2.500 St\u00FCck",
    desc: "Verwandle jeden Papierflyer in einen messbaren Bestell-Kanal. Ein Scan f\u00FChrt direkt in deinen Webshop oder deine App \u2014 ohne Lieferando-Provision, mit Live-Tracking pro Kampagne.",
    benefits: [
      "Erste 2.500 Flyer im Abo inklusive",
      "DIN-A6, doppelseitig, eigenes Branding",
      "Tracking pro Kampagne im Dashboard",
    ],
    href: "/add-ons/qr-code-flyer",
    image: imgQrFlyer,
    imageBg: "bg-[#0A264A]",
    imageFit: "object-contain p-6",
    compatibility: "Webshop \u00B7 App",
    accentColor: "from-amber-400/20 to-cyan-brand/10",
  },
  {
    icon: Truck,
    badge: "Lieferdienst",
    title: "Fahrer-App mit GPS",
    price: "+10 \u20AC / Monat pro Fahrer",
    desc: "Live-GPS-Tracking f\u00FCr jede Lieferung, automatische Routenoptimierung und Disposition direkt im Kassensystem. Kunden sehen, wo der Fahrer steht \u2014 dein Team f\u00E4hrt effizienter.",
    benefits: [
      "Echtzeit-GPS f\u00FCr alle Fahrer",
      "Automatische Routenoptimierung",
      "iOS- und Android-App f\u00FCr Fahrer",
    ],
    href: "/add-ons/fahrer-app-gps",
    image: imgFahrerApp,
    imageBg: "bg-white",
    imageFit: "object-contain p-3 scale-105",
    compatibility: "Kassensystem",
    accentColor: "from-cyan-brand/20 to-emerald-400/10",
  },
  {
    icon: QrCode,
    badge: "Tischservice",
    title: "QR-Code Tischsystem",
    price: "+50 \u20AC / 5 Tische, +5 \u20AC je weiterem",
    desc: "G\u00E4ste scannen am Tisch, w\u00E4hlen, bestellen, bezahlen \u2014 alles \u00FCber ihr Smartphone. Bestellung landet sofort in Kasse und K\u00FCche. Weniger Wartezeit, h\u00F6here Tischumschlagrate, +18 % Bon durch Upselling.",
    benefits: [
      "Bestellen ohne App-Installation",
      "Mehrsprachiges Men\u00FC (DE/EN/FR/IT/ES/TR)",
      "Direkt am Tisch bezahlen",
    ],
    href: "/add-ons/qr-code-tischsystem",
    image: imgQrTisch,
    imageBg: "bg-[#0A264A]",
    imageFit: "object-cover",
    compatibility: "Kassensystem",
    accentColor: "from-cyan-brand/20 to-purple-400/10",
  },
  {
    icon: Monitor,
    badge: "K\u00FCche & Theke",
    title: "Bildschirmfunktion",
    price: "Auf Anfrage",
    desc: "Pick-Up Screen f\u00FCr G\u00E4ste, K\u00FCchenmonitor f\u00FCr dein Team. Alle offenen Bestellungen in Echtzeit, farblich nach Warengruppe priorisiert, ohne Papierchaos. F\u00FCr Schnellrestaurants, B\u00E4ckereien, Food Courts.",
    benefits: [
      "Pick-Up Screen + K\u00FCchenmonitor",
      "Priorisierung nach Bestellzeit",
      "Counter, Freestanding & Outdoor",
    ],
    href: "/add-ons/bildschirmfunktion",
    image: imgBildschirm,
    imageBg: "bg-[#0A264A]",
    imageFit: "object-cover",
    compatibility: "Kassensystem",
    accentColor: "from-emerald-400/20 to-cyan-brand/10",
  },
  {
    icon: Hand,
    badge: "Self-Service \u00B7 Neu",
    title: "Self-Ordering Kiosk",
    price: "Auf Anfrage",
    desc: "Das Terminal \u00FCbernimmt die Theke. G\u00E4ste bestellen und bezahlen direkt am Touchscreen \u2014 mehrsprachig, mit aktivem Upselling, ohne Wartezeit. \u221250 % Wartezeit, +25 % Durchschnittsbon.",
    benefits: [
      "Touch-Bedienung in 6+ Sprachen",
      "Alle Zahlungsarten integriert",
      "Counter, Freestanding & Wandmontage",
    ],
    href: "/add-ons/kiosk",
    image: imgKiosk,
    imageBg: "bg-[#0A264A]",
    imageFit: "object-contain p-4",
    compatibility: "Kassensystem",
    accentColor: "from-amber-400/20 to-cyan-brand/10",
  },
];

// ─── Wertversprechen ────────────────────────────────────────────────────────
const VALUE_PROPS = [
  {
    icon: Puzzle,
    title: "Modular kombinierbar",
    desc: "Jedes Add-On l\u00E4uft eigenst\u00E4ndig \u2014 entfaltet seine volle Wirkung aber im Verbund mit Webshop, App oder Kassensystem.",
  },
  {
    icon: Layers,
    title: "Eine zentrale Verwaltung",
    desc: "Alle Add-Ons werden \u00FCber dein bestehendes Gastro-Master-Backoffice verwaltet \u2014 keine Drittanbieter, keine zus\u00E4tzlichen Logins.",
  },
  {
    icon: Sparkles,
    title: "Sofort einsatzbereit",
    desc: "Nach Buchung sind die Add-Ons in Stunden bis Tagen aktiv. Hardware-Add-Ons (Bildschirme, Kiosks) installieren wir auf Wunsch vor Ort.",
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Was sind Add-Ons bei Gastro Master?",
    a: "Add-Ons sind Erweiterungen f\u00FCr deine bestehende Gastro-Master-L\u00F6sung \u2014 [Webshop](/produkte/webshop), [App](/produkte/app) oder [Kassensystem](/produkte/kassensystem). Sie l\u00F6sen jeweils ein konkretes Problem (Marketing, Lieferdienst, Tischservice, K\u00FCchenmonitor, Self-Ordering) und sind voll integriert. Du buchst nur, was du wirklich brauchst.",
  },
  {
    q: "Welche Add-Ons sind aktuell verf\u00FCgbar?",
    a: "Aktuell live sind: [QR-Code Flyer](/add-ons/qr-code-flyer) (Marketing), [Fahrer-App mit GPS](/add-ons/fahrer-app-gps) (Lieferdienst), [QR-Code Tischsystem](/add-ons/qr-code-tischsystem) (Tischservice), [Bildschirmfunktion](/add-ons/bildschirmfunktion) (K\u00FCche & Theke) und [Self-Ordering Kiosk](/add-ons/kiosk) (Self-Service). Weitere Erweiterungen sind in Vorbereitung \u2014 das Sortiment w\u00E4chst kontinuierlich.",
  },
  {
    q: "Brauche ich f\u00FCr Add-Ons das Kassensystem?",
    a: "Kommt drauf an. Der QR-Code Flyer funktioniert mit Webshop oder App alleine. Die Add-Ons Fahrer-App, QR-Code Tischsystem, Bildschirmfunktion und Kiosk setzen das [Gastro-Master-Kassensystem](/produkte/kassensystem) voraus, weil sie Bestellungen direkt mit der Cloud-Kasse, dem K\u00FCchenmonitor und dem Pick-Up Screen synchronisieren.",
  },
  {
    q: "Was kosten die Add-Ons?",
    a: "Die Preise variieren je nach Funktion: Der QR-Code Flyer startet ab 65 \u20AC f\u00FCr 2.500 St\u00FCck (System inklusive im Abo). Fahrer-App kostet +10 \u20AC pro Monat pro Fahrer, QR-Code Tischsystem +50 \u20AC pro Monat f\u00FCr 5 Tische. Bildschirmfunktion und Self-Ordering Kiosk sind Hardware-abh\u00E4ngig und werden in einer kostenlosen Beratung individuell kalkuliert.",
  },
  {
    q: "Kann ich ein Add-On sp\u00E4ter wieder k\u00FCndigen oder erg\u00E4nzen?",
    a: "Ja. Add-Ons sind monatlich aktivierbar und k\u00FCndbar (Hardware ausgenommen). Du kannst zum Beispiel das QR-Code Tischsystem in der Hochsaison nutzen und im Winter pausieren \u2014 oder mit einem Kiosk starten und sp\u00E4ter weitere Terminals erg\u00E4nzen, wenn dein Betrieb w\u00E4chst.",
  },
  {
    q: "Wie schnell sind Add-Ons einsatzbereit?",
    a: "Software-Add-Ons (QR-Code Flyer, Fahrer-App, QR-Code Tischsystem) sind nach Buchung innerhalb weniger Stunden aktiv \u2014 du startest noch am gleichen Tag. Hardware-Add-Ons (Bildschirmfunktion, Kiosk) brauchen 2\u20134 Wochen f\u00FCr Lieferung, Konfiguration und Vor-Ort-Installation. Konkrete Zeitschiene besprechen wir in der kostenlosen Beratung.",
  },
];

// ─── Schemas ────────────────────────────────────────────────────────────────
const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Add-Ons", item: "https://gastro-master.de/add-ons" },
  ],
};

const SCHEMA_ITEMLIST = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Gastro Master Add-Ons \u2014 Erweiterungen f\u00FCr Gastronomie-Software",
  description: "Add-Ons f\u00FCr Webshop, App und Kassensystem von Gastro Master: QR-Code Flyer, Fahrer-App mit GPS, QR-Code Tischsystem, Bildschirmfunktion, Self-Ordering Kiosk und weitere Erweiterungen.",
  url: "https://gastro-master.de/add-ons",
  numberOfItems: ADD_ONS.length,
  itemListElement: ADD_ONS.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.title,
    url: `https://gastro-master.de${a.href}`,
  })),
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
    },
  })),
};

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

// ─── Add-On Card ─────────────────────────────────────────────────────────────
type AddOn = (typeof ADD_ONS)[number];

const AddOnCard = ({ a, delay = 0 }: { a: AddOn; delay?: number }) => {
  const Icon = a.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-3xl bg-card border border-border hover:border-cyan-brand/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Hero-Bild */}
      <Link to={a.href} className={`relative aspect-[16/10] ${a.imageBg} overflow-hidden block`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${a.accentColor} opacity-60 pointer-events-none`} />
        <img
          src={a.image}
          alt={a.title}
          loading="lazy"
          className={`w-full h-full ${a.imageFit} group-hover:scale-[1.03] transition-transform duration-500`}
        />
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/45 backdrop-blur text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <Icon className="w-3.5 h-3.5 text-cyan-brand" />
          {a.badge}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0A264A]/90 backdrop-blur text-[#0A264A] dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
          {a.price}
        </div>
      </Link>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-black text-2xl text-foreground mb-2 leading-snug group-hover:text-cyan-brand transition-colors">
          {a.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{a.desc}</p>

        <ul className="space-y-2 mb-6">
          {a.benefits.map(b => (
            <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
            <Plus className="w-3 h-3" />
            Kombinierbar mit {a.compatibility}
          </span>
          <Link
            to={a.href}
            className="inline-flex items-center gap-2 text-cyan-brand font-bold text-sm group-hover:gap-3 transition-all"
          >
            Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// ─── FAQ Section ─────────────────────────────────────────────────────────────
const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="bg-background section-padding">
      <div className="container-tight max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Häufige Fragen zu Add-Ons
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Antworten auf die Fragen, die uns Gastronomen aus Berlin, München, Hamburg, Köln, Frankfurt und Stuttgart am häufigsten zu unseren Erweiterungen stellen.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <h3 className="text-base">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <span className="font-bold text-foreground text-base leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {renderFaqLinks(item.a)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────
const AddOnsPage = () => {
  useSeoMeta({
    title: "Add-Ons f\u00FCr Gastro Master \u2014 Erweiterungen f\u00FCr Webshop, App & Kassensystem | Gastro Master",
    description:
      "Add-Ons f\u00FCr Gastro Master: QR-Code Flyer, Fahrer-App mit GPS, QR-Code Tischsystem, Bildschirmfunktion, Self-Ordering Kiosk und mehr. Modular kombinierbar, voll integriert in Cloud-Kasse, Webshop und App. F\u00FCr Restaurants, Lieferdienste, Caf\u00E9s, B\u00E4ckereien und Food Courts in Berlin, M\u00FCnchen, Hamburg, Frankfurt.",
    canonical: "https://gastro-master.de/add-ons",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ITEMLIST) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.14), transparent 70%)" }}
          />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-cyan-brand" />
                Add-Ons · Erweiterungen
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6">
                Add-Ons für Gastro Master —{" "}
                <span className="text-gradient-brand">gezielte Erweiterungen für deinen Betrieb</span>
              </h1>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                Ergänze deine bestehende Gastro-Master-Lösung um genau die Funktion, die deinem Betrieb fehlt. Vom{" "}
                <Link to="/add-ons/qr-code-flyer" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">
                  trackbaren QR-Code Flyer
                </Link>{" "}
                über{" "}
                <Link to="/add-ons/fahrer-app-gps" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">
                  Live-GPS-Tracking für Fahrer
                </Link>{" "}
                bis zum{" "}
                <Link to="/add-ons/kiosk" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">
                  Self-Ordering Kiosk
                </Link>{" "}
                — alle Add-Ons sind voll integriert in Webshop, App und{" "}
                <Link to="/produkte/kassensystem" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">
                  Cloud-Kasse
                </Link>.
              </p>
              <p className="text-white/40 text-base max-w-2xl mx-auto mb-10">
                Für Restaurants, Lieferdienste, Cafés, Bäckereien, Food Courts und Franchise-Konzepte.
              </p>

              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to="/kontakt"
                  className="bg-gradient-amber text-[#0A264A] font-bold px-5 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
                >
                  Kostenlose Beratung
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── GOOGLE REVIEWS (direkt nach Hero, wie auf den Detail-Seiten) ── */}
        <GoogleReviewsGrid />

        {/* ── WERTVERSPRECHEN ──────────────────────────────────────────────── */}
        <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
                Warum Add-Ons
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                Ein Ökosystem aus Spezialisten
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
                Jedes Add-On löst ein konkretes Problem im Tagesgeschäft — sauber integriert in das, was bei dir läuft.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {VALUE_PROPS.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl bg-card border border-border p-7 shadow-sm"
                  >
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

        {/* ── ADD-ON GRID ──────────────────────────────────────────────────── */}
        <section className="bg-background section-padding">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
                Alle Add-Ons
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                Alle Add-Ons im Überblick — jeweils mit klarem Mehrwert
              </h2>
              <p className="text-muted-foreground text-base mt-3 max-w-2xl">
                Wähle das Add-On, das deinem Betrieb gerade am meisten Hebel gibt. Du kannst jederzeit weitere ergänzen — ohne Neustart, ohne Datenmigration.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADD_ONS.map((a, i) => (
                <AddOnCard key={a.title} a={a} delay={(i % 2) * 0.07} />
              ))}
            </div>
          </div>
        </section>

        {/* ── KOMBINATION MIT KASSENSYSTEM ─────────────────────────────────── */}
        <section className="bg-[#0A264A] section-padding">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
                  Kombinationen
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                  Add-Ons entfalten ihre Wirkung im Verbund
                </h2>
                <p className="text-white/65 text-base leading-relaxed mb-6">
                  Die meisten Add-Ons setzen das{" "}
                  <Link to="/produkte/kassensystem" className="text-white underline underline-offset-2 hover:opacity-80">
                    Gastro-Master-Kassensystem
                  </Link>{" "}
                  voraus, weil sie Bestellungen, Bestellnummern und Küchenstatus in Echtzeit synchronisieren. Der QR-Code Flyer funktioniert auch mit{" "}
                  <Link to="/produkte/webshop" className="text-white underline underline-offset-2 hover:opacity-80">
                    Webshop
                  </Link>{" "}
                  oder{" "}
                  <Link to="/produkte/app" className="text-white underline underline-offset-2 hover:opacity-80">
                    Bestell-App
                  </Link>{" "}
                  alleine.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/produkte/kassensystem"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors"
                  >
                    Zum Kassensystem
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/produkte"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/[0.05] transition-colors"
                  >
                    Alle Produkte ansehen
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 gap-3"
              >
                {ADD_ONS.map(a => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.title}
                      to={a.href}
                      className="group flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] hover:border-cyan-brand/40 rounded-xl p-4 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-brand/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-sm font-bold leading-tight truncate group-hover:text-cyan-brand transition-colors">
                          {a.title}
                        </div>
                        <div className="text-white/45 text-xs mt-0.5 truncate">{a.compatibility}</div>
                      </div>
                    </Link>
                  );
                })}
                <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-dashed border-white/15 rounded-xl p-4 text-white/45 text-xs">
                  <Zap className="w-4 h-4" />
                  Weitere folgen
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── FINAL CTA — wie bei den Add-On-Detailseiten (Desktop=HomeTeamCTA, Mobile=CTASection) */}
        <div className="hidden md:block">
          <HomeTeamCTA />
        </div>
        <div className="md:hidden">
          <CTASection {...getCTAConfig("/add-ons")} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddOnsPage;
