import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductHeroProps {
  badge: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  mockupSrc?: string;
}

const ProductHero = ({ badge, headline, subline, ctaLabel, mockupSrc }: ProductHeroProps) => {
  const navigate = useNavigate();
  return (
  <section className="mesh-gradient min-h-[88vh] flex items-center section-padding pt-36 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#007DCF]/10 blur-[140px] pointer-events-none" />

    <div className="container-tight relative z-10 w-full">
      <div className={`grid gap-14 items-center ${mockupSrc ? "lg:grid-cols-2" : ""}`}>

        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={mockupSrc ? "" : "text-center max-w-3xl mx-auto"}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            {badge}
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6">
            {headline}
          </h1>

          <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
            {subline}
          </p>

          <button
            onClick={() => { navigate("/kontakt"); }}
            className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
          >
            {ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* ── Mockup ── */}
        {mockupSrc && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 rotate-1">
              <img src={mockupSrc} alt={badge} className="w-full h-auto" />
            </div>
            <div className="absolute inset-0 -z-10 blur-3xl bg-[#007DCF]/20 rounded-2xl scale-110" />
          </motion.div>
        )}
      </div>
    </div>
  </section>
  );
};

export default ProductHero;
