/**
 * Validates Schema.org / JSON-LD payloads in src/data/blog-posts-generated.ts.
 * Field-existence checks only — no external API calls.
 *
 * Usage: node scripts/validate-schema.mjs
 * Exit code != 0 on validation failure.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SAMPLE_SLUGS = [
  "lieferando-bestellung-stornieren",
  "eigene-lieferservice-app",
];

const REQUIRED_ARTICLE_FIELDS = [
  "headline",
  "description",
  "image",
  "datePublished",
  "author",
  "publisher",
  "mainEntityOfPage",
  "inLanguage",
  "wordCount",
];

const CONTENT_TYPES = new Set([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "TechArticle",
  "ScholarlyArticle",
]);

function isContentNode(node) {
  const t = node["@type"];
  if (typeof t !== "string") return false;
  return CONTENT_TYPES.has(t) || t.endsWith("Article");
}

function loadPosts() {
  const source = readFileSync(
    resolve(ROOT, "src/data/blog-posts-generated.ts"),
    "utf-8",
  );
  const posts = [];
  const re =
    /slug:\s*"([^"]+)",[\s\S]*?jsonLd:\s*("(?:[^"\\]|\\[\s\S])*"),[\s\S]*?author:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    posts.push({ slug: m[1], jsonLd: JSON.parse(m[2]), author: m[3] });
  }
  return posts;
}

function validatePost(post) {
  const errors = [];
  const { slug, jsonLd, author } = post;

  if (!jsonLd) {
    errors.push(`[${slug}] empty jsonLd`);
    return errors;
  }

  let obj;
  try {
    obj = JSON.parse(jsonLd);
  } catch (e) {
    errors.push(`[${slug}] jsonLd is not valid JSON: ${e.message}`);
    return errors;
  }

  if (obj["@context"] !== "https://schema.org") {
    errors.push(`[${slug}] @context missing or wrong (expected https://schema.org)`);
  }

  const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
  const contentNodes = nodes.filter(isContentNode);

  if (contentNodes.length === 0) {
    errors.push(`[${slug}] no Article/BlogPosting node found`);
    return errors;
  }

  for (const node of contentNodes) {
    const t = node["@type"];

    for (const f of REQUIRED_ARTICLE_FIELDS) {
      if (node[f] === undefined || node[f] === null || node[f] === "") {
        errors.push(`[${slug}] ${t} missing required field "${f}"`);
      }
    }

    if (node.inLanguage !== "de-DE") {
      errors.push(`[${slug}] ${t}.inLanguage = "${node.inLanguage}" (expected "de-DE")`);
    }

    if (typeof node.wordCount !== "number" || node.wordCount <= 0) {
      errors.push(`[${slug}] ${t}.wordCount invalid: ${node.wordCount}`);
    }

    if (typeof node.image === "string" && node.image.includes("/wp-content/")) {
      errors.push(`[${slug}] ${t}.image still references legacy /wp-content/ URL`);
    }
    if (node.image && typeof node.image === "object" && typeof node.image.url === "string"
        && node.image.url.includes("/wp-content/")) {
      errors.push(`[${slug}] ${t}.image.url still references legacy /wp-content/ URL`);
    }

    if (Array.isArray(node.author)) {
      for (const a of node.author) {
        if (a["@type"] !== "Person") errors.push(`[${slug}] author entry missing @type=Person`);
        if (!a.name) errors.push(`[${slug}] author entry missing name`);
        if (!a.url) errors.push(`[${slug}] author entry missing url`);
        if (!a.image) errors.push(`[${slug}] author entry "${a.name}" missing image`);
      }
      if (author === "Salvatore Anzaldi") {
        if (node.author.length !== 1 || node.author[0].name !== "Salvatore Anzaldi") {
          errors.push(`[${slug}] expected author = [Salvatore Anzaldi] for Salvatore-post`);
        }
      } else {
        const names = node.author.map((a) => a.name).sort().join("|");
        if (names !== "René Ebert|Sanjaya Pattiyage") {
          errors.push(`[${slug}] expected authors = [René Ebert, Sanjaya Pattiyage], got: ${names}`);
        }
      }
    } else {
      errors.push(`[${slug}] author is not an array`);
    }

    const pub = node.publisher;
    if (!pub || typeof pub !== "object") {
      errors.push(`[${slug}] publisher missing`);
    } else {
      if (pub["@type"] !== "Organization") errors.push(`[${slug}] publisher.@type != Organization`);
      if (!pub.logo || typeof pub.logo !== "object") {
        errors.push(`[${slug}] publisher.logo missing or not an object`);
      } else {
        if (pub.logo["@type"] !== "ImageObject") errors.push(`[${slug}] publisher.logo.@type != ImageObject`);
        if (!pub.logo.url || pub.logo.url.includes("/wp-content/")) {
          errors.push(`[${slug}] publisher.logo.url invalid: ${pub.logo.url}`);
        }
        if (typeof pub.logo.width !== "number" || typeof pub.logo.height !== "number") {
          errors.push(`[${slug}] publisher.logo missing width/height`);
        }
      }
    }

    const me = node.mainEntityOfPage;
    const meId = typeof me === "string" ? me : me?.["@id"];
    const expectedCanon = `https://gastro-master.de/de/blog/${slug}`;
    if (meId !== expectedCanon) {
      errors.push(`[${slug}] mainEntityOfPage @id = "${meId}" (expected "${expectedCanon}")`);
    }
  }

  return errors;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const posts = loadPosts();
console.log(`Loaded ${posts.length} blog posts.`);

const targets = posts.filter((p) => SAMPLE_SLUGS.includes(p.slug));
if (targets.length === 0) {
  console.error("❌ None of the sample slugs were found.");
  process.exit(1);
}

let allErrors = [];
for (const post of targets) {
  const errs = validatePost(post);
  allErrors = allErrors.concat(errs);
}

// Spot-check ALL posts for the most critical fields (image, inLanguage, wordCount)
for (const post of posts) {
  if (!post.jsonLd || post.jsonLd.trim() === "") {
    allErrors.push(`[${post.slug}] jsonLd is empty — no structured data`);
    continue;
  }
  let obj;
  try {
    obj = JSON.parse(post.jsonLd);
  } catch (e) {
    allErrors.push(`[${post.slug}] jsonLd not parseable: ${e.message}`);
    continue;
  }
  const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
  let hasContentNode = false;
  for (const node of nodes) {
    if (!isContentNode(node)) continue;
    hasContentNode = true;
    if (node.inLanguage !== "de-DE") {
      allErrors.push(`[${post.slug}] inLanguage missing or wrong`);
    }
    if (typeof node.wordCount !== "number" || node.wordCount <= 0) {
      allErrors.push(`[${post.slug}] wordCount missing`);
    }
    const imgUrl = typeof node.image === "object" ? node.image?.url : node.image;
    if (typeof imgUrl === "string" && imgUrl.includes("/wp-content/")) {
      allErrors.push(`[${post.slug}] image still uses /wp-content/`);
    }
  }
  if (!hasContentNode) {
    allErrors.push(`[${post.slug}] no Article/BlogPosting node found in jsonLd`);
  }
}

if (allErrors.length === 0) {
  console.log(`✅ All ${targets.length} sample posts valid.`);
  console.log(`✅ All ${posts.length} posts pass critical-field checks.`);
  process.exit(0);
} else {
  console.error(`❌ ${allErrors.length} validation error(s):`);
  for (const e of allErrors.slice(0, 50)) console.error(`   - ${e}`);
  if (allErrors.length > 50) console.error(`   ... and ${allErrors.length - 50} more`);
  process.exit(1);
}
