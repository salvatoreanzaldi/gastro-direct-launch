import {
  MapPin, Navigation, Bell, WifiOff, Route, Clock,
  Search, AlertTriangle, PhoneOff, Printer,
  Pizza, Truck, Bike, TrendingUp, Smartphone, Users,
} from "lucide-react";
import AddOnPageTemplate, { type AddOnPageConfig } from "@/components/addon/AddOnPageTemplate";
import heroImage from "@/assets/addons/addon-frankfurt.png";
import appleIcon from "@/assets/Icons/Icon - Apple App Store.png";
import googleIcon from "@/assets/Icons/Icon - Google Play Store.png";

const config: AddOnPageConfig = {
  meta: {
    title: "Fahrer-App mit GPS für Lieferdienste — Live-Tracking & Routenplanung | Gastro Master",
    description:
      "Die Fahrer-App von Gastro Master: Live-GPS-Tracking, Routen-Optimierung, Push-Benachrichtigungen und Offline-Modus. Für Pizzerien, Lieferdienste & Restaurants in Berlin, München, Hamburg, Frankfurt. Spart bis zu 2 Stunden pro Fahrer und Tag.",
    canonical: "https://gastro-master.de/add-ons/fahrer-app-gps",
    breadcrumb: { name: "Fahrer-App mit GPS", path: "/add-ons/fahrer-app-gps" },
    ctaPath: "/add-ons/fahrer-app-gps",
  },

  hero: {
    badge: "Add-On · Lieferdienst",
    headline: "Fahrer-App mit GPS — jede Lieferung live auf der Karte",
    subline:
      "Live-GPS-Tracking, optimierte Routen und Push-Benachrichtigungen in einer App. Dein Team liefert schneller, deine Kunden sehen den Fahrer in Echtzeit \u2014 und du sparst bis zu 2 Stunden pro Fahrer und Tag.",
    heroImage,
  },

  problemSolution: {
    problem: {
      title: "Das Problem klassischer Lieferdienste",
      points: [
        { icon: Search, text: "Fahrer suchen sich Routen selbst \u2014 Umwege, doppelte Strecken, kalte Pizza beim Kunden." },
        { icon: AlertTriangle, text: "Kein Live-Tracking: Kunden rufen alle 10 Minuten an, \u201EWo bleibt meine Bestellung?\u201C" },
        { icon: PhoneOff, text: "Funklochproblem \u2014 Fahrer verlieren Aufträge, weil die App offline nicht funktioniert." },
        { icon: Printer, text: "Disposition per Zettel oder WhatsApp. Fehler, Missverständnisse, verlorene Bestellungen." },
      ],
    },
    solution: {
      title: "Die Lösung: Fahrer-App mit GPS",
      points: [
        { icon: Route, text: "Automatische Routenplanung \u2014 die App bündelt Bestellungen und optimiert die Reihenfolge." },
        { icon: MapPin, text: "Kunde sieht den Fahrer live auf der Karte. Keine Nachfragen, weniger Support-Aufwand." },
        { icon: WifiOff, text: "Offline-Modus mit automatischer Synchronisation \u2014 auch im Keller oder Tiefgaragen-Umfeld." },
        { icon: Bell, text: "Push-Benachrichtigungen für Fahrer: Neue Bestellung, Adress-Änderung, Abholbereit \u2014 in Echtzeit." },
      ],
    },
  },

  features: {
    headline: "Alles drin für einen Lieferdienst, der wirklich skaliert",
    sub: "Sechs Funktionen, die aus deinem Team einen durchgetakteten Liefer-Apparat machen.",
    items: [
      {
        icon: MapPin,
        title: "Live-GPS-Tracking",
        description: "Jeder Fahrer in Echtzeit auf der Karte \u2014 für Disposition, Kunde und Auswertung. Genauigkeit auf wenige Meter.",
      },
      {
        icon: Route,
        title: "Routen-Optimierung",
        description: "Mehrere Bestellungen werden automatisch nach Richtung gebündelt. Bis zu 30 % weniger Kilometer pro Tour.",
      },
      {
        icon: Bell,
        title: "Push-Benachrichtigungen",
        description: "Neuer Auftrag, Adress-Änderung, dringende Abholung \u2014 Fahrer wird sofort informiert, auch bei gesperrtem Bildschirm.",
      },
      {
        icon: WifiOff,
        title: "Offline-Modus",
        description: "App funktioniert auch ohne Empfang. Alles wird lokal gespeichert und synchronisiert, sobald das Signal zurück ist.",
      },
      {
        icon: Navigation,
        title: "Turn-by-Turn Navigation",
        description: "Eingebaute Navigation mit Apple Maps, Google Maps oder Waze \u2014 Fahrer wählt seine bevorzugte App mit einem Tap.",
      },
      {
        icon: Users,
        title: "Multi-Fahrer-Disposition",
        description: "Dispatcher sieht alle Fahrer, ihre Routen und Auslastung auf einem Dashboard. Aufträge per Drag & Drop zuweisen.",
      },
    ],
  },

  useCases: {
    headline: "So setzen Gastronomen die Fahrer-App ein",
    sub: "Drei reale Szenarien aus unserem Kundenkreis \u2014 vom Familien-Lieferdienst bis zur Multi-Standort-Kette.",
    items: [
      {
        icon: Pizza,
        title: "Pizzeria mit 3 Fahrern",
        story:
          "Eine Münchner Pizzeria ersetzt WhatsApp-Dispatch durch die Fahrer-App. Ergebnis: 20 % mehr Bestellungen pro Abend \u2014 weil Fahrer effizientere Touren fahren und Kunden weniger stornieren.",
      },
      {
        icon: Truck,
        title: "Lieferdienst-Kette mit 4 Filialen",
        story:
          "Eine Burger-Kette in NRW schaltet alle 12 Fahrer an einem zentralen Dashboard. Wenn ein Standort überlastet ist, übernimmt der nächste automatisch \u2014 Wartezeit pro Bestellung sank von 42 auf 28 Minuten.",
      },
      {
        icon: Bike,
        title: "Fahrrad-Kurier im Innenstadtbereich",
        story:
          "Ein Veggie-Lieferdienst in Berlin-Mitte fährt mit E-Bikes. Die GPS-App optimiert Routen nach Fahrradwegen \u2014 Fahrer schaffen 6 statt 4 Lieferungen pro Stunde, ohne gestresst zu sein.",
      },
    ],
  },

  trust: {
    stats: [
      { value: "2 h", label: "Zeitersparnis pro Fahrer und Tag" },
      { value: "\u221230 %", label: "weniger gefahrene Kilometer dank Routen-Bündelung" },
      { value: "98 %", label: "der Kunden nutzen das Live-Tracking statt Rückruf" },
    ],
    testimonial: {
      quote:
        "Früher haben wir ständig Anrufe bekommen \u2014 \u201EWo ist der Fahrer?\u201C. Seit wir das Live-GPS haben, ist das Telefon ruhig, die Kunden zufriedener und die Fahrer entspannter.",
      author: "Luca B.",
      role: "Inhaber Pizzeria-Kette, Frankfurt",
    },
  },

  pricing: {
    headline: "Preis & Verfügbarkeit",
    price: "+10 \u20AC / Monat pro Fahrer",
    note:
      "Kassen-Add-On f\u00FCr Betriebe mit eigenem Lieferdienst. Abgerechnet pro aktivem Fahrer-Account und Monat, zzgl. MwSt. Inklusive Echtzeit-GPS-Tracking, automatischer Routenoptimierung und Dispositions\u00FCbersicht direkt im Kassensystem \u2014 ohne Gebühren pro Lieferung oder gefahrenem Kilometer.",
  },

  appDownload: {
    appName: "GastroMaster Fahrer",
    headline: "Fahrer-App jetzt kostenlos laden",
    sub: "Die App läuft auf jedem iOS- und Android-Smartphone \u2014 kein neues Gerät nötig. Einloggen, Route sehen, losfahren.",
    links: [
      {
        href: "https://apps.apple.com/de/app/gastromaster-fahrer/id6752778549",
        iconSrc: appleIcon,
        alt: "GastroMaster Fahrer im Apple App Store laden",
      },
      {
        href: "https://play.google.com/store/apps/details?id=com.epitglobal.GastroMasterFahrer&hl=de",
        iconSrc: googleIcon,
        alt: "GastroMaster Fahrer bei Google Play laden",
      },
    ],
  },

  internalLinks: {
    headline: "Funktioniert perfekt mit",
    intro:
      "Die Fahrer-App entfaltet ihre volle Wirkung als Teil des Gastro-Master-Ökosystems \u2014 vom ersten Click bis zur Übergabe an der Haustür.",
    items: [
      {
        to: "/produkte/kassensystem",
        title: "Kassensystem",
        description:
          "Bestellung geht direkt vom Kassensystem in die Fahrer-App \u2014 ohne manuelles Zuweisen, ohne Zettelwirtschaft.",
      },
      {
        to: "/loesungen/lieferdienst",
        title: "Lösung für Lieferdienste",
        description:
          "Komplettpaket aus Webshop, Kasse, Fahrer-App und Dispatcher-Dashboard \u2014 speziell für Pizza-, Sushi- und Burger-Lieferdienste.",
      },
    ],
  },

  faq: {
    headline: "Häufige Fragen zur Fahrer-App mit GPS",
    sub: "Antworten auf die Fragen, die uns Lieferdienste aus Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart und dem gesamten DACH-Raum am häufigsten stellen.",
    items: [
      {
        q: "Was kostet die Fahrer-App für mein Restaurant?",
        a: "Die Fahrer-App mit GPS ist ein Kassen-Add-On und kostet 10 \u20AC pro Monat und aktivem Fahrer (zzgl. MwSt.). Inklusive Echtzeit-GPS-Tracking, automatischer Routenoptimierung und Dispositionsübersicht direkt im Kassensystem. Es fallen keine zusätzlichen Gebühren pro Lieferung oder pro gefahrenem Kilometer an \u2014 du zahlst ausschließlich für tatsächlich aktive Fahrer.",
      },
      {
        q: "Auf welchen Geräten läuft die Fahrer-App?",
        a: "Die App \u201EGastroMaster Fahrer\u201C läuft auf allen aktuellen iOS- und Android-Smartphones. Kein spezielles Gerät nötig \u2014 die Fahrer können ihr privates Handy nutzen. Empfohlen wird iOS 14+ oder Android 9+, damit GPS-Tracking und Push-Benachrichtigungen zuverlässig funktionieren.",
      },
      {
        q: "Funktioniert die Fahrer-App auch ohne Internet?",
        a: "Ja. Die App hat einen Offline-Modus: Aufträge, Adressen und Routen werden lokal gespeichert. Sobald der Fahrer wieder Empfang hat, synchronisiert sich alles automatisch im Hintergrund. So gehen auch in Tiefgaragen, Kellern oder auf dem Land keine Bestellungen verloren.",
      },
      {
        q: "Wie genau ist das GPS-Tracking?",
        a: "Das Live-GPS ist auf wenige Meter genau und aktualisiert die Fahrerposition alle 5\u201315 Sekunden (abhängig von Netzqualität und Batterie-Einstellung). Kunden sehen einen flüssigen Live-Marker auf der Karte \u2014 ähnlich wie bei Uber oder Lieferando, aber ohne Provision.",
      },
      {
        q: "Kann ich mehrere Fahrer gleichzeitig koordinieren?",
        a: "Ja. Das Dispatcher-Dashboard zeigt alle aktiven Fahrer mit Position, aktuellem Auftrag und Auslastung auf einem Bildschirm. Neue Bestellungen können per Drag & Drop zugewiesen oder vom System automatisch an den optimalen Fahrer verteilt werden.",
      },
      {
        q: "Wie funktioniert die automatische Routen-Optimierung?",
        a: "Das System bündelt eingehende Bestellungen nach geografischer Nähe und berechnet die optimale Reihenfolge. Der Fahrer bekommt eine fertige Tour mit 2\u20135 Stopps \u2014 das spart bis zu 30 % Fahrtzeit pro Tour und senkt Sprit- bzw. Strom-Kosten deutlich.",
      },
      {
        q: "Sieht der Kunde den Fahrer in Echtzeit?",
        a: "Ja. Sobald die Bestellung unterwegs ist, bekommt der Kunde einen Tracking-Link per SMS oder E-Mail. Dort sieht er den Fahrer live auf der Karte, die geschätzte Ankunftszeit und erhält automatisch eine Benachrichtigung, wenn der Fahrer in der Nähe ist.",
      },
      {
        q: "Wie wird die Fahrer-App mit meinem Kassensystem verbunden?",
        a: "Wenn du bereits ein Gastro-Master-Kassensystem nutzt, ist die Fahrer-App sofort einsatzbereit \u2014 Bestellungen landen automatisch in der App, sobald sie an der Kasse als \u201ELieferung\u201C markiert werden. Kein separates Setup, keine Integration, keine Entwickler notwendig.",
      },
      {
        q: "Kann ich sehen, wie viele Kilometer meine Fahrer gefahren sind?",
        a: "Ja. Im Dispatcher-Dashboard findest du detaillierte Auswertungen pro Fahrer, pro Schicht und pro Lieferung: Kilometer, Fahrtzeit, Anzahl Lieferungen, Durchschnittsgeschwindigkeit und pünktliche Zustellung in Prozent. Ideal für Abrechnung, Bonus-Systeme und Kostenkontrolle.",
      },
      {
        q: "Ist die Nutzung der App DSGVO-konform?",
        a: "Ja. Die Fahrer-App ist vollständig DSGVO-konform. Standortdaten werden nur während aktiver Schichten erfasst, nach Schichtende gelöscht oder anonymisiert, und Fahrer können jederzeit Auskunft über ihre gespeicherten Daten verlangen. Datenverarbeitung erfolgt auf deutschen Servern.",
      },
    ],
  },
};

const FahrerAppGpsPage = () => <AddOnPageTemplate config={config} />;

export default FahrerAppGpsPage;
