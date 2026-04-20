import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useEffect, useState } from "react";

// Import Lieferplattformen Icons
import lieferandoIcon from "@/assets/icons/app/App Icon - Lieferando.png";
import woltIcon from "@/assets/icons/app/App Icon - Wolt.png";
import uberEatsIcon from "@/assets/icons/app/App Icon - Uber Eats.png";

// Import Zahlungsmethoden Icons
import stripeIcon from "@/assets/icons/app/App Icon - Stripe.png";
import klarnaIcon from "@/assets/icons/app/App Icon - Klarna.png";
import mollieIcon from "@/assets/icons/app/App Icon - mollie.png";
import visaIcon from "@/assets/icons/app/App Icon - VISA.png";
import mastercardIcon from "@/assets/icons/app/App Icon - mastercard.png";

// Import Kassen Icons
import tseIcon from "@/assets/icons/app/App Icon - TSE.png";
import eloIcon from "@/assets/icons/app/App Icon - Elo.png";
import sidesIcon from "@/assets/icons/app/App Icon - Sides.png";
import winOrderIcon from "@/assets/icons/app/App Icon - WinOrder.png";
import datevIcon from "@/assets/icons/app/App Icon - Datev.png";
import epsonIcon from "@/assets/icons/app/App Icon - Epson.png";
import prismaIcon from "@/assets/icons/app/App Icon - Prisma.png";
import expertOrderIcon from "@/assets/icons/app/App Icon - Expert Order.png";

// Import Versand Icons
import upsIcon from "@/assets/icons/app/App Icon - ups.png";
import dpdIcon from "@/assets/icons/app/App Icon - DPD.png";
import dhlIcon from "@/assets/icons/app/App Icon - DHL.png";

// Import Social Media Icons
import facebookIcon from "@/assets/icons/app/App Icon - Facebook.png";
import instagramIcon from "@/assets/icons/app/App Icon - Instagram.png";
import tiktokIcon from "@/assets/icons/app/App Icon - TikTok.png";
import whatsappIcon from "@/assets/icons/app/App Icon - WhatsApp.png";

// Import Router Icons
import fritzIcon from "@/assets/icons/app/App Icon - Fritz.png";
import vodafoneIcon from "@/assets/icons/app/App Icon - Vodafone 2.png";
import telekomIcon from "@/assets/icons/app/App Icon - Telekom.png";

// Import all integration icons for slider
import geminIcon from "@/assets/icons/app/App Icon - Gemini.png";
import chatgptIcon from "@/assets/icons/app/App Icon - ChatGPT.png";
import facebookSliderIcon from "@/assets/icons/app/App Icon - Facebook.png";
import winOrderSliderIcon from "@/assets/icons/app/App Icon - WinOrder.png";
import instagramSliderIcon from "@/assets/icons/app/App Icon - Instagram.png";
import tiktokSliderIcon from "@/assets/icons/app/App Icon - TikTok.png";
import zohoIcon from "@/assets/icons/app/App Icon - ZOHO.png";
import liefersoftIcon from "@/assets/icons/app/App Icon - Liefersoft.png";
import sidesSliderIcon from "@/assets/icons/app/App Icon - Sides.png";
import eloSliderIcon from "@/assets/icons/app/App Icon - Elo.png";
import appleIcon from "@/assets/icons/app/App Icon - Apple.png";
import microsoftIcon from "@/assets/icons/app/App Icon - Microsoft 2.png";
import googleIcon from "@/assets/icons/app/App Icon - Google 2.png";
import youtubeIcon from "@/assets/icons/app/App Icon - YouTube.png";
import clickupIcon from "@/assets/icons/app/App Icon - Click Up.png";
import upsSliderIcon from "@/assets/icons/app/App Icon - ups.png";
import dpdSliderIcon from "@/assets/icons/app/App Icon - DPD.png";
import dhlSliderIcon from "@/assets/icons/app/App Icon - DHL.png";
import fritzSliderIcon from "@/assets/icons/app/App Icon - Fritz.png";
import vodafoneSliderIcon from "@/assets/icons/app/App Icon - Vodafone 2.png";
import telekomSliderIcon from "@/assets/icons/app/App Icon - Telekom.png";
import makeIcon from "@/assets/icons/app/App Icon - Make.png";
import whatsappSliderIcon from "@/assets/icons/app/App Icon - WhatsApp.png";
import tseSliderIcon from "@/assets/icons/app/App Icon - TSE.png";
import woltSliderIcon from "@/assets/icons/app/App Icon - Wolt.png";
import visaSliderIcon from "@/assets/icons/app/App Icon - VISA.png";
import mastercardSliderIcon from "@/assets/icons/app/App Icon - mastercard.png";
import datevSliderIcon from "@/assets/icons/app/App Icon - Datev.png";
import epsonSliderIcon from "@/assets/icons/app/App Icon - Epson.png";
import prismaSliderIcon from "@/assets/icons/app/App Icon - Prisma.png";
import expertOrderSliderIcon from "@/assets/icons/app/App Icon - Expert Order.png";

