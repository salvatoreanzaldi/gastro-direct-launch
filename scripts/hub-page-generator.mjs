/**
 * Generator-Helpers für die /vergleiche/-Hub-Page (Wissens-Bibel #20 Block "Hub-Page").
 *
 * Schema-Strategie (Berater-Council 2026-05-07):
 * - CollectionPage   (Wrapper)
 * - ItemList         (5 Detail-Page-Verweise als Marktübersicht)
 * - Dataset          (Vergleichstabelle als strukturierter Datensatz — Perplexity/Gemini bevorzugen Dataset-Schema)
 * - BreadcrumbList   (Home → Vergleiche)
 *
 * NICHT auf dem Hub: Article (gehört zu Detail-Pages), FAQPage (würde mit Detail-Pages cannibalisieren —
 * deshalb Meta-FAQs inline als HTML-Text), AggregateRating (UWG §6 Risiko über Konkurrenten).
 */

const SITE_URL = "https://gastro-master.de";

const LOCALE_FOR_LANG = {
  de: "de-DE",
  en: "en-US",
  it: "it-IT",
  fa: "fa-IR",
  si: "si-LK",
  ru: "ru-RU",
};

/**
 * URL-Segment pro Sprache. Muss synchron mit src/config/routes.ts:VERGLEICHE_SEGMENT bleiben.
 */
const VERGLEICHE_SEGMENT = {
  de: "vergleiche",
  en: "vs",
  it: "confronti",
  fa: "vs",
  si: "vs",
  ru: "vs",
};
const segFor = (lang) => VERGLEICHE_SEGMENT[lang] ?? "vergleiche";

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Build erweiterte JSON-LD @graph für die Hub-Page.
 */
export function buildHubSchemas(data, { lang = "de" } = {}) {
  const url = `${SITE_URL}/${lang}/${segFor(lang)}`;
  const inLanguage = LOCALE_FOR_LANG[lang] ?? "de-DE";
  const orgRef = { "@id": `${SITE_URL}/#organization` };

  const competitorRows = data.table.rows.filter((r) => !r.isOurs && r.detailSlug);

  // CollectionPage — Wrapper, referenziert ItemList als mainEntity
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: data.meta.title,
    description: data.meta.description,
    inLanguage,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: orgRef,
    mainEntity: { "@id": `${url}#itemlist` },
    dateModified: data.meta.dateModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]"],
    },
  };

  // ItemList — 5 Detail-Pages mit deskriptiven Namen
  const itemList = {
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: competitorRows.length,
    name: data.table.heading,
    inLanguage,
    itemListElement: competitorRows.map((row, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/${lang}/${segFor(lang)}/${row.detailSlug}`,
      name: `Gastro Master vs. ${row.name}`,
    })),
  };

  // Dataset — Marktübersichts-Tabelle als strukturierter Datensatz.
  // AI-Engines (Perplexity, Gemini) zitieren Dataset-Schema überproportional als "Forschungs-Asset".
  const datasetVariables = data.table.columns.map((c) => c.label).join(", ");
  const datasetSpatial = lang === "de" ? "Deutschland" : "Germany";
  const dataset = {
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name:
      lang === "en"
        ? "Market overview: ordering-system providers Germany 2026"
        : lang === "it"
        ? "Panoramica del mercato: fornitori di sistemi di ordinazione Germania 2026"
        : lang === "fa"
        ? "نمای کلی بازار: ارائه‌دهندگان سیستم سفارش آلمان ۲۰۲۶"
        : lang === "si"
        ? "වෙළඳපල දළ විශ්ලේෂණය: ඇණවුම්-පද්ධති සැපයුම්කරුවන් ජර්මනිය 2026"
        : lang === "ru"
        ? "Обзор рынка: поставщики систем заказа Германия 2026"
        : "Marktübersicht Bestellsystem-Anbieter Deutschland 2026",
    description: data.methodology.body,
    inLanguage,
    url: `${url}#dataset`,
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: orgRef,
    spatialCoverage: datasetSpatial,
    variableMeasured: datasetVariables,
    dateModified: data.meta.dateModified,
    keywords: data.table.rows.map((r) => r.name).join(", "),
  };

  // BreadcrumbList — Home → Vergleiche-Hub
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: data.table.heading,
        item: url,
      },
    ],
  };

  return [collectionPage, itemList, dataset, breadcrumbs];
}

/**
 * Static HTML-Fallback — AI-Crawler readable ohne JS.
 * Enthält ALLE Texte (Hero, Tabelle, FAQ, Methodik, Ourposition).
 */
