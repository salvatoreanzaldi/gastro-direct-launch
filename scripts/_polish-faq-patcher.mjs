#!/usr/bin/env node
/**
 * [POLISH-PASS — FAQ Source-File Patcher]
 * Liest /tmp/faq-content.json + /tmp/faq-source-map.json
 * Patcht für jeden Slug die zugehörige wordpress.html oder .md
 *
 * Modi:
 *   - NEW:    Quelle hat KEINE FAQ-Sektion → ganzen Block "Häufige Fragen" einfügen
 *             (vor <section class="google-reviews-embed"> oder vor <!-- author-signature -->)
 *   - APPEND: Quelle hat schon FAQ-Sektion → neue H3+P Pairs ans Ende der Sektion anhängen
 *             (vor nächstem H2 oder vor Reviews-Block)
 */
import { readFileSync, writeFileSync } from "fs";

const content = JSON.parse(readFileSync("/tmp/faq-content.json", "utf-8"));
const sourceMap = JSON.parse(readFileSync("/tmp/faq-source-map.json", "utf-8"));

// Convert FAQ items to WordPress-block HTML markup, matching existing style.
function faqsToHtmlBlock(faqs, isNewSection) {
  const items = faqs
    .map(({ q, a }) => {
      return [
        `<!-- wp:heading {"level":3} -->`,
        `<h3>${escapeHtml(q)}</h3>`,
        `<!-- /wp:heading -->`,
        ``,
        `<!-- wp:paragraph -->`,
        `<p>${escapeHtml(a)}</p>`,
        `<!-- /wp:paragraph -->`,
      ].join("\n");
    })
    .join("\n\n");

  if (isNewSection) {
    return [
      ``,
      `<!-- wp:heading -->`,
      `<h2>Häufige Fragen</h2>`,
      `<!-- /wp:heading -->`,
      ``,
      items,
      ``,
    ].join("\n");
  }
  return `\n\n${items}\n`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Detect if the source file already has a FAQ section. Returns { hasFaq, h2Match, sectionEnd }.
// h2Match.index = start of <h2>FAQ</h2>
// sectionEnd = index where next H2 starts (or end of file marker)
function findFaqSection(raw) {
  const faqH2Re =
    /<h2[^>]*>([^<]*(?:FAQ|H[äa]ufige Fragen|Q\s*&amp;\s*A|Q&amp;A)[^<]*)<\/h2>/i;
  const h2Match = raw.match(faqH2Re);
  if (!h2Match) return { hasFaq: false };
  const startAfterH2 = h2Match.index + h2Match[0].length;
  // Find next <h2> (NOT this one) — section ends there
  const after = raw.substring(startAfterH2);
  const nextH2Re = /<h2[^>]*>/i;
  const nextH2 = after.match(nextH2Re);
  const sectionEndAbs = nextH2 ? startAfterH2 + nextH2.index : raw.length;
  return { hasFaq: true, h2Match, sectionEnd: sectionEndAbs };
}

// For a NEW section: find the right insertion point.
// Pattern: insert BEFORE <section class="google-reviews-embed">,
// or BEFORE <div class="author-signature">,
// or BEFORE the last </body>/</html>/end-of-content.
function findInsertionAnchor(raw) {
  // Priority 1: just before reviews-embed
  let m = raw.match(/<!-- wp:html -->\s*\n<section class="google-reviews-embed">/);
  if (m) return m.index;
  // Priority 2: before author-signature
  m = raw.match(/<!-- wp:html -->\s*\n<div class="author-signature">/);
  if (m) return m.index;
  // Priority 3: end of file
  return raw.length;
}

// For APPEND: insert new items right before the section-end marker.
// Strategy: insert just before the H2 that comes after the FAQ section.
// If there's also a "Quellen" section between, we'd insert before "Quellen".
function appendToExistingSection(raw, faqs) {
  const { sectionEnd } = findFaqSection(raw);
  const items = faqs
    .map(({ q, a }) =>
      [
        `\n<!-- wp:heading {"level":3} -->`,
        `<h3>${escapeHtml(q)}</h3>`,
        `<!-- /wp:heading -->`,
        ``,
        `<!-- wp:paragraph -->`,
        `<p>${escapeHtml(a)}</p>`,
        `<!-- /wp:paragraph -->`,
      ].join("\n"),
    )
    .join("\n");
  return raw.substring(0, sectionEnd) + items + "\n\n" + raw.substring(sectionEnd);
}

const stats = { newSections: 0, appended: 0, faqsTotal: 0, errors: [] };
const log = [];

for (const [slug, faqs] of Object.entries(content)) {
  const post = sourceMap[slug];
  if (!post) {
    stats.errors.push(`No source-map entry for slug: ${slug}`);
    continue;
  }
  let raw;
  try { raw = readFileSync(post.source_file, "utf-8"); }
  catch (e) { stats.errors.push(`Cannot read ${post.source_file}: ${e.message}`); continue; }

  const { hasFaq } = findFaqSection(raw);
  let updated;
  if (hasFaq) {
    updated = appendToExistingSection(raw, faqs);
    stats.appended++;
    log.push(`  APPEND ${slug}: +${faqs.length} FAQs`);
  } else {
    const anchor = findInsertionAnchor(raw);
    const block = faqsToHtmlBlock(faqs, /*isNewSection=*/ true);
    updated = raw.substring(0, anchor) + block + "\n" + raw.substring(anchor);
    stats.newSections++;
    log.push(`  NEW    ${slug}: ${faqs.length} FAQs`);
  }
  stats.faqsTotal += faqs.length;
  writeFileSync(post.source_file, updated, "utf-8");
}

console.log(log.join("\n"));
console.log(`\nDone: ${stats.newSections} NEW sections, ${stats.appended} APPEND, ${stats.faqsTotal} total FAQs`);
if (stats.errors.length) {
  console.log(`\nErrors:`);
  stats.errors.forEach((e) => console.log(`  ${e}`));
}
