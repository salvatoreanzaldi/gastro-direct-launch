# Plan: Produkte URL-Restructure → /produkte/pakete/

**Goal:** Verschiebe alle 4 Hauptprodukt-Seiten von `/produkte/[slug]` zu `/produkte/pakete/[slug]` und optimiere Slug-Namen für SEO (`webshop` → `online-bestellshop`, `app` → `bestell-app`).

**Architecture:** Zentrales Routing via `src/config/routes.ts` + React Router in `src/App.tsx`. Keine physischen Dateien werden verschoben – nur Pfade und interne Links. Server-side 301-Redirects via `vercel.json`.

**Tech stack:** React Router v6, Vite, Vercel, react-i18next

---

## Slug-Mapping (Referenz)

| Alt | Neu |
|-----|-----|
| `/produkte/webshop` | `/produkte/pakete/online-bestellshop` |
| `/produkte/app` | `/produkte/pakete/bestell-app` |
| `/produkte/webseite` | `/produkte/pakete/webseite` |
| `/produkte/kassensystem` | `/produkte/pakete/kassensystem` |

---

## Task 1: routes.ts — Kanonische Routen aktualisieren

**Files affected:**
- `src/config/routes.ts` — 4 Routen-Pfade ändern

**Steps:**

1. In `src/config/routes.ts` die 4 Produkt-Routen ersetzen:

```typescript
// VORHER:
{ path: "/produkte/webshop",      importPath: "@/pages/WebshopPage",  priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/app",          importPath: "@/pages/AppPage",       priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/webseite",     importPath: "@/pages/WebseitePage",  priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/kassensystem", importPath: "@/pages/KassePage",     priority: 0.8, changefreq: "weekly" },

// NACHHER:
{ path: "/produkte/pakete/online-bestellshop", importPath: "@/pages/WebshopPage",  priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/pakete/bestell-app",        importPath: "@/pages/AppPage",       priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/pakete/webseite",           importPath: "@/pages/WebseitePage",  priority: 0.8, changefreq: "weekly" },
{ path: "/produkte/pakete/kassensystem",       importPath: "@/pages/KassePage",     priority: 0.8, changefreq: "weekly" },
```

2. Commit:
```bash
git add src/config/routes.ts
git commit -m "refactor(routes): move 4 Hauptprodukte to /produkte/pakete/ with new slugs"
```

---

## Task 2: App.tsx — Legacy-Redirects für alte URLs hinzufügen

**Files affected:**
- `src/App.tsx` — Client-side Redirects für alte Pfade + `bestellapp` Alias aktualisieren

**Steps:**

1. Im `<Route path="/:lang" element={<LanguageLayout />}>` Block **vor** dem `*`-Catch-All diese Aliase einfügen:

```tsx
{/* Legacy: alte Produkt-Pfade → neue /pakete/ Pfade */}
<Route path="produkte/webshop"      element={<Navigate to={`/${window.location.pathname.split('/')[1]}/produkte/pakete/online-bestellshop`} replace />} />
<Route path="produkte/app"          element={<Navigate to={`/${window.location.pathname.split('/')[1]}/produkte/pakete/bestell-app`} replace />} />
<Route path="produkte/webseite"     element={<Navigate to={`/${window.location.pathname.split('/')[1]}/produkte/pakete/webseite`} replace />} />
<Route path="produkte/kassensystem" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/produkte/pakete/kassensystem`} replace />} />
{/* Alias: /produkte/bestellapp → /produkte/pakete/bestell-app */}
<Route path="produkte/bestellapp"   element={<Navigate to={`/${window.location.pathname.split('/')[1]}/produkte/pakete/bestell-app`} replace />} />
```

**HINWEIS:** Da die Redirects innerhalb von `<Route path="/:lang">` laufen, kann `useParams` oder ein ähnlicher Helper genutzt werden. Alternativ als separater Component:

```tsx
const LangRedirect = ({ to }: { to: string }) => {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang}${to}`} replace />;
};
```

