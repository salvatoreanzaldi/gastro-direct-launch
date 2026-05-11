<?php
declare(strict_types=1);

require_once __DIR__ . '/sanitize.php';

/**
 * Build the email Subject line.
 * Conditional: omit parens if restaurant is empty/whitespace.
 * Subject is NOT HTML-escaped (it's a plain-text header — PHPMailer handles
 * MIME-encoding for non-ASCII chars).
 */
function buildEmailSubject(array $form): string {
    $name = (string)($form['name'] ?? '');
    $restaurant = trim((string)($form['restaurant'] ?? ''));
    return $restaurant !== ''
        ? "Neue Kontaktanfrage: {$name} ({$restaurant})"
        : "Neue Kontaktanfrage: {$name}";
}

/**
 * Build the email HTML body.
 *
 * Critical edge-case handling:
 * - ESCAPE FIRST, then \n→<br>. Otherwise the <br> tags themselves get
 *   escaped to &lt;br&gt;.
 * - /\r?\n/ matches both Unix (\n) and Windows (\r\n) line endings.
 * - Empty-fallbacks: restaurant/plz → "—", products empty → "(keine Auswahl)".
 */
function buildEmailBody(array $form): string {
    $name       = escapeHtml((string)($form['name'] ?? ''));
    $restaurant = trim(escapeHtml((string)($form['restaurant'] ?? ''))) ?: '—';
    $plz        = trim(escapeHtml((string)($form['plz'] ?? ''))) ?: '—';
    $phone      = escapeHtml((string)($form['phone'] ?? ''));
    $email      = escapeHtml((string)($form['email'] ?? ''));

    // Critical order: escape FIRST, then convert newlines.
    $messageHtml = preg_replace(
        '/\r?\n/',
        '<br>',
        escapeHtml((string)($form['message'] ?? ''))
    );

    $products = $form['products'] ?? [];
    $productsHtml = is_array($products) && !empty($products)
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