const FADE_MASK = `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)`;

interface IconItem {
  id: string;
  src: string;
  alt: string;
}

interface IntegrationCard {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface IntegrationCategory {
  id: string;
  title: string;
  subtitle: string;
  cards: IntegrationCard[];
}

// All icons for slider animation
const allSliderIcons: IconItem[] = [
  { id: "gemini", src: geminIcon, alt: "Gemini" },
  { id: "lieferando", src: lieferandoIcon, alt: "Lieferando" },
  { id: "uber-eats", src: uberEatsIcon, alt: "Uber Eats" },
  { id: "facebook", src: facebookSliderIcon, alt: "Facebook" },
  { id: "winorder", src: winOrderSliderIcon, alt: "WinOrder" },
  { id: "chatgpt", src: chatgptIcon, alt: "ChatGPT" },
  { id: "instagram", src: instagramSliderIcon, alt: "Instagram" },
  { id: "tiktok", src: tiktokSliderIcon, alt: "TikTok" },
  { id: "stripe", src: stripeIcon, alt: "Stripe" },
  { id: "klarna", src: klarnaIcon, alt: "Klarna" },
  { id: "mollie", src: mollieIcon, alt: "Mollie" },
  { id: "zoho", src: zohoIcon, alt: "ZOHO" },
  { id: "liefersoft", src: liefersoftIcon, alt: "Liefersoft" },
  { id: "sides", src: sidesSliderIcon, alt: "Sides" },
  { id: "elo", src: eloSliderIcon, alt: "Elo" },
  { id: "datev", src: datevSliderIcon, alt: "Datev" },
  { id: "epson", src: epsonSliderIcon, alt: "Epson" },
  { id: "apple", src: appleIcon, alt: "Apple" },
  { id: "microsoft", src: microsoftIcon, alt: "Microsoft" },
  { id: "google", src: googleIcon, alt: "Google" },
  { id: "youtube", src: youtubeIcon, alt: "YouTube" },
  { id: "clickup", src: clickupIcon, alt: "ClickUp" },
  { id: "ups", src: upsSliderIcon, alt: "UPS" },
  { id: "dhl", src: dhlSliderIcon, alt: "DHL" },
  { id: "dpd", src: dpdSliderIcon, alt: "DPD" },
  { id: "fritz", src: fritzSliderIcon, alt: "Fritz" },
  { id: "vodafone", src: vodafoneSliderIcon, alt: "Vodafone" },
  { id: "telekom", src: telekomSliderIcon, alt: "Telekom" },
  { id: "make", src: makeIcon, alt: "Make" },
  { id: "whatsapp", src: whatsappSliderIcon, alt: "WhatsApp" },
  { id: "tse", src: tseSliderIcon, alt: "TSE" },
  { id: "wolt", src: woltSliderIcon, alt: "Wolt" },
  { id: "visa", src: visaSliderIcon, alt: "VISA" },
  { id: "mastercard", src: mastercardSliderIcon, alt: "Mastercard" },
  { id: "prisma", src: prismaSliderIcon, alt: "Prisma" },
  { id: "expert-order", src: expertOrderSliderIcon, alt: "Expert Order" },
];

// Split icons: first 16 for row A, remaining 15 for row B
const sliderRowA = [...allSliderIcons.slice(0, 16), ...allSliderIcons.slice(0, 16)];
const sliderRowB = [...allSliderIcons.slice(16), ...allSliderIcons.slice(16)];

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return isDesktop;
};

const IconCardSlider = ({ id, src, alt }: IconItem) => (
  <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-border shadow-sm">
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
  </div>
);