export function buildHubStaticHtml(data, { lang = "de" } = {}) {
  const isRtl = lang === "fa";
  const dir = isRtl ? "rtl" : "ltr";

  const tableHeaders = [
    "<th></th>",
    ...data.table.columns.map((c) => `<th scope="col">${escapeHtml(c.label)}</th>`),
    "<th></th>",
  ].join("");

  const tableRows = data.table.rows
    .map((row) => {
      const nameCell = row.detailSlug
        ? `<th scope="row"><a href="/${lang}/${segFor(lang)}/${escapeHtml(row.detailSlug)}">${escapeHtml(row.name)}</a></th>`
        : `<th scope="row"><strong>${escapeHtml(row.name)}</strong> <em>(${escapeHtml(data.table.ourLabel)})</em></th>`;
      const cells = data.table.columns
        .map((c) => `<td>${escapeHtml(row.cells[c.key] ?? "")}</td>`)
        .join("");
      const sourceCell = row.source
        ? `<td><a href="${escapeHtml(row.source)}" rel="nofollow">${escapeHtml(row.sourceDate || "")}</a></td>`
        : "<td></td>";
      return `<tr>${nameCell}${cells}${sourceCell}</tr>`;
    })
    .join("");

  const orientationButtons = data.orientation.options
    .map(
      (opt) => `
    <li>
      <a href="/${lang}/${segFor(lang)}/${escapeHtml(opt.recommendedSlug)}">
        <strong>${escapeHtml(opt.pain)}</strong>
        <span>${escapeHtml(opt.reasoning)}</span>
      </a>
    </li>`,
    )
    .join("");

  const cards = data.cards.items
    .map(
      (c) => `
    <article>
      <h3><a href="/${lang}/${segFor(lang)}/${escapeHtml(c.slug)}">Gastro Master vs. ${escapeHtml(c.name)}</a></h3>
      <p>${escapeHtml(c.positioning)}</p>
    </article>`,
    )
    .join("");

  const faqItems = data.metaFaq.items
    .map(
      (q) => `
    <div class="hub-faq-item">
      <h3>${escapeHtml(q.question)}</h3>
      <p>${escapeHtml(q.answer)}</p>
    </div>`,
    )
    .join("");

  return `
<article class="comparison-hub" lang="${lang}" dir="${dir}" data-modified="${escapeHtml(data.meta.dateModified)}">
  <header class="hub-hero">
    <p class="hub-badge">${escapeHtml(data.hero.badge)}</p>
    <h1 data-speakable>${escapeHtml(data.hero.h1)}</h1>
    <p class="hub-lead">${escapeHtml(data.hero.lead)}</p>
  </header>

  <section class="hub-table">
    <h2>${escapeHtml(data.table.heading)}</h2>
    <p class="hub-table-sources-note">${escapeHtml(data.table.sourcesNote)}</p>
    <table>
      <thead><tr>${tableHeaders}</tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </section>

  <section class="hub-orientation">
    <h2>${escapeHtml(data.orientation.heading)}</h2>
    <p>${escapeHtml(data.orientation.intro)}</p>
    <ul>${orientationButtons}</ul>
  </section>

  <section class="hub-cards">
    <h2>${escapeHtml(data.cards.heading)}</h2>
    <p>${escapeHtml(data.cards.sub)}</p>
    ${cards}
  </section>

  <section class="hub-methodology">
    <h2>${escapeHtml(data.methodology.heading)}</h2>
    <p>${escapeHtml(data.methodology.body)}</p>
    <p class="hub-as-of"><small>${escapeHtml(data.methodology.asOfNote)}</small></p>
  </section>

  <section class="hub-customer-story">
    <h2>${escapeHtml(data.customerStory.sectionHeading)}</h2>
    <blockquote lang="de" cite="${escapeHtml(data.customerStory.source)}">
      <p>${escapeHtml(data.customerStory.quote)}</p>
      <cite>— ${escapeHtml(data.customerStory.attribution)}</cite>
    </blockquote>
  </section>

  <section class="hub-meta-faq">
    <h2>${escapeHtml(data.metaFaq.heading)}</h2>
    <p>${escapeHtml(data.metaFaq.sub)}</p>
    ${faqItems}
  </section>

  <section class="hub-our-position" data-speakable>
    <h2>${escapeHtml(data.ourPosition.heading)}</h2>
    <p>${escapeHtml(data.ourPosition.body)}</p>
    <a href="/${lang}/kontakt" class="hub-cta-primary"><strong>${escapeHtml(data.hardCtaLabel)}</strong></a>
  </section>
</article>`;
}

/**
 * Render full HTML page — head injection + JSON-LD + static body.
 */
export function renderHubPage(baseHtml, data, { lang = "de", allLangs = ["de"] } = {}) {
  const url = `${SITE_URL}/${lang}/${segFor(lang)}`;
  const schemas = buildHubSchemas(data, { lang });
  const staticHtml = buildHubStaticHtml(data, { lang });
  const inLanguage = LOCALE_FOR_LANG[lang] ?? "de-DE";

  const hreflangTags = [
    ...allLangs.map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/${segFor(l)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/de/${segFor("de")}" />`,
  ].join("\n  ");

  const headExtras = [
    `<title>${escapeHtml(data.meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(data.meta.description)}">`,
    `<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">`,
    `<link rel="canonical" href="${url}">`,
    hreflangTags,
    `<meta property="og:title" content="${escapeHtml(data.meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(data.meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="${inLanguage.replace("-", "_")}">`,
    `<meta property="og:image" content="${SITE_URL}/logo-gastro-master.png">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(data.meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(data.meta.description)}">`,
    `<meta name="twitter:image" content="${SITE_URL}/logo-gastro-master.png">`,
    ...schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ].join("\n  ");

  let html = baseHtml;
  html = html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/i, "")
    .replace(/<link\s+rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+property="article:[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "");
  html = html.replace("</head>", `  ${headExtras}\n  </head>`);
  html = html.replace(/<html([^>]*)\slang="[^"]*"/, `<html$1 lang="${lang}"`);
  if (lang === "fa") {
    html = html.replace(/<html([^>]*)>/, `<html$1 dir="rtl">`);
  }
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticHtml}</div>`);
  return html;
}
