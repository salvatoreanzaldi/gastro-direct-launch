/**
 * Single Source of Truth for all page routes.
 * Used by: React Router (App.tsx) + Sitemap Generator (scripts/generate-sitemap.mjs) + useLangPath helper.
 *
 * Each route has a stable `key` and language-specific slug variants.
 * The DE slug acts as the "canonical input" for useLangPath(lp("/produkte/pakete/bestell-app"))
 * — useLangPath translates it to the correct target-language slug.
 */

export const LANGUAGES = ["de", "en", "it", "fa", "si", "ru"] as const;
export type LangCode = (typeof LANGUAGES)[number];

export type SlugMap = Record<LangCode, string>;

export interface RouteEntry {
  /** Stable identifier for this page (used internally only) */
  key: string;
  /** Path without language prefix, per language (e.g. { de: "/produkte/...", en: "/products/..." }) */
  slugs: SlugMap;
  /** Lazy import path for the page component */
  importPath: string;
  /** Sitemap priority: 1.0 = Homepage, 0.8 = Products/Solutions, 0.6 = Info, 0.4 = Legal */
  priority: number;
  /** Sitemap change frequency */
  changefreq: "daily" | "weekly" | "monthly";
}

/**
 * Helper: same slug for all non-EN/IT languages (FA/SI/RU use EN slug since no non-Latin chars allowed).
 */
const slugs = (de: string, en: string, it: string): SlugMap => ({
  de, en, it, fa: en, si: en, ru: en,
});

/**
 * All pages that should appear in the sitemap and router.
 */
