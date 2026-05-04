import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, Quote, Plus, Minus, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import TrustedBrandsSection from "@/components/landing/TrustedBrandsSection";
import VideoTestimonialSection from "@/components/landing/VideoTestimonialSection";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { ADD_ONS, buildAddOnProductNode } from "@/data/addOns";

// ─── Config Interface ────────────────────────────────────────────────────────
export interface AddOnProblemPoint { icon: LucideIcon; text: string }
export interface AddOnSolutionPoint { icon: LucideIcon; text: string }
export interface AddOnFeature { icon: LucideIcon; title: string; description: string }
export interface AddOnUseCase { icon: LucideIcon; title: string; story: string }
export interface AddOnStat { value: string; label: string }
export interface AddOnLink { to: string; title: string; description: string }
export interface AddOnPriceTier { qty: string; price: string }
export interface AddOnFaq { q: string; a: string }
export interface AddOnAppStoreLink {
  href: string;
  iconSrc: string;
  alt: string;
}

export interface AddOnPageConfig {
  meta: {
    title: string;
    description: string;
    canonical: string;
    breadcrumb: { name: string; path: string };
    /** Used to look up the mobile CTA text via getCTAConfig(). Must match a key in cta-config.ts. */
    ctaPath: string;
  };
  hero: {
    badge: string;
    headline: string;
    subline: string;
    heroImage?: string;
    heroImageRounded?: boolean;
    heroImageLarge?: boolean;
  };
  problemSolution: {
    problem: { title: string; points: AddOnProblemPoint[] };
    solution: { title: string; points: AddOnSolutionPoint[] };
  };
  features: {
    headline: string;
    sub?: string;
    items: AddOnFeature[];
  };
  useCases: {
    headline: string;
    sub?: string;
    items: AddOnUseCase[];
  };
  trust: {
    stats?: AddOnStat[];
    testimonial?: { quote: string; author: string; role: string };
  };
  pricing?: {
    headline: string;
    price: string;
    note?: string;
    tiers?: AddOnPriceTier[];
    tiersHeadline?: string;
    tiersNote?: string;
  };
  internalLinks: {
    headline: string;
    intro?: string;
    items: AddOnLink[];
  };
  faq?: {
    headline?: string;
    sub?: string;
    items: AddOnFaq[];
  };
  appDownload?: {
    headline: string;
    sub?: string;
    appName?: string;
    links: AddOnAppStoreLink[];
  };
}

// ─── Hero (stays dark — brand-signature dramatic opener) ─────────────────────
const HeroSection = ({ badge, headline, subline, heroImage, heroImageRounded, heroImageLarge }: AddOnPageConfig["hero"]) => {
  const { t } = useTranslation("common");
  return (
  <section className="mesh-gradient min-h-[82vh] flex items-center section-padding pt-48 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#007DCF]/10 blur-[140px] pointer-events-none" />
    <div className="container-tight relative z-10 w-full">
      <div className={`grid gap-14 items-center ${heroImage ? heroImageLarge ? "lg:grid-cols-3" : "lg:grid-cols-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={heroImage ? "" : "text-center max-w-3xl mx-auto"}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 mt-8">
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
            {subline}
          </p>
          <a
            href="/kontakt"
            className="bg-gradient-amber text-white font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
          >
            {t("nav.cta")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative ${heroImageLarge ? "lg:col-span-2" : ""}`}
          >
            <img src={heroImage} alt={badge} className={`w-full h-auto relative z-10 ${heroImageRounded ? "rounded-2xl" : ""}`} />
            <div className="absolute inset-0 -z-10 blur-3xl bg-[#007DCF]/20 scale-110" />
          </motion.div>
        )}
      </div>
    </div>
  </section>
  );
};