const categories: IntegrationCategory[] = [
  {
    id: "lieferplattformen",
    title: "Lieferplattformen",
    subtitle: "Alle Bestellungen von Lieferando, Wolt und Uber Eats landen automatisch in Gastro Master",
    cards: [
      {
        id: "lieferando",
        name: "Lieferando",
        description: "Deutschlands größte Lieferplattform mit Millionen von aktiven Nutzern",
        icon: lieferandoIcon,
      },
      {
        id: "wolt",
        name: "Wolt",
        description: "Schnelle Lieferungen und einfache Integration in dein System",
        icon: woltIcon,
      },
      {
        id: "uber-eats",
        name: "Uber Eats",
        description: "Erreiche Millionen von Kunden auf der weltweit größten Lieferplattform",
        icon: uberEatsIcon,
      },
    ],
  },
  {
    id: "zahlungsmethoden",
    title: "Zahlungsmethoden",
    subtitle: "Sichere und flexible Zahlungsoptionen für deine Kunden",
    cards: [
      {
        id: "stripe",
        name: "Stripe",
        description: "Professionelle Zahlungsverarbeitung mit niedrigen Gebühren",
        icon: stripeIcon,
      },
      {
        id: "visa",
        name: "VISA",
        description: "Akzeptiere weltweit gültige VISA-Zahlungen",
        icon: visaIcon,
      },
      {
        id: "mastercard",
        name: "Mastercard",
        description: "Sichere Mastercard-Zahlungen für deine Kunden",
        icon: mastercardIcon,
      },
      {
        id: "klarna",
        name: "Klarna",
        description: "Flexible Zahlungsoptionen mit Klarna (Jetzt kaufen, später bezahlen)",
        icon: klarnaIcon,
      },
      {
        id: "mollie",
        name: "Mollie",
        description: "Einfache Zahlungsintegration mit Mollie",
        icon: mollieIcon,
      },
    ],
  },
  {
    id: "kassensysteme",
    title: "Kassensysteme & POS",
    subtitle: "Nahtlose Integration mit führenden Kassenlösungen",
    cards: [
      {
        id: "tse",
        name: "TSE",
        description: "Kassensicherungsmodul für rechtssichere Transaktionen",
        icon: tseIcon,
      },
      {
        id: "elo",
        name: "Elo",
        description: "Professionelle POS-Systeme für Gastronomie",
        icon: eloIcon,
      },
      {
        id: "sides",
        name: "Sides",
        description: "Moderne Kassenlösung für Restaurants und Cafés",
        icon: sidesIcon,
      },
      {
        id: "winorder",
        name: "WinOrder",
        description: "Komplettes Restaurantmanagementsystem",
        icon: winOrderIcon,
      },
      {
        id: "datev",
        name: "Datev",
        description: "Buchhaltungs- und Steuersoftware für Gastronomiebetriebe",
        icon: datevIcon,
      },
      {
        id: "epson",
        name: "Epson",
        description: "Professionelle Drucksysteme und Kassenrollen für POS",
        icon: epsonIcon,
      },
      {
        id: "prisma",
        name: "Prisma",
        description: "Modernes Kassensystem für Restaurants und Gastronomiebetriebe",
        icon: prismaIcon,
      },
      {
        id: "expert-order",
        name: "Expert Order",
        description: "Professionelle Bestellmanagement- und Kassenlösung",
        icon: expertOrderIcon,
      },
    ],
  },
  {
    id: "versand",
    title: "Versand & Logistik",
    subtitle: "Zuverlässige Versandpartner für deine Lieferkette",
    cards: [
      {
        id: "dhl",
        name: "DHL",
        description: "Deutschlands führender Paketdienst mit schneller Zustellung",
        icon: dhlIcon,
      },
      {
        id: "ups",
        name: "UPS",
        description: "Weltweiter Versandservice mit Tracking",
        icon: upsIcon,
      },
      {
        id: "dpd",
        name: "DPD",
        description: "Schneller und zuverlässiger Paketversand in Deutschland",
        icon: dpdIcon,
      },
    ],
  },
  {
    id: "social-media",
    title: "Social Media & Marketing",
    subtitle: "Erweitere deine Online-Präsenz und erreiche mehr Kunden",
    cards: [
      {
        id: "facebook",
        name: "Facebook",
        description: "Integration mit Facebook für einfaches Marketing",
        icon: facebookIcon,
      },
      {
        id: "instagram",
        name: "Instagram",
        description: "Verkaufe direkt über Instagram Shopping",
        icon: instagramIcon,
      },
      {
        id: "tiktok",
        name: "TikTok",
        description: "Erreiche junge Zielgruppen über TikTok Marketing",
        icon: tiktokIcon,
      },
      {
        id: "whatsapp",
        name: "WhatsApp Business",
        description: "Direkter Kontakt mit Kunden über WhatsApp",
        icon: whatsappIcon,
      },
    ],
  },
  {
    id: "router",
    title: "Router & Internet",
    subtitle: "Stabile Internetverbindung für zuverlässige Anruferkennung der Kasse",
    cards: [
      {
        id: "fritz",
        name: "Fritz!Box",
        description: "Professionelle Router mit Anrufererkennung für Kassensysteme",
        icon: fritzIcon,
      },
      {
        id: "vodafone",
        name: "Vodafone",
        description: "Zuverlässige Internetverbindung und Router-Lösungen",
        icon: vodafoneIcon,
      },
      {
        id: "telekom",
        name: "Telekom",
        description: "Deutsche Telekom Hochleistungs-Internet für Gastronomie",
        icon: telekomIcon,
      },
    ],
  },
];

