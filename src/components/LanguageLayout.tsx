import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";
import HreflangHead from "@/components/HreflangHead";
import { buildLocalizedPath, translateSlug, type LangCode } from "@/config/routes";

/**
 * Extracts the language from a pathname's first segment (e.g. "/en/products/..." → "en").
 * Returns null if the first segment is not a supported language.
 */
export function extractLangFromPath(pathname: string): SupportedLang | null {
  const seg = pathname.split("/")[1] ?? "";
  return SUPPORTED_LANGS.includes(seg as SupportedLang) ? (seg as SupportedLang) : null;
}

interface LanguageLayoutProps {
  lang: SupportedLang;
}

/**
 * Wrapper for each language's route tree.
 * Receives `lang` as a prop because each language has its own explicit route tree in App.tsx.
 * Syncs i18next to the URL language and renders child routes via <Outlet />.
 */
const LanguageLayout = ({ lang }: LanguageLayoutProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <HreflangHead lang={lang} />
      <Outlet />
    </>
  );
};

export default LanguageLayout;

/**
 * Hook to build language-aware paths.
 * Accepts a DE canonical slug and returns the fully-prefixed URL for the CURRENT language,
 * with the slug translated to that language.
 *
 * Usage: const lp = useLangPath(); <Link to={lp("/produkte/pakete/bestell-app")} />
 *   In /en/ context → "/en/products/packages/ordering-app"
 *   In /it/ context → "/it/prodotti/pacchi/app-ordinazione"
 */
export const useLangPath = () => {
  const { pathname } = useLocation();
  const currentLang = useMemo<LangCode>(
    () => (extractLangFromPath(pathname) ?? "de") as LangCode,
    [pathname],
  );
  return (deSlug: string) => buildLocalizedPath(deSlug, currentLang);
};

/** Hook to get the current language from the URL path. */
export const useCurrentLang = (): SupportedLang => {
  const { pathname } = useLocation();
  return extractLangFromPath(pathname) ?? "de";
};

export { translateSlug };
