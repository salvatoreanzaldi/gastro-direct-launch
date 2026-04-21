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
  { path: "/produkte/pakete/online-bestellshop",  importPath: "@/pages/WebshopPage",                priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/pakete/bestell-app",         importPath: "@/pages/AppPage",                    priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/pakete/webseite",            importPath: "@/pages/WebseitePage",               priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/pakete/kassensystem",        importPath: "@/pages/KassePage",                  priority: 0.8, changefreq: "weekly" },
  { path: "/produkte/add-ons/transaktionsumlage",  importPath: "@/pages/TransaktionsumlagePage",     priority: 0.7, changefreq: "monthly" },
  { path: "/produkte/hardware",                   importPath: "@/pages/HardwarePage",               priority: 0.8, changefreq: "monthly" },

  // Lösungen
  { path: "/loesungen",                           importPath: "@/pages/LoesungenPage",              priority: 0.9, changefreq: "weekly" },
  { path: "/loesungen/lieferservice-gruenden",    importPath: "@/pages/LieferserviceGruendenPage",  priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/franchise",                 importPath: "@/pages/FranchisePage",               priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/restaurant",                importPath: "@/pages/RestaurantPage",              priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/lieferdienst",              importPath: "@/pages/LieferdienstPage",            priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/cafe-baeckerei",            importPath: "@/pages/CafeBaeckereiPage",           priority: 0.8, changefreq: "weekly" },
  { path: "/loesungen/ghost-kitchen",             importPath: "@/pages/GhostKitchenPage",            priority: 0.7, changefreq: "weekly" },

  // Add-Ons (unter /produkte/add-ons/)
  { path: "/produkte/add-ons",                             importPath: "@/pages/AddOnsPage",                        priority: 0.85, changefreq: "weekly" },
  { path: "/produkte/add-ons/qr-code-flyer",               importPath: "@/pages/add-ons/QRCodeFlyerPage",          priority: 0.7,  changefreq: "monthly" },
  { path: "/produkte/add-ons/fahrer-app-gps",              importPath: "@/pages/add-ons/FahrerAppGpsPage",         priority: 0.7,  changefreq: "monthly" },
  { path: "/produkte/add-ons/qr-code-tischsystem",         importPath: "@/pages/add-ons/QRCodeTischsystemPage",    priority: 0.7,  changefreq: "monthly" },
  { path: "/produkte/add-ons/bildschirmfunktion",          importPath: "@/pages/add-ons/BildschirmfunktionPage",   priority: 0.7,  changefreq: "monthly" },
  { path: "/produkte/add-ons/kiosk",                       importPath: "@/pages/add-ons/KioskPage",                priority: 0.7,  changefreq: "monthly" },

  // Blog
  { path: "/blog",                               importPath: "@/pages/BlogPage",                                    priority: 0.7, changefreq: "weekly" },
  { path: "/blog/warum-lieferando-verzichten",   importPath: "@/pages/blog/BlogPostLieferandoPage",                priority: 0.6, changefreq: "monthly" },
  { path: "/blog/5-fehler-lieferdienst-eroffnen", importPath: "@/pages/blog/BlogPostFehlerPage",                  priority: 0.6, changefreq: "monthly" },
  { path: "/blog/was-kostet-bestellsystem",      importPath: "@/pages/blog/BlogPostKostenPage",                    priority: 0.6, changefreq: "monthly" },
  { path: "/blog/bestellsystem-gastronomie",    importPath: "@/pages/blog/BlogPostBestellsystemPage",             priority: 0.6, changefreq: "monthly" },
  { path: "/blog/kassensystem-gastronomie",     importPath: "@/pages/blog/BlogPostKassensystemPage",              priority: 0.6, changefreq: "monthly" },
  { path: "/blog/gastronomie-website-erstellen", importPath: "@/pages/blog/BlogPostWebsitePage",                  priority: 0.6, changefreq: "monthly" },
  { path: "/blog/wolt-integration-restaurants", importPath: "@/pages/blog/BlogPostWoltPage",                      priority: 0.6, changefreq: "monthly" },

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
