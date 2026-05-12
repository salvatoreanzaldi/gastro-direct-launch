import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import partnerPaypal from "@/assets/logos/partner/partner-paypal.png";
import partnerStripe from "@/assets/logos/partner/partner-stripe.png";
import payApple from "@/assets/logos/payment/Logo - Apple Pay.png";
import payGoogle from "@/assets/logos/payment/pay-google.png";
import payVisa from "@/assets/logos/payment/pay-visa.png";
import payMastercard from "@/assets/logos/payment/pay-mastercard.png";
import payKlarna from "@/assets/logos/payment/pay-klarna.png";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

const paymentMethods = [
  { name: "PayPal", img: partnerPaypal },
  { name: "Stripe", img: partnerStripe },
  { name: "Apple Pay", img: payApple },
  { name: "Google Pay", img: payGoogle },
  { name: "Visa", img: payVisa },
  { name: "MasterCard", img: payMastercard },
  { name: "Klarna", img: payKlarna },
];

const TransaktionsUmlageSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const lp = useLangPath();
  const [orders, setOrders] = useState(300);
  const [avgCart, setAvgCart] = useState(30);

  const paypalFee = orders * 0.5 * (avgCart * 0.0299 + 0.39);
  const stripeFee = orders * 0.5 * (avgCart * 0.015 + 0.25);
  const totalFees = Math.round(paypalFee + stripeFee);

  const scrollToForm = () => {
    navigate(lp("/kontakt"));
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">{t("transaktion.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {t("transaktion.headline")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-lg">
              {t("transaktion.sub")}
            </p>

            <ul className="space-y-3 mb-8">
              {(t("transaktion.features", { returnObjects: true }) as string[]).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5 flex-wrap mb-8">
              {paymentMethods.map((pm) => (
                <img
                  key={pm.name}
                  src={pm.img}
                  alt={pm.name}
                  className="h-9 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>

            <button
              onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
            >
              {t("transaktion.cta")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right: Mini Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-surface-light border border-border rounded-2xl p-7 md:p-9"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">{t("transaktion.calcBadge")}</p>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t("transaktion.calcOrders")}</span>
                  <span className="font-bold text-foreground">{orders}</span>
                </div>
                <input
                  type="range" min={50} max={2000} step={50} value={orders}
                  onChange={(e) => setOrders(Number(e.target.value))}
                  className="w-full accent-cyan-brand"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t("transaktion.calcCart")}</span>
                  <span className="font-bold text-foreground">{avgCart} €</span>
                </div>
                <input
                  type="range" min={10} max={80} step={1} value={avgCart}
                  onChange={(e) => setAvgCart(Number(e.target.value))}
                  className="w-full accent-cyan-brand"
                />
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 mb-4">
              <p className="text-muted-foreground text-xs mb-1">{t("transaktion.calcResult")}</p>
              <p className="text-3xl font-black text-foreground">~{totalFees.toLocaleString("de-DE")} €</p>
            </div>

            <div className="space-y-2 text-[11px] text-muted-foreground">
              <p>{t("transaktion.feePaypal")}</p>
              <p>{t("transaktion.feeStripe")}</p>
              <p className="pt-1 text-cyan-brand font-medium">{t("transaktion.calcNote")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransaktionsUmlageSection;
