import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import dashboardImg from "@/assets/kassensystem/cashier-dashboard.png";
import { Button } from "@/components/ui/button";

const HeroSectionB = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const lp = useLangPath();

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const cyclingWords = arr("heroScroll.cyclingWords") as string[];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    if (cyclingWords.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [cyclingWords.length]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);

  if (cyclingWords.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen md:h-auto flex items-start justify-center relative px-4 md:px-20 py-8 md:py-16 pb-6 md:pb-0 md:-mb-8 bg-gradient-navy-animated overflow-hidden"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="w-full relative max-w-7xl"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Text Content - Left Side + Image Container - Right Side */}
        <div
          className="max-w-7xl mx-auto text-left grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column - Text */}
          <div className="flex flex-col justify-start pt-20 md:pt-12">
            <p className="text-sm md:text-base font-semibold text-amber-400 uppercase tracking-widest mb-4">
              {t("heroScroll.badge")}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-[1.15]">
              <span className="block">
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
              <span className="block">
                {t("heroScroll.title2")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8 md:mb-12">
              {t("heroScroll.subPrefix")}{" "}
              <Link to={lp("/produkte/pakete/online-bestellshop")} className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">{t("heroScroll.linkWebshop")}</Link>,{" "}
              <Link to={lp("/produkte/pakete/kassensystem")} className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">{t("heroScroll.linkKasse")}</Link>,
              {" "}{t("heroScroll.subSuffix")}
            </p>

            <div className="flex justify-center">
              <Link to={lp("/kontakt")}>
                <Button
                  className="bg-gradient-to-r from-amber-400 to-orange-400 text-white dark:text-black hover:from-amber-500 hover:to-orange-500 font-bold text-base px-8 py-6 rounded-lg"
                >
                  {t("hero.cta")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Image Container with 3D Animation */}
          <motion.div
            ref={cardRef}
            style={{
              rotateX: rotate,
              scale,
              willChange: "transform",
              transformStyle: "preserve-3d",
              boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="mx-auto w-full max-w-[28rem] md:max-w-[38rem] border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
          >
            <div className="w-full h-auto overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
              <img
                src={dashboardImg}
                alt="Gastro Master Dashboard"
                className="w-full h-auto block"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionB;
