# Plan: Add-Ons URL Restructure

**Goal:** Move all Add-On routes from `/add-ons/*` to `/produkte/add-ons/*` and Transaktionsumlage from `/produkte/transaktionsumlage` to `/produkte/add-ons/transaktionsumlage`, with 301 redirects and full navigation updates.

**Architecture:** This is a pure path-string refactor across the React Router config, CTA config, breadcrumb schemas, canonical URLs, and all internal `<Link>` hrefs. The `useLangPath(path)` hook handles language prefixes automatically — only the base paths need changing. Vercel handles server-side 301 redirects.

**Tech stack:** React Router v6, react-i18next, vercel.json rewrites/redirects, openpyxl (Excel update).

---

## Affected Files (26 total)

### Core config (3 files)
- `src/config/routes.ts` — route definitions (Single Source of Truth)
- `src/data/cta-config.ts` — CTA section configs keyed by path
- `vercel.json` — server-side 301 redirects

### App router (1 file)
- `src/App.tsx` — lazy imports + legacy redirects

### Navigation & shared components (4 files)
- `src/components/landing/Navbar.tsx` — transaktionsumlage nav link
- `src/components/landing/SolutionSection.tsx` — transaktionsumlage in href array
- `src/components/landing/Footer.tsx` — transaktionsumlage in href array
- `src/components/addon/AddOnPageTemplate.tsx` — breadcrumb schema `/add-ons` URL

### Hub & add-on detail pages (6 files)
- `src/pages/AddOnsPage.tsx` — 5 hrefs + canonical + schema + CTA
- `src/pages/add-ons/QRCodeFlyerPage.tsx` — breadcrumb path + ctaPath
- `src/pages/add-ons/FahrerAppGpsPage.tsx` — breadcrumb path + ctaPath
- `src/pages/add-ons/QRCodeTischsystemPage.tsx` — breadcrumb path + ctaPath
- `src/pages/add-ons/BildschirmfunktionPage.tsx` — breadcrumb path + ctaPath
- `src/pages/add-ons/KioskPage.tsx` — breadcrumb path + ctaPath

### Transaktionsumlage page (1 file)
- `src/pages/TransaktionsumlagePage.tsx` — canonical + breadcrumb schema + CTA

### Pages linking to transaktionsumlage (11 files)
- `src/pages/ProduktePage.tsx` — ADDON_ROUTES array + FAQ markdown links + addons card href
- `src/pages/AppPage.tsx` — onClick href
- `src/pages/WebshopPage.tsx` — onClick href
- `src/pages/CafeBaeckereiPage.tsx` — smallHrefs array
- `src/pages/GhostKitchenPage.tsx` — productHrefs array
- `src/pages/LieferserviceGruendenPage.tsx` — bottomHrefs array
- `src/pages/RestaurantPage.tsx` — productHrefs array
- `src/pages/PreisePage.tsx` — `<Link to={lp(…)}>`
- `src/pages/LieferdienstPage.tsx` — cardHrefs array
- `src/pages/FranchisePage.tsx` — productHrefs array
- `src/pages/LoesungenPage.tsx` — href array

---

## Task 1: Update routes.ts (Single Source of Truth)

**Files affected:**
- `src/config/routes.ts`

**Steps:**

1. Open `src/config/routes.ts`.

2. Change transaktionsumlage route (line 31):
   ```
   VORHER: { path: "/produkte/transaktionsumlage", ... }
   NACHHER: { path: "/produkte/add-ons/transaktionsumlage", ... }
   ```

