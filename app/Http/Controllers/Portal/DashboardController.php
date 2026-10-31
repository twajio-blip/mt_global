<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\CvProfile;
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
        $draftJobs = Job::where('status', 'Draft')->count();
        $inactiveJobs = Job::where('status', 'Inactive')->count();
        $totalVacancies = Job::where('status', 'Published')->sum('vacancy') ?: 0;

        $totalApplications = JobApplication::count();
        $recentApplicationsCount = JobApplication::where('created_at', '>=', Carbon::now()->subDays(7))->count();
        $totalCvProfiles = CvProfile::count();
        $jobsWithApplicationsCount = JobApplication::distinct('job_id')->count('job_id');

        // Recent 7 CV Submissions
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
                    'status' => $app->status,
                    'submitted_at' => $app->created_at?->diffForHumans() ?? 'Recently',
                ];
            });

        // Recent 6 Job Posts with Application Progress
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
                    'status' => $job->status,
                    'vacancy' => $job->vacancy,
                    'applications_count' => $job->applications_count,
                ];
            });

        $maxApplications = max(1, $recentJobs->max('applications_count') ?? 1);

        return Inertia::render('Portal/Dashboard', [
            'stats' => [
                'active_jobs' => $activeJobs,
                'total_vacancies' => $totalVacancies,
                'total_jobs' => $totalJobs,
                'draft_jobs' => $draftJobs,
                'inactive_jobs' => $inactiveJobs,
                'total_applications' => $totalApplications,
                'jobs_with_applications' => $jobsWithApplicationsCount,
                'recent_applications' => $recentApplicationsCount,
                'total_cv_profiles' => $totalCvProfiles,
            ],
            'recentApplications' => $recentApplications,
            'recentJobs' => $recentJobs,
            'maxApplications' => $maxApplications,
        ]);
    }
}

