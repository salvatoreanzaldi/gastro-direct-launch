/**
 * Single Source of Truth for the Gastro Master Organization entity.
 * Used by JSON-LD <script> blocks across all page templates.
 *
 * @id system: stable URIs so other schema nodes can reference these by ID
 *   instead of duplicating the data.
 */

export const SITE_URL = "https://gastro-master.de" as const;

export const ORG_ID = `${SITE_URL}/#organization` as const;
export const WEBSITE_ID = `${SITE_URL}/#website` as const;

/** LinkedIn profiles sourced from public/locales/de/ueber-uns.json (team.founders[]). */
export const FOUNDERS = {
  sanjayaPattiyage: {
    name: "Sanjaya Pattiyage",
    linkedin: "https://www.linkedin.com/in/sanjaya-pattiyage/",
  },
  reneEbert: {
    name: "René Ebert",
    linkedin: "https://www.linkedin.com/in/rene-ebert/",
  },
} as const;

/**
 * Public social profiles (sameAs).
 * TODO: confirm and add LinkedIn company-page URL, Google Business listing,
 * Trustpilot profile (currently omitted to avoid hallucinated URLs).
 */
export const ORG_SAME_AS = [
  "https://www.facebook.com/gastromasterde",
  "https://www.instagram.com/gastromasterde",
  FOUNDERS.sanjayaPattiyage.linkedin,
  FOUNDERS.reneEbert.linkedin,
] as const;

export const ORG_NODE = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Gastro Master",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-gastro-master.png`,
  foundingDate: "2021",
  description:
    "Kassensystem, eigene Lieferservice-App, Webshop und Webseite für deutsche Restaurants. Provisionsfreie Direktbestellungen, monatlich kündbar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Herzbergstr. 9",
    postalCode: "61250",
    addressLocality: "Usingen",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: ["DE", "AT", "CH"],
    availableLanguage: ["de", "en", "it"],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: "30+" },
  areaServed: { "@type": "Country", name: "Deutschland" },
  sameAs: ORG_SAME_AS,
} as const;

export const WEBSITE_NODE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Gastro Master",
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

/** Build a JSON-LD graph payload with Org + WebSite + optional extra nodes. */
export function buildOrgGraph(extraNodes: object[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [ORG_NODE, WEBSITE_NODE, ...extraNodes],
  };
}
