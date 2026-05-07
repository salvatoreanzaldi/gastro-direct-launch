import type { ComparisonByLang, ComparisonData } from "./types";

/**
 * /vergleiche/sides — multilingual.
 *
 * Strategischer Angle: **Avatar-Klarheit statt Money-Math** (Council 2026-05-06).
 * SIDES zeigt keine öffentlichen Preise → kein konkreter €/€-Vergleich möglich.
 * Stattdessen: ehrliche Selbst-Verortung — SIDES für QSR-Skala/Franchise/Self-Order,
 * Gastro Master für familiengeführte Pizzerien mit 1–5 Standorten. Zwei Welten.
 *
 * Compliance-Status:
 * - UWG §6: alle Fakten haben source + sourceDate (alle Quellen 200 OK)
 * - Salvatore-Prinzip: gmAvatars listet NUR Gastro-Master, keine SIDES-Empfehlung
 * - UWG §5: Customer-Quote bleibt im deutschen Original (Mehlfabrik) — Übersetzung ist UWG-Risiko
 * - No-Gos aus Wissens-Bibel #19 + Deep-Dive Block 9 strikt eingehalten:
 *   ❌ KEIN Trustpilot-€269/Mo Datenpunkt zitiert
 *   ❌ KEINE "catastrophic service support" Quote
 *   ❌ KEINE persönlichen Angriffe auf Wisnewski/Rohland/Wenzel
 *   ❌ KEIN VC-Investment als pauschale Schwäche dargestellt
 *
 * Quellen-Reachability geprüft 2026-05-06 (alle 200 OK).
 */

// ─── SHARED FACTS (sprachunabhängig) ────────────────────────────────────────
const SLUG = "sides";
const COMPETITOR_NAME = "SIDES";
const COMPETITOR_LEGAL = "SimplyDelivery GmbH (Marke SIDES, Berlin)";
const SOURCE_DATE = "2026-05-06";

