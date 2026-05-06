import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const distDir = join(ROOT, 'dist');
const SITE_URL = 'https://gastro-master.de';
const LANGUAGES = ['de', 'en', 'it', 'fa', 'si', 'ru'];
const DEFAULT_LANG = 'de';

// ─── Parse routes from TypeScript config (mirrors generate-sitemap.mjs) ──────
const configSource = readFileSync(resolve(ROOT, 'src/config/routes.ts'), 'utf-8');

const helperRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*slugs\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

const explicitRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*\{\s*de:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*it:\s*"([^"]+)",\s*fa:\s*"([^"]+)",\s*si:\s*"([^"]+)",\s*ru:\s*"([^"]+)"\s*\}\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

const routes = [];
let m;
while ((m = helperRegex.exec(configSource)) !== null) {
  const [, key, de, en, it] = m;
  routes.push({ key, slugs: { de, en, it, fa: en, si: en, ru: en } });
}
while ((m = explicitRegex.exec(configSource)) !== null) {
  const [, key, de, en, it, fa, si, ru] = m;
  routes.push({ key, slugs: { de, en, it, fa, si, ru } });
}
if (routes.length === 0) {
  console.error('❌ No routes parsed from src/config/routes.ts');
  process.exit(1);
}

const routeByDeSlug = new Map(routes.map((r) => [r.slugs.de, r]));

const buildHref = (lang, slug) => {
  const pathPart = slug === '/' ? '' : slug;
  return `${SITE_URL}/${lang}${pathPart}`;
};

// Returns hreflang <link> tags (one per language + x-default) for the given DE-canonical slug.
// Falls back to root URLs when the slug is unknown (e.g. for the root index.html which
// represents all language landing pages combined).
const buildHreflangTags = (deSlug) => {
  const route = routeByDeSlug.get(deSlug) ?? { slugs: Object.fromEntries(LANGUAGES.map((l) => [l, '/'])) };
  const langTags = LANGUAGES.map(
    (lang) => `  <link rel="alternate" hreflang="${lang}" href="${buildHref(lang, route.slugs[lang])}" />`,
  ).join('\n');
  const xDefault = `  <link rel="alternate" hreflang="x-default" href="${buildHref(DEFAULT_LANG, route.slugs[DEFAULT_LANG])}" />`;
  return `${langTags}\n${xDefault}`;
};

// ─── Read base index.html and SEO metadata ───────────────────────────────────
// Strip any prior hreflang/canonical injections so the script is idempotent
// (otherwise re-running locally without `vite build` would accumulate tags).
let baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')
  // Strip prior hreflang alternates (have hreflang="...") but keep
  // type="application/rss+xml" alternates intact.
  .replace(/\n?\s*<link rel="alternate"[^>]*\shreflang="[^"]+"[^>]*\/?>/g, '')
  .replace(/\n?\s*<link rel="canonical"[^>]+>/g, '');

// ─── Reviews + Founders metadata (used by AggregateRating + Person schemas) ─
const reviewsData = JSON.parse(
  readFileSync(resolve(ROOT, 'public/data/google-reviews.json'), 'utf-8'),
);
const REVIEW_META = reviewsData?.meta ?? { totalCount: 0, totalRating: 0 };

const FOUNDERS = [
  {
    name: 'René Ebert',
    jobTitle: 'Gründer & CEO',
    sameAs: ['https://www.linkedin.com/in/rene-ebert/'],
  },
  {
    name: 'Sanjaya Pattiyage',
    jobTitle: 'Gründer & CEO',
    sameAs: ['https://www.linkedin.com/in/sanjaya-pattiyage/'],
  },
];

const personSchemaByName = new Map(
  FOUNDERS.map((f) => [
    f.name,
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person-${f.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`,
      name: f.name,
      jobTitle: f.jobTitle,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: f.sameAs,
    },
  ]),
);

// ─── Package catalogue (mirrors public/llms.txt — single source of truth for AI) ──
// Each package becomes a Service node with an Offer in the @graph. AI engines
// answering "Was kostet ein Bestellsystem?" can cite these directly.
//
// `i18nKey` ↔ productShowcase.products.<id> in public/locales/<lang>/common.json
// gives us localised package names in 6 languages without manual translation.
//
// `features` is a structured array (not parsed from description) so localisation
// + bullet rendering stay robust even when descriptions get rewritten.
//
// `assetMatch` is a substring used at build time to glob the Vite-hashed
// product image (dist/assets/{assetMatch}*.png).
const PACKAGES = [
  {
    key: 'webseite',
    i18nKey: 'webseite',
    name: 'Webseite',
    description:
      'Professionelle Restaurant-Website ohne Bestellfunktion. Mindestvertragslaufzeit 12 Monate.',
    features: [
      'Professionelles Design',
      'Mobile-optimiert',
      'SEO-Grundausstattung',
      'Eigene Domain',
      'Mindestvertragslaufzeit 12 Monate',
    ],
    price: '49',
    url: '/produkte/pakete/webseite',
    assetMatch: 'Webseite - Produkt',
  },
  {
    key: 'starter',
    i18nKey: 'online-shop',
    name: 'Starter / Bestellsystem',
    description:
      'Webshop mit 0 % Provision, eigene Domain, digitale Speisekarte, unbegrenzte Bestellungen, 2.500 Flyer mit QR-Code.',
    features: [
      '0 % Provision',
      'Eigene Domain',
      'Digitale Speisekarte',
      'Unbegrenzte Bestellungen',
      '2.500 Flyer mit QR-Code inklusive',
      'Monatlich kündbar',
    ],
    price: '79',
    url: '/produkte/pakete/online-bestellshop',
    assetMatch: 'Webshop - Produkt',
  },
  {
    key: 'business',
    i18nKey: 'app-system',
    name: 'Business / App + Bestellsystem',
    description:
      'Webshop + native App, Push-Benachrichtigungen, 5.000 Flyer mit QR-Code.',
    features: [
      'Alles aus Starter',
      'Native iOS- und Android-App',
      'Push-Benachrichtigungen',
      '5.000 Flyer mit QR-Code inklusive',
      'App-Store-Submission inklusive',
      '0 % Provision',
    ],
    price: '149',
    url: '/produkte/pakete/bestell-app',
    assetMatch: 'App - Produkt',
  },
  {
    key: 'kassensystem',
    i18nKey: 'kasse',
    name: 'Kassensystem',
    description:
      'TSE-zertifiziert, GoBD-konform, bis zu 4 Kassen mit einer Lizenz, Cloud-Updates.',
    features: [
      'TSE-zertifiziert',
      'GoBD-konform',
      'Bis zu 4 Kassen mit einer Lizenz',
      'Cloud-Updates',
      'DATEV-Export',
    ],
    price: '69',
    url: '/produkte/pakete/kassensystem',
    assetMatch: 'Kasse - Produkt',
  },
  {
    key: 'enterprise',
    i18nKey: null,
    name: 'Enterprise',
    description:
      'Franchise- und Mehr-Standorte-Setup: individuelles Design, Cloud-Kasse, Transaktionsumlage inklusive. Preis nach Projektumfang.',
    features: [
      'Individuelles Design',
      'Cloud-Kasse für Multi-Standorte',
      'Transaktionsumlage inklusive',
      'Franchise-Setup',
      'Dedicated Onboarding',
    ],
    // No fixed price — custom-quote tier. Schema below uses PriceSpecification
    // without a numeric price so AI engines see "available, custom quote".
    price: null,
    url: '/produkte/pakete/enterprise',
    assetMatch: null,
  },
];

// Resolve hashed Vite asset filename (e.g. "Webseite - Produkt-ntCPjsyM.png")
// from a stable substring prefix. Returns absolute URL or null when not found.
// Note: must run AFTER vite build (depends on dist/assets/ existing).
const ASSETS_DIR = join(distDir, 'assets');
let assetCache = null;
const resolveAssetUrl = (matchPrefix) => {
  if (!matchPrefix || !existsSync(ASSETS_DIR)) return null;
  if (!assetCache) {
    assetCache = readdirSync(ASSETS_DIR);
  }
  const found = assetCache.find(
    (f) => f.startsWith(matchPrefix) && /\.(png|jpe?g|webp|avif)$/i.test(f),
  );
  return found ? `${SITE_URL}/assets/${encodeURIComponent(found)}` : null;
};

// Resolve image URL for a package: real product mockup if available,
// fall back to logo (Schema.org Product.image is required).
const packageImageUrl = (pkg) => resolveAssetUrl(pkg.assetMatch) ?? `${SITE_URL}/logo-gastro-master.png`;

// Build per-language localised name map: PACKAGES.key → { de, en, it, fa, si, ru }.
// Reads from i18n productShowcase.products.<i18nKey>.title — already migrated
// in 6 languages. Falls back to PACKAGES.name (German) when no mapping exists.
const localizedPackageName = (pkg, lang) => {
  if (!pkg.i18nKey) return pkg.name;
  try {
    const bundle = JSON.parse(
      readFileSync(resolve(ROOT, `public/locales/${lang}/common.json`), 'utf-8'),
    );
    return bundle?.productShowcase?.products?.[pkg.i18nKey]?.title ?? pkg.name;
  } catch {
    return pkg.name;
  }
};

const buildServiceNodes = () =>
  PACKAGES.map((p) => {
    const offer = p.price
      ? {
          "@type": "Offer",
          "@id": `${SITE_URL}${p.url}#offer`,
          price: p.price,
          priceCurrency: 'EUR',
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.price,
            priceCurrency: 'EUR',
            unitCode: 'MON',
            referenceQuantity: { "@type": "QuantitativeValue", value: '1', unitCode: 'MON' },
          },
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${p.url}`,
        }
      : {
          // Custom-quote tier: PriceSpecification without numeric price
          // signals "available, contact for pricing" to AI engines.
          "@type": "Offer",
          "@id": `${SITE_URL}${p.url}#offer`,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: 'EUR',
            description: 'Preis nach Projektumfang',
          },
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${p.url}`,
        };
    return {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-${p.key}`,
      name: p.name,
      description: p.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: 'Restaurant Software',
      areaServed: ['DE', 'AT', 'CH'],
      offers: offer,
    };
  });

