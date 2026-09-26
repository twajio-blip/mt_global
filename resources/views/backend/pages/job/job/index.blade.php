<x-Deshboard-layout>
    <div class="py-10">
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
                <div class="w-full overflow-x-auto">
                    <table class="min-w-full divide-y divide-[#ffffff06] text-[14px]">
                        <thead class="bg-[#323232] font-bold">
                            <tr>
                                <th class="py-3 text-start min-w-[160px]"><h2 class="px-6">Title</h2></th>
                                <th class="py-3 text-start min-w-[140px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Country</h2></th>
                                <th class="py-3 text-start min-w-[140px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Designation</h2></th>
                                <th class="py-3 text-start min-w-[80px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Vacancies</h2></th>
                                <th class="py-3 text-start min-w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Status</h2></th>
                                <th class="py-3 text-center w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Action</h2></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#ffffff06]">
                            @forelse ($jobs as $job)
                                <tr>
                                    <td class="py-3 px-6">{{ $job->title }}</td>
                                    <td class="py-3">{{ $job->country?->name }}</td>
                                    <td class="py-3">{{ $job->jobDesignation?->name ?? $job->designation }}</td>
                                    <td class="py-3">{{ $job->vacancies }}</td>
                                    <td class="py-3">{{ $job->is_active ? 'Active' : 'Inactive' }}</td>
                                    <td class="py-3 text-center">
                                        <div class="inline-flex gap-2">
                                            <button type="button"
                                                class="edit-job inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#3762ED]"
                                                data-job='@json($job)'>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <form action="{{ route('jobs.jobs.destroy', $job) }}" method="POST" onsubmit="return confirm('Delete this job?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#E61714]">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="px-4 py-3 text-center text-gray-500">No job found</td>
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

    document.getElementById('open-create-job').addEventListener('click', function() {
        createPanel.classList.remove('hidden');
    });

    document.querySelectorAll('[data-close-job-panel]').forEach(function(button) {
        button.addEventListener('click', function() {
            button.closest('[data-job-panel]').classList.add('hidden');
        });
    });

    document.querySelectorAll('.edit-job').forEach(function(button) {
        button.addEventListener('click', function() {
            const job = JSON.parse(this.dataset.job);
            const form = document.getElementById('edit-job-form');

            form.action = "{{ route('jobs.jobs.update', ':id') }}".replace(':id', job.id);
            form.querySelector('[name="job_country_id"]').value = job.job_country_id || '';
            form.querySelector('[name="title"]').value = job.title || '';
            form.querySelector('[name="job_designation_id"]').value = job.job_designation_id || '';
            form.querySelector('[name="location"]').value = job.location || '';
            form.querySelector('[name="employer"]').value = job.employer || '';
            form.querySelector('[name="vacancies"]').value = job.vacancies || '';
            form.querySelector('[name="salary"]').value = job.salary || '';
            form.querySelector('[name="employment_type"]').value = job.employment_type || '';
            form.querySelector('[name="deadline"]').value = job.deadline ? String(job.deadline).substring(0, 10) : '';
            form.querySelector('[name="short_description"]').value = job.short_description || '';
            form.querySelector('[name="description"]').value = job.description || '';
            form.querySelector('[name="is_active"]').checked = Boolean(job.is_active);
            editPanel.classList.remove('hidden');
        });
    });
</script>
