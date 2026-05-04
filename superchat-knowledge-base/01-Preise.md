# 01 — Preise & Pakete

> Quelle: `public/locales/de/preise.json`, `public/locales/de/common.json`, `public/locales/de/webseite.json`, `public/locales/de/webshop.json`, `public/locales/de/app.json`, `public/locales/de/agb.json`

---

## Hauptpakete

| Paket | Beschreibung | Preis (Netto) | Jährlich (Netto) | Umsetzungsdauer | Vertragsbindung | Enthaltene Features (kurz) | Zielgruppe | Quelle |
|---|---|---|---|---|---|---|---|---|
| Webseite | Professionelle Restaurant-Website ohne Bestellfunktion | ab 49 €/Monat | ab 49 €/Monat | 7–10 Tage | Mindestlaufzeit 12 Monate, danach 3 Monate Kündigungsfrist | Professionelles Webdesign, eigene Domain, Bildergalerie & Speisekarte, Kontaktformular & Google Maps, Mobile-optimiert & SEO-ready, SSL & Hosting, 2 E-Mail-Postfächer | Restaurants, Cafés, Bäckereien, alle Branchen | `public/locales/de/common.json:pricing.slimPlans`, `public/locales/de/webseite.json:pricing.abo` |
| Webseite Einmalkauf (Onepager) | Simple Website als Einmalkauf | ab 990 € (einmalig) | — | wenige Tage | Kein laufendes Abo | Startseite, Kontaktformular, Impressum & Datenschutz, mobiloptimiert, DSGVO-konform | Betriebe mit kleinem Budget, die schnell online sein wollen | `public/locales/de/webseite.json:pricing.simple` |
| Webseite Mehrseiter (Einmalkauf) | Individuelle Webseite mit mehreren Unterseiten | Auf Anfrage | — | Nach Projektumfang | Individuell | Mehrere Unterseiten, Bildergalerie, Instagram-Feed, Karriere-/Franchise-Seite, Video, individuelle Features | Größere Betriebe, Franchises | `public/locales/de/webseite.json:pricing.individual` |
| Starter (Online-Bestellshop) | Reiner Webshop ohne App, 0 % Provision | ab 79 €/Monat | ab 69 €/Monat | 10–14 Tage | Monatlich kündbar, 3 Monate Kündigungsfrist | Webshop (provisionsfrei), eigene Domain, digitale Speisekarte, unbegrenzte Bestellungen, 2.500 Flyer mit QR-Code, Kundenpunkte-System, bis 3 Postfächer | Lieferdienste, Restaurants die online bestellen wollen | `public/locales/de/common.json:pricing.slimPlans[basic]` |
| Business (Webshop + App) | Webshop + native iOS/Android App, 0 % Provision | ab 149 €/Monat | ab 129 €/Monat | 2–3 Wochen | Monatlich kündbar, 3 Monate Kündigungsfrist | Webshop + native App, eigene Domain, digitale Speisekarte, Push-Benachrichtigungen, unbegrenzte Bestellungen, 5.000 Flyer mit QR-Code, bis 4 Postfächer | Restaurants & Lieferdienste mit Stammkundenbindung | `public/locales/de/common.json:pricing.slimPlans[standard]` |
| Enterprise / Franchise | Individuelle Komplettlösung für mehrere Standorte | Auf Anfrage | — | Nach Projektumfang | Rahmenvertrag, individuell | Individuelles Design, eigene Domain, Speisekarte, Kiosk/Pick-Up-Screens optional, Fotograf vor Ort optional, Cloud-Kasse inkl., Transaktionsumlage inkl. | Franchise-Systeme, Ketten mit mehreren Standorten | `public/locales/de/common.json:pricing.slimPlans[enterprise]` |
| Kassensystem | Cloud-Kassensoftware, TSE-konform & GoBD-zertifiziert | ab 69 €/Monat | — | 1–2 Werktage | Monatlich kündbar, 3 Monate Kündigungsfrist | TSE-konforme Cloud-Kassensoftware, GoBD-konform, bis zu 4 Kassen pro Lizenz, Tisch-/Liefer-/Abhol-Betrieb, Cloud-Backoffice & Statistiken, persönlicher Support per WhatsApp | Alle Gastronomiebetriebe mit Kassenpflicht | `public/locales/de/preise.json:kasse` |

