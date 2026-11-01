<?php

use App\Http\Controllers\Auth\SsoController;
use App\Http\Controllers\Public\PublicJobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| REST API Routes for External Website Builder (Protected with API Key / Token)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Public Authentication Endpoint
    Route::post('/auth/login', [PublicJobController::class, 'login'])->name('api.v1.auth.login');

    // Protected API Endpoints (Requires X-API-KEY or Bearer Token)
    Route::middleware(['api.key'])->group(function () {
        // Admin Single Sign-On URL generation for Website Builder
        Route::post('/sso/token', [SsoController::class, 'generateToken'])->name('api.v1.sso.token');
        Route::post('/sso/generate-url', [SsoController::class, 'generateToken'])->name('api.v1.sso.generate-url');

        // Job Engine
        Route::get('/jobs', [PublicJobController::class, 'index'])->name('api.v1.jobs.index');
        Route::get('/jobs/{job}', [PublicJobController::class, 'show'])->name('api.v1.jobs.show');
        Route::post('/jobs/{job}/apply', [PublicJobController::class, 'apply'])->name('api.v1.jobs.apply');
        Route::get('/countries', [PublicJobController::class, 'countries'])->name('api.v1.countries');
        Route::get('/designations', [PublicJobController::class, 'designations'])->name('api.v1.designations');
        Route::get('/company', [PublicJobController::class, 'company'])->name('api.v1.company');
    });
});
