<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use App\Models\Country;
use App\Models\Designation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SetupController extends Controller
{
    public function countries(Request $request): Response
    {
        $query = Country::withCount('jobs')->orderBy('name');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_bn', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        $countries = $query->paginate(10)->withQueryString();

        return Inertia::render('Portal/Setup/Countries', [
            'countries' => $countries,
            'filters' => $request->only(['search']),
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

    public function designations(Request $request): Response
    {
        $query = Designation::withCount('jobs')->orderBy('name');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_bn', 'like', "%{$search}%");
            });
        }

        $designations = $query->paginate(10)->withQueryString();

        return Inertia::render('Portal/Setup/Designations', [
            'designations' => $designations,
            'filters' => $request->only(['search']),
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

    /**
     * Show company profile & branding setup
     */
    public function company(): Response
    {
        $company = CompanySetting::getSettings();

        return Inertia::render('Portal/Setup/Company', [
            'company' => $company,
        ]);
    }

    /**
     * Update company details, logo, and QR code image
     */
    public function updateCompany(Request $request): RedirectResponse
    {
        $company = CompanySetting::getSettings();

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:1000',
            'website' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'qr_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'remove_logo' => 'nullable|boolean',
            'remove_qr_image' => 'nullable|boolean',
        ]);

        $data = [
            'company_name' => $validated['company_name'],
            'company_email' => $validated['company_email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'website' => $validated['website'] ?? null,
        ];

        // Handle Logo Upload or Removal
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('company', 'public');
            $data['logo_path'] = '/storage/' . $logoPath;
        } elseif ($request->boolean('remove_logo')) {
            $data['logo_path'] = null;
        }

        // Handle QR Code Upload or Removal
        if ($request->hasFile('qr_image')) {
            $qrPath = $request->file('qr_image')->store('company', 'public');
            $data['qr_image_path'] = '/storage/' . $qrPath;
        } elseif ($request->boolean('remove_qr_image')) {
            $data['qr_image_path'] = null;
        }

        $company->update($data);

        return back()->with('success', 'Company profile setup updated successfully!');
    }
}
