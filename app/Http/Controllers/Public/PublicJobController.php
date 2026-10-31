<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicJobController extends Controller
{
    /**
     * List published jobs.
     * Returns Inertia page for browser visits; returns JSON for API / external callers.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $query = Job::with(['country', 'designation'])
            ->where('status', 'Published')
            ->orderBy('created_at', 'desc');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_en', 'like', "%{$search}%")
                  ->orWhere('title_bn', 'like', "%{$search}%")
                  ->orWhere('job_code', 'like', "%{$search}%")
                  ->orWhere('employer_name', 'like', "%{$search}%");
            });
        }

        if ($country = $request->input('country')) {
            if (is_numeric($country)) {
                $query->where('country_id', (int) $country);
            } else {
                $query->whereHas('country', function ($q) use ($country) {
                    $q->where('name', $country)
                      ->orWhere('code', strtoupper($country));
                });
            }
        } elseif ($request->filled('country_id')) {
            $query->where('country_id', (int) $request->input('country_id'));
        }

        if ($designation = $request->input('designation')) {
            if (is_numeric($designation)) {
                $query->where('designation_id', (int) $designation);
            } else {
                $query->whereHas('designation', function ($q) use ($designation) {
                    $q->where('name', $designation);
                });
            }
        } elseif ($request->filled('designation_id')) {
            $query->where('designation_id', (int) $request->input('designation_id'));
        }

        $perPage = max(1, min((int) $request->input('per_page', 12), 100));
        $jobs = $query->paginate($perPage)->withQueryString();
        $countries = Country::where('is_active', true)->orderBy('name')->get();
        $designations = Designation::where('is_active', true)->orderBy('name')->get();

        // If request is from Inertia, return Inertia page
        if ($request->header('X-Inertia') || (!$request->expectsJson() && !$request->is('api/*'))) {
            return Inertia::render('Public/Jobs', [
                'jobs' => $jobs,
                'countries' => $countries,
                'designations' => $designations,
                'filters' => $request->only(['search', 'country', 'designation']),
            ]);
        }

        // Otherwise return JSON for API / Website Builder
        return response()->json([
            'success' => true,
            'data' => $jobs->items(),
            'pagination' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
                'has_more' => $jobs->hasMorePages(),
            ],
            'countries' => $countries,
            'designations' => $designations,
        ]);
    }

    /**
     * Show single job details.
     * Returns Inertia page for browser visits; returns JSON for API / external callers.
     */
    public function show(Request $request, Job $job): Response|JsonResponse
    {
        $job->load(['country', 'designation']);

        $relatedJobs = Job::with(['country', 'designation'])
            ->where('status', 'Published')
            ->where('id', '!=', $job->id)
            ->where(function ($q) use ($job) {
                $q->where('country_id', $job->country_id)
                  ->orWhere('designation_id', $job->designation_id);
            })
            ->take(3)
            ->get();

        $countries = Country::where('is_active', true)->where('name', '!=', 'Bangladesh')->orderBy('name')->get(['id', 'name', 'code', 'flag_emoji']);
        $bangladesh = Country::where('name', 'Bangladesh')->orWhere('code', 'BD')->first();

        // If request is from Inertia, return Inertia page
        if ($request->header('X-Inertia') || (!$request->expectsJson() && !$request->is('api/*'))) {
            return Inertia::render('Public/JobDetails', [
                'job' => $job,
                'relatedJobs' => $relatedJobs,
                'countries' => $countries,
                'bangladeshCountry' => $bangladesh ? ['id' => $bangladesh->id, 'name' => $bangladesh->name, 'code' => $bangladesh->code] : null,
                'prefilledUser' => Auth::check() ? [
                    'name' => Auth::user()->name,
                    'phone' => Auth::user()->phone,
                    'passport_number' => Auth::user()->passport_number,
                    'email' => Auth::user()->email,
                ] : null,
            ]);
        }

        // Otherwise return JSON for API / Website Builder
        return response()->json([
            'success' => true,
            'data' => $job,
            'related_jobs' => $relatedJobs,
            'countries' => $countries,
            'bangladesh_country' => $bangladesh ? ['id' => $bangladesh->id, 'name' => $bangladesh->name, 'code' => $bangladesh->code] : null,
        ]);
    }

    /**
     * Submit candidate application (Quick Apply).
     * Returns Inertia back redirect for browser visits; returns JSON for API / external callers.
     */
    public function apply(Request $request, Job $job): RedirectResponse|JsonResponse
    {
        // Normalize location if passed as ISO code or name
        if ($request->has('current_location') && !is_numeric($request->input('current_location'))) {
            $loc = $request->input('current_location');
            $matched = Country::where('code', strtoupper($loc))->orWhere('name', $loc)->first();
            if ($matched) {
                $request->merge(['current_location' => $matched->id]);
            }
        }

        // Normalize boolean has_overseas_experience
        if ($request->has('has_overseas_experience')) {
            $request->merge([
                'has_overseas_experience' => filter_var($request->input('has_overseas_experience'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false
            ]);
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'passport_number' => 'required|string|max:100',
            'mobile_number' => 'required|string|max:50',
            'experience_years' => 'required|string|max:50',
            'has_overseas_experience' => 'required|boolean',
            'current_location' => 'required|exists:countries,id',
            'cv_file' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
            'passport_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
            'photo_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
        ]);

        // Find or create candidate user
        $user = Auth::user();
        if (!$user) {
            $user = User::firstOrCreate(
                ['passport_number' => $validated['passport_number']],
                [
                    'name' => $validated['full_name'],
                    'email' => strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $validated['passport_number'])) . '@applicant.jobportal.com',
                    'phone' => $validated['mobile_number'],
                    'role' => 'candidate',
                    'password' => Hash::make(Str::random(12)),
                ]
            );
        }

        // Store up to 3 uploaded files
        $cvPath = $request->file('cv_file')->store('applications/cvs', 'public');
        $passportPath = $request->hasFile('passport_file') ? $request->file('passport_file')->store('applications/passports', 'public') : null;
        $photoPath = $request->hasFile('photo_file') ? $request->file('photo_file')->store('applications/photos', 'public') : null;

        $application = JobApplication::create([
            'job_id' => $job->id,
            'user_id' => $user->id,
            'full_name' => $validated['full_name'],
            'passport_number' => $validated['passport_number'],
            'mobile_number' => $validated['mobile_number'],
            'experience_years' => $validated['experience_years'],
            'has_overseas_experience' => $validated['has_overseas_experience'],
            'current_location' => $validated['current_location'],
            'cv_file_path' => '/storage/' . $cvPath,
            'cv_file_name' => $request->file('cv_file')->getClientOriginalName(),
            'passport_file_path' => $passportPath ? '/storage/' . $passportPath : null,
            'passport_file_name' => $request->hasFile('passport_file') ? $request->file('passport_file')->getClientOriginalName() : null,
            'photo_file_path' => $photoPath ? '/storage/' . $photoPath : null,
            'photo_file_name' => $request->hasFile('photo_file') ? $request->file('photo_file')->getClientOriginalName() : null,
            'status' => 'Pending',
        ]);

        // If request is from Inertia, return Inertia back redirect with flash
        if ($request->header('X-Inertia') || (!$request->expectsJson() && !$request->is('api/*'))) {
            return back()->with('success_application', [
                'job_title' => $job->title_en,
                'job_code' => $job->job_code,
                'country' => $job->country?->name,
                'designation' => $job->designation?->name,
                'employer' => $job->employer_name,
                'submitted_at' => now()->toIso8601String(),
            ]);
        }

        // Otherwise return JSON for API / Website Builder
        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully. Our manpower recruitment team will review it shortly.',
            'data' => [
                'application_id' => $application->id,
                'job_id' => $job->id,
                'job_code' => $job->job_code,
                'job_title' => $job->title_en,
                'candidate_name' => $application->full_name,
                'status' => $application->status,
                'submitted_at' => $application->created_at?->toIso8601String(),
            ],
        ], 201);
    }

    /**
     * Active countries list for external builders
     */
    public function countries(): JsonResponse
    {
        $countries = Country::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code', 'flag_emoji']);
        return response()->json([
            'success' => true,
            'data' => $countries,
        ]);
    }

    /**
     * Active designations list for external builders
     */
    public function designations(): JsonResponse
    {
        $designations = Designation::where('is_active', true)->orderBy('name')->get(['id', 'name']);
        return response()->json([
            'success' => true,
            'data' => $designations,
        ]);
    }
}
