import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

export interface CTASectionProps {
  productPath: string;
  heroImage: string;
  headline: string;
  text: string;
}

export const CTASection = ({ productPath, heroImage, headline, text }: CTASectionProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const lp = useLangPath();

  const languages = [
    { code: "de", flag: "🇩🇪", name: "Deutsch" },
    { code: "en", flag: "🇬🇧", name: "English" },
    { code: "it", flag: "🇮🇹", name: "Italiano" },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Mobile Layout: Vertikal stacked */}
        <div className="md:hidden flex flex-col items-center text-center gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <img
              src={heroImage}
              alt={headline}
              className="w-full rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-2xl font-black text-[#0A264A] dark:text-white leading-tight"
          >
            {headline}
          </motion.h2>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#0A264A]/60 dark:text-white/60 text-base leading-relaxed"
          >
            {text}
          </motion.p>

          {/* Language Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-full max-w-xs"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border-2 border-[#0A264A]/20 dark:border-white/20 bg-[#0A264A]/[0.05] dark:bg-white/[0.05] text-[#0A264A] dark:text-white font-semibold hover:border-cyan-brand/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{currentLang.flag}</span>
                {currentLang.name}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full mt-2 w-full bg-white dark:bg-[#0d1f35] border-2 border-[#0A264A]/20 dark:border-white/20 rounded-lg overflow-hidden shadow-lg z-50"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-cyan-brand/10 transition-colors text-[#0A264A] dark:text-white font-medium"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={() => { window.location.href = lp("/kontakt"); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full max-w-xs bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-[#ED8400]/20 hover:shadow-[#ED8400]/40 transition-all"
          >
            Jetzt anfragen
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Desktop Layout: Hidden (unchanged) */}
        <div className="hidden md:block">
          {/* Desktop bleibt unverändert */}
        </div>
      </div>
    </section>
  );
};
