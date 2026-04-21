import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

// Import all 31 icons
import geminIcon from "@/assets/icons/app/App Icon - Gemini.png";
import liferandoIcon from "@/assets/icons/app/App Icon - Lieferando.png";
import uberEatsIcon from "@/assets/icons/app/App Icon - Uber Eats.png";
import facebookIcon from "@/assets/icons/app/App Icon - Facebook.png";
import winOrderIcon from "@/assets/icons/app/App Icon - WinOrder.png";
import chatgptIcon from "@/assets/icons/app/App Icon - ChatGPT.png";
import instagramIcon from "@/assets/icons/app/App Icon - Instagram.png";
import tiktokIcon from "@/assets/icons/app/App Icon - TikTok.png";
import stripeIcon from "@/assets/icons/app/App Icon - Stripe.png";
import klarnaIcon from "@/assets/icons/app/App Icon - Klarna.png";
import mollieIcon from "@/assets/icons/app/App Icon - mollie.png";
import zohoIcon from "@/assets/icons/app/App Icon - ZOHO.png";
import liefersoftIcon from "@/assets/icons/app/App Icon - Liefersoft.png";
import sidesIcon from "@/assets/icons/app/App Icon - Sides.png";
import eloIcon from "@/assets/icons/app/App Icon - Elo.png";
import appleIcon from "@/assets/icons/app/App Icon - Apple.png";
import microsoftIcon from "@/assets/icons/app/App Icon - Microsoft 2.png";
import googleIcon from "@/assets/icons/app/App Icon - Google 2.png";
import youtubeIcon from "@/assets/icons/app/App Icon - YouTube.png";
import clickupIcon from "@/assets/icons/app/App Icon - Click Up.png";
import upsIcon from "@/assets/icons/app/App Icon - ups.png";
import dpdIcon from "@/assets/icons/app/App Icon - DPD.png";
import dhlIcon from "@/assets/icons/app/App Icon - DHL.png";
import fritzIcon from "@/assets/icons/app/App Icon - Fritz.png";
import vodafoneIcon from "@/assets/icons/app/App Icon - Vodafone 2.png";
import telekomIcon from "@/assets/icons/app/App Icon - Telekom.png";
import makeIcon from "@/assets/icons/app/App Icon - Make.png";
import whatsappIcon from "@/assets/icons/app/App Icon - WhatsApp.png";
import tseIcon from "@/assets/icons/app/App Icon - TSE.png";
import woltIcon from "@/assets/icons/app/App Icon - Wolt.png";
import visaIcon from "@/assets/icons/app/App Icon - VISA.png";
import mastercardIcon from "@/assets/icons/app/App Icon - mastercard.png";
import datevIcon from "@/assets/icons/app/App Icon - Datev.png";
import epsonIcon from "@/assets/icons/app/App Icon - Epson.png";
import adyenIcon from "@/assets/icons/app/App Icon - Adyen.png";

const FADE_MASK = `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)`;

interface IconItem {
  id: string;
  src: string;
  alt: string;
}

const allIcons: IconItem[] = [
  { id: "gemini", src: geminIcon, alt: "Gemini" },
  { id: "lieferando", src: liferandoIcon, alt: "Lieferando" },
  { id: "uber-eats", src: uberEatsIcon, alt: "Uber Eats" },
  { id: "facebook", src: facebookIcon, alt: "Facebook" },
  { id: "winorder", src: winOrderIcon, alt: "WinOrder" },
  { id: "chatgpt", src: chatgptIcon, alt: "ChatGPT" },
  { id: "instagram", src: instagramIcon, alt: "Instagram" },
  { id: "tiktok", src: tiktokIcon, alt: "TikTok" },
  { id: "stripe", src: stripeIcon, alt: "Stripe" },
  { id: "klarna", src: klarnaIcon, alt: "Klarna" },
  { id: "mollie", src: mollieIcon, alt: "Mollie" },
  { id: "zoho", src: zohoIcon, alt: "ZOHO" },
  { id: "liefersoft", src: liefersoftIcon, alt: "Liefersoft" },
  { id: "sides", src: sidesIcon, alt: "Sides" },
  { id: "elo", src: eloIcon, alt: "Elo" },
  { id: "datev", src: datevIcon, alt: "Datev" },
  { id: "epson", src: epsonIcon, alt: "Epson" },
  { id: "apple", src: appleIcon, alt: "Apple" },
  { id: "microsoft", src: microsoftIcon, alt: "Microsoft" },
  { id: "google", src: googleIcon, alt: "Google" },
  { id: "youtube", src: youtubeIcon, alt: "YouTube" },
  { id: "clickup", src: clickupIcon, alt: "ClickUp" },
  { id: "ups", src: upsIcon, alt: "UPS" },
  { id: "dhl", src: dhlIcon, alt: "DHL" },
  { id: "dpd", src: dpdIcon, alt: "DPD" },
  { id: "fritz", src: fritzIcon, alt: "Fritz" },
  { id: "vodafone", src: vodafoneIcon, alt: "Vodafone" },
  { id: "telekom", src: telekomIcon, alt: "Telekom" },
  { id: "make", src: makeIcon, alt: "Make" },
  { id: "whatsapp", src: whatsappIcon, alt: "WhatsApp" },
  { id: "tse", src: tseIcon, alt: "TSE" },
  { id: "wolt", src: woltIcon, alt: "Wolt" },
  { id: "visa", src: visaIcon, alt: "VISA" },
  { id: "mastercard", src: mastercardIcon, alt: "Mastercard" },
  { id: "adyen", src: adyenIcon, alt: "Adyen" },
];

// Split icons: first 16 for row A, remaining 15 for row B
// Duplicate each row to ensure seamless infinite looping
const rowA = [...allIcons.slice(0, 16), ...allIcons.slice(0, 16)];
const rowB = [...allIcons.slice(16), ...allIcons.slice(16)];

const IconCard = ({ id, src, alt }: IconItem) => (
  <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-border shadow-sm">
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
  </div>
);

export default function IntegrationSliderSection() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-5 md:px-8 text-center mb-12 md:mb-16"
      >
        <span className="inline-block bg-[#0A264A]/8 dark:bg-white/8 border border-[#0A264A]/10 dark:border-white/10 text-cyan-brand dark:text-cyan-mid text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          INTEGRATIONEN & INFRASTRUKTUR
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">Überall verbunden.</h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8">
          Lieferando, Uber Eats, Wolt und mehr - alle Bestellungen landen automatisch in Gastro Master.
        </p>
        <Button className="gap-2" asChild>
          <a href="/de/integrations">
            Integrationen ansehen
            <span>→</span>
          </a>
        </Button>
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
          {rowA.map((icon) => (
            <IconCard key={icon.id} {...icon} />
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
          {rowB.map((icon) => (
            <IconCard key={icon.id} {...icon} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
