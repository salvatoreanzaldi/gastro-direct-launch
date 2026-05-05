import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const distDir = join(__dirname, '..', 'dist');
const resultsDir = '/tmp/schema-validation';

mkdirSync(resultsDir, { recursive: true });

const ROUTES = [
  '/preise/index.html',
  '/loesungen/lieferdienst/index.html',
  '/produkte/add-ons/index.html'
];

const results = [];

for (const route of ROUTES) {
  const filepath = join(distDir, route);
  const routeName = route.replace(/\/index\.html$/, '').replace(/^\//,'') || 'root';

  try {
    const html = readFileSync(filepath, 'utf-8');

    // Extract JSON-LD blocks (with `s` flag for multi-line JSON)
    const jsonldMatches = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/gs) || [];

    if (jsonldMatches.length === 0) {
      results.push({
        route: routeName,
        filepath: route,
        status: 'ERROR',
        error: 'No JSON-LD found',
        schemas: 0,
        errors: 1,
        warnings: 0
      });
      console.log(`❌ ${routeName}: No JSON-LD found`);
      continue;
    }

    let schemaCount = 0;
    let errorCount = 0;
    let warningCount = 0;
    const schemas = [];

    for (const match of jsonldMatches) {
      const jsonStr = match.replace(/<script type="application\/ld\+json">/,'').replace(/<\/script>/,'');

      try {
        const json = JSON.parse(jsonStr);
        schemaCount++;

        // Basic validation
        if (!json['@type']) {
          errorCount++;
          schemas.push({ type: 'UNKNOWN', valid: false, error: 'Missing @type' });
        } else {
          schemas.push({ type: json['@type'], valid: true });
        }

        // Check for common issues
        if (json['@context'] && !json['@context'].includes('schema.org')) {
          warningCount++;
        }
      } catch (err) {
        errorCount++;
        schemas.push({ type: 'INVALID_JSON', valid: false, error: err.message });
      }
    }

    const status = errorCount > 0 ? 'FAIL' : warningCount > 0 ? 'WARN' : 'PASS';
    results.push({
      route: routeName,
      filepath: route,
      status,
      schemas,
      schemaCount,
      errors: errorCount,
      warnings: warningCount
    });

    if (status === 'FAIL') {
      console.log(`❌ ${routeName}: ${errorCount} errors, ${warningCount} warnings`);
    } else if (status === 'WARN') {
      console.log(`⚠️  ${routeName}: ${schemaCount} schemas, ${warningCount} warnings`);
    } else {
      console.log(`✅ ${routeName}: ${schemaCount} schemas valid`);
    }
  } catch (err) {
    results.push({
      route: routeName,
      filepath: route,
      status: 'ERROR',
      error: err.message,
      schemas: [],
      errors: 1,
      warnings: 0
    });
    console.log(`❌ ${routeName}: ${err.message}`);
  }
}

console.log('\n═══ SCHEMA VALIDATION SUMMARY ═══');
const failCount = results.filter(r => r.status === 'FAIL').length;
const warnCount = results.filter(r => r.status === 'WARN').length;
const passCount = results.filter(r => r.status === 'PASS').length;

console.log(`Passed: ${passCount}`);
console.log(`Warned: ${warnCount}`);
console.log(`Failed: ${failCount}`);

writeFileSync(join(resultsDir, 'results.json'), JSON.stringify(results, null, 2));

if (failCount > 0) {
  console.log(`\n❌ SCHEMA VALIDATION FAILED (${failCount} routes)`);
  process.exit(1);
} else {
  console.log(`\n✅ SCHEMA VALIDATION PASSED`);
  process.exit(0);
}
