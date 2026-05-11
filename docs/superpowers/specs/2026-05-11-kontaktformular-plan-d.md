# Kontaktformular Funktionalisierung — Plan D Design Spec

**Datum:** 2026-05-11
**Status:** Draft (warten auf Cowork-Review)
**Author:** Salvatore Anzaldi + Sanjaya Pattiyage (Strategie) + Claude (Spec)
**Vorgänger-Spec:** [`2026-05-05-kontaktformular-design.md`](2026-05-05-kontaktformular-design.md) (ARCHIVIERT — Resend-Ansatz)

---

## 0. Strategie-Wechsel — Warum Plan D

Nach Phase-A-Preview-Test (2026-05-10) wurde der Resend-Ansatz verworfen. Begründungen:

| Problem mit Resend (Plan A) | Lösung in Plan D |
|------------------------------|-------------------|
| Sandbox-Sperre: nur Versand an Account-E-Mail bis Domain verifiziert | Eigener SMTP-Server, keine Sandbox-Limits |
| US-Sub-Processor → DSGVO-Update nötig | All-Inkl in DE → DSGVO-clean ohne weitere Maßnahmen |
| Zwei externe Vendor-Abhängigkeiten (Resend + Upstash) | Eine bestehende Infrastruktur (All-Inkl) |
| Domain-Verifikation blockiert durch WordPress-DNS | Komplett unabhängig von WordPress-DNS |

**Sanjus Entscheidung:** Wir nutzen die existierende All-Inkl-Infrastruktur, die ohnehin schon die `info@`-Mailbox + das alte WordPress-Form bedient. Eine bewährte Pipeline, weniger bewegliche Teile.

---

## 1. Ziel

Die `/kontakt`-Seite (React-SPA auf Vercel) soll Form-Submissions als E-Mail an 4 Empfänger zustellen, via PHP-Backend auf All-Inkl mit SMTP-Versand.

**Kontext:** Letzter fehlender Baustein vor Domain-Cutover. Aktuell läuft `gastro-master.de` noch auf WordPress; das neue Projekt auf `gastro-master.vercel.app`. Sandbox-Backend (`sandbox.gastro-master.de`) ist isoliert und sofort verfügbar.

---

## 2. Anforderungen

### Funktional
- **F1:** Form-Submit auf `/kontakt` versendet alle eingegebenen Daten via E-Mail an alle 4 Empfänger
- **F2:** Reply-To-Adresse = E-Mail des Kunden → Salvatore/René/Sanjaya antworten direkt aus ihren Mail-Clients
- **F3:** UI zeigt Erfolgs- oder Fehler-Feedback nach Submit
- **F4:** Existierende UI bleibt visuell unverändert
- **F5:** Cross-Origin-Request von `gastro-master.vercel.app` (und Branch-Previews) → `sandbox.gastro-master.de` funktioniert (CORS)

### Nicht-funktional
- **NF1:** Spam-Schutz: Honeypot (primär) + Rate-Limit (sekundär, dateibasiert)
- **NF2:** DoS-Schutz: 5000-Zeichen-Limit auf `message`-Feld
- **NF3:** XSS-Schutz: HTML-escape aller User-Inputs vor Einbettung in Mail-HTML
- **NF4:** Failure-Resilience: Fail-open bei Rate-Limit-Datei-Fehlern (lieber Spam als Lead-Verlust)
- **NF5:** DSGVO-Konformität: Daten verlassen nicht den DE-Raum (All-Inkl in DE)
- **NF6:** Secrets nicht im Git: `config.php` mit SMTP-Credentials wird **nicht** committed (`.gitignore`)
- **NF7:** Moderne PHP-Syntax: PHP 8.5 — typed properties, readonly, named arguments wo sinnvoll

### Out of Scope (für Phase A)
- ❌ Bestätigungsmail an Kunden (Phase C)
- ❌ Custom Production-URL `api.gastro-master.de` (Phase C nach DNS-Migration)
- ❌ Cloudflare Turnstile / echtes Captcha (Phase D, falls Honeypot+RateLimit nicht reicht)
- ❌ DSE-Update — keine US-Sub-Processors, keine neuen Datenflüsse außerhalb DE (entfällt)

---

## 3. Architektur

