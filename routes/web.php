<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClusterController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(["middleware" => "guest"], function () {

    Route::redirect('/', '/login');
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'loginStore']);
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'registerStore']);

    Route::get('/scheduling/RmorJ4WDEIdnoyL9SPRuJ64dJkCr8JSS', [CurrentTemperatureController::class, 'checker']);
});

Route::group(["middleware" => "auth"], function () {

    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('/', [DashboardController::class, 'dashboard'])->name('user.dashboard');
    });

    Route::resource('/cluster', ClusterController::class);
    Route::group(['prefix' => '/cluster'], function () {
        Route::resource('{cluster}/device', DeviceController::class);
        Route::get('{cluster}/monitor', [DashboardController::class, 'monitor']);
    });

    /* ===Start Admin Field */
    Route::group(["middleware" => "admin", "prefix" => "admin"], function () {
        Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    });
    /* Stop Admin Field=== */

    // Logout
    Route::post('/logout', [AuthController::class, 'destroy']);
});
