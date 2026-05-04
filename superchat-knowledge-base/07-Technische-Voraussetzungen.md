# 07 — Technische Voraussetzungen

> Quelle: `public/locales/de/kasse.json`, `public/locales/de/faq.json`, `public/locales/de/webshop.json`, `public/locales/de/app.json`, `public/locales/de/agb.json`

---

| Voraussetzung | Beschreibung | Pflicht oder Optional | Quelle |
|---|---|---|---|
| Internetverbindung | Für alle Produkte erforderlich — Cloud-basiertes System | Pflicht (alle Produkte) | `agb.json:s0.p2.a.text` (Internetzugang) |
| Windows-Computer (Kassensystem) | Die Cloud-Kassensoftware läuft auf Windows-Computern — Windows 11, mindestens 8 GB RAM | Pflicht (nur Kassensystem) | `preise.json:faq.items[0]`, `common.json:pos.posFeatures[2]` |
| Tablet oder Smartphone | Für Bestellmanagement, Fahrer-App, und Backup bei Druckerausfall | Empfohlen / Optional | `kasse.json:alternating[0]`, `faq.json:bondrucker-hardware.drucker-ausfall` |
| Bondrucker | Für Bestellausdrucke im Kassenbetrieb; unterstützt WLAN und Bluetooth | Optional (Bestellungen auch am Bildschirm sichtbar) | `faq.json:bondrucker-hardware.bluetooth-drucker` |
| EC-Kartengerät | Kompatibel mit allen handelsüblichen EC-Geräten nach ZVT-Standard | Optional (empfohlen) | `kasse.json:waveFeature.cards[3]` |
| TSE-Hardware | Für TSE-Konformität des Kassensystems (gesetzlich vorgeschrieben) | Pflicht (Kassensystem) | `kasse.json:hero.h1Suffix` |
| Eigene Domain | Für professionellen Webshop/Webseite unter eigenem Namen; Subdomains als Alternative möglich | Optional (Subdomain gratis) | `faq.json:produkte-technik.eigene-domain` |
| Logo / Branding-Material | Für individuelle Gestaltung von App und Webshop | Empfohlen | `webshop.json:features.cards[5]` |
| Speisekarten-Daten | Gastronom liefert Speisekarte, Preise, Bilder; Gastro Master trägt alles ein | Pflicht (Gastronom), Einrichtung durch Gastro Master | `webshop.json:steps.items[1]` |
| PayPal-Geschäftskonto | Für Online-Zahlung über PayPal erforderlich — Gastro Master hilft beim Setup | Optional (empfohlen für Online-Zahlung) | `common.json:diff.features[4]` |
| Stripe-Konto | Für Kreditkarte, Apple Pay, Google Pay, Klarna — Gastro Master hilft beim Setup | Optional (empfohlen für Online-Zahlung) | `common.json:diff.features[4]` |
| ELSTER-Zugang (ab 2025) | Kassenmeldepflicht seit 1. Juli 2025 — Kassensystem muss über ELSTER gemeldet werden | Pflicht (Kassensystem-Betreiber) | `faq.json:restaurant-kassensystem.kassenmeldepflicht-2025` |
| Betriebserlaubnis / Gewerbeanmeldung | Gesetzliche Voraussetzung für Gastronomiebetrieb / Lieferdienst | Pflicht (rechtlich, nicht von GM abhängig) | `faq.json:lieferdienst-gruenden.genehmigungen` |
| Keine Programmierkenntnisse nötig | Alle Produkte werden vollständig von Gastro Master eingerichtet | Entfällt | `app.json:steps.text` |

---

## Empfohlene Hardware (optional, nicht zwingend von Gastro Master zu kaufen)

| Hardware | Beschreibung | Einsatzbereich | Quelle |
|---|---|---|---|
| Elo Series-3 | All-in-One Kassensystem, 15.6" Touchscreen, kompaktes Design | Restaurant, Café, Imbiss | `kasse.json:hardware.products[0]` |
| Elo Series-3 Doublescreen | Zwei Bildschirme: für Betreiber und Gast. Upselling-Funktion | Thekenbetrieb | `kasse.json:hardware.products[1]` |
| Microsoft Surface Tablet | Flexibel und mobil, Windows-kompatibel | Food-Trucks, Events, kleine Betriebe | `kasse.json:hardware.products[2]` |
| Bondrucker (WLAN/Bluetooth) | Für Bestellausdrucke in Küche und Theke | Alle Betriebe mit Kasse | `faq.json:bondrucker-hardware.bluetooth-drucker` |

---

## Hinweise

- Für den Webshop/App: Kunden brauchen **keinen App-Download** — Webshop läuft direkt im Browser
- Für das Kassensystem: Hardware kann bei Gastro Master angefragt werden — individuell konfigurierbar
- Server-Standort: All-Inkl., München, Deutschland — DSGVO-konform
- Windows-Anforderung: Windows 11, mindestens 8 GB RAM
- Internetgeschwindigkeit: Ab 50 Mbit/s empfohlen — auch darunter funktioniert das System
- Bestehendes Kassensystem: wird **ersetzt**, nicht integriert
