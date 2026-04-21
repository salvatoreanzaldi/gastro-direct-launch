import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, CreditCard, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

const icons = [Globe, Smartphone, CreditCard, Palette];
const featureHrefPaths = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/add-ons/transaktionsumlage", null] as const;

const SolutionSection = () => {
  const { t } = useTranslation("common");
  const lp = useLangPath();
  const scrollToForm = () => {
    window.location.href = lp("/kontakt");
  };

  return (
    <section className="section-padding bg-surface-light" id="produkte">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("solution.badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("solution.headline1")}<br />{t("solution.headline2")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("solution.sub")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {(t("solution.features", { returnObjects: true }) as any[]).map((f, i) => {
            const Icon = icons[i];
            const hrefPath = featureHrefPaths[i];
            const href = hrefPath ? lp(hrefPath) : null;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border rounded-2xl p-7 hover:shadow-lg transition-shadow group flex flex-col"
              >
                <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{f.text}</p>
                {href && (
                  <Link to={href} className="mt-auto text-cyan-brand text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                    {t("solution.learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
            {t("solution.cta")}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
