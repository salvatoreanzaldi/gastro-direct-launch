import { readFileSync, writeFileSync, mkdirSync } from 'fs';
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
  .replace(/\n?\s*<link rel="alternate"[^>]+\/?>/g, '')
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

// Enrich the base index.html @graph so every downstream page (home + per-lang
// + blog posts) inherits the AggregateRating + Person nodes. Idempotent: we
// only add fields/nodes that aren't already present.
{
  const graphMatch = baseHtml.match(
    /<script type="application\/ld\+json">\s*(\{[\s\S]*?"@graph"[\s\S]*?\})\s*<\/script>/,
  );
  if (graphMatch && REVIEW_META.totalCount > 0) {
    try {
      const graph = JSON.parse(graphMatch[1]);
      // Idempotent: drop any previously injected Person nodes (matched by name)
      // and reset Organization-level enrichments before re-applying.
      const founderNames = new Set(FOUNDERS.map((f) => f.name));
      graph['@graph'] = graph['@graph'].filter(
        (n) => !(n['@type'] === 'Person' && founderNames.has(n.name)),
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
      }
      for (const person of personSchemaByName.values()) {
        graph['@graph'].push(person);
      }
      const replacement = `<script type="application/ld+json">\n${JSON.stringify(graph)}\n    </script>`;
      baseHtml = baseHtml.replace(graphMatch[0], replacement);
      console.log(
        `✅ @graph enriched: AggregateRating (${REVIEW_META.totalRating}★ · ${REVIEW_META.totalCount} reviews) + ${FOUNDERS.length} Person nodes`,
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

// Per-language home meta from the i18n bundles (`seo.indexTitle`/`indexDescription`).
// Used as the language-specific fallback when a route has no curated entry in seoMeta.json.
const i18nMeta = {};
for (const lang of LANGUAGES) {
  try {
    const bundle = JSON.parse(
      readFileSync(resolve(ROOT, `public/locales/${lang}/common.json`), 'utf-8'),
    );
    i18nMeta[lang] = {
      title: bundle?.seo?.indexTitle ?? ROOT_TITLE,
      description: bundle?.seo?.indexDescription ?? ROOT_DESC,
    };
  } catch {
    i18nMeta[lang] = { title: ROOT_TITLE, description: ROOT_DESC };
  }
}

let perLangCount = 0;
for (const route of routes) {
  // Schema (and curated meta) for routes covered by seoMeta.json
  const curatedMeta = seoMeta[route.slugs.de];
  const curatedSchema = pages.find((p) => p.path === route.slugs.de)?.schema;

  for (const lang of LANGUAGES) {
    const slug = route.slugs[lang];
    const canonicalUrl = buildHref(lang, slug);
    const hreflangTags = buildHreflangTags(route.slugs.de);

    // Priority: curated DE-only seoMeta.json > per-language home meta from i18n > root defaults.
    // (The home route gets the i18n meta in every language; other routes only have curated DE meta for now.)
    const langFallback = route.key === 'home' ? i18nMeta[lang] : undefined;
    const title = curatedMeta?.title ?? langFallback?.title ?? ROOT_TITLE;
    const description = curatedMeta?.description ?? langFallback?.description ?? ROOT_DESC;

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
for (const post of generatedBlogPosts) {
  const url = `${SITE_URL}/de/blog/${post.slug}`;
  const title = `${post.title} | Gastro Master Blog`;
  const description = post.metaDescription || post.description || '';
  const schema = buildBlogPostingSchema(post);

  // Static crawler fallback: lives inside #root so createRoot() replaces it
  // when the React app mounts. AI crawlers (GPTBot/ClaudeBot/Perplexity) that
  // do not execute JS see the headline, byline and lead paragraph here.
  const staticArticle = [
    '<article itemscope itemtype="https://schema.org/BlogPosting" style="max-width:760px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;color:#0A264A;">',
    `<h1 itemprop="headline">${escapeHtml(post.title)}</h1>`,
    `<p><small>Von <span itemprop="author">${escapeHtml(post.author)}</span> · `,
    `<time itemprop="datePublished" datetime="${escapeHtml(post.publishedDate)}">${escapeHtml(post.publishedDate)}</time>`,
    ` · ${post.readingTime || 5} Min. Lesezeit · `,
    `<span itemprop="articleSection">${escapeHtml(post.category)}</span></small></p>`,
    `<p itemprop="description">${escapeHtml(post.excerpt || description)}</p>`,
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
  ].join('\n  ');

  html = html.replace('</head>', `  ${headExtras}\n  </head>`);

  const outDir = join(distDir, 'de', 'blog', post.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  blogCount += 1;
}

console.log(`✅ Blog pre-render: ${blogCount} DE posts (BlogPosting schema + static article fallback)`);
