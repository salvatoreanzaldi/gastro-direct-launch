import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { lazy, Suspense, type ComponentType, createElement } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LanguageLayout, { extractLangFromPath } from "@/components/LanguageLayout";
import {
  ROUTES,
  LANGUAGES,
  type LangCode,
  buildLocalizedPath,
  translateSlug,
} from "@/config/routes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// ─── Lazy Imports (static strings required by Vite) ──────────────────────────
const LAZY_COMPONENTS: Record<string, ComponentType> = {
  "@/pages/ProduktePage":               lazy(() => import("@/pages/ProduktePage")),
  "@/pages/WebshopPage":                lazy(() => import("@/pages/WebshopPage")),
  "@/pages/AppPage":                    lazy(() => import("@/pages/AppPage")),
  "@/pages/WebseitePage":               lazy(() => import("@/pages/WebseitePage")),
  "@/pages/KassePage":                  lazy(() => import("@/pages/KassePage")),
  "@/pages/TransaktionsumlagePage":     lazy(() => import("@/pages/TransaktionsumlagePage")),
  "@/pages/HardwarePage":              lazy(() => import("@/pages/HardwarePage")),
  "@/pages/Impressum":                  lazy(() => import("@/pages/Impressum")),
  "@/pages/Datenschutz":                lazy(() => import("@/pages/Datenschutz")),
  "@/pages/AGB":                        lazy(() => import("@/pages/AGB")),
  "@/pages/Kontakt":                    lazy(() => import("@/pages/Kontakt")),
  "@/pages/DownloadsPage":              lazy(() => import("@/pages/DownloadsPage")),
  "@/pages/DruckertreiberPage":         lazy(() => import("@/pages/DruckertreiberPage")),
  "@/pages/LieferserviceGruendenPage":  lazy(() => import("@/pages/LieferserviceGruendenPage")),
  "@/pages/FranchisePage":              lazy(() => import("@/pages/FranchisePage")),
  "@/pages/RestaurantPage":             lazy(() => import("@/pages/RestaurantPage")),
  "@/pages/LieferdienstPage":           lazy(() => import("@/pages/LieferdienstPage")),
  "@/pages/CafeBaeckereiPage":          lazy(() => import("@/pages/CafeBaeckereiPage")),
  "@/pages/LoesungenPage":              lazy(() => import("@/pages/LoesungenPage")),
  "@/pages/FAQPage":                    lazy(() => import("@/pages/FAQPage")),
  "@/pages/PreisePage":                 lazy(() => import("@/pages/PreisePage")),
  "@/pages/UeberUnsPage":               lazy(() => import("@/pages/UeberUnsPage")),
  "@/pages/GhostKitchenPage":           lazy(() => import("@/pages/GhostKitchenPage")),
  "@/pages/IntegrationPage":            lazy(() => import("@/pages/IntegrationPage")),

  // Blog
  "@/pages/BlogPage":                            lazy(() => import("@/pages/BlogPage")),
  "@/pages/blog/BlogPostDetailPage":             lazy(() => import("@/pages/blog/BlogPostDetailPage")),
  "@/pages/blog/BlogPostLieferandoPage":         lazy(() => import("@/pages/blog/BlogPostLieferandoPage")),
  "@/pages/blog/BlogPostFehlerPage":             lazy(() => import("@/pages/blog/BlogPostFehlerPage")),
  "@/pages/blog/BlogPostKostenPage":             lazy(() => import("@/pages/blog/BlogPostKostenPage")),
  "@/pages/blog/BlogPostBestellsystemPage":     lazy(() => import("@/pages/blog/BlogPostBestellsystemPage")),
  "@/pages/blog/BlogPostKassensystemPage":      lazy(() => import("@/pages/blog/BlogPostKassensystemPage")),
  "@/pages/blog/BlogPostWebsitePage":           lazy(() => import("@/pages/blog/BlogPostWebsitePage")),
  "@/pages/blog/BlogPostWoltPage":              lazy(() => import("@/pages/blog/BlogPostWoltPage")),

  // Add-Ons
  "@/pages/AddOnsPage":                 lazy(() => import("@/pages/AddOnsPage")),
  "@/pages/add-ons/QRCodeFlyerPage":    lazy(() => import("@/pages/add-ons/QRCodeFlyerPage")),
  "@/pages/add-ons/FahrerAppGpsPage":   lazy(() => import("@/pages/add-ons/FahrerAppGpsPage")),
  "@/pages/add-ons/QRCodeTischsystemPage": lazy(() => import("@/pages/add-ons/QRCodeTischsystemPage")),
  "@/pages/add-ons/BildschirmfunktionPage": lazy(() => import("@/pages/add-ons/BildschirmfunktionPage")),
  "@/pages/add-ons/KioskPage":          lazy(() => import("@/pages/add-ons/KioskPage")),
};

const queryClient = new QueryClient();

