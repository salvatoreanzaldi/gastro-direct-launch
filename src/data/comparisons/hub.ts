/**
 * /vergleiche/-Hub-Page-Daten in 6 Sprachen.
 *
 * Strategie (Berater-Council 2026-05-07, dokumentiert in Wissens-Bibel #20):
 * - Schema: CollectionPage + ItemList + Dataset + BreadcrumbList (KEIN Article, KEIN FAQPage)
 * - Inhalt: Vergleichs-Quertabelle als ALLERERSTES sichtbares Element + Orientierungs-Filter +
 *   5 Karten-Grid + Methodik + Mehlfabrik-Story + Meta-FAQ inline + 3 CTAs
 * - Salvatore-Prinzip: KEINE Rankings, KEINE Sterne, KEIN Aggregate-Rating über Konkurrenten
 * - Mindest-Wordcount 600+ (Soft-404-Schutz bei nur 5 Items)
 *
 * URL-Ziele:
 * - /de/vergleiche · /en/vs · /it/confronti · /fa/vs · /si/vs · /ru/vs
 *
 * Pricing- und Sitz-Daten in Tabellen-Zellen sind 1:1 aus den 5 Detail-Pages
 * übernommen — Source-of-Truth bleiben die einzelnen comparison-Files.
 */

import type { ComparisonLang, CustomerStory } from "./types";

export interface HubTableColumn {
  key: string;
  label: string;
}

export interface HubTableRow {
  /** Brand display name */
  name: string;
  /** Detail-page slug — undefined wenn dies Gastro Master ist */
  detailSlug?: string;
  /** Highlight-Flag für GM-Zeile */
  isOurs?: boolean;
  /** Zell-Werte keyed by column.key */
  cells: Record<string, string>;
  /** Source-URL für die Zeile (UWG-Compliance) */
  source?: string;
  sourceDate?: string;
}

export interface CompetitorCard {
  slug: string;
  name: string;
  /** Ein-Satz-Positionierung, neutral, faktisch */
  positioning: string;
  ctaLabel: string;
}

export interface HubFaqItem {
  question: string;
  answer: string;
}

export interface ComparisonHubData {
  hero: { badge: string; h1: string; lead: string };
  table: {
    heading: string;
    columns: HubTableColumn[];
    rows: HubTableRow[];
    sourcesNote: string;
    ourLabel: string;
  };
  cards: {
    heading: string;
    sub: string;
    items: CompetitorCard[];
  };
  methodology: {
    heading: string;
    body: string;
    asOfNote: string;
  };
  customerStory: CustomerStory & { sectionHeading: string };
  metaFaq: {
    heading: string;
    sub: string;
    items: HubFaqItem[];
  };
  ourPosition: {
    heading: string;
    body: string;
  };
  hardCtaLabel: string;
  meta: {
    title: string;
    description: string;
    dateModified: string;
  };
}

export type ComparisonHubByLang = Record<ComparisonLang, ComparisonHubData>;

const DATE_MODIFIED = "2026-05-07";

/**
 * Geteilte Tabellen-Daten (Sprach-unabhängige Werte wie Sitz und konkrete €-Beträge).
 * Werden pro Sprache mit übersetzten Beschreibungen gemerged.
 */
const COMPETITORS = [
  {
    slug: "order-smart",
    name: "OrderSmart",
    seat: "Köln",
    pricingDe: "119–229 €/Mo. + 299 € einmal (OrderManager)",
    pricingEn: "119–229 €/Mo. + 299 € one-time (OrderManager)",
    pricingIt: "119–229 €/mese + 299 € una tantum (OrderManager)",
    pricingFa: "۱۱۹–۲۲۹ یورو/ماه + ۲۹۹ یورو یکباره (OrderManager)",
    pricingSi: "119–229 €/මාසයට + 299 € එක්වරක් (OrderManager)",
    pricingRu: "119–229 €/мес. + 299 € единоразово (OrderManager)",
    source: "https://ordersmart.de/preise/",
    sourceDate: "2026-05-06",
  },
  {
    slug: "sides",
    name: "SIDES",
    seat: "Berlin",
    pricingDe: "nicht öffentlich (Pricing nur auf Anfrage)",
    pricingEn: "not public (pricing on request only)",
    pricingIt: "non pubblico (prezzo solo su richiesta)",
    pricingFa: "غیرعمومی (قیمت فقط بر اساس درخواست)",
    pricingSi: "ප්‍රසිද්ධ නොවේ (ඉල්ලීම මත පමණි)",
    pricingRu: "нет публичных цен (только по запросу)",
    source: "https://sides.de/",
    sourceDate: "2026-05-06",
  },
  {
    slug: "dish-order",
    name: "DISH Order",
    seat: "Düsseldorf",
    pricingDe: "49 €/Mo. + 299 € einmal (kommissionsfrei)",
    pricingEn: "49 €/Mo. + 299 € one-time (commission-free)",
    pricingIt: "49 €/mese + 299 € una tantum (senza commissioni)",
    pricingFa: "۴۹ یورو/ماه + ۲۹۹ یورو یکباره (بدون کمیسیون)",
    pricingSi: "49 €/මාසයට + 299 € එක්වරක් (කොමිස් රහිත)",
    pricingRu: "49 €/мес. + 299 € единоразово (без комиссии)",
    source: "https://newsroom.metroag.de/de/news/dish-order-new-digital-tool-for-restaurateurs",
    sourceDate: "2026-05-06",
  },
  {
    slug: "foodamigos",
    name: "Foodamigos",
    seat: "München",
    pricingDe: "19–329 €/Mo. (5-Tier-Staffel) + 300 €/649 € Setup einmal",
    pricingEn: "19–329 €/Mo. (5-tier scale) + 300 €/649 € one-time setup",
    pricingIt: "19–329 €/mese (5 livelli) + 300 €/649 € setup una tantum",
    pricingFa: "۱۹–۳۲۹ یورو/ماه (پلکانی ۵-سطحی) + ۳۰۰ یا ۶۴۹ یورو راه‌اندازی یکباره",
    pricingSi: "19–329 €/මාසයට (5-මට්ටම්) + 300 €/649 € එක්වරක් සැකසුම",
    pricingRu: "19–329 €/мес. (5 уровней) + 300 €/649 € одноразовая настройка",
    source: "https://foodamigos.io/de/pricing",
    sourceDate: "2026-05-07",
  },
  {
    slug: "resmio",
    name: "resmio",
    seat: "Berlin",
    pricingDe: "0 / 69,90 / 129,90 €/Mo. + 4 % Provision auf Online-Bestellungen",
    pricingEn: "0 / 69.90 / 129.90 €/Mo. + 4 % commission on online orders",
    pricingIt: "0 / 69,90 / 129,90 €/mese + 4 % commissione su ordini online",
    pricingFa: "۰ / ۶۹٫۹۰ / ۱۲۹٫۹۰ یورو/ماه + ۴٪ کمیسیون روی سفارش آنلاین",
    pricingSi: "0 / 69.90 / 129.90 €/මාසයට + ඔන්ලයින් ඇණවුම් මත 4 % කොමිස්",
    pricingRu: "0 / 69,90 / 129,90 €/мес. + 4 % комиссия с онлайн-заказов",
    source: "https://www.resmio.com/preise/",
    sourceDate: "2026-05-07",
  },
] as const;

/**
 * Gemeinsame Mehlfabrik-Customer-Story (DE-Original-Quote, identisch zu Detail-Pages).
 */