export const ROUTES: RouteEntry[] = [
  // Homepage
  { key: "home", slugs: { de: "/", en: "/", it: "/", fa: "/", si: "/", ru: "/" },
    importPath: "@/pages/Index", priority: 1.0, changefreq: "weekly" },

  // Produkte
  { key: "produkte", slugs: slugs("/produkte", "/products", "/prodotti"),
    importPath: "@/pages/ProduktePage", priority: 0.9, changefreq: "weekly" },
  { key: "online-shop", slugs: slugs("/produkte/pakete/online-bestellshop", "/products/packages/online-shop", "/prodotti/pacchi/negozio-online"),
    importPath: "@/pages/WebshopPage", priority: 0.8, changefreq: "weekly" },
  { key: "ordering-app", slugs: slugs("/produkte/pakete/bestell-app", "/products/packages/ordering-app", "/prodotti/pacchi/app-ordinazione"),
    importPath: "@/pages/AppPage", priority: 0.8, changefreq: "weekly" },
  { key: "website", slugs: slugs("/produkte/pakete/webseite", "/products/packages/website", "/prodotti/pacchi/sito-web"),
    importPath: "@/pages/WebseitePage", priority: 0.8, changefreq: "weekly" },
  { key: "pos-system", slugs: slugs("/produkte/pakete/kassensystem", "/products/packages/pos-system", "/prodotti/pacchi/sistema-pos"),
    importPath: "@/pages/KassePage", priority: 0.8, changefreq: "weekly" },
  { key: "transaction-fee-sharing", slugs: slugs("/produkte/add-ons/transaktionsumlage", "/products/add-ons/transaction-fee-sharing", "/prodotti/componenti-aggiuntivi/riporto-transazione"),
    importPath: "@/pages/TransaktionsumlagePage", priority: 0.7, changefreq: "monthly" },
  { key: "hardware", slugs: slugs("/produkte/hardware", "/products/hardware", "/prodotti/hardware"),
    importPath: "@/pages/HardwarePage", priority: 0.8, changefreq: "monthly" },

  // Lösungen
  { key: "loesungen", slugs: slugs("/loesungen", "/solutions", "/soluzioni"),
    importPath: "@/pages/LoesungenPage", priority: 0.9, changefreq: "weekly" },
  { key: "start-delivery", slugs: slugs("/loesungen/lieferservice-gruenden", "/solutions/start-delivery-service", "/soluzioni/avvia-servizio-consegna"),
    importPath: "@/pages/LieferserviceGruendenPage", priority: 0.8, changefreq: "weekly" },
  { key: "franchise", slugs: slugs("/loesungen/franchise", "/solutions/franchise", "/soluzioni/franchising"),
    importPath: "@/pages/FranchisePage", priority: 0.8, changefreq: "weekly" },
  { key: "restaurant", slugs: slugs("/loesungen/restaurant", "/solutions/restaurant", "/soluzioni/ristorante"),
    importPath: "@/pages/RestaurantPage", priority: 0.8, changefreq: "weekly" },
  { key: "delivery", slugs: slugs("/loesungen/lieferdienst", "/solutions/delivery-service", "/soluzioni/servizio-consegna"),
    importPath: "@/pages/LieferdienstPage", priority: 0.8, changefreq: "weekly" },
  { key: "cafe-bakery", slugs: slugs("/loesungen/cafe-baeckerei", "/solutions/cafe-bakery", "/soluzioni/caffetteria-panetteria"),
    importPath: "@/pages/CafeBaeckereiPage", priority: 0.8, changefreq: "weekly" },
  { key: "ghost-kitchen", slugs: slugs("/loesungen/ghost-kitchen", "/solutions/ghost-kitchen", "/soluzioni/cucina-fantasma"),
    importPath: "@/pages/GhostKitchenPage", priority: 0.7, changefreq: "weekly" },

  // Add-Ons (unter /produkte/add-ons/)
  { key: "add-ons", slugs: slugs("/produkte/add-ons", "/products/add-ons", "/prodotti/componenti-aggiuntivi"),
    importPath: "@/pages/AddOnsPage", priority: 0.85, changefreq: "weekly" },
  { key: "qr-flyer", slugs: slugs("/produkte/add-ons/qr-code-flyer", "/products/add-ons/qr-code-flyer", "/prodotti/componenti-aggiuntivi/volantino-qr"),
    importPath: "@/pages/add-ons/QRCodeFlyerPage", priority: 0.7, changefreq: "monthly" },
  { key: "driver-app-gps", slugs: slugs("/produkte/add-ons/fahrer-app-gps", "/products/add-ons/driver-app-gps", "/prodotti/componenti-aggiuntivi/app-autista-gps"),
    importPath: "@/pages/add-ons/FahrerAppGpsPage", priority: 0.7, changefreq: "monthly" },
  { key: "qr-table-system", slugs: slugs("/produkte/add-ons/qr-code-tischsystem", "/products/add-ons/qr-table-system", "/prodotti/componenti-aggiuntivi/sistema-tavolo-qr"),
    importPath: "@/pages/add-ons/QRCodeTischsystemPage", priority: 0.7, changefreq: "monthly" },
  { key: "kitchen-display", slugs: slugs("/produkte/add-ons/bildschirmfunktion", "/products/add-ons/kitchen-display", "/prodotti/componenti-aggiuntivi/display-cucina"),
    importPath: "@/pages/add-ons/BildschirmfunktionPage", priority: 0.7, changefreq: "monthly" },
  { key: "kiosk", slugs: slugs("/produkte/add-ons/kiosk", "/products/add-ons/self-service-kiosk", "/prodotti/componenti-aggiuntivi/chiosco-self-service"),
    importPath: "@/pages/add-ons/KioskPage", priority: 0.7, changefreq: "monthly" },

  // Blog
  { key: "blog", slugs: slugs("/blog", "/blog", "/blog"),
    importPath: "@/pages/BlogPage", priority: 0.7, changefreq: "weekly" },
  { key: "blog-lieferando", slugs: slugs("/blog/warum-lieferando-verzichten", "/blog/why-skip-lieferando", "/blog/perche-evitare-lieferando"),
    importPath: "@/pages/blog/BlogPostLieferandoPage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-5-mistakes", slugs: slugs("/blog/5-fehler-lieferdienst-eroffnen", "/blog/5-delivery-startup-mistakes", "/blog/5-errori-avvio-servizio-consegna"),
    importPath: "@/pages/blog/BlogPostFehlerPage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-ordering-cost", slugs: slugs("/blog/was-kostet-bestellsystem", "/blog/ordering-system-cost", "/blog/costo-sistema-ordinazione"),
    importPath: "@/pages/blog/BlogPostKostenPage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-ordering-system", slugs: slugs("/blog/bestellsystem-gastronomie", "/blog/ordering-system-gastronomy", "/blog/sistema-ordinazione-ristorazione"),
    importPath: "@/pages/blog/BlogPostBestellsystemPage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-pos-system", slugs: slugs("/blog/kassensystem-gastronomie", "/blog/pos-system", "/blog/sistema-cassa"),
    importPath: "@/pages/blog/BlogPostKassensystemPage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-restaurant-website", slugs: slugs("/blog/gastronomie-website-erstellen", "/blog/restaurant-website", "/blog/sito-web-ristorante"),
    importPath: "@/pages/blog/BlogPostWebsitePage", priority: 0.6, changefreq: "monthly" },
  { key: "blog-wolt-integration", slugs: slugs("/blog/wolt-integration-restaurants", "/blog/wolt-integration", "/blog/integrazione-wolt"),
    importPath: "@/pages/blog/BlogPostWoltPage", priority: 0.6, changefreq: "monthly" },

  // Info-Seiten
  { key: "faq", slugs: slugs("/faq", "/faq", "/faq"),
    importPath: "@/pages/FAQPage", priority: 0.7, changefreq: "monthly" },
  { key: "pricing", slugs: slugs("/preise", "/pricing", "/prezzi"),
    importPath: "@/pages/PreisePage", priority: 0.8, changefreq: "weekly" },
  { key: "about-us", slugs: slugs("/uber-uns", "/about-us", "/chi-siamo"),
    importPath: "@/pages/UeberUnsPage", priority: 0.6, changefreq: "monthly" },
  { key: "integrations", slugs: slugs("/integrations", "/integrations", "/integrazioni"),
    importPath: "@/pages/IntegrationPage", priority: 0.8, changefreq: "weekly" },
  { key: "contact", slugs: slugs("/kontakt", "/contact", "/contatto"),
    importPath: "@/pages/Kontakt", priority: 0.7, changefreq: "monthly" },

  // Downloads
  { key: "downloads", slugs: slugs("/downloads", "/downloads", "/download"),
    importPath: "@/pages/DownloadsPage", priority: 0.4, changefreq: "monthly" },
  { key: "printer-drivers", slugs: slugs("/downloads/druckertreiber", "/downloads/printer-drivers", "/download/driver-stampante"),
    importPath: "@/pages/DruckertreiberPage", priority: 0.3, changefreq: "monthly" },

  // Legal
  { key: "imprint", slugs: slugs("/impressum", "/imprint", "/note-legali"),
    importPath: "@/pages/Impressum", priority: 0.3, changefreq: "monthly" },
  { key: "privacy", slugs: slugs("/datenschutz", "/privacy-policy", "/privacy"),
    importPath: "@/pages/Datenschutz", priority: 0.3, changefreq: "monthly" },
  { key: "terms", slugs: slugs("/agb", "/terms", "/termini-condizioni"),
    importPath: "@/pages/AGB", priority: 0.3, changefreq: "monthly" },
];

