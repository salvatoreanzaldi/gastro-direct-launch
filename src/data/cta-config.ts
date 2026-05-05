import { CTASectionProps } from "@/components/CTASection";

interface CTAConfig {
  [path: string]: CTASectionProps;
}

export const getCTAConfig = (productPath: string): CTASectionProps => {
  const configs: CTAConfig = {
    "/": {
      productPath: "/",
    },
    "/produkte/pakete/kassensystem": {
      productPath: "/produkte/pakete/kassensystem",
      text: "Verwalte deine komplette Kassenfunktion mit einer eleganten Lösung. Einfach, zuverlässig, skalierbar.",
    },
    "/produkte/pakete/online-bestellshop": {
      productPath: "/produkte/pakete/online-bestellshop",
      text: "Dein eigener Online-Shop mit integrierter Bestellverwaltung. Kunden bestellen direkt vom Handy.",
    },
    "/produkte/pakete/bestell-app": {
      productPath: "/produkte/pakete/bestell-app",
      text: "Mobile App mit Kundenbindung & Bestellverwaltung. Immer in der Hosentasche deiner Gäste.",
    },
    "/produkte/pakete/webseite": {
      productPath: "/produkte/pakete/webseite",
      text: "SEO-optimiert und mobilfreundlich. Dein Restaurant präsentiert sich von seiner besten Seite.",
    },
    "/produkte/add-ons/transaktionsumlage": {
      productPath: "/produkte/add-ons/transaktionsumlage",
      text: "Alle Transaktionen automatisch verwaltet. Sicher, transparent und vollständig reguliert.",
    },
    "/blog": {
      productPath: "/blog",
      text: "Gastro Master gibt dir alles, was du für einen unabhängigen Lieferdienst brauchst — ohne Plattform-Abhängigkeit und ohne versteckte Provisionen.",
    },
    "/produkte/add-ons": {
      productPath: "/produkte/add-ons",
      text: "Add-Ons f\u00fcr Webshop, App und Kassensystem \u2014 modular kombinierbar, sofort einsatzbereit. In einer kostenlosen Beratung finden wir die passende Erweiterung f\u00fcr deinen Betrieb.",
    },
    "/produkte/add-ons/qr-code-flyer": {
      productPath: "/produkte/add-ons/qr-code-flyer",
      text: "Mit dem QR-Code Flyer werden Papierflyer zum messbaren Bestell-Kanal. Scan \u2192 Bestellung in 2 Sekunden.",
    },
    "/produkte/add-ons/fahrer-app-gps": {
      productPath: "/produkte/add-ons/fahrer-app-gps",
      text: "Live-GPS-Tracking f\u00fcr jede Lieferung. Transparenz f\u00fcr deine Kunden, Routen-Optimierung f\u00fcr dein Team.",
    },
    "/produkte/add-ons/qr-code-tischsystem": {
      productPath: "/produkte/add-ons/qr-code-tischsystem",
      text: "G\u00e4ste bestellen selbst vom Tisch. Weniger Personalaufwand, schnellere Bestellungen, gezieltes Upselling.",
    },
    "/produkte/add-ons/bildschirmfunktion": {
      productPath: "/produkte/add-ons/bildschirmfunktion",
      text: "K\u00fcche und Theke immer im Bild. Alle Bestellungen in Echtzeit, farblich priorisiert, ohne Papierchaos.",
    },
    "/produkte/add-ons/kiosk": {
      productPath: "/produkte/add-ons/kiosk",
      text: "Self-Service Terminal statt Warteschlange. Bestellungen direkt vom Gast, Upselling automatisch eingebaut.",
    },
  };

  return configs[productPath] || configs["/produkte/pakete/kassensystem"];
};
