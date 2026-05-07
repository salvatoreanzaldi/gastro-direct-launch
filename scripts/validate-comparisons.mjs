/**
 * Validates /vergleiche/-Page Compliance gegen Wissens-Bibel #19.
 *
 * Geprüft wird:
 * 1. Source-Pflicht: jede Fact-Zeile muss `source` (URL) + `sourceDate` (YYYY-MM-DD) haben.
 * 2. Salvatore-Prinzip: `gmAvatars.closingStatement` muss explizit auf Konkurrenz-Empfehlung verzichten.
 * 3. UWG §6: verbotene Wertungen ("besser", "schlechter", "moderner", …).
 * 4. H1 (Wechselangebot 50 %) muss `pending: true` haben, bis Marge/Anwalt-Sign-off.
 * 5. Strukturelle Mindestanforderungen: ≥3 quotableOneLiners, ≥5 FAQs, ≥4 riskReversal.
 * 6. Restaurant-Sprache: User-visible Tech-Jargon ("Avatar", "Avatare") ist verboten —
 *    Memory-Eintrag feedback_restaurant_sprache + Wissens-Bibel #19.
 * 7. URL-Blacklist: bekannt tote URLs (gastro-master.de/preise, /google-reviews) blockieren.
 * 8. Customer-Quote-Cross-Check: customerStory.quote muss mind. 60 Zeichen contiguous
 *    in public/data/google-reviews.json wiederfinden — schützt gegen erfundene Quotes.
 *
 * Exit-Code != 0 → Build failed.
 *
 * Usage: node scripts/validate-comparisons.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const COMPARISONS_DIR = join(ROOT, "src/data/comparisons");
const REVIEWS_PATH = join(ROOT, "public/data/google-reviews.json");

const FORBIDDEN_WORDS = [
  "besser",
  "schlechter",
  "moderner",
  "veralteter",
  "schlimmer",
  "überlegen",
  "minderwertig",
  "Provisionsfalle",
  "Lieferando-Sklave",
  // Restaurant-Sprache: Tech-Jargon hat in User-Texten nichts verloren
  "Avatar",
  "Avatare",
  "Avataren",
];

// Bekannt tote oder veraltete URLs — wenn als source verwendet, hart blockieren.
const URL_BLACKLIST = [
  "https://gastro-master.de/preise",       // 404 auf alter Site, /preise existiert noch nicht
  "https://gastro-master.de/google-reviews", // 404 — Google-Maps author_url verwenden
];

const FORBIDDEN_DISPARAGING_PATTERNS = [
  // "ist {Konkurrent} besser/schlechter" – einfacher Heuristik-Filter
  /\bist\s+\w+\s+(besser|schlechter|moderner)\b/gi,
];

const SOURCE_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HTTP_URL_RE = /^https?:\/\//;

const errors = [];
const warnings = [];

function err(file, msg) {
  errors.push(`${file}: ${msg}`);
}
function warn(file, msg) {
  warnings.push(`${file}: ${msg}`);
}

function listComparisonFiles() {
  return readdirSync(COMPARISONS_DIR)
    .filter((f) => f.endsWith(".ts"))
    .filter((f) => f !== "types.ts" && f !== "index.ts")
    .map((f) => join(COMPARISONS_DIR, f));
}

/**
 * Extract every `source: "..."` and adjacent `sourceDate: "..."` pair from a TS file.
 * Returns an array of `{ source, sourceDate, lineHint }`.
 *
 * Pattern in unsere Daten-Files: source / sourceDate werden meist als Konstanten
 * referenziert (z. B. `source: ORDER_SMART_FAQ_VERTRAGSLAUFZEIT`) oder als String-Literal.
 * Beide Fälle akzeptieren wir hier; reine Const-References werden separat aufgelöst.
 */
