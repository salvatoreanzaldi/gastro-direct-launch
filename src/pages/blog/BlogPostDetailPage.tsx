import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import BlogFooterCTA from "@/components/blog/BlogFooterCTA";
import { ChevronRight, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { getCategoryConfig } from "@/config/blog-categories";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import reneFoto from "@/assets/team/ceo-rene-ebert.png";
import sanjayaFoto from "@/assets/team/team-sanjaya-pattiyage.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface TocItem {
  id: string;
  text: string;
}

function extractTocFromHtml(html: string): TocItem[] {
  const matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  return matches.map((m) => {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    return { id: slugifyHeading(text), text };
  });
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugifyHeading(text);
    if (attrs.includes("id=")) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}

function formatDateToGerman(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });
}

// ─── Reading progress bar ─────────────────────────────────────────────────────

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5">
      <div
        className="h-full bg-cyan-brand transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ─── TOC Sidebar ─────────────────────────────────────────────────────────────

const TocSidebar = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block absolute top-0 right-4 w-[240px]">
      <div className="sticky top-24">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">Inhalt</p>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-[13px] leading-snug py-1 pl-3 border-l-2 transition-all duration-200 ${
                activeId === item.id
                  ? "border-cyan-brand text-white font-semibold"
                  : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/30"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

// ─── Author Box ───────────────────────────────────────────────────────────────

