/**
 * Reporter: shows category normalization diff before regenerating.
 * Usage: node scripts/normalize-categories.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CATEGORY_MAP = {
  "Bestellsysteme": "Bestellsysteme",
  "Cluster 1": "Bestellsysteme",
  "Bestellsysteme & Lieferservice": "Bestellsysteme",
  "Bestellsysteme-Lieferservice": "Bestellsysteme",
  "bestellsysteme-lieferservice": "Bestellsysteme",
  "Lieferservice": "Lieferservice",
  "Website & Marketing": "Website & Marketing",
  "Cluster 3": "Website & Marketing",
  "Marketing & Sichtbarkeit": "Website & Marketing",
  "marketing": "Website & Marketing",
  "marketing-sichtbarkeit": "Website & Marketing",
  "Marketing & Sichtbarkeit (Übergang zu Cluster 4)": "Website & Marketing",
  "Marketing & Sichtbarkeit (Cluster-Start)": "Website & Marketing",
  "→ 3 Übergang": "Website & Marketing",
  "→ 3 (Übergang)": "Website & Marketing",
  "3-uebergang": "Website & Marketing",
  "Recht & Compliance": "Recht & Compliance",
  "Cluster 2": "Recht & Compliance",
  "Compliance": "Recht & Compliance",
  "Kassensysteme & Compliance": "Recht & Compliance",
  "Personal & Schulung": "Personal & Schulung",
  "Cluster 4": "Personal & Schulung",
  "HR": "Personal & Schulung",
  "HR & Personal": "Personal & Schulung",
  "Personal & HR (Cluster-Start)": "Personal & Schulung",
  "Cluster 4 — HR & Personal": "Personal & Schulung",
  "→ 4 (Übergang)": "Personal & Schulung",
  "Finanzen": "Finanzen",
  "finanzen": "Finanzen",
  "Cluster 5": "Finanzen",
  "Finanzen & BWL": "Finanzen",
  "finanzen-bwl": "Finanzen",
  "Gründung": "Gründung",
  "Gruendung": "Gründung",
  "gruendung": "Gründung",
  "Cluster 6 Gründung (Abschluss)": "Gründung",
  "Betrieb & Service": "Betrieb & Service",
  "Cluster 8": "Betrieb & Service",
  "Spezial & Long-Tail": "Betrieb & Service",
  "Trends & Zukunft": "Trends & Zukunft",
  "Trends & Zukunft (Speisen-Fokus)": "Trends & Zukunft",
  "Cluster 7": "Trends & Zukunft",
};

const genPath = resolve(ROOT, "src/data/blog-posts-generated.ts");
const content = readFileSync(genPath, "utf-8");

const categoryRegex = /slug:\s*"([^"]+)"[^}]+?category:\s*"([^"]+)"/gs;
const changes = [];
const unchanged = [];
const unmapped = new Set();

for (const match of content.matchAll(categoryRegex)) {
  const slug = match[1];
  const raw = match[2];
  const mapped = CATEGORY_MAP[raw.trim()];
  if (!mapped) {
    unmapped.add(raw);
    unchanged.push({ slug, category: raw });
  } else if (mapped !== raw) {
    changes.push({ slug, before: raw, after: mapped });
  } else {
    unchanged.push({ slug, category: raw });
  }
}

console.log(`\n📊 Kategorie-Normalisierung — Vorher/Nachher Diff\n${"─".repeat(60)}`);

if (changes.length === 0) {
  console.log("✅ Alle Kategorien sind bereits normalisiert.\n");
} else {
  console.log(`\n🔄 ${changes.length} Posts werden geändert:\n`);
  for (const c of changes) {
    console.log(`  ${c.slug}`);
    console.log(`    vorher: "${c.before}"`);
    console.log(`    nachher: "${c.after}"\n`);
  }
}

if (unmapped.size > 0) {
  console.log(`\n⚠️  ${unmapped.size} unbekannte Kategorie-Werte (nicht in CATEGORY_MAP):`);
  for (const u of unmapped) console.log(`  "${u}"`);
  console.log();
}

const summary = {};
for (const c of changes) {
  summary[c.after] = (summary[c.after] || 0) + 1;
}
for (const u of unchanged) {
  if (CATEGORY_MAP[u.category]) {
    summary[u.category] = (summary[u.category] || 0) + 1;
  }
}

console.log(`\n📂 Finale Verteilung nach Normalisierung:`);
const finalCounts = {};
const allRegex = /category:\s*"([^"]+)"/g;
for (const match of content.matchAll(allRegex)) {
  const raw = match[1].trim();
  const normalized = CATEGORY_MAP[raw] ?? raw;
  finalCounts[normalized] = (finalCounts[normalized] || 0) + 1;
}
for (const [cat, count] of Object.entries(finalCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}×  ${cat}`);
}
console.log();
