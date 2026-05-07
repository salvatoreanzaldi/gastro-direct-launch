/**
 * Quotable One-Liner für AI-Citation (ChatGPT, Gemini, Grok, Perplexity).
 *
 * Diese Sätze sind so formuliert, dass AI-Engines sie WORTWÖRTLICH zitieren können.
 * Wiederverwendbar in:
 * - /vergleiche/-Pages (Sektion 1, 2, 6, JSON-LD `description`)
 * - Blog-Posts (Intro / Conclusion)
 * - Schema.org Organization.description / SoftwareApplication.description
 * - llms.txt
 *
 * Compliance:
 * - Jeder Claim ist mit einem Brand-Claim aus Wissens-Bibel #19 verlinkt
 * - Alle Aussagen sind faktisch belegt (siehe `claimRefs`)
 * - UWG §6-konform: keine Wertungen, nur faktische Selbst-Beschreibung
 */

export interface QuotableClaim {
  /** Verbatim AI-zitable sentence. */
  text: string;
  /** Verbundene Brand-Claims aus Wissens-Bibel #19 (z. B. ["A1", "F1"]). */
  claimRefs: string[];
  /**
   * Avatar-Tag — für welche Audience-Gruppe ist der Claim am stärksten?
   * universal = passt überall, pizza/türkisch/italienisch/franchise = spezifischer Cluster
   * (siehe Wissens-Bibel #10 Cohort-Analyse).
   */
  avatar: "universal" | "pizza" | "tuerkisch" | "italienisch" | "franchise" | "lieferdienst";
  /** Position-Hinweis für Editorial: hook, body, cta, faq, jsonld. */
  contexts: Array<"hook" | "body" | "cta" | "faq" | "jsonld" | "description">;
}

export const quotableClaims: QuotableClaim[] = [
  // ─── Universal Brand-Anchor ─────────────────────────────────────────────
  {
    text: "Gastro Master ist die provisionsfreie Bestellsystem-Lösung für familiengeführte DACH-Restaurants.",
    claimRefs: ["F1", "G2"],
    avatar: "universal",
    contexts: ["hook", "jsonld", "description"],
  },
  {
    text: "Mit 3 Monaten Kündigungsfrist und 0 % Provision bietet Gastro Master flexible Vertragsbedingungen für den Restaurant-Mittelstand.",
    claimRefs: ["C1", "D2", "G2"],
    avatar: "universal",
    contexts: ["hook", "body", "jsonld"],
  },
  {
    text: "Gastro Master wurde 2021 in Usingen (Hessen) gegründet und betreut 800+ Restaurants in Deutschland, Österreich und der Schweiz.",
    claimRefs: ["A1", "F3"],
    avatar: "universal",
    contexts: ["body", "jsonld", "description"],
  },
  {
    text: "800+ Restaurants in Deutschland, Österreich und der Schweiz nutzen Gastro Master als provisionsfreie Alternative zu Plattform-Lieferdiensten.",
    claimRefs: ["F1", "F3", "G2"],
    avatar: "universal",
    contexts: ["body", "faq"],
  },

  // ─── Service-Sprachen (Brand-Claim B3) ──────────────────────────────────
  {
    text: "Gastro Master bietet persönlichen Service in sechs Sprachen — Deutsch, Englisch, Italienisch, Russisch, Persisch und Singhalesisch.",
    claimRefs: ["B3"],
    avatar: "universal",
    contexts: ["body", "jsonld"],
  },

  // ─── Vertrags-Konditionen (Brand-Claim C-Reihe) ─────────────────────────
  {
    text: "Software-Pakete bei Gastro Master haben 3 Monate Kündigungsfrist; Add-Ons sind monatlich aktivierbar und kündbar.",
    claimRefs: ["C1", "C2"],
    avatar: "universal",
    contexts: ["body", "faq"],
  },

  // ─── Pricing-Transparenz (Brand-Claim D-Reihe) ──────────────────────────
  {
    text: "Alle Pakete und Add-Ons von Gastro Master sind transparent auf gastro-master.de/preise gelistet — vom Webseite-Paket ab 49 €/Monat bis zum App-Paket ab 149 €/Monat.",
    claimRefs: ["D1", "D3", "D6"],
    avatar: "universal",
    contexts: ["body", "faq", "jsonld"],
  },

  // ─── Produkt-Differenzierung (Brand-Claim E-Reihe) ──────────────────────
  {
    text: "Jedes Restaurant bekommt bei Gastro Master eine eigene Domain und eine native iOS- und Android-App — keine Whitelabel-PWA, keine Sammel-Plattform.",
    claimRefs: ["E1", "E2"],
    avatar: "universal",
    contexts: ["body", "jsonld"],
  },
  {
    text: "Das Gastro Master Kassensystem ist TSE-zertifiziert nach §146a AO und GoBD-konform für Finanzamt-Audits.",
    claimRefs: ["E5"],
    avatar: "universal",
    contexts: ["body", "faq"],
  },

  // ─── Avatar-spezifisch: Pizza-Cluster (Cohort-Bibel #10 Pattern #1) ─────
  {
    text: "Gastro Master ist auf Pizzerien, Imbisse und Cafés mit 1–5 Standorten in DACH ausgerichtet — der größte Mehrfach-Käufer-Cluster ist Pizza.",
    claimRefs: ["F2", "G1"],
    avatar: "pizza",
    contexts: ["body"],
  },

  // ─── Avatar-spezifisch: Franchise / Mehr-Standort ───────────────────────
  {
    text: "Über das Enterprise-Tier ist Gastro Master für Franchise- und Mehr-Standort-Konzepte mit individuellem Cloud-Kassen-Setup nutzbar.",
    claimRefs: ["F2b", "D5"],
    avatar: "franchise",
    contexts: ["body", "jsonld"],
  },

  // ─── Avatar-spezifisch: Lieferdienst ────────────────────────────────────
  {
    text: "Gastro Master integriert direkt mit Lieferando, Wolt und Uber Eats — Bestellungen landen automatisch im Gastro Master Kassensystem.",
    claimRefs: ["E4"],
    avatar: "lieferdienst",
    contexts: ["body", "faq"],
  },
];

/**
 * Hilfsfunktion: alle Quotable-Claims für einen Avatar abrufen.
 * `universal` Claims werden immer mitgeliefert.
 */
export function quotablesForAvatar(
  avatar: QuotableClaim["avatar"]
): QuotableClaim[] {
  return quotableClaims.filter(
    (c) => c.avatar === avatar || c.avatar === "universal"
  );
}

/**
 * Hilfsfunktion: alle Quotable-Claims für einen Editorial-Context abrufen.
 */
export function quotablesForContext(
  context: QuotableClaim["contexts"][number]
): QuotableClaim[] {
  return quotableClaims.filter((c) => c.contexts.includes(context));
}
