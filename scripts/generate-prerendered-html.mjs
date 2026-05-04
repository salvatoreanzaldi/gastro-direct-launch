import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const distDir = join(__dirname, '..', 'dist');
const SITE_URL = 'https://gastro-master.de';

// Read base index.html
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// 15 konversionsrelevante Routes (Daten aus packages.ts + addOns.ts)
const pages = [
  {
    path: '/',
    title: 'Gastro Master – Mehr Gewinn durch Direktbestellungen',
    description: 'Dein eigener Webshop & deine eigene App für die Gastronomie. 0 % Provision. Mehr Direktbestellungen. 700+ zufriedene Kunden.',
    schema: { "@type": "WebSite", "name": "Gastro Master" }
  },
  {
    path: '/preise',
    title: 'Gastro Master — Preise & Pakete',
    description: 'Alle Gastro Master Pakete im Überblick: Von der Website über Webshop bis zur Kasse. Transparente Preise, monatlich kündbar.',
    schema: {
      "@type": "CollectionPage",
      "name": "Preise",
      "description": "Alle Gastro Master Pakete und Add-Ons mit Preisen"
    }
  },
  {
    path: '/produkte/pakete/webseite',
    title: 'Webseite – Professionelle Restaurant-Website',
    description: 'Die Gastro Master Webseite ab 49 €/Monat. Professionelle Restaurant-Website ohne Bestellfunktion – ideal als digitale Visitenkarte.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "Gastro Master Webseite",
      "description": "Professionelle Restaurant-Website ab 49 €/Monat",
      "price": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "49" },
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "49", "billingIncrement": "P1M" }
    }
  },
  {
    path: '/produkte/pakete/online-bestellshop',
    title: 'Bestellsystem – Provisionsfreier Webshop',
    description: 'Das Bestellsystem ab 79 €/Monat mit Webshop, 0 % Provision und 2.500 QR-Code-Flyern.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "Gastro Master Starter (Bestellsystem)",
      "description": "Provisionfreier Webshop ab 79 €/Monat",
      "price": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "79" },
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "79", "billingIncrement": "P1M" }
    }
  },
  {
    path: '/produkte/pakete/bestell-app',
    title: 'Business – Webshop + Mobile App',
    description: 'App + Bestellsystem ab 149 €/Monat mit Webshop, nativer App und Push-Benachrichtigungen.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "Gastro Master Business (App + Bestellsystem)",
      "description": "Webshop + native App ab 149 €/Monat",
      "price": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "149" },
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "149", "billingIncrement": "P1M" }
    }
  },
  {
    path: '/produkte/pakete/kassensystem',
    title: 'Kassensystem – TSE-konform & GoBD-zertifiziert',
    description: 'Das Gastro Master Kassensystem ab 69 €/Monat. TSE-zertifiziert, GoBD-konform, mit persönlichem Support aus Deutschland.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "Gastro Master Kassensystem",
      "description": "TSE-konformes POS-System ab 69 €/Monat",
      "price": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "69" },
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "69", "billingIncrement": "P1M" }
    }
  },
  {
    path: '/produkte/add-ons/qr-code-flyer',
    title: 'QR-Code-Flyer – Gedruckte Bestell-Flyer',
    description: 'QR-Code-Flyer mit direktem Link in deinen Webshop. Akquise- und Reaktivierungs-Hebel für Bestandskunden.',
    schema: {
      "@type": "Product",
      "name": "QR-Code-Flyer",
      "description": "Gedruckte Flyer mit QR-Code für den Webshop"
    }
  },
  {
    path: '/produkte/add-ons/fahrer-app-gps',
    title: 'Fahrer-App mit GPS – Live-Tracking & Routen-Optimierung',
    description: 'GPS-Tracking-App für Auslieferer mit Lieferzeitenmessung und Tour-Übersicht. +10 €/Monat pro Fahrer.',
    schema: {
      "@type": "Product",
      "name": "Fahrer-App mit GPS",
      "description": "GPS-Tracking und Routen-Optimierung für Lieferfahrer"
    }
  },
  {
    path: '/produkte/add-ons/qr-code-tischsystem',
    title: 'QR-Code-Tischsystem – Tischbestell-Lösung',
    description: 'QR-Code am Tisch: Gäste scannen, bestellen direkt. Ohne Wartezeit, ohne zusätzlichen Personalaufwand.',
    schema: {
      "@type": "Product",
      "name": "QR-Code-Tischsystem",
      "description": "Tischbestellung via QR-Code für Restaurants"
    }
  },
  {
    path: '/produkte/add-ons/bildschirmfunktion',
    title: 'Kitchen Display – Küchen-Bildschirm',
    description: 'Küchen-Bildschirm zeigt eingehende Bestellungen in Echtzeit. Ersetzt Bonpapier, beschleunigt den Tresen-Workflow.',
    schema: {
      "@type": "Product",
      "name": "Bildschirmfunktion (Kitchen Display)",
      "description": "Echtzeit-Bestellanzeige für Küche und Tresen"
    }
  },
  {
    path: '/produkte/add-ons/kiosk',
    title: 'Kiosk Self-Ordering – Selbstbestellterminal',
    description: 'Self-Ordering-Terminal für Restaurants und Schnellgastronomie. Gäste bestellen autark, Personal-Kapazität auf Service.',
    schema: {
      "@type": "Product",
      "name": "Kiosk Self-Ordering",
      "description": "Selbstbestell-Terminal für Restaurants und Schnellgastronomie"
    }
  },
  {
    path: '/produkte/add-ons',
    title: 'Add-Ons — Erweitern Sie Ihr System',
    description: 'Add-Ons für Gastro Master: QR-Code-Flyer, Fahrer-App, Tischbestell-System, Kitchen Display, Kiosk Self-Ordering.',
    schema: {
      "@type": "CollectionPage",
      "name": "Add-Ons Übersicht",
      "description": "Alle Add-Ons zur Erweiterung des Gastro Master Systems"
    }
  },
  {
    path: '/loesungen/lieferdienst',
    title: 'Lieferdienst — Provisionsfreie Lieferplattform',
    description: 'Starten Sie Ihren eigenen Lieferdienst mit 0 % Provision. Gastro Master bietet die komplette Lösung: Lieferapp, Fahrerverwaltung, Telemetrie.',
    schema: {
      "@type": "Service",
      "name": "Lieferdienst Lösung",
      "description": "Eigene Lieferplattform mit 0 % Provision statt Lieferando/Wolt"
    }
  },
  {
    path: '/ueber-uns',
    title: 'Über Uns — Gastro Master Team',
    description: 'Gastro Master: Gegründet 2021 in Usingen (Hessen), 30+ Team-Mitglieder, 700+ betreute Restaurants in Deutschland, Österreich, Schweiz.',
    schema: {
      "@type": "AboutPage",
      "name": "Über Gastro Master",
      "description": "Das Gastro Master Team und die Geschichte des Unternehmens"
    }
  }
];

mkdirSync(distDir, { recursive: true });

let successCount = 0;
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

  // Add schema
  const htmlWithSchema = htmlWithMeta.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n  </head>`
  );

  const filepath = page.path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, page.path, 'index.html');

  mkdirSync(join(filepath, '..'), { recursive: true });
  writeFileSync(filepath, htmlWithSchema);

  console.log(`✅ ${page.path}`);
  successCount++;
}

console.log(`\n✅ Pre-rendered ${successCount}/15 critical pages created`);
