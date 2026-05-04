import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useLangPath } from "@/components/LanguageLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Rocket, Users, Building2, CreditCard, Monitor,
  Sparkles, Globe, Linkedin, UtensilsCrossed, MapPin, UserCheck,
  Star, Wallet, Diamond, Handshake, Zap, ShieldCheck,
  MessageCircle, Settings, GraduationCap, Headphones, Play,
  Plus, Minus, ChevronDown, ChevronLeft, ChevronRight, RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import GoogleReviewsGrid from "@/components/GoogleReviewsGrid";
import { ORG_NODE } from "@/data/schemaOrg";

import imgUsingen from "@/assets/ueber-uns/Über uns - Usingen.png";
import heroUeberUns from "@/assets/heroes/Hero - Über Uns.png";
import imgKunde1  from "@/assets/ueber-uns/Über Uns + Kunden Zusammenarbeit.jpeg";
import imgKunde2  from "@/assets/ueber-uns/Über uns + Kundenzusammenarbeit 2.jpeg";
import imgRene      from "@/assets/team/ceo-rene-ebert.png";
import imgSanjaya   from "@/assets/team/team-sanjaya-pattiyage.png";
import imgSalvatore from "@/assets/team/team-salvatore-anzaldi.png";
import imgAndrej    from "@/assets/team/team-andrej-krutsch.png";
import imgMohammad  from "@/assets/team/team-mohammad-motakalemi.png";

// ─── Icon Maps ──────────────────────────────────────────────────────────────

const milestoneIcons = [Sparkles, Users, Building2, Users, Monitor, CreditCard];

const TRUST_ICONS = [UtensilsCrossed, MapPin, UserCheck, Star, Wallet];

const VALUE_ICON_MAP: Record<string, React.ElementType> = {
  diamond: Diamond, handshake: Handshake, zap: Zap, shield: ShieldCheck,
};

const PROCESS_ICON_MAP: Record<string, React.ElementType> = {
  messageCircle: MessageCircle, settings: Settings, graduationCap: GraduationCap, rocket: Rocket, headphones: Headphones,
};

const TEAM_IMG_MAP: Record<string, string> = {
  rene: imgRene, sanjaya: imgSanjaya, salvatore: imgSalvatore, andrej: imgAndrej, mohammad: imgMohammad,
};

const FLAG_MAP: Record<string, string> = {
  de: "🇩🇪", gb: "🇬🇧", it: "🇮🇹", ir: "🇮🇷", ru: "🇷🇺", lk: "🇱🇰",
};

const FLAG_COLOR_MAP: Record<string, string> = {
  de: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300",
  gb: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
  it: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300",
  ir: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300",
  ru: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300",
  lk: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300",
};

// ─── renderWithLinks ────────────────────────────────────────────────────────

