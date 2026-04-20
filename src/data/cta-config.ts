import { CTASectionProps } from "@/components/CTASection";

interface CTAConfig {
  [path: string]: CTASectionProps;
}

export const getCTAConfig = (productPath: string): CTASectionProps => {
  const configs: CTAConfig = {
    "/": {
      productPath: "/",
      text: "Die komplette Lösung für dein Restaurant – von der Kasse bis zum Online-Shop. Einfach, skalierbar, vertrauenswürdig.",
    },
    "/produkte/kassensystem": {
      productPath: "/produkte/kassensystem",
      text: "Verwalte deine komplette Kassenfunktion mit einer eleganten Lösung. Einfach, zuverlässig, skalierbar.",
    },
    "/produkte/webshop": {
      productPath: "/produkte/webshop",
      text: "Dein eigener Online-Shop mit integrierter Bestellverwaltung. Kunden bestellen direkt vom Handy.",
    },
    "/produkte/app": {
      productPath: "/produkte/app",
      text: "Mobile App mit Kundenbindung & Bestellverwaltung. Immer in der Hosentasche deiner Gäste.",
    },
    "/produkte/webseite": {
      productPath: "/produkte/webseite",
      text: "SEO-optimiert und mobilfreundlich. Dein Restaurant präsentiert sich von seiner besten Seite.",
    },
    "/produkte/transaktionsumlage": {
      productPath: "/produkte/transaktionsumlage",
      text: "Alle Transaktionen automatisch verwaltet. Sicher, transparent und vollständig reguliert.",
    },
  };

  return configs[productPath] || configs["/produkte/kassensystem"];
};