3. Change all 6 add-on routes (lines 44–49):
   ```
   VORHER:  { path: "/add-ons",                    ... }
   NACHHER: { path: "/produkte/add-ons",            ... }

   VORHER:  { path: "/add-ons/qr-code-flyer",      ... }
   NACHHER: { path: "/produkte/add-ons/qr-code-flyer", ... }

   VORHER:  { path: "/add-ons/fahrer-app-gps",     ... }
   NACHHER: { path: "/produkte/add-ons/fahrer-app-gps", ... }

   VORHER:  { path: "/add-ons/qr-code-tischsystem", ... }
   NACHHER: { path: "/produkte/add-ons/qr-code-tischsystem", ... }

   VORHER:  { path: "/add-ons/bildschirmfunktion",  ... }
   NACHHER: { path: "/produkte/add-ons/bildschirmfunktion", ... }

   VORHER:  { path: "/add-ons/kiosk",              ... }
   NACHHER: { path: "/produkte/add-ons/kiosk",     ... }
   ```

4. Verify:
   ```bash
   grep "add-ons\|transaktionsumlage" src/config/routes.ts
   # Expected: all 7 paths start with /produkte/add-ons/
   ```

5. Commit:
   ```bash
   git add src/config/routes.ts
   git commit -m "refactor(routes): move add-ons + transaktionsumlage under /produkte/add-ons"
   ```

---

## Task 2: Update App.tsx (lazy imports + legacy redirects)

**Files affected:**
- `src/App.tsx`

**Steps:**

1. The lazy import KEYS in `LAZY_COMPONENTS` use `@/pages/...` import paths — these do NOT reference URL paths and don't need changing (the file paths on disk stay the same: `src/pages/add-ons/`).

2. Update the legacy redirect for `/add-ons/*` (line 82). Currently `RedirectWithLang` prepends `/de` → result would be `/de/add-ons/...` which no longer exists. Change it to redirect directly to the new path:
   ```tsx
   // VORHER:
   <Route path="/add-ons/*" element={<RedirectWithLang />} />

   // NACHHER: replace with specific redirect that maps to new structure
   <Route path="/add-ons" element={<Navigate to="/de/produkte/add-ons" replace />} />
   <Route path="/add-ons/:slug" element={<AddOnsLegacyRedirect />} />
   ```
   
   And add helper component at bottom of App.tsx:
   ```tsx
   const AddOnsLegacyRedirect = () => {
     const slug = window.location.pathname.replace(/^\/add-ons\//, "");
     return <Navigate to={`/de/produkte/add-ons/${slug}`} replace />;
   };
   ```

3. Add legacy redirect for old transaktionsumlage path (before the `/:lang` route):
   ```tsx
   <Route path="/produkte/transaktionsumlage" element={<Navigate to="/de/produkte/add-ons/transaktionsumlage" replace />} />
   ```

4. Verify:
   ```bash
   npx tsc --noEmit
   # Expected: 0 errors
   ```

5. Commit:
   ```bash
   git add src/App.tsx
   git commit -m "refactor(router): update legacy redirects for add-ons + transaktionsumlage"
   ```

---

## Task 3: Update cta-config.ts

**Files affected:**
- `src/data/cta-config.ts`

**Steps:**

1. Update the 7 config keys and their `productPath` values:
   ```
   "/produkte/transaktionsumlage"  →  "/produkte/add-ons/transaktionsumlage"
   "/add-ons"                      →  "/produkte/add-ons"
   "/add-ons/qr-code-flyer"       →  "/produkte/add-ons/qr-code-flyer"
   "/add-ons/fahrer-app-gps"      →  "/produkte/add-ons/fahrer-app-gps"
   "/add-ons/qr-code-tischsystem" →  "/produkte/add-ons/qr-code-tischsystem"
   "/add-ons/bildschirmfunktion"  →  "/produkte/add-ons/bildschirmfunktion"
   "/add-ons/kiosk"               →  "/produkte/add-ons/kiosk"
   ```

2. Verify:
   ```bash
   grep "add-ons\|transaktionsumlage" src/data/cta-config.ts
   # Expected: all keys use /produkte/add-ons/
   ```

