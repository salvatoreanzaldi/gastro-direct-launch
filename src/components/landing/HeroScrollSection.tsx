import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import dashboardImg from "@/assets/kassensystem/cashier-dashboard.png";
import dashboardMobileImg from "@/assets/kassensystem/Main Hero Tablet Animation - Mobile Version.png";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

const HeroScrollSection = () => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation("common");
  const lp = useLangPath();

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const cyclingWords = arr("heroScroll.cyclingWords") as string[];

  useEffect(() => {
    if (cyclingWords.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [cyclingWords.length]);

  if (cyclingWords.length === 0) return null;

  return (
    <div className="flex flex-col overflow-hidden bg-gradient-navy">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm md:text-base font-semibold text-amber-400 uppercase tracking-widest mb-4">
              {t("heroScroll.badge")}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              <span className="block leading-[1.15]">
                {t("heroScroll.title1")}
              </span>
              <span className="block leading-[1.3] overflow-visible">
                <span className="relative inline-block min-w-[12rem] md:min-w-[18rem] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cyclingWords[index]}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 inline-block"
                      style={{ WebkitBoxDecorationBreak: "clone", paddingBottom: "0.15em" }}
                    >
                      {cyclingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="block leading-[1.15]">
                {t("heroScroll.title2")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-6">
              {t("heroScroll.subPrefix")}{" "}
              <Link to={lp("/produkte/pakete/online-bestellshop")} className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">{t("heroScroll.linkWebshop")}</Link>,{" "}
              <Link to={lp("/produkte/pakete/kassensystem")} className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">{t("heroScroll.linkKasse")}</Link>,
              {" "}{t("heroScroll.subSuffix")}
            </p>
            <p className="text-center text-white/50 text-sm md:text-base">
              {t("heroScroll.discoverMore")}
            </p>
          </>
        }
      >
        <img
          src={dashboardMobileImg}
          alt="Gastro Master Dashboard"
          className="md:hidden mx-auto rounded-2xl object-contain h-full w-full"
          draggable={false}
        />
        <img
          src={dashboardImg}
          alt="Gastro Master Dashboard"
          fetchPriority="high"
          className="hidden md:block mx-auto rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroScrollSection;
