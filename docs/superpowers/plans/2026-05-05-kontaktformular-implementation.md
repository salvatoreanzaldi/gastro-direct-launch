# Plan: Kontaktformular Funktionalisierung (Phase A) [ARCHIVIERT]

> ## 🗄️ ARCHIVIERT 2026-05-11 — Strategie-Wechsel zu Plan D
>
> **Dieser Plan wird nicht weiter ausgeführt.** Tasks 1–8 wurden umgesetzt, der Code befindet sich auf Branch `feat/kontakt-form-functional`. Beim Live-Test in Task 9 trat die Resend-Sandbox-Sperre auf, woraufhin gemeinsam mit Sanju (Chef-Entwickler) ein Strategie-Wechsel zu **Plan D: All-Inkl + PHP + SMTP** beschlossen wurde.
>
> **Was bleibt aus diesem Plan:**
> - 9 manuelle Tests aus Task 9 — werden in Plan D wiederverwendet
> - Frontend-Honeypot in `src/pages/Kontakt.tsx` — bleibt erhalten, nur Endpoint-URL wechselt
>
> **Was wird verworfen / nicht deployed:**
> - Branch `feat/kontakt-form-functional` Code (`api/_lib/*`, `api/contact.ts`, Vercel-Env-Vars)
> - Tasks 9 (Vercel Preview) + 10 (Production Deploy) — werden in Plan D ersetzt durch PHP-Deploy + Frontend-Endpoint-Switch
>
> **Aktive Doku:** Spec [`docs/superpowers/specs/2026-05-11-kontaktformular-plan-d.md`](../specs/2026-05-11-kontaktformular-plan-d.md) *(in Erstellung)*

---

**Goal:** Aktivierung des `/kontakt`-Formulars sodass Anfragen via Resend an `info@gastro-master.de` versendet werden.
**Architecture:** Vercel Serverless Function `api/contact.ts` mit Resend (E-Mail-Versand) + Vercel KV (Rate-Limiting, fail-open).
**Tech stack:** TypeScript, Vercel Functions (Node.js 20), `resend@^4`, `@vercel/kv@^3`, Vitest (für Pure-Function-Tests).
**Spec reference:** `docs/superpowers/specs/2026-05-05-kontaktformular-design.md`

---

## ⚠️ PRE-FLIGHT: Manuelle Schritte durch Salvatore (BEVOR Code-Tasks)

Diese Schritte müssen **VOR** Task 1 abgeschlossen sein, sonst crasht der Production-Deploy mit "RESEND_API_KEY undefined".

### PF-1: Resend-Account einrichten (~3 Min)

