<?php
declare(strict_types=1);

/**
 * HTML-escape user input to prevent XSS in email body.
 *
 * Uses ENT_QUOTES (escapes both " and ') + ENT_HTML5 ('  → &#039;) + UTF-8.
 *
 * Critical: this function is called ONCE per field — calling it twice
 * would double-escape (& → &amp; → &amp;amp;). The order in buildEmailBody()
 * is: escape FIRST, then convert \n → <br> (otherwise <br> gets escaped too).
 */
function escapeHtml(?string $input): string {
    if ($input === null) return '';
    return htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}
