<?php

// Override Laravel cache paths for Vercel's read-only filesystem
$_ENV['APP_CONFIG_CACHE']   = '/tmp/config.php';
$_ENV['APP_EVENTS_CACHE']   = '/tmp/events.php';
$_ENV['APP_PACKAGES_CACHE'] = '/tmp/packages.php';
$_ENV['APP_ROUTES_CACHE']   = '/tmp/routes.php';
$_ENV['APP_SERVICES_CACHE'] = '/tmp/services.php';

require __DIR__ . '/../public/index.php';
