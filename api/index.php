<?php

// Override Laravel cache paths for Vercel's read-only filesystem
$_ENV['APP_CONFIG_CACHE']   = '/tmp/config.php';
$_ENV['APP_EVENTS_CACHE']   = '/tmp/events.php';
$_ENV['APP_PACKAGES_CACHE'] = '/tmp/packages.php';
$_ENV['APP_ROUTES_CACHE']   = '/tmp/routes.php';
$_ENV['APP_SERVICES_CACHE'] = '/tmp/services.php';

// Generate a unique view cache path per Lambda cold-start to prevent stale view caching across deployments
$viewPath = '/tmp/views_' . substr(md5(uniqid('', true)), 0, 8);
if (!is_dir($viewPath)) {
    mkdir($viewPath, 0777, true);
}
$_ENV['VIEW_COMPILED_PATH'] = $viewPath;


require __DIR__ . '/../public/index.php';
