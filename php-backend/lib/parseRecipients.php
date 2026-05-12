<?php
declare(strict_types=1);

/**
 * Parse + validate the recipients list from config.
 * Filters whitespace, empty strings, non-strings, and invalid email formats.
 * Returns empty array on bad input — caller does fail-fast (see contact.php).
 *
 * Returned array is re-indexed (no gaps) for clean iteration in contact.php.
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
