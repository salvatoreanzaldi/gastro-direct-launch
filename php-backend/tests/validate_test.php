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

it('accepts valid form', function () use ($validForm) {
    $r = validateContactForm($validForm);
    assertTrue($r['ok']);
    assertFalse(isset($r['truncatedMessage']));
});

it('flags honeypot when website filled (silent 200)', function () use ($validForm) {
    $r = validateContactForm(['website' => 'spam-bot.com'] + $validForm);
    assertFalse($r['ok']);
    assertEquals(200, $r['status']);
    assertTrue($r['honeypot'] ?? false);
});

it('rejects missing name', function () use ($validForm) {
    $r = validateContactForm(['name' => ''] + $validForm);
    assertFalse($r['ok']);
    assertEquals(400, $r['status']);
    assertEquals('Bitte alle Pflichtfelder ausfüllen.', $r['error']);
});

it('rejects missing phone', function () use ($validForm) {
    $r = validateContactForm(['phone' => ''] + $validForm);
    assertFalse($r['ok']);
});

it('rejects missing message', function () use ($validForm) {
    $r = validateContactForm(['message' => ''] + $validForm);
    assertFalse($r['ok']);
});

it('rejects datenschutz=false', function () use ($validForm) {
    $r = validateContactForm(['datenschutz' => false] + $validForm);
    assertFalse($r['ok']);
    assertEquals('Bitte Datenschutz akzeptieren.', $r['error']);
});

it('rejects invalid email format', function () use ($validForm) {
    $r = validateContactForm(['email' => 'not-an-email'] + $validForm);
    assertFalse($r['ok']);
    assertEquals('Bitte gültige E-Mail eingeben.', $r['error']);
});

it('truncates message > MAX_MESSAGE_LENGTH', function () use ($validForm) {
    $long = str_repeat('a', MAX_MESSAGE_LENGTH + 100);
    $r = validateContactForm(['message' => $long] + $validForm);
    assertTrue($r['ok']);
    assertTrue(isset($r['truncatedMessage']));
    assertContains('[gekürzt]', $r['truncatedMessage']);
});

it('does not truncate message at exactly MAX_MESSAGE_LENGTH', function () use ($validForm) {
    $exact = str_repeat('a', MAX_MESSAGE_LENGTH);
    $r = validateContactForm(['message' => $exact] + $validForm);
    assertTrue($r['ok']);
    assertFalse(isset($r['truncatedMessage']));
});
