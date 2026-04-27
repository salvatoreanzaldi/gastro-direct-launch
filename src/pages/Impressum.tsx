import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const nl2br = (text: string) =>
  text.split("\n").map((line, i, a) => (
    <React.Fragment key={i}>{line}{i < a.length - 1 && <br />}</React.Fragment>
  ));

const Impressum = () => {
  const { t } = useTranslation("impressum");

  useSeoMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    canonical: t("meta.canonical"),
  });

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="section-padding pt-44 md:pt-52">
        <div className="container-tight max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted-foreground text-sm mb-12">{t("subtitle")}</p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("anbieter.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("anbieter.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("kontakt.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("kontakt.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("geschaeftsfuehrung.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("geschaeftsfuehrung.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("handelsregister.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("handelsregister.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("ustId.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("ustId.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("bank.heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{nl2br(t("bank.text"))}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("haftung.heading")}</h2>

            <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("haftung.inhalte.heading")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("haftung.inhalte.text")}</p>

            <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("haftung.links.heading")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("haftung.links.text")}</p>

            <h3 className="text-base font-semibold text-foreground mb-2 mt-6">{t("haftung.urheberrecht.heading")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("haftung.urheberrecht.text")}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
