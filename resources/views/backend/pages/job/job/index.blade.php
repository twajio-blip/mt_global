<x-Deshboard-layout>
    <div class="py-10 job-admin-fields">
        <div class="space-y-4">
            <div class="md:flex md:justify-between md:items-center space-y-4 md:space-y-0">
                <div class="space-y-2 max-w-[350px] text-skin-backend-text-base">
                    <h2 class="text-[24px]">
                        <a href="{{ route('dashboard') }}" class="font-bold text-skin-backend-text-base">Dashboard</a> /
                        <span class="text-skin-backend-text-base text-opacity-50">Manage Jobs</span>
                    </h2>
                    <p class="text-[14px] text-skin-backend-text-base text-opacity-50">
                        Add jobs under countries. These records feed the home page country and designation lists.
                    </p>
                </div>

                <button type="button" id="open-create-job"
                    class="py-2.5 px-4 inline-flex items-center gap-x-2 text-xs font-[600] rounded-[10px] bg-skin-backend-accent text-skin-invert">
                    <i class="fa-solid fa-plus"></i>
                    Add Job
                </button>
            </div>

            <div class="bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
                <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    @php
                        $tabs = [
                            '' => ['label' => 'All', 'count' => $jobCounts['all'] ?? 0],
                            'active' => ['label' => 'Active', 'count' => $jobCounts['active'] ?? 0],
                            'draft' => ['label' => 'Draft', 'count' => $jobCounts['draft'] ?? 0],
                            'inactive' => ['label' => 'Inactive', 'count' => $jobCounts['inactive'] ?? 0],
                        ];
                    @endphp
                    <div class="flex flex-wrap gap-2">
                        @foreach ($tabs as $tabValue => $tab)
                            <a
                                href="{{ route('jobs.jobs.index', array_filter(['status' => $tabValue, 'search' => $search ?? null], fn ($value) => $value !== null && $value !== '')) }}"
                                class="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-xs font-semibold transition-colors {{ ($status ?? '') === $tabValue ? 'bg-skin-backend-accent text-skin-invert' : 'border border-default border-opacity-25 text-skin-backend-text-base hover:bg-[#323232]' }}">
                                {{ $tab['label'] }}
                                <span class="rounded bg-black/20 px-1.5 py-0.5 text-[11px] tabular-nums">{{ $tab['count'] }}</span>
                            </a>
                        @endforeach
                    </div>

                    <form method="GET" action="{{ route('jobs.jobs.index') }}" class="flex w-full gap-2 lg:w-[360px]">
                        @if (!empty($status))
                            <input type="hidden" name="status" value="{{ $status }}">
                        @endif
                        <input
                            type="search"
                            name="search"
                            value="{{ $search ?? '' }}"
                            class="min-w-0 flex-1 py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]"
                            placeholder="Search name, country, designation, employer">
                        <button type="submit" class="rounded-[8px] bg-skin-backend-accent px-4 py-2 text-xs font-semibold text-skin-invert">
                            Search
                        </button>
                    </form>
                </div>

                <div class="w-full overflow-x-auto">
                    <table class="min-w-full divide-y divide-[#ffffff06] text-[14px]">
                        <thead class="bg-[#323232] font-bold">
                            <tr>
                                <th class="py-3 text-start min-w-[180px]"><h2 class="px-6">Job Title</h2></th>
                                <th class="py-3 text-start min-w-[140px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Country</h2></th>
                                <th class="py-3 text-start min-w-[150px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Designation</h2></th>
                                <th class="py-3 text-start min-w-[160px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Employer</h2></th>
                                <th class="py-3 text-right min-w-[90px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Vacancy</h2></th>
                                <th class="py-3 text-start min-w-[120px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Published</h2></th>
                                <th class="py-3 text-start min-w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Status</h2></th>
                                <th class="py-3 text-right min-w-[70px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">CVs</h2></th>
                                <th class="py-3 text-center w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Action</h2></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#ffffff06]">
                            @forelse ($jobs as $job)
                                <tr>
                                    <td class="py-3 px-6 font-medium">{{ $job->title }}</td>
                                    <td class="py-3">{{ $job->country?->name }}</td>
                                    <td class="py-3">{{ $job->jobDesignation?->name ?? $job->designation }}</td>
                                    <td class="py-3 max-w-[180px] truncate" title="{{ $job->employer }}">{{ $job->employer }}</td>
                                    <td class="py-3 px-4 text-right tabular-nums">{{ $job->vacancies }}</td>
                                    <td class="py-3 whitespace-nowrap">{{ $job->created_at?->format('M d, Y') }}</td>
                                    <td class="py-3">{{ ucfirst($job->status ?? ($job->is_active ? 'active' : 'inactive')) }}</td>
                                    <td class="py-3 px-4 text-right tabular-nums">0</td>
                                    <td class="py-3 text-center">
                                        <div class="inline-flex items-center justify-end gap-1">
                                            <a href="{{ route('job.view', $job->id) }}" target="_blank"
                                                class="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border border-default border-opacity-25 text-skin-backend-text-base hover:bg-[#323232]"
                                                title="View" aria-label="View {{ $job->title }}">
                                                <i class="fa-solid fa-eye"></i>
                                            </a>
                                            <button type="button"
                                                class="edit-job inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border border-default border-opacity-25 text-skin-backend-text-base hover:bg-[#323232]"
                                                title="Edit" aria-label="Edit {{ $job->title }}"
                                                data-job='@json($job)'>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <form action="{{ route('jobs.jobs.toggle-status', $job) }}" method="POST">
                                                @csrf
                                                @method('PATCH')
                                                <button type="submit"
                                                    class="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border border-default border-opacity-25 {{ ($job->status ?? null) === 'active' ? 'text-skin-backend-accent-text' : 'text-skin-backend-text-base' }} hover:bg-[#323232]"
                                                    title="{{ ($job->status ?? null) === 'active' ? 'Deactivate' : 'Activate' }}"
                                                    aria-label="{{ ($job->status ?? null) === 'active' ? 'Deactivate' : 'Activate' }} {{ $job->title }}">
                                                    <i class="fa-solid fa-power-off"></i>
                                                </button>
                                            </form>
                                            <form action="{{ route('jobs.jobs.destroy', $job) }}" method="POST" onsubmit="return confirm('Delete this job?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit"
                                                    class="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border border-default border-opacity-25 text-[#E61714] hover:bg-[#323232]"
                                                    title="Delete" aria-label="Delete {{ $job->title }}">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="9" class="px-4 py-3 text-center text-gray-500">No job found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="float-right mt-3">
                <x-backend.pagination :paginator="$jobs" />
            </div>
        </div>
    </div>

    @include('backend.pages.job.job.partials.form-panel', ['panelId' => 'create-job-panel', 'formId' => 'create-job-form', 'formAction' => route('jobs.jobs.store'), 'method' => 'POST', 'title' => 'Add Job'])
    @include('backend.pages.job.job.partials.form-panel', ['panelId' => 'edit-job-panel', 'formId' => 'edit-job-form', 'formAction' => '#', 'method' => 'PUT', 'title' => 'Edit Job'])

    @if ($message = Session::get('success'))
        <x-backend.flash-error :message="$message" :type="'success'" />
    @endif
