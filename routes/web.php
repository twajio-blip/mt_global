<?php

use App\Http\Controllers\Candidate\CandidateCvController;
use App\Http\Controllers\Portal\ApplicationCvController;
use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\JobController;
use App\Http\Controllers\Portal\SetupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\PublicJobController;
use Illuminate\Support\Facades\Route;

// Public Candidate Flow
Route::get('/', [PublicJobController::class, 'index'])->name('home');
Route::get('/jobs', [PublicJobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}', [PublicJobController::class, 'show'])->name('jobs.show');
Route::post('/jobs/{job}/apply', [PublicJobController::class, 'apply'])->name('jobs.apply');

// Candidate Manpower CV
Route::middleware(['auth'])->group(function () {
    Route::get('/my-cv', [CandidateCvController::class, 'show'])->name('candidate.cv.show');
    Route::post('/my-cv', [CandidateCvController::class, 'update'])->name('candidate.cv.update');
});

// Portal / Admin Flow
Route::prefix('portal')->name('portal.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('root');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Dual-System: Applications / CVs Module
    Route::get('/applications', [ApplicationCvController::class, 'index'])->name('applications.index');
    Route::patch('/applications/{application}/status', [ApplicationCvController::class, 'updateApplicationStatus'])->name('applications.status');
    Route::get('/cvs/{cvProfile}/edit', [ApplicationCvController::class, 'editCv'])->name('cvs.edit');
    Route::post('/cvs/{cvProfile}', [ApplicationCvController::class, 'updateCv'])->name('cvs.update');
    Route::get('/cvs/{cvProfile}/export', [ApplicationCvController::class, 'exportCv'])->name('cvs.export');

    // Job Creation Engine
    Route::resource('jobs', JobController::class)->except(['show']);
    Route::patch('/jobs/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status');

    // Setup Modules
    Route::get('/setup/countries', [SetupController::class, 'countries'])->name('setup.countries');
    Route::post('/setup/countries', [SetupController::class, 'storeCountry'])->name('setup.countries.store');
    Route::put('/setup/countries/{country}', [SetupController::class, 'updateCountry'])->name('setup.countries.update');
    Route::patch('/setup/countries/{country}/toggle', [SetupController::class, 'toggleCountry'])->name('setup.countries.toggle');

    Route::get('/setup/designations', [SetupController::class, 'designations'])->name('setup.designations');
    Route::post('/setup/designations', [SetupController::class, 'storeDesignation'])->name('setup.designations.store');
    Route::put('/setup/designations/{designation}', [SetupController::class, 'updateDesignation'])->name('setup.designations.update');
    Route::patch('/setup/designations/{designation}/toggle', [SetupController::class, 'toggleDesignation'])->name('setup.designations.toggle');
});

// Auth & Breeze Routes
Route::redirect('/dashboard', '/portal/dashboard')->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
