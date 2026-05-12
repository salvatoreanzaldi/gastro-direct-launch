<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/sanitize.php';

it('escapes ampersand exactly once (no double-escape)', function () {
    assertEquals(
        'Stefano&#039;s Café &amp; Co.',
        escapeHtml("Stefano's Café & Co.")
    );
});

it('escapes angle brackets', function () {
    assertEquals(
        '&lt;script&gt;alert(1)&lt;/script&gt;',
        escapeHtml('<script>alert(1)</script>')
    );
});

it('escapes double quotes', function () {
    assertEquals('say &quot;hi&quot;', escapeHtml('say "hi"'));
});

it('preserves umlauts and emojis (UTF-8 passthrough)', function () {
    assertEquals('Müller 🍕', escapeHtml('Müller 🍕'));
});

it('returns empty string for empty input', function () {
    assertEquals('', escapeHtml(''));
});

it('handles null gracefully', function () {
    assertEquals('', escapeHtml(null));
});