const buildSoftwareApplicationNode = () => ({
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software-application`,
  name: 'Gastro Master',
  description:
    'Provisionsfreies Bestellsystem, eigene Lieferservice-App, Webshop, Webseite und Kassensystem für Restaurants im DACH-Raum.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Restaurant Management Software',
  operatingSystem: 'Web, iOS, Android',
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(REVIEW_META.totalRating || 5),
    reviewCount: REVIEW_META.totalCount || 0,
    bestRating: '5',
    worstRating: '1',
  },
  offers: PACKAGES.map((p) => ({ "@id": `${SITE_URL}${p.url}#offer` })),
});

// Truncate review text to a reasonable length for JSON-LD (Google docs
// suggest <= 5000 chars per node; we cap at 600 for keep-page-light).
const truncate = (s, max = 600) => {
  const t = String(s ?? '').trim();
  return t.length > max ? t.slice(0, max - 1) + '…' : t;
};

const buildReviewNodes = () => {
  // Use the "5-Sterne" tab if available (curated 5-star testimonials),
  // fall back to "Alle". Pick top 10 with non-trivial text.
  const all = reviewsData?.tabs?.['5-Sterne'] ?? reviewsData?.tabs?.Alle ?? [];
  const candidates = all
    .filter((r) => r.text && String(r.text).trim().length >= 40)
    .slice(0, 10);
  return candidates.map((r, i) => {
    // Convert epoch (seconds) to ISO date if available.
    const datePublished =
      typeof r.time === 'number' && r.time > 0
        ? new Date(r.time * 1000).toISOString().slice(0, 10)
        : undefined;
    const slugId = String(r.id ?? i + 1)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    // Conservative business-name detection: only flag as Organization when
    // the author_name explicitly contains a German/EU legal-form marker.
    // Avoids false positives on regular Person names. Common business-name
    // suffixes used by restaurants: GmbH, AG, UG, e.K., GbR, OHG, KG, Inh.
    const authorName = r.author_name || 'Anonym';
    const isBusiness = /\b(GmbH|AG|UG\b|e\.K\.|GbR|OHG|KG|Inh\.|Inc\.|Ltd\.?|LLC)\b/i.test(authorName);
    const author = isBusiness
      ? { "@type": "Organization", name: authorName }
      : { "@type": "Person", name: authorName };
    const node = {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-${slugId}`,
      author,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating || 5),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: truncate(r.text),
      itemReviewed: { "@id": `${SITE_URL}/#organization` },
    };
    if (datePublished) node.datePublished = datePublished;
    return node;
  });
};

// Enrich the base index.html @graph so every downstream page (home + per-lang
// + blog posts) inherits the AggregateRating + Person + SoftwareApplication +
// Service + Review nodes. Idempotent: previously injected nodes are removed
// before re-applying, so repeat runs do not accumulate duplicates.
{
  const graphMatch = baseHtml.match(
    /<script type="application\/ld\+json">\s*(\{[\s\S]*?"@graph"[\s\S]*?\})\s*<\/script>/,
  );
  if (graphMatch && REVIEW_META.totalCount > 0) {
    try {
      const graph = JSON.parse(graphMatch[1]);
      // Idempotent: drop any previously injected nodes before re-applying.
      const founderNames = new Set(FOUNDERS.map((f) => f.name));
      const prevServiceIds = new Set(PACKAGES.map((p) => `${SITE_URL}/#service-${p.key}`));
      graph['@graph'] = graph['@graph'].filter((n) => {
        if (n['@type'] === 'Person' && founderNames.has(n.name)) return false;
        if (n['@type'] === 'Service' && prevServiceIds.has(n['@id'])) return false;
        if (n['@type'] === 'SoftwareApplication' && n['@id'] === `${SITE_URL}/#software-application`) return false;
        if (n['@type'] === 'Review' && typeof n['@id'] === 'string' && n['@id'].startsWith(`${SITE_URL}/#review-`)) return false;
        return true;
      });
      // Idempotent removal of previously injected OfferCatalog node.
      const offerCatalogId = `${SITE_URL}/#offer-catalog`;
      graph['@graph'] = graph['@graph'].filter(
        (n) => !(n['@type'] === 'OfferCatalog' && n['@id'] === offerCatalogId),
      );
      const orgIdx = graph['@graph'].findIndex((n) => n['@type'] === 'Organization');
      if (orgIdx >= 0) {
        graph['@graph'][orgIdx].aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: String(REVIEW_META.totalRating),
          reviewCount: REVIEW_META.totalCount,
          bestRating: "5",
          worstRating: "1",
        };
        graph['@graph'][orgIdx].founder = FOUNDERS.map((f) => ({
          "@id": personSchemaByName.get(f.name)["@id"],
        }));
        // Brand-name variants users actually search/type — helps Knowledge
        // Graph entity resolution when the query doesn't match the canonical name.
        graph['@graph'][orgIdx].alternateName = ['Gastromaster', 'Gastro-Master', 'gastro-master.de'];
        // Topical authority signal — AI engines use knowsAbout to match
        // "who's an expert on X" queries.
        graph['@graph'][orgIdx].knowsAbout = [
          'Online-Bestellsystem',
          'Restaurant-Software',
          'Lieferdienst-Software',
          'Kassensystem',
          'TSE-Kassensicherung',
          'Bestell-App für Gastronomie',
          'Webshop für Gastronomie',
          'Provisionsfreie Direktbestellungen',
          'Restaurant-Kassen-Hardware',
          'QR-Code-Tischbestellsystem',
        ];
        graph['@graph'][orgIdx].slogan = 'Provisionsfrei. Direkt. Mehr Gewinn.';
        graph['@graph'][orgIdx].hasOfferCatalog = { "@id": offerCatalogId };
      }
      // OfferCatalog aggregating all 5 packages — closes the entity graph
      // (Org → has → OfferCatalog → contains → Services → with → Offers).
      graph['@graph'].push({
        "@type": "OfferCatalog",
        "@id": offerCatalogId,
        name: 'Gastro Master Pakete',
        itemListElement: PACKAGES.map((p) => ({ "@id": `${SITE_URL}/#service-${p.key}` })),
      });
      for (const person of personSchemaByName.values()) graph['@graph'].push(person);
      // Maßnahme 2 + 3 + 4: SoftwareApplication, Services, Reviews.
      graph['@graph'].push(buildSoftwareApplicationNode());
      graph['@graph'].push(...buildServiceNodes());
      const reviewNodes = buildReviewNodes();
      graph['@graph'].push(...reviewNodes);
      const replacement = `<script type="application/ld+json">\n${JSON.stringify(graph)}\n    </script>`;
      baseHtml = baseHtml.replace(graphMatch[0], replacement);
      console.log(
        `✅ @graph enriched: AggregateRating (${REVIEW_META.totalRating}★ · ${REVIEW_META.totalCount}) + ${FOUNDERS.length} Person + 1 SoftwareApplication + ${PACKAGES.length} Service + ${reviewNodes.length} Review nodes`,
      );
    } catch (e) {
      console.warn('⚠️ Could not enrich @graph:', e.message);
    }
  }
}
const seoMeta = JSON.parse(readFileSync(resolve(ROOT, 'src/data/seoMeta.json'), 'utf-8'));

// Package references for /preise ItemList
const PACKAGE_ITEMS = [
  { "@id": `${SITE_URL}/produkte/pakete/webseite#offer`, name: "Webseite", position: 1 },
  { "@id": `${SITE_URL}/produkte/pakete/online-bestellshop#offer`, name: "Starter", position: 2 },
  { "@id": `${SITE_URL}/produkte/pakete/bestell-app#offer`, name: "Business", position: 3 },
  { "@id": `${SITE_URL}/produkte/pakete/kassensystem#offer`, name: "Kassensystem", position: 4 },
  { "@id": `${SITE_URL}/produkte/pakete/enterprise#offer`, name: "Enterprise", position: 5 },
];

const pages = [
  {
    path: '/preise',
    title: seoMeta['/preise'].title,
    description: seoMeta['/preise'].description,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/preise#package-list`,
      name: "Gastro Master Pakete",
      numberOfItems: PACKAGE_ITEMS.length,
      itemListElement: PACKAGE_ITEMS.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        item: { "@id": item["@id"] },
      })),
    },
  },
  {
    path: '/loesungen/lieferdienst',
    title: seoMeta['/loesungen/lieferdienst'].title,
    description: seoMeta['/loesungen/lieferdienst'].description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Lieferdienst Lösung",
      "description": "Eigene Lieferplattform mit 0 % Provision",
    },
  },
  {
    path: '/produkte/add-ons',
    title: seoMeta['/produkte/add-ons'].title,
    description: seoMeta['/produkte/add-ons'].description,
    schema: {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Gastro Master Add-Ons",
    },
  },
];

mkdirSync(distDir, { recursive: true });