Und dann:
```tsx
<Route path="produkte/webshop"      element={<LangRedirect to="/produkte/pakete/online-bestellshop" />} />
<Route path="produkte/app"          element={<LangRedirect to="/produkte/pakete/bestell-app" />} />
<Route path="produkte/webseite"     element={<LangRedirect to="/produkte/pakete/webseite" />} />
<Route path="produkte/kassensystem" element={<LangRedirect to="/produkte/pakete/kassensystem" />} />
<Route path="produkte/bestellapp"   element={<LangRedirect to="/produkte/pakete/bestell-app" />} />
```

2. Die alte Zeile 104 (`produkte/bestellapp`) durch die obige `LangRedirect`-Version ersetzen.

3. Commit:
```bash
git add src/App.tsx
git commit -m "feat(router): add client-side legacy redirects for old /produkte/* paths"
```

---

## Task 3: vercel.json — Server-side 301 Redirects

**Files affected:**
- `vercel.json` — 4 neue Redirect-Regeln (× alle Sprachen)

**Steps:**

1. In `vercel.json` die bestehenden Redirects um diese 4 Einträge erweitern:

```json
{ "source": "/:lang(de|en|it|fa|si|ru)/produkte/webshop",      "destination": "/:lang/produkte/pakete/online-bestellshop", "permanent": true },
{ "source": "/:lang(de|en|it|fa|si|ru)/produkte/app",          "destination": "/:lang/produkte/pakete/bestell-app",        "permanent": true },
{ "source": "/:lang(de|en|it|fa|si|ru)/produkte/webseite",     "destination": "/:lang/produkte/pakete/webseite",           "permanent": true },
{ "source": "/:lang(de|en|it|fa|si|ru)/produkte/kassensystem", "destination": "/:lang/produkte/pakete/kassensystem",       "permanent": true }
```

2. Commit:
```bash
git add vercel.json
git commit -m "feat(seo): add 301 redirects for /produkte/* → /produkte/pakete/*"
```

---

## Task 4: cta-config.ts — Pfad-Keys aktualisieren

**Files affected:**
- `src/data/cta-config.ts` — 4 Keys + Default-Fallback

**Steps:**

1. Alle 4 Keys und ihre `productPath`-Werte ersetzen:

```typescript
// VORHER → NACHHER:
"/produkte/kassensystem" → "/produkte/pakete/kassensystem"
"/produkte/webshop"      → "/produkte/pakete/online-bestellshop"
"/produkte/app"          → "/produkte/pakete/bestell-app"
"/produkte/webseite"     → "/produkte/pakete/webseite"
```

2. Default-Fallback auf Zeile 63 updaten:
```typescript
return configs[productPath] || configs["/produkte/pakete/kassensystem"];
```

3. Commit:
```bash
git add src/data/cta-config.ts
git commit -m "refactor(cta): update path keys to new /produkte/pakete/* structure"
```

---

## Task 5: Navigation (Navbar + Footer)

**Files affected:**
- `src/components/landing/Navbar.tsx` — prodRoutes Array (Zeile 20-24)
- `src/components/landing/Footer.tsx` — prodRoutes Array (Zeile 6-10)

**Steps:**

1. `Navbar.tsx` — prodRoutes aktualisieren:
```typescript
const prodRoutes = [
  { to: "/produkte/pakete/online-bestellshop",       icon: ShoppingCart },
  { to: "/produkte/pakete/bestell-app",              icon: Smartphone   },
  { to: "/produkte/pakete/webseite",                 icon: Globe        },
  { to: "/produkte/pakete/kassensystem",             icon: Monitor      },
  { to: "/produkte/add-ons/transaktionsumlage",      icon: Percent      },
];
```

2. `Footer.tsx` — prodRoutes aktualisieren:
```typescript
const prodRoutes = [
  "/produkte/pakete/online-bestellshop",
  "/produkte/pakete/bestell-app",
  "/produkte/pakete/webseite",
  "/produkte/pakete/kassensystem",
  "/produkte/add-ons/transaktionsumlage",
];
```

