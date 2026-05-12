<?php
declare(strict_types=1);

/**
 * HTML-escape user input to prevent XSS in email body.
 *
 * Uses ENT_QUOTES (escapes both " and ') + UTF-8.
 * NO ENT_HTML5 — that would escape ' to &apos;, which older email clients
 * (Outlook 2003/2007) render as literal text instead of an apostrophe.
 * Default (HTML4.01) escapes ' to &#039; — universally compatible.
 *
 * Critical: this function is called ONCE per field — calling it twice
 * would double-escape (& → &amp; → &amp;amp;). The order in buildEmailBody()
 * is: escape FIRST, then convert \n → <br> (otherwise <br> gets escaped too).
 */
function escapeHtml(?string $input): string {
    if ($input === null) return '';
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}