// Inject hreflang into the root index.html (the SPA fallback served for any
// not-yet-prerendered route). The root represents the language-neutral entry
// point — alternates point to the localised /<lang>/ home variants.
const rootHreflangTags = buildHreflangTags('/');
const rootHtmlPatched = baseHtml.replace('</head>', `${rootHreflangTags}\n  </head>`);
writeFileSync(join(distDir, 'index.html'), rootHtmlPatched);
console.log('✅ Hreflang injected: dist/index.html');

for (const page of pages) {
  const htmlWithMeta = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${page.description}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${page.title}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${page.description}"`,
    );

  const canonicalUrl = `${SITE_URL}${page.path}`;
  const hreflangTags = buildHreflangTags(page.path);

  const htmlWithExtras = htmlWithMeta.replace(
    '</head>',
    `<link rel="canonical" href="${canonicalUrl}">\n${hreflangTags}\n  <script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n  </head>`,
  );

  const filepath = join(distDir, page.path, 'index.html');
  mkdirSync(join(distDir, page.path), { recursive: true });
  writeFileSync(filepath, htmlWithExtras);

  console.log(`✅ Generated: ${page.path}/index.html (with hreflang)`);
}

// ─── Phase 2: Per-language pre-render of ALL routes ──────────────────────────
// Writes dist/<lang>/<localized-slug>/index.html for every (route × language).
// Each file gets: localised canonical, hreflang alternates + x-default, base
// meta tags (page-specific where seoMeta.json has an entry, otherwise the
// root index.html defaults remain — same as the SPA fallback would serve).
const baseTitleMatch = baseHtml.match(/<title>([^<]*)<\/title>/);
const baseDescMatch = baseHtml.match(/<meta name="description" content="([^"]*)"/);
const ROOT_TITLE = baseTitleMatch ? baseTitleMatch[1] : 'Gastro Master';
const ROOT_DESC = baseDescMatch ? baseDescMatch[1] : '';

// Per-language home meta from the i18n bundles (`seo.indexTitle`/`indexDescription`)
// + hero strings for the static crawler-fallback markup + nav labels for breadcrumbs.
const i18nMeta = {};
const i18nHero = {};
const i18nNav = {};
for (const lang of LANGUAGES) {
  try {
    const bundle = JSON.parse(
      readFileSync(resolve(ROOT, `public/locales/${lang}/common.json`), 'utf-8'),
    );
    i18nMeta[lang] = {
      title: bundle?.seo?.indexTitle ?? ROOT_TITLE,
      description: bundle?.seo?.indexDescription ?? ROOT_DESC,
    };
    i18nHero[lang] = bundle?.hero ?? null;
    i18nNav[lang] = bundle?.nav ?? null;
  } catch {
    i18nMeta[lang] = { title: ROOT_TITLE, description: ROOT_DESC };
    i18nHero[lang] = null;
    i18nNav[lang] = null;
  }
}

// IETF BCP 47 lang→locale mapping (e.g. de→de-DE, fa→fa-IR). Used for
// inLanguage on WebPage and other locale-tagged Schema.org fields.
const LOCALE_BY_LANG = {
  de: 'de-DE', en: 'en-US', it: 'it-IT', fa: 'fa-IR', si: 'si-LK', ru: 'ru-RU',
};
const localeOf = (lang) => LOCALE_BY_LANG[lang] ?? `${lang}-${lang.toUpperCase()}`;

// Localised breadcrumb labels — sourced from i18n nav.* keys per language.
// Falls back to DE labels for languages where the i18n nav block is incomplete.
const navLabel = (lang, key) => {
  const nav = i18nNav[lang] ?? i18nNav.de;
  if (key === 'produkte') return nav?.produkte ?? 'Produkte';
  if (key === 'pakete') return nav?.prodCategories?.[0]?.label ?? 'Pakete';
  if (key === 'add-ons') return nav?.prodCategories?.[1]?.label ?? 'Add-Ons';
  if (key === 'hardware') return nav?.prodCategories?.[2]?.label ?? 'Hardware';
  return key;
};

// Build the per-language static hero block (lives inside #root, replaced by
// createRoot() on mount). JS-less AI crawlers see headline + subtitle + the
// three trust signals + a CTA — this is what the homepage WAS missing.
const escapeHtmlMin = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Localised contact-route slug — must match routes.ts so the hero CTA never 404s.
const contactRoute = routes.find((r) => r.key === 'contact');
const contactSlug = (lang) => contactRoute?.slugs?.[lang] ?? '/kontakt';

// Per-language label for the static packages section heading (DE-only fallback).
const PACKAGES_HEADING = {
  de: 'Unsere Pakete',
  en: 'Our Packages',
  it: 'I nostri pacchetti',
  fa: 'بسته‌های ما',
  si: 'අපගේ පැකේජ',
  ru: 'Наши тарифы',
};
const PACKAGES_PRICE_LABEL = {
  de: 'ab', en: 'from', it: 'da', fa: 'از', si: 'සිට', ru: 'от',
};
const PACKAGES_PER_MONTH = {
  de: '€/Mo.', en: '€/mo.', it: '€/mese', fa: 'یورو/ماه', si: '€/මාසය', ru: '€/мес.',
};
const PACKAGES_CUSTOM = {
  de: 'Preis nach Anfrage', en: 'Custom quote', it: 'Preventivo personalizzato',
  fa: 'قیمت طبق درخواست', si: 'ඉල්ලීම මත මිල', ru: 'Цена по запросу',
};

const buildStaticPackages = (lang) => {
  const heading = PACKAGES_HEADING[lang] ?? PACKAGES_HEADING.de;
  const fromLabel = PACKAGES_PRICE_LABEL[lang] ?? PACKAGES_PRICE_LABEL.de;
  const perMonth = PACKAGES_PER_MONTH[lang] ?? PACKAGES_PER_MONTH.de;
  const customLabel = PACKAGES_CUSTOM[lang] ?? PACKAGES_CUSTOM.de;
  const items = PACKAGES.map((p) => {
    const priceLine = p.price ? `${fromLabel} ${p.price} ${perMonth}` : customLabel;
    return [
      '<li style="margin:0 0 0.75rem;padding:0.75rem 1rem;border:1px solid #e5e7eb;border-radius:0.5rem;">',
      `<strong>${escapeHtmlMin(p.name)}</strong> — <span style="color:#ED8400;font-weight:600;">${escapeHtmlMin(priceLine)}</span><br/>`,
      `<span style="color:#475569;font-size:0.95rem;">${escapeHtmlMin(p.description)}</span>`,
      '</li>',
    ].join('');
  }).join('');
  return [
    '<section style="max-width:880px;margin:1rem auto 3rem;padding:0 1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h2 style="font-size:1.5rem;font-weight:800;margin:0 0 1rem;text-align:center;">${escapeHtmlMin(heading)}</h2>`,
    `<ul style="list-style:none;padding:0;margin:0;">${items}</ul>`,
    '</section>',
  ].join('');
};

const buildStaticHero = (lang) => {
  const h = i18nHero[lang];
  if (!h?.headline) return '';
  const trusts = [h.trust1, h.trust2, h.trust3].filter(Boolean);
  return [
    '<section style="max-width:880px;margin:3rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;text-align:center;">',
    `<h1 style="font-size:2rem;font-weight:900;line-height:1.2;margin:0 0 1rem;">${escapeHtmlMin(h.headline)}</h1>`,
    h.sub ? `<p style="font-size:1.125rem;line-height:1.5;margin:0 0 1.5rem;color:#0A264A;opacity:0.85;">${escapeHtmlMin(h.sub)}</p>` : '',
    trusts.length
      ? `<ul style="list-style:none;padding:0;margin:0 0 1.5rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;font-size:0.875rem;font-weight:600;">${trusts
          .map((t) => `<li>✓ ${escapeHtmlMin(t)}</li>`)
          .join('')}</ul>`
      : '',
    h.cta ? `<a href="/${lang}${contactSlug(lang)}" style="display:inline-block;background:#ED8400;color:#fff;font-weight:700;padding:0.75rem 2rem;border-radius:0.75rem;text-decoration:none;">${escapeHtmlMin(h.cta)}</a>` : '',
    '</section>',
  ]
    .filter(Boolean)
    .join('');
};

// ─── Per-page i18n bundles (Sprint 2: Add-ons + future retrofit) ─────────────
// Each product/feature page has its own structured i18n bundle with the keys
// `meta`, `hero`, `pricing`, `faq.items` etc. in 6 languages — way richer
// than the homepage common.json. This generic loader caches the parsed
// bundle per (lang, name) so we read each file once.
const _bundleCache = new Map();
const loadBundle = (lang, name) => {
  const key = `${lang}/${name}`;
  if (_bundleCache.has(key)) return _bundleCache.get(key);
  const path = resolve(ROOT, `public/locales/${lang}/${name}.json`);
  let bundle = null;
  if (existsSync(path)) {
    try {
      bundle = JSON.parse(readFileSync(path, 'utf-8'));
    } catch (e) {
      console.warn(`⚠️ Could not parse ${path}: ${e.message}`);
    }
  }
  _bundleCache.set(key, bundle);
  return bundle;
};

