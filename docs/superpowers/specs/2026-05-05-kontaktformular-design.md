# Kontaktformular Funktionalisierung — Design Spec

**Datum:** 2026-05-05
**Branch:** TBD (wird in Implementation-Plan-Phase angelegt)
**Status:** Approved (Brainstorming-Phase abgeschlossen)
**Author:** Salvatore Anzaldi + Claude (Brainstorming) + Claude Cowork (Review)

---

## 1. Ziel

Die `/kontakt`-Seite ist UI-fertig, aber das Formular ist nicht funktional. Aktuell sendet es einen `POST /api/contact`, der ins Leere läuft (kein Backend). Diese Spec definiert die Implementierung des Backends, sodass eingehende Anfragen via E-Mail an `info@gastro-master.de` zugestellt werden.

**Kontext:** Diese Funktionalität ist der **letzte fehlende Baustein vor dem Go-Live** der neuen Site. Aktuell läuft `gastro-master.de` noch auf einer alten WordPress-Instanz; das neue React/Vite-Projekt läuft auf einer Vercel-Preview-URL. Sobald das Kontaktformular live ist, übernimmt die neue Site die Domain.

---

## 2. Anforderungen

### Funktional
- **F1:** Form-Submit auf `/kontakt` versendet alle eingegebenen Daten via E-Mail an `info@gastro-master.de`
- **F2:** Salvatore kann direkt aus seinem Mail-Client antworten — die Reply-To-Adresse ist die E-Mail des Kunden
- **F3:** UI zeigt Erfolgs- oder Fehler-Feedback nach dem Submit
- **F4:** Existierende UI bleibt visuell unverändert (kein Regression-Risiko)

### Nicht-funktional
- **NF1:** Spam-Schutz: Honeypot (primär) + Rate-Limit (sekundär)
- **NF2:** DoS-Schutz: 5000-Zeichen-Limit auf `message`-Feld
- **NF3:** XSS-Schutz: Alle User-Inputs werden HTML-escaped, bevor sie in die Mail eingebettet werden
- **NF4:** Failure-Resilience: Fail-open bei KV-Outage (lieber Spam-Risiko als Lead-Verlust)
- **NF5:** Free-Tier-Compliance: Resend (100 Mails/Tag, 3.000/Monat) reicht für Lead-Volumen

### Out of Scope (für Phase A)
- ❌ Bestätigungsmail an den Kunden (verschoben auf Phase C, nach DNS-Migration)
- ❌ Custom-From-Adresse `noreply@gastro-master.de` (Phase C)
- ❌ DSGVO-Datenschutz-Update (Phase C, sobald Kunden-Mails versendet werden)
- ❌ Cloudflare Turnstile o.ä. echtes Captcha (Phase D, falls Honeypot+RateLimit nicht reicht)

---

## 3. Architektur

```
[Browser: src/pages/Kontakt.tsx]
    ↓ POST /api/contact (JSON: form data + honeypot)
    ↓
[Vercel Serverless Function: api/contact.ts]
    │
    ├─→ 1. Validate
    │     ├─ honeypot empty?              → if not: silent 200 (Bot-Trap)
    │     ├─ datenschutz === true?        → if not: 400
    │     ├─ required fields present?     → if not: 400
    │     └─ email format valid?          → if not: 400
    │
    ├─→ 2. Length-Limit
    │     └─ message.length > 5000?       → truncate to 5000 + "[gekürzt]"
    │
    ├─→ 3. Rate-Limit (Vercel KV)
    │     ├─ try: KV-Lookup IP-counter
    │     │   └─ if count >= 5/h          → 429
    │     │   └─ else: increment, set TTL=3600s
    │     └─ catch (KV-Outage): FAIL-OPEN, proceed without limit
    │
    ├─→ 4. Sanitize
    │     └─ HTML-escape all user inputs
    │
    └─→ 5. Resend SDK
          └─ resend.emails.send({ from, to, replyTo, subject, html })
[Resend API]
    └─→ deliver to info@gastro-master.de
```

---

## 4. Komponenten

### 4.1 Neu: `api/contact.ts` (Vercel Serverless Function)

**Runtime:** Node.js 20.x (Vercel default)
**Endpoint:** `POST /api/contact`
**Geschätzte Größe:** ~120 Zeilen TypeScript

**Verantwortlichkeiten:**
- Request-Body-Validierung (Zod oder manuell)
- Honeypot-Detection (silent fail bei Treffer)
- Rate-Limit via `@vercel/kv` (fail-open bei KV-Error)
- HTML-Escape aller User-Eingaben
- Resend-API-Call mit gestaltetem HTML-Body
- Klares HTTP-Status-Mapping (siehe §6 Error Handling)

