<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\AllCv;
use App\Models\JobCountry;
use App\Models\JobDesignation;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $countryId = $request->string('country')->toString();
        $designationId = $request->string('designation')->toString();

        $applications = AllCv::with(['job.country', 'job.countryLocation', 'job.jobDesignation'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('full_name', 'like', '%' . $search . '%')
                        ->orWhere('phone', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%')
                        ->orWhereHas('job', fn ($jobQuery) => $jobQuery
                            ->where('title', 'like', '%' . $search . '%')
                            ->orWhere('employer', 'like', '%' . $search . '%'));
                });
            })
            ->when($countryId, fn ($query) => $query->whereHas('job', fn ($jobQuery) => $jobQuery->where('job_country_id', $countryId)))
            ->when($designationId, fn ($query) => $query->whereHas('job', fn ($jobQuery) => $jobQuery->where('job_designation_id', $designationId)))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $countries = JobCountry::orderBy('name')->get();
        $designations = JobDesignation::orderBy('name')->get();

        return view('backend.pages.job.application.index', compact('applications', 'countries', 'designations', 'search', 'countryId', 'designationId'));
    }

    public function destroy(AllCv $cv)
    {
        $path = public_path($cv->cv_file_path);
        if (is_file($path)) {
            unlink($path);
        }

        $cv->delete();

        return redirect()->back()->with('success', 'CV application deleted successfully');
    }
}
