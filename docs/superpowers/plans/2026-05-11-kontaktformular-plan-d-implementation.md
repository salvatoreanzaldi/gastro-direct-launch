# Plan: Kontaktformular Plan D — Implementation (PHP + SMTP)

**Goal:** Aktivierung des `/kontakt`-Formulars via PHP-Backend auf `sandbox.gastro-master.de`, SMTP-Versand an 4 Empfänger.
**Architecture:** PHP 8.5 + PHPMailer 6.10.0 + file-based Rate-Limit + CORS für Vercel-Cross-Origin.
**Tech stack:** PHP 8.5 (strict_types, readonly, named args), PHPMailer 6.10.0 standalone bundle, plain assert-based CLI-Test-Skript (kein Composer/PHPUnit).
**Spec reference:** [`docs/superpowers/specs/2026-05-11-kontaktformular-plan-d.md`](../specs/2026-05-11-kontaktformular-plan-d.md)

---

## ⚠️ PRE-FLIGHT: Manuelle Schritte durch Salvatore (VOR Code-Tasks)

### PF-1: .htaccess-Test auf All-Inkl (~5 Min)

**Warum:** Wir verlassen uns auf `.htaccess` zum Web-Schutz von `data/rate-limits/`. Falls Apache auf w01d17b9 `.htaccess` nicht ehrlich liest, läge unsere Rate-Limit-Datenbank öffentlich im Web.

**Schritte:**

1. Erstelle ein lokales Test-Verzeichnis:
   ```
   test-htaccess/
   ├── .htaccess     ← Inhalt: siehe unten (Dual-Pattern identisch zu data/.htaccess)
   └── secret.txt    ← Inhalt: "if you see this, htaccess failed"
   ```

   **Inhalt der Test-`.htaccess`** (Cowork-R1: identisch zu Task 9 data/.htaccess, sonst falsch-negative bei Apache 2.2):
   ```apache
   # Apache 2.4+
   <IfModule mod_authz_core.c>
       Require all denied
   </IfModule>
   # Apache 2.2 Fallback
   <IfModule !mod_authz_core.c>
       Order deny,allow
       Deny from all
   </IfModule>
   ```

2. Upload via FileZilla nach Webroot von sandbox: `/test-htaccess/`

3. Browser-Tests:
   - `https://sandbox.gastro-master.de/test-htaccess/secret.txt` → Erwartung: **403 Forbidden**
   - `https://sandbox.gastro-master.de/test-htaccess/.htaccess` → Erwartung: **403 Forbidden**

4. Cleanup: `test-htaccess/` wieder löschen.

**🚦 GO/NO-GO:**
- ✅ Beide URLs liefern 403 → weiter zu PF-2
- ❌ secret.txt liefert 200 → **STOPP**, alternative Strategie nötig:
  - **Option B:** `data/`-Folder AUSSERHALB Webroot legen (z.B. `/www/htdocs/w01d17b9/private-data/`) → 100% Web-unsichtbar
  - **Option C:** Rate-Limit-Files mit `.deny`-Extension benennen, in `httpd.conf`-relevantem Apache-Pattern

### PF-2: config.php lokal erstellen (NICHT committen)

**Schritte:**

1. **Erst NACH** Task 9 (wenn `config.example.php` existiert), kopiere:
   ```bash
   cp php-backend/config.example.php php-backend/config.php
   ```

2. Trage echte SMTP-Credentials ein:
   - `password` = SMTP-Passwort der `hallo@gastro-master.de`-Mailbox (aus All-Inkl KAS-Panel)

3. Verify dass die Datei via `.gitignore` ausgeschlossen ist:
   ```bash
   git status php-backend/config.php
   # Expected: keine Anzeige (untracked + ignored)
   ```

4. **Upload erfolgt in Task 11**, nicht jetzt.

---

**🚦 GO/NO-GO:** PF-1 grün → Code-Tasks starten. PF-2 wird parallel zu Task 9 erledigt.

---

## Task 1: Branch + PHPMailer 6.10.0 + .gitignore

