import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageSquareText, CalendarCheck, UtensilsCrossed, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const stepIcons = [MessageSquareText, CalendarCheck, UtensilsCrossed, Rocket];

const ProcessSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: heading */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("process.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t("process.headline")}</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("process.sub")}
            </p>
            <button onClick={scrollToForm}
              className="bg-gradient-amber text-white font-bold px-7 py-3.5 rounded-xl text-base hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 inline-flex items-center gap-2">
              {t("process.cta")}
              <Rocket className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right: vertical cards with big background numbers */}
          <div className="space-y-4">
            {(t("process.steps", { returnObjects: true }) as any[]).map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative group">
                  <div className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 text-[5rem] md:text-[6rem] font-black leading-none select-none pointer-events-none transition-all duration-500 text-deep-navy group-hover:text-blue-brand dark:text-primary-foreground/[0.06] dark:group-hover:text-cyan-brand/20"
                    style={{ opacity: 0.15 }}>
                    {i + 1}
                  </div>
                  <div className="relative flex items-start gap-4 bg-surface-light border border-border rounded-2xl p-5 group-hover:shadow-md group-hover:border-cyan-brand/20 transition-all duration-300 ml-6 md:ml-8">
                    <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 group-hover:border-cyan-brand/30 group-hover:shadow-sm group-hover:shadow-cyan-brand/10 transition-all duration-300">
                      <Icon className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground mb-1">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