// Add-on registry: route.key → {bundle filename, dependencies, category}.
// `deps` references PACKAGES.key for isAccessoryOrSparePartFor relationships
// — Schema.org accessory linkage that AI engines use to answer "Welche
// Add-ons gehören zum Business-Paket?".
const ADDON_REGISTRY = {
  'qr-flyer':                { bundle: 'qr-code-flyer',         deps: ['starter', 'business'],     category: 'Marketing' },
  'driver-app-gps':          { bundle: 'fahrer-app',            deps: ['starter', 'kassensystem'], category: 'Logistics' },
  'qr-table-system':         { bundle: 'qr-code-tischsystem',   deps: ['business', 'kassensystem'], category: 'Self-Service' },
  'kitchen-display':         { bundle: 'bildschirmfunktion',    deps: ['business', 'kassensystem'], category: 'Operations' },
  'kiosk':                   { bundle: 'kiosk',                 deps: ['business', 'kassensystem'], category: 'Self-Service' },
  'transaction-fee-sharing': { bundle: 'transaktionsumlage',    deps: [],                          category: 'Payment' },
};

// Extract a numeric monthly EUR price from a free-form pricing string.
// Returns null if no clear number found (custom-quote / per-unit / etc.).
const parsePriceNumber = (priceText) => {
  if (!priceText) return null;
  // Match patterns like "ab 65 €", "+10 €/Monat", "79€/Mo", "ab 49 EUR"
  const m = String(priceText).match(/(\d+(?:[.,]\d+)?)\s*(?:€|EUR)/i);
  return m ? m[1].replace(',', '.') : null;
};

// Build Offer schema from bundle pricing data. Falls back to PriceSpecification
// (description-only) for "Auf Anfrage" / custom-quote tiers.
const buildOfferFromPricing = (canonicalUrl, pricing) => {
  const priceText = pricing?.price ?? '';
  const priceNum = parsePriceNumber(priceText);
  const note = pricing?.note ?? '';
  if (priceNum) {
    return {
      "@type": "Offer",
      "@id": `${canonicalUrl}#offer`,
      price: priceNum,
      priceCurrency: 'EUR',
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: priceNum,
        priceCurrency: 'EUR',
        unitCode: 'MON',
        description: priceText,
      },
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    };
  }
  return {
    "@type": "Offer",
    "@id": `${canonicalUrl}#offer`,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: 'EUR',
      description: priceText || note || 'Auf Anfrage',
    },
    availability: 'https://schema.org/InStock',
    url: canonicalUrl,
  };
};

// FAQPage schema from bundle.faq.items[]. AI engines prize FAQPage citations.
const buildFaqPageFromBundle = (canonicalUrl, faqItems) => {
  if (!Array.isArray(faqItems) || faqItems.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q ?? item.question ?? '',
      acceptedAnswer: { "@type": "Answer", text: item.a ?? item.answer ?? '' },
    })),
  };
};

// ─── Product-page enrichment helpers (Sprint: Pakete + Hub + Hardware) ───────
// PACKAGES_BY_URL enables route → package lookup inside the per-language loop.
const PACKAGES_BY_URL = new Map(PACKAGES.filter((p) => p.url).map((p) => [p.url, p]));

// (splitFeatures removed: PACKAGES now carries a structured `features` array
// — robust regardless of how the prose description is rewritten.)

// Build timestamp — used as datePublished/dateModified on WebPage schemas
// so AI engines see fresh signal on every deploy.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// Generic page-level WebPage schema builder. AI engines use this to anchor
// the page entity (mainEntity), the language, and what the page is *about*.
const buildPageWebPageSchema = ({ canonicalUrl, name, description, lang, mainEntityId, image }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name,
  description,
  inLanguage: localeOf(lang),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  primaryImageOfPage: image ?? `${SITE_URL}/logo-gastro-master.png`,
  datePublished: BUILD_DATE,
  dateModified: BUILD_DATE,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ['h1', 'section p:first-of-type'],
  },
});

// BreadcrumbList for a page. `crumbs` is [{ name, url }, ...] with the final
// item being the current page. AI engines use this to understand site
// hierarchy and to produce inline breadcrumb hints in answers.
const buildBreadcrumbList = (canonicalUrl, crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${canonicalUrl}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
});

// Audience targeting: tells AI engines who this product is for. Helps queries
// like "Welches Bestellsystem für italienische Restaurants?" — the Audience
// node says "Restaurants, Cafés, Bäckereien, Lieferdienste in DACH".
const RESTAURANT_AUDIENCE = {
  "@type": "BusinessAudience",
  "@id": `${SITE_URL}/#audience-restaurant-operators`,
  audienceType: 'Restaurant operators, hospitality businesses, delivery services',
  geographicArea: { "@type": "Country", name: ['DE', 'AT', 'CH'] },
};

// Per-package Product schema. Reuses the existing Service.offers @id from
// the global @graph (so Offers don't duplicate; AI engines see one canonical
// price node referenced from both Service and Product). Uses the real
// product mockup image where available, falls back to logo.
const buildProductSchema = (pkg, canonicalUrl, lang) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${canonicalUrl}#product`,
  name: localizedPackageName(pkg, lang),
  description: pkg.description,
  brand: { "@id": `${SITE_URL}/#organization` },
  category: 'Restaurant Software',
  url: canonicalUrl,
  image: packageImageUrl(pkg),
  inLanguage: localeOf(lang),
  offers: { "@id": `${SITE_URL}${pkg.url}#offer` },
  audience: RESTAURANT_AUDIENCE,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(REVIEW_META.totalRating || 5),
    reviewCount: REVIEW_META.totalCount || 0,
    bestRating: '5',
    worstRating: '1',
  },
});

// Static crawler fallback for a single package page. Uses the localised
// package name + the structured features array (no parsing).
const buildPackagePageStatic = (pkg, lang) => {
  const fromLabel = PACKAGES_PRICE_LABEL[lang] ?? PACKAGES_PRICE_LABEL.de;
  const perMonth = PACKAGES_PER_MONTH[lang] ?? PACKAGES_PER_MONTH.de;
  const customLabel = PACKAGES_CUSTOM[lang] ?? PACKAGES_CUSTOM.de;
  const features = pkg.features ?? [];
  const cta = i18nHero[lang]?.cta ?? 'Kostenlose Beratung';
  const priceLine = pkg.price ? `${fromLabel} ${pkg.price} ${perMonth}` : customLabel;
  const localizedName = localizedPackageName(pkg, lang);
  return [
    '<article style="max-width:880px;margin:3rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h1 style="font-size:2rem;font-weight:900;line-height:1.2;margin:0 0 0.5rem;">${escapeHtmlMin(localizedName)}</h1>`,
    `<p style="font-size:1.5rem;color:#ED8400;font-weight:700;margin:0 0 1rem;">${escapeHtmlMin(priceLine)}</p>`,
    `<p style="font-size:1.125rem;line-height:1.5;margin:0 0 1.5rem;color:#0A264A;opacity:0.85;">${escapeHtmlMin(pkg.description)}</p>`,
    features.length > 0
      ? `<ul style="list-style:none;padding:0;margin:0 0 1.5rem;">${features
          .map((f) => `<li style="padding:0.5rem 0;">✓ ${escapeHtmlMin(f)}</li>`)
          .join('')}</ul>`
      : '',
    `<a href="/${lang}${contactSlug(lang)}" style="display:inline-block;background:#ED8400;color:#fff;font-weight:700;padding:0.75rem 2rem;border-radius:0.75rem;text-decoration:none;">${escapeHtmlMin(cta)}</a>`,
    '</article>',
  ]
    .filter(Boolean)
    .join('');
};

// Static fallback for the /produkte hub. Lists all 4 main packages with
// price + short description so a JS-less crawler sees the full catalogue.
const buildHubPageStatic = (lang) => {
  const heading = navLabel(lang, 'produkte');
  // Reuse the same packages section we render under the hero on the home —
  // but here it's the page's main content, not a secondary block.
  return `<section style="max-width:880px;margin:2rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;"><h1 style="font-size:2rem;font-weight:900;text-align:center;margin:0 0 1.5rem;">${escapeHtmlMin(heading)}</h1>${buildStaticPackages(lang).replace(/<h2[^>]*>[^<]*<\/h2>/, '')}</section>`;
};

// Hardware page is a category landing. We list the actual hardware categories
// Gastro Master sells/integrates so AI engines have something concrete to cite
// for queries like "Welche Hardware brauche ich für ein Kassensystem?".
const HARDWARE_INTRO = {
  de: 'TSE-zertifizierte Kassen, Drucker, Tablets, Bondrucker und Display-Hardware für deine Gastronomie. Kompatibel mit dem Gastro Master Kassensystem.',
  en: 'TSE-certified POS terminals, printers, tablets and display hardware for your restaurant. Fully compatible with the Gastro Master POS system.',
  it: 'Casse certificate TSE, stampanti, tablet e hardware display per la tua ristorazione. Compatibili con il sistema cassa Gastro Master.',
  fa: 'صندوق‌های فروش گواهی‌شده TSE، چاپگرها، تبلت‌ها و سخت‌افزار نمایشگر برای رستوران شما. سازگار با سیستم صندوق Gastro Master.',
  si: 'TSE සහතික කළ POS පර්යන්ත, මුද්‍රණ යන්ත්‍ර, ටැබ්ලට් සහ සංදර්ශක උපකරණ ඔබේ අවන්හල සඳහා. Gastro Master POS පද්ධතිය සමඟ සම්පූර්ණයෙන් අනුකූල.',
  ru: 'Сертифицированные TSE кассы, принтеры, планшеты и дисплеи для вашего ресторана. Полностью совместимы с кассовой системой Gastro Master.',
};

