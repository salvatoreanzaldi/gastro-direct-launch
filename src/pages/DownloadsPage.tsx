import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const DOWNLOAD_URLS = [
  ["https://gastro-master.de/dd/gmwindows13.zip", "https://gastro-master.de/dd/GMClientDesktopV1.0.0.zip"],
  ["https://gastro-master.de/dd/v1.apk", "https://gastro-master.de/dd/full2025.apk", "https://play.google.com/store/apps/details?id=com.epitglobal.gmmerchantnew&hl"],
  ["https://apps.apple.com/us/app/gastro-master-terminal/id6502642590", "https://apps.apple.com/de/app/gm-merchant/id1631565715"],
];

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const DownloadsPage = () => {
  const { t } = useTranslation("downloads");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const categories = arr("categories") as { category: string; items: { label: string; ext: string | null }[] }[];

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  if (categories.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="section-padding pt-28 md:pt-32">
        <div className="container-tight max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted-foreground text-sm mb-12">{t("subtitle")}</p>

          {/* Druckertreiber – prominent card */}
          <div className="mb-10 rounded-2xl border border-primary/20 bg-primary p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-1">{t("printerCard.badge")}</p>
              <h2 className="text-lg font-bold text-primary-foreground">{t("printerCard.title")}</h2>
              <p className="text-sm text-primary-foreground/60 mt-1">{t("printerCard.description")}</p>
            </div>
            <Link
              to={lp("/downloads/druckertreiber")}
              className="shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              {t("printerCard.cta")}
              <svg className="w-4 h-4 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Download categories */}
          {categories.map((group, gi) => (
            <section key={gi} className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{group.category}</h2>
              <ul className="divide-y divide-primary/20 rounded-2xl overflow-hidden">
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    <a
                      href={DOWNLOAD_URLS[gi]?.[ii] ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 px-5 py-4 bg-primary hover:bg-primary/90 transition-colors"
                    >
                      <span className="text-sm font-medium text-primary-foreground">{item.label}</span>
                      <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-accent">
                        {item.ext ? (
                          <>
                            <DownloadIcon />
                            {item.ext}
                          </>
                        ) : (
                          <>
                            <ExternalIcon />
                            {t("storeLabel")}
                          </>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;
