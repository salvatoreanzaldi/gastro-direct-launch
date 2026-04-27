/**
 * Single source of truth for which blog posts are authored by Salvatore Anzaldi
 * (vs. the default René Ebert + Sanjaya Pattiyage co-author pair).
 *
 * Consumed by:
 *   - src/pages/blog/BlogPostDetailPage.tsx (UI AuthorBox)
 *   - scripts/generate-blog-posts.mjs (jsonLd author field, parsed via regex)
 *
 * When adding a new Salvatore-authored post, add its slug here — both UI and
 * Schema.org metadata will pick it up automatically.
 */
export const SALVATORE_SLUGS = new Set<string>([
  "eigene-lieferservice-app",
]);
