import type { ComparisonByLang, ComparisonData } from "./types";

/**
 * /vergleiche/foodamigos — multilingual.
 *
 * Strategischer Angle: **Pricing-Predictability + Modulare Add-Ons + 6-Sprachen-Service**.
 *
 * Audit-Historie:
 * - 2026-05-07 (Iteration 1): Conviction baute auf falscher These "Foodamigos hat
 *   nur Sammel-App, GM hat eigene App-Marke". Salvatore hat den Fehler gefangen.
 * - 2026-05-07 (Iteration 2): "Bestell Portal Foodamigos" (com.amigoorders) ist
 *   laut Google Play applicationCategory "TOOLS" und Beschreibung "Verwalten Sie
 *   Bestellungen, prüfen Sie Details und ändern Sie Verfügbarkeiten" eindeutig
 *   die VERWALTUNGS-APP für Restaurant-Inhaber, NICHT eine kundenseitige Sammel-App.
 *   Foodamigos bietet seinen Restaurant-Kunden ebenfalls eine "vollständig
 *   gebrandete" eigene App (laut foodamigos.io). App-Marke-Differenzierung also
 *   nicht haltbar. Komplett pivotiert auf:
 *     1) Pricing-Predictability (Festpreis vs. erfolgsbasierte 5-Tier-Staffel)
 *     2) Modulare Add-Ons (GM 6 Add-Ons monatlich aktivier-/kündbar)
 *     3) 6 Service-Sprachen vs. DE/EN
 *     4) Eigentümergeführt vs. VC
 *
 * Compliance-Status (Wissens-Bibel #19 + Deep-Dive #02 Block 9 strikt):
 * ❌ KEIN "Foodamigos = Spam-SEO-Player" / "Backlink-Buying"
 * ❌ KEINE Trustpilot-Manipulation direkt zitieren
 * ❌ KEINE persönlichen Angriffe auf Zvinchuk / Aghrim
 * ❌ KEIN "Foodamigos verschwindet bald" — spekulativ
 * ❌ Mobilnummer-Spott vermieden
 * ❌ KEIN "0 € Setup"-Claim für GM (Memory feedback_setup_individuell_bepreist)
 * ❌ KEIN "Sammel-App-Listing"-Claim für Foodamigos (UWG §5 Risiko)
 * ❌ KEIN Claim über Plattform-Integrationen-Lücke bei Foodamigos (nicht verifiziert)
 *
 * Pricing-Modell-Verifikation 2026-05-07: erfolgsbasierte 5-Tier-Staffel
 * (19€/69€/139€/239€/329€/Mo. je nach Umsatz, Cap bei 329€) plus 300€/649€
 * einmalige Setup-Kosten plus +39€/Mo. + 150€ einmal für die App-Add-On.
 * Bei niedrigem Umsatz Foodamigos günstiger; ab ~1.000€ Umsatz/Mo. GM günstiger.
 *
 * Quellen-Reachability geprüft 2026-05-07.
 */

// ─── SHARED FACTS ───────────────────────────────────────────────────────────
const SLUG = "foodamigos";
const COMPETITOR_NAME = "Foodamigos";
const COMPETITOR_LEGAL = "Foodamigos GmbH (Bonn, HRB 26506)";
const SOURCE_DATE = "2026-05-07";

