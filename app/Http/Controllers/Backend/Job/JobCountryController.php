<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobCountryController extends Controller
{
    public function index()
    {
        $countries = JobCountry::withCount('jobs')->orderBy('name')->paginate(10);

        return view('backend.pages.job.country.index', compact('countries'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_active'] = $request->boolean('is_active');

        JobCountry::create($data);

        return redirect()->back()->with('success', 'Country created successfully');
    }

    public function update(Request $request, JobCountry $country)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $country->id);
        $data['is_active'] = $request->boolean('is_active');

        $country->update($data);

        return redirect()->back()->with('success', 'Country updated successfully');
    }

    public function destroy(JobCountry $country)
    {
        $country->delete();

        return redirect()->back()->with('success', 'Country deleted successfully');
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 1;

        while (JobCountry::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