5. Commit:
   ```bash
   git add src/data/cta-config.ts
   git commit -m "refactor(cta): update add-ons + transaktionsumlage paths"
   ```

---

## Task 4: Update shared components (Navbar, Footer, SolutionSection, AddOnPageTemplate)

**Files affected:**
- `src/components/landing/Navbar.tsx`
- `src/components/landing/Footer.tsx`
- `src/components/landing/SolutionSection.tsx`
- `src/components/addon/AddOnPageTemplate.tsx`

**Steps:**

1. **Navbar.tsx** — line 24: change `to` prop:
   ```
   VORHER: { to: "/produkte/transaktionsumlage", icon: Percent }
   NACHHER: { to: "/produkte/add-ons/transaktionsumlage", icon: Percent }
   ```

2. **Footer.tsx** — line 10: update in href array:
   ```
   VORHER: "/produkte/transaktionsumlage"
   NACHHER: "/produkte/add-ons/transaktionsumlage"
   ```

3. **SolutionSection.tsx** — line 8: update in featureHrefPaths:
   ```
   VORHER: ["/produkte/webshop", "/produkte/bestellapp", "/produkte/transaktionsumlage", null]
   NACHHER: ["/produkte/webshop", "/produkte/bestellapp", "/produkte/add-ons/transaktionsumlage", null]
   ```

4. **AddOnPageTemplate.tsx** — line 534: update breadcrumb schema URL:
   ```
   VORHER: item: "https://gastro-master.de/add-ons"
   NACHHER: item: "https://gastro-master.de/produkte/add-ons"
   ```

5. Verify:
   ```bash
   grep "add-ons\|transaktionsumlage" src/components/landing/Navbar.tsx src/components/landing/Footer.tsx src/components/landing/SolutionSection.tsx src/components/addon/AddOnPageTemplate.tsx
   # Expected: all references use /produkte/add-ons/
   ```

6. Commit:
   ```bash
   git add src/components/landing/Navbar.tsx src/components/landing/Footer.tsx src/components/landing/SolutionSection.tsx src/components/addon/AddOnPageTemplate.tsx
   git commit -m "refactor(components): update add-ons + transaktionsumlage nav paths"
   ```

---

## Task 5: Update AddOnsPage.tsx (hub page)

**Files affected:**
- `src/pages/AddOnsPage.tsx`

**Steps:**

1. Update 5 `href` values in the ADDONS array (lines 26–30):
   ```
   "/add-ons/qr-code-flyer"       →  "/produkte/add-ons/qr-code-flyer"
   "/add-ons/fahrer-app-gps"      →  "/produkte/add-ons/fahrer-app-gps"
   "/add-ons/qr-code-tischsystem" →  "/produkte/add-ons/qr-code-tischsystem"
   "/add-ons/bildschirmfunktion"  →  "/produkte/add-ons/bildschirmfunktion"
   "/add-ons/kiosk"               →  "/produkte/add-ons/kiosk"
   ```

2. Update breadcrumb schema (line 41):
   ```
   VORHER: item: "https://gastro-master.de/add-ons"
   NACHHER: item: "https://gastro-master.de/produkte/add-ons"
   ```

3. Update canonical (line 137):
   ```
   VORHER: canonical: "https://gastro-master.de/add-ons"
   NACHHER: canonical: "https://gastro-master.de/produkte/add-ons"
   ```

4. Update WebPage schema url (line 145):
   ```
   VORHER: url: "https://gastro-master.de/add-ons"
   NACHHER: url: "https://gastro-master.de/produkte/add-ons"
   ```

5. Update CTA call (line 339):
   ```
   VORHER: getCTAConfig("/add-ons")
   NACHHER: getCTAConfig("/produkte/add-ons")
   ```

6. Commit:
   ```bash
   git add src/pages/AddOnsPage.tsx
   git commit -m "refactor(AddOnsPage): update all paths to /produkte/add-ons"
   ```

---

## Task 6: Update 5 add-on detail pages

