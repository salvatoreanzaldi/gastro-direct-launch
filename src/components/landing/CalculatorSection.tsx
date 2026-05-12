import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

const CalculatorSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [orders, setOrders] = useState(300);
  const [avgCart, setAvgCart] = useState(30);
  const [commission, setCommission] = useState(15);

  const monthlyRevenue = orders * avgCart;
  const monthlyLoss = Math.round(monthlyRevenue * (commission / 100));
  const yearlyLoss = monthlyLoss * 12;

  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <section
      className="section-padding bg-[#0A264A] relative overflow-hidden"
      id="rechner"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,125,207,0.15), transparent 60%)" }}
      />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">{t("calculator.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            {t("calculator.headline")}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t("calculator.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-5 md:p-12 shadow-xl shadow-black/30"
        >
          <div className="grid md:grid-cols-3 gap-3 md:gap-8 mb-5 md:mb-10">
            <div>
              <div className="flex items-baseline justify-between md:block">
                <label className="text-white/65 text-xs md:text-sm font-medium mb-1 md:mb-2 block">
                  {t("calculator.labelOrders")}
                </label>
                <span className="text-lg font-black text-white md:hidden">{orders}</span>
              </div>
              <input
                type="range" min={50} max={3000} step={50} value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full accent-cyan-brand md:mb-2"
              />
              <div className="hidden md:block text-3xl font-black text-white">{orders}</div>
            </div>
            <div>
              <div className="flex items-baseline justify-between md:block">
                <label className="text-white/65 text-xs md:text-sm font-medium mb-1 md:mb-2 block">
                  {t("calculator.labelCart")}
                </label>
                <span className="text-lg font-black text-white md:hidden">{avgCart} €</span>
              </div>
              <input
                type="range" min={10} max={80} step={1} value={avgCart}
                onChange={(e) => setAvgCart(Number(e.target.value))}
                className="w-full accent-cyan-brand md:mb-2"
              />
              <div className="hidden md:block text-3xl font-black text-white">{avgCart} €</div>
            </div>
            <div>
              <div className="flex items-baseline justify-between md:block">
                <label className="text-white/65 text-xs md:text-sm font-medium mb-1 md:mb-2 block">
                  {t("calculator.labelCommission")}
                </label>
                <span className="text-lg font-black text-white md:hidden">{commission} %</span>
              </div>
              <input
                type="range" min={10} max={35} step={1} value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full accent-cyan-brand md:mb-2"
              />
              <div className="hidden md:block text-3xl font-black text-white">{commission} %</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-5 md:mb-8">
            <div className="bg-white/[0.08] border border-white/15 rounded-xl md:rounded-2xl px-2 py-2 md:p-5 text-center">
              <p className="text-white/50 text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-1 md:mb-2">
                {t("calculator.cardRevenue")}
              </p>
              <p className="text-base md:text-3xl font-black text-white">
                {monthlyRevenue.toLocaleString("de-DE")} €
              </p>
            </div>
            <div className="bg-green-500/[0.15] border border-green-500/30 rounded-xl md:rounded-2xl px-2 py-2 md:p-5 text-center">
              <p className="text-white/50 text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-1 md:mb-2">
                {t("calculator.cardMonth")}
              </p>
              <p className="text-base md:text-3xl font-black text-green-400">
                {monthlyLoss.toLocaleString("de-DE")} €
              </p>
            </div>
            <div className="bg-green-500/[0.15] border border-green-500/30 rounded-xl md:rounded-2xl px-2 py-2 md:p-5 text-center">
              <p className="text-white/50 text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-1 md:mb-2">
                {t("calculator.cardYear")}
              </p>
              <p className="text-base md:text-3xl font-black text-green-400">
                {yearlyLoss.toLocaleString("de-DE")} €
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/65 mb-4 md:mb-6 text-sm md:text-lg">
              {t("calculator.savingsText")}{" "}
              <strong className="text-cyan-brand">{yearlyLoss.toLocaleString("de-DE")} €</strong>
              {" "}{t("calculator.savingsSuffix")}
            </p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-amber text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
            >
              {t("calculator.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