</x-Deshboard-layout>

<script>
    const createPanel = document.getElementById('create-job-panel');
    const editPanel = document.getElementById('edit-job-panel');
    @php
        $jobCountryOptions = $countries->map(fn ($country) => [
            'id' => $country->id,
            'name' => $country->name,
        ])->values();
        $jobDesignationOptions = $designations->map(fn ($designation) => [
            'id' => $designation->id,
            'name' => $designation->name,
        ])->values();
        $jobLocationOptions = $locations->map(fn ($location) => [
            'id' => $location->id,
            'name' => $location->name,
            'country_id' => $location->job_country_id,
            'label' => $location->name . ($location->country ? ' - ' . $location->country->name : ''),
        ])->values();
        $jobEmploymentTypeOptions = $employmentTypes->map(fn ($employmentType) => [
            'id' => $employmentType->id,
            'name' => $employmentType->name,
        ])->values();
    @endphp
    const jobComboboxData = {
        country: @json($jobCountryOptions),
        designation: @json($jobDesignationOptions),
        location: @json($jobLocationOptions),
        employmentType: @json($jobEmploymentTypeOptions),
    };

    document.getElementById('open-create-job').addEventListener('click', function() {
        const createForm = document.getElementById('create-job-form');
        createForm.reset();
        setJobRadioValue(createForm, 'status', 'active');
        resetJobComboboxes(createForm);
        createPanel.classList.remove('hidden');
    });

    document.querySelectorAll('[data-close-job-panel]').forEach(function(button) {
        button.addEventListener('click', function() {
            button.closest('[data-job-panel]').classList.add('hidden');
        });
    });

    document.querySelectorAll('[data-job-panel]').forEach(function(panel) {
        panel.addEventListener('click', function(event) {
            if (event.target === panel) {
                panel.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('.edit-job').forEach(function(button) {
        button.addEventListener('click', function() {
            const job = JSON.parse(this.dataset.job);
            const form = document.getElementById('edit-job-form');

            form.action = "{{ route('jobs.jobs.update', ':id') }}".replace(':id', job.id);
            form.querySelector('[name="title"]').value = job.title || '';
            form.querySelector('[name="employer"]').value = job.employer || '';
            form.querySelector('[name="vacancies"]').value = job.vacancies || '';
            form.querySelector('[name="salary"]').value = job.salary || '';
            form.querySelector('[name="contract_duration"]').value = job.contract_duration || '';
            form.querySelector('[name="working_hours"]').value = job.working_hours || '';
            form.querySelector('[name="overtime"]').value = job.overtime || '';
            form.querySelector('[name="experience"]').value = job.experience || '';
            form.querySelector('[name="education"]').value = job.education || '';
            form.querySelector('[name="age"]').value = job.age || '';
            form.querySelector('[name="gender"]').value = job.gender || '';
            const selectedBenefitIds = (job.benefits || []).map(function(benefit) {
                return String(benefit.id);
            });
            form.querySelectorAll('[name="benefits[]"]').forEach(function(input) {
                input.checked = selectedBenefitIds.includes(String(input.value));
            });
            form.querySelector('[name="visa_type"]').value = job.visa_type || '';
            form.querySelector('[name="visa_info"]').value = job.visa_info || '';
            form.querySelector('[name="deadline"]').value = job.deadline ? String(job.deadline).substring(0, 10) : '';
            form.querySelector('[name="short_description"]').value = job.short_description || '';
            form.querySelector('[name="description"]').value = job.description || '';
            form.querySelector('[name="responsibilities"]').value = job.responsibilities || '';
            form.querySelector('[name="requirements"]').value = job.requirements || '';
            form.querySelector('[name="additional_info"]').value = job.additional_info || '';
            setJobRadioValue(form, 'status', job.status === 'inactive' ? 'inactive' : 'active');
            setJobComboboxValue(form, 'country', job.job_country_id || '');
            setJobComboboxValue(form, 'designation', job.job_designation_id || '');
            setJobComboboxValue(form, 'location', job.job_country_location_id || '');
            setJobComboboxValue(form, 'employmentType', job.job_employment_type_id || '');
            editPanel.classList.remove('hidden');
        });
    });

    function escapeJobText(value) {
        return String(value).replace(/[&<>"']/g, function(char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[char];
        });
    }

    function getJobComboboxRoot(form, type) {
        return form.querySelector('[data-job-combobox="' + type + '"]');
    }

    function setJobRadioValue(form, name, value) {
        form.querySelectorAll('[name="' + name + '"]').forEach(function(input) {
            input.checked = input.value === value;
        });
    }

    function getJobComboboxItems(form, type) {
        const items = jobComboboxData[type] || [];

        if (type !== 'location') {
            return items;
        }

        const countryValue = form.querySelector('[name="job_country_id"]')?.value || '';
        return countryValue
            ? items.filter(function(item) { return String(item.country_id) === String(countryValue); })
            : items;
    }

    function setJobComboboxValue(form, type, id) {
        const root = getJobComboboxRoot(form, type);
        if (!root) return;

        const hidden = root.querySelector('input[type="hidden"]');
        const search = root.querySelector('[data-job-combobox-search]');
        const allItems = jobComboboxData[type] || [];
        const item = allItems.find(function(entry) {
            return String(entry.id) === String(id);
        });

        hidden.value = item ? item.id : '';
        search.value = item ? (item.label || item.name) : '';

        if (type === 'country') {
            setJobComboboxValue(form, 'location', '');
        }
    }

    function resetJobComboboxes(form) {
        ['country', 'designation', 'location', 'employmentType'].forEach(function(type) {
            setJobComboboxValue(form, type, '');
        });
    }

    function renderJobComboboxOptions(form, root) {
        const type = root.dataset.jobCombobox;
        const search = root.querySelector('[data-job-combobox-search]');
        const options = root.querySelector('[data-job-combobox-options]');
        const query = search.value.trim().toLowerCase();
        const items = getJobComboboxItems(form, type).filter(function(item) {
            const label = item.label || item.name;
            return query === '' || label.toLowerCase().startsWith(query) || label.toLowerCase().includes(query);
        });

        options.innerHTML = items.length
            ? items.map(function(item) {
                return `<button type="button" data-job-option-id="${item.id}" class="block w-full px-4 py-2 text-left text-sm text-skin-backend-text-base hover:bg-[#323232]">${escapeJobText(item.label || item.name)}</button>`;
            }).join('')
            : '<div class="px-4 py-2 text-sm text-skin-backend-text-base text-opacity-50">No option found</div>';

        options.classList.remove('hidden');
    }

    document.querySelectorAll('[data-job-panel] form').forEach(function(form) {
        form.querySelectorAll('[data-job-combobox]').forEach(function(root) {
            const search = root.querySelector('[data-job-combobox-search]');
            const hidden = root.querySelector('input[type="hidden"]');
            const options = root.querySelector('[data-job-combobox-options]');
            const type = root.dataset.jobCombobox;

            search.addEventListener('focus', function() {
                renderJobComboboxOptions(form, root);
            });

            search.addEventListener('input', function() {
                hidden.value = '';
                renderJobComboboxOptions(form, root);
            });

            options.addEventListener('click', function(event) {
                const option = event.target.closest('[data-job-option-id]');
                if (!option) return;

                const item = (jobComboboxData[type] || []).find(function(entry) {
                    return String(entry.id) === String(option.dataset.jobOptionId);
                });

                if (!item) return;

                if (type === 'location' && item.country_id) {
                    setJobComboboxValue(form, 'country', item.country_id);
                    setJobComboboxValue(form, 'location', item.id);
                } else {
                    setJobComboboxValue(form, type, item.id);
                }

                options.classList.add('hidden');
            });
        });
    });

    document.addEventListener('click', function(event) {
        document.querySelectorAll('[data-job-combobox]').forEach(function(root) {
            if (!root.contains(event.target)) {
                root.querySelector('[data-job-combobox-options]').classList.add('hidden');
            }
        });
    });
</script>
