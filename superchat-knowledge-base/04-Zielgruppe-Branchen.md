# 04 — Zielgruppe & Branchen

> Quelle: `public/locales/de/common.json:target`, `src/pages/` (diverse Branchen-Seiten), `public/locales/de/faq.json`, `public/locales/de/webseite.json`

---

| Branche / Restauranttyp | Auf Webseite erwähnt? | Wo (Code-Pfad / Seiten-Pfad) | Beispiel-Wording |
|---|---|---|---|
| Restaurant (allgemein) | Ja | `src/pages/RestaurantPage.tsx`, `/de/loesungen/restaurant`, `faq.json:restaurant-kassensystem`, `common.json:target.groups[restaurant]` | "Dine-in, Abholung & Lieferung zentral gesteuert — Tischverwaltung, Kasse und Online-Bestellungen in einem System" |
| Pizzeria | Ja | `common.json:target.subs[pizzeria]` | "Pizzerien profitieren am meisten von Direktbestellungen. Spare bis zu 30 % Provision pro Bestellung." |
| Lieferdienst | Ja | `src/pages/LieferdienstPage.tsx`, `/de/loesungen/lieferdienst`, `common.json:target.groups[lieferdienst]` | "Mehr Gewinn pro Lieferung — Dein eigener Bestellkanal ohne Plattform-Provision" |
| Lieferservice gründen (Neugründung) | Ja | `src/pages/LieferserviceGruendenPage.tsx`, `/de/loesungen/lieferservice-gruenden` | "Eigenen Lieferdienst aufbauen — Schritt für Schritt" |
| Café & Bäckerei | Ja | `src/pages/CafeBaeckereiPage.tsx`, `/de/loesungen/cafe-baeckerei`, `faq.json:cafe-baeckerei` | "Frische Brötchen verdienen eine frische Webseite. Zeig dein Sortiment, deine Filialen und deine Geschichte." |
| Bäckerei | Ja | `common.json:target.groups[baeckerei]`, `faq.json:cafe-baeckerei.kassensystem-baeckerei` | "Frisch bestellt, lokal abgeholt — Vorbestellungen und Filialabholung leicht gemacht" |
| Franchise-System | Ja | `src/pages/FranchisePage.tsx`, `/de/loesungen/franchise`, `faq.json:franchise`, `common.json:target.groups[franchise]` | "Ein System für alle Standorte — Zentrale Steuerung, lokale Flexibilität" |
| Ghost Kitchen | Ja | `src/pages/GhostKitchenPage.tsx`, `/de/loesungen/ghost-kitchen`, `common.json:target.groups[ghost]` | "Maximale Marge ohne Ladenlokal — Delivery-first ohne Plattformabhängigkeit" |
| Asiatisches Restaurant | Ja | `common.json:target.subs[asiatisch]` | "Sushi, Wok & mehr — direkt bestellt. Ob Sushi, Pad Thai oder Ramen – mit eigenem Webshop bestellen Kunden direkt." |
| Sushi / Japanisch | Ja (unter "Asiatisch") | `common.json:target.subs[asiatisch]`, Testimonial: Kojo Sushi | "Sushi, Wok & mehr — direkt bestellt" |
| Indisches Restaurant | Ja | `common.json:target.subs[indisch]` | "Indische Spezialitäten direkt bestellt — Curry, Tandoori & Co. provisionsfrei" |
| Burger & Chicken | Ja | `common.json:target.subs[burger]` | "Burger & Chicken ohne Provision — Fast-Food-Bestellungen direkt über dich" |
| Eisdiele / Dessert | Ja | `common.json:target.subs[eis]` | "Süße Bestellungen, voller Gewinn — Eis, Waffeln & Desserts direkt liefern" |
| Einzelhändler / Vor-Ort-Geschäft | Ja | `common.json:target.groups[einzelhandel]`, `common.json:target.groups[vor_ort]` | "Dein Laden – jetzt auch online — Click & Collect und Direktbestellungen" |
| Metzgerei / Feinkost | Ja (unter Einzelhandel) | `common.json:target.groups[einzelhandel]` | "Ideal für Feinkost, Metzgereien, Getränkehändler und lokale Spezialitäten" |
| Hotel & Pension | Ja | `public/locales/de/webseite.json:branchen.items` | "Hotel & Pension" — Webseiten-Zielgruppe |
| Handwerk | Ja | `public/locales/de/webseite.json:branchen.items` | "Handwerker" — Webseiten-Zielgruppe |
| Schule & Bildung | Ja | `public/locales/de/webseite.json:branchen.items` | "Schule & Bildung" — Webseiten-Zielgruppe |
| Dienstleister | Ja | `public/locales/de/webseite.json:branchen.items` | "Dienstleister" — Webseiten-Zielgruppe |
| Döner / Imbiss | Nein (nicht explizit genannt) | — | ❓ UNKLAR — nicht explizit erwähnt, aber unter Lieferdienst/Vor-Ort impliziert |
| Vietnamesisch | Nein (nicht explizit genannt) | — | ❓ UNKLAR — nicht explizit im Repo erwähnt |
| Foodtruck | Ja (implizit) | `kasse.json:hardware.products[2]` (Microsoft Surface Tablet) | "Mobil einsetzbar — Ideal für Food-Trucks, Events und kleine Betriebe" |
| Catering | Ja | `webseite.json:features.tiles[3]` | "Zeige deine Leistungen — Catering" |
| Systemgastronomie | Ja | `common.json:target.groups[franchise]`, `faq.json:franchise` | "Zentrale Steuerung, lokale Flexibilität — Ein System für alle Standorte" |
| Vegan / Vegetarisch | Nein (nicht explizit genannt) | — | ❓ UNKLAR — nicht explizit im Repo erwähnt |
| Schnellrestaurant | Ja (implizit) | `common.json:target.groups[vor_ort]`, Kiosk-Add-On | "Für Betriebe mit hohem Vor-Ort-Durchsatz: Self-Order-Terminals reduzieren Wartezeiten" |

---

## Zusammenfassung

**Explizit als Hauptzielgruppen kommuniziert:**
- Restaurant (Tischservice, Lieferung, Abholung)
- Lieferdienst (bestehend und Neugründung)
- Café & Bäckerei
- Franchise-Systeme
- Ghost Kitchen
- Pizzeria, Asiatisch, Indisch, Burger & Chicken, Eisdiele (als Sub-Zielgruppen)

**Ebenfalls adressiert (sekundär über Webseiten-Produkt):**
- Hotel, Handwerk, Schule, Dienstleister, Einzelhandel, Metzgerei, Feinkost

**Nicht explizit erwähnt:**
- Döner, Vietnamesisch, Vegan/Vegetarisch — können aber unter allgemeinen Kategorien subsummiert werden
