import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLangPath } from "@/components/LanguageLayout";

const CATEGORY_COLORS: Record<string, string> = {
  "Meinung":       "bg-orange-500/15 text-orange-400 border border-orange-500/25",
  "How-to":        "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25",
  "Vergleich":     "bg-purple-500/15 text-purple-400 border border-purple-500/25",
  "Bestellsystem": "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  "Kassensystem":  "bg-green-500/15 text-green-400 border border-green-500/25",
  "Website":       "bg-pink-500/15 text-pink-400 border border-pink-500/25",
  "Integration":   "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25",
};

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
  const colorClass = CATEGORY_COLORS[category] ?? "bg-white/10 text-white/70 border border-white/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={lp(`/blog/${slug}`)} className="block h-full group">
        <Card className="h-full bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300">
          <CardContent className="p-6 flex flex-col h-full gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
                {category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                {readingTime}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-brand transition-colors line-clamp-3">
              {title}
            </h3>

            <p className="text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
              {excerpt}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/8">
              <span className="text-xs text-white/35">{publishDate}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-brand group-hover:gap-2 transition-all duration-200">
                Weiterlesen <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