const AuthorAvatar = ({
  src,
  initials,
  alt,
  ringClass,
  fallbackGradient,
}: {
  src: string;
  initials: string;
  alt: string;
  ringClass: string;
  fallbackGradient: string;
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-base font-bold text-white border-2 border-[#091A33] ring-2 ${ringClass} ${fallbackGradient} group-hover:ring-opacity-100 transition-all`}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`w-20 h-20 rounded-full object-cover border-2 border-[#091A33] ring-2 ${ringClass} shadow-lg group-hover:scale-105 transition-transform duration-300`}
    />
  );
};

const AuthorBox = ({ date }: { date: string }) => (
  <div className="py-6 border-t border-b border-white/10 mt-12 mb-10">
    <Link
      to="/de/uber-uns"
      className="flex items-center gap-5 group"
      aria-label="Über René Ebert und Sanjaya Pattiyage — Gründer Gastro Master"
    >
      <div className="flex -space-x-3 shrink-0">
        <AuthorAvatar
          src={reneFoto}
          initials="RE"
          alt="René Ebert — Gründer Gastro Master"
          ringClass="ring-cyan-500/30 group-hover:ring-cyan-500/70"
          fallbackGradient="bg-gradient-to-br from-cyan-400 to-blue-600"
        />
        <AuthorAvatar
          src={sanjayaFoto}
          initials="SP"
          alt="Sanjaya Pattiyage — Gründer Gastro Master"
          ringClass="ring-orange-500/30 group-hover:ring-orange-500/70"
          fallbackGradient="bg-gradient-to-br from-orange-400 to-rose-500"
        />
      </div>
      <div>
        <p className="text-base font-bold text-white group-hover:text-cyan-brand transition-colors">
          René Ebert &amp; Sanjaya Pattiyage
        </p>
        <p className="text-sm text-white/50 mt-0.5">Gründer Gastro Master · {date}</p>
        <p className="text-xs text-cyan-brand/80 mt-1 group-hover:text-cyan-brand transition-colors">
          Mehr über uns →
        </p>
      </div>
    </Link>
  </div>
);

// ─── Related Posts ────────────────────────────────────────────────────────────

const RelatedPosts = ({ currentSlug, category }: { currentSlug: string; category: string }) => {
  const related = useMemo(
    () =>
      blogPosts
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        .slice(0, 3),
    [currentSlug, category]
  );

  if (related.length === 0) return null;
  const cat = getCategoryConfig(category);

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <h2 className="text-xl font-bold text-white mb-6">Weitere Artikel in „{cat.label}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/de/blog/${p.slug}`}
            className="group bg-white/[0.04] rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
          >
            <p className="text-sm font-semibold text-white group-hover:text-cyan-brand transition-colors line-clamp-2 leading-snug mb-2">
              {p.title}
            </p>
            <p className="text-xs text-white/40 flex items-center gap-1">
              {p.readingTime} min <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// ─── Prev / Next ──────────────────────────────────────────────────────────────

const PrevNextNav = ({ currentSlug }: { currentSlug: string }) => {
  const sorted = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()),
    []
  );
  const idx = sorted.findIndex((p) => p.slug === currentSlug);
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const next = idx > 0 ? sorted[idx - 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex items-stretch justify-between gap-4 mt-12 pt-8 border-t border-white/10">
      {prev ? (
        <Link
          to={`/de/blog/${prev.slug}`}
          className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all max-w-[48%]"
        >
          <span className="text-[11px] text-white/30 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Vorheriger Artikel
          </span>
          <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={`/de/blog/${next.slug}`}
          className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-right max-w-[48%] ml-auto"
        >
          <span className="text-[11px] text-white/30 flex items-center gap-1 justify-end">
            Nächster Artikel <ArrowRight className="w-3 h-3" />
          </span>
          <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BlogPostDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lp = useLangPath();

  const slug = location.pathname.split("/").pop() || "";
  const post = blogPosts.find((p) => p.slug === slug);

  const cat = post ? getCategoryConfig(post.category) : null;

  const { tocItems, processedHtml } = useMemo(() => {
    if (!post?.bodyHtml) return { tocItems: [], processedHtml: "" };
    return {
      tocItems: extractTocFromHtml(post.bodyHtml),
      processedHtml: injectHeadingIds(post.bodyHtml),
    };
  }, [post?.bodyHtml]);

  useEffect(() => {
    if (!post && slug) navigate("/de/blog");
  }, [post, slug, navigate]);

  useEffect(() => {
    if (!post?.jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `blog-jsonld-${post.slug}`;
    script.textContent = post.jsonLd;
    document.head.appendChild(script);
    return () => {
      document.getElementById(`blog-jsonld-${post.slug}`)?.remove();
    };
  }, [post?.slug, post?.jsonLd]);

  useSeoMeta({
    title: post ? `${post.title} | Gastro Master Blog` : "Blog | Gastro Master",
    description: post?.metaDescription || post?.description || "",
    canonical: `https://gastro-master.de/de/blog/${slug}`,
  });

  if (!post || !cat) return null;

  const formattedDate = formatDateToGerman(post.publishedDate);

  return (
    <div className="min-h-screen bg-[#0A264A]">
      <ReadingProgressBar />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="mesh-gradient min-h-[44vh] flex items-end px-5 md:px-8 lg:px-16 pt-28 pb-14 relative overflow-hidden">
        {/* Category gradient glow */}
        <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} to-transparent opacity-40 pointer-events-none`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#007DCF]/10 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
            <button
              onClick={() => navigate(lp("/blog"))}
              className="hover:text-white/70 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Blog
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className={`${cat.text} font-semibold`}>{cat.label}</span>
          </nav>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border ${cat.bg} ${cat.text} ${cat.border}`}
          >
            {cat.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 text-sm text-white/50"
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min Lesezeit
            </span>
            <span className="text-white/20">·</span>
            <span>{formattedDate}</span>
            <span className="text-white/20">·</span>
            <span>René Ebert & Sanjaya Pattiyage</span>
          </motion.div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-16 bg-[#091A33]">
        {/* Outer container allows wide layout for TOC without shifting article */}
        <div className="relative max-w-[1400px] mx-auto">

          {/* Article: truly centered in viewport via mx-auto (TOC doesn't push it) */}
          <div className="max-w-[720px] mx-auto">
              <AuthorBox date={formattedDate} />

              {post.bodyHtml ? (
                <article
                  className="prose prose-invert
                    prose-headings:text-white prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-24
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
                    prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-5
                    prose-strong:text-white
                    prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                    prose-li:text-zinc-300 prose-li:marker:text-white/30
                    prose-ul:my-4 prose-ol:my-4
                    prose-blockquote:border-cyan-brand/40 prose-blockquote:text-zinc-400
                    prose-code:text-cyan-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    max-w-[720px]"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              ) : (
                <article className="max-w-[720px] text-zinc-300">
                  <p className="text-white/40">Kein Artikel-Body vorhanden.</p>
                </article>
              )}

              {/* FAQ — rendert für alle Posts mit faqItems */}
              {post.faqItems.length > 0 && (
                <div className="mt-14 pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-8">Häufige Fragen</h2>
                  <div className="space-y-5">
                    {post.faqItems.map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-5 border border-white/10">
                        <h3 className="font-bold text-white mb-2">{item.question}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weiterführende Seiten — rendert für alle Posts mit internalLinks */}
              {post.internalLinks.length > 0 && (
                <div className="mt-14 pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Weiterführende Seiten</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {post.internalLinks.map((link, i) => (
                      <Link
                        key={i}
                        to={link.href}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-brand/40 group transition-all"
                      >
                        <span className="text-white/80 group-hover:text-white transition-colors text-sm">
                          {link.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-brand transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related + Prev/Next */}
              <RelatedPosts currentSlug={post.slug} category={post.category} />
              <PrevNextNav currentSlug={post.slug} />
          </div>

          {/* TOC Sidebar — absolute, liegt NEBEN dem Artikel ohne ihn zu verschieben */}
          <TocSidebar items={tocItems} />
        </div>
      </section>

      {/* ── Google Reviews (full-bleed, white BG) ─────────────────────────────── */}
      <GoogleReviewsGrid />

      {/* ── Beratung CTA (Dark, nahtlos zum Footer) ───────────────────────────── */}
      <section className="bg-[#0A264A]">
        <BlogFooterCTA />
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostDetailPage;
