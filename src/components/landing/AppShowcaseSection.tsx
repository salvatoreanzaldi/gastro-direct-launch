import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import screenshotStartbild from "@/assets/screenshots/Take - Startbild 2.png";
import screenshotBestellart from "@/assets/screenshots/Take - Bestellart 2.png";
import screenshotFilialen from "@/assets/screenshots/Take - Filialen 2.png";
import screenshotMenu from "@/assets/screenshots/Take - Menu 2.png";
import screenshotBenutzerkonto from "@/assets/screenshots/Take - Benutzerkonto 2.png";

interface AppShowcaseSectionProps {
  animate?: boolean;
  showFloatingFood?: boolean;
  carousel?: boolean;
  debug?: boolean;
}

const AppShowcaseSection = ({ animate = true, showFloatingFood = true, carousel = false, debug = false }: AppShowcaseSectionProps) => {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const arr = (key: string) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const screens = arr("appShowcase.screens") as any[];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Auto-play carousel
  useEffect(() => {
    if (!carousel || screens.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carousel, screens.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screens.length) % screens.length);
  };

  const screenshotMap: Record<string, string> = {
    startbild: screenshotStartbild,
    bestellart: screenshotBestellart,
    filialen: screenshotFilialen,
    menu: screenshotMenu,
    benutzerkonto: screenshotBenutzerkonto,
  };

  if (screens.length === 0) return null;

  return (
    <section className={`section-padding overflow-visible relative ${debug ? "bg-red-500/20" : "bg-background"}`}>
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center relative ${carousel ? "mb-2 md:mb-12" : "mb-8"}`}
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("appShowcase.badge")}
          </span>
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              {t("appShowcase.headline")}
            </h2>
            {/* Floating Burger next to headline */}
            {showFloatingFood && (
              <img
                src="https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png"
                alt="Burger"
                className="absolute -top-16 md:-top-24 -right-32 md:-right-48 lg:-right-64 w-40 md:w-56 lg:w-72 object-contain animate-float opacity-90 drop-shadow-xl"
                style={{ animationDelay: "0ms" }}
              />
            )}
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("appShowcase.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Scroll Container with iPhone Carousel - Full Width */}
      <div className={`relative flex items-center justify-center my-8 ${animate ? "h-[420px] md:h-[500px] lg:h-[580px] w-screen left-1/2 -translate-x-1/2" : "py-8"}`} style={{
        ...(animate && {
          perspective: "1200px",
          maskImage: `
            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
            linear-gradient(to bottom, black 0%, black 80%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
            linear-gradient(to bottom, black 0%, black 80%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }),
      }}>
        {animate ? (
          <motion.div
            ref={containerRef}
            className="flex gap-12 md:gap-16"
            style={{
              willChange: "transform",
            }}
          >
            {screens.map((screen, i) => {
              // Each screen has its own staggered animation
              const delayOffset = i * 0.12;

              const itemProgress = useTransform(scrollYProgress, (value) => {
                const adjusted = value - delayOffset;
                return Math.max(0, Math.min(1, adjusted / 0.8));
              });

              // Horizontal movement (right to left)
              const itemX = useTransform(itemProgress, [0, 1], [200, -400]);

              // Vertical arc movement (down → up → down, following a smooth curve)
              const itemY = useTransform(itemProgress, (value) => {
                return Math.cos(value * 2 * Math.PI) * 120;
              });

              // Rotation to align with the curved path
              const itemRotateZ = useTransform(itemProgress, (value) => {
                return Math.cos(value * Math.PI) * 30;
              });

              return (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-40 md:w-48 lg:w-56"
                  style={{
                    x: itemX,
                    y: itemY,
                    rotateZ: itemRotateZ,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* iPhone Screenshot (transparent PNG with full design) */}
                  <img
                    src={screenshotMap[screen.id]}
                    alt={screen.label}
                    className="w-full drop-shadow-lg"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : carousel ? (
          // Carousel/Slideshow View
          <div className="relative w-full py-8 md:py-12 flex items-center justify-center [perspective:1000px]" style={{ minHeight: "400px" }}>
            {/* Left Navigation Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-1/3 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/20 hover:bg-background/80 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>

            {/* Carousel Items */}
            {screens.map((screen, index) => {
              const offset = index - currentIndex;
              const total = screens.length;
              let pos = (offset + total) % total;
              if (pos > Math.floor(total / 2)) {
                pos = pos - total;
              }

              const isCenter = pos === 0;
              const isAdjacent = Math.abs(pos) === 1;

              return (
                <div
                  key={index}
                  className="absolute w-40 md:w-52 lg:w-64 transition-all duration-500 ease-in-out flex items-center justify-center"
                  style={{
                    transform: `
                      translateX(${pos * 40}%)
                      scale(${isCenter ? 1 : isAdjacent ? 0.8 : 0.6})
                      rotateY(${pos * -10}deg)
                    `,
                    zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                    opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                    filter: isCenter ? "blur(0px)" : "blur(4px)",
                    visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                  }}
                >
                  <img
                    src={screenshotMap[screen.id]}
                    alt={screen.label}
                    className="w-full drop-shadow-lg rounded-2xl"
                  />
                </div>
              );
            })}

            {/* Right Navigation Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-1/3 md:translate-x-1/2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/20 hover:bg-background/80 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
          </div>
        ) : (
          // Static Grid View
          <div className="relative w-full flex justify-center items-center gap-6 md:gap-8">
            {/* Left floating food images */}
            {showFloatingFood && (
              <>
                <div className="absolute left-4 md:left-12 -top-48 md:-top-64 translate-x-12 md:translate-x-24 z-20">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png"
                    alt="Pizza"
                    className="w-40 md:w-56 lg:w-72 object-contain animate-float opacity-90 drop-shadow-xl"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>

                {/* Right floating food images */}
                <div className="absolute right-4 md:right-12 bottom-32 md:bottom-40 translate-x-12 md:translate-x-24 z-20">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png"
                    alt="Dumplings"
                    className="w-48 md:w-64 lg:w-80 object-contain animate-float opacity-90 drop-shadow-xl"
                    style={{ animationDelay: "600ms" }}
                  />
                </div>
                <div className="absolute left-20 md:left-32 bottom-16 md:bottom-20 -translate-x-8 md:-translate-x-16 z-20">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png"
                    alt="Basil"
                    className="w-20 md:w-28 lg:w-36 object-contain animate-float opacity-90 drop-shadow-xl"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </>
            )}

            {/* Center MockUps */}
            <div className="flex justify-center items-center gap-6 md:gap-8 relative z-10">
              {screens.map((screen, i) => (
                <div key={i} className="flex-shrink-0 w-40 md:w-48 lg:w-56">
                  <img
                    src={screenshotMap[screen.id]}
                    alt={screen.label}
                    className="w-full drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="container-tight">
        {/* Labels below carousel (not rotated) */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto hidden">
          {screens.map((screen, i) => (
            <div key={i} className="text-center">
              <p className="text-xs md:text-sm font-semibold text-foreground mb-1">
                {screen.label}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {screen.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
