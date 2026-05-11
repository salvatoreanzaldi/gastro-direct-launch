<?php
declare(strict_types=1);

const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

/**
 * Validate the contact form payload.
 *
 * Returns one of three shapes:
 *   - { ok: true, truncatedMessage?: string }                ← happy path
 *   - { ok: false, status: 200, honeypot: true }             ← silent success for bots
 *   - { ok: false, status: 400, error: string }              ← user-visible validation error
 *
 * Pipeline order matters: honeypot check FIRST so bots burn no
 * processing-time on the more expensive validations.
 */
function validateContactForm(array $input): array {
    // 1. Honeypot — silent reject (bot fills "website" field)
    $website = trim((string)($input['website'] ?? ''));
    if ($website !== '') {
        return ['ok' => false, 'status' => 200, 'honeypot' => true];
    }

    // 2. Required fields
    $name    = trim((string)($input['name'] ?? ''));
    $phone   = trim((string)($input['phone'] ?? ''));
    $email   = trim((string)($input['email'] ?? ''));
    $message = trim((string)($input['message'] ?? ''));

    if ($name === '' || $phone === '' || $email === '' || $message === '') {
        return ['ok' => false, 'status' => 400, 'error' => 'Bitte alle Pflichtfelder ausfüllen.'];
    }

    // 3. Email format (simple regex — better than overengineering)
    if (!preg_match(EMAIL_REGEX, $email)) {
        return ['ok' => false, 'status' => 400, 'error' => 'Bitte gültige E-Mail eingeben.'];
    }

    // 4. Datenschutz must be explicitly TRUE (not truthy)
    if (($input['datenschutz'] ?? false) !== true) {
        return ['ok' => false, 'status' => 400, 'error' => 'Bitte Datenschutz akzeptieren.'];
    }

    // 5. Length-Limit: truncate over-long messages (DoS-protection + Resend-quota-safety carried over)
    if (mb_strlen($message) > MAX_MESSAGE_LENGTH) {
        return [
            'ok' => true,
            'truncatedMessage' => mb_substr($message, 0, MAX_MESSAGE_LENGTH) . ' [gekürzt]',
        ];
    }

    return ['ok' => true];
}
