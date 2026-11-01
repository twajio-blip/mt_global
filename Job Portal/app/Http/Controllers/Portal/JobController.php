<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Designation;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Job::with(['country', 'designation'])
            ->withCount('applications')
            ->orderBy('created_at', 'desc');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_en', 'like', "%{$search}%")
                  ->orWhere('job_code', 'like', "%{$search}%")
                  ->orWhere('employer_name', 'like', "%{$search}%");
            });
        }

        if ($countryId = $request->input('country_id')) {
            $query->where('country_id', $countryId);
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $jobs = $query->paginate(15)->withQueryString();
        $countries = Country::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']);
        $designations = Designation::where('is_active', true)->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Portal/Jobs/Index', [
            'jobs' => $jobs,
            'countries' => $countries,
            'designations' => $designations,
            'filters' => $request->only(['search', 'country_id', 'status']),
        ]);
    }

    public function create(): Response
    {
        $countries = Country::where('is_active', true)->orderBy('name')->get();
        $designations = Designation::where('is_active', true)->orderBy('name')->get();

        // Calculate next predicted serial
        $maxSerial = \DB::table('portal_jobs')->max('serial_number') ?? 0;
        $nextSerialFormatted = str_pad((string)($maxSerial + 1), 4, '0', STR_PAD_LEFT);

        return Inertia::render('Portal/Jobs/Editor', [
            'job' => null,
            'countries' => $countries,
            'designations' => $designations,
            'nextSerialFormatted' => $nextSerialFormatted,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'nullable|string|max:255',
            'prefix' => 'required|string|max:15',
            'country_id' => 'required|exists:countries,id',
            'designation_id' => 'required|exists:designations,id',
            'employer_name' => 'required|string|max:255',
            'employer_name_bn' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'location_bn' => 'nullable|string|max:255',
            'vacancy' => 'nullable|integer|min:1',
            'salary' => 'nullable|string|max:100',
            'salary_bn' => 'nullable|string|max:100',
            'contract_duration' => 'nullable|string|max:100',
            'contract_duration_bn' => 'nullable|string|max:100',
            'working_hours' => 'nullable|string|max:100',
            'working_hours_bn' => 'nullable|string|max:100',
            'interview_date' => 'nullable|date',
            'interview_type' => 'required|string',
            'interview_venue' => 'nullable|string|max:255',
            'interview_venue_bn' => 'nullable|string|max:255',
            'req_experience' => 'nullable|string|max:255',
            'req_experience_bn' => 'nullable|string|max:255',
            'req_education' => 'nullable|string|max:255',
            'req_education_bn' => 'nullable|string|max:255',
            'req_age' => 'nullable|string|max:50',
            'req_age_bn' => 'nullable|string|max:50',
            'req_gender' => 'required|string',
            'desc_en' => 'nullable|string',
            'desc_bn' => 'nullable|string',
            'req_candidate_en' => 'nullable|string',
            'req_candidate_bn' => 'nullable|string',
            'responsibilities_en' => 'nullable|string',
            'responsibilities_bn' => 'nullable|string',
            'additional_info_en' => 'nullable|string',
            'additional_info_bn' => 'nullable|string',
            'benefits' => 'nullable|array',
            'visa_fee_type' => 'required|string',
            'visa_type' => 'nullable|string|max:100',
            'visa_notes_en' => 'nullable|string',
            'visa_notes_bn' => 'nullable|string',
            'application_deadline' => 'nullable|date',
            'status' => 'required|in:Draft,Published,Inactive',
        ]);

        $job = Job::create($validated);

        return redirect()->route('portal.jobs.index')
            ->with('success', "Job {$job->job_code} created successfully!");
    }

    public function edit(Job $job): Response
    {
        $job->load(['country', 'designation']);
        $countries = Country::where('is_active', true)->orderBy('name')->get();
        $designations = Designation::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Portal/Jobs/Editor', [
            'job' => $job,
            'countries' => $countries,
            'designations' => $designations,
            'nextSerialFormatted' => str_pad((string)$job->serial_number, 4, '0', STR_PAD_LEFT),
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'nullable|string|max:255',
            'prefix' => 'required|string|max:15',
            'country_id' => 'required|exists:countries,id',
            'designation_id' => 'required|exists:designations,id',
            'employer_name' => 'required|string|max:255',
            'employer_name_bn' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'location_bn' => 'nullable|string|max:255',
            'vacancy' => 'nullable|integer|min:1',
            'salary' => 'nullable|string|max:100',
            'salary_bn' => 'nullable|string|max:100',
            'contract_duration' => 'nullable|string|max:100',
            'contract_duration_bn' => 'nullable|string|max:100',
            'working_hours' => 'nullable|string|max:100',
            'working_hours_bn' => 'nullable|string|max:100',
            'interview_date' => 'nullable|date',
            'interview_type' => 'required|string',
            'interview_venue' => 'nullable|string|max:255',
            'interview_venue_bn' => 'nullable|string|max:255',
            'req_experience' => 'nullable|string|max:255',
            'req_experience_bn' => 'nullable|string|max:255',
            'req_education' => 'nullable|string|max:255',
            'req_education_bn' => 'nullable|string|max:255',
            'req_age' => 'nullable|string|max:50',
            'req_age_bn' => 'nullable|string|max:50',
            'req_gender' => 'required|string',
            'desc_en' => 'nullable|string',
            'desc_bn' => 'nullable|string',
            'req_candidate_en' => 'nullable|string',
            'req_candidate_bn' => 'nullable|string',
            'responsibilities_en' => 'nullable|string',
            'responsibilities_bn' => 'nullable|string',
            'additional_info_en' => 'nullable|string',
            'additional_info_bn' => 'nullable|string',
            'benefits' => 'nullable|array',
            'visa_fee_type' => 'required|string',
            'visa_type' => 'nullable|string|max:100',
            'visa_notes_en' => 'nullable|string',
            'visa_notes_bn' => 'nullable|string',
            'application_deadline' => 'nullable|date',
            'status' => 'required|in:Draft,Published,Inactive',
        ]);

        // If prefix changed, update job_code
        if (strtoupper(trim($validated['prefix'])) !== $job->prefix) {
            $validated['job_code'] = strtoupper(trim($validated['prefix'])) . '-' . str_pad((string)$job->serial_number, 4, '0', STR_PAD_LEFT);
        }

        $job->update($validated);

        return redirect()->route('portal.jobs.index')
            ->with('success', "Job {$job->job_code} updated successfully!");
    }

    public function destroy(Job $job): RedirectResponse
    {
        $code = $job->job_code;
        $job->delete();

        return redirect()->route('portal.jobs.index')
            ->with('success', "Job {$code} deleted successfully!");
    }

    public function updateStatus(Request $request, Job $job): RedirectResponse
    {
        $request->validate(['status' => 'required|in:Draft,Published,Inactive']);
        $job->update(['status' => $request->input('status')]);

        return back()->with('success', "Job status changed to {$job->status}.");
    }
}

