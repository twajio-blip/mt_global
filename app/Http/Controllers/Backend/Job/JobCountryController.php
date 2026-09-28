<?php

namespace App\Http\Controllers\Backend\Job;

use App\Http\Controllers\Controller;
use App\Models\JobCountry;
use App\Models\JobCountryLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobCountryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $countries = JobCountry::with('locations')
            ->withCount('jobs')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhereHas('locations', fn ($locationQuery) => $locationQuery->where('name', 'like', '%' . $search . '%'));
                });
            })
            ->when(in_array($status, ['active', 'inactive'], true), fn ($query) => $query->where('is_active', $status === 'active'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return view('backend.pages.job.country.index', compact('countries', 'search', 'status'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'flag_code' => ['nullable', 'string', 'size:2'],
            'locations' => ['nullable', 'array'],
            'locations.*' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['flag_code'] = $data['flag_code'] ? Str::lower($data['flag_code']) : null;
        $data['is_active'] = $request->boolean('is_active');
        $locations = $data['locations'] ?? [];
        unset($data['locations']);

        $country = JobCountry::create($data);
        $this->syncLocations($country, $locations);

        return redirect()->back()->with('success', 'Country created successfully');
    }

    public function update(Request $request, JobCountry $country)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'flag_code' => ['nullable', 'string', 'size:2'],
            'locations' => ['nullable', 'array'],
            'locations.*' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $country->id);
        $data['flag_code'] = $data['flag_code'] ? Str::lower($data['flag_code']) : null;
        $data['is_active'] = $request->boolean('is_active');
        $locations = $data['locations'] ?? [];
        unset($data['locations']);

        $country->update($data);
        $this->syncLocations($country, $locations);

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

    private function syncLocations(JobCountry $country, array|string|null $locations): void
    {
        $rawLocations = is_array($locations)
            ? $locations
            : preg_split('/[\r\n,]+/', (string) $locations);

        $names = collect($rawLocations)
            ->map(fn ($location) => trim($location))
            ->filter()
            ->unique(fn ($location) => Str::lower($location))
            ->values();

        $slugs = [];

        foreach ($names as $name) {
            $slug = Str::slug($name);
            $base = $slug ?: Str::slug($name . '-' . uniqid());
            $slug = $base;
            $count = 1;

            while (in_array($slug, $slugs, true)) {
                $slug = $base . '-' . $count;
                $count++;
            }

            $slugs[] = $slug;

            JobCountryLocation::updateOrCreate(
                [
                    'job_country_id' => $country->id,
                    'slug' => $slug,
                ],
                [
                    'name' => $name,
                    'is_active' => true,
                ]
            );
        }

        $country->locations()->whereNotIn('slug', $slugs)->delete();
    }
}