const renderWithLinks = (text: string, lp: (p: string) => string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={lp(m[2])} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

// ─── FlipCard ───────────────────────────────────────────────────────────────

interface PersonData { key: string; name: string; role: string; focus: string; bio: string; linkedin: string | null; }

const FlipCard = ({ person, index, linkedinLabel, noEntrance }: { person: PersonData; index: number; linkedinLabel: string; noEntrance?: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  const img = TEAM_IMG_MAP[person.key];

  return (
    <motion.div
      {...(noEntrance ? {} : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.12 } })}
      className="perspective-[1200px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-700 preserve-3d min-h-[500px] md:min-h-[380px]"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full rounded-3xl overflow-hidden border border-border/30 sm:border-2 sm:border-border bg-background shadow-none sm:shadow-xl sm:hover:shadow-2xl transition-shadow duration-500">
            <div className="relative w-full aspect-square md:h-64 overflow-hidden p-4 md:p-0">
              <img src={img} alt={`${person.name} – ${person.role}`} className="w-full h-full object-cover object-center rounded-2xl md:rounded-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-transparent via-20% to-transparent md:via-40%" />
            </div>
            <div className="px-5 pt-4 pb-2 sm:p-5 text-center">
              <h3 className="text-xl sm:text-lg font-bold text-foreground">{person.name}</h3>
              <p className="text-cyan-brand text-base sm:text-sm font-semibold">{person.role}</p>
              <p className="text-muted-foreground text-base sm:text-sm">{person.focus}</p>
            </div>
            <div className="flex items-center justify-center gap-1.5 pb-4 text-muted-foreground/60 sm:hidden">
              <RotateCcw className="w-4 h-4" />
              <span className="text-xs font-semibold">Antippen zum Umdrehen</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="h-full rounded-3xl border-2 border-cyan-brand/20 bg-gradient-navy p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">{person.name}</h3>
              <p className="text-cyan-brand text-sm font-semibold mb-4">{person.role}</p>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{person.bio}</p>
            </div>
            {person.linkedin && (
              <a href={person.linkedin} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0A66C2] hover:text-primary-foreground text-sm font-medium transition-colors mt-4">
                <Linkedin className="w-5 h-5" /> {linkedinLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── TeamCarousel (mobile only) ─────────────────────────────────────────────

const TeamCarousel = ({ allMembers, linkedinLabel }: { allMembers: PersonData[]; linkedinLabel: string }) => {
  const [api, setApi] = useState<import("@/components/ui/carousel").CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  // Auto-slide every 5s, pause when user interacts
  useEffect(() => {
    if (!api) return;
    let paused = false;
    const id = setInterval(() => { if (!paused) api.scrollNext(); }, 5000);
    const pause = () => { paused = true; setTimeout(() => { paused = false; }, 8000); };
    api.on("pointerDown", pause);
    return () => { clearInterval(id); api.off("pointerDown", pause); };
  }, [api]);

  return (
    <div className="sm:hidden">
      <Carousel opts={{ loop: true }} setApi={setApi} className="relative mx-auto max-w-xs">
        <CarouselContent className="-ml-2">
          {allMembers.map((person, i) => (
            <CarouselItem key={person.key} className="pl-2">
              <div className="px-1 py-1">
                <FlipCard person={person} index={0} linkedinLabel={linkedinLabel} noEntrance />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
          aria-label="Vorheriger"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
          aria-label="Nächster"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {allMembers.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-cyan-brand w-5" : "bg-foreground/20"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── FaqItem ────────────────────────────────────────────────────────────────

const FaqItem = ({ q, a, open, onToggle, lp }: { q: string; a: string; open: boolean; onToggle: () => void; lp: (p: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-border bg-background overflow-hidden"
  >
    <button onClick={onToggle} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors">
      <span className="font-semibold text-foreground text-base leading-snug">{q}</span>
      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-foreground/40">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
          <div className="px-6 pb-6 text-foreground/65 text-sm leading-relaxed border-t border-border pt-4">
            {renderWithLinks(a, lp)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Testimonial Carousel ──────────────────────────────────────────────────

type TestimonialItem = { name: string; restaurant: string; quote: string; videoId: string };

const TestimonialCarousel = ({ badge, heading, subtitle, items }: {
  badge: string; heading: string; subtitle: string; items: TestimonialItem[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <section className="section-padding bg-surface-light">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{badge}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{heading}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-4">
              {items.map((tm) => (
                <CarouselItem key={tm.videoId} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${tm.videoId}`}
                        title={`${tm.name} – ${tm.restaurant}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-muted-foreground text-sm italic leading-relaxed mb-3">&bdquo;{tm.quote}&ldquo;</p>
                      <p className="text-foreground font-bold text-sm">{tm.name}</p>
                      <p className="text-cyan-brand text-xs font-semibold">{tm.restaurant}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 lg:-left-12 h-10 w-10 bg-background border-border shadow-lg hover:bg-surface-light" />
            <CarouselNext className="-right-4 md:-right-6 lg:-right-12 h-10 w-10 bg-background border-border shadow-lg hover:bg-surface-light" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-cyan-brand" : "w-2.5 bg-border hover:bg-muted-foreground/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────────

const UeberUnsPage = () => {
  const { t } = useTranslation("ueber-uns");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const trustBarItems = arr("trustBar") as { value: string; label: string }[];
  const milestones = arr("timeline.milestones") as { year: string; title: string; text: string }[];
  const founders = arr("team.founders") as PersonData[];
  const members = arr("team.members") as PersonData[];
  const langItems = arr("languages.items") as { label: string; flag: string }[];
  const valueItems = arr("values.items") as { icon: string; title: string; text: string }[];
  const whyItems = arr("why.items") as { title: string; text: string }[];
  const testimonialItems = arr("testimonials.items") as { name: string; restaurant: string; quote: string; videoId: string }[];
  const processSteps = arr("process.steps") as { num: string; icon: string; title: string; text: string }[];
  const faqItems = arr("faq.items") as { q: string; a: string }[];
  const ctaStats = arr("cta.stats") as { value: string; label: string }[];

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/uber-uns",
  });

  // ─── Schema ───────────────────────────────────────────────────────────────
  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("schema.home"), item: "https://gastro-master.de/" },
      { "@type": "ListItem", position: 2, name: t("schema.pageTitle"), item: "https://gastro-master.de/uber-uns" },
    ],
  };

  // Single Source of Truth: src/data/schemaOrg.ts. Locale-aware description override.
  const SCHEMA_ORG = {
    "@context": "https://schema.org",
    ...ORG_NODE,
    description: t("schema.orgDescription"),
  };

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-5 md:px-8 lg:px-16">
        <img
          src={heroUeberUns}
          alt="Gastro Master Logo aus Moos an Holzwand"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-4xl mx-auto relative z-10 text-center py-24 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-5"
          >
            {t("hero.headingPre")}{" "}
              <span className="text-transparent bg-clip-text bg-[length:300%_auto] animate-gradient-shift bg-gradient-to-r from-[#009ACC] via-[#008BCC] via-[#007DCF] via-[#055FB6] via-[#007DCF] via-[#008BCC] to-[#009ACC]">{t("hero.headingHighlight")}</span>{t("hero.headingPost")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-10"
          >
            {t("hero.text")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#team" className="text-white/70 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white transition-colors">
              {t("hero.teamLink")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── S2: GOOGLE REVIEWS ────────────────────────────────────────────── */}
      <GoogleReviewsGrid />

      {/* ── S3: TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {trustBarItems.map((s, i) => {
              const Icon = TRUST_ICONS[i] || Star;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="text-center">
                  <Icon className="w-5 h-5 text-cyan-brand mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1 leading-none">{s.value}</p>
                  <p className="text-[#0A264A]/45 dark:text-white/40 text-xs leading-snug">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S3: GRÜNDUNGSGESCHICHTE ────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("story.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">{t("story.heading")}</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("story.block1.p1")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t("story.block1.p2") }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={imgKunde1} alt={t("story.block1.img1Alt")} className="rounded-2xl shadow-xl w-full object-cover" />
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              <img src={imgKunde2} alt={t("story.block2.img2Alt")} className="rounded-2xl shadow-xl w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("story.block2.p1")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {renderWithLinks(t("story.block2.p2"), lp)}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S4: KUNDENSTIMMEN / TESTIMONIALS (YouTube Carousel) ────────── */}
      <TestimonialCarousel
        badge={t("testimonials.badge")}
        heading={t("testimonials.heading")}
        subtitle={t("testimonials.subtitle")}
        items={testimonialItems}
      />

      {/* ── S5: STANDORT USINGEN ──────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("location.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{t("location.heading")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("location.subtitle")}</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={imgUsingen} alt={t("location.imgAlt")} className="rounded-2xl shadow-2xl shadow-black/10 w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("location.p1")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t("location.p2")}
              </p>
              <Link to={lp("/kontakt")} className="bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
                {t("location.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S5: TIMELINE ──────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 70%, hsl(196, 100%, 40%), transparent 50%)" }} />
        <div className="container-tight relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("timeline.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-3">{t("timeline.heading")}</h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">{t("timeline.subtitle")}</p>
          </motion.div>
          <div className="grid gap-3 max-w-3xl mx-auto">
            {milestones.map((m, i) => {
              const Icon = milestoneIcons[i] || Sparkles;
              const isNext = i === milestones.length - 1;
              const isGlow = i >= milestones.length - 2;
              return (
                <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`group flex items-center gap-4 md:gap-6 rounded-2xl border p-4 md:p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${isNext ? "bg-cyan-brand/10 border-cyan-brand/30 hover:shadow-cyan-brand/10" : isGlow ? "bg-primary-foreground/5 border-primary-foreground/15 hover:shadow-primary-foreground/5" : "bg-primary-foreground/5 border-primary-foreground/10"}`}>
                  <div className="flex items-center gap-3 flex-shrink-0 w-[120px] md:w-[150px]">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isGlow ? "bg-cyan-brand/20" : "bg-primary-foreground/10"}`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isGlow ? "text-cyan-brand" : "text-primary-foreground/50"}`} />
                    </div>
                    <span className={`text-lg md:text-xl font-black ${isGlow ? "text-cyan-brand" : "text-primary-foreground/60"}`}>{m.year}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-primary-foreground font-bold text-sm md:text-base">{m.title}</h3>
                      {isNext && <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-brand/20 text-cyan-brand px-2 py-0.5 rounded-full">{t("timeline.nextLabel")}</span>}
                    </div>
                    <p className="text-primary-foreground/40 text-xs md:text-sm mt-0.5 hidden md:block">{m.text}</p>
                  </div>
                  {isGlow && <div className="w-2 h-2 rounded-full bg-cyan-brand shadow-lg shadow-cyan-brand/40 flex-shrink-0" />}
                </motion.div>
              );
            })}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-primary-foreground/30 text-sm mt-6 max-w-md mx-auto">
            {t("timeline.footer")}
          </motion.p>
        </div>
      </section>

      {/* ── S6: TEAM ──────────────────────────────────────────────────── */}
      <section id="team" className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("team.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4" dangerouslySetInnerHTML={{ __html: t("team.heading") }} />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("team.subtitle")}</p>
          </motion.div>

          {/* ── Mobile: Carousel ── */}
          <TeamCarousel allMembers={[...founders, ...members]} linkedinLabel={t("team.linkedinLabel")} />

          {/* ── Desktop: Grids (unverändert) ── */}
          <div className="hidden sm:grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
            {founders.map((person, i) => <FlipCard key={person.key} person={person} index={i} linkedinLabel={t("team.linkedinLabel")} />)}
          </div>
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl lg:max-w-4xl mx-auto">
            {members.map((person, i) => <FlipCard key={person.key} person={person} index={i + founders.length} linkedinLabel={t("team.linkedinLabel")} />)}
          </div>
        </div>
      </section>

      {/* ── S7: SPRACHEN ──────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-3xl border border-border bg-background shadow-lg px-8 py-10 max-w-4xl mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 mb-3">
              <Globe className="w-6 h-6 text-cyan-brand md:order-1" />
              <h2 className="text-2xl md:text-3xl font-black text-foreground md:order-2">{t("languages.heading")}</h2>
            </div>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
              {t("languages.subtitle")}
            </p>
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 py-3 max-w-sm mx-auto md:max-w-none">
              {langItems.map((lang, i) => (
                <motion.div key={lang.flag} whileHover={{ scale: 1.08, y: -3 }}
                  className={`flex-shrink-0 flex items-center justify-center md:inline-flex gap-2 px-5 md:px-4 py-2.5 rounded-full border-2 border-border bg-surface-light text-foreground font-semibold text-sm cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${FLAG_COLOR_MAP[lang.flag] || ""}`}>
                  <span className="text-2xl leading-none">{FLAG_MAP[lang.flag] || ""}</span>
                  {lang.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S8: VALUES / MISSION ───────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("values.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t("values.heading")}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("values.subtitle")}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {valueItems.map((v, i) => {
              const Icon = VALUE_ICON_MAP[v.icon] || Diamond;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-border bg-background p-7 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-cyan-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S9: WHY GASTRO MASTER ──────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 70% 30%, hsl(196, 100%, 40%), transparent 50%)" }} />
        <div className="container-tight relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("why.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">{t("why.heading")}</h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">{t("why.subtitle")}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-7 hover:border-cyan-brand/30 transition-all duration-300">
                <span className="text-cyan-brand font-black text-3xl mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-primary-foreground/55 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11: PROCESS ──────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("process.badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t("process.heading")}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("process.subtitle")}</p>
          </motion.div>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {processSteps.map((step, i) => {
              const Icon = PROCESS_ICON_MAP[step.icon] || MessageCircle;
              return (
                <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-surface-light p-5 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#0A264A] flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-brand font-black text-lg">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-cyan-brand" />
                      <h3 className="text-foreground font-bold text-base">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S12: FAQ ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("faq.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{t("faq.heading")}</h2>
            <p className="text-muted-foreground text-lg">{t("faq.subtitle")}</p>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} lp={lp} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S13: CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            {t("cta.headingPre")}{" "}
              <span className="text-cyan-brand">{t("cta.headingHighlight")}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10">
            {t("cta.text")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to={lp("/kontakt")} className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              {t("cta.button")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {ctaStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5 text-sm">
                <span className="text-white/70 font-semibold">{stat.value}</span>
                <span className="text-white/35">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUnsPage;
