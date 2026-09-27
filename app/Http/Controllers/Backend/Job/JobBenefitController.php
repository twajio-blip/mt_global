<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobBenefit;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobBenefitController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $benefits = JobBenefit::withCount('jobs')
            ->when($search, fn ($query) => $query->where('name', 'like', '%' . $search . '%'))
            ->when(in_array($status, ['active', 'inactive'], true), fn ($query) => $query->where('is_active', $status === 'active'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return view('backend.pages.job.benefit.index', compact('benefits', 'search', 'status'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        JobBenefit::create($data);

        return redirect()->back()->with('success', 'Benefit created successfully');
    }

    public function update(Request $request, JobBenefit $benefit)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $benefit->id);
        $data['is_active'] = $request->boolean('is_active');

        $benefit->update($data);

        return redirect()->back()->with('success', 'Benefit updated successfully');
    }

    public function destroy(JobBenefit $benefit)
    {
        $benefit->delete();

        return redirect()->back()->with('success', 'Benefit deleted successfully');
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 1;

        while (JobBenefit::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