const SIDES_HOMEPAGE = "https://www.get-sides.de/";
const SIDES_UEBER_UNS = "https://www.get-sides.de/ueber-uns/";
const SIDES_AGB = "https://www.get-sides.de/agb/";
const SIDES_IMPRESSUM = "https://www.get-sides.de/impressum/";
const SIDES_TERMINAL = "https://www.get-sides.de/selbstbedienungsterminal/";
const SIDES_HARDWARE = "https://www.get-sides.de/hardware/";
const SIDES_SUCCESS_STORIES = "https://www.get-sides.de/sides-success-stories/";
const SIDES_FUNDING = "https://fortinocapital.com/portfolio/sides/";

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
    headline: "Gastro Master vs. SIDES: Andere Skala, anderer Restaurant-Typ",
    subHeadline:
      "Faktencheck mit Quellen — Skala, Pricing-Transparenz, Spezialisierung, Eigentums-Struktur.",
    trustPills: [
      { label: "800+ DACH-Restaurants" },
      { label: "5,0★ aus 131 Google-Reviews" },
      { label: "0 % Provision auf Direktbestellungen" },
    ],
  },
  quickFacts: [
    {
      axis: "Kunden-Skala & Spezialisierung",
      competitorValue: "6.400+ Kunden in DACH+NL — Schwerpunkt QSR, Franchise, Self-Order-Terminals",
      gastroMasterValue: "800+ DACH-Restaurants — Schwerpunkt familiengeführte Pizzerien, Imbisse, Cafés",
      meaning:
        "SIDES ist auf industrielle QSR-Skala ausgerichtet. Gastro Master ist auf den DACH-Mittelstand mit 1–5 Standorten ausgerichtet. Zwei verschiedene Restaurant-Typen.",
      source: SIDES_SUCCESS_STORIES,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Pricing-Transparenz",
      competitorValue: "Keine öffentliche Preise-Seite — Anfrage erforderlich",
      gastroMasterValue: "Alle Pakete + Add-Ons transparent auf gastro-master.de/preise",
      meaning:
        "Du siehst bei Gastro Master vor dem Gespräch, was es kostet. Bei SIDES erst nach individueller Anfrage.",
      source: SIDES_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur",
      competitorValue: "VC-finanziert — €10M Series A 2021 (Cusp Capital + Fortino Capital)",
      gastroMasterValue: "Eigentümergeführt aus Usingen, Hessen — keine externen Investoren",
      meaning:
        "SIDES wird von zwei Software-VCs mit-gesteuert. Gastro Master entscheidet eigentümergeführt im DACH-Raum, ohne externen Wachstums-Druck.",
      source: SIDES_FUNDING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modul-Stack & Service-Modell",
      competitorValue: "10+ Module inkl. Self-Order-Terminal, Hardware, Pay, Liefersoftware, Kasse",
      gastroMasterValue: "Fokussierter Stack: Webseite, Bestellsystem, App-Paket, Kassensystem + Add-Ons",
      meaning:
        "SIDES ist breit aufgestellt für Multi-Modul-Käufer. Gastro Master fokussiert auf das, was Pizzerien und Imbisse tatsächlich brauchen.",
      source: SIDES_TERMINAL,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    {
      axis: "Kunden-Anzahl (öffentlich kommuniziert)",
      competitorValue: "6.400+ Kunden in DACH+NL",
      gastroMasterValue: "800+ Restaurants in Deutschland, Österreich, Schweiz",
      meaning:
        "SIDES hat mehr Kunden — ist für industrielle Skala gebaut. Gastro Master hält die Skala bewusst kleiner, um Service-Qualität pro Kunde hoch zu halten.",
      source: SIDES_SUCCESS_STORIES,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Industrie-Spezialisierung",
      competitorValue:
        "Quick-Service, Lieferservice, Ghost Kitchen, Restaurant, Franchise (5 öffentliche Business-Typen auf der Website)",
      gastroMasterValue:
        "Familiengeführte Pizzerien, Imbisse, Cafés, Bäckereien und Lieferdienste mit 1–5 Standorten",
      meaning:
        "SIDES bedient bewusst auch Ghost-Kitchen und Franchise-Konzepte. Gastro Master ist auf den eigentümergeführten DACH-Mittelstand ausgerichtet.",
      source: SIDES_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Pricing-Transparenz",
      competitorValue: "Keine öffentliche Preise-Seite (Stand 2026-05-06)",
      gastroMasterValue: "Alle Pakete + Add-Ons transparent auf /preise",
      meaning:
        "Bei SIDES siehst du Preise erst nach individueller Anfrage. Bei Gastro Master vor dem Gespräch — Webseite ab 49 €/Mo., Bestellsystem ab 79 €/Mo., App-Paket ab 149 €/Mo.",
      source: SIDES_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur & Funding",
      competitorValue:
        "VC-finanziert — €10M Series A 2021 durch Cusp Capital + Fortino Capital",
      gastroMasterValue:
        "Eigentümergeführt aus Usingen (Hessen) — keine externen Investoren",
      meaning:
        "SIDES wächst mit VC-Backing und entsprechender Wachstums-Roadmap. Gastro Master entscheidet eigentümergeführt im DACH-Raum.",
      source: SIDES_FUNDING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modul-Stack-Breite",
      competitorValue:
        "10+ Module inkl. Self-Order-Terminal, Hardware, SIDES Pay, Liefersoftware, Kasse, Webshop & App",
      gastroMasterValue:
        "Webseite · Bestellsystem · App-Paket · Kassensystem · 6 Add-Ons (Fahrer-App, QR-Tisch, Kiosk, Bildschirm, Transaktionsumlage, QR-Flyer)",
      meaning:
        "SIDES bietet einen breiteren Stack inkl. industrieller Komponenten wie Kitchen-Manager. Gastro Master fokussiert auf Bausteine, die familiengeführte Restaurants tatsächlich nutzen.",
      source: SIDES_TERMINAL,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue: "Details auf Anfrage",
      gastroMasterValue: "6 Sprachen: DE, EN, IT, RU, FA, SI",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Hauptsitz & Steuerung",
      competitorValue: "Berlin (SimplyDelivery GmbH) + zweiter Standort Niederlande",
      gastroMasterValue: "Usingen (Hessen) — eigentümergeführt im DACH-Raum",
      meaning:
        "SIDES operiert aus Berlin und den Niederlanden. Gastro Master ist im hessischen DACH-Mittelstand verwurzelt.",
      source: SIDES_IMPRESSUM,
      sourceDate: SOURCE_DATE,
    },
  ],
  convictionStatement: {
    heading: "Was die Tabelle oben in Klartext bedeutet:",
    punchlines: [
      "6.400 vs. 800 Kunden — andere Skala.",
      "Pricing auf Anfrage vs. transparent auf /preise.",
      "QSR/Franchise vs. familiengeführte Pizzerien.",
    ],
    body:
      "SIDES kommuniziert auf seiner Website einen Schwerpunkt auf QSR-Skala, Franchise-Konzepte und Self-Order-Terminals. Gastro Master ist auf familiengeführte Pizzerien, Imbisse und Cafés mit 1–5 Standorten ausgerichtet. Das sind zwei verschiedene Welten. Du brauchst deinen aktuellen Vertrag nicht zu kündigen, bevor wir miteinander reden.",
    closing:
      "Das sind keine Werbeversprechen. Das ist klare Selbst-Verortung — wir sind nicht für jeden Restaurant-Typ gemacht. Für unseren genau.",
  },
  gmAvatars: {
    intro: "Gastro Master ist auf folgende Restaurants ausgerichtet:",
    avatars: [
      "Familiengeführte Pizzerien, Imbisse und Cafés mit 1–5 Standorten in DACH",
      "Betriebe, die persönlichen Service auf 6 Sprachen schätzen (DE, EN, IT, RU, FA, SI)",
      "Restaurants, die eine eigene App-Marke und transparente Festpreise bevorzugen",
      "Lieferdienst- und Takeaway-fokussierte Konzepte mit 0 % Provision auf Direktbestellungen",
      "Familienbetriebe, die einen eigentümergeführten Ansprechpartner statt VC-Roadmap erwarten",
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
        "SIDES hat 6.400 Kunden, Gastro Master nur 800 — warum ist das nicht schlimm für mich?",
      answer:
        "Weil Skala nicht gleich Service-Qualität ist. Gastro Master hält die Kunden-Anzahl bewusst kleiner, damit jedes Restaurant einen persönlichen Ansprechpartner mit direkter Telefonnummer hat. Die richtige Frage ist nicht 'wer ist größer', sondern 'wer passt zu meinem Betrieb'.",
      source: SIDES_SUCCESS_STORIES,
      sourceDate: SOURCE_DATE,
    },
    {
      question: "Was kostet SIDES — und wie vergleicht sich das mit Gastro Master?",
      answer:
        "SIDES kommuniziert auf seiner Website keine öffentlichen Preise (Stand 2026-05-06) — Pricing ist nur auf individuelle Anfrage erhältlich. Gastro Master listet alle Pakete transparent auf gastro-master.de/preise: Webseite ab 49 €/Mo., Bestellsystem ab 79 €/Mo., App-Paket ab 149 €/Mo.",
      source: SIDES_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Welcher Anbieter ist besser für mein Restaurant — SIDES oder Gastro Master?",
      answer:
        "Wir empfehlen bewusst keinen anderen Anbieter. Gastro Master ist auf familiengeführte DACH-Restaurants mit 1–5 Standorten ausgerichtet. Wenn dein Betrieb dazu passt, sind wir die richtige Wahl. SIDES kommuniziert öffentlich einen Schwerpunkt auf QSR, Franchise und Ghost Kitchen — wenn du in diese Richtung gehst, helfen dir die Fakten in der Tabelle bei der eigenen Einordnung.",
    },
    {
      question:
        "Brauche ich Self-Order-Terminals und Kitchen-Manager wie SIDES sie anbietet?",
      answer:
        "SIDES ist auf industrielle QSR-Skala mit Self-Order-Terminals und Kitchen-Manager-Modulen ausgerichtet. Gastro Master fokussiert auf Bausteine, die familiengeführte Pizzerien, Imbisse und Cafés tatsächlich nutzen — Webseite, Bestellsystem, App-Paket, Kassensystem plus 6 modulare Add-Ons. Wenn dein Restaurant kein Kitchen-Display-System mit 50+ Bestellungen pro Stunde braucht, ist der fokussiertere Stack oft die bessere Lösung.",
      source: SIDES_TERMINAL,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Ich bin schon SIDES-Kunde — kann ich vor Vertragsende wechseln?",
      answer:
        "Wir prüfen deinen aktuellen Vertrag im kostenlosen Wechsel-Check und rechnen dir konkret aus, was ein Wechsel bedeutet — Kosten, Zeitplan, Datenmigration. Du bekommst eine schriftliche Vergleichs-Rechnung, auch wenn du nicht wechselst.",
    },
    {
      question:
        "Was bedeutet die VC-Finanzierung von SIDES für mich als Kunde?",
      answer:
        "SIDES wurde 2021 mit einer €10M Series A durch Cusp Capital + Fortino Capital finanziert — beide etablierte B2B-Software-VCs. VC-Backing bedeutet professionelle Strategie-Beratung und Wachstums-Budget. Gastro Master ist eigentümergeführt aus Usingen (Hessen) — keine externen Investoren, keine Series-B-Roadmap. Beide Modelle haben unterschiedliche Implikationen für Pricing-Strategie und Service-Skalierung.",
      source: SIDES_FUNDING,
      sourceDate: SOURCE_DATE,
    },
  ],
  riskReversal: [
    {
      claimRef: "C1",
      text: "✅ 3 Monate Kündigungsfrist auf Software-Pakete — keine 24-Monats-Bindung",
    },
    {
      claimRef: "D2 / G2",
      text: "✅ 0 % Provision auf Direktbestellungen — fester Monatspreis statt prozentualer Anteile am Umsatz",
    },
    {
      claimRef: "B-Reihe",
      text: "✅ Persönlicher Ansprechpartner mit direkter Telefonnummer — keine Hotline-Auslagerung",
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
    "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für familiengeführte DACH-Restaurants mit 1–5 Standorten.",
    "SIDES ist auf QSR-Skala, Franchise-Konzepte und Self-Order-Terminals ausgerichtet — Gastro Master auf familiengeführte Pizzerien, Imbisse und Cafés.",
    "SIDES kommuniziert auf seiner Website keine öffentlichen Preise — Gastro Master listet alle Pakete transparent auf gastro-master.de/preise.",
    "SIDES ist VC-finanziert mit €10M Series A 2021 — Gastro Master ist eigentümergeführt aus Usingen, Hessen, ohne externe Investoren.",
    "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als provisionsfreie Alternative zu Plattform-Lieferdiensten.",
  ],
  meta: {
    title:
      "Gastro Master vs. SIDES — Faktencheck mit Quellen | Gastro Master",
    description:
      "Sachlicher Vergleich von Gastro Master und SIDES: Skala (800 vs. 6.400 Kunden), Pricing-Transparenz, Spezialisierung (Familienmittelstand vs. QSR/Franchise), Eigentums-Struktur. Mit Quellen-URLs.",
    dateModified: SOURCE_DATE,
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const EN: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. SIDES: Different scale, different restaurant type",
    subHeadline:
      "Fact check with sources — scale, pricing transparency, specialization, ownership structure.",
    trustPills: [
      { label: "800+ DACH restaurants" },
      { label: "5.0★ from 131 Google Reviews" },
      { label: "0 % commission on direct orders" },
    ],
  },
  quickFacts: [
    {
      axis: "Customer scale & specialization",
      competitorValue: "6,400+ customers in DACH+NL — focus on QSR, franchise, self-order terminals",
      gastroMasterValue: "800+ DACH restaurants — focus on family-led pizzerias, takeaways, cafés",
      meaning:
        "SIDES is built for industrial QSR scale. Gastro Master is built for the DACH SME segment with 1–5 locations. Two different restaurant types.",
      source: SIDES_SUCCESS_STORIES,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Pricing transparency",
      competitorValue: "No public pricing page — request required",
      gastroMasterValue: "All packages + add-ons transparent on gastro-master.de/preise",
      meaning:
        "With Gastro Master you see prices before the conversation. With SIDES only after a personal request.",
      source: SIDES_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Ownership structure",
      competitorValue: "VC-funded — €10M Series A 2021 (Cusp Capital + Fortino Capital)",
      gastroMasterValue: "Owner-led from Usingen, Hesse — no external investors",
      meaning:
        "SIDES is co-steered by two software VCs. Gastro Master decides owner-led inside the DACH region, without external growth pressure.",
      source: SIDES_FUNDING,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Module stack & service model",
      competitorValue: "10+ modules incl. self-order terminal, hardware, pay, delivery software, POS",
      gastroMasterValue: "Focused stack: website, ordering system, app package, POS + add-ons",
      meaning:
        "SIDES is broadly positioned for multi-module buyers. Gastro Master focuses on what pizzerias and takeaways actually need.",
      source: SIDES_TERMINAL,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    { axis: "Customer count (publicly communicated)", competitorValue: "6,400+ customers in DACH+NL", gastroMasterValue: "800+ restaurants in Germany, Austria, Switzerland", meaning: "SIDES has more customers — built for industrial scale. Gastro Master deliberately keeps scale smaller to maintain service quality per customer.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "Industry specialization", competitorValue: "Quick-Service, Delivery, Ghost Kitchen, Restaurant, Franchise (5 public business types on their website)", gastroMasterValue: "Family-led pizzerias, takeaways, cafés, bakeries and delivery services with 1–5 locations", meaning: "SIDES deliberately also serves ghost kitchen and franchise concepts. Gastro Master is built for the owner-led DACH SME segment.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Pricing transparency", competitorValue: "No public pricing page (as of 2026-05-06)", gastroMasterValue: "All packages + add-ons transparent on /preise", meaning: "With SIDES you see prices only after a personal request. With Gastro Master before the conversation — website from €49/mo, ordering system from €79/mo, app package from €149/mo.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Ownership structure & funding", competitorValue: "VC-funded — €10M Series A 2021 by Cusp Capital + Fortino Capital", gastroMasterValue: "Owner-led from Usingen (Hesse) — no external investors", meaning: "SIDES grows with VC backing and corresponding growth roadmap. Gastro Master decides owner-led inside the DACH region.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "Module stack breadth", competitorValue: "10+ modules incl. self-order terminal, hardware, SIDES Pay, delivery software, POS, webshop & app", gastroMasterValue: "Website · Ordering system · App package · POS system · 6 add-ons (driver app, QR table, kiosk, kitchen display, transaction sharing, QR flyer)", meaning: "SIDES offers a broader stack including industrial components. Gastro Master focuses on building blocks that family-led restaurants actually use.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "Details on request", gastroMasterValue: "6 languages: DE, EN, IT, RU, FA, SI", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Headquarters & control", competitorValue: "Berlin (SimplyDelivery GmbH) + second location in the Netherlands", gastroMasterValue: "Usingen (Hesse) — owner-led inside DACH", meaning: "SIDES operates from Berlin and the Netherlands. Gastro Master is rooted in the Hessian DACH SME segment.", source: SIDES_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "What the table above means in plain English:",
    punchlines: [
      "6,400 vs. 800 customers — different scale.",
      "Pricing on request vs. transparent on /preise.",
      "QSR/franchise vs. family-led pizzerias.",
    ],
    body: "SIDES communicates a focus on QSR scale, franchise concepts and self-order terminals on its website. Gastro Master is built for family-led pizzerias, takeaways and cafés with 1–5 locations. Two different worlds. You don't need to cancel your current contract before we talk.",
    closing: "These aren't marketing promises. This is honest self-positioning — we aren't built for every restaurant type. We're built precisely for ours.",
  },
  gmAvatars: {
    intro: "Gastro Master is built for the following restaurants:",
    avatars: [
      "Family-led pizzerias, takeaways and cafés with 1–5 locations in DACH",
      "Operations that value personal service in 6 languages (DE, EN, IT, RU, FA, SI)",
      "Restaurants that prefer their own app brand and transparent fixed prices",
      "Delivery- and takeaway-focused concepts with 0 % commission on direct orders",
      "Family businesses that expect an owner-led contact instead of a VC roadmap",
    ],
    closingStatement:
      "If your business isn't on this list, let the fact-table above speak for itself — we deliberately do not recommend another provider.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google review (originally in German)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "SIDES has 6,400 customers, Gastro Master only 800 — why is that not bad for me?", answer: "Because scale doesn't equal service quality. Gastro Master deliberately keeps the customer count smaller so every restaurant has a personal contact with a direct phone number. The right question isn't 'who is bigger', but 'who fits my operation'.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { question: "What does SIDES cost — and how does it compare to Gastro Master?", answer: "SIDES does not communicate public prices on its website (as of 2026-05-06) — pricing is only available on individual request. Gastro Master lists all packages transparently on gastro-master.de/preise: website from €49/mo, ordering system from €79/mo, app package from €149/mo.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { question: "Which provider is better for my restaurant — SIDES or Gastro Master?", answer: "We deliberately do not recommend another provider. Gastro Master is built for family-led DACH restaurants with 1–5 locations. If your business fits, we are the right choice. SIDES publicly communicates a focus on QSR, franchise and ghost kitchen — if you are heading in that direction, the facts in the table will help you decide on your own." },
    { question: "Do I need self-order terminals and kitchen managers like SIDES offers them?", answer: "SIDES is built for industrial QSR scale with self-order terminals and kitchen-manager modules. Gastro Master focuses on building blocks that family-led pizzerias, takeaways and cafés actually use — website, ordering system, app package, POS plus 6 modular add-ons. If your restaurant doesn't need a kitchen display system with 50+ orders per hour, the more focused stack is often the better solution.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { question: "I'm already a SIDES customer — can I switch before contract end?", answer: "We review your current contract in a free switch-check and calculate concretely what a switch means — costs, timeline, data migration. You receive a written comparison even if you decide not to switch." },
    { question: "What does SIDES' VC funding mean for me as a customer?", answer: "SIDES was funded with a €10M Series A in 2021 by Cusp Capital + Fortino Capital — both established B2B software VCs. VC backing means professional strategy advice and growth budget. Gastro Master is owner-led from Usingen (Hesse) — no external investors, no Series-B roadmap. Both models have different implications for pricing strategy and service scaling.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3-month cancellation period on software packages — no 24-month lock-in" },
    { claimRef: "D2 / G2", text: "✅ 0 % commission on direct orders — fixed monthly price instead of percentage shares on revenue" },
    { claimRef: "B-Reihe", text: "✅ Personal contact with direct phone number — no hotline outsourcing" },
    { claimRef: "H1", text: "✅ Switch offer 50 %: As long as your existing contract is still being paid, you get Gastro Master at 50 % of the regular monthly price", pending: true, softFallback: "✅ Individual switch terms — we review your existing contract in a free switch-check" },
  ],
  cta: { primaryText: "Free consultation", primaryHref: "/kontakt", secondaryText: "Pricing at a glance", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master is the commission-free ordering-system solution for family-led DACH restaurants with 1–5 locations.",
    "SIDES is built for QSR scale, franchise concepts and self-order terminals — Gastro Master for family-led pizzerias, takeaways and cafés.",
    "SIDES does not communicate public prices on its website — Gastro Master lists all packages transparently on gastro-master.de/preise.",
    "SIDES is VC-funded with a €10M Series A 2021 — Gastro Master is owner-led from Usingen, Hesse, without external investors.",
    "800+ restaurants in Germany, Austria and Switzerland use Gastro Master as a commission-free alternative to platform delivery services.",
  ],
  meta: {
    title: "Gastro Master vs. SIDES — Fact check with sources | Gastro Master",
    description: "Factual comparison of Gastro Master and SIDES: scale (800 vs. 6,400 customers), pricing transparency, specialization (family SME vs. QSR/franchise), ownership structure. With source URLs.",
    dateModified: SOURCE_DATE,
  },
};

// ─── Italiano ───────────────────────────────────────────────────────────────
const IT: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. SIDES: Scala diversa, tipo di ristorante diverso",
    subHeadline: "Verifica dei fatti con fonti — scala, trasparenza dei prezzi, specializzazione, struttura proprietaria.",
    trustPills: [
      { label: "800+ ristoranti DACH" },
      { label: "5,0★ su 131 recensioni Google" },
      { label: "0 % di commissione sugli ordini diretti" },
    ],
  },
  quickFacts: [
    { axis: "Scala clienti & specializzazione", competitorValue: "6.400+ clienti in DACH+NL — focus su QSR, franchising, terminali self-order", gastroMasterValue: "800+ ristoranti DACH — focus su pizzerie a conduzione familiare, take-away, caffetterie", meaning: "SIDES è costruito per la scala industriale QSR. Gastro Master è costruito per il segmento PMI DACH con 1–5 sedi. Due tipi di ristoranti diversi.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "Trasparenza dei prezzi", competitorValue: "Nessuna pagina prezzi pubblica — richiesta necessaria", gastroMasterValue: "Tutti i pacchetti + add-on trasparenti su gastro-master.de/preise", meaning: "Con Gastro Master vedi i prezzi prima della conversazione. Con SIDES solo dopo una richiesta personale.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria", competitorValue: "Finanziato da VC — Series A €10M 2021 (Cusp Capital + Fortino Capital)", gastroMasterValue: "A conduzione del proprietario da Usingen, Assia — nessun investitore esterno", meaning: "SIDES è co-gestito da due VC software. Gastro Master decide a conduzione del proprietario nel territorio DACH, senza pressione di crescita esterna.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "Stack modulare & modello di servizio", competitorValue: "10+ moduli inclusi terminale self-order, hardware, pay, software di consegna, cassa", gastroMasterValue: "Stack focalizzato: sito web, sistema di ordinazione, pacchetto App, cassa + add-on", meaning: "SIDES è ampiamente posizionato per acquirenti multi-modulo. Gastro Master si concentra su ciò di cui pizzerie e take-away hanno effettivamente bisogno.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Numero clienti (comunicato pubblicamente)", competitorValue: "6.400+ clienti in DACH+NL", gastroMasterValue: "800+ ristoranti in Germania, Austria, Svizzera", meaning: "SIDES ha più clienti — costruito per la scala industriale. Gastro Master mantiene deliberatamente la scala più piccola per preservare la qualità del servizio per cliente.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "Specializzazione di settore", competitorValue: "Quick-Service, Consegna, Ghost Kitchen, Ristorante, Franchising (5 tipi di business pubblici sul loro sito)", gastroMasterValue: "Pizzerie a conduzione familiare, take-away, caffetterie, panetterie e servizi di consegna con 1–5 sedi", meaning: "SIDES serve deliberatamente anche concetti ghost kitchen e franchising. Gastro Master è costruito per il segmento PMI DACH a conduzione del proprietario.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Trasparenza dei prezzi", competitorValue: "Nessuna pagina prezzi pubblica (stato 2026-05-06)", gastroMasterValue: "Tutti i pacchetti + add-on trasparenti su /preise", meaning: "Con SIDES vedi i prezzi solo dopo una richiesta personale. Con Gastro Master prima della conversazione — sito web da 49 €/mese, sistema di ordinazione da 79 €/mese, pacchetto App da 149 €/mese.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria & finanziamento", competitorValue: "Finanziato da VC — Series A €10M 2021 da Cusp Capital + Fortino Capital", gastroMasterValue: "A conduzione del proprietario da Usingen (Assia) — nessun investitore esterno", meaning: "SIDES cresce con il backing dei VC e una corrispondente roadmap di crescita. Gastro Master decide a conduzione del proprietario nel territorio DACH.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "Ampiezza dello stack modulare", competitorValue: "10+ moduli inclusi terminale self-order, hardware, SIDES Pay, software di consegna, cassa, webshop & app", gastroMasterValue: "Sito web · Sistema di ordinazione · Pacchetto App · Sistema di cassa · 6 add-on (app autista, QR tavolo, chiosco, display cucina, riporto transazioni, volantino QR)", meaning: "SIDES offre uno stack più ampio inclusi componenti industriali. Gastro Master si concentra su mattoni che i ristoranti a conduzione familiare usano effettivamente.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { axis: "Lingue del servizio", competitorValue: "Dettagli su richiesta", gastroMasterValue: "6 lingue: DE, EN, IT, RU, FA, SI", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Sede e gestione", competitorValue: "Berlino (SimplyDelivery GmbH) + seconda sede nei Paesi Bassi", gastroMasterValue: "Usingen (Assia) — a conduzione del proprietario nel territorio DACH", meaning: "SIDES opera da Berlino e dai Paesi Bassi. Gastro Master è radicato nel segmento PMI DACH dell'Assia.", source: SIDES_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Cosa significa la tabella qui sopra, in chiaro:",
    punchlines: ["6.400 vs. 800 clienti — scala diversa.", "Prezzi su richiesta vs. trasparenti su /preise.", "QSR/franchising vs. pizzerie a conduzione familiare."],
    body: "SIDES comunica sul proprio sito un focus su scala QSR, concetti franchising e terminali self-order. Gastro Master è pensato per pizzerie a conduzione familiare, take-away e caffetterie con 1–5 sedi. Due mondi diversi. Non devi disdire il tuo contratto attuale prima di parlare con noi.",
    closing: "Non sono promesse pubblicitarie. È un'onesta auto-collocazione — non siamo costruiti per ogni tipo di ristorante. Per il nostro, sì.",
  },
  gmAvatars: {
    intro: "Gastro Master è pensato per i seguenti ristoranti:",
    avatars: [
      "Pizzerie a conduzione familiare, take-away e caffetterie con 1–5 sedi nel territorio DACH",
      "Attività che apprezzano il servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI)",
      "Ristoranti che preferiscono il proprio marchio app e prezzi fissi trasparenti",
      "Concetti orientati a consegna e take-away con 0 % di commissione sugli ordini diretti",
      "Aziende familiari che si aspettano un referente del proprietario invece di una roadmap VC",
    ],
    closingStatement: "Se la tua attività non è in questa lista, lascia che la tabella dei fatti qui sopra parli da sola — non raccomandiamo deliberatamente un altro fornitore.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Recensione Google (originale in tedesco)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "SIDES ha 6.400 clienti, Gastro Master solo 800 — perché non è un male per me?", answer: "Perché la scala non equivale alla qualità del servizio. Gastro Master mantiene deliberatamente il numero di clienti più piccolo affinché ogni ristorante abbia un referente personale con un numero di telefono diretto. La domanda giusta non è 'chi è più grande', ma 'chi si adatta alla mia attività'.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { question: "Quanto costa SIDES — e come si confronta con Gastro Master?", answer: "SIDES non comunica prezzi pubblici sul proprio sito (stato 2026-05-06) — i prezzi sono disponibili solo su richiesta individuale. Gastro Master elenca tutti i pacchetti in modo trasparente su gastro-master.de/preise: sito web da 49 €/mese, sistema di ordinazione da 79 €/mese, pacchetto App da 149 €/mese.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { question: "Quale fornitore è migliore per il mio ristorante — SIDES o Gastro Master?", answer: "Non raccomandiamo deliberatamente un altro fornitore. Gastro Master è pensato per i ristoranti DACH a conduzione familiare con 1–5 sedi. Se la tua attività rientra qui, siamo la scelta giusta. SIDES comunica pubblicamente un focus su QSR, franchising e ghost kitchen — se vai in quella direzione, i fatti nella tabella ti aiutano a decidere autonomamente." },
    { question: "Ho bisogno di terminali self-order e kitchen-manager come quelli di SIDES?", answer: "SIDES è costruito per la scala industriale QSR con terminali self-order e moduli kitchen-manager. Gastro Master si concentra su mattoni che pizzerie, take-away e caffetterie a conduzione familiare usano effettivamente — sito web, sistema di ordinazione, pacchetto App, cassa più 6 add-on modulari. Se il tuo ristorante non ha bisogno di un sistema kitchen-display con 50+ ordini all'ora, lo stack più focalizzato è spesso la soluzione migliore.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { question: "Sono già cliente SIDES — posso passare prima della scadenza del contratto?", answer: "Esaminiamo il tuo contratto attuale in un check di passaggio gratuito e calcoliamo concretamente cosa significa un cambio — costi, tempistica, migrazione dei dati. Ricevi un confronto scritto anche se decidi di non passare." },
    { question: "Cosa significa il finanziamento VC di SIDES per me come cliente?", answer: "SIDES è stata finanziata nel 2021 con una Series A da €10M tramite Cusp Capital + Fortino Capital — entrambi VC software B2B affermati. Il backing VC significa consulenza strategica professionale e budget di crescita. Gastro Master è a conduzione del proprietario da Usingen (Assia) — nessun investitore esterno, nessuna roadmap Series-B. Entrambi i modelli hanno implicazioni diverse per la strategia di prezzo e la scalabilità del servizio.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 mesi di preavviso sui pacchetti software — nessun vincolo di 24 mesi" },
    { claimRef: "D2 / G2", text: "✅ 0 % di commissione sugli ordini diretti — prezzo mensile fisso invece di percentuali sul fatturato" },
    { claimRef: "B-Reihe", text: "✅ Referente personale con numero di telefono diretto — nessuna hotline esternalizzata" },
    { claimRef: "H1", text: "✅ Offerta di passaggio 50 %: finché il tuo contratto attuale è ancora in pagamento, ricevi Gastro Master al 50 % del prezzo mensile regolare", pending: true, softFallback: "✅ Condizioni individuali di passaggio — esaminiamo il tuo contratto attuale in un check di passaggio gratuito" },
  ],
  cta: { primaryText: "Consulenza gratuita", primaryHref: "/kontakt", secondaryText: "Prezzi a colpo d'occhio", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master è la soluzione di sistema di ordinazione senza commissione per ristoranti DACH a conduzione familiare con 1–5 sedi.",
    "SIDES è costruito per scala QSR, concetti franchising e terminali self-order — Gastro Master per pizzerie a conduzione familiare, take-away e caffetterie.",
    "SIDES non comunica prezzi pubblici sul proprio sito — Gastro Master elenca tutti i pacchetti in modo trasparente su gastro-master.de/preise.",
    "SIDES è finanziato da VC con una Series A da €10M nel 2021 — Gastro Master è a conduzione del proprietario da Usingen, Assia, senza investitori esterni.",
    "800+ ristoranti in Germania, Austria e Svizzera usano Gastro Master come alternativa senza commissione ai servizi di consegna su piattaforma.",
  ],
  meta: { title: "Gastro Master vs. SIDES — Verifica dei fatti con fonti | Gastro Master", description: "Confronto fattuale tra Gastro Master e SIDES: scala (800 vs. 6.400 clienti), trasparenza dei prezzi, specializzazione (PMI familiare vs. QSR/franchising), struttura proprietaria. Con URL sorgenti.", dateModified: SOURCE_DATE },
};

// ─── Русский ────────────────────────────────────────────────────────────────
const RU: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. SIDES: другая шкала, другой тип ресторана",
    subHeadline: "Проверка фактов с источниками — масштаб, прозрачность цен, специализация, структура собственности.",
    trustPills: [
      { label: "800+ ресторанов в DACH" },
      { label: "5,0★ из 131 отзыва Google" },
      { label: "0 % комиссии на прямые заказы" },
    ],
  },
  quickFacts: [
    { axis: "Масштаб клиентов и специализация", competitorValue: "6.400+ клиентов в DACH+NL — фокус на QSR, франчайзинг, терминалы самообслуживания", gastroMasterValue: "800+ ресторанов DACH — фокус на семейные пиццерии, закусочные, кафе", meaning: "SIDES создан для индустриальной QSR-шкалы. Gastro Master создан для среднего сегмента DACH с 1–5 точками. Два разных типа ресторанов.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "Прозрачность цен", competitorValue: "Нет публичной страницы цен — необходим запрос", gastroMasterValue: "Все пакеты + дополнения прозрачны на gastro-master.de/preise", meaning: "С Gastro Master вы видите цены до разговора. С SIDES — только после индивидуального запроса.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности", competitorValue: "Финансирование VC — Series A €10M 2021 (Cusp Capital + Fortino Capital)", gastroMasterValue: "Управляется владельцем из Узингена, Гессен — без внешних инвесторов", meaning: "SIDES соруководится двумя software-VC. Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH, без давления внешнего роста.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "Модульный стек и сервисная модель", competitorValue: "10+ модулей включая терминал самообслуживания, оборудование, оплата, ПО доставки, касса", gastroMasterValue: "Сфокусированный стек: сайт, система заказов, App-пакет, касса + дополнения", meaning: "SIDES широко позиционирован для покупателей нескольких модулей. Gastro Master фокусируется на том, что действительно нужно пиццериям и закусочным.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Количество клиентов (публично)", competitorValue: "6.400+ клиентов в DACH+NL", gastroMasterValue: "800+ ресторанов в Германии, Австрии, Швейцарии", meaning: "У SIDES больше клиентов — построен для индустриальной шкалы. Gastro Master сознательно держит шкалу меньше для поддержания качества сервиса на клиента.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "Отраслевая специализация", competitorValue: "Quick-Service, доставка, Ghost Kitchen, ресторан, франчайзинг (5 публичных типов бизнеса на их сайте)", gastroMasterValue: "Семейные пиццерии, закусочные, кафе, пекарни и службы доставки с 1–5 точками", meaning: "SIDES сознательно обслуживает также ghost kitchen и франчайзинг-концепции. Gastro Master построен для среднего сегмента DACH под управлением владельца.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Прозрачность цен", competitorValue: "Нет публичной страницы цен (по состоянию на 2026-05-06)", gastroMasterValue: "Все пакеты + дополнения прозрачны на /preise", meaning: "С SIDES вы видите цены только после индивидуального запроса. С Gastro Master до разговора — сайт от 49 €/мес., система заказов от 79 €/мес., App-пакет от 149 €/мес.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности и финансирование", competitorValue: "Финансирование VC — Series A €10M 2021 от Cusp Capital + Fortino Capital", gastroMasterValue: "Управляется владельцем из Узингена (Гессен) — без внешних инвесторов", meaning: "SIDES растёт с поддержкой VC и соответствующим маршрутом роста. Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "Ширина модульного стека", competitorValue: "10+ модулей включая терминал самообслуживания, оборудование, SIDES Pay, ПО доставки, касса, webshop & app", gastroMasterValue: "Сайт · Система заказов · App-пакет · Касса · 6 дополнений (приложение водителя, QR-стол, киоск, кухонный дисплей, разделение транзакций, QR-флаер)", meaning: "SIDES предлагает более широкий стек, включая индустриальные компоненты. Gastro Master фокусируется на блоках, которые семейные рестораны действительно используют.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Подробности по запросу", gastroMasterValue: "6 языков: DE, EN, IT, RU, FA, SI", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Штаб-квартира и управление", competitorValue: "Берлин (SimplyDelivery GmbH) + второе расположение в Нидерландах", gastroMasterValue: "Узинген (Гессен) — управляется владельцем внутри DACH", meaning: "SIDES оперирует из Берлина и Нидерландов. Gastro Master укоренён в гессенском среднем сегменте DACH.", source: SIDES_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Что таблица выше означает простыми словами:",
    punchlines: ["6.400 vs. 800 клиентов — другая шкала.", "Цены по запросу vs. прозрачно на /preise.", "QSR/франчайзинг vs. семейные пиццерии."],
    body: "SIDES сообщает на своём сайте о фокусе на QSR-шкалу, концепции франчайзинга и терминалы самообслуживания. Gastro Master ориентирован на семейные пиццерии, закусочные и кафе с 1–5 точками. Это два разных мира. Вам не нужно расторгать текущий контракт, прежде чем поговорить с нами.",
    closing: "Это не рекламные обещания. Это честное самоопределение — мы построены не для каждого типа ресторана. Для нашего — точно.",
  },
  gmAvatars: {
    intro: "Gastro Master ориентирован на следующие рестораны:",
    avatars: [
      "Семейные пиццерии, закусочные и кафе с 1–5 точками в DACH",
      "Заведения, которые ценят персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI)",
      "Рестораны, предпочитающие собственный app-бренд и прозрачные фиксированные цены",
      "Концепции с акцентом на доставку и takeaway с 0 % комиссии на прямые заказы",
      "Семейные предприятия, ожидающие владельца-контакт вместо VC-маршрута",
    ],
    closingStatement: "Если ваш бизнес не в этом списке, пусть таблица фактов выше говорит сама за себя — мы сознательно не рекомендуем другого провайдера.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Отзыв Google (оригинал на немецком)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "У SIDES 6.400 клиентов, у Gastro Master только 800 — почему это не плохо для меня?", answer: "Потому что масштаб не равен качеству сервиса. Gastro Master сознательно держит количество клиентов меньше, чтобы у каждого ресторана был персональный контакт с прямым телефонным номером. Правильный вопрос не 'кто больше', а 'кто подходит моему бизнесу'.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { question: "Сколько стоит SIDES — и как это сравнивается с Gastro Master?", answer: "SIDES не сообщает публичные цены на своём сайте (по состоянию на 2026-05-06) — цены доступны только по индивидуальному запросу. Gastro Master перечисляет все пакеты прозрачно на gastro-master.de/preise: сайт от 49 €/мес., система заказов от 79 €/мес., App-пакет от 149 €/мес.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { question: "Какой провайдер лучше для моего ресторана — SIDES или Gastro Master?", answer: "Мы сознательно не рекомендуем другого провайдера. Gastro Master ориентирован на семейные DACH-рестораны с 1–5 точками. Если ваш бизнес подходит, мы — правильный выбор. SIDES публично сообщает о фокусе на QSR, франчайзинг и ghost kitchen — если вы движетесь в этом направлении, факты в таблице помогут вам решить самостоятельно." },
    { question: "Нужны ли мне терминалы самообслуживания и kitchen-manager как у SIDES?", answer: "SIDES построен для индустриальной QSR-шкалы с терминалами самообслуживания и модулями kitchen-manager. Gastro Master фокусируется на блоках, которые семейные пиццерии, закусочные и кафе действительно используют — сайт, система заказов, App-пакет, касса плюс 6 модульных дополнений. Если вашему ресторану не нужна kitchen-display система с 50+ заказами в час, более сфокусированный стек часто является лучшим решением.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { question: "Я уже клиент SIDES — могу ли я перейти до конца контракта?", answer: "Мы анализируем ваш текущий контракт в бесплатной проверке перехода и конкретно рассчитываем, что означает переход — затраты, сроки, миграция данных. Вы получаете письменное сравнение, даже если решите не переходить." },
    { question: "Что означает VC-финансирование SIDES для меня как клиента?", answer: "SIDES получил Series A €10M в 2021 году от Cusp Capital + Fortino Capital — оба известные B2B-software-VC. VC-backing означает профессиональные стратегические консультации и бюджет роста. Gastro Master управляется владельцем из Узингена (Гессен) — без внешних инвесторов, без Series-B-маршрута. Обе модели имеют разные последствия для ценовой стратегии и масштабирования сервиса.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 месяца уведомления на программных пакетах — никакой 24-месячной привязки" },
    { claimRef: "D2 / G2", text: "✅ 0 % комиссии на прямые заказы — фиксированная ежемесячная цена вместо процентных долей от выручки" },
    { claimRef: "B-Reihe", text: "✅ Персональный контакт с прямым телефонным номером — никаких аутсорсинговых горячих линий" },
    { claimRef: "H1", text: "✅ Предложение перехода 50 %: пока ваш существующий контракт ещё оплачивается, вы получаете Gastro Master за 50 % от обычной ежемесячной цены", pending: true, softFallback: "✅ Индивидуальные условия перехода — мы анализируем ваш существующий контракт в бесплатной проверке" },
  ],
  cta: { primaryText: "Бесплатная консультация", primaryHref: "/kontakt", secondaryText: "Цены с первого взгляда", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master — это решение системы заказов без комиссии для семейных DACH-ресторанов с 1–5 точками.",
    "SIDES построен для QSR-шкалы, концепций франчайзинга и терминалов самообслуживания — Gastro Master для семейных пиццерий, закусочных и кафе.",
    "SIDES не сообщает публичные цены на своём сайте — Gastro Master перечисляет все пакеты прозрачно на gastro-master.de/preise.",
    "SIDES финансируется VC с Series A €10M в 2021 — Gastro Master управляется владельцем из Узингена, Гессен, без внешних инвесторов.",
    "800+ ресторанов в Германии, Австрии и Швейцарии используют Gastro Master как альтернативу без комиссии платформенным службам доставки.",
  ],
  meta: { title: "Gastro Master vs. SIDES — Проверка фактов с источниками | Gastro Master", description: "Фактическое сравнение Gastro Master и SIDES: масштаб (800 vs. 6.400 клиентов), прозрачность цен, специализация (семейный сегмент vs. QSR/франчайзинг), структура собственности. С URL источников.", dateModified: SOURCE_DATE },
};

// ─── فارسی (Persian, RTL) ──────────────────────────────────────────────────
const FA: ComparisonData = {
  ...DE,
  hook: {
    headline: "گاسترو مَستر در برابر SIDES: مقیاسی متفاوت، نوع رستورانی متفاوت",
    subHeadline: "بررسی واقعیت‌ها با منابع — مقیاس، شفافیت قیمت، تخصص، ساختار مالکیت.",
    trustPills: [{ label: "+۸۰۰ رستوران در DACH" }, { label: "۵٫۰★ از ۱۳۱ نظر گوگل" }, { label: "۰٪ کمیسیون روی سفارش‌های مستقیم" }],
  },
  quickFacts: [
    { axis: "مقیاس مشتریان و تخصص", competitorValue: "+۶٬۴۰۰ مشتری در DACH+NL — تمرکز روی QSR، فرنچایز، ترمینال‌های سفارش خودکار", gastroMasterValue: "+۸۰۰ رستوران DACH — تمرکز روی پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها", meaning: "SIDES برای مقیاس صنعتی QSR ساخته شده. گاسترو مستر برای بخش متوسط DACH با ۱ تا ۵ شعبه ساخته شده. دو نوع رستوران متفاوت.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "شفافیت قیمت", competitorValue: "صفحهٔ قیمت عمومی وجود ندارد — درخواست لازم است", gastroMasterValue: "همهٔ بسته‌ها و افزونه‌ها شفاف در gastro-master.de/preise", meaning: "با گاسترو مستر قبل از گفت‌وگو قیمت‌ها را می‌بینید. با SIDES تنها پس از درخواست شخصی.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت", competitorValue: "تأمین مالی VC — Series A ‎۱۰€‎ میلیون ۲۰۲۱ (Cusp Capital + Fortino Capital)", gastroMasterValue: "مالک‌محور از Usingen، ایالت Hesse — بدون سرمایه‌گذار خارجی", meaning: "SIDES توسط دو VC نرم‌افزاری هم‌هدایت می‌شود. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد، بدون فشار رشد بیرونی.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "پشتهٔ ماژول‌ها و مدل خدمات", competitorValue: "+۱۰ ماژول شامل ترمینال سفارش خودکار، سخت‌افزار، پرداخت، نرم‌افزار تحویل، صندوق", gastroMasterValue: "پشتهٔ متمرکز: وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق + افزونه‌ها", meaning: "SIDES به‌طور گسترده برای خریداران چندماژوله موقعیت‌یابی شده. گاسترو مستر روی چیزهایی متمرکز است که پیتزافروشی‌ها و بیرون‌بَرها واقعاً نیاز دارند.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "تعداد مشتریان (اعلام عمومی)", competitorValue: "+۶٬۴۰۰ مشتری در DACH+NL", gastroMasterValue: "+۸۰۰ رستوران در آلمان، اتریش، سوئیس", meaning: "SIDES مشتری بیشتری دارد — برای مقیاس صنعتی ساخته شده. گاسترو مستر آگاهانه مقیاس را کوچک‌تر نگه می‌دارد تا کیفیت خدمات به‌ازای هر مشتری حفظ شود.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "تخصص صنعتی", competitorValue: "Quick-Service، تحویل، Ghost Kitchen، رستوران، فرنچایز (۵ نوع کسب‌وکار عمومی روی سایت)", gastroMasterValue: "پیتزافروشی‌های خانوادگی، بیرون‌بَر، کافه، نانوایی و خدمات تحویل با ۱ تا ۵ شعبه", meaning: "SIDES به‌طور آگاهانه به مفاهیم ghost kitchen و فرنچایز نیز خدمت می‌دهد. گاسترو مستر برای بخش متوسط DACH تحت مدیریت مالک ساخته شده.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "شفافیت قیمت", competitorValue: "صفحهٔ قیمت عمومی وجود ندارد (تاریخ ۲۰۲۶/۰۵/۰۶)", gastroMasterValue: "همهٔ بسته‌ها و افزونه‌ها شفاف در /preise", meaning: "با SIDES قیمت‌ها را تنها پس از درخواست شخصی می‌بینید. با گاسترو مستر پیش از گفت‌وگو — وب‌سایت از ‎۴۹€‎ /ماه، سامانهٔ سفارش از ‎۷۹€‎ /ماه، بستهٔ App از ‎۱۴۹€‎ /ماه.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت و تأمین مالی", competitorValue: "تأمین مالی VC — Series A ‎۱۰€‎ میلیون ۲۰۲۱ توسط Cusp Capital + Fortino Capital", gastroMasterValue: "مالک‌محور از Usingen (Hesse) — بدون سرمایه‌گذار خارجی", meaning: "SIDES با پشتیبانی VC و نقشهٔ راه رشد متناسب رشد می‌کند. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "گستردگی پشتهٔ ماژول‌ها", competitorValue: "+۱۰ ماژول شامل ترمینال سفارش خودکار، سخت‌افزار، SIDES Pay، نرم‌افزار تحویل، صندوق، webshop & app", gastroMasterValue: "وب‌سایت · سامانهٔ سفارش · بستهٔ App · صندوق · ۶ افزونه (اپلیکیشن راننده، QR میز، کیوسک، نمایشگر آشپزخانه، تقسیم تراکنش، فلایر QR)", meaning: "SIDES پشتهٔ گسترده‌تری شامل اجزای صنعتی ارائه می‌دهد. گاسترو مستر روی بلوک‌هایی متمرکز است که رستوران‌های خانوادگی واقعاً استفاده می‌کنند.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های پشتیبانی", competitorValue: "جزئیات در صورت درخواست", gastroMasterValue: "۶ زبان: DE, EN, IT, RU, FA, SI", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما صحبت می‌کند.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "دفتر مرکزی و کنترل", competitorValue: "برلین (SimplyDelivery GmbH) + شعبهٔ دوم در هلند", gastroMasterValue: "Usingen (Hesse) — مالک‌محور درون DACH", meaning: "SIDES از برلین و هلند فعالیت می‌کند. گاسترو مستر در بخش متوسط DACH ایالت Hesse ریشه دارد.", source: SIDES_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "جدول بالا به زبان ساده:",
    punchlines: ["۶٬۴۰۰ در برابر ۸۰۰ مشتری — مقیاس متفاوت.", "قیمت بنا به درخواست در برابر شفاف در /preise.", "QSR/فرنچایز در برابر پیتزافروشی‌های خانوادگی."],
    body: "SIDES در سایت خود تمرکز روی مقیاس QSR، مفاهیم فرنچایز و ترمینال‌های سفارش خودکار را اعلام می‌کند. گاسترو مستر برای پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌های با ۱ تا ۵ شعبه ساخته شده است. این‌ها دو دنیای متفاوت‌اند. لازم نیست قرارداد فعلی خود را پیش از صحبت با ما لغو کنید.",
    closing: "این‌ها وعده‌های تبلیغاتی نیستند. این یک خود-جای‌گذاری صادقانه است — ما برای هر نوع رستورانی ساخته نشده‌ایم. برای نوع خودمان، بله.",
  },
  gmAvatars: {
    intro: "گاسترو مستر برای رستوران‌های زیر طراحی شده است:",
    avatars: [
      "پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها با ۱ تا ۵ شعبه در DACH",
      "کسب‌وکارهایی که خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) را ارزش می‌دانند",
      "رستوران‌هایی که برند اپلیکیشن خود و قیمت ثابت شفاف را ترجیح می‌دهند",
      "مفاهیم تمرکز بر تحویل و takeaway با ۰٪ کمیسیون روی سفارش‌های مستقیم",
      "کسب‌وکارهای خانوادگی که انتظار دارند به‌جای نقشهٔ راه VC، یک تماس مالک‌محور داشته باشند",
    ],
    closingStatement: "اگر کسب‌وکار شما در این فهرست نیست، اجازه دهید جدول واقعیت‌های بالا خودش صحبت کند — ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · نظر گوگل (اصل به آلمانی)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "SIDES ‎۶٬۴۰۰‎ مشتری دارد و گاسترو مستر فقط ۸۰۰ — چرا این برای من بد نیست؟", answer: "زیرا مقیاس برابر کیفیت خدمات نیست. گاسترو مستر آگاهانه تعداد مشتریان را کوچک‌تر نگه می‌دارد تا هر رستوران یک تماس شخصی با شمارهٔ مستقیم داشته باشد. سؤال درست «چه کسی بزرگ‌تر است» نیست، بلکه «چه کسی به کسب‌وکار من می‌خورد».", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { question: "هزینهٔ SIDES چقدر است — و در مقایسه با گاسترو مستر چگونه است؟", answer: "SIDES در سایت خود قیمت عمومی اعلام نمی‌کند (تاریخ ۲۰۲۶/۰۵/۰۶) — قیمت‌گذاری تنها از طریق درخواست فردی در دسترس است. گاسترو مستر همهٔ بسته‌ها را به‌صورت شفاف در gastro-master.de/preise فهرست می‌کند: وب‌سایت از ‎۴۹€‎ /ماه، سامانهٔ سفارش از ‎۷۹€‎ /ماه، بستهٔ App از ‎۱۴۹€‎ /ماه.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { question: "کدام ارائه‌دهنده برای رستوران من بهتر است — SIDES یا گاسترو مستر؟", answer: "ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم. گاسترو مستر برای رستوران‌های خانوادگی DACH با ۱ تا ۵ شعبه طراحی شده است. اگر کسب‌وکار شما با این تطبیق دارد، ما انتخاب درستی هستیم. SIDES تمرکز عمومی خود را روی QSR، فرنچایز و ghost kitchen اعلام می‌کند — اگر در این جهت می‌روید، واقعیت‌های جدول به شما کمک می‌کنند خودتان تصمیم بگیرید." },
    { question: "آیا به ترمینال‌های سفارش خودکار و kitchen-manager مانند SIDES نیاز دارم؟", answer: "SIDES برای مقیاس صنعتی QSR با ترمینال‌های سفارش خودکار و ماژول‌های kitchen-manager ساخته شده است. گاسترو مستر روی بلوک‌هایی متمرکز است که پیتزافروشی‌ها، بیرون‌بَر و کافه‌های خانوادگی واقعاً استفاده می‌کنند — وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق به‌علاوهٔ ۶ افزونهٔ ماژولار. اگر رستوران شما به سامانهٔ kitchen-display با +۵۰ سفارش در ساعت نیاز ندارد، پشتهٔ متمرکزتر اغلب راه‌حل بهتری است.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { question: "من از قبل مشتری SIDES هستم — آیا می‌توانم پیش از پایان قرارداد تعویض کنم؟", answer: "ما قرارداد فعلی شما را در یک بررسی تعویض رایگان مرور می‌کنیم و به‌طور مشخص محاسبه می‌کنیم تعویض چه معنایی دارد — هزینه‌ها، زمان‌بندی، انتقال داده. حتی اگر تصمیم به تعویض نگیرید، یک مقایسهٔ کتبی دریافت می‌کنید." },
    { question: "تأمین مالی VC در SIDES برای من به‌عنوان مشتری چه معنایی دارد؟", answer: "SIDES در سال ۲۰۲۱ Series A با ‎۱۰€‎ میلیون از Cusp Capital + Fortino Capital دریافت کرد — هر دو VCهای نرم‌افزاری B2B شناخته‌شده. پشتیبانی VC به معنای مشاورهٔ راهبردی حرفه‌ای و بودجهٔ رشد است. گاسترو مستر مالک‌محور از Usingen (Hesse) است — بدون سرمایه‌گذار خارجی، بدون نقشهٔ راه Series-B. هر دو مدل پیامدهای متفاوتی برای راهبرد قیمت‌گذاری و مقیاس‌دهی خدمات دارند.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری — بدون قفل ۲۴ ماهه" },
    { claimRef: "D2 / G2", text: "✅ ۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت به‌جای سهم درصدی از درآمد" },
    { claimRef: "B-Reihe", text: "✅ تماس شخصی با شمارهٔ تلفن مستقیم — بدون برون‌سپاری مرکز تماس" },
    { claimRef: "H1", text: "✅ پیشنهاد تعویض ۵۰٪: تا زمانی که قرارداد فعلی شما در حال پرداخت است، گاسترو مستر را با ۵۰٪ از قیمت ماهانهٔ معمول دریافت می‌کنید", pending: true, softFallback: "✅ شرایط تعویض اختصاصی — قرارداد فعلی شما را در یک بررسی رایگان مرور می‌کنیم" },
  ],
  cta: { primaryText: "مشاورهٔ رایگان", primaryHref: "/kontakt", secondaryText: "قیمت‌ها در یک نگاه", secondaryHref: "/preise" },
  quotableOneLiners: [
    "گاسترو مستر راه‌حل سامانهٔ سفارش بدون کمیسیون برای رستوران‌های خانوادگی DACH با ۱ تا ۵ شعبه است.",
    "SIDES برای مقیاس QSR، مفاهیم فرنچایز و ترمینال‌های سفارش خودکار ساخته شده — گاسترو مستر برای پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها.",
    "SIDES قیمت عمومی روی سایت خود اعلام نمی‌کند — گاسترو مستر همهٔ بسته‌ها را به‌صورت شفاف در gastro-master.de/preise فهرست می‌کند.",
    "SIDES با Series A ‎۱۰€‎ میلیون در ۲۰۲۱ توسط VC تأمین مالی شده — گاسترو مستر مالک‌محور از Usingen، Hesse، بدون سرمایه‌گذار خارجی است.",
    "+۸۰۰ رستوران در آلمان، اتریش و سوئیس از گاسترو مستر به‌عنوان جایگزین بدون کمیسیون خدمات تحویل پلتفرمی استفاده می‌کنند.",
  ],
  meta: { title: "گاسترو مستر در برابر SIDES — بررسی واقعیت‌ها با منابع | Gastro Master", description: "مقایسهٔ مبتنی بر واقعیت گاسترو مستر و SIDES: مقیاس (۸۰۰ در برابر ۶٬۴۰۰ مشتری)، شفافیت قیمت، تخصص (متوسط خانوادگی در برابر QSR/فرنچایز)، ساختار مالکیت. با URL منابع.", dateModified: SOURCE_DATE },
};

// ─── සිංහල (Sinhala) ────────────────────────────────────────────────────────
const SI: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master එදිරිව SIDES: වෙනස් පරිමාණයක්, වෙනස් ආපනශාලා වර්ගයක්",
    subHeadline: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව — පරිමාණය, මිල විනිවිදභාවය, විශේෂීකරණය, අයිතිකාර ව්‍යුහය.",
    trustPills: [{ label: "DACH ආපනශාලා 800+" }, { label: "Google සමාලෝචන 131න් 5,0★" }, { label: "කෙළින්ම ඇණවුම් මත 0% කොමිස්" }],
  },
  quickFacts: [
    { axis: "පාරිභෝගික පරිමාණය සහ විශේෂීකරණය", competitorValue: "DACH+NL හි 6,400+ ගනුදෙනුකරුවන් — QSR, ෆ්‍රන්චයිස්, ස්වයං-ඇණවුම් ටර්මිනල මත අවධානය", gastroMasterValue: "800+ DACH ආපනශාලා — පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ, කැෆේ මත අවධානය", meaning: "SIDES කාර්මික QSR පරිමාණය සඳහා සාදා ඇත. Gastro Master ස්ථාන 1-5ක් සහිත DACH SME කොටස සඳහා සාදා ඇත. වෙනස් ආපනශාලා වර්ග දෙකකි.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "මිල විනිවිදභාවය", competitorValue: "පොදු මිල පිටුවක් නැත — ඉල්ලීම අවශ්‍යයි", gastroMasterValue: "සියලු පැකේජ + add-on gastro-master.de/preise හි විනිවිදයි", meaning: "Gastro Master සමඟ ඔබ සංවාදයට පෙර මිල ගණන් දකියි. SIDES සමඟ පුද්ගලික ඉල්ලීමකින් පසුව පමණි.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය", competitorValue: "VC මූල්‍යනය — Series A €10M 2021 (Cusp Capital + Fortino Capital)", gastroMasterValue: "Usingen, Hesse සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් නැත", meaning: "SIDES මෘදුකාංග VC දෙදෙනෙකු විසින් සම-මෙහෙයවනු ලැබේ. Gastro Master බාහිර වර්ධන පීඩනයකින් තොරව DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුල තොගය සහ සේවා ආකෘතිය", competitorValue: "ස්වයං-ඇණවුම් ටර්මිනලය, දෘඪාංග, ගෙවීම, බෙදාහැරීමේ මෘදුකාංග, POS ඇතුළු 10+ මොඩියුල", gastroMasterValue: "අවධානය යොමු කළ තොගය: වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS + add-on", meaning: "SIDES බහු-මොඩියුල ගැනුම්කරුවන් සඳහා පුළුල්ව ස්ථානගත කර ඇත. Gastro Master පීසා හල් සහ ටේක්වේවලට සැබවින්ම අවශ්‍ය දේ මත අවධානය යොමු කරයි.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "පාරිභෝගික සංඛ්‍යාව (පොදුවේ)", competitorValue: "DACH+NL හි 6,400+ ගනුදෙනුකරුවන්", gastroMasterValue: "800+ ආපනශාලා ජර්මනියේ, ඔස්ට්‍රියාවේ, ස්විට්සර්ලන්තයේ", meaning: "SIDES වැඩි ගනුදෙනුකරුවන් සිටී — කාර්මික පරිමාණය සඳහා සාදා ඇත. Gastro Master එක් එක් ගනුදෙනුකරුවාට සේවා ගුණාත්මකභාවය පවත්වා ගැනීම සඳහා පරිමාණය දැනුවත්ව කුඩා තබයි.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { axis: "කර්මාන්ත විශේෂීකරණය", competitorValue: "Quick-Service, බෙදාහැරීම, Ghost Kitchen, ආපනශාලා, ෆ්‍රන්චයිස් (ඔවුන්ගේ වෙබ් අඩවියේ පොදු ව්‍යාපාර වර්ග 5)", gastroMasterValue: "ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ, කැෆේ, බේකරි සහ බෙදාහැරීමේ සේවා", meaning: "SIDES ghost kitchen සහ ෆ්‍රන්චයිස් සංකල්ප සඳහාද දැනුවත්ව සේවය කරයි. Gastro Master අයිතිකරු මෙහෙයවන DACH SME කොටස සඳහා සාදා ඇත.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "මිල විනිවිදභාවය", competitorValue: "පොදු මිල පිටුවක් නැත (2026-05-06 ස්ථිතිය)", gastroMasterValue: "/preise හි සියලු පැකේජ + add-on විනිවිදයි", meaning: "SIDES සමඟ ඔබ පුද්ගලික ඉල්ලීමකින් පසුව පමණක් මිල දකියි. Gastro Master සමඟ සංවාදයට පෙර — වෙබ් අඩවිය 49 €/මස සිට, ඇණවුම් පද්ධතිය 79 €/මස සිට, App පැකේජය 149 €/මස සිට.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය සහ මූල්‍යනය", competitorValue: "VC මූල්‍යනය — Series A €10M 2021 Cusp Capital + Fortino Capital විසින්", gastroMasterValue: "Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් නැත", meaning: "SIDES VC සහාය සහ ඊට අනුරූප වර්ධන සැලැස්මක් සමඟ වර්ධනය වේ. Gastro Master DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුල තොගයේ පළල", competitorValue: "ස්වයං-ඇණවුම් ටර්මිනලය, දෘඪාංග, SIDES Pay, බෙදාහැරීමේ මෘදුකාංග, POS, webshop & app ඇතුළු 10+ මොඩියුල", gastroMasterValue: "වෙබ් අඩවිය · ඇණවුම් පද්ධතිය · App පැකේජය · POS පද්ධතිය · 6 add-on (රියදුරු app, QR මේසය, kiosk, kitchen display, ගණුදෙනු බෙදීම, QR flyer)", meaning: "SIDES කාර්මික සංරචක ඇතුළු පුළුල් තොගයක් ඉදිරිපත් කරයි. Gastro Master පවුල්-මෙහෙයවන ආපනශාලා සැබවින්ම භාවිත කරන කොට්ඨාශ මත අවධානය යොමු කරයි.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ඉල්ලීම මත විස්තර", gastroMasterValue: "භාෂා 6: DE, EN, IT, RU, FA, SI", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "මූලස්ථානය සහ පාලනය", competitorValue: "Berlin (SimplyDelivery GmbH) + Netherlands හි දෙවන ස්ථානය", gastroMasterValue: "Usingen (Hesse) — DACH ඇතුළත අයිතිකරු මෙහෙයවන", meaning: "SIDES Berlin සහ Netherlands සිට ක්‍රියාත්මක වේ. Gastro Master Hesse හි DACH SME කොටසේ මුල් ඇත.", source: SIDES_IMPRESSUM, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "ඉහත වගුව සරල සිංහලෙන්:",
    punchlines: ["6,400 එදිරිව 800 ගනුදෙනුකරුවන් — වෙනස් පරිමාණය.", "ඉල්ලීම මත මිල එදිරිව /preise හි විනිවිදයි.", "QSR/ෆ්‍රන්චයිස් එදිරිව පවුල්-මෙහෙයවන පීසා හල්."],
    body: "SIDES තම වෙබ් අඩවියේ QSR පරිමාණය, ෆ්‍රන්චයිස් සංකල්ප සහ ස්වයං-ඇණවුම් ටර්මිනල මත අවධානය ප්‍රකාශ කරයි. Gastro Master ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ සඳහා සාදා ඇත. මේ වෙනස් ලෝක දෙකකි. අප සමඟ කතා කිරීමට පෙර ඔබේ වර්තමාන ගිවිසුම අවසන් කිරීම අවශ්‍ය නොවේ.",
    closing: "මේවා වෙළඳ පොරොන්දු නොවේ. මේ අවංක ස්ව-ස්ථානගත කිරීමකි — අපි සෑම ආපනශාලා වර්ගයක් සඳහාම සාදා නැත. අපගේ වර්ගයට හරියටම.",
  },
  gmAvatars: {
    intro: "Gastro Master පහත සඳහන් ආපනශාලා සඳහා සැකසී ඇත:",
    avatars: [
      "DACH හි ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ",
      "භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව අගය කරන ව්‍යාපාර",
      "තමන්ගේම app සන්නාමය සහ විනිවිද ස්ථාවර මිල කැමති ආපනශාලා",
      "කෙළින්ම ඇණවුම් මත 0% කොමිස් සහිත බෙදාහැරීම් සහ takeaway-අවධානය සහිත සංකල්ප",
      "VC පියසටහනකට වඩා අයිතිකරු-සම්බන්ධතාවක් අපේක්ෂා කරන පවුල් ව්‍යාපාර",
    ],
    closingStatement: "ඔබේ ව්‍යාපාරය මෙම ලැයිස්තුවේ නොමැති නම්, ඉහත කරුණු වගුවට තමන්ටම කතා කිරීමට ඉඩ දෙන්න — අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google සමාලෝචනය (මුල් ජර්මානු බසින්)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "SIDES හි 6,400 ගනුදෙනුකරුවන් සහ Gastro Master හි 800ක් පමණි — ඇයි මේක මට නරක නැත්තේ?", answer: "මන්ද පරිමාණය සේවා ගුණාත්මකභාවයට සමාන නොවන බැවිනි. Gastro Master සෑම ආපනශාලාවකටම සෘජු දුරකථන අංකයක් සහිත පුද්ගලික සම්බන්ධතාවක් ඇති වන පරිදි ගනුදෙනුකරුවන්ගේ සංඛ්‍යාව දැනුවත්ව කුඩා තබයි. නිවැරදි ප්‍රශ්නය 'කවුද වැඩි' නොව 'මගේ ව්‍යාපාරයට කවුද ගැලපේ' යන්නයි.", source: SIDES_SUCCESS_STORIES, sourceDate: SOURCE_DATE },
    { question: "SIDES වල පිරිවැය කොපමණද — සහ Gastro Master සමඟ සසඳන විට කෙසේද?", answer: "SIDES තම වෙබ් අඩවියේ පොදු මිල අඟවන්නේ නැත (2026-05-06 ස්ථිතිය) — මිල ගණන් පුද්ගලික ඉල්ලීම මත පමණි. Gastro Master gastro-master.de/preise හි සියලු පැකේජ විනිවිදයි: වෙබ් අඩවිය 49 €/මස සිට, ඇණවුම් පද්ධතිය 79 €/මස සිට, App පැකේජය 149 €/මස සිට.", source: SIDES_HOMEPAGE, sourceDate: SOURCE_DATE },
    { question: "මගේ ආපනශාලාවට කවුද හොඳ — SIDES හෝ Gastro Master?", answer: "අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු. Gastro Master ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා සාදා ඇත. ඔබේ ව්‍යාපාරය ගැලපේ නම්, අපි නියම තේරීම වේ. SIDES QSR, ෆ්‍රන්චයිස් සහ ghost kitchen මත අවධානය පොදුවේ සන්නිවේදනය කරයි — ඔබ එම දිශාවට යන්නේ නම්, වගුවේ කරුණු ස්වාධීනව තීරණය කිරීමට උදව් කරයි." },
    { question: "SIDES ලබා දෙන ලෙස ස්වයං-ඇණවුම් ටර්මිනල සහ kitchen-manager මට අවශ්‍යද?", answer: "SIDES ස්වයං-ඇණවුම් ටර්මිනල සහ kitchen-manager මොඩියුල සහිත කාර්මික QSR පරිමාණය සඳහා සාදා ඇත. Gastro Master පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ සැබවින්ම භාවිත කරන කොට්ඨාශ මත අවධානය යොමු කරයි — වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS සහ මොඩියුලර් add-on 6ක්. ඔබේ ආපනශාලාවට පැයට ඇණවුම් 50+ සහිත kitchen-display පද්ධතියක් අවශ්‍ය නොවේ නම්, වඩාත් අවධානය යොමු කළ තොගය බොහෝ විට වඩා හොඳ විසඳුමයි.", source: SIDES_TERMINAL, sourceDate: SOURCE_DATE },
    { question: "මම දැනටමත් SIDES ගනුදෙනුකරුවෙක් — ගිවිසුම අවසන් වීමට පෙර මාරු විය හැකිද?", answer: "අපි ඔබේ වර්තමාන ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කර මාරුවක් යනු කුමක්ද — පිරිවැය, කාල සටහන, දත්ත සංක්‍රමණය — යන්න සංයුතව ගණනය කරමු. ඔබ මාරු නොවීමට තීරණය කළත්, ලිඛිත සන්සන්දනයක් ලබා ගනී." },
    { question: "SIDES හි VC මූල්‍යනය මට ගනුදෙනුකරුවෙකු වශයෙන් කුමක්ද කියන්නේ?", answer: "SIDES 2021 දී Cusp Capital + Fortino Capital හරහා Series A €10M ලබා ගත් — දෙකම ස්ථාපිත B2B මෘදුකාංග VC වේ. VC සහාය යනු වෘත්තීය උපාය උපදේශනය සහ වර්ධන අයවැය වේ. Gastro Master Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන — බාහිර ආයෝජකයන් නැත, Series-B සැලැස්මක් නැත. ආකෘති දෙකටම මිල උපාය මාර්ගය සහ සේවා පරිමාණනය සඳහා වෙනස් ඇඟවුම් ඇත.", source: SIDES_FUNDING, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ මෘදුකාංග පැකේජ මත මාස 3 අවසන් කිරීමේ දැන්වීම — මාස 24ක බැඳීමක් නැත" },
    { claimRef: "D2 / G2", text: "✅ කෙළින්ම ඇණවුම් මත 0% කොමිස් — ආදායමෙන් ප්‍රතිශත කොටස් වෙනුවට ස්ථාවර මාසික මිල" },
    { claimRef: "B-Reihe", text: "✅ සෘජු දුරකථන අංකයක් සහිත පුද්ගලික සම්බන්ධතාව — හොට්ලයින් බාහිර කිරීමක් නැත" },
    { claimRef: "H1", text: "✅ මාරු පිරිනැමීම 50%: ඔබේ පවතින ගිවිසුම තවමත් ගෙවමින් සිටින තාක්, ඔබට සාමාන්‍ය මාසික මිලෙන් 50%කට Gastro Master ලැබේ", pending: true, softFallback: "✅ පුද්ගලික මාරු කොන්දේසි — අපි ඔබේ පවතින ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කරමු" },
  ],
  cta: { primaryText: "නොමිලේ උපදෙස්", primaryHref: "/kontakt", secondaryText: "මිල ගණන් එක නෙතින්", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master යනු ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා කොමිස් රහිත ඇණවුම් පද්ධති විසඳුමයි.",
    "SIDES QSR පරිමාණය, ෆ්‍රන්චයිස් සංකල්ප සහ ස්වයං-ඇණවුම් ටර්මිනල සඳහා සාදා ඇත — Gastro Master පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ සඳහා.",
    "SIDES තම වෙබ් අඩවියේ පොදු මිල අඟවන්නේ නැත — Gastro Master gastro-master.de/preise හි සියලු පැකේජ විනිවිදයි.",
    "SIDES 2021 දී Series A €10M සහිතව VC මූල්‍යනය වී ඇත — Gastro Master බාහිර ආයෝජකයන් නොමැතිව Usingen, Hesse සිට අයිතිකරු මෙහෙයවනු ලැබේ.",
    "ජර්මනියේ, ඔස්ට්‍රියාවේ සහ ස්විට්සර්ලන්තයේ ආපනශාලා 800+ ක් Gastro Master වේදිකා බෙදාහැරීමේ සේවාවලට කොමිස් රහිත විකල්පයක් ලෙස භාවිත කරයි.",
  ],
  meta: { title: "Gastro Master එදිරිව SIDES — මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව | Gastro Master", description: "Gastro Master සහ SIDES හි කරුණු සසඳීම: පරිමාණය (800 එදිරිව 6,400 ගනුදෙනුකරුවන්), මිල විනිවිදභාවය, විශේෂීකරණය (පවුල්-SME එදිරිව QSR/ෆ්‍රන්චයිස්), අයිතිකාර ව්‍යුහය. මූලාශ්‍ර URL සමඟ.", dateModified: SOURCE_DATE },
};

// ─── Registry ───────────────────────────────────────────────────────────────
export const sidesByLang: ComparisonByLang = {
  de: DE,
  en: EN,
  it: IT,
  fa: FA,
  si: SI,
  ru: RU,
};

export const sidesComparison = DE;
