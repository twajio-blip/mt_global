<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobEmploymentType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobEmploymentTypeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $employmentTypes = JobEmploymentType::withCount('jobs')
            ->when($search, fn ($query) => $query->where('name', 'like', '%' . $search . '%'))
            ->when(in_array($status, ['active', 'inactive'], true), fn ($query) => $query->where('is_active', $status === 'active'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return view('backend.pages.job.employment-type.index', compact('employmentTypes', 'search', 'status'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        JobEmploymentType::create($data);

        return redirect()->back()->with('success', 'Employment type created successfully');
    }

    public function update(Request $request, JobEmploymentType $employmentType)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $employmentType->id);
        $data['is_active'] = $request->boolean('is_active');

        $employmentType->update($data);

        return redirect()->back()->with('success', 'Employment type updated successfully');
    }

    public function destroy(JobEmploymentType $employmentType)
    {
        $employmentType->delete();

        return redirect()->back()->with('success', 'Employment type deleted successfully');
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 1;

        while (JobEmploymentType::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
