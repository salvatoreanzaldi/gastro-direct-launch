<?php
declare(strict_types=1);

/**
 * Minimal assertion helpers for the kontakt-form PHP backend.
 * No Composer, no PHPUnit — collects results for the browser-based runner.
 *
 * Usage in *_test.php files:
 *   it('describes what is being tested', function () {
 *       assertEquals('expected', $actual);
 *   });
 *
 * Run via browser:
 *   https://sandbox.gastro-master.de/tests/run.php
 *
 * 🔒 SECURITY: After successful smoke-test, DELETE the tests/ folder
 *    from the server via FileZilla (Plan §11.7).
 */

/**
 * Test result accumulator. Each test() call appends a structured entry.
 * The runner (run.php) reads getResults() and renders HTML.
 */
final class TestRunner {
    /** @var array<int, array{name: string, suite: string, status: 'pass'|'fail'|'error', error?: string}> */
    private static array $results = [];
    private static string $currentSuite = '';

    public static function setSuite(string $suite): void {
        self::$currentSuite = $suite;
    }

    public static function test(string $name, callable $fn): void {
        try {
            $fn();
            self::$results[] = [
                'name' => $name,
                'suite' => self::$currentSuite,
                'status' => 'pass',
            ];
        } catch (\AssertionError $e) {
            self::$results[] = [
                'name' => $name,
                'suite' => self::$currentSuite,
                'status' => 'fail',
                'error' => $e->getMessage(),
            ];
        } catch (\Throwable $e) {
            self::$results[] = [
                'name' => $name,
                'suite' => self::$currentSuite,
                'status' => 'error',
                'error' => $e::class . ': ' . $e->getMessage()
                    . "\n   at " . $e->getFile() . ':' . $e->getLine(),
            ];
        }
    }

    /** @return array<int, array{name: string, suite: string, status: string, error?: string}> */
    public static function getResults(): array {
        return self::$results;
    }

    /** @return array{0: int, 1: int} [passed, failed] */
    public static function summary(): array {
        $passed = 0;
        $failed = 0;
        foreach (self::$results as $r) {
            if ($r['status'] === 'pass') $passed++;
            else $failed++;
        }
        return [$passed, $failed];
    }
}

function it(string $name, callable $fn): void {
    TestRunner::test($name, $fn);
}

function assertEquals(mixed $expected, mixed $actual, string $msg = ''): void {
    if ($expected !== $actual) {
        throw new \AssertionError(
            ($msg !== '' ? "$msg\n" : '') .
            "Expected: " . var_export($expected, true) . "\n" .
            "Actual:   " . var_export($actual, true)
        );
    }
}

function assertTrue(bool $value, string $msg = ''): void {
    if (!$value) {
        throw new \AssertionError($msg !== '' ? $msg : 'Expected true, got false');
    }
}

function assertFalse(bool $value, string $msg = ''): void {
    if ($value) {
        throw new \AssertionError($msg !== '' ? $msg : 'Expected false, got true');
    }
}

function assertContains(string $needle, string $haystack, string $msg = ''): void {
    if (!str_contains($haystack, $needle)) {
        throw new \AssertionError(
            ($msg !== '' ? $msg : 'String not found') . "\n" .
            "Needle:   $needle\n" .
            "Haystack: " . (strlen($haystack) > 300 ? substr($haystack, 0, 300) . '…' : $haystack)
        );
    }
}

function assertNotContains(string $needle, string $haystack, string $msg = ''): void {
    if (str_contains($haystack, $needle)) {
        throw new \AssertionError(
            ($msg !== '' ? $msg : 'String unexpectedly found') . "\n" .
            "Needle:   $needle\n" .
            "Haystack: " . (strlen($haystack) > 300 ? substr($haystack, 0, 300) . '…' : $haystack)
        );
    }
}

function assertMatches(string $pattern, string $value, string $msg = ''): void {
    if (preg_match($pattern, $value) === 0) {
        throw new \AssertionError(
            ($msg !== '' ? $msg : 'Pattern did not match') . "\n" .
            "Pattern: $pattern\n" .
            "Value:   " . (strlen($value) > 300 ? substr($value, 0, 300) . '…' : $value)
        );
    }
}
