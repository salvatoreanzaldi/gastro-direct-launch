import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, type ComponentType } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LanguageLayout from "@/components/LanguageLayout";
import { ROUTES } from "@/config/routes";
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

              {/* Legacy routes without lang prefix → redirect to /de/... */}
              <Route path="/produkte/transaktionsumlage" element={<Navigate to="/de/produkte/add-ons/transaktionsumlage" replace />} />
              <Route path="/produkte/*" element={<RedirectWithLang />} />
              <Route path="/loesungen/*" element={<RedirectWithLang />} />
              <Route path="/impressum" element={<Navigate to="/de/impressum" replace />} />
              <Route path="/datenschutz" element={<Navigate to="/de/datenschutz" replace />} />
              <Route path="/agb" element={<Navigate to="/de/agb" replace />} />
              <Route path="/kontakt" element={<Navigate to="/de/kontakt" replace />} />
              <Route path="/faq" element={<Navigate to="/de/faq" replace />} />
              <Route path="/preise" element={<Navigate to="/de/preise" replace />} />
              <Route path="/uber-uns" element={<Navigate to="/de/uber-uns" replace />} />
              <Route path="/downloads/*" element={<RedirectWithLang />} />
              <Route path="/add-ons" element={<Navigate to="/de/produkte/add-ons" replace />} />
              <Route path="/add-ons/:slug" element={<AddOnsLegacyRedirect />} />
              <Route path="/blog/*" element={<RedirectWithLang />} />

              {/* /:lang routes — generated from ROUTES config */}
              <Route path="/:lang" element={<LanguageLayout />}>
                {ROUTES.map((route) => {
                  if (route.path === "/") {
                    return <Route key="index" index element={<Index />} />;
                  }
                  const Component = LAZY_COMPONENTS[route.importPath];
                  if (!Component) return null;
                  return (
                    <Route
                      key={route.path}
                      path={route.path.slice(1)}
                      element={<Component />}
                    />
                  );
                })}
                {/* Legacy: alte /produkte/* Pfade → neue /produkte/pakete/* */}
                <Route path="produkte/webshop"      element={<LangRedirect to="/produkte/pakete/online-bestellshop" />} />
                <Route path="produkte/app"          element={<LangRedirect to="/produkte/pakete/bestell-app" />} />
                <Route path="produkte/webseite"     element={<LangRedirect to="/produkte/pakete/webseite" />} />
                <Route path="produkte/kassensystem" element={<LangRedirect to="/produkte/pakete/kassensystem" />} />
                {/* Alias: /produkte/bestellapp → /produkte/pakete/bestell-app */}
                <Route path="produkte/bestellapp"   element={<LangRedirect to="/produkte/pakete/bestell-app" />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

/** Redirects old product paths to new /produkte/pakete/* structure within same language */
const LangRedirect = ({ to }: { to: string }) => {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang}${to}`} replace />;
};

/** Redirects legacy paths like /produkte/webshop → /de/produkte/webshop */
const RedirectWithLang = () => {
  const path = window.location.pathname;
  return <Navigate to={`/de${path}`} replace />;
};

/** Redirects /add-ons/:slug → /de/produkte/add-ons/:slug */
const AddOnsLegacyRedirect = () => {
  const slug = window.location.pathname.replace(/^\/add-ons\//, "");
  return <Navigate to={`/de/produkte/add-ons/${slug}`} replace />;
};

export default App;
