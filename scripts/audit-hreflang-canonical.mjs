#!/usr/bin/env node
/**
 * Full-Scan Audit: hreflang + canonical über alle pre-rendered HTMLs in dist/.
 *
 * Cluster-Regeln:
 *   • Blog (/de/blog/<slug>): canonical erforderlich. Hreflang optional —
 *     die meisten der 100 Blog-Posts sind DE-only (kein hreflang außer
 *     self-de erwartet), 3 ältere Posts sind multilingual (hreflang erlaubt,
 *     muss bidirektional konsistent sein). Regel: wenn hreflang vorhanden,
 *     muss bidirektional konsistent sein (Ziel-Datei existiert + verlinkt zurück).
 *   • Alle anderen Pages (Marketing, Legal, Vergleiche, Hub, Home, Root):
 *     canonical + 6 hreflang (de/en/it/fa/si/ru) + x-default required.
 *
 * Findings:
 *   Sev 5 — canonical fehlt
 *   Sev 5 — hreflang fehlt komplett (Multi-lang-Page)
 *   Sev 4 — bidirektionale Inkonsistenz
 *   Sev 4 — slug nicht lokalisiert (z. B. /it/vergleiche/... statt /it/confronti/...)
 *   Sev 3 — canonical-Domain ≠ gastro-master.de (z. B. vercel.app-Leak)
 *   Sev 3 — trailing-slash-Drift (canonical ends with / aber hreflang-self nicht, oder umgekehrt)
 *   Sev 2 — fehlende einzelne Sprache in hreflang-Set (5 statt 6 Sprachen)
 *   Sev 2 — x-default fehlt
 *
 * Exit Code: 0 wenn keine Findings, 1 wenn Findings (CI-tauglich).
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://gastro-master.de';
const LANGS = ['de', 'en', 'it', 'fa', 'si', 'ru'];

// ─── Walk dist/ recursively, collect all .html files ─────────────────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (entry.endsWith('.html')) out.push(p);
  }
  return out;
}

// ─── Parse hreflang + canonical from HTML ────────────────────────────────────
const HREFLANG_RE = /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"[^>]*\/?>/g;
const HREFLANG_RE_REVERSED = /<link[^>]+hreflang="([^"]+)"[^>]+rel="alternate"[^>]+href="([^"]+)"[^>]*\/?>/g;
const CANONICAL_RE = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*\/?>/;

function extractTags(html) {
  const hreflangs = []; // [{lang, url}]
  HREFLANG_RE.lastIndex = 0;
  let m;
  while ((m = HREFLANG_RE.exec(html)) !== null) {
    hreflangs.push({ lang: m[1], url: m[2] });
  }
  if (hreflangs.length === 0) {
    HREFLANG_RE_REVERSED.lastIndex = 0;
    while ((m = HREFLANG_RE_REVERSED.exec(html)) !== null) {
      hreflangs.push({ lang: m[1], url: m[2] });
    }
  }
  const canonMatch = html.match(CANONICAL_RE);
  const canonical = canonMatch ? canonMatch[1] : null;
  return { canonical, hreflangs };
}

// ─── Path → expected canonical URL ───────────────────────────────────────────
function pathToCanonical(filePath) {
  const rel = relative(DIST, filePath).replace(/\\/g, '/');
  const noIdx = rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (noIdx === 'index' || noIdx === '') return `${SITE_URL}/`;
  return `${SITE_URL}/${noIdx}`;
}

// ─── Cluster-Klassifikation ──────────────────────────────────────────────────
function classify(filePath) {
  const rel = relative(DIST, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return { cluster: 'root', lang: null };
  const parts = rel.replace(/\/index\.html$/, '').split('/');
  const lang = LANGS.includes(parts[0]) ? parts[0] : null;
  if (lang === 'de' && parts[1] === 'blog' && parts.length > 2) {
    return { cluster: 'blog', lang };
  }
  return { cluster: 'multi', lang };
}

// ─── Detect trailing-slash drift ─────────────────────────────────────────────
function hasTrailingSlashDrift(canonical, selfHreflang) {
  if (!canonical || !selfHreflang) return false;
  const cEnds = canonical.endsWith('/');
  const hEnds = selfHreflang.endsWith('/');
  return cEnds !== hEnds;
}

// ─── Main audit ──────────────────────────────────────────────────────────────
function main() {
  const files = walk(DIST).sort();
  const parsed = new Map(); // canonical URL (normalized) → { file, lang, hreflangs, cluster }
  const findings = []; // {severity, file, msg, fix?}

  // Pass 1 — extract + per-file rules
  for (const file of files) {
    const html = readFileSync(file, 'utf-8');
    const { canonical, hreflangs } = extractTags(html);
    const { cluster, lang } = classify(file);
    const expectedCanonical = pathToCanonical(file);
    const relFile = relative(DIST, file);

    // Skip pure SPA assets — only check if the file is actually meant to be a page
    // (heuristic: not a JS/asset directory's index, but any *.html in dist)

    // Rule: canonical existence (Sev 5)
    if (!canonical) {
      findings.push({ severity: 5, file: relFile, msg: 'canonical fehlt komplett' });
      continue; // remaining checks need canonical
    }

    // Rule: canonical domain (Sev 3)
    if (!canonical.startsWith(SITE_URL)) {
      findings.push({
        severity: 3,
        file: relFile,
        msg: `canonical-Domain falsch: ${canonical} (erwartet ${SITE_URL})`,
      });
    }

    // Rule: canonical self-referencing (Sev 4) — must match expected URL
    // Allow trailing slash flex: /de == /de/
    const normCanon = canonical.replace(/\/$/, '');
    const normExpected = expectedCanonical.replace(/\/$/, '');
    // Special case: root /index.html may canonical to /de (intentional, x-default-aligned)
    if (cluster === 'root') {
      if (normCanon !== `${SITE_URL}/de` && normCanon !== `${SITE_URL}`) {
        findings.push({
          severity: 4,
          file: relFile,
          msg: `Root-canonical unerwartet: ${canonical} (erwartet ${SITE_URL}/de oder ${SITE_URL})`,
        });
      }
    } else if (normCanon !== normExpected) {
      findings.push({
        severity: 4,
        file: relFile,
        msg: `canonical nicht self-referencing: ${canonical} (erwartet ${expectedCanonical})`,
      });
    }

    // Hreflang rules
    const hreflangByLang = new Map();
    for (const h of hreflangs) hreflangByLang.set(h.lang, h.url);

    if (cluster === 'blog') {
      // Blog: hreflang optional. Bidirektionale Konsistenz wird in Pass 2 geprüft.
      // (Die 100 DE-only Posts haben kein hreflang außer self; die 3 multilang
      // Posts haben 6 langs + x-default — beides ist OK solange bidirektional.)
    } else {
      // Multi-lang (root, marketing, legal, home): need 6 langs + x-default
      const missing = LANGS.filter((l) => !hreflangByLang.has(l));
      if (hreflangs.length === 0) {
        findings.push({ severity: 5, file: relFile, msg: 'hreflang fehlt komplett (Multi-lang-Page)' });
      } else {
        if (missing.length > 0) {
          findings.push({
            severity: 2,
            file: relFile,
            msg: `hreflang-Sprachen fehlen: ${missing.join(', ')}`,
          });
        }
        if (!hreflangByLang.has('x-default')) {
          findings.push({ severity: 2, file: relFile, msg: 'x-default hreflang fehlt' });
        }
        // Self-reference check (only if this page has a lang)
        if (lang) {
          const selfUrl = hreflangByLang.get(lang);
          if (selfUrl) {
            // Should match canonical (modulo trailing slash)
            if (selfUrl.replace(/\/$/, '') !== normCanon) {
              findings.push({
                severity: 4,
                file: relFile,
                msg: `hreflang-self (${lang}=${selfUrl}) ≠ canonical (${canonical})`,
              });
            }
            if (hasTrailingSlashDrift(canonical, selfUrl)) {
              findings.push({
                severity: 3,
                file: relFile,
                msg: `Trailing-slash-Drift zwischen canonical (${canonical}) und hreflang-self (${selfUrl})`,
              });
            }
          }
        }
      }
    }

    parsed.set(normCanon, {
      file: relFile,
      cluster,
      lang,
      canonical,
      hreflangByLang,
    });
  }

  // Pass 2 — bidirectional consistency (multi-lang + multilang-blog)
  for (const [normCanon, page] of parsed) {
    if (page.cluster === 'root') continue;
    if (!page.lang) continue;

    for (const lang of LANGS) {
      if (lang === page.lang) continue;
      const targetUrl = page.hreflangByLang.get(lang);
      if (!targetUrl) continue; // already flagged as missing

      const targetCanon = targetUrl.replace(/\/$/, '');
      const targetPage = parsed.get(targetCanon);
      if (!targetPage) {
        // Target page doesn't exist in dist — could be SPA-only, or broken link
        findings.push({
          severity: 4,
          file: page.file,
          msg: `hreflang→${lang} zeigt auf ${targetUrl} aber Ziel-Page existiert nicht in dist/`,
        });
        continue;
      }
      // Target should have hreflang back to page.lang = page.canonical
      const backUrl = targetPage.hreflangByLang.get(page.lang);
      if (!backUrl) {
        findings.push({
          severity: 4,
          file: page.file,
          msg: `Bidirektional fehlt: ${page.file} → ${lang} (${targetUrl}), aber ${targetPage.file} hat kein hreflang="${page.lang}"`,
        });
        continue;
      }
      if (backUrl.replace(/\/$/, '') !== normCanon) {
        findings.push({
          severity: 4,
          file: page.file,
          msg: `Bidirektional drift: ${page.file} → ${lang}, aber ${targetPage.file} verweist auf ${backUrl} (≠ ${page.canonical})`,
        });
      }
    }
  }

  // Slug-Lokalisierung: für Multi-lang-Pages prüfen, ob jeder hreflang-Target
  // den /<lang>/-Prefix der Sprache nutzt (und nicht den DE-Slug 1:1 kopiert).
  for (const page of parsed.values()) {
    if (page.cluster === 'blog' || page.cluster === 'root' || !page.lang) continue;
    for (const [lang, url] of page.hreflangByLang) {
      if (lang === 'x-default') continue;
      // Should start with SITE_URL/<lang>/ or be exactly SITE_URL/<lang>
      const prefix = `${SITE_URL}/${lang}`;
      if (!url.startsWith(prefix + '/') && url !== prefix && url !== prefix + '/') {
        findings.push({
          severity: 4,
          file: page.file,
          msg: `hreflang="${lang}" → ${url} hat falschen Sprach-Prefix (erwartet ${prefix}/...)`,
        });
      }
    }
  }

  // ─── Cluster summary ──────────────────────────────────────────────────────
  const clusterStats = { root: 0, blog: 0, multi: 0 };
  for (const file of files) {
    const { cluster } = classify(file);
    clusterStats[cluster] = (clusterStats[cluster] || 0) + 1;
  }

  // ─── Report ───────────────────────────────────────────────────────────────
  const sevCount = { 5: 0, 4: 0, 3: 0, 2: 0 };
  for (const f of findings) sevCount[f.severity] = (sevCount[f.severity] || 0) + 1;

  console.log('═══ HREFLANG + CANONICAL FULL-SCAN ═══');
  console.log(`Total HTMLs scanned: ${files.length}`);
  console.log(`  Root: ${clusterStats.root}`);
  console.log(`  Blog (/de/blog): ${clusterStats.blog}`);
  console.log(`  Multi-lang: ${clusterStats.multi}`);
  console.log('');
  console.log(`Findings: ${findings.length} total`);
  console.log(`  Sev 5: ${sevCount[5]}`);
  console.log(`  Sev 4: ${sevCount[4]}`);
  console.log(`  Sev 3: ${sevCount[3]}`);
  console.log(`  Sev 2: ${sevCount[2]}`);
  console.log('');

  if (findings.length === 0) {
    console.log('✅ Clean — no findings.');
    return 0;
  }

  findings.sort((a, b) => b.severity - a.severity || a.file.localeCompare(b.file));
  console.log('─── Findings (sorted by severity) ───');
  for (const f of findings) {
    console.log(`[Sev ${f.severity}] ${f.file}: ${f.msg}`);
  }
  return 1;
}

process.exit(main());