// Hardware categories (DE source — labels are technical terms widely understood
// across languages; the section heading is localised, the items stay German for
// matching with German technical product searches).
const HARDWARE_CATEGORIES = [
  { name: 'TSE-Kassensystem', description: 'Komplette TSE-zertifizierte Kassen-Stationen, GoBD-konform' },
  { name: 'Bondrucker (Thermo)', description: 'Küchen- und Bondrucker mit LAN/WLAN, kompatibel mit dem Bestellsystem' },
  { name: 'Kunden-Display', description: 'Kassen-Kundendisplay zur Anzeige des Bestellwerts' },
  { name: 'Kiosk-Terminal', description: 'Self-Ordering-Tower für QSR und Schnellgastronomie' },
  { name: 'Tablet-Stand', description: 'Tablet-Halterung für Kassen- oder Tisch-Bestell-Aufstellung' },
  { name: 'Kassenschublade', description: 'Bargeld-Schublade mit elektronischem Auslöser' },
  { name: 'Etiketten-Drucker', description: 'Drucker für Speisen-Etiketten und Allergene-Kennzeichnung' },
  { name: 'Küchen-Display (KDS)', description: 'Bildschirm-System für die Küche statt Bonpapier' },
];

const buildHardwarePageStatic = (lang) => {
  // Bundle-driven (hardware.json has 4 sections × 3-4 products = 13 real items).
  // Falls back to the hardcoded HARDWARE_INTRO/HARDWARE_CATEGORIES when no bundle
  // is loadable in any language.
  const bundle = loadBundle(lang, 'hardware') ?? loadBundle('de', 'hardware');
  const norm = bundle ? normalizeHeroFromBundle(bundle) : null;
  const intro = norm?.subline || HARDWARE_INTRO[lang] || HARDWARE_INTRO.de;
  const cta = norm?.cta || i18nHero[lang]?.cta || 'Kostenlose Beratung';
  const headline = norm?.headline || navLabel(lang, 'hardware');
  const sections = bundle?.sections;

  const sectionsHtml =
    sections && typeof sections === 'object'
      ? Object.values(sections)
          .map((sec) => {
            if (!sec) return '';
            const products = Array.isArray(sec.products) ? sec.products : [];
            const productsHtml = products
              .map(
                (p) =>
                  `<li style="margin:0 0 0.75rem;padding:0.75rem 1rem;border:1px solid #e5e7eb;border-radius:0.5rem;"><strong>${escapeHtmlMin(p.title ?? '')}</strong> — <span style="color:#475569;">${escapeHtmlMin(p.desc ?? '')}</span></li>`,
              )
              .join('');
            return [
              '<section style="margin:0 0 2rem;">',
              sec.badge
                ? `<p style="font-size:0.75rem;font-weight:700;color:#0A264A;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.25rem;">${escapeHtmlMin(sec.badge)}</p>`
                : '',
              sec.headline
                ? `<h2 style="font-size:1.25rem;font-weight:800;margin:0 0 0.5rem;">${escapeHtmlMin(sec.headline)}</h2>`
                : '',
              sec.sub
                ? `<p style="font-size:0.95rem;color:#475569;margin:0 0 1rem;">${escapeHtmlMin(sec.sub)}</p>`
                : '',
              `<ul style="list-style:none;padding:0;margin:0;">${productsHtml}</ul>`,
              '</section>',
            ]
              .filter(Boolean)
              .join('');
          })
          .join('')
      : `<ul style="list-style:none;padding:0;margin:0 0 1.5rem;">${HARDWARE_CATEGORIES.map(
          (c) =>
            `<li style="margin:0 0 0.75rem;padding:0.75rem 1rem;border:1px solid #e5e7eb;border-radius:0.5rem;"><strong>${escapeHtmlMin(c.name)}</strong> — <span style="color:#475569;">${escapeHtmlMin(c.description)}</span></li>`,
        ).join('')}</ul>`;

  return [
    '<article style="max-width:880px;margin:3rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h1 style="font-size:2rem;font-weight:900;margin:0 0 1rem;">${escapeHtmlMin(headline)}</h1>`,
    `<p style="font-size:1.125rem;line-height:1.5;margin:0 0 1.5rem;">${escapeHtmlMin(intro)}</p>`,
    sectionsHtml,
    `<a href="/${lang}${contactSlug(lang)}" style="display:inline-block;background:#ED8400;color:#fff;font-weight:700;padding:0.75rem 2rem;border-radius:0.75rem;text-decoration:none;">${escapeHtmlMin(cta)}</a>`,
    '</article>',
  ].join('');
};

// ─── Pakete + Hardware bundle mapping (retrofit Sprint, Mai 2026) ───────────
// route.key → bundle filename in public/locales/<lang>/<filename>.json.
// Bundles for these pages have a different schema than add-on bundles —
// they use `seo.title/description` (not `meta.title/description`) and the
// hero block has format variants per page. normalizeHeroFromBundle() unifies.
const PACKAGE_BUNDLE_MAP = {
  'website':    'webseite',
  'online-shop': 'webshop',
  'ordering-app': 'app',
  'pos-system': 'kasse',
  'hardware':   'hardware',
};

// Inconsistent hero formats across Pakete/Hardware bundles:
//   webseite + app:        title1 + titleHighlight + title2
//   webshop:               h1 + h1Highlight
//   kasse + hardware:      h1 + h1Highlight + h1Suffix
// Normalize to {headline, subline, badge, cta}.
const normalizeHeroFromBundle = (bundle) => {
  const h = bundle?.hero ?? {};
  let headline = '';
  if (h.h1) {
    headline = [h.h1, h.h1Highlight, h.h1Suffix].filter(Boolean).join(' ');
  } else if (h.title1) {
    headline = [h.title1, h.titleHighlight, h.title2].filter(Boolean).join(' ');
  } else if (h.headline) {
    headline = [h.headline, h.headlineHighlight].filter(Boolean).join(' ');
  }
  const subline = h.subtitle ?? h.subline ?? h.desc ?? h.sub ?? '';
  return { headline: headline.trim(), subline, badge: h.badge ?? '', cta: h.cta ?? '' };
};

// ─── Add-on enrichment (Sprint 2) ───────────────────────────────────────────
// Asset filename hint per add-on registry key — best-effort glob into
// dist/assets/. Mirrors the pattern used for Pakete (resolveAssetUrl).
const ADDON_ASSET_HINTS = {
  'qr-flyer':                'addon-qrcode',
  'driver-app-gps':          'addon-frankfurt-gps',
  'qr-table-system':         'addon-qr-tischsystem',
  'kitchen-display':         'pickup-screen',
  'kiosk':                   'selfordering-terminals',
  'transaction-fee-sharing': null,
};

const addonImageUrl = (routeKey) => {
  const hint = ADDON_ASSET_HINTS[routeKey];
  return resolveAssetUrl(hint) ?? `${SITE_URL}/logo-gastro-master.png`;
};

// Build Product schema for an add-on. Mirrors buildProductSchema for Pakete
// but uses the per-page bundle for naming + description, and links to its
// dependent base packages via isAccessoryOrSparePartFor.
const buildAddonProductSchema = ({ canonicalUrl, lang, bundle, registry, routeKey }) => {
  const meta = bundle?.meta ?? {};
  const hero = bundle?.hero ?? {};
  const name = meta.breadcrumbName ?? hero.headline ?? routeKey;
  const description = meta.description ?? hero.subline ?? '';
  const offer = buildOfferFromPricing(canonicalUrl, bundle?.pricing);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name,
    description,
    brand: { "@id": `${SITE_URL}/#organization` },
    category: `Restaurant Software / ${registry.category}`,
    url: canonicalUrl,
    image: addonImageUrl(routeKey),
    inLanguage: localeOf(lang),
    offers: offer,
    audience: RESTAURANT_AUDIENCE,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(REVIEW_META.totalRating || 5),
      reviewCount: REVIEW_META.totalCount || 0,
      bestRating: '5',
      worstRating: '1',
    },
    // Schema.org accessory linkage: AI engines see "this add-on is for these
    // base packages". Helps queries like "Welches Add-on brauche ich für …".
    ...(registry.deps.length
      ? {
          isAccessoryOrSparePartFor: registry.deps.map((depKey) => ({
            "@id": `${SITE_URL}/#service-${depKey}`,
          })),
        }
      : {}),
  };
};

// Static fallback for an add-on detail page — H1, badge, subline, structured
// pricing block, dependency hint, CTA. All localised via the per-page bundle.
const buildAddonPageStatic = ({ lang, bundle, registry }) => {
  const hero = bundle?.hero ?? {};
  const pricing = bundle?.pricing ?? {};
  const cta = i18nHero[lang]?.cta ?? 'Kostenlose Beratung';
  const depNames = registry.deps
    .map((k) => {
      const pkg = PACKAGES.find((p) => p.key === k);
      return pkg ? localizedPackageName(pkg, lang) : null;
    })
    .filter(Boolean);
  return [
    '<article style="max-width:880px;margin:3rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    hero.badge
      ? `<p style="display:inline-block;background:#0A264A;color:#fff;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0.75rem;border-radius:999px;margin:0 0 1rem;">${escapeHtmlMin(hero.badge)}</p>`
      : '',
    `<h1 style="font-size:2rem;font-weight:900;line-height:1.2;margin:0 0 0.75rem;">${escapeHtmlMin(hero.headline ?? '')}</h1>`,
    hero.subline
      ? `<p style="font-size:1.125rem;line-height:1.5;margin:0 0 1.5rem;color:#0A264A;opacity:0.85;">${escapeHtmlMin(hero.subline)}</p>`
      : '',
    pricing.price
      ? `<p style="font-size:1.5rem;color:#ED8400;font-weight:700;margin:0 0 0.5rem;">${escapeHtmlMin(pricing.price)}</p>`
      : '',
    pricing.note
      ? `<p style="font-size:0.95rem;line-height:1.4;margin:0 0 1.5rem;color:#475569;">${escapeHtmlMin(pricing.note)}</p>`
      : '',
    depNames.length
      ? `<p style="font-size:0.875rem;color:#475569;margin:0 0 1.5rem;"><strong>Erfordert:</strong> ${depNames.map(escapeHtmlMin).join(' / ')}</p>`
      : '',
    `<a href="/${lang}${contactSlug(lang)}" style="display:inline-block;background:#ED8400;color:#fff;font-weight:700;padding:0.75rem 2rem;border-radius:0.75rem;text-decoration:none;">${escapeHtmlMin(cta)}</a>`,
    '</article>',
  ]
    .filter(Boolean)
    .join('');
};