/**
 * Fast lookup table: DE slug → RouteEntry.
 * Used by useLangPath to translate a DE canonical slug to any target language.
 */
export const ROUTE_BY_DE_SLUG: Record<string, RouteEntry> = Object.fromEntries(
  ROUTES.map((r) => [r.slugs.de, r]),
);

/**
 * Fast lookup: for each language, a map from that language's slug → route key.
 * Used to detect the current route from window.location when switching language.
 */
export const ROUTE_BY_LANG_SLUG: Record<LangCode, Record<string, RouteEntry>> = {
  de: {}, en: {}, it: {}, fa: {}, si: {}, ru: {},
};
for (const route of ROUTES) {
  for (const lang of LANGUAGES) {
    ROUTE_BY_LANG_SLUG[lang][route.slugs[lang]] = route;
  }
}

/**
 * Translate a DE canonical slug (e.g. "/produkte/pakete/bestell-app") to the target language's slug.
 * If the DE slug is not found in the config, returns the input unchanged (safe fallback for legacy aliases).
 */
export function translateSlug(deSlug: string, targetLang: LangCode): string {
  const route = ROUTE_BY_DE_SLUG[deSlug];
  if (!route) return deSlug;
  return route.slugs[targetLang];
}

/** Build a fully-prefixed localized URL, e.g. /en/products/packages/ordering-app */
export function buildLocalizedPath(deSlug: string, lang: LangCode): string {
  const translated = translateSlug(deSlug, lang);
  if (translated === "/") return `/${lang}`;
  return `/${lang}${translated}`;
}

/** All DE paths (for backwards compatibility / sitemap legacy consumers) */
export const ROUTE_PATHS = ROUTES.map((r) => r.slugs.de);

export const BASE_URL = "https://gastro-master.de";
