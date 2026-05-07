import { lazy, Suspense, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import {
  getComparison,
  comparisonSlugs,
  type ComparisonData,
  type ComparisonLang,
} from "@/data/comparisons";
import { VERGLEICHE_SEGMENT, type LangCode } from "@/config/routes";

const SUPPORTED_LANGS: readonly ComparisonLang[] = [
  "de",
  "en",
  "it",
  "fa",
  "si",
  "ru",
];

const LOCALE_FOR_LANG: Record<ComparisonLang, string> = {
  de: "de-DE",
  en: "en-US",
  it: "it-IT",
  fa: "fa-IR",
  si: "si-LK",
  ru: "ru-RU",
};

const T = {
  de: {
    badge: "Faktencheck mit Quellen · Stand",
    quickHeading: "Auf einen Blick",
    quickSub: "Die vier wichtigsten Achsen — Quellen unter jeder Karte.",
    detailedHeading: "Detaillierter Faktencheck",
    detailedSub: "Klicke auf eine Achse, um die Bedeutung für deinen Betrieb zu lesen.",
    avatarHeading: "Passt Gastro Master zu dir?",
    customerStoryHeading: "Wie ein DACH-Restaurant es erlebt hat",
    faqHeading: "Häufige Fragen",
    faqSub: "Was Restaurant-Inhaber typischerweise vor dem Wechsel fragen.",
    riskTitle: "Wechseln ohne Risiko — wir machen es planbar",
    riskOverline: "Was du bei einem Wechsel mitbekommst",
    columnAxis: "Achse",
    columnGM: "Gastro Master",
    columnMeaning: "Bedeutung für dich",
    columnPackage: "Paket",
    meaningPrefix: "Was bedeutet das für dich?",
    sourceLabel: "Quelle, Stand",
    cta: "Kostenlose Beratung",
    moreQuestions: "Mehr Fragen?",
    lastUpdate: "Letzte Faktencheck-Aktualisierung:",
    siblingHeading: "Weitere Vergleiche",
    siblingSub: "Faktenchecks zu drei weiteren Anbietern.",
    siblingHubLink: "→ Alle Anbieter im Markt-Überblick",
  },
  en: {
    badge: "Fact check with sources · As of",
    quickHeading: "At a glance",
    quickSub: "The four most important axes — sources beneath each card.",
    detailedHeading: "Detailed fact check",
    detailedSub: "Click an axis to read what it means for your operation.",
    avatarHeading: "Does Gastro Master fit you?",
    customerStoryHeading: "How a DACH restaurant experienced it",
    faqHeading: "Frequently asked questions",
    faqSub: "What restaurant owners typically ask before switching.",
    riskTitle: "Switch without risk — we make it plannable",
    riskOverline: "What you get when you switch",
    columnAxis: "Axis",
    columnGM: "Gastro Master",
    columnMeaning: "What it means for you",
    columnPackage: "Package",
    meaningPrefix: "What does this mean for you?",
    sourceLabel: "Source, as of",
    cta: "Free consultation",
    moreQuestions: "More questions?",
    lastUpdate: "Last fact-check update:",
    siblingHeading: "Other comparisons",
    siblingSub: "Fact checks for three more providers.",
    siblingHubLink: "→ All providers in the market overview",
  },
  it: {
    badge: "Verifica dei fatti con fonti · Stato",
    quickHeading: "A colpo d'occhio",
    quickSub: "I quattro assi più importanti — fonti sotto ciascuna scheda.",
    detailedHeading: "Verifica dettagliata dei fatti",
    detailedSub: "Clicca su un asse per leggere cosa significa per la tua attività.",
    avatarHeading: "Gastro Master fa per te?",
    customerStoryHeading: "Come un ristorante DACH lo ha vissuto",
    faqHeading: "Domande frequenti",
    faqSub: "Quello che i ristoratori chiedono tipicamente prima di passare.",
    riskTitle: "Cambio senza rischi — lo rendiamo pianificabile",
    riskOverline: "Cosa ricevi al passaggio",
    columnAxis: "Asse",
    columnGM: "Gastro Master",
    columnMeaning: "Cosa significa per te",
    columnPackage: "Pacchetto",
    meaningPrefix: "Cosa significa per te?",
    sourceLabel: "Fonte, stato",
    cta: "Consulenza gratuita",
    moreQuestions: "Altre domande?",
    lastUpdate: "Ultimo aggiornamento dei fatti:",
    siblingHeading: "Altri confronti",
    siblingSub: "Verifica dei fatti per altri tre fornitori.",
    siblingHubLink: "→ Tutti i fornitori nella panoramica del mercato",
  },
  fa: {
    badge: "بررسی واقعیت‌ها با منابع · تاریخ",
    quickHeading: "در یک نگاه",
    quickSub: "چهار محور مهم‌ترین — منابع زیر هر کارت.",
    detailedHeading: "بررسی واقعیت‌های دقیق",
    detailedSub: "روی یک محور کلیک کنید تا مفهوم آن برای کسب‌وکارتان را بخوانید.",
    avatarHeading: "آیا گاسترو مستر برای شما مناسب است؟",
    customerStoryHeading: "تجربهٔ یک رستوران DACH",
    faqHeading: "پرسش‌های متداول",
    faqSub: "آنچه صاحبان رستوران معمولاً پیش از تعویض می‌پرسند.",
    riskTitle: "تعویض بدون ریسک — ما آن را قابل‌برنامه‌ریزی می‌کنیم",
    riskOverline: "آنچه هنگام تعویض دریافت می‌کنید",
    columnAxis: "محور",
    columnGM: "گاسترو مستر",
    columnMeaning: "معنای آن برای شما",
    columnPackage: "بسته",
    meaningPrefix: "این برای شما چه معنایی دارد؟",
    sourceLabel: "منبع، تاریخ",
    cta: "مشاورهٔ رایگان",
    moreQuestions: "سؤالات بیشتر؟",
    lastUpdate: "آخرین به‌روزرسانی بررسی:",
    siblingHeading: "مقایسه‌های دیگر",
    siblingSub: "بررسی واقعیت‌ها برای سه ارائه‌دهنده دیگر.",
    siblingHubLink: "← همه ارائه‌دهندگان در نمای کلی بازار",
  },
  si: {
    badge: "මූලාශ්‍ර සමඟ කරුණු පරීක්ෂාව · ස්ථිතිය",
    quickHeading: "එක නෙතින්",
    quickSub: "වැදගත්ම අක්ෂ හතර — එක් එක් කාඩ්පත යට මූලාශ්‍ර.",
    detailedHeading: "විස්තරාත්මක කරුණු පරීක්ෂාව",
    detailedSub: "ඔබේ ව්‍යාපාරයට එහි අර්ථය කියවීමට අක්ෂයක් මත ක්ලික් කරන්න.",
    avatarHeading: "Gastro Master ඔබට ගැලපේද?",
    customerStoryHeading: "DACH ආපනශාලාවක් අත්දකිය හැකි ආකාරය",
    faqHeading: "නිතර අසන ප්‍රශ්න",
    faqSub: "මාරු වීමට පෙර ආපනශාලා හිමිකරුවන් සාමාන්‍යයෙන් අසන කරුණු.",
    riskTitle: "අවදානමකින් තොරව මාරු වන්න — අපි එය සැලසුම්ගත කරමු",
    riskOverline: "මාරු වන විට ඔබට ලැබෙන දේ",
    columnAxis: "අක්ෂය",
    columnGM: "Gastro Master",
    columnMeaning: "ඔබට එහි අර්ථය",
    columnPackage: "පැකේජය",
    meaningPrefix: "මෙය ඔබට කුමක්ද?",
    sourceLabel: "මූලාශ්‍රය, ස්ථිතිය",
    cta: "නොමිලේ උපදෙස්",
    moreQuestions: "තවත් ප්‍රශ්න?",
    lastUpdate: "අන්තිම කරුණු පරීක්ෂණ යාවත්කාලීනය:",
    siblingHeading: "තවත් සැසඳීම්",
    siblingSub: "තවත් සැපයුම්කරුවන් තිදෙනෙකු සඳහා කරුණු පරීක්ෂාව.",
    siblingHubLink: "→ වෙළඳපල දළ විශ්ලේෂණයේ සියලු සැපයුම්කරුවන්",
  },
  ru: {
    badge: "Проверка фактов с источниками · По состоянию на",
    quickHeading: "С первого взгляда",
    quickSub: "Четыре важнейшие оси — источники под каждой карточкой.",
    detailedHeading: "Подробная проверка фактов",
    detailedSub: "Нажмите на ось, чтобы прочитать, что это значит для вашего бизнеса.",
    avatarHeading: "Подходит ли вам Gastro Master?",
    customerStoryHeading: "Как это пережил ресторан в регионе DACH",
    faqHeading: "Часто задаваемые вопросы",
    faqSub: "Что владельцы ресторанов обычно спрашивают перед переходом.",
    riskTitle: "Переход без риска — мы делаем его планируемым",
    riskOverline: "Что вы получаете при переходе",
    columnAxis: "Ось",
    columnGM: "Gastro Master",
    columnMeaning: "Что это значит для вас",
    columnPackage: "Пакет",
    meaningPrefix: "Что это значит для вас?",
    sourceLabel: "Источник, по состоянию на",
    cta: "Бесплатная консультация",
    moreQuestions: "Ещё вопросы?",
    lastUpdate: "Последнее обновление проверки:",
    siblingHeading: "Другие сравнения",
    siblingSub: "Проверка фактов для трёх других поставщиков.",
    siblingHubLink: "→ Все поставщики в обзоре рынка",
  },
} as const;

function detectLang(pathname: string): ComparisonLang {
  const m = pathname.match(/^\/([a-z]{2})\//);
  const lang = m?.[1] as ComparisonLang | undefined;
  return lang && SUPPORTED_LANGS.includes(lang) ? lang : "de";
}

/**
 * ISO-Date (YYYY-MM-DD) → lokalisierte Anzeige.
 * Beispiel: "2026-05-06" → "06.05.2026" (de) · "05/06/2026" (en) · "06/05/2026" (it/ru)
 * Persisch + Singhalesisch: gregorianischer Kalender, lokale Ziffern.
 */
function formatDate(iso: string, lang: ComparisonLang): string {
  try {
    const d = new Date(iso + "T00:00:00Z");
    if (Number.isNaN(d.getTime())) return iso;
    const locale = LOCALE_FOR_LANG[lang] ?? "de-DE";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      calendar: "gregory",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return iso;
  }
}
import {
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Quote,
  ShieldCheck,
} from "lucide-react";

// Wiederverwendete Trust-Sektionen aus der Hauptseite (Index.tsx).
const GoogleReviewsGrid = lazy(() => import("@/components/GoogleReviewsGrid"));
const VideoTestimonialSection = lazy(
  () => import("@/components/landing/VideoTestimonialSection"),
);
const HomeTeamCTA = lazy(() => import("@/components/HomeTeamCTA"));
const CTASection = lazy(() =>
  import("@/components/CTASection").then((m) => ({ default: m.CTASection })),
);

/**
 * H1-Pending-Flag: Wechselangebot 50 % darf erst claimt werden, wenn
 * Marge / AGB / Anwalt-Sign-off durch sind (Wissens-Bibel #19 Action-Items).
 * Solange greift `softFallback` automatisch.
 *
 * Sobald freigegeben → auf `true` setzen UND parallel im Pre-Render-Skript
 * `COMPARISON_H1_APPROVED = true`.
 */
const H1_APPROVED = false;

const SITE_URL = "https://gastro-master.de";

const pickReversalText = (
  line: ComparisonData["riskReversal"][number],
  approved: boolean,
): string => {
  if (line.pending && !approved && line.softFallback) return line.softFallback;
  return line.text;
};

/**
 * Wiederverwendbarer Kostenlose-Beratung-CTA, lang-aware via Prop.
 */
const ConsultationCTA = ({
  lang,
  className = "",
}: {
  lang: ComparisonLang;
  className?: string;
}) => {
  return (
    <Button
      asChild
      size="lg"
      className={`bg-[#ED8400] !font-bold tracking-wide text-white shadow-lg hover:bg-[#D67400] ${className}`}
    >
      <Link to={`/${lang}/kontakt`} className="gap-2">
        {T[lang].cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
};

const SourceLink = ({
  url,
  date,
  lang,
}: {
  url: string;
  date?: string;
  lang: ComparisonLang;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary underline-offset-2 hover:underline"
  >
    {T[lang].sourceLabel}
    {date ? ` ${formatDate(date, lang)}` : ""}
    <ExternalLink className="h-3 w-3" />
  </a>
);

const VergleichePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const lang = detectLang(pathname);
  const t = T[lang];
  const data = slug ? getComparison(slug, lang) : undefined;

  const url = data
    ? `${SITE_URL}/${lang}/${VERGLEICHE_SEGMENT[lang as LangCode]}/${data.slug}`
    : `${SITE_URL}/${lang}`;

  useSeoMeta({
    title: data?.meta.title ?? "Vergleiche — Gastro Master",
    description: data?.meta.description ?? "Faktencheck mit Quellen.",
    canonical: url,
    type: "article",
    publishedTime: data?.meta.dateModified,
    modifiedTime: data?.meta.dateModified,
  });

  useEffect(() => {
    // hreflang-Tags + alternate URLs werden serverseitig durch den Pre-Renderer
    // gesetzt (scripts/comparison-page-generator.mjs). Im SPA-Modus müssen wir
    // sie hier nachziehen, damit beim Sprachwechsel zur Laufzeit die richtigen
    // Alternate-Links im DOM stehen.
    if (!data) return;
    const head = document.head;
    head
      .querySelectorAll('link[rel="alternate"][data-vergleiche]')
      .forEach((el) => el.remove());
    for (const l of SUPPORTED_LANGS) {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", l);
      link.setAttribute(
        "href",
        `${SITE_URL}/${l}/${VERGLEICHE_SEGMENT[l as LangCode]}/${data.slug}`,
      );
      link.setAttribute("data-vergleiche", "1");
      head.appendChild(link);
    }
    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.setAttribute(
      "href",
      `${SITE_URL}/de/${VERGLEICHE_SEGMENT.de}/${data.slug}`,
    );
    xDefault.setAttribute("data-vergleiche", "1");
    head.appendChild(xDefault);
  }, [data, lang]);

  if (!data) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <div
      className="min-h-screen bg-background"
      dir={lang === "fa" ? "rtl" : "ltr"}
      lang={lang}
    >
      <ScrollProgressBar />
      <Navbar />

      <main className="overflow-hidden">
        {/* ─── Section 1: Hook (modern blue gradient) ─────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A4A8F] to-[#0EA5E9] px-4 pb-16 pt-28 text-white md:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.35),_transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(6,24,48,0.6),_transparent_60%)]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <span className="mb-5 inline-block rounded-full border border-cyan-brand/30 bg-cyan-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-brand">
              {t.badge} {formatDate(data.meta.dateModified, lang)}
            </span>
            <h1
              data-speakable
              className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              {data.hook.headline}
            </h1>
            <p className="mt-5 text-balance text-base text-white/75 md:text-lg">
              {data.hook.subHeadline}
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {data.hook.trustPills.map((pill) => (
                <li
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-brand" />
                  {pill.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <ConsultationCTA lang={lang} />
            </div>
          </motion.div>
        </section>

        {/* ─── Trust-Layer 1: Google Reviews (aus Hauptseite) ─────────── */}
        <Suspense fallback={null}>
          <GoogleReviewsGrid />
        </Suspense>

        {/* ─── Section 2: Auf einen Blick ─────────────────────────────── */}
        <section className="border-b border-border/50 bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {t.quickHeading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">{t.quickSub}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.quickFacts.map((row) => (
                <Card key={row.axis} className="border-border/50">
                  <CardContent className="space-y-3 p-5">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {row.axis}
                    </p>
                    {row.priceBreakdown && row.priceBreakdown.length > 0 ? (
                      <div className="overflow-hidden rounded-lg border border-border/50">
                        <div className="grid grid-cols-3 bg-muted/40 px-3 py-2 text-xs font-semibold">
                          <span className="text-muted-foreground">
                            {t.columnPackage}
                          </span>
                          <span className="text-center">{data.competitorName}</span>
                          <span className="text-center text-cyan-brand">
                            {t.columnGM}
                          </span>
                        </div>
                        <div className="divide-y divide-border/40">
                          {row.priceBreakdown.map((p) => (
                            <div
                              key={p.packageLabel}
                              className="grid grid-cols-3 items-center px-3 py-2.5 text-sm"
                            >
                              <span className="font-medium">{p.packageLabel}</span>
                              <span className="text-center text-muted-foreground line-through decoration-muted-foreground/40">
                                {p.competitorPrice}
                              </span>
                              <span className="flex flex-col items-center gap-1">
                                <span className="font-bold text-cyan-brand">
                                  {p.gastroMasterPrice}
                                </span>
                                {p.savingsLabel && (
                                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-800">
                                    −{p.savingsLabel}
                                  </span>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-semibold">
                            {data.competitorName}:
                          </span>{" "}
                          {row.competitorValue}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-primary">
                            Gastro Master:
                          </span>{" "}
                          {row.gastroMasterValue}
                        </p>
                      </div>
                    )}
                    <p className="rounded-md bg-muted/50 p-3 text-sm">
                      <span className="font-medium">{t.meaningPrefix}</span>{" "}
                      {row.meaning}
                    </p>
                    <SourceLink
                      url={row.source}
                      date={row.sourceDate}
                      lang={lang}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ConsultationCTA lang={lang} />
            </div>
          </div>
        </section>

        {/* ─── Section 3: Detaillierte Tabelle ────────────────────────── */}
        <section className="border-b border-border/50 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {t.detailedHeading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              {t.detailedSub}
            </p>
            {/* Mobile: gestapelte Cards */}
            <div className="space-y-3 md:hidden">
              {data.detailedTable.map((row) => (
                <Card key={row.axis} className="border-border/50">
                  <CardContent className="space-y-2 p-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {row.axis}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">
                        {data.competitorName}:
                      </span>{" "}
                      {row.competitorValue}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-primary">
                        {t.columnGM}:
                      </span>{" "}
                      {row.gastroMasterValue}
                    </p>
                    <p className="rounded-md bg-muted/50 p-2 text-sm">
                      <span className="font-medium">{t.meaningPrefix}</span>{" "}
                      {row.meaning}
                    </p>
                    <SourceLink
                      url={row.source}
                      date={row.sourceDate}
                      lang={lang}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Desktop: echte Tabelle */}
            <div className="hidden overflow-hidden rounded-lg border border-border/50 md:block">
              <table className="w-full">
                <thead className="bg-muted/40 text-left text-sm">
                  <tr>
                    <th className="w-1/5 px-4 py-3 font-semibold">
                      {t.columnAxis}
                    </th>
                    <th className="w-1/4 px-4 py-3 font-semibold">
                      {data.competitorName}
                    </th>
                    <th className="w-1/4 px-4 py-3 font-semibold text-primary">
                      {t.columnGM}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {t.columnMeaning}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-sm">
                  {data.detailedTable.map((row) => (
                    <tr key={row.axis} className="align-top">
                      <td className="px-4 py-4 font-medium">{row.axis}</td>
                      <td className="px-4 py-4">{row.competitorValue}</td>
                      <td className="px-4 py-4">{row.gastroMasterValue}</td>
                      <td className="px-4 py-4">
                        <p className="mb-1.5">{row.meaning}</p>
                        <SourceLink
                          url={row.source}
                          date={row.sourceDate}
                          lang={lang}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Conviction-Statement (Council 2026-05-06: Money-Math-Synthese) ── */}
        {data.convictionStatement && (
          <section
            data-speakable
            className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A4A8F] to-[#0EA5E9] px-4 py-16 text-white md:py-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.30),_transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(6,24,48,0.55),_transparent_60%)]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-8 text-balance text-2xl font-bold md:text-3xl">
                {data.convictionStatement.heading}
              </h2>
              <div className="mb-8 grid gap-3 md:grid-cols-3">
                {data.convictionStatement.punchlines.map((p) => (
                  <div
                    key={p}
                    className="rounded-lg border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold text-white backdrop-blur-sm md:text-base"
                  >
                    {p}
                  </div>
                ))}
              </div>
              <p className="mb-6 text-balance text-base leading-relaxed text-white/90 md:text-lg">
                {data.convictionStatement.body}
              </p>
              <p className="text-balance text-sm italic text-white/60 md:text-base">
                {data.convictionStatement.closing}
                {" — "}
                {t.lastUpdate.replace(/[:.]$/, "")} {formatDate(data.meta.dateModified, lang)}.
              </p>
            </motion.div>
          </section>
        )}

        {/* ─── Section 4: Passt Gastro Master zu dir? (cyan tint) ─────── */}
        <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-cyan-brand/5 via-background to-primary/5 px-4 py-16">
          <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-cyan-brand/10 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-primary md:text-3xl">
              {t.avatarHeading}
            </h2>
            <p className="mb-6 text-base text-foreground/80">
              {data.gmAvatars.intro}
            </p>
            <ul className="mb-6 space-y-3">
              {data.gmAvatars.avatars.map((avatar) => (
                <li key={avatar} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-brand" />
                  <span>{avatar}</span>
                </li>
              ))}
            </ul>
            <p className="rounded-md border-l-4 border-cyan-brand/50 bg-card p-4 text-sm italic text-foreground/70 shadow-sm">
              {data.gmAvatars.closingStatement}
            </p>
            <div className="mt-10 flex justify-center">
              <ConsultationCTA lang={lang} />
            </div>
          </div>
        </section>

        {/* ─── Trust-Layer 2: Video Testimonials (aus Hauptseite) ─────── */}
        <Suspense fallback={null}>
          <VideoTestimonialSection />
        </Suspense>

        {/* ─── Section 5: Customer Story ──────────────────────────────── */}
        <section className="border-b border-border/50 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="sr-only">{t.customerStoryHeading}</h2>
            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                <Quote className="mb-4 h-8 w-8 text-primary/60" />
                <blockquote
                  className="text-lg italic md:text-xl"
                  lang="de"
                  cite={data.customerStory.source}
                >
                  {data.customerStory.quote}
                </blockquote>
                <footer className="mt-5 flex flex-col gap-1 text-sm">
                  <cite className="font-semibold not-italic">
                    — {data.customerStory.attribution}
                  </cite>
                  <SourceLink
                    url={data.customerStory.source}
                    date={data.customerStory.sourceDate}
                    lang={lang}
                  />
                </footer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── Section 6: FAQ ─────────────────────────────────────────── */}
        <section className="border-b border-border/50 bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {t.faqHeading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">{t.faqSub}</p>
            <Accordion type="single" collapsible className="w-full">
              {data.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-base">
                    <p>{item.answer}</p>
                    {item.source && (
                      <SourceLink
                        url={item.source}
                        date={item.sourceDate}
                        lang={lang}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── Section 7: Risk-Reversal-Box + CTA (navy hero finale) ──── */}
        <section
          data-speakable
          className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-4 py-16 text-white md:py-24"
        >
          <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-brand/10 blur-[140px]" />
          <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[#ED8400]/10 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-center gap-2">
              <ShieldCheck className="h-6 w-6 text-cyan-brand" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand">
                {t.riskOverline}
              </p>
            </div>
            <h2 className="mb-8 text-balance text-center text-2xl font-bold md:text-3xl">
              {t.riskTitle}
            </h2>
            <ul className="mb-10 space-y-4 text-base md:text-lg">
              {data.riskReversal.map((line, idx) => {
                const text = pickReversalText(line, H1_APPROVED);
                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-brand" />
                    <span className="text-white/95">
                      {text.replace(/^✅\s*/, "")}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-center">
              <ConsultationCTA lang={lang} className="w-full sm:w-auto" />
            </div>

            <p className="mt-8 text-center text-xs text-white/50">
              {t.lastUpdate} {formatDate(data.meta.dateModified, lang)} ·{" "}
              <Link to={`/${lang}/faq`} className="underline hover:text-white">
                {t.moreQuestions}
              </Link>
            </p>
          </div>
        </section>

        {/* ─── Weitere Vergleiche (Sibling-Links + Hub) ─────────────────── */}
        {(() => {
          const seg = VERGLEICHE_SEGMENT[lang as LangCode];
          const siblings = comparisonSlugs
            .filter((s) => s !== data.slug)
            .slice(0, 3)
            .map((slug) => {
              const sibling = getComparison(slug, lang);
              return sibling ? { slug, name: sibling.competitorName } : null;
            })
            .filter((s): s is { slug: string; name: string } => s !== null);
          if (siblings.length === 0) return null;
          return (
            <section className="border-b border-border/50 bg-muted/30 px-4 py-12">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-1 text-xl font-semibold md:text-2xl">
                  {t.siblingHeading}
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  {t.siblingSub}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {siblings.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/${lang}/${seg}/${s.slug}`}
                      className="group rounded-lg border border-border/60 bg-background px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-cyan-brand/50 hover:shadow-sm"
                    >
                      Gastro Master vs. {s.name}
                      <ArrowRight className="ml-1 inline-block h-3.5 w-3.5 text-cyan-brand transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
                <Link
                  to={`/${lang}/${seg}`}
                  className="mt-5 inline-block text-sm font-semibold text-cyan-brand underline-offset-2 hover:underline"
                >
                  {t.siblingHubLink}
                </Link>
              </div>
            </section>
          );
        })()}

        {/* ─── Final CTA-Sektion (Desktop = HomeTeamCTA, Mobile = CTASection) ── */}
        {/* CTASection enthält intern eine leere Desktop-Hülle mit bg-white +
            vertikalem Padding — wir kappen sie hier sauber via md:hidden, damit
            auf Desktop kein leerer weißer Streifen über dem Footer erscheint. */}
        <Suspense fallback={null}>
          <HomeTeamCTA />
          <div className="md:hidden">
            <CTASection productPath="/" />
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default VergleichePage;
