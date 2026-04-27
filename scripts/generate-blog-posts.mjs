/**
 * Generates src/data/blog-posts-generated.ts from Obsidian blog-exports.
 * Usage: node scripts/generate-blog-posts.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const BLOG_EXPORTS_DIR =
  "/Users/salvatore/Desktop/Obsidian/Obsidian/04 Ressourcen/blog-exports";

const BATCH_DIRS = [
  "batch-01-bestellsysteme",
  "batch-02-bestellsysteme",
  "batch-03-bestellsysteme",
  "batch-04-cluster1-2-uebergang",
  "batch-05-cluster2-compliance",
  "batch-06-cluster2-3-uebergang",
  "batch-07-cluster3-marketing",
  "batch-08-cluster3-marketing",
  "batch-09-cluster3-4-uebergang",
  "batch-10-cluster4-hr",
  "batch-11-cluster4-5-uebergang",
  "batch-12-cluster5-finanzen",
  "batch-13-cluster5-6-uebergang",
  "batch-14-cluster6-gruendung",
  "batch-15-cluster6-7-uebergang",
  "batch-16-cluster7-trends",
  "batch-17-cluster7-8-uebergang",
  "batch-18-cluster8-betrieb-service",
  "batch-19-cluster8-9-uebergang",
  "batch-20-cluster9-finale",
];

/**
 * Normalize meta: handle both top-level fields and nested post_meta format.
 * Returns a unified flat object with all fields we need.
 */
function normalizeMeta(raw) {
  // If top-level slug exists, it's a standard format
  if (raw.slug) return raw;

  // Nested format: fields live inside post_meta (and other sub-objects)
  if (raw.post_meta && typeof raw.post_meta === "object") {
    const pm = raw.post_meta;
    const seo = raw.meta_seo || {};

    // Collect product links from produktlinks_audit
    const productLinks = [];
    if (raw.produktlinks_audit?.links) {
      for (const l of raw.produktlinks_audit.links) {
        if (l.url) productLinks.push(l.url.replace(/^https?:\/\/gastro-master\.de/, ""));
      }
    }

    return {
      post_id: pm.position || null,
      slug: pm.slug,
      title: pm.title || pm.h1_title,
      meta_description: seo.meta_description || pm.meta_description,
      meta_tags: seo.meta_title
        ? { meta_description: seo.meta_description }
        : null,
      publish_date: pm.publish_date,
      cluster: pm.cluster,
      main_keyword: pm.focus_keyword ? { term: pm.focus_keyword } : null,
      secondary_keywords: pm.secondary_keywords || [],
      categories: pm.categories || [],
      tags: pm.tags || [],
      reading_time_minutes: pm.reading_time_minutes,
      internal_links: {
        product_links_unique: productLinks,
      },
    };
  }

  return raw;
}

const CATEGORY_MAP = {
  // Bestellsysteme
  "Bestellsysteme": "Bestellsysteme",
  "Cluster 1": "Bestellsysteme",
  "Bestellsysteme & Lieferservice": "Bestellsysteme",
  "Bestellsysteme-Lieferservice": "Bestellsysteme",
  "bestellsysteme-lieferservice": "Bestellsysteme",
  // Lieferservice
  "Lieferservice": "Lieferservice",
  // Website & Marketing
  "Website & Marketing": "Website & Marketing",
  "Cluster 3": "Website & Marketing",
  "Marketing & Sichtbarkeit": "Website & Marketing",
  "marketing": "Website & Marketing",
  "marketing-sichtbarkeit": "Website & Marketing",
  "Marketing & Sichtbarkeit (Übergang zu Cluster 4)": "Website & Marketing",
  "Marketing & Sichtbarkeit (Cluster-Start)": "Website & Marketing",
  "→ 3 Übergang": "Website & Marketing",
  "→ 3 (Übergang)": "Website & Marketing",
  "3-uebergang": "Website & Marketing",
  // Recht & Compliance
  "Recht & Compliance": "Recht & Compliance",
  "Cluster 2": "Recht & Compliance",
  "Compliance": "Recht & Compliance",
  "Kassensysteme & Compliance": "Recht & Compliance",
  // Personal & Schulung
  "Personal & Schulung": "Personal & Schulung",
  "Cluster 4": "Personal & Schulung",
  "HR": "Personal & Schulung",
  "HR & Personal": "Personal & Schulung",
  "Personal & HR (Cluster-Start)": "Personal & Schulung",
  "Cluster 4 — HR & Personal": "Personal & Schulung",
  "→ 4 (Übergang)": "Personal & Schulung",
  // Finanzen
  "Finanzen": "Finanzen",
  "finanzen": "Finanzen",
  "Cluster 5": "Finanzen",
  "Finanzen & BWL": "Finanzen",
  "finanzen-bwl": "Finanzen",
  // Gründung
  "Gründung": "Gründung",
  "Gruendung": "Gründung",
  "gruendung": "Gründung",
  "Cluster 6 Gründung (Abschluss)": "Gründung",
  // Betrieb & Service
  "Betrieb & Service": "Betrieb & Service",
  "Cluster 8": "Betrieb & Service",
  "Spezial & Long-Tail": "Betrieb & Service",
  // Trends & Zukunft
  "Trends & Zukunft": "Trends & Zukunft",
  "Trends & Zukunft (Speisen-Fokus)": "Trends & Zukunft",
  "Cluster 7": "Trends & Zukunft",
};

