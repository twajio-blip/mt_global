<?php

use App\Http\Controllers\Public\PublicJobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public REST API Routes for External Website Builder
|--------------------------------------------------------------------------
|
| Reuses PublicJobController: returns JSON for API calls while preserving
| Inertia responses for web pages.
|
*/

Route::prefix('v1')->group(function () {
    Route::get('/jobs', [PublicJobController::class, 'index'])->name('api.v1.jobs.index');
    Route::get('/jobs/{job}', [PublicJobController::class, 'show'])->name('api.v1.jobs.show');
    Route::post('/jobs/{job}/apply', [PublicJobController::class, 'apply'])->name('api.v1.jobs.apply');
    Route::get('/countries', [PublicJobController::class, 'countries'])->name('api.v1.countries');
    Route::get('/designations', [PublicJobController::class, 'designations'])->name('api.v1.designations');
});
