<div id="{{ $panelId }}" data-job-panel class="hidden fixed inset-0 z-[100] bg-black/60 p-4 overflow-y-auto">
    <div class="mx-auto my-10 max-w-4xl bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
        <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">{{ $title }}</h3>
            <button type="button" data-close-job-panel class="text-xl">&times;</button>
        </div>

        <form id="{{ $formId }}" action="{{ $formAction }}" method="POST" class="space-y-4">
            @csrf
            @if ($method === 'PUT')
                @method('PUT')
            @endif

            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Country'" for="job_country_id" />
                    <div class="relative job-combobox" data-job-combobox="country">
                        <input type="hidden" name="job_country_id" data-country-select required>
                        <input type="text" data-job-combobox-search class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Select country" autocomplete="off">
                        <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Job Title'" for="title" />
                    <x-backend.input-field type="text" name="title" placeholder="Job title" required />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Designation'" for="designation" />
                    <div class="relative job-combobox" data-job-combobox="designation">
                        <input type="hidden" name="job_designation_id" required>
                        <input type="text" data-job-combobox-search class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Select designation" autocomplete="off">
                        <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Location'" for="location" />
                    <div class="relative job-combobox" data-job-combobox="location">
                        <input type="hidden" name="job_country_location_id" data-location-select>
                        <input type="text" data-job-combobox-search class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Select location" autocomplete="off">
                        <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Employer'" for="employer" />
                    <x-backend.input-field type="text" name="employer" placeholder="Employer" />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Vacancies'" for="vacancies" />
                    <x-backend.input-field type="number" name="vacancies" placeholder="Vacancies" />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Salary'" for="salary" />
                    <x-backend.input-field type="text" name="salary" placeholder="Salary" />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Employment Type'" for="employment_type" />
                    <x-backend.input-field type="text" name="employment_type" placeholder="Full-time" />
                </div>
                <div class="col-span-12">
                    <x-backend.input-label :value="'Benefits / Facilities'" />
                    <div class="grid grid-cols-1 gap-3 rounded-[10px] border border-default border-opacity-25 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        @forelse ($benefits as $benefit)
                            <label class="flex items-center gap-2 text-sm">
                                <input type="checkbox" name="benefits[]" value="{{ $benefit->id }}" class="rounded border-default bg-skin-backend-secondary">
                                {{ $benefit->name }}
                            </label>
                        @empty
                            <p class="col-span-full text-sm text-skin-backend-text-base text-opacity-60">Add active benefits first from Jobs > Benefits.</p>
                        @endforelse
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Deadline'" for="deadline" />
                    <x-backend.input-field type="date" name="deadline" />
                </div>
                <div class="col-span-12">
                    <x-backend.input-label :value="'Short Description'" for="short_description" />
                    <textarea name="short_description" rows="3" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base text-opacity-50 rounded-[4px]" placeholder="Short description"></textarea>
                </div>
                <div class="col-span-12">
                    <x-backend.input-label :value="'Description'" for="description" />
                    <textarea name="description" rows="5" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base text-opacity-50 rounded-[4px]" placeholder="Description"></textarea>
                </div>
                <div class="col-span-12">
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="is_active" value="1" checked class="rounded border-default bg-skin-backend-secondary">
                        Active
                    </label>
                </div>
            </div>

            <div class="flex flex-wrap gap-2">
                <button type="submit" name="submit_action" value="save" class="px-8 py-2.5 bg-skin-backend-accent text-skin-invert rounded-[10px] text-xs font-semibold">
                    Save Job
                </button>
                <button type="submit" name="submit_action" value="draft" formnovalidate class="px-8 py-2.5 border border-default border-opacity-25 text-skin-backend-text-base rounded-[10px] text-xs font-semibold hover:bg-[#323232]">
                    Save as Draft
                </button>
            </div>
        </form>
    </div>
</div>
