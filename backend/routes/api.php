<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('user')->controller(RegisterController::class)->group(function () {
    Route::post('create', 'store');
});

Route::prefix('auth')->controller(LoginController::class)->group(function () {
    Route::post('login', 'login');
});

Route::group(['middleware' => 'jwt.auth'], function () {

    Route::prefix('dashboard')->controller(DashboardController::class)->group(function () {
        Route::get('finance', 'index'); // GET /api/resumo: Obter o resumo financeiro (total de entradas, saídas e saldo).
    });

    Route::prefix('transaction')->controller(TransactionController::class)->group(function () {
        Route::get('/', 'read'); // GET /api/transacoes

        Route::post('/', 'store'); // POST /api/transacoes

        Route::delete('{transaction}', 'destroy'); // DELETE /api/transacoes/{id}

        Route::get('{transaction}', 'show'); // GET /api/transacoes/{id}

        Route::put('{transaction}', 'update'); // PUT /api/transacoes/{id}
    });
});
