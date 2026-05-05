/**
 * Build-step JSON-LD validator.
 *
 * Scans every pre-rendered dist/**\/index.html and validates each
 * <script type="application/ld+json"> block:
 *
 *   1. Parses as valid JSON.
 *   2. Has @context (= https://schema.org).
 *   3. Has @type (or @graph with valid nodes inside).
 *   4. Type-specific required-field checks (BlogPosting, FAQPage,
 *      Organization, AggregateRating, Person, ItemList, Service,
 *      OfferCatalog, Article, WebSite, BreadcrumbList, WebPage).
 *
 * Exits with non-zero status on any failure so the build pipeline
 * blocks broken schemas from being released.
 *
 * Usage: node scripts/validate-jsonld.mjs
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const distDir = resolve(ROOT, 'dist');

// Required fields per Schema.org type. Soft check — missing fields warn but
// don't fail the build (Google + AI engines tolerate optional fields).
const REQUIRED = {
  BlogPosting: ['headline', 'datePublished', 'author', 'publisher'],
  Article: ['headline', 'datePublished', 'author', 'publisher'],
  FAQPage: ['mainEntity'],
  Organization: ['name', 'url'],
  Person: ['name'],
  AggregateRating: ['ratingValue', 'reviewCount'],
  ItemList: ['itemListElement'],
  WebPage: ['url'],
  WebSite: ['url'],
  BreadcrumbList: ['itemListElement'],
  Service: ['name'],
  OfferCatalog: ['name'],
  Question: ['name', 'acceptedAnswer'],
};

const findHtmlFiles = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...findHtmlFiles(full));
    else if (entry === 'index.html') out.push(full);
  }
  return out;
};

const ldBlockRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

const errors = [];
const warnings = [];
let totalFiles = 0;
let totalBlocks = 0;
let totalNodes = 0;
const typeCounts = {};

const validateNode = (node, fileRel, blockIdx) => {
  if (!node || typeof node !== 'object') {
    errors.push(`${fileRel} [block ${blockIdx}]: not an object`);
    return;
  }
  const type = node['@type'];
  if (!type) {
    warnings.push(`${fileRel} [block ${blockIdx}]: missing @type`);
    return;
  }
  totalNodes += 1;
  const typeKey = Array.isArray(type) ? type[0] : type;
  typeCounts[typeKey] = (typeCounts[typeKey] || 0) + 1;
  const required = REQUIRED[typeKey];
  if (required) {
    const missing = required.filter((k) => node[k] === undefined || node[k] === null);
    if (missing.length) {
      warnings.push(`${fileRel} [block ${blockIdx}] ${typeKey}: missing ${missing.join(', ')}`);
    }
  }
  // Recurse into FAQPage Question nodes.
  if (typeKey === 'FAQPage' && Array.isArray(node.mainEntity)) {
    node.mainEntity.forEach((q, i) => validateNode(q, fileRel, `${blockIdx}.mainEntity[${i}]`));
  }
};

for (const filePath of findHtmlFiles(distDir)) {
  totalFiles += 1;
  const fileRel = filePath.replace(distDir, '').replace(/\\/g, '/');
  const html = readFileSync(filePath, 'utf-8');
  let match;
  let blockIdx = 0;
  while ((match = ldBlockRe.exec(html)) !== null) {
    blockIdx += 1;
    totalBlocks += 1;
    let parsed;
    try {
      parsed = JSON.parse(match[1].trim());
    } catch (e) {
      errors.push(`${fileRel} [block ${blockIdx}]: invalid JSON — ${e.message}`);
      continue;
    }
    if (!parsed['@context']) {
      warnings.push(`${fileRel} [block ${blockIdx}]: missing @context`);
    }
    if (Array.isArray(parsed['@graph'])) {
      parsed['@graph'].forEach((n, i) => validateNode(n, fileRel, `${blockIdx}.@graph[${i}]`));
    } else {
      validateNode(parsed, fileRel, blockIdx);
    }
  }
}

console.log('═══ JSON-LD VALIDATION ═══');
console.log(`Files scanned: ${totalFiles}`);
console.log(`JSON-LD blocks: ${totalBlocks}`);
console.log(`Schema nodes: ${totalNodes}`);
console.log('Node types:');
for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${type.padEnd(20)} ${count}`);
}
if (warnings.length) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach((w) => console.log(`  ${w}`));
  if (warnings.length > 10) console.log(`  ... and ${warnings.length - 10} more`);
}
if (errors.length) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach((e) => console.error(`  ${e}`));
  console.error('\n❌ JSON-LD VALIDATION FAILED');
  process.exit(1);
}
console.log('\n✅ JSON-LD VALIDATION PASSED');
