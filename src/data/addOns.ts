/**
 * Single Source of Truth for Gastro Master Add-Ons.
 * Sourced from src/pages/AddOnsPage.tsx (href list) +
 * public/locales/de/{addons-hub,qr-code-flyer,fahrer-app,qr-code-tischsystem,bildschirmfunktion}.json
 *
 * Each add-on is modeled as a Schema.org Product that
 * isAccessoryOrSparePartFor → the @id of the host package(s).
 */

import { SITE_URL, ORG_ID } from "./schemaOrg";
import { PACKAGES } from "./packages";

const PACKAGE_BY_NAME = Object.fromEntries(PACKAGES.map((p) => [p.name, p]));

/** Resolve a list of package names to their @id references. */
function refs(...packageNames: string[]) {
  return packageNames
    .map((n) => PACKAGE_BY_NAME[n])
    .filter(Boolean)
    .map((p) => ({ "@id": p!.id }));
}

export interface AddOnNode {
  /** Stable @id. */
  id: string;
  /** Public name (DE). */
  name: string;
  /** URL slug under /produkte/add-ons/. */
  slug: string;
  /** Description (DE) — derived from existing AddOnsPage copy / i18n hub. */
  description: string;
  /** Package @id refs that this add-on extends. */
  isAccessoryOrSparePartFor: ReadonlyArray<{ "@id": string }>;
}

export const ADD_ONS: readonly AddOnNode[] = [
  {
    id: `${SITE_URL}/produkte/add-ons/qr-code-flyer#product`,
    name: "QR-Code-Flyer",
    slug: "/produkte/add-ons/qr-code-flyer",
    description:
      "Gedruckte Flyer mit QR-Code, der direkt in den eigenen Webshop führt – als Akquise- und Reaktivierungs-Hebel für Bestandskunden.",
    isAccessoryOrSparePartFor: refs(
      "Starter (Bestellsystem)",
      "Business (App + Bestellsystem)",
    ),
  },
  {
    id: `${SITE_URL}/produkte/add-ons/fahrer-app-gps#product`,
    name: "Fahrer-App mit GPS",
    slug: "/produkte/add-ons/fahrer-app-gps",
    description:
      "GPS-Tracking-App für Auslieferer: Bestellungen zuweisen, Lieferzeiten messen, Tour-Übersicht für Restaurant-Personal.",
    isAccessoryOrSparePartFor: refs(
      "Business (App + Bestellsystem)",
      "Starter (Bestellsystem)",
    ),
  },
  {
    id: `${SITE_URL}/produkte/add-ons/qr-code-tischsystem#product`,
    name: "QR-Code-Tischsystem",
    slug: "/produkte/add-ons/qr-code-tischsystem",
    description:
      "QR-Code am Tisch: Gäste scannen, sehen die Speisekarte und bestellen direkt – ohne Wartezeit, ohne zusätzlichen Personalaufwand.",
    isAccessoryOrSparePartFor: refs("Kassensystem", "Business (App + Bestellsystem)"),
  },
  {
    id: `${SITE_URL}/produkte/add-ons/bildschirmfunktion#product`,
    name: "Bildschirmfunktion (Kitchen Display)",
    slug: "/produkte/add-ons/bildschirmfunktion",
    description:
      "Küchen-Bildschirm zeigt eingehende Bestellungen in Echtzeit – ersetzt Bonpapier, beschleunigt den Tresen-Workflow.",
    isAccessoryOrSparePartFor: refs("Kassensystem", "Business (App + Bestellsystem)"),
  },
  {
    id: `${SITE_URL}/produkte/add-ons/kiosk#product`,
    name: "Kiosk Self-Ordering",
    slug: "/produkte/add-ons/kiosk",
    description:
      "Self-Ordering-Terminal für Restaurants und Schnellgastronomie: Gäste bestellen autark, Personal-Kapazität wird auf Service umverteilt.",
    isAccessoryOrSparePartFor: refs("Kassensystem", "Business (App + Bestellsystem)"),
  },
];

/** Build a Schema.org Product node for one add-on. */
export function buildAddOnProductNode(addOn: AddOnNode) {
  return {
    "@type": "Product",
    "@id": addOn.id,
    name: `Gastro Master ${addOn.name}`,
    description: addOn.description,
    url: `${SITE_URL}${addOn.slug}`,
    brand: { "@id": ORG_ID },
    isAccessoryOrSparePartFor: [...addOn.isAccessoryOrSparePartFor],
  };
}

/** Build an OfferCatalog of all add-ons for the /produkte/add-ons hub page. */
export function buildAddOnsCatalogNode() {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/produkte/add-ons#catalog`,
    name: "Gastro Master Add-Ons",
    itemListElement: ADD_ONS.map((addOn) => ({
      "@type": "Offer",
      itemOffered: { "@id": addOn.id },
      url: `${SITE_URL}${addOn.slug}`,
    })),
  };
}
