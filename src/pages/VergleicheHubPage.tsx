import { lazy, Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import {
  getHub,
  type ComparisonLang,
} from "@/data/comparisons";
import {
  VERGLEICHE_SEGMENT,
  type LangCode,
} from "@/config/routes";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Quote,
  ShieldCheck,
} from "lucide-react";

const SUPPORTED_LANGS: readonly ComparisonLang[] = ["de", "en", "it", "fa", "si", "ru"];
const SITE_URL = "https://gastro-master.de";

const GoogleReviewsGrid = lazy(() => import("@/components/GoogleReviewsGrid"));
const HomeTeamCTA = lazy(() => import("@/components/HomeTeamCTA"));
const CTASection = lazy(() =>
  import("@/components/CTASection").then((m) => ({ default: m.CTASection })),
);

function detectLang(pathname: string): ComparisonLang {
  const m = pathname.match(/^\/([a-z]{2})\//);
  const lang = m?.[1] as ComparisonLang | undefined;
  return lang && SUPPORTED_LANGS.includes(lang) ? lang : "de";
}

function formatDate(iso: string, lang: ComparisonLang): string {
  try {
    const d = new Date(iso + "T00:00:00Z");
    if (Number.isNaN(d.getTime())) return iso;
    const localeMap: Record<ComparisonLang, string> = {
      de: "de-DE",
      en: "en-US",
      it: "it-IT",
      fa: "fa-IR-u-ca-gregory",
      si: "si-LK-u-ca-gregory",
      ru: "ru-RU",
    };
    return new Intl.DateTimeFormat(localeMap[lang], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

const PrimaryCTA = ({ label, lang, className = "" }: { label: string; lang: ComparisonLang; className?: string }) => (
  <Button
    asChild
    size="lg"
    className={`bg-[#ED8400] !font-bold tracking-wide text-white shadow-lg hover:bg-[#D67400] ${className}`}
  >
    <Link to={`/${lang}/kontakt`} className="gap-2">
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  </Button>
);

const VergleicheHubPage = () => {
  const { pathname } = useLocation();
  const lang = detectLang(pathname);
  const data = getHub(lang);
  const seg = VERGLEICHE_SEGMENT[lang as LangCode];
  const url = `${SITE_URL}/${lang}/${seg}`;

  useSeoMeta({
    title: data.meta.title,
    description: data.meta.description,
    canonical: url,
    type: "website",
    publishedTime: data.meta.dateModified,
    modifiedTime: data.meta.dateModified,
  });

  // Hreflang-Tags zur Laufzeit nachziehen (Pre-Renderer setzt sie ebenfalls).
  useEffect(() => {
    const head = document.head;
    head
      .querySelectorAll('link[rel="alternate"][data-vergleiche-hub]')
      .forEach((el) => el.remove());
    for (const l of SUPPORTED_LANGS) {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", l);
      link.setAttribute(
        "href",
        `${SITE_URL}/${l}/${VERGLEICHE_SEGMENT[l as LangCode]}`,
      );
      link.setAttribute("data-vergleiche-hub", "1");
      head.appendChild(link);
    }
    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.setAttribute(
      "href",
      `${SITE_URL}/de/${VERGLEICHE_SEGMENT.de}`,
    );
    xDefault.setAttribute("data-vergleiche-hub", "1");
    head.appendChild(xDefault);
  }, [lang]);

  return (
    <div
      className="min-h-screen bg-background"
      dir={lang === "fa" ? "rtl" : "ltr"}
      lang={lang}
    >
      <ScrollProgressBar />
      <Navbar />

      <main className="overflow-hidden">
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
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
              {data.hero.badge} · {formatDate(data.meta.dateModified, lang)}
            </span>
            <h1
              data-speakable
              className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              {data.hero.h1}
            </h1>
            <p className="mt-5 text-balance text-base text-white/75 md:text-lg">
              {data.hero.lead}
            </p>
          </motion.div>
        </section>

        {/* ─── Section 1: Vergleichs-Quertabelle (allererstes Asset) ───── */}
        <section className="border-b border-border/50 bg-background px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {data.table.heading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              {data.table.sourcesNote}
            </p>

            {/* Desktop: echte Tabelle mit semantischem Markup */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border bg-muted/30 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {/* Provider name column header is implicit / blank */}
                    </th>
                    {data.table.columns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className="px-4 py-3 font-semibold"
                      >
                        {col.label}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {/* Source link column */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.table.rows.map((row) => (
                    <tr
                      key={row.name}
                      className={`border-b border-border/50 ${row.isOurs ? "bg-cyan-brand/5" : ""}`}
                    >
                      <th
                        scope="row"
                        className="px-4 py-4 text-left align-top font-semibold"
                      >
                        {row.detailSlug ? (
                          <Link
                            to={`/${lang}/${seg}/${row.detailSlug}`}
                            className="text-foreground underline-offset-2 hover:text-primary hover:underline"
                          >
                            {row.name}
                          </Link>
                        ) : (
                          <span className="text-cyan-brand">
                            {row.name}
                            <span className="ml-2 inline-block rounded-full border border-cyan-brand/30 bg-cyan-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-brand">
                              {data.table.ourLabel}
                            </span>
                          </span>
                        )}
                      </th>
                      {data.table.columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-4 py-4 align-top text-foreground/85"
                        >
                          {row.cells[col.key]}
                        </td>
                      ))}
                      <td className="px-4 py-4 align-top">
                        {row.source && (
                          <a
                            href={row.source}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: gestackte Cards */}
            <div className="space-y-4 md:hidden">
              {data.table.rows.map((row) => (
                <Card
                  key={row.name}
                  className={`border-border/50 ${row.isOurs ? "border-cyan-brand/40 bg-cyan-brand/5" : ""}`}
                >
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-baseline justify-between">
                      {row.detailSlug ? (
                        <Link
                          to={`/${lang}/${seg}/${row.detailSlug}`}
                          className="text-base font-semibold text-foreground underline-offset-2 hover:text-primary hover:underline"
                        >
                          {row.name}
                        </Link>
                      ) : (
                        <span className="text-base font-semibold text-cyan-brand">
                          {row.name}
                        </span>
                      )}
                      {row.isOurs && (
                        <span className="rounded-full border border-cyan-brand/30 bg-cyan-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-brand">
                          {data.table.ourLabel}
                        </span>
                      )}
                    </div>
                    {data.table.columns.map((col) => (
                      <div key={col.key} className="space-y-0.5">
                        <p className="text-xs font-semibold text-muted-foreground">
                          {col.label}
                        </p>
                        <p className="text-sm text-foreground/85">
                          {row.cells[col.key]}
                        </p>
                      </div>
                    ))}
                    {row.source && (
                      <a
                        href={row.source}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {row.sourceDate ? formatDate(row.sourceDate, lang) : ""}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Trust-Layer: Google-Reviews ─────────────────────────────── */}
        <Suspense fallback={null}>
          <GoogleReviewsGrid />
        </Suspense>

        {/* ─── Section 3: 5-Karten-Grid (Detail-Page-Discovery) ─────────── */}
        <section className="border-b border-border/50 bg-background px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {data.cards.heading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground md:text-base">
              {data.cards.sub}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.cards.items.map((card) => (
                <Card
                  key={card.slug}
                  className="flex flex-col border-border/50 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="flex flex-1 flex-col gap-4 p-5">
                    <h3 className="text-lg font-bold text-foreground">
                      Gastro Master vs. {card.name}
                    </h3>
                    <p className="flex-1 text-sm text-muted-foreground">
                      {card.positioning}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full !font-semibold"
                    >
                      <Link
                        to={`/${lang}/${seg}/${card.slug}`}
                        className="gap-2"
                      >
                        {card.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <PrimaryCTA label={data.hardCtaLabel} lang={lang} />
            </div>
          </div>
        </section>

        {/* ─── Section 4: Methodik (E-E-A-T-Trigger) ────────────────────── */}
        <section className="border-b border-border/50 bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-brand/30 bg-cyan-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-brand">
              <ShieldCheck className="h-3 w-3" />
              {data.methodology.heading}
            </div>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              {data.methodology.body}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {data.methodology.asOfNote}
            </p>
          </div>
        </section>

        {/* ─── Section 5: Mehlfabrik-Customer-Story ─────────────────────── */}
        <section className="border-b border-border/50 bg-background px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-2xl font-semibold md:text-3xl">
              {data.customerStory.sectionHeading}
            </h2>
            <Quote className="mx-auto mb-4 h-8 w-8 text-cyan-brand/40" />
            <blockquote
              lang="de"
              cite={data.customerStory.source}
              className="text-balance text-base italic text-foreground/85 md:text-lg"
            >
              {data.customerStory.quote}
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              — {data.customerStory.attribution}
            </p>
          </div>
        </section>

        {/* ─── Section 6: Meta-FAQ inline (KEIN FAQPage-Schema) ─────────── */}
        <section className="border-b border-border/50 bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              {data.metaFaq.heading}
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              {data.metaFaq.sub}
            </p>
            <Accordion type="single" collapsible className="space-y-2">
              {data.metaFaq.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-lg border border-border/50 bg-background px-4"
                >
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/80">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── Section 7: Unsere Position (Salvatore-Prinzip) ──────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A4A8F] to-[#0EA5E9] px-4 py-20 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(237,132,0,0.18),_transparent_55%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-cyan-brand" />
            <h2 className="mb-5 text-2xl font-bold md:text-3xl">
              {data.ourPosition.heading}
            </h2>
            <p className="text-balance text-base leading-relaxed text-white/85 md:text-lg">
              {data.ourPosition.body}
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryCTA label={data.hardCtaLabel} lang={lang} />
            </div>
          </div>
        </section>

        {/* ─── Final CTA Block: HomeTeamCTA (Desktop) + CTASection (Mobile) ─ */}
        <Suspense fallback={null}>
          <HomeTeamCTA />
        </Suspense>
        <div className="md:hidden">
          <Suspense fallback={null}>
            <CTASection />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VergleicheHubPage;
