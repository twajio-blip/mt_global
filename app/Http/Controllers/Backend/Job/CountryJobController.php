<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\CountryJob;
use App\Models\JobDesignation;
use App\Models\JobCountry;
use Illuminate\Http\Request;

class CountryJobController extends Controller
{
    public function index()
    {
        $jobs = CountryJob::with(['country', 'jobDesignation'])->latest()->paginate(10);
        $countries = JobCountry::where('is_active', true)->orderBy('name')->get();
        $designations = JobDesignation::where('is_active', true)->orderBy('name')->get();

        return view('backend.pages.job.job.index', compact('jobs', 'countries', 'designations'));
    }

    public function store(Request $request)
    {
        CountryJob::create($this->validatedData($request));

        return redirect()->back()->with('success', 'Job created successfully');
    }

    public function update(Request $request, CountryJob $job)
    {
        $job->update($this->validatedData($request));

        return redirect()->back()->with('success', 'Job updated successfully');
    }

    public function destroy(CountryJob $job)
    {
        $job->delete();

        return redirect()->back()->with('success', 'Job deleted successfully');
    }

    private function validatedData(Request $request): array
    {
        $data = $request->validate([
            'job_country_id' => ['required', 'exists:job_countries,id'],
            'job_designation_id' => ['required', 'exists:job_designations,id'],
            'title' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'employer' => ['nullable', 'string', 'max:255'],
            'vacancies' => ['nullable', 'integer', 'min:0'],
            'salary' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');
        $data['designation'] = JobDesignation::find($data['job_designation_id'])?->name;

        return $data;
    }
}
