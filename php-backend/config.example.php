<?php
/**
 * Template for config.php — copy to config.php and fill in real values.
 *
 * config.php is gitignored (see .gitignore: php-backend/config.php).
 * Upload config.php manually via FileZilla with permissions 0600.
 *
 * If config.php upload fails with 500-error after upload, escalate permissions:
 *   0600 (default) → 0640 (group read) → 0644 (world read — breakglass only)
 * See Plan §11.4.
 */

return [
    'smtp' => [
        'host'     => 'w01d17b9.kasserver.com',
        'port'     => 465,
        'username' => 'hallo@gastro-master.de',
        'password' => 'CHANGE_ME',  // SMTP-Passwort der hallo@-Mailbox (aus All-Inkl KAS-Panel)
        'from'     => ['hallo@gastro-master.de', 'Gastro Master Kontakt'],
    ],

    'recipients' => [
        'info@gastro-master.de',
        'rene.ebert@gastro-master.de',
        'sanjaya.p@gastro-master.de',
        's.anzaldi@gastro-master.de',
    ],

    'cors' => [
        // Vercel project name is "gastro-master" (NOT the repo "gastro-direct-launch").
        // Matches gastro-master.vercel.app + git-branch + commit-specific preview URLs.
        'origin_pattern' => '#^https://gastro-master(-[a-z0-9-]+)?\.vercel\.app$#',
        // Phase C: add exact-match for 'https://gastro-master.de' after DNS migration
    ],

    'rate_limit' => [
        'max_per_hour'   => 5,
        'window_seconds' => 3600,
        'data_dir'       => __DIR__ . '/data/rate-limits/',
    ],
];
