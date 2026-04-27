import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { TrendingDown, AlertCircle, Calculator, CheckCircle2 } from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const POST_META = {
  title: "Warum dein Lieferservice auf Lieferando verzichten sollte",
  description:
    "Lieferando nimmt bis zu 30 % Provision pro Bestellung. Was das für deine Marge wirklich bedeutet — und welche Alternative sich lohnt.",
  category: "Meinung",
  readingTime: "6 min",
  publishDate: "20. April 2026",
  slug: "warum-lieferando-verzichten",
};

const PROBLEMS = [
  {
    Icon: TrendingDown,
    title: "Die Provision frisst deine Marge",
    body: "Lieferando verlangt je nach Paket zwischen 13 % und 30 % auf jede Bestellung — ohne Wenn und Aber. Bei einem durchschnittlichen Bestellwert von 28 € bleiben dir nach Provision oft nur 19–24 € übrig. Ziehst du Lebensmittelkosten (ca. 30 %) und Lieferkosten ab, arbeitest du schnell im Minus.",
    color: "bg-red-500/12 border-red-500/20 text-red-400",
  },
  {
    Icon: AlertCircle,
    title: "Deine Kunden gehören dir nicht",
    body: "Auf Lieferando bestellen Kunden bei dir — aber Lieferando besitzt die Beziehung. Du bekommst keine E-Mail-Adressen, keine Telefonnummern, keine Möglichkeit zur direkten Kundenbindung. Wechselst du die Plattform, verlierst du den Zugang zu deiner eigenen Kundenbasis.",
    color: "bg-orange-500/12 border-orange-500/20 text-orange-400",
  },
  {
    Icon: Calculator,
    title: "Preiserhöhungen treffen nur dich",
    body: "Lieferando kann seine Provisionen jederzeit anpassen. Deine Verträge mit Lieferanten, dein Personal, deine Miete — all das hat Preise, die du kennst und planst. Deine Abhängigkeit von Lieferando gibt einer externen Partei dauerhaft Kontrolle über deine Marge.",
    color: "bg-yellow-500/12 border-yellow-500/20 text-yellow-400",
  },
];

const RECHENBEISPIEL = [
  { label: "Durchschnittlicher Bestellwert", value: "28,00 €", type: "neutral" },
  { label: "Umsatz bei 100 Bestellungen", value: "2.800,00 €", type: "neutral" },
  { label: "Lieferando-Provision (22 %)", value: "− 616,00 €", type: "negative" },
  { label: "Lieferkosten (eigener Fahrer)", value: "− 350,00 €", type: "negative" },
  { label: "Lebensmittelkosten (30 %)", value: "− 840,00 €", type: "negative" },
  { label: "Verbleibender Deckungsbeitrag", value: "994,00 €", type: "positive" },
  { label: "Deckungsbeitrag pro Bestellung", value: "≈ 9,94 €", type: "positive" },
];

const ALTERNATIVE_VORTEILE = [
  "Eigene Bestellseite unter deiner Domain — keine Provision pro Bestellung",
  "Kundendaten gehören dir: E-Mail, Telefon, Bestellhistorie",
  "Direkte Kundenbindung durch Push-Nachrichten und eigene Angebote",
  "Transparente Fixkosten statt variables Provisionsmodell",
  "Keine Abhängigkeit von Plattform-Algorithmen oder Sichtbarkeits-Rankings",
];