**Dependencies:**
- `resend` (~7 KB)
- `@upstash/redis` (~15 KB) — Vendor-recommended Path. Vercel KV wurde 2025 deprecated; `@vercel/kv` ist mittlerweile nur ein Wrapper um `@upstash/redis`. Direkt-Integration ist zukunftssicher und eine Abstraktions-Ebene weniger.

### 4.2 Edit: `src/pages/Kontakt.tsx` (minimal)

**Änderungen:**
1. Honeypot-Feld zum Form-State hinzufügen (z.B. `website: ""`)
2. Hidden Input rendern: `<input type="text" name="website" tabIndex={-1} aria-hidden style={{position: "absolute", left: "-9999px"}} />`
3. `maxLength={5000}` auf `<textarea>` als UX-Hinweis (Backend-Limit ist die echte Sicherung)

**Was NICHT geändert wird:**
- Visible UI (Felder, Layout, Styles)
- handleSubmit-Logik (sendet bereits korrekt an `/api/contact`)
- i18n-Strings
- Datenschutz-Checkbox-UI
- Fake-"Recaptcha"-Checkbox (bleibt im UI, wird im Backend ignoriert)

### 4.3 Edit: `package.json`

```diff
"dependencies": {
+   "resend": "^4.0.0",
+   "@upstash/redis": "^1.34.0",
    ...
}
```

**Init-Pattern (siehe Task 5 im Plan):**
```typescript
import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
```

**Hintergrund:** Vercel's Upstash-Integration setzt die Env-Vars als `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Vercel-Naming, nicht Upstash-Naming). `Redis.fromEnv()` würde nach `UPSTASH_REDIS_REST_URL` suchen und failen — daher explizite Init mit den Vercel-Vars.

### 4.4 Manuell durch Salvatore (Vercel Dashboard)

| Schritt | Wo | Geschätzte Zeit |
|---------|-----|-----------------|
| Resend Account erstellen | resend.com | 2 Min |
| API-Key generieren | Resend Dashboard → API Keys | 1 Min |
| Vercel KV Database aktivieren | Vercel Dashboard → Storage → Create KV | 5 Min |
| KV mit Project verlinken | Vercel Project → Storage Tab | 1 Min |
| `RESEND_API_KEY` als Env-Var setzen | Vercel Project → Settings → Env Variables | 1 Min |

KV-Connection-Vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) werden von Vercel automatisch beim Linken gesetzt.

---

## 5. E-Mail-Format

### Header

```
From:      Gastro Master Kontakt <onboarding@resend.dev>
To:        [info@gastro-master.de, rene.ebert@gastro-master.de,
            sanjaya.p@gastro-master.de, s.anzaldi@gastro-master.de]
Reply-To:  {form.email}                ← Direktantwort möglich
Subject:   Neue Kontaktanfrage: {form.name}{restaurant ? ` (${form.restaurant})` : ""}
```

**Multi-Recipient via Env-Var:** Empfänger-Liste wird aus `process.env.CONTACT_RECIPIENTS` (komma-separiert) gelesen, NICHT hardcoded. Vorteil: Änderungen ohne Redeploy.

**Konfiguration in Vercel Env-Vars:**
```
CONTACT_RECIPIENTS=info@gastro-master.de,rene.ebert@gastro-master.de,sanjaya.p@gastro-master.de,s.anzaldi@gastro-master.de
```

**Empfänger-Mapping (Phase A):**
| Adresse | Rolle |
|---------|-------|
| `info@gastro-master.de` | Konsistenz mit Alt-Setup (WordPress-Form) |
| `rene.ebert@gastro-master.de` | Founder, primärer Lead-Responder (24h SLA) |
| `sanjaya.p@gastro-master.de` | Founder, Backend-Lead |
| `s.anzaldi@gastro-master.de` | Operations + Form-Optimierung |

**Fail-fast-Verhalten:** Wenn `CONTACT_RECIPIENTS` fehlt oder leer ist, antwortet die Function mit `500` + Fehlermeldung "Server-Konfiguration unvollständig". Verhindert Silent-Drop von Leads in Misconfig-Szenarien.

**MX-Verifikation (vor Go-Live):** `gastro-master.de` läuft bereits auf Google Workspace (MX-Records geprüft). Alle 4 Adressen sind aktive Mailboxen — keine Blocker.

**Subject-Fallback:** Wenn `restaurant` leer ist, wird die Klammer komplett weggelassen. Beispiel: `Neue Kontaktanfrage: Max Mustermann` (statt `... ()`).

**Initial:** `onboarding@resend.dev` (sofort einsatzbereit, kein DNS-Setup nötig).
**Phase C:** `noreply@gastro-master.de` (nach DNS-Migration weg von WordPress + Resend-Domain-Verification).