const FOODAMIGOS_HOMEPAGE_DE = "https://www.foodamigos.io/de";
const FOODAMIGOS_PRICING_DE = "https://www.foodamigos.io/de/pricing";
const FOODAMIGOS_PRICING_EN = "https://www.foodamigos.io/en/pricing";
const FOODAMIGOS_IMPRESSUM = "https://www.foodamigos.io/de/impressum";

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
      "Gastro Master vs. Foodamigos: Festpreis-Modell vs. erfolgsbasierte Preisstaffel",
    subHeadline:
      "Faktencheck mit Quellen — Pricing-Modell, modulare Add-Ons, Service-Sprachen, Eigentums-Struktur.",
    trustPills: [
      { label: "800+ DACH-Restaurants" },
      { label: "5,0★ aus 131 Google-Reviews" },
      { label: "0 % Provision auf Direktbestellungen" },
    ],
  },
  quickFacts: [
    {
      axis: "Konkrete Monatspreise",
      competitorValue:
        "Erfolgsbasierte Preisstaffel: 19–329 €/Mo. (umsatz-abhängig, Cap bei 329 €)",
      gastroMasterValue:
        "Bestellsystem 79 €/Mo. Festpreis — umsatz-unabhängig, kein Cap nötig",
      meaning:
        "Bei realistischen Restaurant-Volumen (ab 1.000 €/Mo. Online-Umsatz) zahlst du bei Gastro Master 60–250 € weniger im Monat — und der Festpreis bleibt konstant, auch wenn dein Restaurant wächst.",
      priceBreakdown: [
        {
          packageLabel: "1.000 €/Mo. Online-Umsatz",
          competitorPrice: "139 €/Mo.",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "60 €/Mo. weniger",
        },
        {
          packageLabel: "2.000 €/Mo. Online-Umsatz",
          competitorPrice: "239 €/Mo.",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "160 €/Mo. weniger",
        },
        {
          packageLabel: "≥3.500 €/Mo. (Foodamigos Cap)",
          competitorPrice: "329 €/Mo.",
          gastroMasterPrice: "79 €/Mo.",
          savingsLabel: "250 €/Mo. weniger",
        },
      ],
      source: FOODAMIGOS_PRICING_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modulare Add-Ons (monatlich aktivier-/kündbar)",
      competitorValue:
        "All-in-one-Tier-Struktur ohne separate modulare Add-On-Aktivierung",
      gastroMasterValue:
        "6 monatlich aktivier-/kündbare Add-Ons: Fahrer-App mit GPS · QR-Tischsystem · Self-Service-Kiosk · Bildschirmfunktion (Kitchen Display) · QR-Code-Flyer · Transaktionsumlage",
      meaning:
        "Du startest klein und buchst Add-Ons monatlich dazu, wie dein Restaurant wächst — saisonal aktivieren oder pausieren. Bei Foodamigos ist alles im All-in-one-Tier enthalten, ohne separate modulare Aktivierung.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue:
        "Deutsch und Englisch (laut foodamigos.io — /de + /en sind die einzigen verfügbaren Sprach-Versionen)",
      gastroMasterValue: "6 Sprachen persönlich: DE, EN, IT, RU, FA, SI",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache mit einem festen Telefon-Ansprechpartner.",
      source: FOODAMIGOS_HOMEPAGE_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur",
      competitorValue:
        "VC-finanziertes Startup, gegründet 2021 in Bonn — laut Tracxn ein institutioneller Investor",
      gastroMasterValue:
        "Eigentümergeführt aus Usingen (Hessen) — keine externen Investoren oder Konzern-Mutter",
      meaning:
        "Foodamigos wächst mit VC-Backing und entsprechender Wachstums-Roadmap. Gastro Master entscheidet eigentümergeführt im DACH-Raum, ohne externen Wachstums-Druck.",
      source: FOODAMIGOS_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    {
      axis: "Pricing-Modell",
      competitorValue:
        "Erfolgsbasierte Preisstaffel in 5 Stufen: 19 €/Mo. (bis 300 € Umsatz) · 69 €/Mo. (300–999 €) · 139 €/Mo. (1.000–1.999 €) · 239 €/Mo. (2.000–3.499 €) · 329 €/Mo. (≥3.500 €, Cap) — monatlich kündbar. Setup einmalig 300 € (Standard) oder 649 € (PRO). App-Add-On +39 €/Mo. + 150 € einmal.",
      gastroMasterValue:
        "Festpreis-Modell, umsatz-unabhängig: Bestellsystem ab 79 €/Mo. · App-Paket ab 149 €/Mo. (eigene App + eigene Domain inklusive) · 0 % Provision auf Direktbestellungen · 3 Monate Kündigungsfrist · Setup individuell und projektabhängig",
      meaning:
        "Foodamigos skaliert mit deinem Bestell-Volumen (günstiger Einstieg, Cap bei 329 €/Mo. + 39 € App). Gastro Master bleibt umsatz-unabhängig konstant — derselbe Festpreis bei steigendem Erfolg. Welches Modell zu dir passt, hängt von deinem erwarteten Volumen ab.",
      source: FOODAMIGOS_PRICING_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Pakete im Ökosystem",
      competitorValue:
        "All-in-one-Plattform: Online-Bestellungen, Webseite, Marketing-Tools, gebrandete App (laut foodamigos.io Selbstdarstellung)",
      gastroMasterValue:
        "4 Pakete: Webseite (ab 49 €/Mo.) · Bestellsystem (ab 79 €/Mo.) · App-Paket (ab 149 €/Mo., eigene Domain + native iOS/Android-App) · Kassensystem (ab 69 €/Mo.) — plus Enterprise-Tier für Franchise/Mehr-Standort",
      meaning:
        "Beide Anbieter haben einen breiten Stack mit eigener gebrandeter App. Der Unterschied: Gastro Master kombiniert die Pakete mit 6 separat aktivierbaren modularen Add-Ons aus einer Hand (siehe nächste Zeile).",
      source: FOODAMIGOS_HOMEPAGE_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modulare Add-Ons (monatlich aktivier-/kündbar)",
      competitorValue:
        "All-in-one-Tier-Struktur ohne separate modulare Add-On-Aktivierung — Funktionen sind in den Tier-Stufen enthalten",
      gastroMasterValue:
        "6 separat aktivierbare Add-Ons: Fahrer-App mit GPS · QR-Code-Tischsystem · Self-Service-Kiosk · Bildschirmfunktion (Kitchen Display) · QR-Code-Flyer · Transaktionsumlage",
      meaning:
        "Bei Gastro Master startest du klein und buchst Add-Ons monatlich dazu, wie dein Restaurant wächst — saisonal aktivieren oder pausieren. Bei Foodamigos sind alle Funktionen im jeweiligen Tier-Paket enthalten.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue:
        "Deutsch und Englisch (laut foodamigos.io — /de + /en sind die einzigen verfügbaren Sprach-Versionen, /it /fr /ru geben 404 zurück)",
      gastroMasterValue: "6 Sprachen persönlich: DE, EN, IT, RU, FA, SI — mit festem Telefon-Ansprechpartner",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache.",
      source: FOODAMIGOS_HOMEPAGE_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur & Funding",
      competitorValue:
        "Foodamigos GmbH (Bonn, HRB 26506) — VC-finanziertes Startup, gegründet 2. Sep 2021, laut Tracxn 1 institutioneller Investor",
      gastroMasterValue:
        "Eigentümergeführt aus Usingen (Hessen) — keine externen Investoren oder Konzern-Mutter",
      meaning:
        "Foodamigos wächst mit VC-Backing und entsprechender Wachstums-Roadmap. Gastro Master entscheidet eigentümergeführt im DACH-Raum.",
      source: FOODAMIGOS_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
  ],
  convictionStatement: {
    heading: "Was die Tabelle oben in Klartext bedeutet:",
    punchlines: [
      "Festpreis 79 €/Mo. (umsatz-unabhängig) vs. erfolgsbasierte 5-Tier-Staffel 19–329 €/Mo.",
      "4 Pakete + 6 modulare Add-Ons aus einer Hand — modular skalierbar, monatlich aktivierbar.",
      "Persönlicher Service auf 6 Sprachen (DE, EN, IT, RU, FA, SI) vs. DE/EN.",
    ],
    body:
      "Beide Anbieter bieten ein All-in-one-Bestellsystem mit Webseite, gebrandeter App und Marketing-Tools. Der entscheidende Unterschied liegt im Pricing-Modell und im Service-Modell: bei Gastro Master zahlst du einen festen Monatspreis (Bestellsystem ab 79 €/Mo.), der sich nicht mit deinem Bestell-Erfolg ändert. Bei Foodamigos eine erfolgsbasierte Preisstaffel, die mit deinem Online-Umsatz wächst (Cap bei 329 €/Mo.). Plus: Gastro Master kombiniert die Pakete mit 6 modularen Add-Ons (Fahrer-App-GPS, QR-Tisch, Kiosk, Bildschirmfunktion, QR-Flyer, Transaktionsumlage) — monatlich aktivierbar oder kündbar — und persönlichem Telefon-Service in 6 Sprachen statt zwei. Du brauchst deinen aktuellen Vertrag nicht zu kündigen, bevor wir miteinander reden.",
    closing:
      "Das sind keine Werbeversprechen. Das ist die nüchterne Bestandsaufnahme zweier verschiedener Pricing-Philosophien — umsatz-abhängige Staffel oder umsatz-unabhängiger Festpreis. Welche Philosophie zu deinem Restaurant passt, hängt von deinem erwarteten Bestell-Volumen ab — bei niedrigem Umsatz ist Foodamigos günstiger, ab ca. 1.000 €/Mo. wird Gastro Master günstiger und planbarer.",
  },
  gmAvatars: {
    intro: "Gastro Master ist auf folgende Restaurants ausgerichtet:",
    avatars: [
      "Familiengeführte Pizzerien, Imbisse und Cafés mit 1–5 Standorten in DACH",
      "Betriebe, die persönlichen Service auf 6 Sprachen schätzen (DE, EN, IT, RU, FA, SI)",
      "Restaurants, die einen umsatz-unabhängigen Festpreis bevorzugen statt erfolgsbasierter Pricing-Staffel",
      "Konzepte, die einzelne Add-Ons modular dazubuchen wollen (saisonal aktivieren oder pausieren)",
      "Familienbetriebe, die einen eigentümergeführten Tech-Partner statt VC-Wachstums-Roadmap bevorzugen",
    ],
    closingStatement:
      "Wenn dein Betrieb hier nicht dabei ist, lass die Faktentabelle oben für sich sprechen — wir empfehlen bewusst keinen anderen Anbieter.",
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
        "Was kostet Foodamigos konkret im Vergleich zu Gastro Master?",
      answer:
        "Foodamigos arbeitet mit einer erfolgsbasierten Preisstaffel: 19 €/Mo. (bis 300 € Umsatz), 69 €/Mo. (300–999 €), 139 €/Mo. (1.000–1.999 €), 239 €/Mo. (2.000–3.499 €) und 329 €/Mo. ab 3.500 € Umsatz (Cap) — laut foodamigos.io/de/pricing. Plus einmalige Setup-Kosten von 300 € (Standard) oder 649 € (PRO). Eine eigene App ist als Add-On für +39 €/Mo. + 150 € einmalig verfügbar. Gastro Master arbeitet umsatz-unabhängig mit Festpreis: Webseite ab 49 €/Mo., Bestellsystem ab 79 €/Mo., App-Paket ab 149 €/Mo. (eigene App + Domain inklusive). Bei niedrigem Bestell-Volumen ist Foodamigos günstiger; ab ca. 1.000 € Umsatz/Mo. wird Gastro Master günstiger und planbarer.",
      source: FOODAMIGOS_PRICING_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Foodamigos wirbt mit monatlich kündbar — wie ist das bei Gastro Master?",
      answer:
        "Foodamigos kommuniziert ein monatlich kündbares Vertragsmodell. Bei Gastro Master gilt für die Software-Pakete eine 3-monatige Kündigungsfrist — die 6 modularen Add-Ons (Fahrer-App-GPS, QR-Tisch, Kiosk, Bildschirmfunktion, QR-Flyer, Transaktionsumlage) sind dagegen monatlich aktivierbar und kündbar. Wir kombinieren also die Stabilität einer fest gebuchten Hauptlizenz mit modularer Flexibilität für alles, was du nur saisonal oder projektweise brauchst.",
      source: FOODAMIGOS_PRICING_DE,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Welcher Anbieter ist besser für mein Restaurant — Foodamigos oder Gastro Master?",
      answer:
        "Wir empfehlen bewusst keinen anderen Anbieter. Gastro Master ist auf familiengeführte DACH-Restaurants mit 1–5 Standorten ausgerichtet, die einen umsatz-unabhängigen Festpreis und persönlichen Service in 6 Sprachen schätzen. Wenn dein Betrieb dazu passt, sind wir die richtige Wahl. Foodamigos hat ein erfolgsbasiertes Pricing-Modell (günstiger Einstieg bei niedrigem Umsatz, Cap bei 329 €/Mo.) — wenn dieses Modell besser zu deinem Bestell-Volumen passt, helfen dir die Fakten in der Tabelle bei der eigenen Einordnung.",
    },
    {
      question:
        "Ich bin schon Foodamigos-Kunde — kann ich vor Vertragsende wechseln?",
      answer:
        "Wir prüfen deinen aktuellen Vertrag im kostenlosen Wechsel-Check und rechnen dir konkret aus, was ein Wechsel bedeutet — Kosten, Zeitplan, Datenmigration. Du bekommst eine schriftliche Vergleichs-Rechnung, auch wenn du nicht wechselst.",
    },
    {
      question:
        "Wer steht hinter den beiden Unternehmen, wenn ich einen langfristigen Partner suche?",
      answer:
        "Foodamigos wird von der Foodamigos GmbH (Bonn, HRB 26506) betrieben — einem VC-finanzierten Startup mit institutionellem Investor (laut Tracxn) und Gründungsdatum 2. September 2021. Gastro Master ist eigentümergeführt aus Usingen (Hessen) — keine externen Investoren, keine Konzern-Mutter, ein direkter Telefon-Ansprechpartner pro Restaurant.",
      source: FOODAMIGOS_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "In welchen Sprachen kann ich mit beiden Anbietern sprechen?",
      answer:
        "Foodamigos bietet seine Webseite in Deutsch und Englisch an (laut foodamigos.io haben /de und /en eigene Versionen, /it /fr /ru geben 404 zurück). Gastro Master kommuniziert mit einem festen Telefon-Ansprechpartner aus Hessen in 6 Sprachen: Deutsch, Englisch, Italienisch, Russisch, Persisch und Singhalesisch.",
      source: FOODAMIGOS_HOMEPAGE_DE,
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
      text: "✅ 0 % Provision auf Direktbestellungen — fester, planbarer Monatspreis",
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
    "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für familiengeführte DACH-Restaurants mit umsatz-unabhängigem Festpreis ab 79 €/Mo.",
    "Im Gegensatz zu erfolgsbasierten Pricing-Staffeln, die mit dem Restaurant-Umsatz wachsen, bleibt der Gastro-Master-Festpreis bei steigendem Erfolg konstant.",
    "Gastro Master kombiniert 4 Pakete (Webseite, Bestellsystem, App-Paket, Kassensystem) mit 6 monatlich aktivier-/kündbaren Add-Ons — modulare Skalierung statt Stack-Lock-in.",
    "Persönlicher Service auf 6 Sprachen (DE, EN, IT, RU, FA, SI) mit festem Telefon-Ansprechpartner aus Hessen — eigentümergeführt seit Gründung, keine VC-Wachstums-Roadmap.",
    "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als eigentümergeführte Alternative mit umsatz-unabhängigem Festpreis-Modell.",
  ],
  meta: {
    title:
      "Gastro Master vs. Foodamigos — Faktencheck mit Quellen | Gastro Master",
    description:
      "Sachlicher Vergleich von Gastro Master und Foodamigos: Pricing-Modell (Festpreis vs. erfolgsbasierte 5-Tier-Staffel), modulare Add-Ons, Service-Sprachen, Eigentums-Struktur. Mit Quellen-URLs.",
    dateModified: SOURCE_DATE,
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const EN: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. Foodamigos: Fixed-price model vs. performance-based pricing tiers",
    subHeadline: "Fact check with sources — pricing model, modular add-ons, service languages, ownership structure.",
    trustPills: [
      { label: "800+ DACH restaurants" },
      { label: "5.0★ from 131 Google Reviews" },
      { label: "0 % commission on direct orders" },
    ],
  },
  quickFacts: [
    {
      axis: "Concrete monthly prices",
      competitorValue: "Performance-based pricing: €19–329/mo (revenue-dependent, cap at €329)",
      gastroMasterValue: "Ordering system €79/mo fixed — revenue-independent, no cap needed",
      meaning: "At realistic restaurant volumes (from €1,000/mo online revenue) you pay €60–250 less per month with Gastro Master — and the fixed price stays constant as your restaurant grows.",
      priceBreakdown: [
        { packageLabel: "€1,000/mo online revenue", competitorPrice: "€139/mo", gastroMasterPrice: "€79/mo", savingsLabel: "€60/mo less" },
        { packageLabel: "€2,000/mo online revenue", competitorPrice: "€239/mo", gastroMasterPrice: "€79/mo", savingsLabel: "€160/mo less" },
        { packageLabel: "≥€3,500/mo (Foodamigos cap)", competitorPrice: "€329/mo", gastroMasterPrice: "€79/mo", savingsLabel: "€250/mo less" },
      ],
      source: FOODAMIGOS_PRICING_EN,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Modular add-ons (monthly activatable/cancelable)", competitorValue: "All-in-one tier structure without separate modular add-on activation", gastroMasterValue: "6 monthly activatable/cancelable add-ons: Driver app with GPS · QR table system · Self-service kiosk · Kitchen display · QR flyer · Transaction sharing", meaning: "You start small and add modules monthly as your restaurant grows — activate or pause seasonally. With Foodamigos everything is included in the All-in-one tier without separate modular activation.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "German and English (per foodamigos.io — /de + /en are the only available language versions)", gastroMasterValue: "6 languages personal: DE, EN, IT, RU, FA, SI — with fixed phone contact", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly with a fixed contact.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Ownership structure", competitorValue: "VC-funded startup, founded 2021 in Bonn — per Tracxn one institutional investor", gastroMasterValue: "Owner-led from Usingen (Hesse) — no external investors or parent corporation", meaning: "Foodamigos grows with VC backing and corresponding growth roadmap. Gastro Master decides owner-led inside the DACH region, without external growth pressure.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Pricing model", competitorValue: "Performance-based 5-tier pricing: €19/mo (up to €300 revenue) · €69/mo (€300–999) · €139/mo (€1,000–1,999) · €239/mo (€2,000–3,499) · €329/mo (≥€3,500, cap) — monthly cancelable. One-time setup €300 (Standard) or €649 (PRO). App add-on +€39/mo + €150 one-time.", gastroMasterValue: "Fixed-price model, revenue-independent: Ordering system from €79/mo · App package from €149/mo (own app + own domain included) · 0 % commission on direct orders · 3-month cancellation period · Setup individually scoped and project-dependent", meaning: "Foodamigos scales with your order volume (low entry, cap at €329/mo + €39 app). Gastro Master stays constant regardless of revenue — same fixed price as you grow. Which model fits depends on your expected volume.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { axis: "Packages in the ecosystem", competitorValue: "All-in-one platform: online orders, website, marketing tools, branded app (per foodamigos.io self-positioning)", gastroMasterValue: "4 packages: Website (from €49/mo) · Ordering system (from €79/mo) · App package (from €149/mo, own domain + native iOS/Android app) · POS (from €69/mo) — plus Enterprise tier for franchise/multi-location", meaning: "Both providers have a broad stack with own branded app. The difference: Gastro Master combines packages with 6 separately activatable modular add-ons from one hand (see next row).", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Modular add-ons (monthly activatable/cancelable)", competitorValue: "All-in-one tier structure without separate modular add-on activation — features included in tier levels", gastroMasterValue: "6 separately activatable add-ons: Driver app with GPS · QR table system · Self-service kiosk · Kitchen display · QR flyer · Transaction sharing", meaning: "With Gastro Master you start small and add modules monthly as your restaurant grows — activate or pause seasonally. With Foodamigos all features are included in the respective tier package.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "German and English (per foodamigos.io — /de + /en are the only available language versions, /it /fr /ru return 404)", gastroMasterValue: "6 languages personal: DE, EN, IT, RU, FA, SI — with fixed phone contact", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Ownership structure & funding", competitorValue: "Foodamigos GmbH (Bonn, HRB 26506) — VC-funded startup, founded 2 Sep 2021, per Tracxn 1 institutional investor", gastroMasterValue: "Owner-led from Usingen (Hesse) — no external investors or parent corporation", meaning: "Foodamigos grows with VC backing and corresponding growth roadmap. Gastro Master decides owner-led inside the DACH region.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "What the table above means in plain English:",
    punchlines: [
      "Fixed price €79/mo (revenue-independent) vs. performance-based 5-tier pricing €19–329/mo.",
      "4 packages + 6 modular add-ons from one hand — modularly scalable, monthly activatable.",
      "Personal service in 6 languages (DE, EN, IT, RU, FA, SI) vs. DE/EN.",
    ],
    body: "Both providers offer an All-in-one ordering system with website, branded app and marketing tools. The decisive difference lies in the pricing model and service model: with Gastro Master you pay a fixed monthly price (ordering system from €79/mo) that doesn't change with your order success. With Foodamigos a performance-based pricing tier that scales with your online revenue (cap at €329/mo). Plus: Gastro Master combines packages with 6 modular add-ons (driver app GPS, QR table, kiosk, kitchen display, QR flyer, transaction sharing) — monthly activatable or cancelable — and personal phone service in 6 languages instead of two. You don't need to cancel your current contract before we talk.",
    closing: "These aren't marketing promises. This is a sober assessment of two different pricing philosophies — revenue-dependent tiers or revenue-independent fixed price. Which philosophy fits your restaurant depends on your expected order volume — at low revenue Foodamigos is cheaper, from around €1,000/mo Gastro Master becomes cheaper and more predictable.",
  },
  gmAvatars: {
    intro: "Gastro Master is built for the following restaurants:",
    avatars: [
      "Family-led pizzerias, takeaways and cafés with 1–5 locations in DACH",
      "Operations that value personal service in 6 languages (DE, EN, IT, RU, FA, SI)",
      "Restaurants that prefer a revenue-independent fixed price over performance-based pricing tiers",
      "Concepts that want to add individual add-ons modularly (activate or pause seasonally)",
      "Family businesses that prefer an owner-led tech partner over a VC growth roadmap",
    ],
    closingStatement: "If your business isn't on this list, let the fact-table above speak for itself — we deliberately do not recommend another provider.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google review (originally in German)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "What does Foodamigos cost in comparison to Gastro Master?", answer: "Foodamigos works with a performance-based 5-tier pricing model: €19/mo (up to €300 revenue), €69/mo (€300–999), €139/mo (€1,000–1,999), €239/mo (€2,000–3,499), and €329/mo above €3,500 revenue (cap) — per foodamigos.io/de/pricing. Plus one-time setup costs of €300 (Standard) or €649 (PRO). An own app is available as an add-on for +€39/mo + €150 one-time. Gastro Master works revenue-independent with fixed pricing: website from €49/mo, ordering system from €79/mo, app package from €149/mo (own app + domain included). At low order volume Foodamigos is cheaper; from around €1,000 revenue/mo Gastro Master becomes cheaper and more predictable.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Foodamigos advertises monthly cancelable contracts — how is it with Gastro Master?", answer: "Foodamigos communicates a monthly cancelable contract model. With Gastro Master a 3-month cancellation period applies to software packages — the 6 modular add-ons (driver app GPS, QR table, kiosk, kitchen display, QR flyer, transaction sharing) however are monthly activatable and cancelable. So we combine the stability of a firmly booked main license with modular flexibility for everything you only need seasonally or per project.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Which provider is better for my restaurant — Foodamigos or Gastro Master?", answer: "We deliberately do not recommend another provider. Gastro Master is built for family-led DACH restaurants with 1–5 locations that value a revenue-independent fixed price and personal service in 6 languages. If your business fits, we are the right choice. Foodamigos has a performance-based pricing model (cheaper entry at low revenue, cap at €329/mo) — if that model fits your order volume better, the facts in the table will help you decide on your own." },
    { question: "I'm already a Foodamigos customer — can I switch before contract end?", answer: "We review your current contract in a free switch-check and calculate concretely what a switch means — costs, timeline, data migration. You receive a written comparison even if you decide not to switch." },
    { question: "Who is behind the two companies if I'm looking for a long-term partner?", answer: "Foodamigos is operated by Foodamigos GmbH (Bonn, HRB 26506) — a VC-funded startup with institutional investor (per Tracxn) and founding date 2 September 2021. Gastro Master is owner-led from Usingen (Hesse) — no external investors, no parent corporation, one direct phone contact per restaurant.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
    { question: "What languages can I communicate in with both providers?", answer: "Foodamigos offers its website in German and English (per foodamigos.io /de and /en have own versions, /it /fr /ru return 404). Gastro Master communicates with a fixed phone contact from Hesse in 6 languages: German, English, Italian, Russian, Persian and Sinhala.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3-month cancellation period on software packages — add-ons monthly activatable and cancelable" },
    { claimRef: "D2 / G2", text: "✅ 0 % commission on direct orders — fixed, plannable monthly price" },
    { claimRef: "B-Reihe", text: "✅ Personal phone contact from Hesse — in 6 languages (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Switch offer 50 %: As long as your existing contract is still being paid, you get Gastro Master at 50 % of the regular monthly price", pending: true, softFallback: "✅ Individual switch terms — we review your existing contract in a free switch-check" },
  ],
  cta: { primaryText: "Free consultation", primaryHref: "/kontakt", secondaryText: "Pricing at a glance", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master is the commission-free ordering-system solution for family-led DACH restaurants with revenue-independent fixed price from €79/mo.",
    "Unlike performance-based pricing tiers that scale with restaurant revenue, the Gastro Master fixed price stays constant as success grows.",
    "Gastro Master combines 4 packages (website, ordering system, app package, POS) with 6 monthly activatable/cancelable add-ons — modular scaling instead of stack lock-in.",
    "Personal service in 6 languages (DE, EN, IT, RU, FA, SI) with a fixed phone contact from Hesse — owner-led since founding, no VC growth roadmap.",
    "800+ restaurants in Germany, Austria and Switzerland use Gastro Master as an owner-led alternative with revenue-independent fixed-price model.",
  ],
  meta: { title: "Gastro Master vs. Foodamigos — Fact check with sources | Gastro Master", description: "Factual comparison of Gastro Master and Foodamigos: pricing model (fixed vs. performance-based 5-tier), modular add-ons, service languages, ownership structure. With source URLs.", dateModified: SOURCE_DATE },
};

// ─── Italiano ───────────────────────────────────────────────────────────────
const IT: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. Foodamigos: Modello a prezzo fisso vs. tariffa basata sulla performance",
    subHeadline: "Verifica dei fatti con fonti — modello di prezzo, add-on modulari, lingue di servizio, struttura proprietaria.",
    trustPills: [
      { label: "800+ ristoranti DACH" },
      { label: "5,0★ su 131 recensioni Google" },
      { label: "0 % di commissione sugli ordini diretti" },
    ],
  },
  quickFacts: [
    {
      axis: "Prezzi mensili concreti",
      competitorValue: "Tariffa basata sulla performance: 19–329 €/mese (dipendente dal fatturato, cap a 329 €)",
      gastroMasterValue: "Sistema di ordinazione 79 €/mese fisso — indipendente dal fatturato, nessun cap necessario",
      meaning: "A volumi di ristorante realistici (da 1.000 €/mese di fatturato online) paghi 60–250 € in meno al mese con Gastro Master — e il prezzo fisso resta costante mentre il tuo ristorante cresce.",
      priceBreakdown: [
        { packageLabel: "1.000 €/mese fatturato online", competitorPrice: "139 €/mese", gastroMasterPrice: "79 €/mese", savingsLabel: "60 €/mese in meno" },
        { packageLabel: "2.000 €/mese fatturato online", competitorPrice: "239 €/mese", gastroMasterPrice: "79 €/mese", savingsLabel: "160 €/mese in meno" },
        { packageLabel: "≥3.500 €/mese (cap Foodamigos)", competitorPrice: "329 €/mese", gastroMasterPrice: "79 €/mese", savingsLabel: "250 €/mese in meno" },
      ],
      source: FOODAMIGOS_PRICING_EN,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Add-on modulari (attivabili/disdicibili mensilmente)", competitorValue: "Struttura tier all-in-one senza attivazione modulare separata di add-on", gastroMasterValue: "6 add-on attivabili/disdicibili mensilmente: App autista con GPS · sistema QR tavolo · chiosco self-service · display cucina · volantino QR · riporto transazioni", meaning: "Inizi piccolo e aggiungi moduli mensilmente mentre il tuo ristorante cresce — attiva o sospendi stagionalmente. Con Foodamigos tutto è incluso nel tier all-in-one senza attivazione modulare separata.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Lingue di servizio", competitorValue: "Tedesco e Inglese (secondo foodamigos.io — /de + /en sono le uniche versioni linguistiche disponibili)", gastroMasterValue: "6 lingue personali: DE, EN, IT, RU, FA, SI — con referente telefonico fisso", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua con un referente fisso.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria", competitorValue: "Startup finanziata da VC, fondata nel 2021 a Bonn — secondo Tracxn un investitore istituzionale", gastroMasterValue: "A conduzione del proprietario da Usingen (Assia) — nessun investitore esterno o casa madre", meaning: "Foodamigos cresce con il backing VC e una corrispondente roadmap di crescita. Gastro Master decide a conduzione del proprietario nel territorio DACH, senza pressione di crescita esterna.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Modello di prezzo", competitorValue: "Tariffa basata sulla performance in 5 livelli: 19 €/mese (fino a 300 € fatturato) · 69 €/mese (300–999 €) · 139 €/mese (1.000–1.999 €) · 239 €/mese (2.000–3.499 €) · 329 €/mese (≥3.500 €, cap) — disdicibile mensilmente. Setup una tantum 300 € (Standard) o 649 € (PRO). Add-on App +39 €/mese + 150 € una tantum.", gastroMasterValue: "Modello a prezzo fisso, indipendente dal fatturato: Sistema di ordinazione da 79 €/mese · Pacchetto App da 149 €/mese (app propria + dominio proprio inclusi) · 0 % commissione sugli ordini diretti · 3 mesi di preavviso · Costi di attivazione individuali e dipendenti dal progetto", meaning: "Foodamigos scala con il tuo volume di ordini (ingresso basso, cap a 329 €/mese + 39 € app). Gastro Master resta costante indipendentemente dal fatturato — stesso prezzo fisso anche con il successo crescente. Quale modello ti si addice dipende dal volume previsto.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { axis: "Pacchetti nell'ecosistema", competitorValue: "Piattaforma all-in-one: ordini online, sito web, strumenti di marketing, app brandizzata (secondo l'autopresentazione di foodamigos.io)", gastroMasterValue: "4 pacchetti: Sito web (da 49 €/mese) · Sistema di ordinazione (da 79 €/mese) · Pacchetto App (da 149 €/mese, dominio proprio + app nativa iOS/Android) · Cassa (da 69 €/mese) — più tier Enterprise per franchising/multi-sede", meaning: "Entrambi i fornitori hanno uno stack ampio con app brandizzata propria. La differenza: Gastro Master combina i pacchetti con 6 add-on modulari attivabili separatamente da una sola mano (vedi riga successiva).", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Add-on modulari (attivabili/disdicibili mensilmente)", competitorValue: "Struttura tier all-in-one senza attivazione modulare separata di add-on — funzionalità incluse nei livelli tier", gastroMasterValue: "6 add-on attivabili separatamente: App autista con GPS · sistema QR tavolo · chiosco self-service · display cucina · volantino QR · riporto transazioni", meaning: "Con Gastro Master inizi piccolo e aggiungi moduli mensilmente mentre il tuo ristorante cresce — attiva o sospendi stagionalmente. Con Foodamigos tutte le funzionalità sono incluse nel rispettivo pacchetto tier.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Lingue di servizio", competitorValue: "Tedesco e Inglese (secondo foodamigos.io — /de + /en sono le uniche versioni linguistiche disponibili, /it /fr /ru restituiscono 404)", gastroMasterValue: "6 lingue personali: DE, EN, IT, RU, FA, SI — con referente telefonico fisso", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria e finanziamento", competitorValue: "Foodamigos GmbH (Bonn, HRB 26506) — startup finanziata da VC, fondata il 2 settembre 2021, secondo Tracxn 1 investitore istituzionale", gastroMasterValue: "A conduzione del proprietario da Usingen (Assia) — nessun investitore esterno o casa madre", meaning: "Foodamigos cresce con il backing VC e una corrispondente roadmap di crescita. Gastro Master decide a conduzione del proprietario nel territorio DACH.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Cosa significa la tabella qui sopra, in chiaro:",
    punchlines: ["Prezzo fisso 79 €/mese (indipendente dal fatturato) vs. tariffa basata sulla performance in 5 livelli 19–329 €/mese.", "4 pacchetti + 6 add-on modulari da una sola mano — scalabili modularmente, attivabili mensilmente.", "Servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI) vs. DE/EN."],
    body: "Entrambi i fornitori offrono un sistema di ordinazione all-in-one con sito web, app brandizzata e strumenti di marketing. La differenza decisiva sta nel modello di prezzo e nel modello di servizio: con Gastro Master paghi un prezzo mensile fisso (sistema di ordinazione da 79 €/mese) che non cambia con il successo dei tuoi ordini. Con Foodamigos una tariffa basata sulla performance che scala con il tuo fatturato online (cap a 329 €/mese). Inoltre: Gastro Master combina i pacchetti con 6 add-on modulari (app autista GPS, QR tavolo, chiosco, display cucina, volantino QR, riporto transazioni) — attivabili o disdicibili mensilmente — e servizio telefonico personale in 6 lingue invece di due. Non devi disdire il tuo contratto attuale prima di parlare con noi.",
    closing: "Non sono promesse pubblicitarie. È una sobria valutazione di due diverse filosofie di prezzo — tariffa dipendente dal fatturato o prezzo fisso indipendente dal fatturato. Quale filosofia si adatta al tuo ristorante dipende dal tuo volume di ordini previsto — a basso fatturato Foodamigos è più economico, da circa 1.000 €/mese Gastro Master diventa più economico e più pianificabile.",
  },
  gmAvatars: {
    intro: "Gastro Master è pensato per i seguenti ristoranti:",
    avatars: [
      "Pizzerie a conduzione familiare, take-away e caffetterie con 1–5 sedi nel territorio DACH",
      "Attività che apprezzano il servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI)",
      "Ristoranti che preferiscono un prezzo fisso indipendente dal fatturato invece di tariffe basate sulla performance",
      "Concetti che vogliono aggiungere singoli add-on modularmente (attivare o sospendere stagionalmente)",
      "Aziende familiari che preferiscono un partner tech a conduzione del proprietario invece di una roadmap di crescita VC",
    ],
    closingStatement: "Se la tua attività non è in questa lista, lascia che la tabella dei fatti qui sopra parli da sola — non raccomandiamo deliberatamente un altro fornitore.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Recensione Google (originale in tedesco)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Quanto costa Foodamigos rispetto a Gastro Master?", answer: "Foodamigos opera con una tariffa basata sulla performance in 5 livelli: 19 €/mese (fino a 300 € fatturato), 69 €/mese (300–999 €), 139 €/mese (1.000–1.999 €), 239 €/mese (2.000–3.499 €) e 329 €/mese a partire da 3.500 € fatturato (cap) — secondo foodamigos.io/de/pricing. Più costi di attivazione una tantum di 300 € (Standard) o 649 € (PRO). Un'app propria è disponibile come add-on per +39 €/mese + 150 € una tantum. Gastro Master opera indipendentemente dal fatturato con prezzo fisso: sito web da 49 €/mese, sistema di ordinazione da 79 €/mese, pacchetto App da 149 €/mese (app propria + dominio inclusi). A basso volume di ordini Foodamigos è più economico; a partire da circa 1.000 € di fatturato/mese Gastro Master diventa più economico e più pianificabile.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Foodamigos pubblicizza contratti disdicibili mensilmente — come è con Gastro Master?", answer: "Foodamigos comunica un modello contrattuale disdicibile mensilmente. Con Gastro Master si applica un preavviso di 3 mesi sui pacchetti software — i 6 add-on modulari (app autista GPS, QR tavolo, chiosco, display cucina, volantino QR, riporto transazioni) invece sono attivabili e disdicibili mensilmente. Combiniamo quindi la stabilità di una licenza principale fissa con la flessibilità modulare per tutto ciò che ti serve solo stagionalmente o per progetto.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Quale fornitore è migliore per il mio ristorante — Foodamigos o Gastro Master?", answer: "Non raccomandiamo deliberatamente un altro fornitore. Gastro Master è pensato per i ristoranti DACH a conduzione familiare con 1–5 sedi che apprezzano un prezzo fisso indipendente dal fatturato e un servizio personale in 6 lingue. Se la tua attività rientra qui, siamo la scelta giusta. Foodamigos ha un modello di prezzo basato sulla performance (ingresso più economico a basso fatturato, cap a 329 €/mese) — se quel modello si adatta meglio al tuo volume di ordini, i fatti nella tabella ti aiuteranno a decidere autonomamente." },
    { question: "Sono già cliente Foodamigos — posso passare prima della scadenza del contratto?", answer: "Esaminiamo il tuo contratto attuale in un check di passaggio gratuito e calcoliamo concretamente cosa significa un cambio — costi, tempistica, migrazione dei dati. Ricevi un confronto scritto anche se decidi di non passare." },
    { question: "Chi c'è dietro le due aziende, se cerco un partner di lungo periodo?", answer: "Foodamigos è gestito dalla Foodamigos GmbH (Bonn, HRB 26506) — uno startup finanziato da VC con investitore istituzionale (secondo Tracxn) e data di fondazione 2 settembre 2021. Gastro Master è a conduzione del proprietario da Usingen (Assia) — nessun investitore esterno, nessuna casa madre, un referente telefonico diretto per ristorante.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
    { question: "In che lingue posso comunicare con entrambi i fornitori?", answer: "Foodamigos offre il suo sito web in tedesco e inglese (secondo foodamigos.io /de e /en hanno versioni proprie, /it /fr /ru restituiscono 404). Gastro Master comunica con un referente telefonico fisso dall'Assia in 6 lingue: tedesco, inglese, italiano, russo, persiano e singalese.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 mesi di preavviso sui pacchetti software — add-on attivabili e disdicibili mensilmente" },
    { claimRef: "D2 / G2", text: "✅ 0 % di commissione sugli ordini diretti — prezzo mensile fisso e pianificabile" },
    { claimRef: "B-Reihe", text: "✅ Referente telefonico personale dall'Assia — in 6 lingue (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Offerta di passaggio 50 %: finché il tuo contratto attuale è ancora in pagamento, ricevi Gastro Master al 50 % del prezzo mensile regolare", pending: true, softFallback: "✅ Condizioni individuali di passaggio — esaminiamo il tuo contratto attuale in un check di passaggio gratuito" },
  ],
  cta: { primaryText: "Consulenza gratuita", primaryHref: "/kontakt", secondaryText: "Prezzi a colpo d'occhio", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master è la soluzione di sistema di ordinazione senza commissione per ristoranti DACH a conduzione familiare con prezzo fisso indipendente dal fatturato da 79 €/mese.",
    "A differenza delle tariffe basate sulla performance che scalano con il fatturato del ristorante, il prezzo fisso di Gastro Master resta costante con il successo crescente.",
    "Gastro Master combina 4 pacchetti (sito web, sistema di ordinazione, pacchetto App, cassa) con 6 add-on attivabili/disdicibili mensilmente — scalatura modulare invece di lock-in dello stack.",
    "Servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI) con referente telefonico fisso dall'Assia — a conduzione del proprietario dalla fondazione, nessuna roadmap di crescita VC.",
    "800+ ristoranti in Germania, Austria e Svizzera usano Gastro Master come alternativa a conduzione del proprietario con modello a prezzo fisso indipendente dal fatturato.",
  ],
  meta: { title: "Gastro Master vs. Foodamigos — Verifica dei fatti con fonti | Gastro Master", description: "Confronto fattuale tra Gastro Master e Foodamigos: modello di prezzo (fisso vs. tariffa performance in 5 livelli), add-on modulari, lingue di servizio, struttura proprietaria. Con URL sorgenti.", dateModified: SOURCE_DATE },
};

// ─── Русский ────────────────────────────────────────────────────────────────
const RU: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. Foodamigos: модель фиксированной цены vs. тарификация по результатам",
    subHeadline: "Проверка фактов с источниками — модель ценообразования, модульные дополнения, языки обслуживания, структура собственности.",
    trustPills: [
      { label: "800+ ресторанов в DACH" },
      { label: "5,0★ из 131 отзыва Google" },
      { label: "0 % комиссии на прямые заказы" },
    ],
  },
  quickFacts: [
    {
      axis: "Конкретные ежемесячные цены",
      competitorValue: "Тарификация по результатам: 19–329 €/мес. (зависит от оборота, лимит 329 €)",
      gastroMasterValue: "Система заказов 79 €/мес. фиксированно — не зависит от оборота, лимит не нужен",
      meaning: "При реальных объёмах ресторана (от 1.000 €/мес. онлайн-оборота) вы платите 60–250 € меньше в месяц с Gastro Master — и фиксированная цена остаётся постоянной, пока ваш ресторан растёт.",
      priceBreakdown: [
        { packageLabel: "1.000 €/мес. онлайн-оборот", competitorPrice: "139 €/мес.", gastroMasterPrice: "79 €/мес.", savingsLabel: "−60 €/мес." },
        { packageLabel: "2.000 €/мес. онлайн-оборот", competitorPrice: "239 €/мес.", gastroMasterPrice: "79 €/мес.", savingsLabel: "−160 €/мес." },
        { packageLabel: "≥3.500 €/мес. (лимит Foodamigos)", competitorPrice: "329 €/мес.", gastroMasterPrice: "79 €/мес.", savingsLabel: "−250 €/мес." },
      ],
      source: FOODAMIGOS_PRICING_EN,
      sourceDate: SOURCE_DATE,
    },
    { axis: "Модульные дополнения (ежемесячно активируемые/отменяемые)", competitorValue: "All-in-one структура уровней без отдельной модульной активации дополнений", gastroMasterValue: "6 ежемесячно активируемых/отменяемых дополнений: Приложение водителя с GPS · QR-стол · Self-service киоск · Кухонный дисплей · QR-флаер · Разделение транзакций", meaning: "Вы начинаете с малого и добавляете модули ежемесячно по мере роста ресторана — активируйте или приостанавливайте сезонно. С Foodamigos всё включено в All-in-one уровень без отдельной модульной активации.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Немецкий и английский (по foodamigos.io — /de + /en единственные доступные языковые версии)", gastroMasterValue: "6 языков персонально: DE, EN, IT, RU, FA, SI — с фиксированным телефонным контактом", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке с фиксированным контактом.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности", competitorValue: "VC-финансируемый стартап, основан в 2021 в Бонне — по Tracxn один институциональный инвестор", gastroMasterValue: "Управляется владельцем из Узингена (Гессен) — без внешних инвесторов или материнской корпорации", meaning: "Foodamigos растёт с VC-поддержкой и соответствующей дорожной картой роста. Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH, без внешнего давления роста.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Модель ценообразования", competitorValue: "Тарификация по результатам в 5 уровнях: 19 €/мес. (до 300 € оборота) · 69 €/мес. (300–999 €) · 139 €/мес. (1.000–1.999 €) · 239 €/мес. (2.000–3.499 €) · 329 €/мес. (≥3.500 €, лимит) — отменяется ежемесячно. Единоразовая установка 300 € (Standard) или 649 € (PRO). Дополнение App +39 €/мес. + 150 € единоразово.", gastroMasterValue: "Модель фиксированной цены, не зависит от оборота: Система заказов от 79 €/мес. · App-пакет от 149 €/мес. (собственное приложение + собственный домен включены) · 0 % комиссии на прямые заказы · 3 месяца уведомления · Затраты на установку индивидуальны и зависят от проекта", meaning: "Foodamigos масштабируется с объёмом ваших заказов (низкий вход, лимит 329 €/мес. + 39 € app). Gastro Master остаётся постоянным независимо от оборота — та же фиксированная цена при росте успеха. Какая модель подходит, зависит от вашего ожидаемого объёма.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { axis: "Пакеты в экосистеме", competitorValue: "All-in-one платформа: онлайн-заказы, сайт, маркетинговые инструменты, брендированное приложение (по самопрезентации foodamigos.io)", gastroMasterValue: "4 пакета: Сайт (от 49 €/мес.) · Система заказов (от 79 €/мес.) · App-пакет (от 149 €/мес., собственный домен + нативное iOS/Android-приложение) · Касса (от 69 €/мес.) — плюс Enterprise-уровень для франчайзинга/мульти-локации", meaning: "У обоих провайдеров широкий стек с собственным брендированным приложением. Разница: Gastro Master комбинирует пакеты с 6 отдельно активируемыми модульными дополнениями из одних рук (см. следующую строку).", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Модульные дополнения (ежемесячно активируемые/отменяемые)", competitorValue: "All-in-one структура уровней без отдельной модульной активации дополнений — функции включены в уровни тиров", gastroMasterValue: "6 отдельно активируемых дополнений: Приложение водителя с GPS · QR-стол · Self-service киоск · Кухонный дисплей · QR-флаер · Разделение транзакций", meaning: "С Gastro Master вы начинаете с малого и добавляете модули ежемесячно по мере роста ресторана — активируйте или приостанавливайте сезонно. С Foodamigos все функции включены в соответствующий пакет тира.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Немецкий и английский (по foodamigos.io — /de + /en единственные доступные языковые версии, /it /fr /ru возвращают 404)", gastroMasterValue: "6 языков персонально: DE, EN, IT, RU, FA, SI — с фиксированным телефонным контактом", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности и финансирование", competitorValue: "Foodamigos GmbH (Бонн, HRB 26506) — VC-финансируемый стартап, основан 2 сентября 2021, по Tracxn 1 институциональный инвестор", gastroMasterValue: "Управляется владельцем из Узингена (Гессен) — без внешних инвесторов или материнской корпорации", meaning: "Foodamigos растёт с VC-поддержкой и соответствующей дорожной картой роста. Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Что таблица выше означает простыми словами:",
    punchlines: ["Фиксированная цена 79 €/мес. (не зависит от оборота) vs. тарификация по результатам в 5 уровнях 19–329 €/мес.", "4 пакета + 6 модульных дополнений из одних рук — модульно масштабируемые, ежемесячно активируемые.", "Персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI) vs. DE/EN."],
    body: "Оба провайдера предлагают All-in-one систему заказов с сайтом, брендированным приложением и маркетинговыми инструментами. Решающая разница в модели ценообразования и модели обслуживания: с Gastro Master вы платите фиксированную ежемесячную цену (система заказов от 79 €/мес.), которая не меняется с успехом ваших заказов. С Foodamigos тарификация по результатам, которая масштабируется с вашим онлайн-оборотом (лимит 329 €/мес.). Плюс: Gastro Master комбинирует пакеты с 6 модульными дополнениями (приложение водителя GPS, QR-стол, киоск, кухонный дисплей, QR-флаер, разделение транзакций) — ежемесячно активируемые или отменяемые — и персональный телефонный сервис на 6 языках вместо двух. Вам не нужно расторгать текущий контракт, прежде чем поговорить с нами.",
    closing: "Это не рекламные обещания. Это трезвая оценка двух разных философий ценообразования — тарифы, зависящие от оборота, или независимая от оборота фиксированная цена. Какая философия подходит вашему ресторану, зависит от ожидаемого объёма заказов — при низком обороте Foodamigos дешевле, примерно от 1.000 €/мес. Gastro Master становится дешевле и предсказуемее.",
  },
  gmAvatars: {
    intro: "Gastro Master ориентирован на следующие рестораны:",
    avatars: [
      "Семейные пиццерии, закусочные и кафе с 1–5 точками в DACH",
      "Заведения, которые ценят персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI)",
      "Рестораны, которые предпочитают фиксированную цену, не зависящую от оборота, тарифам, основанным на результатах",
      "Концепции, которые хотят добавлять отдельные дополнения модульно (активировать или приостанавливать сезонно)",
      "Семейные предприятия, которые предпочитают tech-партнёра под управлением владельца дорожной карте роста VC",
    ],
    closingStatement: "Если ваш бизнес не в этом списке, пусть таблица фактов выше говорит сама за себя — мы сознательно не рекомендуем другого провайдера.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Отзыв Google (оригинал на немецком)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Сколько стоит Foodamigos по сравнению с Gastro Master?", answer: "Foodamigos работает с тарификацией по результатам в 5 уровнях: 19 €/мес. (до 300 € оборота), 69 €/мес. (300–999 €), 139 €/мес. (1.000–1.999 €), 239 €/мес. (2.000–3.499 €) и 329 €/мес. от 3.500 € оборота (лимит) — по foodamigos.io/de/pricing. Плюс единоразовые затраты на установку 300 € (Standard) или 649 € (PRO). Собственное приложение доступно как дополнение за +39 €/мес. + 150 € единоразово. Gastro Master работает независимо от оборота с фиксированной ценой: сайт от 49 €/мес., система заказов от 79 €/мес., App-пакет от 149 €/мес. (собственное приложение + домен включены). При низком объёме заказов Foodamigos дешевле; примерно от 1.000 € оборота/мес. Gastro Master становится дешевле и предсказуемее.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Foodamigos рекламирует ежемесячно отменяемые контракты — как это с Gastro Master?", answer: "Foodamigos сообщает ежемесячно отменяемую модель контракта. С Gastro Master действует 3-месячное уведомление на программных пакетах — 6 модульных дополнений (приложение водителя GPS, QR-стол, киоск, кухонный дисплей, QR-флаер, разделение транзакций) однако активируются и отменяются ежемесячно. Таким образом мы комбинируем стабильность твёрдо забронированной основной лицензии с модульной гибкостью для всего, что вам нужно только сезонно или попроектно.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Какой провайдер лучше для моего ресторана — Foodamigos или Gastro Master?", answer: "Мы сознательно не рекомендуем другого провайдера. Gastro Master ориентирован на семейные DACH-рестораны с 1–5 точками, которые ценят фиксированную цену, не зависящую от оборота, и персональный сервис на 6 языках. Если ваш бизнес подходит, мы — правильный выбор. Foodamigos имеет модель ценообразования, основанную на результатах (более дешёвый вход при низком обороте, лимит 329 €/мес.) — если эта модель лучше подходит вашему объёму заказов, факты в таблице помогут вам решить самостоятельно." },
    { question: "Я уже клиент Foodamigos — могу ли я перейти до конца контракта?", answer: "Мы анализируем ваш текущий контракт в бесплатной проверке перехода и конкретно рассчитываем, что означает переход — затраты, сроки, миграция данных. Вы получаете письменное сравнение, даже если решите не переходить." },
    { question: "Кто стоит за этими двумя компаниями, если я ищу долгосрочного партнёра?", answer: "Foodamigos управляется компанией Foodamigos GmbH (Бонн, HRB 26506) — VC-финансируемым стартапом с институциональным инвестором (по Tracxn) и датой основания 2 сентября 2021. Gastro Master управляется владельцем из Узингена (Гессен) — без внешних инвесторов, без материнской корпорации, один прямой телефонный контакт на ресторан.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
    { question: "На каких языках я могу общаться с обоими провайдерами?", answer: "Foodamigos предлагает свой сайт на немецком и английском (по foodamigos.io /de и /en имеют собственные версии, /it /fr /ru возвращают 404). Gastro Master общается с фиксированным телефонным контактом из Гессена на 6 языках: немецком, английском, итальянском, русском, персидском и сингальском.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 месяца уведомления на программных пакетах — дополнения ежемесячно активируемые и отменяемые" },
    { claimRef: "D2 / G2", text: "✅ 0 % комиссии на прямые заказы — фиксированная и планируемая ежемесячная цена" },
    { claimRef: "B-Reihe", text: "✅ Персональный телефонный контакт из Гессена — на 6 языках (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ Предложение перехода 50 %: пока ваш существующий контракт ещё оплачивается, вы получаете Gastro Master за 50 % от обычной ежемесячной цены", pending: true, softFallback: "✅ Индивидуальные условия перехода — мы анализируем ваш существующий контракт в бесплатной проверке" },
  ],
  cta: { primaryText: "Бесплатная консультация", primaryHref: "/kontakt", secondaryText: "Цены с первого взгляда", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master — это решение системы заказов без комиссии для семейных DACH-ресторанов с фиксированной ценой, не зависящей от оборота, от 79 €/мес.",
    "В отличие от тарификации по результатам, которая масштабируется с оборотом ресторана, фиксированная цена Gastro Master остаётся постоянной с ростом успеха.",
    "Gastro Master комбинирует 4 пакета (сайт, систему заказов, App-пакет, кассу) с 6 ежемесячно активируемыми/отменяемыми дополнениями — модульное масштабирование вместо привязки к стеку.",
    "Персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI) с фиксированным телефонным контактом из Гессена — управляется владельцем с момента основания, без VC-маршрута роста.",
    "800+ ресторанов в Германии, Австрии и Швейцарии используют Gastro Master как альтернативу под управлением владельца с моделью фиксированной цены, не зависящей от оборота.",
  ],
  meta: { title: "Gastro Master vs. Foodamigos — Проверка фактов с источниками | Gastro Master", description: "Фактическое сравнение Gastro Master и Foodamigos: модель ценообразования (фиксированная vs. тарификация по результатам в 5 уровнях), модульные дополнения, языки обслуживания, структура собственности. С URL источников.", dateModified: SOURCE_DATE },
};

// ─── فارسی (Persian, RTL) ──────────────────────────────────────────────────
const FA: ComparisonData = {
  ...DE,
  hook: {
    headline: "گاسترو مَستر در برابر Foodamigos: مدل قیمت ثابت در برابر تعرفه‌گذاری مبتنی بر عملکرد",
    subHeadline: "بررسی واقعیت‌ها با منابع — مدل قیمت‌گذاری، افزونه‌های ماژولار، زبان‌های خدمات، ساختار مالکیت.",
    trustPills: [{ label: "+۸۰۰ رستوران در DACH" }, { label: "۵٫۰★ از ۱۳۱ نظر گوگل" }, { label: "۰٪ کمیسیون روی سفارش‌های مستقیم" }],
  },
  quickFacts: [
    {
      axis: "قیمت‌های ماهانهٔ مشخص",
      competitorValue: "تعرفه‌گذاری مبتنی بر عملکرد: ‎۱۹€‎–‎۳۲۹€‎ /ماه (وابسته به درآمد، سقف ‎۳۲۹€‎)",
      gastroMasterValue: "سامانهٔ سفارش ‎۷۹€‎ /ماه ثابت — مستقل از درآمد، نیاز به سقف نیست",
      meaning: "در حجم‌های واقع‌بینانهٔ رستوران (از ‎۱٬۰۰۰€‎ /ماه درآمد آنلاین) با گاسترو مستر ‎۶۰€‎–‎۲۵۰€‎ کمتر در ماه می‌پردازید — و قیمت ثابت با رشد رستوران شما ثابت می‌ماند.",
      priceBreakdown: [
        { packageLabel: "‎۱٬۰۰۰€‎ /ماه درآمد آنلاین", competitorPrice: "‎۱۳۹€‎ /ماه", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۶۰€‎ /ماه کمتر" },
        { packageLabel: "‎۲٬۰۰۰€‎ /ماه درآمد آنلاین", competitorPrice: "‎۲۳۹€‎ /ماه", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۱۶۰€‎ /ماه کمتر" },
        { packageLabel: "≥‎۳٬۵۰۰€‎ /ماه (سقف Foodamigos)", competitorPrice: "‎۳۲۹€‎ /ماه", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۲۵۰€‎ /ماه کمتر" },
      ],
      source: FOODAMIGOS_PRICING_EN,
      sourceDate: SOURCE_DATE,
    },
    { axis: "افزونه‌های ماژولار (ماهانه قابل فعال‌سازی/لغو)", competitorValue: "ساختار سطح all-in-one بدون فعال‌سازی ماژولار جداگانه", gastroMasterValue: "۶ افزونهٔ ماژولار قابل فعال‌سازی/لغو ماهانه: اپلیکیشن راننده با GPS · سامانهٔ QR میز · کیوسک خودخدمت · نمایشگر آشپزخانه · فلایر QR · تقسیم تراکنش", meaning: "کوچک شروع می‌کنید و ماژول‌ها را ماهانه با رشد رستوران اضافه می‌کنید — به‌صورت فصلی فعال یا متوقف کنید. با Foodamigos همه‌چیز در سطح all-in-one گنجانده شده، بدون فعال‌سازی ماژولار جداگانه.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های خدمات", competitorValue: "آلمانی و انگلیسی (طبق foodamigos.io — /de + /en تنها نسخه‌های زبانی موجودند)", gastroMasterValue: "۶ زبان شخصی: DE, EN, IT, RU, FA, SI — با تماس تلفنی ثابت", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما با تماس ثابت صحبت می‌کند.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت", competitorValue: "استارتاپ تأمین‌مالی شده توسط VC، تأسیس‌شده در ۲۰۲۱ در Bonn — طبق Tracxn یک سرمایه‌گذار نهادی", gastroMasterValue: "مالک‌محور از Usingen (Hesse) — بدون سرمایه‌گذار خارجی یا شرکت مادر", meaning: "Foodamigos با حمایت VC و نقشهٔ راه رشد مربوطه رشد می‌کند. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد، بدون فشار رشد خارجی.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "مدل قیمت‌گذاری", competitorValue: "تعرفه‌گذاری مبتنی بر عملکرد در ۵ سطح: ‎۱۹€‎ /ماه (تا ‎۳۰۰€‎ درآمد) · ‎۶۹€‎ /ماه (‎۳۰۰€‎–‎۹۹۹€‎) · ‎۱۳۹€‎ /ماه (‎۱٬۰۰۰€‎–‎۱٬۹۹۹€‎) · ‎۲۳۹€‎ /ماه (‎۲٬۰۰۰€‎–‎۳٬۴۹۹€‎) · ‎۳۲۹€‎ /ماه (≥‎۳٬۵۰۰€‎، سقف) — ماهانه قابل لغو. نصب یک‌بار ‎۳۰۰€‎ (Standard) یا ‎۶۴۹€‎ (PRO). افزونهٔ App +‎۳۹€‎ /ماه + ‎۱۵۰€‎ یک‌بار.", gastroMasterValue: "مدل قیمت ثابت، مستقل از درآمد: سامانهٔ سفارش از ‎۷۹€‎ /ماه · بستهٔ App از ‎۱۴۹€‎ /ماه (اپلیکیشن اختصاصی + دامنهٔ اختصاصی شامل) · ۰٪ کمیسیون روی سفارش‌های مستقیم · مهلت لغو ۳ ماهه · هزینه‌های راه‌اندازی به‌صورت اختصاصی و وابسته به پروژه تعیین می‌شود", meaning: "Foodamigos با حجم سفارش‌های شما مقیاس می‌گیرد (ورود ارزان، سقف ‎۳۲۹€‎ /ماه + ‎۳۹€‎ app). گاسترو مستر مستقل از درآمد ثابت می‌ماند — همان قیمت ثابت با رشد موفقیت. اینکه کدام مدل مناسب شماست، به حجم پیش‌بینی‌شدهٔ شما بستگی دارد.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { axis: "بسته‌ها در اکوسیستم", competitorValue: "پلتفرم all-in-one: سفارش‌های آنلاین، وب‌سایت، ابزارهای بازاریابی، اپلیکیشن برندشده (طبق ارائهٔ خود foodamigos.io)", gastroMasterValue: "۴ بسته: وب‌سایت (از ‎۴۹€‎ /ماه) · سامانهٔ سفارش (از ‎۷۹€‎ /ماه) · بستهٔ App (از ‎۱۴۹€‎ /ماه، دامنهٔ اختصاصی + اپلیکیشن بومی iOS/Android) · صندوق (از ‎۶۹€‎ /ماه) — به‌علاوهٔ سطح Enterprise برای فرنچایز/چندشعبه", meaning: "هر دو ارائه‌دهنده پشتهٔ گسترده‌ای با اپلیکیشن برندشدهٔ اختصاصی دارند. تفاوت: گاسترو مستر بسته‌ها را با ۶ افزونهٔ ماژولار قابل فعال‌سازی جداگانه از یک دست ترکیب می‌کند (سطر بعد را ببینید).", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "افزونه‌های ماژولار (ماهانه قابل فعال‌سازی/لغو)", competitorValue: "ساختار سطح all-in-one بدون فعال‌سازی ماژولار جداگانه — ویژگی‌ها در سطوح تعرفه گنجانده شده‌اند", gastroMasterValue: "۶ افزونهٔ قابل فعال‌سازی جداگانه: اپلیکیشن راننده با GPS · سامانهٔ QR میز · کیوسک خودخدمت · نمایشگر آشپزخانه · فلایر QR · تقسیم تراکنش", meaning: "با گاسترو مستر کوچک شروع می‌کنید و ماژول‌ها را ماهانه با رشد رستوران اضافه می‌کنید — به‌صورت فصلی فعال یا متوقف کنید. با Foodamigos همهٔ ویژگی‌ها در بستهٔ تعرفهٔ مربوطه گنجانده شده‌اند.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های خدمات", competitorValue: "آلمانی و انگلیسی (طبق foodamigos.io — /de + /en تنها نسخه‌های زبانی موجودند، /it /fr /ru کد ۴۰۴ برمی‌گرداند)", gastroMasterValue: "۶ زبان شخصی: DE, EN, IT, RU, FA, SI — با تماس تلفنی ثابت", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما صحبت می‌کند.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت و تأمین مالی", competitorValue: "Foodamigos GmbH (Bonn, HRB 26506) — استارتاپ تأمین‌مالی شده توسط VC، تأسیس‌شده در ۲ سپتامبر ۲۰۲۱، طبق Tracxn ۱ سرمایه‌گذار نهادی", gastroMasterValue: "مالک‌محور از Usingen (Hesse) — بدون سرمایه‌گذار خارجی یا شرکت مادر", meaning: "Foodamigos با حمایت VC و نقشهٔ راه رشد مربوطه رشد می‌کند. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "جدول بالا به زبان ساده:",
    punchlines: ["قیمت ثابت ‎۷۹€‎ /ماه (مستقل از درآمد) در برابر تعرفه‌گذاری مبتنی بر عملکرد در ۵ سطح ‎۱۹€‎–‎۳۲۹€‎ /ماه.", "۴ بسته + ۶ افزونهٔ ماژولار از یک دست — مقیاس‌پذیری ماژولار، فعال‌سازی ماهانه.", "خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) در برابر DE/EN."],
    body: "هر دو ارائه‌دهنده سامانهٔ سفارش all-in-one با وب‌سایت، اپلیکیشن برندشده و ابزارهای بازاریابی ارائه می‌دهند. تفاوت تعیین‌کننده در مدل قیمت‌گذاری و مدل خدمات نهفته است: با گاسترو مستر یک قیمت ماهانهٔ ثابت می‌پردازید (سامانهٔ سفارش از ‎۷۹€‎ /ماه) که با موفقیت سفارش‌های شما تغییر نمی‌کند. با Foodamigos تعرفهٔ مبتنی بر عملکرد که با درآمد آنلاین شما مقیاس می‌گیرد (سقف ‎۳۲۹€‎ /ماه). به‌علاوه: گاسترو مستر بسته‌ها را با ۶ افزونهٔ ماژولار (اپلیکیشن راننده GPS، QR میز، کیوسک، نمایشگر آشپزخانه، فلایر QR، تقسیم تراکنش) ترکیب می‌کند — قابل فعال‌سازی یا لغو ماهانه — و خدمات تلفنی شخصی به ۶ زبان به‌جای دو. لازم نیست قرارداد فعلی خود را پیش از صحبت با ما لغو کنید.",
    closing: "این‌ها وعده‌های تبلیغاتی نیستند. این یک ارزیابی هوشیارانه از دو فلسفهٔ متفاوت قیمت‌گذاری است — تعرفهٔ وابسته به درآمد یا قیمت ثابت مستقل از درآمد. اینکه کدام فلسفه با رستوران شما متناسب است، به حجم سفارش پیش‌بینی‌شدهٔ شما بستگی دارد — در درآمد پایین Foodamigos ارزان‌تر است، از حدود ‎۱٬۰۰۰€‎ /ماه گاسترو مستر ارزان‌تر و قابل‌برنامه‌ریزی‌تر می‌شود.",
  },
  gmAvatars: {
    intro: "گاسترو مستر برای رستوران‌های زیر طراحی شده است:",
    avatars: [
      "پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها با ۱ تا ۵ شعبه در DACH",
      "کسب‌وکارهایی که خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) را ارزش می‌دانند",
      "رستوران‌هایی که قیمت ثابت مستقل از درآمد را به تعرفه‌های مبتنی بر عملکرد ترجیح می‌دهند",
      "مفاهیمی که می‌خواهند افزونه‌های جداگانه را ماژولار اضافه کنند (به‌صورت فصلی فعال یا متوقف)",
      "کسب‌وکارهای خانوادگی که شریک فناوری مالک‌محور را به نقشهٔ راه رشد VC ترجیح می‌دهند",
    ],
    closingStatement: "اگر کسب‌وکار شما در این فهرست نیست، اجازه دهید جدول واقعیت‌های بالا خودش صحبت کند — ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · نظر گوگل (اصل به آلمانی)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "هزینهٔ Foodamigos در مقایسه با گاسترو مستر چقدر است؟", answer: "Foodamigos با تعرفه‌گذاری مبتنی بر عملکرد در ۵ سطح کار می‌کند: ‎۱۹€‎ /ماه (تا ‎۳۰۰€‎ درآمد)، ‎۶۹€‎ /ماه (‎۳۰۰€‎–‎۹۹۹€‎)، ‎۱۳۹€‎ /ماه (‎۱٬۰۰۰€‎–‎۱٬۹۹۹€‎)، ‎۲۳۹€‎ /ماه (‎۲٬۰۰۰€‎–‎۳٬۴۹۹€‎) و ‎۳۲۹€‎ /ماه از ‎۳٬۵۰۰€‎ درآمد (سقف) — طبق foodamigos.io/de/pricing. به‌علاوهٔ هزینه‌های یک‌بار راه‌اندازی ‎۳۰۰€‎ (Standard) یا ‎۶۴۹€‎ (PRO). یک اپلیکیشن اختصاصی به‌عنوان افزونه با +‎۳۹€‎ /ماه + ‎۱۵۰€‎ یک‌بار در دسترس است. گاسترو مستر مستقل از درآمد با قیمت ثابت کار می‌کند: وب‌سایت از ‎۴۹€‎ /ماه، سامانهٔ سفارش از ‎۷۹€‎ /ماه، بستهٔ App از ‎۱۴۹€‎ /ماه (اپلیکیشن اختصاصی + دامنه شامل). در حجم سفارش پایین Foodamigos ارزان‌تر است؛ از حدود ‎۱٬۰۰۰€‎ درآمد /ماه گاسترو مستر ارزان‌تر و قابل‌برنامه‌ریزی‌تر می‌شود.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Foodamigos با قراردادهای ماهانه قابل لغو تبلیغ می‌کند — با گاسترو مستر چگونه است؟", answer: "Foodamigos مدل قراردادی ماهانه قابل لغو اعلام می‌کند. با گاسترو مستر برای بسته‌های نرم‌افزاری مهلت لغو ۳ ماهه اعمال می‌شود — ۶ افزونهٔ ماژولار (اپلیکیشن راننده GPS، QR میز، کیوسک، نمایشگر آشپزخانه، فلایر QR، تقسیم تراکنش) با این حال ماهانه قابل فعال‌سازی و لغو هستند. بنابراین ما ثبات یک مجوز اصلی محکم را با انعطاف ماژولار برای هر چیزی که فقط به‌صورت فصلی یا پروژه‌ای نیاز دارید ترکیب می‌کنیم.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "کدام ارائه‌دهنده برای رستوران من بهتر است — Foodamigos یا گاسترو مستر؟", answer: "ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم. گاسترو مستر برای رستوران‌های خانوادگی DACH با ۱ تا ۵ شعبه طراحی شده است که قیمت ثابت مستقل از درآمد و خدمات شخصی به ۶ زبان را ارزش می‌دهند. اگر کسب‌وکار شما با این تطبیق دارد، ما انتخاب درستی هستیم. Foodamigos مدل قیمت‌گذاری مبتنی بر عملکرد دارد (ورود ارزان‌تر در درآمد پایین، سقف ‎۳۲۹€‎ /ماه) — اگر آن مدل با حجم سفارش شما بهتر تطبیق دارد، واقعیت‌های جدول به شما کمک می‌کنند خودتان تصمیم بگیرید." },
    { question: "من از قبل مشتری Foodamigos هستم — آیا می‌توانم پیش از پایان قرارداد تعویض کنم؟", answer: "ما قرارداد فعلی شما را در یک بررسی تعویض رایگان مرور می‌کنیم و به‌طور مشخص محاسبه می‌کنیم تعویض چه معنایی دارد — هزینه‌ها، زمان‌بندی، انتقال داده. حتی اگر تصمیم به تعویض نگیرید، یک مقایسهٔ کتبی دریافت می‌کنید." },
    { question: "اگر به‌دنبال شریک بلندمدت هستم، چه کسانی پشت این دو شرکت‌اند؟", answer: "Foodamigos توسط Foodamigos GmbH (Bonn, HRB 26506) اداره می‌شود — یک استارتاپ تأمین‌مالی شده توسط VC با سرمایه‌گذار نهادی (طبق Tracxn) و تاریخ تأسیس ۲ سپتامبر ۲۰۲۱. گاسترو مستر مالک‌محور از Usingen (Hesse) است — بدون سرمایه‌گذار خارجی، بدون شرکت مادر، یک تماس تلفنی مستقیم برای هر رستوران.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
    { question: "به چه زبان‌هایی می‌توانم با هر دو ارائه‌دهنده ارتباط برقرار کنم؟", answer: "Foodamigos وب‌سایت خود را به آلمانی و انگلیسی ارائه می‌دهد (طبق foodamigos.io /de و /en نسخه‌های اختصاصی دارند، /it /fr /ru کد ۴۰۴ برمی‌گرداند). گاسترو مستر با تماس تلفنی ثابت از Hesse به ۶ زبان ارتباط برقرار می‌کند: آلمانی، انگلیسی، ایتالیایی، روسی، فارسی و سینهالی.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری — افزونه‌ها به‌صورت ماهانه قابل فعال‌سازی و لغو" },
    { claimRef: "D2 / G2", text: "✅ ۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت و قابل‌برنامه‌ریزی" },
    { claimRef: "B-Reihe", text: "✅ تماس تلفنی شخصی از Hesse — به ۶ زبان (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ پیشنهاد تعویض ۵۰٪: تا زمانی که قرارداد فعلی شما در حال پرداخت است، گاسترو مستر را با ۵۰٪ از قیمت ماهانهٔ معمول دریافت می‌کنید", pending: true, softFallback: "✅ شرایط تعویض اختصاصی — قرارداد فعلی شما را در یک بررسی رایگان مرور می‌کنیم" },
  ],
  cta: { primaryText: "مشاورهٔ رایگان", primaryHref: "/kontakt", secondaryText: "قیمت‌ها در یک نگاه", secondaryHref: "/preise" },
  quotableOneLiners: [
    "گاسترو مستر راه‌حل سامانهٔ سفارش بدون کمیسیون برای رستوران‌های خانوادگی DACH با قیمت ثابت مستقل از درآمد از ‎۷۹€‎ /ماه است.",
    "برخلاف تعرفه‌های مبتنی بر عملکرد که با درآمد رستوران مقیاس می‌گیرند، قیمت ثابت گاسترو مستر با رشد موفقیت ثابت می‌ماند.",
    "گاسترو مستر ۴ بسته (وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق) را با ۶ افزونهٔ ماژولار قابل فعال‌سازی/لغو ماهانه ترکیب می‌کند — مقیاس‌پذیری ماژولار به‌جای قفل پشته.",
    "خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) با تماس تلفنی ثابت از Hesse — مالک‌محور از زمان تأسیس، بدون نقشهٔ راه رشد VC.",
    "+۸۰۰ رستوران در آلمان، اتریش و سوئیس از گاسترو مستر به‌عنوان جایگزین مالک‌محور با مدل قیمت ثابت مستقل از درآمد استفاده می‌کنند.",
  ],
  meta: { title: "گاسترو مستر در برابر Foodamigos — بررسی واقعیت‌ها با منابع | Gastro Master", description: "مقایسهٔ مبتنی بر واقعیت گاسترو مستر و Foodamigos: مدل قیمت‌گذاری (ثابت در برابر تعرفهٔ عملکرد در ۵ سطح)، افزونه‌های ماژولار، زبان‌های خدمات، ساختار مالکیت. با URL منابع.", dateModified: SOURCE_DATE },
};

// ─── සිංහල (Sinhala) ────────────────────────────────────────────────────────
const SI: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master එදිරිව Foodamigos: ස්ථාවර මිල ආකෘතිය එදිරිව කාර්ය සාධන-පාදක මිල අදියර",
    subHeadline: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව — මිල ආකෘතිය, මොඩියුලර් add-on, සේවා භාෂා, අයිතිකාර ව්‍යුහය.",
    trustPills: [{ label: "DACH ආපනශාලා 800+" }, { label: "Google සමාලෝචන 131න් 5,0★" }, { label: "කෙළින්ම ඇණවුම් මත 0% කොමිස්" }],
  },
  quickFacts: [
    {
      axis: "නිශ්චිත මාසික මිල",
      competitorValue: "කාර්ය සාධන-පාදක මිල: 19 €–329 €/මස (ආදායම මත රඳා පවතී, සීමාව 329 €)",
      gastroMasterValue: "ඇණවුම් පද්ධතිය මසකට 79 € ස්ථාවර — ආදායමෙන් ස්වාධීන, සීමාවක් අවශ්‍ය නැත",
      meaning: "යථාර්ථවාදී ආපනශාලා පරිමාව (මසකට 1,000 € මාර්ගගත ආදායමේ සිට) Gastro Master සමඟ මසකට 60–250 € අඩුවෙන් ගෙවයි — සහ ස්ථාවර මිල ඔබේ ආපනශාලාව වර්ධනය වුවත් ස්ථාවර පවතී.",
      priceBreakdown: [
        { packageLabel: "මසකට 1,000 € මාර්ගගත ආදායම", competitorPrice: "මසකට 139 €", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −60 €" },
        { packageLabel: "මසකට 2,000 € මාර්ගගත ආදායම", competitorPrice: "මසකට 239 €", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −160 €" },
        { packageLabel: "මසකට ≥3,500 € (Foodamigos සීමාව)", competitorPrice: "මසකට 329 €", gastroMasterPrice: "මසකට 79 €", savingsLabel: "මසකට −250 €" },
      ],
      source: FOODAMIGOS_PRICING_EN,
      sourceDate: SOURCE_DATE,
    },
    { axis: "මොඩියුලර් add-on (මාසිකව සක්‍රීය/අවලංගු කළ හැකි)", competitorValue: "all-in-one අදියර ව්‍යුහය වෙනම මොඩියුලර් add-on සක්‍රීය කිරීමක් නොමැතිව", gastroMasterValue: "මාසිකව සක්‍රීය/අවලංගු කළ හැකි add-on 6: GPS සහිත රියදුරු app · QR මේස පද්ධතිය · ස්වයං-සේවා kiosk · kitchen display · QR flyer · ගණුදෙනු බෙදීම", meaning: "ඔබේ ආපනශාලාව වර්ධනය වන විට කුඩාවට ආරම්භ කර මාසිකව මොඩියුල එකතු කරයි — සෘතුමය වශයෙන් සක්‍රීය හෝ විරාම කරයි. Foodamigos සමඟ සියල්ල all-in-one අදියරේ ඇතුළත් වේ, වෙනම මොඩියුලර් සක්‍රීය කිරීමක් නොමැතිව.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ජර්මානු සහ ඉංග්‍රීසි (foodamigos.io අනුව — /de + /en පමණක් ලබා ගත හැකි භාෂා අනුවාද වේ)", gastroMasterValue: "භාෂා 6ක් පුද්ගලිකව: DE, EN, IT, RU, FA, SI — ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master ස්ථාවර සම්බන්ධතාවක් සමඟ කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය", competitorValue: "VC මූල්‍යනය ලද ආරම්භක ව්‍යාපාරයක්, 2021 දී Bonn හි පිහිටුවන ලද — Tracxn අනුව එක් ආයතනික ආයෝජකයෙක්", gastroMasterValue: "Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් හෝ මාතෘ සංගමයක් නැත", meaning: "Foodamigos VC සහාය සහ ඊට අනුරූප වර්ධන සැලැස්මක් සමඟ වර්ධනය වේ. Gastro Master DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී, බාහිර වර්ධන පීඩනයක් නැතිව.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "මිල ආකෘතිය", competitorValue: "කාර්ය සාධන-පාදක මිල අදියර 5කින්: 19 €/මස (300 € දක්වා ආදායම) · 69 €/මස (300–999 €) · 139 €/මස (1,000–1,999 €) · 239 €/මස (2,000–3,499 €) · 329 €/මස (≥3,500 €, සීමාව) — මාසිකව අවලංගු කළ හැකි. එක් වරක් සැකසුම 300 € (Standard) හෝ 649 € (PRO). App add-on +39 €/මස + 150 € එක් වරක්.", gastroMasterValue: "ස්ථාවර මිල ආකෘතිය, ආදායමෙන් ස්වාධීන: ඇණවුම් පද්ධතිය මසකට 79 € සිට · App පැකේජය මසකට 149 € සිට (තමන්ගේම app + තමන්ගේම domain ඇතුළත්) · කෙළින්ම ඇණවුම් මත 0% කොමිස් · මාස 3 අවසන් කිරීමේ දැන්වීම · සැකසුම් පිරිවැය පුද්ගලික සහ ව්‍යාපෘතිය මත රඳා පවතී", meaning: "Foodamigos ඔබේ ඇණවුම් පරිමාව සමඟ පරිමාණය වේ (අඩු ඇතුල්වීම, 329 €/මස + 39 € app සීමාව). Gastro Master ආදායමෙන් ස්වාධීනව ස්ථාවර පවතී — සාර්ථකත්වය වර්ධනය වුවත් එම ස්ථාවර මිල. ඔබට කුමන ආකෘතිය ගැලපේද යන්න ඔබේ අපේක්ෂිත පරිමාව මත රඳා පවතී.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { axis: "පරිසර පද්ධතියේ පැකේජ", competitorValue: "all-in-one වේදිකාව: මාර්ගගත ඇණවුම්, වෙබ් අඩවිය, අලෙවිකරණ මෙවලම්, සන්නාම app (foodamigos.io ස්වයං ඉදිරිපත් කිරීමට අනුව)", gastroMasterValue: "පැකේජ 4: වෙබ් අඩවිය (මසකට 49 € සිට) · ඇණවුම් පද්ධතිය (මසකට 79 € සිට) · App පැකේජය (මසකට 149 € සිට, තමන්ගේම domain + ස්වදේශීය iOS/Android app) · POS (මසකට 69 € සිට) — සහ ෆ්‍රන්චයිස්/බහු-ස්ථාන සඳහා Enterprise tier", meaning: "ප්‍රදායකයන් දෙදෙනාට තමන්ගේම සන්නාම app සහිත පුළුල් තොගයක් ඇත. වෙනස: Gastro Master පැකේජ එක් අතකින් වෙන වෙනම සක්‍රීය කළ හැකි මොඩියුලර් add-on 6 සමඟ ඒකාබද්ධ කරයි (ඊළඟ පේළිය බලන්න).", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුලර් add-on (මාසිකව සක්‍රීය/අවලංගු කළ හැකි)", competitorValue: "all-in-one අදියර ව්‍යුහය වෙනම මොඩියුලර් add-on සක්‍රීය කිරීමක් නොමැතිව — විශේෂාංග අදියර මට්ටම්වල ඇතුළත් වේ", gastroMasterValue: "වෙන වෙනම සක්‍රීය කළ හැකි add-on 6: GPS සහිත රියදුරු app · QR මේස පද්ධතිය · ස්වයං-සේවා kiosk · kitchen display · QR flyer · ගණුදෙනු බෙදීම", meaning: "Gastro Master සමඟ ඔබේ ආපනශාලාව වර්ධනය වන විට කුඩාවට ආරම්භ කර මාසිකව මොඩියුල එකතු කරයි — සෘතුමය වශයෙන් සක්‍රීය හෝ විරාම කරයි. Foodamigos සමඟ සියලු විශේෂාංග අදාළ අදියර පැකේජයේ ඇතුළත් වේ.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ජර්මානු සහ ඉංග්‍රීසි (foodamigos.io අනුව — /de + /en පමණක් ලබා ගත හැකි භාෂා අනුවාද වේ, /it /fr /ru 404 ලබා දේ)", gastroMasterValue: "භාෂා 6ක් පුද්ගලිකව: DE, EN, IT, RU, FA, SI — ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය සහ අරමුදල්", competitorValue: "Foodamigos GmbH (Bonn, HRB 26506) — VC මූල්‍යනය ලද ආරම්භක ව්‍යාපාරයක්, 2021 සැප්තැම්බර් 2 දින පිහිටුවන ලද, Tracxn අනුව ආයතනික ආයෝජකයෙක් 1", gastroMasterValue: "Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් හෝ මාතෘ සංගමයක් නැත", meaning: "Foodamigos VC සහාය සහ ඊට අනුරූප වර්ධන සැලැස්මක් සමඟ වර්ධනය වේ. Gastro Master DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "ඉහත වගුව සරල සිංහලෙන්:",
    punchlines: ["ස්ථාවර මිල මසකට 79 € (ආදායමෙන් ස්වාධීන) එදිරිව කාර්ය සාධන-පාදක මිල අදියර 5කින් මසකට 19 €–329 €.", "පැකේජ 4 + මොඩියුලර් add-on 6 එක් අතකින් — මොඩියුලර් වශයෙන් පරිමාණය කළ හැකි, මාසිකව සක්‍රීය කළ හැකි.", "භාෂා 6කින් පුද්ගලික සේවාව (DE, EN, IT, RU, FA, SI) එදිරිව DE/EN."],
    body: "ප්‍රදායකයන් දෙදෙනාම වෙබ් අඩවිය, සන්නාම app සහ අලෙවිකරණ මෙවලම් සහිත all-in-one ඇණවුම් පද්ධතියක් ඉදිරිපත් කරයි. තීරණාත්මක වෙනස මිල ආකෘතියේ සහ සේවා ආකෘතියේ පවතී: Gastro Master සමඟ ඔබේ ඇණවුම් සාර්ථකත්වය සමඟ වෙනස් නොවන ස්ථාවර මාසික මිලක් ගෙවයි (ඇණවුම් පද්ධතිය මසකට 79 € සිට). Foodamigos සමඟ ඔබේ මාර්ගගත ආදායම සමඟ පරිමාණය වන කාර්ය සාධන-පාදක මිල අදියර (සීමාව මසකට 329 €). ඊට අමතරව: Gastro Master පැකේජ මොඩියුලර් add-on 6 සමඟ ඒකාබද්ධ කරයි (රියදුරු app GPS, QR මේසය, kiosk, kitchen display, QR flyer, ගණුදෙනු බෙදීම) — මාසිකව සක්‍රීය හෝ අවලංගු කළ හැකි — සහ දෙකක් වෙනුවට භාෂා 6කින් පුද්ගලික දුරකථන සේවාව. අප සමඟ කතා කිරීමට පෙර ඔබේ වර්තමාන ගිවිසුම අවසන් කිරීම අවශ්‍ය නොවේ.",
    closing: "මේවා වෙළඳ පොරොන්දු නොවේ. මේ වෙනස් මිල-නියම දෙකක් පිළිබඳ සන්සුන් තක්සේරුවකි — ආදායමෙන් රඳා පවතින අදියර හෝ ආදායමෙන් ස්වාධීන ස්ථාවර මිල. කුමන දර්ශනය ඔබේ ආපනශාලාවට ගැලපේද යන්න ඔබේ අපේක්ෂිත ඇණවුම් පරිමාව මත රඳා පවතී — අඩු ආදායමේදී Foodamigos ලාභදායී, මසකට 1,000 € පමණ සිට Gastro Master ලාභදායී සහ සැලසුම් කළ හැකි බවට පත් වේ.",
  },
  gmAvatars: {
    intro: "Gastro Master පහත සඳහන් ආපනශාලා සඳහා සැකසී ඇත:",
    avatars: [
      "DACH හි ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ",
      "භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව අගය කරන ව්‍යාපාර",
      "කාර්ය සාධන-පාදක මිල අදියර වෙනුවට ආදායමෙන් ස්වාධීන ස්ථාවර මිල කැමති ආපනශාලා",
      "ආදායම අනුව add-on මොඩියුලර් වශයෙන් එකතු කිරීමට කැමති සංකල්ප (සෘතුමය වශයෙන් සක්‍රීය හෝ විරාම)",
      "VC වර්ධන සැලැස්මට වඩා අයිතිකරු මෙහෙයවන tech හවුල්කරුවෙකු කැමති පවුල් ව්‍යාපාර",
    ],
    closingStatement: "ඔබේ ව්‍යාපාරය මෙම ලැයිස්තුවේ නොමැති නම්, ඉහත කරුණු වගුවට තමන්ටම කතා කිරීමට ඉඩ දෙන්න — අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google සමාලෝචනය (මුල් ජර්මානු බසින්)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Gastro Master සමඟ සසඳන විට Foodamigos වල පිරිවැය කොපමණද?", answer: "Foodamigos කාර්ය සාධන-පාදක මිල අදියර 5කින් ක්‍රියා කරයි: 19 €/මස (300 € දක්වා ආදායම), 69 €/මස (300–999 €), 139 €/මස (1,000–1,999 €), 239 €/මස (2,000–3,499 €) සහ 3,500 € ආදායමෙන් 329 €/මස (සීමාව) — foodamigos.io/de/pricing අනුව. ඊට අමතරව එක් වරක් සැකසුම් පිරිවැය 300 € (Standard) හෝ 649 € (PRO). තමන්ගේම app +39 €/මස + 150 € එක් වරක් add-on එකක් ලෙස ලබා ගත හැක. Gastro Master ආදායමෙන් ස්වාධීනව ස්ථාවර මිල සමඟ ක්‍රියා කරයි: වෙබ් අඩවිය මසකට 49 € සිට, ඇණවුම් පද්ධතිය මසකට 79 € සිට, App පැකේජය මසකට 149 € සිට (තමන්ගේම app + domain ඇතුළත්). අඩු ඇණවුම් පරිමාවේදී Foodamigos ලාභදායී; මසකට 1,000 € පමණ ආදායමේ සිට Gastro Master ලාභදායී සහ සැලසුම් කළ හැකි බවට පත් වේ.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "Foodamigos මාසිකව අවලංගු කළ හැකි ගිවිසුම් ප්‍රචාරණය කරයි — Gastro Master සමඟ කෙසේද?", answer: "Foodamigos මාසිකව අවලංගු කළ හැකි ගිවිසුම් ආකෘතියක් සන්නිවේදනය කරයි. Gastro Master සමඟ මෘදුකාංග පැකේජ සඳහා මාස 3 අවසන් කිරීමේ දැන්වීමක් අදාළ වේ — මොඩියුලර් add-on 6 (රියදුරු app GPS, QR මේසය, kiosk, kitchen display, QR flyer, ගණුදෙනු බෙදීම) කෙසේ වෙතත් මාසිකව සක්‍රීය සහ අවලංගු කළ හැකිය. ඉතින් අපි ස්ථාවර බුක් කළ ප්‍රධාන බලපත්‍රයක ස්ථාවරත්වය සෘතුමය වශයෙන් හෝ ව්‍යාපෘතියකට පමණක් අවශ්‍ය සියල්ල සඳහා මොඩියුලර් නම්‍යශීලීත්වය සමඟ ඒකාබද්ධ කරමු.", source: FOODAMIGOS_PRICING_EN, sourceDate: SOURCE_DATE },
    { question: "මගේ ආපනශාලාවට කවුද හොඳ — Foodamigos හෝ Gastro Master?", answer: "අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු. Gastro Master ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා සාදා ඇත, ආදායමෙන් ස්වාධීන ස්ථාවර මිල සහ භාෂා 6කින් පුද්ගලික සේවාව අගය කරයි. ඔබේ ව්‍යාපාරය ගැලපේ නම්, අපි නියම තේරීම වේ. Foodamigos කාර්ය සාධන-පාදක මිල ආකෘතියක් ඇත (අඩු ආදායමේදී ලාභදායී ඇතුල්වීම, මසකට සීමාව 329 €) — එම ආකෘතිය ඔබේ ඇණවුම් පරිමාවට වඩා හොඳින් ගැලපේ නම්, වගුවේ කරුණු ස්වාධීනව තීරණය කිරීමට උදව් කරයි." },
    { question: "මම දැනටමත් Foodamigos ගනුදෙනුකරුවෙක් — ගිවිසුම අවසන් වීමට පෙර මාරු විය හැකිද?", answer: "අපි ඔබේ වර්තමාන ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කර මාරුවක් යනු කුමක්ද — පිරිවැය, කාල සටහන, දත්ත සංක්‍රමණය — යන්න සංයුතව ගණනය කරමු. ඔබ මාරු නොවීමට තීරණය කළත්, ලිඛිත සන්සන්දනයක් ලබා ගනී." },
    { question: "දිගුකාලීන හවුල්කරුවෙකු සොයන්නේ නම්, මෙම සමාගම් දෙක පිටුපස කවුද?", answer: "Foodamigos Foodamigos GmbH (Bonn, HRB 26506) විසින් මෙහෙයවනු ලැබේ — ආයතනික ආයෝජකයෙකු (Tracxn අනුව) සහ පිහිටුවීමේ දිනය 2021 සැප්තැම්බර් 2 සහිත VC මූල්‍යනය ලද ආරම්භක ව්‍යාපාරයකි. Gastro Master Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් නැත, මාතෘ සංගමයක් නැත, ආපනශාලාවකට එක් සෘජු දුරකථන සම්බන්ධතාවක්.", source: FOODAMIGOS_IMPRESSUM, sourceDate: SOURCE_DATE },
    { question: "මම ප්‍රදායකයන් දෙදෙනා සමඟ කුමන භාෂාවලින් සන්නිවේදනය කළ හැකිද?", answer: "Foodamigos සිය වෙබ් අඩවිය ජර්මානු සහ ඉංග්‍රීසි භාෂාවෙන් ඉදිරිපත් කරයි (foodamigos.io අනුව /de සහ /en හට තමන්ගේම අනුවාද ඇත, /it /fr /ru 404 ලබා දේ). Gastro Master Hesse සිට ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ භාෂා 6කින් සන්නිවේදනය කරයි: ජර්මානු, ඉංග්‍රීසි, ඉතාලි, රුසියානු, පර්සියානු සහ සිංහල.", source: FOODAMIGOS_HOMEPAGE_DE, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ මෘදුකාංග පැකේජ මත මාස 3 අවසන් කිරීමේ දැන්වීම — add-on මාසිකව සක්‍රීය සහ අවලංගු කළ හැකි" },
    { claimRef: "D2 / G2", text: "✅ කෙළින්ම ඇණවුම් මත 0% කොමිස් — ස්ථාවර, සැලසුම් කළ හැකි මාසික මිල" },
    { claimRef: "B-Reihe", text: "✅ Hesse සිට පුද්ගලික දුරකථන සම්බන්ධතාව — භාෂා 6කින් (DE, EN, IT, RU, FA, SI)" },
    { claimRef: "H1", text: "✅ මාරු පිරිනැමීම 50%: ඔබේ පවතින ගිවිසුම තවමත් ගෙවමින් සිටින තාක්, ඔබට සාමාන්‍ය මාසික මිලෙන් 50%කට Gastro Master ලැබේ", pending: true, softFallback: "✅ පුද්ගලික මාරු කොන්දේසි — අපි ඔබේ පවතින ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කරමු" },
  ],
  cta: { primaryText: "නොමිලේ උපදෙස්", primaryHref: "/kontakt", secondaryText: "මිල ගණන් එක නෙතින්", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master යනු මසකට 79 € සිට ආදායමෙන් ස්වාධීන ස්ථාවර මිල සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා කොමිස් රහිත ඇණවුම් පද්ධති විසඳුමයි.",
    "ආපනශාලා ආදායම සමඟ පරිමාණය වන කාර්ය සාධන-පාදක මිල අදියර මෙන් නොව, Gastro Master ස්ථාවර මිල සාර්ථකත්වය වර්ධනය වන විට ස්ථාවර පවතී.",
    "Gastro Master පැකේජ 4 (වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS) මාසිකව සක්‍රීය/අවලංගු කළ හැකි add-on 6 සමඟ ඒකාබද්ධ කරයි — තොග-lock-in වෙනුවට මොඩියුලර් පරිමාණය.",
    "Hesse සිට ස්ථාවර දුරකථන සම්බන්ධතාවක් සමඟ භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව — පිහිටුවීමේ සිට අයිතිකරු මෙහෙයවන, VC වර්ධන සැලැස්මක් නැත.",
    "ජර්මනියේ, ඔස්ට්‍රියාවේ සහ ස්විට්සර්ලන්තයේ ආපනශාලා 800+ ක් ආදායමෙන් ස්වාධීන ස්ථාවර මිල ආකෘතිය සහිත අයිතිකරු මෙහෙයවන විකල්පයක් ලෙස Gastro Master භාවිත කරයි.",
  ],
  meta: { title: "Gastro Master එදිරිව Foodamigos — මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව | Gastro Master", description: "Gastro Master සහ Foodamigos හි කරුණු සසඳීම: මිල ආකෘතිය (ස්ථාවර එදිරිව කාර්ය සාධන අදියර 5කින්), මොඩියුලර් add-on, සේවා භාෂා, අයිතිකාර ව්‍යුහය. මූලාශ්‍ර URL සමඟ.", dateModified: SOURCE_DATE },
};

// ─── Registry ───────────────────────────────────────────────────────────────
export const foodamigosByLang: ComparisonByLang = {
  de: DE,
  en: EN,
  it: IT,
  fa: FA,
  si: SI,
  ru: RU,
};

export const foodamigosComparison = DE;
