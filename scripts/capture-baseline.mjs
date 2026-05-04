import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const baseDir = '/tmp/visual-baseline';
mkdirSync(baseDir, { recursive: true });

const BASE_URL = 'http://localhost:8081';
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'preise', path: '/preise' },
  { name: 'kasse', path: '/produkte/pakete/kassensystem' },
  { name: 'app', path: '/produkte/pakete/bestell-app' },
  { name: 'lieferdienst', path: '/loesungen/lieferdienst' },
  { name: 'addons', path: '/produkte/add-ons' }
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'desktop', width: 1440, height: 900 }
];

(async () => {
  const browser = await chromium.launch();

  for (const page of PAGES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport });
      const pageObj = await context.newPage();

      const url = `${BASE_URL}${page.path}`;
      console.log(`📸 Capturing ${page.name} (${viewport.name})...`);

      try {
        await pageObj.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        const filename = resolve(baseDir, `${page.name}-${viewport.name}.png`);
        await pageObj.screenshot({ path: filename, fullPage: false });

        // Capture HTML
        const html = await pageObj.content();
        const htmlFile = resolve(baseDir, `${page.name}-${viewport.name}.html`);
        writeFileSync(htmlFile, html);

        console.log(`  ✅ ${filename}`);
      } catch (err) {
        console.error(`  ❌ Error on ${page.name} (${viewport.name}): ${err.message}`);
      }

      await pageObj.close();
      await context.close();
    }
  }

  await browser.close();
  console.log('\n✅ Baseline capture complete');
})();
