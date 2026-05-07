/**
 * Schema für /vergleiche/-Pages.
 *
 * Compliance-Pflicht (Wissens-Bibel #19):
 * - Jede `Fact` muss `source` + `sourceDate` haben → sonst Build-Failure (siehe scripts/validate-comparisons.mjs).
 * - Salvatore-Prinzip: `gmAvatars` listet NUR Gastro-Master-Avatare, NIE Konkurrenten.
 * - UWG §6: keine Wertungen ("besser", "schlechter") in `competitorValue`/`gastroMasterValue`.
 */

export interface Fact {
  /** Source URL — Pflicht, sonst Build-Failure. */
  source: string;
  /** ISO date YYYY-MM-DD when the source was last verified. */
  sourceDate: string;
}

export interface PriceBreakdownItem {
  /** Paket-Name in Restaurant-Sprache, z. B. "Bestellsystem" / "Bestellsystem + App". */
  packageLabel: string;
  /** Konkurrent-Preis, z. B. "119 €/Mo." */
  competitorPrice: string;
  /** Gastro-Master-Preis, z. B. "79 €/Mo." */
  gastroMasterPrice: string;
  /** Optionales Sparen-Label, z. B. "40 €/Mo. weniger". */
  savingsLabel?: string;
}

export interface ComparisonRow extends Fact {
  /** Achse, z. B. "Vertragslaufzeit" / "Provision" / "Pricing-Modell". */
  axis: string;
  /** Konkurrent-Wert, faktisch + zitierfähig. */
  competitorValue: string;
  /** Gastro-Master-Wert, faktisch + zitierfähig. */
  gastroMasterValue: string;
  /** "Was bedeutet das für dich?" — Plain-Language-Erklärung in Restaurant-Sprache. */
  meaning: string;
  /**
   * Optional: bei Pricing-Vergleichen ersetzt diese strukturierte Breakdown-Tabelle
   * die textuellen competitorValue/gastroMasterValue im UI — anfängerfreundlich,
   * Paket-für-Paket nebeneinander.
   */
  priceBreakdown?: PriceBreakdownItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional: source-URL falls die Antwort sich auf eine externe Quelle stützt. */
  source?: string;
  sourceDate?: string;
}

export interface CustomerStory {
  quote: string;
  attribution: string;
  /** Quelle der Quote — typischerweise Google-Reviews-URL oder Customer-Calls-Erlaubnis. */
  source: string;
  sourceDate: string;
}

export interface RiskReversalLine {
  /** Bezug zum Brand-Claim aus Wissens-Bibel #19 (z. B. "C1", "D2", "H1"). */
  claimRef: string;
  /** Anzeigetext der Zeile, mit ✅-Präfix bereits enthalten. */
  text: string;
  /**
   * pending = darf in Production noch nicht claimt werden (z. B. H1 50 %-Wechselangebot
   * bis Marge/AGB/Anwalt durch sind). Validator setzt automatisch Soft-Variante.
   */
  pending?: boolean;
  /** Soft-Fallback-Text falls `pending=true`. */
  softFallback?: string;
}

export interface QuickPill {
  label: string;
  /** Optional: source falls der Trust-Pill eine zahlbasierte Aussage trifft. */
  source?: string;
  sourceDate?: string;
}

/**
 * Sprach-Code, mirror der LANGUAGES aus src/config/routes.ts.
 * Wir vermeiden zirkulären Import indem wir den Typ hier erneut deklarieren.
 */
export type ComparisonLang = "de" | "en" | "it" | "fa" | "si" | "ru";

/**
 * Per-Sprache eine vollständige ComparisonData. Sprachen ohne Eintrag
 * fallen automatisch auf "de" zurück (siehe `getComparison()` in index.ts).
 */
export type ComparisonByLang = Partial<Record<ComparisonLang, ComparisonData>>;

export interface ComparisonData {
  /** URL-Slug, z. B. "order-smart" → /vergleiche/order-smart. */
  slug: string;
  /** Konkurrent-Anzeigename, z. B. "OrderSmart". */
  competitorName: string;
  /** Volles Konkurrent-Legal-Name, z. B. "app smart GmbH (OrderSmart)". */
  competitorLegalName: string;

  /** Hook-Sektion (Section 1). */
  hook: {
    headline: string;
    subHeadline: string;
    /** Max. 3 Trust-Pills. */
    trustPills: QuickPill[];
  };

  /** Auf-einen-Blick-Box (Section 2) — 4 Vergleichszeilen, kurz. */
  quickFacts: ComparisonRow[];

  /** Detaillierte Vergleichstabelle (Section 3) — max. 7 Zeilen. */
  detailedTable: ComparisonRow[];

  /**
   * GM-Avatar-Liste (Section 4 — Salvatore-Prinzip).
   * NIEMALS Konkurrenz-Avatare hier. Wenn GM nicht passt: Schweigen + Fakten oben sprechen lassen.
   */
  gmAvatars: {
    intro: string;
    avatars: string[];
    /** Schluss-Satz, der explizit auf Konkurrenz-Empfehlung verzichtet. */
    closingStatement: string;
  };

  /**
   * Optionaler Conviction-Statement-Block — Money-Math-Synthese der Tabelle
   * (zwischen "Detaillierter Faktencheck" und "Passt Gastro Master zu dir?").
   * Council-Empfehlung 2026-05-06: stark-konvertierender Anker für AI-Citation
   * + emotionalen Höhepunkt nach den Fakten, ohne UWG-§6-Werturteil.
   */
  convictionStatement?: {
    /** Headline, z. B. "Was die Tabelle oben in Klartext bedeutet:". */
    heading: string;
    /** Drei kurze Punch-Vergleiche, z. B. "24 vs. 3 Monate Vertragsbindung". */
    punchlines: string[];
    /** Hauptparagraph mit Money-Math und Fear-Removal-Komponente. */
    body: string;
    /** Schluss-Satz, z. B. "Das ist Mathematik mit öffentlichen Preisen". */
    closing: string;
  };

  /** Customer-Story (Section 5). */
  customerStory: CustomerStory;

  /** FAQ-Sektion (Section 6) — 5–7 Q&A für FAQPage Schema.org. */
  faq: FaqItem[];

  /** Risk-Reversal-Box (Section 7) — 4 Zeilen vor dem CTA. */
  riskReversal: RiskReversalLine[];

  /** CTA-Konfiguration. */
  cta: {
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
  };

  /**
   * Quotable One-Liner für AI-Citation. Erscheinen sichtbar in der Page UND in
   * `description`-Feldern der JSON-LD-Blöcke.
   * Mindestens 3 pro Page (Wissens-Bibel #19, Gold-Standard-Sektion).
   */
  quotableOneLiners: string[];

  /** Meta für SEO/Pre-Render. */
  meta: {
    title: string;
    description: string;
    /** ISO date — wann die Page-Daten zuletzt vollständig auditiert wurden. */
    dateModified: string;
  };
}