const MEHLFABRIK_QUOTE = {
  quote:
    "Hallo liebe Leute. Ich bin schon seit einigen Jahren Kunde und muss ehrlich zugeben: im Vergleich zu anderen Anbietern (Service, Preisleistung, Freundlichkeit, Respekt, Erreichbarkeit) seid ihr echt top. […] Bei Euch sind wir jetzt und in Zukunft in guten Händen.",
  attribution: "Mehlfabrik Rotenburg Wümme · Google-Bewertung",
  source:
    "https://www.google.com/maps/reviews/@50.3404141,8.5269892,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2tzdE5FNUlXbEZHWjFKNFRGOXpTVVpvVVdFdFpuYxAB!2m1!1s0x0:0xc153d36091678dd0?entry=ttu",
  sourceDate: "2026-05-06",
};

const buildHubData = (
  lang: ComparisonLang,
  body: Omit<ComparisonHubData, "table" | "customerStory"> & {
    table: Omit<ComparisonHubData["table"], "rows">;
    customerStorySectionHeading: string;
  },
): ComparisonHubData => {
  const pricingKey =
    lang === "de"
      ? "pricingDe"
      : lang === "en"
      ? "pricingEn"
      : lang === "it"
      ? "pricingIt"
      : lang === "fa"
      ? "pricingFa"
      : lang === "si"
      ? "pricingSi"
      : "pricingRu";

  const ownerLabelByLang: Record<ComparisonLang, { gm: string; competitors: Record<string, string> }> = {
    de: {
      gm: "inhabergeführt, Familienunternehmen",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "VC-finanziert",
        "dish-order": "METRO AG (Konzern)",
        foodamigos: "foodamigos GmbH",
        resmio: "Verlags-Konsortium (DPV)",
      },
    },
    en: {
      gm: "owner-led, family business",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "VC-funded",
        "dish-order": "METRO AG (corporate group)",
        foodamigos: "foodamigos GmbH",
        resmio: "publishing consortium (DPV)",
      },
    },
    it: {
      gm: "a conduzione familiare",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "finanziato da VC",
        "dish-order": "METRO AG (gruppo)",
        foodamigos: "foodamigos GmbH",
        resmio: "consorzio editoriale (DPV)",
      },
    },
    fa: {
      gm: "مدیریت خانوادگی",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "تامین مالی توسط VC",
        "dish-order": "METRO AG (شرکت گروهی)",
        foodamigos: "foodamigos GmbH",
        resmio: "کنسرسیوم انتشاراتی (DPV)",
      },
    },
    si: {
      gm: "හිමිකරු-මෙහෙයවන, පවුල් ව්‍යාපාරය",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "VC-අරමුදල්",
        "dish-order": "METRO AG (සමූහ)",
        foodamigos: "foodamigos GmbH",
        resmio: "ප්‍රකාශන සංගමය (DPV)",
      },
    },
    ru: {
      gm: "семейный бизнес",
      competitors: {
        "order-smart": "app smart GmbH",
        sides: "VC-финансирование",
        "dish-order": "METRO AG (группа)",
        foodamigos: "foodamigos GmbH",
        resmio: "издательский консорциум (DPV)",
      },
    },
  };

  const gmPricingByLang: Record<ComparisonLang, string> = {
    de: "ab 79 €/Mo. (Bestellsystem) — Festpreis, kein Umsatzanteil",
    en: "from 79 €/Mo. (ordering system) — flat fee, no revenue share",
    it: "da 79 €/mese (sistema di ordinazione) — prezzo fisso, senza percentuale",
    fa: "از ۷۹ یورو/ماه (سیستم سفارش) — قیمت ثابت، بدون درصد فروش",
    si: "මාසයට € 79 සිට (ඇණවුම් පද්ධතිය) — ස්ථාවර මිල, ආදායම් කොටසක් නැත",
    ru: "от 79 €/мес. (система заказов) — фикс. цена, без процента с оборота",
  };

  const seatLabelByLang: Record<ComparisonLang, Record<string, string>> = {
    de: {
      gm: "Deutschland",
      "order-smart": "Köln",
      sides: "Berlin",
      "dish-order": "Düsseldorf",
      foodamigos: "München",
      resmio: "Berlin",
    },
    en: {
      gm: "Germany",
      "order-smart": "Cologne",
      sides: "Berlin",
      "dish-order": "Düsseldorf",
      foodamigos: "Munich",
      resmio: "Berlin",
    },
    it: {
      gm: "Germania",
      "order-smart": "Colonia",
      sides: "Berlino",
      "dish-order": "Düsseldorf",
      foodamigos: "Monaco di Baviera",
      resmio: "Berlino",
    },
    fa: {
      gm: "آلمان",
      "order-smart": "کلن",
      sides: "برلین",
      "dish-order": "دوسلدورف",
      foodamigos: "مونیخ",
      resmio: "برلین",
    },
    si: {
      gm: "ජර්මනිය",
      "order-smart": "Cologne",
      sides: "Berlin",
      "dish-order": "Düsseldorf",
      foodamigos: "Munich",
      resmio: "Berlin",
    },
    ru: {
      gm: "Германия",
      "order-smart": "Кёльн",
      sides: "Берлин",
      "dish-order": "Дюссельдорф",
      foodamigos: "Мюнхен",
      resmio: "Берлин",
    },
  };

  const ours: HubTableRow = {
    name: "Gastro Master",
    isOurs: true,
    cells: {
      pricing: gmPricingByLang[lang],
      seat: seatLabelByLang[lang].gm,
      ownership: ownerLabelByLang[lang].gm,
    },
  };

  const competitorRows: HubTableRow[] = COMPETITORS.map((c) => ({
    name: c.name,
    detailSlug: c.slug,
    cells: {
      pricing: c[pricingKey as keyof typeof c] as string,
      seat: seatLabelByLang[lang][c.slug],
      ownership: ownerLabelByLang[lang].competitors[c.slug],
    },
    source: c.source,
    sourceDate: c.sourceDate,
  }));

  return {
    hero: body.hero,
    table: {
      ...body.table,
      rows: [ours, ...competitorRows],
    },
    cards: body.cards,
    methodology: body.methodology,
    customerStory: {
      ...MEHLFABRIK_QUOTE,
      sectionHeading: body.customerStorySectionHeading,
    },
    metaFaq: body.metaFaq,
    ourPosition: body.ourPosition,
    hardCtaLabel: body.hardCtaLabel,
    meta: body.meta,
  };
};

