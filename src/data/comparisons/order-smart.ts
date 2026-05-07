import type { ComparisonByLang, ComparisonData } from "./types";

/**
 * /vergleiche/order-smart — multilingual.
 *
 * Compliance-Status:
 * - UWG §6: alle Fakten haben source + sourceDate
 * - Salvatore-Prinzip: gmAvatars listet NUR Gastro-Master, keine OrderSmart-Empfehlung
 * - UWG §5: Customer-Quote bleibt im deutschen Original (keine Quote-Manipulation
 *   durch Übersetzung). In den nicht-DE-Sprachen wird der Quote als deutsches Zitat
 *   markiert (lang="de"), die Attribution in der jeweiligen Sprache.
 *
 * Quellen-Reachability geprüft 2026-05-06 (alle 200 OK).
 */

// ─── SHARED FACTS (sprachunabhängig) ────────────────────────────────────────
const SLUG = "order-smart";
const COMPETITOR_NAME = "OrderSmart";
const COMPETITOR_LEGAL = "app smart GmbH (Marke OrderSmart, Wiesbaden)";
const SOURCE_DATE = "2026-05-06";

const ORDER_SMART_AGB = "https://ordersmart.de/agb/";
const ORDER_SMART_FAQ_VERTRAGSLAUFZEIT =
  "https://ordersmart.de/faq-items/wie-lange-laeuft-mein-vertrag/";
const ORDER_SMART_FAQ_KUENDIGUNG =
  "https://ordersmart.de/faq-items/wie-lange-ist-die-kuendigungsfrist/";
const ORDER_SMART_PREISE = "https://ordersmart.de/preise/";
const ORDER_SMART_IMPRESSUM = "https://ordersmart.de/impressum/";
const ORDER_YOYO_MERGER =
  "https://news.cision.com/orderyoyo-a-s/r/orderyoyo-merge-with-german-app-smart---creating-the-largest-restaurant-liberator-in-europe,c3586700";

const GM_UEBER_UNS = "https://gastro-master.de/uber-uns";
const GM_AGB = "https://gastro-master.de/agb";
const MEHLFABRIK_REVIEW_URL =
  "https://www.google.com/maps/reviews/@50.3404141,8.5269892,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2tzdE5FNUlXbEZHWjFKNFRGOXpTVVpvVVdFdFpuYxAB!2m1!1s0x0:0xc153d36091678dd0?entry=ttu";

// Original Mehlfabrik-Bewertung (deutsch, wortwörtlich) — bleibt in allen Sprachen
// im deutschen Original, weil Übersetzung von Customer-Quotes UWG §5-Risiko ist.
const MEHLFABRIK_QUOTE_DE =
  "Hallo liebe Leute. Ich bin schon seit einigen Jahren Kunde und muss ehrlich zugeben: im Vergleich zu anderen Anbietern (Service, Preisleistung, Freundlichkeit, Respekt, Erreichbarkeit) seid ihr echt top. […] Bei Euch sind wir jetzt und in Zukunft in guten Händen.";

