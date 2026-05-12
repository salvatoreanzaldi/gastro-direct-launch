import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import productWebseite from "@/assets/products/Webseite - Produkt.png";
import productWebshop from "@/assets/products/Webshop - Produkt.png";
import productApp from "@/assets/products/App - Produkt.png";
import productKasse from "@/assets/products/Kasse - Produkt.png";
import productKiosk from "@/assets/products/Kiosk 2 - Produkt.png";

const ProductShowcaseAccordionSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      id: "webseite",
      imageUrl: productWebseite,
      ctaUrl: "/produkte/pakete/webseite",
    },
    {
      id: "online-shop",
      imageUrl: productWebshop,
      ctaUrl: "/produkte/pakete/online-bestellshop",
    },
    {
      id: "app-system",
      imageUrl: productApp,
      ctaUrl: "/produkte/pakete/bestell-app",
    },
    {
      id: "kasse",
      imageUrl: productKasse,
      ctaUrl: "/produkte/pakete/kassensystem",
    },
    {
      id: "kiosk",
      imageUrl: productKiosk,
      ctaUrl: "/produkte/add-ons/kiosk",
    },
  ].map((p) => ({
    ...p,
    title: t(`productShowcase.products.${p.id}.title`),
    ctaText: t(`productShowcase.products.${p.id}.cta`),
  }));

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("productShowcase.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("productShowcase.title")}
          </h2>
        </div>

        {/* Mobile Card Layout - 1 column, stacked */}
        <div className="md:hidden space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-2xl overflow-hidden bg-muted h-[280px] flex flex-col items-center justify-end"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain bg-white"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/1280x720/2d3748/ffffff?text=Product";
                }}
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pb-6 gap-3">
                <span
                  className="font-black text-3xl text-white block"
                >
                  {product.title}
                </span>
                <a
                  href={product.ctaUrl}
                  className="px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm font-black text-white flex items-center gap-2"
                  style={{ backgroundColor: "#f99e2c" }}
                >
                  {product.ctaText}
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Accordion Layout - Horizontal */}
        <div className="hidden md:flex items-center justify-center overflow-hidden -mx-48">
          <div className="flex gap-3 items-center justify-center w-full px-48">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`
                  relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-700 ease-in-out
                  h-[320px] md:h-[380px] lg:h-[420px]
                  ${index === activeIndex ? "w-[420px] md:w-[620px] lg:w-[780px]" : "w-[120px] md:w-[150px]"}
                `}
                onMouseEnter={() => handleItemHover(index)}
                onClick={() => {
                  if (index === activeIndex) {
                    navigate(product.ctaUrl);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                role="link"
                aria-label={`${product.title} – ${product.ctaText}`}
              >
                {/* Product Image - Fixed size, crops when collapsed */}
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover bg-muted"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/1280x720/2d3748/ffffff?text=Product";
                  }}
                />

                {/* Dark overlay for better text readability - smooth fade */}
                <div
                  className={`
                    absolute inset-0 transition-opacity duration-700 ease-in-out
                    ${index === activeIndex ? "opacity-[0.125] bg-black/40" : "opacity-100 bg-black/40"}
                  `}
                ></div>

                {/* Title - Always visible, horizontal */}
                <div
                  className={`
                    absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center
                    transition-all duration-700 ease-in-out
                    ${index === activeIndex ? "opacity-0 pointer-events-none" : "opacity-100"}
                  `}
                >
                  <span
                    className="font-black text-xl md:text-2xl lg:text-3xl leading-tight text-white"
                    style={{
                      textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px 1px 0 #000,
                        1px 1px 0 #000,
                        -2px 0 0 #000,
                        2px 0 0 #000,
                        0 -2px 0 #000,
                        0 2px 0 #000
                      `
                    }}
                  >
                    {product.title}
                  </span>
                </div>

                {/* Caption Text & CTA Button - Expanded state */}
                <div
                  className={`
                    absolute bottom-8 left-6 right-6 flex flex-col items-start gap-4
                    transition-opacity duration-500 ease-in-out
                    ${index === activeIndex ? "opacity-100 delay-500" : "opacity-0 pointer-events-none"}
                  `}
                >
                  <span
                    className="font-black text-3xl md:text-4xl lg:text-5xl text-left text-white"
                    style={{
                      textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px 1px 0 #000,
                        1px 1px 0 #000,
                        -2px 0 0 #000,
                        2px 0 0 #000,
                        0 -2px 0 #000,
                        0 2px 0 #000
                      `
                    }}
                  >
                    {product.title}
                  </span>
                  <a
                    href={product.ctaUrl}
                    className="px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm md:text-base font-black text-white flex items-center gap-2"
                    style={{ backgroundColor: "#f99e2c" }}
                  >
                    {product.ctaText}
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcaseAccordionSection;