**Files affected:**
- New: `php-backend/lib/phpmailer/` (PHPMailer 6.10.0 src)
- Edit: `.gitignore` (config.php + data/rate-limits/* ausschließen)

**Steps:**

1. Branch erstellen:
   ```bash
   cd /Users/salvatore/Desktop/Gastro\ Master\ Dev/gastro-direct-launch
   git checkout main
   git checkout -b feat/kontakt-form-plan-d
   ```

2. PHPMailer 6.10.0 herunterladen:
   ```bash
   mkdir -p php-backend/lib
   cd php-backend/lib
   curl -L https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.10.0.tar.gz -o phpmailer.tar.gz
   tar -xzf phpmailer.tar.gz
   mv PHPMailer-6.10.0 phpmailer
   rm phpmailer.tar.gz
   # Nur src/, LICENSE, README behalten (Test-Files etc. brauchen wir nicht)
   ls phpmailer/  # Verify: src/, LICENSE, README.md (+ andere, wir behalten alles für Einfachheit)
   cd ../..
   ```

3. `.gitignore` ergänzen:
   ```bash
   cat >> .gitignore <<'EOF'

   # PHP backend secrets (manually uploaded via FTP, never committed)
   php-backend/config.php

   # Runtime rate-limit data (server-side state)
   php-backend/data/rate-limits/*
   !php-backend/data/rate-limits/.gitkeep
   EOF
   ```

4. Verify:
   ```bash
   ls php-backend/lib/phpmailer/src/PHPMailer.php
   # Expected: -rw-r--r--  ... PHPMailer.php (Datei existiert)

   grep -E "config.php|rate-limits" .gitignore
   # Expected: 3 Zeilen
   ```

5. Commit:
   ```bash
   git add php-backend/lib/phpmailer/ .gitignore
   git commit -m "feat(php): add PHPMailer 6.10.0 standalone bundle + gitignore secrets"
   ```

---

## Task 2: Test-Framework Skeleton (Browser-Runner, kein Composer)

**Files affected:**
- New: `php-backend/tests/assert.php` — Mini-Assert-Helpers (sammelt Ergebnisse)
- New: `php-backend/tests/run.php` — Browser-Runner mit HTML-Output

**Workflow-Begründung (Pivot 2026-05-11):**
Lokales PHP-Setup ist für diesen Use-Case zu viel Overhead (technischer Beginner, einmalige Implementation, Xcode-CLT-Install-Issues). Stattdessen: Server-side Test-Execution via Browser.

**Workflow:**
1. Claude Code schreibt Tests + Implementation in TDD-Struktur (40 Tests über 5 Module).
2. Salvatore uploaded `tests/`-Ordner + alle Module via FTP.
3. Browser → `https://sandbox.gastro-master.de/tests/run.php`
4. HTML-Output zeigt alle Tests mit grün/rot + Error-Messages bei Fails.
5. Bei Fails: Claude Code iteriert, Salvatore re-uploaded betroffene Files.
6. **🔒 SECURITY-KRITISCH:** Nach Smoke-Tests → `tests/`-Ordner via FileZilla **LÖSCHEN**. Sonst kann jeder im Internet die Test-Suite triggern.

**Steps:**

1. Implement `php-backend/tests/assert.php`:
   ```php
   <?php
   declare(strict_types=1);

   final class TestRunner {
       private static int $passed = 0;
       private static int $failed = 0;
       private static array $failures = [];

       public static function test(string $name, callable $fn): void {
           try {
               $fn();
               self::$passed++;
               echo "  ✅ $name\n";
           } catch (\AssertionError $e) {
               self::$failed++;
               self::$failures[] = [$name, $e->getMessage()];
               echo "  ❌ $name\n";
               echo "     " . str_replace("\n", "\n     ", $e->getMessage()) . "\n";
           }
       }

       public static function summary(): array {
           return [self::$passed, self::$failed];
       }
   }

   function it(string $name, callable $fn): void {
       TestRunner::test($name, $fn);
   }

   function assertEquals(mixed $expected, mixed $actual, string $msg = ''): void {
       if ($expected !== $actual) {
           throw new \AssertionError(
               ($msg ? "$msg\n" : '') .
               "    Expected: " . var_export($expected, true) . "\n" .
               "    Actual:   " . var_export($actual, true)
           );
       }
   }

   function assertTrue(bool $value, string $msg = ''): void {
       if (!$value) throw new \AssertionError(($msg ?: 'Expected true, got false'));
   }

   function assertFalse(bool $value, string $msg = ''): void {
       if ($value) throw new \AssertionError(($msg ?: 'Expected false, got true'));
   }

   function assertContains(string $needle, string $haystack, string $msg = ''): void {
       if (!str_contains($haystack, $needle)) {
           throw new \AssertionError(
               ($msg ?: "String not found") . "\n" .
               "    Needle:   $needle\n" .
               "    Haystack: $haystack"
           );
       }
   }

   function assertNotContains(string $needle, string $haystack, string $msg = ''): void {
       if (str_contains($haystack, $needle)) {
           throw new \AssertionError(
               ($msg ?: "String unexpectedly found") . "\n" .
               "    Needle:   $needle\n" .
               "    Haystack: $haystack"
           );
       }
   }

   function assertMatches(string $pattern, string $value, string $msg = ''): void {
       if (preg_match($pattern, $value) === 0) {
           throw new \AssertionError(
               ($msg ?: "Pattern did not match") . "\n" .
               "    Pattern: $pattern\n" .
               "    Value:   $value"
           );
       }
   }
   ```

2. Implement `php-backend/tests/run.php`:
   ```php
   <?php
   declare(strict_types=1);

   require __DIR__ . '/assert.php';

   $tests = glob(__DIR__ . '/*_test.php');
   if ($tests === false || count($tests) === 0) {
       echo "No tests found in " . __DIR__ . "\n";
       exit(0);
   }

   foreach ($tests as $file) {
       echo "\n📋 " . basename($file) . "\n";
       require_once $file;
   }

   [$pass, $fail] = TestRunner::summary();
   $total = $pass + $fail;
   echo "\n═══ TEST SUMMARY ═══\n";
   echo "Passed: $pass / $total\n";
   echo "Failed: $fail\n";
   exit($fail > 0 ? 1 : 0);
   ```

3. Smoke-test (Runner findet keine Tests, exit 0):
   ```bash
   php php-backend/tests/run.php
   # Expected output:
   # No tests found in /Users/salvatore/.../php-backend/tests
   ```

4. Commit:
   ```bash
   git add php-backend/tests/
   git commit -m "feat(php): add minimal CLI test framework (no Composer/PHPUnit)"
   ```

---

## Task 3: `sanitize.php` (TDD)

**Files affected:**
- New: `php-backend/lib/sanitize.php`
- New: `php-backend/tests/sanitize_test.php`

**Why TDD:** XSS-Verteidigung. Cowork hat in der archivierten Spec Doppel-Escape (`&amp;amp;`) explizit als Bug-Risiko markiert.

**Steps:**

1. Write failing test in `php-backend/tests/sanitize_test.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/../lib/sanitize.php';

   it('escapes ampersand exactly once (no double-escape)', function() {
       assertEquals(
           'Stefano&#039;s Café &amp; Co.',
           escapeHtml("Stefano's Café & Co.")
       );
   });

   it('escapes angle brackets', function() {
       assertEquals(
           '&lt;script&gt;alert(1)&lt;/script&gt;',
           escapeHtml('<script>alert(1)</script>')
       );
   });

   it('escapes double quotes', function() {
       assertEquals('say &quot;hi&quot;', escapeHtml('say "hi"'));
   });

   it('preserves umlauts and emojis (UTF-8 passthrough)', function() {
       assertEquals('Müller 🍕', escapeHtml('Müller 🍕'));
   });

   it('returns empty string for empty input', function() {
       assertEquals('', escapeHtml(''));
   });

   it('handles null gracefully', function() {
       assertEquals('', escapeHtml(null));
   });
   ```

2. Run, verify failure:
   ```bash
   php php-backend/tests/run.php
   # Expected: error "require failed: sanitize.php not found"
   ```

3. Implement `php-backend/lib/sanitize.php`:
   ```php
   <?php
   declare(strict_types=1);

   /**
    * HTML-escape user input to prevent XSS in email body.
    * Uses ENT_QUOTES (escapes both " and ') + UTF-8.
    * NO ENT_HTML5 — that would escape ' to &apos;, which older email clients
    * (Outlook 2003/2007) render as literal text instead of an apostrophe.
    * Default (HTML4.01) escapes ' to &#039; — universally compatible.
    */
   function escapeHtml(?string $input): string {
       if ($input === null) return '';
       return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
   }
   ```

4. Run, verify pass:
   ```bash
   php php-backend/tests/run.php
   # Expected: 6/6 tests passing
   ```

5. Commit:
   ```bash
   git add php-backend/lib/sanitize.php php-backend/tests/sanitize_test.php
   git commit -m "feat(php): add escapeHtml() wrapper with UTF-8 + ENT_QUOTES/HTML5"
   ```

---

## Task 4: `buildEmailBody.php` (TDD — Edge-Cases aus Spec §6)

**Files affected:**
- New: `php-backend/lib/buildEmailBody.php`
- New: `php-backend/tests/buildEmailBody_test.php`

**Why TDD:** Newline-Handling, Empty-Fallbacks, Reihenfolge `escape→<br>` (sonst `&lt;br&gt;`). 5 Iterations Spec-Review → muss korrekt implementiert sein.

**Steps:**

1. Write failing tests in `php-backend/tests/buildEmailBody_test.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/../lib/buildEmailBody.php';

   $baseForm = [
       'name' => 'Max Mustermann',
       'restaurant' => "Stefano's Café & Co.",
       'plz' => '61250',
       'phone' => '+49 123 456',
       'email' => 'max@example.com',
       'message' => "Hallo,\n\nich brauche Beratung.\nGrüße",
       'products' => ['Webshop', 'Kassensystem'],
       'datenschutz' => true,
   ];

   it('subject: includes restaurant in parens when present', function() use ($baseForm) {
       assertEquals(
           "Neue Kontaktanfrage: Max Mustermann (Stefano's Café & Co.)",
           buildEmailSubject($baseForm)
       );
   });

   it('subject: omits parens when restaurant is empty', function() use ($baseForm) {
       assertEquals(
           'Neue Kontaktanfrage: Max Mustermann',
           buildEmailSubject(['...' => null] + ['restaurant' => ''] + $baseForm)
       );
   });

   it('subject: omits parens when restaurant is whitespace-only', function() use ($baseForm) {
       assertEquals(
           'Neue Kontaktanfrage: Max Mustermann',
           buildEmailSubject(['restaurant' => '   '] + $baseForm)
       );
   });

   it('body: escapes ampersand in restaurant exactly once', function() use ($baseForm) {
       $html = buildEmailBody($baseForm);
       assertContains('Stefano&#039;s Café &amp; Co.', $html);
       assertNotContains('&amp;amp;', $html);
   });

   it('body: converts \\n to <br> in message', function() use ($baseForm) {
       $html = buildEmailBody($baseForm);
       assertContains('Hallo,<br><br>ich brauche Beratung.<br>Grüße', $html);
   });

   it('body: converts CRLF (\\r\\n) to <br> for cross-platform safety', function() use ($baseForm) {
       $html = buildEmailBody(['message' => "line1\r\nline2"] + $baseForm);
       assertContains('line1<br>line2', $html);
       assertNotContains("\r", $html);
   });

   it('body: does NOT produce &lt;br&gt; (escape BEFORE \\n→<br>)', function() use ($baseForm) {
       $html = buildEmailBody($baseForm);
       assertNotContains('&lt;br&gt;', $html);
   });

   it('body: shows "—" for empty restaurant', function() use ($baseForm) {
       $html = buildEmailBody(['restaurant' => ''] + $baseForm);
       assertMatches('#<strong>Restaurant:</strong></td><td[^>]*>—#', $html);
   });

   it('body: shows "—" for empty plz', function() use ($baseForm) {
       $html = buildEmailBody(['plz' => ''] + $baseForm);
       assertMatches('#<strong>PLZ:</strong></td><td[^>]*>—#', $html);
   });

   it('body: shows "(keine Auswahl)" when products array is empty', function() use ($baseForm) {
       $html = buildEmailBody(['products' => []] + $baseForm);
       assertContains('(keine Auswahl)', $html);
   });

   it('body: includes all form fields', function() use ($baseForm) {
       $html = buildEmailBody($baseForm);
       assertContains('Max Mustermann', $html);
       assertContains('61250', $html);
       assertContains('+49 123 456', $html);
       assertContains('max@example.com', $html);
       assertContains('Webshop, Kassensystem', $html);
   });

   it('body: includes ISO timestamp', function() use ($baseForm) {
       $html = buildEmailBody($baseForm);
       assertMatches('#\d{4}-\d{2}-\d{2}T\d{2}:\d{2}#', $html);
   });
   ```

2. Run, verify failure:
   ```bash
   php php-backend/tests/run.php
   # Expected: error "require failed: buildEmailBody.php"
   ```

3. Implement `php-backend/lib/buildEmailBody.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/sanitize.php';

   /**
    * Build the email Subject line.
    * Subject-Conditional: omit parens if restaurant is empty/whitespace.
    */
   function buildEmailSubject(array $form): string {
       $restaurant = trim($form['restaurant'] ?? '');
       $name = $form['name'] ?? '';
       return $restaurant !== ''
           ? "Neue Kontaktanfrage: {$name} ({$restaurant})"
           : "Neue Kontaktanfrage: {$name}";
   }

   /**
    * Build the email HTML body with edge-case handling:
    * - ESCAPE FIRST, then \n→<br> (otherwise: "&lt;br&gt;")
    * - CRLF-safe: /\r?\n/ matches both Unix and Windows line endings
    * - Empty-fallbacks: restaurant/plz → "—", products empty → "(keine Auswahl)"
    */
   function buildEmailBody(array $form): string {
       $name = escapeHtml($form['name'] ?? '');
       $restaurant = trim(escapeHtml($form['restaurant'] ?? '')) ?: '—';
       $plz = trim(escapeHtml($form['plz'] ?? '')) ?: '—';
       $phone = escapeHtml($form['phone'] ?? '');
       $email = escapeHtml($form['email'] ?? '');

       // Critical order: escape FIRST, then convert newlines
       $messageHtml = preg_replace(
           '/\r?\n/',
           '<br>',
           escapeHtml($form['message'] ?? '')
       );

       $products = $form['products'] ?? [];
       $productsHtml = !empty($products)
           ? escapeHtml(implode(', ', $products))
           : '(keine Auswahl)';

       $timestamp = (new DateTimeImmutable())->format(DateTimeInterface::ATOM);

       return <<<HTML
   <h2>Neue Kontaktanfrage</h2>
   <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
     <tr><td style="padding: 6px;"><strong>Name:</strong></td><td style="padding: 6px;">{$name}</td></tr>
     <tr><td style="padding: 6px;"><strong>Restaurant:</strong></td><td style="padding: 6px;">{$restaurant}</td></tr>
     <tr><td style="padding: 6px;"><strong>PLZ:</strong></td><td style="padding: 6px;">{$plz}</td></tr>
     <tr><td style="padding: 6px;"><strong>Telefon:</strong></td><td style="padding: 6px;">{$phone}</td></tr>
     <tr><td style="padding: 6px;"><strong>E-Mail:</strong></td><td style="padding: 6px;">{$email}</td></tr>
     <tr><td style="padding: 6px;"><strong>Interessiert an:</strong></td><td style="padding: 6px;">{$productsHtml}</td></tr>
     <tr><td colspan="2" style="padding: 6px;"><strong>Nachricht:</strong></td></tr>
     <tr><td colspan="2" style="padding: 6px; background: #f5f5f5;">{$messageHtml}</td></tr>
     <tr><td style="padding: 6px;"><strong>Datenschutz:</strong></td><td style="padding: 6px;">✅ akzeptiert</td></tr>
     <tr><td style="padding: 6px;"><strong>Eingegangen:</strong></td><td style="padding: 6px;">{$timestamp}</td></tr>
   </table>
   HTML;
   }
   ```

4. Run, verify pass:
   ```bash
   php php-backend/tests/run.php
   # Expected: 12/12 tests passing (6 sanitize + ~12 buildEmailBody)
   ```

5. Commit:
   ```bash
   git add php-backend/lib/buildEmailBody.php php-backend/tests/buildEmailBody_test.php
   git commit -m "feat(php): add buildEmailSubject + buildEmailBody with edge-case handling"
   ```

---

## Task 5: `validate.php` (TDD)

**Files affected:**
- New: `php-backend/lib/validate.php`
- New: `php-backend/tests/validate_test.php`

**Validation-Rules:**
- Required: name, phone, email, message
- Email-Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `datenschutz === true`
- Honeypot: `website` non-empty → silent fail
- Length-Limit: message > 5000 → truncate + " [gekürzt]"

**Steps:**

1. Write failing tests in `php-backend/tests/validate_test.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/../lib/validate.php';

   $validForm = [
       'name' => 'Max',
       'restaurant' => 'Test GmbH',
       'plz' => '61250',
       'phone' => '+49 123',
       'email' => 'max@example.com',
       'message' => 'Hallo',
       'products' => ['Webshop'],
       'datenschutz' => true,
       'website' => '',
   ];

   it('accepts valid form', function() use ($validForm) {
       $r = validateContactForm($validForm);
       assertTrue($r['ok']);
       assertFalse(isset($r['truncatedMessage']));
   });

   it('flags honeypot when website filled', function() use ($validForm) {
       $r = validateContactForm(['website' => 'spam-bot.com'] + $validForm);
       assertFalse($r['ok']);
       assertEquals(200, $r['status']);
       assertTrue($r['honeypot'] ?? false);
   });

   it('rejects missing name', function() use ($validForm) {
       $r = validateContactForm(['name' => ''] + $validForm);
       assertFalse($r['ok']);
       assertEquals(400, $r['status']);
       assertEquals('Bitte alle Pflichtfelder ausfüllen.', $r['error']);
   });

   it('rejects missing phone', function() use ($validForm) {
       $r = validateContactForm(['phone' => ''] + $validForm);
       assertFalse($r['ok']);
   });

   it('rejects missing message', function() use ($validForm) {
       $r = validateContactForm(['message' => ''] + $validForm);
       assertFalse($r['ok']);
   });

   it('rejects datenschutz=false', function() use ($validForm) {
       $r = validateContactForm(['datenschutz' => false] + $validForm);
       assertFalse($r['ok']);
       assertEquals('Bitte Datenschutz akzeptieren.', $r['error']);
   });

   it('rejects invalid email format', function() use ($validForm) {
       $r = validateContactForm(['email' => 'not-an-email'] + $validForm);
       assertFalse($r['ok']);
       assertEquals('Bitte gültige E-Mail eingeben.', $r['error']);
   });

   it('truncates message > MAX_MESSAGE_LENGTH', function() use ($validForm) {
       $long = str_repeat('a', MAX_MESSAGE_LENGTH + 100);
       $r = validateContactForm(['message' => $long] + $validForm);
       assertTrue($r['ok']);
       assertTrue(isset($r['truncatedMessage']));
       assertContains('[gekürzt]', $r['truncatedMessage']);
   });

   it('does not truncate message at exactly MAX_MESSAGE_LENGTH', function() use ($validForm) {
       $exact = str_repeat('a', MAX_MESSAGE_LENGTH);
       $r = validateContactForm(['message' => $exact] + $validForm);
       assertTrue($r['ok']);
       assertFalse(isset($r['truncatedMessage']));
   });
   ```

2. Run, verify failure → Implement `php-backend/lib/validate.php`:
   ```php
   <?php
   declare(strict_types=1);

   const MAX_MESSAGE_LENGTH = 5000;
   const EMAIL_REGEX = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

   /**
    * Validate the contact form payload.
    * Returns array:
    *   - { ok: true, truncatedMessage?: string }
    *   - { ok: false, status: 200, honeypot: true }     ← silent success for bots
    *   - { ok: false, status: 400, error: string }
    */
   function validateContactForm(array $input): array {
       // 1. Honeypot — silent reject
       $website = trim((string)($input['website'] ?? ''));
       if ($website !== '') {
           return ['ok' => false, 'status' => 200, 'honeypot' => true];
       }

       // 2. Required fields
       $name = trim((string)($input['name'] ?? ''));
       $phone = trim((string)($input['phone'] ?? ''));
       $email = trim((string)($input['email'] ?? ''));
       $message = trim((string)($input['message'] ?? ''));

       if ($name === '' || $phone === '' || $email === '' || $message === '') {
           return ['ok' => false, 'status' => 400, 'error' => 'Bitte alle Pflichtfelder ausfüllen.'];
       }

       // 3. Email format
       if (!preg_match(EMAIL_REGEX, $email)) {
           return ['ok' => false, 'status' => 400, 'error' => 'Bitte gültige E-Mail eingeben.'];
       }

       // 4. Datenschutz
       if (($input['datenschutz'] ?? false) !== true) {
           return ['ok' => false, 'status' => 400, 'error' => 'Bitte Datenschutz akzeptieren.'];
       }

       // 5. Length-Limit
       if (mb_strlen($message) > MAX_MESSAGE_LENGTH) {
           return [
               'ok' => true,
               'truncatedMessage' => mb_substr($message, 0, MAX_MESSAGE_LENGTH) . ' [gekürzt]',
           ];
       }

       return ['ok' => true];
   }
   ```

3. Run, verify pass:
   ```bash
   php php-backend/tests/run.php
   # Expected: 21/21 tests passing (6 + 12 + 9 = 27 total)
   ```

4. Commit:
   ```bash
   git add php-backend/lib/validate.php php-backend/tests/validate_test.php
   git commit -m "feat(php): add validation with honeypot, email regex, length limit"
   ```

---

## Task 6: `rateLimit.php` (TDD with temp dir)

**Files affected:**
- New: `php-backend/lib/rateLimit.php`
- New: `php-backend/tests/rateLimit_test.php`

**Steps:**

1. Implement test in `php-backend/tests/rateLimit_test.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/../lib/rateLimit.php';

   // Setup: writable temp dir
   $tmpDir = sys_get_temp_dir() . '/gm-rl-test-' . uniqid();
   mkdir($tmpDir, 0755, true);

   $cfg = [
       'max_per_hour' => 3,  // niedrig für schnellere Tests
       'window_seconds' => 3600,
       'data_dir' => $tmpDir . '/',
   ];

   // Cleanup helper
   $clean = function() use ($tmpDir) {
       foreach (glob($tmpDir . '/*') as $f) unlink($f);
   };

   it('first request: allowed, count=1', function() use ($cfg, $clean) {
       $clean();
       $r = checkRateLimit('1.2.3.4', $cfg);
       assertTrue($r['allowed']);
       assertEquals(2, $r['remaining']);
   });

   it('within limit: still allowed', function() use ($cfg, $clean) {
       $clean();
       checkRateLimit('1.2.3.4', $cfg);
       checkRateLimit('1.2.3.4', $cfg);
       $r = checkRateLimit('1.2.3.4', $cfg);
       assertTrue($r['allowed']);
       assertEquals(0, $r['remaining']);
   });

   it('over limit: blocked', function() use ($cfg, $clean) {
       $clean();
       for ($i = 0; $i < 3; $i++) checkRateLimit('1.2.3.4', $cfg);
       $r = checkRateLimit('1.2.3.4', $cfg);
       assertFalse($r['allowed']);
   });

   it('different IPs: independent counters', function() use ($cfg, $clean) {
       $clean();
       checkRateLimit('1.2.3.4', $cfg);
       checkRateLimit('1.2.3.4', $cfg);
       $r = checkRateLimit('5.6.7.8', $cfg);
       assertTrue($r['allowed']);
       assertEquals(2, $r['remaining']);  // 5.6.7.8 has count=1
   });

   it('uses sha256 of IP (no cleartext IP on disk)', function() use ($cfg, $clean) {
       $clean();
       checkRateLimit('1.2.3.4', $cfg);
       $files = glob($cfg['data_dir'] . '*.json');
       assertEquals(1, count($files));
       assertNotContains('1.2.3.4', $files[0]);
       assertMatches('#/[a-f0-9]{64}\.json$#', $files[0]);
   });

   it('fail-open on unwritable dir', function() {
       $r = checkRateLimit('1.2.3.4', [
           'max_per_hour' => 3,
           'window_seconds' => 3600,
           'data_dir' => '/nonexistent/path-that-cannot-exist/',
       ]);
       assertTrue($r['allowed']);  // FAIL-OPEN
       assertEquals(-1, $r['remaining']);
   });

   // Teardown
   register_shutdown_function(function() use ($tmpDir, $clean) {
       $clean();
       @rmdir($tmpDir);
   });
   ```

2. Implement `php-backend/lib/rateLimit.php`:
   ```php
   <?php
   declare(strict_types=1);

   /**
    * IP-based rate-limit via filesystem.
    * Key: sha256 of IP (no cleartext on disk → DSGVO-friendly).
    * Format: { count: int, resetAt: unix-ts }
    * Failure-mode: FAIL-OPEN on FS-error (lead-loss is worse than spam-risk).
    *
    * Concurrency note: LOCK_EX makes the write atomic, but NOT the
    * read-modify-write sequence. For sub-second concurrent requests,
    * theoretical counter-drift is possible. Negligible for lead-form
    * traffic (~1 submit/min). See Spec §8.
    */
   function checkRateLimit(string $ip, array $config): array {
       $hash = hash('sha256', $ip);
       $path = rtrim($config['data_dir'], '/') . '/' . $hash . '.json';
       $now = time();
       $max = (int)$config['max_per_hour'];
       $window = (int)$config['window_seconds'];

       try {
           if (!is_dir(dirname($path))) {
               throw new \RuntimeException("rate-limit dir missing: " . dirname($path));
           }

           $data = null;
           if (file_exists($path)) {
               $raw = file_get_contents($path);
               $data = $raw !== false ? json_decode($raw, true) : null;
           }

           if (!is_array($data) || ($data['resetAt'] ?? 0) < $now) {
               $data = ['count' => 1, 'resetAt' => $now + $window];
           } else {
               $data['count']++;
           }

           $written = file_put_contents($path, json_encode($data), LOCK_EX);
           if ($written === false) {
               throw new \RuntimeException("write failed: $path");
           }

           return [
               'allowed' => $data['count'] <= $max,
               'remaining' => max(0, $max - $data['count']),
           ];
       } catch (\Throwable $e) {
           error_log("[rateLimit] FS-Error, failing open: " . $e->getMessage());
           return ['allowed' => true, 'remaining' => -1];  // FAIL-OPEN
       }
   }
   ```

3. Run, verify pass:
   ```bash
   php php-backend/tests/run.php
   # Expected: 27/27 tests passing (sanitize 6 + buildEmailBody 12 + validate 9 + rateLimit 6)
   ```

4. Commit:
   ```bash
   git add php-backend/lib/rateLimit.php php-backend/tests/rateLimit_test.php
   git commit -m "feat(php): add file-based rate limit with SHA-256 IP hash and fail-open"
   ```

---

## Task 7: `parseRecipients.php` (TDD)

**Files affected:**
- New: `php-backend/lib/parseRecipients.php`
- New: `php-backend/tests/parseRecipients_test.php`

**Why TDD:** `config.php` liefert ein Array. Wir filtern ungültige Email-Formate raus + fail-fast bei leerer Liste. Verhindert kaputte Configs (z.B. Tippfehler in einer Adresse).

**Steps:**

1. Write tests in `php-backend/tests/parseRecipients_test.php`:
   ```php
   <?php
   declare(strict_types=1);

   require_once __DIR__ . '/../lib/parseRecipients.php';

   it('accepts valid list', function() {
       assertEquals(
           ['a@x.de', 'b@x.de', 'c@x.de'],
           parseRecipients(['a@x.de', 'b@x.de', 'c@x.de'])
       );
   });

   it('trims whitespace', function() {
       assertEquals(
           ['a@x.de', 'b@x.de'],
           parseRecipients([' a@x.de ', "\tb@x.de\n"])
       );
   });

   it('filters empty entries', function() {
       assertEquals(
           ['a@x.de'],
           parseRecipients(['a@x.de', '', '  '])
       );
   });

   it('filters invalid addresses', function() {
       assertEquals(
           ['a@x.de', 'b@x.de'],
           parseRecipients(['a@x.de', 'not-an-email', 'b@x.de'])
       );
   });

   it('returns empty array for empty input', function() {
       assertEquals([], parseRecipients([]));
   });

   it('returns empty array for null/non-array input', function() {
       assertEquals([], parseRecipients(null));
   });

   it('preserves ordering', function() {
       $r = parseRecipients(['info@x.de', 'rene@x.de', 'sanjaya@x.de', 'salva@x.de']);
       assertEquals('info@x.de', $r[0]);
       assertEquals('salva@x.de', $r[3]);
   });
   ```

2. Implement `php-backend/lib/parseRecipients.php`:
   ```php
   <?php
   declare(strict_types=1);

   /**
    * Parse + validate the recipients list from config.
    * Filters whitespace, empty strings, and invalid email formats.
    * Returns empty array if input is null/non-array (Caller does fail-fast).
    */
   function parseRecipients(mixed $input): array {
       if (!is_array($input)) return [];
       $emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
       $out = [];
       foreach ($input as $item) {
           if (!is_string($item)) continue;
           $clean = trim($item);
           if ($clean !== '' && preg_match($emailRegex, $clean)) {
               $out[] = $clean;
           }
       }
       return $out;
   }
   ```

3. Run, verify pass: ~34 tests total.

4. Commit:
   ```bash
   git add php-backend/lib/parseRecipients.php php-backend/tests/parseRecipients_test.php
   git commit -m "feat(php): add parseRecipients with format-validation + ordering preservation"
   ```

---

## Task 8: `contact.php` Main Handler + `config.example.php`

**Files affected:**
- New: `php-backend/contact.php` (Main Pipeline)
- New: `php-backend/config.example.php` (Template, in Git)

**Pipeline-Reihenfolge (gemäß Spec §3, Cowork-R1 approved):**
1. CORS + OPTIONS
2. Method-Check
3. JSON-Parse
4. Honeypot (silent success)
5. Rate-Limit
6. Validate
7. Sanitize + Length-Limit
8. PHPMailer-Send
9. JSON-Response

**Steps:**

1. Implement `php-backend/config.example.php`:
   ```php
   <?php
   /**
    * Template for config.php — copy to config.php and fill in real values.
    * config.php is gitignored.
    */

   return [
       'smtp' => [
           'host'     => 'w01d17b9.kasserver.com',
           'port'     => 465,
           'username' => 'hallo@gastro-master.de',
           'password' => 'CHANGE_ME',  // SMTP password of the mailbox
           'from'     => ['hallo@gastro-master.de', 'Gastro Master Kontakt'],
       ],
       'recipients' => [
           'info@gastro-master.de',
           'rene.ebert@gastro-master.de',
           'sanjaya.p@gastro-master.de',
           's.anzaldi@gastro-master.de',
       ],
       'cors' => [
           // Vercel project name is "gastro-master" (NOT the repo name).
           'origin_pattern' => '#^https://gastro-master(-[a-z0-9-]+)?\.vercel\.app$#',
           // Phase C: add exact-match for 'https://gastro-master.de'
       ],
       'rate_limit' => [
           'max_per_hour' => 5,
           'window_seconds' => 3600,
           'data_dir' => __DIR__ . '/data/rate-limits/',
       ],
   ];
   ```

2. Implement `php-backend/contact.php`:
   ```php
   <?php
   declare(strict_types=1);

   // ── 0. Load dependencies + config ────────────────────────────────────────
   require_once __DIR__ . '/lib/sanitize.php';
   require_once __DIR__ . '/lib/buildEmailBody.php';
   require_once __DIR__ . '/lib/validate.php';
   require_once __DIR__ . '/lib/rateLimit.php';
   require_once __DIR__ . '/lib/parseRecipients.php';
   require_once __DIR__ . '/lib/phpmailer/src/Exception.php';
   require_once __DIR__ . '/lib/phpmailer/src/PHPMailer.php';
   require_once __DIR__ . '/lib/phpmailer/src/SMTP.php';

   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   // ── Helper: JSON response with proper headers ─────────────────────────────
   function jsonResponse(int $status, array $payload): never {
       http_response_code($status);
       header('Content-Type: application/json; charset=utf-8');
       echo json_encode($payload, JSON_UNESCAPED_UNICODE);
       exit;
   }

   // ── 1. CORS-Check + OPTIONS-Preflight ─────────────────────────────────────
   $config = require __DIR__ . '/config.php';

   $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
   if (preg_match($config['cors']['origin_pattern'], $origin)) {
       header("Access-Control-Allow-Origin: $origin");
       header('Vary: Origin');
   }
   header('Access-Control-Allow-Methods: POST, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type');
   header('Access-Control-Max-Age: 86400');

   if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
       http_response_code(204);
       exit;
   }

   // ── 2. Method-Check ───────────────────────────────────────────────────────
   if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
       jsonResponse(405, ['error' => 'Method not allowed']);
   }

   // ── 3. JSON-Parse ─────────────────────────────────────────────────────────
   $raw = file_get_contents('php://input');
   $form = json_decode($raw ?: '', true);
   if (!is_array($form)) {
       jsonResponse(400, ['error' => 'Ungültige Anfrage.']);
   }

   // ── 4. Honeypot-Check (silent fail) ───────────────────────────────────────
   // Step 4 BEFORE step 5: bots burn no rate-limit quota → more headroom for real users
   if (trim((string)($form['website'] ?? '')) !== '') {
       jsonResponse(200, ['success' => true]);  // silent success
   }

   // ── 5. Rate-Limit (fail-open on FS-error) ─────────────────────────────────
   // SECURITY: REMOTE_ADDR direkt verwenden, X-Forwarded-For NICHT trusten.
   // Auf All-Inkl ist REMOTE_ADDR der echte Client-IP (kein vertrauter Proxy davor).
   // X-Forwarded-For ist vom Client setzbar → spoofbar → Rate-Limit-Bypass.
   // Falls in Phase D ein Proxy/CDN davor kommt: hier Trusted-Proxy-Logik einbauen.
   $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
   $rl = checkRateLimit($ip, $config['rate_limit']);
   if (!$rl['allowed']) {
       jsonResponse(429, ['error' => 'Zu viele Anfragen. Bitte später erneut versuchen.']);
   }

   // ── 6. Validate ───────────────────────────────────────────────────────────
   $validation = validateContactForm($form);
   if (!$validation['ok']) {
       // Honeypot would have been caught in step 4; here only error responses
       jsonResponse($validation['status'], ['error' => $validation['error']]);
   }

   // ── 7. Sanitize + Length-Limit applied ────────────────────────────────────
   // validate() already truncates message > 5000 chars; apply if set
   if (isset($validation['truncatedMessage'])) {
       $form['message'] = $validation['truncatedMessage'];
   }

   // ── 8. PHPMailer + SMTP Send ──────────────────────────────────────────────
   $recipients = parseRecipients($config['recipients']);
   if (empty($recipients)) {
       error_log('[api/contact] config recipients list is empty or invalid');
       jsonResponse(500, [
           'error' => 'Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.',
       ]);
   }

   try {
       $mail = new PHPMailer(true);
       $mail->isSMTP();
       $mail->Host       = $config['smtp']['host'];
       $mail->Port       = $config['smtp']['port'];
       $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
       $mail->SMTPAuth   = true;
       $mail->Username   = $config['smtp']['username'];
       $mail->Password   = $config['smtp']['password'];
       $mail->CharSet    = PHPMailer::CHARSET_UTF8;
       $mail->Encoding   = PHPMailer::ENCODING_QUOTED_PRINTABLE;

       $mail->setFrom(
           $config['smtp']['from'][0],
           $config['smtp']['from'][1]
       );
       foreach ($recipients as $addr) {
           $mail->addAddress($addr);
       }
       $mail->addReplyTo($form['email']);

       $mail->isHTML(true);
       $mail->Subject = buildEmailSubject($form);
       $mail->Body    = buildEmailBody($form);

       $mail->send();

       jsonResponse(200, ['success' => true]);
   } catch (Exception $e) {
       error_log('[api/contact] PHPMailer error: ' . $e->getMessage());
       jsonResponse(500, [
           'error' => 'E-Mail konnte nicht gesendet werden. Bitte direkt an info@gastro-master.de mailen.',
       ]);
   } catch (\Throwable $e) {
       error_log('[api/contact] Unexpected error: ' . $e->getMessage());
       jsonResponse(500, [
           'error' => 'Ein unerwarteter Fehler ist aufgetreten. Bitte direkt an info@gastro-master.de mailen.',
       ]);
   }
   ```

3. Lint-Check via CLI:
   ```bash
   php -l php-backend/contact.php
   php -l php-backend/config.example.php
   # Expected: No syntax errors detected
   ```

4. Commit:
   ```bash
   git add php-backend/contact.php php-backend/config.example.php
   git commit -m "feat(php): main contact handler with 9-step pipeline (CORS→Method→JSON→Honeypot→RateLimit→Validate→Sanitize→SMTP→Response)"
   ```

---

## Task 9: data/-Folder + .htaccess + .gitkeep

**Files affected:**
- New: `php-backend/data/.gitkeep`
- New: `php-backend/data/rate-limits/.gitkeep`
- New: `php-backend/data/.htaccess` (Web-Zugriff sperren)

**Steps:**

1. Create directory structure:
   ```bash
   mkdir -p php-backend/data/rate-limits
   touch php-backend/data/rate-limits/.gitkeep
   touch php-backend/data/.gitkeep
   ```

2. Write `.htaccess` in `php-backend/data/.htaccess`:
   ```
   # Block all web access to this directory.
   # The runtime rate-limit JSON files have non-sensitive content
   # (count + reset-timestamp + sha256 IP hash), but better safe than sorry.

   <IfModule mod_authz_core.c>
       # Apache 2.4+
       Require all denied
   </IfModule>

   <IfModule !mod_authz_core.c>
       # Apache 2.2 fallback
       Order deny,allow
       Deny from all
   </IfModule>
   ```

3. Verify .gitignore catches runtime files (NOT .gitkeep):
   ```bash
   echo '{"test": 1}' > php-backend/data/rate-limits/abc123.json
   git status php-backend/data/
   # Expected: shows ONLY .gitkeep + .htaccess as tracked, abc123.json untracked-but-ignored
   rm php-backend/data/rate-limits/abc123.json
   ```

4. Commit:
   ```bash
   git add php-backend/data/
   git commit -m "feat(php): add data/ folder structure + .htaccess web-block for rate-limits"
   ```

---

## Task 10: Frontend Endpoint Switch + Honeypot

**Files affected:**
- Edit: `src/pages/Kontakt.tsx`

**Changes:**
1. Form-State: `website: ""` (Honeypot) hinzufügen
2. Endpoint umstellen: `/api/contact` → `https://sandbox.gastro-master.de/contact.php`
3. Hidden Honeypot-Input am Anfang des Forms
4. `maxLength={5000}` auf textarea
5. State-Reset um `website` ergänzen

