import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const distDir = join(__dirname, '..', 'dist');
const SITE_URL = 'https://gastro-master.de';

// Read base index.html and SEO metadata from Single Source of Truth
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
const seoMeta = JSON.parse(readFileSync(join(__dirname, '..', 'src', 'data', 'seoMeta.json'), 'utf-8'));

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
      itemListElement: PACKAGE_ITEMS.map(item => ({
        "@type": "ListItem",
        position: item.position,
        item: { "@id": item["@id"] }
      }))
    }
  },
  {
    path: '/loesungen/lieferdienst',
    title: seoMeta['/loesungen/lieferdienst'].title,
    description: seoMeta['/loesungen/lieferdienst'].description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Lieferdienst Lösung",
      "description": "Eigene Lieferplattform mit 0 % Provision"
    }
  },
  {
    path: '/produkte/add-ons',
    title: seoMeta['/produkte/add-ons'].title,
    description: seoMeta['/produkte/add-ons'].description,
    schema: {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Gastro Master Add-Ons"
    }
  }
];

mkdirSync(distDir, { recursive: true });

for (const page of pages) {
  const htmlWithMeta = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${page.description}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${page.title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${page.description}"`
    );

  // Add canonical link + schema to head
  const canonicalUrl = `${SITE_URL}${page.path}`;
  const htmlWithMeta2 = htmlWithMeta.replace(
    '</head>',
    `<link rel="canonical" href="${canonicalUrl}">\n  <script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n  </head>`
  );

  const htmlWithSchema = htmlWithMeta2;

  const filepath = join(distDir, page.path, 'index.html');
  mkdirSync(join(distDir, page.path), { recursive: true });
  writeFileSync(filepath, htmlWithSchema);

  console.log(`✅ Generated: ${page.path}/index.html`);
}

console.log('\n✅ Pre-rendered critical pages created');
