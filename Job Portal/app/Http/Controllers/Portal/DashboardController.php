<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\CvProfile;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $totalJobs = Job::count();
        $activeJobs = Job::where('status', 'Published')->count();
        $inactiveJobs = Job::where('status', 'Inactive')->count();
        $totalVacancies = (int) Job::where('status', 'Published')->sum('vacancy');

        $totalApplications = JobApplication::count();
        $recentApplicationsCount = JobApplication::where('created_at', '>=', Carbon::now()->subDays(7))->count();
        $totalCvProfiles = CvProfile::count();
        $jobsWithApplicationsCount = JobApplication::distinct('job_id')->count('job_id');
        $totalCountries = Country::where('is_active', true)->count();
        $totalDesignations = Designation::where('is_active', true)->count();

        // Recent 7 Real CV Submissions from Database
        $recentApplications = JobApplication::with(['job.country'])
            ->orderBy('created_at', 'desc')
            ->take(7)
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'full_name' => $app->full_name,
                    'job_title' => $app->job?->title_en ?? 'Position',
                    'job_code' => $app->job?->job_code ?? '',
                    'country' => $app->job?->country?->name ?? '',
                    'country_code' => $app->job?->country?->code ?? '',
                    'status' => $app->status ?? 'Submitted',
                    'submitted_at' => $app->created_at?->toISOString() ?? Carbon::now()->toISOString(),
                    'relative_time' => $app->created_at?->diffForHumans() ?? 'Recently',
                ];
            });

        // Recent 6 Real Job Posts from Database with dynamic live application counts
        $recentJobs = Job::with(['country'])
            ->withCount('applications')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title_en,
                    'job_code' => $job->job_code,
                    'country' => $job->country?->name ?? '',
                    'country_code' => $job->country?->code ?? '',
                    'status' => $job->status,
                    'vacancy' => $job->vacancy,
                    'applications_count' => $job->applications_count,
                    'created_at' => $job->created_at?->toISOString() ?? Carbon::now()->toISOString(),
                ];
            });

        $maxApplications = max(1, $recentJobs->max('applications_count') ?? 1);

        return Inertia::render('Portal/Dashboard', [
            'stats' => [
                'active_jobs' => $activeJobs,
                'total_vacancies' => $totalVacancies,
                'total_jobs' => $totalJobs,
                'inactive_jobs' => $inactiveJobs,
                'total_applications' => $totalApplications,
                'jobs_with_applications' => $jobsWithApplicationsCount,
                'recent_applications' => $recentApplicationsCount,
                'total_cv_profiles' => $totalCvProfiles,
                'total_countries' => $totalCountries,
                'total_designations' => $totalDesignations,
            ],
            'recentApplications' => $recentApplications,
            'recentJobs' => $recentJobs,
            'maxApplications' => $maxApplications,
        ]);
    }
}

