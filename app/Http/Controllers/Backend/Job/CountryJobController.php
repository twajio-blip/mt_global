<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\CountryJob;
use App\Models\JobBenefit;
use App\Models\JobDesignation;
use App\Models\JobCountry;
use App\Models\JobCountryLocation;
use App\Models\JobEmploymentType;
use Illuminate\Http\Request;

class CountryJobController extends Controller
{
    public function index()
    {
        $search = request()->string('search')->toString();
        $status = request()->string('status')->toString();

        $jobs = CountryJob::with(['country', 'countryLocation', 'jobDesignation', 'employmentType', 'benefits'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhere('employer', 'like', '%' . $search . '%')
                        ->orWhere('designation', 'like', '%' . $search . '%')
                        ->orWhereHas('country', fn ($countryQuery) => $countryQuery->where('name', 'like', '%' . $search . '%'))
                        ->orWhereHas('jobDesignation', fn ($designationQuery) => $designationQuery->where('name', 'like', '%' . $search . '%'));
                });
            })
            ->when($status === 'active', fn ($query) => $query->where('is_active', true))
            ->when($status === 'inactive', fn ($query) => $query->where('status', 'inactive'))
            ->when($status === 'draft', fn ($query) => $query->where('status', 'draft'))
            ->latest()
            ->paginate(10)
            ->withQueryString();
        $jobCounts = [
            'all' => CountryJob::count(),
            'active' => CountryJob::where('is_active', true)->count(),
            'draft' => CountryJob::where('status', 'draft')->count(),
            'inactive' => CountryJob::where('status', 'inactive')->count(),
        ];
        $countries = JobCountry::where('is_active', true)->orderBy('name')->get();
        $locations = JobCountryLocation::with('country')->where('is_active', true)->orderBy('name')->get();
        $designations = JobDesignation::where('is_active', true)->orderBy('name')->get();
        $benefits = JobBenefit::where('is_active', true)->orderBy('name')->get();
        $employmentTypes = JobEmploymentType::where('is_active', true)->orderBy('name')->get();

        return view('backend.pages.job.job.index', compact('jobs', 'jobCounts', 'countries', 'locations', 'designations', 'benefits', 'employmentTypes', 'search', 'status'));
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $benefitIds = $data['benefit_ids'];
        unset($data['benefit_ids']);

        $job = CountryJob::create($data);
        $job->benefits()->sync($benefitIds);

        return redirect()->back()->with('success', 'Job created successfully');
    }

    public function update(Request $request, CountryJob $job)
    {
        $data = $this->validatedData($request);
        $benefitIds = $data['benefit_ids'];
        unset($data['benefit_ids']);

        $job->update($data);
        $job->benefits()->sync($benefitIds);

        return redirect()->back()->with('success', 'Job updated successfully');
    }

    public function destroy(CountryJob $job)
    {
        $job->delete();

        return redirect()->back()->with('success', 'Job deleted successfully');
    }

    public function toggleStatus(CountryJob $job)
    {
        $job->status = $job->status === 'active' ? 'inactive' : 'active';
        $job->is_active = $job->status === 'active';
        $job->save();

        return redirect()->back()->with('success', 'Job status updated successfully');
    }

    private function validatedData(Request $request): array
    {
        $isDraft = $request->input('submit_action') === 'draft';

        $data = $request->validate([
            'job_country_id' => [$isDraft ? 'nullable' : 'required', 'exists:job_countries,id'],
            'job_country_location_id' => ['nullable', 'exists:job_country_locations,id'],
            'job_designation_id' => [$isDraft ? 'nullable' : 'required', 'exists:job_designations,id'],
            'job_employment_type_id' => ['nullable', 'exists:job_employment_types,id'],
            'title' => [$isDraft ? 'nullable' : 'required', 'string', 'max:255'],
            'employer' => ['nullable', 'string', 'max:255'],
            'vacancies' => ['nullable', 'integer', 'min:0'],
            'salary' => ['nullable', 'string', 'max:255'],
            'contract_duration' => ['nullable', 'string', 'max:255'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'overtime' => ['nullable', 'string', 'max:255'],
            'experience' => ['nullable', 'string', 'max:255'],
            'education' => ['nullable', 'string', 'max:255'],
            'age' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'benefits' => ['nullable', 'array'],
            'benefits.*' => ['integer', 'exists:job_benefits,id'],
            'visa_type' => ['nullable', 'string', 'max:255'],
            'visa_info' => ['nullable', 'string'],
            'deadline' => ['nullable', 'date'],
            'status' => ['nullable', 'in:active,inactive'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'additional_info' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['status'] = $isDraft ? 'draft' : ($data['status'] ?? 'active');
        $data['is_active'] = $data['status'] === 'active';
        $data['benefit_ids'] = $data['benefits'] ?? [];
        unset($data['benefits']);
        $data['designation'] = !empty($data['job_designation_id'])
            ? JobDesignation::find($data['job_designation_id'])?->name
            : null;
        $data['employment_type'] = !empty($data['job_employment_type_id'])
            ? JobEmploymentType::find($data['job_employment_type_id'])?->name
            : null;

        if (!empty($data['job_country_location_id'])) {
            $location = JobCountryLocation::find($data['job_country_location_id']);
            if ($location) {
                $data['job_country_id'] = $location->job_country_id;
                $data['location'] = $location->name;
            }
        } else {
            $data['location'] = null;
        }

        if ($isDraft && empty($data['title'])) {
            $data['title'] = 'Untitled Draft';
        }

        return $data;
    }
}