3. Commit:
```bash
git add src/components/landing/Navbar.tsx src/components/landing/Footer.tsx
git commit -m "refactor(nav): update product navigation links to /produkte/pakete/*"
```

---

## Task 6: Landing-Komponenten (Hero + Showcase + Solution)

**Files affected:**
- `src/components/landing/HeroScrollSection.tsx` — Zeilen 63-64
- `src/components/landing/HeroSectionB.tsx` — Zeilen 89-90
- `src/components/landing/ProductShowcaseAccordionSection.tsx` — Zeilen 18, 25, 32, 39, 46
- `src/components/landing/SolutionSection.tsx` — Zeile 8

**Steps:**

1. `HeroScrollSection.tsx` + `HeroSectionB.tsx`:
   - `/produkte/webshop` → `/produkte/pakete/online-bestellshop`
   - `/produkte/kassensystem` → `/produkte/pakete/kassensystem`

2. `ProductShowcaseAccordionSection.tsx`:
   - `ctaUrl: "/produkte/webseite"` → `ctaUrl: "/produkte/pakete/webseite"`
   - `ctaUrl: "/produkte/webshop"` → `ctaUrl: "/produkte/pakete/online-bestellshop"`
   - `ctaUrl: "/produkte/app"` → `ctaUrl: "/produkte/pakete/bestell-app"`
   - `ctaUrl: "/produkte/kassensystem"` → `ctaUrl: "/produkte/pakete/kassensystem"` (2×)

3. `SolutionSection.tsx`:
   - `"/produkte/webshop"` → `"/produkte/pakete/online-bestellshop"`
   - `"/produkte/bestellapp"` → `"/produkte/pakete/bestell-app"`

4. Commit:
```bash
git add src/components/landing/
git commit -m "refactor(landing): update hardcoded product links to /produkte/pakete/*"
```

---

## Task 7: ProduktePage.tsx — Zentrales Produkt-Hub

**Files affected:**
- `src/pages/ProduktePage.tsx` — PROD_ROUTES, ADDON_ROUTES, KASSEN_ROUTES, href arrays, FAQ Markdown-Links

**Steps:**

1. Alle `const`-Arrays auf Zeilen 126-130 aktualisieren:
```typescript
const PROD_ROUTES = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/pakete/webseite", "/produkte/pakete/kassensystem"];
const ADDON_ROUTES = ["/produkte/add-ons/transaktionsumlage", "/produkte/pakete/bestell-app"];
const KASSEN_ROUTES = ["/produkte/pakete/kassensystem", "/produkte/pakete/kassensystem", "/produkte/pakete/kassensystem"];
```

2. Die `href` Properties in den Product-Card-Definitionen (Zeilen ~147-225) aktualisieren:
   - `href: "/produkte/webshop"` → `href: "/produkte/pakete/online-bestellshop"`
   - `href: "/produkte/app"` → `href: "/produkte/pakete/bestell-app"`
   - `href: "/produkte/webseite"` → `href: "/produkte/pakete/webseite"`
   - `href: "/produkte/kassensystem"` → `href: "/produkte/pakete/kassensystem"` (alle Vorkommen)

3. FAQ Markdown-Links im Text (Zeilen ~43-47, ~93-97, ~290-306) aktualisieren:
   - `[...](/produkte/webshop)` → `[...](/produkte/pakete/online-bestellshop)`
   - `[...](/produkte/webseite)` → `[...](/produkte/pakete/webseite)`
   - `[...](/produkte/kassensystem)` → `[...](/produkte/pakete/kassensystem)`

4. Zeile ~28 + ~78 (omitted lines) ebenfalls prüfen und aktualisieren.

5. Commit:
```bash
git add src/pages/ProduktePage.tsx
git commit -m "refactor(produkte-page): update all internal links to /produkte/pakete/*"
```