// ─── Problem & Solution — now theme-aware ────────────────────────────────────
const ProblemSolutionSection = ({ problem, solution }: AddOnPageConfig["problemSolution"]) => (
  <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
    <div className="container-tight">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 bg-card border border-red-400/30 dark:border-red-400/20 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" strokeWidth={2} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">{problem.title}</h2>
          </div>
          <ul className="space-y-4">
            {problem.points.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={i} className="flex gap-3 items-start">
                  <Icon className="w-5 h-5 text-red-500/80 dark:text-red-400/80 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="text-muted-foreground leading-relaxed">{p.text}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-8 bg-card border border-cyan-brand/30 ring-1 ring-cyan-brand/10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-brand/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-cyan-brand" strokeWidth={2} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">{solution.title}</h2>
          </div>
          <ul className="space-y-4">
            {solution.points.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={i} className="flex gap-3 items-start">
                  <Icon className="w-5 h-5 text-cyan-brand flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="text-foreground/85 leading-relaxed">{p.text}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Features — white (light) / dark bg ──────────────────────────────────────
const FeaturesSection = ({ headline, sub, items }: AddOnPageConfig["features"]) => (
  <section className="bg-background section-padding">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{headline}</h2>
        {sub && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{sub}</p>}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {items.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
              }}
              className="rounded-2xl p-7 bg-card border border-border hover:border-cyan-brand/30 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1.5 leading-snug">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

// ─── Use Cases — muted bg alternate ──────────────────────────────────────────
const UseCasesSection = ({ headline, sub, items }: AddOnPageConfig["useCases"]) => (
  <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{headline}</h2>
        {sub && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{sub}</p>}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((uc, i) => {
          const Icon = uc.icon;
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-7 bg-card border border-border shadow-sm flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-brand/15 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 leading-snug">{uc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{uc.story}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Trust (stats + testimonial) — white bg ──────────────────────────────────
const TrustSection = ({ stats, testimonial }: AddOnPageConfig["trust"]) => (
  <section className="bg-background section-padding">
    <div className="container-tight">
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center rounded-2xl p-6 bg-card border border-border shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-black text-cyan-brand mb-1">{s.value}</div>
              <div className="text-muted-foreground text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {testimonial && testimonial.quote && (
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-2xl p-8 bg-card border border-border shadow-sm"
        >
          <Quote className="w-7 h-7 text-cyan-brand/60 mx-auto mb-4" strokeWidth={1.75} />
          <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-5 italic">
            {"\u201E"}{testimonial.quote}{"\u201C"}
          </p>
          <footer className="text-muted-foreground text-sm">
            <strong className="text-foreground not-italic">{testimonial.author}</strong>
            <span className="mx-2 opacity-40">{"\u2022"}</span>
            {testimonial.role}
          </footer>
        </motion.blockquote>
      )}
    </div>
  </section>
);

// ─── Pricing — muted bg ──────────────────────────────────────────────────────
const PricingSection = ({ headline, price, note, tiers, tiersHeadline, tiersNote }: NonNullable<AddOnPageConfig["pricing"]>) => (
  <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center rounded-2xl p-10 md:p-12 bg-card border border-cyan-brand/20 shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">{headline}</h2>
        <p className="text-cyan-brand text-3xl md:text-4xl font-black mb-3">{price}</p>
        {note && <p className="text-muted-foreground text-sm leading-relaxed">{note}</p>}
      </motion.div>

      {tiers && tiers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mt-10 rounded-2xl p-8 md:p-10 bg-card border border-border shadow-sm"
        >
          {tiersHeadline && (
            <h3 className="text-xl md:text-2xl font-black text-foreground text-center mb-6">
              {tiersHeadline}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0 divide-y sm:divide-y-0 divide-border">
            {tiers.map((t, i) => (
              <div
                key={t.qty}
                className={`flex items-center justify-between py-3 ${
                  i < tiers.length - (tiers.length % 2 === 0 ? 2 : 1) ? "sm:border-b sm:border-border" : ""
                }`}
              >
                <span className="text-foreground/80 text-sm md:text-base">{t.qty}</span>
                <span className="text-foreground font-bold text-sm md:text-base">{t.price}</span>
              </div>
            ))}
          </div>
          {tiersNote && (
            <p className="text-muted-foreground text-xs text-center mt-6 leading-relaxed">{tiersNote}</p>
          )}
        </motion.div>
      )}
    </div>
  </section>
);

// ─── FAQ — white bg, accordion, with schema ──────────────────────────────────
const FaqItem = ({ q, a }: AddOnFaq) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-foreground font-semibold text-base md:text-lg leading-snug group-hover:text-cyan-brand transition-colors duration-200">
          {q}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-cyan-brand transition-colors duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed pb-6 text-base max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = ({ headline, sub, items }: NonNullable<AddOnPageConfig["faq"]>) => (
  <section className="bg-background section-padding">
    <div className="container-tight max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
          {headline ?? "Häufig gestellte Fragen"}
        </h2>
        {sub && <p className="text-muted-foreground text-base max-w-2xl mx-auto">{sub}</p>}
      </motion.div>
      <div>
        {items.map(f => <FaqItem key={f.q} {...f} />)}
      </div>
    </div>
  </section>
);

// ─── App Download (iOS + Android) — muted bg ─────────────────────────────────
const AppDownloadSection = ({ headline, sub, appName, links }: NonNullable<AddOnPageConfig["appDownload"]>) => (
  <section className="bg-muted/40 dark:bg-[#091A33] section-padding">
    <div className="container-tight max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        {appName && (
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5">
            {appName}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{headline}</h2>
        {sub && <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">{sub}</p>}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {links.map((l, i) => (
          <motion.a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="block hover:scale-[1.03] transition-transform duration-200"
          >
            <img
              src={l.iconSrc}
              alt={l.alt}
              className="h-14 md:h-16 w-auto"
              loading="lazy"
            />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

// ─── Internal Links — white bg ───────────────────────────────────────────────
const InternalLinksSection = ({ headline, intro, items }: AddOnPageConfig["internalLinks"]) => (
  <section className="bg-background section-padding">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{headline}</h2>
        {intro && <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">{intro}</p>}
      </motion.div>

      <div className={`grid gap-5 ${items.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2"}`}>
        {items.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              to={l.to}
              className="group block rounded-2xl p-7 bg-card border border-border hover:border-cyan-brand/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1.5 leading-snug group-hover:text-cyan-brand transition-colors">
                    {l.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{l.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-brand/70 flex-shrink-0 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Schema helpers ──────────────────────────────────────────────────────────
const useBreadcrumbSchema = (name: string, path: string) => {
  useEffect(() => {
    const existing = document.getElementById("addon-breadcrumb-schema");
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
        { "@type": "ListItem", position: 2, name: "Add-Ons", item: "https://gastro-master.de/produkte/add-ons" },
        { "@type": "ListItem", position: 3, name, item: `https://gastro-master.de${path}` },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "addon-breadcrumb-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("addon-breadcrumb-schema")?.remove();
    };
  }, [name, path]);
};

const useFaqSchema = (items: AddOnFaq[] | undefined) => {
  useEffect(() => {
    const id = "addon-faq-schema";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (!items || items.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [items]);
};

// ─── Template ────────────────────────────────────────────────────────────────
interface AddOnPageTemplateProps {
  config: AddOnPageConfig;
  hardwareSections?: {
    afterTrust?: React.ReactNode;
    beforeFeatures?: React.ReactNode;
    beforeUseCases?: React.ReactNode;
    beforePricing?: React.ReactNode;
  };
}

const AddOnPageTemplate = ({ config, hardwareSections }: AddOnPageTemplateProps) => {
  useSeoMeta({
    title: config.meta.title,
    description: config.meta.description,
    canonical: config.meta.canonical,
  });
  useBreadcrumbSchema(config.meta.breadcrumb.name, config.meta.breadcrumb.path);
  useFaqSchema(config.faq?.items);

  // Product-Schema for the current add-on (lookup by canonical path).
  // Provides isAccessoryOrSparePartFor links to host packages so LLMs can
  // resolve the cross-sell relationship.
  const addOnNode = ADD_ONS.find((a) => a.slug === config.meta.breadcrumb.path);
  const productSchema = addOnNode ? buildAddOnProductNode(addOnNode) : null;

  return (
    <div className="min-h-screen bg-background">
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...productSchema,
            }),
          }}
        />
      )}
      <Navbar />

      <HeroSection {...config.hero} />

      {/* Social Proof direkt nach Hero (wie auf Startseite) */}
      <GoogleReviewsGrid />
      <TrustedBrandsSection />

      {/* Hardware Multicolor Section - direkt nach TrustedBrands */}
      {hardwareSections?.afterTrust}

      <ProblemSolutionSection {...config.problemSolution} />

      {/* Hardware Doublescreen Section - vor Features */}
      {hardwareSections?.beforeFeatures}

      <FeaturesSection {...config.features} />

      {/* YouTube-Testimonial Slider */}
      <VideoTestimonialSection />

      {/* Hardware Wallmount Section - vor UseCases */}
      {hardwareSections?.beforeUseCases}

      <UseCasesSection {...config.useCases} />
      <TrustSection {...config.trust} />

      {/* Hardware Outdoor Section - vor Pricing */}
      {hardwareSections?.beforePricing}

      {config.pricing && <PricingSection {...config.pricing} />}
      {config.appDownload && <AppDownloadSection {...config.appDownload} />}
      <InternalLinksSection {...config.internalLinks} />

      {/* Final CTA — responsive (Desktop = HomeTeamCTA, Mobile = CTASection) */}
      <div className="hidden md:block">
        <HomeTeamCTA />
      </div>
      <div className="md:hidden">
        <CTASection {...getCTAConfig(config.meta.ctaPath)} />
      </div>

      {/* FAQ mit FAQPage-Schema (SEO + GEO) */}
      {config.faq && <FaqSection {...config.faq} />}

      <Footer />
    </div>
  );
};

export default AddOnPageTemplate;