// ─── DE ─────────────────────────────────────────────────────────────────────
const de = buildHubData("de", {
  hero: {
    badge: "Faktencheck mit Quellen",
    h1: "Anbieter im Markt — Fakten statt Werbeversprechen",
    lead: "In Deutschland gibt es fünf nennenswerte Anbieter für Restaurant-Bestellsysteme. Wir vergleichen sie nach Pricing-Modell, Eigentums-Struktur und Sitz — alle Zahlen wörtlich aus öffentlichen Primärquellen, nicht rekonstruiert.",
  },
  table: {
    heading: "Marktübersicht — alle 5 Anbieter auf einen Blick",
    columns: [
      { key: "pricing", label: "Pricing-Modell" },
      { key: "ownership", label: "Eigentums-Struktur" },
      { key: "seat", label: "Sitz" },
    ],
    sourcesNote: "Pricing- und Eigentümer-Angaben jeweils wörtlich aus den verlinkten Primärquellen (Stand 07.05.2026). Klick auf einen Anbieter-Namen öffnet den Detail-Faktencheck.",
    ourLabel: "Unser Angebot",
  },
  cards: {
    heading: "Detail-Vergleiche pro Anbieter",
    sub: "Faktencheck mit Pricing-Card, 7-Achsen-Tabelle, FAQ und Money-Math je Konkurrent.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "Bestell-App-Spezialist mit eigener öffentlicher Pricing-Seite — modulares Web-Shop / App-Modell.", ctaLabel: "Faktencheck OrderSmart ansehen" },
      { slug: "sides", name: "SIDES", positioning: "VC-finanzierter Bestellsystem-Anbieter ohne öffentliche Pricing-Seite — Differenzierung über Pricing-Transparenz.", ctaLabel: "Faktencheck SIDES ansehen" },
      { slug: "dish-order", name: "DISH Order", positioning: "Konzern-Backed-System der METRO AG mit Festpreis-Modell (kommissionsfrei).", ctaLabel: "Faktencheck DISH Order ansehen" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "Münchner Anbieter mit erfolgsbasierter 5-Tier-Pricing-Staffel und Add-Ons.", ctaLabel: "Faktencheck Foodamigos ansehen" },
      { slug: "resmio", name: "resmio", positioning: "Reservierungs-First-System mit optionaler Bestellfunktion (Provision oder Flat).", ctaLabel: "Faktencheck resmio ansehen" },
    ],
  },
  methodology: {
    heading: "Wie wir vergleichen",
    body: "Pro Anbieter öffnen wir die offizielle Pricing-Seite (oder bei DISH Order die METRO-Pressemitteilung als Primärquelle, weil DISH selbst keine öffentliche Pricing-Seite hat) und übernehmen die Zahlen wörtlich. Behauptungen, die nicht 1:1 in einer Konkurrenz-Quelle stehen, erscheinen nicht auf dieser Seite. Wenn ein Anbieter sein Pricing nicht öffentlich macht (SIDES), schreiben wir das so hin — und werten es nicht. Es gibt keine Sterne, keine Rankings, keinen Score — nur Fakten und die Erlaubnis, selbst zu entscheiden.",
    asOfNote: "Quellenstand 07.05.2026 · Re-Audit quartalsweise (Kalender-Reminder)",
  },
  customerStorySectionHeading: "Wie ein DACH-Restaurant es erlebt hat",
  metaFaq: {
    heading: "Häufige Fragen vor der Anbieter-Wahl",
    sub: "Was Restaurant-Inhaber typischerweise fragen, bevor sie ein Bestellsystem ernsthaft evaluieren.",
    items: [
      {
        question: "Welche Lieferando-Alternativen gibt es überhaupt in Deutschland?",
        answer: "Sechs Anbieter werden im DACH-Markt regelmäßig in Erwägung gezogen, wenn Restaurants ein eigenes Bestellsystem statt einer Lieferplattform suchen: Gastro Master, OrderSmart, SIDES, DISH Order, Foodamigos und resmio. Plus Lieferplattformen selbst (Lieferando, Wolt, Uber Eats) — diese sind aber strukturell ein anderes Modell (Marktplatz mit Provision, nicht eigenes Bestellsystem).",
      },
      {
        question: "Was kostet ein eigenes Bestellsystem für ein Restaurant typischerweise?",
        answer: "Bandbreite öffentlich kommunizierter Preise: 0 € bis 329 €/Monat plus 0–649 € einmaliges Setup. Manche Anbieter erheben zusätzlich Provisionen auf Online-Bestellungen (typisch 2–4 %), andere arbeiten mit Festpreisen ohne Umsatzanteil. Welches Modell günstiger ist, hängt von der monatlichen Online-Bestell-Summe ab — bei niedrigem Umsatz oft Provisions-Modell, bei höherem Umsatz Festpreis.",
      },
      {
        question: "Welcher Anbieter arbeitet ohne Provision auf Online-Bestellungen?",
        answer: "Aus den fünf hier verglichenen Konkurrenten arbeiten OrderSmart, DISH Order, Foodamigos und SIDES nach öffentlich kommunizierten Modellen ohne klassische Bestellprovision. resmio hat ein gemischtes Modell (4 % Provision oder 149,90 €/Mo. Bestell-Flat). Gastro Master arbeitet mit Festpreisen ohne Umsatzanteil.",
      },
      {
        question: "Worauf sollte ich bei der Vertragslaufzeit achten?",
        answer: "Die im Markt übliche Spanne reicht von Standard-Verträgen mit kurzen Kündigungsfristen bis zu längeren Bindungen. Vor Vertragsabschluss empfiehlt sich: Kündigungsfristen schriftlich festhalten lassen, Datenexport-Rechte prüfen (Kunden-Datenbank, Bestellhistorie) und klären, was mit der eigenen Domain passiert, wenn der Vertrag endet.",
      },
      {
        question: "Wie wechsele ich seriös von einem Anbieter zum anderen?",
        answer: "Drei Schritte machen einen Wechsel planbar: 1) Datenexport beim Alt-Anbieter anfragen (Kunden-Datenbank, Bestellhistorie, ggf. Speisekarten-Export). 2) Beim neuen Anbieter eine Wechsel-Beratung buchen mit konkreter Migrations-Liste. 3) Übergangs-Phase mit Parallelbetrieb von 2–4 Wochen einplanen, damit keine Bestellungen verloren gehen.",
      },
    ],
  },
  ourPosition: {
    heading: "Unsere Position",
    body: "Gastro Master ist ein inhabergeführtes Familienunternehmen mit Sitz in Deutschland. Wir empfehlen unser eigenes System, wenn ein Restaurant Festpreise ohne Umsatzanteil, persönlichen direkten Kontakt und ein deutsches Service-Team will. Wir empfehlen es nicht, wenn der Hauptgrund eine bestimmte Reservierungs-Funktion ist, die wir nicht abdecken. Welcher Anbieter zu Ihrem Betrieb passt, entscheiden Sie nach den Fakten oben — ein 15-Minuten-Beratungsgespräch macht die Entscheidung in der Regel einfacher.",
  },
  hardCtaLabel: "Kostenlose Beratung",
  meta: {
    title: "Bestellsystem-Vergleich: Alle 5 Anbieter im Faktencheck — Gastro Master",
    description: "Markt-Übersicht aller 5 Bestellsystem-Anbieter (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) mit Pricing, Eigentums-Struktur und Sitz — wörtliche Primärquellen, keine Wertungen.",
    dateModified: DATE_MODIFIED,
  },
});

