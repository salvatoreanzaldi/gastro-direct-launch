<?php
declare(strict_types=1);

/**
 * Test runner — discovers all *_test.php files in this directory and runs them.
 * Exit code: 0 on full pass, 1 if any test failed.
 *
 * Usage:
 *   php php-backend/tests/run.php
 */

require __DIR__ . '/assert.php';

$tests = glob(__DIR__ . '/*_test.php');
if ($tests === false || count($tests) === 0) {
    echo "No tests found in " . __DIR__ . "\n";
    exit(0);
}

foreach ($tests as $file) {
    echo "\n📋 " . basename($file) . "\n";
    require_once $file;
}

[$pass, $fail] = TestRunner::summary();
$total = $pass + $fail;

echo "\n═══ TEST SUMMARY ═══\n";
echo "Passed: $pass / $total\n";
echo "Failed: $fail\n";

exit($fail > 0 ? 1 : 0);
