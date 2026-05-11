<?php
declare(strict_types=1);

/**
 * Kontaktformular Backend — Plan D Phase A.
 *
 * Endpoint: POST https://sandbox.gastro-master.de/contact.php
 * Spec:     docs/superpowers/specs/2026-05-11-kontaktformular-plan-d.md
 * Plan:     docs/superpowers/plans/2026-05-11-kontaktformular-plan-d-implementation.md
 *
 * Pipeline (Cowork-R1-approved order):
 *   1. CORS + OPTIONS preflight
 *   2. Method-check (POST only)
 *   3. JSON-parse
 *   4. Honeypot (silent 200 — BEFORE rate-limit, so bots burn no quota)
 *   5. Rate-limit (file-based, fail-open)
 *   6. Validate (required, email-regex, datenschutz, length-limit-truncation)
 *   7. Apply truncated message if needed
 *   8. PHPMailer + SMTP (port 465, ENCRYPTION_SMTPS)
 *   9. JSON response
 */

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

/** Helper: send JSON response and exit. */
function jsonResponse(int $status, array $payload): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// Load config — fail-fast if missing (shouldn't happen after Task 11.4)
if (!file_exists(__DIR__ . '/config.php')) {
    error_log('[api/contact] config.php missing on server');
    jsonResponse(500, [
        'error' => 'Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.',
    ]);
}
$config = require __DIR__ . '/config.php';

// ── 1. CORS-Check + OPTIONS-Preflight ─────────────────────────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && preg_match($config['cors']['origin_pattern'], $origin)) {
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
$form = json_decode($raw !== false ? $raw : '', true);
if (!is_array($form)) {
    jsonResponse(400, ['error' => 'Ungültige Anfrage.']);
}

// ── 4. Honeypot-Check (silent fail) ───────────────────────────────────────
// BEFORE rate-limit: bots burn no quota → more headroom for real users
if (trim((string)($form['website'] ?? '')) !== '') {
    jsonResponse(200, ['success' => true]);  // silent success — bot learns nothing
}

// ── 5. Rate-Limit (REMOTE_ADDR only — X-Forwarded-For is spoofable on shared hosting) ─
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rl = checkRateLimit($ip, $config['rate_limit']);
if (!$rl['allowed']) {
    jsonResponse(429, ['error' => 'Zu viele Anfragen. Bitte später erneut versuchen.']);
}

// ── 6. Validate ───────────────────────────────────────────────────────────
$validation = validateContactForm($form);
if (!($validation['ok'] ?? false)) {
    // Honeypot would have been caught in step 4; here only user-visible errors
    jsonResponse(
        $validation['status'] ?? 400,
        ['error' => $validation['error'] ?? 'Ungültige Anfrage.']
    );
}

// ── 7. Apply truncated message if length-limit triggered ──────────────────
if (isset($validation['truncatedMessage'])) {
    $form['message'] = $validation['truncatedMessage'];
}

// ── 8. PHPMailer + SMTP Send ──────────────────────────────────────────────
$recipients = parseRecipients($config['recipients'] ?? null);
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
    $mail->Port       = (int)$config['smtp']['port'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // port 465 → 'ssl', NOT 'tls'
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp']['username'];
    $mail->Password   = $config['smtp']['password'];
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;
    $mail->Encoding   = PHPMailer::ENCODING_QUOTED_PRINTABLE;  // standard for HTML+UTF-8

    $mail->setFrom(
        $config['smtp']['from'][0],
        $config['smtp']['from'][1]
    );

    foreach ($recipients as $addr) {
        $mail->addAddress($addr);
    }

    // Reply-To = customer's email → "Reply" in mail-client goes straight to lead
    $mail->addReplyTo((string)$form['email']);

    $mail->isHTML(true);
    $mail->Subject = buildEmailSubject($form);
    $mail->Body    = buildEmailBody($form);

    $mail->send();

    jsonResponse(200, ['success' => true]);

} catch (Exception $e) {
    // PHPMailer-specific errors (SMTP-connect failed, auth failed, etc.)
    error_log('[api/contact] PHPMailer error: ' . $e->getMessage());
    jsonResponse(500, [
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte direkt an info@gastro-master.de mailen.',
    ]);
} catch (\Throwable $e) {
    // Anything else — never leak details to the user
    error_log('[api/contact] Unexpected error: ' . $e->getMessage());
    jsonResponse(500, [
        'error' => 'Ein unerwarteter Fehler ist aufgetreten. Bitte direkt an info@gastro-master.de mailen.',
    ]);
}