// ─── EN ─────────────────────────────────────────────────────────────────────
const en = buildHubData("en", {
  hero: {
    badge: "Fact check with sources",
    h1: "Providers on the market — facts, not advertising claims",
    lead: "There are five notable providers of restaurant ordering systems in Germany. We compare them by pricing model, ownership structure and headquarters — every number quoted verbatim from public primary sources, not reconstructed.",
  },
  table: {
    heading: "Market overview — all 5 providers at a glance",
    columns: [
      { key: "pricing", label: "Pricing model" },
      { key: "ownership", label: "Ownership structure" },
      { key: "seat", label: "Headquarters" },
    ],
    sourcesNote: "Pricing and ownership data quoted verbatim from the linked primary sources (as of 07.05.2026). Click a provider name to open the detailed fact check.",
    ourLabel: "Our offering",
  },
  cards: {
    heading: "Detail comparisons per provider",
    sub: "Fact check with pricing card, 7-axis table, FAQ and money-math per competitor.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "Order-app specialist with its own public pricing page — modular web-shop / app model.", ctaLabel: "View OrderSmart fact check" },
      { slug: "sides", name: "SIDES", positioning: "VC-funded ordering system without a public pricing page — differentiation via pricing transparency.", ctaLabel: "View SIDES fact check" },
      { slug: "dish-order", name: "DISH Order", positioning: "Corporate-backed system from METRO AG with flat-fee model (commission-free).", ctaLabel: "View DISH Order fact check" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "Munich provider with success-based 5-tier pricing and add-ons.", ctaLabel: "View Foodamigos fact check" },
      { slug: "resmio", name: "resmio", positioning: "Reservation-first system with optional ordering function (commission or flat).", ctaLabel: "View resmio fact check" },
    ],
  },
  methodology: {
    heading: "How we compare",
    body: "For each provider we open the official pricing page (or, in the case of DISH Order, the METRO press release as the primary source, since DISH itself has no public pricing page) and quote the numbers verbatim. Claims that are not stated 1:1 in a competitor source do not appear on this page. If a provider does not publish its pricing (SIDES), we say so — without judgment. There are no stars, no rankings, no scores — only facts, and the room for you to decide for yourself.",
    asOfNote: "Sources as of 07.05.2026 · Quarterly re-audit (calendar reminder)",
  },
  customerStorySectionHeading: "How a DACH restaurant experienced it",
  metaFaq: {
    heading: "Common questions before choosing a provider",
    sub: "What restaurant owners typically ask before seriously evaluating an ordering system.",
    items: [
      { question: "What Lieferando alternatives are there in Germany at all?", answer: "Six providers are regularly considered in the DACH market when restaurants want their own ordering system instead of a delivery platform: Gastro Master, OrderSmart, SIDES, DISH Order, Foodamigos and resmio. Plus the delivery platforms themselves (Lieferando, Wolt, Uber Eats) — but these are structurally a different model (marketplace with commission, not your own ordering system)." },
      { question: "What does an in-house ordering system typically cost a restaurant?", answer: "Range of publicly communicated prices: 0 € to 329 €/month plus 0–649 € one-time setup. Some providers also charge commissions on online orders (typically 2–4 %), others use flat fees with no revenue share. Which model is cheaper depends on the monthly online order volume — at low volume often commission, at high volume flat fee." },
      { question: "Which provider works without commission on online orders?", answer: "Of the five competitors compared here, OrderSmart, DISH Order, Foodamigos and SIDES work according to publicly communicated models without classic order commission. resmio has a mixed model (4 % commission or 149.90 €/Mo. flat). Gastro Master works with flat fees without revenue share." },
      { question: "What should I watch out for regarding contract length?", answer: "The market range goes from standard contracts with short notice periods to longer commitments. Before signing: get notice periods in writing, check data export rights (customer database, order history) and clarify what happens to your own domain when the contract ends." },
      { question: "How do I switch from one provider to another responsibly?", answer: "Three steps make a switch plannable: 1) Request data export from the previous provider (customer database, order history, menu export if available). 2) Book a switch consultation with the new provider with a concrete migration list. 3) Plan a transition phase of 2–4 weeks with parallel operation so no orders are lost." },
    ],
  },
  ourPosition: {
    heading: "Our position",
    body: "Gastro Master is an owner-led family business based in Germany. We recommend our own system when a restaurant wants flat fees without revenue share, personal direct contact and a German service team. We don't recommend it when the main reason is a specific reservation function we don't cover. Which provider fits your operation, you decide based on the facts above — a 15-minute consultation usually makes the decision easier.",
  },
  hardCtaLabel: "Free consultation",
  meta: {
    title: "Ordering-system comparison: All 5 providers fact-checked — Gastro Master",
    description: "Market overview of all 5 ordering-system providers (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) with pricing, ownership and headquarters — verbatim primary sources, no rankings.",
    dateModified: DATE_MODIFIED,
  },
});

// ─── IT ─────────────────────────────────────────────────────────────────────
const it = buildHubData("it", {
  hero: {
    badge: "Verifica dei fatti con fonti",
    h1: "I fornitori sul mercato — fatti, non promesse pubblicitarie",
    lead: "In Germania ci sono cinque fornitori rilevanti di sistemi di ordinazione per ristoranti. Li confrontiamo per modello di prezzo, struttura di proprietà e sede — ogni cifra citata letteralmente da fonti primarie pubbliche, non ricostruita.",
  },
  table: {
    heading: "Panoramica del mercato — tutti i 5 fornitori a colpo d'occhio",
    columns: [
      { key: "pricing", label: "Modello di prezzo" },
      { key: "ownership", label: "Struttura di proprietà" },
      { key: "seat", label: "Sede" },
    ],
    sourcesNote: "Dati di prezzo e proprietà citati letteralmente dalle fonti primarie collegate (al 07.05.2026). Clicca su un nome di fornitore per aprire la verifica dettagliata.",
    ourLabel: "La nostra offerta",
  },
  cards: {
    heading: "Confronti dettagliati per fornitore",
    sub: "Verifica con scheda prezzi, tabella a 7 assi, FAQ e calcolo per ciascun concorrente.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "Specialista di app per ordinazioni con propria pagina prezzi pubblica — modello web-shop / app modulare.", ctaLabel: "Vedi verifica OrderSmart" },
      { slug: "sides", name: "SIDES", positioning: "Sistema di ordinazione finanziato da VC senza pagina prezzi pubblica — differenziazione su trasparenza dei prezzi.", ctaLabel: "Vedi verifica SIDES" },
      { slug: "dish-order", name: "DISH Order", positioning: "Sistema sostenuto dal gruppo METRO AG con modello a prezzo fisso (senza commissioni).", ctaLabel: "Vedi verifica DISH Order" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "Fornitore di Monaco di Baviera con prezzi a 5 livelli basati su ricavi e add-on.", ctaLabel: "Vedi verifica Foodamigos" },
      { slug: "resmio", name: "resmio", positioning: "Sistema reservation-first con funzione di ordinazione opzionale (commissione o flat).", ctaLabel: "Vedi verifica resmio" },
    ],
  },
  methodology: {
    heading: "Come confrontiamo",
    body: "Per ciascun fornitore apriamo la pagina prezzi ufficiale (o, nel caso di DISH Order, il comunicato stampa METRO come fonte primaria, perché DISH stesso non ha una pagina prezzi pubblica) e citiamo le cifre letteralmente. Affermazioni non presenti 1:1 in una fonte concorrente non compaiono qui. Se un fornitore non pubblica i prezzi (SIDES), lo scriviamo così — senza giudicare. Niente stelle, niente classifiche, niente punteggi — solo fatti, e lo spazio perché tu decida.",
    asOfNote: "Fonti al 07.05.2026 · Re-audit trimestrale (promemoria in calendario)",
  },
  customerStorySectionHeading: "Come l'ha vissuto un ristorante DACH",
  metaFaq: {
    heading: "Domande frequenti prima di scegliere un fornitore",
    sub: "Quello che i ristoratori chiedono tipicamente prima di valutare seriamente un sistema di ordinazione.",
    items: [
      { question: "Quali alternative a Lieferando esistono in Germania?", answer: "Sei fornitori sono regolarmente presi in considerazione nel mercato DACH quando i ristoranti vogliono un proprio sistema di ordinazione invece di una piattaforma di consegna: Gastro Master, OrderSmart, SIDES, DISH Order, Foodamigos e resmio. In più le piattaforme stesse (Lieferando, Wolt, Uber Eats) — che però strutturalmente sono un altro modello (marketplace con commissione, non un sistema proprio)." },
      { question: "Quanto costa tipicamente un sistema di ordinazione proprio per un ristorante?", answer: "Fascia di prezzi comunicati pubblicamente: 0 € a 329 €/mese più 0–649 € di setup una tantum. Alcuni fornitori applicano anche commissioni sugli ordini online (tipicamente 2–4 %), altri lavorano con prezzi fissi senza percentuale sui ricavi. Quale modello sia più conveniente dipende dal volume mensile di ordini online — con volumi bassi spesso commissione, con volumi alti prezzo fisso." },
      { question: "Quale fornitore lavora senza commissione sugli ordini online?", answer: "Tra i cinque concorrenti qui confrontati, OrderSmart, DISH Order, Foodamigos e SIDES lavorano secondo modelli pubblicamente comunicati senza classica commissione sugli ordini. resmio ha un modello misto (4 % commissione o 149,90 €/mese flat). Gastro Master lavora con prezzi fissi senza percentuale sui ricavi." },
      { question: "A cosa devo fare attenzione sulla durata del contratto?", answer: "La fascia di mercato va da contratti standard con preavvisi brevi a impegni più lunghi. Prima della firma: far mettere per iscritto il preavviso, verificare i diritti di esportazione dei dati (database clienti, storico ordini) e chiarire cosa succede al proprio dominio alla fine del contratto." },
      { question: "Come passo da un fornitore all'altro in modo serio?", answer: "Tre passi rendono il passaggio pianificabile: 1) Richiedere l'esportazione dei dati al fornitore precedente (database clienti, storico ordini, eventuale esportazione del menu). 2) Prenotare una consulenza di passaggio con il nuovo fornitore con una lista di migrazione concreta. 3) Pianificare una fase di transizione di 2–4 settimane con funzionamento parallelo per non perdere ordini." },
    ],
  },
  ourPosition: {
    heading: "La nostra posizione",
    body: "Gastro Master è un'azienda a conduzione familiare con sede in Germania. Raccomandiamo il nostro sistema quando un ristorante vuole prezzi fissi senza percentuale sui ricavi, contatto diretto personale e un team di assistenza in tedesco. Non lo raccomandiamo quando il motivo principale è una specifica funzione di prenotazione che noi non copriamo. Quale fornitore si adatti alla tua attività lo decidi in base ai fatti sopra — una consulenza di 15 minuti di solito facilita la decisione.",
  },
  hardCtaLabel: "Consulenza gratuita",
  meta: {
    title: "Confronto sistemi di ordinazione: tutti i 5 fornitori in verifica — Gastro Master",
    description: "Panoramica di mercato di tutti i 5 fornitori di sistemi di ordinazione (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) con prezzo, proprietà e sede — fonti primarie letterali, senza classifiche.",
    dateModified: DATE_MODIFIED,
  },
});