**Steps:**

1. Read current state of [src/pages/Kontakt.tsx:29-34](src/pages/Kontakt.tsx#L29-L34) (Form-State definition).

2. Edit Form-State (line ~29):
   ```typescript
   // ADD: website: "" for honeypot
   const [form, setForm] = useState({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [] as string[],
     datenschutz: false,
     recaptcha: false,
     website: "", // honeypot — must stay empty
   });
   ```

3. Edit Endpoint URL in handleSubmit (line ~61):
   ```typescript
   const response = await fetch("https://sandbox.gastro-master.de/contact.php", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(form),
   });
   ```

4. Edit State-Reset (line ~69, after successful submit):
   ```typescript
   setForm({
     name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
     products: [],
     datenschutz: false,
     recaptcha: false,
     website: "",
   });
   ```

5. Add Honeypot Hidden-Input directly after `<form onSubmit={handleSubmit}>` (line ~109):
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

6. Add `maxLength={5000}` to textarea (line ~170):
   ```jsx
   <textarea
     value={form.message} rows={3} maxLength={5000}
     ...
   />
   ```

7. Run typecheck:
   ```bash
   npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "Kontakt\.tsx" | head -5
   # Expected: empty (no errors in Kontakt.tsx)
   ```

8. Commit:
   ```bash
   git add src/pages/Kontakt.tsx
   git commit -m "feat(kontakt): switch endpoint to sandbox.gastro-master.de/contact.php + add honeypot"
   ```

---

## Task 11: FTP-Upload via FileZilla (Salvatore, manuell)

**Reihenfolge ist kritisch** — `contact.php` ZULETZT, sonst läuft das Backend in Errors während Setup.

**Pre-Upload-Check:**
- [ ] PF-1 (.htaccess-Test) bestanden
- [ ] PF-2: `php-backend/config.php` lokal erstellt mit echten Credentials
- [ ] Tasks 1–10 committed auf `feat/kontakt-form-plan-d`

**Upload-Reihenfolge:**

### 11.1 Library zuerst (`lib/`)
```
LOKAL: php-backend/lib/phpmailer/
SERVER: /www/htdocs/w01d17b9/webiste_2026/lib/phpmailer/

LOKAL: php-backend/lib/sanitize.php
SERVER: /www/htdocs/w01d17b9/webiste_2026/lib/sanitize.php
[+ buildEmailBody.php, validate.php, rateLimit.php, parseRecipients.php]
```

### 11.1b Test-Runner (TEMPORÄR — nach Verifikation LÖSCHEN!)

```
LOKAL: php-backend/tests/
SERVER: /www/htdocs/w01d17b9/webiste_2026/tests/

Inhalt: assert.php, run.php, sanitize_test.php, buildEmailBody_test.php,
        validate_test.php, rateLimit_test.php, parseRecipients_test.php
```

**Smoke-Test:**
1. Browser → `https://sandbox.gastro-master.de/tests/run.php`
2. Erwartung: HTML-Tabelle mit allen 40 Tests grün (`Passed: 40 / 40 — Failed: 0`)
3. Bei Fails: Claude Code informieren mit Screenshot/Copy der Fehler-Tabelle → Iteration → Re-upload betroffene Files → Refresh Browser

**🔒 SECURITY: Nach erfolgreichem Smoke-Test → Schritt 11.7 (Test-Folder LÖSCHEN!)**

### 11.2 Data-Folder mit Protection
```
LOKAL: php-backend/data/.htaccess
SERVER: /www/htdocs/w01d17b9/webiste_2026/data/.htaccess

LOKAL: php-backend/data/rate-limits/
SERVER: /www/htdocs/w01d17b9/webiste_2026/data/rate-limits/
   (leerer Folder — wird zur Laufzeit befüllt)
```

**Server-Permissions** (via FileZilla → Rechtsklick → File permissions):
- `data/` → `0755` (rwxr-xr-x)
- `data/rate-limits/` → `0755`
- `data/.htaccess` → `0644`

### 11.3 Verify .htaccess greift
Browser:
- `https://sandbox.gastro-master.de/data/.htaccess` → **403 Forbidden** ✅
- `https://sandbox.gastro-master.de/data/rate-limits/` → **403 Forbidden** ✅

Wenn 200: STOPP, .htaccess greift nicht → Server-Doku konsultieren.

### 11.4 config.php (Secrets, NICHT aus Git!)
```
LOKAL: php-backend/config.php (mit echtem SMTP-Passwort)
SERVER: /www/htdocs/w01d17b9/webiste_2026/config.php

Permissions: 0600 (rw------- nur Owner)
```

**Permissions-Eskalation falls 500-Error nach Upload** (Cowork R1):
`0600` setzt voraus, dass PHP-FPM-User === FTP-User. Auf All-Inkl ist das typisch der Fall (FPM läuft als Kunden-User `w01d17b9`), aber nicht garantiert. Falls PHP nach Upload einen 500-Error wirft mit "Permission denied" beim `require __DIR__ . '/config.php'`:

| Stufe | Wert | Bedeutung |
|-------|------|-----------|
| 1 (default) | `0600` | rw------- (nur Owner) — sicherste Option |
| 2 (Fallback) | `0640` | rw-r----- (Group lesen) — falls PHP unter anderem Group-User läuft |
| 3 (Breakglass) | `0644` | rw-r--r-- (alle lesen) — letzter Ausweg, **nicht** öffentlich aufrufbar wenn außerhalb Webroot oder per .htaccess geschützt |

In der Praxis reicht `0600` auf All-Inkl. Stufen 2 + 3 sind dokumentiert für Edge-Cases.

### 11.5 contact.php ZULETZT
```
LOKAL: php-backend/contact.php
SERVER: /www/htdocs/w01d17b9/webiste_2026/contact.php

Permissions: 0644 (rw-r--r--)
```

### 11.7 🔒 TEST-FOLDER LÖSCHEN (SICHERHEITS-KRITISCH)

Nach erfolgreichem 11.1b-Smoke-Test (alle 40 Tests grün) UND erfolgreichem 11.6-curl-Smoke-Test:

```
SERVER: /www/htdocs/w01d17b9/webiste_2026/tests/  →  via FileZilla LÖSCHEN
```

**Warum:** `tests/run.php` ist ein öffentlich aufrufbarer Endpoint, der die komplette Test-Suite ausführt. Während Setup ist das nützlich (Browser-basierte Verifikation), aber in Production:
- Reveals internal logic structure (welche Validations, welche Regex-Patterns)
- Verbraucht Server-Resourcen wenn von außen getriggert
- Schreibt Rate-Limit-Test-Dateien in `data/rate-limits/` (wenn Tests via Browser laufen mit echtem `data_dir`)

**Verify nach Löschung:**
- `https://sandbox.gastro-master.de/tests/` → 404 oder 403
- `https://sandbox.gastro-master.de/tests/run.php` → 404

**Falls Re-Test später nötig:** Folder via FileZilla wieder hochladen → Tests laufen → wieder löschen.

### 11.6 Smoke-Test mit curl
```bash
curl -i https://sandbox.gastro-master.de/contact.php
# Expected: 405 Method not allowed (GET → POST nur erlaubt)
# + Header "Access-Control-Allow-Methods: POST, OPTIONS"

curl -i -X OPTIONS https://sandbox.gastro-master.de/contact.php \
    -H "Origin: https://gastro-master.vercel.app"
# Expected: 204 + CORS-Headers (Access-Control-Allow-Origin: https://gastro-master.vercel.app)
```

Wenn diese 2 curl-Tests grün → weiter zu Task 12.

---

## Task 12: 12 Manuelle Tests (gemäß Spec §10)

### Pre-Test-Setup
- Branch `feat/kontakt-form-plan-d` lokal gepusht
- Vercel deployt automatisch ein Preview (z.B. `gastro-master-git-feat-kontakt-form-plan-d-...vercel.app`)
- Backend ist live unter `https://sandbox.gastro-master.de/contact.php`

### Tests

**Test 1 — Happy Path (alle 4 Empfänger!)**
- Form auf Vercel-Preview ausfüllen mit echter Email
- Submit → "Danke!"-UI
- **Erwartung:** Mail kommt in **info@, rene.ebert@, sanjaya.p@, s.anzaldi@** an
- ✅ Pass: alle 4 Mailboxen + alle Felder lesbar

**Test 2 — Honeypot**
- DevTools öffnen → `<input name="website">` finden → Value setzen auf `"spam-bot.com"`
- Submit → "Danke!"-UI (silent success)
- **Erwartung:** keine Mail kommt an
- ✅ Pass

**Test 3 — Validation (missing field)**
- Form ohne `phone` submitten → 400 Response
- UI zeigt "Bitte alle Pflichtfelder ausfüllen"
- ✅ Pass

**Test 4 — Rate-Limit**
- 6× hintereinander submitten
- 6. Versuch → "Zu viele Anfragen" / 429 Response
- ✅ Pass
- **Cleanup:** Auf Server `data/rate-limits/<your-ip-hash>.json` via FileZilla löschen oder 1h warten

**Test 5 — Length-Limit**
- DevTools-Console: `document.querySelector('textarea').maxLength = 99999`
- Nachricht mit ~6000 Zeichen submitten
- **Erwartung:** Mail enthält ~5000 Chars + " [gekürzt]"
- ✅ Pass

**Test 6 — Reply-To**
- In empfangener Mail "Antworten" klicken
- **Erwartung:** Empfänger ist die Kunden-E-Mail aus dem Form
- ✅ Pass

**Test 7 — Sonderzeichen-Härtetest**
- Form mit: Name `O'Connor`, Restaurant `Stefano's Café & Co.`, Message mit `🍕\nMit & ohne Lieferung\nUmlaute: äöüß`
- **Erwartung:**
  - Kein `&amp;amp;` (Doppel-Escape)
  - Umlaute korrekt
  - Apostroph korrekt
  - Emoji rendert
- ✅ Pass

**Test 8 — Newline-Test**
- Mehrzeilige Nachricht mit 3 Zeilenumbrüchen
- **Erwartung:** Mail zeigt visuelle Zeilenumbrüche, nicht Wall-of-Text
- ✅ Pass

**Test 9 — Empty-Fallback**
- Form ohne `restaurant` (leer) und ohne `products` (nichts ankreuzen)
- **Erwartung:**
  - Subject: `Neue Kontaktanfrage: <Name>` (keine leere Klammer)
  - Tabelle: Restaurant `—`, Interessiert an `(keine Auswahl)`
- ✅ Pass

**Test 10 — CORS positiv**
- Browser-DevTools Network-Tab → Submit → Response-Header
- **Erwartung:** `Access-Control-Allow-Origin: https://<preview-url>.vercel.app` vorhanden
- ✅ Pass

**Test 11 — CORS negativ**
```bash
curl -i -X POST https://sandbox.gastro-master.de/contact.php \
    -H "Origin: https://evil-site.com" \
    -H "Content-Type: application/json" \
    -d '{}'
```
- **Erwartung:** Response hat **KEINEN** `Access-Control-Allow-Origin`-Header
- Browser würde diese Response für `evil-site.com` blocken
- ✅ Pass

**Test 12 — OPTIONS-Preflight**
```bash
curl -i -X OPTIONS https://sandbox.gastro-master.de/contact.php \
    -H "Origin: https://gastro-master.vercel.app" \
    -H "Access-Control-Request-Method: POST"
```
- **Erwartung:** 204 No Content + CORS-Headers (3× ACA-* + Vary)
- ✅ Pass

### Test-Failures → Recovery
- Jeder Fehler → Logs prüfen via FileZilla: `/www/htdocs/w01d17b9/error.log` oder analog
- `error_log()`-Calls im PHP zeigen Resend/PHPMailer/RateLimit-Errors
- Fix lokal → re-commit → re-push → Vercel deployt Preview neu → erneut testen

---

## Task 13: Production Deploy

**Files affected:** keine (Merge + Deploy)

**Steps:**

1. PR auf GitHub erstellen oder direkt mergen:
   ```bash
   git checkout main
   git merge feat/kontakt-form-plan-d --no-ff \
       -m "feat(kontakt): functional contact form via PHP backend on All-Inkl (Plan D, Phase A)"
   git push origin main
   ```

2. Vercel deployt `main` automatisch.

3. Smoke-Test auf Production-URL (https://gastro-master.vercel.app/kontakt):
   - 1× Form-Submit
   - Mail-Empfang verifizieren

4. **Phase A abgeschlossen** — Domain-Cutover auf `gastro-master.de` kann jetzt erfolgen (Phase C).

5. Optional: Branch löschen
   ```bash
   git branch -d feat/kontakt-form-plan-d
   git push origin --delete feat/kontakt-form-plan-d
   ```

---

## Task 14 (Optional, parallel): Memory-Update

Nach Go-Live: Memory-Eintrag `project_kontakt_form_live.md` mit:
- Status LIVE
- Backend-URL (sandbox.gastro-master.de/contact.php)
- All-Inkl-Credentials-Location (1Password? interne Doku?)
- Phase-C-TODOs (DNS-Migration, api-Subdomain, Custom-From)

---

## Notes

- **TDD-Coverage:** ~34 Unit-Tests für Pure Functions (sanitize 6 + buildEmailBody 12 + validate 9 + rateLimit 6 + parseRecipients 7). Integration (SMTP-Send, FTP-Upload) wird manuell verifiziert in Task 11–12.
- **Commits:** 9 Code-Commits (Tasks 1–10) + 1 Merge-Commit (Task 13). Granular für Rollback.
- **PRE-FLIGHT zuerst:** PF-1 (.htaccess-Test) ist HARD-Gate. Wenn nicht grün → alternative Schutz-Strategie nötig.
- **Upload-Reihenfolge in Task 11 unverzichtbar:** Library → data + .htaccess → config.php → contact.php (ZULETZT). Sonst Errors during setup.
- **PHP 8.5 Features verwendet:** `declare(strict_types=1)`, named arguments (PHPMailer-init), `mixed` type, `never` return type, `str_contains()`.
- **Newline-Robustheit:** `/\r?\n/` für Unix (`\n`) und Windows (`\r\n`) — analog zum Resend-Plan.
- **Reihenfolge HTML-Body:** ESCAPE ZUERST, dann `\n` → `<br>`. Sonst `&lt;br&gt;`.
- **DSGVO-Vorteil:** Kein US-Sub-Processor (kein Resend), kein DSE-Update nötig für Phase A.
- **No-Composer-Constraint:** Test-Runner ist pure PHP, kein PHPUnit. CLI-Aufruf: `php php-backend/tests/run.php`.

---

## Phase-C-Roadmap (NICHT heute)

Nach DNS-Migration weg von WordPress (Spec §11):

| # | Schritt | Abhängigkeit |
|---|---------|--------------|
| C1 | DNS-Migration `gastro-master.de` von WordPress auf Vercel | — |
| C2 | Subdomain `api.gastro-master.de` einrichten (CNAME → `w01d17b9.kasserver.com`) | C1 |
| C3 | PHP-Backend an `api.gastro-master.de` umziehen (oder Symlink) | C2 |
| C4 | Vite-Env-Var `VITE_CONTACT_ENDPOINT=https://api.gastro-master.de/contact.php`, Hardcode entfernen | C3 |
| C5 | CORS-Whitelist verkleinern auf `https://gastro-master.de` (exact match), Vercel-Pattern entfernen | C1 |
| C6 | Optional: Bestätigungsmail an Kunden (zweiter PHPMailer-Send) | — |