**Files affected:**
- `src/pages/add-ons/QRCodeFlyerPage.tsx`
- `src/pages/add-ons/FahrerAppGpsPage.tsx`
- `src/pages/add-ons/QRCodeTischsystemPage.tsx`
- `src/pages/add-ons/BildschirmfunktionPage.tsx`
- `src/pages/add-ons/KioskPage.tsx`

**Pattern per file (2 lines each):**
```
breadcrumb: { name: t("meta.breadcrumbName"), path: "/add-ons/SLUG" }
  →  path: "/produkte/add-ons/SLUG"

ctaPath: "/add-ons/SLUG"
  →  ctaPath: "/produkte/add-ons/SLUG"
```

Also: each file has a `canonical: "https://gastro-master.de/add-ons/SLUG"` — update to `"/produkte/add-ons/SLUG"`.

**Specific changes:**

| File | Old path | New path |
|---|---|---|
| QRCodeFlyerPage.tsx | `/add-ons/qr-code-flyer` | `/produkte/add-ons/qr-code-flyer` |
| FahrerAppGpsPage.tsx | `/add-ons/fahrer-app-gps` | `/produkte/add-ons/fahrer-app-gps` |
| QRCodeTischsystemPage.tsx | `/add-ons/qr-code-tischsystem` | `/produkte/add-ons/qr-code-tischsystem` |
| BildschirmfunktionPage.tsx | `/add-ons/bildschirmfunktion` | `/produkte/add-ons/bildschirmfunktion` |
| KioskPage.tsx | `/add-ons/kiosk` | `/produkte/add-ons/kiosk` |

**Commit:**
```bash
git add src/pages/add-ons/
git commit -m "refactor(add-on pages): update breadcrumb + canonical + ctaPath to /produkte/add-ons"
```

---

## Task 7: Update TransaktionsumlagePage.tsx

**Files affected:**
- `src/pages/TransaktionsumlagePage.tsx`

**Steps:**

1. Update breadcrumb schema (line 109):
   ```
   VORHER: "item": "https://gastro-master.de/produkte/transaktionsumlage"
   NACHHER: "item": "https://gastro-master.de/produkte/add-ons/transaktionsumlage"
   ```

2. Update canonical (line 510):
   ```
   VORHER: canonical: "https://gastro-master.de/produkte/transaktionsumlage"
   NACHHER: canonical: "https://gastro-master.de/produkte/add-ons/transaktionsumlage"
   ```

3. Update CTA call (line 1047):
   ```
   VORHER: getCTAConfig("/produkte/transaktionsumlage")
   NACHHER: getCTAConfig("/produkte/add-ons/transaktionsumlage")
   ```

4. Commit:
   ```bash
   git add src/pages/TransaktionsumlagePage.tsx
   git commit -m "refactor(TransaktionsumlagePage): update canonical + breadcrumb + CTA path"
   ```

---

## Task 8: Update all pages that link to transaktionsumlage (11 files)

**Files affected:**
All files contain `"/produkte/transaktionsumlage"` as a string in an array or onClick handler.
Replace `"/produkte/transaktionsumlage"` → `"/produkte/add-ons/transaktionsumlage"` in:

| File | Location |
|---|---|
| `src/pages/ProduktePage.tsx` | `ADDON_ROUTES` array (line 128), FAQ markdown links (lines 49, 99, 314), addons card `href` (line 186) |
| `src/pages/AppPage.tsx` | `onClick` href (line 936) |
| `src/pages/WebshopPage.tsx` | `onClick` href (line 1023) |
| `src/pages/CafeBaeckereiPage.tsx` | `smallHrefs` array (line 38) |
| `src/pages/GhostKitchenPage.tsx` | `productHrefs` array (line 23) |
| `src/pages/LieferserviceGruendenPage.tsx` | `bottomHrefs` array (line 43) |
| `src/pages/RestaurantPage.tsx` | `productHrefs` array (line 48) |
| `src/pages/PreisePage.tsx` | `<Link to={lp(…)}>` (line 495) |
| `src/pages/LieferdienstPage.tsx` | `cardHrefs` array (line 48) |
| `src/pages/FranchisePage.tsx` | `productHrefs` array (line 56) |
| `src/pages/LoesungenPage.tsx` | href array (line 56) |