// ─── FA ─────────────────────────────────────────────────────────────────────
const fa = buildHubData("fa", {
  hero: {
    badge: "بررسی واقعیت‌ها با منابع",
    h1: "ارائه‌دهندگان در بازار — واقعیت‌ها، نه وعده‌های تبلیغاتی",
    lead: "در آلمان پنج ارائه‌دهنده مطرح برای سیستم‌های سفارش رستوران وجود دارد. آن‌ها را بر اساس مدل قیمت‌گذاری، ساختار مالکیت و دفتر مرکزی مقایسه می‌کنیم — همه اعداد به‌طور مستقیم از منابع اصلی عمومی نقل شده‌اند، نه بازسازی‌شده.",
  },
  table: {
    heading: "نمای کلی بازار — هر ۵ ارائه‌دهنده در یک نگاه",
    columns: [
      { key: "pricing", label: "مدل قیمت‌گذاری" },
      { key: "ownership", label: "ساختار مالکیت" },
      { key: "seat", label: "دفتر مرکزی" },
    ],
    sourcesNote: "اطلاعات قیمت‌گذاری و مالکیت به‌صورت مستقیم از منابع اصلی پیوندشده نقل شده‌اند (تاریخ ۰۷٫۰۵٫۲۰۲۶). برای دیدن بررسی تفصیلی روی نام ارائه‌دهنده کلیک کنید.",
    ourLabel: "پیشنهاد ما",
  },
  cards: {
    heading: "مقایسه‌های تفصیلی به ازای هر ارائه‌دهنده",
    sub: "بررسی با کارت قیمت، جدول ۷ محوری، پرسش‌های متداول و محاسبه پولی برای هر رقیب.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "متخصص اپ سفارش با صفحه قیمت‌گذاری عمومی — مدل ماژولار وب-شاپ / اپ.", ctaLabel: "بررسی OrderSmart را ببینید" },
      { slug: "sides", name: "SIDES", positioning: "سیستم سفارش با تأمین مالی VC بدون صفحه قیمت عمومی — تمایز با شفافیت قیمت.", ctaLabel: "بررسی SIDES را ببینید" },
      { slug: "dish-order", name: "DISH Order", positioning: "سیستم پشتیبانی‌شده توسط METRO AG با مدل قیمت ثابت (بدون کمیسیون).", ctaLabel: "بررسی DISH Order را ببینید" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "ارائه‌دهنده مونیخی با قیمت پلکانی ۵-سطحی مبتنی بر موفقیت و افزونه‌ها.", ctaLabel: "بررسی Foodamigos را ببینید" },
      { slug: "resmio", name: "resmio", positioning: "سیستم رزرو-اول با عملکرد سفارش اختیاری (کمیسیون یا ثابت).", ctaLabel: "بررسی resmio را ببینید" },
    ],
  },
  methodology: {
    heading: "چگونه مقایسه می‌کنیم",
    body: "برای هر ارائه‌دهنده صفحه قیمت‌گذاری رسمی (یا برای DISH Order بیانیه مطبوعاتی METRO به‌عنوان منبع اصلی، چون خود DISH صفحه قیمت عمومی ندارد) را باز می‌کنیم و اعداد را به‌طور مستقیم نقل می‌کنیم. ادعاهایی که ۱:۱ در منبع رقیب نباشند در این صفحه ظاهر نمی‌شوند. اگر ارائه‌دهنده‌ای قیمت‌هایش را علنی نکند (SIDES) همان را می‌نویسیم — بدون قضاوت. هیچ ستاره، هیچ رتبه‌بندی و هیچ امتیازی نیست — تنها واقعیت و فضای کافی برای تصمیم خودتان.",
    asOfNote: "منابع تا ۰۷٫۰۵٫۲۰۲۶ · بازبینی فصلی (یادآوری تقویم)",
  },
  customerStorySectionHeading: "تجربه یک رستوران DACH",
  metaFaq: {
    heading: "پرسش‌های متداول پیش از انتخاب ارائه‌دهنده",
    sub: "آنچه صاحبان رستوران معمولاً پیش از ارزیابی جدی یک سیستم سفارش می‌پرسند.",
    items: [
      { question: "اصلاً چه گزینه‌های جایگزین Lieferando در آلمان وجود دارد؟", answer: "شش ارائه‌دهنده در بازار DACH هنگامی که رستوران‌ها به‌جای پلتفرم تحویل سیستم سفارش خود را می‌خواهند به‌طور منظم در نظر گرفته می‌شوند: Gastro Master، OrderSmart، SIDES، DISH Order، Foodamigos و resmio. به‌علاوه خود پلتفرم‌های تحویل (Lieferando، Wolt، Uber Eats) — که از نظر ساختار مدل دیگری هستند (بازارگاه با کمیسیون، نه سیستم سفارش شما)." },
      { question: "هزینه یک سیستم سفارش اختصاصی برای یک رستوران معمولاً چقدر است؟", answer: "محدوده قیمت‌های اعلام‌شده عمومی: ۰ تا ۳۲۹ یورو در ماه به‌علاوه ۰ تا ۶۴۹ یورو راه‌اندازی یکباره. برخی ارائه‌دهندگان علاوه بر این کمیسیون روی سفارش‌های آنلاین می‌گیرند (معمولاً ۲ تا ۴ ٪)، برخی دیگر با قیمت ثابت بدون درصد فروش کار می‌کنند. این‌که کدام مدل مقرون‌به‌صرفه‌تر است به حجم سفارش ماهانه آنلاین بستگی دارد — در حجم پایین اغلب کمیسیون، در حجم بالا قیمت ثابت." },
      { question: "کدام ارائه‌دهنده بدون کمیسیون روی سفارش‌های آنلاین کار می‌کند؟", answer: "از پنج رقیب مقایسه‌شده در اینجا، OrderSmart، DISH Order، Foodamigos و SIDES طبق مدل‌های اعلام‌شده عمومی بدون کمیسیون کلاسیک سفارش کار می‌کنند. resmio مدل ترکیبی دارد (۴٪ کمیسیون یا ۱۴۹٫۹۰ یورو/ماه ثابت). Gastro Master با قیمت ثابت و بدون درصد فروش کار می‌کند." },
      { question: "در مورد مدت قرارداد به چه چیزی باید توجه کنم؟", answer: "محدوده بازار از قراردادهای استاندارد با دوره‌های اعلام کوتاه تا تعهدات طولانی‌تر است. پیش از امضا: دوره اعلام را کتبی بگیرید، حق صادرات داده‌ها (پایگاه مشتری، تاریخچه سفارش) را بررسی کنید و وضعیت دامنه خودتان در پایان قرارداد را روشن کنید." },
      { question: "چگونه به‌صورت حرفه‌ای از یک ارائه‌دهنده به دیگری منتقل می‌شوم؟", answer: "سه گام انتقال را قابل برنامه‌ریزی می‌کند: ۱) درخواست صادرات داده از ارائه‌دهنده قبلی (پایگاه مشتری، تاریخچه سفارش، در صورت امکان صادرات منو). ۲) رزرو مشاوره انتقال با ارائه‌دهنده جدید با فهرست انتقال مشخص. ۳) برنامه‌ریزی فاز انتقال ۲–۴ هفته‌ای با عملکرد موازی تا هیچ سفارشی از دست نرود." },
    ],
  },
  ourPosition: {
    heading: "موضع ما",
    body: "Gastro Master یک کسب‌وکار خانوادگی مستقر در آلمان است. سیستم خود را زمانی توصیه می‌کنیم که رستوران قیمت ثابت بدون درصد فروش، تماس مستقیم شخصی و تیم خدمات آلمانی‌زبان بخواهد. آن را زمانی توصیه نمی‌کنیم که دلیل اصلی یک عملکرد رزرو خاص باشد که ما پوشش نمی‌دهیم. اینکه کدام ارائه‌دهنده با کسب‌وکار شما همخوان است را خودتان بر اساس واقعیت‌های بالا تصمیم می‌گیرید — یک مشاوره ۱۵ دقیقه‌ای معمولاً تصمیم را آسان‌تر می‌کند.",
  },
  hardCtaLabel: "مشاوره رایگان",
  meta: {
    title: "مقایسه سیستم سفارش: بررسی هر ۵ ارائه‌دهنده — Gastro Master",
    description: "نمای کلی بازار از همه ۵ ارائه‌دهنده سیستم سفارش (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) با قیمت، مالکیت و دفتر مرکزی — منابع اصلی مستقیم، بدون رتبه‌بندی.",
    dateModified: DATE_MODIFIED,
  },
});

