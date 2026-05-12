<?php
declare(strict_types=1);

/**
 * IP-based rate-limit via filesystem.
 *
 * Key: sha256 of IP (no cleartext IP on disk → DSGVO-friendly + non-guessable filenames).
 * Format: { count: int, resetAt: unix-ts }
 * Failure-mode: FAIL-OPEN on FS-error (lead-loss is worse than spam-risk).
 *
 * Concurrency note: LOCK_EX makes the write atomic, but NOT the
 * read-modify-write sequence. For sub-second concurrent requests,
 * theoretical counter-drift is possible (one request "lost" in the counter).
 * Negligible for lead-form traffic (~1 submit/min). See Spec §8.
 */
function checkRateLimit(string $ip, array $config): array {
    $hash   = hash('sha256', $ip);
    $path   = rtrim($config['data_dir'], '/') . '/' . $hash . '.json';
    $now    = time();
    $max    = (int)$config['max_per_hour'];
    $window = (int)$config['window_seconds'];

    try {
        if (!is_dir(dirname($path))) {
            throw new \RuntimeException('rate-limit dir missing: ' . dirname($path));
        }

        $data = null;
        if (file_exists($path)) {
            $raw  = file_get_contents($path);
            $data = $raw !== false ? json_decode($raw, true) : null;
        }

        if (!is_array($data) || ($data['resetAt'] ?? 0) < $now) {
            // Fresh window
            $data = ['count' => 1, 'resetAt' => $now + $window];
        } else {
            $data['count']++;
        }

        $written = file_put_contents($path, json_encode($data), LOCK_EX);
        if ($written === false) {
            throw new \RuntimeException("rate-limit write failed: $path");
        }

        return [
            'allowed'   => $data['count'] <= $max,
            'remaining' => max(0, $max - $data['count']),
        ];
    } catch (\Throwable $e) {
        // FAIL-OPEN: never block a lead because of an FS hiccup
        error_log('[rateLimit] FS-error, failing open: ' . $e->getMessage());
        return ['allowed' => true, 'remaining' => -1];
    }
}
