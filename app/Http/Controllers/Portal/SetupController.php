<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Designation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SetupController extends Controller
{
    public function countries(): Response
    {
        $countries = Country::withCount('jobs')->orderBy('name')->get();
        return Inertia::render('Portal/Setup/Countries', [
            'countries' => $countries,
        ]);
    }

    public function storeCountry(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:countries,name',
            'name_bn' => 'nullable|string|max:100',
            'code' => 'nullable|string|max:5',
            'flag_emoji' => 'nullable|string|max:20',
        ]);

        Country::create($validated);
        return back()->with('success', "Country {$validated['name']} added successfully!");
    }

    public function updateCountry(Request $request, Country $country): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('countries', 'name')->ignore($country->id)],
            'name_bn' => ['nullable', 'string', 'max:100'],
            'code' => ['nullable', 'string', 'max:5'],
            'flag_emoji' => ['nullable', 'string', 'max:20'],
        ]);

        $country->update($validated);
        return back()->with('success', "Country {$country->name} updated successfully!");
    }

    public function toggleCountry(Country $country): RedirectResponse
    {
        $country->update(['is_active' => !$country->is_active]);
        return back()->with('success', "Country {$country->name} status updated.");
    }

    public function designations(): Response
    {
        $designations = Designation::withCount('jobs')->orderBy('name')->get();
        return Inertia::render('Portal/Setup/Designations', [
            'designations' => $designations,
        ]);
    }

    public function storeDesignation(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:designations,name',
            'name_bn' => 'nullable|string|max:100',
        ]);

        Designation::create($validated);
        return back()->with('success', "Designation {$validated['name']} added successfully!");
    }

    public function updateDesignation(Request $request, Designation $designation): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('designations', 'name')->ignore($designation->id)],
            'name_bn' => ['nullable', 'string', 'max:100'],
        ]);

        $designation->update($validated);
        return back()->with('success', "Designation {$designation->name} updated successfully!");
    }

    public function toggleDesignation(Designation $designation): RedirectResponse
    {
        $designation->update(['is_active' => !$designation->is_active]);
        return back()->with('success', "Designation {$designation->name} status updated.");
    }
}
