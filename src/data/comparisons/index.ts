import type { ComparisonByLang, ComparisonData, ComparisonLang } from "./types";
import { orderSmartByLang } from "./order-smart";
import { sidesByLang } from "./sides";
import { dishOrderByLang } from "./dish-order";
import { foodamigosByLang } from "./foodamigos";
import { resmioByLang } from "./resmio";

/**
 * Registry aller /vergleiche/-Pages, jeweils mit Übersetzungen für alle Sprachen.
 *
 * Hinzufügen einer neuen Comparison-Page:
 * 1. Datei `src/data/comparisons/<slug>.ts` mit `<slug>ByLang: ComparisonByLang` exportieren
 * 2. Hier importieren + in `comparisons` registrieren
 * 3. `npm run validate-comparisons` muss grün sein (prüft alle Sprachen)
 */
export const comparisons: Record<string, ComparisonByLang> = {
  "order-smart": orderSmartByLang,
  "sides": sidesByLang,
  "dish-order": dishOrderByLang,
  "foodamigos": foodamigosByLang,
  "resmio": resmioByLang,
};

export const comparisonSlugs = Object.keys(comparisons);

/**
 * Liefert die ComparisonData für einen Slug + Sprache.
 * Fällt auf "de" zurück wenn die Sprache fehlt (sollte bei vollständigen
 * Translations nie passieren, aber als Sicherheitsnetz).
 */
export function getComparison(
  slug: string,
  lang: ComparisonLang,
): ComparisonData | undefined {
  const byLang = comparisons[slug];
  if (!byLang) return undefined;
  return byLang[lang] ?? byLang.de;
}

export type { ComparisonData, ComparisonByLang, ComparisonLang } from "./types";
export {
  type Fact,
  type ComparisonRow,
  type FaqItem,
  type CustomerStory,
  type RiskReversalLine,
  type QuickPill,
  type PriceBreakdownItem,
} from "./types";
export {
  hubByLang,
  getHub,
  type ComparisonHubData,
  type ComparisonHubByLang,
  type HubTableColumn,
  type HubTableRow,
  type OrientationOption,
  type CompetitorCard,
  type HubFaqItem,
} from "./hub";
