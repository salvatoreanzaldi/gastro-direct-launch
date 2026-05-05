import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const baselineDir = '/tmp/visual-baseline';
const diffDir = '/tmp/visual-regression-diffs';
const BASE_URL = 'http://localhost:8081';

const AUDIT_PAGES = [
  { name: 'home', path: '/' },
  { name: 'preise', path: '/preise' },
  { name: 'kasse', path: '/produkte/pakete/kassensystem' },
  { name: 'app', path: '/produkte/pakete/bestell-app' },
  { name: 'lieferdienst', path: '/loesungen/lieferdienst' },
  { name: 'addons', path: '/produkte/add-ons' },
  { name: 'uber-uns', path: '/ueber-uns' }
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'desktop', width: 1440, height: 900 }
];

mkdirSync(diffDir, { recursive: true });

async function compareImages(baseline, current) {
  try {
    const baselineImg = await sharp(baseline).raw().toBuffer({ resolveWithObject: true });
    const currentImg = await sharp(current).raw().toBuffer({ resolveWithObject: true });

    if (baselineImg.info.width !== currentImg.info.width ||
        baselineImg.info.height !== currentImg.info.height) {
      return { diff: 100, error: 'Size mismatch' };
    }

    const pixels = baselineImg.data.length / 4;
    let diffPixels = 0;

    for (let i = 0; i < baselineImg.data.length; i += 4) {
      const dr = Math.abs(baselineImg.data[i] - currentImg.data[i]);
      const dg = Math.abs(baselineImg.data[i+1] - currentImg.data[i+1]);
      const db = Math.abs(baselineImg.data[i+2] - currentImg.data[i+2]);
      if (dr > 10 || dg > 10 || db > 10) diffPixels++;
    }

    return { diff: (diffPixels / pixels * 100).toFixed(2) };
  } catch (err) {
    return { diff: -1, error: err.message };
  }
}

(async () => {
  const browser = await chromium.launch();
  const results = [];
  let maxDiff = 0;
  let failCount = 0;

  for (const page of AUDIT_PAGES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport });
      const pageObj = await context.newPage();
      const url = `${BASE_URL}${page.path}`;

      try {
        await pageObj.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        const currentScreenshot = join(diffDir, `${page.name}-${viewport.name}-current.png`);
        await pageObj.screenshot({ path: currentScreenshot, fullPage: false });

        const baselineScreenshot = join(baselineDir, `${page.name}-${viewport.name}.png`);

        if (!existsSync(baselineScreenshot)) {
          console.log(`⚠️  No baseline for ${page.name} (${viewport.name})`);
          results.push({ page: page.name, viewport: viewport.name, diff: -1, status: 'NO_BASELINE' });
          continue;
        }

        const { diff, error } = await compareImages(baselineScreenshot, currentScreenshot);

        if (error) {
          console.log(`❌ ${page.name} (${viewport.name}): ${error}`);
          results.push({ page: page.name, viewport: viewport.name, diff, status: 'ERROR', error });
          failCount++;
        } else if (diff > 1) {
          console.log(`⚠️  ${page.name} (${viewport.name}): ${diff}% diff (threshold: 1%)`);
          results.push({ page: page.name, viewport: viewport.name, diff, status: 'FAIL' });
          failCount++;
          maxDiff = Math.max(maxDiff, diff);
        } else {
          console.log(`✅ ${page.name} (${viewport.name}): ${diff}% diff`);
          results.push({ page: page.name, viewport: viewport.name, diff, status: 'PASS' });
        }
      } catch (err) {
        console.log(`❌ ${page.name} (${viewport.name}): ${err.message}`);
        results.push({ page: page.name, viewport: viewport.name, diff: -1, status: 'TIMEOUT', error: err.message });
        failCount++;
      }

      await pageObj.close();
      await context.close();
    }
  }

  await browser.close();

  console.log('\n═══ VISUAL REGRESSION SUMMARY ═══');
  console.log(`Tested: ${results.length} pages`);
  console.log(`Passed: ${results.filter(r => r.status === 'PASS').length}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Max diff: ${maxDiff}%`);

  writeFileSync(join(diffDir, 'results.json'), JSON.stringify(results, null, 2));

  if (failCount > 0) {
    console.log(`\n❌ VISUAL REGRESSION FAILED (failures: ${failCount})`);
    process.exit(1);
  } else {
    console.log(`\n✅ VISUAL REGRESSION PASSED`);
    process.exit(0);
  }
})();