**Steps:**

Use global find-and-replace: `"/produkte/transaktionsumlage"` → `"/produkte/add-ons/transaktionsumlage"` across all `.tsx` files.

Also in `ProduktePage.tsx` markdown FAQ links: `](/produkte/transaktionsumlage)` → `](/produkte/add-ons/transaktionsumlage)`.

**Verify:**
```bash
grep -rn "/produkte/transaktionsumlage" src/ --include="*.tsx" --include="*.ts"
# Expected: 0 results (all migrated)
```

**Commit:**
```bash
git add src/pages/
git commit -m "refactor(pages): update all transaktionsumlage links to /produkte/add-ons"
```

---

## Task 9: Add 301 redirects to vercel.json

**Files affected:**
- `vercel.json`

**Steps:**

1. Current `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

2. Add `redirects` array **before** `rewrites` (redirects take priority):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "redirects": [
       { "source": "/:lang(de|en|it|fa|si|ru)/add-ons",       "destination": "/:lang/produkte/add-ons",       "permanent": true },
       { "source": "/:lang(de|en|it|fa|si|ru)/add-ons/:slug", "destination": "/:lang/produkte/add-ons/:slug", "permanent": true },
       { "source": "/:lang(de|en|it|fa|si|ru)/produkte/transaktionsumlage", "destination": "/:lang/produkte/add-ons/transaktionsumlage", "permanent": true }
     ],
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

3. Verify JSON syntax:
   ```bash
   python3 -c "import json; json.load(open('vercel.json')); print('valid JSON')"
   # Expected: valid JSON
   ```

4. Commit:
   ```bash
   git add vercel.json
   git commit -m "feat(vercel): add 301 redirects for add-ons + transaktionsumlage URL restructure"
   ```

---

## Task 10: TypeScript build verification

**Steps:**

1. TypeScript check:
   ```bash
   npx tsc --noEmit
   # Expected: 0 errors
   ```

2. Full build:
   ```bash
   npm run build
   # Expected: no errors, dist/ generated
   ```

3. Final grep to ensure no old paths remain:
   ```bash
   grep -rn '"/add-ons' src/ --include="*.tsx" --include="*.ts"
   grep -rn '"/produkte/transaktionsumlage"' src/ --include="*.tsx" --include="*.ts"
   # Expected: 0 results each
   ```

4. Final commit:
   ```bash
   git add -A
   git commit -m "chore: verify add-ons URL restructure — all paths updated"
   ```

---

## SEO Notes (301 Redirects Documentation)

```
/de/add-ons                              → /de/produkte/add-ons                              [301]
/de/add-ons/qr-code-flyer               → /de/produkte/add-ons/qr-code-flyer               [301]
/de/add-ons/fahrer-app-gps              → /de/produkte/add-ons/fahrer-app-gps              [301]
/de/add-ons/qr-code-tischsystem         → /de/produkte/add-ons/qr-code-tischsystem         [301]
/de/add-ons/bildschirmfunktion          → /de/produkte/add-ons/bildschirmfunktion          [301]
/de/add-ons/kiosk                       → /de/produkte/add-ons/kiosk                       [301]
/de/produkte/transaktionsumlage         → /de/produkte/add-ons/transaktionsumlage          [301]
(gleich für /en/, /it/, /fa/, /si/, /ru/)
```

Alle Redirects werden von Vercel als HTTP 301 ausgeliefert, bevor der React-Client lädt → volle SEO-Wirkung.
