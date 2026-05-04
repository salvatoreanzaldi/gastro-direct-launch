# 06 — Vertragsdetails

> Quelle: `public/locales/de/agb.json`, `public/locales/de/preise.json`, `public/locales/de/common.json`, `src/pages/AGB.tsx`, `public/locales/de/datenschutz.json`

---

| Aspekt | Inhalt | Quelle |
|---|---|---|
| Vertragspartner | Epit Global GmbH, Herzbergstr. 9, 61250 Usingen | `agb.json:subtitle` |
| Markenname | Gastro Master (Marke der Epit Global GmbH) | `agb.json:subtitle` |
| Mindestlaufzeit Webseite (Leasing) | 12 Monate | `agb.json:s2.p2.a1.text`, `preise.json:faq.items[1]` |
| Mindestlaufzeit Webshop, App, Kassensystem | Keine Mindestlaufzeit — monatlich kündbar | `agb.json:s3.p3.sub1.text`, `faq.json:allgemein.mindestvertragslaufzeit` |
| Kündigungsfrist Webseite | 3 Monate zum Monatsende (nach Ablauf der 12-Monats-Mindestlaufzeit) | `agb.json:s2.p2.a1.text` |
| Kündigungsfrist Webshop, App, Kassensystem | 3 Monate | `preise.json:hero.pills[1]`, `preise.json:kasse.priceSub` |
| Zahlungsweise | Monatlich im Voraus | `agb.json:s3.p3.sub1.text` |
| Erster Beitrag | Erst nach Go-Live des Systems fällig | `common.json:risk.items[0]` |
| Einrichtungsgebühren | Einmalig, individuell je nach Umfang des Betriebs — ca. 400 € bis 1.600 € netto laut Preisseiten-Hinweis | `agb.json:s0.p3.sub2.text`, `common.json:pricing.setupNote` |
| Provision auf Bestellungen | 0 % — Gastro Master erhebt keine Provision | `preise.json:cta.trust[0]`, `faq.json:produkte-technik.zahlungsmethoden` |
| Zahlungsanbieter-Gebühren | PayPal: 2,99 % + 0,39 € pro Transaktion; Stripe (Apple Pay, Visa, MC, Klarna): 1,5 % + 0,25 € pro Bestellung — fallen separat an | `preise.json:addonsOrder.calcPaypal`, `preise.json:addonsOrder.calcStripe` |
| Transaktionsumlage | Optional: Zahlungsgebühren können transparent an Kunden weitergegeben werden | `preise.json:faq.items[4]` |
| Ratenzahlung (Kauf) | Bei Kaufvertrag: max. 4 Raten, Vorauszahlung 25 % | `agb.json:s0.p3.sub1.text` |
| Ratenzahlung Webseite (Kauf) | Max. 5 Raten | `agb.json:s1.p3.text` |
| Support-Laufzeit (Kaufvertrag) | 6 Monate kostenloser Support nach Kaufabschluss + monatliche Updates | `agb.json:s0.p7.text` |
| Updates | Kostenlos inklusive (auch im Leasing) | `agb.json:s2.p7.sub1.text` |
| Filialen | Kostenlose Integration weiterer Filialen im Support (Leasing) | `agb.json:s2.p7.sub2.text` |
| Datenschutz (DSGVO) | Anbieter ist Verantwortlicher im Sinne DSGVO; für Gästedaten wird Auftragsverarbeitungsvertrag abgeschlossen | `agb.json:s0.p8.b.text` |
| Server-Standort | All-Inkl. — München, Deutschland (DSGVO-konform) | — |
| Geld-zurück-Garantie / Probezeit | Keine — dafür flexible Verträge (Webshop/App monatlich kündbar, 3 Monate Frist; Kasse sofort monatlich kündbar; Webseite 12 Monate Mindestlaufzeit) | — |
| Ratenzahlung Standard | 3 Raten — erste Rate ist vorab zu zahlen | — |
| DSGVO / AVV-Unterlagen | Bei konkreten Fragen dazu: freundlich an einen Berater weiterleiten | — |
| Gerichtsstand | Sitz des Anbieters (Usingen, Hessen) | `agb.json:s0.p10.sub3.text` |
| Schriftformerfordernis | Vertragsänderungen bedürfen der Schriftform | `agb.json:s0.p10.sub1.text` |
| Nutzungsrechte | Zeitlich unbegrenzte, nicht übertragbare Nutzungsrechte (bei Leasing: zeitlich begrenzt auf Vertragsdauer) | `agb.json:s0.p4.text`, `agb.json:s2.p4.text` |
| Inhaltsverantwortung | Alleinige rechtliche Verantwortung für Inhalte liegt beim Kunden (§5 TMG) | `agb.json:s0.p2.e.text` |
| Muster-AGB / Datenschutz / Impressum | Werden vom Anbieter gestellt, müssen vom Kunden geprüft und angepasst werden | `agb.json:s0.p2.d.text` |
| Wechselangebot | 50 % Rabatt, solange altes Abo bei anderem Anbieter noch läuft | `common.json:switchOffer` |
| Empfehlungsprogramm | 1 Gratis-Monat pro erfolgreicher Empfehlung (kein Limit), gutgeschrieben nach Vertragsabschluss der Empfehlung | `preise.json:referral` |
| Kassensystem AGB-Typ | Kaufvertrag oder Leasing (Leasingvertrag Online Shop & App) | `agb.json:s3.title` |

---

## Vertragsmodelle im Überblick

| Vertragsart | Für welches Produkt | Laufzeit | Besonderheiten |
|---|---|---|---|
| Leasingvertrag Webseite | Webseite | Mindestens 12 Monate, dann monatlich kündbar (3 Mon. Frist) | Anbieter bleibt Eigentümer der Plattform während der Laufzeit |
| Leasingvertrag Online Shop & App | Webshop + App | Unbefristet, 3 Monate Kündigungsfrist | Monatliche Nutzungsgebühr |
| Kaufvertrag Online Bestellsystem | Webshop + App (Einmalkauf) | Kein laufendes Abo nach Kauf | System geht nach Kauf in Eigentum des Kunden über |
| Kaufvertrag Webseite | Webseite (Einmalkauf) | Kein laufendes Abo nach Kauf | System geht nach Kauf in Eigentum des Kunden über |
| Kassensystem | Kassensystem | Monatlich kündbar, 3 Monate Frist | Eigene Preisvereinbarung |
