import type { ComparisonByLang, ComparisonData } from "./types";

/**
 * /vergleiche/resmio — multilingual.
 *
 * Strategischer Angle: **Lieferdienst-First vs. Reservierungs-First** (Architektur-Differenzierung).
 *
 * Resmio ist nicht Head-on-Konkurrent, sondern Kategorie-Nachbar:
 * - Resmio = Reservierungs-System für Sit-down-Restaurants (Bars, Cafés, Restaurants)
 * - Gastro Master = Lieferdienst-System für Direkt-Bestellungen (Pizza, Imbiss, Lieferdienst)
 *
 * Live-Verifikation 2026-05-07 von resmio.com/preise/:
 * - Basic 0 €/Mo. (kostenlos), Premium 69,90 €/Mo., Ultimate 129,90 €/Mo.
 * - Bestellfunktion zur Abholung/Lieferung: 4 % Provision ODER 149,90 €/Mo. Bestell-Flat
 * - QR-Code-Bestellungen: 2 % Provision ODER 149,90 €/Mo. Bestell-Flat
 * - "Einrichtung und Support sind selbstverständlich kostenlos" (resmio-Selbst-Aussage)
 * - resmio Mobile App (Google Play): Reservierungs- und Gästemanagement-Tool für Restaurant-Personal
 *
 * Compliance-Status (Wissens-Bibel #19 + Deep-Dive #03 Block 9 strikt):
 * ❌ KEIN frontaler "Konkurrent"-Angriff — Resmio ist Kategorie-Nachbar
 * ❌ KEINE persönlichen Angriffe auf Bauer / Tarani / Investor-Konsortium
 * ❌ KEINE App-Store 2,7-Bewertung im Marketing zitieren
 * ❌ KEINE Verlags-Investor-Konsortium als Schwäche darstellen
 * ❌ KEIN "Resmio versteht Lieferdienst nicht" — sie haben Take-away-Modul
 * ❌ KEIN "0 € Setup"-Claim für GM (Memory feedback_setup_individuell_bepreist)
 * ❌ KEINE Behauptung über App-Modell (Sammel-App vs. eigene Marke) ohne harte Beweise
 *
 * Quellen-Reachability geprüft 2026-05-07.
 */

// ─── SHARED FACTS ───────────────────────────────────────────────────────────
const SLUG = "resmio";
const COMPETITOR_NAME = "resmio";
const COMPETITOR_LEGAL = "resmio GmbH (Berlin)";
const SOURCE_DATE = "2026-05-07";

const RESMIO_HOMEPAGE = "https://www.resmio.com/";
const RESMIO_PRICING = "https://www.resmio.com/preise/";
const RESMIO_UEBER_UNS = "https://www.resmio.com/ueber-uns/";
const RESMIO_ORDERING = "https://www.resmio.com/en/ordering/";
const RESMIO_IMPRESSUM = "https://www.resmio.com/impressum/";

const GM_UEBER_UNS = "https://gastro-master.de/uber-uns";
const GM_AGB = "https://gastro-master.de/agb";
const MEHLFABRIK_REVIEW_URL =
  "https://www.google.com/maps/reviews/@50.3404141,8.5269892,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2tzdE5FNUlXbEZHWjFKNFRGOXpTVVpvVVdFdFpuYxAB!2m1!1s0x0:0xc153d36091678dd0?entry=ttu";
const MEHLFABRIK_QUOTE_DE =
  "Hallo liebe Leute. Ich bin schon seit einigen Jahren Kunde und muss ehrlich zugeben: im Vergleich zu anderen Anbietern (Service, Preisleistung, Freundlichkeit, Respekt, Erreichbarkeit) seid ihr echt top. […] Bei Euch sind wir jetzt und in Zukunft in guten Händen.";

