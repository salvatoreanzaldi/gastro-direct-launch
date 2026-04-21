import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLangPath } from "@/components/LanguageLayout";
import type { BlogPost, ContentSection } from "@/data/blog-posts";

function renderSection(section: ContentSection, index: number) {
  if (section.type === "h2") {
    return (
      <h2 key={index} className="text-white text-2xl font-black mt-12 mb-4">
        {section.content as string}
      </h2>
    );
  }

  if (section.type === "h3") {
    return (
      <h3 key={index} className="text-white text-xl font-bold mt-8 mb-3">
        {section.content as string}
      </h3>
    );
  }

  if (section.type === "p") {
    return (
      <p key={index} className="text-white/65 text-base leading-relaxed">
        {section.content as string}
      </p>
    );
  }

  if (section.type === "ul") {
    const items = section.content as string[];
    return (
      <ul key={index} className="space-y-3 my-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-brand flex-shrink-0" />
            <span className="text-white/65 text-base leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (section.type === "ol") {
    const items = section.content as string[];
    return (
      <ol key={index} className="space-y-3 my-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-brand/20 text-cyan-brand text-xs font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-white/65 text-base leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  return null;
}

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  const lp = useLangPath();

  return (
    <div className="space-y-6">
      {post.sections.map((section, i) => renderSection(section, i))}

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      {post.faqItems.length > 0 && (
        <div className="mt-14">
          <h2 className="text-white text-2xl font-black mb-8">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {post.faqItems.map((faq, i) => (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-white font-bold text-base mb-3">{faq.question}</h3>
                <p className="text-white/60 text-sm leading-relaxed m-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Internal Links ───────────────────────────────────────────────────── */}
      {post.internalLinks.length > 0 && (
        <div className="mt-12 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
            Weiterführende Seiten
          </p>
          <div className="flex flex-wrap gap-3">
            {post.internalLinks.map((link) => (
              <Link
                key={link.href}
                to={lp(link.href.replace("/de", ""))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-brand/10 text-cyan-brand text-sm font-semibold border border-cyan-brand/20 hover:bg-cyan-brand/20 transition-colors"
              >
                {link.title} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