// ─── SI ─────────────────────────────────────────────────────────────────────
const si = buildHubData("si", {
  hero: {
    badge: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව",
    h1: "වෙළඳපොලේ සැපයුම්කරුවන් — පොරොන්දු නොව, කරුණු",
    lead: "ජර්මනියේ ආපනශාලා ඇණවුම් පද්ධති සඳහා සැලකිය යුතු සැපයුම්කරුවන් පහක් ඇත. මූල්‍ය ආකෘතිය, හිමිකාරිත්ව ව්‍යුහය හා ප්‍රධාන කාර්යාලය මත අපි ඔවුන් සසඳමු — සෑම අංකයක්ම ප්‍රසිද්ධ මූලික මූලාශ්‍රවලින් ස්වරූපයෙන්ම උපුටා දක්වා ඇත.",
  },
  table: {
    heading: "වෙළඳපොලේ දළ විශ්ලේෂණය — සියලු සැපයුම්කරුවන් 5 එක නෙතින්",
    columns: [
      { key: "pricing", label: "මිල ආකෘතිය" },
      { key: "ownership", label: "හිමිකාරිත්ව ව්‍යුහය" },
      { key: "seat", label: "ප්‍රධාන කාර්යාලය" },
    ],
    sourcesNote: "සම්බන්ධ කළ මූලික මූලාශ්‍රවලින් මිල සහ හිමිකරු දත්ත සෘජුව උපුටා දක්වා ඇත (07.05.2026 දිනට). සවිස්තර කරුණු පරීක්ෂාව බැලීමට සැපයුම්කරුවාගේ නම මත ක්ලික් කරන්න.",
    ourLabel: "අපගේ ඉදිරිපත් කිරීම",
  },
  cards: {
    heading: "සැපයුම්කරුවෙකුට සවිස්තර සැසඳීම්",
    sub: "මිල කාඩ්පත, අක්ෂ 7 වගුව, FAQ සහ එක් එක් ප්‍රතිවාදියා සඳහා මුදල්-ගණනය සමඟ කරුණු පරීක්ෂාව.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "තමන්ගේම ප්‍රසිද්ධ මිල පිටුවක් සහිත ඇණවුම් යෙදුම් විශේෂඥයා — මොඩියුලර් වෙබ්-සාප්පු / යෙදුම් ආකෘතිය.", ctaLabel: "OrderSmart කරුණු පරීක්ෂාව බලන්න" },
      { slug: "sides", name: "SIDES", positioning: "ප්‍රසිද්ධ මිල පිටුවක් නොමැති VC-අරමුදල් ලත් ඇණවුම් පද්ධතිය — මිල විනිවිදභාවය මත වෙනස.", ctaLabel: "SIDES කරුණු පරීක්ෂාව බලන්න" },
      { slug: "dish-order", name: "DISH Order", positioning: "ස්ථාවර මිල ආකෘතියක් සහිත METRO AG සමූහයේ පද්ධතිය (කොමිස් රහිත).", ctaLabel: "DISH Order කරුණු පරීක්ෂාව බලන්න" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "සාර්ථකත්වය මත පදනම් 5-මට්ටම් මිල ක්‍රමයක් සහ අතිරේක සහිත මියුනික් සැපයුම්කරු.", ctaLabel: "Foodamigos කරුණු පරීක්ෂාව බලන්න" },
      { slug: "resmio", name: "resmio", positioning: "විකල්ප ඇණවුම් කාර්යය සහිත වෙන්කිරීම්-පළමු පද්ධතිය (කොමිස් හෝ ස්ථාවර).", ctaLabel: "resmio කරුණු පරීක්ෂාව බලන්න" },
    ],
  },
  methodology: {
    heading: "අපි සසඳන ආකාරය",
    body: "සෑම සැපයුම්කරුවෙකු සඳහාම නිල මිල පිටුව (හෝ DISH Order සඳහා, METRO මාධ්‍ය නිවේදනය මූලික මූලාශ්‍රය ලෙස, මන්ද DISH සතුව ප්‍රසිද්ධ මිල පිටුවක් නැත) අරිමින් අපි අංක ස්වරූපයෙන්ම උපුටා ගනිමු. ප්‍රතිවාදියාගේ මූලාශ්‍රයක 1:1 සඳහන් නොවන හිමිකම් මෙම පිටුවේ දිස් නොවේ. සැපයුම්කරුවෙකු මිල ප්‍රසිද්ධ නොකරන්නේ නම් (SIDES) අපි එය එසේම ලියමු — විනිශ්චය නොකර. තරු, ශ්‍රේණි ගත කිරීම්, ලකුණු නැත — කරුණු පමණයි, සහ ඔබට තීරණය කිරීමට ඉඩකඩක්.",
    asOfNote: "මූලාශ්‍ර 07.05.2026 දිනට · කාර්තුමය නැවත විගණනය (දින දර්ශන මතක්කිරීම)",
  },
  customerStorySectionHeading: "DACH ආපනශාලාවක් එය අත්දකින ආකාරය",
  metaFaq: {
    heading: "සැපයුම්කරු තේරීමට පෙර නිතර අසන ප්‍රශ්න",
    sub: "ඇණවුම් පද්ධතියක් බරපතල ලෙස ඇගයීමට පෙර ආපනශාලා හිමිකරුවන් සාමාන්‍යයෙන් අසන දේ.",
    items: [
      { question: "ජර්මනියේ Lieferando වලට විකල්ප මොනවාද?", answer: "ආපනශාලා බෙදාහැරීමේ වේදිකාවක් වෙනුවට තමන්ගේම ඇණවුම් පද්ධතියක් අවශ්‍ය වූ විට DACH වෙළඳපොලේ නිතර සලකා බලන සැපයුම්කරුවන් හය ඇත: Gastro Master, OrderSmart, SIDES, DISH Order, Foodamigos සහ resmio. ඊට අමතරව බෙදාහැරීමේ වේදිකා (Lieferando, Wolt, Uber Eats) — එහෙත් ඒවා ව්‍යුහයෙන් වෙනස් ආකෘතියක් (කොමිස් සහිත වෙළඳපොල, ඔබේම පද්ධතියක් නොවේ)." },
      { question: "ආපනශාලාවකට තමන්ගේම ඇණවුම් පද්ධතියක් සාමාන්‍යයෙන් කොපමණ වැය වේද?", answer: "ප්‍රසිද්ධව ප්‍රකාශ කළ මිල පරාසය: මාසයකට 0 € සිට 329 € දක්වා සහ එක්වරක් 0–649 € සැකසුම. සමහර සැපයුම්කරුවන් ඔන්ලයින් ඇණවුම් මත කොමිස් (සාමාන්‍යයෙන් 2–4 %) ද අය කරති, අනෙක් අය ආදායම් කොටසක් නොමැති ස්ථාවර මිල සමඟ කටයුතු කරති. කවර ආකෘතිය වඩා ලාභදායී ද යන්න මාසික ඔන්ලයින් ඇණවුම් පරිමාව මත රඳා පවතී — අඩු පරිමාවේදී බොහෝ විට කොමිස්, ඉහළ පරිමාවේදී ස්ථාවර මිල." },
      { question: "ඔන්ලයින් ඇණවුම් මත කොමිස් රහිතව ක්‍රියා කරන්නේ කුමන සැපයුම්කරු ද?", answer: "මෙහි සසඳන ලද ප්‍රතිවාදීන් පහෙන් OrderSmart, DISH Order, Foodamigos සහ SIDES සම්ප්‍රදායික ඇණවුම් කොමිස් රහිත ප්‍රසිද්ධ ආකෘති අනුව ක්‍රියා කරති. resmio හි මිශ්‍ර ආකෘතියක් ඇත (4 % කොමිස් හෝ මාසයකට 149.90 € ස්ථාවර). Gastro Master ආදායම් කොටසක් නොමැති ස්ථාවර මිල සමඟ කටයුතු කරයි." },
      { question: "ගිවිසුම් කාලය ගැන මා කුමක් සැලකිලිමත් විය යුතුද?", answer: "වෙළඳපල පරාසය කෙටි දැනුම්දීම් කාල සහිත සම්මත ගිවිසුම් සිට දිගු බැඳීම් දක්වා වේ. අත්සන් කිරීමට පෙර: දැනුම්දීම් කාල ලිඛිතව ලබා ගන්න, දත්ත අපනයන අයිතිවාසිකම් (පාරිභෝගික දත්ත, ඇණවුම් ඉතිහාසය) පරීක්ෂා කරන්න සහ ගිවිසුම අවසන් වූ විට ඔබේම වසමට කුමක් සිදුවේද යන්න පැහැදිලි කරන්න." },
      { question: "මම එක් සැපයුම්කරුවෙකුගෙන් තවත් අයෙකුට වගකිවයුතු ලෙස මාරු වන්නේ කෙසේද?", answer: "පියවර තුනක් මාරු කිරීම සැලසුම්ගත කරයි: 1) පෙර සැපයුම්කරුගෙන් දත්ත අපනයනය ඉල්ලන්න (පාරිභෝගික දත්ත, ඇණවුම් ඉතිහාසය, මෙනු අපනයනය ඇත්නම්). 2) නව සැපයුම්කරු සමඟ සංගත සංක්‍රමණ ලැයිස්තුවක් සහිත මාරුවීම් උපදෙස් වෙන්කරවන්න. 3) කිසිදු ඇණවුමක් අහිමි නොවන පරිදි සමාන්තර ක්‍රියාකාරිත්වය සහිත සති 2–4 ක සංක්‍රාන්ති අදියරක් සැලසුම් කරන්න." },
    ],
  },
  ourPosition: {
    heading: "අපගේ ස්ථාවරය",
    body: "Gastro Master ජර්මනියේ පදනම් වූ හිමිකරු-මෙහෙයවන පවුල් ව්‍යාපාරයකි. ආපනශාලාවකට ආදායම් කොටසක් නොමැති ස්ථාවර මිල, පුද්ගලික සෘජු සම්බන්ධතා සහ ජර්මන් සේවා කණ්ඩායමක් අවශ්‍ය නම් අපගේම පද්ධතිය නිර්දේශ කරමු. අප ආවරණය නොකරන විශේෂිත වෙන්කිරීම් කාර්යයක් ප්‍රධාන හේතුව නම් එය නිර්දේශ නොකරමු. ඔබේ ව්‍යාපාරයට ගැළපෙන සැපයුම්කරුවා ඉහත කරුණු මත පදනම්ව ඔබ තීරණය කරයි — මිනිත්තු 15ක උපදෙස් සාමාන්‍යයෙන් තීරණය පහසු කරයි.",
  },
  hardCtaLabel: "නොමිලේ උපදෙස්",
  meta: {
    title: "ඇණවුම්-පද්ධති සැසඳීම: සියලු සැපයුම්කරුවන් 5 කරුණු පරීක්ෂාව — Gastro Master",
    description: "සියලු ඇණවුම්-පද්ධති සැපයුම්කරුවන් 5 (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) මිල, හිමිකාරිත්වය සහ ප්‍රධාන කාර්යාල සහිතව — මූලික මූලාශ්‍ර සෘජුව, ශ්‍රේණිගත කිරීම් නැත.",
    dateModified: DATE_MODIFIED,
  },
});

