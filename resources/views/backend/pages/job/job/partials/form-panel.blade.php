<div id="{{ $panelId }}" data-job-panel class="hidden fixed inset-0 z-[100] bg-black/60 p-4 overflow-y-auto">
    <div class="mx-auto my-10 max-w-5xl bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
        <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">{{ $title }}</h3>
            <button type="button" data-close-job-panel class="text-xl">&times;</button>
        </div>

        <form id="{{ $formId }}" action="{{ $formAction }}" method="POST" class="space-y-5 job-admin-fields">
            @csrf
            @if ($method === 'PUT')
                @method('PUT')
            @endif

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Basic Information</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Job Title'" for="title" />
                        <x-backend.input-field type="text" name="title" placeholder="e.g. Electrical Technician" required />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Designation'" for="designation" />
                        <div class="relative job-combobox" data-job-combobox="designation">
                            <input type="hidden" name="job_designation_id" required>
                            <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                            <input type="text" data-job-combobox-search class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Choose designation" autocomplete="off">
                            <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Country'" for="job_country_id" />
                        <div class="relative job-combobox" data-job-combobox="country">
                            <input type="hidden" name="job_country_id" data-country-select required>
                            <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                            <input type="text" data-job-combobox-search class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Select country" autocomplete="off">
                            <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Job Location'" for="location" />
                        <div class="relative job-combobox" data-job-combobox="location">
                            <input type="hidden" name="job_country_location_id" data-location-select>
                            <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                            <input type="text" data-job-combobox-search class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="City or site" autocomplete="off">
                            <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Employer / Company Name'" for="employer" />
                        <x-backend.input-field type="text" name="employer" placeholder="Employer / company name" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Number of Vacancies'" for="vacancies" />
                        <x-backend.input-field type="number" name="vacancies" placeholder="e.g. 25" />
                    </div>
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Employment Information</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Salary'" for="salary" />
                        <x-backend.input-field type="text" name="salary" placeholder="e.g. SAR 2,000 - 2,500 / month" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Employment Type'" for="employment_type" />
                        <div class="relative job-combobox" data-job-combobox="employmentType">
                            <input type="hidden" name="job_employment_type_id">
                            <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                            <input type="text" data-job-combobox-search class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Not specified" autocomplete="off">
                            <div data-job-combobox-options class="absolute left-0 right-0 top-full z-50 mt-1 hidden max-h-56 overflow-y-auto rounded-[8px] border border-default border-opacity-25 bg-skin-backend-secondary shadow-lg"></div>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Contract Duration'" for="contract_duration" />
                        <x-backend.input-field type="text" name="contract_duration" placeholder="e.g. 2 years (renewable)" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Working Hours'" for="working_hours" />
                        <x-backend.input-field type="text" name="working_hours" placeholder="e.g. 8 hours/day, 6 days/week" />
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Overtime Information'" for="overtime" />
                        <x-backend.input-field type="text" name="overtime" placeholder="e.g. Paid as per labour law" />
                    </div>
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Requirements</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Experience Requirement'" for="experience" />
                        <x-backend.input-field type="text" name="experience" placeholder="e.g. Minimum 3 years" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Education Requirement'" for="education" />
                        <x-backend.input-field type="text" name="education" placeholder="e.g. Diploma in Electrical" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Age Requirement'" for="age" />
                        <x-backend.input-field type="text" name="age" placeholder="e.g. 22 - 40 years" />
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Gender Requirement'" for="gender" />
                        <div class="relative">
                            <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                            <select name="gender" class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]">
                                <option value="">Not applicable</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Male / Female">Male / Female</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Benefits / Facilities</h4>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    @forelse ($benefits as $benefit)
                        <label class="flex cursor-pointer items-center justify-between gap-3 rounded-[8px] border border-default border-opacity-25 p-3 text-sm transition-colors hover:bg-[#323232]">
                            <span>{{ $benefit->name }} Provided</span>
                            <input type="checkbox" name="benefits[]" value="{{ $benefit->id }}" class="peer sr-only">
                            <span class="relative h-6 w-11 shrink-0 rounded-full bg-[#3A3A3A] transition-colors after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-skin-backend-text-base after:transition-transform peer-checked:bg-skin-backend-accent peer-checked:after:translate-x-5 peer-checked:after:bg-skin-invert"></span>
                        </label>
                    @empty
                        <p class="col-span-full text-sm text-skin-backend-text-base text-opacity-60">Add active benefits first from Jobs > Benefits.</p>
                    @endforelse
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Visa Information</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Visa Type'" for="visa_type" />
                        <x-backend.input-field type="text" name="visa_type" placeholder="e.g. Employment / Work Visa" />
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Work Visa / Employment Visa Information'" for="visa_info" />
                        <textarea name="visa_info" rows="4" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="e.g. Employment visa sponsored by the employer..."></textarea>
                    </div>
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Job Content</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Short Description'" for="short_description" />
                        <textarea name="short_description" rows="3" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Short overview for job cards"></textarea>
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Job Description'" for="description" />
                        <textarea name="description" rows="5" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Short overview of the role and employer"></textarea>
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Responsibilities'" for="responsibilities" />
                        <textarea name="responsibilities" rows="4" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Use a bulleted list for daily duties"></textarea>
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Requirements'" for="requirements" />
                        <textarea name="requirements" rows="4" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Skills, certificates, licences..."></textarea>
                    </div>
                    <div class="col-span-12">
                        <x-backend.input-label :value="'Additional Information'" for="additional_info" />
                        <textarea name="additional_info" rows="4" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Interview or trade test details, notes..."></textarea>
                    </div>
                </div>
            </section>

            <section class="rounded-[10px] border border-default border-opacity-25 p-4">
                <h4 class="mb-4 text-sm font-semibold">Application</h4>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-6">
                        <x-backend.input-label :value="'Application Deadline'" for="deadline" />
                        <x-backend.input-field type="date" name="deadline" />
                    </div>
                    <fieldset class="col-span-12">
                        <legend class="mb-2 text-sm font-medium">Status</legend>
                        <div class="grid gap-2 sm:grid-cols-2">
                            <label class="flex cursor-pointer items-start gap-3 rounded-[8px] border border-default border-opacity-25 p-3">
                                <input type="radio" name="status" value="active" checked class="mt-0.5">
                                <span>
                                    <span class="block text-sm font-medium">Published</span>
                                    <span class="block text-xs text-skin-backend-text-base text-opacity-50">Live on the website</span>
                                </span>
                            </label>
                            <label class="flex cursor-pointer items-start gap-3 rounded-[8px] border border-default border-opacity-25 p-3">
                                <input type="radio" name="status" value="inactive" class="mt-0.5">
                                <span>
                                    <span class="block text-sm font-medium">Inactive</span>
                                    <span class="block text-xs text-skin-backend-text-base text-opacity-50">Hidden, kept for records</span>
                                </span>
                            </label>
                        </div>
                    </fieldset>
                </div>
            </section>

            <div class="sticky bottom-[-1.5rem] -mx-6 -mb-6 flex flex-wrap justify-end gap-2 rounded-b-[10px] border-t border-default border-opacity-25 bg-skin-backend-secondary px-6 py-4">
                <button type="submit" name="submit_action" value="draft" formnovalidate class="px-8 py-2.5 border border-default border-opacity-25 text-skin-backend-text-base rounded-[10px] text-xs font-semibold hover:bg-[#323232]">
                    Save Draft
                </button>
                <button type="submit" name="submit_action" value="save" class="px-8 py-2.5 bg-skin-backend-accent text-skin-invert rounded-[10px] text-xs font-semibold">
                    Save Job
                </button>
            </div>
        </form>
    </div>
</div>