// Static fallback for the /produkte/add-ons hub: pulls structured cards from
// addons-hub.json (5 add-ons with title/price/desc/benefits/compatibility).
const buildAddonsHubStatic = (lang) => {
  const hub = loadBundle(lang, 'addons-hub') ?? loadBundle('de', 'addons-hub');
  const addons = Array.isArray(hub?.addons) ? hub.addons : [];
  // Bundle hero uses {headline, headlineHighlight, sub} — combine for H1.
  const headline = hub?.hero?.headline ?? '';
  const highlight = hub?.hero?.headlineHighlight ?? '';
  const heading =
    [headline, highlight].filter(Boolean).join(' ').trim() ||
    navLabel(lang, 'add-ons');
  const sub = hub?.hero?.sub ?? '';
  const items = addons
    .map((a) => {
      const benefits = Array.isArray(a.benefits) ? a.benefits : [];
      return [
        '<li style="margin:0 0 1rem;padding:1rem;border:1px solid #e5e7eb;border-radius:0.5rem;">',
        a.badge
          ? `<p style="font-size:0.7rem;font-weight:700;color:#0A264A;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.5rem;">${escapeHtmlMin(a.badge)}</p>`
          : '',
        `<strong style="font-size:1.125rem;">${escapeHtmlMin(a.title ?? '')}</strong>`,
        a.price
          ? ` — <span style="color:#ED8400;font-weight:600;">${escapeHtmlMin(a.price)}</span>`
          : '',
        '<br/>',
        a.desc
          ? `<span style="color:#475569;font-size:0.95rem;">${escapeHtmlMin(a.desc)}</span>`
          : '',
        benefits.length
          ? `<ul style="margin:0.5rem 0 0;padding-left:1.25rem;color:#475569;font-size:0.875rem;">${benefits
              .map((b) => `<li>${escapeHtmlMin(b)}</li>`)
              .join('')}</ul>`
          : '',
        a.compatibility
          ? `<p style="font-size:0.8rem;color:#0A264A;margin:0.5rem 0 0;"><strong>Kompatibel mit:</strong> ${escapeHtmlMin(a.compatibility)}</p>`
          : '',
        '</li>',
      ]
        .filter(Boolean)
        .join('');
    })
    .join('');
  return [
    '<section style="max-width:880px;margin:2rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h1 style="font-size:2rem;font-weight:900;text-align:center;margin:0 0 1rem;">${escapeHtmlMin(heading)}</h1>`,
    sub
      ? `<p style="font-size:1rem;line-height:1.5;text-align:center;margin:0 0 1.5rem;color:#475569;">${escapeHtmlMin(sub)}</p>`
      : '',
    `<ul style="list-style:none;padding:0;margin:0;">${items}</ul>`,
    '</section>',
  ].join('');
};

