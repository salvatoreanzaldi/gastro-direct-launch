import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

const YOUTUBE_IDS = ["JkkVyIFewO0", "Qv-YDj9gjPk", "Zx_UJJjQTso", "A0K7TJ_dwLM", "6dBBN_mohWU"];

const VideoTestimonialSection = () => {
  const { t } = useTranslation("common");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const testimonials = (t("video.items", { returnObjects: true }) as any[]).map((item: any, i: number) => ({
    title: item.name,
    subtitle: item.person,
    quote: item.quote,
    videoId: YOUTUBE_IDS[i],
  }));

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  // Autoplay: alle 5 Sekunden weiterblättern, Reset bei Interaktion
  useEffect(() => {
    if (!api) return;
    let timer: ReturnType<typeof setInterval>;
    const start = () => { clearInterval(timer); timer = setInterval(() => api.scrollNext(), 5000); };
    start();
    api.on("pointerDown", start);
    api.on("select", start);
    return () => { clearInterval(timer); api.off("pointerDown", start); api.off("select", start); };
  }, [api]);

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 60% 40%, hsl(196, 100%, 40%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("video.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            {t("video.headline")}
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
            {t("video.sub")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((item) => (
                <CarouselItem key={item.videoId} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="rounded-2xl overflow-hidden border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:border-cyan-brand/30 transition-all duration-500 h-full">
                    <div className="relative aspect-video bg-black">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
                        title={`${item.title} – ${item.subtitle}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="p-5">
                      <Quote className="w-4 h-4 text-cyan-brand/50 mb-2" />
                      <p className="text-primary-foreground/70 text-sm leading-relaxed italic mb-3">
                        &bdquo;{item.quote}&ldquo;
                      </p>
                      <p className="text-primary-foreground font-bold text-sm">{item.title}</p>
                      <p className="text-primary-foreground/50 text-xs">{item.subtitle}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 lg:-left-12 h-10 w-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground shadow-lg hover:bg-primary-foreground/20" />
            <CarouselNext className="-right-4 md:-right-6 lg:-right-12 h-10 w-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground shadow-lg hover:bg-primary-foreground/20" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-cyan-brand" : "w-2.5 bg-primary-foreground/20 hover:bg-primary-foreground/40"}`}
                aria-label={t('a11y.goToSlide', { n: i + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialSection;
