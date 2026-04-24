import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Building2, ChefHat, Store, CakeSlice, Pizza, Drumstick, IceCream, Croissant, Layers, ArrowRight, UtensilsCrossed, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

// Pizzeria logos
import logoAmanda from "@/assets/logos/kunden/Logo Amanda.png";
import logoIlPunto from "@/assets/logos/kunden/Logo Il Punto.png";
import logoLaPeperoni from "@/assets/logos/kunden/Logo - La Peperoni.png";
import logoPimanzo from "@/assets/logos/kunden/Logo - Pizzeria Pimanzo.png";
import logoIlSorriso from "@/assets/logos/kunden/Logo-Il_Sorriso-Pizzeria.png";
// Asiatisch logos
import logoHaLong from "@/assets/logos/kunden/Logo - Ha Long Asia.png";
import logoKojoSushi from "@/assets/logos/kunden/Logo - Kojo Sushi.png";
import logoSushiDeLux from "@/assets/logos/kunden/Logo - Sushi De Lux.png";
import logoTokyoSushi from "@/assets/logos/kunden/Logo - Tokyo Sushi Bar.png";
import logoPhyo7 from "@/assets/logos/kunden/Logo Phyo 7 Sushi.png";
// Indisch logos
import logoIndianChili from "@/assets/logos/kunden/Logo - Indian Chili.png";
import logoIndianZaika from "@/assets/logos/kunden/Logo - Indian Zaika .png";
import logoStyleOfIndia from "@/assets/logos/kunden/Logo - Style Of India.png";
import logoTajMahal from "@/assets/logos/kunden/Logo - Taj Mahal Masala.png";
import logoRoyalIndia from "@/assets/logos/kunden/Logo _ Royal India.png";
// Burger logos
import logoBBSmash from "@/assets/logos/kunden/Logo - BB Smash It Burger 2.png";
import logoChickenChill from "@/assets/logos/kunden/Logo - Chicken and Chill.png";
import logoHabibi from "@/assets/logos/kunden/Logo - Habibi Chicken.png";
import logoJoesBurger from "@/assets/logos/kunden/Logo - Joe's Burger 2.png";
import logoSmashFlat from "@/assets/logos/kunden/Logo - Smash Burger & Flat 2.png";
// Franchise logos
import logoBurgerBrothers from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoTake from "@/assets/logos/kunden/logo-take.png";
import logoEtManus from "@/assets/logos/kunden/logo-et-manus.png";
import logoBigOneBite from "@/assets/logos/kunden/Logo - Big One Bite.png";
import logoPomPom from "@/assets/logos/kunden/Logo - Pom Pom.png";

const darkBgLogos = new Set([]);

const largeLogos = new Set(["Big One Bite"]);

const customerLogos: Record<string, { src: string; alt: string }[]> = {
  pizzeria: [
    { src: logoAmanda, alt: "Ristorante Amanda" },
    { src: logoIlPunto, alt: "Il Punto" },
    { src: logoLaPeperoni, alt: "La Peperoni" },
    { src: logoPimanzo, alt: "Pizzeria Pimanzo" },
    { src: logoIlSorriso, alt: "Il Sorriso Pizzeria" },
  ],
  asiatisch: [
    { src: logoHaLong, alt: "Ha Long Asia" },
    { src: logoKojoSushi, alt: "Kojo Sushi" },
    { src: logoSushiDeLux, alt: "Sushi De Lux" },
    { src: logoTokyoSushi, alt: "Tokyo Sushi Bar" },
    { src: logoPhyo7, alt: "Phyo 7 Sushi" },
  ],
  indisch: [
    { src: logoIndianChili, alt: "Indian Chili" },
    { src: logoIndianZaika, alt: "Indian Zaika" },
    { src: logoStyleOfIndia, alt: "Style Of India" },
    { src: logoTajMahal, alt: "Taj Mahal Masala" },
    { src: logoRoyalIndia, alt: "Royal India" },
  ],
  burger: [
    { src: logoBBSmash, alt: "BB Smash It Burger" },
    { src: logoChickenChill, alt: "Chicken and Chill" },
    { src: logoHabibi, alt: "Habibi Chicken" },
    { src: logoJoesBurger, alt: "Joe's Burger" },
    { src: logoSmashFlat, alt: "Smash Burger & Flat" },
  ],
  franchise: [
    { src: logoBurgerBrothers, alt: "Burger Brothers" },
    { src: logoTake, alt: "Take The Good Food" },
    { src: logoEtManus, alt: "Et Manus" },
    { src: logoBigOneBite, alt: "Big One Bite" },
    { src: logoPomPom, alt: "Pom Pom Chicken" },
  ],
};

