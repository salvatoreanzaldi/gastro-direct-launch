import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

/* ── Helpers ── */

const P = ({ label, text }: { label?: string; text: string }) => (
  <>
    {label && <p className="font-medium text-foreground/80 mb-1">{label}</p>}
    <p className={label ? "mb-3" : ""}>{text}</p>
  </>
);

const SubSection = ({
  t,
  prefix,
  keys,
}: {
  t: (k: string) => string;
  prefix: string;
  keys: string[];
}) => (
  <>
    {keys.map((k, i) => (
      <P
        key={k}
        label={t(`${prefix}.${k}.label`)}
        text={t(`${prefix}.${k}.text`)}
      />
    ))}
  </>
);

/* ── Accordion ── */

const AccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
  index,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <div className="border border-border rounded-2xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-background hover:bg-muted/30 transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest opacity-60 w-4 text-right flex-shrink-0">
          0{index + 1}
        </span>
        <span className="text-foreground font-bold text-base md:text-lg">{title}</span>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-8 pt-2 border-t border-border bg-background">
        {content}
      </div>
    )}
  </div>
);

/* ── Section Content Renderers ── */

const SectionOnline = ({ t }: { t: (k: string) => string }) => (
  <div className="space-y-6 text-muted-foreground leading-relaxed">
    {/* Präambel */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.praeambel.heading")}</h3>
      <p>{t("s0.praeambel.text")}</p>
    </div>

    {/* §1 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p1.heading")}</h3>
      <p>{t("s0.p1.text")}</p>
    </div>

    {/* §2 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p2.heading")}</h3>
      <SubSection t={t} prefix="s0.p2" keys={["a", "b", "c", "d", "e"]} />
    </div>

    {/* §3 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p3.heading")}</h3>
      <SubSection t={t} prefix="s0.p3" keys={["sub1", "sub2", "sub3"]} />
    </div>

    {/* §4 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p4.heading")}</h3>
      <p>{t("s0.p4.text")}</p>
    </div>

    {/* §5 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p5.heading")}</h3>
      <p>{t("s0.p5.text")}</p>
    </div>

    {/* §6 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p6.heading")}</h3>
      <SubSection t={t} prefix="s0.p6" keys={["sub1", "sub2", "sub3"]} />
    </div>

    {/* §7 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p7.heading")}</h3>
      <p>{t("s0.p7.text")}</p>
    </div>

    {/* §8 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p8.heading")}</h3>
      <SubSection t={t} prefix="s0.p8" keys={["a", "b"]} />
    </div>

    {/* §10 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s0.p10.heading")}</h3>
      <SubSection t={t} prefix="s0.p10" keys={["sub1", "sub2", "sub3", "sub4"]} />
    </div>
  </div>
);

const SectionWebseite = ({ t }: { t: (k: string) => string }) => (
  <div className="space-y-6 text-muted-foreground leading-relaxed">
    {/* §1 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p1.heading")}</h3>
      <p>{t("s1.p1.text")}</p>
    </div>

    {/* §2 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p2.heading")}</h3>
      <ul className="list-disc list-inside space-y-1">
        {(["item1", "item2", "item3", "item4", "item5", "item6", "item7"] as const).map((k) => (
          <li key={k}>{t(`s1.p2.${k}`)}</li>
        ))}
      </ul>
    </div>

    {/* §3 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p3.heading")}</h3>
      <p>{t("s1.p3.text")}</p>
    </div>

    {/* §4 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p4.heading")}</h3>
      <p>{t("s1.p4.text")}</p>
    </div>

    {/* §5 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p5.heading")}</h3>
      <p>{t("s1.p5.text")}</p>
    </div>

    {/* §6 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p6.heading")}</h3>
      <SubSection t={t} prefix="s1.p6" keys={["sub1", "sub2", "sub3"]} />
    </div>

    {/* §7 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p7.heading")}</h3>
      <p>{t("s1.p7.text")}</p>
    </div>

    {/* §8 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p8.heading")}</h3>
      <SubSection t={t} prefix="s1.p8" keys={["a", "b"]} />
    </div>

    {/* §9 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s1.p9.heading")}</h3>
      <SubSection t={t} prefix="s1.p9" keys={["sub1", "sub2", "sub3"]} />
    </div>
  </div>
);

const SectionLeasingWeb = ({ t }: { t: (k: string) => string }) => (
  <div className="space-y-6 text-muted-foreground leading-relaxed">
    {/* Präambel */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.praeambel.heading")}</h3>
      <p>{t("s2.praeambel.text")}</p>
    </div>

    {/* §1 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p1.heading")}</h3>
      <p>{t("s2.p1.text")}</p>
    </div>

    {/* §2 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p2.heading")}</h3>
      <SubSection t={t} prefix="s2.p2" keys={["a1", "a2", "a3", "a4", "a5"]} />
    </div>

    {/* §3 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p3.heading")}</h3>
      <p>{t("s2.p3.text")}</p>
    </div>

    {/* §4 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p4.heading")}</h3>
      <p>{t("s2.p4.text")}</p>
    </div>

    {/* §5 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p5.heading")}</h3>
      <p>{t("s2.p5.text")}</p>
    </div>

    {/* §6 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p6.heading")}</h3>
      <SubSection t={t} prefix="s2.p6" keys={["sub1", "sub2", "sub3"]} />
    </div>

    {/* §7 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p7.heading")}</h3>
      <SubSection t={t} prefix="s2.p7" keys={["sub1", "sub2"]} />
    </div>

    {/* §8 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p8.heading")}</h3>
      <SubSection t={t} prefix="s2.p8" keys={["a", "b"]} />
    </div>

    {/* §9 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s2.p9.heading")}</h3>
      <SubSection t={t} prefix="s2.p9" keys={["sub1", "sub2", "sub3"]} />
    </div>
  </div>
);

const SectionLeasingApp = ({ t }: { t: (k: string) => string }) => (
  <div className="space-y-6 text-muted-foreground leading-relaxed">
    {/* Präambel */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.praeambel.heading")}</h3>
      <p>{t("s3.praeambel.text")}</p>
    </div>

    {/* §1 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p1.heading")}</h3>
      <p>{t("s3.p1.text")}</p>
    </div>

    {/* §2 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p2.heading")}</h3>
      <SubSection t={t} prefix="s3.p2" keys={["a1", "a2", "a3", "a4", "a5"]} />
    </div>

    {/* §3 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p3.heading")}</h3>
      <SubSection t={t} prefix="s3.p3" keys={["sub1", "sub2"]} />
    </div>

    {/* §4 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p4.heading")}</h3>
      <p>{t("s3.p4.text")}</p>
    </div>

    {/* §5 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p5.heading")}</h3>
      <p>{t("s3.p5.text")}</p>
    </div>

    {/* §6 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p6.heading")}</h3>
      <SubSection t={t} prefix="s3.p6" keys={["sub1", "sub2", "sub3"]} />
    </div>

    {/* §7 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p7.heading")}</h3>
      <SubSection t={t} prefix="s3.p7" keys={["a", "b"]} />
    </div>

    {/* §8 */}
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{t("s3.p8.heading")}</h3>
      <SubSection t={t} prefix="s3.p8" keys={["sub1", "sub2", "sub3"]} />
    </div>
  </div>
);

/* ── Main Component ── */

const AGB = () => {
  const { t } = useTranslation("agb");

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const sections = [
    { title: t("s0.title"), content: <SectionOnline t={t} /> },
    { title: t("s1.title"), content: <SectionWebseite t={t} /> },
    { title: t("s2.title"), content: <SectionLeasingWeb t={t} /> },
    { title: t("s3.title"), content: <SectionLeasingApp t={t} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="section-padding pt-44 md:pt-52">
        <div className="container-tight max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            {t("subtitle")}
          </p>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <AccordionItem
                key={i}
                index={i}
                title={section.title}
                content={section.content}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