---

## Add-Ons & Zusatzleistungen

| Paket / Add-On | Beschreibung | Preis (Netto) | Vertragsbindung | Enthaltene Features | Zielgruppe | Quelle |
|---|---|---|---|---|---|---|
| Fahrer-App mit GPS | Live-GPS-Tracking für Lieferfahrer, Add-On zum Kassensystem | + 10 €/Monat pro Fahrer | Wie Basispaket | Live-GPS-Tracking, automatische Routen-Optimierung, direkte Kommunikation mit Küche, Lieferzeit-Schätzung | Lieferdienste mit eigenen Fahrern | `public/locales/de/preise.json:addonsKasse.items[0]` |
| QR-Tischsystem | Bestellungen per QR-Code am Tisch, Add-On zum Kassensystem | + 50 €/Monat für 5 Tische, + 5 € je weiteren Tisch | Wie Basispaket | Bestellen per QR-Code am Tisch, kein App-Download nötig, direkt in Kassensystem integriert, Bar-System inklusive | Restaurants mit Tischservice | `public/locales/de/preise.json:addonsKasse.items[1]` |
| Self-Ordering Terminal (Kiosk) | Selbstbedienungsterminal für Bestellungen | Auf Anfrage (Hardware individuell) | Individuell | Kiosk-System für Selbstbestellung, reduziert Wartezeiten, voll integriert in POS, individuell gebrandetes Display | Schnellrestaurants, Imbisse mit hohem Durchlauf | `public/locales/de/preise.json:addonsKasse.items[2]` |
| Transaktionsumlage | Zahlungsgebühren (Stripe/PayPal) transparent an Kunden weitergeben | Variabel (abhängig von Bestellvolumen) | Wie Basispaket | Eigenes PayPal/Stripe-Konto, 0 % Eigenanteil, transparente Ausweisong beim Checkout | Alle Betriebe mit Online-Zahlung | `public/locales/de/preise.json:addonsOrder.txTitle` |
| QR-Code Flyer | Professionell gedruckte DIN-A6-Flyer mit QR-Code | ab 65 € / 2.500 Stück (erste 2.500 kostenlos im Abo) | Einmalkauf, nachbestellbar | DIN-A6 doppelseitig, eigenes Branding, weitere Mengen nachbestellbar | Alle Betriebe mit App/Webshop | `public/locales/de/preise.json:addonsOrder.flyerTitle` |

---

## Flyer Nachbestell-Preisliste

| Menge | Preis |
|---|---|
| 2.500 Stück | 65,00 € |
| 5.000 Stück | 117,00 € |
| 7.500 Stück | 175,50 € |
| 10.000 Stück | 234,00 € |
| 12.500 Stück | 295,50 € |
| 15.000 Stück | 351,00 € |
| 20.000 Stück | 468,00 € |
| 30.000 Stück | 702,00 € |
| 40.000 Stück | 936,00 € |
| 50.000 Stück | 1.117,00 € |

---

## Setup-Gebühren & Sonstiges

| Aspekt | Inhalt |
|---|---|
| Einrichtungsgebühren | Einmalig, individuell — abhängig davon, ob und welche Hardware der Kunde benötigt. Richtwert: ab ca. 400 € bis 1.600 € netto. Bei konkreten Nachfragen: Berater übernehmen. |
| Zahlungsgebühren | PayPal: 2,99 % + 0,39 € pro Transaktion; Stripe (Apple Pay, Visa, MC, Klarna): 1,5 % + 0,25 € pro Bestellung — fallen separat an (können über Transaktionsumlage weitergegeben werden) |
| Erster Beitrag | Erst fällig nach Go-Live des Systems |
| Wechselangebot | 50 % Rabatt, solange altes Abo bei anderem Anbieter noch läuft |
| Empfehlungsprogramm | 1 Gratis-Monat pro erfolgreicher Empfehlung (kein Limit) |
| MwSt. | Alle Preise netto, zzgl. MwSt. |