---

## Task 8: Produkt-Detail-Seiten (kanonische URLs + interne Links)

**Files affected:**
- `src/pages/WebshopPage.tsx`
- `src/pages/AppPage.tsx`
- `src/pages/WebseitePage.tsx`
- `src/pages/KassePage.tsx`

**Steps:**

1. `WebshopPage.tsx`:
   - Zeile 51: `"https://gastro-master.de/produkte/webshop"` → `"https://gastro-master.de/de/produkte/pakete/online-bestellshop"`
   - Zeile 79: `[...](/produkte/app)` → `[...](/produkte/pakete/bestell-app)`
   - Zeile 431: `canonical: "https://gastro-master.de/produkte/webshop"` → `canonical: "https://gastro-master.de/de/produkte/pakete/online-bestellshop"`
   - Zeile 891: `/produkte/kassensystem` → `/produkte/pakete/kassensystem`
   - Zeile 981: `/produkte/webseite` → `/produkte/pakete/webseite`
   - Zeile 1111: `getCTAConfig("/produkte/webshop")` → `getCTAConfig("/produkte/pakete/online-bestellshop")`

2. `AppPage.tsx`:
   - Zeile 67: Breadcrumb URL → `"https://gastro-master.de/de/produkte/pakete/bestell-app"`
   - Zeile 388: canonical → `"https://gastro-master.de/de/produkte/pakete/bestell-app"`
   - Zeile 435: `/produkte/webshop` → `/produkte/pakete/online-bestellshop`
   - Zeile 897: `/produkte/webseite` → `/produkte/pakete/webseite`
   - Zeile 1046: `getCTAConfig("/produkte/app")` → `getCTAConfig("/produkte/pakete/bestell-app")`

3. `WebseitePage.tsx`:
   - Zeile 156: Breadcrumb URL → `"https://gastro-master.de/de/produkte/pakete/webseite"`
   - Zeile 322: canonical → `"https://gastro-master.de/de/produkte/pakete/webseite"`
   - Zeile 1082: `getCTAConfig("/produkte/webseite")` → `getCTAConfig("/produkte/pakete/webseite")`

4. `KassePage.tsx`:
   - Zeile 162: Breadcrumb URL → `"https://gastro-master.de/de/produkte/pakete/kassensystem"`
   - Zeile 725: canonical → `"https://gastro-master.de/de/produkte/pakete/kassensystem"`
   - Zeile 1132: `getCTAConfig("/produkte/kassensystem")` → `getCTAConfig("/produkte/pakete/kassensystem")`

5. Commit:
```bash
git add src/pages/WebshopPage.tsx src/pages/AppPage.tsx src/pages/WebseitePage.tsx src/pages/KassePage.tsx
git commit -m "refactor(product-pages): update canonical URLs and internal links to /produkte/pakete/*"
```

---

## Task 9: Lösungs-Seiten (interne Links)

**Files affected:**
- `src/pages/LoesungenPage.tsx` — Zeilen 52-55
- `src/pages/RestaurantPage.tsx` — Zeilen 48, 352
- `src/pages/FranchisePage.tsx` — Zeilen 56, 422, 781
- `src/pages/LieferdienstPage.tsx` — Zeilen 48, 352
- `src/pages/LieferserviceGruendenPage.tsx` — Zeilen 41, 43
- `src/pages/CafeBaeckereiPage.tsx` — Zeilen 38, 346
- `src/pages/GhostKitchenPage.tsx` — Zeile 23

**Steps:**

1. In jeder Datei alle `/produkte/webshop` → `/produkte/pakete/online-bestellshop` ersetzen.
2. In jeder Datei alle `/produkte/app` → `/produkte/pakete/bestell-app` ersetzen.
3. In jeder Datei alle `/produkte/webseite` → `/produkte/pakete/webseite` ersetzen.
4. In jeder Datei alle `/produkte/kassensystem` → `/produkte/pakete/kassensystem` ersetzen.