1. Auf [resend.com](https://resend.com) Account erstellen (Google-Login möglich)
2. Email verifizieren
3. Im Dashboard → "API Keys" → "Create API Key"
   - Name: `Gastro Master Production`
   - Permission: `Sending access` (Full Access nicht nötig)
   - Domain: `*` (alle Domains, da wir initial `onboarding@resend.dev` nutzen)
4. Den generierten Key (`re_xxx...`) **sofort kopieren** und sicher speichern (z.B. 1Password)
   - Resend zeigt den Key nur **einmal**
5. Verify im Dashboard:
   - Status der Domain `onboarding@resend.dev`: ✅ verifiziert (default)
   - Free Tier: 100 Mails/Tag, 3.000/Monat

**Done-Check:** API-Key liegt sicher kopiert vor.

### PF-2: Vercel KV Database aktivieren (~5 Min)

1. Vercel Dashboard → Project `gastro-direct-launch` → **Storage** Tab
2. "Create Database" → **Upstash for Redis** wählen
   - (Vercel hat seit Anfang 2025 KV durch Upstash partnership ersetzt — funktioniert identisch)
3. Region: **Frankfurt (eu-central-1)** für DSGVO-Konformität + niedrige Latenz
4. Plan: **Free** (10.000 Commands/Tag, reicht für ~10.000 Form-Submits)
5. "Create"
6. Nach Anlage: "Connect Project" → `gastro-direct-launch` linken → alle Environments (Production + Preview + Development)
7. Vercel setzt automatisch folgende Env-Vars im Project:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

**Done-Check:** Im Vercel Project → Settings → Environment Variables siehst du die 4 `KV_*` Vars für alle Environments.

### PF-3: Env-Vars setzen (~3 Min)

Zwei Env-Vars sind nötig: `RESEND_API_KEY` (Auth) und `CONTACT_RECIPIENTS` (Empfänger-Liste).

1. Vercel Dashboard → Project → Settings → **Environment Variables**

2. **Variable 1 — Resend API Key:**
   - "Add New":
     - Key: `RESEND_API_KEY`
     - Value: (der Key aus PF-1, `re_xxx...`)
     - Environments: ✅ Production, ✅ Preview, ✅ Development (alle 3 ankreuzen)
   - "Save"

3. **Variable 2 — Recipient-Liste (Multi-To):**
   - "Add New":
     - Key: `CONTACT_RECIPIENTS`
     - Value: `info@gastro-master.de,rene.ebert@gastro-master.de,sanjaya.p@gastro-master.de,s.anzaldi@gastro-master.de`
     - **Wichtig:** Komma-separiert, **keine Leerzeichen** zwischen den Adressen (Code trimmt sie zwar, aber sauberer ist sauberer)
     - Environments: ✅ Production, ✅ Preview, ✅ Development
   - "Save"

**Done-Check:**
- `RESEND_API_KEY` in der Liste, Value zeigt `re_***********`
- `CONTACT_RECIPIENTS` in der Liste, Value zeigt die 4 Adressen
- Beide für alle 3 Environments aktiv

**Vorteil dieser Architektur:**
- Empfänger-Anpassungen (z.B. neuer Mitarbeiter, René verlässt Firma) erfordern nur Env-Var-Update + Redeploy via Dashboard ("Redeploy"-Button), kein Code-Change.
- Format-Validierung im Code (siehe Task 6) verhindert leere oder kaputte Configs.

### PF-4: Local `.env.local` für Dev-Server (~2 Min, optional)

Nur nötig falls du lokal mit `vercel dev` oder `npm run dev` Functions testen willst:

```bash
cd /Users/salvatore/Desktop/Gastro\ Master\ Dev/gastro-direct-launch
vercel link            # Linked das lokale Repo mit dem Vercel Project
vercel env pull .env.local   # Zieht alle Env-Vars (RESEND_API_KEY + 4× KV_*) herunter
```

**Done-Check:** `.env.local` existiert, enthält `RESEND_API_KEY=re_xxx` + `KV_*` Vars. Ist via `.gitignore` ausgeschlossen.

---

**🚦 GO/NO-GO:** Erst wenn PF-1, PF-2, PF-3 fertig sind → Task 1 starten. Sonst stoppt der Build später mit Fehler.

---

## Task 1: Branch erstellen + Dependencies installieren

**Files affected:**
- `package.json` — add `resend` + `@vercel/kv`
- `package-lock.json` — wird automatisch aktualisiert

**Steps:**

1. Branch erstellen (vom aktuellen `main`):
   ```bash
   cd /Users/salvatore/Desktop/Gastro\ Master\ Dev/gastro-direct-launch
   git checkout main
   git checkout -b feat/kontakt-form-functional
   ```

2. Dependencies installieren:
   ```bash
   npm install resend@^4.0.0 @upstash/redis@^1.34.0
   ```

   **Note:** `@upstash/redis` statt `@vercel/kv` — Vendor-recommended Path. Vercel KV wurde 2025 deprecated; im Marketplace ist Upstash der direkte Nachfolger. `@vercel/kv` ist mittlerweile nur ein Wrapper um `@upstash/redis` — wir nutzen die Direkt-Integration für eine Abstraktions-Ebene weniger und Zukunftssicherheit.

3. Verify in `package.json`:
   ```bash
   grep -E "resend|@upstash/redis" package.json
   # Expected output:
   # "resend": "^4.x.x",
   # "@upstash/redis": "^1.x.x"
   ```

4. Commit:
   ```bash
   git add package.json package-lock.json
   git commit -m "chore(deps): add resend + @upstash/redis for kontakt form backend"
   ```

---

## Task 2: HTML-Sanitize Helper (TDD)

**Files affected:**
- `api/_lib/sanitize.ts` — neue Pure-Function `escapeHtml()`
- `api/_lib/sanitize.test.ts` — Vitest-Unit-Tests

**Why TDD here:** Die `escapeHtml`-Funktion ist die XSS-Verteidigung. Cowork hat Doppel-Escape (`&amp;amp;`) explizit als Test-Anforderung markiert. Tests-First verhindert Subtle Bugs.

**Steps:**

1. Write failing test in `api/_lib/sanitize.test.ts`:
   ```typescript
   import { describe, expect, test } from "vitest";
   import { escapeHtml } from "./sanitize";

   describe("escapeHtml", () => {
     test("escapes ampersand exactly once (no double-escape)", () => {
       expect(escapeHtml("Stefano's Café & Co.")).toBe("Stefano&#39;s Café &amp; Co.");
     });

     test("escapes angle brackets", () => {
       expect(escapeHtml("<script>alert(1)</script>")).toBe(
         "&lt;script&gt;alert(1)&lt;/script&gt;"
       );
     });

     test("escapes double quotes", () => {
       expect(escapeHtml('say "hi"')).toBe("say &quot;hi&quot;");
     });

     test("preserves umlauts and emojis (UTF-8 passthrough)", () => {
       expect(escapeHtml("Müller 🍕")).toBe("Müller 🍕");
     });

     test("returns empty string for empty input", () => {
       expect(escapeHtml("")).toBe("");
     });

     test("handles null/undefined gracefully", () => {
       expect(escapeHtml(null as unknown as string)).toBe("");
       expect(escapeHtml(undefined as unknown as string)).toBe("");
     });
   });
   ```

2. Run test and verify failure:
   ```bash
   npm test api/_lib/sanitize.test.ts
   # Expected: FAIL — Cannot find module './sanitize'
   ```

3. Implement in `api/_lib/sanitize.ts`:
   ```typescript
   /**
    * HTML-escape user input to prevent XSS in email body.
    * Order matters: ampersand FIRST, otherwise other escapes get re-escaped.
    */
   export function escapeHtml(input: string | null | undefined): string {
     if (input === null || input === undefined) return "";
     return String(input)
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#39;");
   }
   ```

4. Verify tests pass:
   ```bash
   npm test api/_lib/sanitize.test.ts
   # Expected: PASS — 6/6 tests passing
   ```

5. Commit:
   ```bash
   git add api/_lib/sanitize.ts api/_lib/sanitize.test.ts
   git commit -m "feat(api): add escapeHtml helper with XSS-safe ordering"
   ```

---

## Task 3: Email-Body Builder (TDD)

**Files affected:**
- `api/_lib/buildEmailBody.ts` — Pure-Function für HTML-Mail-Body
- `api/_lib/buildEmailBody.test.ts` — Vitest-Tests (Empty-Fallbacks, Newlines, Edge Cases)

**Why TDD here:** Cowork hat 3 spezifische Bugs aufgedeckt (Newlines, Empty-Fallbacks, Doppel-Escape). Tests dokumentieren die Anforderungen messbar.

**Steps:**

1. Write failing tests in `api/_lib/buildEmailBody.test.ts`:
   ```typescript
   import { describe, expect, test } from "vitest";
   import { buildEmailBody, buildEmailSubject, type ContactForm } from "./buildEmailBody";

   const baseForm: ContactForm = {
     name: "Max Mustermann",
     restaurant: "Stefano's Café & Co.",
     plz: "61250",
     phone: "+49 123 456",
     email: "max@example.com",
     message: "Hallo,\n\nich brauche Beratung.\nGrüße",
     products: ["Webshop", "Kassensystem"],
     datenschutz: true,
   };

   describe("buildEmailSubject", () => {
     test("includes restaurant in parens when present", () => {
       expect(buildEmailSubject(baseForm)).toBe(
         "Neue Kontaktanfrage: Max Mustermann (Stefano's Café & Co.)"
       );
     });

     test("omits parens when restaurant is empty", () => {
       expect(buildEmailSubject({ ...baseForm, restaurant: "" })).toBe(
         "Neue Kontaktanfrage: Max Mustermann"
       );
     });

     test("omits parens when restaurant is whitespace-only", () => {
       expect(buildEmailSubject({ ...baseForm, restaurant: "   " })).toBe(
         "Neue Kontaktanfrage: Max Mustermann"
       );
     });
   });

   describe("buildEmailBody", () => {
     test("escapes ampersand in restaurant exactly once", () => {
       const html = buildEmailBody(baseForm);
       expect(html).toContain("Stefano&#39;s Café &amp; Co.");
       expect(html).not.toContain("&amp;amp;");
     });

     test("converts \\n to <br> in message (after escape)", () => {
       const html = buildEmailBody(baseForm);
       expect(html).toContain("Hallo,<br><br>ich brauche Beratung.<br>Grüße");
     });

     test("converts CRLF (\\r\\n) to <br> for cross-platform safety", () => {
       const form = { ...baseForm, message: "line1\r\nline2" };
       const html = buildEmailBody(form);
       expect(html).toContain("line1<br>line2");
       expect(html).not.toContain("\r");
     });

     test("does not produce &lt;br&gt; (escape order: escape FIRST, then \\n→<br>)", () => {
       const html = buildEmailBody(baseForm);
       expect(html).not.toContain("&lt;br&gt;");
     });

     test("shows '—' for empty restaurant in table", () => {
       const html = buildEmailBody({ ...baseForm, restaurant: "" });
       expect(html).toMatch(/<strong>Restaurant:<\/strong><\/td><td>—/);
     });

     test("shows '—' for empty plz in table", () => {
       const html = buildEmailBody({ ...baseForm, plz: "" });
       expect(html).toMatch(/<strong>PLZ:<\/strong><\/td><td>—/);
     });

     test("shows '(keine Auswahl)' when products array is empty", () => {
       const html = buildEmailBody({ ...baseForm, products: [] });
       expect(html).toContain("(keine Auswahl)");
     });

     test("includes all form fields in HTML output", () => {
       const html = buildEmailBody(baseForm);
       expect(html).toContain("Max Mustermann");
       expect(html).toContain("61250");
       expect(html).toContain("+49 123 456");
       expect(html).toContain("max@example.com");
       expect(html).toContain("Webshop, Kassensystem");
     });

     test("includes ISO timestamp", () => {
       const html = buildEmailBody(baseForm);
       expect(html).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
     });
   });
   ```

2. Run tests, verify failure:
   ```bash
   npm test api/_lib/buildEmailBody.test.ts
   # Expected: FAIL — Cannot find module './buildEmailBody'
   ```

3. Implement in `api/_lib/buildEmailBody.ts`:
   ```typescript
   import { escapeHtml } from "./sanitize";

   export interface ContactForm {
     name: string;
     restaurant: string;
     plz: string;
     phone: string;
     email: string;
     message: string;
     products: string[];
     datenschutz: boolean;
   }

   export function buildEmailSubject(form: ContactForm): string {
     const restaurant = (form.restaurant ?? "").trim();
     return restaurant
       ? `Neue Kontaktanfrage: ${form.name} (${restaurant})`
       : `Neue Kontaktanfrage: ${form.name}`;
   }

   export function buildEmailBody(form: ContactForm): string {
     // ESCAPE ZUERST, dann \n → <br>. Reihenfolge ist kritisch:
     // sonst entsteht "&lt;br&gt;" statt "<br>" im Output.
     const messageHtml = escapeHtml(form.message).replace(/\r?\n/g, "<br>");

     const restaurant = escapeHtml(form.restaurant).trim() || "—";
     const plz = escapeHtml(form.plz).trim() || "—";
     const products =
       form.products.length > 0
         ? escapeHtml(form.products.join(", "))
         : "(keine Auswahl)";

     const timestamp = new Date().toISOString();

     return `<h2>Neue Kontaktanfrage</h2>
   <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
     <tr><td style="padding: 6px;"><strong>Name:</strong></td><td style="padding: 6px;">${escapeHtml(form.name)}</td></tr>
     <tr><td style="padding: 6px;"><strong>Restaurant:</strong></td><td style="padding: 6px;">${restaurant}</td></tr>
     <tr><td style="padding: 6px;"><strong>PLZ:</strong></td><td style="padding: 6px;">${plz}</td></tr>
     <tr><td style="padding: 6px;"><strong>Telefon:</strong></td><td style="padding: 6px;">${escapeHtml(form.phone)}</td></tr>
     <tr><td style="padding: 6px;"><strong>E-Mail:</strong></td><td style="padding: 6px;">${escapeHtml(form.email)}</td></tr>
     <tr><td style="padding: 6px;"><strong>Interessiert an:</strong></td><td style="padding: 6px;">${products}</td></tr>
     <tr><td colspan="2" style="padding: 6px;"><strong>Nachricht:</strong></td></tr>
     <tr><td colspan="2" style="padding: 6px; background: #f5f5f5;">${messageHtml}</td></tr>
     <tr><td style="padding: 6px;"><strong>Datenschutz:</strong></td><td style="padding: 6px;">✅ akzeptiert</td></tr>
     <tr><td style="padding: 6px;"><strong>Eingegangen:</strong></td><td style="padding: 6px;">${timestamp}</td></tr>
   </table>`;
   }
   ```

4. Verify tests pass:
   ```bash
   npm test api/_lib/buildEmailBody.test.ts
   # Expected: PASS — 13/13 tests passing
   ```

5. Commit:
   ```bash
   git add api/_lib/buildEmailBody.ts api/_lib/buildEmailBody.test.ts
   git commit -m "feat(api): add email body+subject builder with empty-fallbacks and CRLF-safe newlines"
   ```

---

## Task 4: Validation Helper (TDD)

**Files affected:**
- `api/_lib/validate.ts` — Pure-Function `validateContactForm()`
- `api/_lib/validate.test.ts` — Vitest-Tests

**Steps:**

1. Write failing tests in `api/_lib/validate.test.ts`:
   ```typescript
   import { describe, expect, test } from "vitest";
   import { validateContactForm, MAX_MESSAGE_LENGTH } from "./validate";

   const validForm = {
     name: "Max",
     restaurant: "Test GmbH",
     plz: "61250",
     phone: "+49 123",
     email: "max@example.com",
     message: "Hallo",
     products: ["Webshop"],
     datenschutz: true,
     website: "", // honeypot
   };

   describe("validateContactForm", () => {
     test("accepts valid form", () => {
       expect(validateContactForm(validForm)).toEqual({ ok: true });
     });

     test("rejects missing name", () => {
       expect(validateContactForm({ ...validForm, name: "" })).toEqual({
         ok: false,
         status: 400,
         error: "Bitte alle Pflichtfelder ausfüllen.",
       });
     });

     test("rejects missing phone", () => {
       expect(validateContactForm({ ...validForm, phone: "" }).ok).toBe(false);
     });

     test("rejects missing message", () => {
       expect(validateContactForm({ ...validForm, message: "" }).ok).toBe(false);
     });

     test("rejects datenschutz=false", () => {
       expect(validateContactForm({ ...validForm, datenschutz: false })).toEqual({
         ok: false,
         status: 400,
         error: "Bitte Datenschutz akzeptieren.",
       });
     });

     test("rejects invalid email format", () => {
       expect(validateContactForm({ ...validForm, email: "not-an-email" })).toEqual({
         ok: false,
         status: 400,
         error: "Bitte gültige E-Mail eingeben.",
       });
     });

     test("flags honeypot when website field is filled", () => {
       expect(validateContactForm({ ...validForm, website: "spam-bot.com" })).toEqual({
         ok: false,
         status: 200,
         honeypot: true,
       });
     });

     test("truncates message > MAX_MESSAGE_LENGTH", () => {
       const longMsg = "a".repeat(MAX_MESSAGE_LENGTH + 100);
       const result = validateContactForm({ ...validForm, message: longMsg });
       expect(result.ok).toBe(true);
       expect(result.truncatedMessage).toBeDefined();
       expect(result.truncatedMessage!.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH + 20);
       expect(result.truncatedMessage!).toContain("[gekürzt]");
     });

     test("does not truncate message at MAX_MESSAGE_LENGTH", () => {
       const exactMsg = "a".repeat(MAX_MESSAGE_LENGTH);
       const result = validateContactForm({ ...validForm, message: exactMsg });
       expect(result.ok).toBe(true);
       expect(result.truncatedMessage).toBeUndefined();
     });
   });
   ```

2. Run tests, verify failure:
   ```bash
   npm test api/_lib/validate.test.ts
   # Expected: FAIL — Cannot find module './validate'
   ```

3. Implement in `api/_lib/validate.ts`:
   ```typescript
   export const MAX_MESSAGE_LENGTH = 5000;

   const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   export type ValidationResult =
     | { ok: true; truncatedMessage?: string }
     | { ok: false; status: 200; honeypot: true }
     | { ok: false; status: 400; error: string };

   export function validateContactForm(input: any): ValidationResult {
     // 1. Honeypot — silent reject
     if (input?.website && String(input.website).trim() !== "") {
       return { ok: false, status: 200, honeypot: true };
     }

     // 2. Required fields
     const name = String(input?.name ?? "").trim();
     const phone = String(input?.phone ?? "").trim();
     const email = String(input?.email ?? "").trim();
     const message = String(input?.message ?? "").trim();

     if (!name || !phone || !email || !message) {
       return {
         ok: false,
         status: 400,
         error: "Bitte alle Pflichtfelder ausfüllen.",
       };
     }

     // 3. Email format
     if (!EMAIL_REGEX.test(email)) {
       return {
         ok: false,
         status: 400,
         error: "Bitte gültige E-Mail eingeben.",
       };
     }

     // 4. Datenschutz
     if (input?.datenschutz !== true) {
       return {
         ok: false,
         status: 400,
         error: "Bitte Datenschutz akzeptieren.",
       };
     }

     // 5. Length-Limit
     const result: ValidationResult = { ok: true };
     if (message.length > MAX_MESSAGE_LENGTH) {
       result.truncatedMessage = message.slice(0, MAX_MESSAGE_LENGTH) + " [gekürzt]";
     }
     return result;
   }
   ```

4. Verify tests pass:
   ```bash
   npm test api/_lib/validate.test.ts
   # Expected: PASS — 9/9 tests passing
   ```

5. Commit:
   ```bash
   git add api/_lib/validate.ts api/_lib/validate.test.ts
   git commit -m "feat(api): add validation with honeypot detection and message length limit"
   ```

---

## Task 5: Rate-Limit Helper mit fail-open (`@upstash/redis`)

**Files affected:**
- `api/_lib/rateLimit.ts` — Upstash-Redis-basiertes Rate-Limit, fail-open bei Outage

**Why no test:** Diese Funktion umhüllt `@upstash/redis`, das nur live oder gemockt testbar ist. Manuelles Testing in Task 9 deckt den Real-Path ab. Mocking wäre Test-Fiction.

**Init-Hinweis:** Vercel hat bei der Upstash-Integration die Env-Vars als `KV_REST_API_URL` + `KV_REST_API_TOKEN` gesetzt (Vercel-Naming, nicht Upstash-Naming). `Redis.fromEnv()` würde nach `UPSTASH_REDIS_REST_URL` suchen → daher explizite Init mit den Vercel-Vars.

**Steps:**

1. Implement in `api/_lib/rateLimit.ts`:
   ```typescript
   import { Redis } from "@upstash/redis";

   const RATE_LIMIT_PER_HOUR = 5;
   const TTL_SECONDS = 3600; // 1h

   // Lazy-init: only construct on first call to avoid eager env-var reads at module load
   let redis: Redis | null = null;
   function getRedis(): Redis {
     if (!redis) {
       redis = new Redis({
         url: process.env.KV_REST_API_URL!,
         token: process.env.KV_REST_API_TOKEN!,
       });
     }
     return redis;
   }

   /**
    * IP-based rate-limit via Upstash Redis (Vercel Marketplace).
    * FAIL-OPEN: bei Redis-Outage wird die Anfrage durchgelassen.
    * Begründung: Lead-Verlust ist teurer als kurzes Spam-Risiko.
    * Honeypot bleibt als primärer Schutz aktiv.
    */
   export async function checkRateLimit(
     ip: string,
   ): Promise<{ allowed: boolean; remaining: number }> {
     try {
       const key = `ratelimit:contact:${ip}`;
       const count = await getRedis().incr(key);
       if (count === 1) {
         await getRedis().expire(key, TTL_SECONDS);
       }
       return {
         allowed: count <= RATE_LIMIT_PER_HOUR,
         remaining: Math.max(0, RATE_LIMIT_PER_HOUR - count),
       };
     } catch (err) {
       // FAIL-OPEN: Redis-Outage darf keine Leads blockieren
       console.error("[rateLimit] Redis-Error, failing open:", err);
       return { allowed: true, remaining: -1 };
     }
   }
   ```

2. Smoke-test (kein Vitest, nur Compile-Check):
   ```bash
   npx tsc --noEmit api/_lib/rateLimit.ts
   # Expected: kein Output (TypeScript ohne Fehler)
   ```

3. Commit:
   ```bash
   git add api/_lib/rateLimit.ts
   git commit -m "feat(api): add Upstash-Redis rate limit with fail-open and explicit Vercel env-var init"
   ```

---

## Task 6: Main Handler `api/contact.ts` (Multi-Recipient via Env-Var)

**Files affected:**
- `api/contact.ts` — Vercel Serverless Function (Main Entry)
- `api/_lib/recipients.ts` — Helper für Recipient-Parsing + Validation (TDD)
- `api/_lib/recipients.test.ts` — Vitest-Tests

### 6a) Recipient-Helper (TDD)

1. Write failing tests in `api/_lib/recipients.test.ts`:
   ```typescript
   import { describe, expect, test } from "vitest";
   import { parseRecipients } from "./recipients";

   describe("parseRecipients", () => {
     test("parses comma-separated list", () => {
       expect(parseRecipients("a@x.de,b@x.de,c@x.de")).toEqual([
         "a@x.de",
         "b@x.de",
         "c@x.de",
       ]);
     });

     test("trims whitespace around addresses", () => {
       expect(parseRecipients(" a@x.de , b@x.de ")).toEqual(["a@x.de", "b@x.de"]);
     });

     test("filters empty entries (e.g. trailing comma)", () => {
       expect(parseRecipients("a@x.de,,b@x.de,")).toEqual(["a@x.de", "b@x.de"]);
     });

     test("filters invalid email addresses (no @)", () => {
       expect(parseRecipients("a@x.de,not-an-email,b@x.de")).toEqual([
         "a@x.de",
         "b@x.de",
       ]);
     });

     test("returns empty array for undefined input", () => {
       expect(parseRecipients(undefined)).toEqual([]);
     });

     test("returns empty array for empty string", () => {
       expect(parseRecipients("")).toEqual([]);
     });

     test("returns empty array for whitespace-only", () => {
       expect(parseRecipients("   ")).toEqual([]);
     });

     test("preserves multi-recipient ordering (for Reply-All consistency)", () => {
       const result = parseRecipients("info@x.de,rene@x.de,sanjaya@x.de,salva@x.de");
       expect(result[0]).toBe("info@x.de");
       expect(result[3]).toBe("salva@x.de");
     });
   });
   ```

2. Run tests, verify failure:
   ```bash
   npm test api/_lib/recipients.test.ts
   # Expected: FAIL — Cannot find module './recipients'
   ```

3. Implement in `api/_lib/recipients.ts`:
   ```typescript
   const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   /**
    * Parse comma-separated recipient list from CONTACT_RECIPIENTS env var.
    * Filters out empty entries and invalid email formats.
    * Returns empty array if input is missing/empty.
    */
   export function parseRecipients(input: string | undefined): string[] {
     if (!input) return [];
     return input
       .split(",")
       .map((s) => s.trim())
       .filter((s) => s.length > 0 && EMAIL_REGEX.test(s));
   }
   ```

4. Verify tests pass:
   ```bash
   npm test api/_lib/recipients.test.ts
   # Expected: PASS — 8/8 tests passing
   ```

### 6b) Main Handler

5. Implement in `api/contact.ts`:
   ```typescript
   import { Resend } from "resend";
   import type { VercelRequest, VercelResponse } from "@vercel/node";
   import { validateContactForm } from "./_lib/validate";
   import { buildEmailBody, buildEmailSubject } from "./_lib/buildEmailBody";
   import { checkRateLimit } from "./_lib/rateLimit";
   import { parseRecipients } from "./_lib/recipients";

   const SENDER = "Gastro Master Kontakt <onboarding@resend.dev>";

   export default async function handler(req: VercelRequest, res: VercelResponse) {
     // Method check
     if (req.method !== "POST") {
       return res.status(405).json({ error: "Method not allowed" });
     }

     // Fail-fast on missing config
     const apiKey = process.env.RESEND_API_KEY;
     if (!apiKey) {
       console.error("[api/contact] RESEND_API_KEY missing");
       return res.status(500).json({
         error: "Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.",
       });
     }

     const recipients = parseRecipients(process.env.CONTACT_RECIPIENTS);
     if (recipients.length === 0) {
       console.error(
         "[api/contact] CONTACT_RECIPIENTS missing or contains no valid addresses",
       );
       return res.status(500).json({
         error: "Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.",
       });
     }

     const resend = new Resend(apiKey);

     // Validation (incl. honeypot, email format, datenschutz, length)
     const validation = validateContactForm(req.body);

     if (!validation.ok) {
       if ("honeypot" in validation) {
         // Silent success: bot doesn't learn anything
         return res.status(200).json({ success: true });
       }
       return res.status(validation.status).json({ error: validation.error });
     }

     // Rate-Limit (fail-open on KV outage)
     const ip =
       (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
       req.socket?.remoteAddress ??
       "unknown";
     const rl = await checkRateLimit(ip);
     if (!rl.allowed) {
       return res.status(429).json({
         error: "Zu viele Anfragen. Bitte später erneut versuchen.",
       });
     }

     // Apply truncation if message was too long
     const formData = {
       ...req.body,
       message: validation.truncatedMessage ?? req.body.message,
     };

     // Send email via Resend (multi-recipient)
     try {
       const { error } = await resend.emails.send({
         from: SENDER,
         to: recipients, // Resend accepts string[] for multi-recipient
         replyTo: formData.email,
         subject: buildEmailSubject(formData),
         html: buildEmailBody(formData),
       });

       if (error) {
         console.error("[api/contact] Resend error:", error);
         return res.status(500).json({
           error: "E-Mail konnte nicht gesendet werden. Bitte direkt an info@gastro-master.de mailen.",
         });
       }

       return res.status(200).json({ success: true });
     } catch (err) {
       console.error("[api/contact] Unexpected error:", err);
       return res.status(500).json({
         error: "Ein unerwarteter Fehler ist aufgetreten. Bitte direkt an info@gastro-master.de mailen.",
       });
     }
   }
   ```

6. Add `@vercel/node` types as devDep:
   ```bash
   npm install --save-dev @vercel/node@^3.0.0
   ```

7. Compile-Check:
   ```bash
   npx tsc --noEmit api/contact.ts
   # Expected: kein Output (kein TypeScript-Fehler)
   ```

8. Commit:
   ```bash
   git add api/_lib/recipients.ts api/_lib/recipients.test.ts api/contact.ts package.json package-lock.json
   git commit -m "feat(api): wire main contact handler with multi-recipient via CONTACT_RECIPIENTS env var"
   ```

**Key behavioral changes vs. previous version:**
- **Multi-Recipient:** Resend bekommt `to: string[]` statt `to: string`. Resend's API akzeptiert beides; bei Array landen alle in der `To:`-Header-Zeile (alle sehen sich gegenseitig — gewünscht für Team-Sichtbarkeit).
- **Fail-fast bei Misconfig:** Wenn `CONTACT_RECIPIENTS` fehlt ODER nur Garbage enthält (`parseRecipients()` filtert ungültige raus), antwortet der Handler mit 500 statt einer Mail an Niemanden zu schicken.
- **Tolerant gegen Format-Probleme:** Trailing Comma, Spaces zwischen Adressen, einzelne ungültige Adressen werden tolerant behandelt — gültige Adressen bleiben erhalten.

---

## Task 7: Frontend — Honeypot-Field + maxLength

**Files affected:**
- `src/pages/Kontakt.tsx` — minimal: Honeypot-State + Hidden-Input + maxLength

**Steps:**

1. Edit form state in `src/pages/Kontakt.tsx` (around line 29):
   ```typescript
   // BEFORE:
   const [form, setForm] = useState({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [] as string[],
     datenschutz: false,
     recaptcha: false,
   });

   // AFTER:
   const [form, setForm] = useState({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [] as string[],
     datenschutz: false,
     recaptcha: false,
     website: "", // honeypot — must stay empty
   });
   ```

2. Edit reset state in handleSubmit (around line 69):
   ```typescript
   // BEFORE:
   setForm({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [],
     datenschutz: false,
     recaptcha: false,
   });

   // AFTER:
   setForm({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [],
     datenschutz: false,
     recaptcha: false,
     website: "",
   });
   ```

3. Add `maxLength={5000}` to textarea (around line 169-174):
   ```jsx
   // BEFORE:
   <textarea
     value={form.message} rows={3}
     onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
     className="..."
     placeholder={t("contact.placeholderMessage")}
   />

   // AFTER:
   <textarea
     value={form.message} rows={3} maxLength={5000}
     onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
     className="..."
     placeholder={t("contact.placeholderMessage")}
   />
   ```

4. Add hidden honeypot input directly inside `<form onSubmit={handleSubmit}>` (around line 109, as first child of form):
   ```jsx
   <form onSubmit={handleSubmit}>
     {/* Honeypot — hidden from real users, bots fill it. Must stay empty. */}
     <input
       type="text"
       name="website"
       value={form.website}
       onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
       tabIndex={-1}
       autoComplete="off"
       aria-hidden="true"
       style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
     />
     {/* ... rest of form ... */}
   ```

5. Local typecheck:
   ```bash
   npm run lint
   # Expected: kein Error in Kontakt.tsx
   ```

6. Commit:
   ```bash
   git add src/pages/Kontakt.tsx
   git commit -m "feat(kontakt): add honeypot field and 5000-char maxLength on textarea"
   ```

---

## Task 8: Local Build Verification

**Files affected:** keine (nur Verifikation)

**Steps:**

1. Run all unit tests:
   ```bash
   npm test
   # Expected: PASS — alle Pure-Function-Tests grün (>= 28 tests)
   ```

2. Run full build:
   ```bash
   npm run build
   # Expected:
   # ✓ built in <10s
   # ✅ Generated: /preise/index.html (etc.)
   # No TypeScript errors
   ```

3. Verify `api/contact.ts` ist Production-Bundle-Compatible (Vercel CLI):
   ```bash
   ls api/
   # Expected output:
   # _lib/
   # contact.ts
   ```

4. **Kein Commit hier** (war reine Verifikation).

---

## Task 9: Vercel Preview Deploy + Manuelle Tests

**Files affected:** keine (Deploy + Verifikation)

**Steps:**

1. Push branch zu Vercel:
   ```bash
   git push -u origin feat/kontakt-form-functional
   # Vercel erkennt Branch automatisch und deployed Preview
   ```

2. Aus Vercel Dashboard: Preview-URL kopieren (z.B. `https://gastro-direct-launch-feat-kontakt-form-xxx.vercel.app`)

3. **9 Manuelle Tests durchlaufen** (gemäß Spec §7):

   **Test 1 — Happy Path:**
   - Auf Preview-URL `/kontakt` öffnen
   - Form vollständig ausfüllen (mit echter Salvatore-Test-E-Mail)
   - Submit → "Danke!"-UI
   - In `info@gastro-master.de`-Postfach: Mail empfangen, alle Felder lesbar
   - **Pass:** ✅ Mail kommt an, alle Felder korrekt

   **Test 2 — Honeypot:**
   - DevTools öffnen → `<input name="website">` finden → Value setzen auf `"spam-bot.com"`
   - Form submitten
   - UI zeigt "Erfolg", aber **keine Mail** kommt an
   - **Pass:** ✅ Silent success für Bots

   **Test 3 — Validation (missing field):**
   - Form ohne `phone` submitten
   - UI zeigt Fehler-Message ("Bitte alle Pflichtfelder ausfüllen")
   - Network Tab: 400 Response
   - **Pass:** ✅

   **Test 4 — Rate-Limit:**
   - 6× hintereinander mit unterschiedlichen Daten submitten
   - 6. Versuch → Fehler-UI ("Zu viele Anfragen...")
   - Network Tab: 429 Response
   - **Pass:** ✅
   - **Cleanup:** im Vercel KV Dashboard Key `ratelimit:contact:<deine-IP>` löschen oder 1h warten

   **Test 5 — Length-Limit:**
   - Im DevTools-Console: `document.querySelector('textarea').maxLength = 99999` (UI-Limit umgehen)
   - Nachricht mit 6000 Zeichen submitten
   - In Mail: nur 5000 Zeichen + " [gekürzt]"
   - **Pass:** ✅

   **Test 6 — Reply-To:**
   - In empfangener Mail "Antworten" klicken
   - Empfänger-Adresse zeigt die Kunden-E-Mail aus dem Form
   - **Pass:** ✅

   **Test 7 — Sonderzeichen-Härtetest:**
   - Form mit:
     - Name: `O'Connor`
     - Restaurant: `Stefano's Café & Co.`
     - Nachricht: `Hallo 🍕\nBrauche Beratung für äöüß-Karte\nMit & ohne Lieferung`
   - Mail empfangen, prüfen:
     - Kein `&amp;amp;` (Doppel-Escape)
     - Umlaute korrekt
     - Apostroph korrekt
     - Emoji rendert (oder zumindest kein Crash)
   - **Pass:** ✅

   **Test 8 — Newline-Test:**
   - Nachricht mit 3 Zeilenumbrüchen senden
   - Mail zeigt visuelle Zeilenumbrüche (HTML-Linebreaks), nicht Wall-of-Text
   - **Pass:** ✅

   **Test 9 — Empty-Fallback-Test:**
   - Form ohne `restaurant` (leer) und ohne `products` (nichts ankreuzen)
   - Erwartung:
     - Subject: `Neue Kontaktanfrage: <Name>` (keine Klammer)
     - Tabelle: Restaurant `—`, Interessiert an `(keine Auswahl)`
   - **Pass:** ✅

4. **Wenn alle 9 Tests grün → weiter zu Task 10.**
   **Falls ein Test fehlschlägt → Bug fixen, neuer Commit, Preview re-deployt automatisch, betroffene Tests wiederholen.**

---

## Task 10: Production Deploy

**Files affected:** keine (Merge + Deploy)

**Steps:**

1. Branch auf `main` mergen:
   ```bash
   git checkout main
   git merge feat/kontakt-form-functional --no-ff -m "feat(kontakt): functional contact form with Resend + Vercel KV (Phase A)"
   git push origin main
   ```

2. Vercel deployed `main` automatisch auf Production-URL.

3. **Smoke-Test auf Production-URL** (nicht Preview):
   - `/kontakt` öffnen
   - 1× Form submitten (Test 1 wiederholen)
   - Mail-Empfang verifizieren

4. **Branch optional löschen:**
   ```bash
   git branch -d feat/kontakt-form-functional
   git push origin --delete feat/kontakt-form-functional
   ```

5. **🎉 Phase A abgeschlossen.** Domain-Cutover (gastro-master.de auf Vercel) kann jetzt erfolgen.

---

## Task 11 (Optional, parallel): Memory-Update

Nach erfolgreichem Go-Live: Memory-Eintrag aktualisieren.

**Files affected:**
- `/Users/salvatore/.claude/projects/-Users-salvatore-Desktop-Gastro-Master-Dev-gastro-direct-launch/memory/MEMORY.md`
- Neue Memory: `project_kontakt_form_live.md`

**Pattern:** Project-Memory mit Status (LIVE), Resend-Account-Info, Phase-C-TODOs.

---

## Phase-C-Roadmap (NICHT heute)

Nach DNS-Migration weg von WordPress:
1. Resend: Sender-Domain `gastro-master.de` verifizieren (DKIM/SPF-Records)
2. `api/contact.ts`: `SENDER` umstellen auf `"Gastro Master <noreply@gastro-master.de>"`
3. Bestätigungsmail an Kunden hinzufügen (zweiter `resend.emails.send()` Call)
4. Datenschutzerklärung: Resend (US-Sub-Processor) ergänzen

---

## Notes

- **TDD-Coverage:** 36 Unit-Tests für Pure Functions (escape: 6, buildEmail: 13, validate: 9, recipients: 8). Integration (Resend, KV) wird manuell verifiziert in Task 9 — Mocking wäre für Phase A Test-Fiction.
- **Commits:** 7 Code-Commits (Tasks 1–7) + 1 Merge-Commit (Task 10). Granular für Rollback.
- **Manuelle PRE-FLIGHT-Schritte zuerst:** PF-1 (Resend) → PF-2 (KV) → PF-3 (Env-Vars: `RESEND_API_KEY` + `CONTACT_RECIPIENTS`) → erst DANN Code-Tasks. Sonst crasht Production mit "RESEND_API_KEY undefined" oder "CONTACT_RECIPIENTS missing".
- **Multi-Recipient via Env-Var:** 4 Empfänger (info, rene.ebert, sanjaya.p, s.anzaldi) — Änderungen ohne Code-Deploy möglich.
- **Newline-Robustheit:** `\r?\n` matcht sowohl Unix (`\n`) als auch Windows (`\r\n`) Line-Endings.
- **Reihenfolge im HTML-Body:** ESCAPE ZUERST, dann `\n` → `<br>`. Sonst entsteht `&lt;br&gt;` statt `<br>`.
- **MX-Setup vorab geprüft:** `gastro-master.de` läuft auf Google Workspace (Mailboxen empfangsbereit, kein DNS-Blocker für Phase A).