import imgPizzeria from "@/assets/targets/target-pizzeria.png";
import imgAsiatisch from "@/assets/targets/target-asiatisch.png";
import imgIndisch from "@/assets/targets/target-indisch.png";
import imgBurger from "@/assets/targets/target-burger.png";
import imgEis from "@/assets/targets/target-eis.png";
import imgBaeckerei from "@/assets/targets/target-baeckerei.png";
import imgFranchise from "@/assets/targets/target-franchise.jpeg";
import imgGhostKitchen from "@/assets/targets/target-ghost-kitchen.png";
import imgEinzelhandel from "@/assets/targets/target-einzelhandel.png";

const groupIcons: Record<string, typeof Truck> = {
  lieferdienst: Truck,
  franchise: Building2,
  ghost: ChefHat,
  einzelhandel: Store,
  baeckerei: CakeSlice,
  restaurant: UtensilsCrossed,
  vor_ort: Zap,
};

const subIcons: Record<string, typeof Pizza> = {
  pizzeria: Pizza,
  asiatisch: ChefHat,
  indisch: ChefHat,
  burger: Drumstick,
  eis: IceCream,
  "franchise-sub": Building2,
};

const groupImgs: Record<string, string> = {
  lieferdienst: imgPizzeria,
  franchise: imgFranchise,
  ghost: imgGhostKitchen,
  einzelhandel: imgEinzelhandel,
  baeckerei: imgBaeckerei,
  restaurant: imgPizzeria,
  vor_ort: imgBurger,
};

const subImgs: Record<string, string> = {
  pizzeria: imgPizzeria,
  asiatisch: imgAsiatisch,
  indisch: imgIndisch,
  burger: imgBurger,
  eis: imgEis,
  "franchise-sub": imgFranchise,
};

interface TargetGroupSectionProps {
  getSolutionHref?: (group: string, sub: string | null) => string | null;
  ctaLabel?: string;
}

