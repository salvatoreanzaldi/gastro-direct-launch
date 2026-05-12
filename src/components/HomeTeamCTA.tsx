import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

// Team member images via vite-imagetools auf WebP konvertiert (w=800px für
// Retina-Spielraum bei Avatar-Größen). Original 1.1-2.5 MB PNG → erwartete
// ~80-150 KB WebP/Stück. WebP-Browser-Support >97% (Safari 14+, Chrome/FF/Edge).
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png?w=800&format=webp";
import teamSanjayaImg   from "@/assets/team/team-sanjaya-pattiyage.png?w=800&format=webp";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png?w=800&format=webp";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png?w=800&format=webp";
import teamMohammadImg  from "@/assets/team/team-mohammad-motakalemi.png?w=800&format=webp";

const teamMemberImgs = [teamSanjayaImg, teamReneImg, teamSalvatoreImg, teamAndrejImg, teamMohammadImg];

const langFlags = ["🇩🇪", "🇬🇧", "🇮🇹", "🇮🇷", "🇷🇺", "🇱🇰"];
const langColors = [
  "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300",
  "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
  "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300",
  "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
  "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300",
  "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300",
];

const HomeTeamCTA = () => {
  const { t } = useTranslation("common");
  const lp = useLangPath();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const teamMembers = [
    { name: "Sanjaya Pattiyage", roleKey: "ceo" },
    { name: "René Ebert", roleKey: "ceo" },
    { name: "Salvatore Anzaldi", roleKey: "salesLead" },
    { name: "Andrej Krutsch", roleKey: "customerService" },
    { name: "Mohammad Motakalemi", roleKey: "sales" },
  ];

  const languages = ["Deutsch", "English", "Italiano", "Farsi", "Русский", "සිංහල"];

  useEffect(() => {
    const ti = setInterval(() => setCurrent(c => (c + 1) % teamMembers.length), 4000);
    return () => clearInterval(ti);
  }, []);

  const member = teamMembers[current];

  return (
    <section className="bg-[#F0F4F8] dark:bg-[#060e1a] px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#0d1f35] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40 grid lg:grid-cols-2"
        >
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              {t("homeCTA.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              {t("homeCTA.headline")}
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">{t("homeCTA.expectLabel")}</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              {t("homeCTA.expectText")}
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              {t("homeCTA.privacyNote")}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {languages.map((label: string, i: number) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${langColors[i]}`}
                >
                  <span className="text-lg leading-none">{langFlags[i]}</span>
                  {label}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => { navigate(lp("/kontakt")); }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group w-fit"
            >
              {t("homeCTA.cta")}
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="relative min-h-[380px] lg:min-h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={teamMemberImgs[current]}
                alt={member.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-8 py-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white font-bold text-lg leading-tight">{member.name}</p>
                  <p className="text-white/70 text-sm">{t(`homeCTA.roles.${member.roleKey}`)}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
              {teamMembers.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeTeamCTA;