5. Commit:
```bash
git add src/pages/LoesungenPage.tsx src/pages/RestaurantPage.tsx src/pages/FranchisePage.tsx src/pages/LieferdienstPage.tsx src/pages/LieferserviceGruendenPage.tsx src/pages/CafeBaeckereiPage.tsx src/pages/GhostKitchenPage.tsx
git commit -m "refactor(loesungen): update all product links to /produkte/pakete/*"
```

---

## Task 10: Weitere Seiten (PreisePage, TransaktionsumlagePage, AddOnsPage)

**Files affected:**
- `src/pages/PreisePage.tsx` — Zeile 122
- `src/pages/TransaktionsumlagePage.tsx` — Zeilen 575, 577, 880, 900
- `src/pages/AddOnsPage.tsx` — Zeile 273

**Steps:**

1. `PreisePage.tsx` Zeile 122:
```typescript
const INTEGRATION_HREFS = ["/produkte/pakete/webseite", "/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app", "/produkte/pakete/kassensystem"];
```

2. `TransaktionsumlagePage.tsx` alle `/produkte/webshop` → `/produkte/pakete/online-bestellshop`, `/produkte/app` → `/produkte/pakete/bestell-app`.

3. `AddOnsPage.tsx` Zeile 273: `/produkte/kassensystem` → `/produkte/pakete/kassensystem`.

4. Commit:
```bash
git add src/pages/PreisePage.tsx src/pages/TransaktionsumlagePage.tsx src/pages/AddOnsPage.tsx
git commit -m "refactor(misc-pages): update product links to /produkte/pakete/*"
```

---

## Task 11: Add-On-Seiten (INTERNAL_LINK_PATHS)

**Files affected:**
- `src/pages/add-ons/QRCodeFlyerPage.tsx` — Zeile 13
- `src/pages/add-ons/FahrerAppGpsPage.tsx` — Zeile 16
- `src/pages/add-ons/QRCodeTischsystemPage.tsx` — Zeile 14
- `src/pages/add-ons/BildschirmfunktionPage.tsx` — Zeile 14
- `src/pages/add-ons/KioskPage.tsx` — Zeile 14

**Steps:**

1. `QRCodeFlyerPage.tsx`:
```typescript
const INTERNAL_LINK_PATHS = ["/produkte/pakete/online-bestellshop", "/produkte/pakete/bestell-app"];
```

2. `FahrerAppGpsPage.tsx`:
```typescript
const INTERNAL_LINK_PATHS = ["/produkte/pakete/kassensystem", "/loesungen/lieferdienst"];
```

3. `QRCodeTischsystemPage.tsx`, `BildschirmfunktionPage.tsx`, `KioskPage.tsx`:
```typescript
const INTERNAL_LINK_PATHS = ["/produkte/pakete/kassensystem", "/loesungen/restaurant"];
```

4. Commit:
```bash
git add src/pages/add-ons/
git commit -m "refactor(add-ons): update INTERNAL_LINK_PATHS to /produkte/pakete/*"
```

---

## Task 12: Build-Verifikation

**Steps:**

1. Dev-Server starten und testen:
```bash
npm run dev
```
Folgende URLs manuell prüfen:
- `http://localhost:8080/de/produkte/pakete/online-bestellshop` ✓
- `http://localhost:8080/de/produkte/pakete/bestell-app` ✓
- `http://localhost:8080/de/produkte/pakete/webseite` ✓
- `http://localhost:8080/de/produkte/pakete/kassensystem` ✓
- `http://localhost:8080/de/produkte/webshop` → Redirect zu pakete/ ✓
- `http://localhost:8080/en/produkte/pakete/online-bestellshop` ✓

2. Production Build:
```bash
npm run build
```
Erwartete Ausgabe: `✓ built in X.XXs` ohne Fehler.

3. Final Commit (falls noch offene Änderungen):
```bash
git add -A
git commit -m "chore: finalize /produkte/pakete/* URL restructure"
```