function normalizeCategory(raw) {
  if (!raw) return "Betrieb & Service";
  const trimmed = raw.trim();
  return CATEGORY_MAP[trimmed] ?? trimmed;
}

/**
 * Simplify a cluster string like "1 Bestellsysteme" → "Bestellsysteme"
 * or "3 — Marketing & Sichtbarkeit" → "Marketing & Sichtbarkeit"
 * or "4" → "Cluster 4"
 */
function simplifyCluster(clusterRaw) {
  if (!clusterRaw) return "Betrieb & Service";
  const s = String(clusterRaw).trim();
  // Remove leading number + optional separators (spaces, dashes, em-dashes, —)
  const match = s.match(/^\d+\s*[—\-–]?\s*(.*)/);
  if (match && match[1].trim()) {
    return match[1].trim();
  }
  // Fallback if only a number
  if (/^\d+$/.test(s)) return `Cluster ${s}`;
  return s;
}

/**
 * Convert a URL like "/produkte/pakete/online-bestellshop" to a title
 */
function urlToTitle(url) {
  const segments = url.replace(/\/$/, "").split("/");
  const last = segments[segments.length - 1];
  if (!last) return url;
  const withSpaces = last.replace(/-/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

/**
 * Extract product link URLs from a meta.json's internal_links field.
 * Handles many different formats across batches.
 */
function extractProductLinks(internalLinks) {
  if (!internalLinks || typeof internalLinks !== "object") return [];

  // Format: { product_links_unique: ["/produkte/..."] }
  if (Array.isArray(internalLinks.product_links_unique)) {
    return internalLinks.product_links_unique.filter(
      (u) => typeof u === "string"
    );
  }

  // Format: { product_links_unique: { links: [{url: "https://gastro-master.de/..."}] } }
  if (
    internalLinks.product_links_unique &&
    typeof internalLinks.product_links_unique === "object" &&
    Array.isArray(internalLinks.product_links_unique.links)
  ) {
    return internalLinks.product_links_unique.links
      .map((l) => {
        const u = l.url || "";
        return u.replace(/^https?:\/\/gastro-master\.de/, "");
      })
      .filter(Boolean);
  }

  // Format: { product_urls: ["https://gastro-master.de/..."] }
  if (Array.isArray(internalLinks.product_urls)) {
    return internalLinks.product_urls
      .map((u) => u.replace(/^https?:\/\/gastro-master\.de/, ""))
      .filter(Boolean);
  }

  // Format: { products: ["/produkte/..."] }
  if (Array.isArray(internalLinks.products)) {
    return internalLinks.products.filter((u) => typeof u === "string");
  }

  // Format: { product_links_detail: [{url: "/produkte/..."}] }
  if (Array.isArray(internalLinks.product_links_detail)) {
    return internalLinks.product_links_detail
      .map((l) => {
        const u = l.url || "";
        return u.replace(/^https?:\/\/gastro-master\.de/, "");
      })
      .filter(Boolean);
  }

  return [];
}

/**
 * Clean the wordpress HTML body:
 * - Remove <!-- wp:... --> and <!-- /wp:... --> comments
 * - Remove <script> tags (including JSON-LD)
 * - Remove HTML comments <!-- ... -->
 * - Remove the first <h1>...</h1>
 * - Remove <p class="post-meta">...</p>
 * - Replace "TL;DR" variants with "Das Wichtigste auf einen Blick"
 * - Remove Hook/Hook-Intro pseudo-headings (writing-prompt residue)
 * - Trim and remove empty leading/trailing lines
 */
function cleanBodyHtml(html) {
  let result = html;

  // Remove WordPress block comments (both inline and multiline)
  result = result.replace(/<!--\s*\/?wp:[^>]*-->/g, "");

  // Remove <script> tags (including JSON-LD blocks)
  result = result.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // Remove remaining HTML comments
  result = result.replace(/<!--[\s\S]*?-->/g, "");

  // Remove the first <h1>...</h1> occurrence
  result = result.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");

  // Remove <p class="post-meta">...</p>
  result = result.replace(/<p[^>]*class="post-meta"[^>]*>[\s\S]*?<\/p>/gi, "");

  // Remove author-signature divs (contain wrong author attribution — Salvatore Anzaldi)
  result = result.replace(/<div[^>]*class="[^"]*author-signature[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");

  // Remove related-posts sections (redundant navigation block)
  result = result.replace(/<section[^>]*class="[^"]*related-posts[^"]*"[^>]*>[\s\S]*?<\/section>/gi, "");

  // Remove any line containing wrong author attribution "Salvatore Anzaldi"
  result = result.split("\n").filter((l) => !l.includes("Salvatore Anzaldi")).join("\n");

  // Remove "Hook" and "Hook-Intro" pseudo-headings (writing-prompt artifacts)
  // Covers: <h2>Hook</h2>, <h2>Hook: ...</h2>, <h2>Hook-Intro</h2>, <h2>Hook — ...</h2>, <h2 id="hook">Hook</h2>
  result = result.replace(/<h[1-6][^>]*>\s*Hook(-Intro)?\s*(:|—|&mdash;|-)?\s*[\s\S]*?<\/h[1-6]>/gi, "");

  // Normalize internal links from absolute gastro-master.de URLs to locale-prefixed paths
  // (keeps JSON-LD @id anchors + logo.png intact because JSON-LD <script> was stripped above)
  // Special case: #bewertungen anchor on /uber-uns → external Google reviews
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/uber-uns#bewertungen/g, "https://g.page/r/CdCNZ5Fg01PBEBM/review");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/uber-uns/g, "/de/uber-uns");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/kontakt/g, "/de/kontakt");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/loesungen/g, "/de/loesungen");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/produkte/g, "/de/produkte");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/blog\//g, "/de/blog/");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/blog(?=["\s<])/g, "/de/blog");
  // Drop wp-content legacy paths to avoid 404s (logo stays intact in JSON-LD context)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/wp-content\/[^"\s]*/g, "");
  // Trailing base-URL cleanup (but leave the domain in strong/JSON-like contexts that escape stripping here)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/(?=["'\s<])/g, "/de/");
  // Bare domain without trailing slash (e.g. href="https://gastro-master.de">text</a>)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de(?=["'\s<])/g, "/de");
  // For "Alle Bewertungen lesen" link target="_blank" — ensure it's external-safe
  result = result.replace(
    /<a([^>]*?)href="https:\/\/g\.page\/r\/CdCNZ5Fg01PBEBM\/review"([^>]*)>/g,
    '<a$1href="https://g.page/r/CdCNZ5Fg01PBEBM/review" target="_blank" rel="noopener noreferrer"$2>'
  );
  // De-duplicate target/rel attrs in case already present
  result = result.replace(/(target="_blank")([^>]*?)(target="_blank")/g, "$1$2");
  result = result.replace(/(rel="noopener noreferrer")([^>]*?)(rel="noopener noreferrer")/g, "$1$2");

  // Replace TL;DR variants with German equivalent — CASE-SENSITIVE to avoid
  // matching lowercase `tldr-box` class names. Matches: "TL;DR", "TL;DR —", "TL;DR:"
  result = result.replace(/\bTL;?DR\b\s*(?:—|&mdash;|-|:)?\s*/g, "Das Wichtigste auf einen Blick ");
  // Clean up double spaces / trailing spaces from replacement
  result = result.replace(/Das Wichtigste auf einen Blick\s+Das Wichtigste auf einen Blick/g, "Das Wichtigste auf einen Blick");

  // Collapse multiple blank lines into single blank lines
  result = result.replace(/\n{3,}/g, "\n\n");

  // Trim leading/trailing whitespace
  result = result.trim();

  return result;
}

/**
 * Decode common HTML entities to plain UTF-8 characters.
 */
function decodeHtmlEntities(str) {
  return str
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&bdquo;/g, "„")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&auml;/g, "ä")
    .replace(/&ouml;/g, "ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß")
    .replace(/&amp;/g, "&");
}

/**
 * Generate a human-readable excerpt (≤160 chars) for BlogCard.
 * Strategy: find first clean <p>, skip callouts/lists/headings,
 * skip paragraphs with heavy compliance markers (§§).
 */
function generateExcerpt(bodyHtml, title) {
  const fallback = `Praxiswissen zu „${title}" — kompakt, aktuell und auf den Punkt.`;
  if (!bodyHtml) return fallback;

  let html = bodyHtml;
  // Remove all callout blocks, lists, tables, blockquotes, headings, figures
  html = html.replace(/<aside[\s\S]*?<\/aside>/gi, "");
  html = html.replace(/<(ul|ol|table|figure|blockquote)[\s\S]*?<\/\1>/gi, "");
  html = html.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, "");
  html = html.replace(/<(div|section)[^>]*class="[^"]*(tldr|callout|hinweis|warnung|info-box)[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, "");

  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];

  const truncate = (text) => {
    if (text.length <= 160) return text;
    const cut = text.substring(0, 160);
    const lastSpace = cut.lastIndexOf(" ");
    const body = lastSpace > 100 ? cut.substring(0, lastSpace) : cut;
    return body.replace(/[,;:—–\-]+$/, "").trim() + "…";
  };

  const cleanPara = (raw) => {
    let t = raw.replace(/<[^>]+>/g, "").trim();
    t = decodeHtmlEntities(t);
    t = t.replace(/\s+/g, " ").trim();
    return t;
  };

  const isMetaOrDisclaimer = (t) => {
    // Post-meta lines (Veröffentlicht / Letztes Update / Autor / Lesezeit)
    if (/^(Letztes Update|Veröffentlicht|Aktualisiert|Update|Autor|Lesezeit)[\s:·]/i.test(t)) return true;
    if (/·\s*(Autor|Lesezeit|von\s+\w+)/i.test(t) && t.length < 180) return true;
    // Disclaimers / legal hedges
    if (/^(Dieser (Artikel|Beitrag|Text) (dient|ersetzt|stellt|ist))/i.test(t)) return true;
    if (/ersetzt keine\s+(steuer|rechts|arbeits|juristisch)/i.test(t)) return true;
    if (/^(Haftungsausschluss|Rechtlicher Hinweis|Disclaimer|Quelle|Hinweis|Stand):/i.test(t)) return true;
    return false;
  };

  // Pass 1: strictly clean paragraphs (no §, no compliance intros, no meta/disclaimers)
  for (const m of pMatches) {
    const t = cleanPara(m[1]);
    if (t.length < 60) continue;
    if (t.includes("§")) continue;
    if (isMetaOrDisclaimer(t)) continue;
    return truncate(t);
  }

  // Pass 2: relaxed — strip §-parentheticals and abbreviation ballast
  for (const m of pMatches) {
    let t = cleanPara(m[1]);
    if (isMetaOrDisclaimer(t)) continue;
    t = t.replace(/\([^)]*§[^)]*\)/g, "");
    t = t.replace(/§+\s*\d+[a-zA-Z]*(\s*(?:Abs\.|Nr\.|S\.|ff\.?)\s*\d*)*/g, "");
    t = t.replace(/\s+/g, " ").trim().replace(/\s*,\s*,/g, ",");
    if (t.length < 40) continue;
    return truncate(t);
  }

  return fallback;
}

