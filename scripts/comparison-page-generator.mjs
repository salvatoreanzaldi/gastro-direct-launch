/**
 * Generator-Helpers für /vergleiche/<slug>-Pages (Wissens-Bibel #19 Gold-Standard).
 *
 * Multilingual (DE/EN/IT/FA/SI/RU) mit erweiterter Schema-Strategie für GEO/AI-Citation:
 *
 * - WebPage          (per Sprache, mit speakable + alternateLanguage)
 * - Article          (mit articleBody = Quotables + Risk-Reversal-Lines)
 * - BreadcrumbList   (lokalisierte Labels)
 * - FAQPage          (alle FAQs mit Schema.org Question/Answer)
 * - Review           (Mehlfabrik-Quote als itemReviewed → Organization)
 * - AggregateRating  (5.0 von 131 Reviews — referenziert Organization)
 * - ItemList         (detailedTable als strukturierter Vergleich für AI)
 * - HowTo            (FAQ "Wie wechsle ich" → step-based, AI-citable)
 * - Hreflang-Tags    (alle Sprachen + x-default = de)
 *
 * h1Approved=false: Wechselangebot-Zeile wird durch softFallback ersetzt.
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

const NAV_VERGLEICHE_LABEL = {
  de: "Vergleiche",
  en: "Comparisons",
  it: "Confronti",
  fa: "مقایسه‌ها",
  si: "සැසඳීම්",
  ru: "Сравнения",
};

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripExclamation = (s) => String(s ?? "").replace(/^✅\s*/, "");

const pickRiskReversalText = (line, h1Approved) => {
  if (line.pending && !h1Approved && line.softFallback) return line.softFallback;
  return line.text;
};

/**
 * Build erweiterte JSON-LD @graph für eine /vergleiche/<slug>-Page.
 */
export function buildComparisonSchemas(data, { h1Approved = false, lang = "de" } = {}) {
  const url = `${SITE_URL}/${lang}/vergleiche/${data.slug}`;
  const inLanguage = LOCALE_FOR_LANG[lang] ?? "de-DE";
  const orgRef = { "@id": `${SITE_URL}/#organization` };

  // BreadcrumbList — lokalisiert
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: NAV_VERGLEICHE_LABEL[lang] ?? "Vergleiche",
        item: `${SITE_URL}/${lang}/vergleiche`,
      },
      { "@type": "ListItem", position: 3, name: data.competitorName, item: url },
    ],
  };

  // FAQPage — alle Q&A, AI-Engines lieben das
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage,
    mainEntity: data.faq.map((q, idx) => ({
      "@type": "Question",
      "@id": `${url}#faq-${idx + 1}`,
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
        ...(q.source ? { url: q.source } : {}),
      },
    })),
  };

  // ItemList — strukturierter Vergleich für jede Achse, AI-extrahierbar
  const itemList = {
    "@type": "ItemList",
    "@id": `${url}#comparison-table`,
    name: `${data.competitorName} vs Gastro Master — ${
      lang === "en"
        ? "comparison axes"
        : lang === "it"
        ? "assi di confronto"
        : lang === "ru"
        ? "оси сравнения"
        : lang === "fa"
        ? "محورهای مقایسه"
        : lang === "si"
        ? "සැසඳුම් අක්ෂ"
        : "Vergleichs-Achsen"
    }`,
    inLanguage,
    numberOfItems: data.detailedTable.length,
    itemListElement: data.detailedTable.map((row, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Thing",
        name: row.axis,
        description: `${data.competitorName}: ${row.competitorValue} | Gastro Master: ${row.gastroMasterValue} | ${row.meaning}`,
        url: row.source,
      },
    })),
  };

  // Review — Mehlfabrik-Customer-Quote als Schema.org Review
  // Quote ist im DE-Original (lang="de"), reviewBody enthält den Originaltext.
  const review = {
    "@type": "Review",
    "@id": `${url}#customer-review`,
    inLanguage: "de-DE",
    author: { "@type": "Person", name: data.customerStory.attribution.split(" · ")[0] },
    datePublished: data.customerStory.sourceDate,
    reviewBody: data.customerStory.quote,
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    itemReviewed: orgRef,
    url: data.customerStory.source,
  };

  // AggregateRating — 5.0 / 131 Reviews; referenziert Organization
  const aggregateRating = {
    "@type": "AggregateRating",
    "@id": `${url}#aggregate-rating`,
    itemReviewed: orgRef,
    ratingValue: "5.0",
    reviewCount: "131",
    bestRating: "5",
    worstRating: "1",
  };

  // HowTo — abgeleitet aus dem "Wie wechsle ich"-FAQ-Item, ai-actionable
  const switchFaq = data.faq.find(
    (q) => /wechsel|switch|passaggio|переход|تعویض|මාරු/i.test(q.question),
  );
  const howTo = switchFaq
    ? {
        "@type": "HowTo",
        "@id": `${url}#howto-switch`,
        name: switchFaq.question,
        description: switchFaq.answer,
        inLanguage,
        totalTime: "PT15M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name:
              lang === "en"
                ? "Book the free switch-check"
                : lang === "it"
                ? "Prenota il check di passaggio gratuito"
                : lang === "ru"
                ? "Закажите бесплатную проверку перехода"
                : lang === "fa"
                ? "بررسی تعویض رایگان را رزرو کنید"
                : lang === "si"
                ? "නොමිලේ මාරු-පරීක්ෂණය වෙන්කරවන්න"
                : "Kostenlosen Wechsel-Check buchen",
            url: `${SITE_URL}/${lang}/kontakt`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name:
              lang === "en"
                ? "Receive a written comparison calculation"
                : lang === "it"
                ? "Riceva un confronto scritto"
                : lang === "ru"
                ? "Получите письменный расчёт"
                : lang === "fa"
                ? "محاسبهٔ مقایسه‌ای کتبی دریافت کنید"
                : lang === "si"
                ? "ලිඛිත සසන්දන ගණනයක් ලබා ගන්න"
                : "Schriftliche Vergleichs-Rechnung erhalten",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name:
              lang === "en"
                ? "Decide freely whether to switch"
                : lang === "it"
                ? "Decidi liberamente se passare"
                : lang === "ru"
                ? "Свободно решите, переходить ли"
                : lang === "fa"
                ? "آزادانه دربارهٔ تعویض تصمیم بگیرید"
                : lang === "si"
                ? "මාරු වීමට ස්වේච්ඡාවෙන් තීරණය කරන්න"
                : "Frei entscheiden, ob du wechselst",
          },
        ],
      }
    : null;

  // WebPage — referenziert alle Subgraphen
  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: data.meta.title,
    description: data.meta.description,
    inLanguage,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: orgRef,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: { "@id": `${url}#article` },
    primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
    dateModified: data.meta.dateModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    mentions: data.quotableOneLiners.map((text) => ({ "@type": "Thing", name: text })),
  };

  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: data.hook.headline,
    description: data.hook.subHeadline,
    inLanguage,
    datePublished: data.meta.dateModified,
    dateModified: data.meta.dateModified,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: orgRef,
    publisher: orgRef,
    image: `${SITE_URL}/logo-gastro-master.png`,
    articleBody:
      data.quotableOneLiners.join(" ") +
      " " +
      data.riskReversal.map((l) => stripExclamation(pickRiskReversalText(l, h1Approved))).join(" "),
    wordCount: countWords(data),
  };

  const graph = [webPage, article, breadcrumbs, faqPage, itemList, review, aggregateRating];
  if (howTo) graph.push(howTo);

  return [{ "@context": "https://schema.org", "@graph": graph }];
}

