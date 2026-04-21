import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

const POST_META = {
  title: "Was kostet ein eigenes Bestellsystem wirklich? (Ehrlicher Vergleich)",
  description:
    "Setup, Provision, Support — wir rechnen alle Kosten durch und zeigen, was Gastro Master im Vergleich zu Lieferando wirklich kostet.",
  category: "Vergleich",
  readingTime: "7 min",
  publishDate: "20. April 2026",
  slug: "was-kostet-bestellsystem",
};

const VERGLEICH_ROWS = [
  {
    kriterium: "Einstiegskosten",
    lieferando: "Kostenlos",
    wolt: "Kostenlos",
    gastroMaster: "Einmalige Setup-Gebühr",
    gmPositiv: true,
  },
  {
    kriterium: "Provision je Bestellung",
    lieferando: "13–30 %",
    wolt: "15–30 %",
    gastroMaster: "0 %",
    gmPositiv: true,
  },
  {
    kriterium: "Monatliche Grundgebühr",
    lieferando: "Paketabhängig",
    wolt: "Paketabhängig",
    gastroMaster: "Fixer Monatsbetrag",
    gmPositiv: true,
  },
  {
    kriterium: "Kundendaten-Zugang",
    lieferando: "Kein Zugang",
    wolt: "Kein Zugang",
    gastroMaster: "Vollständig",
    gmPositiv: true,
  },
  {
    kriterium: "Eigene Domain / Branding",
    lieferando: "Nein",
    wolt: "Nein",
    gastroMaster: "Ja",
    gmPositiv: true,
  },
  {
    kriterium: "Push-Notifications an Kunden",
    lieferando: "Nein",
    wolt: "Nein",
    gastroMaster: "Ja",
    gmPositiv: true,
  },
  {
    kriterium: "Sofortige Reichweite",
    lieferando: "Hoch",
    wolt: "Hoch",
    gastroMaster: "Selbst aufbauen",
    gmPositiv: false,
  },
  {
    kriterium: "Algorithmus-Abhängigkeit",
    lieferando: "Hoch",
    wolt: "Hoch",
    gastroMaster: "Keine",
    gmPositiv: true,
  },
];

const VERSTECKTE_KOSTEN_LIEFERANDO = [
  {
    titel: "Sichtbarkeitsboosts (Sponsored Listings)",
    text: "Um in der App oben zu erscheinen, bezahlst du zusätzlich für Werbeplätze. Wer nicht zahlt, sinkt in der Relevanz.",
  },
  {
    titel: "Pflichtfotos und professionelle Fotografie",
    text: "Lieferando empfiehlt (und teils verlangt) professionelle Produktfotos. Kosten: 500–2.000 € je nach Umfang.",
  },
  {
    titel: "Vertragsgebundene Laufzeiten",
    text: "Viele Lieferando-Pakete haben Mindestlaufzeiten von 12 Monaten. Kündigung vor Ablauf ist teuer.",
  },
  {
    titel: "Storno- und Reklamationskosten",
    text: "Bei Stornierungen oder Kundenbeschwerden trägst du als Betreiber oft die Kosten — Lieferando schützt sich vertraglich.",
  },
];

const RECHNER_BEISPIEL = [
  { monat: "100 Bestellungen à 28 €", umsatz: "2.800 €" },
  { monat: "Lieferando-Provision (22 %)", umsatz: "– 616 €" },
  { monat: "Jahreskosten Provision", umsatz: "– 7.392 €" },
];

const GM_RECHNER = [
  { monat: "100 Bestellungen à 28 €", umsatz: "2.800 €" },
  { monat: "Monatliche Gebühr (Beispiel)", umsatz: "– 149 €" },
  { monat: "Provision", umsatz: "0 €" },
  { monat: "Jahreskosten", umsatz: "– 1.788 €" },
];

