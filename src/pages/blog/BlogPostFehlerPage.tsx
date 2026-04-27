import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { MapPin, Smartphone, Calculator, Users, Megaphone, CheckCircle2 } from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const POST_META = {
  title: "5 Fehler beim Eröffnen eines Lieferdienstes (und wie du sie vermeidest)",
  description:
    "Von falscher Standortwahl bis fehlendem Bestellsystem: Diese Fehler kosten Gründer Monate und Tausende Euro.",
  category: "How-to",
  readingTime: "8 min",
  publishDate: "20. April 2026",
  slug: "5-fehler-lieferdienst-eroffnen",
};

const FEHLER = [
  {
    nummer: "01",
    Icon: MapPin,
    title: "Standortwahl nach Bauchgefühl statt nach Daten",
    problem:
      "Viele Gründer wählen ihren Standort, weil die Miete günstig ist oder sie das Viertel mögen. Dabei entscheidet die Lieferdichte des Gebiets über alles: Wer in einem dünner besiedelten Stadtrand eröffnet, hat zu große Lieferradien und zu wenige Bestellungen pro Stunde.",
    loesung:
      "Analysiere vor der Unterschrift das Bestellvolumen in deinem Zielgebiet. Schau dir Google Maps-Bewertungen anderer Lieferdienste in der Umgebung an, zähle Wohneinheiten im Radius und prüfe, ob Konkurrenten die Zone bereits aufgegeben haben — das sagt oft mehr als jede Marktanalyse.",
    tipp: "Ein Lieferradius von 3–5 km ist ideal. Mehr bedeutet zu lange Lieferzeiten und kalte Pizza.",
  },
  {
    nummer: "02",
    Icon: Calculator,
    title: "Preise ohne vollständige Kostenkalkulation setzen",
    problem:
      "Der häufigste Anfängerfehler: Preise werden so gesetzt, dass sie 'wettbewerbsfähig' wirken — ohne je ausgerechnet zu haben, ob sie auch profitabel sind. Lebensmittelkosten (30–35 %), Verpackung (2–5 %), Lieferung (4–8 € pro Bestellung), Plattformprovisionen (bis 30 %) und Betriebskosten summieren sich schnell auf 70–80 % des Umsatzes.",
    loesung:
      "Rechne jeden Artikel durch: Was kostet er in der Herstellung? Wie viel Provision fällt an? Welche Verpackung brauchst du? Erst wenn du diese Zahlen kennst, setzt du den Verkaufspreis. Eine Kalkulations-Tabelle hilft dabei mehr als jedes Bauchgefühl.",
    tipp: "Ziele auf einen Rohertrag von mindestens 65 % je Gericht — alles darunter macht es schwer, profitabel zu wirtschaften.",
  },
  {
    nummer: "03",
    Icon: Smartphone,
    title: "Kein eigenes Bestellsystem von Anfang an",
    problem:
      "Viele starten ausschließlich über Lieferando oder Wolt — und merken erst Monate später, dass sie keine Kundendaten besitzen, keine Möglichkeit zur Kundenbindung haben und 20–30 % ihrer Einnahmen dauerhaft an eine Plattform abgeben. Aus dieser Abhängigkeit herauszukommen ist schwieriger, als von Anfang an einen eigenen Kanal aufzubauen.",
    loesung:
      "Starte parallel: Nutze Plattformen für die Anfangsreichweite, aber richte gleichzeitig deinen eigenen Webshop ein. Gib Direktbestellern einen kleinen Anreiz (5 % Rabatt, kostenlose Beilage) und bewirb deine eigene Website aktiv auf Verpackungen und Quittungen.",
    tipp: "Jeder Kunde, der einmal direkt bei dir bestellt, ist ein Kunde, den die Plattform nie wieder abkassiert.",
  },
  {
    nummer: "04",
    Icon: Users,
    title: "Personalplanung für die erste Woche, nicht für die dritte",
    problem:
      "Der Eröffnungs-Hype ist real: Viele neue Lieferdienste haben in den ersten zwei Wochen mehr Bestellungen als danach. Wer dafür zu wenig Personal hat, liefert zu spät — und verliert Kunden für immer. Wer umgekehrt zu viel Personal in einer schwachen Phase vorhält, verbrennt Cash.",
    loesung:
      "Plane in Phasen: Woche 1–2 mit etwas mehr Kapazität, dann nach echten Bestellzahlen skalieren. Nutze flexible Fahrer (Minijob, Stundenbasis), bevor du feste Verträge abschließt. Ein Liefermanagementsystem, das Touren optimiert, reduziert deinen Fahrerbedarf deutlich.",
    tipp: "Zwei zuverlässige Fahrer sind besser als vier unzuverlässige. Qualität schlägt Quantität beim ersten Eindruck.",
  },
  {
    nummer: "05",
    Icon: Megaphone,
    title: "Marketing als Nachgedanke statt als Strategie",
    problem:
      "'Wir sind live, jetzt kommen die Kunden von allein' — dieser Gedanke kostet Gründer wertvolle erste Monate. Wer neu auf dem Markt ist, muss aktiv auf sich aufmerksam machen. Mund-zu-Mund-Propaganda funktioniert, braucht aber Zeit.",
    loesung:
      "Plane dein Eröffnungsmarketing mindestens vier Wochen vor Launch: Flyer im Liefergebiet, Google Business-Profil vollständig befüllen, Instagram-Account mit erstem Content, und ein Eröffnungsangebot (z.B. kostenlose Lieferung für erste 200 Bestellungen). Die Investition in die ersten Kunden zahlt sich durch Stammkunden zurück.",
    tipp: "Ein Google Business-Profil mit echten Fotos und regelmäßigen Beiträgen erhöht deine lokale Sichtbarkeit kostenlos.",
  },
];

