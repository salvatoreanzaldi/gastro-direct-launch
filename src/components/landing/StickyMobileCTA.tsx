import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StickyMobileCTA = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const scrollToForm = () => {
    navigate("/kontakt");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-navy/95 backdrop-blur-md border-t border-primary-foreground/10 md:hidden">
      <button onClick={scrollToForm}
        className="w-full bg-gradient-amber text-primary font-bold px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg">
        {t("sticky.cta")}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default StickyMobileCTA;