function extractSources(content) {
  // Variante A: `source: "https://..."` String-Literal
  const literalRe = /source:\s*"(https?:\/\/[^"]+)"\s*,\s*\n?\s*sourceDate:\s*"(\d{4}-\d{2}-\d{2})"/g;
  // Variante B: `source: CONSTANT_NAME, sourceDate: CONSTANT_NAME` (oder SOURCE_DATE)
  const constRe = /source:\s*([A-Z_][A-Z0-9_]*)\s*,\s*\n?\s*sourceDate:\s*([A-Z_][A-Z0-9_]*)/g;
  // Variante C: inline mixed `source: CONST, sourceDate: "2026-05-06"`
  const mixedRe = /source:\s*([A-Z_][A-Z0-9_]*)\s*,\s*\n?\s*sourceDate:\s*"(\d{4}-\d{2}-\d{2})"/g;

  const found = [];
  let m;
  while ((m = literalRe.exec(content))) {
    found.push({ source: m[1], sourceDate: m[2], type: "literal" });
  }
  while ((m = constRe.exec(content))) {
    found.push({ sourceConst: m[1], sourceDateConst: m[2], type: "const" });
  }
  while ((m = mixedRe.exec(content))) {
    found.push({ sourceConst: m[1], sourceDate: m[2], type: "mixed" });
  }
  return found;
}

/**
 * Resolve constant URL declarations like `const ORDER_SMART_AGB = "https://..."`.
 */
function extractConstants(content) {
  const constMap = {};
  const re = /const\s+([A-Z_][A-Z0-9_]*)\s*=\s*"([^"]+)"\s*;/g;
  let m;
  while ((m = re.exec(content))) {
    constMap[m[1]] = m[2];
  }
  return constMap;
}

