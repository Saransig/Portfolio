<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\LocationController;


//Rutas principales
Route::get('/characters', [CharacterController::class, 'index'])->name('characters.index');
Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');

Route::get('/', function () {
     return view('home');
})->name('home');