/** Build the child routes for a single language tree. */
const buildLangRoutes = (lang: LangCode) =>
  ROUTES.flatMap((route) => {
    const Component = route.slugs[lang] === "/" ? Index : LAZY_COMPONENTS[route.importPath];
    if (!Component) return [];

    const targetSlug = route.slugs[lang];
    const isHome = targetSlug === "/";
    const canonicalPath = isHome ? null : targetSlug.slice(1); // strip leading "/"

    const elements = [] as JSX.Element[];

    // Canonical route (translated slug)
    if (isHome) {
      elements.push(<Route key={`${lang}-${route.key}-index`} index element={<Component />} />);
    } else {
      elements.push(
        <Route key={`${lang}-${route.key}`} path={canonicalPath!} element={<Component />} />,
      );
    }

    // Legacy redirect: if user visits this lang's tree with the DE slug, redirect to translated slug
    // (SEO: ensures old DE-slug URLs under /en/, /it/, ... redirect to localized slugs)
    if (lang !== "de" && route.slugs.de !== targetSlug && route.slugs.de !== "/") {
      const deChild = route.slugs.de.slice(1);
      elements.push(
        <Route
          key={`${lang}-${route.key}-legacy-de`}
          path={deChild}
          element={<Navigate to={`/${lang}${targetSlug}`} replace />}
        />,
      );
    }

    return elements;
  });

/** Legacy-structure aliases (old URL scheme like /produkte/webshop) — registered within each lang tree. */
const LEGACY_ALIASES: Array<{ from: string; to: string }> = [
  { from: "produkte/webshop",      to: "/produkte/pakete/online-bestellshop" },
  { from: "produkte/app",          to: "/produkte/pakete/bestell-app" },
  { from: "produkte/webseite",     to: "/produkte/pakete/webseite" },
  { from: "produkte/kassensystem", to: "/produkte/pakete/kassensystem" },
  { from: "produkte/bestellapp",   to: "/produkte/pakete/bestell-app" },
  // Alt-Pfad: /produkte/transaktionsumlage → neue /produkte/add-ons/transaktionsumlage
  { from: "produkte/transaktionsumlage", to: "/produkte/add-ons/transaktionsumlage" },
];

const buildLegacyAliasRoutes = (lang: LangCode) =>
  LEGACY_ALIASES.map(({ from, to }) => (
    <Route
      key={`${lang}-alias-${from}`}
      path={from}
      element={<Navigate to={buildLocalizedPath(to, lang)} replace />}
    />
  ));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton />
          <Suspense fallback={null}>
            <Routes>
              {/* Root redirect → /de/ */}
              <Route path="/" element={<Navigate to="/de" replace />} />

              {/* Legacy routes without lang prefix → redirect to /de/... (localized) */}
              <Route path="/produkte/*"  element={<LegacyNoLangRedirect />} />
              <Route path="/loesungen/*" element={<LegacyNoLangRedirect />} />
              <Route path="/downloads/*" element={<LegacyNoLangRedirect />} />
              <Route path="/blog/*"      element={<LegacyNoLangRedirect />} />
              <Route path="/add-ons"     element={<Navigate to="/de/produkte/add-ons" replace />} />
              <Route path="/add-ons/:slug" element={<AddOnsLegacyRedirect />} />
              <Route path="/impressum"   element={<Navigate to="/de/impressum" replace />} />
              <Route path="/datenschutz" element={<Navigate to="/de/datenschutz" replace />} />
              <Route path="/agb"         element={<Navigate to="/de/agb" replace />} />
              <Route path="/kontakt"     element={<Navigate to="/de/kontakt" replace />} />
              <Route path="/faq"         element={<Navigate to="/de/faq" replace />} />
              <Route path="/preise"      element={<Navigate to="/de/preise" replace />} />
              <Route path="/uber-uns"    element={<Navigate to="/de/uber-uns" replace />} />

              {/* Umlaut-Schreibweise → ASCII-Variante (Legacy-Schutz für externe Links) */}
              <Route path="/ueber-uns"     element={<Navigate to="/de/uber-uns" replace />} />
              <Route path="/de/ueber-uns"  element={<Navigate to="/de/uber-uns" replace />} />

              {/* One explicit route tree per language with its localized slugs */}
              {LANGUAGES.map((lang) => (
                <Route key={lang} path={`/${lang}`} element={<LanguageLayout lang={lang} />}>
                  {buildLangRoutes(lang)}
                  {buildLegacyAliasRoutes(lang)}
                  {/* Dynamic blog post route — DE serves content, other locales redirect to /de/blog/:slug */}
                  <Route
                    path="blog/:slug"
                    element={
                      lang === "de"
                        ? <Suspense fallback={null}>{createElement(LAZY_COMPONENTS["@/pages/blog/BlogPostDetailPage"]!)}</Suspense>
                        : <BlogLocaleRedirect />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

/**
 * Redirects no-lang legacy paths to /de/ with slug translation (DE→DE is identity).
 * Handles cases like `/produkte/pakete/bestell-app` → `/de/produkte/pakete/bestell-app`.
 */
const LegacyNoLangRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/de${location.pathname}${location.search}${location.hash}`} replace />;
};

/** Redirects non-DE blog URLs to /de/blog/:slug (client-side fallback for Vercel redirect). */
const BlogLocaleRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/de/blog/${slug}`} replace />;
};

/** Redirects /add-ons/:slug → /{currentLang}/produkte/add-ons/:slug (lang-aware). */
const AddOnsLegacyRedirect = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/add-ons\//, "");
  const lang = extractLangFromPath(location.pathname) ?? "de";
  const deSlug = `/produkte/add-ons/${slug}`;
  return <Navigate to={`/${lang}${translateSlug(deSlug, lang as LangCode)}`} replace />;
};

export default App;
