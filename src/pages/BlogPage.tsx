import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";
import { BlogCard } from "@/components/blog/BlogCard";
import { ChevronRight } from "lucide-react";

const BLOG_POSTS = [
  {
    slug: "warum-lieferando-verzichten",
    title: "Warum dein Lieferservice auf Lieferando verzichten sollte",
    excerpt:
      "Lieferando nimmt bis zu 30 % Provision pro Bestellung. Was das für deine Marge wirklich bedeutet — und welche Alternative sich lohnt.",
    category: "Meinung",
    readingTime: "6 min",
    publishDate: "20. April 2026",
  },
  {
    slug: "5-fehler-lieferdienst-eroffnen",
    title: "5 Fehler beim Eröffnen eines Lieferdienstes (und wie du sie vermeidest)",
    excerpt:
      "Von falscher Standortwahl bis fehlendem Bestellsystem: Diese Fehler kosten Gründer Monate und Tausende Euro.",
    category: "How-to",
    readingTime: "8 min",
    publishDate: "20. April 2026",
  },
  {
    slug: "was-kostet-bestellsystem",
    title: "Was kostet ein eigenes Bestellsystem wirklich? (Ehrlicher Vergleich)",
    excerpt:
      "Setup, Provision, Support — wir rechnen alle Kosten durch und zeigen, was Gastro Master im Vergleich zu Lieferando wirklich kostet.",
    category: "Vergleich",
    readingTime: "7 min",
    publishDate: "20. April 2026",
  },
];

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://gastro-master.de/blog" },
  ],
};

const SCHEMA_BLOG = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Gastro Master Blog",
  url: "https://gastro-master.de/blog",
  description: "Praxisnahe Ratgeber für Restaurantinhaber und Lieferdienst-Betreiber in Deutschland.",
  publisher: {
    "@type": "Organization",
    name: "Gastro Master",
    url: "https://gastro-master.de",
  },
  inLanguage: "de-DE",
};

const BlogPage = () => {
  const { t, ready } = useTranslation("blog");
  const lp = useLangPath();

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/blog",
  });

  return (
    <div
      className={`min-h-screen transition-opacity duration-300 ${!ready ? "opacity-0 lg:opacity-100" : "opacity-100"}`}
      style={{ backgroundColor: "#0A264A" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BLOG) }} />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="mesh-gradient min-h-[45vh] flex items-center px-5 md:px-8 lg:px-16 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#007DCF]/8 blur-[160px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
            <Link to={lp("/")} className="hover:text-white/70 transition-colors">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{t("breadcrumb.blog")}</span>
          </nav>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/55 max-w-2xl leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ── Posts Grid ────────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 bg-[#091A33]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={post.slug} {...post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block">
        <HomeTeamCTA />
      </div>
      <div className="lg:hidden">
        <CTASection {...getCTAConfig("/blog")} />
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