// ─── RU ─────────────────────────────────────────────────────────────────────
const ru = buildHubData("ru", {
  hero: {
    badge: "Проверка фактов с источниками",
    h1: "Поставщики на рынке — факты, а не рекламные обещания",
    lead: "В Германии есть пять заметных поставщиков ресторанных систем заказа. Мы сравниваем их по модели ценообразования, структуре собственности и месту нахождения — все цифры цитируются дословно из публичных первоисточников, без реконструкции.",
  },
  table: {
    heading: "Обзор рынка — все 5 поставщиков с первого взгляда",
    columns: [
      { key: "pricing", label: "Модель цен" },
      { key: "ownership", label: "Структура собственности" },
      { key: "seat", label: "Местонахождение" },
    ],
    sourcesNote: "Данные о ценах и владельцах процитированы дословно из связанных первоисточников (по состоянию на 07.05.2026). Нажмите на имя поставщика, чтобы открыть подробную проверку фактов.",
    ourLabel: "Наше предложение",
  },
  cards: {
    heading: "Подробные сравнения по каждому поставщику",
    sub: "Проверка с карточкой цен, таблицей по 7 осям, FAQ и расчётом по каждому конкуренту.",
    items: [
      { slug: "order-smart", name: "OrderSmart", positioning: "Специалист по приложениям заказа со своей публичной страницей цен — модульная модель веб-магазин / приложение.", ctaLabel: "Открыть проверку OrderSmart" },
      { slug: "sides", name: "SIDES", positioning: "Финансируемая VC система заказа без публичной страницы цен — дифференциация через прозрачность цен.", ctaLabel: "Открыть проверку SIDES" },
      { slug: "dish-order", name: "DISH Order", positioning: "Поддерживаемая METRO AG система с моделью фиксированных цен (без комиссии).", ctaLabel: "Открыть проверку DISH Order" },
      { slug: "foodamigos", name: "Foodamigos", positioning: "Мюнхенский поставщик с 5-уровневой шкалой цен на основе результатов и дополнениями.", ctaLabel: "Открыть проверку Foodamigos" },
      { slug: "resmio", name: "resmio", positioning: "Система с приоритетом бронирования и опциональной функцией заказа (комиссия или фикс.).", ctaLabel: "Открыть проверку resmio" },
    ],
  },
  methodology: {
    heading: "Как мы сравниваем",
    body: "По каждому поставщику мы открываем официальную страницу цен (или, в случае DISH Order, пресс-релиз METRO как первоисточник, поскольку у самой DISH нет публичной страницы цен) и цитируем цифры дословно. Утверждения, не указанные 1:1 в источнике конкурента, на этой странице не появляются. Если поставщик не публикует свои цены (SIDES), мы так и пишем — без оценки. Здесь нет звёзд, рейтингов и баллов — только факты и пространство для вашего собственного решения.",
    asOfNote: "Источники по состоянию на 07.05.2026 · Ежеквартальный пересмотр (напоминание в календаре)",
  },
  customerStorySectionHeading: "Как это пережил ресторан в регионе DACH",
  metaFaq: {
    heading: "Частые вопросы перед выбором поставщика",
    sub: "Что владельцы ресторанов обычно спрашивают, прежде чем серьёзно оценивать систему заказа.",
    items: [
      { question: "Какие альтернативы Lieferando вообще есть в Германии?", answer: "На рынке DACH регулярно рассматриваются шесть поставщиков, когда рестораны хотят собственную систему заказа вместо платформы доставки: Gastro Master, OrderSmart, SIDES, DISH Order, Foodamigos и resmio. Плюс сами платформы доставки (Lieferando, Wolt, Uber Eats) — но это структурно другая модель (маркетплейс с комиссией, а не собственная система)." },
      { question: "Сколько обычно стоит ресторану собственная система заказа?", answer: "Диапазон публично сообщённых цен: от 0 € до 329 €/мес плюс 0–649 € единовременной настройки. Некоторые поставщики дополнительно берут комиссию с онлайн-заказов (обычно 2–4 %), другие работают по фикс. ценам без процента с оборота. Какая модель выгоднее, зависит от ежемесячного объёма онлайн-заказов — при низком объёме часто комиссия, при высоком — фикс. цена." },
      { question: "Какой поставщик работает без комиссии с онлайн-заказов?", answer: "Из пяти сравниваемых здесь конкурентов OrderSmart, DISH Order, Foodamigos и SIDES работают по публично заявленным моделям без классической комиссии за заказ. У resmio смешанная модель (4 % комиссия или 149,90 €/мес. фикс.). Gastro Master работает по фикс. ценам без процента с оборота." },
      { question: "На что обращать внимание при сроке договора?", answer: "Рыночный диапазон: от стандартных договоров с короткими сроками уведомления до более длительных обязательств. Перед подписанием: получите сроки уведомления в письменной форме, проверьте права экспорта данных (база клиентов, история заказов) и уточните, что произойдёт с вашим доменом по окончании договора." },
      { question: "Как добросовестно перейти от одного поставщика к другому?", answer: "Три шага делают переход управляемым: 1) Запросить экспорт данных у предыдущего поставщика (база клиентов, история заказов, экспорт меню при наличии). 2) Забронировать у нового поставщика консультацию по переходу с конкретным списком миграции. 3) Запланировать переходную фазу 2–4 недели с параллельной работой, чтобы не потерять заказы." },
    ],
  },
  ourPosition: {
    heading: "Наша позиция",
    body: "Gastro Master — семейный бизнес с местонахождением в Германии. Мы рекомендуем нашу собственную систему, когда ресторану нужны фикс. цены без процента с оборота, личный прямой контакт и немецкоязычная сервисная команда. Не рекомендуем её, если главная причина — конкретная функция бронирования, которую мы не покрываем. Какой поставщик подходит вашему бизнесу, вы решаете на основе фактов выше — 15-минутная консультация обычно облегчает решение.",
  },
  hardCtaLabel: "Бесплатная консультация",
  meta: {
    title: "Сравнение систем заказа: проверка фактов всех 5 поставщиков — Gastro Master",
    description: "Обзор рынка всех 5 поставщиков систем заказа (OrderSmart, SIDES, DISH Order, Foodamigos, resmio) с ценами, владельцами и местоположением — дословные первоисточники, без рейтингов.",
    dateModified: DATE_MODIFIED,
  },
});

export const hubByLang: ComparisonHubByLang = { de, en, it, fa, si, ru };

export function getHub(lang: ComparisonLang): ComparisonHubData {
  return hubByLang[lang] ?? hubByLang.de;
}
