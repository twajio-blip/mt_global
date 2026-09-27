<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobDesignationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobDesignationCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $categories = JobDesignationCategory::withCount('designations')
            ->when($search, fn ($query) => $query->where('name', 'like', '%' . $search . '%'))
            ->when(in_array($status, ['active', 'inactive'], true), fn ($query) => $query->where('is_active', $status === 'active'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return view('backend.pages.job.category.index', compact('categories', 'search', 'status'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        JobDesignationCategory::create($data);

        return redirect()->back()->with('success', 'Category created successfully');
    }

    public function update(Request $request, JobDesignationCategory $category)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $category->id);
        $data['is_active'] = $request->boolean('is_active');

        $category->update($data);

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    public function destroy(JobDesignationCategory $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully');
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 1;

        while (JobDesignationCategory::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
