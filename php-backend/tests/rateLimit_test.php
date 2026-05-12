<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/rateLimit.php';

/**
 * rateLimit tests — each test gets a fresh tmp-dir via $clean().
 * Tests use max_per_hour=3 (instead of production-5) for faster failure-mode tests.
 */
$tmpDir = sys_get_temp_dir() . '/gm-rl-test-' . uniqid();
@mkdir($tmpDir, 0755, true);

$cfg = [
    'max_per_hour' => 3,
    'window_seconds' => 3600,
    'data_dir' => $tmpDir . '/',
];

$clean = function () use ($tmpDir): void {
    foreach (glob($tmpDir . '/*') ?: [] as $f) @unlink($f);
};

it('first request: allowed, count=1, remaining=2', function () use ($cfg, $clean) {
    $clean();
    $r = checkRateLimit('1.2.3.4', $cfg);
    assertTrue($r['allowed']);
    assertEquals(2, $r['remaining']);
});

it('within limit: still allowed, decrementing remaining', function () use ($cfg, $clean) {
    $clean();
    checkRateLimit('1.2.3.4', $cfg);  // 1
    checkRateLimit('1.2.3.4', $cfg);  // 2
    $r = checkRateLimit('1.2.3.4', $cfg);  // 3 → at limit
    assertTrue($r['allowed']);
    assertEquals(0, $r['remaining']);
});

it('over limit: blocked', function () use ($cfg, $clean) {
    $clean();
    for ($i = 0; $i < 3; $i++) {
        checkRateLimit('1.2.3.4', $cfg);
    }
    $r = checkRateLimit('1.2.3.4', $cfg);  // 4th → over limit
    assertFalse($r['allowed']);
});

it('different IPs: independent counters', function () use ($cfg, $clean) {
    $clean();
    checkRateLimit('1.2.3.4', $cfg);
    checkRateLimit('1.2.3.4', $cfg);
    $r = checkRateLimit('5.6.7.8', $cfg);  // fresh IP
    assertTrue($r['allowed']);
    assertEquals(2, $r['remaining']);
});

it('uses sha256 of IP (no cleartext IP on disk)', function () use ($cfg, $clean) {
    $clean();
    checkRateLimit('1.2.3.4', $cfg);
    $files = glob($cfg['data_dir'] . '*.json') ?: [];
    assertEquals(1, count($files));
    assertNotContains('1.2.3.4', $files[0]);
    assertMatches('#/[a-f0-9]{64}\.json$#', $files[0]);
});

it('fail-open on unwritable dir', function () {
    $r = checkRateLimit('1.2.3.4', [
        'max_per_hour' => 3,
        'window_seconds' => 3600,
        'data_dir' => '/nonexistent-path-that-cannot-exist-' . uniqid() . '/',
    ]);
    assertTrue($r['allowed']);     // FAIL-OPEN
    assertEquals(-1, $r['remaining']);
});

// Teardown
register_shutdown_function(function () use ($tmpDir, $clean): void {
    $clean();
    @rmdir($tmpDir);
});