// ─── Schema.org constants ────────────────────────────────────────────────────

const SITE_BASE = "https://gastro-master.de";
const LOGO_URL = `${SITE_BASE}/logo-gastro-master.png`;
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 1024;

const AUTHOR_RENE = {
  "@type": "Person",
  "name": "René Ebert",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/rene-ebert.png`,
};
const AUTHOR_SANJAYA = {
  "@type": "Person",
  "name": "Sanjaya Pattiyage",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/sanjaya-pattiyage.png`,
};
const AUTHOR_SALVATORE = {
  "@type": "Person",
  "name": "Salvatore Anzaldi",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/salvatore-anzaldi.png`,
};

// Slugs whose Author is Salvatore Anzaldi — parsed from src/config/blog-authors.ts
// (single source of truth shared with the UI AuthorBox).
const SALVATORE_SLUGS = (() => {
  const source = readFileSync(
    resolve(ROOT, "src/config/blog-authors.ts"),
    "utf-8",
  );
  const match = source.match(/SALVATORE_SLUGS\s*=\s*new\s+Set<string>\(\s*\[([\s\S]*?)\]\s*\)/);
  if (!match) {
    throw new Error("Could not parse SALVATORE_SLUGS from src/config/blog-authors.ts");
  }
  const slugs = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return new Set(slugs);
})();

const CONTENT_NODE_TYPES = new Set([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "TechArticle",
  "ScholarlyArticle",
]);

function isContentNode(node) {
  const t = node["@type"];
  if (typeof t !== "string") return false;
  return CONTENT_NODE_TYPES.has(t) || t.endsWith("Article");
}

/**
 * Count words in HTML body (strip tags, decode entities, split on whitespace).
 */
function countWords(html) {
  if (!html) return 0;
  const text = decodeHtmlEntities(
    html.replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
  );
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

/**
 * Extract JSON-LD content from HTML. Returns the raw JSON string,
 * or "" if no <script type="application/ld+json"> block exists.
 * (Schema fixes are applied by the caller via fixJsonLdMeta.)
 */
function extractJsonLd(html) {
  const match = html.match(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i
  );
  if (!match) return "";
  return match[1].trim();
}

/**
 * Build a minimal Article skeleton when the source HTML has no JSON-LD block.
 * Author/publisher/image/mainEntityOfPage are stubs — fixJsonLdMeta fills them
 * with deterministic values afterwards.
 */
function buildFallbackJsonLd({ title, description, datePublished }) {
  const obj = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": "",
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": [],
    "publisher": { "@type": "Organization", "name": "Gastro Master" },
    "mainEntityOfPage": "",
  };
  return JSON.stringify(obj);
}

/**
 * Apply all schema corrections to a parsed jsonLd string.
 * ctx: { slug, bodyHtml, isSalvatore }
 *
 * Fixes:
 *   B.1 publisher.logo → deterministic logo URL with width/height
 *   B.2 mainEntityOfPage.@id → /de/blog/{slug}
 *   B.3 image → logo as ImageObject (no per-post covers exist)
 *   B.4 inLanguage = "de-DE" on Article/BlogPosting nodes
 *   B.5 wordCount on Article/BlogPosting nodes
 *   B.6 Person.image for author objects
 *   B.7 author override based on isSalvatore flag
 */
function fixJsonLdMeta(jsonLdStr, ctx) {
  if (!jsonLdStr) return jsonLdStr;
  try {
    const obj = JSON.parse(jsonLdStr);
    const { slug, bodyHtml, isSalvatore } = ctx;
    const wordCount = countWords(bodyHtml);
    const correctAuthors = isSalvatore
      ? [AUTHOR_SALVATORE]
      : [AUTHOR_RENE, AUTHOR_SANJAYA];
    const canonicalUrl = `${SITE_BASE}/de/blog/${slug}`;

    const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];

    for (const node of nodes) {
      // B.1 — publisher.logo (on any node with publisher object)
      if (node.publisher && typeof node.publisher === "object" && !Array.isArray(node.publisher)) {
        node.publisher.logo = {
          "@type": "ImageObject",
          "url": LOGO_URL,
          "width": LOGO_WIDTH,
          "height": LOGO_HEIGHT,
        };
      }

      // B.1 (Organization-level logo)
      if (node["@type"] === "Organization") {
        if (typeof node.logo === "string" || (node.logo && typeof node.logo === "object")) {
          node.logo = {
            "@type": "ImageObject",
            "url": LOGO_URL,
            "width": LOGO_WIDTH,
            "height": LOGO_HEIGHT,
          };
        }
      }

      if (isContentNode(node)) {
        // B.2 — mainEntityOfPage.@id (always Object format with @type: WebPage)
        if (typeof node.mainEntityOfPage === "string") {
          node.mainEntityOfPage = { "@type": "WebPage", "@id": canonicalUrl };
        } else if (node.mainEntityOfPage && typeof node.mainEntityOfPage === "object") {
          node.mainEntityOfPage["@id"] = canonicalUrl;
          node.mainEntityOfPage["@type"] = node.mainEntityOfPage["@type"] || "WebPage";
        } else {
          node.mainEntityOfPage = {
            "@type": "WebPage",
            "@id": canonicalUrl,
          };
        }

        // B.3 — image (replace any string or wp-content URL with logo ImageObject)
        node.image = {
          "@type": "ImageObject",
          "url": LOGO_URL,
          "width": LOGO_WIDTH,
          "height": LOGO_HEIGHT,
        };

        // B.4 — inLanguage
        node.inLanguage = "de-DE";

        // B.5 — wordCount
        if (wordCount > 0) {
          node.wordCount = wordCount;
        }

        // B.6 + B.7 — author with image
        node.author = correctAuthors;
      }
    }

    return JSON.stringify(obj, null, 2);
  } catch {
    return jsonLdStr;
  }
}

/**
 * Get the title from meta — prefers the longer `title` or `h1_title`, falls back to `meta_title`
 */
function getTitle(meta) {
  return meta.title || meta.h1_title || meta.meta_title || meta.slug || "";
}

/**
 * Get description from meta
 */
function getDescription(meta) {
  return (
    meta.meta_tags?.meta_description ||
    meta.meta_description ||
    getTitle(meta)
  );
}

/**
 * Get secondary keywords from meta (various formats)
 */
function getSecondaryKeywords(meta) {
  if (Array.isArray(meta.secondary_keywords)) return meta.secondary_keywords;
  return [];
}

/**
 * Get reading time
 */
function getReadingTime(meta) {
  return (
    meta.reading_time_minutes ||
    meta.reading_time_min ||
    meta.reading_time ||
    10
  );
}

/**
 * Get cluster/category — returns one of the 9 canonical labels
 */
function getCategory(meta) {
  if (meta.cluster) return normalizeCategory(simplifyCluster(meta.cluster));
  if (Array.isArray(meta.categories) && meta.categories.length > 0)
    return normalizeCategory(meta.categories[0]);
  return "Betrieb & Service";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const posts = [];
const errors = [];

for (const batchDir of BATCH_DIRS) {
  const batchPath = join(BLOG_EXPORTS_DIR, batchDir);

  let files;
  try {
    files = readdirSync(batchPath);
  } catch (e) {
    errors.push(`Could not read directory: ${batchPath}`);
    continue;
  }

  // Find all meta.json files
  const metaFiles = files.filter((f) => f.endsWith("-meta.json"));

  for (const metaFile of metaFiles) {
    let rawMeta;
    try {
      const metaContent = readFileSync(join(batchPath, metaFile), "utf-8");
      rawMeta = JSON.parse(metaContent);
    } catch (e) {
      errors.push(`Failed to parse ${metaFile}: ${e.message}`);
      continue;
    }

    // Normalize meta to handle nested formats
    const meta = normalizeMeta(rawMeta);

    const slug = meta.slug;
    if (!slug) {
      errors.push(`No slug in ${metaFile}`);
      continue;
    }

    // Find corresponding wordpress.html via slug match
    const wpFile = files.find(
      (f) => f.includes(slug) && f.endsWith("-wordpress.html")
    );

    let bodyHtml = "";
    let jsonLd = "";
    const isSalvatore = SALVATORE_SLUGS.has(slug);

    if (wpFile) {
      try {
        const wpContent = readFileSync(join(batchPath, wpFile), "utf-8");
        bodyHtml = cleanBodyHtml(wpContent);
        jsonLd = extractJsonLd(wpContent);
      } catch (e) {
        errors.push(`Failed to read ${wpFile}: ${e.message}`);
      }
    } else {
      errors.push(`No wordpress.html found for slug: ${slug} in ${batchDir}`);
    }

    // Fallback: build a minimal Article skeleton if the source HTML had no JSON-LD.
    // (fixJsonLdMeta will then enrich it with deterministic author/publisher/image/etc.)
    if (!jsonLd || jsonLd.trim() === "") {
      jsonLd = buildFallbackJsonLd({
        title: getTitle(meta),
        description: getDescription(meta),
        datePublished: meta.publish_date || "2026-01-01",
      });
    }

    // Apply all schema fixes (B.1–B.7)
    jsonLd = fixJsonLdMeta(jsonLd, { slug, bodyHtml, isSalvatore });

    // Build internalLinks
    const productLinks = extractProductLinks(meta.internal_links || {});
    const internalLinks = productLinks
      .filter((url) => typeof url === "string" && url.startsWith("/"))
      .slice(0, 3) // max 3 per rule
      .map((url) => ({
        title: urlToTitle(url),
        href: "/de" + url,
      }));

    // Build post
    const secondaryKeywords = getSecondaryKeywords(meta);
    const mainKeywordTerm = meta.main_keyword?.term || meta.focus_keyword || "";
    const keywords = [mainKeywordTerm, ...secondaryKeywords].filter(Boolean);

    const post = {
      id: meta.post_id ? `post-${meta.post_id}` : `post-${slug}`,
      slug,
      title: getTitle(meta),
      description: getDescription(meta),
      excerpt: generateExcerpt(bodyHtml, getTitle(meta)),
      metaDescription: getDescription(meta),
      bodyHtml,
      jsonLd,
      author: isSalvatore ? "Salvatore Anzaldi" : "René Ebert & Sanjaya Pattiyage",
      publishedDate: meta.publish_date || "2026-01-01",
      category: getCategory(meta),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      keywords,
      readingTime: getReadingTime(meta),
      featured: false,
      internalLinks,
      faqItems: [],
      sections: [],
    };

    posts.push(post);
  }
}

// ─── Write output ─────────────────────────────────────────────────────────────

const postEntries = posts
  .map((post) => {
    const lines = [
      `  {`,
      `    id: ${JSON.stringify(post.id)},`,
      `    slug: ${JSON.stringify(post.slug)},`,
      `    title: ${JSON.stringify(post.title)},`,
      `    description: ${JSON.stringify(post.description)},`,
      `    excerpt: ${JSON.stringify(post.excerpt)},`,
      `    metaDescription: ${JSON.stringify(post.metaDescription)},`,
      `    bodyHtml: ${JSON.stringify(post.bodyHtml)},`,
      `    jsonLd: ${JSON.stringify(post.jsonLd)},`,
      `    author: ${JSON.stringify(post.author)},`,
      `    publishedDate: ${JSON.stringify(post.publishedDate)},`,
      `    category: ${JSON.stringify(post.category)},`,
      `    tags: ${JSON.stringify(post.tags)},`,
      `    keywords: ${JSON.stringify(post.keywords)},`,
      `    readingTime: ${post.readingTime},`,
      `    featured: ${post.featured},`,
      `    internalLinks: ${JSON.stringify(post.internalLinks)},`,
      `    faqItems: [],`,
      `    sections: [],`,
      `  }`,
    ];
    return lines.join("\n");
  })
  .join(",\n");

const output = `// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-blog-posts.mjs
import type { BlogPost } from './blog-posts-types';

export const generatedBlogPosts: BlogPost[] = [
${postEntries}
];
`;

const outPath = resolve(ROOT, "src/data/blog-posts-generated.ts");
writeFileSync(outPath, output, "utf-8");

console.log(`✅ Generated ${posts.length} posts → ${outPath}`);

if (errors.length > 0) {
  console.warn(`\n⚠️  ${errors.length} warning(s):`);
  errors.forEach((e) => console.warn(`   - ${e}`));
}