const TargetGroupSection = ({ getSolutionHref, ctaLabel }: TargetGroupSectionProps = {}) => {
  const { t } = useTranslation("common");
  const lp = useLangPath();
  const [activeGroup, setActiveGroup] = useState("lieferdienst");
  const [activeSub, setActiveSub] = useState("pizzeria");
  const [autoIndex, setAutoIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const showSubs = activeGroup === "lieferdienst";

  const autoSequence = [
    ...(t("target.subs", { returnObjects: true }) as any[]).map(s => ({ group: "lieferdienst", sub: s.id })),
    ...(t("target.groups", { returnObjects: true }) as any[]).filter(g => g.id !== "lieferdienst").map(g => ({ group: g.id, sub: null as string | null })),
  ];

  const displayContent = showSubs
    ? (t("target.subs", { returnObjects: true }) as any[]).find(s => s.id === activeSub)?.content
    : (t("target.groups", { returnObjects: true }) as any[]).find(g => g.id === activeGroup)?.content;

  const displayImg = showSubs ? subImgs[activeSub] : groupImgs[activeGroup];

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAutoIndex(prev => {
        const next = (prev + 1) % autoSequence.length;
        const item = autoSequence[next];
        setActiveGroup(item.group);
        if (item.sub) setActiveSub(item.sub);
        return next;
      });
    }, 5000);
  }, [autoSequence.length]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

  const handleGroupClick = (id: string) => {
    setActiveGroup(id);
    if (id === "lieferdienst") setActiveSub("pizzeria");
    const idx = autoSequence.findIndex(s => s.group === id && (id === "lieferdienst" ? s.sub === "pizzeria" : true));
    if (idx >= 0) setAutoIndex(idx);
    startAuto();
  };

  const handleSubClick = (id: string) => {
    setActiveSub(id);
    const idx = autoSequence.findIndex(s => s.sub === id);
    if (idx >= 0) setAutoIndex(idx);
    startAuto();
  };

  const scrollToForm = () => {
    window.location.href = lp("/kontakt");
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("target.badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t("target.headline")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("target.sub")}</p>
        </motion.div>

        {/* Main group selector */}
        <div className="grid grid-cols-2 gap-3 mb-6 [&>:last-child:nth-child(odd)]:col-span-2 [&>:last-child:nth-child(odd)]:justify-self-center md:flex md:flex-wrap md:justify-center md:gap-2">
          {(t("target.groups", { returnObjects: true }) as any[]).map(g => {
            const Icon = groupIcons[g.id] ?? Truck;
            return (
              <button key={g.id} onClick={() => handleGroupClick(g.id)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                  activeGroup === g.id ? "bg-foreground text-background border-foreground shadow-lg" : "bg-background/60 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}>
                <Icon className="w-4 h-4" />
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Sub-selector for delivery – fixed height, no layout shift */}
        <div className={`${showSubs ? "h-36" : "h-0"} md:h-16 overflow-hidden md:overflow-visible flex items-center justify-center mb-2 transition-[height] duration-300`}>
          <motion.div
            animate={{ opacity: showSubs ? 1 : 0, pointerEvents: showSubs ? "auto" : "none" }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-2 w-full md:flex md:flex-wrap md:justify-center"
          >
            {(t("target.subs", { returnObjects: true }) as any[]).map(s => {
              const Icon = subIcons[s.id] ?? ChefHat;
              return (
                <button key={s.id} onClick={() => handleSubClick(s.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                    activeSub === s.id ? "bg-cyan-brand/10 text-cyan-brand border-cyan-brand/30" : "bg-surface-light text-muted-foreground border-border hover:border-cyan-brand/20 hover:text-foreground"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Content – fixed-height wrapper prevents layout shift during slide transitions */}
        <div className="relative max-w-4xl mx-auto h-[520px] sm:h-[480px] md:h-[380px] overflow-hidden rounded-3xl border border-border bg-surface-light">
          <AnimatePresence mode="wait">
            <motion.div
              key={showSubs ? activeSub : activeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="grid md:grid-cols-2 gap-0 h-full">
                {/* Image */}
                <div className="relative h-[200px] sm:h-[220px] md:h-full overflow-hidden">
                  <img src={displayImg} alt={displayContent?.title ?? ""} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-light/20 hidden md:block" />
                </div>
                {/* Text */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center overflow-hidden">
                  <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">{displayContent?.title}</h3>
                  <p className="text-cyan-brand font-semibold mb-3 md:mb-4 text-sm">{displayContent?.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base line-clamp-4">{displayContent?.text}</p>
                  {(() => {
                    const href = getSolutionHref
                      ? getSolutionHref(activeGroup, showSubs ? activeSub : null)
                      : null;
                    const label = ctaLabel ?? t("target.cta");
                    const cls = "bg-gradient-amber text-white font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2 self-start";
                    return (
                      <div className="flex flex-col gap-3 items-start">
                        {href ? (
                          <Link to={href} className={cls}>
                            {label}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <button onClick={scrollToForm} className={cls}>
                            {label}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                        {activeGroup === "lieferdienst" && (
                          <Link
                            to={lp("/loesungen/lieferservice-gruenden")}
                            className="text-cyan-brand text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
                          >
                            {t("target.startDelivery")} <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Customer logo strip – fixed height to prevent layout shift */}
        <div className="mt-8 max-w-4xl mx-auto" style={{ minHeight: "7rem" }}>
          {(() => {
            const activeLogos = showSubs ? customerLogos[activeSub] : customerLogos[activeGroup];
            const logoKey = showSubs ? activeSub : activeGroup;
            return (
          <motion.div
            key={logoKey}
            animate={{ opacity: activeLogos ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              {t("target.customerLogosLabel")}
            </p>
            <div className="grid grid-cols-5 gap-2 md:gap-8 items-center w-full">
              {(activeLogos ?? []).map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`w-full object-contain opacity-100 hover:drop-shadow-2xl hover:brightness-125 hover:saturate-150 transition-all duration-300 ${largeLogos.has(logo.alt) ? "h-10 sm:h-20 md:h-24" : showSubs ? "h-9 sm:h-16 md:h-20" : "h-8 sm:h-14 md:h-18"}`}
                    style={darkBgLogos.has(logo.alt) ? { background: "#1f2937", borderRadius: "8px", padding: "6px 10px" } : undefined}
                  />
                </div>
              ))}
            </div>
          </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default TargetGroupSection;
