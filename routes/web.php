<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FirebaseUserController;

Route::get('/{any}', function () {
    return view('app'); // ← Loads the React app in app.blade.php
})->where('any', '.*');
Route::post('/firebase/update-user', [FirebaseUserController::class, 'updateUser']);
