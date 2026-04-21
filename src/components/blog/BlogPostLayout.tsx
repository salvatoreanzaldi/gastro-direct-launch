import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ChevronRight, Clock, ArrowLeft, ArrowRight } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  "Meinung":       "bg-orange-500/15 text-orange-400 border border-orange-500/25",
  "How-to":        "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25",
  "Vergleich":     "bg-purple-500/15 text-purple-400 border border-purple-500/25",
  "Bestellsystem": "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  "Kassensystem":  "bg-green-500/15 text-green-400 border border-green-500/25",
  "Website":       "bg-pink-500/15 text-pink-400 border border-pink-500/25",
  "Integration":   "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25",
};

export interface BlogPostLayoutProps {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishDate: string;
  slug: string;
  children: React.ReactNode;
}

export const BlogPostLayout = ({
  title,
  description,
  category,
  readingTime,
  publishDate,
  slug,
  children,
}: BlogPostLayoutProps) => {
  const lp = useLangPath();
  const colorClass = CATEGORY_COLORS[category] ?? "bg-white/10 text-white/70 border border-white/20";

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://gastro-master.de/blog" },
      { "@type": "ListItem", position: 3, name: title, item: `https://gastro-master.de/blog/${slug}` },
    ],
  };

  const SCHEMA_BLOGPOSTING = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: "2026-04-20",
    author: { "@type": "Organization", name: "Gastro Master" },
    publisher: {
      "@type": "Organization",
      name: "Gastro Master",
      url: "https://gastro-master.de",
    },
    url: `https://gastro-master.de/blog/${slug}`,
    inLanguage: "de-DE",
  };

  useSeoMeta({
    title: `${title} | Gastro Master Blog`,
    description,
    canonical: `https://gastro-master.de/blog/${slug}`,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BLOGPOSTING) }} />
      <Navbar />

      {/* ── Article Header ─────────────────────────────────────────────────────── */}
      <section className="mesh-gradient px-5 md:px-8 lg:px-16 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#007DCF]/8 blur-[160px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8 flex-wrap">
            <Link to={lp("/")} className="hover:text-white/70 transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to={lp("/blog")} className="hover:text-white/70 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white/60 truncate max-w-[180px] sm:max-w-none">{title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6 flex-wrap"
          >
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock className="w-3 h-3" /> {readingTime}
            </span>
            <span className="text-xs text-white/30">{publishDate}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/60 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* ── Article Body ────────────────────────────────────────────────────────── */}
      <article className="px-5 md:px-8 lg:px-16 py-16 bg-[#091A33]">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </article>

      {/* ── Inline CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-16 bg-[#091A33]">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-[#007DCF]/20 to-[#0A264A]/60 border border-[#007DCF]/25 p-8 md:p-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand mb-4">Gastro Master</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
              Bereit für dein eigenes Bestellsystem?
            </h2>
            <p className="text-white/55 mb-8 max-w-xl mx-auto leading-relaxed">
              Kein Lieferando-Anteil. Keine Überraschungskosten. Nur deine Kunden, deine Einnahmen.
            </p>
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Erstgespräch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Back link ───────────────────────────────────────────────────────────── */}
      <div className="px-5 md:px-8 lg:px-16 pb-12 bg-[#091A33]">
        <div className="max-w-3xl mx-auto">
          <Link
            to={lp("/blog")}
            className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zum Blog
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