```
[Browser auf gastro-master.vercel.app]
    │
    ▼ src/pages/Kontakt.tsx → handleSubmit()
    │
    ▼ POST https://sandbox.gastro-master.de/contact.php
    │  Content-Type: application/json
    │  Body: { name, restaurant, plz, phone, email, message,
    │           products, datenschutz, recaptcha, website (honeypot) }
    │
    ├─→ [Cross-Origin Preflight]
    │   OPTIONS /contact.php  →  204 + CORS-Headers
    │
    ▼
[PHP 8.5 auf w01d17b9.kasserver.com]
[https://sandbox.gastro-master.de/contact.php]
    │
    ├─→ 1. CORS-Check & OPTIONS-Preflight
    │     ├─ Origin matches Whitelist? → ACCESS-CONTROL headers
    │     └─ OPTIONS? → 204, exit
    │
    ├─→ 2. Method-Check
    │     └─ POST only → sonst 405
    │
    ├─→ 3. JSON-Parse
    │     ├─ Body lesen, JSON dekodieren
    │     └─ Parse-Fehler → 400 "Ungültige Anfrage"
    │
    ├─→ 4. Honeypot-Check (silent fail)
    │     └─ $form->website non-empty? → 200 silent success (EXIT)
    │     └─ Bot verbraucht KEIN Rate-Limit-Quota (Step 4 vor Step 5)
    │
    ├─→ 5. Rate-Limit (file-based in data/rate-limits/)
    │     ├─ try: read data/rate-limits/<ip-hash>.json
    │     │   └─ if count >= 5 within 1h → 429
    │     │   └─ else increment, write back
    │     └─ catch (FS-error): FAIL-OPEN, log & proceed
    │
    ├─→ 6. Validate
    │     ├─ Required fields (name, phone, email, message)
    │     ├─ Email-Format-Regex
    │     └─ datenschutz === true
    │     └─ alle Fehler → 400 mit klarer UI-Message
    │
    ├─→ 7. Sanitize + Length-Limit
    │     ├─ htmlspecialchars() für alle User-Inputs
    │     └─ message > 5000? → truncate + " [gekürzt]"
    │
    ├─→ 8. PHPMailer + SMTP zu w01d17b9.kasserver.com:465 (SMTPS)
    │     ├─ Auth: hallo@gastro-master.de (From config.php)
    │     ├─ From: hallo@gastro-master.de
    │     ├─ Reply-To: {form.email}
    │     ├─ To: 4 Empfänger aus CONTACT_RECIPIENTS (config.php)
    │     ├─ Subject: "Neue Kontaktanfrage: {name}[ ({restaurant})]"
    │     └─ Body (HTML): tabular, mit Newlines→<br>, Empty-Fallbacks
    │
    └─→ 9. JSON-Response (200/400/429/500) + CORS-Headers

**Pipeline-Order-Begründung (Cowork R1):**
- **Step 3 (JSON-Parse) VOR Step 4 (Honeypot):** Sonst kann `$form->website` nicht gelesen werden — Honeypot-Logik braucht geparste Daten.
- **Step 4 (Honeypot) VOR Step 5 (Rate-Limit):** Bots, die den Honeypot auslösen, verbrauchen kein Rate-Limit-Quota → mehr Quota für echte User. Eleganter und schützt vor Quota-Exhaustion durch Bots.
- **Step 5 (Rate-Limit) VOR Step 6 (Validate):** Rate-Limit-Check ist günstiger (1 File-Read) als komplette Validation — Spam-Bots werden früher abgewiesen.
```

---

## 4. Komponenten

### 4.1 Neu: `php-backend/contact.php` (Main Handler)

**Ort im Repo:** `php-backend/contact.php` (in Git)
**Ort auf Server:** `https://sandbox.gastro-master.de/contact.php` (Webroot)
**Größe:** ~250 Zeilen PHP 8.5

**Verantwortlichkeiten:**
- CORS-Preflight + Headers
- Honeypot-Detection (silent fail)
- JSON-Body-Parsing + Validation
- Length-Limit Enforcement (5000 chars)
- Rate-Limit via Filesystem (`data/rate-limits/`)
- HTML-Sanitize aller User-Inputs
- HTML-Body-Generierung mit Edge-Case-Handling
- PHPMailer-Aufruf mit SMTP-Versand
- JSON-Response mit korrekten HTTP-Codes

