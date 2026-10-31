<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\CvAcademicQualification;
use App\Models\CvProfile;
use App\Models\CvTraining;
use App\Models\CvWorkExperience;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationCvController extends Controller
{
    /**
     * Unified Dashboard: Applications / CVs
     */
    public function index(Request $request): Response
    {
        $tab = $request->input('tab', 'applications'); // 'applications' or 'cvs'

        // Data for View A: Job Applications
        $appQuery = JobApplication::with(['job.country', 'job.designation', 'user', 'locationCountry'])
            ->orderBy('created_at', 'desc');

        if ($jobId = $request->input('job_id')) {
            $appQuery->where('job_id', $jobId);
        }

        if ($country = $request->input('country')) {
            $appQuery->whereHas('job.country', function ($q) use ($country) {
                $q->where('name', $country);
            });
        }

        if ($designation = $request->input('designation')) {
            $appQuery->whereHas('job.designation', function ($q) use ($designation) {
                $q->where('name', $designation);
            });
        }

        if ($search = $request->input('search')) {
            $appQuery->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('passport_number', 'like', "%{$search}%")
                    ->orWhere('mobile_number', 'like', "%{$search}%")
                    ->orWhere('current_location', 'like', "%{$search}%");
            });
        }

        $applications = $appQuery->paginate(15, ['*'], 'app_page')->withQueryString()->through(function ($app) {
            $locCountry = $app->locationCountry;
            if (!$locCountry) {
                if (is_numeric($app->current_location)) {
                    $locCountry = Country::find($app->current_location);
                } else {
                    $locCountry = Country::where('code', $app->current_location)->orWhere('name', $app->current_location)->first();
                }
            }

            return [
                'id' => $app->id,
                'job_id' => $app->job_id,
                'user_id' => $app->user_id,
                'full_name' => $app->full_name,
                'passport_number' => $app->passport_number,
                'mobile_number' => $app->mobile_number,
                'job_title' => $app->job?->title_en ?? '',
                'job_code' => $app->job?->job_code ?? '',
                'country' => $app->job?->country?->name ?? '',
                'designation' => $app->job?->designation?->name ?? '',
                'experience_years' => $app->experience_years,
                'has_overseas_experience' => (bool) $app->has_overseas_experience,
                'current_location' => $app->current_location,
                'current_location_id' => $locCountry?->id ?? (int) $app->current_location,
                'current_location_name' => $locCountry?->name ?? 'Bangladesh',
                'current_location_code' => $locCountry?->code ?? 'BD',
                'cv_file_path' => $app->cv_file_path,
                'cv_file_name' => $app->cv_file_name ?? 'CV_Document.pdf',
                'passport_file_path' => $app->passport_file_path,
                'passport_file_name' => $app->passport_file_name ?? 'Passport_Copy.pdf',
                'photo_file_path' => $app->photo_file_path,
                'photo_file_name' => $app->photo_file_name ?? 'Photo.jpg',
                'status' => $app->status,
                'submitted_at' => $app->created_at?->toIso8601String(),
            ];
        });

        // Data for View B: Created CVs (Manpower Profile Manager)
        $cvQuery = CvProfile::with(['user', 'qualifications', 'experiences', 'trainings'])
            ->orderBy('updated_at', 'desc');

        if ($cvSearch = $request->input('cv_search')) {
            $cvQuery->where(function ($q) use ($cvSearch) {
                $q->whereHas('user', function ($uq) use ($cvSearch) {
                    $uq->where('name', 'like', "%{$cvSearch}%")
                        ->orWhere('email', 'like', "%{$cvSearch}%")
                        ->orWhere('passport_number', 'like', "%{$cvSearch}%")
                        ->orWhere('phone', 'like', "%{$cvSearch}%");
                })->orWhere('nationality', 'like', "%{$cvSearch}%")
                    ->orWhere('district', 'like', "%{$cvSearch}%");
            });
        }

        $cvProfiles = $cvQuery->paginate(12, ['*'], 'cv_page')->withQueryString()->through(function ($cv) {
            return [
                'id' => $cv->id,
                'user_id' => $cv->user_id,
                'full_name' => $cv->user?->name ?? 'Candidate',
                'email' => $cv->user?->email ?? $cv->email,
                'mobile_number' => $cv->user?->phone ?? '',
                'passport_number' => $cv->user?->passport_number ?? '',
                'photo_path' => $cv->photo_path,
                'country' => $cv->country,
                'district' => $cv->district,
                'total_experience' => $cv->total_experience_formatted,
                'qualifications_count' => $cv->qualifications->count(),
                'experiences_count' => $cv->experiences->count(),
                'trainings_count' => $cv->trainings->count(),
                'languages' => $cv->languages ?? [],
                'updated_at' => $cv->updated_at?->toIso8601String(),
            ];
        });

        // Filter Dropdowns
        $allJobs = Job::with('country')->orderBy('job_code')->get(['id', 'job_code', 'title_en', 'country_id'])->map(function ($j) {
            return [
                'value' => (string) $j->id,
                'label' => "{$j->job_code} · {$j->title_en}",
            ];
        });

        $allCountries = Country::where('is_active', true)->orderBy('name')->pluck('name')->map(function ($c) {
            return ['value' => $c, 'label' => $c];
        });

        $allDesignations = Designation::where('is_active', true)->orderBy('name')->pluck('name')->map(function ($d) {
            return ['value' => $d, 'label' => $d];
        });

        return Inertia::render('Portal/Applications/Index', [
            'activeTab' => $tab,
            'applications' => $applications,
            'cvProfiles' => $cvProfiles,
            'allJobs' => $allJobs,
            'allCountries' => $allCountries,
            'allDesignations' => $allDesignations,
            'filters' => [
                'job_id' => $request->input('job_id', ''),
                'country' => $request->input('country', ''),
                'designation' => $request->input('designation', ''),
                'search' => $request->input('search', ''),
                'cv_search' => $request->input('cv_search', ''),
            ],
        ]);
    }

    /**
     * Update application status (Pending, Approved, etc.)
     */
    public function updateApplicationStatus(Request $request, JobApplication $application): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:Pending,Approved,Selected,Rejected',
        ]);

        $application->update(['status' => $request->input('status')]);

        return back()->with('success', "Application status for {$application->full_name} updated to {$application->status}.");
    }

    /**
     * Edit a candidate's structured Manpower CV
     */
    public function editCv(CvProfile $cvProfile): Response
    {
        $cvProfile->load(['user', 'qualifications', 'experiences', 'trainings']);

        $countries = Country::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']);

        return Inertia::render('Portal/Applications/CvEditor', [
            'cvProfile' => [
                'id' => $cvProfile->id,
                'user_id' => $cvProfile->user_id,
                'user_name' => $cvProfile->user?->name ?? '',
                'user_passport' => $cvProfile->user?->passport_number ?? '',
                'user_phone' => $cvProfile->user?->phone ?? '',
                'user_email' => $cvProfile->user?->email ?? '',
                // Personal
                'photo_path' => $cvProfile->photo_path,
                'father_name' => $cvProfile->father_name ?? '',
                'mother_name' => $cvProfile->mother_name ?? '',
                'dob' => $cvProfile->dob?->format('Y-m-d') ?? '',
                'pob' => $cvProfile->pob ?? '',
                'nationality' => $cvProfile->nationality ?? 'Bangladeshi',
                'gender' => $cvProfile->gender ?? '',
                'marital_status' => $cvProfile->marital_status ?? '',
                'religion' => $cvProfile->religion ?? '',
                'height' => $cvProfile->height ?? '',
                'weight' => $cvProfile->weight ?? '',
                // Passport
                'passport_expiry' => $cvProfile->passport_expiry?->format('Y-m-d') ?? '',
                'passport_issue_place' => $cvProfile->passport_issue_place ?? '',
                // Address
                'village_area' => $cvProfile->village_area ?? '',
                'post_office' => $cvProfile->post_office ?? '',
                'police_station' => $cvProfile->police_station ?? '',
                'district' => $cvProfile->district ?? '',
                'country' => $cvProfile->country ?? 'Bangladesh',
                'email' => $cvProfile->email ?? $cvProfile->user?->email ?? '',
                // Dynamic lists
                'qualifications' => $cvProfile->qualifications->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'degree' => $q->degree,
                        'institution' => $q->institution,
                        'passing_year' => $q->passing_year,
                        'result_grade' => $q->result_grade ?? '',
                    ];
                }),
                'experiences' => $cvProfile->experiences->map(function ($exp) {
                    return [
                        'id' => $exp->id,
                        'job_title' => $exp->job_title,
                        'company' => $exp->company,
                        'country' => $exp->country ?? 'Bangladesh',
                        'salary' => $exp->salary ?? '',
                        'start_date' => $exp->start_date?->format('Y-m-d') ?? '',
                        'end_date' => $exp->end_date?->format('Y-m-d') ?? '',
                        'is_current' => (bool) $exp->is_current,
                    ];
                }),
                'trainings' => $cvProfile->trainings->map(function ($t) {
                    return [
                        'id' => $t->id,
                        'course_name' => $t->course_name,
                        'institute' => $t->institute,
                        'duration' => $t->duration ?? '',
                    ];
                }),
                'total_experience' => $cvProfile->total_experience_formatted,
                'languages' => $cvProfile->languages ?? [],
            ],
            'countries' => $countries,
        ]);
    }

    /**
     * Update candidate's structured Manpower CV
     */
    public function updateCv(Request $request, CvProfile $cvProfile): RedirectResponse
    {
        $validated = $request->validate([
            'user_name' => 'required|string|max:255',
            'user_phone' => 'required|string|max:50',
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',
            'dob' => 'nullable|date',
            'pob' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:100',
            'gender' => 'nullable|in:Male,Female',
            'marital_status' => 'nullable|in:Single,Married',
            'religion' => 'nullable|string|max:50',
            'height' => 'nullable|string|max:50',
            'weight' => 'nullable|string|max:50',
            'passport_expiry' => 'nullable|date',
            'passport_issue_place' => 'nullable|string|max:150',
            'village_area' => 'nullable|string|max:255',
            'post_office' => 'nullable|string|max:150',
            'police_station' => 'nullable|string|max:150',
            'district' => 'nullable|string|max:150',
            'country' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:255',
            'languages' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'experiences' => 'nullable|array',
            'trainings' => 'nullable|array',
        ]);

        // Update core user full name and phone
        if ($cvProfile->user) {
            $cvProfile->user->update([
                'name' => $validated['user_name'],
                'phone' => $validated['user_phone'],
            ]);
        }

        // Handle photo upload if present
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('photos', 'public');
            $cvProfile->photo_path = '/storage/' . $path;
        }

        $cvProfile->update([
            'father_name' => $validated['father_name'] ?? null,
            'mother_name' => $validated['mother_name'] ?? null,
            'dob' => $validated['dob'] ?? null,
            'pob' => $validated['pob'] ?? null,
            'nationality' => $validated['nationality'] ?? 'Bangladeshi',
            'gender' => $validated['gender'] ?? null,
            'marital_status' => $validated['marital_status'] ?? null,
            'religion' => $validated['religion'] ?? null,
            'height' => $validated['height'] ?? null,
            'weight' => $validated['weight'] ?? null,
            'passport_expiry' => $validated['passport_expiry'] ?? null,
            'passport_issue_place' => $validated['passport_issue_place'] ?? null,
            'village_area' => $validated['village_area'] ?? null,
            'post_office' => $validated['post_office'] ?? null,
            'police_station' => $validated['police_station'] ?? null,
            'district' => $validated['district'] ?? null,
            'country' => $validated['country'] ?? 'Bangladesh',
            'email' => $validated['email'] ?? null,
            'languages' => $validated['languages'] ?? [],
        ]);

        // Sync Academic Qualifications
        $cvProfile->qualifications()->delete();
        if (!empty($validated['qualifications'])) {
            foreach ($validated['qualifications'] as $q) {
                if (!empty($q['degree']) && !empty($q['institution'])) {
                    CvAcademicQualification::create([
                        'cv_profile_id' => $cvProfile->id,
                        'degree' => $q['degree'],
                        'institution' => $q['institution'],
                        'passing_year' => $q['passing_year'] ?? '',
                        'result_grade' => $q['result_grade'] ?? null,
                    ]);
                }
            }
        }

        // Sync Work Experiences
        $cvProfile->experiences()->delete();
        if (!empty($validated['experiences'])) {
            foreach ($validated['experiences'] as $exp) {
                if (!empty($exp['job_title']) && !empty($exp['company'])) {
                    CvWorkExperience::create([
                        'cv_profile_id' => $cvProfile->id,
                        'job_title' => $exp['job_title'],
                        'company' => $exp['company'],
                        'country' => $exp['country'] ?? null,
                        'salary' => $exp['salary'] ?? null,
                        'start_date' => $exp['start_date'] ?? null,
                        'end_date' => $exp['end_date'] ?? null,
                        'is_current' => !empty($exp['is_current']),
                    ]);
                }
            }
        }

        // Sync Trainings
        $cvProfile->trainings()->delete();
        if (!empty($validated['trainings'])) {
            foreach ($validated['trainings'] as $t) {
                if (!empty($t['course_name']) && !empty($t['institute'])) {
                    CvTraining::create([
                        'cv_profile_id' => $cvProfile->id,
                        'course_name' => $t['course_name'],
                        'institute' => $t['institute'],
                        'duration' => $t['duration'] ?? '',
                    ]);
                }
            }
        }

        return redirect()->route('portal.applications.index', ['tab' => 'cvs'])
            ->with('success', "CV Profile for {$cvProfile->user?->name} saved successfully!");
    }

    /**
     * Preview / Export Standard Manpower CV (Clean Printable Template matching agency standard)
     */
    public function exportCv(CvProfile $cvProfile): Response
    {
        $cvProfile->load(['user', 'qualifications', 'experiences', 'trainings']);

        return Inertia::render('Portal/Applications/CvPrintPreview', [
            'cv' => [
                'name' => $cvProfile->user?->name ?? 'Candidate Name',
                'phone' => $cvProfile->user?->phone ?? '',
                'passport_number' => $cvProfile->user?->passport_number ?? '',
                'email' => $cvProfile->user?->email ?? $cvProfile->email,
                'photo_path' => $cvProfile->photo_path,
                'father_name' => $cvProfile->father_name,
                'mother_name' => $cvProfile->mother_name,
                'dob' => $cvProfile->dob?->format('d M Y'),
                'pob' => $cvProfile->pob,
                'nationality' => $cvProfile->nationality ?? 'BANGLADESHI',
                'gender' => $cvProfile->gender ?? 'MALE',
                'marital_status' => $cvProfile->marital_status ?? 'Married',
                'religion' => $cvProfile->religion ?? 'ISLAM',
                'height' => $cvProfile->height,
                'weight' => $cvProfile->weight,
                'passport_expiry' => $cvProfile->passport_expiry?->format('d M Y'),
                'passport_issue_place' => $cvProfile->passport_issue_place ?? 'DHAKA',
                'village_area' => $cvProfile->village_area,
                'post_office' => $cvProfile->post_office,
                'police_station' => $cvProfile->police_station,
                'district' => $cvProfile->district,
                'country' => $cvProfile->country ?? 'Bangladesh',
                'languages' => $cvProfile->languages ?? [],
                'total_experience' => $cvProfile->total_experience_formatted,
                'position_applied' => $cvProfile->experiences->first()?->job_title ?? 'SKILLED WORKER',
                'qualifications' => $cvProfile->qualifications->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'degree' => $q->degree,
                        'institution' => $q->institution,
                        'passing_year' => $q->passing_year,
                        'result_grade' => $q->result_grade ?? 'Passed',
                    ];
                }),
                'experiences' => $cvProfile->experiences->map(function ($exp) {
                    $fromYear = $exp->start_date ? \Carbon\Carbon::parse($exp->start_date)->format('Y') : '';
                    $toYear = $exp->is_current ? 'Present' : ($exp->end_date ? \Carbon\Carbon::parse($exp->end_date)->format('Y') : '');
                    $yearsDiff = '';
                    if ($exp->start_date) {
                        $start = \Carbon\Carbon::parse($exp->start_date);
                        $end = $exp->is_current ? \Carbon\Carbon::now() : ($exp->end_date ? \Carbon\Carbon::parse($exp->end_date) : $start);
                        $yearsDiff = max(1, (int) round($start->diffInMonths($end) / 12));
                    }
                    return [
                        'id' => $exp->id,
                        'job_title' => $exp->job_title,
                        'company' => $exp->company,
                        'country' => strtoupper($exp->country ?? 'BANGLADESH'),
                        'from_year' => $fromYear,
                        'to_year' => $toYear,
                        'years' => $yearsDiff,
                        'salary' => $exp->salary ?: '-',
                    ];
                }),
                'trainings' => $cvProfile->trainings->map(function ($t) {
                    return [
                        'id' => $t->id,
                        'course_name' => $t->course_name,
                        'institute' => $t->institute,
                        'duration' => $t->duration,
                    ];
                }),
            ],
        ]);
    }
}