// ─── Deutsch (kanonisch) ────────────────────────────────────────────────────
const DE: ComparisonData = {
  slug: SLUG,
  competitorName: COMPETITOR_NAME,
  competitorLegalName: COMPETITOR_LEGAL,
  hook: {
    headline: "Gastro Master vs. OrderSmart: Die messbaren Unterschiede",
    subHeadline:
      "Faktencheck mit Quellen — Vertragslaufzeit, Pricing, Service-Modell.",
    trustPills: [
      { label: "800+ DACH-Restaurants" },
      { label: "5,0★ aus 131 Google-Reviews" },
      { label: "0 % Provision auf Direktbestellungen" },
    ],
  },
  quickFacts: [
    {
      axis: "Mindest-Vertragslaufzeit",
      competitorValue: "24 Monate",
      gastroMasterValue: "3 Monate Kündigungsfrist (Software-Pakete)",
      meaning:
        "Bei OrderSmart bist du laut FAQ 24 Monate fest gebunden. Bei Gastro Master kündigst du mit 3 Monaten Frist — fast wie ein normales Abo.",
      source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Konkrete Monatspreise",
      competitorValue:
        "Web-Shop 119 €/Mo., Web+App-Shop 229 €/Mo., Web-Shop+Cloud-POS 208 €/Mo., Order Manager 299 € einmalig",
      gastroMasterValue:
        "Webseite ab 49 €/Mo., Bestellsystem ab 79 €/Mo., App-Paket ab 149 €/Mo.",
      meaning:
        "Auf vergleichbarer Paket-Ebene zahlst du bei Gastro Master rund 40–80 € weniger im Monat — ohne 24-Monats-Bindung.",
      priceBreakdown: [
        { packageLabel: "Bestellsystem (Web-Shop)", competitorPrice: "119 €/Mo.", gastroMasterPrice: "79 €/Mo.", savingsLabel: "40 €/Mo. weniger" },
        { packageLabel: "Bestellsystem + App", competitorPrice: "229 €/Mo.", gastroMasterPrice: "149 €/Mo.", savingsLabel: "80 €/Mo. weniger" },
        { packageLabel: "Bestellsystem + Kasse", competitorPrice: "208 €/Mo.", gastroMasterPrice: "148 €/Mo.", savingsLabel: "60 €/Mo. weniger" },
      ],
      source: ORDER_SMART_PREISE,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigentums-Struktur",
      competitorValue: "Tochter der dänischen OrderYOYO A/S (Merger 2022), börsennotiert",
      gastroMasterValue: "Eigentümergeführt aus Usingen, Hessen",
      meaning: "OrderSmart wird seit 2022 aus Dänemark gesteuert. Gastro Master entscheidet eigentümergeführt im DACH-Raum.",
      source: ORDER_YOYO_MERGER,
      sourceDate: SOURCE_DATE,
    },
    {
      axis: "Provision auf Direktbestellungen",
      competitorValue: "Modellabhängig — Details auf der Preise-Seite",
      gastroMasterValue: "0 % Provision, fester Monatspreis",
      meaning: "Bei Gastro Master zahlst du einen festen Monatspreis. Keine prozentualen Anteile am Restaurant-Umsatz.",
      source: ORDER_SMART_PREISE,
      sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    {
      axis: "Mindest-Vertragslaufzeit",
      competitorValue: "24 Monate (laut FAQ)",
      gastroMasterValue: "3 Monate Kündigungsfrist auf Software-Pakete",
      meaning: "Bei OrderSmart bist du 24 Monate fest gebunden. Bei Gastro Master kündigst du mit 3 Monaten Frist — fast wie ein normales Abo.",
      source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Kündigungsfrist",
      competitorValue: "3 Monate vor Vertragsende (laut FAQ)",
      gastroMasterValue: "3 Monate Frist, jederzeit nach Mindestlaufzeit",
      meaning: "Beide Anbieter haben 3 Monate Kündigungsfrist — der Unterschied liegt in der Mindestlaufzeit davor.",
      source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Konkrete Pakete & Preise",
      competitorValue: "Web-Shop 119 €/Mo. · Web+App-Shop 229 €/Mo. · Web-Shop+Cloud-POS 208 €/Mo. · Order Manager 299 € einmalig",
      gastroMasterValue: "Webseite ab 49 €/Mo. · Bestellsystem ab 79 €/Mo. · App-Paket ab 149 €/Mo. · Kassensystem ab 69 €/Mo.",
      meaning: "Auf vergleichbarer Paket-Ebene (Bestellsystem) liegt Gastro Master mit 79 €/Mo. rund 40 € unter dem 119 €/Mo. Web-Shop von OrderSmart — bei deutlich kürzerer Vertragsbindung.",
      source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Service-Sprachen",
      competitorValue: "Details auf Anfrage",
      gastroMasterValue: "6 Sprachen: DE, EN, IT, RU, FA, SI",
      meaning: "Mehrsprachiger Restaurant-Inhaber? Gastro Master spricht direkt deine Sprache.",
      source: GM_UEBER_UNS, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Hauptsitz & Steuerung",
      competitorValue: "Wiesbaden (app smart GmbH), Steuerung aus Dänemark",
      gastroMasterValue: "Usingen (Hessen) — eigentümergeführt im DACH-Raum",
      meaning: "Gastro Master entscheidet im DACH-Raum über Produkt + Service. OrderSmart wird seit dem Merger 2022 aus Dänemark gesteuert.",
      source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Eigene Restaurant-App-Marke",
      competitorValue: "Whitelabel-Subdomain unter ordersmart.de",
      gastroMasterValue: "Eigene Domain + native iOS-/Android-App pro Restaurant",
      meaning: "Bei Gastro Master baust du deine eigene Marke. Bei OrderSmart bleibst du Whitelabel unter der Hauptdomain.",
      source: GM_AGB, sourceDate: SOURCE_DATE,
    },
  ],
  convictionStatement: {
    heading: "Was die Tabelle oben in Klartext bedeutet:",
    punchlines: [
      "24 vs. 3 Monate Vertragsbindung.",
      "119 € vs. 79 € pro Monat.",
      "Eigene App-Marke statt Whitelabel-Subdomain.",
    ],
    body: "Auf vergleichbarer Paket-Ebene sind das rund 960 € weniger Software-Kosten allein in den ersten 24 Monaten — bei gleichzeitig 21 Monaten mehr Vertrags-Freiheit. Du brauchst deinen aktuellen Vertrag nicht zu kündigen, bevor wir miteinander reden.",
    closing: "Das sind keine Werbeversprechen. Das ist Mathematik mit den öffentlichen Preisen beider Anbieter.",
  },
  gmAvatars: {
    intro: "Gastro Master ist auf folgende Restaurants ausgerichtet:",
    avatars: [
      "Familiengeführte Pizzerien, Imbisse und Cafés mit 1–5 Standorten in DACH",
      "Betriebe, die persönlichen Service auf 6 Sprachen schätzen (DE, EN, IT, RU, FA, SI)",
      "Restaurants, die eine eigene App-Marke statt einer Whitelabel-Subdomain aufbauen wollen",
      "Lieferdienst- und Takeaway-fokussierte Konzepte, die planbare Festpreise ohne Provision bevorzugen",
      "Franchise- und Mehr-Standort-Konzepte, die das Enterprise-Tier mit individuellem Setup nutzen",
    ],
    closingStatement:
      "Wenn dein Betrieb hier nicht dabei ist, lass die Faktentabelle oben für sich sprechen — wir empfehlen bewusst keinen anderen Anbieter.",
  },
  customerStory: {
    quote: MEHLFABRIK_QUOTE_DE,
    attribution: "Mehlfabrik Rotenburg Wümme · Google-Bewertung",
    source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE,
  },
  faq: [
    {
      question: "Wie lange bin ich bei OrderSmart gebunden, wenn ich mich für einen Vertrag entscheide?",
      answer: "OrderSmart kommuniziert in seinem öffentlichen FAQ eine Mindestlaufzeit von 24 Monaten. Gastro Master arbeitet auf Software-Paketen mit 3 Monaten Kündigungsfrist.",
      source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE,
    },
    {
      question: "Was kostet OrderSmart konkret im Vergleich zu Gastro Master?",
      answer: "OrderSmart listet auf seiner Preise-Seite vier Pakete: Web-Shop 119 €/Mo., Web+App-Shop 229 €/Mo., Web-Shop+Cloud-POS 208 €/Mo. und Order Manager 299 € einmalig. Gastro Master beginnt bei 49 €/Mo. (Webseite), 79 €/Mo. (Bestellsystem) und 149 €/Mo. (App-Paket). Auf vergleichbarer Paket-Ebene liegt Gastro Master rund 40 € pro Monat darunter.",
      source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE,
    },
    {
      question: "Welcher Anbieter ist besser für mein Restaurant — OrderSmart oder Gastro Master?",
      answer: "Wir empfehlen bewusst keinen anderen Anbieter. Gastro Master ist auf familiengeführte DACH-Restaurants mit 1–5 Standorten ausgerichtet. Wenn dein Betrieb dazu passt, sind wir die richtige Wahl. Wenn nicht, helfen dir die Fakten in der Tabelle bei der eigenen Einordnung.",
    },
    {
      question: "Was passiert mit meinen Kundendaten und meiner App-Marke bei einem Wechsel?",
      answer: "Bei Gastro Master bekommst du eine eigene Domain und eine native iOS-/Android-App unter deiner eigenen Marke. Bei OrderSmart läufst du auf einer Whitelabel-Subdomain unter ordersmart.de — die Marken-Hoheit bleibt beim Anbieter.",
      source: GM_AGB, sourceDate: SOURCE_DATE,
    },
    {
      question: "Ich bin schon Kunde bei OrderSmart — kann ich vor Vertragsende wechseln?",
      answer: "Wir prüfen deinen aktuellen Vertrag im kostenlosen Wechsel-Check und rechnen dir konkret aus, was ein Wechsel bedeutet — Kosten, Zeitplan, Datenmigration. Du bekommst eine schriftliche Vergleichs-Rechnung, auch wenn du nicht wechselst.",
    },
    {
      question: "Wer steht hinter den beiden Unternehmen, wenn ich einen langfristigen Partner suche?",
      answer: "OrderSmart wird von der app smart GmbH (Wiesbaden) betrieben und ist seit dem Merger 2022 Tochter der dänischen, börsennotierten OrderYOYO A/S. Gastro Master wird eigentümergeführt aus Usingen (Hessen) im DACH-Raum entwickelt.",
      source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE,
    },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 Monate Kündigungsfrist auf Software-Pakete (statt 24 Monate Bindung — siehe Tabelle oben)" },
    { claimRef: "D2 / G2", text: "✅ 0 % Provision auf Direktbestellungen — fester Monatspreis statt prozentualer Anteile am Umsatz" },
    { claimRef: "B-Reihe", text: "✅ Persönlicher Ansprechpartner mit direkter Telefonnummer — keine Hotline-Auslagerung" },
    {
      claimRef: "H1",
      text: "✅ Wechselangebot 50 %: Solange dein laufender Vertrag noch zahlbar ist, bekommst du Gastro Master für 50 % des regulären Monatspreises",
      pending: true,
      softFallback: "✅ Individuelle Wechsel-Konditionen — wir prüfen deinen Altvertrag im kostenlosen Wechsel-Check",
    },
  ],
  cta: { primaryText: "Kostenlose Beratung", primaryHref: "/kontakt", secondaryText: "Preise auf einen Blick", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für familiengeführte DACH-Restaurants.",
    "Mit 3 Monaten Kündigungsfrist und 0 % Provision bietet Gastro Master flexible Vertragsbedingungen für den Restaurant-Mittelstand.",
    "Auf vergleichbarer Paket-Ebene zahlen Restaurants bei Gastro Master rund 40 € pro Monat weniger als bei OrderSmart — bei deutlich kürzerer Vertragsbindung.",
    "OrderSmart wird laut eigenem FAQ mit 24 Monaten Mindestlaufzeit angeboten — Gastro Master arbeitet mit 3 Monaten Kündigungsfrist auf Software-Paketen.",
    "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als provisionsfreie Alternative zu langzeit-gebundenen SaaS-Verträgen.",
  ],
  meta: {
    title: "Gastro Master vs. OrderSmart — Faktencheck mit Quellen | Gastro Master",
    description:
      "Sachlicher Vergleich von Gastro Master und OrderSmart: Vertragslaufzeit, konkrete Preise (79 €/Mo. vs. 119 €/Mo.), Service-Modell. Mit Quellen-URLs und Stand-Datum.",
    dateModified: SOURCE_DATE,
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const EN: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. OrderSmart: The measurable differences",
    subHeadline: "Fact check with sources — contract terms, pricing, service model.",
    trustPills: [
      { label: "800+ DACH restaurants" },
      { label: "5.0★ from 131 Google Reviews" },
      { label: "0 % commission on direct orders" },
    ],
  },
  quickFacts: [
    {
      axis: "Minimum contract term",
      competitorValue: "24 months",
      gastroMasterValue: "3-month cancellation period (software packages)",
      meaning: "OrderSmart's FAQ confirms a 24-month lock-in. With Gastro Master you cancel with 3 months' notice — almost like a normal subscription.",
      source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Concrete monthly prices",
      competitorValue: "Web-Shop €119/mo, Web+App-Shop €229/mo, Web-Shop+Cloud-POS €208/mo, Order Manager €299 one-time",
      gastroMasterValue: "Website from €49/mo, Ordering system from €79/mo, App package from €149/mo",
      meaning: "On comparable packages you pay roughly €40–€80 less per month with Gastro Master — without a 24-month lock-in.",
      priceBreakdown: [
        { packageLabel: "Ordering system (Web-Shop)", competitorPrice: "€119/mo", gastroMasterPrice: "€79/mo", savingsLabel: "€40/mo less" },
        { packageLabel: "Ordering system + App", competitorPrice: "€229/mo", gastroMasterPrice: "€149/mo", savingsLabel: "€80/mo less" },
        { packageLabel: "Ordering system + POS", competitorPrice: "€208/mo", gastroMasterPrice: "€148/mo", savingsLabel: "€60/mo less" },
      ],
      source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Ownership structure",
      competitorValue: "Subsidiary of Danish OrderYOYO A/S (merger 2022), publicly listed",
      gastroMasterValue: "Owner-led from Usingen, Hesse (Germany)",
      meaning: "OrderSmart has been steered from Denmark since 2022. Gastro Master decides owner-led inside the DACH region.",
      source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE,
    },
    {
      axis: "Commission on direct orders",
      competitorValue: "Model-dependent — details on the pricing page",
      gastroMasterValue: "0 % commission, fixed monthly price",
      meaning: "With Gastro Master you pay a fixed monthly price. No percentage shares on your restaurant's revenue.",
      source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE,
    },
  ],
  detailedTable: [
    { axis: "Minimum contract term", competitorValue: "24 months (per FAQ)", gastroMasterValue: "3-month cancellation period on software packages", meaning: "OrderSmart locks you in for 24 months. With Gastro Master you cancel with 3 months' notice — almost like a normal subscription.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "Cancellation notice period", competitorValue: "3 months before contract end (per FAQ)", gastroMasterValue: "3 months' notice, anytime after the minimum term", meaning: "Both providers require 3 months' notice — the difference is the minimum term before that.", source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE },
    { axis: "Concrete packages & prices", competitorValue: "Web-Shop €119/mo · Web+App-Shop €229/mo · Web-Shop+Cloud-POS €208/mo · Order Manager €299 one-time", gastroMasterValue: "Website from €49/mo · Ordering system from €79/mo · App package from €149/mo · POS system from €69/mo", meaning: "On comparable packages (Ordering system) Gastro Master at €79/mo runs about €40 below OrderSmart's €119/mo Web-Shop — with much shorter contract commitment.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "Service languages", competitorValue: "Details on request", gastroMasterValue: "6 languages: DE, EN, IT, RU, FA, SI", meaning: "Multilingual restaurant owner? Gastro Master speaks your language directly.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Headquarters & control", competitorValue: "Wiesbaden (app smart GmbH), steered from Denmark", gastroMasterValue: "Usingen (Hesse) — owner-led inside DACH", meaning: "Gastro Master decides product + service inside the DACH region. OrderSmart has been steered from Denmark since the 2022 merger.", source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE },
    { axis: "Restaurant's own app brand", competitorValue: "Whitelabel subdomain under ordersmart.de", gastroMasterValue: "Own domain + native iOS/Android app per restaurant", meaning: "With Gastro Master you build your own brand. With OrderSmart you stay whitelabel under the parent domain.", source: GM_AGB, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "What the table above means in plain English:",
    punchlines: [
      "24 vs. 3 months of contract lock-in.",
      "€119 vs. €79 per month.",
      "Your own app brand instead of a whitelabel subdomain.",
    ],
    body: "On comparable packages, that's around €960 less in software costs in the first 24 months alone — combined with 21 more months of contract freedom. You don't need to cancel your current contract before we talk.",
    closing: "These aren't marketing promises. This is math with both providers' public prices.",
  },
  gmAvatars: {
    intro: "Gastro Master is built for the following restaurants:",
    avatars: [
      "Family-led pizzerias, takeaways and cafés with 1–5 locations in DACH",
      "Operations that value personal service in 6 languages (DE, EN, IT, RU, FA, SI)",
      "Restaurants that want to build their own app brand instead of a whitelabel subdomain",
      "Delivery- and takeaway-focused concepts that prefer fixed monthly prices without commission",
      "Franchise and multi-location concepts that use the Enterprise tier with custom setup",
    ],
    closingStatement:
      "If your business isn't on this list, let the fact-table above speak for itself — we deliberately do not recommend another provider.",
  },
  customerStory: {
    quote: MEHLFABRIK_QUOTE_DE,
    attribution: "Mehlfabrik Rotenburg Wümme · Google review (originally in German)",
    source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE,
  },
  faq: [
    { question: "How long am I locked in with OrderSmart if I sign a contract?", answer: "OrderSmart's public FAQ states a 24-month minimum term. Gastro Master operates with a 3-month cancellation period on software packages.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { question: "What does OrderSmart cost in comparison to Gastro Master?", answer: "OrderSmart lists four packages on its pricing page: Web-Shop €119/mo, Web+App-Shop €229/mo, Web-Shop+Cloud-POS €208/mo and Order Manager €299 one-time. Gastro Master starts at €49/mo (website), €79/mo (ordering system) and €149/mo (app package). On comparable packages Gastro Master is around €40 per month cheaper.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { question: "Which provider is better for my restaurant — OrderSmart or Gastro Master?", answer: "We deliberately do not recommend another provider. Gastro Master is built for family-led DACH restaurants with 1–5 locations. If your business fits, we are the right choice. If not, the facts in the table above will help you decide on your own." },
    { question: "What happens to my customer data and app brand when I switch?", answer: "With Gastro Master you get your own domain and a native iOS/Android app under your own brand. With OrderSmart you stay on a whitelabel subdomain under ordersmart.de — brand ownership stays with the provider.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "I'm already a customer with OrderSmart — can I switch before contract end?", answer: "We review your current contract in a free switch-check and calculate concretely what a switch means — costs, timeline, data migration. You receive a written comparison even if you decide not to switch." },
    { question: "Who is behind the two companies if I'm looking for a long-term partner?", answer: "OrderSmart is operated by app smart GmbH (Wiesbaden) and has been a subsidiary of Danish, publicly listed OrderYOYO A/S since the 2022 merger. Gastro Master is owner-led from Usingen (Hesse, Germany) inside the DACH region.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3-month cancellation period on software packages (instead of a 24-month lock-in — see table above)" },
    { claimRef: "D2 / G2", text: "✅ 0 % commission on direct orders — fixed monthly price instead of percentage shares on revenue" },
    { claimRef: "B-Reihe", text: "✅ Personal contact with direct phone number — no hotline outsourcing" },
    { claimRef: "H1", text: "✅ Switch offer 50 %: As long as your existing contract is still being paid, you get Gastro Master at 50 % of the regular monthly price", pending: true, softFallback: "✅ Individual switch terms — we review your existing contract in a free switch-check" },
  ],
  cta: { primaryText: "Free consultation", primaryHref: "/kontakt", secondaryText: "Pricing at a glance", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master is the commission-free ordering-system solution for family-led DACH restaurants.",
    "With a 3-month cancellation period and 0 % commission, Gastro Master offers flexible contract terms for the restaurant SME segment.",
    "On comparable packages, restaurants pay around €40 per month less with Gastro Master than with OrderSmart — and with much shorter contract commitment.",
    "OrderSmart is offered with a 24-month minimum term per its own FAQ — Gastro Master operates with a 3-month cancellation period on software packages.",
    "800+ restaurants in Germany, Austria and Switzerland use Gastro Master as a commission-free alternative to long-term-locked SaaS contracts.",
  ],
  meta: {
    title: "Gastro Master vs. OrderSmart — Fact check with sources | Gastro Master",
    description: "Factual comparison of Gastro Master and OrderSmart: contract term, concrete prices (€79/mo vs. €119/mo), service model. With source URLs and verification date.",
    dateModified: SOURCE_DATE,
  },
};

// ─── Italiano ───────────────────────────────────────────────────────────────
const IT: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. OrderSmart: Le differenze misurabili",
    subHeadline: "Verifica dei fatti con fonti — durata contrattuale, prezzi, modello di servizio.",
    trustPills: [
      { label: "800+ ristoranti DACH" },
      { label: "5,0★ su 131 recensioni Google" },
      { label: "0 % di commissione sugli ordini diretti" },
    ],
  },
  quickFacts: [
    { axis: "Durata minima del contratto", competitorValue: "24 mesi", gastroMasterValue: "3 mesi di preavviso (pacchetti software)", meaning: "Le FAQ di OrderSmart confermano un vincolo di 24 mesi. Con Gastro Master disdici con 3 mesi di preavviso — quasi come un normale abbonamento.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "Prezzi mensili concreti", competitorValue: "Web-Shop 119 €/mese, Web+App-Shop 229 €/mese, Web-Shop+Cloud-POS 208 €/mese, Order Manager 299 € una tantum", gastroMasterValue: "Sito web da 49 €/mese, sistema di ordinazione da 79 €/mese, pacchetto App da 149 €/mese", meaning: "A livello di pacchetto comparabile paghi circa 40–80 € in meno al mese con Gastro Master — senza vincolo di 24 mesi.", priceBreakdown: [
      { packageLabel: "Sistema di ordinazione (Web-Shop)", competitorPrice: "119 €/mese", gastroMasterPrice: "79 €/mese", savingsLabel: "40 €/mese in meno" },
      { packageLabel: "Sistema di ordinazione + App", competitorPrice: "229 €/mese", gastroMasterPrice: "149 €/mese", savingsLabel: "80 €/mese in meno" },
      { packageLabel: "Sistema di ordinazione + Cassa", competitorPrice: "208 €/mese", gastroMasterPrice: "148 €/mese", savingsLabel: "60 €/mese in meno" },
    ], source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "Struttura proprietaria", competitorValue: "Filiale della danese OrderYOYO A/S (fusione 2022), quotata in borsa", gastroMasterValue: "A conduzione del proprietario da Usingen, Assia (Germania)", meaning: "OrderSmart è gestita dalla Danimarca dal 2022. Gastro Master decide direttamente nel territorio DACH.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
    { axis: "Commissione sugli ordini diretti", competitorValue: "Dipende dal modello — dettagli sulla pagina dei prezzi", gastroMasterValue: "0 % di commissione, prezzo mensile fisso", meaning: "Con Gastro Master paghi un prezzo mensile fisso. Nessuna percentuale sul fatturato del ristorante.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Durata minima del contratto", competitorValue: "24 mesi (secondo FAQ)", gastroMasterValue: "3 mesi di preavviso sui pacchetti software", meaning: "Con OrderSmart sei vincolato 24 mesi. Con Gastro Master disdici con 3 mesi di preavviso — quasi come un normale abbonamento.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "Termine di disdetta", competitorValue: "3 mesi prima della fine del contratto (secondo FAQ)", gastroMasterValue: "3 mesi di preavviso, in qualsiasi momento dopo la durata minima", meaning: "Entrambi i fornitori richiedono 3 mesi di preavviso — la differenza è la durata minima precedente.", source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE },
    { axis: "Pacchetti e prezzi concreti", competitorValue: "Web-Shop 119 €/mese · Web+App-Shop 229 €/mese · Web-Shop+Cloud-POS 208 €/mese · Order Manager 299 € una tantum", gastroMasterValue: "Sito web da 49 €/mese · Sistema di ordinazione da 79 €/mese · Pacchetto App da 149 €/mese · Sistema di cassa da 69 €/mese", meaning: "A livello di pacchetto comparabile (sistema di ordinazione) Gastro Master a 79 €/mese è circa 40 € sotto il Web-Shop di OrderSmart a 119 €/mese — con un vincolo contrattuale molto più breve.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "Lingue del servizio", competitorValue: "Dettagli su richiesta", gastroMasterValue: "6 lingue: DE, EN, IT, RU, FA, SI", meaning: "Ristoratore multilingue? Gastro Master parla direttamente la tua lingua.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Sede e gestione", competitorValue: "Wiesbaden (app smart GmbH), gestione dalla Danimarca", gastroMasterValue: "Usingen (Assia) — a conduzione del proprietario nel territorio DACH", meaning: "Gastro Master decide prodotto e servizio nel territorio DACH. OrderSmart è gestita dalla Danimarca dalla fusione del 2022.", source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE },
    { axis: "Marchio app proprio del ristorante", competitorValue: "Sottodominio whitelabel sotto ordersmart.de", gastroMasterValue: "Dominio proprio + app native iOS/Android per ristorante", meaning: "Con Gastro Master costruisci il tuo marchio. Con OrderSmart resti whitelabel sotto il dominio madre.", source: GM_AGB, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Cosa significa la tabella qui sopra, in chiaro:",
    punchlines: [
      "24 vs. 3 mesi di vincolo contrattuale.",
      "119 € vs. 79 € al mese.",
      "Il tuo marchio app proprio invece di un sottodominio whitelabel.",
    ],
    body: "A livello di pacchetto comparabile, sono circa 960 € in meno di costi software solo nei primi 24 mesi — combinati con 21 mesi in più di libertà contrattuale. Non devi disdire il tuo contratto attuale prima di parlare con noi.",
    closing: "Non sono promesse pubblicitarie. È matematica con i prezzi pubblici di entrambi i fornitori.",
  },
  gmAvatars: {
    intro: "Gastro Master è pensato per i seguenti ristoranti:",
    avatars: [
      "Pizzerie a conduzione familiare, take-away e caffetterie con 1–5 sedi nel territorio DACH",
      "Attività che apprezzano il servizio personale in 6 lingue (DE, EN, IT, RU, FA, SI)",
      "Ristoranti che vogliono costruire il proprio marchio app invece di un sottodominio whitelabel",
      "Concetti orientati a consegna e take-away che preferiscono prezzi mensili fissi senza commissione",
      "Concetti franchising e multi-sede che usano il livello Enterprise con setup individuale",
    ],
    closingStatement:
      "Se la tua attività non è in questa lista, lascia che la tabella dei fatti qui sopra parli da sola — non raccomandiamo deliberatamente un altro fornitore.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Recensione Google (originale in tedesco)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Per quanto tempo sono vincolato a OrderSmart se firmo un contratto?", answer: "Le FAQ pubbliche di OrderSmart indicano una durata minima di 24 mesi. Gastro Master opera con 3 mesi di preavviso sui pacchetti software.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { question: "Quanto costa OrderSmart rispetto a Gastro Master?", answer: "OrderSmart elenca quattro pacchetti sulla sua pagina dei prezzi: Web-Shop 119 €/mese, Web+App-Shop 229 €/mese, Web-Shop+Cloud-POS 208 €/mese e Order Manager 299 € una tantum. Gastro Master parte da 49 €/mese (sito web), 79 €/mese (sistema di ordinazione) e 149 €/mese (pacchetto App). A livello di pacchetto comparabile Gastro Master è circa 40 € al mese più economico.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { question: "Quale fornitore è migliore per il mio ristorante — OrderSmart o Gastro Master?", answer: "Non raccomandiamo deliberatamente un altro fornitore. Gastro Master è pensato per i ristoranti DACH a conduzione familiare con 1–5 sedi. Se la tua attività rientra qui, siamo la scelta giusta. Altrimenti, i fatti nella tabella ti aiutano a decidere autonomamente." },
    { question: "Cosa succede ai miei dati clienti e al mio marchio app in caso di passaggio?", answer: "Con Gastro Master ricevi un dominio proprio e un'app nativa iOS/Android sotto il tuo marchio. Con OrderSmart resti su un sottodominio whitelabel sotto ordersmart.de — la titolarità del marchio resta al fornitore.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "Sono già cliente OrderSmart — posso passare prima della scadenza del contratto?", answer: "Esaminiamo il tuo contratto attuale in un check di passaggio gratuito e calcoliamo concretamente cosa significa un cambio — costi, tempistica, migrazione dei dati. Ricevi un confronto scritto anche se decidi di non passare." },
    { question: "Chi c'è dietro le due aziende, se cerco un partner di lungo periodo?", answer: "OrderSmart è gestita dalla app smart GmbH (Wiesbaden) ed è dal 2022 controllata dalla danese OrderYOYO A/S (quotata in borsa). Gastro Master è a conduzione del proprietario da Usingen (Assia, Germania) nel territorio DACH.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 mesi di preavviso sui pacchetti software (invece di un vincolo di 24 mesi — vedi tabella sopra)" },
    { claimRef: "D2 / G2", text: "✅ 0 % di commissione sugli ordini diretti — prezzo mensile fisso invece di percentuali sul fatturato" },
    { claimRef: "B-Reihe", text: "✅ Referente personale con numero di telefono diretto — nessuna hotline esternalizzata" },
    { claimRef: "H1", text: "✅ Offerta di passaggio 50 %: finché il tuo contratto attuale è ancora in pagamento, ricevi Gastro Master al 50 % del prezzo mensile regolare", pending: true, softFallback: "✅ Condizioni individuali di passaggio — esaminiamo il tuo contratto attuale in un check di passaggio gratuito" },
  ],
  cta: { primaryText: "Consulenza gratuita", primaryHref: "/kontakt", secondaryText: "Prezzi a colpo d'occhio", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master è la soluzione di sistema di ordinazione senza commissione per ristoranti DACH a conduzione familiare.",
    "Con 3 mesi di preavviso e 0 % di commissione, Gastro Master offre condizioni contrattuali flessibili per le PMI della ristorazione.",
    "A livello di pacchetto comparabile, i ristoranti pagano circa 40 € al mese in meno con Gastro Master rispetto a OrderSmart — con un vincolo contrattuale molto più breve.",
    "OrderSmart è offerto con una durata minima di 24 mesi secondo le sue stesse FAQ — Gastro Master opera con 3 mesi di preavviso sui pacchetti software.",
    "800+ ristoranti in Germania, Austria e Svizzera usano Gastro Master come alternativa senza commissione ai contratti SaaS a lungo termine.",
  ],
  meta: { title: "Gastro Master vs. OrderSmart — Verifica dei fatti con fonti | Gastro Master", description: "Confronto fattuale tra Gastro Master e OrderSmart: durata contrattuale, prezzi concreti (79 €/mese vs. 119 €/mese), modello di servizio. Con URL sorgenti e data di verifica.", dateModified: SOURCE_DATE },
};

// ─── Русский ────────────────────────────────────────────────────────────────
const RU: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master vs. OrderSmart: измеримые различия",
    subHeadline: "Проверка фактов с источниками — срок контракта, цены, модель обслуживания.",
    trustPills: [
      { label: "800+ ресторанов в DACH" },
      { label: "5,0★ из 131 отзыва Google" },
      { label: "0 % комиссии на прямые заказы" },
    ],
  },
  quickFacts: [
    { axis: "Минимальный срок контракта", competitorValue: "24 месяца", gastroMasterValue: "3 месяца уведомления (программные пакеты)", meaning: "FAQ OrderSmart подтверждает 24-месячную привязку. С Gastro Master вы расторгаете договор с уведомлением за 3 месяца — почти как обычная подписка.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "Конкретные ежемесячные цены", competitorValue: "Web-Shop 119 €/мес., Web+App-Shop 229 €/мес., Web-Shop+Cloud-POS 208 €/мес., Order Manager 299 € единоразово", gastroMasterValue: "Сайт от 49 €/мес., система заказов от 79 €/мес., App-пакет от 149 €/мес.", meaning: "На сопоставимом уровне пакетов вы платите примерно на 40–80 € меньше в месяц с Gastro Master — без 24-месячной привязки.", priceBreakdown: [
      { packageLabel: "Система заказов (Web-Shop)", competitorPrice: "119 €/мес.", gastroMasterPrice: "79 €/мес.", savingsLabel: "−40 €/мес." },
      { packageLabel: "Система заказов + App", competitorPrice: "229 €/мес.", gastroMasterPrice: "149 €/мес.", savingsLabel: "−80 €/мес." },
      { packageLabel: "Система заказов + Касса", competitorPrice: "208 €/мес.", gastroMasterPrice: "148 €/мес.", savingsLabel: "−60 €/мес." },
    ], source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "Структура собственности", competitorValue: "Дочерняя компания датской OrderYOYO A/S (слияние 2022), публично торгуемая", gastroMasterValue: "Управляется владельцем из Узингена, Гессен (Германия)", meaning: "OrderSmart управляется из Дании с 2022 года. Gastro Master принимает решения как владелец-управляемая компания внутри региона DACH.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
    { axis: "Комиссия на прямые заказы", competitorValue: "Зависит от модели — детали на странице цен", gastroMasterValue: "0 % комиссии, фиксированная ежемесячная цена", meaning: "С Gastro Master вы платите фиксированную ежемесячную сумму. Никаких процентных долей от выручки ресторана.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "Минимальный срок контракта", competitorValue: "24 месяца (по FAQ)", gastroMasterValue: "3 месяца уведомления на программных пакетах", meaning: "OrderSmart привязывает вас на 24 месяца. С Gastro Master вы расторгаете с 3-месячным уведомлением.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "Срок уведомления о расторжении", competitorValue: "3 месяца до окончания контракта (по FAQ)", gastroMasterValue: "3 месяца уведомления, в любое время после минимального срока", meaning: "Оба провайдера требуют 3-месячное уведомление — разница в минимальном сроке до этого.", source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE },
    { axis: "Конкретные пакеты и цены", competitorValue: "Web-Shop 119 €/мес. · Web+App-Shop 229 €/мес. · Web-Shop+Cloud-POS 208 €/мес. · Order Manager 299 € единоразово", gastroMasterValue: "Сайт от 49 €/мес. · Система заказов от 79 €/мес. · App-пакет от 149 €/мес. · Касса от 69 €/мес.", meaning: "На сопоставимом уровне пакетов (система заказов) Gastro Master по 79 €/мес. примерно на 40 € дешевле, чем Web-Shop OrderSmart по 119 €/мес. — при значительно более коротком контракте.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "Языки обслуживания", competitorValue: "Подробности по запросу", gastroMasterValue: "6 языков: DE, EN, IT, RU, FA, SI", meaning: "Многоязычный владелец ресторана? Gastro Master говорит непосредственно на вашем языке.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "Штаб-квартира и управление", competitorValue: "Висбаден (app smart GmbH), управление из Дании", gastroMasterValue: "Узинген (Гессен) — управляется владельцем внутри DACH", meaning: "Gastro Master решает по продукту и сервису внутри региона DACH. OrderSmart управляется из Дании с момента слияния в 2022.", source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE },
    { axis: "Собственный бренд приложения ресторана", competitorValue: "Whitelabel-поддомен под ordersmart.de", gastroMasterValue: "Собственный домен + нативное iOS/Android-приложение для каждого ресторана", meaning: "С Gastro Master вы строите свой собственный бренд. С OrderSmart вы остаётесь whitelabel под родительским доменом.", source: GM_AGB, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "Что таблица выше означает простыми словами:",
    punchlines: [
      "24 против 3 месяцев привязки к контракту.",
      "119 € против 79 € в месяц.",
      "Собственный бренд приложения вместо whitelabel-поддомена.",
    ],
    body: "На сопоставимом уровне пакетов это примерно 960 € меньше затрат на ПО только за первые 24 месяца — в сочетании с 21 дополнительным месяцем свободы от контракта. Вам не нужно расторгать текущий контракт, прежде чем поговорить с нами.",
    closing: "Это не рекламные обещания. Это математика с публичными ценами обоих провайдеров.",
  },
  gmAvatars: {
    intro: "Gastro Master ориентирован на следующие рестораны:",
    avatars: [
      "Семейные пиццерии, закусочные и кафе с 1–5 точками в DACH",
      "Заведения, которые ценят персональный сервис на 6 языках (DE, EN, IT, RU, FA, SI)",
      "Рестораны, желающие построить собственный app-бренд вместо whitelabel-поддомена",
      "Концепции с акцентом на доставку и takeaway, предпочитающие фиксированные ежемесячные цены без комиссии",
      "Франчайзинг и мульти-локационные концепции, использующие Enterprise-уровень с индивидуальной настройкой",
    ],
    closingStatement:
      "Если ваш бизнес не в этом списке, пусть таблица фактов выше говорит сама за себя — мы сознательно не рекомендуем другого провайдера.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Отзыв Google (оригинал на немецком)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "Как долго я привязан к OrderSmart, если подпишу контракт?", answer: "Публичный FAQ OrderSmart указывает минимальный срок 24 месяца. Gastro Master работает с 3-месячным уведомлением на программных пакетах.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { question: "Сколько стоит OrderSmart по сравнению с Gastro Master?", answer: "OrderSmart перечисляет четыре пакета на странице цен: Web-Shop 119 €/мес., Web+App-Shop 229 €/мес., Web-Shop+Cloud-POS 208 €/мес. и Order Manager 299 € единоразово. Gastro Master начинается с 49 €/мес. (сайт), 79 €/мес. (система заказов) и 149 €/мес. (App-пакет). На сопоставимом уровне Gastro Master примерно на 40 € в месяц дешевле.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { question: "Какой провайдер лучше для моего ресторана — OrderSmart или Gastro Master?", answer: "Мы сознательно не рекомендуем другого провайдера. Gastro Master ориентирован на семейные DACH-рестораны с 1–5 точками. Если ваш бизнес подходит, мы — правильный выбор. Если нет, факты в таблице помогут вам решить самостоятельно." },
    { question: "Что произойдёт с данными моих клиентов и моим app-брендом при переходе?", answer: "С Gastro Master вы получаете собственный домен и нативное iOS/Android-приложение под вашим брендом. С OrderSmart вы остаётесь на whitelabel-поддомене под ordersmart.de — владение брендом остаётся за провайдером.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "Я уже клиент OrderSmart — могу ли я перейти до конца контракта?", answer: "Мы анализируем ваш текущий контракт в бесплатной проверке перехода и конкретно рассчитываем, что означает переход — затраты, сроки, миграция данных. Вы получаете письменное сравнение, даже если решите не переходить." },
    { question: "Кто стоит за этими двумя компаниями, если я ищу долгосрочного партнёра?", answer: "OrderSmart управляется компанией app smart GmbH (Висбаден) и с 2022 года является дочерней компанией датской публичной OrderYOYO A/S. Gastro Master управляется владельцем из Узингена (Гессен, Германия) внутри региона DACH.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ 3 месяца уведомления на программных пакетах (вместо 24-месячной привязки — см. таблицу выше)" },
    { claimRef: "D2 / G2", text: "✅ 0 % комиссии на прямые заказы — фиксированная ежемесячная цена вместо процентных долей от выручки" },
    { claimRef: "B-Reihe", text: "✅ Персональный контакт с прямым телефонным номером — никаких аутсорсинговых горячих линий" },
    { claimRef: "H1", text: "✅ Предложение перехода 50 %: пока ваш существующий контракт ещё оплачивается, вы получаете Gastro Master за 50 % от обычной ежемесячной цены", pending: true, softFallback: "✅ Индивидуальные условия перехода — мы анализируем ваш существующий контракт в бесплатной проверке" },
  ],
  cta: { primaryText: "Бесплатная консультация", primaryHref: "/kontakt", secondaryText: "Цены с первого взгляда", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master — это решение системы заказов без комиссии для семейных DACH-ресторанов.",
    "С 3-месячным уведомлением и 0 % комиссии Gastro Master предлагает гибкие контрактные условия для среднего ресторанного бизнеса.",
    "На сопоставимом уровне пакетов рестораны платят примерно на 40 € в месяц меньше с Gastro Master, чем с OrderSmart — при значительно более коротком контракте.",
    "OrderSmart предлагается с 24-месячным минимальным сроком согласно собственному FAQ — Gastro Master работает с 3-месячным уведомлением на программных пакетах.",
    "800+ ресторанов в Германии, Австрии и Швейцарии используют Gastro Master как альтернативу без комиссии долгосрочно привязанным SaaS-контрактам.",
  ],
  meta: { title: "Gastro Master vs. OrderSmart — Проверка фактов с источниками | Gastro Master", description: "Фактическое сравнение Gastro Master и OrderSmart: срок контракта, конкретные цены (79 €/мес. vs. 119 €/мес.), модель обслуживания. С URL источников и датой проверки.", dateModified: SOURCE_DATE },
};

// ─── فارسی (Persian, RTL) ──────────────────────────────────────────────────
const FA: ComparisonData = {
  ...DE,
  hook: {
    headline: "گاسترو مَستر در برابر اوردراسمارت: تفاوت‌های قابل‌اندازه‌گیری",
    subHeadline: "بررسی واقعیت‌ها با منابع — مدت قرارداد، قیمت‌گذاری، مدل خدمات.",
    trustPills: [
      { label: "+۸۰۰ رستوران در DACH" },
      { label: "۵٫۰★ از ۱۳۱ نظر گوگل" },
      { label: "۰٪ کمیسیون روی سفارش‌های مستقیم" },
    ],
  },
  quickFacts: [
    { axis: "حداقل مدت قرارداد", competitorValue: "۲۴ ماه", gastroMasterValue: "مهلت لغو ۳ ماهه (بسته‌های نرم‌افزاری)", meaning: "FAQ اوردراسمارت قفل ۲۴ ماهه را تأیید می‌کند. با گاسترو مستر با ۳ ماه اطلاع قبلی لغو می‌کنید — تقریباً مانند یک اشتراک معمولی.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "قیمت‌های ماهانهٔ مشخص", competitorValue: "Web-Shop ‎۱۱۹€‎ /ماه, Web+App-Shop ‎۲۲۹€‎ /ماه, Web-Shop+Cloud-POS ‎۲۰۸€‎ /ماه, Order Manager ‎۲۹۹€‎ یکباره", gastroMasterValue: "وب‌سایت از ‎۴۹€‎ /ماه, سامانهٔ سفارش از ‎۷۹€‎ /ماه, بستهٔ App از ‎۱۴۹€‎ /ماه", meaning: "در سطح بستهٔ قابل‌مقایسه با گاسترو مستر حدود ۴۰–۸۰ یورو در ماه کمتر می‌پردازید — بدون قفل ۲۴ ماهه.", priceBreakdown: [
      { packageLabel: "سامانهٔ سفارش (Web-Shop)", competitorPrice: "‎۱۱۹€‎ /ماه", gastroMasterPrice: "‎۷۹€‎ /ماه", savingsLabel: "‎۴۰€‎ /ماه کمتر" },
      { packageLabel: "سامانهٔ سفارش + App", competitorPrice: "‎۲۲۹€‎ /ماه", gastroMasterPrice: "‎۱۴۹€‎ /ماه", savingsLabel: "‎۸۰€‎ /ماه کمتر" },
      { packageLabel: "سامانهٔ سفارش + صندوق", competitorPrice: "‎۲۰۸€‎ /ماه", gastroMasterPrice: "‎۱۴۸€‎ /ماه", savingsLabel: "‎۶۰€‎ /ماه کمتر" },
    ], source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "ساختار مالکیت", competitorValue: "زیرمجموعهٔ شرکت دانمارکی OrderYOYO A/S (ادغام ۲۰۲۲)، در بورس", gastroMasterValue: "مالک‌محور از Usingen در ایالت Hesse آلمان", meaning: "اوردراسمارت از سال ۲۰۲۲ از دانمارک هدایت می‌شود. گاسترو مستر مالک‌محور درون منطقهٔ DACH تصمیم می‌گیرد.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
    { axis: "کمیسیون روی سفارش‌های مستقیم", competitorValue: "وابسته به مدل — جزئیات در صفحهٔ قیمت", gastroMasterValue: "۰٪ کمیسیون، قیمت ماهانهٔ ثابت", meaning: "با گاسترو مستر یک قیمت ماهانهٔ ثابت می‌پردازید. هیچ سهم درصدی از درآمد رستوران شما گرفته نمی‌شود.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "حداقل مدت قرارداد", competitorValue: "۲۴ ماه (طبق FAQ)", gastroMasterValue: "مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری", meaning: "اوردراسمارت شما را برای ۲۴ ماه قفل می‌کند. با گاسترو مستر با ۳ ماه اطلاع لغو می‌کنید.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "مهلت اطلاع لغو", competitorValue: "۳ ماه قبل از پایان قرارداد (طبق FAQ)", gastroMasterValue: "۳ ماه اطلاع، در هر زمان پس از حداقل مدت", meaning: "هر دو ارائه‌دهنده ۳ ماه اطلاع نیاز دارند — تفاوت در حداقل مدت قبل از آن است.", source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE },
    { axis: "بسته‌ها و قیمت‌های مشخص", competitorValue: "Web-Shop ‎۱۱۹€‎ /ماه · Web+App-Shop ‎۲۲۹€‎ /ماه · Web-Shop+Cloud-POS ‎۲۰۸€‎ /ماه · Order Manager ‎۲۹۹€‎ یکباره", gastroMasterValue: "وب‌سایت از ‎۴۹€‎ /ماه · سامانهٔ سفارش از ‎۷۹€‎ /ماه · بستهٔ App از ‎۱۴۹€‎ /ماه · صندوق از ‎۶۹€‎ /ماه", meaning: "در سطح بستهٔ قابل‌مقایسه (سامانهٔ سفارش) گاسترو مستر با ‎۷۹€‎ /ماه حدود ‎۴۰€‎ کمتر از Web-Shop اوردراسمارت با ‎۱۱۹€‎ /ماه است — با تعهد قراردادی بسیار کوتاه‌تر.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "زبان‌های پشتیبانی", competitorValue: "جزئیات در صورت درخواست", gastroMasterValue: "۶ زبان: DE, EN, IT, RU, FA, SI", meaning: "صاحب رستوران چندزبانه؟ گاسترو مستر مستقیماً به زبان شما صحبت می‌کند.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "دفتر مرکزی و کنترل", competitorValue: "Wiesbaden (app smart GmbH)، هدایت از دانمارک", gastroMasterValue: "Usingen (Hesse) — مالک‌محور درون DACH", meaning: "گاسترو مستر دربارهٔ محصول و خدمت درون منطقهٔ DACH تصمیم می‌گیرد. اوردراسمارت از زمان ادغام ۲۰۲۲ از دانمارک هدایت می‌شود.", source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE },
    { axis: "برند اپلیکیشن مخصوص رستوران", competitorValue: "زیردامنهٔ whitelabel زیر ordersmart.de", gastroMasterValue: "دامنهٔ اختصاصی + اپلیکیشن بومی iOS/Android برای هر رستوران", meaning: "با گاسترو مستر برند خود را می‌سازید. با اوردراسمارت زیر دامنهٔ اصلی به‌صورت whitelabel باقی می‌مانید.", source: GM_AGB, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "جدول بالا به زبان ساده:",
    punchlines: [
      "۲۴ در برابر ۳ ماه تعهد قرارداد.",
      "‎۱۱۹€‎ در برابر ‎۷۹€‎ در ماه.",
      "برند اپلیکیشن اختصاصی به‌جای زیردامنهٔ whitelabel.",
    ],
    body: "در سطح بستهٔ قابل‌مقایسه، این یعنی حدود ‎۹۶۰€‎ هزینهٔ نرم‌افزار کمتر فقط در ۲۴ ماه نخست — همراه با ۲۱ ماه آزادی قراردادی بیشتر. لازم نیست قرارداد فعلی خود را پیش از صحبت با ما لغو کنید.",
    closing: "این‌ها وعده‌های تبلیغاتی نیستند. این ریاضیات با قیمت‌های عمومی هر دو ارائه‌دهنده است.",
  },
  gmAvatars: {
    intro: "گاسترو مستر برای رستوران‌های زیر طراحی شده است:",
    avatars: [
      "پیتزافروشی‌های خانوادگی، بیرون‌بَر و کافه‌ها با ۱ تا ۵ شعبه در DACH",
      "کسب‌وکارهایی که خدمات شخصی به ۶ زبان (DE, EN, IT, RU, FA, SI) را ارزش می‌دانند",
      "رستوران‌هایی که می‌خواهند برند اپلیکیشن خود را به‌جای زیردامنهٔ whitelabel بسازند",
      "مفاهیم تمرکز بر تحویل و takeaway که قیمت ماهانهٔ ثابت بدون کمیسیون را ترجیح می‌دهند",
      "مفاهیم فرنچایز و چندشعبه‌ای که از سطح Enterprise با راه‌اندازی اختصاصی استفاده می‌کنند",
    ],
    closingStatement:
      "اگر کسب‌وکار شما در این فهرست نیست، اجازه دهید جدول واقعیت‌های بالا خودش صحبت کند — ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · نظر گوگل (اصل به آلمانی)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "اگر قرارداد ببندم چه مدت با اوردراسمارت قفل هستم؟", answer: "FAQ عمومی اوردراسمارت حداقل مدت ۲۴ ماه را اعلام می‌کند. گاسترو مستر روی بسته‌های نرم‌افزاری با مهلت لغو ۳ ماهه کار می‌کند.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { question: "هزینهٔ اوردراسمارت در مقایسه با گاسترو مستر چقدر است؟", answer: "اوردراسمارت چهار بسته در صفحهٔ قیمت خود فهرست می‌کند: Web-Shop ‎۱۱۹€‎ /ماه, Web+App-Shop ‎۲۲۹€‎ /ماه, Web-Shop+Cloud-POS ‎۲۰۸€‎ /ماه و Order Manager ‎۲۹۹€‎ یکباره. گاسترو مستر از ‎۴۹€‎ /ماه (وب‌سایت), ‎۷۹€‎ /ماه (سامانهٔ سفارش) و ‎۱۴۹€‎ /ماه (بستهٔ App) شروع می‌شود. در سطح بستهٔ قابل‌مقایسه گاسترو مستر حدود ۴۰ یورو در ماه ارزان‌تر است.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { question: "کدام ارائه‌دهنده برای رستوران من بهتر است — اوردراسمارت یا گاسترو مستر؟", answer: "ما عمداً ارائه‌دهندهٔ دیگری را پیشنهاد نمی‌کنیم. گاسترو مستر برای رستوران‌های خانوادگی DACH با ۱ تا ۵ شعبه طراحی شده است. اگر کسب‌وکار شما با این تطبیق دارد، ما انتخاب درستی هستیم. در غیر این صورت، واقعیت‌های جدول به شما کمک می‌کنند خودتان تصمیم بگیرید." },
    { question: "هنگام تعویض، چه اتفاقی برای داده‌های مشتری و برند اپلیکیشن من می‌افتد؟", answer: "با گاسترو مستر دامنهٔ اختصاصی و اپلیکیشن بومی iOS/Android تحت برند خود می‌گیرید. با اوردراسمارت زیر زیردامنهٔ whitelabel ordersmart.de باقی می‌مانید — مالکیت برند نزد ارائه‌دهنده باقی می‌ماند.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "من از قبل مشتری اوردراسمارت هستم — آیا می‌توانم پیش از پایان قرارداد تعویض کنم؟", answer: "ما قرارداد فعلی شما را در یک بررسی تعویض رایگان مرور می‌کنیم و به‌طور مشخص محاسبه می‌کنیم تعویض چه معنایی دارد — هزینه‌ها، زمان‌بندی، انتقال داده. حتی اگر تصمیم به تعویض نگیرید، یک مقایسهٔ کتبی دریافت می‌کنید." },
    { question: "اگر به‌دنبال شریک بلندمدت هستم، چه کسانی پشت این دو شرکت‌اند؟", answer: "اوردراسمارت توسط app smart GmbH (Wiesbaden) اداره می‌شود و از زمان ادغام ۲۰۲۲ زیرمجموعهٔ شرکت دانمارکی پذیرفته‌شده در بورس OrderYOYO A/S است. گاسترو مستر مالک‌محور از Usingen (Hesse, Germany) درون منطقهٔ DACH توسعه می‌یابد.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ مهلت لغو ۳ ماهه روی بسته‌های نرم‌افزاری (به‌جای قفل ۲۴ ماهه — جدول بالا را ببینید)" },
    { claimRef: "D2 / G2", text: "✅ ۰٪ کمیسیون روی سفارش‌های مستقیم — قیمت ماهانهٔ ثابت به‌جای سهم درصدی از درآمد" },
    { claimRef: "B-Reihe", text: "✅ تماس شخصی با شمارهٔ تلفن مستقیم — بدون برون‌سپاری مرکز تماس" },
    { claimRef: "H1", text: "✅ پیشنهاد تعویض ۵۰٪: تا زمانی که قرارداد فعلی شما در حال پرداخت است، گاسترو مستر را با ۵۰٪ از قیمت ماهانهٔ معمول دریافت می‌کنید", pending: true, softFallback: "✅ شرایط تعویض اختصاصی — قرارداد فعلی شما را در یک بررسی رایگان مرور می‌کنیم" },
  ],
  cta: { primaryText: "مشاورهٔ رایگان", primaryHref: "/kontakt", secondaryText: "قیمت‌ها در یک نگاه", secondaryHref: "/preise" },
  quotableOneLiners: [
    "گاسترو مستر راه‌حل سامانهٔ سفارش بدون کمیسیون برای رستوران‌های خانوادگی DACH است.",
    "با مهلت لغو ۳ ماهه و ۰٪ کمیسیون، گاسترو مستر شرایط قراردادی منعطف برای SMEهای رستوران ارائه می‌دهد.",
    "در سطح بستهٔ قابل‌مقایسه، رستوران‌ها با گاسترو مستر حدود ۴۰ یورو در ماه کمتر از اوردراسمارت می‌پردازند — با تعهد قراردادی بسیار کوتاه‌تر.",
    "اوردراسمارت طبق FAQ خود با حداقل مدت ۲۴ ماه ارائه می‌شود — گاسترو مستر روی بسته‌های نرم‌افزاری با مهلت لغو ۳ ماهه کار می‌کند.",
    "+۸۰۰ رستوران در آلمان، اتریش و سوئیس از گاسترو مستر به‌عنوان جایگزین بدون کمیسیون قراردادهای SaaS بلندمدت استفاده می‌کنند.",
  ],
  meta: { title: "گاسترو مستر در برابر اوردراسمارت — بررسی واقعیت‌ها با منابع | Gastro Master", description: "مقایسهٔ مبتنی بر واقعیت گاسترو مستر و اوردراسمارت: مدت قرارداد، قیمت‌های مشخص (‎۷۹€‎ /ماه vs. ‎۱۱۹€‎ /ماه)، مدل خدمات. با URL منابع و تاریخ بررسی.", dateModified: SOURCE_DATE },
};

// ─── සිංහල (Sinhala) ────────────────────────────────────────────────────────
const SI: ComparisonData = {
  ...DE,
  hook: {
    headline: "Gastro Master එදිරිව OrderSmart: මැනගත හැකි වෙනස්කම්",
    subHeadline: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව — ගිවිසුම් කාල සීමාව, මිල ගණන්, සේවා ආකෘතිය.",
    trustPills: [
      { label: "DACH ආපනශාලා 800+" },
      { label: "Google සමාලෝචන 131න් 5,0★" },
      { label: "කෙළින්ම ඇණවුම් මත 0% කොමිස්" },
    ],
  },
  quickFacts: [
    { axis: "අවම ගිවිසුම් කාලය", competitorValue: "මාස 24", gastroMasterValue: "මාස 3 අවසන් කිරීමේ දැන්වීම (මෘදුකාංග පැකේජ)", meaning: "OrderSmart හි FAQ අනුව මාස 24ක ගිවිසුම් බැඳීමක් ඇත. Gastro Master සමඟ ඔබට මාස 3ක දැන්වීමක් සමඟ අවසන් කළ හැක — සාමාන්‍ය දායක මුදලක් මෙන්.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "නිශ්චිත මාසික මිල", competitorValue: "Web-Shop 119 €/මස, Web+App-Shop 229 €/මස, Web-Shop+Cloud-POS 208 €/මස, Order Manager 299 € එක් වරක්", gastroMasterValue: "වෙබ් අඩවිය 49 €/මස සිට, ඇණවුම් පද්ධතිය 79 €/මස සිට, App පැකේජය 149 €/මස සිට", meaning: "සමාන පැකේජ මට්ටමේ Gastro Master සමඟ මාසයකට තවත් යුරෝ 40-80 ඉතිරි කරගත හැක — මාස 24ක බැඳීමක් නැතිව.", priceBreakdown: [
      { packageLabel: "ඇණවුම් පද්ධතිය (Web-Shop)", competitorPrice: "119 €/මස", gastroMasterPrice: "79 €/මස", savingsLabel: "−40 €/මස" },
      { packageLabel: "ඇණවුම් පද්ධතිය + App", competitorPrice: "229 €/මස", gastroMasterPrice: "149 €/මස", savingsLabel: "−80 €/මස" },
      { packageLabel: "ඇණවුම් පද්ධතිය + POS", competitorPrice: "208 €/මස", gastroMasterPrice: "148 €/මස", savingsLabel: "−60 €/මස" },
    ], source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "අයිතිකාර ව්‍යුහය", competitorValue: "ඩෙන්මාර්ක OrderYOYO A/S හි අනුබද්ධිතය (2022 ඒකාබද්ධ වීම), කොටස් වෙළඳපොළේ ලැයිස්තු ගත", gastroMasterValue: "Usingen, Hesse (ජර්මනිය) සිට අයිතිකරු මෙහෙයවන", meaning: "OrderSmart 2022 සිට ඩෙන්මාර්කයේ සිට මෙහෙයවනු ලබයි. Gastro Master DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන තීරණ ගනී.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
    { axis: "කෙළින්ම ඇණවුම් මත කොමිස්", competitorValue: "ආකෘතිය මත රඳා පවතී — මිල පිටුවේ විස්තර", gastroMasterValue: "0% කොමිස්, ස්ථාවර මාසික මිල", meaning: "Gastro Master සමඟ ඔබ ස්ථාවර මාසික මිලක් ගෙවයි. ආපනශාලාවේ ආදායමෙන් ප්‍රතිශත කොටසක් නැත.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
  ],
  detailedTable: [
    { axis: "අවම ගිවිසුම් කාලය", competitorValue: "මාස 24 (FAQ අනුව)", gastroMasterValue: "මෘදුකාංග පැකේජ සඳහා මාස 3 අවසන් කිරීමේ දැන්වීම", meaning: "OrderSmart ඔබව මාස 24කට බැඳ තබයි. Gastro Master සමඟ ඔබ මාස 3ක දැන්වීමක් සමඟ අවසන් කරයි.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { axis: "අවසන් කිරීමේ දැන්වීම් කාලය", competitorValue: "ගිවිසුම අවසානයට මාස 3 කලින් (FAQ අනුව)", gastroMasterValue: "මාස 3 දැන්වීම, අවම කාලයෙන් පසු ඕනෑම වේලාවක", meaning: "ප්‍රදායකයන් දෙදෙනාම මාස 3 දැන්වීමක් අවශ්‍ය වේ — වෙනස ඊට පෙර ඇති අවම කාලයේ ඇත.", source: ORDER_SMART_FAQ_KUENDIGUNG, sourceDate: SOURCE_DATE },
    { axis: "නිශ්චිත පැකේජ සහ මිල", competitorValue: "Web-Shop 119 €/මස · Web+App-Shop 229 €/මස · Web-Shop+Cloud-POS 208 €/මස · Order Manager 299 € එක් වරක්", gastroMasterValue: "වෙබ් අඩවිය 49 €/මස සිට · ඇණවුම් පද්ධතිය 79 €/මස සිට · App පැකේජය 149 €/මස සිට · POS පද්ධතිය 69 €/මස සිට", meaning: "සමාන පැකේජ මට්ටමේ (ඇණවුම් පද්ධතිය) Gastro Master 79 €/මස OrderSmart හි 119 €/මස Web-Shop ට වඩා දළ වශයෙන් 40 €කින් අඩුය — බොහෝ සෙයින් කෙටි ගිවිසුම් බැඳීමක් සමඟ.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { axis: "සේවා භාෂා", competitorValue: "ඉල්ලීම මත විස්තර", gastroMasterValue: "භාෂා 6: DE, EN, IT, RU, FA, SI", meaning: "බහු භාෂා ආපනශාලා හිමිකරු? Gastro Master කෙළින්ම ඔබේ භාෂාව කතා කරයි.", source: GM_UEBER_UNS, sourceDate: SOURCE_DATE },
    { axis: "මූලස්ථානය සහ පාලනය", competitorValue: "Wiesbaden (app smart GmbH), ඩෙන්මාර්කයෙන් මෙහෙයවන", gastroMasterValue: "Usingen (Hesse) — DACH ඇතුළත අයිතිකරු මෙහෙයවන", meaning: "Gastro Master DACH කලාපය ඇතුළත නිෂ්පාදන + සේවා පිළිබඳ තීරණය කරයි. OrderSmart 2022 ඒකාබද්ධ වීමේ සිට ඩෙන්මාර්කයෙන් මෙහෙයවනු ලබයි.", source: ORDER_SMART_IMPRESSUM, sourceDate: SOURCE_DATE },
    { axis: "ආපනශාලාවේ ම app සන්නාමය", competitorValue: "ordersmart.de යටතේ Whitelabel උප-ඩොමේනය", gastroMasterValue: "ආපනශාලාවට වෙන වෙනම තමන්ගේම ඩොමේන් + native iOS/Android app", meaning: "Gastro Master සමඟ ඔබ ඔබේම සන්නාමය ගොඩනඟයි. OrderSmart සමඟ ඔබ මව් ඩොමේනය යටතේ whitelabel ලෙස පවතී.", source: GM_AGB, sourceDate: SOURCE_DATE },
  ],
  convictionStatement: {
    heading: "ඉහත වගුව සරල සිංහලෙන්:",
    punchlines: [
      "ගිවිසුම් බැඳීම මාස 24 එදිරිව 3.",
      "මසකට 119 € එදිරිව 79 €.",
      "whitelabel උප-ඩොමේනයකට වඩා ඔබේම app සන්නාමයක්.",
    ],
    body: "සමාන පැකේජ මට්ටමේ, මේක පළමු මාස 24 තුළදීම මෘදුකාංග පිරිවැය ආසන්න වශයෙන් 960 €කින් අඩු — හා ඒ සමඟම තවත් මාස 21ක ගිවිසුම් නිදහසක් ලබා දේ. අප සමඟ කතා කිරීමට පෙර ඔබේ වර්තමාන ගිවිසුම අවසන් කිරීම අවශ්‍ය නොවේ.",
    closing: "මේවා වෙළඳ පොරොන්දු නොවේ. මේ ප්‍රදායකයන් දෙදෙනාගේ පොදු මිල ගණන් සමඟ ගණිතයකි.",
  },
  gmAvatars: {
    intro: "Gastro Master පහත සඳහන් ආපනශාලා සඳහා සැකසී ඇත:",
    avatars: [
      "DACH හි ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන පීසා හල්, ටේක්වේ සහ කැෆේ",
      "භාෂා 6කින් (DE, EN, IT, RU, FA, SI) පුද්ගලික සේවාව අගය කරන ව්‍යාපාර",
      "whitelabel උප-ඩොමේනයක් වෙනුවට ඔවුන්ගේම app සන්නාමය ගොඩනැඟීමට අවශ්‍ය ආපනශාලා",
      "කොමිස් රහිත ස්ථාවර මාසික මිල කැමති බෙදාහැරීම් සහ takeaway අවධානයක් සහිත සංකල්ප",
      "අභිරුචි පිහිටුවීම සමඟ Enterprise tier භාවිතා කරන Franchise සහ බහු-ස්ථාන සංකල්ප",
    ],
    closingStatement:
      "ඔබේ ව්‍යාපාරය මෙම ලැයිස්තුවේ නොමැති නම්, ඉහත කරුණු වගුවට තමන්ටම කතා කිරීමට ඉඩ දෙන්න — අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු.",
  },
  customerStory: { quote: MEHLFABRIK_QUOTE_DE, attribution: "Mehlfabrik Rotenburg Wümme · Google සමාලෝචනය (මුල් ජර්මානු බසින්)", source: MEHLFABRIK_REVIEW_URL, sourceDate: SOURCE_DATE },
  faq: [
    { question: "මම ගිවිසුමක් අත්සන් කළහොත් OrderSmart සමඟ කොපමණ කාලයක් බැඳී සිටින්නෙම්ද?", answer: "OrderSmart හි පොදු FAQ මාස 24ක අවම කාලයක් සඳහන් කරයි. Gastro Master මෘදුකාංග පැකේජ සඳහා මාස 3 අවසන් කිරීමේ දැන්වීමක් සමඟ ක්‍රියා කරයි.", source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT, sourceDate: SOURCE_DATE },
    { question: "Gastro Master සමඟ සසඳන විට OrderSmart වල පිරිවැය කොපමණද?", answer: "OrderSmart හි මිල පිටුවේ පැකේජ හතරක් සඳහන් වේ: Web-Shop 119 €/මස, Web+App-Shop 229 €/මස, Web-Shop+Cloud-POS 208 €/මස සහ Order Manager 299 € එක් වරක්. Gastro Master 49 €/මස (වෙබ් අඩවිය), 79 €/මස (ඇණවුම් පද්ධතිය) සහ 149 €/මස (App පැකේජය) සිට ආරම්භ වේ. සමාන පැකේජ මට්ටමේ Gastro Master මාසයකට යුරෝ 40ක් පමණ ලාභදායී වේ.", source: ORDER_SMART_PREISE, sourceDate: SOURCE_DATE },
    { question: "මගේ ආපනශාලාවට OrderSmart හෝ Gastro Master කවුද හොඳ?", answer: "අපි දැනුවත්ව වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු. Gastro Master ස්ථාන 1-5ක් සහිත පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා සැකසී ඇත. ඔබේ ව්‍යාපාරය ගැලපේ නම්, අපි නියම තේරීම වේ. නැත්නම්, වගුවේ කරුණු ස්වාධීනව තීරණය කිරීමට උදව් කරයි." },
    { question: "මාරු වන විට මගේ පාරිභෝගික දත්ත සහ app සන්නාමයට කුමක් සිදුවේද?", answer: "Gastro Master සමඟ ඔබ ඔබේම සන්නාමය යටතේ ඔබේම ඩොමේන් සහ native iOS/Android app ලබා ගනී. OrderSmart සමඟ ඔබ ordersmart.de යටතේ whitelabel උප-ඩොමේනයක පවතී — සන්නාම අයිතිය ප්‍රදායකයාට පවතී.", source: GM_AGB, sourceDate: SOURCE_DATE },
    { question: "මම දැනටමත් OrderSmart පාරිභෝගිකයෙක් — ගිවිසුම අවසන් වීමට පෙර මාරු විය හැකිද?", answer: "අපි ඔබේ වර්තමාන ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කර මාරුවක් යනු කුමක්ද — පිරිවැය, කාල සටහන, දත්ත සංක්‍රමණය — යන්න සංයුතව ගණනය කරමු. ඔබ මාරු නොවීමට තීරණය කළත්, ලිඛිත සන්සන්දනයක් ලබා ගනී." },
    { question: "දිගුකාලීන හවුල්කරුවෙකු සොයන්නේ නම්, මෙම සමාගම් දෙක පිටුපස කවුද?", answer: "OrderSmart app smart GmbH (Wiesbaden) විසින් මෙහෙයවනු ලබන අතර 2022 ඒකාබද්ධ වීමේ සිට ඩෙන්මාර්ක පොදු OrderYOYO A/S හි අනුබද්ධිතයකි. Gastro Master Usingen (Hesse, Germany) සිට DACH කලාපය ඇතුළත අයිතිකරු මෙහෙයවන ලෙස සංවර්ධනය වේ.", source: ORDER_YOYO_MERGER, sourceDate: SOURCE_DATE },
  ],
  riskReversal: [
    { claimRef: "C1", text: "✅ මෘදුකාංග පැකේජ මත මාස 3 අවසන් කිරීමේ දැන්වීම (මාස 24ක බැඳීමක් වෙනුවට — ඉහත වගුව බලන්න)" },
    { claimRef: "D2 / G2", text: "✅ කෙළින්ම ඇණවුම් මත 0% කොමිස් — ආදායමෙන් ප්‍රතිශත කොටස් වෙනුවට ස්ථාවර මාසික මිල" },
    { claimRef: "B-Reihe", text: "✅ සෘජු දුරකථන අංකයක් සහිත පුද්ගලික සම්බන්ධතාව — හොට්ලයින් බාහිර කිරීමක් නැත" },
    { claimRef: "H1", text: "✅ මාරු පිරිනැමීම 50%: ඔබේ පවතින ගිවිසුම තවමත් ගෙවමින් සිටින තාක්, ඔබට සාමාන්‍ය මාසික මිලෙන් 50%කට Gastro Master ලැබේ", pending: true, softFallback: "✅ පුද්ගලික මාරු කොන්දේසි — අපි ඔබේ පවතින ගිවිසුම නොමිලේ මාරු-පරීක්ෂණයක දී සමාලෝචනය කරමු" },
  ],
  cta: { primaryText: "නොමිලේ උපදෙස්", primaryHref: "/kontakt", secondaryText: "මිල ගණන් එක නෙතින්", secondaryHref: "/preise" },
  quotableOneLiners: [
    "Gastro Master යනු පවුල්-මෙහෙයවන DACH ආපනශාලා සඳහා කොමිස් රහිත ඇණවුම් පද්ධති විසඳුම වේ.",
    "මාස 3 අවසන් කිරීමේ දැන්වීමක් සහ 0% කොමිසනක් සමඟ, Gastro Master ආපනශාලා SME කොටස සඳහා නම්‍යශීලී ගිවිසුම් කොන්දේසි පිරිනමයි.",
    "සමාන පැකේජ මට්ටමේ, ආපනශාලා Gastro Master සමඟ OrderSmart හට වඩා මාසයකට යුරෝ 40ක් පමණ අඩුවෙන් ගෙවයි — බොහෝ සෙයින් කෙටි ගිවිසුම් බැඳීමක් සමඟ.",
    "OrderSmart හි FAQ අනුව මාස 24ක අවම කාලයක් සමඟ පිරිනමන — Gastro Master මෘදුකාංග පැකේජ සඳහා මාස 3 අවසන් කිරීමේ දැන්වීමක් සමඟ ක්‍රියා කරයි.",
    "ජර්මනියේ, ඔස්ට්‍රියාවේ සහ ස්විට්සර්ලන්තයේ ආපනශාලා 800+ ක් දිගුකාලීන-බැඳී SaaS ගිවිසුම්වලට කොමිස් රහිත විකල්පයක් ලෙස Gastro Master භාවිතා කරයි.",
  ],
  meta: { title: "Gastro Master එදිරිව OrderSmart — මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව | Gastro Master", description: "Gastro Master සහ OrderSmart වල කරුණු සසඳීම: ගිවිසුම් කාලය, නිශ්චිත මිල (79 €/මස vs. 119 €/මස), සේවා ආකෘතිය. මූලාශ්‍ර URL සහ සත්‍යාපන දිනය සමඟ.", dateModified: SOURCE_DATE },
};

// ─── Registry ───────────────────────────────────────────────────────────────
export const orderSmartByLang: ComparisonByLang = {
  de: DE,
  en: EN,
  it: IT,
  fa: FA,
  si: SI,
  ru: RU,
};

// Backwards-Compat: Export the canonical DE variant unter dem alten Namen,
// damit alte Imports nicht brechen.
export const orderSmartComparison = DE;
