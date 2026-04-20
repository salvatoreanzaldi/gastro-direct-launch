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
    "/add-ons": {
      productPath: "/add-ons",
      text: "Add-Ons f\u00fcr Webshop, App und Kassensystem \u2014 modular kombinierbar, sofort einsatzbereit. In einer kostenlosen Beratung finden wir die passende Erweiterung f\u00fcr deinen Betrieb.",
    },
    "/add-ons/qr-code-flyer": {
      productPath: "/add-ons/qr-code-flyer",
      text: "Mit dem QR-Code Flyer werden Papierflyer zum messbaren Bestell-Kanal. Scan \u2192 Bestellung in 2 Sekunden.",
    },
    "/add-ons/fahrer-app-gps": {
      productPath: "/add-ons/fahrer-app-gps",
      text: "Live-GPS-Tracking f\u00fcr jede Lieferung. Transparenz f\u00fcr deine Kunden, Routen-Optimierung f\u00fcr dein Team.",
    },
    "/add-ons/qr-code-tischsystem": {
      productPath: "/add-ons/qr-code-tischsystem",
      text: "G\u00e4ste bestellen selbst vom Tisch. Weniger Personalaufwand, schnellere Bestellungen, gezieltes Upselling.",
    },
    "/add-ons/bildschirmfunktion": {
      productPath: "/add-ons/bildschirmfunktion",
      text: "K\u00fcche und Theke immer im Bild. Alle Bestellungen in Echtzeit, farblich priorisiert, ohne Papierchaos.",
    },
    "/add-ons/kiosk": {
      productPath: "/add-ons/kiosk",
      text: "Self-Service Terminal statt Warteschlange. Bestellungen direkt vom Gast, Upselling automatisch eingebaut.",
    },
  };

  return configs[productPath] || configs["/produkte/kassensystem"];
};