export default function BlogPostLieferandoPage() {
  return (
    <BlogPostLayout {...POST_META}>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <div className="space-y-6 text-white/65 text-base leading-relaxed">

        <p>
          Lieferando ist für viele Lieferdienste der erste Schritt ins digitale Zeitalter.
          Schnell eingerichtet, große Reichweite, sofortige Sichtbarkeit. Was auf den ersten
          Blick überzeugend klingt, entpuppt sich nach einigen Monaten als strukturelles Problem:
          Du baust ein Geschäft auf, das einem anderen gehört.
        </p>

        {/* ── Rechenbeispiel ─────────────────────────────────────────────────── */}
        <div className="my-10 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
          <h2 className="text-white text-lg font-bold mb-1 mt-0">
            Was 100 Bestellungen auf Lieferando wirklich kosten
          </h2>
          <p className="text-white/40 text-xs mb-5">Vereinfachtes Beispiel, Provision 22 % (Mittelwert)</p>
          <div className="space-y-0 divide-y divide-white/8">
            {RECHENBEISPIEL.map((row) => (
              <div key={row.label} className="flex justify-between items-center py-3">
                <span className="text-sm text-white/55">{row.label}</span>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    row.type === "negative"
                      ? "text-red-400"
                      : row.type === "positive"
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-4 mb-0">
            * Lieferando-Provision variiert je nach Paket zwischen 13 % und 30 %. Lieferkosten und Personalkosten nicht eingerechnet.
          </p>
        </div>

        <p>
          Knapp 10 € Deckungsbeitrag pro Bestellung klingt vertretbar — bis du davon Miete,
          Strom, Verpackung und deinen eigenen Lohn abziehst. Die Plattform verdient bei jedem
          Verkauf mit, ohne das Risiko zu tragen.
        </p>

        {/* ── 3 Hauptprobleme ────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-2">
          3 strukturelle Probleme mit Lieferando
        </h2>
        <p>Die Provision ist nur die offensichtlichste Baustelle.</p>

        <div className="space-y-4 mt-6">
          {PROBLEMS.map((p) => (
            <div key={p.title} className={`flex gap-5 p-6 rounded-xl border ${p.color.split(" ").slice(0, 2).join(" ")}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${p.color.split(" ").slice(0, 2).join(" ")}`}>
                <p.Icon className={`w-5 h-5 ${p.color.split(" ")[2]}`} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed m-0">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Wann Lieferando sinnvoll ist ───────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Wann Lieferando trotzdem Sinn ergibt
        </h2>
        <p>
          Fairerweise: Lieferando hat einen echten Wert in der Anlaufphase. Wenn du gerade
          eröffnest und noch keine Stammkundschaft hast, kann die Plattform erste Bestellungen
          bringen. Als langfristige Strategie funktioniert es nur dann, wenn deine Marge das
          dauerhaft hergibt — und das ist in der Gastronomie selten der Fall.
        </p>
        <p>
          Der Fehler ist nicht, Lieferando zu nutzen. Der Fehler ist, ausschließlich auf
          Lieferando zu setzen und nie eine eigene Infrastruktur aufzubauen.
        </p>

        {/* ── Alternative ────────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">
          Die Alternative: eigenes Bestellsystem
        </h2>
        <p>
          Ein eigenes Bestellsystem bedeutet nicht, auf Reichweite zu verzichten — es
          bedeutet, die Kundenbeziehung selbst in der Hand zu halten. Du betreibst deinen
          eigenen Webshop unter deiner Domain, behältst alle Kundendaten und zahlst keine
          Provision pro Bestellung.
        </p>

        <div className="my-6 space-y-3">
          {ALTERNATIVE_VORTEILE.map((punkt) => (
            <div key={punkt} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/70 text-sm leading-relaxed">{punkt}</span>
            </div>
          ))}
        </div>

        <p>
          Natürlich braucht das eigene Bestellsystem mehr Eigeninitiative beim Marketing:
          Du musst Kunden aktiv auf deinen Shop aufmerksam machen. Aber jeder Kunde,
          der einmal direkt bei dir bestellt, ist ein Kunde, dem Lieferando nie mehr
          30 % abnimmt.
        </p>

        {/* ── Fazit ──────────────────────────────────────────────────────────── */}
        <h2 className="text-white text-2xl font-black mt-12 mb-4">Fazit</h2>
        <p>
          Lieferando ist kein schlechtes Produkt — es ist das falsche Fundament für einen
          nachhaltigen Betrieb. Wer langfristig denkt, baut lieber jetzt eine eigene
          Infrastruktur auf, als in zwei Jahren festzustellen, dass 30 % seiner Einnahmen
          dauerhaft an eine Plattform fließen, auf der er keine Kontrolle hat.
        </p>
        <p>
          Der erste Schritt kostet Überwindung. Der zweite Schritt zahlt sich aus.
        </p>

      </div>
    </BlogPostLayout>
  );
}
