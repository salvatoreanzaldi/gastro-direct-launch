<?php
declare(strict_types=1);

/**
 * Browser-based test runner.
 *
 * Discovers all *_test.php files in this directory, runs them, and renders
 * an HTML table with pass/fail status + collapsible error details.
 *
 * Usage:
 *   Browser → https://sandbox.gastro-master.de/tests/run.php
 *
 * 🔒 SECURITY:
 *   After smoke-test passes, DELETE the tests/ folder via FileZilla.
 *   See Plan §11.7. tests/run.php is a publicly-callable endpoint that
 *   reveals internal logic and can be triggered by anyone if left online.
 */

require __DIR__ . '/assert.php';

$tests = glob(__DIR__ . '/*_test.php');
$tests = $tests === false ? [] : $tests;

// Run all test files; each registers its tests via it(...).
foreach ($tests as $file) {
    TestRunner::setSuite(basename($file, '.php'));
    require_once $file;
}

$results = TestRunner::getResults();
[$passed, $failed] = TestRunner::summary();
$total = $passed + $failed;
$allGreen = $failed === 0 && $total > 0;

/** Group results by suite for display */
$bySuite = [];
foreach ($results as $r) {
    $bySuite[$r['suite']][] = $r;
}

function escape(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Test Results — <?= $allGreen ? '✅ ALL PASS' : "❌ $failed FAILED" ?></title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         max-width: 1000px; margin: 2rem auto; padding: 0 1rem; color: #0A264A; }
  .banner { padding: 1rem 1.5rem; border-radius: 8px; font-size: 1.2rem; font-weight: bold; }
  .banner.green { background: #ECFDF3; color: #027A48; border: 1px solid #027A48; }
  .banner.red   { background: #FEF3F2; color: #B42318; border: 1px solid #B42318; }
  .banner.warn  { background: #FFFAEB; color: #B54708; border: 1px solid #B54708; }
  .summary { margin: 1rem 0 2rem; color: #475467; font-size: 0.95rem; }
  .suite { margin: 2rem 0; }
  .suite h2 { font-size: 1.1rem; margin: 0 0 0.5rem; padding-bottom: 0.3rem; border-bottom: 1px solid #E4E7EC; }
  table { border-collapse: collapse; width: 100%; }
  td { padding: 8px 12px; border-bottom: 1px solid #F2F4F7; vertical-align: top; }
  td.status { width: 30px; text-align: center; }
  td.name { font-family: 'SF Mono', Menlo, Monaco, monospace; font-size: 0.9rem; }
  tr.fail td.name { color: #B42318; font-weight: 600; }
  pre.error { background: #FEF3F2; color: #B42318; padding: 0.6rem 0.8rem; border-left: 3px solid #B42318;
              white-space: pre-wrap; font-size: 0.85rem; margin: 0.3rem 0 0; border-radius: 0 4px 4px 0; }
  .delete-reminder { background: #FFFAEB; color: #B54708; padding: 1rem; border-radius: 8px;
                      margin-top: 2rem; border: 1px solid #B54708; }
</style>
</head>
<body>

<?php if ($total === 0): ?>
  <div class="banner warn">⚠️ No tests found in <?= escape(__DIR__) ?></div>
<?php elseif ($allGreen): ?>
  <div class="banner green">✅ ALL PASS — <?= $passed ?> / <?= $total ?> tests</div>
<?php else: ?>
  <div class="banner red">❌ <?= $failed ?> FAILED — <?= $passed ?> passed / <?= $total ?> total</div>
<?php endif; ?>

<div class="summary">
  Suite count: <?= count($bySuite) ?>
  · Passed: <?= $passed ?>
  · Failed: <?= $failed ?>
  · Total: <?= $total ?>
</div>

<?php foreach ($bySuite as $suite => $rows): ?>
  <?php
    $suitePassed = count(array_filter($rows, fn($r) => $r['status'] === 'pass'));
    $suiteTotal  = count($rows);
  ?>
  <div class="suite">
    <h2><?= escape($suite) ?> <span style="color:#475467; font-weight:400; font-size:0.9rem;">(<?= $suitePassed ?>/<?= $suiteTotal ?>)</span></h2>
    <table>
      <?php foreach ($rows as $r): ?>
        <tr class="<?= $r['status'] === 'pass' ? 'pass' : 'fail' ?>">
          <td class="status"><?= $r['status'] === 'pass' ? '✅' : '❌' ?></td>
          <td class="name">
            <?= escape($r['name']) ?>
            <?php if (isset($r['error'])): ?>
              <pre class="error"><?= escape($r['error']) ?></pre>
            <?php endif; ?>
          </td>
        </tr>
      <?php endforeach; ?>
    </table>
  </div>
<?php endforeach; ?>

<?php if ($allGreen): ?>
  <div class="delete-reminder">
    🔒 <strong>SECURITY-REMINDER:</strong>
    Alle Tests grün. Jetzt das <code>tests/</code>-Verzeichnis via FileZilla LÖSCHEN (Plan §11.7).
    Sonst kann jeder im Internet diese Test-Suite triggern.
  </div>
<?php endif; ?>

</body>
</html>
