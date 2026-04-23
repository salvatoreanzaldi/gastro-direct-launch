import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useLangPath } from "@/components/LanguageLayout";
import { getCategoryConfig } from "@/config/blog-categories";

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishDate: string;
  index?: number;
}

export const BlogCard = ({
  slug,
  title,
  excerpt,
  category,
  readingTime,
  publishDate,
  index = 0,
}: BlogCardProps) => {
  const lp = useLangPath();
  const cat = getCategoryConfig(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: Math.min(index % 12, 5) * 0.06 }}
      className="h-full"
    >
      <Link
        to={lp(`/blog/${slug}`)}
        className="flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group"
      >
        {/* Category stripe */}
        <div className={`h-[3px] w-full ${cat.solid}`} />

        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Badge + reading time */}
          <div className="flex items-center justify-between gap-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
              {cat.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/35 shrink-0">
              <Clock className="w-3 h-3" />
              {readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-brand transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
            <span className="text-[11px] text-white/30">{publishDate}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-brand group-hover:gap-2 transition-all duration-200">
              Weiterlesen <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
