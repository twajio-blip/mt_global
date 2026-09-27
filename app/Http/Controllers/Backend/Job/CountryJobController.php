<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\CountryJob;
use App\Models\JobBenefit;
use App\Models\JobDesignation;
use App\Models\JobCountry;
use App\Models\JobCountryLocation;
use Illuminate\Http\Request;

class CountryJobController extends Controller
{
    public function index()
    {
        $search = request()->string('search')->toString();
        $status = request()->string('status')->toString();

        $jobs = CountryJob::with(['country', 'countryLocation', 'jobDesignation', 'benefits'])
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

        return view('backend.pages.job.job.index', compact('jobs', 'jobCounts', 'countries', 'locations', 'designations', 'benefits', 'search', 'status'));
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

    private function validatedData(Request $request): array
    {
        $isDraft = $request->input('submit_action') === 'draft';

        $data = $request->validate([
            'job_country_id' => [$isDraft ? 'nullable' : 'required', 'exists:job_countries,id'],
            'job_country_location_id' => ['nullable', 'exists:job_country_locations,id'],
            'job_designation_id' => [$isDraft ? 'nullable' : 'required', 'exists:job_designations,id'],
            'title' => [$isDraft ? 'nullable' : 'required', 'string', 'max:255'],
            'employer' => ['nullable', 'string', 'max:255'],
            'vacancies' => ['nullable', 'integer', 'min:0'],
            'salary' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:255'],
            'benefits' => ['nullable', 'array'],
            'benefits.*' => ['integer', 'exists:job_benefits,id'],
            'deadline' => ['nullable', 'date'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['status'] = $isDraft ? 'draft' : ($request->boolean('is_active') ? 'active' : 'inactive');
        $data['is_active'] = $data['status'] === 'active';
        $data['benefit_ids'] = $data['benefits'] ?? [];
        unset($data['benefits']);
        $data['designation'] = !empty($data['job_designation_id'])
            ? JobDesignation::find($data['job_designation_id'])?->name
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