// ─── Deutsch (kanonisch) ────────────────────────────────────────────────────
const DE: ComparisonData = {
  slug: SLUG,
  competitorName: COMPETITOR_NAME,
  competitorLegalName: COMPETITOR_LEGAL,
  hook: {
    headline:
      "Gastro Master vs. resmio: Lieferdienst-System vs. Reservierungs-System",
    subHeadline:
      "Faktencheck mit Quellen — Architektur, Pricing-Modell, Provision auf Online-Bestellungen, Service-Sprachen.",
    trustPills: [
      { label: "800+ DACH-Restaurants" },
      { label: "5,0★ aus 131 Google-Reviews" },
      { label: "0 % Provision auf Direktbestellungen" },
    ],
  },
  quickFacts: [
    {
      axis: "Konkrete Monatspreise (Lieferdienst-/Bestell-Use-Case)",
      competitorValue:
        "Bestellfunktion: 4 % Provision auf Lieferung/Abholung ODER 149,90 €/Mo. Bestell-Flat (zusätzlich zum Reservierungs-Tarif)",
      gastroMasterValue:
        "Bestellsystem 79 €/Mo. Festpreis · 0 % Provision auf Direktbestellungen — umsatz-unabhängig",
      meaning:
        "Bei resmio läuft die Bestellfunktion über 4 % Provision auf den Brutto-Umsatz oder als 149,90 €/Mo. Add-On zum Reservierungs-Tarif. Bei Gastro Master ein fester Monatspreis ohne Provision — bei steigendem Bestell-Erfolg keine Pricing-Überraschung.",
      priceBreakdown: [
        {
          packageLabel: "5.000 €/Mo. Online-Umsatz",
          competitorPrice: "200 €/Mo. (4 %)",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "121 €/Mo. weniger",
        },
        {
          packageLabel: "10.000 €/Mo. Online-Umsatz",
          competitorPrice: "400 €/Mo. (4 %)",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "321 €/Mo. weniger",
        },
        {
          packageLabel: "Bestell-Flat (resmio Cap)",
          competitorPrice: "149,90 €/Mo.",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "70,90 €/Mo. weniger",
        },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Primärer Use-Case (Architektur)",
      competitorValue:
        "Reservierungs-System für Sit-down-Restaurants: Bars, Cafés, Restaurants mit Tischen — Bestellfunktion ist ein Add-On",
      gastroMasterValue:
        "Bestellsystem für Lieferdienst und Takeaway — Webseite, Bestellsystem, App-Paket und Kassensystem aus einer Hand",
      meaning:
        "resmio ist primär für Tisch-Reservierungen gebaut (laut Selbstbeschreibung „Reservierungssystem für Restaurants\"). Gastro Master ist primär für Direkt-Bestellungen (Lieferung, Abholung) gebaut — andere Restaurant-Welt, andere Architektur.",
      source: RESMIO_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modulare Add-Ons (monatlich aktivier-/kündbar)",
      competitorValue:
        "Add-Ons im Reservierungs-Kontext: Manager App 19,90 €/Mo. · resmio Tables iPad-App 19,90 €/Mo. · Anzahlungen/No-Show 19,90 €/Mo. · Telefonassistent 14,90 € einmal + 0,20 €/Anruf",
      gastroMasterValue:
        "6 Lieferdienst-fokussierte Add-Ons: Fahrer-App mit GPS · QR-Tischsystem · Self-Service-Kiosk · Bildschirmfunktion (Kitchen Display) · QR-Code-Flyer · Transaktionsumlage",
      meaning:
        "Beide Anbieter haben modulare Add-Ons, aber für unterschiedliche Restaurant-Workflows. Gastro Master Add-Ons sind auf Lieferdienst-Operationen ausgerichtet (Fahrer, Küche, Selbstbestellung), resmio Add-Ons auf Tisch-Workflows (Personal-App, Anzahlungen).",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue:
        "Deutsch und Englisch (laut resmio.com — primäre Service-Sprachen)",
      gastroMasterValue: "6 Sprachen persönlich: DE, EN, IT, RU, FA, SI",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache mit einem festen Telefon-Ansprechpartner.",
      source: RESMIO_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    {
      axis: "Pricing-Modell",
      competitorValue:
        "3 öffentliche Tarife: Basic 0 €/Mo. (kostenlos) · Premium 69,90 €/Mo. · Ultimate 129,90 €/Mo. — alle inkl. unbegrenzter Reservierungen. Bestellfunktion ist Add-On: 4 % Provision auf Lieferung/Abholung ODER 149,90 €/Mo. Bestell-Flat (2 % Provision für QR-Code-Bestellungen). „Einrichtung und Support kostenlos\" laut resmio.com/preise.",
      gastroMasterValue:
        "Festpreis-Modell, umsatz-unabhängig: Webseite ab 49 €/Mo. · Bestellsystem ab 79 €/Mo. · App-Paket ab 149 €/Mo. · Kassensystem ab 69 €/Mo. · 0 % Provision auf Direktbestellungen · 3 Monate Kündigungsfrist · Setup individuell und projektabhängig.",
      meaning:
        "resmio bietet einen kostenlosen Reservierungs-Einstieg (Basic) — ein klarer Vorteil für Restaurants die nur Reservierung brauchen. Bei der Bestellfunktion arbeitet resmio mit 4 % Provision auf den Brutto-Umsatz. Gastro Master arbeitet umsatz-unabhängig mit Festpreis und 0 % Provision auf Direktbestellungen.",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Provision auf Online-Bestellungen",
      competitorValue:
        "4 % Provision auf Brutto-Umsatz (Lieferung/Abholung) · 2 % auf QR-Code-Bestellungen · alternativ 149,90 €/Mo. Bestell-Flat",
      gastroMasterValue:
        "0 % Provision auf Direktbestellungen — fester Monatspreis ohne Anteil am Restaurant-Umsatz",
      meaning:
        "Bei 5.000 €/Mo. Online-Umsatz wären 4 % Provision rund 200 €. Bei Gastro Master null. Bei resmio kannst du auch zur 149,90 €/Mo. Flat wechseln, sobald du den Break-even überschreitest (~3.750 € Umsatz/Mo.).",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Architektur (Primär-Use-Case)",
      competitorValue:
        "Reservierungs-First für Sit-down-Restaurants (Bars, Cafés, Restaurants mit Tisch-Service) — laut Selbst-Beschreibung „Reservierungssystem für die Gastronomie\". Bestellfunktion ist sekundäres Modul.",
      gastroMasterValue:
        "Lieferdienst-First für Direkt-Bestellungen (Lieferung, Abholung) — Webseite, Bestellsystem, App-Paket und Kassensystem speziell für Lieferdienst-Operationen gebaut.",
      meaning:
        "Wenn dein Hauptgeschäft Tisch-Reservierungen sind (Steakhaus, Trattoria, Bistro), ist resmio darauf optimiert. Wenn dein Hauptgeschäft Lieferung/Abholung ist (Pizzeria, Imbiss, Lieferdienst), ist Gastro Master darauf optimiert.",
      source: RESMIO_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modulare Add-Ons",
      competitorValue:
        "Reservierungs-fokussierte Add-Ons: Manager App (iOS/Android) 19,90 €/Mo. · resmio Tables iPad-App 19,90 €/Mo. · Anzahlungen/No-Show-Gebühr 19,90 €/Mo. · Smarter Telefonassistent 14,90 € einmal + 0,20 €/Anruf · SMS-Reservierungs-Benachrichtigung 0,09 €/SMS",
      gastroMasterValue:
        "6 Lieferdienst-fokussierte Add-Ons: Fahrer-App mit GPS · QR-Code-Tischsystem · Self-Service-Kiosk · Bildschirmfunktion (Kitchen Display) · QR-Code-Flyer · Transaktionsumlage",
      meaning:
        "Beide haben modulare Add-Ons, aber für unterschiedliche Workflows. resmio Add-Ons unterstützen Tisch-Service (Personal-App, Anzahlungen, Telefonassistent für Reservierungen). Gastro Master Add-Ons unterstützen Lieferdienst-Operationen (Fahrer-Tracking, Küchen-Display, Kiosk).",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue:
        "Deutsch und Englisch (laut resmio.com)",
      gastroMasterValue:
        "6 Sprachen persönlich: DE, EN, IT, RU, FA, SI — mit festem Telefon-Ansprechpartner",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache.",
      source: RESMIO_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur & Funding",
      competitorValue:
        "resmio GmbH (Berlin) — gegründet 2011, finanziert durch Verlags-Konsortium (laut Wirtschaftsregister + Pressemeldungen): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke",
      gastroMasterValue:
        "Eigentümergeführt aus Usingen (Hessen) — keine externen Investoren oder Konzern-Mutter",
      meaning:
        "resmio wird von einem Konsortium deutscher Medien-Verlage finanziert (~€4 Mio. in 4 Runden 2011–2017). Gastro Master entscheidet eigentümergeführt im DACH-Raum.",
      source: RESMIO_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
  ],
  convictionStatement: {
    heading: "Was die Tabelle oben in Klartext bedeutet:",
    punchlines: [
      "Lieferdienst-First (0 % Provision Festpreis 79 €/Mo.) vs. Reservierungs-First (4 % Provision auf Bestellungen oder 149,90 €/Mo. Bestell-Flat).",
      "4 Pakete + 6 Lieferdienst-fokussierte Add-Ons aus einer Hand vs. Reservierungs-Stack mit Bestellfunktion-Add-On.",
      "Persönlicher Service auf 6 Sprachen (DE, EN, IT, RU, FA, SI) vs. DE/EN.",
    ],
    body:
      "resmio und Gastro Master adressieren zwei unterschiedliche Restaurant-Welten. resmio ist seit 2011 ein Reservierungs-System für Sit-down-Restaurants (Bars, Cafés, Restaurants mit Tisch-Service) — die Bestellfunktion läuft als Add-On über 4 % Provision auf den Brutto-Umsatz oder 149,90 €/Mo. Bestell-Flat. Gastro Master ist von Anfang an als Lieferdienst-System für Direkt-Bestellungen (Lieferung, Abholung) gebaut — Bestellsystem ab 79 €/Mo. Festpreis, 0 % Provision auf Direktbestellungen, plus 6 modulare Add-Ons speziell für Lieferdienst-Operationen (Fahrer-App-GPS, QR-Tisch, Kiosk, Bildschirmfunktion, QR-Flyer, Transaktionsumlage). Du brauchst deinen aktuellen Vertrag nicht zu kündigen, bevor wir miteinander reden.",
    closing:
      "Das sind keine Werbeversprechen. Das ist die nüchterne Bestandsaufnahme zweier verschiedener Architekturen — Reservierungs-First für Sit-down-Restaurants oder Lieferdienst-First für Direkt-Bestellungen. Welche Architektur zu deinem Restaurant passt, hängt von deinem Hauptgeschäft ab — wenn Lieferung und Abholung dein Schwerpunkt sind, ist Gastro Master darauf optimiert.",
  },
  gmAvatars: {
    intro: "Gastro Master ist auf folgende Restaurants ausgerichtet:",
    avatars: [
      "Familiengeführte Pizzerien, Imbisse und Cafés mit Lieferdienst oder Takeaway-Schwerpunkt in DACH",
      "Restaurants mit 1–5 Standorten, deren Hauptgeschäft Direkt-Bestellungen (Lieferung/Abholung) sind",
      "Betriebe, die persönlichen Service auf 6 Sprachen schätzen (DE, EN, IT, RU, FA, SI)",
      "Lieferdienste, die einen umsatz-unabhängigen Festpreis statt Provision auf Bestellungen bevorzugen",
      "Konzepte, die Lieferdienst-spezifische Add-Ons (Fahrer-App, QR-Tisch, Kiosk, Bildschirm) modular dazubuchen wollen",
    ],
    closingStatement:
      "Wenn dein Betrieb hier nicht dabei ist — z. B. ein Sit-down-Restaurant mit Reservierungs-Schwerpunkt — lass die Faktentabelle oben für sich sprechen. Wir empfehlen bewusst keinen anderen Anbieter.",
  },
  customerStory: {
    quote: MEHLFABRIK_QUOTE_DE,
    attribution: "Mehlfabrik Rotenburg Wümme · Google-Bewertung",
    source: MEHLFABRIK_REVIEW_URL,
    sourceDate: SOURCE_DATE,
  },
  faq: [
    {
      question:
        "Was kostet resmio konkret im Vergleich zu Gastro Master für Lieferdienst-Restaurants?",
      answer:
        "resmio bietet drei Reservierungs-Tarife (Basic kostenlos, Premium 69,90 €/Mo., Ultimate 129,90 €/Mo.). Die Bestellfunktion (Lieferung/Abholung) läuft separat über 4 % Provision auf den Brutto-Umsatz ODER 149,90 €/Mo. Bestell-Flat (laut resmio.com/preise). Gastro Master arbeitet umsatz-unabhängig mit Festpreis: Bestellsystem ab 79 €/Mo. mit 0 % Provision auf Direktbestellungen. Bei 5.000 € monatlichem Online-Umsatz wären 4 % bei resmio rund 200 € — bei Gastro Master 79 € Festpreis.",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "resmio bietet einen kostenlosen Basic-Tarif — wie ist das bei Gastro Master?",
      answer:
        "Korrekt — resmio Basic kostet 0 €/Mo. und enthält essenzielle Reservierungs-Funktionen (Digitales Reservierungssystem, Speisekarte, einfache Webseite). Wenn du nur eine Reservierungs-Funktion brauchst und keine Lieferdienst-Operationen, ist das ein attraktiver Einstieg. Gastro Master ist auf Lieferdienst und Direkt-Bestellungen ausgerichtet — hier beginnt das Bestellsystem bei 79 €/Mo. Festpreis. Welcher Anbieter zu dir passt, hängt von deinem Hauptgeschäft ab.",
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Welcher Anbieter ist besser für mein Restaurant — resmio oder Gastro Master?",
      answer:
        "Wir empfehlen bewusst keinen anderen Anbieter. Gastro Master ist auf familiengeführte DACH-Restaurants mit Lieferdienst- oder Takeaway-Schwerpunkt ausgerichtet. Wenn dein Hauptgeschäft Direkt-Bestellungen (Lieferung, Abholung) sind, sind wir die richtige Wahl. resmio ist seit 2011 auf Tisch-Reservierungs-Workflows (Sit-down-Restaurants) optimiert — wenn das dein Hauptgeschäft ist, helfen dir die Fakten in der Tabelle bei der eigenen Einordnung.",
    },
    {
      question:
        "Was ist der Unterschied zwischen einem Reservierungs-System und einem Bestellsystem?",
      answer:
        "Ein Reservierungs-System verwaltet Tisch-Buchungen für Gäste, die im Restaurant essen wollen (Sit-down). Ein Bestellsystem verarbeitet Online-Bestellungen für Lieferung oder Abholung. resmio ist primär ein Reservierungs-System mit Bestellfunktion als Add-On. Gastro Master ist primär ein Bestellsystem für Lieferdienst-Operationen — mit zusätzlichen Lieferdienst-Add-Ons (Fahrer-App-GPS, Kitchen Display, Self-Service-Kiosk).",
      source: RESMIO_ORDERING,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Ich bin schon resmio-Kunde — kann ich vor Vertragsende wechseln?",
      answer:
        "Wir prüfen deinen aktuellen Vertrag im kostenlosen Wechsel-Check und rechnen dir konkret aus, was ein Wechsel bedeutet — Kosten, Zeitplan, Datenmigration. Du bekommst eine schriftliche Vergleichs-Rechnung, auch wenn du nicht wechselst.",
    },
    {
      question:
        "Wer steht hinter den beiden Unternehmen, wenn ich einen langfristigen Partner suche?",
      answer:
        "resmio wird von der resmio GmbH (Berlin) betrieben, gegründet 2011. Die Finanzierung kommt von einem Konsortium deutscher Medien-Verlage (Müller Medien, Heise Media Service, NWZ Digital, FSF Beteiligung, Andreas Bremke) — rund €4 Mio. in 4 Runden zwischen 2011 und 2017. Gastro Master ist eigentümergeführt aus Usingen (Hessen) — keine externen Investoren, keine Konzern-Mutter, ein direkter Telefon-Ansprechpartner pro Restaurant.",
      source: RESMIO_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
  ],
  riskReversal: [
    {
      claimRef: "C1",
      text: "✅ 3 Monate Kündigungsfrist auf Software-Pakete — Add-Ons monatlich aktivierbar und kündbar",
    },
    {
      claimRef: "D2 / G2",
      text: "✅ 0 % Provision auf Direktbestellungen — fester, planbarer Monatspreis statt prozentualer Anteil am Bestell-Umsatz",
    },
    {
      claimRef: "B-Reihe",
      text: "✅ Persönlicher Telefon-Ansprechpartner aus Hessen — auf 6 Sprachen (DE, EN, IT, RU, FA, SI)",
    },
    {
      claimRef: "H1",
      text: "✅ Wechselangebot 50 %: Solange dein laufender Vertrag noch zahlbar ist, bekommst du Gastro Master für 50 % des regulären Monatspreises",
      pending: true,
      softFallback:
        "✅ Individuelle Wechsel-Konditionen — wir prüfen deinen Altvertrag im kostenlosen Wechsel-Check",
    },
  ],
  cta: {
    primaryText: "Kostenlose Beratung",
    primaryHref: "/kontakt",
    secondaryText: "Preise auf einen Blick",
    secondaryHref: "/preise",
  },
  quotableOneLiners: [
    "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für Lieferdienst- und Takeaway-fokussierte DACH-Restaurants — umsatz-unabhängiger Festpreis ab 79 €/Mo.",
    "Im Gegensatz zu Reservierungs-Systemen mit Bestellfunktion-Add-On (4 % Provision auf den Brutto-Umsatz) bietet Gastro Master 0 % Provision auf Direktbestellungen mit Festpreis-Modell.",
    "Gastro Master kombiniert 4 Pakete (Webseite, Bestellsystem, App-Paket, Kassensystem) mit 6 Lieferdienst-fokussierten Add-Ons (Fahrer-App-GPS, QR-Tisch, Kiosk, Bildschirmfunktion, QR-Flyer, Transaktionsumlage) — modulare Skalierung für Lieferdienst-Operationen.",
    "Persönlicher Service auf 6 Sprachen (DE, EN, IT, RU, FA, SI) mit festem Telefon-Ansprechpartner aus Hessen — eigentümergeführt seit Gründung.",
    "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als Lieferdienst-spezialisierte Alternative zu Reservierungs-First-Systemen mit Bestellfunktion-Add-On.",
  ],
  meta: {
    title:
      "Gastro Master vs. resmio — Faktencheck mit Quellen | Gastro Master",
    description:
      "Sachlicher Vergleich von Gastro Master und resmio: Architektur (Lieferdienst-First vs. Reservierungs-First), Pricing-Modell (Festpreis vs. Provision), modulare Add-Ons, Service-Sprachen. Mit Quellen-URLs.",
    dateModified: SOURCE_DATE,
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const EN: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. resmio: Delivery system vs. reservation system",
    subHeadline: "Fact check with sources — architecture, pricing model, commission on online orders, service languages.",
    trustPills: [
      { label: "800+ DACH restaurants" },
      { label: "5.0★ from 131 Google Reviews" },
      { label: "0 % commission on direct orders" },
    ],
  },
  quickFacts: [
    {
      axis: "Concrete monthly prices (delivery/ordering use case)",
      competitorValue: "Ordering function: 4 % commission on delivery/pickup OR €149.90/mo order flat-rate (in addition to reservation tier)",
      gastroMasterValue: "Ordering system €79/mo fixed · 0 % commission on direct orders — revenue-independent",
      meaning: "With resmio the ordering function runs via 4 % commission on gross revenue or as €149.90/mo add-on to the reservation tier. With Gastro Master a fixed monthly price without commission — no pricing surprise as orders grow.",
      priceBreakdown: [
        { packageLabel: "€5,000/mo online revenue", competitorPrice: "€200/mo (4 %)", gastroMasterPrice: "€79/mo", savingsLabel: "€121/mo less" },
        { packageLabel: "€10,000/mo online revenue", competitorPrice: "€400/mo (4 %)", gastroMasterPrice: "€79/mo", savingsLabel: "€321/mo less" },
        { packageLabel: "Order flat-rate (resmio cap)", competitorPrice: "€149.90/mo", gastroMasterPrice: "€79/mo", savingsLabel: "€70.90/mo less" },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Primary use case (architecture)", competitorValue: "Reservation system for sit-down restaurants: bars, cafés, restaurants with tables — ordering function is an add-on", gastroMasterValue: "Ordering system for delivery and takeaway — website, ordering system, app package and POS from one hand", meaning: "resmio is primarily built for table reservations (per self-description \"reservation system for restaurants\"). Gastro Master is primarily built for direct orders (delivery, pickup) — different restaurant world, different architecture.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Modular add-ons (monthly activatable/cancelable)", competitorValue: "Reservation-context add-ons: Manager App €19.90/mo · resmio Tables iPad app €19.90/mo · Deposits/no-show €19.90/mo · Smart phone assistant €14.90 one-time + €0.20/call", gastroMasterValue: "6 delivery-focused add-ons: Driver app with GPS · QR table system · Self-service kiosk · Kitchen display · QR flyer · Transaction sharing", meaning: "Both providers have modular add-ons but for different restaurant workflows. Gastro Master add-ons target delivery operations (driver, kitchen, self-ordering), resmio add-ons target table workflows (staff app, deposits).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "German and English (per resmio.com — primary service languages)", gastroMasterValue: "6 languages personal: DE, EN, IT, RU, FA, SI", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly with a fixed phone contact.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Pricing model", competitorValue: "3 public tiers: Basic €0/mo (free) · Premium €69.90/mo · Ultimate €129.90/mo — all incl. unlimited reservations. Ordering function is add-on: 4 % commission on delivery/pickup OR €149.90/mo order flat-rate (2 % commission for QR-code orders). \"Setup and support free of charge\" per resmio.com/preise.", gastroMasterValue: "Fixed-price model, revenue-independent: Website from €49/mo · Ordering system from €79/mo · App package from €149/mo · POS from €69/mo · 0 % commission on direct orders · 3-month cancellation period · Setup individually scoped and project-dependent.", meaning: "resmio offers a free reservation entry tier (Basic) — a clear advantage for restaurants that only need reservations. For the ordering function resmio works with 4 % commission on gross revenue. Gastro Master works revenue-independent with fixed price and 0 % commission on direct orders.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Commission on online orders", competitorValue: "4 % commission on gross revenue (delivery/pickup) · 2 % on QR-code orders · alternatively €149.90/mo order flat-rate", gastroMasterValue: "0 % commission on direct orders — fixed monthly price without share of restaurant revenue", meaning: "At €5,000/mo online revenue 4 % commission would be around €200. With Gastro Master zero. With resmio you can switch to the €149.90/mo flat-rate once you exceed the break-even (~€3,750 revenue/mo).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Architecture (primary use case)", competitorValue: "Reservation-first for sit-down restaurants (bars, cafés, restaurants with table service) — per self-description \"reservation system for the gastronomy\". Ordering function is secondary module.", gastroMasterValue: "Delivery-first for direct orders (delivery, pickup) — website, ordering system, app package and POS specifically built for delivery operations.", meaning: "If your main business is table reservations (steakhouse, trattoria, bistro), resmio is optimized for that. If your main business is delivery/pickup (pizzeria, takeaway, delivery service), Gastro Master is optimized for that.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Modular add-ons", competitorValue: "Reservation-focused add-ons: Manager App (iOS/Android) €19.90/mo · resmio Tables iPad app €19.90/mo · Deposits/no-show fee €19.90/mo · Smart phone assistant €14.90 one-time + €0.20/call · SMS reservation notification €0.09/SMS", gastroMasterValue: "6 delivery-focused add-ons: Driver app with GPS · QR table system · Self-service kiosk · Kitchen display · QR flyer · Transaction sharing", meaning: "Both have modular add-ons but for different workflows. resmio add-ons support table service (staff app, deposits, phone assistant for reservations). Gastro Master add-ons support delivery operations (driver tracking, kitchen display, kiosk).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "German and English (per resmio.com)", gastroMasterValue: "6 languages personal: DE, EN, IT, RU, FA, SI — with fixed phone contact", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Ownership structure & funding", competitorValue: "resmio GmbH (Berlin) — founded 2011, financed by publishing-house consortium (per company register + press releases): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke", gastroMasterValue: "Owner-led from Usingen (Hesse) — no external investors or parent corporation", meaning: "resmio is financed by a consortium of German media publishers (~€4M in 4 rounds 2011–2017). Gastro Master decides owner-led inside the DACH region.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "What the table above means in plain English:",
    punchlines: [
      "Delivery-first (0 % commission, fixed €79/mo) vs. reservation-first (4 % commission on orders or €149.90/mo order flat-rate).",
      "4 packages + 6 delivery-focused add-ons from one hand vs. reservation stack with ordering function as add-on.",
      "Personal service in 6 languages (DE, EN, IT, RU, FA, SI) vs. DE/EN.",
    ],
    body: "resmio and Gastro Master address two different restaurant worlds. resmio has been a reservation system for sit-down restaurants (bars, cafés, restaurants with table service) since 2011 — the ordering function runs as add-on with 4 % commission on gross revenue or €149.90/mo order flat-rate. Gastro Master was built from the start as a delivery system for direct orders (delivery, pickup) — ordering system from €79/mo fixed, 0 % commission on direct orders, plus 6 modular add-ons specifically for delivery operations (driver app GPS, QR table, kiosk, kitchen display, QR flyer, transaction sharing). You don't need to cancel your current contract before we talk.",
    closing: "These aren't marketing promises. This is a sober assessment of two different architectures — reservation-first for sit-down restaurants or delivery-first for direct orders. Which architecture fits your restaurant depends on your main business — if delivery and pickup are your focus, Gastro Master is optimized for that.",
  },
  gmAvatars: {
    intro: "Gastro Master is built for the following restaurants:",
    avatars: [
      "Family-led pizzerias, takeaways and cafés with delivery or takeaway focus in DACH",
      "Restaurants with 1–5 locations whose main business is direct orders (delivery/pickup)",
      "Operations that value personal service in 6 languages (DE, EN, IT, RU, FA, SI)",
      "Delivery services that prefer a revenue-independent fixed price over commission on orders",
      "Concepts that want to add delivery-specific add-ons (driver app, QR table, kiosk, display) modularly",
    ],
    closingStatement: "If your business isn't on this list — e.g. a sit-down restaurant with reservation focus — let the fact-table above speak for itself. We deliberately do not recommend another provider.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google review (originally in German)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "What does resmio cost in comparison to Gastro Master for delivery restaurants?", answer: "resmio offers three reservation tiers (Basic free, Premium €69.90/mo, Ultimate €129.90/mo). The ordering function (delivery/pickup) runs separately via 4 % commission on gross revenue OR €149.90/mo order flat-rate (per resmio.com/preise). Gastro Master works revenue-independent with fixed price: ordering system from €79/mo with 0 % commission on direct orders. At €5,000 monthly online revenue 4 % at resmio would be around €200 — with Gastro Master €79 fixed.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "resmio offers a free Basic tier — how is it with Gastro Master?", answer: "Correct — resmio Basic costs €0/mo and includes essential reservation functions (digital reservation system, menu, simple website). If you only need a reservation function and no delivery operations, that's an attractive entry. Gastro Master is built for delivery and direct orders — here the ordering system starts at €79/mo fixed. Which provider fits depends on your main business.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "Which provider is better for my restaurant — resmio or Gastro Master?", answer: "We deliberately do not recommend another provider. Gastro Master is built for family-led DACH restaurants with delivery or takeaway focus. If your main business is direct orders (delivery, pickup), we are the right choice. resmio has been optimized for table reservation workflows (sit-down restaurants) since 2011 — if that's your main business, the facts in the table will help you decide on your own." },
    { question: "What's the difference between a reservation system and an ordering system?", answer: "A reservation system manages table bookings for guests who want to dine in (sit-down). An ordering system processes online orders for delivery or pickup. resmio is primarily a reservation system with ordering function as add-on. Gastro Master is primarily an ordering system for delivery operations — with additional delivery add-ons (driver app GPS, kitchen display, self-service kiosk).", source: RESMIO_ORDERING, sourceDate: SOURCE_DATE },
    { question: "I'm already a resmio customer — can I switch before contract end?", answer: "We review your current contract in a free switch-check and calculate concretely what a switch means — costs, timeline, data migration. You receive a written comparison even if you decide not to switch." },
    { question: "Who is behind the two companies if I'm looking for a long-term partner?", answer: "resmio is operated by resmio GmbH (Berlin), founded 2011. Financing comes from a consortium of German media publishers (Müller Medien, Heise Media Service, NWZ Digital, FSF Beteiligung, Andreas Bremke) — around €4M in 4 rounds between 2011 and 2017. Gastro Master is owner-led from Usingen (Hesse) — no external investors, no parent corporation, one direct phone contact per restaurant.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3-month cancellation period on software packages — add-ons monthly activatable and cancelable" },
    { claimRef: "D2 / G2", text: "✅ 0 % commission on direct orders — fixed, plannable monthly price instead of percentage share of order revenue" },
    { claimRef: "B-Reihe", text: "✅ Personal phone contact from Hesse — in 6 languages (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Switch offer 50 %: As long as your existing contract is still being paid, you get Gastro Master at 50 % of the regular monthly price", pending: true, softFallback: "✅ Individual switch terms — we review your existing contract in a free switch-check" },
  ],
  cta: { primaryText: "Free consultation", primaryHref: "/kontakt", secondaryText: "Pricing at a glance", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master is the commission-free ordering-system solution for delivery- and takeaway-focused DACH restaurants — revenue-independent fixed price from €79/mo.",
    "Unlike reservation systems with ordering function as add-on (4 % commission on gross revenue), Gastro Master offers 0 % commission on direct orders with fixed-price model.",
    "Gastro Master combines 4 packages (website, ordering system, app package, POS) with 6 delivery-focused add-ons (driver app GPS, QR table, kiosk, kitchen display, QR flyer, transaction sharing) — modular scaling for delivery operations.",
    "Personal service in 6 languages (DE, EN, IT, RU, FA, SI) with a fixed phone contact from Hesse — owner-led since founding.",
    "800+ restaurants in Germany, Austria and Switzerland use Gastro Master as a delivery-specialized alternative to reservation-first systems with ordering function as add-on.",
  ],
  meta: { title: "Gastro Master vs. resmio — Fact check with sources | Gastro Master", description: "Factual comparison of Gastro Master and resmio: architecture (delivery-first vs. reservation-first), pricing model (fixed vs. commission), modular add-ons, service languages. With source URLs.", dateModified: SOURCE_DATE },
};

// ─── Italiano ───────────────────────────────────────────────────────────────
const IT: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. resmio: Sistema di consegna vs. sistema di prenotazione",
    subHeadline: "Verifica dei fatti con fonti — architettura, modello di prezzo, commissione sugli ordini online, lingue di servizio.",
    trustPills: [
      { label: "800+ ristoranti DACH" },
      { label: "5,0★ su 131 recensioni Google" },
      { label: "0 % di commissione sugli ordini diretti" },
    ],
  },
  quickFacts: [
    {
      axis: "Prezzi mensili concreti (caso d'uso consegna/ordinazione)",
      competitorValue: "Funzione di ordinazione: 4 % di commissione su consegna/asporto OPPURE 149,90 €/mese forfait ordini (in aggiunta al tariffario di prenotazione)",
      gastroMasterValue: "Sistema di ordinazione 79 €/mese fisso · 0 % di commissione sugli ordini diretti — indipendente dal fatturato",
      meaning: "Con resmio la funzione di ordinazione passa per il 4 % di commissione sul fatturato lordo o come add-on di 149,90 €/mese al tariffario di prenotazione. Con Gastro Master un prezzo mensile fisso senza commissione — nessuna sorpresa di prezzo con la crescita degli ordini.",
      priceBreakdown: [
        { packageLabel: "5.000 €/mese fatturato online", competitorPrice: "200 €/mese (4 %)", gastroMasterPrice: "79 €/mese", savingsLabel: "121 €/mese in meno" },
        { packageLabel: "10.000 €/mese fatturato online", competitorPrice: "400 €/mese (4 %)", gastroMasterPrice: "79 €/mese", savingsLabel: "321 €/mese in meno" },
        { packageLabel: "Forfait ordini (cap resmio)", competitorPrice: "149,90 €/mese", gastroMasterPrice: "79 €/mese", savingsLabel: "70,90 €/mese in meno" },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Caso d'uso primario (architettura)", competitorValue: "Sistema di prenotazione per ristoranti sit-down: bar, caffè, ristoranti con tavoli — funzione di ordinazione è un add-on", gastroMasterValue: "Sistema di ordinazione per consegna e take-away — sito web, sistema di ordinazione, pacchetto App e cassa da una sola mano", meaning: "resmio è costruito principalmente per prenotazioni di tavoli (secondo l'autopresentazione \"sistema di prenotazione per ristoranti\"). Gastro Master è costruito principalmente per ordini diretti (consegna, asporto) — mondo ristorativo diverso, architettura diversa.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Add-on modulari (attivabili/disdicibili mensilmente)", competitorValue: "Add-on nel contesto prenotazione: Manager App 19,90 €/mese · resmio Tables iPad app 19,90 €/mese · Acconti/no-show 19,90 €/mese · Assistente telefonico smart 14,90 € una tantum + 0,20 €/chiamata", gastroMasterValue: "6 add-on focalizzati sulla consegna: App autista con GPS · sistema QR tavolo · chiosco self-service · display cucina · volantino QR · riporto transazioni", meaning: "Entrambi i fornitori hanno add-on modulari ma per flussi di lavoro ristorativi diversi. Gli add-on di Gastro Master sono mirati alle operazioni di consegna (autista, cucina, self-ordering), gli add-on di resmio ai flussi al tavolo (app personale, acconti).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Lingue di servizio", competitorValue: "Tedesco e Inglese (secondo resmio.com — lingue di servizio principali)", gastroMasterValue: "6 lingue personali: DE, EN, IT, RU, FA, SI", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua con un referente telefonico fisso.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Modello di prezzo", competitorValue: "3 tariffe pubbliche: Basic 0 €/mese (gratuito) · Premium 69,90 €/mese · Ultimate 129,90 €/mese — tutte incl. prenotazioni illimitate. Funzione di ordinazione è add-on: 4 % di commissione su consegna/asporto OPPURE 149,90 €/mese forfait ordini (2 % di commissione per ordini QR-code). \"Configurazione e supporto gratuiti\" secondo resmio.com/preise.", gastroMasterValue: "Modello a prezzo fisso, indipendente dal fatturato: Sito web da 49 €/mese · Sistema di ordinazione da 79 €/mese · Pacchetto App da 149 €/mese · Cassa da 69 €/mese · 0 % commissione sugli ordini diretti · 3 mesi di preavviso · Costi di attivazione individuali e dipendenti dal progetto.", meaning: "resmio offre un livello di ingresso prenotazione gratuito (Basic) — un chiaro vantaggio per ristoranti che hanno bisogno solo di prenotazione. Per la funzione di ordinazione resmio lavora con 4 % di commissione sul fatturato lordo. Gastro Master lavora indipendente dal fatturato con prezzo fisso e 0 % commissione sugli ordini diretti.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Commissione sugli ordini online", competitorValue: "4 % di commissione sul fatturato lordo (consegna/asporto) · 2 % su ordini QR-code · in alternativa 149,90 €/mese forfait ordini", gastroMasterValue: "0 % commissione sugli ordini diretti — prezzo mensile fisso senza quota sul fatturato del ristorante", meaning: "A 5.000 €/mese di fatturato online il 4 % di commissione sarebbero circa 200 €. Con Gastro Master zero. Con resmio puoi passare al forfait di 149,90 €/mese una volta superato il break-even (~3.750 € fatturato/mese).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Architettura (caso d'uso primario)", competitorValue: "Reservation-first per ristoranti sit-down (bar, caffè, ristoranti con servizio al tavolo) — secondo l'autopresentazione \"sistema di prenotazione per la ristorazione\". Funzione di ordinazione è modulo secondario.", gastroMasterValue: "Delivery-first per ordini diretti (consegna, asporto) — sito web, sistema di ordinazione, pacchetto App e cassa costruiti specificamente per operazioni di consegna.", meaning: "Se la tua attività principale sono prenotazioni al tavolo (steakhouse, trattoria, bistrò), resmio è ottimizzato per quello. Se la tua attività principale è consegna/asporto (pizzeria, take-away, servizio di consegna), Gastro Master è ottimizzato per quello.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Add-on modulari", competitorValue: "Add-on focalizzati sulla prenotazione: Manager App (iOS/Android) 19,90 €/mese · resmio Tables iPad app 19,90 €/mese · Acconti/commissione no-show 19,90 €/mese · Assistente telefonico smart 14,90 € una tantum + 0,20 €/chiamata · Notifica SMS prenotazione 0,09 €/SMS", gastroMasterValue: "6 add-on focalizzati sulla consegna: App autista con GPS · sistema QR tavolo · chiosco self-service · display cucina · volantino QR · riporto transazioni", meaning: "Entrambi hanno add-on modulari ma per flussi di lavoro diversi. Gli add-on resmio supportano il servizio al tavolo (app personale, acconti, assistente telefonico per prenotazioni). Gli add-on Gastro Master supportano operazioni di consegna (tracking autista, display cucina, chiosco).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Lingue di servizio", competitorValue: "Tedesco e Inglese (secondo resmio.com)", gastroMasterValue: "6 lingue personali: DE, EN, IT, RU, FA, SI — con referente telefonico fisso", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria e finanziamento", competitorValue: "resmio GmbH (Berlino) — fondata nel 2011, finanziata da consorzio di case editrici (secondo registro imprese + comunicati stampa): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke", gastroMasterValue: "A conduzione del proprietario da Usingen (Assia) — nessun investitore esterno o casa madre", meaning: "resmio è finanziato da un consorzio di case editrici tedesche (~€4 mln in 4 round 2011–2017). Gastro Master decide a conduzione del proprietario nel territorio DACH.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Cosa significa la tabella qui sopra, in chiaro:",
    punchlines: [
      "Delivery-first (0 % commissione, fisso 79 €/mese) vs. reservation-first (4 % commissione sugli ordini o 149,90 €/mese forfait ordini).",
      "4 pacchetti + 6 add-on focalizzati sulla consegna da una sola mano vs. stack di prenotazione con funzione di ordinazione come add-on.",
      "Servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI) vs. DE/EN.",
    ],
    body: "resmio e Gastro Master indirizzano due diversi mondi ristorativi. resmio è dal 2011 un sistema di prenotazione per ristoranti sit-down (bar, caffè, ristoranti con servizio al tavolo) — la funzione di ordinazione passa come add-on con 4 % di commissione sul fatturato lordo o 149,90 €/mese forfait ordini. Gastro Master è stato costruito fin dall'inizio come sistema di consegna per ordini diretti (consegna, asporto) — sistema di ordinazione da 79 €/mese fisso, 0 % commissione sugli ordini diretti, più 6 add-on modulari specificamente per operazioni di consegna (app autista GPS, QR tavolo, chiosco, display cucina, volantino QR, riporto transazioni). Non devi disdire il tuo contratto attuale prima di parlare con noi.",
    closing: "Non sono promesse pubblicitarie. È una sobria valutazione di due architetture diverse — reservation-first per ristoranti sit-down o delivery-first per ordini diretti. Quale architettura si adatta al tuo ristorante dipende dalla tua attività principale — se consegna e asporto sono il tuo focus, Gastro Master è ottimizzato per quello.",
  },
  gmAvatars: {
    intro: "Gastro Master è pensato per i seguenti ristoranti:",
    avatars: [
      "Pizzerie a conduzione familiare, take-away e caffè con focus su consegna o asporto nel territorio DACH",
      "Ristoranti con 1–5 sedi la cui attività principale sono ordini diretti (consegna/asporto)",
      "Attività che apprezzano il servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI)",
      "Servizi di consegna che preferiscono un prezzo fisso indipendente dal fatturato a una commissione sugli ordini",
      "Concetti che vogliono aggiungere add-on specifici per la consegna (app autista, QR tavolo, chiosco, display) modularmente",
    ],
    closingStatement: "Se la tua attività non è in questa lista — ad es. un ristorante sit-down con focus sulle prenotazioni — lascia che la tabella dei fatti qui sopra parli da sola. Non raccomandiamo deliberatamente un altro fornitore.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Recensione Google (originale in tedesco)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Quanto costa resmio rispetto a Gastro Master per ristoranti di consegna?", answer: "resmio offre tre tariffe di prenotazione (Basic gratuito, Premium 69,90 €/mese, Ultimate 129,90 €/mese). La funzione di ordinazione (consegna/asporto) passa separatamente per 4 % di commissione sul fatturato lordo OPPURE 149,90 €/mese forfait ordini (secondo resmio.com/preise). Gastro Master lavora indipendente dal fatturato con prezzo fisso: sistema di ordinazione da 79 €/mese con 0 % commissione sugli ordini diretti. A 5.000 € di fatturato online mensile il 4 % con resmio sarebbe circa 200 € — con Gastro Master 79 € fisso.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "resmio offre una tariffa Basic gratuita — come è con Gastro Master?", answer: "Esatto — resmio Basic costa 0 €/mese e include funzioni essenziali di prenotazione (sistema di prenotazione digitale, menu, sito web semplice). Se hai bisogno solo di una funzione di prenotazione e non di operazioni di consegna, è un ingresso interessante. Gastro Master è costruito per consegna e ordini diretti — qui il sistema di ordinazione parte da 79 €/mese fisso. Quale fornitore ti si addice dipende dalla tua attività principale.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "Quale fornitore è migliore per il mio ristorante — resmio o Gastro Master?", answer: "Non raccomandiamo deliberatamente un altro fornitore. Gastro Master è pensato per i ristoranti DACH a conduzione familiare con focus su consegna o asporto. Se la tua attività principale sono ordini diretti (consegna, asporto), siamo la scelta giusta. resmio è ottimizzato dal 2011 per flussi di prenotazione al tavolo (ristoranti sit-down) — se quella è la tua attività principale, i fatti nella tabella ti aiutano a decidere autonomamente." },
    { question: "Qual è la differenza tra un sistema di prenotazione e un sistema di ordinazione?", answer: "Un sistema di prenotazione gestisce le prenotazioni al tavolo per gli ospiti che vogliono cenare in loco (sit-down). Un sistema di ordinazione elabora ordini online per consegna o asporto. resmio è principalmente un sistema di prenotazione con funzione di ordinazione come add-on. Gastro Master è principalmente un sistema di ordinazione per operazioni di consegna — con add-on aggiuntivi per la consegna (app autista GPS, display cucina, chiosco self-service).", source: RESMIO_ORDERING, sourceDate: SOURCE_DATE },
    { question: "Sono già cliente resmio — posso passare prima della scadenza del contratto?", answer: "Esaminiamo il tuo contratto attuale in un check di passaggio gratuito e calcoliamo concretamente cosa significa un cambio — costi, tempistica, migrazione dei dati. Ricevi un confronto scritto anche se decidi di non passare." },
    { question: "Chi c'è dietro le due aziende, se cerco un partner di lungo periodo?", answer: "resmio è gestito dalla resmio GmbH (Berlino), fondata nel 2011. Il finanziamento proviene da un consorzio di case editrici tedesche (Müller Medien, Heise Media Service, NWZ Digital, FSF Beteiligung, Andreas Bremke) — circa €4 mln in 4 round tra il 2011 e il 2017. Gastro Master è a conduzione del proprietario da Usingen (Assia) — nessun investitore esterno, nessuna casa madre, un referente telefonico diretto per ristorante.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 mesi di preavviso sui pacchetti software — add-on attivabili e disdicibili mensilmente" },
    { claimRef: "D2 / G2", text: "✅ 0 % di commissione sugli ordini diretti — prezzo mensile fisso e pianificabile invece di una quota percentuale del fatturato degli ordini" },
    { claimRef: "B-Reihe", text: "✅ Referente telefonico personale dall'Assia — in 6 lingue (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Offerta di passaggio 50 %: finché il tuo contratto attuale è ancora in pagamento, ricevi Gastro Master al 50 % del prezzo mensile regolare", pending: true, softFallback: "✅ Condizioni individuali di passaggio — esaminiamo il tuo contratto attuale in un check di passaggio gratuito" },
  ],
  cta: { primaryText: "Consulenza gratuita", primaryHref: "/kontakt", secondaryText: "Prezzi a colpo d'occhio", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master è la soluzione di sistema di ordinazione senza commissione per ristoranti DACH focalizzati su consegna e asporto — prezzo fisso indipendente dal fatturato da 79 €/mese.",
    "A differenza dei sistemi di prenotazione con funzione di ordinazione come add-on (4 % di commissione sul fatturato lordo), Gastro Master offre 0 % di commissione sugli ordini diretti con modello a prezzo fisso.",
    "Gastro Master combina 4 pacchetti (sito web, sistema di ordinazione, pacchetto App, cassa) con 6 add-on focalizzati sulla consegna (app autista GPS, QR tavolo, chiosco, display cucina, volantino QR, riporto transazioni) — scalatura modulare per operazioni di consegna.",
    "Servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI) con referente telefonico fisso dall'Assia — a conduzione del proprietario dalla fondazione.",
    "800+ ristoranti in Germania, Austria e Svizzera usano Gastro Master come alternativa specializzata nella consegna ai sistemi reservation-first con funzione di ordinazione come add-on.",
  ],
  meta: { title: "Gastro Master vs. resmio — Verifica dei fatti con fonti | Gastro Master", description: "Confronto fattuale tra Gastro Master e resmio: architettura (delivery-first vs. reservation-first), modello di prezzo (fisso vs. commissione), add-on modulari, lingue di servizio. Con URL sorgenti.", dateModified: SOURCE_DATE },
};

// ─── Русский ────────────────────────────────────────────────────────────────
const RU: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. resmio: система доставки vs. система бронирования",
    subHeadline: "Проверка фактов с источниками — архитектура, модель ценообразования, комиссия на онлайн-заказы, языки обслуживания.",
    trustPills: [
      { label: "800+ ресторанов в DACH" },
      { label: "5,0★ из 131 отзыва Google" },
      { label: "0 % комиссии на прямые заказы" },
    ],
  },
  quickFacts: [
    {
      axis: "Конкретные ежемесячные цены (случай доставки/заказа)",
      competitorValue: "Функция заказа: 4 % комиссии на доставку/самовывоз ИЛИ 149,90 €/мес. фикс. ставка за заказы (в дополнение к тарифу бронирования)",
      gastroMasterValue: "Система заказов 79 €/мес. фиксированно · 0 % комиссии на прямые заказы — не зависит от оборота",
      meaning: "У resmio функция заказа работает через 4 % комиссии с валового оборота или как дополнение 149,90 €/мес. к тарифу бронирования. У Gastro Master фиксированная ежемесячная цена без комиссии — никаких ценовых сюрпризов при росте заказов.",
      priceBreakdown: [
        { packageLabel: "5.000 €/мес. онлайн-оборот", competitorPrice: "200 €/мес. (4 %)", gastroMasterPrice: "79 €/мес.", savingsLabel: "−121 €/мес." },
        { packageLabel: "10.000 €/мес. онлайн-оборот", competitorPrice: "400 €/мес. (4 %)", gastroMasterPrice: "79 €/мес.", savingsLabel: "−321 €/мес." },
        { packageLabel: "Фикс. ставка за заказы (лимит resmio)", competitorPrice: "149,90 €/мес.", gastroMasterPrice: "79 €/мес.", savingsLabel: "−70,90 €/мес." },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Основной случай использования (архитектура)", competitorValue: "Система бронирования для sit-down ресторанов: бары, кафе, рестораны со столиками — функция заказа является дополнением", gastroMasterValue: "Система заказов для доставки и самовывоза — сайт, система заказов, App-пакет и касса из одних рук", meaning: "resmio построен в первую очередь для бронирования столиков (по самопредставлению \"система бронирования для ресторанов\"). Gastro Master построен в первую очередь для прямых заказов (доставка, самовывоз) — другой ресторанный мир, другая архитектура.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Модульные дополнения (ежемесячно активируемые/отменяемые)", competitorValue: "Дополнения в контексте бронирования: Manager App 19,90 €/мес. · resmio Tables iPad app 19,90 €/мес. · Депозиты/no-show 19,90 €/мес. · Умный телефонный ассистент 14,90 € единоразово + 0,20 €/звонок", gastroMasterValue: "6 дополнений, ориентированных на доставку: Приложение водителя с GPS · QR-стол · Self-service киоск · Кухонный дисплей · QR-флаер · Разделение транзакций", meaning: "Оба провайдера имеют модульные дополнения, но для разных ресторанных рабочих процессов. Дополнения Gastro Master нацелены на операции доставки (водитель, кухня, self-ordering), дополнения resmio на работу со столиками (приложение для персонала, депозиты).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Немецкий и английский (по resmio.com — основные языки обслуживания)", gastroMasterValue: "6 языков персонально: DE, EN, IT, RU, FA, SI", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке с фиксированным телефонным контактом.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Модель ценообразования", competitorValue: "3 публичных тарифа: Basic 0 €/мес. (бесплатно) · Premium 69,90 €/мес. · Ultimate 129,90 €/мес. — все вкл. неограниченные бронирования. Функция заказа является дополнением: 4 % комиссии на доставку/самовывоз ИЛИ 149,90 €/мес. фикс. ставка за заказы (2 % комиссии на QR-code заказы). \"Установка и поддержка бесплатны\" по resmio.com/preise.", gastroMasterValue: "Модель фиксированной цены, не зависит от оборота: Сайт от 49 €/мес. · Система заказов от 79 €/мес. · App-пакет от 149 €/мес. · Касса от 69 €/мес. · 0 % комиссии на прямые заказы · 3 месяца уведомления · Затраты на установку индивидуальны и зависят от проекта.", meaning: "resmio предлагает бесплатный начальный уровень бронирования (Basic) — явное преимущество для ресторанов, которым нужно только бронирование. Для функции заказа resmio работает с 4 % комиссии с валового оборота. Gastro Master работает не зависит от оборота с фиксированной ценой и 0 % комиссии на прямые заказы.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Комиссия на онлайн-заказы", competitorValue: "4 % комиссии с валового оборота (доставка/самовывоз) · 2 % на QR-code заказы · альтернативно 149,90 €/мес. фикс. ставка за заказы", gastroMasterValue: "0 % комиссии на прямые заказы — фиксированная ежемесячная цена без доли в обороте ресторана", meaning: "При 5.000 €/мес. онлайн-обороте 4 % комиссии было бы около 200 €. С Gastro Master ноль. С resmio вы можете перейти на фикс. ставку 149,90 €/мес., как только превысите точку безубыточности (~3.750 € оборот/мес.).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Архитектура (основной случай использования)", competitorValue: "Reservation-first для sit-down ресторанов (бары, кафе, рестораны со столиковым обслуживанием) — по самопредставлению \"система бронирования для гастрономии\". Функция заказа — вторичный модуль.", gastroMasterValue: "Delivery-first для прямых заказов (доставка, самовывоз) — сайт, система заказов, App-пакет и касса специально построены для операций доставки.", meaning: "Если ваш основной бизнес — бронирование столиков (стейк-хаус, траттория, бистро), resmio оптимизирован для этого. Если ваш основной бизнес — доставка/самовывоз (пиццерия, takeaway, служба доставки), Gastro Master оптимизирован для этого.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Модульные дополнения", competitorValue: "Дополнения, ориентированные на бронирование: Manager App (iOS/Android) 19,90 €/мес. · resmio Tables iPad app 19,90 €/мес. · Депозиты/комиссия no-show 19,90 €/мес. · Умный телефонный ассистент 14,90 € единоразово + 0,20 €/звонок · SMS уведомление о бронировании 0,09 €/SMS", gastroMasterValue: "6 дополнений, ориентированных на доставку: Приложение водителя с GPS · QR-стол · Self-service киоск · Кухонный дисплей · QR-флаер · Разделение транзакций", meaning: "Оба имеют модульные дополнения, но для разных рабочих процессов. Дополнения resmio поддерживают столиковое обслуживание (приложение для персонала, депозиты, телефонный ассистент для бронирований). Дополнения Gastro Master поддерживают операции доставки (отслеживание водителя, кухонный дисплей, киоск).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Немецкий и английский (по resmio.com)", gastroMasterValue: "6 языков персонально: DE, EN, IT, RU, FA, SI — с фиксированным телефонным контактом", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности и финансирование", competitorValue: "resmio GmbH (Берлин) — основан в 2011, финансируется консорциумом издательств (по реестру компаний + пресс-релизам): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke", gastroMasterValue: "Управляется владельцем из Узингена (Гессен) — без внешних инвесторов или материнской корпорации", meaning: "resmio финансируется консорциумом немецких медиа-издателей (~€4 млн в 4 раундах 2011–2017). Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Что таблица выше означает простыми словами:",
    punchlines: ["Delivery-first (0 % комиссии, фикс. 79 €/мес.) vs. reservation-first (4 % комиссии на заказы или 149,90 €/мес. фикс. ставка за заказы).", "4 пакета + 6 дополнений, ориентированных на доставку, из одних рук vs. стек бронирования с функцией заказа как дополнением.", "Персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI) vs. DE/EN."],
    body: "resmio и Gastro Master адресуют два разных ресторанных мира. resmio с 2011 года является системой бронирования для sit-down ресторанов (бары, кафе, рестораны со столиковым обслуживанием) — функция заказа работает как дополнение с 4 % комиссии с валового оборота или 149,90 €/мес. фикс. ставкой за заказы. Gastro Master с самого начала был построен как система доставки для прямых заказов (доставка, самовывоз) — система заказов от 79 €/мес. фиксированно, 0 % комиссии на прямые заказы, плюс 6 модульных дополнений специально для операций доставки (приложение водителя GPS, QR-стол, киоск, кухонный дисплей, QR-флаер, разделение транзакций). Вам не нужно расторгать текущий контракт, прежде чем поговорить с нами.",
    closing: "Это не рекламные обещания. Это трезвая оценка двух разных архитектур — reservation-first для sit-down ресторанов или delivery-first для прямых заказов. Какая архитектура подходит вашему ресторану, зависит от вашего основного бизнеса — если доставка и самовывоз являются вашим фокусом, Gastro Master оптимизирован для этого.",
  },
  gmAvatars: {
    intro: "Gastro Master ориентирован на следующие рестораны:",
    avatars: [
      "Семейные пиццерии, закусочные и кафе с фокусом на доставку или самовывоз в DACH",
      "Рестораны с 1–5 точками, основной бизнес которых — прямые заказы (доставка/самовывоз)",
      "Заведения, которые ценят персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI)",
      "Службы доставки, которые предпочитают фиксированную цену, не зависящую от оборота, комиссии на заказы",
      "Концепции, которые хотят добавлять специфические для доставки дополнения (приложение водителя, QR-стол, киоск, дисплей) модульно",
    ],
    closingStatement: "Если ваш бизнес не в этом списке — например, sit-down ресторан с фокусом на бронирования — пусть таблица фактов выше говорит сама за себя. Мы сознательно не рекомендуем другого провайдера.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Отзыв Google (оригинал на немецком)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Сколько стоит resmio по сравнению с Gastro Master для ресторанов доставки?", answer: "resmio предлагает три тарифа бронирования (Basic бесплатно, Premium 69,90 €/мес., Ultimate 129,90 €/мес.). Функция заказа (доставка/самовывоз) работает отдельно через 4 % комиссии с валового оборота ИЛИ 149,90 €/мес. фикс. ставку за заказы (по resmio.com/preise). Gastro Master работает не зависит от оборота с фиксированной ценой: система заказов от 79 €/мес. с 0 % комиссии на прямые заказы. При 5.000 € месячного онлайн-оборота 4 % у resmio было бы около 200 € — у Gastro Master 79 € фиксированно.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "resmio предлагает бесплатный Basic тариф — как это с Gastro Master?", answer: "Верно — resmio Basic стоит 0 €/мес. и включает существенные функции бронирования (цифровая система бронирования, меню, простой сайт). Если вам нужна только функция бронирования и не нужны операции доставки, это привлекательный вход. Gastro Master построен для доставки и прямых заказов — здесь система заказов начинается с 79 €/мес. фиксированно. Какой провайдер подходит, зависит от вашего основного бизнеса.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "Какой провайдер лучше для моего ресторана — resmio или Gastro Master?", answer: "Мы сознательно не рекомендуем другого провайдера. Gastro Master ориентирован на семейные DACH-рестораны с фокусом на доставку или самовывоз. Если ваш основной бизнес — прямые заказы (доставка, самовывоз), мы — правильный выбор. resmio с 2011 года оптимизирован для рабочих процессов бронирования столиков (sit-down рестораны) — если это ваш основной бизнес, факты в таблице помогут вам решить самостоятельно." },
    { question: "В чём разница между системой бронирования и системой заказов?", answer: "Система бронирования управляет бронированиями столиков для гостей, которые хотят пообедать в зале (sit-down). Система заказов обрабатывает онлайн-заказы для доставки или самовывоза. resmio — это в первую очередь система бронирования с функцией заказа как дополнением. Gastro Master — это в первую очередь система заказов для операций доставки — с дополнительными дополнениями для доставки (приложение водителя GPS, кухонный дисплей, self-service киоск).", source: RESMIO_ORDERING, sourceDate: SOURCE_DATE },
    { question: "Я уже клиент resmio — могу ли я перейти до конца контракта?", answer: "Мы анализируем ваш текущий контракт в бесплатной проверке перехода и конкретно рассчитываем, что означает переход — затраты, сроки, миграция данных. Вы получаете письменное сравнение, даже если решите не переходить." },
    { question: "Кто стоит за этими двумя компаниями, если я ищу долгосрочного партнёра?", answer: "resmio управляется компанией resmio GmbH (Берлин), основанной в 2011. Финансирование исходит от консорциума немецких медиа-издателей (Müller Medien, Heise Media Service, NWZ Digital, FSF Beteiligung, Andreas Bremke) — около €4 млн в 4 раундах между 2011 и 2017. Gastro Master управляется владельцем из Узингена (Гессен) — без внешних инвесторов, без материнской корпорации, один прямой телефонный контакт на ресторан.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 месяца уведомления на программных пакетах — дополнения ежемесячно активируемые и отменяемые" },
    { claimRef: "D2 / G2", text: "✅ 0 % комиссии на прямые заказы — фиксированная и планируемая ежемесячная цена вместо процентной доли оборота от заказов" },
    { claimRef: "B-Reihe", text: "✅ Персональный телефонный контакт из Гессена — на 6 языках (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Предложение перехода 50 %: пока ваш существующий контракт ещё оплачивается, вы получаете Gastro Master за 50 % от обычной ежемесячной цены", pending: true, softFallback: "✅ Индивидуальные условия перехода — мы анализируем ваш существующий контракт в бесплатной проверке" },
  ],
  cta: { primaryText: "Бесплатная консультация", primaryHref: "/kontakt", secondaryText: "Цены с первого взгляда", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master — это решение системы заказов без комиссии для DACH-ресторанов с фокусом на доставку и самовывоз — фиксированная цена, не зависящая от оборота, от 79 €/мес.",
    "В отличие от систем бронирования с функцией заказа как дополнением (4 % комиссии с валового оборота), Gastro Master предлагает 0 % комиссии на прямые заказы с моделью фиксированной цены.",
    "Gastro Master комбинирует 4 пакета (сайт, систему заказов, App-пакет, кассу) с 6 дополнениями, ориентированными на доставку (приложение водителя GPS, QR-стол, киоск, кухонный дисплей, QR-флаер, разделение транзакций) — модульное масштабирование для операций доставки.",
    "Персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI) с фиксированным телефонным контактом из Гессена — управляется владельцем с момента основания.",
    "800+ ресторанов в Германии, Австрии и Швейцарии используют Gastro Master как специализированную на доставке альтернативу системам reservation-first с функцией заказа как дополнением.",
  ],
  meta: { title: "Gastro Master vs. resmio — Проверка фактов с источниками | Gastro Master", description: "Фактическое сравнение Gastro Master и resmio: архитектура (delivery-first vs. reservation-first), модель ценообразования (фиксированная vs. комиссия), модульные дополнения, языки обслуживания. С URL источников.", dateModified: SOURCE_DATE },
};

// ─── فارسی (Persian, RTL) ──────────────────────────────────────────────────
const FA: ComparisonData = {
  ...DE,
  hook: {
    headline: "گاسترو مَستر در برابر resmio: سامانهٔ تحویل در برابر سامانهٔ رزرو",
    subHeadline: "بررسی واقعیت‌ها با منابع — معماری، مدل قیمت‌گذاری، کمیسیون روی سفارش‌های آنلاین، زبان‌های خدمات.",
    trustPills: [{ label: "+۸۰۰ رستوران در DACH" }, { label: "۵٫۰★ از ۱۳۱ نظر گوگل" }, { label: "۰٪ کمیسیون روی سفارش‌های مستقیم" }],
  },
  quickFacts: [
    {
      axis: "قیمت‌های ماهانهٔ مشخص (مورد استفادهٔ تحویل/سفارش)",
      competitorValue: "عملکرد سفارش: ۴٪ کمیسیون روی تحویل/برداشت یا ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش (به‌علاوهٔ تعرفهٔ رزرو)",
      gastroMasterValue: "سامانهٔ سفارش ‎۷۹€‎ /ماه ثابت · ۰٪ کمیسیون روی سفارش‌های مستقیم — مستقل از درآمد",
      meaning: "در resmio عملکرد سفارش از طریق ۴٪ کمیسیون روی درآمد ناخالص یا به‌عنوان افزونهٔ ‎۱۴۹٫۹۰€‎ /ماه به تعرفهٔ رزرو اجرا می‌شود. در گاسترو مستر یک قیمت ماهانهٔ ثابت بدون کمیسیون — هیچ شگفتی قیمت با رشد سفارش‌ها نیست.",
      priceBreakdown: [
        { packageLabel: "‎۵٬۰۰۰€‎ /ماه درآمد آنلاین", competitorPrice: "‎۲۰۰€‎ /ماه (۴٪)", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۱۲۱€‎ /ماه کمتر" },
        { packageLabel: "‎۱۰٬۰۰۰€‎ /ماه درآمد آنلاین", competitorPrice: "‎۴۰۰€‎ /ماه (۴٪)", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۳۲۱€‎ /ماه کمتر" },
        { packageLabel: "نرخ ثابت سفارش (سقف resmio)", competitorPrice: "‎۱۴۹٫۹۰€‎ /ماه", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۷۰٫۹۰€‎ /ماه کمتر" },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    { axis: "مورد استفادهٔ اصلی (معماری)", competitorValue: "سامانهٔ رزرو برای رستوران‌های sit-down: بارها، کافه‌ها، رستوران‌های میز-سرویس — عملکرد سفارش یک افزونه است", gastroMasterValue: "سامانهٔ سفارش برای تحویل و takeaway — وب‌سایت، سامانهٔ سفارش، بستهٔ App و صندوق از یک دست", meaning: "resmio عمدتاً برای رزرو میز ساخته شده (طبق توصیف خود \"سامانهٔ رزرو برای رستوران‌ها\"). گاسترو مستر عمدتاً برای سفارش‌های مستقیم (تحویل، برداشت) ساخته شده — دنیای رستوران متفاوت، معماری متفاوت.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "افزونه‌های ماژولار (ماهانه قابل فعال‌سازی/لغو)", competitorValue: "افزونه‌ها در زمینهٔ رزرو: Manager App ‎۱۹٫۹۰€‎ /ماه · resmio Tables iPad app ‎۱۹٫۹۰€‎ /ماه · پیش‌پرداخت/no-show ‎۱۹٫۹۰€‎ /ماه · دستیار تلفنی هوشمند ‎۱۴٫۹۰€‎ یک‌بار + ‎۰٫۲۰€‎ /تماس", gastroMasterValue: "۶ افزونهٔ متمرکز بر تحویل: اپلیکیشن راننده با GPS · سامانهٔ QR میز · کیوسک خودخدمت · نمایشگر آشپزخانه · فلایر QR · تقسیم تراکنش", meaning: "هر دو ارائه‌دهنده افزونه‌های ماژولار دارند اما برای جریان‌های کاری متفاوت. افزونه‌های گاسترو مستر متمرکز بر عملیات تحویل (راننده، آشپزخانه، self-ordering)، افزونه‌های resmio بر جریان‌های کاری میز (اپلیکیشن پرسنل، پیش‌پرداخت).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های خدمات", competitorValue: "آلمانی و انگلیسی (طبق resmio.com — زبان‌های خدمات اصلی)", gastroMasterValue: "۶ زبان شخصی: DE, EN, IT, RU, FA, SI", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما با تماس تلفنی ثابت صحبت می‌کند.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "مدل قیمت‌گذاری", competitorValue: "۳ تعرفهٔ عمومی: Basic ‎۰€‎ /ماه (رایگان) · Premium ‎۶۹٫۹۰€‎ /ماه · Ultimate ‎۱۲۹٫۹۰€‎ /ماه — همه شامل رزروهای نامحدود. عملکرد سفارش افزونه است: ۴٪ کمیسیون روی تحویل/برداشت یا ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش (۲٪ کمیسیون برای سفارش‌های QR-code). \"راه‌اندازی و پشتیبانی رایگان\" طبق resmio.com/preise.", gastroMasterValue: "مدل قیمت ثابت، مستقل از درآمد: وب‌سایت از ‎۴۹€‎ /ماه · سامانهٔ سفارش از ‎۷۹€‎ /ماه · بستهٔ App از ‎۱۴۹€‎ /ماه · صندوق از ‎۶۹€‎ /ماه · ۰٪ کمیسیون روی سفارش‌های مستقیم · مهلت لغو ۳ ماهه · هزینه‌های راه‌اندازی به‌صورت اختصاصی و وابسته به پروژه تعیین می‌شود.", meaning: "resmio یک سطح ورود رزرو رایگان (Basic) ارائه می‌دهد — یک مزیت آشکار برای رستوران‌هایی که فقط به رزرو نیاز دارند. برای عملکرد سفارش resmio با ۴٪ کمیسیون روی درآمد ناخالص کار می‌کند. گاسترو مستر مستقل از درآمد با قیمت ثابت و ۰٪ کمیسیون روی سفارش‌های مستقیم کار می‌کند.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "کمیسیون روی سفارش‌های آنلاین", competitorValue: "۴٪ کمیسیون روی درآمد ناخالص (تحویل/برداشت) · ۲٪ روی سفارش‌های QR-code · به‌عنوان جایگزین ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش", gastroMasterValue: "۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت بدون سهم در درآمد رستوران", meaning: "در ‎۵٬۰۰۰€‎ /ماه درآمد آنلاین، ۴٪ کمیسیون حدود ‎۲۰۰€‎ خواهد بود. در گاسترو مستر صفر. در resmio می‌توانید پس از عبور از نقطهٔ سر به سر (~‎۳٬۷۵۰€‎ درآمد/ماه) به نرخ ثابت ‎۱۴۹٫۹۰€‎ /ماه تغییر دهید.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "معماری (مورد استفادهٔ اصلی)", competitorValue: "Reservation-first برای رستوران‌های sit-down (بارها، کافه‌ها، رستوران‌های میز-سرویس) — طبق توصیف خود \"سامانهٔ رزرو برای صنعت رستورانی\". عملکرد سفارش ماژول ثانویه است.", gastroMasterValue: "Delivery-first برای سفارش‌های مستقیم (تحویل، برداشت) — وب‌سایت، سامانهٔ سفارش، بستهٔ App و صندوق به‌طور خاص برای عملیات تحویل ساخته شده‌اند.", meaning: "اگر کسب‌وکار اصلی شما رزرو میز است (استیک‌هاوس، تراتوریا، بیسترو)، resmio برای آن بهینه شده است. اگر کسب‌وکار اصلی شما تحویل/برداشت است (پیتزافروشی، takeaway، خدمات تحویل)، گاسترو مستر برای آن بهینه شده است.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "افزونه‌های ماژولار", competitorValue: "افزونه‌های متمرکز بر رزرو: Manager App (iOS/Android) ‎۱۹٫۹۰€‎ /ماه · resmio Tables iPad app ‎۱۹٫۹۰€‎ /ماه · پیش‌پرداخت/کمیسیون no-show ‎۱۹٫۹۰€‎ /ماه · دستیار تلفنی هوشمند ‎۱۴٫۹۰€‎ یک‌بار + ‎۰٫۲۰€‎ /تماس · اطلاع‌رسانی SMS رزرو ‎۰٫۰۹€‎ /SMS", gastroMasterValue: "۶ افزونهٔ متمرکز بر تحویل: اپلیکیشن راننده با GPS · سامانهٔ QR میز · کیوسک خودخدمت · نمایشگر آشپزخانه · فلایر QR · تقسیم تراکنش", meaning: "هر دو افزونه‌های ماژولار دارند اما برای جریان‌های کاری متفاوت. افزونه‌های resmio از سرویس میز پشتیبانی می‌کنند (اپلیکیشن پرسنل، پیش‌پرداخت، دستیار تلفنی برای رزروها). افزونه‌های گاسترو مستر از عملیات تحویل پشتیبانی می‌کنند (ردیابی راننده، نمایشگر آشپزخانه، کیوسک).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های خدمات", competitorValue: "آلمانی و انگلیسی (طبق resmio.com)", gastroMasterValue: "۶ زبان شخصی: DE, EN, IT, RU, FA, SI — با تماس تلفنی ثابت", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما صحبت می‌کند.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت و تأمین مالی", competitorValue: "resmio GmbH (Berlin) — تأسیس‌شده در ۲۰۱۱، تأمین مالی توسط کنسرسیوم ناشران (طبق ثبت شرکت + اطلاعیه‌های مطبوعاتی): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke", gastroMasterValue: "مالک‌محور از Usingen (Hesse) — بدون سرمایه‌گذار خارجی یا شرکت مادر", meaning: "resmio توسط کنسرسیومی از ناشران رسانه‌ای آلمانی (~۴ میلیون یورو در ۴ دور ۲۰۱۱–۲۰۱۷) تأمین مالی می‌شود. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "جدول بالا به زبان ساده:",
    punchlines: [
      "Delivery-first (۰٪ کمیسیون، ثابت ‎۷۹€‎ /ماه) در برابر reservation-first (۴٪ کمیسیون روی سفارش‌ها یا ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش).",
      "۴ بسته + ۶ افزونهٔ متمرکز بر تحویل از یک دست در برابر پشتهٔ رزرو با عملکرد سفارش به‌عنوان افزونه.",
      "خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) در برابر DE/EN.",
    ],
    body: "resmio و گاسترو مستر دو دنیای رستورانی متفاوت را خطاب قرار می‌دهند. resmio از سال ۲۰۱۱ یک سامانهٔ رزرو برای رستوران‌های sit-down (بارها، کافه‌ها، رستوران‌های میز-سرویس) است — عملکرد سفارش به‌عنوان افزونه با ۴٪ کمیسیون روی درآمد ناخالص یا ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش اجرا می‌شود. گاسترو مستر از ابتدا به‌عنوان سامانهٔ تحویل برای سفارش‌های مستقیم (تحویل، برداشت) ساخته شده — سامانهٔ سفارش از ‎۷۹€‎ /ماه ثابت، ۰٪ کمیسیون روی سفارش‌های مستقیم، به‌علاوهٔ ۶ افزونهٔ ماژولار به‌طور خاص برای عملیات تحویل (اپلیکیشن راننده GPS، QR میز، کیوسک، نمایشگر آشپزخانه، فلایر QR، تقسیم تراکنش). لازم نیست قرارداد فعلی خود را پیش از صحبت با ما لغو کنید.",
    closing: "این‌ها وعده‌های تبلیغاتی نیستند. این یک ارزیابی هوشیارانه از دو معماری متفاوت است — reservation-first برای رستوران‌های sit-down یا delivery-first برای سفارش‌های مستقیم. اینکه کدام معماری با رستوران شما متناسب است، به کسب‌وکار اصلی شما بستگی دارد — اگر تحویل و برداشت تمرکز شماست، گاسترو مستر برای آن بهینه شده است.",
  },
  gmAvatars: {
    intro: "گاسترو مستر برای رستوران‌های زیر طراحی شده است:",
    avatars: [
      "پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها با تمرکز بر تحویل یا takeaway در DACH",
      "رستوران‌ها با ۱ تا ۵ شعبه که کسب‌وکار اصلی آن‌ها سفارش‌های مستقیم (تحویل/برداشت) است",
      "کسب‌وکارهایی که خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) را ارزش می‌دانند",
      "خدمات تحویل که قیمت ثابت مستقل از درآمد را به کمیسیون روی سفارش‌ها ترجیح می‌دهند",
      "مفاهیمی که می‌خواهند افزونه‌های خاص تحویل (اپلیکیشن راننده، QR میز، کیوسک، نمایشگر) را به‌صورت ماژولار اضافه کنند",
    ],
    closingStatement: "اگر کسب‌وکار شما در این فهرست نیست — مثلاً یک رستوران sit-down با تمرکز بر رزرو — اجازه دهید جدول واقعیت‌های بالا خودش صحبت کند. ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · نظر گوگل (اصل به آلمانی)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "هزینهٔ resmio در مقایسه با گاسترو مستر برای رستوران‌های تحویل چقدر است؟", answer: "resmio سه تعرفهٔ رزرو ارائه می‌دهد (Basic رایگان، Premium ‎۶۹٫۹۰€‎ /ماه، Ultimate ‎۱۲۹٫۹۰€‎ /ماه). عملکرد سفارش (تحویل/برداشت) جداگانه از طریق ۴٪ کمیسیون روی درآمد ناخالص یا ‎۱۴۹٫۹۰€‎ /ماه نرخ ثابت سفارش اجرا می‌شود (طبق resmio.com/preise). گاسترو مستر مستقل از درآمد با قیمت ثابت کار می‌کند: سامانهٔ سفارش از ‎۷۹€‎ /ماه با ۰٪ کمیسیون روی سفارش‌های مستقیم. در ‎۵٬۰۰۰€‎ درآمد ماهانهٔ آنلاین، ۴٪ در resmio حدود ‎۲۰۰€‎ خواهد بود — در گاسترو مستر ‎۷۹€‎ ثابت.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "resmio یک تعرفهٔ Basic رایگان ارائه می‌دهد — با گاسترو مستر چگونه است؟", answer: "درست است — resmio Basic ‎۰€‎ /ماه هزینه دارد و عملکردهای رزرو ضروری (سامانهٔ رزرو دیجیتال، منو، وب‌سایت ساده) را شامل می‌شود. اگر فقط به یک عملکرد رزرو نیاز دارید و عملیات تحویل ندارید، این یک ورود جذاب است. گاسترو مستر برای تحویل و سفارش‌های مستقیم ساخته شده — اینجا سامانهٔ سفارش از ‎۷۹€‎ /ماه ثابت شروع می‌شود. اینکه کدام ارائه‌دهنده مناسب است به کسب‌وکار اصلی شما بستگی دارد.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "کدام ارائه‌دهنده برای رستوران من بهتر است — resmio یا گاسترو مستر؟", answer: "ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم. گاسترو مستر برای رستوران‌های خانوادگی DACH با تمرکز بر تحویل یا takeaway طراحی شده است. اگر کسب‌وکار اصلی شما سفارش‌های مستقیم (تحویل، برداشت) است، ما انتخاب درستی هستیم. resmio از سال ۲۰۱۱ برای جریان‌های کاری رزرو میز (رستوران‌های sit-down) بهینه شده است — اگر کسب‌وکار اصلی شما این است، واقعیت‌های جدول به شما کمک می‌کنند خودتان تصمیم بگیرید." },
    { question: "تفاوت بین یک سامانهٔ رزرو و یک سامانهٔ سفارش چیست؟", answer: "یک سامانهٔ رزرو رزرو میز را برای مهمانانی که می‌خواهند در محل غذا بخورند (sit-down) مدیریت می‌کند. یک سامانهٔ سفارش سفارش‌های آنلاین برای تحویل یا برداشت را پردازش می‌کند. resmio عمدتاً یک سامانهٔ رزرو با عملکرد سفارش به‌عنوان افزونه است. گاسترو مستر عمدتاً یک سامانهٔ سفارش برای عملیات تحویل است — با افزونه‌های اضافی برای تحویل (اپلیکیشن راننده GPS، نمایشگر آشپزخانه، کیوسک خودخدمت).", source: RESMIO_ORDERING, sourceDate: SOURCE_DATE },
    { question: "من از قبل مشتری resmio هستم — آیا می‌توانم پیش از پایان قرارداد تعویض کنم؟", answer: "ما قرارداد فعلی شما را در یک بررسی تعویض رایگان مرور می‌کنیم و به‌طور مشخص محاسبه می‌کنیم تعویض چه معنایی دارد — هزینه‌ها، زمان‌بندی، انتقال داده. حتی اگر تصمیم به تعویض نگیرید، یک مقایسهٔ کتبی دریافت می‌کنید." },
    { question: "اگر به‌دنبال شریک بلندمدت هستم، چه کسانی پشت این دو شرکت‌اند؟", answer: "resmio توسط resmio GmbH (Berlin)، تأسیس‌شده در ۲۰۱۱، اداره می‌شود. تأمین مالی از کنسرسیومی از ناشران رسانه‌ای آلمانی (Müller Medien، Heise Media Service، NWZ Digital، FSF Beteiligung، Andreas Bremke) — حدود ۴ میلیون یورو در ۴ دور بین ۲۰۱۱ و ۲۰۱۷. گاسترو مستر مالک‌محور از Usingen (Hesse) است — بدون سرمایه‌گذار خارجی، بدون شرکت مادر، یک تماس تلفنی مستقیم برای هر رستوران.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری — افزونه‌ها به‌صورت ماهانه قابل فعال‌سازی و لغو" },
    { claimRef: "D2 / G2", text: "✅ ۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت و قابل‌برنامه‌ریزی به‌جای سهم درصدی از درآمد سفارش" },
    { claimRef: "B-Reihe", text: "✅ تماس تلفنی شخصی از Hesse — به ۶ زبان (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ پیشنهاد تعویض ۵۰٪: تا زمانی که قرارداد فعلی شما در حال پرداخت است، گاسترو مستر را با ۵۰٪ از قیمت ماهانهٔ معمول دریافت می‌کنید", pending: true, softFallback: "✅ شرایط تعویض اختصاصی — قرارداد فعلی شما را در یک بررسی رایگان مرور می‌کنیم" },
  ],
  cta: { primaryText: "مشاورهٔ رایگان", primaryHref: "/kontakt", secondaryText: "قیمت‌ها در یک نگاه", secondaryHref: "/preise" },
  quotableOneLiners: [
    "گاسترو مستر راه‌حل سامانهٔ سفارش بدون کمیسیون برای رستوران‌های DACH متمرکز بر تحویل و takeaway است — قیمت ثابت مستقل از درآمد از ‎۷۹€‎ /ماه.",
    "برخلاف سامانه‌های رزرو با عملکرد سفارش به‌عنوان افزونه (۴٪ کمیسیون روی درآمد ناخالص)، گاسترو مستر ۰٪ کمیسیون روی سفارش‌های مستقیم با مدل قیمت ثابت ارائه می‌دهد.",
    "گاسترو مستر ۴ بسته (وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق) را با ۶ افزونهٔ متمرکز بر تحویل (اپلیکیشن راننده GPS، QR میز، کیوسک، نمایشگر آشپزخانه، فلایر QR، تقسیم تراکنش) ترکیب می‌کند — مقیاس‌پذیری ماژولار برای عملیات تحویل.",
    "خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) با تماس تلفنی ثابت از Hesse — مالک‌محور از زمان تأسیس.",
    "+۸۰۰ رستوران در آلمان، اتریش و سوئیس از گاسترو مستر به‌عنوان جایگزین تخصص‌یافته در تحویل برای سامانه‌های reservation-first با عملکرد سفارش به‌عنوان افزونه استفاده می‌کنند.",
  ],
  meta: { title: "گاسترو مستر در برابر resmio — بررسی واقعیت‌ها با منابع | Gastro Master", description: "مقایسهٔ مبتنی بر واقعیت گاسترو مستر و resmio: معماری (delivery-first در برابر reservation-first)، مدل قیمت‌گذاری (ثابت در برابر کمیسیون)، افزونه‌های ماژولار، زبان‌های خدمات. با URL منابع.", dateModified: SOURCE_DATE },
};

// ─── සිංහල (Sinhala) ────────────────────────────────────────────────────────
const SI: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master එදිරිව resmio: බෙදාහැරීමේ පද්ධතිය එදිරිව වෙන්කරවාගැනීමේ පද්ධතිය",
    subHeadline: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව — ගෘහ-නිර්මාණය, මිල ආකෘතිය, මාර්ගගත ඇණවුම් මත කොමිස්, සේවා භාෂා.",
    trustPills: [{ label: "DACH ආපනශාලා 800+" }, { label: "Google සමාලෝචන 131න් 5,0★" }, { label: "කෙළින්ම ඇණවුම් මත 0% කොමිස්" }],
  },
  quickFacts: [
    {
      axis: "නිශ්චිත මාසික මිල (බෙදාහැරීමේ/ඇණවුම් භාවිත අවස්ථාව)",
      competitorValue: "ඇණවුම් කාර්යය: බෙදාහැරීම/ලබාගැනීම මත 4% කොමිස් හෝ මසකට 149,90 € ඇණවුම් පැතලි අනුපාතය (වෙන්කරවාගැනීමේ අදියරට අමතරව)",
      gastroMasterValue: "ඇණවුම් පද්ධතිය මසකට 79 € ස්ථාවර · කෙළින්ම ඇණවුම් මත 0% කොමිස් — ආදායමෙන් ස්වාධීන",
      meaning: "resmio හි ඇණවුම් කාර්යය දළ ආදායමේ 4% කොමිසනක් හෝ වෙන්කරවාගැනීමේ අදියරට මසකට 149,90 € add-on එකක් ලෙස ක්‍රියා කරයි. Gastro Master සමඟ කොමිසනකින් තොරව ස්ථාවර මාසික මිලක් — ඇණවුම් වර්ධනය වන විට කිසිදු මිල පුදුමයක් නැත.",
      priceBreakdown: [
        { packageLabel: "මසකට 5,000 € මාර්ගගත ආදායම", competitorPrice: "මසකට 200 € (4%)", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −121 €" },
        { packageLabel: "මසකට 10,000 € මාර්ගගත ආදායම", competitorPrice: "මසකට 400 € (4%)", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −321 €" },
        { packageLabel: "ඇණවුම් පැතලි අනුපාතය (resmio සීමාව)", competitorPrice: "මසකට 149,90 €", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −70,90 €" },
      ],
      source: RESMIO_PRICING,
      sourceDate: SOURCE_DATE,
    },
    { axis: "ප්‍රාථමික භාවිත අවස්ථාව (ගෘහ-නිර්මාණය)", competitorValue: "Sit-down ආපනශාලා සඳහා වෙන්කරවාගැනීමේ පද්ධතිය: බාර්, කැෆේ, මේස-සේවා සහිත ආපනශාලා — ඇණවුම් කාර්යය add-on එකකි", gastroMasterValue: "බෙදාහැරීම සහ takeaway සඳහා ඇණවුම් පද්ධතිය — වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය සහ POS එක් අතකින්", meaning: "resmio ප්‍රාථමිකව මේස වෙන්කරවාගැනීම් සඳහා සාදා ඇත (ස්වයං විස්තරයට අනුව \"ආපනශාලා සඳහා වෙන්කරවාගැනීමේ පද්ධතිය\"). Gastro Master ප්‍රාථමිකව කෙළින්ම ඇණවුම් (බෙදාහැරීම, ලබාගැනීම) සඳහා සාදා ඇත — වෙනස් ආපනශාලා ලෝකය, වෙනස් ගෘහ-නිර්මාණය.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුලර් add-on (මාසිකව සක්‍රීය/අවලංගු කළ හැකි)", competitorValue: "වෙන්කරවාගැනීමේ සන්දර්භයේ add-on: Manager App මසකට 19,90 € · resmio Tables iPad app මසකට 19,90 € · තැන්පතු/no-show මසකට 19,90 € · Smart phone assistant 14,90 € එක් වරක් + ඇමතුමකට 0,20 €", gastroMasterValue: "බෙදාහැරීම මත අවධානය යොමු කළ add-on 6: GPS සහිත රියදුරු app · QR මේස පද්ධතිය · ස්වයං-සේවා kiosk · kitchen display · QR flyer · ගණුදෙනු බෙදීම", meaning: "ප්‍රදායකයන් දෙදෙනාම මොඩියුලර් add-on ඇත නමුත් වෙනස් ආපනශාලා වැඩ ප්‍රවාහයන් සඳහා. Gastro Master add-on බෙදාහැරීමේ මෙහෙයුම් (රියදුරු, මුළුතැන්ගෙය, self-ordering) ඉලක්ක කරයි, resmio add-on මේස වැඩ ප්‍රවාහ (කාර්ය මණ්ඩල app, තැන්පතු) ඉලක්ක කරයි.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ජර්මානු සහ ඉංග්‍රීසි (resmio.com අනුව — ප්‍රාථමික සේවා භාෂා)", gastroMasterValue: "භාෂා 6ක් පුද්ගලිකව: DE, EN, IT, RU, FA, SI", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "මිල ආකෘතිය", competitorValue: "පොදු අදියර 3: Basic මසකට 0 € (නොමිලේ) · Premium මසකට 69,90 € · Ultimate මසකට 129,90 € — සියල්ල අසීමිත වෙන්කරවාගැනීම් ඇතුළුව. ඇණවුම් කාර්යය add-on එකකි: බෙදාහැරීම/ලබාගැනීම මත 4% කොමිස් හෝ මසකට 149,90 € ඇණවුම් පැතලි අනුපාතය (QR-code ඇණවුම් සඳහා 2% කොමිස්). resmio.com/preise අනුව \"සැකසුම සහ සහාය නොමිලේ\".", gastroMasterValue: "ස්ථාවර මිල ආකෘතිය, ආදායමෙන් ස්වාධීන: වෙබ් අඩවිය මසකට 49 € සිට · ඇණවුම් පද්ධතිය මසකට 79 € සිට · App පැකේජය මසකට 149 € සිට · POS මසකට 69 € සිට · කෙළින්ම ඇණවුම් මත 0% කොමිස් · මාස 3 අවසන් කිරීමේ දැන්වීම · සැකසුම් පිරිවැය පුද්ගලික සහ ව්‍යාපෘතිය මත රඳා පවතී.", meaning: "resmio නොමිලේ වෙන්කරවාගැනීමේ ඇතුල්වීමේ අදියරක් (Basic) ලබා දේ — වෙන්කරවාගැනීම පමණක් අවශ්‍ය ආපනශාලා සඳහා පැහැදිලි වාසියක්. ඇණවුම් කාර්යය සඳහා resmio දළ ආදායමේ 4% කොමිසනකින් ක්‍රියා කරයි. Gastro Master ආදායමෙන් ස්වාධීනව ස්ථාවර මිල සහ කෙළින්ම ඇණවුම් මත 0% කොමිසනකින් ක්‍රියා කරයි.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "මාර්ගගත ඇණවුම් මත කොමිස්", competitorValue: "දළ ආදායමේ 4% කොමිස් (බෙදාහැරීම/ලබාගැනීම) · QR-code ඇණවුම් මත 2% · විකල්පයක් ලෙස මසකට 149,90 € ඇණවුම් පැතලි අනුපාතය", gastroMasterValue: "කෙළින්ම ඇණවුම් මත 0% කොමිස් — ආපනශාලා ආදායමේ කොටසක් නොමැතිව ස්ථාවර මාසික මිල", meaning: "මසකට 5,000 € මාර්ගගත ආදායමේදී 4% කොමිස් ආසන්න වශයෙන් 200 € කි. Gastro Master සමඟ ශුන්‍යයි. resmio සමඟ ඔබට break-even (~මසකට 3,750 € ආදායම) අඛණ්ඩව ඉක්මවූ පසු මසකට 149,90 € පැතලි අනුපාතයට මාරු විය හැක.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "ගෘහ-නිර්මාණය (ප්‍රාථමික භාවිත අවස්ථාව)", competitorValue: "Sit-down ආපනශාලා සඳහා Reservation-first (බාර්, කැෆේ, මේස-සේවා සහිත ආපනශාලා) — ස්වයං විස්තරයට අනුව \"ආපනශාලා සඳහා වෙන්කරවාගැනීමේ පද්ධතිය\". ඇණවුම් කාර්යය ද්විතීයික මොඩියුලයකි.", gastroMasterValue: "කෙළින්ම ඇණවුම් සඳහා Delivery-first (බෙදාහැරීම, ලබාගැනීම) — වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය සහ POS විශේෂයෙන් බෙදාහැරීමේ මෙහෙයුම් සඳහා සාදා ඇත.", meaning: "ඔබේ ප්‍රධාන ව්‍යාපාරය මේස වෙන්කරවාගැනීම් නම් (steakhouse, trattoria, bistro), resmio එයට ප්‍රශස්ත කර ඇත. ඔබේ ප්‍රධාන ව්‍යාපාරය බෙදාහැරීම/ලබාගැනීම නම් (පීසා හල, takeaway, බෙදාහැරීමේ සේවාව), Gastro Master එයට ප්‍රශස්ත කර ඇත.", source: RESMIO_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුලර් add-on", competitorValue: "වෙන්කරවාගැනීම මත අවධානය යොමු කළ add-on: Manager App (iOS/Android) මසකට 19,90 € · resmio Tables iPad app මසකට 19,90 € · තැන්පතු/no-show ගාස්තුව මසකට 19,90 € · Smart phone assistant 14,90 € එක් වරක් + ඇමතුමකට 0,20 € · SMS වෙන්කරවාගැනීමේ දැනුම්දීම SMS එකකට 0,09 €", gastroMasterValue: "බෙදාහැරීම මත අවධානය යොමු කළ add-on 6: GPS සහිත රියදුරු app · QR මේස පද්ධතිය · ස්වයං-සේවා kiosk · kitchen display · QR flyer · ගණුදෙනු බෙදීම", meaning: "දෙදෙනාම මොඩියුලර් add-on ඇත නමුත් වෙනස් වැඩ ප්‍රවාහ සඳහා. resmio add-on මේස සේවාවට සහාය වේ (කාර්ය මණ්ඩල app, තැන්පතු, වෙන්කරවාගැනීම් සඳහා දුරකථන සහායක). Gastro Master add-on බෙදාහැරීමේ මෙහෙයුම්වලට සහාය වේ (රියදුරු ට්‍රැකින්, kitchen display, kiosk).", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ජර්මානු සහ ඉංග්‍රීසි (resmio.com අනුව)", gastroMasterValue: "භාෂා 6ක් පුද්ගලිකව: DE, EN, IT, RU, FA, SI — ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: RESMIO_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය සහ අරමුදල්", competitorValue: "resmio GmbH (Berlin) — 2011 දී පිහිටුවන ලද, ප්‍රකාශන සංගමයක් විසින් මූල්‍යනය කරන ලද (සමාගම් රෙජිස්ටරයට + මාධ්‍ය නිවේදනවලට අනුව): Müller Medien · Heise Media Service · NWZ Digital · FSF Beteiligung · Andreas Bremke", gastroMasterValue: "Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් හෝ මාතෘ සංගමයක් නැත", meaning: "resmio ජර්මානු මාධ්‍ය ප්‍රකාශකයන්ගේ සංගමයක් මගින් මූල්‍යනය කරයි (~€4 මිලියන 4 රවුම්වලදී 2011–2017). Gastro Master DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "ඉහත වගුව සරල සිංහලෙන්:",
    punchlines: ["Delivery-first (0% කොමිස්, ස්ථාවර මසකට 79 €) එදිරිව reservation-first (ඇණවුම් මත 4% කොමිස් හෝ මසකට 149,90 € ඇණවුම් පැතලි අනුපාතය).", "පැකේජ 4 + බෙදාහැරීම මත අවධානය යොමු කළ add-on 6 එක් අතකින් එදිරිව ඇණවුම් කාර්යය add-on එකක් ලෙස සහිත වෙන්කරවාගැනීමේ තොගය.", "භාෂා 6කින් පුද්ගලික සේවාව (DE, EN, IT, RU, FA, SI) එදිරිව DE/EN."],
    body: "resmio සහ Gastro Master ආපනශාලා ලෝක දෙකක් ඉලක්ක කරයි. resmio 2011 සිට sit-down ආපනශාලා සඳහා වෙන්කරවාගැනීමේ පද්ධතියක් වේ (බාර්, කැෆේ, මේස-සේවා සහිත ආපනශාලා) — ඇණවුම් කාර්යය දළ ආදායමේ 4% කොමිසනක් හෝ මසකට 149,90 € ඇණවුම් පැතලි අනුපාතයක් සමඟ add-on එකක් ලෙස ක්‍රියා කරයි. Gastro Master ආරම්භයේ සිටම කෙළින්ම ඇණවුම් (බෙදාහැරීම, ලබාගැනීම) සඳහා බෙදාහැරීමේ පද්ධතියක් ලෙස සාදා ඇත — ඇණවුම් පද්ධතිය මසකට 79 € ස්ථාවර, කෙළින්ම ඇණවුම් මත 0% කොමිස්, ඊට අමතරව බෙදාහැරීමේ මෙහෙයුම් සඳහා විශේෂයෙන් මොඩියුලර් add-on 6 (රියදුරු app GPS, QR මේසය, kiosk, kitchen display, QR flyer, ගණුදෙනු බෙදීම). අප සමඟ කතා කිරීමට පෙර ඔබේ වර්තමාන ගිවිසුම අවසන් කිරීම අවශ්‍ය නොවේ.",
    closing: "මේවා වෙළඳ පොරොන්දු නොවේ. මේ ගෘහ-නිර්මාණ දෙකක් පිළිබඳ සන්සුන් තක්සේරුවකි — sit-down ආපනශාලා සඳහා reservation-first හෝ කෙළින්ම ඇණවුම් සඳහා delivery-first. කුමන ගෘහ-නිර්මාණය ඔබේ ආපනශාලාවට ගැලපේද යන්න ඔබේ ප්‍රධාන ව්‍යාපාරය මත රඳා පවතී — බෙදාහැරීම සහ ලබාගැනීම ඔබේ අවධානයේ නම්, Gastro Master එයට ප්‍රශස්ත කර ඇත.",
  },
  gmAvatars: {
    intro: "Gastro Master පහත සඳහන් ආපනශාලා සඳහා සැකසී ඇත:",
    avatars: [
      "DACH හි බෙදාහැරීම හෝ takeaway අවධානය සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ",
      "ස්ථාන 1-5ක් සහිත ආපනශාලා — ප්‍රධාන ව්‍යාපාරය කෙළින්ම ඇණවුම් (බෙදාහැරීම/ලබාගැනීම)",
      "භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව අගය කරන ව්‍යාපාර",
      "ඇණවුම් මත කොමිස් වෙනුවට ආදායමෙන් ස්වාධීන ස්ථාවර මිල කැමති බෙදාහැරීමේ සේවා",
      "බෙදාහැරීමට විශේෂිත add-on (රියදුරු app, QR මේසය, kiosk, display) මොඩියුලර් වශයෙන් එකතු කිරීමට කැමති සංකල්ප",
    ],
    closingStatement: "ඔබේ ව්‍යාපාරය මෙම ලැයිස්තුවේ නොමැති නම් — උදාහරණයක් ලෙස වෙන්කරවාගැනීමේ අවධානය සහිත sit-down ආපනශාලාවක් — ඉහත කරුණු වගුවට තමන්ටම කතා කිරීමට ඉඩ දෙන්න. අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google සමාලෝචනය (මුල් ජර්මානු බසින්)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "බෙදාහැරීමේ ආපනශාලා සඳහා Gastro Master හා සසඳන විට resmio වල පිරිවැය කොපමණද?", answer: "resmio වෙන්කරවාගැනීමේ අදියර තුනක් ඉදිරිපත් කරයි (Basic නොමිලේ, Premium මසකට 69,90 €, Ultimate මසකට 129,90 €). ඇණවුම් කාර්යය (බෙදාහැරීම/ලබාගැනීම) දළ ආදායමේ 4% කොමිසනක් හරහා හෝ මසකට 149,90 € ඇණවුම් පැතලි අනුපාතයක් හරහා වෙන වෙනම ක්‍රියා කරයි (resmio.com/preise අනුව). Gastro Master ආදායමෙන් ස්වාධීනව ස්ථාවර මිල සමඟ ක්‍රියා කරයි: ඇණවුම් පද්ධතිය මසකට 79 € සිට කෙළින්ම ඇණවුම් මත 0% කොමිසනක් සමඟ. මසකට 5,000 € මාර්ගගත ආදායමේදී resmio හි 4% ආසන්න වශයෙන් 200 € — Gastro Master සමඟ 79 € ස්ථාවර.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "resmio නොමිලේ Basic අදියරක් ඉදිරිපත් කරයි — Gastro Master සමඟ කෙසේද?", answer: "හරි — resmio Basic මසකට 0 € පිරිවැයක් වන අතර අත්‍යවශ්‍ය වෙන්කරවාගැනීමේ කාර්යයන් (ඩිජිටල් වෙන්කරවාගැනීමේ පද්ධතිය, මෙනුව, සරල වෙබ් අඩවිය) ඇතුළත් වේ. ඔබට වෙන්කරවාගැනීමේ කාර්යයක් පමණක් අවශ්‍ය නම් සහ බෙදාහැරීමේ මෙහෙයුම් අවශ්‍ය නැත්නම්, එය ආකර්ෂණීය ඇතුල්වීමකි. Gastro Master බෙදාහැරීම සහ කෙළින්ම ඇණවුම් සඳහා සාදා ඇත — මෙහි ඇණවුම් පද්ධතිය මසකට 79 € ස්ථාවර සිට ආරම්භ වේ. කුමන ප්‍රදායකයා ගැලපේද යන්න ඔබේ ප්‍රධාන ව්‍යාපාරය මත රඳා පවතී.", source: RESMIO_PRICING, sourceDate: SOURCE_DATE },
    { question: "මගේ ආපනශාලාවට කවුද හොඳ — resmio හෝ Gastro Master?", answer: "අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු. Gastro Master බෙදාහැරීම හෝ takeaway අවධානය සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා සාදා ඇත. ඔබේ ප්‍රධාන ව්‍යාපාරය කෙළින්ම ඇණවුම් (බෙදාහැරීම, ලබාගැනීම) නම්, අපි නියම තේරීම වේ. resmio 2011 සිට මේස වෙන්කරවාගැනීමේ වැඩ ප්‍රවාහ (sit-down ආපනශාලා) සඳහා ප්‍රශස්ත කර ඇත — එය ඔබේ ප්‍රධාන ව්‍යාපාරය නම්, වගුවේ කරුණු ස්වාධීනව තීරණය කිරීමට උදව් කරයි." },
    { question: "වෙන්කරවාගැනීමේ පද්ධතියක් සහ ඇණවුම් පද්ධතියක් අතර වෙනස කුමක්ද?", answer: "වෙන්කරවාගැනීමේ පද්ධතියක් ආපනශාලාවේ ආහාර ගැනීමට කැමති (sit-down) අමුත්තන්ගේ මේස වෙන්කරවාගැනීම් කළමනාකරණය කරයි. ඇණවුම් පද්ධතියක් බෙදාහැරීම හෝ ලබාගැනීම සඳහා මාර්ගගත ඇණවුම් සකසයි. resmio ප්‍රාථමිකව ඇණවුම් කාර්යය add-on එකක් සහිත වෙන්කරවාගැනීමේ පද්ධතියකි. Gastro Master ප්‍රාථමිකව බෙදාහැරීමේ මෙහෙයුම් සඳහා ඇණවුම් පද්ධතියකි — බෙදාහැරීම සඳහා අතිරේක add-on (රියදුරු app GPS, kitchen display, ස්වයං-සේවා kiosk) සමඟ.", source: RESMIO_ORDERING, sourceDate: SOURCE_DATE },
    { question: "මම දැනටමත් resmio ගනුදෙනුකරුවෙක් — ගිවිසුම අවසන් වීමට පෙර මාරු විය හැකිද?", answer: "අපි ඔබේ වර්තමාන ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කර මාරුවක් යනු කුමක්ද — පිරිවැය, කාල සටහන, දත්ත සංක්‍රමණය — යන්න සංයුතව ගණනය කරමු. ඔබ මාරු නොවීමට තීරණය කළත්, ලිඛිත සන්සන්දනයක් ලබා ගනී." },
    { question: "දිගුකාලීන හවුල්කරුවෙකු සොයන්නේ නම්, මෙම සමාගම් දෙක පිටුපස කවුද?", answer: "resmio resmio GmbH (Berlin) විසින් මෙහෙයවනු ලැබේ, 2011 දී පිහිටුවන ලද. මූල්‍යනය ජර්මානු මාධ්‍ය ප්‍රකාශකයන්ගේ සංගමයකින් එයි (Müller Medien, Heise Media Service, NWZ Digital, FSF Beteiligung, Andreas Bremke) — 2011 සහ 2017 අතර රවුම් 4කදී ආසන්න වශයෙන් €4 මිලියන. Gastro Master Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් නැත, මාතෘ සංගමයක් නැත, ආපනශාලාවකට එක් සෘජු දුරකථන සම්බන්ධතාවක්.", source: RESMIO_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ මෘදුකාංග පැකේජ මත මාස 3 අවසන් කිරීමේ දැන්වීම — add-on මාසිකව සක්‍රීය සහ අවලංගු කළ හැකි" },
    { claimRef: "D2 / G2", text: "✅ කෙළින්ම ඇණවුම් මත 0% කොමිස් — ඇණවුම් ආදායමේ ප්‍රතිශත කොටසක් වෙනුවට ස්ථාවර, සැලසුම් කළ හැකි මාසික මිල" },
    { claimRef: "B-Reihe", text: "✅ Hesse සිට පුද්ගලික දුරකථන සම්බන්ධතාව — භාෂා 6කින් (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ මාරු පිරිනැමීම 50%: ඔබේ පවතින ගිවිසුම තවමත් ගෙවමින් සිටින තාක්, ඔබට සාමාන්‍ය මාසික මිලෙන් 50%කට Gastro Master ලැබේ", pending: true, softFallback: "✅ පුද්ගලික මාරු කොන්දේසි — අපි ඔබේ පවතින ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කරමු" },
  ],
  cta: { primaryText: "නොමිලේ උපදෙස්", primaryHref: "/kontakt", secondaryText: "මිල ගණන් එක නෙතින්", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master යනු බෙදාහැරීම සහ takeaway අවධානය සහිත DACH ආපනශාලා සඳහා කොමිස් රහිත ඇණවුම් පද්ධති විසඳුමයි — මසකට 79 € සිට ආදායමෙන් ස්වාධීන ස්ථාවර මිල.",
    "ඇණවුම් කාර්යය add-on එකක් ලෙස සහිත වෙන්කරවාගැනීමේ පද්ධති මෙන් නොව (දළ ආදායමේ 4% කොමිස්), Gastro Master ස්ථාවර මිල ආකෘතිය සමඟ කෙළින්ම ඇණවුම් මත 0% කොමිස් ඉදිරිපත් කරයි.",
    "Gastro Master පැකේජ 4 (වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS) බෙදාහැරීම මත අවධානය යොමු කළ add-on 6 සමඟ ඒකාබද්ධ කරයි (රියදුරු app GPS, QR මේසය, kiosk, kitchen display, QR flyer, ගණුදෙනු බෙදීම) — බෙදාහැරීමේ මෙහෙයුම් සඳහා මොඩියුලර් පරිමාණය.",
    "Hesse සිට ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව — පිහිටුවීමේ සිට අයිතිකරු මෙහෙයවන.",
    "ජර්මනියේ, ඔස්ට්‍රියාවේ සහ ස්විට්සර්ලන්තයේ ආපනශාලා 800+ ක් ඇණවුම් කාර්යය add-on එකක් ලෙස සහිත reservation-first පද්ධතිවලට බෙදාහැරීම පිළිබඳ විශේෂිත විකල්පයක් ලෙස Gastro Master භාවිත කරයි.",
  ],
  meta: { title: "Gastro Master එදිරිව resmio — මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව | Gastro Master", description: "Gastro Master සහ resmio හි කරුණු සසඳීම: ගෘහ-නිර්මාණය (delivery-first එදිරිව reservation-first), මිල ආකෘතිය (ස්ථාවර එදිරිව කොමිස්), මොඩියුලර් add-on, සේවා භාෂා. මූලාශ්‍ර URL සමඟ.", dateModified: SOURCE_DATE },
};

// ─── Registry ───────────────────────────────────────────────────────────────
export const resmioByLang: ComparisonByLang = {
  de: DE,
  en: EN,
  it: IT,
  fa: FA,
  si: SI,
  ru: RU,
};

export const resmioComparison = DE;