// ItemList of hardware products from the bundle (when available, ~13 real
// items across 4 sections), falling back to the hardcoded category list.
const buildHardwareItemList = (canonicalUrl, lang) => {
  const bundle = loadBundle(lang, 'hardware') ?? loadBundle('de', 'hardware');
  const sections = bundle?.sections;
  if (sections && typeof sections === 'object') {
    const all = [];
    for (const sec of Object.values(sections)) {
      if (Array.isArray(sec?.products)) {
        for (const p of sec.products) {
          all.push({ title: p.title, desc: p.desc, sectionBadge: sec.badge });
        }
      }
    }
    if (all.length) {
      return {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#hardware-list`,
        name: 'Gastro Master Hardware-Produkte',
        numberOfItems: all.length,
        itemListElement: all.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.title,
            description: p.desc,
            category: p.sectionBadge ? `Restaurant Hardware / ${p.sectionBadge}` : 'Restaurant Hardware',
            brand: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      };
    }
  }
  // Fallback: hardcoded HARDWARE_CATEGORIES.
  return {
    "@type": "ItemList",
    "@id": `${canonicalUrl}#hardware-list`,
    name: 'Gastro Master Hardware-Kategorien',
    numberOfItems: HARDWARE_CATEGORIES.length,
    itemListElement: HARDWARE_CATEGORIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: c.name,
        description: c.description,
        category: 'Restaurant Hardware',
        brand: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
};

let perLangCount = 0;
for (const route of routes) {
  // Schema (and curated meta) for routes covered by seoMeta.json
  const curatedMeta = seoMeta[route.slugs.de];
  const curatedSchema = pages.find((p) => p.path === route.slugs.de)?.schema;

  // Detect product-page kind: package (one of the 4 main Pakete), the
  // /produkte hub, /produkte/hardware, an add-on, or the add-ons hub.
  const pkg = PACKAGES_BY_URL.get(route.slugs.de);
  const isHub = route.key === 'produkte';
  const isHardware = route.key === 'hardware';
  const addonRegistry = ADDON_REGISTRY[route.key];
  const isAddonsHub = route.key === 'add-ons';
  const isProductPage = !!pkg || isHub || isHardware || !!addonRegistry || isAddonsHub;

  for (const lang of LANGUAGES) {
    const slug = route.slugs[lang];
    const canonicalUrl = buildHref(lang, slug);
    const hreflangTags = buildHreflangTags(route.slugs.de);

    // Priority order for title/description:
    //   1. Curated DE-only seoMeta.json (still authoritative where present)
    //   2. Per-language home i18n.seo.* (only the home route)
    //   3. Per-package title/description built from PACKAGES (4 Pakete-Pages)
    //   4. Hub/Hardware: built from i18n nav labels + PACKAGES
    //   5. Root index.html defaults (last-resort fallback)
    const langFallback = route.key === 'home' ? i18nMeta[lang] : undefined;
    let pageTitle, pageDesc;
    if (pkg) {
      // Prefer per-language bundle SEO meta over constructed German fallback.
      const bundleName = PACKAGE_BUNDLE_MAP[route.key];
      const pkgBundle = bundleName
        ? loadBundle(lang, bundleName) ?? loadBundle('de', bundleName)
        : null;
      if (pkgBundle?.seo?.title) {
        pageTitle = pkgBundle.seo.title;
        pageDesc = pkgBundle.seo.description ?? pkg.description;
      } else {
        const fromLabel = PACKAGES_PRICE_LABEL[lang] ?? PACKAGES_PRICE_LABEL.de;
        const perMonth = PACKAGES_PER_MONTH[lang] ?? PACKAGES_PER_MONTH.de;
        const priceTail = pkg.price ? ` – ${fromLabel} ${pkg.price} ${perMonth}` : '';
        pageTitle = `${pkg.name}${priceTail} | Gastro Master`;
        pageDesc = pkg.description;
      }
    } else if (isHub) {
      pageTitle = `${navLabel(lang, 'produkte')} – ${navLabel(lang, 'pakete')}, ${navLabel(lang, 'add-ons')}, ${navLabel(lang, 'hardware')} | Gastro Master`;
      pageDesc = PACKAGES.filter((p) => p.price)
        .map((p) => `${p.name} (${p.price}€/Mo.)`)
        .join(', ');
    } else if (isHardware) {
      // Hardware bundle (hardware.json) has rich seo.title/description per language.
      const hwBundle = loadBundle(lang, 'hardware') ?? loadBundle('de', 'hardware');
      if (hwBundle?.seo?.title) {
        pageTitle = hwBundle.seo.title;
        pageDesc = hwBundle.seo.description ?? HARDWARE_INTRO[lang] ?? HARDWARE_INTRO.de;
      } else {
        pageTitle = `${navLabel(lang, 'hardware')} | Gastro Master`;
        pageDesc = HARDWARE_INTRO[lang] ?? HARDWARE_INTRO.de;
      }
    } else if (addonRegistry) {
      // Per-language SEO meta from the add-on's i18n bundle (or DE fallback).
      const b = loadBundle(lang, addonRegistry.bundle) ?? loadBundle('de', addonRegistry.bundle);
      pageTitle = b?.meta?.title ?? `${addonRegistry.bundle} | Gastro Master`;
      pageDesc = b?.meta?.description ?? '';
    } else if (isAddonsHub) {
      const h = loadBundle(lang, 'addons-hub') ?? loadBundle('de', 'addons-hub');
      pageTitle = h?.seo?.title ?? `${navLabel(lang, 'add-ons')} | Gastro Master`;
      pageDesc = h?.seo?.description ?? '';
    }
    const title = curatedMeta?.title ?? langFallback?.title ?? pageTitle ?? ROOT_TITLE;
    const description = curatedMeta?.description ?? langFallback?.description ?? pageDesc ?? ROOT_DESC;

    let html = baseHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
      .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
      .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`);

    // Set the <html lang> attribute so headless crawlers can detect language.
    html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);

    const headExtras = [
      `<link rel="canonical" href="${canonicalUrl}">`,
      hreflangTags,
      curatedSchema
        ? `  <script type="application/ld+json">${JSON.stringify(curatedSchema)}</script>`
        : null,
    ]
      .filter(Boolean)
      .join('\n');

    html = html.replace('</head>', `${headExtras}\n  </head>`);

    // For the language home routes (/<lang>/), inject the static hero into
    // <div id="root"> so JS-less AI crawlers see real content instead of
    // an empty App-Shell. createRoot() will replace it at hydration.
    if (route.key === 'home') {
      const heroHtml = buildStaticHero(lang);
      const packagesHtml = buildStaticPackages(lang);
      const homeStatic = `${heroHtml}${packagesHtml}`;
      if (homeStatic) {
        html = html.replace(/<div id="root"><\/div>/, `<div id="root">${homeStatic}</div>`);
      }
      const webPageSchema = buildPageWebPageSchema({
        canonicalUrl,
        name: title,
        description,
        lang,
        mainEntityId: `${SITE_URL}/#software-application`,
      });
      html = html.replace(
        '</head>',
        `  <script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>\n  </head>`,
      );
    } else if (isProductPage) {
      // ─── Product pages: Pakete (4) + /produkte hub + /produkte/hardware ──
      // Each gets: localised static fallback in <div id="root">, page-specific
      // WebPage + BreadcrumbList schemas, and (for Pakete) a Product node.
      let staticContent = '';
      const extraSchemas = [];
      const baseCrumbs = [
        { name: 'Home', url: `${SITE_URL}/${lang}` },
        { name: navLabel(lang, 'produkte'), url: `${SITE_URL}${buildHref(lang, '/produkte').replace(SITE_URL, '')}` },
      ];

      if (pkg) {
        // Use per-page bundle for marketing-quality H1, subline, and FAQs.
        // Falls back to PACKAGES.description-based static when no bundle.
        const bundleName = PACKAGE_BUNDLE_MAP[route.key];
        const pkgBundle = bundleName
          ? loadBundle(lang, bundleName) ?? loadBundle('de', bundleName)
          : null;
        const norm = pkgBundle ? normalizeHeroFromBundle(pkgBundle) : null;
        if (norm?.headline) {
          // Marketing-grade hero from bundle: badge, headline, subline,
          // pricing display from PACKAGES (already structured), CTA.
          const fromLabel = PACKAGES_PRICE_LABEL[lang] ?? PACKAGES_PRICE_LABEL.de;
          const perMonth = PACKAGES_PER_MONTH[lang] ?? PACKAGES_PER_MONTH.de;
          const customLabel = PACKAGES_CUSTOM[lang] ?? PACKAGES_CUSTOM.de;
          const cta = norm.cta || i18nHero[lang]?.cta || 'Kostenlose Beratung';
          const priceLine = pkg.price ? `${fromLabel} ${pkg.price} ${perMonth}` : customLabel;
          const features = pkg.features ?? [];
          staticContent = [
            '<article style="max-width:880px;margin:3rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">',
            norm.badge
              ? `<p style="display:inline-block;background:#0A264A;color:#fff;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0.75rem;border-radius:999px;margin:0 0 1rem;">${escapeHtmlMin(norm.badge)}</p>`
              : '',
            `<h1 style="font-size:2rem;font-weight:900;line-height:1.2;margin:0 0 0.75rem;">${escapeHtmlMin(norm.headline)}</h1>`,
            `<p style="font-size:1.5rem;color:#ED8400;font-weight:700;margin:0 0 1rem;">${escapeHtmlMin(priceLine)}</p>`,
            norm.subline
              ? `<p style="font-size:1.125rem;line-height:1.5;margin:0 0 1.5rem;color:#0A264A;opacity:0.85;">${escapeHtmlMin(norm.subline)}</p>`
              : '',
            features.length > 0
              ? `<ul style="list-style:none;padding:0;margin:0 0 1.5rem;">${features
                  .map((f) => `<li style="padding:0.5rem 0;">✓ ${escapeHtmlMin(f)}</li>`)
                  .join('')}</ul>`
              : '',
            `<a href="/${lang}${contactSlug(lang)}" style="display:inline-block;background:#ED8400;color:#fff;font-weight:700;padding:0.75rem 2rem;border-radius:0.75rem;text-decoration:none;">${escapeHtmlMin(cta)}</a>`,
            '</article>',
          ]
            .filter(Boolean)
            .join('');
        } else {
          staticContent = buildPackagePageStatic(pkg, lang);
        }
        extraSchemas.push(buildProductSchema(pkg, canonicalUrl, lang));
        // FAQPage from bundle.faq.items[] — Pakete bundles have 6-7 FAQs each.
        const pkgFaq = buildFaqPageFromBundle(canonicalUrl, pkgBundle?.faq?.items);
        if (pkgFaq) extraSchemas.push(pkgFaq);
        // Breadcrumb: Home → Produkte → Package. We intentionally drop a
        // "Pakete" intermediate step because there is no /produkte/pakete
        // route — only the products hub (/produkte) and individual package
        // pages exist. Adding a fake intermediate would point to the same
        // URL as "Produkte" and confuse AI engines.
        extraSchemas.push(
          buildBreadcrumbList(canonicalUrl, [
            ...baseCrumbs,
            { name: localizedPackageName(pkg, lang), url: canonicalUrl },
          ]),
        );
        extraSchemas.push(
          buildPageWebPageSchema({
            canonicalUrl,
            name: title,
            description,
            lang,
            mainEntityId: `${canonicalUrl}#product`,
            image: packageImageUrl(pkg),
          }),
        );
      } else if (isHub) {
        staticContent = buildHubPageStatic(lang);
        extraSchemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#collection`,
          url: canonicalUrl,
          name: title,
          description,
          inLanguage: localeOf(lang),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          mainEntity: {
            "@type": "ItemList",
            name: `${navLabel(lang, 'produkte')} — ${navLabel(lang, 'pakete')}`,
            numberOfItems: PACKAGES.length,
            itemListElement: PACKAGES.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@id": `${SITE_URL}/#service-${p.key}` },
            })),
          },
        });
        extraSchemas.push(
          buildBreadcrumbList(canonicalUrl, [
            ...baseCrumbs.slice(0, 1),
            { name: navLabel(lang, 'produkte'), url: canonicalUrl },
          ]),
        );
      } else if (addonRegistry) {
        const bundle = loadBundle(lang, addonRegistry.bundle) ?? loadBundle('de', addonRegistry.bundle);
        staticContent = buildAddonPageStatic({ lang, bundle, registry: addonRegistry });
        extraSchemas.push(
          buildAddonProductSchema({ canonicalUrl, lang, bundle, registry: addonRegistry, routeKey: route.key }),
        );
        // FAQPage if the bundle has at least 2 FAQ items.
        const faqSchema = buildFaqPageFromBundle(canonicalUrl, bundle?.faq?.items);
        if (faqSchema) extraSchemas.push(faqSchema);
        extraSchemas.push(
          buildPageWebPageSchema({
            canonicalUrl,
            name: title,
            description,
            lang,
            mainEntityId: `${canonicalUrl}#product`,
            image: addonImageUrl(route.key),
          }),
        );
        // Breadcrumb: Home → Produkte → Add-Ons → [Add-on name]. The
        // Add-Ons crumb points to the hub which DOES exist as a route.
        const addonName =
          bundle?.meta?.breadcrumbName ?? bundle?.hero?.headline ?? route.key;
        extraSchemas.push(
          buildBreadcrumbList(canonicalUrl, [
            ...baseCrumbs,
            { name: navLabel(lang, 'add-ons'), url: `${SITE_URL}/${lang}/produkte/add-ons` },
            { name: addonName, url: canonicalUrl },
          ]),
        );
      } else if (isAddonsHub) {
        staticContent = buildAddonsHubStatic(lang);
        // CollectionPage with mainEntity → ItemList of all 6 add-on Products.
        const addonRoutes = Object.entries(ADDON_REGISTRY);
        extraSchemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#collection`,
          url: canonicalUrl,
          name: title,
          description,
          inLanguage: localeOf(lang),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          datePublished: BUILD_DATE,
          dateModified: BUILD_DATE,
          mainEntity: {
            "@type": "ItemList",
            name: navLabel(lang, 'add-ons'),
            numberOfItems: addonRoutes.length,
            itemListElement: addonRoutes.map(([key], i) => {
              const r = routes.find((rt) => rt.key === key);
              const slug = r?.slugs?.[lang] ?? r?.slugs?.de ?? '';
              return {
                "@type": "ListItem",
                position: i + 1,
                item: { "@id": `${SITE_URL}/${lang}${slug}#product` },
              };
            }),
          },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ['h1', 'section p:first-of-type'],
          },
        });
        extraSchemas.push(
          buildBreadcrumbList(canonicalUrl, [
            ...baseCrumbs,
            { name: navLabel(lang, 'add-ons'), url: canonicalUrl },
          ]),
        );
      } else if (isHardware) {
        staticContent = buildHardwarePageStatic(lang);
        const hardwareList = buildHardwareItemList(canonicalUrl, lang);
        // FAQPage from hardware.json bundle (4 FAQs).
        const hwBundle = loadBundle(lang, 'hardware') ?? loadBundle('de', 'hardware');
        const hwFaq = buildFaqPageFromBundle(canonicalUrl, hwBundle?.faq?.items);
        if (hwFaq) extraSchemas.push(hwFaq);
        extraSchemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#collection`,
          url: canonicalUrl,
          name: title,
          description,
          inLanguage: localeOf(lang),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          mainEntity: hardwareList,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ['h1', 'article > p:first-of-type'],
          },
        });
        extraSchemas.push(
          buildBreadcrumbList(canonicalUrl, [
            ...baseCrumbs,
            { name: navLabel(lang, 'hardware'), url: canonicalUrl },
          ]),
        );
      }

      if (staticContent) {
        html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticContent}</div>`);
      }
      if (extraSchemas.length) {
        const blocks = extraSchemas
          .map((s) => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
          .join('\n');
        html = html.replace('</head>', `${blocks}\n  </head>`);
      }
    }

    // Build output path: dist/<lang>/<slug>/index.html.
    // For the home route (slug === '/') write dist/<lang>/index.html.
    const dirSegments = slug === '/' ? [lang] : [lang, ...slug.replace(/^\//, '').split('/')];
    const outDir = join(distDir, ...dirSegments);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    perLangCount += 1;
  }
}

console.log(`\n✅ Per-language pre-render: ${perLangCount} files (${routes.length} routes × ${LANGUAGES.length} languages)`);
console.log('✅ Pre-rendered critical pages created (with hreflang + x-default)');

// ─── Phase 3: Per-post blog pre-render (DE-only) ─────────────────────────────
// Reads blog data from src/data/blog-posts-generated.ts via Node 24 native TS
// import (`import type` only is stripped). For every post writes
// dist/de/blog/<slug>/index.html with: localised meta, BlogPosting JSON-LD,
// article OpenGraph tags, and a static <article> block inside #root that
// crawlers can read without executing JS (createRoot replaces it on hydration).
const { generatedBlogPosts } = await import(
  new URL('../src/data/blog-posts-generated.ts', import.meta.url).href
);

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Approximate word count from bodyHtml (strip tags, count whitespace-separated tokens).
const countWords = (html) => {
  if (!html) return 0;
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  return text.split(/\s+/).filter(Boolean).length;
};

// Strip HTML tags + entities to plain text. Used for static article fallback
// and FAQ-answer extraction (LLMs read inner text directly).
const stripTagsToText = (html) => {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Returns the first content <h2> + the first <p> that follows it in bodyHtml.
// Skips wrapper-like h2s inside <aside> (TLDR boxes) and the FAQ heading,
// so the result is a real article subheading + lead-in paragraph that
// crawlers can read alongside the post's H1.
const extractFirstSection = (bodyHtml) => {
  if (!bodyHtml) return null;
  // Drop <aside>...</aside> blocks first so their inner h2s don't win.
  const cleaned = bodyHtml.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = h2Re.exec(cleaned)) !== null) {
    const heading = stripTagsToText(m[1]);
    if (/^\s*(faq|häufige|frequently)/i.test(heading)) continue;
    const after = cleaned.slice(m.index + m[0].length);
    const pMatch = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const lead = pMatch ? stripTagsToText(pMatch[1]) : '';
    return { heading, lead };
  }
  return null;
};

// Extracts Q&A pairs from a post's FAQ section.
// Heuristic: find <h2>FAQ...</h2>, then iterate <h3>Question?</h3><p>Answer</p>
// pairs until the next <h2> (or end). Returns null if no FAQ section.
const extractFaqItems = (bodyHtml) => {
  if (!bodyHtml) return null;
  const faqHeadingRe = /<h2[^>]*>\s*(?:FAQ|Häufige|Frequently)[^<]*<\/h2>/i;
  const headingMatch = bodyHtml.match(faqHeadingRe);
  if (!headingMatch) return null;
  const start = headingMatch.index + headingMatch[0].length;
  // FAQ section ends at the next <h2> or end-of-document.
  const nextH2 = bodyHtml.slice(start).search(/<h2[^>]*>/i);
  const section = nextH2 >= 0 ? bodyHtml.slice(start, start + nextH2) : bodyHtml.slice(start);
  // Pair every <h3>...</h3> with the immediately following <p>...</p>.
  const items = [];
  const pairRe = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pm;
  while ((pm = pairRe.exec(section)) !== null) {
    const q = stripTagsToText(pm[1]);
    const a = stripTagsToText(pm[2]);
    if (q && a && q.length < 250 && a.length > 20) items.push({ q, a });
  }
  return items.length >= 2 ? items : null;
};

const buildFaqPageSchema = (post, items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/de/blog/${post.slug}#faq`,
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

