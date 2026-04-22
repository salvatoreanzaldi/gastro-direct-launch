import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";
import { ROUTE_BY_LANG_SLUG, type LangCode } from "@/config/routes";

const BASE_URL = "https://gastro-master.de";

interface HreflangHeadProps {
  lang: SupportedLang;
}

/**
 * Injects hreflang <link> tags into <head> for SEO.
 * Each hreflang entry points to the equivalent page in each language using THAT language's
 * localized slug — so /en/... hreflang="it" points to /it/prodotti/... (not /it/produkte/...).
 * Renders nothing — works via useEffect on document.head.
 */
const HreflangHead = ({ lang }: HreflangHeadProps) => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const currentRoute = ROUTE_BY_LANG_SLUG[lang as LangCode]?.[pagePath];

    const links: HTMLLinkElement[] = [];

    for (const lng of SUPPORTED_LANGS) {
      const slugForLng = currentRoute ? currentRoute.slugs[lng as LangCode] : pagePath;
      const pathPart = slugForLng === "/" ? "" : slugForLng;
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lng;
      link.href = `${BASE_URL}/${lng}${pathPart}`;
      document.head.appendChild(link);
      links.push(link);
    }

    const xDefaultSlug = currentRoute ? currentRoute.slugs.de : pagePath;
    const xDefaultPath = xDefaultSlug === "/" ? "" : xDefaultSlug;
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${BASE_URL}/de${xDefaultPath}`;
    document.head.appendChild(xDefault);
    links.push(xDefault);

    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, [lang, location.pathname]);

  return null;
};

export default HreflangHead;
