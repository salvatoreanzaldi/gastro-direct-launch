import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogFooterCTA = () => {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-16 py-16">
      <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Du willst dein Restaurant digitalisieren?
        </h3>
        <p className="text-zinc-300 mb-8 max-w-xl mx-auto leading-relaxed">
          Wir zeigen dir in einem kostenlosen Gespräch, welches Bestell- oder Kassensystem zu deinem Betrieb passt. Kein Verkaufsdruck.
        </p>
        <Link
          to="/de/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-colors shadow-lg shadow-orange-500/20"
        >
          Kostenlose Beratung sichern
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default BlogFooterCTA;
