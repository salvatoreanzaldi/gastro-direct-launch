<?php
declare(strict_types=1);

/**
 * Minimal assertion helpers for the kontakt-form PHP backend.
 * No Composer, no PHPUnit — just plain assert + a tiny runner.
 *
 * Usage in *_test.php files:
 *   it('describes what is being tested', function () {
 *       assertEquals('expected', $actual);
 *   });
 *
 * Run via:
 *   php php-backend/tests/run.php
 */

final class TestRunner {
    private static int $passed = 0;
    private static int $failed = 0;

    public static function test(string $name, callable $fn): void {
        try {
            $fn();
            self::$passed++;
            echo "  ✅ $name\n";
        } catch (\AssertionError $e) {
            self::$failed++;
            echo "  ❌ $name\n";
            echo "     " . str_replace("\n", "\n     ", $e->getMessage()) . "\n";
        } catch (\Throwable $e) {
            self::$failed++;
            echo "  ❌ $name (UNCAUGHT " . $e::class . ")\n";
            echo "     " . $e->getMessage() . "\n";
            echo "     at " . $e->getFile() . ":" . $e->getLine() . "\n";
        }
    }

    public static function summary(): array {
        return [self::$passed, self::$failed];
    }
}

function it(string $name, callable $fn): void {
    TestRunner::test($name, $fn);
}

function assertEquals(mixed $expected, mixed $actual, string $msg = ''): void {
    if ($expected !== $actual) {
        throw new \AssertionError(
            ($msg ? "$msg\n" : '') .
            "    Expected: " . var_export($expected, true) . "\n" .
            "    Actual:   " . var_export($actual, true)
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
            "    Needle:   $needle\n" .
            "    Haystack: $haystack"
        );
    }
}

function assertNotContains(string $needle, string $haystack, string $msg = ''): void {
    if (str_contains($haystack, $needle)) {
        throw new \AssertionError(
            ($msg !== '' ? $msg : 'String unexpectedly found') . "\n" .
            "    Needle:   $needle\n" .
            "    Haystack: $haystack"
        );
    }
}

function assertMatches(string $pattern, string $value, string $msg = ''): void {
    if (preg_match($pattern, $value) === 0) {
        throw new \AssertionError(
            ($msg !== '' ? $msg : 'Pattern did not match') . "\n" .
            "    Pattern: $pattern\n" .
            "    Value:   $value"
        );
    }
}
