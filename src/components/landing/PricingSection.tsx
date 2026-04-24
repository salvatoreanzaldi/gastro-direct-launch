import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type FeatureStatus = true | false | string;

interface ComparisonRow {
  label: string;
  values: FeatureStatus[];
}

interface ComparisonGroup {
  group: string;
  rows: ComparisonRow[];
}

const comparison: ComparisonGroup[] = [
  {
    group: "Vertriebskanal",
    rows: [
      { label: "Website + Unterseiten", values: [true, false, false, false, false] },
      { label: "Webshop (provisionsfrei)", values: [false, true, true, true, true] },
      { label: "Native App (iOS & Android)", values: [false, false, true, true, true] },
      { label: "Individuelles Design", values: [false, false, false, false, true] },
    ],
  },
  {
    group: "Bestellungen & Reichweite",
    rows: [
      { label: "Unbegrenzte Bestellungen", values: [false, true, true, true, true] },
      { label: "Push-Benachrichtigungen", values: [false, false, true, true, true] },
      { label: "Flyer DIN A6 mit QR-Code", values: [false, "2.500", "5.000", "10.000", "n. A."] },
    ],
  },
  {
    group: "Zahlungen & Kundenbindung",
    rows: [
      { label: "PayPal & Stripe Einrichtung", values: [false, true, true, true, true] },
      { label: "Kundenpunkte-System", values: [false, true, true, true, true] },
      { label: "Trinkgeld-Funktion", values: [false, true, true, true, true] },
      { label: "Dashboard", values: [false, true, true, true, true] },
    ],
  },
  {
    group: "Kasse & Zusatzfunktionen",
    rows: [
      { label: "Kassenschnittstelle", values: [false, "optional", "optional", "optional", "optional"] },
      { label: "58 mm Bondrucker", values: [false, "optional", "optional", "optional", "optional"] },
      { label: "Cloud-Kasse (TSE-konform)", values: [false, false, false, "inkl.", "inkl."] },
      { label: "Transaktionsumlage", values: [false, false, false, "inkl.", "inkl."] },
    ],
  },
  {
    group: "Domain & E-Mail",
    rows: [
      { label: "Wunsch-Domain", values: [true, true, true, true, true] },
      { label: "Postfächer", values: ["2", "3", "4", "5", "n. A."] },
    ],
  },
  {
    group: "Umsetzung & Vertrag",
    rows: [
      { label: "Umsetzungsdauer", values: ["7–10 T.", "10–14 T.", "2–3 W.", "2–3 W.", "individuell"] },
      { label: "Jederzeit kündbar (3 Mon.)", values: [true, true, true, true, false] },
      { label: "Rahmenvertrag", values: [false, false, false, false, true] },
    ],
  },
];

const renderCell = (val: FeatureStatus) => {
  if (val === true) return <Check className="w-4 h-4 text-cyan-brand mx-auto" />;
  if (val === false) return <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />;
  return <span className="text-xs font-medium text-foreground">{String(val)}</span>;
};

