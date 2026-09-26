<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobDesignation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobDesignationController extends Controller
{
    public function index()
    {
        $designations = JobDesignation::withCount('jobs')->orderBy('name')->paginate(10);

        return view('backend.pages.job.designation.index', compact('designations'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        JobDesignation::create($data);

        return redirect()->back()->with('success', 'Designation created successfully');
    }

    public function update(Request $request, JobDesignation $designation)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $designation->id);
        $data['is_active'] = $request->boolean('is_active');

        $designation->update($data);

        return redirect()->back()->with('success', 'Designation updated successfully');
    }

    public function destroy(JobDesignation $designation)
    {
        $designation->delete();

        return redirect()->back()->with('success', 'Designation deleted successfully');
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 1;

        while (JobDesignation::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
