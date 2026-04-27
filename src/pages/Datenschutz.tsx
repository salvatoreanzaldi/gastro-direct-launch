import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const RolleVerantwortlicher = ({ label }: { label: string }) => (
  <p className="border-l-2 border-cyan-brand pl-3 italic text-muted-foreground text-sm mb-4">
    {label}
  </p>
);

const RolleAuftragsverarbeiter = ({ label }: { label: string }) => (
  <p className="border-l-2 border-amber-500 pl-3 italic text-muted-foreground text-sm mb-4">
    {label}
  </p>
);

const ExternLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity"
  >
    {children}
  </a>
);

interface AccordionSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection = ({ title, open, onToggle, children }: AccordionSectionProps) => (
  <div className="border-b border-border/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left group"
    >
      <span className="text-foreground font-semibold text-base pr-4 group-hover:text-cyan-brand transition-colors duration-200">
        {title}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-cyan-brand" : ""}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-6 pb-7 pt-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SECTION_COUNT = 30;

const Datenschutz = () => {
  const { t } = useTranslation("datenschutz");

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = openSections.size === SECTION_COUNT;

  const toggleAll = () => {
    if (allOpen) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(Array.from({ length: SECTION_COUNT }, (_, i) => i)));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="section-padding pt-44 md:pt-52">
        <div className="container-tight">

          <h1 className="text-4xl font-black text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted-foreground text-sm mb-8">{t("stand")}</p>

          {/* Alle öffnen / Alle schließen */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleAll}
              className="text-sm text-cyan-brand hover:opacity-80 transition-opacity font-medium underline underline-offset-2"
            >
              {allOpen ? t("alleSchliessen") : t("alleOeffnen")}
            </button>
          </div>

          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/30">

            {/* s0 — 1. Verantwortlicher */}
            <AccordionSection
              title={t("s0.title")}
              open={openSections.has(0)}
              onToggle={() => toggle(0)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s0.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s0.p2Company")}<br />
                {t("s0.p2Street")}<br />
                {t("s0.p2City")}<br />
                {t("s0.p2Phone")}<br />
                {t("s0.p2EmailLabel")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s0.p2EmailText")}</ExternLink><br />
                {t("s0.p2Website")}<br />
                {t("s0.p2Register")}<br />
                {t("s0.p2Tax")}<br />
                {t("s0.p2Management")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s0.p3")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                {t("s0.h1")}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s0.p4")}
              </p>
              <div className="pl-3 border-l-2 border-cyan-brand mb-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <strong>{t("s0.rolle1Label")}</strong><br />
                  {t("s0.rolle1Text")}
                </p>
              </div>
              <div className="pl-3 border-l-2 border-amber-500 mb-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <strong>{t("s0.rolle2Label")}</strong><br />
                  {t("s0.rolle2Text")}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("s0.p5")}
              </p>
            </AccordionSection>

            {/* s1 — 2. Datenschutzbeauftragter */}
            <AccordionSection
              title={t("s1.title")}
              open={openSections.has(1)}
              onToggle={() => toggle(1)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s1.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s1.p2Company")}<br />
                {t("s1.p2EmailLabel")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s1.p2EmailText")}</ExternLink><br />
                {t("s1.p2Phone")}<br />
                {t("s1.p2Address")}
              </p>
            </AccordionSection>

            {/* s2 — 3. Übersicht der Verarbeitungen */}
            <AccordionSection
              title={t("s2.title")}
              open={openSections.has(2)}
              onToggle={() => toggle(2)}
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("s2.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s2.h1")}</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>{t("s2.items1.i1")}</li>
                <li>{t("s2.items1.i2")}</li>
                <li>{t("s2.items1.i3")}</li>
                <li>{t("s2.items1.i4")}</li>
                <li>{t("s2.items1.i5")}</li>
                <li>{t("s2.items1.i6")}</li>
                <li>{t("s2.items1.i7")}</li>
                <li>{t("s2.items1.i8")}</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s2.h2")}</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>{t("s2.items2.i1")}</li>
                <li>{t("s2.items2.i2")}</li>
                <li>{t("s2.items2.i3")}</li>
                <li>{t("s2.items2.i4")}</li>
                <li>{t("s2.items2.i5")}</li>
                <li>{t("s2.items2.i6")}</li>
                <li>{t("s2.items2.i7")}</li>
                <li>{t("s2.items2.i8")}</li>
              </ul>
            </AccordionSection>

            {/* s3 — 4. Rechtsgrundlagen */}
            <AccordionSection
              title={t("s3.title")}
              open={openSections.has(3)}
              onToggle={() => toggle(3)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s3.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>{t("s3.items.i1Label")}</strong>{" "}
                  {t("s3.items.i1Text")}
                </li>
                <li>
                  <strong>{t("s3.items.i2Label")}</strong>{" "}
                  {t("s3.items.i2Text")}
                </li>
                <li>
                  <strong>{t("s3.items.i3Label")}</strong>{" "}
                  {t("s3.items.i3Text")}
                </li>
                <li>
                  <strong>{t("s3.items.i4Label")}</strong>{" "}
                  {t("s3.items.i4Text")}
                </li>
              </ul>
            </AccordionSection>

            {/* s4 — 5. Sicherheitsmaßnahmen */}
            <AccordionSection
              title={t("s4.title")}
              open={openSections.has(4)}
              onToggle={() => toggle(4)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s4.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>{t("s4.items.i1")}</li>
                <li>{t("s4.items.i2")}</li>
                <li>{t("s4.items.i3")}</li>
                <li>{t("s4.items.i4")}</li>
                <li>{t("s4.items.i5")}</li>
                <li>{t("s4.items.i6")}</li>
                <li>{t("s4.items.i7")}</li>
              </ul>
            </AccordionSection>

            {/* s5 — 6. Datenübermittlung an Drittländer */}
            <AccordionSection
              title={t("s5.title")}
              open={openSections.has(5)}
              onToggle={() => toggle(5)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s5.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>{t("s5.items.i1Label")}</strong>{" "}
                  {t("s5.items.i1Text")}
                </li>
                <li>
                  <strong>{t("s5.items.i2Label")}</strong>{" "}
                  {t("s5.items.i2Text")}
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                {t("s5.p2")}
              </p>
            </AccordionSection>

            {/* s6 — 7. Speicherdauer */}
            <AccordionSection
              title={t("s6.title")}
              open={openSections.has(6)}
              onToggle={() => toggle(6)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s6.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>{t("s6.items.i1Label")}</strong>{" "}
                  {t("s6.items.i1Text")}
                </li>
                <li>
                  <strong>{t("s6.items.i2Label")}</strong>{" "}
                  {t("s6.items.i2Text")}
                </li>
                <li>
                  <strong>{t("s6.items.i3Label")}</strong>{" "}
                  {t("s6.items.i3Text")}
                </li>
                <li>
                  <strong>{t("s6.items.i4Label")}</strong>{" "}
                  {t("s6.items.i4Text")}
                </li>
                <li>
                  <strong>{t("s6.items.i5Label")}</strong>{" "}
                  {t("s6.items.i5Text")}
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                {t("s6.p2")}
              </p>
            </AccordionSection>

            {/* s7 — 8. Rechte der betroffenen Personen */}
            <AccordionSection
              title={t("s7.title")}
              open={openSections.has(7)}
              onToggle={() => toggle(7)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s7.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>{t("s7.items.i1Label")}</strong>{" "}
                  {t("s7.items.i1Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i2Label")}</strong>{" "}
                  {t("s7.items.i2Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i3Label")}</strong>{" "}
                  {t("s7.items.i3Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i4Label")}</strong>{" "}
                  {t("s7.items.i4Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i5Label")}</strong>{" "}
                  {t("s7.items.i5Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i6Label")}</strong>{" "}
                  {t("s7.items.i6Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i7Label")}</strong>{" "}
                  {t("s7.items.i7Text")}
                </li>
                <li>
                  <strong>{t("s7.items.i8Label")}</strong>{" "}
                  {t("s7.items.i8Text")}
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                {t("s7.p2")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s7.p2LinkText")}</ExternLink>
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong>{t("s7.p3Label")}</strong>{" "}
                {t("s7.p3Text")}
              </p>
            </AccordionSection>

            {/* s8 — 9. Server-Logfiles */}
            <AccordionSection
              title={t("s8.title")}
              open={openSections.has(8)}
              onToggle={() => toggle(8)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s8.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s8.items.i1")}</li>
                <li>{t("s8.items.i2")}</li>
                <li>{t("s8.items.i3")}</li>
                <li>{t("s8.items.i4")}</li>
                <li>{t("s8.items.i5")}</li>
                <li>{t("s8.items.i6")}</li>
                <li>{t("s8.items.i7")}</li>
                <li>{t("s8.items.i8")}</li>
                <li>{t("s8.items.i9")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s8.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s8.rechtsgrundlageLabel")}</strong>{" "}
                {t("s8.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s8.speicherdauerLabel")}</strong>{" "}
                {t("s8.speicherdauerText")}
              </p>
            </AccordionSection>

            {/* s9 — 10. Cookies */}
            <AccordionSection
              title={t("s9.title")}
              open={openSections.has(9)}
              onToggle={() => toggle(9)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("s9.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s9.h1")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s9.h1p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s9.h1RechtsgrundlageLabel")}</strong>{" "}
                {t("s9.h1RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s9.h2")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s9.h2p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s9.h2RechtsgrundlageLabel")}</strong>{" "}
                {t("s9.h2RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s9.h3")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("s9.h3p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s9.h4")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s9.h4p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s9.h4AnbieterLabel")}</strong>{" "}
                {t("s9.h4AnbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s9.h4p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s9.h4RechtsgrundlageLabel")}</strong>{" "}
                {t("s9.h4RechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.cookiebot.com/de/privacy-policy/">
                  {t("s9.h4LinkText")}
                </ExternLink>
              </p>
            </AccordionSection>

            {/* s10 — 11. Bestellungen */}
            <AccordionSection
              title={t("s10.title")}
              open={openSections.has(10)}
              onToggle={() => toggle(10)}
            >
              <RolleAuftragsverarbeiter label={t("rolleAuftragsverarbeiter")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s10.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s10.p2")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s10.items.i1")}</li>
                <li>{t("s10.items.i2")}</li>
                <li>{t("s10.items.i3")}</li>
                <li>{t("s10.items.i4")}</li>
                <li>{t("s10.items.i5")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s10.p3")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s10.rechtsgrundlageLabel")}</strong>{" "}
                {t("s10.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s10.p4")}
              </p>
            </AccordionSection>

            {/* s11 — 12. Kundenkonto */}
            <AccordionSection
              title={t("s11.title")}
              open={openSections.has(11)}
              onToggle={() => toggle(11)}
            >
              <RolleAuftragsverarbeiter label={t("rolleAuftragsverarbeiter")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s11.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s11.rechtsgrundlageLabel")}</strong>{" "}
                {t("s11.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s11.p2")}
              </p>
            </AccordionSection>

            {/* s12 — 13. Kontaktformular */}
            <AccordionSection
              title={t("s12.title")}
              open={openSections.has(12)}
              onToggle={() => toggle(12)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s12.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s12.rechtsgrundlageLabel")}</strong>{" "}
                {t("s12.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s12.p2")}
              </p>
            </AccordionSection>

            {/* s13 — 14. Newsletter */}
            <AccordionSection
              title={t("s13.title")}
              open={openSections.has(13)}
              onToggle={() => toggle(13)}
            >
              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                {t("s13.h1")}
              </h3>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s13.h1p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s13.h1RechtsgrundlageLabel")}</strong>{" "}
                {t("s13.h1RechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s13.h1p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s13.h1p3")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s13.h1p3LinkText")}</ExternLink>
                {t("s13.h1p3Suffix")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                {t("s13.h2")}
              </h3>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s13.h2p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s13.h2RechtsgrundlageLabel")}</strong>{" "}
                {t("s13.h2RechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s13.h2p2")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s13.h2p2LinkText")}</ExternLink>.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                {t("s13.h3")}
              </h3>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s13.h3p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s13.h3RechtsgrundlageLabel")}</strong>{" "}
                {t("s13.h3RechtsgrundlageText")}
              </p>
            </AccordionSection>

            {/* s14 — 15. WhatsApp */}
            <AccordionSection
              title={t("s14.title")}
              open={openSections.has(14)}
              onToggle={() => toggle(14)}
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("s14.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s14.h1")}</h3>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s14.h1p1")}{" "}
                <strong>{t("s14.h1p1Keyword")}</strong>{" "}
                {t("s14.h1p1Mid")}{" "}
                <strong>{t("s14.h1p1Number")}</strong>
                {t("s14.h1p1Rest")}{" "}
                <strong>{t("s14.h1p1Unsub")}</strong>{" "}
                {t("s14.h1p1End")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s14.h2")}</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>{t("s14.h2Items.i1")}</li>
                <li>{t("s14.h2Items.i2")}</li>
                <li>{t("s14.h2Items.i3")}</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s14.h3")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s14.h3RechtsgrundlageLabel")}</strong>{" "}
                {t("s14.h3RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s14.h4")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s14.h4p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://superchat.de/datenschutz">{t("s14.h4LinkText")}</ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s14.h5")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s14.h5p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.whatsapp.com/legal/privacy-policy">
                  {t("s14.h5LinkText")}
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s14.h6")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("s14.h6p1")}{" "}
                <strong>{t("s14.h6p1Keyword")}</strong>{" "}
                {t("s14.h6p1Mid")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s14.h6p1LinkText")}</ExternLink>{" "}
                {t("s14.h6p1End")}
              </p>
            </AccordionSection>

            {/* s15 — 16. Google reCAPTCHA */}
            <AccordionSection
              title={t("s15.title")}
              open={openSections.has(15)}
              onToggle={() => toggle(15)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s15.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s15.anbieterLabel")}</strong>{" "}
                {t("s15.anbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s15.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s15.rechtsgrundlageLabel")}</strong>{" "}
                {t("s15.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://policies.google.com/privacy">{t("s15.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s16 — 17. Google Analytics */}
            <AccordionSection
              title={t("s16.title")}
              open={openSections.has(16)}
              onToggle={() => toggle(16)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s16.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s16.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s16.rechtsgrundlageLabel")}</strong>{" "}
                {t("s16.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s16.p3")}{" "}
                <ExternLink href="https://tools.google.com/dlpage/gaoptout">
                  {t("s16.link1Text")}
                </ExternLink>
                {" · "}
                <ExternLink href="https://policies.google.com/privacy">{t("s16.link2Text")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s17 — 18. Google Maps */}
            <AccordionSection
              title={t("s17.title")}
              open={openSections.has(17)}
              onToggle={() => toggle(17)}
            >
              <RolleAuftragsverarbeiter label={t("rolleAuftragsverarbeiter")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s17.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s17.h1")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("s17.h1p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s17.h2")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s17.h2p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s17.h2RechtsgrundlageLabel")}</strong>{" "}
                {t("s17.h2RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s17.h3")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s17.h3p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s17.h3RechtsgrundlageLabel")}</strong>{" "}
                {t("s17.h3RechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s17.anbieterLabel")}</strong>{" "}
                {t("s17.anbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://policies.google.com/privacy">{t("s17.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s18 — 19. Zahlungsdienstleister */}
            <AccordionSection
              title={t("s18.title")}
              open={openSections.has(18)}
              onToggle={() => toggle(18)}
            >
              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                {t("s18.h1")}
              </h3>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s18.h1p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>
                  <strong>{t("s18.h1Items.i1Label")}</strong>{" "}
                  {t("s18.h1Items.i1Text")}
                </li>
                <li>
                  <strong>{t("s18.h1Items.i2Label")}</strong>{" "}
                  {t("s18.h1Items.i2Text")}
                </li>
                <li>
                  <strong>{t("s18.h1Items.i3Label")}</strong>{" "}
                  {t("s18.h1Items.i3Text")}
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s18.h1p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s18.h1AnbieterLabel")}</strong>{" "}
                {t("s18.h1AnbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s18.h1RechtsgrundlageLabel")}</strong>{" "}
                {t("s18.h1RechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full">
                  {t("s18.h1LinkText")}
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s18.h2")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("s18.h2p1")}
              </p>
            </AccordionSection>

            {/* s19 — 20a. Hosting */}
            <AccordionSection
              title={t("s19.title")}
              open={openSections.has(19)}
              onToggle={() => toggle(19)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s19.p1")}
              </p>
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s19.p2")}
              </p>
              <RolleAuftragsverarbeiter label={t("rolleAuftragsverarbeiter")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s19.p3")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s19.rechtsgrundlageLabel")}</strong>{" "}
                {t("s19.rechtsgrundlageText")}
              </p>
            </AccordionSection>

            {/* s20 — 20b. Kundendokumente */}
            <AccordionSection
              title={t("s20.title")}
              open={openSections.has(20)}
              onToggle={() => toggle(20)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s20.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s20.h1")}</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s20.h1Items.i1")}</li>
                <li>{t("s20.h1Items.i2")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s20.h1p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>{t("s20.h1RechtsgrundlageLabel")}</strong>{" "}
                {t("s20.h1RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s20.h2")}</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s20.h2Items.i1")}</li>
                <li>{t("s20.h2Items.i2")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s20.h2p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>{t("s20.h2RechtsgrundlageLabel")}</strong>{" "}
                {t("s20.h2RechtsgrundlageText")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s20.h3")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s20.h3p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s20.h3Items.i1")}</li>
                <li>{t("s20.h3Items.i2")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                {t("s20.h3p2")}
              </p>
            </AccordionSection>

            {/* s21 — 20c. Stripe */}
            <AccordionSection
              title={t("s21.title")}
              open={openSections.has(21)}
              onToggle={() => toggle(21)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s21.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s21.anbieterLabel")}</strong>{" "}
                {t("s21.anbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s21.rechtsgrundlageLabel")}</strong>{" "}
                {t("s21.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://stripe.com/de/privacy">{t("s21.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s22 — 20d. GoCardless */}
            <AccordionSection
              title={t("s22.title")}
              open={openSections.has(22)}
              onToggle={() => toggle(22)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s22.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s22.anbieterLabel")}</strong>{" "}
                {t("s22.anbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s22.verarbeiteteDatenLabel")}</strong>{" "}
                {t("s22.verarbeiteteDatenText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s22.rechtsgrundlageLabel")}</strong>{" "}
                {t("s22.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://gocardless.com/de-de/privacy">{t("s22.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s23 — 20e. Make */}
            <AccordionSection
              title={t("s23.title")}
              open={openSections.has(23)}
              onToggle={() => toggle(23)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s23.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s23.anbieterLabel")}</strong>{" "}
                {t("s23.anbieterText")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s23.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s23.rechtsgrundlageLabel")}</strong>{" "}
                {t("s23.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.make.com/en/privacy-notice">{t("s23.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s24 — 20f. Zoho */}
            <AccordionSection
              title={t("s24.title")}
              open={openSections.has(24)}
              onToggle={() => toggle(24)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s24.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li><strong>{t("s24.items.i1Label")}</strong>{" "}{t("s24.items.i1Text")}</li>
                <li><strong>{t("s24.items.i2Label")}</strong>{" "}{t("s24.items.i2Text")}</li>
                <li><strong>{t("s24.items.i3Label")}</strong>{" "}{t("s24.items.i3Text")}</li>
                <li><strong>{t("s24.items.i4Label")}</strong>{" "}{t("s24.items.i4Text")}</li>
                <li><strong>{t("s24.items.i5Label")}</strong>{" "}{t("s24.items.i5Text")}</li>
                <li><strong>{t("s24.items.i6Label")}</strong>{" "}{t("s24.items.i6Text")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s24.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s24.p3")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>{t("s24.rechtsgrundlageLabel")}</strong>{" "}
                {t("s24.rechtsgrundlageText")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.zoho.com/privacy.html">{t("s24.linkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s25 — 20g. Projektmanagement */}
            <AccordionSection
              title={t("s25.title")}
              open={openSections.has(25)}
              onToggle={() => toggle(25)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s25.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-3">
                <li>
                  <strong>{t("s25.items.i1Label")}</strong>{" "}
                  {t("s25.items.i1Text")}
                </li>
                <li>
                  <strong>{t("s25.items.i2Label")}</strong>{" "}
                  {t("s25.items.i2Text")}
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s25.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s25.rechtsgrundlageLabel")}</strong>{" "}
                {t("s25.rechtsgrundlageText")}
              </p>
            </AccordionSection>

            {/* s26 — 20i. Social Media */}
            <AccordionSection
              title={t("s26.title")}
              open={openSections.has(26)}
              onToggle={() => toggle(26)}
            >
              <RolleVerantwortlicher label={t("rolleVerantwortlicher")} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("s26.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">{t("s26.h1")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s26.h1p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.whatsapp.com/legal/privacy-policy">
                  {t("s26.h1LinkText")}
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s26.h2")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s26.h2p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://privacycenter.instagram.com/policy">
                  {t("s26.h2LinkText")}
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s26.h3")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s26.h3p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.facebook.com/privacy/policy/">
                  {t("s26.h3LinkText")}
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("s26.h4")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("s26.h4p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <ExternLink href="https://policies.google.com/privacy">
                  {t("s26.h4LinkText")}
                </ExternLink>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("s26.rechtsgrundlageLabel")}</strong>{" "}
                {t("s26.rechtsgrundlageText")}
              </p>
            </AccordionSection>

            {/* s27 — 21. Empfänger und Auftragsverarbeiter */}
            <AccordionSection
              title={t("s27.title")}
              open={openSections.has(27)}
              onToggle={() => toggle(27)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s27.p1")}
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                {t("s27.h1")}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">{t("s27.h1Sub")}</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-4">
                <li>{t("s27.h1Items.i1")}</li>
                <li>{t("s27.h1Items.i2")}</li>
                <li>{t("s27.h1Items.i3")}</li>
                <li>{t("s27.h1Items.i4")}</li>
                <li>{t("s27.h1Items.i5")}</li>
                <li>{t("s27.h1Items.i6")}</li>
                <li>{t("s27.h1Items.i7")}</li>
                <li>{t("s27.h1Items.i8")}</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                {t("s27.h2")}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">{t("s27.h2Sub")}</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-4">
                <li>{t("s27.h2Items.i1")}</li>
                <li>{t("s27.h2Items.i2")}</li>
                <li>{t("s27.h2Items.i3")}</li>
                <li>{t("s27.h2Items.i4")}</li>
                <li>{t("s27.h2Items.i5")}</li>
                <li>{t("s27.h2Items.i6")}</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                {t("s27.h3")}
              </h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>{t("s27.h3Items.i1")}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                {t("s27.p2")}
              </p>
            </AccordionSection>

            {/* s28 — 22. Widerspruchsrecht */}
            <AccordionSection
              title={t("s28.title")}
              open={openSections.has(28)}
              onToggle={() => toggle(28)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s28.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {t("s28.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("s28.p3")}{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">{t("s28.p3LinkText")}</ExternLink>
              </p>
            </AccordionSection>

            {/* s29 — 23. Änderung */}
            <AccordionSection
              title={t("s29.title")}
              open={openSections.has(29)}
              onToggle={() => toggle(29)}
            >
              <p className="text-muted-foreground leading-relaxed">
                {t("s29.p1")}
              </p>
            </AccordionSection>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
