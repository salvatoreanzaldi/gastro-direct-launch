/**
 * Preview excerpt generation on 5 random posts before full regen.
 * Reads bodyHtml directly from the blog-exports batch folders.
 * Usage: node scripts/preview-excerpts.mjs [count]
 */

import { readFileSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const BLOG_EXPORTS_DIR =
  "/Users/salvatore/Desktop/Obsidian/Obsidian/04 Ressourcen/blog-exports";

// ─── Duplicated from generate-blog-posts.mjs for standalone use ──────────────

function decodeHtmlEntities(str) {
  return str
    .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")
    .replace(/&bdquo;/g, "„").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”")
    .replace(/&auml;/g, "ä").replace(/&ouml;/g, "ö").replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß").replace(/&amp;/g, "&");
}

function cleanBodyForExcerpt(html) {
  let r = html;
  r = r.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  r = r.replace(/<!--[\s\S]*?-->/g, "");
  r = r.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
  return r;
}

function generateExcerpt(bodyHtml, title) {
  const fallback = `Praxiswissen zu „${title}" — kompakt, aktuell und auf den Punkt.`;
  if (!bodyHtml) return fallback;

  let html = cleanBodyForExcerpt(bodyHtml);
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
    if (/^(Letztes Update|Veröffentlicht|Aktualisiert|Update|Autor|Lesezeit)[\s:·]/i.test(t)) return true;
    if (/·\s*(Autor|Lesezeit|von\s+\w+)/i.test(t) && t.length < 180) return true;
    if (/^(Dieser (Artikel|Beitrag|Text) (dient|ersetzt|stellt|ist))/i.test(t)) return true;
    if (/ersetzt keine\s+(steuer|rechts|arbeits|juristisch)/i.test(t)) return true;
    if (/^(Haftungsausschluss|Rechtlicher Hinweis|Disclaimer|Quelle|Hinweis|Stand):/i.test(t)) return true;
    return false;
  };

  for (const m of pMatches) {
    const t = cleanPara(m[1]);
    if (t.length < 60) continue;
    if (t.includes("§")) continue;
    if (isMetaOrDisclaimer(t)) continue;
    return truncate(t);
  }

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

// ─── Main ─────────────────────────────────────────────────────────────────────

const count = parseInt(process.argv[2] || "5", 10);
const batchDirs = readdirSync(BLOG_EXPORTS_DIR).filter((d) => d.startsWith("batch-"));

const allPosts = [];
for (const bd of batchDirs) {
  const bp = join(BLOG_EXPORTS_DIR, bd);
  let files;
  try { files = readdirSync(bp); } catch { continue; }
  const metaFiles = files.filter((f) => f.endsWith("-meta.json"));
  for (const mf of metaFiles) {
    try {
      const rawMeta = JSON.parse(readFileSync(join(bp, mf), "utf-8"));
      const slug = rawMeta.slug || rawMeta.post_meta?.slug;
      const title = rawMeta.h1_title || rawMeta.title || rawMeta.post_meta?.h1_title || rawMeta.post_meta?.title || slug;
      const metaDesc = rawMeta.meta_description || rawMeta.meta_seo?.meta_description || rawMeta.post_meta?.meta_description || "";
      if (!slug) continue;
      const wpFile = files.find((f) => f.includes(slug) && f.endsWith("-wordpress.html"));
      let bodyHtml = "";
      if (wpFile) bodyHtml = readFileSync(join(bp, wpFile), "utf-8");
      allPosts.push({ slug, title, metaDesc, bodyHtml });
    } catch {}
  }
}

// Pick `count` random posts
const shuffled = [...allPosts].sort(() => Math.random() - 0.5).slice(0, count);

console.log(`\n📝 Excerpt-Preview auf ${count} zufälligen Posts\n${"═".repeat(70)}\n`);

for (const p of shuffled) {
  const excerpt = generateExcerpt(p.bodyHtml, p.title);
  console.log(`\x1b[1m[${p.slug}]\x1b[0m`);
  console.log(`\x1b[2mTitel:\x1b[0m    ${p.title}`);
  console.log(`\x1b[31mVORHER:\x1b[0m   ${p.metaDesc.slice(0, 200)}${p.metaDesc.length > 200 ? "…" : ""}`);
  console.log(`\x1b[32mNACHHER:\x1b[0m  ${excerpt}`);
  console.log(`\x1b[2mLänge:    ${excerpt.length} Zeichen\x1b[0m`);
  console.log("─".repeat(70));
}

console.log(`\n✅ Preview fertig. Wenn OK: \`node scripts/generate-blog-posts.mjs\``);
