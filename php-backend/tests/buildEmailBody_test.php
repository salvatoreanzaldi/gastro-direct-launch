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

// ── buildEmailSubject ────────────────────────────────────────────────────

it('subject: includes restaurant in parens when present', function () use ($baseForm) {
    assertEquals(
        "Neue Kontaktanfrage: Max Mustermann (Stefano's Café & Co.)",
        buildEmailSubject($baseForm)
    );
});

it('subject: omits parens when restaurant is empty', function () use ($baseForm) {
    $form = ['restaurant' => ''] + $baseForm;
    assertEquals('Neue Kontaktanfrage: Max Mustermann', buildEmailSubject($form));
});

it('subject: omits parens when restaurant is whitespace-only', function () use ($baseForm) {
    $form = ['restaurant' => '   '] + $baseForm;
    assertEquals('Neue Kontaktanfrage: Max Mustermann', buildEmailSubject($form));
});

// ── buildEmailBody ───────────────────────────────────────────────────────

it('body: escapes ampersand in restaurant exactly once', function () use ($baseForm) {
    $html = buildEmailBody($baseForm);
    assertContains('Stefano&#039;s Café &amp; Co.', $html);
    assertNotContains('&amp;amp;', $html);
});

it('body: converts \n to <br> in message', function () use ($baseForm) {
    $html = buildEmailBody($baseForm);
    assertContains('Hallo,<br><br>ich brauche Beratung.<br>Grüße', $html);
});

it('body: converts CRLF (\r\n) to <br> for cross-platform safety', function () use ($baseForm) {
    $form = ['message' => "line1\r\nline2"] + $baseForm;
    $html = buildEmailBody($form);
    assertContains('line1<br>line2', $html);
    assertNotContains("\r", $html);
});

it('body: does NOT produce &lt;br&gt; (escape BEFORE \n→<br>)', function () use ($baseForm) {
    $html = buildEmailBody($baseForm);
    assertNotContains('&lt;br&gt;', $html);
});

it('body: shows "—" for empty restaurant in table', function () use ($baseForm) {
    $form = ['restaurant' => ''] + $baseForm;
    $html = buildEmailBody($form);
    assertMatches('#<strong>Restaurant:</strong></td><td[^>]*>—#', $html);
});

it('body: shows "—" for empty plz in table', function () use ($baseForm) {
    $form = ['plz' => ''] + $baseForm;
    $html = buildEmailBody($form);
    assertMatches('#<strong>PLZ:</strong></td><td[^>]*>—#', $html);
});

it('body: shows "(keine Auswahl)" when products array is empty', function () use ($baseForm) {
    $form = ['products' => []] + $baseForm;
    $html = buildEmailBody($form);
    assertContains('(keine Auswahl)', $html);
});

it('body: includes all form fields', function () use ($baseForm) {
    $html = buildEmailBody($baseForm);
    assertContains('Max Mustermann', $html);
    assertContains('61250', $html);
    assertContains('+49 123 456', $html);
    assertContains('max@example.com', $html);
    assertContains('Webshop, Kassensystem', $html);
});

it('body: includes ISO timestamp', function () use ($baseForm) {
    $html = buildEmailBody($baseForm);
    assertMatches('#\d{4}-\d{2}-\d{2}T\d{2}:\d{2}#', $html);
});
