import {
  QrCode, Smartphone, BarChart3, Printer, Paintbrush, Globe, Zap,
  Search, Clock, MousePointerClick, Pizza, Truck, Megaphone,
  TrendingUp, Target,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import flyerMockup from "@/assets/mockups/Mock Up - Flyer.png";

const config: AddOnPageConfig = {
  meta: {
    title: "QR-Code Flyer für Restaurants — Direktbestellungen vom Flyer | Gastro Master",
    description:
      "Mit dem QR-Code Flyer Add-On von Gastro Master bestellen Kunden direkt vom Papierflyer. Automatische URL-Generierung, Tracking & Analytics, druckfertige Designs. Perfekt für Pizzerien, Lieferdienste & Restaurants in Berlin, München, Hamburg.",
    canonical: "https://gastro-master.de/add-ons/qr-code-flyer",
    breadcrumb: { name: "QR-Code Flyer", path: "/add-ons/qr-code-flyer" },
    ctaPath: "/add-ons/qr-code-flyer",
  },

  hero: {
    badge: "Add-On · Marketing",
    headline: "QR-Code Flyer — Direktbestellungen vom Papierflyer",
    subline:
      "Verwandle jeden Flyer in einen Bestell-Kanal. Ein Scan, ein Tap — und deine Kunden bestellen direkt im Webshop oder in deiner App. Trackbar, druckfertig, messbar.",
    heroImage: flyerMockup,
  },

  problemSolution: {
    problem: {
      title: "Das Problem klassischer Flyer",
      points: [
        { icon: Search, text: "Kunden müssen dein Restaurant erst googeln — oft landen sie bei Lieferando & Co." },
        { icon: Clock, text: "Der Weg von \u201EFlyer in der Hand\u201C zur ersten Bestellung dauert 3\u20135 Minuten \u2014 zu viele Abbrecher." },
        { icon: BarChart3, text: "Du weißt nie, welcher Flyer, welches Viertel, welche Aktion wirklich Umsatz bringt." },
        { icon: MousePointerClick, text: "URLs abtippen funktioniert 2026 nicht mehr — Flyer landen ungenutzt im Müll." },
      ],
    },
    solution: {
      title: "Die Lösung: QR-Code Flyer",
      points: [
        { icon: QrCode, text: "Jeder Flyer bekommt einen individuellen QR-Code, der direkt in deinen Webshop oder deine App führt." },
        { icon: Zap, text: "Ein Scan — in 2 Sekunden ist der Kunde im Menü, ohne Google-Umweg, ohne Lieferando-Provision." },
        { icon: BarChart3, text: "Jeder Scan wird getrackt: Wann, wo, welche Kampagne. Du siehst den ROI jedes Flyers live." },
        { icon: Printer, text: "Druckfertige PDFs in deinem Branding — direkt an die Druckerei weiterleiten, fertig." },
      ],
    },
  },

  features: {
    headline: "Alles drin für Flyer, die wirklich bestellen lassen",
    sub: "Sechs Funktionen, die aus jedem Flyer ein messbares Marketing-Asset machen.",
    items: [
      {
        icon: QrCode,
        title: "Automatische URL-Generierung",
        description: "Pro Kampagne ein eigener Deep-Link mit QR-Code — automatisch erzeugt, sofort einsatzbereit.",
      },
      {
        icon: BarChart3,
        title: "Tracking & Analytics",
        description: "Scans, Bestellungen, Umsatz pro Flyer — transparent im Dashboard. Weißt endlich, was funktioniert.",
      },
      {
        icon: Printer,
        title: "Print-Ready PDF-Export",
        description: "Druckfertige Dateien mit 3 mm Beschnitt und CMYK-Farbprofil — direkt zur Druckerei.",
      },
      {
        icon: Paintbrush,
        title: "Designanpassung im Branding",
        description: "Logo, Farben, Schriften — dein Flyer sieht aus wie von der Werbeagentur, ohne Agenturpreis.",
      },
      {
        icon: Smartphone,
        title: "Mobile-optimierte Landingpage",
        description: "Der QR-Code landet nie auf einer langsamen Website, sondern direkt im schlanken Bestellflow.",
      },
      {
        icon: Target,
        title: "Kampagnen-Codes & Rabatte",
        description: "Flyer-Aktion mit 10 % Rabattcode? Ein Klick im Dashboard, aktiv im QR-Code, messbar pro Stückzahl.",
      },
    ],
  },

  useCases: {
    headline: "So setzen Gastronomen den QR-Code Flyer ein",
    sub: "Drei reale Szenarien aus unserem Kundenkreis — vom Quartier bis zur Kette.",
    items: [
      {
        icon: Pizza,
        title: "Pizzeria im Wohnviertel",
        story:
          "Ein Berliner Pizzabäcker verteilt 2.000 Flyer mit QR-Code im Umkreis von 3 km. Ergebnis: +40 % Direktbestellungen in 4 Wochen — ohne Lieferando-Provision von 13 %.",
      },
      {
        icon: Truck,
        title: "Lieferdienst-Kette",
        story:
          "Eine Burger-Kette aus München druckt QR-Codes auf jede Lieferverpackung. Stammkunden scannen statt zu googeln — Wiederbestell-Rate stieg von 22 % auf 38 %.",
      },
      {
        icon: Megaphone,
        title: "Event-Marketing",
        story:
          "Ein Food-Truck in Hamburg druckt QR-Codes auf Stadtfest-Flyer. Der Truck weiß in Echtzeit: Veranstaltung X bringt 3 € pro Flyer, Veranstaltung Y nur 0,40 €. Budget wird umgeschichtet.",
      },
    ],
  },

  trust: {
    stats: [
      { value: "+40 %", label: "mehr Direktbestellungen mit QR-Code Flyer" },
      { value: "2 Sek.", label: "vom Scan bis zum offenen Menü" },
      { value: "0 %", label: "Provision pro Bestellung" },
    ],
    testimonial: {
      quote:
        "Unsere Flyer waren früher ein Blindflug. Mit dem QR-Code sehen wir pro Kampagne exakt, was ankommt — und bestellen nachdruck nur noch für die Viertel, die performen.",
      author: "Marco R.",
      role: "Inhaber Pizzeria, Berlin-Kreuzberg",
    },
  },

  pricing: {
    headline: "Preis & Verfügbarkeit",
    price: "Ab 65,00 € für 2.500 Stück",
    note:
      "Das QR-Code-Flyer-System ist kostenfrei in jedem Webshop- und App-Abo enthalten. Du zahlst nur den Druck — transparent nach Stückzahl, ohne versteckte Gebühren.",
    tiersHeadline: "Staffelpreise für den Druck",
    tiers: [
      { qty: "2.500 Stück",  price: "65,00 €" },
      { qty: "5.000 Stück",  price: "117,00 €" },
      { qty: "7.500 Stück",  price: "175,50 €" },
      { qty: "10.000 Stück", price: "234,00 €" },
      { qty: "12.500 Stück", price: "295,50 €" },
      { qty: "15.000 Stück", price: "351,00 €" },
      { qty: "20.000 Stück", price: "468,00 €" },
      { qty: "30.000 Stück", price: "702,00 €" },
      { qty: "40.000 Stück", price: "936,00 €" },
      { qty: "50.000 Stück", price: "1.117,00 €" },
    ],
    tiersNote:
      "Alle Preise netto zzgl. MwSt. Inklusive Druck, Beschnitt, individuellem QR-Code und Versand innerhalb Deutschlands. Individuelle Mengen auf Anfrage.",
  },

  internalLinks: {
    headline: "Funktioniert perfekt mit",
    intro:
      "Der QR-Code Flyer entfaltet seine volle Wirkung kombiniert mit deinem Bestellkanal. Beide Optionen sind mit dem Add-On vollständig kompatibel.",
    items: [
      {
        to: "/produkte/webshop",
        title: "Webshop",
        description:
          "Direkter Deep-Link vom Flyer in deinen Webshop — ohne App-Download, sofort im Browser. Ideal für Neukunden-Akquise.",
      },
      {
        to: "/produkte/app",
        title: "Eigene Bestell-App",
        description:
          "QR-Code öffnet deine App aus dem Store — oder den Webshop, falls die App nicht installiert ist. Smart-Fallback inklusive.",
      },
    ],
  },

  faq: {
    headline: "Häufige Fragen zum QR-Code Flyer",
    sub: "Antworten auf die Fragen, die uns Gastronomen aus Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart und dem gesamten DACH-Raum am häufigsten stellen.",
    items: [
      {
        q: "Was kostet ein QR-Code Flyer für mein Restaurant?",
        a: "Das QR-Code-System selbst ist in jedem Webshop- und App-Abo von Gastro Master ohne Zusatzkosten enthalten. Du zahlst nur den Druck nach Stückzahl: ab 65 € für 2.500 Stück bis 1.117 € für 50.000 Stück (netto, zzgl. MwSt., inklusive Druck, Beschnitt, individuellem QR-Code und Versand innerhalb Deutschlands). Individuelle Mengen und Sonderformate sind jederzeit auf Anfrage möglich.",
      },
      {
        q: "Wie funktioniert der QR-Code Flyer für die Gastronomie?",
        a: "Wir erzeugen pro Kampagne einen individuellen QR-Code, der direkt in deinen Gastro-Master-Webshop oder deine eigene Bestell-App führt — ohne Umweg über Google, ohne Lieferando-Provision. Der Gast scannt, landet im Menü und bestellt. Jeder Scan wird in Echtzeit getrackt, sodass du den ROI jedes einzelnen Flyers live im Dashboard siehst.",
      },
      {
        q: "Für welche Städte und Regionen kann ich QR-Code Flyer einsetzen?",
        a: "Der QR-Code Flyer funktioniert bundesweit — von Berlin und Hamburg über München, Köln, Frankfurt, Stuttgart, Düsseldorf und Leipzig bis hin zu kleineren Städten in Bayern, NRW, Baden-Württemberg und Ostdeutschland. Druck und Versand erfolgen innerhalb Deutschlands, auf Wunsch auch nach Österreich und in die Schweiz.",
      },
      {
        q: "Wie schnell werden die Flyer produziert und geliefert?",
        a: "Nach Freigabe des Designs beträgt die Standard-Produktionszeit 3–5 Werktage, zzgl. 1–2 Tage Versand innerhalb Deutschlands. Express-Produktion ist gegen Aufpreis möglich — bei dringenden Kampagnen (z. B. Eröffnung, Sonderaktion) liefern wir innerhalb von 48 Stunden.",
      },
      {
        q: "Kann ich den QR-Code Flyer mit meinem bestehenden Webshop verbinden?",
        a: "Ja, wenn du bereits einen Gastro-Master-Webshop oder eine Bestell-App nutzt, ist das QR-Code-Flyer-Add-On sofort einsatzbereit. Die Codes werden automatisch mit deinem System verknüpft — kein Setup, keine Integration, keine Entwickler notwendig.",
      },
      {
        q: "Brauche ich eine eigene Bestell-App für den QR-Code Flyer?",
        a: "Nein, eine App ist keine Voraussetzung. Der QR-Code kann direkt in deinen Webshop führen — Gäste bestellen sofort im Browser, ohne Download. Hast du zusätzlich eine App, öffnet sich diese automatisch, falls installiert — sonst übernimmt der Webshop (Smart-Fallback).",
      },
      {
        q: "Welche Druckqualität haben die Flyer?",
        a: "Alle Flyer werden auf hochwertigem 135 g/m\u00B2 Bilderdruckpapier mit 4/4-Farbdruck (Euroskala, CMYK) produziert. Standardformate: DIN lang, DIN A6 und DIN A5. Sonderformate, schwereres Papier (170\u2013300 g/m\u00B2) sowie Veredelungen wie Soft-Touch-Lack oder UV-Lack sind gegen Aufpreis m\u00F6glich.",
      },
      {
        q: "Kann ich pro Kampagne mehrere unterschiedliche QR-Codes nutzen?",
        a: "Ja — du kannst beliebig viele Kampagnen parallel laufen lassen, jede mit eigenem QR-Code. So trackst du getrennt, wie Flyer in Berlin-Kreuzberg performen vs. Berlin-Mitte, oder welche Sonderaktion zur Fu\u00DFball-EM mehr Bestellungen bringt. Ideal f\u00FCr A/B-Tests und geografisches Marketing.",
      },
      {
        q: "Kann ich Rabattcodes im QR-Code hinterlegen?",
        a: "Ja. Pro Kampagne kannst du einen Rabattcode (z. B. \u201EFLYER10\u201C f\u00FCr 10 % Rabatt auf die erste Bestellung) direkt mit dem QR-Code verkn\u00FCpfen. Der Code wird beim Scan automatisch angewendet \u2014 kein manuelles Eintippen durch den Gast n\u00F6tig. So messbar wie jede Online-Kampagne.",
      },
      {
        q: "Wie stelle ich sicher, dass meine Flyer tats\u00E4chlich Umsatz bringen?",
        a: "Im Gastro-Master-Dashboard siehst du live pro Flyer-Kampagne: Anzahl der Scans, daraus entstandene Bestellungen, Umsatz und den effektiven Cost-per-Order. So erkennst du nach wenigen Tagen, welche Viertel, Zielgruppen oder Aktionen performen \u2014 und kannst Nachdruck gezielt nur dort bestellen, wo sich der Flyer rechnet.",
      },
    ],
  },
};

const QRCodeFlyerPage = () => <AddOnPageTemplate config={config} />;

export default QRCodeFlyerPage;
