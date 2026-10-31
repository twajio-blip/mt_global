<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\CvAcademicQualification;
use App\Models\CvProfile;
use App\Models\CvTraining;
use App\Models\CvWorkExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CandidateCvController extends Controller
{
    public function show(): Response
    {
        $user = Auth::user();
        $cvProfile = CvProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'email' => $user->email,
                'country' => 'Bangladesh',
                'nationality' => 'Bangladeshi',
                'languages' => ['Bangla', 'English'],
            ]
        );

        $cvProfile->load(['qualifications', 'experiences', 'trainings']);

        $manpowerCountries = [
            'Bangladesh', 'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman',
            'Bahrain', 'Malaysia', 'Singapore', 'Romania', 'Croatia', 'Poland',
            'Jordan', 'Maldives', 'India',
        ];

        return Inertia::render('Candidate/MyCv', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'passport_number' => $user->passport_number,
            ],
            'cvProfile' => [
                'id' => $cvProfile->id,
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
                'passport_expiry' => $cvProfile->passport_expiry?->format('Y-m-d') ?? '',
                'passport_issue_place' => $cvProfile->passport_issue_place ?? '',
                'village_area' => $cvProfile->village_area ?? '',
                'post_office' => $cvProfile->post_office ?? '',
                'police_station' => $cvProfile->police_station ?? '',
                'district' => $cvProfile->district ?? '',
                'country' => $cvProfile->country ?? 'Bangladesh',
                'email' => $cvProfile->email ?? $user->email,
                'qualifications' => $cvProfile->qualifications,
                'experiences' => $cvProfile->experiences,
                'trainings' => $cvProfile->trainings,
                'total_experience' => $cvProfile->total_experience_formatted,
                'languages' => $cvProfile->languages ?? [],
            ],
            'manpowerCountries' => $manpowerCountries,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $cvProfile = CvProfile::where('user_id', $user->id)->firstOrFail();

        $validated = $request->validate([
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

        // Sync lists
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

        $cvProfile->experiences()->delete();
        if (!empty($validated['experiences'])) {
            foreach ($validated['experiences'] as $exp) {
                if (!empty($exp['job_title']) && !empty($exp['company'])) {
                    CvWorkExperience::create([
                        'cv_profile_id' => $cvProfile->id,
                        'job_title' => $exp['job_title'],
                        'company' => $exp['company'],
                        'country' => $exp['country'] ?? null,
                        'start_date' => $exp['start_date'] ?? null,
                        'end_date' => $exp['end_date'] ?? null,
                        'is_current' => !empty($exp['is_current']),
                    ]);
                }
            }
        }

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

        return back()->with('success', 'Your Manpower CV has been updated successfully!');
    }
}

