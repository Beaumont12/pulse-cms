<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // ← Loads the React app in app.blade.php
})->where('any', '.*');