const buildBlogPostingSchema = (post) => {
  const url = `${SITE_URL}/de/blog/${post.slug}`;
  // Use real Person @id refs for founders (links into Org @graph),
  // fall back to inline Person nodes for guest authors.
  const authorNames = post.author.split(/\s*&\s*/).filter(Boolean);
  const author = authorNames.map((name) => {
    const known = personSchemaByName.get(name);
    return known ? { "@id": known["@id"] } : { "@type": "Person", name };
  });
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription || post.description,
    image: `${SITE_URL}/logo-gastro-master.png`,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: author.length === 1 ? author[0] : author,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Gastro Master",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-gastro-master.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: [...(post.keywords ?? []), ...(post.tags ?? [])].join(", "),
    wordCount: countWords(post.bodyHtml),
    inLanguage: "de-DE",
  };
};

let blogCount = 0;
let faqPostsCount = 0;
for (const post of generatedBlogPosts) {
  const url = `${SITE_URL}/de/blog/${post.slug}`;
  const title = `${post.title} | Gastro Master Blog`;
  const description = post.metaDescription || post.description || '';
  const schema = buildBlogPostingSchema(post);

  // Heuristic content extraction from bodyHtml.
  const firstSection = extractFirstSection(post.bodyHtml);
  const faqItems = extractFaqItems(post.bodyHtml);
  if (faqItems) faqPostsCount += 1;

  // Static crawler fallback: lives inside #root so createRoot() replaces it
  // when the React app mounts. AI crawlers (GPTBot/ClaudeBot/Perplexity) that
  // do not execute JS see the headline, byline, lead paragraph, first section
  // heading + body, and (when present) the FAQ Q&A pairs as schema-marked-up
  // text. Together this is enough for an AI engine to summarise + cite.
  const sectionBlock = firstSection
    ? `<h2>${escapeHtml(firstSection.heading)}</h2><p>${escapeHtml(firstSection.lead)}</p>`
    : '';
  const faqBlock = faqItems
    ? '<section itemscope itemtype="https://schema.org/FAQPage"><h2>Häufige Fragen</h2>' +
      faqItems
        .map(
          ({ q, a }) =>
            `<div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">` +
            `<h3 itemprop="name">${escapeHtml(q)}</h3>` +
            `<div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">` +
            `<p itemprop="text">${escapeHtml(a)}</p></div></div>`,
        )
        .join('') +
      '</section>'
    : '';
  const staticArticle = [
    '<article itemscope itemtype="https://schema.org/BlogPosting" style="max-width:760px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h1 itemprop="headline">${escapeHtml(post.title)}</h1>`,
    `<p><small>Von <span itemprop="author">${escapeHtml(post.author)}</span> · `,
    `<time itemprop="datePublished" datetime="${escapeHtml(post.publishedDate)}">${escapeHtml(post.publishedDate)}</time>`,
    ` · ${post.readingTime || 5} Min. Lesezeit · `,
    `<span itemprop="articleSection">${escapeHtml(post.category)}</span></small></p>`,
    `<p itemprop="description">${escapeHtml(post.excerpt || description)}</p>`,
    sectionBlock,
    faqBlock,
    '</article>',
  ].join('');

  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escapeHtml(description)}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escapeHtml(title)}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escapeHtml(description)}"`,
    )
    .replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="article"`)
    .replace(/<html\s+lang="[^"]*"/, `<html lang="de"`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${staticArticle}</div>`);

  const articleMeta = [
    `<meta property="article:published_time" content="${escapeHtml(post.publishedDate)}">`,
    `<meta property="article:modified_time" content="${escapeHtml(post.publishedDate)}">`,
    `<meta property="article:author" content="${escapeHtml(post.author)}">`,
    `<meta property="article:section" content="${escapeHtml(post.category)}">`,
    ...(post.tags ?? [])
      .slice(0, 6)
      .map((t) => `<meta property="article:tag" content="${escapeHtml(t)}">`),
    `<meta name="keywords" content="${escapeHtml([...(post.keywords ?? []), ...(post.tags ?? [])].join(', '))}">`,
  ].join('\n  ');

  // Hreflang: DE-only blog → self-canonical for `de` + `x-default` (both → DE).
  const hreflangTags =
    `  <link rel="alternate" hreflang="de" href="${url}" />\n` +
    `  <link rel="alternate" hreflang="x-default" href="${url}" />`;

  const headExtras = [
    `<link rel="canonical" href="${url}">`,
    hreflangTags,
    articleMeta,
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    faqItems
      ? `<script type="application/ld+json">${JSON.stringify(buildFaqPageSchema(post, faqItems))}</script>`
      : null,
  ]
    .filter(Boolean)
    .join('\n  ');

  html = html.replace('</head>', `  ${headExtras}\n  </head>`);

  const outDir = join(distDir, 'de', 'blog', post.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  blogCount += 1;
}

console.log(`✅ Blog pre-render: ${blogCount} DE posts (BlogPosting schema + static article fallback) — ${faqPostsCount} with FAQPage schema`);