### HTML-Body

Tabellarische Auflistung aller Form-Felder:

```html
<h2>Neue Kontaktanfrage</h2>
<table>
  <tr><td><strong>Name:</strong></td><td>{escape(name)}</td></tr>
  <tr><td><strong>Restaurant:</strong></td><td>{escape(restaurant) || "—"}</td></tr>
  <tr><td><strong>PLZ:</strong></td><td>{escape(plz) || "—"}</td></tr>
  <tr><td><strong>Telefon:</strong></td><td>{escape(phone)}</td></tr>
  <tr><td><strong>E-Mail:</strong></td><td>{escape(email)}</td></tr>
  <tr><td><strong>Interessiert an:</strong></td><td>{products.length > 0 ? escape(products.join(", ")) : "(keine Auswahl)"}</td></tr>
  <tr><td colspan="2"><strong>Nachricht:</strong></td></tr>
  <tr><td colspan="2">{escape(message).replace(/\n/g, "<br>")}</td></tr>
  <tr><td><strong>Datenschutz:</strong></td><td>✅ akzeptiert</td></tr>
  <tr><td><strong>Eingegangen:</strong></td><td>{ISO-Timestamp}</td></tr>
</table>
```

**Kritische Formatierungs-Details:**
1. **Newline-Konvertierung:** Nach `escape(message)` werden `\n` → `<br>` konvertiert. Sonst werden mehrzeilige Kunden-Nachrichten als unleserlicher Single-Line-Block gerendert.
2. **Empty-Fallbacks:** Optionale Felder (`restaurant`, `plz`, `products`) zeigen `—` bzw. `(keine Auswahl)` statt leerer Zellen.
3. **Reihenfolge der String-Operationen:** Immer `escape()` ZUERST, dann `\n`-Konvertierung. Sonst entsteht `&lt;br&gt;` statt `<br>`.

---

## 6. Error Handling

| Szenario | HTTP-Status | UI-Message | Verhalten |
|----------|-------------|------------|-----------|
| Honeypot ausgefüllt | `200 OK` | "Erfolg" | Silent fail (Bot weiß nichts), keine Mail |
| Datenschutz nicht akzeptiert | `400` | "Bitte Datenschutz akzeptieren" | Keine Mail |
| Required Field fehlt | `400` | "Bitte alle Pflichtfelder ausfüllen" | Keine Mail |
| E-Mail-Format ungültig | `400` | "Bitte gültige E-Mail eingeben" | Keine Mail |
| Rate-Limit überschritten | `429` | "Zu viele Anfragen, bitte später erneut" | Keine Mail |
| KV-Service ausgefallen | — | (transparent) | **Fail-open: Mail wird gesendet**, Fehler nur geloggt |
| Resend-API down | `500` | "Bitte direkt an info@gastro-master.de mailen" | Keine Mail |
| Erfolg | `200` | "Danke! Wir melden uns innerhalb 24h" | Mail gesendet |

**Kritische Design-Entscheidung — Fail-open bei KV-Outage:**
Wenn Vercel KV nicht erreichbar ist (Outage, Misconfig, Quota), wird der Rate-Limit-Check übersprungen und die Mail trotzdem gesendet. Begründung: Bei einem Lead-Form ist verlorener Lead teurer als 5 Minuten Spam-Risiko. Der Honeypot bleibt aktiv (primärer Schutz, KV ist Sekundär-Schutz).

---

## 7. Testing-Strategie

### Manuelle Tests (vor Production-Deploy)

1. **Happy Path:** Form auf Vercel-Preview ausfüllen, Mail-Empfang in `info@`-Mailbox verifizieren
2. **Honeypot:** Hidden-Field via DevTools ausfüllen, prüfen dass *keine* Mail ankommt aber Erfolgs-UI zeigt
3. **Validation:** Required-Field leer lassen → 400-Response
4. **Rate-Limit:** 6× hintereinander submitten → 6. Anfrage → 429
5. **Length-Limit:** Nachricht > 5000 Zeichen → Mail enthält gekürzten Text + "[gekürzt]"
6. **Reply-To:** In empfangener Mail "Antworten" klicken → Empfänger ist Kunden-E-Mail
7. **Sonderzeichen / Sanitize-Härtetest:** Form mit Restaurant-Name `Stefano's Café & Co.` und Nachricht mit Umlauten + Apostroph + Ampersand + Emoji absenden → Mail empfangen, prüfen:
   - Kein Doppel-Escape (`&amp;amp;` statt `&amp;`)
   - Umlaute (`äöüß`) korrekt dargestellt
   - Apostroph (`'`) korrekt
   - Ampersand (`&`) korrekt als `&amp;` in HTML
   - Emoji rendert (oder zumindest kein Crash)