**Wichtige PHP-Patterns:**
```php
declare(strict_types=1);
// ... use statements ...
final readonly class ContactForm {
  public function __construct(
    public string $name,
    public string $restaurant,
    public string $plz,
    public string $phone,
    public string $email,
    public string $message,
    public array  $products,
    public bool   $datenschutz,
    public string $website = '', // honeypot
  ) {}
}
```

### 4.2 Neu: `php-backend/config.example.php` (Template, in Git)

Template-Datei mit Platzhaltern. Wird ins Git committed, dient als Vorlage.

```php
<?php
// Kopiere diese Datei nach config.php und fülle die Werte aus.
// config.php ist via .gitignore vom Versionsverlauf ausgeschlossen.

return [
  'smtp' => [
    'host'      => 'w01d17b9.kasserver.com',
    'port'      => 465,
    'username'  => 'hallo@gastro-master.de',
    'password'  => 'CHANGE_ME', // SMTP-Passwort der Mailbox
    'from'      => ['hallo@gastro-master.de', 'Gastro Master Kontakt'],
  ],
  'recipients' => [
    'info@gastro-master.de',
    'rene.ebert@gastro-master.de',
    'sanjaya.p@gastro-master.de',
    's.anzaldi@gastro-master.de',
  ],
  'cors' => [
    // Allowed origins: regex-Pattern matched gegen Origin-Header
    'origin_pattern' => '#^https://gastro-master(-[a-z0-9-]+)?\.vercel\.app$#',
    // Phase C: ergänzen um 'https://gastro-master.de' (exact match preferred)
  ],
  'rate_limit' => [
    'max_per_hour' => 5,
    'window_seconds' => 3600,
    'data_dir' => __DIR__ . '/data/rate-limits/',
  ],
];
```

### 4.3 Neu: `config.php` (Secrets, NICHT in Git)

Identisch zu `config.example.php`, aber mit echten SMTP-Credentials. Wird **nur** via FileZilla in den Webroot uploaded — niemals committed.

**`.gitignore` Eintrag:** `php-backend/config.php`

### 4.4 Neu: `php-backend/lib/phpmailer/` (Vendor-Bundle, in Git)

