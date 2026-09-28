<x-Deshboard-layout>
    <div class="py-10 job-admin-fields">
        <div class="space-y-4">
            <div class="md:flex md:justify-between md:items-center space-y-4 md:space-y-0">
                <div class="space-y-2 max-w-[350px] text-skin-backend-text-base">
                    <h2 class="text-[24px]">
                        <a href="{{ route('dashboard') }}" class="font-bold text-skin-backend-text-base">Dashboard</a> /
                        <span class="text-skin-backend-text-base text-opacity-50">Employment Types</span>
                    </h2>
                    <p class="text-[14px] text-skin-backend-text-base text-opacity-50">
                        Add employment types here, then select them when creating jobs.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 lg:col-span-4 bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
                    <h3 class="font-semibold mb-4">Add Employment Type</h3>
                    <form action="{{ route('jobs.employment-types.store') }}" method="POST" class="space-y-4">
                        @csrf
                        <div>
                            <x-backend.input-label :value="'Employment Type'" for="name" />
                            <x-backend.input-field type="text" name="name" id="name" placeholder="Full-time" required />
                        </div>
                        <label class="flex items-center gap-2 text-sm">
                            <input type="checkbox" name="is_active" value="1" checked class="rounded border-default bg-skin-backend-secondary">
                            Active
                        </label>
                        <button type="submit" class="px-8 py-2.5 bg-skin-backend-accent text-skin-invert rounded-[10px] text-xs font-semibold">
                            Save Employment Type
                        </button>
                    </form>
                </div>

                <div class="col-span-12 lg:col-span-8 bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
                    <form method="GET" action="{{ route('jobs.employment-types.index') }}" class="mb-4 grid grid-cols-12 gap-3">
                        <div class="col-span-12 md:col-span-6">
                            <input type="search" name="search" value="{{ $search ?? '' }}" class="py-2 px-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]" placeholder="Search employment type">
                        </div>
                        <div class="col-span-12 md:col-span-3">
                            <div class="relative">
                                <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                                <select name="status" class="py-2 pl-9 pr-3 block w-full text-sm bg-skin-backend-secondary border focus:outline-none focus:border-highlight focus:ring-0 border-default border-opacity-25 text-skin-backend-text-base rounded-[4px]">
                                <option value="">All status</option>
                                <option value="active" @selected(($status ?? '') === 'active')>Active</option>
                                <option value="inactive" @selected(($status ?? '') === 'inactive')>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-3 flex gap-2">
                            <button type="submit" class="flex-1 rounded-[8px] bg-skin-backend-accent px-4 py-2 text-xs font-semibold text-skin-invert">Filter</button>
                            <a href="{{ route('jobs.employment-types.index') }}" class="flex-1 rounded-[8px] border border-default border-opacity-25 px-4 py-2 text-center text-xs font-semibold text-skin-backend-text-base">Reset</a>
                        </div>
                    </form>

                    <div class="w-full overflow-x-auto">
                        <table class="min-w-full divide-y divide-[#ffffff06] text-[14px]">
                            <thead class="bg-[#323232] font-bold">
                                <tr>
                                    <th class="py-3 text-start min-w-[180px]"><h2 class="px-6">Employment Type</h2></th>
                                    <th class="py-3 text-start min-w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Jobs</h2></th>
                                    <th class="py-3 text-start min-w-[80px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Status</h2></th>
                                    <th class="py-3 text-center w-[100px]"><h2 class="px-4 border-l border-default border-opacity-[6%]">Action</h2></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#ffffff06]">
                                @forelse ($employmentTypes as $employmentType)
                                    <tr>
                                        <td class="py-3 px-6">{{ $employmentType->name }}</td>
                                        <td class="py-3">{{ $employmentType->jobs_count }}</td>
                                        <td class="py-3">{{ $employmentType->is_active ? 'Active' : 'Inactive' }}</td>
                                        <td class="py-3 text-center">
                                            <div class="inline-flex gap-2">
                                                <button type="button" data-id="{{ $employmentType->id }}" data-name="{{ $employmentType->name }}" data-active="{{ $employmentType->is_active ? 1 : 0 }}" class="edit-employment-type inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#3762ED]">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <form action="{{ route('jobs.employment-types.destroy', $employmentType) }}" method="POST" onsubmit="return confirm('Delete this employment type?')">
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
                                        <td colspan="4" class="px-4 py-3 text-center text-gray-500">No employment type found</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="float-right mt-3">
                <x-backend.pagination :paginator="$employmentTypes" />
            </div>
        </div>
    </div>

    <div id="edit-employment-type-panel" class="job-admin-fields hidden fixed inset-0 z-[100] bg-black/60 p-4">
        <div class="mx-auto mt-20 max-w-xl bg-skin-backend-secondary text-skin-backend-text-base p-6 rounded-[10px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold">Edit Employment Type</h3>
                <button type="button" id="close-edit-employment-type" class="text-xl">&times;</button>
            </div>
            <form id="edit-employment-type-form" method="POST" class="space-y-4">
                @csrf
                @method('PUT')
                <div>
                    <x-backend.input-label :value="'Employment Type'" for="edit_name" />
                    <x-backend.input-field type="text" name="name" id="edit_name" placeholder="Full-time" required />
                </div>
                <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="is_active" value="1" id="edit_is_active" class="rounded border-default bg-skin-backend-secondary">
                    Active
                </label>
                <button type="submit" class="px-8 py-2.5 bg-skin-backend-accent text-skin-invert rounded-[10px] text-xs font-semibold">
                    Update Employment Type
                </button>
            </form>
        </div>
    </div>

    @if ($message = Session::get('success'))
        <x-backend.flash-error :message="$message" :type="'success'" />
    @endif
</x-Deshboard-layout>

<script>
    document.querySelectorAll('.edit-employment-type').forEach(function(button) {
        button.addEventListener('click', function() {
            document.getElementById('edit-employment-type-form').action = "{{ route('jobs.employment-types.update', ':id') }}".replace(':id', this.dataset.id);
            document.getElementById('edit_name').value = this.dataset.name;
            document.getElementById('edit_is_active').checked = this.dataset.active === '1';
            document.getElementById('edit-employment-type-panel').classList.remove('hidden');
        });
    });

    document.getElementById('close-edit-employment-type').addEventListener('click', function() {
        document.getElementById('edit-employment-type-panel').classList.add('hidden');
    });
</script>
