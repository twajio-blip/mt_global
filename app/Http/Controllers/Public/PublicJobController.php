<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicJobController extends Controller
{
    public function index(Request $request): Response
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
            $query->whereHas('country', function ($q) use ($country) {
                $q->where('name', $country);
            });
        }

        if ($designation = $request->input('designation')) {
            $query->whereHas('designation', function ($q) use ($designation) {
                $q->where('name', $designation);
            });
        }

        $jobs = $query->paginate(12)->withQueryString();
        $countries = Country::where('is_active', true)->orderBy('name')->get();
        $designations = Designation::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Public/Jobs', [
            'jobs' => $jobs,
            'countries' => $countries,
            'designations' => $designations,
            'filters' => $request->only(['search', 'country', 'designation']),
        ]);
    }

    public function show(Job $job): Response
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

        return Inertia::render('Public/JobDetails', [
            'job' => $job,
            'relatedJobs' => $relatedJobs,
            'prefilledUser' => Auth::check() ? [
                'name' => Auth::user()->name,
                'phone' => Auth::user()->phone,
                'passport_number' => Auth::user()->passport_number,
                'email' => Auth::user()->email,
            ] : null,
        ]);
    }

    public function apply(Request $request, Job $job): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'passport_number' => 'required|string|max:100',
            'mobile_number' => 'required|string|max:50',
            'experience_years' => 'required|string|max:50',
            'has_overseas_experience' => 'required|boolean',
            'current_location' => 'required|string|max:255',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:10240',
            'passport_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'photo_file' => 'required|file|mimes:jpg,jpeg,png|max:10240',
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

        // Store 3 uploaded files
        $cvPath = $request->file('cv_file')->store('applications/cvs', 'public');
        $passportPath = $request->file('passport_file')->store('applications/passports', 'public');
        $photoPath = $request->file('photo_file')->store('applications/photos', 'public');

        JobApplication::create([
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
            'passport_file_path' => '/storage/' . $passportPath,
            'passport_file_name' => $request->file('passport_file')->getClientOriginalName(),
            'photo_file_path' => '/storage/' . $photoPath,
            'photo_file_name' => $request->file('photo_file')->getClientOriginalName(),
            'status' => 'Pending',
        ]);

        return back()->with('success_application', [
            'job_title' => $job->title_en,
            'job_code' => $job->job_code,
            'country' => $job->country?->name,
            'designation' => $job->designation?->name,
            'employer' => $job->employer_name,
            'submitted_at' => now()->toIso8601String(),
        ]);
    }
}
