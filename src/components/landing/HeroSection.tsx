import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Users, ShieldCheck } from "lucide-react";
import heroPOS from "@/assets/heroes/hero-pos-system.png";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const HeroSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-navy min-h-[75vh] flex items-center">
      <div className="absolute inset-0 opacity-20" style={{
        background: "radial-gradient(ellipse at 70% 50%, hsl(196, 100%, 40%), transparent 60%)"
      }} />

      <div className="container-tight px-5 md:px-8 lg:px-16 pt-28 pb-14 md:pt-32 md:pb-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-[1.15] mb-5">
              {t("hero.headline")}
            </motion.h1>

            <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="text-lg md:text-xl text-primary-foreground/70 mb-7 max-w-lg leading-relaxed">
              {t("hero.sub")}
            </motion.p>

            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={scrollToForm}
                className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 flex items-center justify-center gap-2">
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}
              className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber" fill="currentColor" />
                {t("hero.trust1")}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-brand" />
                {t("hero.trust2")}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-brand" />
                {t("hero.trust3")}
              </span>
            </motion.div>
          </div>

          {/* Right: POS System Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <img
              src={heroPOS}
              alt="Gastro Master POS-System – Kasse, App & Bondrucker"
              className="w-full max-w-[600px] object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
