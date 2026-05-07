import type { ComparisonByLang, ComparisonData } from "./types";

/**
 * /vergleiche/dish-order — multilingual.
 *
 * Strategischer Angle: **Ökosystem-Breite + Strategic-Dependency** (Salvatore-Pivot 2026-05-07).
 *
 * Reine Pricing-Vergleiche verlieren wir gegen DISH (49 €/Mo. vs. 79 €/Mo. Lizenz nominell).
 * Stattdessen Wert-Argumentation: GM bietet Pakete + 6 Add-Ons + automatische
 * Plattform-Integrationen + eigene App-Marke + persönlicher 6-Sprachen-Service —
 * alles aus einer Hand vs. 6 isolierte DISH-Module.
 *
 * Audit-Historie:
 * - 2026-05-07 (Iteration 1): hatte falschen 1,89 %-Provisions-Claim aus Deep-Dive #04 übernommen
 * - 2026-05-07 (Iteration 2 — diese): Salvatore hat den Fehler gefangen.
 *   Live-Verifikation gegen die offizielle METRO-Pressemitteilung
 *   (newsroom.metroag.de/de/news/dish-order-new-digital-tool-for-restaurateurs)
 *   bestätigt: DISH Order ist kommissionsfrei mit 299 € Anschluss + 49 €/Mo. Festpreis.
 *   1,89 %-Claim entfernt aus allen 6 Sprachen, Pivot zu Ökosystem-Vergleich.
 *
 * Compliance-Status (Wissens-Bibel #19 + Deep-Dive Block 9):
 * ❌ KEIN "DISH lügt mit kommissionsfrei" — METRO-Press bestätigt selbst kommissionsfrei
 * ❌ KEINE persönlichen Angriffe auf Glaeser/Mangold/METRO-Management
 * ❌ KEINE Behauptung "METRO ist schlecht"
 * ❌ Konzern-Größe NICHT pauschal als Schwäche dargestellt
 * ❌ KEIN 1,89 %-Provisions-Claim mehr (nicht durch Primärquelle gedeckt)
 *
 * Quellen-Reachability geprüft 2026-05-07.
 */

// ─── SHARED FACTS ───────────────────────────────────────────────────────────
const SLUG = "dish-order";
const COMPETITOR_NAME = "DISH Order";
const COMPETITOR_LEGAL = "DISH Digital Solutions GmbH (METRO AG, Düsseldorf)";
const SOURCE_DATE = "2026-05-07";

const DISH_HOMEPAGE = "https://www.dish.co/DE/de";
const DISH_IMPRESSUM = "https://www.dish.co/DE/de/impressum/";
const DISH_CONTACT = "https://www.dish.co/DE/de/contact/";
const METRO_GLOSSARY =
  "https://stories.metroag.de/en/glossary/dish-digital-solutions-gmbh";
