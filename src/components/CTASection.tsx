import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

// Team member images
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";
import teamMohammadImg  from "@/assets/team/team-mohammad-motakalemi.png";

// Language SVGs
import deutschSvg    from "@/assets/icons/Deutsch.svg";
import englischSvg   from "@/assets/icons/Englisch.svg";
import italienischSvg from "@/assets/icons/Italienisch.svg";
import persischSvg   from "@/assets/icons/Persisch.svg";
import russischSvg   from "@/assets/icons/Russisch.svg";
import singhalesischSvg from "@/assets/icons/Singhalesisch.svg";

export interface CTASectionProps {
  productPath: string;
  text: string;
}

export const CTASection = ({ productPath, text }: CTASectionProps) => {
  const { i18n } = useTranslation();
  const lp = useLangPath();
  const [current, setCurrent] = useState(0);

  const teamMembers = [
    { name: "René Ebert", role: "Gründer & CEO", img: teamReneImg },
    { name: "Salvatore Anzaldi", role: "Vertriebsleiter", img: teamSalvatoreImg },
    { name: "Andrej Krutsch", role: "Service Customer Manager", img: teamAndrejImg },
    { name: "Mohammad Motakalemi", role: "Vertrieb", img: teamMohammadImg },
  ];

  const languages = [
    { code: "de", label: "DE", svg: deutschSvg },
    { code: "en", label: "EN", svg: englischSvg },
    { code: "it", label: "IT", svg: italienischSvg },
    { code: "fa", label: "FA", svg: persischSvg },
    { code: "ru", label: "RU", svg: russischSvg },
    { code: "si", label: "SI", svg: singhalesischSvg },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const member = teamMembers[current];

  return (
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-8 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Mobile Layout: Vertikal stacked */}
        <div className="md:hidden flex flex-col items-center text-center gap-6">
          {/* Team Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-lg"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={member.img}
                alt={member.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white font-bold text-base">{member.name}</p>
                  <p className="text-white/80 text-xs mt-1">{member.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-2xl font-black text-[#0A264A] dark:text-white leading-tight -mt-1"
          >
            Buche jetzt dein kostenloses Beratungsgespräch
          </motion.h2>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#0A264A]/60 dark:text-white/60 text-base leading-relaxed -mt-2"
          >
            {text}
          </motion.p>

          {/* Language Pills - 3x2 Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 w-full"
          >
            {languages.map(lang => (
              <div
                key={lang.code}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#0A264A]/[0.06] dark:bg-white/[0.06] text-[#0A264A]/60 dark:text-white/60"
              >
                <img
                  src={lang.svg}
                  alt={lang.label}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-semibold">{lang.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button - Statisch */}
          <button
            onClick={() => { window.location.href = lp("/kontakt"); }}
            className="w-full max-w-xs bg-gradient-amber text-white font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-[#ED8400]/20 hover:shadow-[#ED8400]/40 transition-shadow"
          >
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Layout: Hidden (unchanged) */}
        <div className="hidden md:block">
          {/* Desktop bleibt unverändert */}
        </div>
      </div>
    </section>
  );
};
