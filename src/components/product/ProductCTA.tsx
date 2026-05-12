import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductCTAProps {
  headline: string;
  sub: string;
  buttonLabel: string;
}

const ProductCTA = ({ headline, sub, buttonLabel }: ProductCTAProps) => {
  const navigate = useNavigate();
  return (
  <section className="bg-gradient-amber section-padding">
    <div className="container-tight text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] mb-4 leading-tight">
          {headline}
        </h2>
        <p className="text-[#0A264A]/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {sub}
        </p>
        <button
          onClick={() => { navigate("/kontakt"); }}
          className="bg-[#0A264A] text-white font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:bg-[#0A264A]/90 transition-colors shadow-xl shadow-[#0A264A]/25"
        >
          {buttonLabel}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  </section>
  );
};

export default ProductCTA;
