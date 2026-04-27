import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Clock, Lightbulb, Lock, Mail, Phone } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useTranslation } from "react-i18next";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import rene     from "@/assets/kontakt/Rene Ebert - Kontakt.png";
import salva    from "@/assets/kontakt/Salvatore Anzaldi - Kontakt.png";
import andrej   from "@/assets/kontakt/Andrej Krutsch - Kontakt.png";
import mohammad from "@/assets/kontakt/Mohammad Motakalemi - Kontakt.png";

const teamImages = [rene, salva, andrej, mohammad];
const teamNames = ["René Ebert", "Salvatore Anzaldi", "Andrej Krutsch", "Mohammad Motakalemi"];
const languageFlags = ["🇩🇪", "🇬🇧", "🇮🇹", "🇮🇷", "🇷🇺", "🇱🇰"];
const promiseIcons = [Clock, Lightbulb, Lock];

const Kontakt = () => {
  const { t } = useTranslation("common");
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  useSeoMeta({
    title: t("contact.seoTitle"),
    description: t("contact.seoDesc"),
    canonical: "https://gastro-master.de/kontakt",
  });
  const [form, setForm] = useState({
    name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
    products: [] as string[],
    datenschutz: false,
    recaptcha: false,
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(i => (i + 1) % teamNames.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleProduct = (p: string) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send email");

      setForm({
        name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
        products: [],
        datenschutz: false,
        recaptcha: false,
      });
      setSubmitMessage("success");
      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (error) {
      console.error("Form error:", error);
      setSubmitMessage("error");
      setTimeout(() => setSubmitMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="pt-28 md:pt-32 pb-12 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* ── Left card: Form (white) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-black/[0.06] p-6 md:p-8 h-full"
            >
              <h1 className="text-2xl md:text-3xl font-black text-[#0A264A] mb-2">
                {t("contact.heroTitle")}
              </h1>
              <p className="text-[#0A264A]/55 text-sm leading-relaxed mb-5">
                {t("contact.heroSub")}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">{t("contact.labelName")}</label>
                    <input
                      required type="text" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition"
                      placeholder={t("contact.placeholderName")}
                    />
                  </div>

                  {/* Restaurant */}
                  <div>
                    <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">{t("contact.labelBusiness")}</label>
                    <input
                      required type="text" value={form.restaurant}
                      onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition"
                      placeholder={t("contact.placeholderBusiness")}
                    />
                  </div>

                  {/* PLZ + Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">{t("contact.labelZip")}</label>
                      <input
                        type="text" value={form.plz}
                        onChange={e => setForm(f => ({ ...f, plz: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition"
                        placeholder={t("contact.placeholderZip")}
                      />
                    </div>
                    <div>
                      <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">{t("contact.labelPhone")}</label>
                      <input
                        required type="tel" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition"
                        placeholder={t("contact.placeholderPhone")}
                      />
                    </div>
                  </div>

                  {/* E-Mail */}
                  <div>
                    <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">E-Mail</label>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition"
                      placeholder={t("contact.placeholderEmail")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#0A264A]/70 text-sm font-medium mb-1.5">{t("contact.labelMessage")}</label>
                    <textarea
                      value={form.message} rows={3}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0A264A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition resize-none"
                      placeholder={t("contact.placeholderMessage")}
                    />
                  </div>

                  {/* Product interest */}
                  <div>
                    <label className="block text-[#0A264A]/70 dark:text-white/60 text-sm font-medium mb-3">{t("contact.labelInterest")}</label>
                    <div className="flex flex-wrap gap-2">
                      {arr("contact.interests").map((p: string) => (
                        <button
                          key={p} type="button"
                          onClick={() => toggleProduct(p)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.products.includes(p)
                              ? "bg-[#007DCF] text-white border-[#007DCF]"
                              : "bg-gray-50 text-[#0A264A]/60 border-gray-200 hover:border-[#007DCF]/40"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Datenschutz checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox" required
                        checked={form.datenschutz}
                        onChange={e => setForm(f => ({ ...f, datenschutz: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        form.datenschutz
                          ? "bg-[#007DCF] border-[#007DCF]"
                          : "border-gray-300 bg-gray-50 group-hover:border-[#007DCF]/60"
                      }`}>
                        {form.datenschutz && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[#0A264A]/55 text-sm leading-snug">
                      {t("contact.privacyPrefix")}{" "}
                      <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#007DCF] underline underline-offset-2 hover:opacity-80">
                        {t("contact.privacyLink")}
                      </a>{" "}
                      {t("contact.privacySuffix")}
                    </span>
                  </label>

                  {/* reCAPTCHA checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox" required
                        checked={form.recaptcha}
                        onChange={e => setForm(f => ({ ...f, recaptcha: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        form.recaptcha
                          ? "bg-[#007DCF] border-[#007DCF]"
                          : "border-gray-300 bg-gray-50 group-hover:border-[#007DCF]/60"
                      }`}>
                        {form.recaptcha && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[#0A264A]/55 text-sm leading-snug">
                      {t("contact.recaptchaLabel")}
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full mt-5 bg-gradient-amber text-white font-bold px-8 py-3.5 rounded-xl text-base hover:scale-[1.01] transition-transform shadow-lg shadow-[#ED8400]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? t("contact.submitting") : t("contact.submitBtn")}
                </button>
                {submitMessage === "success" && (
                  <p className="text-green-600 text-sm text-center mt-3 font-medium">✓ {t("contact.success")}</p>
                )}
                {submitMessage === "error" && (
                  <p className="text-red-600 text-sm text-center mt-3 font-medium">✗ {t("contact.error")}</p>
                )}
                <p className="text-gray-400 text-xs text-center mt-3">{t("contact.required")}</p>
              </form>
            </motion.div>

            {/* ── Right card: Blue (navy) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-[#0A264A] rounded-3xl shadow-xl shadow-[#0A264A]/30 flex flex-col overflow-hidden"
            >
              {/* Slideshow — edge-to-edge, no border, card clips corners */}
              <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide}
                    src={teamImages[activeSlide]}
                    alt={teamNames[activeSlide]}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-[1.05]"
                  />
                </AnimatePresence>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pt-16 pb-5 px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-white font-bold text-lg leading-tight">{teamNames[activeSlide]}</p>
                      <p className="text-white/55 text-sm mt-0.5">{arr("contact.teamRoles")[activeSlide]}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Rest of content with padding */}
              <div className="flex flex-col gap-5 p-6 md:p-8 flex-1">

                {/* Language pills */}
                <div>
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-3">
                    {t("contact.languageTitle")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {arr("contact.languageLabels").map((label: string, i: number) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/65 text-sm font-medium"
                      >
                        <span className="text-base leading-none">{languageFlags[i]}</span>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Unser Versprechen */}
                <div>
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-4">
                    {t("contact.promiseTitle")}
                  </p>
                  <div className="space-y-3">
                    {arr("contact.promises").map((text: string, i: number) => {
                      const Icon = promiseIcons[i];
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#007DCF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-[#007DCF]" strokeWidth={1.75} />
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href="mailto:info@gastro-master.de"
                    className="flex items-center justify-center gap-2.5 bg-gradient-amber text-white font-bold px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/25 text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    info@gastro-master.de
                  </a>
                  <a
                    href="tel:+4960819128913"
                    className="flex items-center justify-center gap-2.5 bg-gradient-amber text-white font-bold px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/25 text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    +49 (0) 6081 9128913
                  </a>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