const PricingSection = () => {
  const { t } = useTranslation("common");
  const [showTable, setShowTable] = useState(false);

  const scrollToForm = () => {
    window.location.href = "/kontakt";
  };

  const packageFeaturesMap = t("pricing.packageFeatures", { returnObjects: true }) as Record<string, readonly string[]>;

  return (
    <section className="section-padding bg-background" id="preise">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("pricing.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("pricing.sub")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {(t("pricing.plans", { returnObjects: true }) as any[]).map((pkg, i) => {
            const isHighlight = !!pkg.popular;
            const features = packageFeaturesMap[pkg.id] ?? [];
            const hasPrice = pkg.price !== "Auf Anfrage" && pkg.price !== "Custom Pricing" && pkg.price !== "Custom";
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-6 border flex flex-col ${
                  isHighlight
                    ? "bg-gradient-navy text-primary-foreground border-cyan-brand/60 shadow-xl shadow-cyan-brand/25 lg:scale-105 z-10"
                    : "bg-surface-light border-border"
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-amber text-primary text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {t("pricing.badgePopular")}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className={`text-lg font-black mb-1 ${isHighlight ? "text-primary-foreground" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                    {pkg.tagline}
                  </p>
                </div>

                <div className="mb-5">
                  {hasPrice ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-xs ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{t("pricing.from")}</span>
                        <span className={`text-3xl font-black ${isHighlight ? "text-primary-foreground" : "text-foreground"}`}>
                          {pkg.price}€
                        </span>
                        <span className={`text-xs ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{t("pricing.perMonth")}</span>
                      </div>
                      <span className={`text-[10px] ${isHighlight ? "text-primary-foreground/35" : "text-muted-foreground/60"}`}>
                        {t("pricing.vatNote")}
                      </span>
                    </div>
                  ) : (
                    <span className={`text-xl font-bold ${isHighlight ? "text-primary-foreground" : "text-foreground"}`}>
                      {t("pricing.onRequest")}
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-cyan-brand" />
                      <span className={`text-sm leading-snug ${isHighlight ? "text-primary-foreground/80" : "text-foreground"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className={`text-[11px] mb-4 ${isHighlight ? "text-primary-foreground/40" : "text-muted-foreground"}`}>
                  {t("pricing.durationLabel")}: {pkg.duration}
                </p>

                <button
                  onClick={scrollToForm}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    isHighlight
                      ? "bg-gradient-amber !text-white hover:scale-[1.02]"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                  style={isHighlight ? { color: "#ffffff" } : undefined}
                >
                  {hasPrice ? t("pricing.ctaPrimary") : t("pricing.ctaSecondary")}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowTable(!showTable)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-brand hover:underline transition-all"
          >
            {showTable ? t("pricing.hideComparison") : t("pricing.showComparison")}
            <ArrowRight className={`w-4 h-4 transition-transform ${showTable ? "rotate-90" : ""}`} />
          </button>
        </motion.div>

        {showTable && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border bg-surface-light">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-5 font-semibold text-muted-foreground w-[220px]">Feature</th>
                    {(t("pricing.plans", { returnObjects: true }) as any[]).map((pkg) => (
                      <th key={pkg.id} className={`py-4 px-3 text-center font-bold text-xs ${pkg.popular ? "text-cyan-brand" : "text-foreground"}`}>
                        <div className="flex flex-col items-center gap-0.5">
                          {pkg.popular && <Star className="w-3 h-3 text-amber fill-amber" />}
                          {pkg.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((group) => (
                    <>{/* Fragment for group */}
                      <tr key={group.group}>
                        <td colSpan={6} className="pt-5 pb-2 px-5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {group.group}
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.label} className="border-b border-border/50 last:border-0">
                          <td className="py-3 px-5 text-foreground text-sm">{row.label}</td>
                          {row.values.map((val, vi) => (
                            <td key={vi} className={`py-3 px-3 text-center ${(t("pricing.plans", { returnObjects: true }) as any[])[vi]?.popular ? "bg-primary/[0.03]" : ""}`}>
                              {renderCell(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked */}
            <div className="lg:hidden space-y-6">
              {(t("pricing.plans", { returnObjects: true }) as any[]).map((pkg, pi) => {
                const isHighlight = !!pkg.popular;
                const hasPrice = pkg.price !== "Auf Anfrage" && pkg.price !== "Custom Pricing" && pkg.price !== "Custom";
                return (
                  <div key={pkg.id} className={`rounded-2xl border p-5 ${isHighlight ? "border-cyan-brand/30 bg-gradient-navy text-primary-foreground" : "border-border bg-surface-light"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className={`font-bold text-lg ${isHighlight ? "text-primary-foreground" : "text-foreground"}`}>{pkg.name}</h4>
                        {hasPrice ? (
                          <span className={`text-sm ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{t("pricing.from")} {pkg.price}€{t("pricing.perMonth")} {t("pricing.vatNote")}</span>
                        ) : (
                          <span className={`text-sm ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{t("pricing.onRequest")}</span>
                        )}
                      </div>
                      {isHighlight && (
                        <span className="bg-gradient-amber text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">{t("pricing.badgePopular")}</span>
                      )}
                    </div>
                    {comparison.map((group) => (
                      <div key={group.group} className="mb-3">
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isHighlight ? "text-primary-foreground/40" : "text-muted-foreground"}`}>{group.group}</p>
                        <div className="space-y-1.5">
                          {group.rows.map((row) => {
                            const val = row.values[pi];
                            if (val === false) return null;
                            return (
                              <div key={row.label} className="flex items-center justify-between text-sm">
                                <span className={isHighlight ? "text-primary-foreground/70" : "text-foreground"}>{row.label}</span>
                                <span>{renderCell(val)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <p className="text-muted-foreground text-xs">
            {t("pricing.setupNote")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
