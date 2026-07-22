<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return view('about');
});

Route::get('/projects', function () {
    return view('projects');
});

Route::get('/skills', function () {
    return view('skills');
});

Route::get('/experience', function () {
    return view('experience');
});

Route::get('/debug-vite', function () {
    $manifestPath = public_path('build/manifest.json');
    return response()->json([
        'public_path' => public_path(),
        'manifest_exists' => file_exists($manifestPath),
        'manifest_path' => $manifestPath,
        'manifest_content' => file_exists($manifestPath) ? file_get_contents($manifestPath) : null,
        'hot_exists' => file_exists(public_path('hot')),
        'vite_html' => (string) app(\Illuminate\Foundation\Vite::class)(['resources/css/app.css', 'resources/js/app.js'])
    ]);
});

Route::get('/contact', function () {
    return view('contact');
});
Route::post('/contact', [ContactController::class, 'send'])->middleware('throttle:5,1');