const IntegrationCard = ({
  card,
  index,
}: {
  card: IntegrationCard;
  index: number;
}) => {
  const isDesktop = useIsDesktop();

  return (
  <motion.div
    initial={isDesktop ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
    whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
    transition={isDesktop ? { duration: 0.4, delay: index * 0.1 } : { duration: 0 }}
    viewport={{ once: true }}
    className="group relative h-full p-8 rounded-2xl border border-border bg-white dark:bg-slate-950 hover:border-cyan-brand/50 dark:hover:border-cyan-mid/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-mid/10 flex flex-col"
  >
    {/* Icon - No background box */}
    <div className="mb-8 flex justify-center">
      <img src={card.icon} alt={card.name} className="w-20 h-20 object-contain rounded-3xl border border-border" />
    </div>

    {/* Content */}
    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-center">
      {card.name}
    </h3>
    <p className="text-base text-muted-foreground mb-8 line-clamp-4 text-center flex-grow">
      {card.description}
    </p>

    {/* CTA Button */}
    <Button
      className="w-full gap-2 font-bold"
      variant="default"
      asChild
    >
      <a href="/de/kontakt">
        Mehr erfahren
        <span>→</span>
      </a>
    </Button>
  </motion.div>
  );
};

const IntegrationCategory = ({ category }: { category: IntegrationCategory }) => (
  <section className="py-8 md:py-10 px-5 md:px-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {category.title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground">
        {category.subtitle}
      </p>
    </motion.div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.cards.map((card, index) => (
        <IntegrationCard key={card.id} card={card} index={index} />
      ))}
    </div>
  </section>
);

export default function IntegrationPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-background to-slate-50/30 dark:to-slate-950/30 border-b border-border">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-[#0A264A]/8 dark:bg-white/8 border border-[#0A264A]/10 dark:border-white/10 text-cyan-brand dark:text-cyan-mid text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              INTEGRATIONEN & INFRASTRUKTUR
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Überall verbunden.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Lieferando, Uber Eats, Wolt und mehr - alle Bestellungen landen automatisch in Gastro Master. Verbinde dein System mit den wichtigsten Plattformen und Diensten deiner Industrie.
            </p>
          </motion.div>

          {/* Slider 1: Moving left */}
          <div
            className="relative h-28 w-full flex items-center overflow-hidden mb-4"
            style={{
              maskImage: FADE_MASK,
              WebkitMaskImage: FADE_MASK,
            }}
          >
            <InfiniteSlider className="flex h-full w-full items-center" duration={80} gap={16}>
              {sliderRowA.map((icon) => (
                <IconCardSlider key={icon.id} {...icon} />
              ))}
            </InfiniteSlider>
          </div>

          {/* Slider 2: Moving right */}
          <div
            className="relative h-28 w-full flex items-center overflow-hidden"
            style={{
              maskImage: FADE_MASK,
              WebkitMaskImage: FADE_MASK,
            }}
          >
            <InfiniteSlider className="flex h-full w-full items-center" duration={80} gap={16} reverse>
              {sliderRowB.map((icon) => (
                <IconCardSlider key={icon.id} {...icon} />
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container-tight">
          {categories.map((category) => (
            <IntegrationCategory key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-t border-border/10">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit, dein Business zu verbinden?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Lass dich von unseren Experten beraten, welche Integrationen für dein Restaurant oder deinen Lieferdienst am sinnvollsten sind.
            </p>
            <Button
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="/de/kontakt">
                Kontakt aufnehmen
                <span>→</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
