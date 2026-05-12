import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Truck, QrCode, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import kassenhardware from "@/assets/hardware/kassenhardware.png";
import selforderTerminals from "@/assets/addons/selfordering-terminals.png";
import frankfurtGps from "@/assets/addons/addon-frankfurt-gps.png";
import qrTischsystem from "@/assets/addons/addon-qr-tischsystem.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLangPath } from "@/components/LanguageLayout";

// ─── Addon card content (shared between carousel & grid) ────────────────────

const AddonCard = ({ icon: Icon, img, imgAlt, imgClass, title, price, features, href, variant = "light" }: {
  icon: React.ComponentType<{ className?: string }>;
  img: string; imgAlt: string; imgClass?: string;
  title: string; price: string; features: string[];
  href?: string;
  variant?: "light" | "navy";
}) => (
  <div className={`rounded-2xl p-6 md:p-7 flex flex-col h-full ${
    variant === "navy"
      ? "border border-cyan-brand/20 bg-gradient-navy text-primary-foreground"
      : "border border-border bg-background"
  }`}>
    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
      <Icon className="w-3.5 h-3.5" /> Add-on
    </div>
    <div className={`mb-4 rounded-xl overflow-hidden aspect-[4/3] ${variant === "navy" ? "bg-surface-navy/60 flex items-center justify-center" : "bg-white flex items-center justify-center"}`}>
      <img src={img} alt={imgAlt} loading="lazy" className={imgClass || "w-full h-full object-cover"} />
    </div>
    <h4 className={`text-lg font-bold mb-1 ${variant === "navy" ? "" : "text-foreground"}`}>{title}</h4>
    <p className={`text-xs mb-5 ${variant === "navy" ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{price}</p>
    <ul className="space-y-2 flex-1">
      {features.map(p => (
        <li key={p} className="flex items-start gap-2">
          <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
          <span className={`text-sm ${variant === "navy" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p}</span>
        </li>
      ))}
    </ul>
    {href && (
      <Link
        to={href}
        className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-brand hover:gap-2.5 transition-all duration-200`}
      >
        Mehr erfahren <ArrowRight className="w-4 h-4" />
      </Link>
    )}
  </div>
);

const AddonCards = ({ t }: { t: (k: string, o?: any) => any }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const lp = useLangPath();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    let paused = false;
    const id = setInterval(() => { if (!paused) api.scrollNext(); }, 5000);
    const pause = () => { paused = true; setTimeout(() => { paused = false; }, 8000); };
    api.on("pointerDown", pause);
    return () => { clearInterval(id); api.off("pointerDown", pause); };
  }, [api]);

  const addons = [
    { icon: Truck, img: frankfurtGps, imgAlt: t("pos.addon1Title"), imgClass: "w-full h-full object-contain scale-110", title: t("pos.addon1Title"), price: t("pos.addon1Price"), features: t("pos.addon1Features", { returnObjects: true }) as string[], href: lp("/produkte/add-ons/fahrer-app-gps"), variant: "light" as const },
    { icon: QrCode, img: qrTischsystem, imgAlt: t("pos.addon2Title"), imgClass: "w-full h-full object-cover", title: t("pos.addon2Title"), price: t("pos.addon2Price"), features: t("pos.addon2Features", { returnObjects: true }) as string[], href: lp("/produkte/add-ons/qr-code-tischsystem"), variant: "light" as const },
    { icon: ShoppingBag, img: selforderTerminals, imgAlt: t("pos.addon3Title"), imgClass: "w-full h-full object-contain p-4", title: t("pos.addon3Title"), price: t("pos.addon3Price"), features: t("pos.addon3Features", { returnObjects: true }) as string[], href: lp("/produkte/add-ons/kiosk"), variant: "navy" as const },
  ];

  return (
    <>
      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <h3 className="text-center text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-6">Kassen Add-ons</h3>
        <Carousel opts={{ loop: true }} setApi={setApi} className="relative mx-auto max-w-sm">
          <CarouselContent className="-ml-3">
            {addons.map((a, i) => (
              <CarouselItem key={i} className="pl-3">
                <div className="px-1 py-1">
                  <AddonCard {...a} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <button onClick={() => api?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
            aria-label={t('a11y.previous')}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => api?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
            aria-label={t('a11y.next')}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </Carousel>
        <div className="flex justify-center gap-2 mt-5">
          {addons.map((_, i) => (
            <button key={i} onClick={() => api?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-cyan-brand w-5" : "bg-foreground/20"}`}
              aria-label={t('a11y.goToSlide', { n: i + 1 })} />
          ))}
        </div>
      </div>

      {/* Desktop: Grid (unverändert) */}
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {addons.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <AddonCard {...a} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

const POSSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <section className="section-padding bg-surface-light" id="kasse">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("pos.badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t("pos.headline")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("pos.sub")}
          </p>
        </motion.div>

        {/* Main POS product */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-navy rounded-3xl border border-cyan-brand/20 overflow-hidden mb-10">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="p-6 md:p-12">
              <div className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">{t("pos.posTag")}</div>
              <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">{t("pos.posPrice")}</h3>
              <p className="text-primary-foreground/40 text-xs mb-4 md:mb-6">{t("pos.posVat")}</p>
              {/* Mobile-only: Hardware-Bild direkt unter dem Preis */}
              <div className="md:hidden flex justify-center mb-5">
                <img src={kassenhardware} alt="Gastro Master Cloud-Kasse – POS Hardware" className="w-full max-w-[280px] object-contain" />
              </div>
              <ul className="space-y-3 mb-6 md:mb-8">
                {(t("pos.posFeatures", { returnObjects: true }) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center md:text-left">
                <button onClick={scrollToForm}
                  className="bg-gradient-amber text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
                  <span className="md:hidden">Kostenlose Beratung</span>
                  <span className="hidden md:inline">{t("pos.posCta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center p-8 md:p-12">
              <img src={kassenhardware} alt="Gastro Master Cloud-Kasse – POS Hardware" className="w-full max-w-md object-contain" />
            </div>
          </div>
        </motion.div>

        {/* Add-ons — Mobile: Carousel / Desktop: Grid */}
        <AddonCards t={t} />

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs mt-8">
          {t("pos.note")}
        </motion.p>
      </div>
    </section>
  );
};

export default POSSection;