export default function BlogPostKostenPage() {
  return (
    <BlogPostLayout {...POST_META}>
      <div className="space-y-6 text-white/65 text-base leading-relaxed">

        <p>
          „Ein eigenes Bestellsystem ist zu teuer" — das hört man oft von Gastronomen,
          die noch nie die Gegenrechnung gemacht haben. Die Wahrheit ist: Der Vergleich
          ist nicht Kosten vs. keine Kosten. Er ist strukturelle Fixkosten vs. variable
          Provisionen, die mit deinem Erfolg mitwachsen.
        </p>
        <p>
          Wir zeigen alle Zahlen — einschließlich der Kosten, über die Plattformen nicht
          gerne sprechen.
        </p>

        {/* ── Vergleichstabelle ──────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Direkter Vergleich: Lieferando vs. Wolt vs. eigenes System
        </h2>

        <div className="overflow-x-auto -mx-5 md:mx-0">
          <table className="w-full min-w-[520px] text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10 w-[35%]">Kriterium</th>
                <th className="text-center py-3 px-3 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10">Lieferando</th>
                <th className="text-center py-3 px-3 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10">Wolt</th>
                <th className="text-center py-3 px-3 text-cyan-brand font-semibold text-xs uppercase tracking-wide border-b border-[#007DCF]/30 bg-[#007DCF]/5">Gastro Master</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {VERGLEICH_ROWS.map((row) => (
                <tr key={row.kriterium} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-white/70 font-medium text-xs leading-snug">{row.kriterium}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-red-400/80 text-xs">{row.lieferando}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-orange-400/80 text-xs">{row.wolt}</span>
                  </td>
                  <td className="py-3 px-3 text-center bg-[#007DCF]/5">
                    <span className={`text-xs font-semibold flex items-center justify-center gap-1 ${row.gmPositiv ? "text-green-400" : "text-white/50"}`}>
                      {row.gmPositiv
                        ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        : <Minus className="w-3.5 h-3.5 flex-shrink-0" />
                      }
                      {row.gastroMaster}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Kostenrechner ──────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Was 100 Bestellungen im Monat wirklich kosten
        </h2>
        <p>
          Statt abstrakter Prozentsätze: ein konkretes Beispiel für 100 Bestellungen
          pro Monat bei einem Durchschnittswert von 28 €.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {/* Lieferando */}
          <div className="rounded-2xl bg-red-500/5 border border-red-500/15 p-5">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Lieferando (22 %)</span>
            </div>
            <div className="space-y-2">
              {RECHNER_BEISPIEL.map((row, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-white/50">{row.monat}</span>
                  <span className={`font-bold tabular-nums ${row.umsatz.startsWith("–") ? "text-red-400" : "text-white"}`}>
                    {row.umsatz}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-red-500/15">
              <p className="text-xs text-red-400/70 m-0">Provision im Jahr bei 100 Bestell./Monat</p>
              <p className="text-lg font-black text-red-400 m-0">– 7.392 €</p>
            </div>
          </div>

          {/* Gastro Master */}
          <div className="rounded-2xl bg-green-500/5 border border-green-500/15 p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-bold text-green-400">Gastro Master</span>
            </div>
            <div className="space-y-2">
              {GM_RECHNER.map((row, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-white/50">{row.monat}</span>
                  <span className={`font-bold tabular-nums ${row.umsatz.startsWith("–") ? "text-yellow-400" : row.umsatz === "0 €" ? "text-green-400" : "text-white"}`}>
                    {row.umsatz}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-green-500/15">
              <p className="text-xs text-green-400/70 m-0">Fixkosten im Jahr (kein Wachstum der Kosten)</p>
              <p className="text-lg font-black text-green-400 m-0">– 1.788 €</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#007DCF]/8 border border-[#007DCF]/20 px-5 py-4 mt-2">
          <p className="text-cyan-brand text-sm font-bold m-0">
            Ersparnis im Beispiel: über 5.600 € im Jahr — bei nur 100 Bestellungen pro Monat.
          </p>
          <p className="text-white/45 text-xs mt-1 m-0">
            Je mehr du bestellst, desto mehr sparst du mit einem Fixkosten-Modell.
          </p>
        </div>

        {/* ── Versteckte Kosten ──────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Versteckte Kosten, die niemand erwähnt
        </h2>
        <p>
          Die Provision ist nur der sichtbare Teil. Was Plattformverträge noch kosten:
        </p>

        <div className="mt-6 space-y-4">
          {VERSTECKTE_KOSTEN_LIEFERANDO.map((item) => (
            <div key={item.titel} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 text-sm font-semibold mb-1 m-0">{item.titel}</p>
                <p className="text-white/45 text-xs leading-relaxed m-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Wann lohnt es sich? ────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Ab wann lohnt sich ein eigenes System?
        </h2>
        <p>
          Die Break-Even-Frage ist einfach: Liegt deine monatliche Gastro-Master-Gebühr
          unterhalb der Provision, die du sonst zahlen würdest? Bei 100 Bestellungen à 28 €
          und 22 % Provision sind das 616 € im Monat — eine Fixgebühr ist fast immer günstiger.
        </p>
        <p>
          Realistisch lohnt sich der Wechsel ab ca. 50–80 Bestellungen pro Monat.
          Darunter ist das Wachstum über Plattformreichweite oft sinnvoller — aber mit
          dem klaren Plan, parallel den eigenen Kanal aufzubauen.
        </p>

        {/* ── Fazit ──────────────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">Fazit</h2>
        <p>
          Ein eigenes Bestellsystem ist keine Zusatzausgabe — es ist eine Investition,
          die sich ab einem bestimmten Volumen schnell amortisiert. Wer die Vollkosten
          der Plattformabhängigkeit kennt, kommt fast immer zu demselben Schluss:
          Die günstigste Lösung langfristig ist die eigene.
        </p>
        <p>
          Wichtig: Vergleiche nicht Null-Kosten (Lieferando-Einstieg) mit Vollkosten
          (eigenes System). Vergleiche die Gesamtkosten über 24 Monate. Dann sieht
          die Rechnung meistens sehr deutlich aus.
        </p>

      </div>
    </BlogPostLayout>
  );
}
