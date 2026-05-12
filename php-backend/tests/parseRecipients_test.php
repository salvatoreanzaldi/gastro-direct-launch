<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/parseRecipients.php';

it('accepts valid list', function () {
    assertEquals(
        ['a@x.de', 'b@x.de', 'c@x.de'],
        parseRecipients(['a@x.de', 'b@x.de', 'c@x.de'])
    );
});

it('trims whitespace around addresses', function () {
    assertEquals(
        ['a@x.de', 'b@x.de'],
        parseRecipients([' a@x.de ', "\tb@x.de\n"])
    );
});

it('filters empty entries', function () {
    assertEquals(
        ['a@x.de'],
        parseRecipients(['a@x.de', '', '  '])
    );
});

it('filters invalid email addresses (no @)', function () {
    assertEquals(
        ['a@x.de', 'b@x.de'],
        parseRecipients(['a@x.de', 'not-an-email', 'b@x.de'])
    );
});

it('returns empty array for empty input', function () {
    assertEquals([], parseRecipients([]));
});

it('returns empty array for null/non-array input', function () {
    assertEquals([], parseRecipients(null));
    assertEquals([], parseRecipients('string-not-array'));
    assertEquals([], parseRecipients(42));
});

it('preserves multi-recipient ordering', function () {
    $r = parseRecipients(['info@x.de', 'rene@x.de', 'sanjaya@x.de', 'salva@x.de']);
    assertEquals('info@x.de', $r[0]);
    assertEquals('salva@x.de', $r[3]);
});
