/**
 * Single Source of Truth for Gastro Master packages, used by JSON-LD blocks.
 * Source values are derived (without modification) from:
 *   - public/locales/de/common.json → pricing.slimPlans + pricing.packageFeatures
 *   - public/locales/de/kasse.json → seo.description (Kassensystem ab 69 €/Monat)
 *   - src/pages/PreisePage.tsx FAQ items (descriptive copy)
 *
 * No price or feature is invented here — every value is reproducible from the
 * sources above. If a value cannot be sourced, it is marked `null`.
 */

import { SITE_URL, ORG_ID } from "./schemaOrg";

export interface PackageNode {
  /** Stable @id for cross-referencing from add-ons / catalogs. */
  id: string;
  /** Public-facing package name (DE). */
  name: string;
  /** Short tagline (DE) — matches Pricing-Section. */
  tagline: string;
  /** URL slug under /produkte/pakete/ (or null for combined packages without dedicated page). */
  slug: string | null;
  /** Monthly price in EUR (number) or null if "on request". */
  priceMonthly: number | null;
  /** Optional yearly-billing price in EUR per month — applies only when paid yearly. */
  priceYearlyPerMonth: number | null;
  /** Inclusive features (DE), reproduced verbatim from packageFeatures map. */
  features: readonly string[];
  /** Notes / contractual terms (DE). */
  monthlyNote: string | null;
  /** Page-level description (1–2 Sätze, DE). */
  description: string;
  /** Flag to distinguish Enterprise ("preis auf anfrage") from standard packages with list prices. */
  isEnterprise?: boolean;
}

/** Derived from common.json pricing.slimPlans + pricing.packageFeatures. */
export const PACKAGES: readonly PackageNode[] = [
  {
    id: `${SITE_URL}/produkte/pakete/webseite#offer`,
    name: "Webseite",
    tagline: "Professionelle Online-Präsenz",
    slug: "/produkte/pakete/webseite",
    priceMonthly: 49,
    priceYearlyPerMonth: 49,
    features: [
      "Professionelle Restaurant-Website",
      "Eigene Domain inklusive",
      "Bildergalerie & Speisekarte",
      "Kontaktformular & Google Maps",
      "Mobile-optimiert & SEO-ready",
      "SSL & Hosting inklusive",
    ],
    monthlyNote: "Mindestvertragslaufzeit 12 Monate",
    description:
      "Die Webseite (ab 49 €/Monat) ist eine professionelle Restaurant-Website ohne Bestellfunktion – ideal als digitale Visitenkarte.",
  },
  {
    id: `${SITE_URL}/produkte/pakete/online-bestellshop#offer`,
    name: "Starter (Bestellsystem)",
    tagline: "Reiner Webshop",
    slug: "/produkte/pakete/online-bestellshop",
    priceMonthly: 79,
    priceYearlyPerMonth: 69,
    features: [
      "Webshop (provisionsfrei)",
      "Eigene Domain inklusive",
      "Digitale Speisekarte",
      "Unbegrenzte Bestellungen",
      "2.500 Flyer mit QR-Code",
      "Kundenpunkte-System",
      "Bis 3 Postfächer",
    ],
    monthlyNote: "Monatlich kündbar mit 3 Monaten Kündigungsfrist",
    description:
      "Das Bestellsystem (ab 79 €/Monat) enthält einen Online-Bestellshop mit 0 % Provision, über den deine Kunden direkt bestellen können.",
  },
  {
    id: `${SITE_URL}/produkte/pakete/bestell-app#offer`,
    name: "Business (App + Bestellsystem)",
    tagline: "Webshop + App",
    slug: "/produkte/pakete/bestell-app",
    priceMonthly: 149,
    priceYearlyPerMonth: 129,
    features: [
      "Webshop + native App",
      "Eigene Domain inklusive",
      "Digitale Speisekarte",
      "Push-Benachrichtigungen",
      "Unbegrenzte Bestellungen",
      "5.000 Flyer mit QR-Code",
      "Bis 4 Postfächer",
    ],
    monthlyNote: "Monatlich kündbar mit 3 Monaten Kündigungsfrist",
    description:
      "App + Bestellsystem ab 149 €/Monat – die eigene Bestell-App zusätzlich zum Webshop, mit Push-Benachrichtigungen und nativer App-Erfahrung.",
  },
  {
    id: `${SITE_URL}/produkte/pakete/kassensystem#offer`,
    name: "Kassensystem",
    tagline: "TSE-konformes POS-System",
    slug: "/produkte/pakete/kassensystem",
    priceMonthly: 69,
    priceYearlyPerMonth: null,
    features: [
      "TSE-Zertifizierung",
      "GoBD-Konformität",
      "Cloud-Updates",
      "Bis zu 4 Kassen mit einer Lizenz",
      "Persönlicher Support aus Deutschland",
      "Läuft auf Windows-Computern",
    ],
    monthlyNote: "Monatlich kündbar mit 3 Monaten Kündigungsfrist",
    description:
      "Das Gastro Master Kassensystem ist ab 69 € pro Monat (netto) erhältlich. TSE-zertifiziert, GoBD-konform, mit persönlichem Support.",
  },
  {
    id: `${SITE_URL}/produkte/pakete/enterprise#offer`,
    name: "Enterprise",
    tagline: "Franchise / Mehr-Standorte",
    slug: null,
    priceMonthly: null,
    priceYearlyPerMonth: null,
    features: [
      "Individuelles Design",
      "Eigene Domain inklusive",
      "Digitale Speisekarte",
      "Kiosk Self-Ordering Terminal, Pick Up Screens optional",
      "Fotograf vor Ort optional",
      "Cloud-Kasse inkl.",
      "Transaktionsumlage inkl.",
      "Rahmenvertrag",
    ],
    monthlyNote: "Nach Projektumfang",
    description:
      "Enterprise-Paket für Franchise-Systeme und Multi-Standort-Betriebe – Preis nach Projektumfang.",
    isEnterprise: true,
  },
] as const;

/**
 * Build a Schema.org SoftwareApplication node for one package.
 * applicationCategory: BusinessApplication (Schema.org standard for B2B software).
 */
export function buildPackageSoftwareNode(pkg: PackageNode) {
  const url = pkg.slug ? `${SITE_URL}${pkg.slug}` : `${SITE_URL}/preise`;

  const offer =
    pkg.priceMonthly === null
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          businessFunction: "https://purl.org/goodrelations/v1#LeaseOut",
          eligibleRegion: { "@type": "Country", name: "Germany" },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            description: "Preis auf Anfrage / nach Projektumfang",
          },
        }
      : {
          "@type": "Offer",
          url,
          price: pkg.priceMonthly.toString(),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          businessFunction: "https://purl.org/goodrelations/v1#LeaseOut",
          eligibleRegion: { "@type": "Country", name: "Germany" },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: pkg.priceMonthly,
            priceCurrency: "EUR",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitCode: "MON",
            },
            valueAddedTaxIncluded: false,
          },
        };

  return {
    "@type": "SoftwareApplication",
    "@id": pkg.id,
    name: `Gastro Master ${pkg.name}`,
    description: pkg.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, iOS, Android",
    offers: offer,
    featureList: [...pkg.features],
    provider: { "@id": ORG_ID },
    inLanguage: "de-DE",
  };
}

/** Build an ItemList of all packages, suitable for the /preise page. */
export function buildPackagesItemListNode() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/preise#package-list`,
    name: "Gastro Master Pakete",
    numberOfItems: PACKAGES.length,
    itemListElement: PACKAGES.map((pkg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": pkg.id },
    })),
  };
}
