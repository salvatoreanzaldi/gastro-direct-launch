/**
 * Post-build script: generates dist/sitemap.xml
 * Reads route config from src/config/routes.ts (parsed as text, no TS runtime needed).
 * Supports per-language localized slugs.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Parse routes from TypeScript config ─────────────────────────────────────
const configSource = readFileSync(resolve(ROOT, "src/config/routes.ts"), "utf-8");

// Matches entries that use the `slugs(de, en, it)` helper:
//   { key: "foo", slugs: slugs("/de-slug", "/en-slug", "/it-slug"), importPath: "...", priority: 0.8, changefreq: "weekly" }
const helperRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*slugs\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

// Matches entries with an explicit slugs object (e.g. the homepage):
//   { key: "home", slugs: { de: "/", en: "/", it: "/", fa: "/", si: "/", ru: "/" }, ... }
const explicitRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*\{\s*de:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*it:\s*"([^"]+)",\s*fa:\s*"([^"]+)",\s*si:\s*"([^"]+)",\s*ru:\s*"([^"]+)"\s*\}\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

const routes = [];
let m;

while ((m = helperRegex.exec(configSource)) !== null) {
  const [, key, de, en, it, priority, changefreq] = m;
  routes.push({
    key,
    slugs: { de, en, it, fa: en, si: en, ru: en },
    priority: parseFloat(priority),
    changefreq,
  });
}

while ((m = explicitRegex.exec(configSource)) !== null) {
  const [, key, de, en, it, fa, si, ru, priority, changefreq] = m;
  routes.push({
    key,
    slugs: { de, en, it, fa, si, ru },
    priority: parseFloat(priority),
    changefreq,
  });
}

if (routes.length === 0) {
  console.error("❌ No routes found in src/config/routes.ts");
  process.exit(1);
}

// ─── Config ──────────────────────────────────────────────────────────────────
const BASE_URL = "https://gastro-master.de";
const LANGUAGES = ["de", "en", "it", "fa", "si", "ru"];
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// ─── Generate XML ────────────────────────────────────────────────────────────
const urlEntries = [];

const buildHref = (lang, slug) => {
  const pathPart = slug === "/" ? "" : slug;
  return `${BASE_URL}/${lang}${pathPart}`;
};

for (const route of routes) {
  for (const lang of LANGUAGES) {
    const loc = buildHref(lang, route.slugs[lang]);

    const alternates = LANGUAGES.map(
      (altLang) =>
        `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${buildHref(altLang, route.slugs[altLang])}" />`,
    ).join("\n");

    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildHref("de", route.slugs.de)}" />`;

    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
${alternates}
${xDefault}
  </url>`);
  }
}

// ─── Blog post URLs ───────────────────────────────────────────────────────────
// Parse slug + publishedDate from src/data/blog-posts-generated.ts (single source of truth).
// Blog is DE-only (no hreflang alternates).
const blogPostsSource = readFileSync(
  resolve(ROOT, "src/data/blog-posts-generated.ts"),
  "utf-8",
);

const blogPostRegex = /slug:\s*"([^"]+)"[\s\S]*?publishedDate:\s*"([^"]+)"/g;
const blogPosts = [];
let bp;
while ((bp = blogPostRegex.exec(blogPostsSource)) !== null) {
  blogPosts.push({ slug: bp[1], publishedDate: bp[2] });
}

for (const { slug, publishedDate } of blogPosts) {
  const loc = `${BASE_URL}/de/blog/${slug}`;
  urlEntries.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${publishedDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlEntries.join("\n")}
</urlset>
`;

// ─── Write to dist/ ──────────────────────────────────────────────────────────
const outPath = resolve(ROOT, "dist/sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");

const blogUrlCount = blogPosts.length;
console.log(`✅ Sitemap generated: ${routes.length} routes × ${LANGUAGES.length} languages = ${routes.length * LANGUAGES.length} route URLs + ${blogUrlCount} blog URLs (DE only) = ${urlEntries.length} total URLs`);
console.log(`   → ${outPath}`);
