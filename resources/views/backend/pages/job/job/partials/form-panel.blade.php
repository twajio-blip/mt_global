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
                    <select name="job_country_id" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base text-opacity-50 rounded-[4px]" required>
                        <option value="">Select country</option>
                        @foreach ($countries as $country)
                            <option value="{{ $country->id }}">{{ $country->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Job Title'" for="title" />
                    <x-backend.input-field type="text" name="title" placeholder="Job title" required />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Designation'" for="designation" />
                    <select name="job_designation_id" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base text-opacity-50 rounded-[4px]" required>
                        <option value="">Select designation</option>
                        @foreach ($designations as $designation)
                            <option value="{{ $designation->id }}">{{ $designation->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <x-backend.input-label :value="'Location'" for="location" />
                    <x-backend.input-field type="text" name="location" placeholder="Location" />
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

            <button type="submit" class="px-8 py-2.5 bg-skin-backend-accent text-skin-invert rounded-[10px] text-xs font-semibold">
                Save Job
            </button>
        </form>
    </div>
</div>
