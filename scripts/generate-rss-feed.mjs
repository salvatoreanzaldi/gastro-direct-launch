/**
 * Post-build script: generates dist/feed.xml (RSS 2.0) for the blog.
 * AI engines (ChatGPT/Perplexity) and feed readers use RSS to discover
 * new content faster than crawling the sitemap.
 *
 * Usage: node scripts/generate-rss-feed.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const distDir = resolve(ROOT, 'dist');
const SITE_URL = 'https://gastro-master.de';
const FEED_URL = `${SITE_URL}/feed.xml`;
const BLOG_URL = `${SITE_URL}/de/blog`;

const { generatedBlogPosts } = await import(
  new URL('../src/data/blog-posts-generated.ts', import.meta.url).href
);

// Sort newest first.
const posts = [...generatedBlogPosts].sort(
  (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate),
);

const escapeXml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toRfc822 = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
};

const items = posts
  .map((post) => {
    const url = `${SITE_URL}/de/blog/${post.slug}`;
    const description = post.metaDescription || post.description || post.excerpt || '';
    const categories = [post.category, ...(post.tags ?? [])].filter(Boolean);
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${toRfc822(post.publishedDate)}</pubDate>
      <author>noreply@gastro-master.de (${escapeXml(post.author)})</author>
${categories.map((c) => `      <category>${escapeXml(c)}</category>`).join('\n')}
    </item>`;
  })
  .join('\n');

const lastBuildDate = toRfc822(posts[0]?.publishedDate ?? new Date().toISOString());

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gastro Master Blog</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>Praxis-Wissen für Gastronomen: Bestellsysteme, Lieferdienst, Kasse, Marketing — von Gastro Master, dem provisionsfreien DACH-Standard.</description>
    <language>de-DE</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Gastro Master Build Pipeline</generator>
${items}
  </channel>
</rss>
`;

writeFileSync(join(distDir, 'feed.xml'), xml);
console.log(`✅ RSS feed generated: ${posts.length} posts → dist/feed.xml`);
