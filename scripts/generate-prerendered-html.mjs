import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const distDir = join(__dirname, '..', 'dist');

// Read base index.html
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

const pages = [
  {
    path: '/preise',
    title: 'Gastro Master — Preise & Pakete',
    description: 'Alle Gastro Master Pakete im Überblick: Von der Website über Webshop bis zur Kasse. Transparente Preise, monatlich kündbar.',
    schema: {
      "@type": "PriceCheckAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://gastro-master.de/preise",
        "actionPlatform": ["DesktopWebPlatform", "MobileWebPlatform", "TabletWebPlatform"]
      }
    }
  },
  {
    path: '/loesungen/lieferdienst',
    title: 'Lieferdienst — Provisionsfreie Lieferplattform',
    description: 'Starten Sie Ihren eigenen Lieferdienst mit 0 % Provision. Gastro Master bietet die komplette Lösung: Lieferapp, Fahrerverwaltung, Telemetrie.',
    schema: {
      "@type": "Service",
      "name": "Lieferdienst Lösung",
      "description": "Eigene Lieferplattform mit 0 % Provision"
    }
  },
  {
    path: '/produkte/add-ons',
    title: 'Add-Ons — Erweitern Sie Ihr System',
    description: 'Add-Ons für Gastro Master: QR-Code-Flyer, Fahrer-App, Tischbestell-System, Kitchen Display, Kiosk Self-Ordering.',
    schema: {
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

  // Add schema if needed
  const htmlWithSchema = htmlWithMeta.includes('data-prerender="true"')
    ? htmlWithMeta
    : htmlWithMeta.replace(
        '</head>',
        `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n  </head>`
      );

  const filepath = join(distDir, page.path, 'index.html');
  mkdirSync(join(distDir, page.path), { recursive: true });
  writeFileSync(filepath, htmlWithSchema);

  console.log(`✅ Generated: ${page.path}/index.html`);
}

console.log('\n✅ Pre-rendered critical pages created');