8. **Newline-Test:** Nachricht mit mehreren Zeilenumbrüchen senden → Mail zeigt visuelle Zeilenumbrüche, keine Wall-of-Text
9. **Empty-Fallback-Test:** Form ohne `restaurant` (leer lassen) und ohne `products` (nichts ankreuzen) → Subject ohne Klammer, Tabelle zeigt `—` und `(keine Auswahl)`

### Automated Tests (optional, post-Go-Live)

- Vitest-Unit-Tests für `api/contact.ts` (Honeypot, Validation, Sanitize)
- Mocking von `resend` + `@vercel/kv`

---

## 8. Roadmap

### Phase A — HEUTE (1.5–2h)
- ✅ `api/contact.ts` implementieren (Resend + KV + Honeypot + Length-Limit)
- ✅ `src/pages/Kontakt.tsx` minimal anpassen (Honeypot + maxLength)
- ✅ Dependencies installieren
- ✅ Vercel Env-Vars + KV setzen (manuell durch Salvatore)
- ✅ Vercel Preview testen (alle 6 manuelle Tests)
- ✅ Production-Deploy / Domain-Cutover

### Phase C — Post Go-Live (1–2h)
- DNS für gastro-master.de auf Vercel umziehen
- Resend Sender-Domain `gastro-master.de` verifizieren (DKIM, SPF, MX)
- From-Adresse umstellen auf `noreply@gastro-master.de`
- Bestätigungsmail an Kunden aktivieren
- Datenschutzerklärung um Resend (US-Sub-Processor) ergänzen

### Phase D — Bei Bedarf
- Cloudflare Turnstile aktivieren, falls Honeypot+KV nicht reicht
- Vitest-Unit-Tests für `api/contact.ts`
- Monitoring (Sentry o.ä.) für Resend-API-Failures

---

## 9. Open Questions / TODOs

- [ ] Salvatore: Resend-Account erstellen + API-Key besorgen
- [ ] Salvatore: Vercel KV Database aktivieren + linken
- [ ] Salvatore: Env-Vars in Vercel setzen
- [ ] Phase C TODO: Datenschutzerklärung um Resend-Sub-Processor-Klausel ergänzen (rechtlich nicht heute relevant, aber merken)
- [ ] Phase C TODO: DNS-Migration weg von WordPress

---

## 10. Approvals

- **Salvatore Anzaldi** (Product Owner): ✅ Approved
- **Claude Cowork** (External Review, 1. Runde): ✅ Approved mit drei Anpassungen — alle übernommen:
  1. Vercel KV statt In-Memory Rate-Limit
  2. 5000-Zeichen-Limit auf message
  3. Fail-open bei KV-Outage
- **Claude Cowork** (External Review, 2. Runde — Spec-Review): ✅ Approved mit zwei Pflicht- und einer optionalen Anpassung — alle übernommen:
  1. **Pflicht:** Newline-Konvertierung im HTML-Body (`\n` → `<br>` nach Escape)
  2. **Pflicht:** Empty-Fallbacks für optionale Felder (Subject ohne leere Klammer, Tabelle mit `—` / `(keine Auswahl)`)
  3. **Optional:** Test 7 — Sonderzeichen-Härtetest (Apostroph, Ampersand, Umlaute, Emoji)
  + zusätzlich aufgenommen: Test 8 (Newline-Verhalten), Test 9 (Empty-Fallback-Verhalten)

- **Salvatore + Cowork** (Pre-Pre-Flight, MX-Check 2026-05-05): ✅ Approved mit Architektur-Anpassung:
  - **Multi-Recipient statt Single-To:** Empfänger-Liste über Env-Var `CONTACT_RECIPIENTS`, nicht hardcoded
  - 4 Adressen für Phase A (info, rene.ebert, sanjaya.p, s.anzaldi)
  - MX-Records bereits auf Google Workspace verifiziert — Mailboxen empfangsbereit
  - Begründung Env-Var statt Hardcode: Recipient-Änderungen ohne Code-Deploy

- **Salvatore + Cowork** (Post-PRE-FLIGHT-Adjustment 2026-05-05): ✅ Architektur-Update:
  - **`@upstash/redis` statt `@vercel/kv`:** Vercel KV wurde 2025 deprecated, Upstash ist Vendor-recommended Path
  - **Explizite Init mit Vercel-Vars (`KV_REST_API_URL` / `KV_REST_API_TOKEN`):** statt `Redis.fromEnv()`, das auf `UPSTASH_REDIS_REST_URL` prüfen würde — Vercel's Integration nutzt KV-prefixed Naming.
