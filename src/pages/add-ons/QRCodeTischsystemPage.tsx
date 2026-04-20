import {
  QrCode, Smartphone, CreditCard, Languages, Bell, TrendingUp,
  Clock, UserX, Printer, Repeat,
  Utensils, Wine, Coffee, Users,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import heroImage from "@/assets/addons/addon-qr-tischsystem.png";

const config: AddOnPageConfig = {
  meta: {
    title: "QR-Code Tischsystem für Restaurants — Gäste bestellen selbst am Tisch | Gastro Master",
    description:
      "Mit dem QR-Code Tischsystem von Gastro Master bestellen Gäste direkt am Tisch — ohne Kellner, ohne Wartezeit. Weniger Personalaufwand, höhere Tischumschlagrate, Upselling automatisch. Für Restaurants, Cafés und Bars in Berlin, München, Hamburg, Frankfurt.",
    canonical: "https://gastro-master.de/add-ons/qr-code-tischsystem",
    breadcrumb: { name: "QR-Code Tischsystem", path: "/add-ons/qr-code-tischsystem" },
    ctaPath: "/add-ons/qr-code-tischsystem",
  },

  hero: {
    badge: "Add-On \u00B7 Tischservice",
    headline: "QR-Code Tischsystem \u2014 G\u00E4ste bestellen selbst am Tisch",
    subline:
      "Jeder Tisch bekommt einen eigenen QR-Code. G\u00E4ste scannen, w\u00E4hlen, bezahlen \u2014 alles \u00FCber ihr Smartphone. Die Bestellung landet sofort im Kassensystem und in der K\u00FCche. Weniger Wartezeit, mehr Tischumschlag, Upselling automatisch.",
    heroImage,
    heroImageRounded: true,
  },

  problemSolution: {
    problem: {
      title: "Das Problem klassischer Tischbestellung",
      points: [
        { icon: Clock, text: "G\u00E4ste warten 10\u201315 Minuten, bis der Kellner Zeit f\u00FCr die Bestellaufnahme hat \u2014 Umsatz, der verloren geht." },
        { icon: UserX, text: "Personalmangel in der Gastronomie: Ein Kellner weniger bedeutet l\u00E4ngere Wartezeit, schlechteren Service und verlorene G\u00E4ste." },
        { icon: Printer, text: "Handgeschriebene Zettel, M\u00FCndlich weitergegebene Sonderw\u00FCnsche \u2014 Fehler, falsche Gerichte, Beschwerden in der K\u00FCche." },
        { icon: Repeat, text: "Nachbestellungen dauern ewig: noch ein Bier, Dessert? G\u00E4ste suchen den Kellner mit dem Blick \u2014 und verlassen das Lokal ohne Nachbestellung." },
      ],
    },
    solution: {
      title: "Die L\u00F6sung: QR-Code Tischsystem",
      points: [
        { icon: QrCode, text: "Jeder Tisch bekommt einen individuellen QR-Code. Gast scannt \u2014 und sieht sofort deine Speisekarte auf dem eigenen Handy." },
        { icon: Smartphone, text: "Bestellung direkt vom Smartphone. Keine App-Installation, kein Warten, kein Kellner-Stress an der Theke." },
        { icon: Bell, text: "Bestellung landet sofort in Kasse + K\u00FCche. Keine Zettel, keine \u00DCbersetzungsfehler, keine vergessenen Sonderw\u00FCnsche." },
        { icon: TrendingUp, text: "Menue-Highlights und Upselling-Vorschl\u00E4ge im digitalen Men\u00FC \u2014 G\u00E4ste bestellen im Schnitt 18 % mehr pro Tisch." },
      ],
    },
  },

  features: {
    headline: "Alles drin f\u00FCr Tischbestellung, die wirklich entlastet",
    sub: "Sechs Funktionen, die aus jedem Tisch einen eigenst\u00E4ndigen Bestell-Kanal machen.",
    items: [
      {
        icon: QrCode,
        title: "QR-Code pro Tisch",
        description: "Individuelle QR-Codes f\u00FCr jeden Tisch \u2014 die Bestellung wird automatisch der richtigen Tischnummer zugeordnet. Keine Verwechslungen.",
      },
      {
        icon: Smartphone,
        title: "Bestellen ohne App",
        description: "G\u00E4ste bestellen direkt im Browser. Keine Installation, kein Account, kein Hindernis \u2014 scannen, w\u00E4hlen, fertig.",
      },
      {
        icon: CreditCard,
        title: "Direkt am Tisch bezahlen",
        description: "PayPal, Apple Pay, Google Pay, Kreditkarte \u2014 alle g\u00E4ngigen Zahlungsarten. Gast bezahlt, steht auf, geht. Kellner muss nicht mehr kassieren.",
      },
      {
        icon: Languages,
        title: "Mehrsprachiges Men\u00FC",
        description: "Automatische \u00DCbersetzung deiner Speisekarte in Deutsch, Englisch, Franz\u00F6sisch, Italienisch, T\u00FCrkisch und mehr \u2014 perfekt f\u00FCr Tourismusregionen.",
      },
      {
        icon: TrendingUp,
        title: "Upselling & Cross-Selling",
        description: "Empfehlungen wie \u201EDazu passt\u00A0...\u201C oder \u201ENoch ein Dessert?\u201C werden automatisch eingeblendet \u2014 18 % h\u00F6herer Durchschnittsbon.",
      },
      {
        icon: Bell,
        title: "Live-Sync mit Kasse & K\u00FCche",
        description: "Jede Bestellung erscheint in Echtzeit auf der Kasse und dem K\u00FCchendisplay. Keine Verz\u00F6gerung, keine Fehl\u00FCbergaben.",
      },
    ],
  },

  useCases: {
    headline: "So setzen Gastronomen das QR-Code Tischsystem ein",
    sub: "Drei reale Szenarien aus unserem Kundenkreis \u2014 vom Szene-Cafe bis zum 120-Pl\u00E4tze-Restaurant.",
    items: [
      {
        icon: Utensils,
        title: "Restaurant mit 80 Pl\u00E4tzen",
        story:
          "Ein italienisches Restaurant in M\u00FCnchen reduzierte die durchschnittliche Bestellzeit von 12 auf 3 Minuten. Ergebnis: Tischumschlagrate stieg von 2,1 auf 2,8 pro Abend \u2014 ohne zus\u00E4tzliches Personal.",
      },
      {
        icon: Wine,
        title: "Bar im Ausgehviertel",
        story:
          "Eine Cocktail-Bar in Berlin-Mitte l\u00E4sst G\u00E4ste per QR-Code nachbestellen. Getr\u00E4nkeumsatz pro Gast stieg um 24 %, weil niemand mehr auf den Barkeeper wartet \u2014 und das Personal entspannter arbeitet.",
      },
      {
        icon: Coffee,
        title: "Szene-Cafe mit Touristen",
        story:
          "Ein Cafe in Frankfurt-Sachsenhausen bedient 30 % internationale G\u00E4ste. Seit QR-Code-Bestellung in 8 Sprachen sind Missverst\u00E4ndnisse verschwunden \u2014 und die Bewertungen auf Google stiegen von 4,1 auf 4,7 Sterne.",
      },
    ],
  },

  trust: {
    stats: [
      { value: "\u22121 FTE", label: "Personaleinsparung pro Schicht bei 40\u201360 Pl\u00E4tzen" },
      { value: "+18 %", label: "h\u00F6herer Durchschnittsbon durch Upselling" },
      { value: "3 Min.", label: "statt 12 Min. Bestellzeit pro Tisch" },
    ],
    testimonial: {
      quote:
        "Fr\u00FCher haben wir zu Sto\u00DFzeiten Bestellungen verloren, weil Kellner nicht hinterherkamen. Seit dem QR-Code Tischsystem hat sich das gedreht: Die G\u00E4ste bestellen selbst, die K\u00FCche arbeitet konstant durch \u2014 und wir machen 20 % mehr Umsatz pro Abend.",
      author: "Giulia M.",
      role: "Inhaberin Trattoria, M\u00FCnchen-Schwabing",
    },
  },

  pricing: {
    headline: "Preis & Verf\u00FCgbarkeit",
    price: "+50 \u20AC / Monat f\u00FCr 5 Tische",
    note:
      "Kassen-Add-On f\u00FCr Restaurants, Cafes und Bars. Die ersten 5 Tische sind im Grundpreis enthalten \u2014 jeder weitere Tisch kostet +5\u00A0\u20AC / Monat (zzgl. MwSt.). Inklusive individueller QR-Codes, mehrsprachigem Men\u00FC, Live-Synchronisation mit Kasse und K\u00FCche. Keine Provision pro Bestellung, keine versteckten Gebühren.",
    tiersHeadline: "Staffelpreise nach Tischanzahl",
    tiers: [
      { qty: "5 Tische",  price: "50,00 \u20AC / Monat" },
      { qty: "10 Tische", price: "75,00 \u20AC / Monat" },
      { qty: "15 Tische", price: "100,00 \u20AC / Monat" },
      { qty: "20 Tische", price: "125,00 \u20AC / Monat" },
      { qty: "30 Tische", price: "175,00 \u20AC / Monat" },
      { qty: "50 Tische", price: "275,00 \u20AC / Monat" },
    ],
    tiersNote:
      "Alle Preise netto zzgl. MwSt. Gr\u00F6\u00DFere Betriebe mit mehr als 50 Tischen erhalten auf Anfrage ein individuelles Angebot. Aussenbereiche, separate R\u00E4ume und Events z\u00E4hlen wie normale Tische.",
  },

  internalLinks: {
    headline: "Funktioniert perfekt mit",
    intro:
      "Das QR-Code Tischsystem entfaltet seine volle Wirkung als Teil des Gastro-Master-\u00D6kosystems \u2014 von der Bestellung am Tisch bis zur Rechnung in der Kasse.",
    items: [
      {
        to: "/produkte/kassensystem",
        title: "Kassensystem",
        description:
          "Jede Tischbestellung landet automatisch in der Kasse \u2014 mit Tischnummer, Artikeln und Sonderw\u00FCnschen. Keine manuelle Eingabe, keine Fehler.",
      },
      {
        to: "/loesungen/restaurant",
        title: "L\u00F6sung f\u00FCr Restaurants",
        description:
          "Komplettpaket aus Kasse, Tischverwaltung, QR-Bestellung und Reservierung \u2014 speziell f\u00FCr Restaurants, Cafes und Bars im Tischservice.",
      },
    ],
  },

  faq: {
    headline: "H\u00E4ufige Fragen zum QR-Code Tischsystem",
    sub: "Antworten auf die Fragen, die uns Restaurants, Cafes und Bars aus Berlin, M\u00FCnchen, Hamburg, K\u00F6ln, Frankfurt, Stuttgart und dem gesamten DACH-Raum am h\u00E4ufigsten stellen.",
    items: [
      {
        q: "Was kostet das QR-Code Tischsystem f\u00FCr mein Restaurant?",
        a: "Das QR-Code Tischsystem ist ein Kassen-Add-On und startet ab 50 \u20AC pro Monat f\u00FCr die ersten 5 Tische. Jeder weitere Tisch kostet +5 \u20AC pro Monat (zzgl. MwSt.). Ein Restaurant mit 20 Tischen zahlt also 125 \u20AC pro Monat. Inklusive sind individuelle QR-Codes, mehrsprachiges Men\u00FC, Live-Sync mit Kasse und K\u00FCche sowie alle Zahlungsarten. Es fallen keine Provisionen pro Bestellung oder versteckte Gebühren an.",
      },
      {
        q: "Wie funktioniert das QR-Code Tischsystem in der Praxis?",
        a: "Jeder Tisch erh\u00E4lt einen eigenen QR-Code \u2014 zum Beispiel als Tischaufsteller, Sticker oder auf der Speisekarte. Der Gast scannt mit der Handy-Kamera, die Speisekarte \u00F6ffnet sich automatisch im Browser, der Gast w\u00E4hlt Artikel und bestellt. Die Bestellung landet sofort mit der richtigen Tischnummer in der Kasse und auf dem K\u00FCchendisplay \u2014 ohne Zwischenschritte, ohne Zettel, ohne Kellner.",
      },
      {
        q: "M\u00FCssen meine G\u00E4ste eine App installieren?",
        a: "Nein. Das QR-Code Tischsystem l\u00E4uft vollst\u00E4ndig im Browser \u2014 auf jedem iPhone, Android-Handy oder Tablet. Keine App-Installation, kein Account, keine Registrierung. Gast scannt, bestellt, fertig. Das senkt die Hemmschwelle deutlich und funktioniert auch f\u00FCr \u00E4ltere G\u00E4ste oder Touristen zuverl\u00E4ssig.",
      },
      {
        q: "Kann der Gast auch direkt am Tisch bezahlen?",
        a: "Ja. Der Gast w\u00E4hlt nach der Bestellung seine bevorzugte Zahlungsart \u2014 PayPal, Apple Pay, Google Pay, Kreditkarte (Visa, Mastercard) oder Klarna \u2014 und bezahlt direkt \u00FCber sein Smartphone. Alternativ kann die Rechnung auch ganz klassisch am Ende beim Kellner bezahlt werden. Beide Varianten sind parallel m\u00F6glich.",
      },
      {
        q: "F\u00FCr welche Restaurants eignet sich das QR-Code Tischsystem?",
        a: "Das System eignet sich f\u00FCr alle Betriebe mit Tischservice: italienische Restaurants, Pizzerien, asiatische K\u00FCche, Cafes, Bars, Cocktail-Lounges, Biergarten, Gastrokonzepte im Food Court oder Hotels. Besonders wirksam ist es bei 20\u201380 Pl\u00E4tzen und zu Sto\u00DFzeiten (Mittagstisch, Wochenendabende), wenn das Personal sonst an der Kapazit\u00E4tsgrenze arbeitet.",
      },
      {
        q: "Welche Sprachen unterst\u00FCtzt das digitale Men\u00FC?",
        a: "Das Men\u00FC wird automatisch in Deutsch, Englisch, Franz\u00F6sisch, Italienisch, Spanisch, T\u00FCrkisch und weitere Sprachen \u00FCbersetzt. Der Gast w\u00E4hlt seine Sprache beim Scannen selbst. Das ist besonders wertvoll f\u00FCr touristische Gebiete in Berlin, M\u00FCnchen, Hamburg, Frankfurt oder K\u00F6ln \u2014 Bestellfehler durch Sprachbarrieren verschwinden nahezu vollst\u00E4ndig.",
      },
      {
        q: "Kann ich Upselling \u00FCber das QR-Code Men\u00FC steuern?",
        a: "Ja. Du kannst pro Artikel passende Zusatzprodukte hinterlegen (\u201EDazu passt ein Glas Chianti\u201C, \u201ENoch ein Dessert?\u201C). Das System zeigt diese Vorschl\u00E4ge automatisch im Bestellprozess an. Unsere Kunden berichten im Schnitt 18 % h\u00F6here Bonwerte \u2014 vor allem bei Getr\u00E4nken, Beilagen und Desserts, die sonst gerne vergessen werden.",
      },
      {
        q: "Ersetzt das QR-Code Tischsystem meine Kellner komplett?",
        a: "Nein \u2014 und das ist bewusst nicht der Ansatz. Das System \u00FCbernimmt die Bestellaufnahme und entlastet damit dein Personal. Kellner bleiben f\u00FCr Beratung, Weinempfehlungen, Tische abr\u00E4umen, das Servieren und die pers\u00F6nliche Gastlichkeit zust\u00E4ndig. In der Praxis sparen Betriebe etwa 1 Mitarbeiter pro Schicht ein oder k\u00F6nnen bei gleichem Personal 20\u201330 % mehr G\u00E4ste bedienen.",
      },
      {
        q: "Wie wird das QR-Code Tischsystem mit meinem Kassensystem verbunden?",
        a: "Wenn du bereits ein Gastro-Master-Kassensystem nutzt, ist das Tischsystem sofort einsatzbereit. Bestellungen landen automatisch mit der richtigen Tischnummer in der Kasse und im K\u00FCchendisplay. Kein separates Setup, keine Integration, keine Entwickler notwendig \u2014 du musst nur die QR-Codes an den Tischen anbringen und bist startklar.",
      },
      {
        q: "Kann ich das Men\u00FC live \u00E4ndern, zum Beispiel wenn etwas ausverkauft ist?",
        a: "Ja. Im Gastro-Master-Backoffice kannst du einzelne Artikel jederzeit deaktivieren, Preise anpassen, Tagesgerichte hinzuf\u00FCgen oder ganze Men\u00FCkarten umstellen. \u00C4nderungen greifen sofort \u2014 auch mitten im laufenden Service. Ausverkaufte Artikel werden im digitalen Men\u00FC automatisch ausgeblendet, sodass keine Bestellungen mehr darauf eingehen.",
      },
    ],
  },
};

const QRCodeTischsystemPage = () => <AddOnPageTemplate config={config} />;

export default QRCodeTischsystemPage;
