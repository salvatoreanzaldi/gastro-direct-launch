import { CTASectionProps } from "@/components/CTASection";

// Hero images imports
import kasseHero from "@/assets/heroes/hero-pos-system.png";
import webshopHero from "@/assets/heroes/Hero - Webshop.png";
import appHero from "@/assets/mockups/Mock Up - Branding Hero.png";
import websiteHero from "@/assets/heroes/Hero - Gastro Master.png";
import transactionHero from "@/assets/addons/9 - Zahlungsmethoden.png";

interface CTAConfig {
  [path: string]: CTASectionProps;
}

export const getCTAConfig = (productPath: string): CTASectionProps => {
  const configs: CTAConfig = {
    "/produkte/kassensystem": {
      productPath: "/produkte/kassensystem",
      heroImage: kasseHero,
      headline: "Alle Bestellungen. Ein System.",
      text: "Verwalde deine komplette Kassenfunktion mit einer eleganten Lösung. Einfach, zuverlässig, skalierbar.",
    },
    "/produkte/webshop": {
      productPath: "/produkte/webshop",
      heroImage: webshopHero,
      headline: "Dein Restaurant. Online.",
      text: "Dein eigener Online-Shop mit integrierten Bestellverwaltung. Kunden bestellen direkt vom Handy.",
    },
    "/produkte/app": {
      productPath: "/produkte/app",
      heroImage: appHero,
      headline: "Deine App. Dein Brand.",
      text: "Mobile App mit Kundenbindung & Bestellverwaltung. Direct in der Hosentasche deiner Gäste.",
    },
    "/produkte/webseite": {
      productPath: "/produkte/webseite",
      heroImage: websiteHero,
      headline: "Deine Restaurant-Website. Modern.",
      text: "SEO-optimiert und mobilfreundlich. Dein Restaurant präsentiert sich von seiner besten Seite.",
    },
    "/produkte/transaktionsumlage": {
      productPath: "/produkte/transaktionsumlage",
      heroImage: transactionHero,
      headline: "Automatische Abwicklung.",
      text: "Alle Transaktionen automatisch verwaltet. Sicher, transparent und vollständig reguliert.",
    },
  };

  return configs[productPath] || configs["/produkte/kassensystem"];
};