const SCHNELL_CHECKS = [
  "Liefergebiet nach Bestelldichte analysiert?",
  "Vollständige Kostenkalkulation für alle Gerichte erstellt?",
  "Eigener Bestellkanal neben Plattformen geplant?",
  "Personalplan für die ersten 6 Wochen erstellt?",
  "Eröffnungsmarketing mindestens 4 Wochen im Voraus geplant?",
];

export default function BlogPostFehlerPage() {
  return (
    <BlogPostLayout {...POST_META}>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <div className="space-y-6 text-white/65 text-base leading-relaxed">

        <p>
          Einen Lieferdienst zu gründen klingt überschaubar: Küche mieten, Fahrer einstellen,
          auf Lieferando anmelden, loslegen. Die Realität sieht anders aus. Die meisten
          Gründer scheitern nicht an schlechtem Essen — sie scheitern an Fehlern, die in
          der Planungsphase gemacht werden und sich erst Monate später zeigen.
        </p>
        <p>
          Hier sind die fünf häufigsten Fehler — und was du stattdessen tun kannst.
        </p>

        {/* ── 5 Fehler ───────────────────────────────────────────────────────── */}
        <div className="mt-10 space-y-8">
          {FEHLER.map((f) => (
            <div key={f.nummer} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              {/* Header */}
              <div className="flex items-start gap-5 p-6 md:p-8 border-b border-white/8">
                <div className="flex-shrink-0">
                  <div className="text-4xl font-black text-white/10 leading-none mb-2">{f.nummer}</div>
                  <div className="w-10 h-10 rounded-lg bg-[#007DCF]/15 border border-[#007DCF]/25 flex items-center justify-center">
                    <f.Icon className="w-5 h-5 text-cyan-brand" />
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-xl font-black leading-snug mb-3 mt-0">
                    {f.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed m-0">{f.problem}</p>
                </div>
              </div>

              {/* Lösung */}
              <div className="p-6 md:p-8 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Die Lösung</p>
                  <p className="text-white/65 text-sm leading-relaxed m-0">{f.loesung}</p>
                </div>
                <div className="rounded-xl bg-[#007DCF]/8 border border-[#007DCF]/15 px-4 py-3">
                  <p className="text-xs font-bold text-cyan-brand mb-1">Praxis-Tipp</p>
                  <p className="text-white/60 text-xs leading-relaxed m-0">{f.tipp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Schnell-Check ──────────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
          <h2 className="text-white text-lg font-bold mb-1 mt-0">
            Schnell-Check vor deinem Launch
          </h2>
          <p className="text-white/40 text-xs mb-5">Hake diese Punkte ab, bevor du live gehst</p>
          <div className="space-y-3">
            {SCHNELL_CHECKS.map((punkt) => (
              <div key={punkt} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/65 text-sm">{punkt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Fazit ──────────────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">Fazit</h2>
        <p>
          Die gute Nachricht: Alle fünf Fehler sind vermeidbar — wenn du sie kennst, bevor
          du sie machst. Die Gastronomie ist brutal ehrlich: Fehler zeigen sich sofort in
          den Zahlen. Wer früh mit Kalkulation, Systemaufbau und Marketing anfängt, gibt
          sich selbst die Chance, in der dritten Woche noch da zu sein — und in der dritten
          Saison zu wachsen.
        </p>
        <p>
          Ein eigenes Bestellsystem ist kein Luxus — es ist das Fundament, auf dem du
          unabhängig von Plattformen aufbaust. Wer das von Anfang an versteht, hat einen
          erheblichen Vorteil gegenüber der Konkurrenz, die das erst nach zwei Jahren
          schmerzhaft lernt.
        </p>

      </div>
    </BlogPostLayout>
  );
}