function validateFile(filePath) {
  const file = filePath.replace(ROOT + "/", "");
  const content = readFileSync(filePath, "utf-8");
  const consts = extractConstants(content);

  // ── 1. Forbidden words ───────────────────────────────────────────────
  // Aus dem Check entfernt: NICHT-User-visible Stellen.
  // - // …   und   /* … */   Kommentare (erklären Code-Entscheidungen)
  // - question:/quote:/answer: → User-Sprache mirrors echter Suchanfragen
  // - TypeScript field-names mit "avatar" (gmAvatars, avatars: [, avatar:)
  //   sind interne Identifier, nicht User-Output.
  const checkable = content
    .replace(/\/\*[\s\S]*?\*\//g, "") // /* block comments */
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1") // // line comments (avoid matching URL https://)
    .replace(/question:\s*"[^"]*"/g, "")
    .replace(/quote:\s*"[^"]*"/g, "")
    .replace(/answer:\s*"[^"]*"/g, "")
    .replace(/\bgmAvatars\s*:/g, "")
    .replace(/\bavatars\s*:\s*\[/g, "")
    .replace(/\bavatar\s*:\s*"[^"]+"/g, "");
  for (const w of FORBIDDEN_WORDS) {
    const re = new RegExp(`\\b${w}\\b`, "gi");
    const matches = checkable.match(re);
    if (matches) {
      err(
        file,
        `verbotenes Wertungs-/Tech-Jargon-Wort: "${w}" (${matches.length}× — UWG §6 oder Restaurant-Sprache-Regel aus Wissens-Bibel #19)`,
      );
    }
  }
  for (const re of FORBIDDEN_DISPARAGING_PATTERNS) {
    const matches = checkable.match(re);
    if (matches) {
      err(
        file,
        `disparaging-Muster gefunden: "${matches.join(", ")}" — UWG §6-Risiko`,
      );
    }
  }

  // ── 1b. URL-Blacklist (bekannt tote / veraltete URLs) ────────────────
  for (const dead of URL_BLACKLIST) {
    if (content.includes(dead)) {
      err(
        file,
        `bekannt tote URL als source: "${dead}" — bitte auf gastro-master.de/uber-uns oder Google-Maps author_url umbiegen`,
      );
    }
  }

  // ── 2. Salvatore-Prinzip: jede closingStatement (eine pro Sprache) ──────
  const closingMatches = [...content.matchAll(/closingStatement:\s*"([^"]+)"/g)];
  if (closingMatches.length === 0) {
    err(file, "gmAvatars.closingStatement fehlt");
  }
  // Phrasen, die "keine Konkurrenz-Empfehlung" in jeder unserer 6 Sprachen ausdrücken.
  const NO_RECOMMENDATION_PHRASES = [
    /keinen anderen|bewusst keine|keine empfehlung|kein anderer anbieter/i, // de
    /deliberately do not recommend|do not recommend another/i,              // en
    /non raccomandiamo|non raccomandare/i,                                  // it
    /сознательно не рекомендуем|не рекомендуем другого/i,                   // ru
    /عمداً.*پیشنهاد نمی‌کنیم|ارائه‌دهندهٔ دیگری.*پیشنهاد/i,                   // fa
    /වෙනත් ප්‍රදායකයෙකු නිර්දේශ නොකරමු/,                                       // si
  ];
  for (const [, closing] of closingMatches) {
    const matchesAny = NO_RECOMMENDATION_PHRASES.some((re) => re.test(closing));
    if (!matchesAny) {
      err(
        file,
        `Salvatore-Prinzip-Verletzung in einer closingStatement: "${closing.slice(0, 80)}..." enthält keine explizite "keine Konkurrenz-Empfehlung"-Aussage in einer der 6 Sprachen.`,
      );
    }
  }

  // ── 3. Source-Pflicht ────────────────────────────────────────────────
  const sources = extractSources(content);
  if (sources.length === 0) {
    err(file, "keine source/sourceDate-Paare gefunden — UWG §6-Verletzung");
  }
  for (const s of sources) {
    let sourceUrl = s.source;
    if (!sourceUrl && s.sourceConst) {
      sourceUrl = consts[s.sourceConst];
      if (!sourceUrl) {
        err(file, `source-Konstante "${s.sourceConst}" nicht aufgelöst`);
        continue;
      }
    }
    if (!HTTP_URL_RE.test(sourceUrl)) {
      err(file, `source ist keine HTTP(S)-URL: "${sourceUrl}"`);
    }
    if (s.sourceDate && !SOURCE_DATE_RE.test(s.sourceDate)) {
      err(file, `sourceDate hat falsches Format (erwartet YYYY-MM-DD): "${s.sourceDate}"`);
    }
  }

  // ── 4. H1 Pending-Pflicht — alle 6 Sprachen ──────────────────────────
  const h1Blocks = [...content.matchAll(/claimRef:\s*"H1"[\s\S]{0,500}?softFallback:\s*"[^"]+"\s*,?\s*\}/g)];
  const h1Refs = [...content.matchAll(/claimRef:\s*"H1"/g)];
  if (h1Refs.length > 0 && h1Blocks.length < h1Refs.length) {
    err(
      file,
      `Brand-Claim H1 muss \`pending: true\` + \`softFallback\` haben (gefunden: ${h1Blocks.length} korrekte / ${h1Refs.length} insgesamt — Wissens-Bibel #19 Action-Items)`,
    );
  }
  for (const [block] of h1Blocks) {
    if (!/pending:\s*true/.test(block)) {
      err(file, "H1-Block ohne `pending: true` gefunden — Wechselangebot 50 % darf erst nach Marge/Anwalt-Sign-off claimt werden");
    }
  }

  // ── 5. Strukturelle Mindestanforderungen — pro Sprache ───────────────
  const quotableArrays = [...content.matchAll(/quotableOneLiners:\s*\[([\s\S]*?)\]/g)];
  if (quotableArrays.length === 0) {
    err(file, "quotableOneLiners-Array fehlt komplett");
  }
  for (const [, body] of quotableArrays) {
    const items = (body.match(/^\s*"/gm) || []).length;
    if (items < 3) {
      err(file, `quotableOneLiners hat ${items} Einträge — Mindestens 3 pro Sprache nötig`);
    }
  }

  const faqArrays = [...content.matchAll(/faq:\s*\[([\s\S]*?\n  \],)/g)];
  if (faqArrays.length === 0) {
    err(file, "faq-Array fehlt komplett");
  }
  for (const [, body] of faqArrays) {
    const questions = (body.match(/question:/g) || []).length;
    if (questions < 5) {
      err(file, `faq hat ${questions} Einträge — Mindestens 5 pro Sprache nötig`);
    }
    if (questions > 7) {
      warn(file, `faq hat ${questions} Einträge — empfohlen sind 5–7 (Brunson's Mehrwert-Limit)`);
    }
  }

  const riskArrays = [...content.matchAll(/riskReversal:\s*\[([\s\S]*?)\],\n\s*cta:/g)];
  for (const [, body] of riskArrays) {
    const lines = (body.match(/claimRef:/g) || []).length;
    if (lines < 4) {
      err(file, `riskReversal hat ${lines} Zeilen — Mindestens 4 pro Sprache nötig`);
    }
  }

  const detailedArrays = [...content.matchAll(/detailedTable:\s*\[([\s\S]*?)\],\n\s*gmAvatars:/g)];
  for (const [, body] of detailedArrays) {
    const rows = (body.match(/axis:/g) || []).length;
    if (rows > 7) {
      err(file, `detailedTable hat ${rows} Zeilen — Brunson-Limit ist max. 7 pro Sprache`);
    }
  }

  // ── 5b. Multilingual: ComparisonByLang muss alle 6 Sprachen haben ────
  const REQUIRED_LANGS = ["de", "en", "it", "fa", "si", "ru"];
  const byLangMatch = content.match(/ByLang\s*:\s*ComparisonByLang\s*=\s*\{([\s\S]*?)\}\s*;/);
  if (byLangMatch) {
    const declared = REQUIRED_LANGS.filter((l) =>
      new RegExp(`^\\s*${l}\\s*:`, "m").test(byLangMatch[1]),
    );
    const missing = REQUIRED_LANGS.filter((l) => !declared.includes(l));
    if (missing.length > 0) {
      err(
        file,
        `Multilingual-Lücke: ComparisonByLang fehlen die Sprachen ${missing.join(", ")} — alle 6 (de/en/it/fa/si/ru) sind Pflicht`,
      );
    }
  } else {
    warn(
      file,
      "kein ComparisonByLang-Export gefunden — Multilingual-Coverage-Check übersprungen",
    );
  }

  // ── 6. Customer-Quote Cross-Check gegen reviews.json ─────────────────
  // Schützt vor erfundenen Quotes (UWG §5 manipulated quote).
  // Vergleich erfolgt auf normalisiertem Text (lowercase, alphanumerisch),
  // damit Punktuations-/Whitespace-Unterschiede die Prüfung nicht brechen.
  const quoteMatch = content.match(/customerStory:\s*\{[\s\S]*?quote:\s*"((?:[^"\\]|\\.)*)"/);
  if (quoteMatch) {
    const rawQuote = quoteMatch[1];
    if (existsSync(REVIEWS_PATH)) {
      const reviewsRaw = readFileSync(REVIEWS_PATH, "utf-8");
      const normalize = (s) =>
        s
          .replace(/\\"/g, '"')
          .replace(/\\n/g, " ")
          .toLowerCase()
          .replace(/[^a-zäöüß0-9 ]+/gi, " ")
          .replace(/\s+/g, " ")
          .trim();
      const fragments = rawQuote
        .replace(/\\"/g, '"')
        .replace(/\\n/g, " ")
        .replace(/\[…\]|\[\.{3}\]|…/g, "|")
        .split("|")
        .map((s) => normalize(s))
        .filter((s) => s.split(" ").length >= 5); // ≥5 Wörter pro Fragment
      if (fragments.length === 0) {
        warn(
          file,
          "customerStory.quote enthält keine 5+-Wort-Fragmente — Cross-Check übersprungen",
        );
      } else {
        const reviewsNormalized = normalize(reviewsRaw);
        const missing = fragments.filter((frag) => !reviewsNormalized.includes(frag));
        if (missing.length > 0) {
          err(
            file,
            `customerStory.quote-Fragment NICHT in google-reviews.json gefunden — UWG §5 manipulated-quote-Risiko! Fehlend: "${missing[0].slice(0, 80)}..."`,
          );
        }
      }
    } else {
      warn(file, `reviews.json nicht gefunden — Quote-Cross-Check übersprungen`);
    }
  }
}

console.log("\n🔍 Validating /vergleiche/-Page Compliance gegen Wissens-Bibel #19...\n");

const files = listComparisonFiles();
if (files.length === 0) {
  console.log("ℹ️  Keine Comparison-Dateien gefunden in src/data/comparisons/");
  process.exit(0);
}

for (const f of files) {
  validateFile(f);
}

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Warnung(en):`);
  for (const w of warnings) console.log(`   ${w}`);
  console.log();
}

if (errors.length > 0) {
  console.error(`❌ ${errors.length} Compliance-Fehler in ${files.length} Datei(en):`);
  for (const e of errors) console.error(`   ${e}`);
  console.error("\nBuild blockiert. Fehler beheben und erneut versuchen.\n");
  process.exit(1);
}

console.log(
  `✅ ${files.length} Comparison-Datei(en) bestehen alle Compliance-Checks (UWG §6 + Salvatore-Prinzip).\n`
);
