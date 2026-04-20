import {
  Monitor, ChefHat, Bell, RefreshCw, Palette, Clock,
  AlertTriangle, FileText, Users, Timer,
  Utensils, Pizza, Coffee,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import heroImage from "@/assets/addons/pickup-screen.jpeg";

const config: AddOnPageConfig = {
  meta: {
    title: "Bildschirmfunktion für Gastronomie — Küchenmonitor & Pick-Up Screen | Gastro Master",
    description:
      "Bildschirmfunktion von Gastro Master: Pick-Up Screen für Gäste und Küchenmonitor fürs Team. Alle Bestellungen in Echtzeit, farblich priorisiert, ohne Papierchaos. Für Schnellrestaurants, Lieferdienste, Cafes und Bäckereien in Berlin, München, Hamburg, Frankfurt.",
    canonical: "https://gastro-master.de/add-ons/bildschirmfunktion",
    breadcrumb: { name: "Bildschirmfunktion", path: "/add-ons/bildschirmfunktion" },
    ctaPath: "/add-ons/bildschirmfunktion",
  },

  hero: {
    badge: "Add-On \u00B7 K\u00FCchenmonitor & Pick-Up Screen",
    headline: "Bildschirmfunktion \u2014 K\u00FCche und Theke immer im Bild",
    subline:
      "Zwei Displays, ein Ziel: volle \u00DCbersicht. Der Pick-Up Screen zeigt Abholkunden ihre Bestellnummer in Echtzeit, der K\u00FCchenmonitor priorisiert alle offenen Bestellungen nach Zeit und Kategorie. Keine Zettel, keine Bons, keine vergessenen Orders.",
    heroImage,
    heroImageRounded: true,
  },

  problemSolution: {
    problem: {
      title: "Das Problem bei vielen Bestellungen",
      points: [
        { icon: AlertTriangle, text: "Zu Sto\u00DFzeiten verliert die K\u00FCche die \u00DCbersicht \u2014 Bons stapeln sich, Sonderw\u00FCnsche gehen unter, G\u00E4ste warten unn\u00F6tig lang." },
        { icon: FileText, text: "Papier-Bons flattern weg, werden feucht, verbl\u00E4ttern sich \u2014 und keiner wei\u00DF mehr, welche Bestellung zuerst fertig sein muss." },
        { icon: Users, text: "Abholkunden fragen dauernd \u201EIst meine Bestellung fertig?\u201C \u2014 Personal muss st\u00E4ndig abgleichen, statt zu produzieren oder zu kassieren." },
        { icon: Clock, text: "Ohne klare Priorisierung landen 20-Minuten-Gerichte neben 3-Minuten-Snacks \u2014 alles wird gleichzeitig fertig oder gar nicht." },
      ],
    },
    solution: {
      title: "Die L\u00F6sung: Bildschirmfunktion",
      points: [
        { icon: ChefHat, text: "Der K\u00FCchenmonitor zeigt jede Bestellung sofort mit Tischnummer, Artikeln, Sonderw\u00FCnschen und Zeit \u2014 farblich kategorisiert nach Warengruppe." },
        { icon: Bell, text: "Der Pick-Up Screen ruft Abholkunden per Bestellnummer auf. G\u00E4ste schauen selbst \u2014 Personal muss nicht mehr rufen oder suchen." },
        { icon: Timer, text: "Priorisierung nach Bestellzeit: \u00C4lteste Bestellung oben, rote Markierung bei drohender Verz\u00F6gerung. Kein Gericht wird mehr vergessen." },
        { icon: RefreshCw, text: "Auto-Refresh in Echtzeit. Jede neue Bestellung aus Kasse, Webshop, App oder QR-Code Tischsystem erscheint sofort \u2014 ohne Knopfdruck." },
      ],
    },
  },

  features: {
    headline: "Alles drin f\u00FCr K\u00FCche und Theke, die nichts mehr \u00FCbersehen",
    sub: "Sechs Funktionen, die Bons ersetzen und aus Chaos Taktung machen.",
    items: [
      {
        icon: ChefHat,
        title: "K\u00FCchenmonitor",
        description: "Alle offenen Bestellungen im Blick \u2014 mit Tischnummer, Artikeln, Sonderw\u00FCnschen, Uhrzeit und Status. Mit einem Tipp als \u201Efertig\u201C markieren.",
      },
      {
        icon: Bell,
        title: "Pick-Up Screen f\u00FCr G\u00E4ste",
        description: "Gro\u00DFes Display im Abholbereich zeigt Bestellnummern \u2014 \u201EIn Arbeit\u201C vs. \u201EAbholbereit\u201C. G\u00E4ste sehen selbst, wann sie dran sind.",
      },
      {
        icon: Palette,
        title: "Farbliche Kategorisierung",
        description: "Pizza rot, Salat gr\u00FCn, Getr\u00E4nke blau \u2014 jede Warengruppe hat ihre Farbe. Einzelne Stationen sehen auf einen Blick, was f\u00FCr sie zu tun ist.",
      },
      {
        icon: Timer,
        title: "Priorisierung nach Zeit",
        description: "\u00C4lteste Bestellung zuerst. Automatische Warnung per Farbe, wenn eine Bestellung zu lange offen ist \u2014 kein verlorenes Gericht, kein genervter Gast.",
      },
      {
        icon: RefreshCw,
        title: "Auto-Refresh & Live-Sync",
        description: "Jede Bestellung aus Kasse, Webshop, App, Lieferdienst oder QR-Code Tischsystem landet sofort auf dem Bildschirm. Keine Verz\u00F6gerung, keine Aktualisierung n\u00F6tig.",
      },
      {
        icon: Monitor,
        title: "Counter, Freestanding & Outdoor",
        description: "Drei Bauformen f\u00FCr jeden Einsatzort \u2014 Thekenaufsteller, freistehendes Display oder wetterfestes Outdoor-Modell f\u00FCr Drive-In und Biergarten.",
      },
    ],
  },

  useCases: {
    headline: "So setzen Gastronomen die Bildschirmfunktion ein",
    sub: "Drei reale Szenarien aus unserem Kundenkreis \u2014 vom Schnellrestaurant bis zur Stadt-B\u00E4ckerei mit Drive-In.",
    items: [
      {
        icon: Pizza,
        title: "Schnellrestaurant mit Lieferdienst",
        story:
          "Eine Pizzeria in Hamburg mit Abholung, Lieferung und Gastraum verarbeitet zu Sto\u00DFzeiten 60 Bestellungen pro Stunde. Seit Einf\u00FChrung des K\u00FCchenmonitors werden pro Tag 20 % mehr Bestellungen produziert \u2014 bei gleichem K\u00FCchenteam.",
      },
      {
        icon: Coffee,
        title: "B\u00E4ckerei mit Counter-Abholung",
        story:
          "Eine B\u00E4ckerei-Kette in K\u00F6ln nutzt Pick-Up Screens im Abholbereich. Kunden bestellen per App, holen w\u00E4hrend der Mittagspause ab und sehen ihre Nummer auf dem Display \u2014 Warteschlangen an der Theke sind um 40 % geschrumpft.",
      },
      {
        icon: Utensils,
        title: "Food Court mit mehreren Stationen",
        story:
          "Ein Betreiber mehrerer Food-Konzepte in einem M\u00FCnchner Einkaufszentrum setzt Outdoor-Monitore vor jedem Stand ein. G\u00E4ste sehen auf einen Blick, wo ihre Bestellung steht \u2014 Personalanfragen pro Schicht sind von 80 auf unter 15 gefallen.",
      },
    ],
  },

  trust: {
    stats: [
      { value: "+20 %", label: "mehr Bestellungen pro Schicht bei gleicher K\u00FCchenbesetzung" },
      { value: "\u221240 %", label: "weniger Warteschlangen im Abholbereich" },
      { value: "0 Bons", label: "kein Papier, keine verlorenen Bestellungen mehr" },
    ],
    testimonial: {
      quote:
        "Am Samstagabend produzieren wir 80 Pizzen pro Stunde. Ohne den K\u00FCchenmonitor w\u00E4re das undenkbar \u2014 fr\u00FCher haben wir st\u00E4ndig Bons verloren oder Bestellungen doppelt gemacht. Jetzt steht jede Order in ihrer Farbe, mit Zeit und Priorit\u00E4t. Meine K\u00F6che lieben es, meine G\u00E4ste warten weniger.",
      author: "Marco D.",
      role: "Inhaber Pizzeria, Hamburg-Altona",
    },
  },

  pricing: {
    headline: "Preis & Verf\u00FCgbarkeit",
    price: "Auf Anfrage",
    note:
      "Kassen-Add-On f\u00FCr Restaurants, Lieferdienste, B\u00E4ckereien und Food Courts. Der Preis h\u00E4ngt von Bauform und Anzahl der Bildschirme ab \u2014 Counter, Freestanding oder Outdoor. In einer kostenlosen Beratung bauen wir das passende Setup f\u00FCr deinen Betrieb zusammen und nennen dir den Fixpreis inklusive Montage.",
  },

  internalLinks: {
    headline: "Funktioniert perfekt mit",
    intro:
      "Die Bildschirmfunktion entfaltet ihre volle Wirkung als Teil des Gastro-Master-\u00D6kosystems \u2014 von der Bestellung bis zur \u00DCbergabe an den Gast.",
    items: [
      {
        to: "/produkte/kassensystem",
        title: "Kassensystem",
        description:
          "Das Herzst\u00FCck. Jede Bestellung aus Kasse, Webshop, App oder QR-Code landet automatisch auf dem K\u00FCchenmonitor \u2014 mit Tischnummer, Artikeln und Sonderw\u00FCnschen.",
      },
      {
        to: "/loesungen/restaurant",
        title: "L\u00F6sung f\u00FCr Restaurants",
        description:
          "Komplettpaket aus Kasse, Tischverwaltung, Bildschirmfunktion und QR-Bestellung \u2014 speziell f\u00FCr Restaurants, Cafes und Bars mit hohem Bestellaufkommen.",
      },
    ],
  },

  faq: {
    headline: "H\u00E4ufige Fragen zur Bildschirmfunktion",
    sub: "Antworten auf die Fragen, die uns Restaurants, Lieferdienste, B\u00E4ckereien und Food Courts aus Berlin, M\u00FCnchen, Hamburg, K\u00F6ln, Frankfurt und Stuttgart am h\u00E4ufigsten stellen.",
    items: [
      {
        q: "Was kostet die Bildschirmfunktion f\u00FCr meinen Betrieb?",
        a: "Der Preis h\u00E4ngt von der Bauform (Counter, Freestanding, Outdoor) und der Anzahl der Bildschirme ab. Weil Hardware, Halterung und Montage individuell sind, bieten wir die Bildschirmfunktion nicht als Listenpreis an, sondern erstellen nach einer kostenlosen Beratung ein konkretes Angebot. In vielen Betrieben amortisiert sich das Setup innerhalb von 3\u20136 Monaten \u00FCber Zeit- und Personalersparnis.",
      },
      {
        q: "Was ist der Unterschied zwischen Pick-Up Screen und K\u00FCchenmonitor?",
        a: "Der K\u00FCchenmonitor h\u00E4ngt in der K\u00FCche oder an der Theke und zeigt dem Team alle offenen Bestellungen mit Tischnummer, Artikeln, Sonderw\u00FCnschen und Zeit. Der Pick-Up Screen h\u00E4ngt im Gastbereich oder am Abholtresen und zeigt Abholkunden ihre Bestellnummer und den Status \u2014 \u201EIn Arbeit\u201C oder \u201EAbholbereit\u201C. Beide Bildschirme lassen sich einzeln oder kombiniert einsetzen.",
      },
      {
        q: "Welche Bauformen gibt es?",
        a: "Drei: Counter (zum Aufstellen auf Theke oder Tresen, schmal und kompakt), Freestanding (bodenstehendes Display, ideal f\u00FCr Abholbereiche und Food Courts) und Outdoor (wetterfest, f\u00FCr Drive-In, Biergarten oder Terrasse). Wir beraten dich zum passenden Modell f\u00FCr deinen Betrieb.",
      },
      {
        q: "Wie werden die Bildschirme mit meinem Kassensystem verbunden?",
        a: "Wenn du bereits ein Gastro-Master-Kassensystem nutzt, sind die Bildschirme sofort einsatzbereit. Bestellungen aus Kasse, Webshop, App, Lieferdienst oder QR-Code Tischsystem landen automatisch in Echtzeit auf dem K\u00FCchenmonitor und Pick-Up Screen. Kein separates Setup, keine Drittanbieter, keine Entwickler notwendig.",
      },
      {
        q: "Wie funktioniert die Priorisierung nach Zeit?",
        a: "Jede Bestellung erh\u00E4lt beim Eingang einen Zeitstempel. Auf dem K\u00FCchenmonitor erscheinen sie nach Alter sortiert \u2014 die \u00E4lteste oben. Je l\u00E4nger eine Bestellung offen ist, desto st\u00E4rker wird sie farblich hervorgehoben (Gelb, dann Rot). So sieht die K\u00FCche sofort, welche Bestellung drohend zu kippen ist, und kann gegensteuern, bevor ein Gast beschwert wird.",
      },
      {
        q: "Welche Warengruppen werden farblich kategorisiert?",
        a: "Die Farben sind frei konfigurierbar \u2014 typischerweise eine Farbe pro Station: Warme K\u00FCche, Kalte K\u00FCche, Pizza, Getr\u00E4nke, Desserts, Beilagen. Jede Station sieht auf einen Blick, was f\u00FCr sie ansteht, und kann ihre Artikel direkt als \u201Efertig\u201C markieren \u2014 ohne dass der Rest der K\u00FCche abgeglichen werden muss.",
      },
      {
        q: "F\u00FCr welche Betriebe lohnt sich die Bildschirmfunktion?",
        a: "F\u00FCr alle Betriebe mit hohem Bestellaufkommen oder mehreren K\u00FCchenstationen: Schnellrestaurants, Pizzerien, Burgerl\u00E4den, Lieferdienste, Food Courts, B\u00E4ckereien mit Mittagstisch, Cafes mit Take-Away, Drive-Ins. Besonders wirksam ab 50 Bestellungen pro Tag oder wenn es mehrere Bestellkan\u00E4le parallel gibt (Theke, App, Webshop, Lieferdienst).",
      },
      {
        q: "Ersetzt der Pick-Up Screen den Personalkontakt mit dem Gast?",
        a: "Nein \u2014 er entlastet ihn. G\u00E4ste schauen selbst auf den Screen und sehen, ob ihre Bestellung fertig ist. Personal muss nicht mehr rufen oder suchen und hat Zeit f\u00FCr Beratung, neue Bestellungen oder das Einpacken. Die pers\u00F6nliche \u00DCbergabe bleibt \u2014 sie wird nur effizienter.",
      },
      {
        q: "Kann ich Bildschirme nachtr\u00E4glich erweitern, wenn mein Betrieb w\u00E4chst?",
        a: "Ja. Du kannst jederzeit weitere K\u00FCchenmonitore oder Pick-Up Screens erg\u00E4nzen \u2014 zum Beispiel wenn du einen zweiten Standort er\u00F6ffnest, einen Drive-In hinzuf\u00FCgst oder eine neue Station in der K\u00FCche einrichtest. Alle Bildschirme sind zentral im Backoffice konfigurierbar.",
      },
      {
        q: "Was passiert bei einem Internet- oder Stromausfall?",
        a: "Die Bildschirme sind mit Ausfallsicherung ausgestattet. Bei kurzzeitigem Internetausfall l\u00E4uft das aktuelle Bestellbild weiter, neue Bestellungen werden in der Kasse zwischengespeichert und synchronisieren sich sofort wieder, sobald die Verbindung zur\u00FCck ist. Bei Stromausfall startet das Display nach Wiederherstellung automatisch und l\u00E4dt den letzten Zustand aus der Kasse neu.",
      },
    ],
  },
};

const BildschirmfunktionPage = () => <AddOnPageTemplate config={config} />;

export default BildschirmfunktionPage;
