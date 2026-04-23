import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import BlogFooterCTA from "@/components/blog/BlogFooterCTA";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import { BLOG_CATEGORIES } from "@/config/blog-categories";
import { blogPosts } from "@/data/blog-posts";
import { ChevronRight, Search } from "lucide-react";

const PAGE_SIZE = 12;

const formatDateToGerman = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });
};

const ALL_POSTS = blogPosts
  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
  .map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || post.description,
    category: post.category,
    readingTime: `${post.readingTime} min`,
    publishDate: formatDateToGerman(post.publishedDate),
  }));

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://gastro-master.de/de/blog" },
  ],
};

const SCHEMA_BLOG = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Gastro Master Blog",
  url: "https://gastro-master.de/de/blog",
  description: "Praxisnahe Ratgeber für Restaurantinhaber und Lieferdienst-Betreiber in Deutschland.",
  publisher: { "@type": "Organization", name: "Gastro Master", url: "https://gastro-master.de" },
  inLanguage: "de-DE",
};

const BlogPage = () => {
  const { t, ready } = useTranslation("blog");
  const lp = useLangPath();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/de/blog",
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_POSTS.filter((p) => {
      const matchesCategory = !activeCategory || p.category === activeCategory;
      const matchesSearch =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryClick = useCallback((slug: string) => {
    setActiveCategory((prev) => (prev === slug ? null : slug));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <div
      className={`min-h-screen transition-opacity duration-300 ${!ready ? "opacity-0 lg:opacity-100" : "opacity-100"}`}
      style={{ backgroundColor: "#0A264A" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BLOG) }} />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="mesh-gradient min-h-[45vh] flex items-center px-5 md:px-8 lg:px-16 pt-28 pb-20 relative overflow-hidden">
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
            Gastro-Wissen
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-3xl"
          >
            Ratgeber für die<br />
            <span className="text-cyan-brand">moderne Gastronomie</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/55 max-w-xl leading-relaxed mb-10"
          >
            Praxiswissen zu Bestellsystemen, Lieferservice, Marketing, Recht und mehr — direkt aus dem Gastro-Alltag.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex items-center gap-6 text-sm"
          >
            {[
              { value: "100+", label: "Artikel" },
              { value: "8", label: "Kategorien" },
              { value: "2026", label: "Aktuell" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-white">{s.value}</span>
                <span className="text-white/40 text-xs">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-16 bg-[#091A33]">
        <div className="max-w-6xl mx-auto">

          {/* Search + category filter row */}
          <div className="flex flex-col gap-4 mb-10">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Artikel suchen…"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-brand/50 transition-colors"
              />
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.label)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      isActive
                        ? `${cat.bg} ${cat.text} ${cat.border} scale-105`
                        : "bg-white/5 text-white/50 border-white/10 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="ml-1.5 opacity-60">×</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-white/30 mb-6">
            {filtered.length === ALL_POSTS.length
              ? `${ALL_POSTS.length} Artikel`
              : `${filtered.length} von ${ALL_POSTS.length} Artikeln`}
            {activeCategory && ` in „${activeCategory}"`}
          </p>

          {/* Grid */}
          {visible.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visible.map((post, i) => (
                  <BlogCard key={post.slug} {...post} index={i} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="px-8 py-3 rounded-lg border border-white/15 text-white/70 text-sm font-semibold hover:border-cyan-brand/50 hover:text-white transition-all duration-200"
                  >
                    Mehr laden ({filtered.length - visibleCount} weitere)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 text-white/30 text-sm">
              Keine Artikel gefunden.{" "}
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); }}
                className="text-cyan-brand hover:underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Google Reviews (full-bleed, weißer BG wie auf HomePage/UeberUns) ─── */}
      <GoogleReviewsGrid />

      {/* ── Beratung CTA (zurück in Dark-BG, nahtlos zum Footer) ──────────────── */}
      <section className="bg-[#0A264A]">
        <BlogFooterCTA />
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