function countWords(data) {
  const fields = [
    data.hook.headline,
    data.hook.subHeadline,
    ...data.quickFacts.flatMap((r) => [r.axis, r.competitorValue, r.gastroMasterValue, r.meaning]),
    ...data.detailedTable.flatMap((r) => [r.axis, r.competitorValue, r.gastroMasterValue, r.meaning]),
    data.gmAvatars.intro,
    ...data.gmAvatars.avatars,
    data.gmAvatars.closingStatement,
    ...data.faq.flatMap((q) => [q.question, q.answer]),
    ...data.riskReversal.map((r) => r.text),
    ...data.quotableOneLiners,
  ];
  return fields.join(" ").split(/\s+/).filter(Boolean).length;
}

/**
 * Static HTML fallback — AI-Crawler readable, ohne JS.
 */
export function buildComparisonStaticHtml(data, { h1Approved = false, lang = "de" } = {}) {
  const t = data;
  const isRtl = lang === "fa";
  const dir = isRtl ? "rtl" : "ltr";

  const trustPills = t.hook.trustPills
    .map((p) => `<li>${escapeHtml(p.label)}</li>`)
    .join("");

  const renderRow = (r) => `
    <tr>
      <th scope="row">${escapeHtml(r.axis)}</th>
      <td><strong>${escapeHtml(t.competitorName)}:</strong> ${escapeHtml(r.competitorValue)}</td>
      <td><strong>Gastro Master:</strong> ${escapeHtml(r.gastroMasterValue)}</td>
      <td><em>${escapeHtml(r.meaning)}</em> <small>(<a href="${escapeHtml(r.source)}" rel="nofollow">Quelle, ${escapeHtml(r.sourceDate)}</a>)</small></td>
    </tr>`;

  const detailedRows = t.detailedTable.map(renderRow).join("");
  const quickRows = t.quickFacts.map(renderRow).join("");
  const avatars = t.gmAvatars.avatars.map((a) => `<li>${escapeHtml(a)}</li>`).join("");

  const faqItems = t.faq
    .map(
      (q) => `
    <div class="comparison-faq-item">
      <h3>${escapeHtml(q.question)}</h3>
      <p>${escapeHtml(q.answer)}</p>
      ${q.source ? `<small><a href="${escapeHtml(q.source)}" rel="nofollow">${escapeHtml(q.sourceDate || "")}</a></small>` : ""}
    </div>`,
    )
    .join("");

  const reversalLines = t.riskReversal
    .map((l) => `<li>${escapeHtml(stripExclamation(pickRiskReversalText(l, h1Approved)))}</li>`)
    .join("");

  return `
<article class="comparison-page" lang="${lang}" dir="${dir}" data-competitor="${escapeHtml(t.competitorName)}" data-modified="${escapeHtml(t.meta.dateModified)}">
  <header class="comparison-hook">
    <h1 data-speakable>${escapeHtml(t.hook.headline)}</h1>
    <p class="comparison-sub-headline">${escapeHtml(t.hook.subHeadline)}</p>
    <ul class="comparison-trust-pills">${trustPills}</ul>
  </header>

  <section class="comparison-quick">
    <h2>${escapeHtml(t.competitorName)} vs Gastro Master</h2>
    <table>
      <thead><tr><th>Achse</th><th>${escapeHtml(t.competitorName)}</th><th>Gastro Master</th><th>Bedeutung</th></tr></thead>
      <tbody>${quickRows}</tbody>
    </table>
  </section>

  <section class="comparison-detailed">
    <h2>${escapeHtml(t.competitorName)} vs Gastro Master — ${escapeHtml(String(t.detailedTable.length))} Achsen</h2>
    <table>
      <thead><tr><th>Achse</th><th>${escapeHtml(t.competitorName)}</th><th>Gastro Master</th><th>Bedeutung</th></tr></thead>
      <tbody>${detailedRows}</tbody>
    </table>
  </section>

  <section class="comparison-avatars">
    <h2>${escapeHtml(t.gmAvatars.intro)}</h2>
    <ul>${avatars}</ul>
    <p><em>${escapeHtml(t.gmAvatars.closingStatement)}</em></p>
  </section>

  <section class="comparison-customer-story">
    <blockquote lang="de" cite="${escapeHtml(t.customerStory.source)}">
      <p>${escapeHtml(t.customerStory.quote)}</p>
      <cite>— ${escapeHtml(t.customerStory.attribution)}</cite>
    </blockquote>
  </section>

  <section class="comparison-faq">
    <h2>FAQ</h2>
    ${faqItems}
  </section>

  <section class="comparison-risk-reversal" data-speakable>
    <ul>${reversalLines}</ul>
    <a href="/${lang}/kontakt" class="comparison-cta-primary"><strong>${escapeHtml(t.cta.primaryText)}</strong></a>
  </section>
</article>`;
}

