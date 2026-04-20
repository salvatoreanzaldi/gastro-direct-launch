import {
  Hand, TrendingUp, Clock, Languages, CreditCard, Bell,
  Users, Timer, UserX, Banknote,
  Pizza, Coffee, Utensils,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import heroImage from "@/assets/addons/selfordering-terminals.png";

const config: AddOnPageConfig = {
  meta: {
    title: "Self-Ordering Kiosk für Gastronomie — Bestellterminal & Self-Service | Gastro Master",
    description:
      "Self-Ordering Kiosk von Gastro Master: Gäste bestellen und bezahlen direkt am Terminal — ohne Warteschlange, ohne Theken-Stress. Mehrsprachig, 24/7, Upselling automatisch, voll integriert ins Kassensystem. Für Schnellrestaurants, Bäckereien, Food Courts und Franchise in Berlin, München, Hamburg, Frankfurt.",
    canonical: "https://gastro-master.de/add-ons/kiosk",
    breadcrumb: { name: "Self-Ordering Kiosk", path: "/add-ons/kiosk" },
    ctaPath: "/add-ons/kiosk",
  },

  hero: {
    badge: "Add-On \u00B7 Self-Ordering Terminal",
    headline: "Self-Ordering Kiosk \u2014 Schluss mit der Warteschlange",
    subline:
      "Das Terminal \u00FCbernimmt die Theke. G\u00E4ste w\u00E4hlen, konfigurieren und bezahlen direkt am Bildschirm \u2014 mehrsprachig, mit aktivem Upselling und ohne Wartezeit. Bestellung landet in Echtzeit in Kasse und K\u00FCche. Dein Personal arbeitet, statt zu kassieren.",
    heroImage,
  },

  problemSolution: {
    problem: {
      title: "Das Problem an der klassischen Theke",
      points: [
        { icon: Users, text: "Zu Sto\u00DFzeiten staut sich alles vor der Theke \u2014 G\u00E4ste warten 8\u201312 Minuten, viele drehen wieder ab und kommen nicht zur\u00FCck." },
        { icon: UserX, text: "Personalmangel in der Gastronomie: Schon ein fehlender Mitarbeiter an der Kasse senkt den Umsatz pro Schicht sp\u00FCrbar." },
        { icon: Timer, text: "Die manuelle Bestellaufnahme dauert pro Gast 90\u2013120 Sekunden \u2014 Zeit, die in der Mittagspause oder zur Rush Hour direkt fehlt." },
        { icon: TrendingUp, text: "Upselling klappt nur, wenn das Personal Zeit und Lust hat \u2014 in der Praxis bleiben Gr\u00F6\u00DFen, Beilagen und Getr\u00E4nke regelm\u00E4\u00DFig liegen." },
      ],
    },
    solution: {
      title: "Die L\u00F6sung: Self-Ordering Kiosk",
      points: [
        { icon: Hand, text: "G\u00E4ste bestellen selbst am Touchscreen \u2014 in 60\u201390 Sekunden komplett durch, mit klaren Bildern, Mengen und Zusatzoptionen." },
        { icon: CreditCard, text: "Bezahlung direkt am Terminal: Karte, Apple Pay, Google Pay, Bargeld optional. Kein zus\u00E4tzlicher Schritt an der Kasse." },
        { icon: TrendingUp, text: "Aktives Upselling im Bestellflow: \u201EPommes als gro\u00DFe Portion?\u201C, \u201EGetr\u00E4nk dazu?\u201C \u2014 +20\u201330 % Durchschnittsbon, ganz ohne Personal." },
        { icon: Bell, text: "Bestellung landet sofort in Kasse und K\u00FCche, mit Bestellnummer f\u00FCr den Pick-Up Screen. Kein Doppeltippen, keine Missverst\u00E4ndnisse." },
      ],
    },
  },

  features: {
    headline: "Alles drin f\u00FCr Self-Ordering, das wirklich entlastet",
    sub: "Sechs Funktionen, die aus dem Terminal einen vollwertigen Bestell- und Kassen-Kanal machen.",
    items: [
      {
        icon: Hand,
        title: "Intuitive Touch-Bedienung",
        description: "Gro\u00DFe Buttons, klare Bilder, deutsche und internationale Symbolsprache. Auch \u00E4ltere G\u00E4ste und Kinder kommen ohne Hilfe durch \u2014 keine Erkl\u00E4rung n\u00F6tig.",
      },
      {
        icon: TrendingUp,
        title: "Automatisches Upselling",
        description: "Pro Artikel hinterlegst du Empfehlungen \u2014 Gr\u00F6\u00DFen-Upgrade, Beilagen, Getr\u00E4nke, Desserts. Erscheint automatisch im Bestellflow und steigert den Bon nachweislich um 20\u201330 %.",
      },
      {
        icon: Languages,
        title: "Mehrsprachiges Men\u00FC",
        description: "Deutsch, Englisch, Franz\u00F6sisch, Italienisch, T\u00FCrkisch, Spanisch und mehr \u2014 Gast w\u00E4hlt seine Sprache beim Start. Perfekt f\u00FCr Tourismus, Bahnh\u00F6fe, Flugh\u00E4fen, Innenstadtlagen.",
      },
      {
        icon: CreditCard,
        title: "Alle Zahlungsarten integriert",
        description: "EC-Karte, Visa, Mastercard, Apple Pay, Google Pay \u2014 direkt am Terminal. Bargeld-Modul auf Wunsch nachr\u00FCstbar. ZVT-konform an jedes Kartenger\u00E4t anbindbar.",
      },
      {
        icon: Clock,
        title: "24/7-Betrieb m\u00F6glich",
        description: "F\u00FCr Tankstellen-Bistros, Hotel-Lobbys oder unbemannte Selbstbedienung: Das Terminal nimmt Bestellungen rund um die Uhr an, auch wenn niemand an der Theke steht.",
      },
      {
        icon: Bell,
        title: "Live-Sync mit Kasse & K\u00FCche",
        description: "Jede Bestellung landet sofort in der Cloud-Kasse und auf dem K\u00FCchenmonitor. Pick-Up Screen ruft Bestellnummer auf. Kein Doppeleingeben, keine verlorenen Orders.",
      },
    ],
  },

  useCases: {
    headline: "So setzen Gastronomen den Self-Ordering Kiosk ein",
    sub: "Drei reale Szenarien aus unserem Kundenkreis \u2014 vom Schnellrestaurant bis zum Food Court.",
    items: [
      {
        icon: Pizza,
        title: "FastFood-Kette mit Mittagsstoss",
        story:
          "Ein Burger-Konzept in Berlin-Kreuzberg ersetzte zwei Kassenpl\u00E4tze durch vier Self-Ordering Kiosks. Die durchschnittliche Wartezeit fiel von 8 auf unter 4 Minuten \u2014 Mittagsumsatz stieg um 28 %, ohne zus\u00E4tzliches Personal.",
      },
      {
        icon: Coffee,
        title: "B\u00E4ckerei mit Take-Away",
        story:
          "Eine B\u00E4ckerei-Filiale am Hamburger Hauptbahnhof installierte zwei Kiosks neben der Theke. G\u00E4ste mit eiligem Take-Away-Bedarf bestellen am Terminal, Personal kann sich auf Beratung und belegte Br\u00F6tchen konzentrieren \u2014 +35 % Bestellungen pro Stunde.",
      },
      {
        icon: Utensils,
        title: "Food Court mit mehreren Konzepten",
        story:
          "Ein Betreiber mehrerer Food-Stationen in einem M\u00FCnchner Einkaufszentrum stellte vor jedem Stand ein Kiosk-Terminal auf. G\u00E4ste bestellen vorab, Bestellnummer erscheint auf dem Pick-Up Screen \u2014 Theke wurde komplett zur Ausgabestation, Personalkosten pro Schicht um 1,5 FTE gesenkt.",
      },
    ],
  },

  trust: {
    stats: [
      { value: "\u221250 %", label: "k\u00FCrzere Wartezeit pro Gast in der Rush Hour" },
      { value: "+25 %", label: "h\u00F6herer Durchschnittsbon durch aktives Upselling" },
      { value: "24/7", label: "Bestellungen ohne Personal an der Theke" },
    ],
    testimonial: {
      quote:
        "Wir hatten in der Mittagspause regelm\u00E4\u00DFig 15 Leute Schlange \u2014 viele sind wieder gegangen. Seit den vier Kiosks bedienen wir den gleichen Andrang in der halben Zeit, und der durchschnittliche Bon ist um 4,80 \u20AC gestiegen, weil das Terminal jedem ein Getr\u00E4nk und einen Nachtisch vorschl\u00E4gt. F\u00FCr meine Crew an der Theke der gr\u00F6\u00DFte Stress-Killer der letzten Jahre.",
      author: "Tarek B.",
      role: "Inhaber Burger-Restaurant, Berlin-Kreuzberg",
    },
  },

  pricing: {
    headline: "Preis & Verf\u00FCgbarkeit",
    price: "Auf Anfrage",
    note:
      "Kassen-Add-On f\u00FCr Schnellrestaurants, B\u00E4ckereien, Food Courts und Franchise-Konzepte. Der Preis h\u00E4ngt von Bauform (Counter, Freestanding, Wandmontage), Anzahl der Terminals, Kartenleser-Integration und optionalem Bargeld-Modul ab. In einer kostenlosen Beratung bauen wir das passende Setup f\u00FCr deinen Betrieb zusammen \u2014 inklusive Hardware, Montage, Konfiguration und Anbindung an deine Cloud-Kasse.",
  },

  internalLinks: {
    headline: "Funktioniert perfekt mit",
    intro:
      "Der Self-Ordering Kiosk entfaltet seine volle Wirkung als Teil des Gastro-Master-\u00D6kosystems \u2014 von der Bestellung am Terminal bis zur \u00DCbergabe an den Gast.",
    items: [
      {
        to: "/produkte/kassensystem",
        title: "Kassensystem",
        description:
          "Das Herzst\u00FCck. Jede Kiosk-Bestellung landet automatisch in der Cloud-Kasse, im K\u00FCchenmonitor und auf dem Pick-Up Screen \u2014 mit Bestellnummer, Artikeln und Sonderw\u00FCnschen.",
      },
      {
        to: "/loesungen/restaurant",
        title: "L\u00F6sung f\u00FCr Restaurants",
        description:
          "Komplettpaket aus Kasse, Self-Ordering, Bildschirmfunktion und K\u00FCchenmonitor \u2014 speziell f\u00FCr Schnellrestaurants, FastFood-Konzepte und Betriebe mit hohem Vor-Ort-Durchsatz.",
      },
    ],
  },

  faq: {
    headline: "H\u00E4ufige Fragen zum Self-Ordering Kiosk",
    sub: "Antworten auf die Fragen, die uns Schnellrestaurants, B\u00E4ckereien, Food Courts und Franchise-Betriebe aus Berlin, M\u00FCnchen, Hamburg, K\u00F6ln, Frankfurt und Stuttgart am h\u00E4ufigsten stellen.",
    items: [
      {
        q: "Was kostet ein Self-Ordering Kiosk f\u00FCr meinen Betrieb?",
        a: "Der Preis h\u00E4ngt von Bauform (Counter, Freestanding, Wandmontage), Anzahl der Terminals und gew\u00E4hlten Modulen (Kartenleser, optional Bargeld-Akzeptanz) ab. Weil Hardware, Halterung, Montage und Konfiguration individuell sind, bieten wir den Kiosk nicht als Listenpreis an, sondern erstellen nach einer kostenlosen Beratung ein konkretes Angebot. In den meisten Schnellrestaurants und B\u00E4ckereien amortisiert sich ein Kiosk innerhalb von 6\u201312 Monaten \u2014 \u00FCber Personalersparnis und h\u00F6heren Durchschnittsbon.",
      },
      {
        q: "F\u00FCr welche Betriebe lohnt sich ein Self-Ordering Kiosk?",
        a: "Besonders f\u00FCr Betriebe mit hohem Bestellaufkommen und kurzen Verweilzeiten: FastFood-Konzepte, Burger- und Pizza-Ketten, B\u00E4ckereien mit Mittagstisch, Cafes mit Take-Away, Food Courts, Franchise-Systeme, Tankstellen-Bistros, Hotel-Lobbys. Faustregel: Ab 80\u2013100 Bestellungen pro Tag oder regelm\u00E4\u00DFigen Stosszeiten mit Warteschlange amortisiert sich der erste Kiosk schnell.",
      },
      {
        q: "Wie viele Kiosks brauche ich f\u00FCr meinen Betrieb?",
        a: "Faustregel: Ein Kiosk ersetzt etwa eine Kassenkraft zu Sto\u00DFzeiten. F\u00FCr ein Schnellrestaurant mit 60\u201380 Sitzpl\u00E4tzen empfehlen wir 2\u20133 Terminals, f\u00FCr eine B\u00E4ckerei-Filiale mit Mittagsgesch\u00E4ft 1\u20132 Terminals, f\u00FCr einen Food-Court-Stand mit Pick-Up 1 Terminal pro Konzept. Die genaue Anzahl kl\u00E4ren wir nach Sichtung deiner Tagesumsatz-Verteilung in der Beratung.",
      },
      {
        q: "Welche Bauformen gibt es?",
        a: "Drei Hauptvarianten: Counter (Aufstellterminal f\u00FCr Theke oder Tresen, kompakt), Freestanding (bodenstehende S\u00E4ule mit gro\u00DFem Display, ideal f\u00FCr Eingangsbereich oder Mittelinsel) und Wandmontage (platzsparend, perfekt f\u00FCr enge Verkaufsfl\u00E4chen wie B\u00E4ckereien). Alle Bauformen sind mit Kartenleser ausgestattet, Bargeld-Modul optional.",
      },
      {
        q: "Welche Zahlungsarten unterst\u00FCtzt das Terminal?",
        a: "EC-Karte (girocard), Visa, Mastercard, American Express, Apple Pay und Google Pay sind standardm\u00E4\u00DFig integriert. Optional ist ein Bargeld-Modul mit Wechselgeld-Ausgabe verf\u00FCgbar \u2014 sinnvoll f\u00FCr Betriebe mit hohem Bargeldanteil. Die Anbindung erfolgt \u00FCber den ZVT-Standard, kompatibel mit allen g\u00E4ngigen Kartenger\u00E4ten ohne Anbieterzwang.",
      },
      {
        q: "Wie funktioniert das Upselling am Kiosk genau?",
        a: "Pro Artikel kannst du im Backoffice passende Empfehlungen hinterlegen \u2014 zum Burger eine gr\u00F6\u00DFere Pommes, dazu ein Getr\u00E4nk, am Ende ein Dessert. Der Kiosk zeigt diese Vorschl\u00E4ge im Bestellflow automatisch an. Im Branchenschnitt steigert das den Durchschnittsbon um 20\u201330 % \u2014 ohne dass Personal aktiv verkaufen muss. Du behaltst dabei jederzeit die volle Kontrolle, was wann angeboten wird.",
      },
      {
        q: "Welche Sprachen unterst\u00FCtzt das Kiosk-Men\u00FC?",
        a: "Standardm\u00E4\u00DFig Deutsch, Englisch, Franz\u00F6sisch, Italienisch, Spanisch und T\u00FCrkisch. Weitere Sprachen wie Polnisch, Russisch, Niederl\u00E4ndisch oder Arabisch k\u00F6nnen wir auf Wunsch erg\u00E4nzen. Der Gast w\u00E4hlt seine Sprache beim Start mit einem Tipp \u2014 das senkt Bestellfehler und macht den Kiosk besonders wertvoll an touristischen Standorten, Bahnh\u00F6fen, Flugh\u00E4fen und in Innenstadtlagen.",
      },
      {
        q: "Wird der Kiosk an mein Kassensystem angebunden?",
        a: "Wenn du bereits ein Gastro-Master-Kassensystem nutzt, ist der Kiosk sofort einsatzbereit. Bestellungen aus dem Terminal landen automatisch in der Cloud-Kasse, auf dem K\u00FCchenmonitor und auf dem Pick-Up Screen \u2014 mit Bestellnummer, Artikeln, Sonderw\u00FCnschen und Zahlstatus. Kein separates Setup, keine Drittanbieter-Schnittstelle, keine Entwickler notwendig.",
      },
      {
        q: "Ist der Kiosk barrierefrei und f\u00FCr \u00E4ltere G\u00E4ste geeignet?",
        a: "Ja. Die Bedienoberfl\u00E4che arbeitet mit gro\u00DFen Buttons, klaren Produktbildern und einfacher Sprache \u2014 keine versteckten Men\u00FCs, keine kleinen Schriften. Die Bildschirmh\u00F6he l\u00E4sst sich auf Wunsch absenken (Wheelchair-Mode), die Touch-Empfindlichkeit ist auch f\u00FCr H\u00E4nde mit reduzierter Feinmotorik geeignet. F\u00FCr Inklusivit\u00E4t k\u00F6nnen wir auf Anfrage ein Sprachausgabe-Modul erg\u00E4nzen.",
      },
      {
        q: "Was passiert bei einem Internet- oder Stromausfall?",
        a: "Bei kurzzeitigem Internetausfall l\u00E4uft das Terminal im Offline-Modus weiter \u2014 Bestellungen werden lokal zwischengespeichert und synchronisieren sich mit Kasse und K\u00FCche, sobald die Verbindung zur\u00FCck ist. Bei Stromausfall startet das Display nach Wiederherstellung automatisch neu und l\u00E4dt den letzten Zustand aus der Cloud. Kartenzahlungen sind in dieser Zeit eingeschr\u00E4nkt, Bargeldzahlung (sofern Modul vorhanden) bleibt m\u00F6glich.",
      },
    ],
  },
};

const KioskPage = () => <AddOnPageTemplate config={config} />;

export default KioskPage;