// Offizielle METRO-Pressemitteilung — primärer Beleg für DISH Order Pricing-Modell
const METRO_PRESS_DISH_ORDER =
  "https://newsroom.metroag.de/de/news/dish-order-new-digital-tool-for-restaurateurs";

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
    headline: "Gastro Master vs. DISH Order: Vollständiges Ökosystem aus einer Hand",
    subHeadline:
      "Faktencheck mit Quellen — Ökosystem-Breite, Plattform-Integrationen, Service-Modell, Eigentums-Struktur.",
    trustPills: [
      { label: "800+ DACH-Restaurants" },
      { label: "5,0★ aus 131 Google-Reviews" },
      { label: "0 % Provision auf Direktbestellungen" },
    ],
  },
  quickFacts: [
    {
      axis: "Was du für deinen Festpreis bekommst",
      competitorValue:
        "6 separate DISH-Module: Order, Reservation, POS, Pay, Pay Now, Website",
      gastroMasterValue:
        "4 Pakete (Webseite, Bestellsystem, App-Paket, Kassensystem) + 6 modulare Add-Ons + Plattform-Integrationen — alles aus einer Hand",
      meaning:
        "Bei DISH wählst du Module aus einem Konzern-Stack. Bei Gastro Master bekommst du ein zusammenhängendes Ökosystem mit einem Ansprechpartner.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Plattform-Integrationen",
      competitorValue: "Nicht angeboten — DISH Order positioniert sich als Lieferando-Alternative",
      gastroMasterValue:
        "Lieferando, Wolt und Uber Eats automatisch im Kassensystem integriert",
      meaning:
        "Wenn dein Restaurant zusätzlich auf Plattformen liefert, landen die Bestellungen bei Gastro Master automatisch in deinem Kassensystem. Bei DISH müsstest du Plattform-Bestellungen manuell verwalten.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigene App-Marke",
      competitorValue: "DISH Website (Builder) — kein dediziertes App-Branding pro Restaurant",
      gastroMasterValue:
        "Eigene Domain + native iOS-/Android-App pro Restaurant unter deinem Namen",
      meaning:
        "Bei Gastro Master baust du deine eigene Brand-Hoheit. Deine Stammkunden öffnen deine eigene App, nicht die App eines Anbieters.",
      source: GM_AGB,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Modell",
      competitorValue:
        "Konzern-Support-Team (METRO-Tochter mit 201–500 Mitarbeitern, Multi-Country DE/AT/FR/IT/ES)",
      gastroMasterValue:
        "Persönlicher Ansprechpartner mit direkter Telefonnummer aus Hessen — auf 6 Sprachen (DE, EN, IT, RU, FA, SI)",
      meaning:
        "Bei DISH läuft der Support über ein Konzern-Call-Center. Bei Gastro Master rufst du direkt René oder Salvatore an — auf deiner Sprache.",
      source: DISH_CONTACT,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    {
      axis: "Pricing-Modell (laut offizieller METRO-Pressemitteilung)",
      competitorValue:
        "299 € einmalige Anschlussgebühr + 49 €/Mo. Festpreis · provisionsfrei auf Bestellungen",
      gastroMasterValue:
        "Bestellsystem ab 79 €/Mo. Festpreis · 0 % Provision auf Direktbestellungen",
      meaning:
        "Beide Anbieter werben mit Festpreis. Der Vergleich entscheidet sich nicht beim Lizenzpreis, sondern bei der Reichweite des Ökosystems (siehe nächste Zeilen).",
      source: METRO_PRESS_DISH_ORDER,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Pakete im Ökosystem",
      competitorValue:
        "6 Module: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website",
      gastroMasterValue:
        "4 Pakete: Webseite (ab 49 €/Mo.) · Bestellsystem (ab 79 €/Mo.) · App-Paket (ab 149 €/Mo.) · Kassensystem (ab 69 €/Mo.) — plus Enterprise-Tier für Franchise/Mehr-Standort",
      meaning:
        "Beide Anbieter haben einen breiten Stack. Der Unterschied: Gastro Master kombiniert die Pakete mit modularen Add-Ons aus einer Hand (siehe nächste Zeile).",
      source: DISH_HOMEPAGE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Modulare Add-Ons (monatlich aktivier-/kündbar)",
      competitorValue: "Nicht in dieser Form angeboten — Module sind separate Produkte",
      gastroMasterValue:
        "6 Add-Ons: Fahrer-App mit GPS · QR-Code-Tischsystem · Self-Service-Kiosk · Bildschirmfunktion (Kitchen Display) · QR-Code-Flyer · Transaktionsumlage",
      meaning:
        "Du startest klein und baust auf, wie dein Restaurant wächst. Add-Ons werden monatlich aktiviert oder gekündigt — kein Konzern-Stack-Lock-in.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Plattform-Integrationen (Lieferando/Wolt/Uber Eats)",
      competitorValue:
        "Nicht angeboten — DISH Order konkurriert mit Plattform-Lieferdiensten als Alternative",
      gastroMasterValue:
        "Lieferando, Wolt und Uber Eats automatisch im Gastro Master Kassensystem integriert",
      meaning:
        "Wenn dein Restaurant zusätzlich zu Direktbestellungen auch Plattformen bedient, landen alle Bestellungen bei Gastro Master automatisch im selben System. Bei DISH müsstest du Plattform-Bestellungen separat verwalten.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigene Restaurant-App-Marke",
      competitorValue:
        "DISH Website-Builder — kein natives App-Paket unter eigener Marke pro Restaurant",
      gastroMasterValue:
        "Eigene Domain + native iOS-/Android-App pro Restaurant unter deinem Namen (App-Paket ab 149 €/Mo.)",
      meaning:
        "Bei Gastro Master öffnen deine Stammkunden deine eigene App. Deine Marke, deine Domain, dein Branding — nicht das eines Anbieters.",
      source: GM_AGB,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur",
      competitorValue:
        "100 % Tochter der METRO AG (Düsseldorf), börsennotiert, ~31 Mrd. € Konzern-Umsatz, ~17 Mio. weltweite Restaurant-Großhandelskunden",
      gastroMasterValue:
        "Eigentümergeführt aus Usingen (Hessen), keine externen Investoren oder Konzern-Mutter",
      meaning:
        "DISH gehört zu einem Großhandelskonzern, der gleichzeitig viele Restaurants als Wareneinkauf-Kunden hat. Bei Gastro Master sind Tech-Partner und Wareneinkauf-Lieferant zwei verschiedene Unternehmen — du behältst die Wahl.",
      source: METRO_GLOSSARY,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Modell & Sprachen",
      competitorValue:
        "Konzern-Call-Center, Multi-Country DE/AT/FR/IT/ES — Service-Sprachen-Details auf Anfrage",
      gastroMasterValue:
        "Persönlicher Telefon-Ansprechpartner aus Hessen — 6 Sprachen: DE, EN, IT, RU, FA, SI",
      meaning:
        "Mehrsprachiger Restaurant-Inhaber mit persönlicher Service-Erwartung? Gastro Master spricht direkt deine Sprache, mit einem festen Ansprechpartner statt Konzern-Hotline.",
      source: GM_UEBER_UNS,
      sourceDate: SOURCE_DATE,
    },
  ],
  convictionStatement: {
    heading: "Was die Tabelle oben in Klartext bedeutet:",
    punchlines: [
      "4 Pakete + 6 modulare Add-Ons aus einer Hand vs. 6 separate DISH-Module.",
      "Plattform-Integrationen (Lieferando/Wolt/Uber Eats) automatisch vs. nicht angeboten.",
      "Eigene App-Marke + native iOS/Android pro Restaurant vs. Builder ohne App-Paket.",
    ],
    body:
      "Beide Anbieter werben mit Festpreis ohne Provision auf Bestellungen. Der entscheidende Unterschied liegt nicht beim Lizenzpreis, sondern bei dem, was du dafür bekommst. Bei Gastro Master ein zusammenhängendes Ökosystem aus Webseite, Bestellsystem, App-Paket und Kassensystem — plus 6 modulare Add-Ons (Fahrer-App mit GPS, QR-Code-Tischsystem, Self-Service-Kiosk, Bildschirmfunktion, QR-Code-Flyer, Transaktionsumlage). Plus automatische Plattform-Integrationen mit Lieferando, Wolt und Uber Eats. Alles aus einer Hand, ein Ansprechpartner, in 6 Sprachen. Du brauchst deinen aktuellen Vertrag nicht zu kündigen, bevor wir miteinander reden.",
    closing:
      "Das sind keine Werbeversprechen. Das ist die nüchterne Bestandsaufnahme der Reichweite beider Ökosysteme — der entscheidende Unterschied liegt nicht beim Lizenzpreis, sondern bei dem, was du am Ende auf dem Tisch hast.",
  },
  gmAvatars: {
    intro: "Gastro Master ist auf folgende Restaurants ausgerichtet:",
    avatars: [
      "Familiengeführte Pizzerien, Imbisse und Cafés mit 1–5 Standorten in DACH",
      "Betriebe, die persönlichen Service auf 6 Sprachen schätzen (DE, EN, IT, RU, FA, SI)",
      "Restaurants, die ein zusammenhängendes Ökosystem statt isolierter Module wollen",
      "Lieferdienste, die zusätzlich Plattformen (Lieferando/Wolt/Uber Eats) bedienen und alle Bestellungen in einem System brauchen",
      "Familienbetriebe, die ihre eigene App-Marke unter eigener Domain aufbauen wollen",
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
        "DISH Order ist beim reinen Lizenzpreis günstiger — warum sollte ich Gastro Master wählen?",
      answer:
        "DISH Order kommuniziert eine 299 € Anschlussgebühr plus 49 €/Mo. Lizenz (laut offizieller METRO-Pressemitteilung). Gastro Master beginnt bei 79 €/Mo. — die einmaligen Setup-Kosten sind individuell und projektabhängig. Der entscheidende Unterschied liegt nicht beim Monatspreis, sondern bei der Reichweite des Ökosystems: bei Gastro Master bekommst du Webseite, Bestellsystem, App-Paket, Kassensystem plus 6 modulare Add-Ons aus einer Hand. Plus automatische Plattform-Integrationen mit Lieferando, Wolt und Uber Eats. Plus persönlichen Telefon-Service in 6 Sprachen.",
      source: METRO_PRESS_DISH_ORDER,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "DISH Order und Gastro Master werben beide mit Festpreis ohne Provision — wo ist der Unterschied?",
      answer:
        "Stimmt — beide Anbieter arbeiten provisionsfrei auf Bestellungen. DISH bestätigt das selbst in der offiziellen METRO-Pressemitteilung: \"Statt Provisionszahlungen, die bei jeder Bestellung anfallen, zahlen die Gastronomen einen festen Preis.\" Gastro Master arbeitet ebenfalls provisionsfrei. Der Unterschied liegt im Wert pro Monat: bei DISH bekommst du Module aus einem Konzern-Stack. Bei Gastro Master ein zusammenhängendes Ökosystem mit eigener App-Marke unter eigener Domain, automatischer Lieferplattform-Integration, modularen Add-Ons und persönlichem Telefon-Service in 6 Sprachen.",
      source: METRO_PRESS_DISH_ORDER,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Welcher Anbieter ist besser für mein Restaurant — DISH Order oder Gastro Master?",
      answer:
        "Wir empfehlen bewusst keinen anderen Anbieter. Gastro Master ist auf familiengeführte DACH-Restaurants mit 1–5 Standorten ausgerichtet. Wenn dein Betrieb dazu passt, sind wir die richtige Wahl. DISH Order ist Teil eines Großhandelskonzerns mit internationaler Stack-Breite — wenn das deine Anforderung ist, helfen dir die Fakten in der Tabelle bei der eigenen Einordnung.",
    },
    {
      question:
        "Was bedeutet es, dass DISH eine 100 %-Tochter der METRO AG ist?",
      answer:
        "METRO AG ist ein börsennotierter Großhandelskonzern, der ~31 Mrd. € Umsatz macht und weltweit ~17 Mio. Restaurant-/Gastronomie-Kunden als Wareneinkauf-Partner führt. DISH Order ist die digitale Tochter dieses Konzerns. Praktisch heißt das: wenn du gleichzeitig METRO-Großhandel-Kunde und DISH-Tech-Kunde bist, hast du Lieferanten- und Tech-Partner aus einem Konzern. Bei Gastro Master sind das zwei separate Unternehmen — du behältst die Wahl.",
      source: METRO_GLOSSARY,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Bekomme ich bei DISH auch eine eigene App für mein Restaurant?",
      answer:
        "DISH bietet einen Website-Builder (DISH Website), aber kein dediziertes natives App-Paket pro Restaurant unter eigenem Branding. Bei Gastro Master bekommst du im App-Paket (ab 149 €/Mo.) eine eigene Domain plus native iOS-/Android-App unter deinem eigenen Restaurant-Namen — deine Stammkunden öffnen deine App, nicht die eines Anbieters.",
      source: GM_AGB,
      sourceDate: SOURCE_DATE,
    },
    {
      question:
        "Ich bin schon DISH-Order-Kunde — kann ich vor Vertragsende wechseln?",
      answer:
        "Wir prüfen deinen aktuellen Vertrag im kostenlosen Wechsel-Check und rechnen dir konkret aus, was ein Wechsel bedeutet — Kosten, Zeitplan, Datenmigration. Du bekommst eine schriftliche Vergleichs-Rechnung, auch wenn du nicht wechselst.",
    },
  ],
  riskReversal: [
    {
      claimRef: "C1",
      text: "✅ 3 Monate Kündigungsfrist auf Software-Pakete — Add-Ons monatlich kündbar",
    },
    {
      claimRef: "D2 / G2",
      text: "✅ 0 % Provision auf Direktbestellungen — fester, planbarer Monatspreis",
    },
    {
      claimRef: "E-Reihe",
      text: "✅ 4 Pakete + 6 modulare Add-Ons + Lieferando/Wolt/Uber-Eats-Integration — alles aus einer Hand",
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
    "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für familiengeführte DACH-Restaurants — mit 4 Paketen und 6 modularen Add-Ons aus einer Hand.",
    "Im Gegensatz zu isolierten Modul-Stacks bietet Gastro Master ein zusammenhängendes Ökosystem mit Webseite, Bestellsystem, App-Paket und Kassensystem — plus automatischer Plattform-Integration mit Lieferando, Wolt und Uber Eats.",
    "Bei Gastro Master bekommt jedes Restaurant eine eigene Domain und eine native iOS-/Android-App unter eigener Marke — keine Whitelabel-Lösung.",
    "DISH Order und Gastro Master arbeiten beide mit Festpreis ohne Provision auf Direktbestellungen — der Unterschied liegt in der Ökosystem-Breite und im persönlichen Service auf 6 Sprachen.",
    "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als eigentümergeführte Alternative zu Konzern-Stacks.",
  ],
  meta: {
    title:
      "Gastro Master vs. DISH Order — Faktencheck mit Quellen | Gastro Master",
    description:
      "Sachlicher Vergleich von Gastro Master und DISH Order: Ökosystem-Breite (Pakete + Add-Ons + Plattform-Integrationen), Eigentums-Struktur (eigentümergeführt vs. METRO-Tochter), Service-Modell. Mit Quellen-URLs.",
    dateModified: SOURCE_DATE,
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const EN: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. DISH Order: Complete ecosystem from one hand",
    subHeadline: "Fact check with sources — ecosystem breadth, platform integrations, service model, ownership structure.",
    trustPills: [
      { label: "800+ DACH restaurants" },
      { label: "5.0★ from 131 Google Reviews" },
      { label: "0 % commission on direct orders" },
    ],
  },
  quickFacts: [
    { axis: "What you get for your fixed price", competitorValue: "6 separate DISH modules: Order, Reservation, POS, Pay, Pay Now, Website", gastroMasterValue: "4 packages (Website, Ordering system, App package, POS) + 6 modular add-ons + platform integrations — all from one hand", meaning: "With DISH you pick modules from a corporate stack. With Gastro Master you get a connected ecosystem with one personal contact.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Platform integrations", competitorValue: "Not offered — DISH Order positions itself as a Lieferando alternative", gastroMasterValue: "Lieferando, Wolt and Uber Eats automatically integrated into the POS system", meaning: "If your restaurant also serves platforms, orders land automatically in your Gastro Master POS. With DISH you'd manage platform orders separately.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Your own restaurant app brand", competitorValue: "DISH Website (builder) — no dedicated app branding per restaurant", gastroMasterValue: "Own domain + native iOS/Android app per restaurant under your name", meaning: "With Gastro Master you build your own brand authority. Your regulars open your app, not a provider's app.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Service model", competitorValue: "Group support team (METRO subsidiary, 201–500 employees, multi-country DE/AT/FR/IT/ES)", gastroMasterValue: "Personal contact with direct phone number from Hesse — in 6 languages (DE, EN, IT, RU, FA, SI)", meaning: "With DISH support runs through a group call center. With Gastro Master you call René or Salvatore directly — in your language.", source: DISH_CONTACT, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Pricing model (per official METRO press release)", competitorValue: "€299 one-time setup + €49/mo fixed price · commission-free on orders", gastroMasterValue: "Ordering system from €79/mo fixed · 0 % commission on direct orders", meaning: "Both providers advertise fixed pricing. The decision isn't made on license price but on ecosystem breadth (see next rows).", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { axis: "Packages in the ecosystem", competitorValue: "6 modules: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website", gastroMasterValue: "4 packages: Website (from €49/mo) · Ordering system (from €79/mo) · App package (from €149/mo) · POS (from €69/mo) — plus Enterprise tier for franchise/multi-location", meaning: "Both providers have a broad stack. The difference: Gastro Master combines packages with modular add-ons from one hand (see next row).", source: DISH_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Modular add-ons (monthly activatable/cancelable)", competitorValue: "Not offered in this form — modules are separate products", gastroMasterValue: "6 add-ons: Driver app with GPS · QR table system · Self-service kiosk · Kitchen display · QR flyer · Transaction sharing", meaning: "You start small and grow as your restaurant grows. Add-ons are activated or canceled monthly — no corporate stack lock-in.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Platform integrations (Lieferando/Wolt/Uber Eats)", competitorValue: "Not offered — DISH Order competes with platform delivery services as an alternative", gastroMasterValue: "Lieferando, Wolt and Uber Eats automatically integrated into the Gastro Master POS", meaning: "If your restaurant serves platforms in addition to direct orders, all orders land automatically in the same system at Gastro Master. With DISH you'd manage platform orders separately.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Restaurant's own app brand", competitorValue: "DISH website builder — no native app package under own brand per restaurant", gastroMasterValue: "Own domain + native iOS/Android app per restaurant under your name (App package from €149/mo)", meaning: "With Gastro Master your regulars open your own app. Your brand, your domain, your branding — not a provider's.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Ownership structure", competitorValue: "100 % subsidiary of METRO AG (Düsseldorf), publicly listed, ~€31bn group revenue, ~17 million worldwide restaurant wholesale customers", gastroMasterValue: "Owner-led from Usingen (Hesse), no external investors or parent corporation", meaning: "DISH belongs to a wholesale group that simultaneously serves many restaurants as wholesale customers. With Gastro Master, tech partner and wholesale supplier are two different companies — you keep the choice.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { axis: "Service model & languages", competitorValue: "Group call center, multi-country DE/AT/FR/IT/ES — service language details on request", gastroMasterValue: "Personal phone contact from Hesse — 6 languages: DE, EN, IT, RU, FA, SI", meaning: "Multilingual restaurant owner expecting personal service? Gastro Master speaks your language directly, with a fixed contact instead of a corporate hotline.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "What the table above means in plain English:",
    punchlines: [
      "4 packages + 6 modular add-ons from one hand vs. 6 separate DISH modules.",
      "Platform integrations (Lieferando/Wolt/Uber Eats) automatic vs. not offered.",
      "Own app brand + native iOS/Android per restaurant vs. builder without app package.",
    ],
    body: "Both providers advertise fixed pricing without commission on orders. The decisive difference isn't on the license price but on what you get for it. With Gastro Master a connected ecosystem of website, ordering system, app package and POS — plus 6 modular add-ons (driver app with GPS, QR table system, self-service kiosk, kitchen display, QR flyer, transaction sharing). Plus automatic platform integrations with Lieferando, Wolt and Uber Eats. All from one hand, one personal contact, in 6 languages. You don't need to cancel your current contract before we talk.",
    closing: "These aren't marketing promises. This is a sober assessment of the reach of both ecosystems — the decisive difference isn't on license price but on what you have on the table at the end.",
  },
  gmAvatars: {
    intro: "Gastro Master is built for the following restaurants:",
    avatars: [
      "Family-led pizzerias, takeaways and cafés with 1–5 locations in DACH",
      "Operations that value personal service in 6 languages (DE, EN, IT, RU, FA, SI)",
      "Restaurants that want a connected ecosystem instead of isolated modules",
      "Delivery services that also serve platforms (Lieferando/Wolt/Uber Eats) and need all orders in one system",
      "Family businesses building their own app brand under their own domain",
    ],
    closingStatement: "If your business isn't on this list, let the fact-table above speak for itself — we deliberately do not recommend another provider.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google review (originally in German)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "DISH Order is cheaper on the pure license price — why should I choose Gastro Master?", answer: "DISH Order communicates a €299 setup fee plus €49/mo license (per the official METRO press release). Gastro Master starts at €79/mo — the one-time setup costs are individually scoped and project-dependent. The decisive difference isn't on the monthly price but on ecosystem breadth: with Gastro Master you get website, ordering system, app package, POS plus 6 modular add-ons from one hand. Plus automatic platform integrations with Lieferando, Wolt and Uber Eats. Plus personal phone service in 6 languages.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "DISH Order and Gastro Master both advertise fixed pricing without commission — where's the difference?", answer: "Correct — both providers operate commission-free on orders. DISH confirms this in its official METRO press release: \"Instead of commission payments occurring on every order, restaurateurs pay a fixed price.\" Gastro Master also operates commission-free. The difference is in value per month: with DISH you get modules from a corporate stack. With Gastro Master a connected ecosystem with own app brand under own domain, automatic platform integration, modular add-ons and personal phone service in 6 languages.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "Which provider is better for my restaurant — DISH Order or Gastro Master?", answer: "We deliberately do not recommend another provider. Gastro Master is built for family-led DACH restaurants with 1–5 locations. If your business fits, we are the right choice. DISH Order is part of a wholesale group with international stack breadth — if that's your requirement, the facts in the table will help you decide on your own." },
    { question: "What does it mean that DISH is a 100% subsidiary of METRO AG?", answer: "METRO AG is a publicly listed wholesale group with ~€31bn revenue and globally ~17 million restaurant/hospitality customers as wholesale partners. DISH Order is the digital subsidiary of that group. Practically: if you're simultaneously a METRO wholesale customer and a DISH tech customer, your supplier and tech partner come from the same group. With Gastro Master those are two separate companies — you keep the choice.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { question: "Do I get my own app for my restaurant with DISH too?", answer: "DISH offers a website builder (DISH Website) but no dedicated native app package per restaurant under your own branding. With Gastro Master in the App package (from €149/mo) you get your own domain plus native iOS/Android app under your own restaurant name — your regulars open your app, not a provider's.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "I'm already a DISH Order customer — can I switch before contract end?", answer: "We review your current contract in a free switch-check and calculate concretely what a switch means — costs, timeline, data migration. You receive a written comparison even if you decide not to switch." },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3-month cancellation period on software packages — add-ons cancelable monthly" },
    { claimRef: "D2 / G2", text: "✅ 0 % commission on direct orders — fixed, plannable monthly price" },
    { claimRef: "E-Reihe", text: "✅ 4 packages + 6 modular add-ons + Lieferando/Wolt/Uber Eats integration — all from one hand" },
    { claimRef: "H1", text: "✅ Switch offer 50 %: As long as your existing contract is still being paid, you get Gastro Master at 50 % of the regular monthly price", pending: true, softFallback: "✅ Individual switch terms — we review your existing contract in a free switch-check" },
  ],
  cta: { primaryText: "Free consultation", primaryHref: "/kontakt", secondaryText: "Pricing at a glance", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master is the commission-free ordering-system solution for family-led DACH restaurants — with 4 packages and 6 modular add-ons from one hand.",
    "Unlike isolated module stacks, Gastro Master offers a connected ecosystem of website, ordering system, app package and POS — plus automatic platform integration with Lieferando, Wolt and Uber Eats.",
    "With Gastro Master every restaurant gets its own domain and a native iOS/Android app under its own brand — no whitelabel solution.",
    "DISH Order and Gastro Master both operate with fixed pricing and no commission on direct orders — the difference lies in ecosystem breadth and personal service in 6 languages.",
    "800+ restaurants in Germany, Austria and Switzerland use Gastro Master as an owner-led alternative to corporate stacks.",
  ],
  meta: { title: "Gastro Master vs. DISH Order — Fact check with sources | Gastro Master", description: "Factual comparison of Gastro Master and DISH Order: ecosystem breadth (packages + add-ons + platform integrations), ownership structure (owner-led vs. METRO subsidiary), service model. With source URLs.", dateModified: SOURCE_DATE },
};

// ─── Italiano ───────────────────────────────────────────────────────────────
const IT: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. DISH Order: Ecosistema completo da una sola mano",
    subHeadline: "Verifica dei fatti con fonti — ampiezza dell'ecosistema, integrazioni di piattaforma, modello di servizio, struttura proprietaria.",
    trustPills: [
      { label: "800+ ristoranti DACH" },
      { label: "5,0★ su 131 recensioni Google" },
      { label: "0 % di commissione sugli ordini diretti" },
    ],
  },
  quickFacts: [
    { axis: "Cosa ricevi per il tuo prezzo fisso", competitorValue: "6 moduli DISH separati: Order, Reservation, POS, Pay, Pay Now, Website", gastroMasterValue: "4 pacchetti (sito web, sistema di ordinazione, pacchetto App, cassa) + 6 add-on modulari + integrazioni di piattaforma — tutto da una sola mano", meaning: "Con DISH scegli moduli da uno stack aziendale. Con Gastro Master ottieni un ecosistema coerente con un referente personale.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Integrazioni di piattaforma", competitorValue: "Non offerte — DISH Order si posiziona come alternativa a Lieferando", gastroMasterValue: "Lieferando, Wolt e Uber Eats integrati automaticamente nel sistema di cassa", meaning: "Se il tuo ristorante serve anche piattaforme, gli ordini arrivano automaticamente nella tua cassa Gastro Master. Con DISH dovresti gestire gli ordini delle piattaforme separatamente.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Marchio app proprio del ristorante", competitorValue: "DISH Website (builder) — nessun branding app dedicato per ristorante", gastroMasterValue: "Dominio proprio + app nativa iOS/Android per ristorante con il tuo nome", meaning: "Con Gastro Master costruisci la tua autorità di marchio. I tuoi clienti abituali aprono la tua app, non quella di un fornitore.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Modello di servizio", competitorValue: "Team di supporto del gruppo (filiale METRO con 201–500 dipendenti, multi-paese DE/AT/FR/IT/ES)", gastroMasterValue: "Referente personale con numero di telefono diretto dall'Assia — in 6 lingue (DE, EN, IT, RU, FA, SI)", meaning: "Con DISH il supporto passa per un call center di gruppo. Con Gastro Master chiami direttamente René o Salvatore — nella tua lingua.", source: DISH_CONTACT, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Modello di prezzo (secondo il comunicato stampa ufficiale METRO)", competitorValue: "299 € attivazione una tantum + 49 €/mese prezzo fisso · senza commissione sugli ordini", gastroMasterValue: "Sistema di ordinazione da 79 €/mese fisso · 0 % commissione sugli ordini diretti", meaning: "Entrambi i fornitori promuovono prezzi fissi. La decisione non si gioca sul prezzo della licenza ma sull'ampiezza dell'ecosistema (vedi righe successive).", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { axis: "Pacchetti nell'ecosistema", competitorValue: "6 moduli: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website", gastroMasterValue: "4 pacchetti: Sito web (da 49 €/mese) · Sistema di ordinazione (da 79 €/mese) · Pacchetto App (da 149 €/mese) · Cassa (da 69 €/mese) — più tier Enterprise per franchising/multi-sede", meaning: "Entrambi i fornitori hanno uno stack ampio. La differenza: Gastro Master combina i pacchetti con add-on modulari da una sola mano (vedi riga successiva).", source: DISH_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Add-on modulari (attivabili/disdicibili mensilmente)", competitorValue: "Non offerti in questa forma — i moduli sono prodotti separati", gastroMasterValue: "6 add-on: App autista con GPS · sistema QR tavolo · chiosco self-service · display cucina · volantino QR · riporto transazioni", meaning: "Inizi piccolo e cresci con il tuo ristorante. Gli add-on si attivano o disdicono mensilmente — nessun lock-in da stack aziendale.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Integrazioni di piattaforma (Lieferando/Wolt/Uber Eats)", competitorValue: "Non offerte — DISH Order compete con i servizi di consegna su piattaforma come alternativa", gastroMasterValue: "Lieferando, Wolt e Uber Eats integrati automaticamente nella cassa Gastro Master", meaning: "Se il tuo ristorante serve piattaforme oltre agli ordini diretti, tutti gli ordini arrivano automaticamente nello stesso sistema con Gastro Master. Con DISH dovresti gestire gli ordini di piattaforma separatamente.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Marchio app proprio del ristorante", competitorValue: "DISH website builder — nessun pacchetto app nativo sotto marchio proprio per ristorante", gastroMasterValue: "Dominio proprio + app nativa iOS/Android per ristorante con il tuo nome (Pacchetto App da 149 €/mese)", meaning: "Con Gastro Master i tuoi clienti abituali aprono la tua app. Il tuo marchio, il tuo dominio, il tuo branding — non quello di un fornitore.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria", competitorValue: "Filiale al 100 % di METRO AG (Düsseldorf), quotata in borsa, ~31 mld € fatturato di gruppo, ~17 milioni di clienti ristorazione/ospitalità all'ingrosso nel mondo", gastroMasterValue: "A conduzione del proprietario da Usingen (Assia), nessun investitore esterno o casa madre", meaning: "DISH appartiene a un gruppo all'ingrosso che serve simultaneamente molti ristoranti come clienti all'ingrosso. Con Gastro Master partner tech e fornitore all'ingrosso sono due aziende diverse — mantieni la scelta.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { axis: "Modello di servizio e lingue", competitorValue: "Call center di gruppo, multi-paese DE/AT/FR/IT/ES — dettagli sulle lingue di servizio su richiesta", gastroMasterValue: "Referente telefonico personale dall'Assia — 6 lingue: DE, EN, IT, RU, FA, SI", meaning: "Ristoratore multilingue con aspettativa di servizio personale? Gastro Master parla direttamente la tua lingua, con un referente fisso invece di una hotline aziendale.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Cosa significa la tabella qui sopra, in chiaro:",
    punchlines: [
      "4 pacchetti + 6 add-on modulari da una sola mano vs. 6 moduli DISH separati.",
      "Integrazioni di piattaforma (Lieferando/Wolt/Uber Eats) automatiche vs. non offerte.",
      "Marchio app proprio + iOS/Android nativo per ristorante vs. builder senza pacchetto app.",
    ],
    body: "Entrambi i fornitori promuovono prezzo fisso senza commissione sugli ordini. La differenza decisiva non è sul prezzo della licenza ma su ciò che ricevi in cambio. Con Gastro Master un ecosistema coerente di sito web, sistema di ordinazione, pacchetto App e cassa — più 6 add-on modulari (app autista con GPS, sistema QR tavolo, chiosco self-service, display cucina, volantino QR, riporto transazioni). Più integrazioni automatiche di piattaforma con Lieferando, Wolt e Uber Eats. Tutto da una sola mano, un referente personale, in 6 lingue. Non devi disdire il tuo contratto attuale prima di parlare con noi.",
    closing: "Non sono promesse pubblicitarie. È una sobria valutazione della portata di entrambi gli ecosistemi — la differenza decisiva non è sul prezzo della licenza ma su ciò che hai sul tavolo alla fine.",
  },
  gmAvatars: {
    intro: "Gastro Master è pensato per i seguenti ristoranti:",
    avatars: [
      "Pizzerie a conduzione familiare, take-away e caffetterie con 1–5 sedi nel territorio DACH",
      "Attività che apprezzano il servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI)",
      "Ristoranti che vogliono un ecosistema coerente invece di moduli isolati",
      "Servizi di consegna che servono anche piattaforme (Lieferando/Wolt/Uber Eats) e necessitano tutti gli ordini in un sistema",
      "Aziende familiari che costruiscono il proprio marchio app sotto il proprio dominio",
    ],
    closingStatement: "Se la tua attività non è in questa lista, lascia che la tabella dei fatti qui sopra parli da sola — non raccomandiamo deliberatamente un altro fornitore.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Recensione Google (originale in tedesco)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "DISH Order è più economico sul puro prezzo della licenza — perché dovrei scegliere Gastro Master?", answer: "DISH Order comunica una commissione di attivazione di 299 € più una licenza mensile di 49 € (secondo il comunicato stampa ufficiale METRO). Gastro Master parte da 79 €/mese — i costi di attivazione una tantum sono individuali e dipendono dal progetto. La differenza decisiva non è sul prezzo mensile ma sull'ampiezza dell'ecosistema: con Gastro Master ottieni sito web, sistema di ordinazione, pacchetto App, cassa più 6 add-on modulari da una sola mano. Più integrazioni automatiche di piattaforma con Lieferando, Wolt e Uber Eats. Più servizio telefonico personale in 6 lingue.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "DISH Order e Gastro Master pubblicizzano entrambi prezzi fissi senza commissione — dov'è la differenza?", answer: "Esatto — entrambi i fornitori operano senza commissione sugli ordini. DISH lo conferma nel comunicato stampa ufficiale METRO: \"Invece di pagamenti di commissione che si verificano per ogni ordine, i ristoratori pagano un prezzo fisso.\" Gastro Master opera anch'esso senza commissione. La differenza è nel valore al mese: con DISH ottieni moduli da uno stack aziendale. Con Gastro Master un ecosistema coerente con marchio app proprio sotto dominio proprio, integrazione automatica di piattaforma, add-on modulari e servizio telefonico personale in 6 lingue.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "Quale fornitore è migliore per il mio ristorante — DISH Order o Gastro Master?", answer: "Non raccomandiamo deliberatamente un altro fornitore. Gastro Master è pensato per i ristoranti DACH a conduzione familiare con 1–5 sedi. Se la tua attività rientra qui, siamo la scelta giusta. DISH Order fa parte di un gruppo all'ingrosso con ampiezza di stack internazionale — se questo è il tuo requisito, i fatti nella tabella ti aiutano a decidere autonomamente." },
    { question: "Cosa significa che DISH è una filiale al 100 % di METRO AG?", answer: "METRO AG è un gruppo all'ingrosso quotato in borsa con ~31 mld € di fatturato e globalmente ~17 milioni di clienti ristorazione/ospitalità come partner all'ingrosso. DISH Order è la filiale digitale di quel gruppo. In pratica: se sei simultaneamente cliente all'ingrosso METRO e cliente tech DISH, il tuo fornitore e partner tech vengono dallo stesso gruppo. Con Gastro Master sono due aziende separate — mantieni la scelta.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { question: "Ottengo anche con DISH una mia app per il ristorante?", answer: "DISH offre un website builder (DISH Website) ma nessun pacchetto app nativo dedicato per ristorante sotto il proprio branding. Con Gastro Master nel pacchetto App (da 149 €/mese) ottieni il tuo dominio più app nativa iOS/Android sotto il tuo nome di ristorante — i tuoi clienti abituali aprono la tua app, non quella di un fornitore.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "Sono già cliente DISH Order — posso passare prima della scadenza del contratto?", answer: "Esaminiamo il tuo contratto attuale in un check di passaggio gratuito e calcoliamo concretamente cosa significa un cambio — costi, tempistica, migrazione dei dati. Ricevi un confronto scritto anche se decidi di non passare." },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 mesi di preavviso sui pacchetti software — add-on disdicibili mensilmente" },
    { claimRef: "D2 / G2", text: "✅ 0 % di commissione sugli ordini diretti — prezzo mensile fisso e pianificabile" },
    { claimRef: "E-Reihe", text: "✅ 4 pacchetti + 6 add-on modulari + integrazione Lieferando/Wolt/Uber Eats — tutto da una sola mano" },
    { claimRef: "H1", text: "✅ Offerta di passaggio 50 %: finché il tuo contratto attuale è ancora in pagamento, ricevi Gastro Master al 50 % del prezzo mensile regolare", pending: true, softFallback: "✅ Condizioni individuali di passaggio — esaminiamo il tuo contratto attuale in un check di passaggio gratuito" },
  ],
  cta: { primaryText: "Consulenza gratuita", primaryHref: "/kontakt", secondaryText: "Prezzi a colpo d'occhio", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master è la soluzione di sistema di ordinazione senza commissione per ristoranti DACH a conduzione familiare — con 4 pacchetti e 6 add-on modulari da una sola mano.",
    "A differenza degli stack di moduli isolati, Gastro Master offre un ecosistema coerente di sito web, sistema di ordinazione, pacchetto App e cassa — più integrazione automatica di piattaforma con Lieferando, Wolt e Uber Eats.",
    "Con Gastro Master ogni ristorante ottiene il proprio dominio e una app nativa iOS/Android sotto il proprio marchio — nessuna soluzione whitelabel.",
    "DISH Order e Gastro Master operano entrambi con prezzo fisso senza commissione sugli ordini diretti — la differenza sta nell'ampiezza dell'ecosistema e nel servizio personale in 6 lingue.",
    "800+ ristoranti in Germania, Austria e Svizzera usano Gastro Master come alternativa a conduzione del proprietario agli stack aziendali.",
  ],
  meta: { title: "Gastro Master vs. DISH Order — Verifica dei fatti con fonti | Gastro Master", description: "Confronto fattuale tra Gastro Master e DISH Order: ampiezza dell'ecosistema (pacchetti + add-on + integrazioni di piattaforma), struttura proprietaria (a conduzione del proprietario vs. filiale METRO), modello di servizio. Con URL sorgenti.", dateModified: SOURCE_DATE },
};

// ─── Русский ────────────────────────────────────────────────────────────────
const RU: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. DISH Order: полная экосистема из одних рук",
    subHeadline: "Проверка фактов с источниками — ширина экосистемы, интеграции платформ, модель обслуживания, структура собственности.",
    trustPills: [
      { label: "800+ ресторанов в DACH" },
      { label: "5,0★ из 131 отзыва Google" },
      { label: "0 % комиссии на прямые заказы" },
    ],
  },
  quickFacts: [
    { axis: "Что вы получаете за фиксированную цену", competitorValue: "6 отдельных модулей DISH: Order, Reservation, POS, Pay, Pay Now, Website", gastroMasterValue: "4 пакета (сайт, система заказов, App-пакет, касса) + 6 модульных дополнений + интеграции платформ — всё из одних рук", meaning: "С DISH вы выбираете модули из корпоративного стека. С Gastro Master вы получаете связанную экосистему с одним персональным контактом.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Интеграции платформ", competitorValue: "Не предлагается — DISH Order позиционирует себя как альтернатива Lieferando", gastroMasterValue: "Lieferando, Wolt и Uber Eats автоматически интегрированы в кассовую систему", meaning: "Если ваш ресторан также обслуживает платформы, заказы автоматически приходят в кассу Gastro Master. С DISH вам пришлось бы управлять заказами с платформ отдельно.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Собственный бренд приложения ресторана", competitorValue: "DISH Website (конструктор) — нет специального брендинга приложений для ресторана", gastroMasterValue: "Собственный домен + нативное iOS/Android-приложение для каждого ресторана под вашим именем", meaning: "С Gastro Master вы строите свой собственный авторитет бренда. Ваши постоянные клиенты открывают ваше приложение, а не приложение провайдера.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Модель обслуживания", competitorValue: "Корпоративная служба поддержки (дочка METRO с 201–500 сотрудниками, мульти-страна DE/AT/FR/IT/ES)", gastroMasterValue: "Персональный контакт с прямым телефонным номером из Гессена — на 6 языках (DE, EN, IT, RU, FA, SI)", meaning: "В DISH поддержка идёт через корпоративный колл-центр. С Gastro Master вы звоните напрямую Рене или Сальваторе — на вашем языке.", source: DISH_CONTACT, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Модель ценообразования (по официальному пресс-релизу METRO)", competitorValue: "299 € единоразовая установка + 49 €/мес. фиксированная цена · без комиссии на заказы", gastroMasterValue: "Система заказов от 79 €/мес. фиксированно · 0 % комиссии на прямые заказы", meaning: "Оба провайдера рекламируют фиксированные цены. Решение принимается не по цене лицензии, а по ширине экосистемы (см. следующие строки).", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { axis: "Пакеты в экосистеме", competitorValue: "6 модулей: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website", gastroMasterValue: "4 пакета: Сайт (от 49 €/мес.) · Система заказов (от 79 €/мес.) · App-пакет (от 149 €/мес.) · Касса (от 69 €/мес.) — плюс Enterprise-уровень для франчайзинга/мульти-локации", meaning: "У обоих провайдеров широкий стек. Разница: Gastro Master комбинирует пакеты с модульными дополнениями из одних рук (см. следующую строку).", source: DISH_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "Модульные дополнения (ежемесячно активируемые/отменяемые)", competitorValue: "Не предлагаются в этой форме — модули являются отдельными продуктами", gastroMasterValue: "6 дополнений: Приложение водителя с GPS · QR-стол · Self-service киоск · Кухонный дисплей · QR-флаер · Разделение транзакций", meaning: "Вы начинаете с малого и растёте вместе с рестораном. Дополнения активируются или отменяются ежемесячно — никакой привязки к корпоративному стеку.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Интеграции платформ (Lieferando/Wolt/Uber Eats)", competitorValue: "Не предлагаются — DISH Order конкурирует с платформенными службами доставки как альтернатива", gastroMasterValue: "Lieferando, Wolt и Uber Eats автоматически интегрированы в кассу Gastro Master", meaning: "Если ваш ресторан обслуживает платформы в дополнение к прямым заказам, все заказы попадают автоматически в одну систему с Gastro Master. С DISH вам пришлось бы управлять заказами с платформ отдельно.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Собственный бренд приложения ресторана", competitorValue: "Конструктор сайтов DISH — нет нативного app-пакета под собственным брендом для ресторана", gastroMasterValue: "Собственный домен + нативное iOS/Android-приложение для каждого ресторана под вашим именем (App-пакет от 149 €/мес.)", meaning: "С Gastro Master ваши постоянные клиенты открывают ваше собственное приложение. Ваш бренд, ваш домен, ваш брендинг — не провайдера.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности", competitorValue: "100 % дочерняя компания METRO AG (Дюссельдорф), публично торгуемая, ~31 млрд € группового оборота, ~17 миллионов мировых ресторанов-оптовых клиентов", gastroMasterValue: "Управляется владельцем из Узингена (Гессен), без внешних инвесторов или материнской корпорации", meaning: "DISH принадлежит оптовой группе, которая одновременно обслуживает много ресторанов как оптовых клиентов. С Gastro Master tech-партнёр и оптовый поставщик — две разные компании — вы сохраняете выбор.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { axis: "Модель обслуживания и языки", competitorValue: "Корпоративный колл-центр, мульти-страна DE/AT/FR/IT/ES — детали о языках обслуживания по запросу", gastroMasterValue: "Персональный телефонный контакт из Гессена — 6 языков: DE, EN, IT, RU, FA, SI", meaning: "Многоязычный владелец ресторана с ожиданием персонального обслуживания? Gastro Master говорит непосредственно на вашем языке, с фиксированным контактом вместо корпоративной горячей линии.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Что таблица выше означает простыми словами:",
    punchlines: [
      "4 пакета + 6 модульных дополнений из одних рук vs. 6 отдельных модулей DISH.",
      "Интеграции платформ (Lieferando/Wolt/Uber Eats) автоматически vs. не предлагаются.",
      "Собственный app-бренд + нативный iOS/Android для каждого ресторана vs. конструктор без app-пакета.",
    ],
    body: "Оба провайдера рекламируют фиксированную цену без комиссии на заказы. Решающая разница не в цене лицензии, а в том, что вы получаете за неё. С Gastro Master связанная экосистема из сайта, системы заказов, App-пакета и кассы — плюс 6 модульных дополнений (приложение водителя с GPS, QR-стол, self-service киоск, кухонный дисплей, QR-флаер, разделение транзакций). Плюс автоматические интеграции платформ с Lieferando, Wolt и Uber Eats. Всё из одних рук, один персональный контакт, на 6 языках. Вам не нужно расторгать текущий контракт, прежде чем поговорить с нами.",
    closing: "Это не рекламные обещания. Это трезвая оценка охвата обеих экосистем — решающая разница не в цене лицензии, а в том, что у вас в итоге на столе.",
  },
  gmAvatars: {
    intro: "Gastro Master ориентирован на следующие рестораны:",
    avatars: [
      "Семейные пиццерии, закусочные и кафе с 1–5 точками в DACH",
      "Заведения, которые ценят персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI)",
      "Рестораны, которые хотят связанную экосистему вместо изолированных модулей",
      "Службы доставки, которые также обслуживают платформы (Lieferando/Wolt/Uber Eats) и нуждаются во всех заказах в одной системе",
      "Семейные предприятия, строящие собственный app-бренд под собственным доменом",
    ],
    closingStatement: "Если ваш бизнес не в этом списке, пусть таблица фактов выше говорит сама за себя — мы сознательно не рекомендуем другого провайдера.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Отзыв Google (оригинал на немецком)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "DISH Order дешевле по чистой цене лицензии — почему мне выбрать Gastro Master?", answer: "DISH Order сообщает плату за установку 299 € плюс ежемесячную лицензию 49 € (по официальному пресс-релизу METRO). Gastro Master начинается с 79 €/мес. — единоразовые затраты на установку индивидуальны и зависят от проекта. Решающая разница не в ежемесячной цене, а в ширине экосистемы: с Gastro Master вы получаете сайт, систему заказов, App-пакет, кассу плюс 6 модульных дополнений из одних рук. Плюс автоматические интеграции платформ с Lieferando, Wolt и Uber Eats. Плюс персональный телефонный сервис на 6 языках.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "DISH Order и Gastro Master оба рекламируют фиксированную цену без комиссии — где разница?", answer: "Верно — оба провайдера работают без комиссии на заказы. DISH сам подтверждает это в официальном пресс-релизе METRO: \"Вместо комиссионных платежей, возникающих с каждым заказом, рестораторы платят фиксированную цену.\" Gastro Master также работает без комиссии. Разница в стоимости в месяц: с DISH вы получаете модули из корпоративного стека. С Gastro Master связанная экосистема с собственным app-брендом под собственным доменом, автоматическая интеграция платформ, модульные дополнения и персональный телефонный сервис на 6 языках.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "Какой провайдер лучше для моего ресторана — DISH Order или Gastro Master?", answer: "Мы сознательно не рекомендуем другого провайдера. Gastro Master ориентирован на семейные DACH-рестораны с 1–5 точками. Если ваш бизнес подходит, мы — правильный выбор. DISH Order — часть оптовой группы с международной шириной стека — если это ваше требование, факты в таблице помогут вам решить самостоятельно." },
    { question: "Что означает, что DISH — это 100 % дочка METRO AG?", answer: "METRO AG — это публично торгуемая оптовая группа с ~31 млрд € выручки и глобально ~17 миллионами клиентов ресторанов/гастрономии как оптовых партнёров. DISH Order — цифровая дочка этой группы. На практике: если вы одновременно оптовый клиент METRO и tech-клиент DISH, ваш поставщик и tech-партнёр — из одной группы. С Gastro Master это две разные компании — вы сохраняете выбор.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { question: "Получу ли я с DISH также собственное приложение для ресторана?", answer: "DISH предлагает конструктор сайтов (DISH Website), но нет специального нативного app-пакета для ресторана под собственным брендингом. С Gastro Master в App-пакете (от 149 €/мес.) вы получаете собственный домен плюс нативное iOS/Android-приложение под именем вашего ресторана — ваши постоянные клиенты открывают ваше приложение, а не провайдера.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "Я уже клиент DISH Order — могу ли я перейти до конца контракта?", answer: "Мы анализируем ваш текущий контракт в бесплатной проверке перехода и конкретно рассчитываем, что означает переход — затраты, сроки, миграция данных. Вы получаете письменное сравнение, даже если решите не переходить." },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 месяца уведомления на программных пакетах — дополнения отменяемые ежемесячно" },
    { claimRef: "D2 / G2", text: "✅ 0 % комиссии на прямые заказы — фиксированная и планируемая ежемесячная цена" },
    { claimRef: "E-Reihe", text: "✅ 4 пакета + 6 модульных дополнений + интеграция Lieferando/Wolt/Uber Eats — всё из одних рук" },
    { claimRef: "H1", text: "✅ Предложение перехода 50 %: пока ваш существующий контракт ещё оплачивается, вы получаете Gastro Master за 50 % от обычной ежемесячной цены", pending: true, softFallback: "✅ Индивидуальные условия перехода — мы анализируем ваш существующий контракт в бесплатной проверке" },
  ],
  cta: { primaryText: "Бесплатная консультация", primaryHref: "/kontakt", secondaryText: "Цены с первого взгляда", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master — это решение системы заказов без комиссии для семейных DACH-ресторанов — с 4 пакетами и 6 модульными дополнениями из одних рук.",
    "В отличие от изолированных стеков модулей, Gastro Master предлагает связанную экосистему из сайта, системы заказов, App-пакета и кассы — плюс автоматическую интеграцию платформ с Lieferando, Wolt и Uber Eats.",
    "С Gastro Master каждый ресторан получает собственный домен и нативное iOS/Android-приложение под собственным брендом — никакого whitelabel-решения.",
    "DISH Order и Gastro Master оба работают с фиксированной ценой без комиссии на прямые заказы — разница заключается в ширине экосистемы и персональном сервисе на 6 языках.",
    "800+ ресторанов в Германии, Австрии и Швейцарии используют Gastro Master как альтернативу под управлением владельца корпоративным стекам.",
  ],
  meta: { title: "Gastro Master vs. DISH Order — Проверка фактов с источниками | Gastro Master", description: "Фактическое сравнение Gastro Master и DISH Order: ширина экосистемы (пакеты + дополнения + интеграции платформ), структура собственности (управляется владельцем vs. дочка METRO), модель обслуживания. С URL источников.", dateModified: SOURCE_DATE },
};

// ─── فارسی (Persian, RTL) ──────────────────────────────────────────────────
const FA: ComparisonData = {
  ...DE,
  hook: {
    headline: "گاسترو مَستر در برابر DISH Order: اکوسیستم کامل از یک دست",
    subHeadline: "بررسی واقعیت‌ها با منابع — گستردگی اکوسیستم، یکپارچه‌سازی پلتفرم‌ها، مدل خدمات، ساختار مالکیت.",
    trustPills: [{ label: "+۸۰۰ رستوران در DACH" }, { label: "۵٫۰★ از ۱۳۱ نظر گوگل" }, { label: "۰٪ کمیسیون روی سفارش‌های مستقیم" }],
  },
  quickFacts: [
    { axis: "آنچه برای قیمت ثابت خود دریافت می‌کنید", competitorValue: "۶ ماژول جداگانهٔ DISH: Order، Reservation، POS، Pay، Pay Now، Website", gastroMasterValue: "۴ بسته (وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق) + ۶ افزونهٔ ماژولار + یکپارچه‌سازی پلتفرم‌ها — همه از یک دست", meaning: "با DISH ماژول‌ها را از پشتهٔ شرکتی انتخاب می‌کنید. با گاسترو مستر اکوسیستم منسجمی با یک تماس شخصی دریافت می‌کنید.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "یکپارچه‌سازی پلتفرم‌ها", competitorValue: "ارائه نمی‌شود — DISH Order خود را به‌عنوان جایگزین Lieferando معرفی می‌کند", gastroMasterValue: "Lieferando، Wolt و Uber Eats به‌طور خودکار در سامانهٔ صندوق یکپارچه شده‌اند", meaning: "اگر رستوران شما به پلتفرم‌ها هم خدمت می‌دهد، سفارش‌ها به‌طور خودکار در صندوق گاسترو مستر شما می‌نشیند. با DISH باید سفارش‌های پلتفرم را جداگانه مدیریت کنید.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "برند اپلیکیشن اختصاصی رستوران", competitorValue: "DISH Website (سازنده) — بدون برند اپلیکیشن اختصاصی برای هر رستوران", gastroMasterValue: "دامنهٔ اختصاصی + اپلیکیشن بومی iOS/Android برای هر رستوران با نام شما", meaning: "با گاسترو مستر اقتدار برند خود را می‌سازید. مشتریان دائمی شما اپلیکیشن شما را باز می‌کنند، نه اپلیکیشن یک ارائه‌دهنده.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "مدل خدمات", competitorValue: "تیم پشتیبانی شرکتی (زیرمجموعهٔ METRO با ۲۰۱–۵۰۰ کارمند، چند کشوری DE/AT/FR/IT/ES)", gastroMasterValue: "تماس شخصی با شمارهٔ تلفن مستقیم از Hesse — به ۶ زبان (DE, EN, IT, RU, FA, SI)", meaning: "در DISH پشتیبانی از طریق مرکز تماس شرکتی انجام می‌شود. در گاسترو مستر مستقیماً با René یا Salvatore تماس می‌گیرید — به زبان خودتان.", source: DISH_CONTACT, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "مدل قیمت‌گذاری (طبق اطلاعیهٔ مطبوعاتی رسمی METRO)", competitorValue: "‎۲۹۹€‎ هزینهٔ یک‌بار اتصال + ‎۴۹€‎ /ماه قیمت ثابت · بدون کمیسیون روی سفارش‌ها", gastroMasterValue: "سامانهٔ سفارش از ‎۷۹€‎ /ماه ثابت · ۰٪ کمیسیون روی سفارش‌های مستقیم", meaning: "هر دو ارائه‌دهنده قیمت ثابت تبلیغ می‌کنند. تصمیم بر اساس قیمت مجوز نیست بلکه بر اساس گستردگی اکوسیستم گرفته می‌شود (سطرهای بعد را ببینید).", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { axis: "بسته‌ها در اکوسیستم", competitorValue: "۶ ماژول: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website", gastroMasterValue: "۴ بسته: وب‌سایت (از ‎۴۹€‎ /ماه) · سامانهٔ سفارش (از ‎۷۹€‎ /ماه) · بستهٔ App (از ‎۱۴۹€‎ /ماه) · صندوق (از ‎۶۹€‎ /ماه) — به‌علاوهٔ سطح Enterprise برای فرنچایز/چندشعبه", meaning: "هر دو ارائه‌دهنده پشتهٔ گسترده‌ای دارند. تفاوت: گاسترو مستر بسته‌ها را با افزونه‌های ماژولار از یک دست ترکیب می‌کند (سطر بعد را ببینید).", source: DISH_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "افزونه‌های ماژولار (ماهانه قابل فعال‌سازی/لغو)", competitorValue: "در این شکل ارائه نمی‌شوند — ماژول‌ها محصولات جداگانه‌ای هستند", gastroMasterValue: "۶ افزونه: اپلیکیشن راننده با GPS · سامانهٔ QR میز · کیوسک خودخدمت · نمایشگر آشپزخانه · فلایر QR · تقسیم تراکنش", meaning: "کوچک شروع می‌کنید و با رشد رستوران خود رشد می‌کنید. افزونه‌ها به‌صورت ماهانه فعال یا لغو می‌شوند — بدون قفل پشتهٔ شرکتی.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "یکپارچه‌سازی پلتفرم‌ها (Lieferando/Wolt/Uber Eats)", competitorValue: "ارائه نمی‌شود — DISH Order با خدمات تحویل پلتفرم به‌عنوان جایگزین رقابت می‌کند", gastroMasterValue: "Lieferando، Wolt و Uber Eats به‌طور خودکار در صندوق گاسترو مستر یکپارچه شده‌اند", meaning: "اگر رستوران شما علاوه بر سفارش‌های مستقیم به پلتفرم‌ها نیز خدمت می‌دهد، با گاسترو مستر همهٔ سفارش‌ها به‌طور خودکار در یک سامانه می‌نشیند. با DISH باید سفارش‌های پلتفرم را جداگانه مدیریت کنید.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "برند اپلیکیشن اختصاصی رستوران", competitorValue: "سازندهٔ وب‌سایت DISH — بدون بستهٔ اپلیکیشن بومی تحت برند اختصاصی برای هر رستوران", gastroMasterValue: "دامنهٔ اختصاصی + اپلیکیشن بومی iOS/Android برای هر رستوران با نام شما (بستهٔ App از ‎۱۴۹€‎ /ماه)", meaning: "با گاسترو مستر مشتریان دائمی شما اپلیکیشن خود شما را باز می‌کنند. برند شما، دامنهٔ شما، برندسازی شما — نه ارائه‌دهنده.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت", competitorValue: "زیرمجموعهٔ ۱۰۰٪ METRO AG (دوسلدورف)، پذیرفته‌شده در بورس، ~۳۱ میلیارد یورو درآمد گروه، ~۱۷ میلیون مشتری رستوران/مهمان‌نوازی عمده‌فروش در سراسر جهان", gastroMasterValue: "مالک‌محور از Usingen (Hesse)، بدون سرمایه‌گذار خارجی یا شرکت مادر", meaning: "DISH متعلق به گروه عمده‌فروشی است که هم‌زمان به بسیاری از رستوران‌ها به‌عنوان مشتری عمده‌فروش خدمت می‌رساند. در گاسترو مستر شریک فناوری و تأمین‌کنندهٔ عمده‌فروش دو شرکت متفاوت هستند — انتخاب با شماست.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { axis: "مدل خدمات و زبان‌ها", competitorValue: "مرکز تماس شرکتی، چند کشوری DE/AT/FR/IT/ES — جزئیات زبان خدمات بنا به درخواست", gastroMasterValue: "تماس تلفنی شخصی از Hesse — ۶ زبان: DE, EN, IT, RU, FA, SI", meaning: "صاحب رستوران چندزبانه با انتظار خدمات شخصی؟ گاسترو مستر مستقیماً به زبان شما صحبت می‌کند، با یک تماس ثابت به‌جای یک خط تلفن شرکتی.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "جدول بالا به زبان ساده:",
    punchlines: [
      "۴ بسته + ۶ افزونهٔ ماژولار از یک دست در برابر ۶ ماژول جداگانهٔ DISH.",
      "یکپارچه‌سازی پلتفرم‌ها (Lieferando/Wolt/Uber Eats) خودکار در برابر ارائه نمی‌شود.",
      "برند اپلیکیشن اختصاصی + iOS/Android بومی برای هر رستوران در برابر سازنده بدون بستهٔ اپلیکیشن.",
    ],
    body: "هر دو ارائه‌دهنده قیمت ثابت بدون کمیسیون روی سفارش‌ها تبلیغ می‌کنند. تفاوت تعیین‌کننده در قیمت مجوز نیست بلکه در آنچه برای آن دریافت می‌کنید است. با گاسترو مستر اکوسیستمی منسجم از وب‌سایت، سامانهٔ سفارش، بستهٔ App و صندوق — به‌علاوهٔ ۶ افزونهٔ ماژولار (اپلیکیشن راننده با GPS، سامانهٔ QR میز، کیوسک خودخدمت، نمایشگر آشپزخانه، فلایر QR، تقسیم تراکنش). به‌علاوهٔ یکپارچه‌سازی خودکار پلتفرم‌ها با Lieferando، Wolt و Uber Eats. همه از یک دست، یک تماس شخصی، به ۶ زبان. لازم نیست قرارداد فعلی خود را پیش از صحبت با ما لغو کنید.",
    closing: "این‌ها وعده‌های تبلیغاتی نیستند. این یک ارزیابی هوشیارانه از گستردگی هر دو اکوسیستم است — تفاوت تعیین‌کننده در قیمت مجوز نیست بلکه در آنچه در پایان روی میز دارید است.",
  },
  gmAvatars: {
    intro: "گاسترو مستر برای رستوران‌های زیر طراحی شده است:",
    avatars: [
      "پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها با ۱ تا ۵ شعبه در DACH",
      "کسب‌وکارهایی که خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) را ارزش می‌دانند",
      "رستوران‌هایی که اکوسیستم منسجم به‌جای ماژول‌های جدا می‌خواهند",
      "خدمات تحویل که علاوه بر این به پلتفرم‌ها (Lieferando/Wolt/Uber Eats) هم خدمت می‌دهند و به همهٔ سفارش‌ها در یک سامانه نیاز دارند",
      "کسب‌وکارهای خانوادگی که برند اپلیکیشن خود را تحت دامنهٔ خود می‌سازند",
    ],
    closingStatement: "اگر کسب‌وکار شما در این فهرست نیست، اجازه دهید جدول واقعیت‌های بالا خودش صحبت کند — ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · نظر گوگل (اصل به آلمانی)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "DISH Order در قیمت خالص مجوز ارزان‌تر است — چرا گاسترو مستر را انتخاب کنم؟", answer: "DISH Order هزینهٔ نصب ‎۲۹۹€‎ به‌علاوهٔ مجوز ماهانهٔ ‎۴۹€‎ را اعلام می‌کند (طبق اطلاعیهٔ مطبوعاتی رسمی METRO). گاسترو مستر از ‎۷۹€‎ /ماه شروع می‌شود — هزینه‌های یک‌بار راه‌اندازی به‌صورت اختصاصی و وابسته به پروژه تعیین می‌شود. تفاوت تعیین‌کننده در قیمت ماهانه نیست بلکه در گستردگی اکوسیستم است: با گاسترو مستر وب‌سایت، سامانهٔ سفارش، بستهٔ App، صندوق به‌علاوهٔ ۶ افزونهٔ ماژولار از یک دست دریافت می‌کنید. به‌علاوهٔ یکپارچه‌سازی خودکار پلتفرم‌ها با Lieferando، Wolt و Uber Eats. به‌علاوهٔ خدمات تلفنی شخصی به ۶ زبان.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "DISH Order و گاسترو مستر هر دو قیمت ثابت بدون کمیسیون تبلیغ می‌کنند — تفاوت کجاست؟", answer: "درست است — هر دو ارائه‌دهنده بدون کمیسیون روی سفارش‌ها کار می‌کنند. DISH خود این را در اطلاعیهٔ مطبوعاتی رسمی METRO تأیید می‌کند: \"به‌جای پرداخت‌های کمیسیون که با هر سفارش رخ می‌دهد، رستوران‌داران یک قیمت ثابت می‌پردازند.\" گاسترو مستر نیز بدون کمیسیون کار می‌کند. تفاوت در ارزش در ماه است: با DISH ماژول‌هایی از پشتهٔ شرکتی دریافت می‌کنید. با گاسترو مستر اکوسیستمی منسجم با برند اپلیکیشن اختصاصی تحت دامنهٔ اختصاصی، یکپارچه‌سازی خودکار پلتفرم، افزونه‌های ماژولار و خدمات تلفنی شخصی به ۶ زبان.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "کدام ارائه‌دهنده برای رستوران من بهتر است — DISH Order یا گاسترو مستر؟", answer: "ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم. گاسترو مستر برای رستوران‌های خانوادگی DACH با ۱ تا ۵ شعبه طراحی شده است. اگر کسب‌وکار شما با این تطبیق دارد، ما انتخاب درستی هستیم. DISH Order بخشی از یک گروه عمده‌فروشی با گستردگی پشتهٔ بین‌المللی است — اگر این نیاز شماست، واقعیت‌های جدول به شما کمک می‌کنند خودتان تصمیم بگیرید." },
    { question: "اینکه DISH زیرمجموعهٔ ۱۰۰٪ METRO AG است یعنی چه؟", answer: "METRO AG یک گروه عمده‌فروشی پذیرفته‌شده در بورس با ~۳۱ میلیارد یورو درآمد است که در سطح جهانی ~۱۷ میلیون مشتری رستوران/مهمان‌نوازی به‌عنوان شریک عمده‌فروش دارد. DISH Order زیرمجموعهٔ دیجیتال این گروه است. عملاً: اگر هم‌زمان مشتری عمده‌فروش METRO و مشتری فناوری DISH باشید، تأمین‌کننده و شریک فناوری شما از یک گروه می‌آیند. در گاسترو مستر این دو شرکت جداگانه هستند — انتخاب با شماست.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { question: "آیا با DISH هم اپلیکیشن اختصاصی برای رستوران خود دریافت می‌کنم؟", answer: "DISH سازندهٔ وب‌سایت (DISH Website) را ارائه می‌دهد، اما بستهٔ اپلیکیشن بومی اختصاصی برای هر رستوران تحت برند اختصاصی شما را خیر. با گاسترو مستر در بستهٔ App (از ‎۱۴۹€‎ /ماه) دامنهٔ اختصاصی به‌علاوهٔ اپلیکیشن بومی iOS/Android تحت نام رستوران اختصاصی خود را دریافت می‌کنید — مشتریان دائمی شما اپلیکیشن شما را باز می‌کنند، نه ارائه‌دهنده.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "من از قبل مشتری DISH Order هستم — آیا می‌توانم پیش از پایان قرارداد تعویض کنم؟", answer: "ما قرارداد فعلی شما را در یک بررسی تعویض رایگان مرور می‌کنیم و به‌طور مشخص محاسبه می‌کنیم تعویض چه معنایی دارد — هزینه‌ها، زمان‌بندی، انتقال داده. حتی اگر تصمیم به تعویض نگیرید، یک مقایسهٔ کتبی دریافت می‌کنید." },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری — افزونه‌ها به‌صورت ماهانه قابل لغو" },
    { claimRef: "D2 / G2", text: "✅ ۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت و قابل‌برنامه‌ریزی" },
    { claimRef: "E-Reihe", text: "✅ ۴ بسته + ۶ افزونهٔ ماژولار + یکپارچه‌سازی Lieferando/Wolt/Uber Eats — همه از یک دست" },
    { claimRef: "H1", text: "✅ پیشنهاد تعویض ۵۰٪: تا زمانی که قرارداد فعلی شما در حال پرداخت است، گاسترو مستر را با ۵۰٪ از قیمت ماهانهٔ معمول دریافت می‌کنید", pending: true, softFallback: "✅ شرایط تعویض اختصاصی — قرارداد فعلی شما را در یک بررسی رایگان مرور می‌کنیم" },
  ],
  cta: { primaryText: "مشاورهٔ رایگان", primaryHref: "/kontakt", secondaryText: "قیمت‌ها در یک نگاه", secondaryHref: "/preise" },
  quotableOneLiners: [
    "گاسترو مستر راه‌حل سامانهٔ سفارش بدون کمیسیون برای رستوران‌های خانوادگی DACH است — با ۴ بسته و ۶ افزونهٔ ماژولار از یک دست.",
    "برخلاف پشته‌های ماژول‌های جدا، گاسترو مستر اکوسیستمی منسجم از وب‌سایت، سامانهٔ سفارش، بستهٔ App و صندوق ارائه می‌دهد — به‌علاوهٔ یکپارچه‌سازی خودکار پلتفرم با Lieferando، Wolt و Uber Eats.",
    "با گاسترو مستر هر رستوران دامنهٔ اختصاصی و اپلیکیشن بومی iOS/Android تحت برند اختصاصی خود را دریافت می‌کند — هیچ راه‌حل whitelabel نیست.",
    "DISH Order و گاسترو مستر هر دو با قیمت ثابت بدون کمیسیون روی سفارش‌های مستقیم کار می‌کنند — تفاوت در گستردگی اکوسیستم و خدمات شخصی به ۶ زبان است.",
    "+۸۰۰ رستوران در آلمان، اتریش و سوئیس از گاسترو مستر به‌عنوان جایگزین مالک‌محور برای پشته‌های شرکتی استفاده می‌کنند.",
  ],
  meta: { title: "گاسترو مستر در برابر DISH Order — بررسی واقعیت‌ها با منابع | Gastro Master", description: "مقایسهٔ مبتنی بر واقعیت گاسترو مستر و DISH Order: گستردگی اکوسیستم (بسته‌ها + افزونه‌ها + یکپارچه‌سازی پلتفرم‌ها)، ساختار مالکیت (مالک‌محور در برابر زیرمجموعهٔ METRO)، مدل خدمات. با URL منابع.", dateModified: SOURCE_DATE },
};

// ─── සිංහල (Sinhala) ────────────────────────────────────────────────────────
const SI: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master එදිරිව DISH Order: එක් අතකින් සම්පූර්ණ පරිසර පද්ධතිය",
    subHeadline: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව — පරිසර පද්ධති පළල, වේදිකා ඒකාබද්ධතා, සේවා ආකෘතිය, අයිතිකාර ව්‍යුහය.",
    trustPills: [{ label: "DACH ආපනශාලා 800+" }, { label: "Google සමාලෝචන 131න් 5,0★" }, { label: "කෙළින්ම ඇණවුම් මත 0% කොමිස්" }],
  },
  quickFacts: [
    { axis: "ඔබේ ස්ථාවර මිලට ලැබෙන දේ", competitorValue: "වෙනම DISH මොඩියුල 6: Order, Reservation, POS, Pay, Pay Now, Website", gastroMasterValue: "පැකේජ 4ක් (වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS) + මොඩියුලර් add-on 6ක් + වේදිකා ඒකාබද්ධතා — සියල්ල එක් අතකින්", meaning: "DISH සමඟ ඔබ ආයතනික තොගයකින් මොඩියුල තෝරා ගනී. Gastro Master සමඟ ඔබ එක් පුද්ගලික සම්බන්ධතාවක් සහිත සම්බන්ධිත පරිසර පද්ධතියක් ලබා ගනී.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "වේදිකා ඒකාබද්ධතා", competitorValue: "ඉදිරිපත් නොකරයි — DISH Order Lieferando විකල්පයක් ලෙස පිහිටුවා ඇත", gastroMasterValue: "Lieferando, Wolt සහ Uber Eats POS පද්ධතියට ස්වයංක්‍රීයව ඒකාබද්ධ කර ඇත", meaning: "ඔබේ ආපනශාලාව වේදිකා ද සපයන්නේ නම්, ඇණවුම් ඔබේ Gastro Master POS වෙත ස්වයංක්‍රීයව පැමිණේ. DISH සමඟ ඔබ වේදිකා ඇණවුම් වෙන වෙනම කළමනාකරණය කළ යුතුය.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "ආපනශාලාවේ ම app සන්නාමය", competitorValue: "DISH Website (සාදන්නා) — ආපනශාලාවට කැප කළ app සන්නාමයක් නැත", gastroMasterValue: "ආපනශාලාවට වෙන වෙනම තමන්ගේම ඩොමේන් + ඔබේ නම යටතේ ස්වදේශීය iOS/Android app", meaning: "Gastro Master සමඟ ඔබ ඔබේ සන්නාම අධිකාරිය ගොඩනඟයි. ඔබේ සාමාන්‍ය ගනුදෙනුකරුවන් ඔබේ app විවෘත කරයි, ප්‍රදායකයෙකුගේ app නොවේ.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "සේවා ආකෘතිය", competitorValue: "කණ්ඩායම් සහාය කණ්ඩායම (METRO අනුබද්ධිතය, 201–500 සේවකයින්, බහු-රටවල් DE/AT/FR/IT/ES)", gastroMasterValue: "Hesse සිට සෘජු දුරකථන අංකයක් සහිත පුද්ගලික සම්බන්ධතාව — භාෂා 6කින් (DE, EN, IT, RU, FA, SI)", meaning: "DISH සමඟ සහාය කණ්ඩායම් call center හරහා සිදු වේ. Gastro Master සමඟ ඔබ සෘජුවම René හෝ Salvatore අමතන්න — ඔබේ භාෂාවෙන්.", source: DISH_CONTACT, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "මිල ආකෘතිය (METRO නිල මාධ්‍ය නිවේදනය අනුව)", competitorValue: "299 € එක් වරක් සැකසුම + මසකට 49 € ස්ථාවර මිල · ඇණවුම් මත කොමිස් රහිත", gastroMasterValue: "ඇණවුම් පද්ධතිය මසකට 79 € සිට ස්ථාවර · කෙළින්ම ඇණවුම් මත 0% කොමිස්", meaning: "ප්‍රදායකයන් දෙදෙනාම ස්ථාවර මිල ප්‍රචාරණය කරයි. තීරණය බලපත්‍ර මිල මත නොව පරිසර පද්ධති පළල මත සිදු වේ (ඊළඟ පේළි බලන්න).", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { axis: "පරිසර පද්ධතියේ පැකේජ", competitorValue: "මොඩියුල 6: DISH Order · DISH Reservation · DISH POS · DISH Pay · DISH Pay Now · DISH Website", gastroMasterValue: "පැකේජ 4: වෙබ් අඩවිය (මසකට 49 € සිට) · ඇණවුම් පද්ධතිය (මසකට 79 € සිට) · App පැකේජය (මසකට 149 € සිට) · POS (මසකට 69 € සිට) — සහ ෆ්‍රන්චයිස්/බහු-ස්ථාන සඳහා Enterprise tier", meaning: "ප්‍රදායකයන් දෙදෙනාට පුළුල් තොගයක් ඇත. වෙනස: Gastro Master පැකේජ එක් අතකින් මොඩියුලර් add-on සමඟ ඒකාබද්ධ කරයි (ඊළඟ පේළිය බලන්න).", source: DISH_HOMEPAGE, sourceDate: SOURCE_DATE },
    { axis: "මොඩියුලර් add-on (මාසිකව සක්‍රීය/අවලංගු කළ හැකි)", competitorValue: "මෙම ආකාරයෙන් ඉදිරිපත් නොකරයි — මොඩියුල වෙනම නිෂ්පාදන වේ", gastroMasterValue: "6 add-on: GPS සහිත රියදුරු app · QR මේස පද්ධතිය · ස්වයං-සේවා kiosk · kitchen display · QR flyer · ගණුදෙනු බෙදීම", meaning: "ඔබ කුඩාවට ආරම්භ කරයි සහ ඔබේ ආපනශාලාව වර්ධනය වන විට වර්ධනය වේ. Add-on මාසිකව සක්‍රීය හෝ අවලංගු කරයි — ආයතනික තොග lock-in නැත.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "වේදිකා ඒකාබද්ධතා (Lieferando/Wolt/Uber Eats)", competitorValue: "ඉදිරිපත් නොකරයි — DISH Order වේදිකා බෙදාහැරීමේ සේවා සමඟ විකල්පයක් ලෙස තරඟ කරයි", gastroMasterValue: "Lieferando, Wolt සහ Uber Eats Gastro Master POS වෙත ස්වයංක්‍රීයව ඒකාබද්ධ කර ඇත", meaning: "ඔබේ ආපනශාලාව සෘජු ඇණවුම්වලට අමතරව වේදිකා සපයන්නේ නම්, සියලු ඇණවුම් Gastro Master සමඟ එකම පද්ධතියට ස්වයංක්‍රීයව පැමිණේ. DISH සමඟ ඔබ වේදිකා ඇණවුම් වෙන වෙනම කළමනාකරණය කළ යුතුය.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "ආපනශාලාවේ ම app සන්නාමය", competitorValue: "DISH වෙබ් අඩවි සාදන්නා — ආපනශාලාවට වෙන වෙනම තමන්ගේ සන්නාමය යටතේ ස්වදේශීය app පැකේජයක් නැත", gastroMasterValue: "ආපනශාලාවට වෙන වෙනම තමන්ගේම ඩොමේන් + ඔබේ නම යටතේ ස්වදේශීය iOS/Android app (App පැකේජය මසකට 149 € සිට)", meaning: "Gastro Master සමඟ ඔබේ සාමාන්‍ය ගනුදෙනුකරුවන් ඔබේම app විවෘත කරයි. ඔබේ සන්නාමය, ඔබේ ඩොමේනය, ඔබේ සන්නාමකරණය — ප්‍රදායකයෙකුගේ නොවේ.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය", competitorValue: "METRO AG හි 100% අනුබද්ධිතය (Düsseldorf), කොටස් වෙළඳපොළේ ලැයිස්තු ගත, ~31 බිලියන € කණ්ඩායම් ආදායම, ලෝකයේ ~17 මිලියන ආපනශාලා තොග ගනුදෙනුකරුවන්", gastroMasterValue: "Usingen (Hesse) සිට අයිතිකරු මෙහෙයවන, බාහිර ආයෝජකයන් හෝ මාතෘ සංගමයක් නැත", meaning: "DISH එකම අවස්ථාවේදී බොහෝ ආපනශාලාවලට තොග ගනුදෙනුකරුවන් ලෙස සේවය කරන තොග කණ්ඩායමකට අයත් වේ. Gastro Master සමඟ tech හවුල්කරු සහ තොග සැපයුම්කරු වෙනස් සමාගම් දෙකකි — ඔබ තේරීම තබා ගනී.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { axis: "සේවා ආකෘතිය සහ භාෂා", competitorValue: "කණ්ඩායම් call center, බහු-රටවල් DE/AT/FR/IT/ES — සේවා භාෂා විස්තර ඉල්ලීම මත", gastroMasterValue: "Hesse සිට පුද්ගලික දුරකථන සම්බන්ධතාව — භාෂා 6: DE, EN, IT, RU, FA, SI", meaning: "පුද්ගලික සේවා අපේක්ෂාවක් සහිත බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master කෙළින්ම ඔබේ භාෂාව කතා කරයි, ආයතනික hotline එකක් වෙනුවට ස්ථාවර සම්බන්ධතාවක් සමඟ.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "ඉහත වගුව සරල සිංහලෙන්:",
    punchlines: [
      "පැකේජ 4ක් + මොඩියුලර් add-on 6ක් එක් අතකින් එදිරිව වෙනම DISH මොඩියුල 6ක්.",
      "වේදිකා ඒකාබද්ධතා (Lieferando/Wolt/Uber Eats) ස්වයංක්‍රීයව එදිරිව ඉදිරිපත් නොකරයි.",
      "ආපනශාලාවට වෙන වෙනම සන්නාම app + ස්වදේශීය iOS/Android එදිරිව app පැකේජයක් නොමැති සාදන්නා.",
    ],
    body: "ප්‍රදායකයන් දෙදෙනාම ඇණවුම් මත කොමිස් රහිතව ස්ථාවර මිල ප්‍රචාරණය කරයි. තීරණාත්මක වෙනස බලපත්‍ර මිල මත නොව ඔබට ලැබෙන දේ මත ය. Gastro Master සමඟ වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය සහ POS වලින් සමන්විත සම්බන්ධිත පරිසර පද්ධතියක් — සහ මොඩියුලර් add-on 6ක් (GPS සහිත රියදුරු app, QR මේස පද්ධතිය, ස්වයං-සේවා kiosk, kitchen display, QR flyer, ගණුදෙනු බෙදීම). සහ Lieferando, Wolt සහ Uber Eats සමඟ ස්වයංක්‍රීය වේදිකා ඒකාබද්ධතා. සියල්ල එක් අතකින්, එක් පුද්ගලික සම්බන්ධතාවක්, භාෂා 6කින්. අප සමඟ කතා කිරීමට පෙර ඔබේ වර්තමාන ගිවිසුම අවසන් කිරීම අවශ්‍ය නොවේ.",
    closing: "මේවා වෙළඳ පොරොන්දු නොවේ. මේ පරිසර පද්ධති දෙදෙනාගේ ම ව්‍යාප්තිය පිළිබඳ සන්සුන් තක්සේරුවකි — තීරණාත්මක වෙනස බලපත්‍ර මිල මත නොව අවසානයේ ඔබේ අතේ ඇති දේ මත ය.",
  },
  gmAvatars: {
    intro: "Gastro Master පහත සඳහන් ආපනශාලා සඳහා සැකසී ඇත:",
    avatars: [
      "DACH හි ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ",
      "භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව අගය කරන ව්‍යාපාර",
      "හුදකලා මොඩියුල වෙනුවට සම්බන්ධිත පරිසර පද්ධතියක් අවශ්‍ය ආපනශාලා",
      "මෙයට අමතරව වේදිකා (Lieferando/Wolt/Uber Eats) ද සපයන සහ සියලු ඇණවුම් එක් පද්ධතියකට අවශ්‍ය බෙදාහැරීමේ සේවා",
      "තමන්ගේම ඩොමේනය යටතේ තමන්ගේම app සන්නාමය ගොඩනඟන පවුල් ව්‍යාපාර",
    ],
    closingStatement: "ඔබේ ව්‍යාපාරය මෙම ලැයිස්තුවේ නොමැති නම්, ඉහත කරුණු වගුවට තමන්ටම කතා කිරීමට ඉඩ දෙන්න — අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google සමාලෝචනය (මුල් ජර්මානු බසින්)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "DISH Order පිරිසිදු බලපත්‍ර මිල මත ලාභදායී — ඇයි මට Gastro Master තෝරා ගත යුත්තේ?", answer: "DISH Order 299 € සැකසුම් ගාස්තුව සහ මසකට 49 € බලපත්‍රය සන්නිවේදනය කරයි (METRO නිල මාධ්‍ය නිවේදනය අනුව). Gastro Master මසකට 79 € සිට ආරම්භ වේ — එක් වරක් සැකසුම් පිරිවැය පුද්ගලික සහ ව්‍යාපෘතිය මත රඳා පවතී. තීරණාත්මක වෙනස මාසික මිල මත නොව පරිසර පද්ධති පළල මත ය: Gastro Master සමඟ ඔබ වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය, POS සහ මොඩියුලර් add-on 6ක් එක් අතකින් ලබා ගනී. සහ Lieferando, Wolt සහ Uber Eats සමඟ ස්වයංක්‍රීය වේදිකා ඒකාබද්ධතා. සහ භාෂා 6කින් පුද්ගලික දුරකථන සේවාව.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "DISH Order සහ Gastro Master දෙදෙනාම කොමිස් නොමැතිව ස්ථාවර මිල ප්‍රචාරණය කරයි — වෙනස කොහෙද?", answer: "හරි — ප්‍රදායකයන් දෙදෙනාම ඇණවුම් මත කොමිස් නොමැතිව ක්‍රියා කරයි. DISH එය නිල METRO මාධ්‍ය නිවේදනයේ තහවුරු කරයි: \"සෑම ඇණවුමක් සමඟම සිදුවන කොමිස් ගෙවීම් වෙනුවට, ආපනශාලා හිමිකරුවන් ස්ථාවර මිලක් ගෙවයි.\" Gastro Master ද කොමිස් නොමැතිව ක්‍රියා කරයි. වෙනස මසකට අගය මත ය: DISH සමඟ ඔබ ආයතනික තොගයකින් මොඩියුල ලබා ගනී. Gastro Master සමඟ තමන්ගේම ඩොමේනය යටතේ තමන්ගේම app සන්නාමය, ස්වයංක්‍රීය වේදිකා ඒකාබද්ධතාව, මොඩියුලර් add-on සහ භාෂා 6කින් පුද්ගලික දුරකථන සේවාව සහිත සම්බන්ධිත පරිසර පද්ධතියක්.", source: METRO_PRESS_DISH_ORDER, sourceDate: SOURCE_DATE },
    { question: "මගේ ආපනශාලාවට කවුද හොඳ — DISH Order හෝ Gastro Master?", answer: "අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු. Gastro Master ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා සාදා ඇත. ඔබේ ව්‍යාපාරය ගැලපේ නම්, අපි නියම තේරීම වේ. DISH Order ජාත්‍යන්තර තොග පළල සහිත තොග කණ්ඩායමක කොටසකි — එය ඔබේ අවශ්‍යතාවය නම්, වගුවේ කරුණු ස්වාධීනව තීරණය කිරීමට උදව් කරයි." },
    { question: "DISH METRO AG හි 100% අනුබද්ධිතයක් වීමේ අර්ථය කුමක්ද?", answer: "METRO AG යනු ~31 බිලියන € ආදායමක් සහිත සහ ගෝලීය වශයෙන් ~17 මිලියන ආපනශාලා/සත්කාරක ගනුදෙනුකරුවන් තොග හවුල්කරුවන් ලෙස සිටින කොටස් වෙළඳපොළේ ලැයිස්තු ගත තොග කණ්ඩායමකි. DISH Order එම කණ්ඩායමේ ඩිජිටල් අනුබද්ධිතයකි. ප්‍රායෝගිකව: ඔබ එකම අවස්ථාවේදී METRO තොග ගනුදෙනුකරුවෙකු සහ DISH tech ගනුදෙනුකරුවෙකු වුවහොත්, ඔබේ සැපයුම්කරු සහ tech හවුල්කරු එකම කණ්ඩායමෙන් එයි. Gastro Master සමඟ මේවා වෙනස් සමාගම් දෙකකි — ඔබ තේරීම තබා ගනී.", source: METRO_GLOSSARY, sourceDate: SOURCE_DATE },
    { question: "DISH සමඟ මගේ ආපනශාලාවට වෙනම app එකක් ලැබේද?", answer: "DISH වෙබ් අඩවි සාදන්නා (DISH Website) ඉදිරිපත් කරයි, නමුත් ඔබේ සන්නාමකරණය යටතේ ආපනශාලාවට කැප කළ ස්වදේශීය app පැකේජයක් නැත. Gastro Master සමඟ App පැකේජයේ (මසකට 149 € සිට) ඔබට තමන්ගේම ඩොමේනයක් සහ ඔබේ ආපනශාලාවේ නම යටතේ ස්වදේශීය iOS/Android app ලැබේ — ඔබේ සාමාන්‍ය ගනුදෙනුකරුවන් ඔබේ app විවෘත කරයි, ප්‍රදායකයෙකුගේ නොවේ.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "මම දැනටමත් DISH Order ගනුදෙනුකරුවෙක් — ගිවිසුම අවසන් වීමට පෙර මාරු විය හැකිද?", answer: "අපි ඔබේ වර්තමාන ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කර මාරුවක් යනු කුමක්ද — පිරිවැය, කාල සටහන, දත්ත සංක්‍රමණය — යන්න සංයුතව ගණනය කරමු. ඔබ මාරු නොවීමට තීරණය කළත්, ලිඛිත සන්සන්දනයක් ලබා ගනී." },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ මෘදුකාංග පැකේජ මත මාස 3 අවසන් කිරීමේ දැන්වීම — add-on මාසිකව අවලංගු කළ හැකි" },
    { claimRef: "D2 / G2", text: "✅ කෙළින්ම ඇණවුම් මත 0% කොමිස් — ස්ථාවර, සැලසුම් කළ හැකි මාසික මිල" },
    { claimRef: "E-Reihe", text: "✅ පැකේජ 4ක් + මොඩියුලර් add-on 6ක් + Lieferando/Wolt/Uber Eats ඒකාබද්ධතා — සියල්ල එක් අතකින්" },
    { claimRef: "H1", text: "✅ මාරු පිරිනැමීම 50%: ඔබේ පවතින ගිවිසුම තවමත් ගෙවමින් සිටින තාක්, ඔබට සාමාන්‍ය මාසික මිලෙන් 50%කට Gastro Master ලැබේ", pending: true, softFallback: "✅ පුද්ගලික මාරු කොන්දේසි — අපි ඔබේ පවතින ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කරමු" },
  ],
  cta: { primaryText: "නොමිලේ උපදෙස්", primaryHref: "/kontakt", secondaryText: "මිල ගණන් එක නෙතින්", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master යනු පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා කොමිස් රහිත ඇණවුම් පද්ධති විසඳුමයි — එක් අතකින් පැකේජ 4ක් සහ මොඩියුලර් add-on 6ක් සමඟ.",
    "හුදකලා මොඩියුල තොග මෙන් නොව, Gastro Master වෙබ් අඩවිය, ඇණවුම් පද්ධතිය, App පැකේජය සහ POS වලින් සමන්විත සම්බන්ධිත පරිසර පද්ධතියක් ඉදිරිපත් කරයි — සහ Lieferando, Wolt සහ Uber Eats සමඟ ස්වයංක්‍රීය වේදිකා ඒකාබද්ධතාව.",
    "Gastro Master සමඟ සෑම ආපනශාලාවකටම තමන්ගේම ඩොමේනයක් සහ තමන්ගේම සන්නාමය යටතේ ස්වදේශීය iOS/Android app එකක් ලැබේ — whitelabel විසඳුමක් නැත.",
    "DISH Order සහ Gastro Master දෙදෙනාම කෙළින්ම ඇණවුම් මත කොමිස් රහිතව ස්ථාවර මිල සමඟ ක්‍රියා කරයි — වෙනස පරිසර පද්ධති පළල සහ භාෂා 6කින් පුද්ගලික සේවාව මත ය.",
    "ජර්මනියේ, ඔස්ට්‍රියාවේ සහ ස්විට්සර්ලන්තයේ ආපනශාලා 800+ ක් ආයතනික තොගවලට අයිතිකරු මෙහෙයවන විකල්පයක් ලෙස Gastro Master භාවිත කරයි.",
  ],
  meta: { title: "Gastro Master එදිරිව DISH Order — මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව | Gastro Master", description: "Gastro Master සහ DISH Order හි කරුණු සසඳීම: පරිසර පද්ධති පළල (පැකේජ + add-on + වේදිකා ඒකාබද්ධතා), අයිතිකාර ව්‍යුහය (අයිතිකරු මෙහෙයවන එදිරිව METRO අනුබද්ධිතය), සේවා ආකෘතිය. මූලාශ්‍ර URL සමඟ.", dateModified: SOURCE_DATE },
};

// ─── Registry ───────────────────────────────────────────────────────────────
export const dishOrderByLang: ComparisonByLang = {
  de: DE,
  en: EN,
  it: IT,
  fa: FA,
  si: SI,
  ru: RU,
};

export const dishOrderComparison = DE;