/**
 * Komplette Page rendern: head-Patches + Schema-Blocks + static HTML fallback.
 *
 * @param baseHtml  Build-Output index.html
 * @param data      ComparisonData für die Ziel-Sprache
 * @param opts.lang Ziel-Sprache (de/en/it/fa/si/ru)
 * @param opts.allLangs   alle Sprachen, die diese Page hat (für hreflang-Tags)
 * @param opts.h1Approved Wechselangebot-Flag
 */
export function renderComparisonPage(baseHtml, data, { h1Approved = false, lang = "de", allLangs = ["de"] } = {}) {
  const url = `${SITE_URL}/${lang}/vergleiche/${data.slug}`;
  const schemas = buildComparisonSchemas(data, { h1Approved, lang });
  const staticHtml = buildComparisonStaticHtml(data, { h1Approved, lang });
  const inLanguage = LOCALE_FOR_LANG[lang] ?? "de-DE";

  // Hreflang-Tags: alle Sprachen + x-default = de
  const hreflangTags = [
    ...allLangs.map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/vergleiche/${data.slug}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/de/vergleiche/${data.slug}" />`,
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
    `<meta property="og:type" content="article">`,
    `<meta property="og:locale" content="${inLanguage.replace("-", "_")}">`,
    `<meta property="og:image" content="${SITE_URL}/logo-gastro-master.png">`,
    `<meta property="article:modified_time" content="${data.meta.dateModified}">`,
    `<meta property="article:published_time" content="${data.meta.dateModified}">`,
    `<meta property="article:author" content="Gastro Master">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(data.meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(data.meta.description)}">`,
    `<meta name="twitter:image" content="${SITE_URL}/logo-gastro-master.png">`,
    ...schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ].join("\n  ");

  let html = baseHtml;
  // Strip prior head-injections so re-runs are idempotent.
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
  // Update <html lang="..."> attribute for crawler-correctness
  html = html.replace(/<html([^>]*)\slang="[^"]*"/, `<html$1 lang="${lang}"`);
  if (lang === "fa") {
    html = html.replace(/<html([^>]*)>/, `<html$1 dir="rtl">`);
  }
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticHtml}</div>`);
  return html;
}
