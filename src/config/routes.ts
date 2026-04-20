/**
 * Single Source of Truth for all page routes.
 * Used by: React Router (App.tsx) + Sitemap Generator (scripts/generate-sitemap.mjs)
 */

export interface RouteEntry {
  /** Path without language prefix, e.g. "/produkte/webshop" */
  path: string;
  /** Lazy import path for the page component */
  importPath: string;
  /** Sitemap priority: 1.0 = Homepage, 0.8 = Products/Solutions, 0.6 = Info, 0.4 = Legal */
  priority: number;
  /** Sitemap change frequency */
  changefreq: "daily" | "weekly" | "monthly";
}

/**
 * All pages that should appear in the sitemap and router.
 * Aliases (e.g. /produkte/bestellapp) are NOT included — only canonical paths.
 */
export const ROUTES: RouteEntry[] = [
  // Homepage
  { path: "/",                                    importPath: "@/pages/Index",                      priority: 1.0, changefreq: "weekly" },

  // Produkte
  { path: "/produkte",                            importPath: "@/pages/ProduktePage",               priority: 0.9, changefreq: "weekly" },
  { path: "/produkte/webshop",                    importPath: "@/pages/WebshopPage",                priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/app",                        importPath: "@/pages/AppPage",                    priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/webseite",                   importPath: "@/pages/WebseitePage",               priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/kassensystem",               importPath: "@/pages/KassePage",                  priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/transaktionsumlage",         importPath: "@/pages/TransaktionsumlagePage",     priority: 0.7, changefreq: "monthly" },

  // Lösungen
  { path: "/loesungen",                           importPath: "@/pages/LoesungenPage",              priority: 0.9, changefreq: "weekly" },
  { path: "/loesungen/lieferservice-gruenden",    importPath: "@/pages/LieferserviceGruendenPage",  priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/franchise",                 importPath: "@/pages/FranchisePage",               priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/restaurant",                importPath: "@/pages/RestaurantPage",              priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/lieferdienst",              importPath: "@/pages/LieferdienstPage",            priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/cafe-baeckerei",            importPath: "@/pages/CafeBaeckereiPage",           priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/ghost-kitchen",             importPath: "@/pages/GhostKitchenPage",            priority: 0.7, changefreq: "weekly" },

  // Add-Ons
  { path: "/add-ons",                             importPath: "@/pages/AddOnsPage",                  priority: 0.85, changefreq: "weekly" },
  { path: "/add-ons/qr-code-flyer",               importPath: "@/pages/add-ons/QRCodeFlyerPage",    priority: 0.7, changefreq: "monthly" },
  { path: "/add-ons/fahrer-app-gps",              importPath: "@/pages/add-ons/FahrerAppGpsPage",   priority: 0.7, changefreq: "monthly" },
  { path: "/add-ons/qr-code-tischsystem",         importPath: "@/pages/add-ons/QRCodeTischsystemPage", priority: 0.7, changefreq: "monthly" },
  { path: "/add-ons/bildschirmfunktion",          importPath: "@/pages/add-ons/BildschirmfunktionPage", priority: 0.7, changefreq: "monthly" },
  { path: "/add-ons/kiosk",                       importPath: "@/pages/add-ons/KioskPage",          priority: 0.7, changefreq: "monthly" },

  // Info-Seiten
  { path: "/faq",                                 importPath: "@/pages/FAQPage",                    priority: 0.7, changefreq: "monthly" },
  { path: "/preise",                              importPath: "@/pages/PreisePage",                  priority: 0.8, changefreq: "weekly" },
  { path: "/uber-uns",                            importPath: "@/pages/UeberUnsPage",                priority: 0.6, changefreq: "monthly" },
  { path: "/integrations",                        importPath: "@/pages/IntegrationPage",             priority: 0.8, changefreq: "weekly" },
  { path: "/kontakt",                             importPath: "@/pages/Kontakt",                     priority: 0.7, changefreq: "monthly" },

  // Downloads
  { path: "/downloads",                           importPath: "@/pages/DownloadsPage",               priority: 0.4, changefreq: "monthly" },
  { path: "/downloads/druckertreiber",            importPath: "@/pages/DruckertreiberPage",           priority: 0.3, changefreq: "monthly" },

  // Legal
  { path: "/impressum",                           importPath: "@/pages/Impressum",                   priority: 0.3, changefreq: "monthly" },
  { path: "/datenschutz",                         importPath: "@/pages/Datenschutz",                 priority: 0.3, changefreq: "monthly" },
  { path: "/agb",                                 importPath: "@/pages/AGB",                         priority: 0.3, changefreq: "monthly" },
];

/** All paths excluding homepage (for sitemap generator) */
export const ROUTE_PATHS = ROUTES.map(r => r.path);

/** Supported languages — re-exported for sitemap script convenience */
export const LANGUAGES = ["de", "en", "it", "fa", "si", "ru"] as const;

export const BASE_URL = "https://gastro-master.de";
