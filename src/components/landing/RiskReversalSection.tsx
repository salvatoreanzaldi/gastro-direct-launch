import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Rocket, HeartHandshake, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [ShieldCheck, Rocket, HeartHandshake];

const RiskReversalSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t("risk.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("risk.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(t("risk.items", { returnObjects: true }) as any[]).map((c, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-background border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
            {t("risk.cta")}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RiskReversalSection;
