import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const DRIVER_URLS = [
  "https://gastro-master.de/dd/windows.zip",
  "https://www.winorder.com/download/APD_607R1_T20III.exe",
  "https://www.winorder.com/download/APD_513_T20II.exe",
  "https://www.winorder.com/download/APD_610_T20IV.exe",
  "https://www.winorder.com/download/Metapace_T-3III_Windows_Driver_V1.0.0.exe",
  "https://www.winorder.com/download/Metapace_T-3II_WIN_V1.0.7.exe",
  "https://www.winorder.com/download/Metapace_T-40_WIN_V1_01.zip",
  "https://www.winorder.com/download/Star_TSP143IV_Windows_Software_V3.9.1_setup.exe",
  "https://www.winorder.com/download/tsp100_V770.EXE",
  "https://www.winorder.com/download/cts4000_lm_v3000.exe",
  "https://www.winorder.com/download/cts4500_lm_v3000.exe",
];

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DruckertreiberPage = () => {
  const { t } = useTranslation("druckertreiber");
  const lp = useLangPath();
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const drivers = arr("drivers") as { label: string; version: string; ext: string }[];

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  if (drivers.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="section-padding pt-28 md:pt-32">
        <div className="container-tight max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to={lp("/downloads")} className="hover:text-foreground transition-colors">{t("breadcrumbParent")}</Link>
            <span>/</span>
            <span className="text-foreground">{t("breadcrumbCurrent")}</span>
          </nav>

          <h1 className="text-4xl font-black text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted-foreground text-sm mb-12">{t("subtitle")}</p>

          <ul className="divide-y divide-primary/20 rounded-2xl overflow-hidden">
            {drivers.map((driver, i) => (
              <li key={i}>
                <a
                  href={DRIVER_URLS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-5 py-4 bg-primary hover:bg-primary/90 transition-colors"
                >
                  <div>
                    <span className="text-sm font-medium text-primary-foreground">{driver.label}</span>
                    <span className="ml-2 text-xs text-primary-foreground/50">{driver.version}</span>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <DownloadIcon />
                    {driver.ext}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-muted-foreground">
            {t("contactPrefix")}{" "}
            <a href="tel:+4960819128913" className="underline hover:text-foreground transition-colors">
              +49 (0) 6081 9128913
            </a>{" "}
            {t("contactMiddle")}{" "}
            <a href="mailto:info@gastro-master.de" className="underline hover:text-foreground transition-colors">
              info@gastro-master.de
            </a>{" "}
            {t("contactSuffix")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DruckertreiberPage;