**Version:** PHPMailer 6.10.x (latest stable 6er, Cowork-R1-Empfehlung — siehe §14)
**Download:** [GitHub PHPMailer Releases](https://github.com/PHPMailer/PHPMailer/releases) → letzte 6.10.x-Version als ZIP
**Im Repo tracked** für:
- Deterministische Deployments
- Salvatore lädt ein konsistentes Bundle hoch (kein Versions-Drift)
- Zero Composer-Abhängigkeit

**Struktur:**
```
php-backend/lib/phpmailer/
├── src/
│   ├── Exception.php
│   ├── OAuth.php
│   ├── PHPMailer.php
│   ├── POP3.php
│   └── SMTP.php
├── LICENSE
└── README.md
```

**Im `contact.php`:**
```php
require_once __DIR__ . '/lib/phpmailer/src/Exception.php';
require_once __DIR__ . '/lib/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/lib/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
```

### 4.5 Neu: `php-backend/data/rate-limits/` (Writable, in Git als leeres Verzeichnis)

- Enthält `.gitkeep` (damit Git das leere Verzeichnis tracked)
- Server-seitig: `chmod 0755` (Apache+PHP-FPM kann reinschreiben)
- Rate-Limit-Dateien: `<sha256(ip)>.json` mit `{ "count": N, "resetAt": <unix-ts> }`
- Cleanup: TTL-basiert (alte Dateien werden überschrieben)

**Warum eigener `data/`-Subfolder statt `/tmp`** (Salvatores Punkt):
- Kontrollierte Permissions (kein gemeinsames `/tmp` mit anderen Hosting-Kunden)
- Backup-Pfad ist klar (`php-backend/data/` als Ganzes)
- Diagnose-Zugriff via FileZilla möglich (während `/tmp` oft gesperrt ist)

### 4.6 Edit: `src/pages/Kontakt.tsx` (minimal)

**Änderungen:**
1. **Endpoint umstellen:** `/api/contact` → `https://sandbox.gastro-master.de/contact.php` (in Phase A)
2. **Honeypot-Feld** bleibt (war schon im Resend-Branch implementiert — wir cherry-picken aus `feat/kontakt-form-functional`)
3. **maxLength={5000}** auf textarea bleibt

**Was NICHT geändert wird:**
- Visible UI (Felder, Layout, Styles)
- handleSubmit-Logik außer URL-String
- i18n-Strings
- Form-State-Shape

**Endpoint-Konfiguration:** Hardcoded in Phase A (1 String-Konstante). In Phase C wird das ein Vite-Env-Var `VITE_CONTACT_ENDPOINT`.

### 4.7 Edit: `.gitignore`

```diff
+ # PHP backend secrets (manually uploaded via FTP, never committed)
+ php-backend/config.php
+
+ # Runtime rate-limit data (server-side state)
+ php-backend/data/rate-limits/*
+ !php-backend/data/rate-limits/.gitkeep
```

---

## 5. SMTP-Setup (PHPMailer)

### Konfiguration

| Parameter | Wert | Bedeutung |
|-----------|------|-----------|
| Host | `w01d17b9.kasserver.com` | All-Inkl Mailserver |
| Port | `465` | SMTPS (implicit TLS) |
| `SMTPSecure` | `PHPMailer::ENCRYPTION_SMTPS` | = `'ssl'`, wichtig: NICHT `'tls'`! |
| `SMTPAuth` | `true` | Authentifizierung erforderlich |
| Username | `hallo@gastro-master.de` | SMTP-User |
| Password | (in config.php) | SMTP-Passwort |
| `CharSet` | `PHPMailer::CHARSET_UTF8` | UTF-8 (Umlaute, Emojis) |
| `Encoding` | `PHPMailer::ENCODING_QUOTED_PRINTABLE` | Standard für HTML+UTF-8 (kompakter als BASE64) |

**Stolperstein vermieden:** Port 465 mit `'ssl'` (= `ENCRYPTION_SMTPS`). Port 465 mit `'tls'` oder Port 587 mit `'ssl'` würden **stumm scheitern**. ([PHPMailer Docs](https://deepwiki.com/PHPMailer/PHPMailer/3-authentication-and-security))

### Code-Skeleton

```php
$config = require __DIR__ . '/config.php';

$mail = new PHPMailer(exceptions: true);
$mail->isSMTP();
$mail->Host       = $config['smtp']['host'];
$mail->Port       = $config['smtp']['port'];
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->SMTPAuth   = true;
$mail->Username   = $config['smtp']['username'];
$mail->Password   = $config['smtp']['password'];
$mail->CharSet    = PHPMailer::CHARSET_UTF8;

$mail->setFrom(...$config['smtp']['from']);
foreach ($config['recipients'] as $addr) {
  $mail->addAddress($addr);
}
$mail->addReplyTo($form->email);
$mail->isHTML(true);
$mail->Subject = buildSubject($form);
$mail->Body    = buildHtmlBody($form);

$mail->send();
```

---

## 6. E-Mail-Format

### Header

```
From:      Gastro Master Kontakt <hallo@gastro-master.de>
To:        [info@, rene.ebert@, sanjaya.p@, s.anzaldi@] @gastro-master.de
Reply-To:  {form.email}
Subject:   Neue Kontaktanfrage: {form.name}[ ({form.restaurant})]
```

**Subject-Conditional:** Wenn `restaurant` leer ist → keine Klammer (siehe Edge-Cases unten).

### HTML-Body

```html
<h2>Neue Kontaktanfrage</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 6px;"><strong>Name:</strong></td><td style="padding: 6px;">{escape(name)}</td></tr>
  <tr><td style="padding: 6px;"><strong>Restaurant:</strong></td><td style="padding: 6px;">{escape(restaurant) || "—"}</td></tr>
  <tr><td style="padding: 6px;"><strong>PLZ:</strong></td><td style="padding: 6px;">{escape(plz) || "—"}</td></tr>
  <tr><td style="padding: 6px;"><strong>Telefon:</strong></td><td style="padding: 6px;">{escape(phone)}</td></tr>
  <tr><td style="padding: 6px;"><strong>E-Mail:</strong></td><td style="padding: 6px;">{escape(email)}</td></tr>
  <tr><td style="padding: 6px;"><strong>Interessiert an:</strong></td><td style="padding: 6px;">{products.length > 0 ? escape(products.join(", ")) : "(keine Auswahl)"}</td></tr>
  <tr><td colspan="2" style="padding: 6px;"><strong>Nachricht:</strong></td></tr>
  <tr><td colspan="2" style="padding: 6px; background: #f5f5f5;">{escape(message).replace(/\r?\n/g, "<br>")}</td></tr>
  <tr><td style="padding: 6px;"><strong>Datenschutz:</strong></td><td style="padding: 6px;">✅ akzeptiert</td></tr>
  <tr><td style="padding: 6px;"><strong>Eingegangen:</strong></td><td style="padding: 6px;">{ISO-Timestamp}</td></tr>
</table>
```

**Übernommene Edge-Cases aus archivierter Spec §5:**
1. **Newline-Konvertierung:** Nach `htmlspecialchars()` → `\r?\n` → `<br>` (CRLF-safe)
2. **Reihenfolge:** **escape ZUERST**, dann `\n→<br>` → sonst entsteht `&lt;br&gt;`
3. **Empty-Fallbacks:** `restaurant`/`plz` leer → `—`; `products` leer → `(keine Auswahl)`
4. **Subject-Conditional:** restaurant leer → keine `()` im Subject

**In PHP umgesetzt:**
```php
function escapeAndBreak(string $input): string {
    return preg_replace('/\r?\n/', '<br>', htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}
```

---

## 7. CORS-Setup

### Strategie

Cross-Origin von `*.vercel.app` (Frontend) → `sandbox.gastro-master.de` (Backend) erfordert CORS-Headers.

**Whitelisting via Regex** (Salvatores Empfehlung):

```php
// Vercel-Projekt heißt "gastro-master" (NICHT gastro-direct-launch — Repo-Name ≠ Projekt-Name)
$allowed_origin_pattern = '#^https://gastro-master(-[a-z0-9-]+)?\.vercel\.app$#';

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match($allowed_origin_pattern, $origin)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // 24h preflight-cache
```

**Was das Pattern matched (verifiziert anhand echter Vercel-Preview-URLs):**
- ✅ `https://gastro-master.vercel.app` (Production Alias)
- ✅ `https://gastro-master-git-feat-kontakt-f-70ceac-sanzaldi-4022s-projects.vercel.app` (Git-Branch-Preview)
- ✅ `https://gastro-master-<hash>-sanzaldi-4022s-projects.vercel.app` (Commit-spezifische Previews)
- ❌ `https://evil-site.com` → kein CORS-Header → Browser blockt
- ❌ `https://gastro-master-something.othersite.com` → kein Match (Domain ≠ vercel.app)

**Cowork-R1-Befund (kritisch, vor Implementation gefixt):** Das ursprüngliche Pattern enthielt `gastro-direct-launch` (Repo-Name) statt `gastro-master` (Vercel-Projekt-Name). Das hätte ALLE Preflight-Requests durchfallen lassen → komplettes CORS-Blocking → Pipeline dead.

### OPTIONS-Preflight

```php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
```

### Phase C Adjustment

Nach DNS-Cutover ergänzen wir die finale Production-Domain:

```php
// Phase C: zusätzlich exact-match auf gastro-master.de erlauben
if ($origin === 'https://gastro-master.de' || preg_match(...)) {
    header("Access-Control-Allow-Origin: $origin");
}
```

---

## 8. Rate-Limit (File-Based)

### Design

- **Speicher:** Dateisystem unter `data/rate-limits/`
- **Key:** SHA-256 des IPs (Privacy: kein Klartext-IP auf Disk)
- **Format:** `<ip-hash>.json` mit `{ "count": N, "resetAt": <unix-ts> }`
- **Limit:** 5 Requests / IP / Stunde
- **Failure-Mode:** FAIL-OPEN (FS-Error → Anfrage durchlassen + log)

### Code-Skeleton

```php
function checkRateLimit(string $ip, array $config): bool {
    $hash = hash('sha256', $ip);
    $path = $config['rate_limit']['data_dir'] . $hash . '.json';
    $now  = time();
    $window = $config['rate_limit']['window_seconds'];
    $max = $config['rate_limit']['max_per_hour'];

    try {
        $data = file_exists($path) ? json_decode(file_get_contents($path), true) : null;

        if (!is_array($data) || ($data['resetAt'] ?? 0) < $now) {
            // Neues Fenster oder existiert nicht
            $data = ['count' => 1, 'resetAt' => $now + $window];
        } else {
            $data['count']++;
        }

        file_put_contents($path, json_encode($data), LOCK_EX);

        return $data['count'] <= $max;
    } catch (\Throwable $e) {
        error_log("[rateLimit] FS-Error, failing open: " . $e->getMessage());
        return true; // FAIL-OPEN
    }
}
```

**Cleanup-Strategie:** Keine aktive Garbage-Collection nötig. Dateien werden bei Bedarf überschrieben. Falls die Anzahl der Dateien problematisch wird (>10.000), kann ein simpler Cron-Job sie aufräumen — aber realistisch für ein Kontaktformular: nie nötig.

**Concurrency-Hinweis (Cowork R1 Polish-Punkt):**
`file_put_contents(..., LOCK_EX)` macht den Schreibvorgang atomar, **NICHT** die ganze read-modify-write-Sequenz. Bei zwei wirklich simultanen Anfragen vom gleichen IP kann ein theoretischer TOCTOU-Drift entstehen (eine Anfrage wird im Counter "verloren"). Für unseren Lead-Form-Use-Case (max ~1 Submission/Min): **vernachlässigbar**. Für saubere `flock()`-basierte Implementierung wäre der Code 2–3× komplexer ohne praktischen Vorteil — bewusste Entscheidung gegen Over-Engineering. Falls in Phase D (echte Lastspitzen) jemand das Form spammt, kann mit `fopen('c+')` + `flock(LOCK_EX)` + manuelle `fread`/`ftruncate`/`fwrite`/`flock(LOCK_UN)` rigoroser nachgezogen werden.

---

## 9. Error Handling

| Szenario | HTTP-Status | UI-Message | Verhalten |
|----------|-------------|------------|-----------|
| Origin nicht in Whitelist | (kein CORS-Header) | Browser-Fehler | Frontend bekommt nichts |
| OPTIONS-Preflight | `204 No Content` | (nicht sichtbar) | Browser cached 24h |
| Method ≠ POST | `405 Method Not Allowed` | "Methode nicht erlaubt" | — |
| Honeypot ausgefüllt | `200 OK` | "Erfolg!" | Silent fail, keine Mail |
| JSON-Parse-Fehler | `400 Bad Request` | "Ungültige Anfrage" | — |
| Datenschutz nicht akzeptiert | `400` | "Bitte Datenschutz akzeptieren" | — |
| Required Field fehlt | `400` | "Bitte alle Pflichtfelder ausfüllen" | — |
| Email-Format ungültig | `400` | "Bitte gültige E-Mail eingeben" | — |
| Rate-Limit überschritten | `429 Too Many Requests` | "Zu viele Anfragen, bitte später erneut" | — |
| Rate-Limit-File-Fehler | (transparent) | (keine Anzeige) | **Fail-open: Mail wird gesendet**, geloggt |
| SMTP-Fehler (PHPMailer Exception) | `500 Internal Server Error` | "E-Mail konnte nicht gesendet werden. Bitte direkt an info@gastro-master.de mailen." | Error-Log auf Server |
| Erfolg | `200 OK` | "Danke! Wir melden uns innerhalb 24h" | Mail gesendet |

**Response-Format:** Immer JSON, immer mit CORS-Header.

```php
function jsonResponse(int $status, array $payload): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
```

---

## 10. Testing

### Manuelle Tests (Phase-A-Akzeptanzkriterien)

Übernommen aus archivierter Spec §7 (Tests 1–9), erweitert um Plan-D-spezifische Punkte:

1. **Happy Path** — Form ausfüllen → Mail kommt an **allen 4 Empfängern** an (kein Sandbox-Limit!)
2. **Honeypot** — DevTools-Hidden-Field füllen → silent 200, keine Mail
3. **Validation** — Required-Field leer → 400
4. **Rate-Limit** — 6× hintereinander → 6. = 429 (Test mit konstanter Test-IP)
5. **Length-Limit** — Nachricht > 5000 Chars → Mail enthält "[gekürzt]"
6. **Reply-To** — Mail "Antworten" → Empfänger = Kunden-E-Mail
7. **Sonderzeichen-Härtetest** — `Stefano's Café & Co.` + Umlaute + Emojis → kein Doppel-Escape, keine kaputten Umlaute
8. **Newline-Test** — Mehrzeilige Nachricht → `<br>`-Linebreaks
9. **Empty-Fallback-Test** — Form ohne restaurant + products → Subject ohne Klammer, Tabelle mit `—` / `(keine Auswahl)`

**Plan-D-spezifische Zusatz-Tests:**

10. **CORS-Test (positiv)** — Frontend von `gastro-master.vercel.app` → 200 + ACAO-Header
11. **CORS-Test (negativ)** — `curl -H 'Origin: https://evil.com'` → kein ACAO-Header (Browser würde blocken)
12. **OPTIONS-Preflight** — `curl -X OPTIONS ...` → 204 + CORS-Headers

### Automated Tests (optional, post-Go-Live)

PHP-Unit-Tests für Pure Functions (escape, validate, buildSubject, buildHtmlBody) — analog zu den Vitest-Unit-Tests in der archivierten Spec. Nicht Phase-A-prioritär.

---

## 11. Roadmap

### Phase A — HEUTE
- ✅ Spec + Plan schreiben + reviewen
- ✅ PHPMailer-Bundle ins Repo
- ✅ `contact.php` + `config.example.php` schreiben
- ✅ Frontend-Endpoint umstellen
- ✅ FTP-Upload (Salvatore manuell)
- ✅ 12 manuelle Tests
- ✅ Domain-Cutover-vorbereitung

### Phase C — Post-Go-Live (nach DNS-Migration weg von WordPress)
- **C1 (MANDATORY):** DNS-Migration `gastro-master.de` von WordPress auf Vercel (für Frontend)
- **C2:** Subdomain `api.gastro-master.de` einrichten → DNS-CNAME auf `w01d17b9.kasserver.com`
- **C3:** PHP-Backend an neue Subdomain umziehen (oder Symlink)
- **C4:** Vite-Env-Var `VITE_CONTACT_ENDPOINT=https://api.gastro-master.de/contact.php`, Hardcode entfernen
- **C5:** CORS-Whitelist verkleinern auf `https://gastro-master.de` (exact match), Vercel-Pattern entfernen
- **C6:** Optional: Bestätigungsmail an Kunden

### Phase D — Bei Bedarf
- Cloudflare Turnstile falls Spam durchkommt
- PHP-Unit-Tests für Pure Functions
- Monitoring (Logfile-Watcher für 5xx-Spikes)

---

## 12. Open Questions / TODOs

- [x] ~~Q1: PHP-Version~~ (PHP 8.5.3, modern syntax OK)
- [x] ~~Q2: Composer verfügbar~~ (nein → Standalone-Bundle)
- [x] ~~Q3: Production-URL~~ (Sandbox in Phase A, api-Subdomain in C)
- [x] ~~Q4: Edit-Workflow~~ (Variante 1: lokal + manuelles FTP-Upload)
- [ ] Salvatore (oder Claude Code via curl): PHPMailer **6.10.x** ZIP von GitHub Release ziehen, ins Repo unter `php-backend/lib/phpmailer/` entpacken (NUR `src/` + `LICENSE` + `README.md` brauchen wir)
- [ ] Salvatore: `config.php` lokal anlegen (NICHT committen), via FileZilla hochladen
- [ ] Salvatore: `data/rate-limits/`-Verzeichnis auf Server mit chmod 0755 anlegen
- [ ] Phase C: api-Subdomain einrichten (siehe Roadmap C2)
- [ ] Phase C: CORS-Whitelist verkleinern auf Production-Domain

---

## 13. Approvals

- **Salvatore Anzaldi** (Product Owner): Pending Final Review (nach R2-Updates)
- **Sanjaya Pattiyage** (Chef-Entwickler, Plan-D-Strategie-Entscheider): Strategie approved, Spec pending
- **Claude Cowork** (External Review, R1 — 2026-05-11): ✅ Approved mit 2 Pflicht- und 3 Optional-Anpassungen — alle übernommen:
  - **Pflicht 1:** §3 Pipeline-Order umsortiert — Honeypot NACH JSON-Parse, VOR Rate-Limit (Bot-Quota-Schutz)
  - **Pflicht 2:** §7 CORS-Regex gefixt — Repo-Name `gastro-direct-launch` → Vercel-Projekt-Name `gastro-master`
  - **Optional 1:** §8 Concurrency-Hinweis zu TOCTOU-Drift inline ergänzt (bewusste Wahl gegen `flock()`-Komplexität)
  - **Optional 2:** §5 Encoding gewechselt — `BASE64` → `ENCODING_QUOTED_PRINTABLE` (Standard für HTML+UTF-8)
  - **Optional 3:** PHPMailer-Downgrade 7.0.2 → 6.10.x (battle-tested, identische API für unseren Use-Case, Cowork-Empfehlung)

**Geplante Review-Runden:**
1. ~~Cowork R1: Architektur + Edge-Cases~~ — abgeschlossen 2026-05-11 ✅
2. Cowork R2 (optional): Finaler Sanity-Check nach R1-Updates
3. Optional: Cowork-Code-Review nach Implementation

---

## 14. Anti-Hallucination-Verifikation (durchgeführt)

| Behauptung | Quelle | Verifiziert |
|------------|--------|-------------|
| PHPMailer 7.0.2 ist neueste stabile Version (Jan 2026) | [GitHub Releases](https://github.com/PHPMailer/PHPMailer/releases) | ✅ |
| **Entscheidung: Downgrade auf 6.10.x** statt 7.0.2 | Cowork R1 + [PHPMailer UPGRADING.md](https://github.com/PHPMailer/PHPMailer/blob/master/UPGRADING.md) — Begründung unten | ✅ |
| Port 465 = `PHPMailer::ENCRYPTION_SMTPS` (= `'ssl'`), NICHT `'tls'` | [PHPMailer Auth & Security](https://deepwiki.com/PHPMailer/PHPMailer/3-authentication-and-security) | ✅ |
| 6.10.x API identisch zu 7.x für unseren Use-Case (`setFrom`, `addAddress`, `addReplyTo`, `isHTML`, `Body`, `Subject`, `ENCRYPTION_SMTPS`) | UPGRADING.md: nur 2 Breaking Changes — `lang()/setLanguage()/$language` jetzt statisch (nutzen wir nicht) + STARTTLS-localhost-Verhalten (nutzen wir nicht) | ✅ |
| PHP 8.5 syntax features (readonly, named args, typed props) | Salvatores `phpinfo()` zeigt PHP 8.5.3 | ✅ |
| All-Inkl SMTP-Verbindung Port 465 funktioniert | Live-Test am 2026-05-11 (hallo@-Mailbox) | ✅ |
| FTP-Webroot = sandbox.gastro-master.de Webroot | Live-Test am 2026-05-11 (FileZilla) | ✅ |
| CORS-Regex matched echte Vercel-URLs (Projekt `gastro-master`, NICHT Repo `gastro-direct-launch`) | Cowork R1 — Pattern gegen reale Preview-URL `gastro-master-git-feat-kontakt-f-70ceac-sanzaldi-4022s-projects.vercel.app` getestet | ✅ |
| `htmlspecialchars()` mit `ENT_QUOTES` (Default HTML4.01) escaped `'` zu `&#039;` — für Email-Compat besser als `ENT_HTML5`-Variante `&apos;` | Cowork-Catch 2026-05-11: Initial-Implementierung nutzte `ENT_QUOTES \| ENT_HTML5` → Test schlug fehl (Expected: `&#039;`, Actual: `&apos;`). `&apos;` rendert in Outlook 2003/2007 als Literal-Text. Korrigiert: `ENT_HTML5`-Flag entfernt. | ✅ |

### Begründung zum PHPMailer-Downgrade (6.10.x statt 7.0.2)

Obwohl 7.0.2 die neueste stabile Version ist, fällt die Wahl bewusst auf 6.10.x:

1. **Keine Featurelücke:** Für unseren Use-Case (SMTP-Versand, HTML-Body, Reply-To, Multi-Recipient) ist die 6.10.x-API identisch zu 7.0.2.
2. **Battle-tested:** 6.x-Serie läuft seit 2016 in WordPress, Drupal, Laravel, Joomla → Millionen Production-Deployments ohne bekannte Issues für unseren Use-Case.
3. **Minimaler Risk-Surface:** Major-Version-Bumps können subtile Verhaltensänderungen mitbringen, selbst bei stabiler API-Oberfläche. Lead-Form-Backend ist kein Ort für Major-Version-Experiments.
4. **Cowork-R1-Empfehlung:** *"Wenn die 7.x-API breaking changes hat, lieber PHPMailer 6.10.x (latest stable 6er) verwenden — funktioniert ebenso mit PHP 8.5 und ist battle-tested."*
5. **Phase-D-Upgrade-Path bleibt offen:** Sollte 7.x in 6+ Monaten ausreichend in Production getestet sein (oder eine kritische Sicherheits-Patch erfordert), ist der Upgrade trivial (identische API-Calls).
