<x-Deshboard-layout>
    <div class="mt-5">
        <div class="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <div class="flex items-center gap-2 text-sm">
                    <a href="{{ route('dashboard') }}" class="text-skin-backend-text-base text-opacity-60">Dashboard</a>
                    <i class="fa-solid fa-chevron-right text-[10px] text-skin-backend-text-base text-opacity-40"></i>
                    <span class="text-skin-backend-text-base text-opacity-50">CV Applications</span>
                </div>
                <h1 class="mt-2 text-2xl font-semibold text-skin-backend-text-base">CV Applications</h1>
            </div>
        </div>

        @if ($message = Session::get('success'))
            <x-backend.flash-error :message="$message" :type="'success'" />
        @endif

        <div class="rounded-[8px] border border-default border-opacity-10 bg-skin-backend-card p-4">
            <form method="GET" action="{{ route('cvs.index') }}" class="grid grid-cols-12 gap-3">
                <div class="col-span-12 md:col-span-3">
                    <label for="country-filter" class="mb-1 block text-xs font-semibold text-skin-backend-text-base text-opacity-70">Country</label>
                    <div class="relative">
                        <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                        <select id="country-filter" name="country" class="block w-full rounded-[4px] border border-default border-opacity-25 bg-skin-backend-secondary py-2 pl-9 pr-3 text-sm text-skin-backend-text-base outline-none focus:border-highlight focus:ring-0">
                            <option value="">All Countries</option>
                            @foreach ($countries as $country)
                                <option value="{{ $country->id }}" @selected((string) $countryId === (string) $country->id)>{{ $country->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-3">
                    <label for="designation-filter" class="mb-1 block text-xs font-semibold text-skin-backend-text-base text-opacity-70">Designation</label>
                    <div class="relative">
                        <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[11px] text-skin-backend-text-base text-opacity-50"></i>
                        <select id="designation-filter" name="designation" class="block w-full rounded-[4px] border border-default border-opacity-25 bg-skin-backend-secondary py-2 pl-9 pr-3 text-sm text-skin-backend-text-base outline-none focus:border-highlight focus:ring-0">
                            <option value="">All Designations</option>
                            @foreach ($designations as $designation)
                                <option value="{{ $designation->id }}" @selected((string) $designationId === (string) $designation->id)>{{ $designation->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <label for="search-filter" class="mb-1 block text-xs font-semibold text-skin-backend-text-base text-opacity-70">Search</label>
                    <input id="search-filter" name="search" value="{{ $search }}" type="search" placeholder="Applicant, job, phone, email, employer" class="w-full rounded-[8px] border border-default border-opacity-20 bg-transparent px-3 py-2 text-sm text-skin-backend-text-base outline-none placeholder:text-skin-backend-text-base placeholder:text-opacity-35">
                </div>
                <div class="col-span-12 flex items-end gap-2 md:col-span-2">
                    <button type="submit" class="flex-1 rounded-[8px] bg-skin-backend-accent px-4 py-2 text-sm font-semibold text-skin-invert">Filter</button>
                    <a href="{{ route('cvs.index') }}" class="rounded-[8px] border border-default border-opacity-25 px-4 py-2 text-sm font-semibold text-skin-backend-text-base">Reset</a>
                </div>
            </form>
        </div>

        <div class="mt-5 overflow-hidden rounded-[8px] border border-default border-opacity-10 bg-skin-backend-card">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[1080px] text-sm text-skin-backend-text-base">
                    <thead class="border-b border-default border-opacity-10 text-left text-xs uppercase text-skin-backend-text-base text-opacity-55">
                        <tr>
                            <th class="px-4 py-3">Applicant Name</th>
                            <th class="min-w-[170px] px-4 py-3">Phone</th>
                            <th class="px-4 py-3">Email</th>
                            <th class="px-4 py-3">Job Title</th>
                            <th class="px-4 py-3">Country</th>
                            <th class="px-4 py-3">Designation</th>
                            <th class="px-4 py-3">Submitted</th>
                            <th class="px-4 py-3">CV</th>
                            <th class="px-4 py-3 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-default divide-opacity-10">
                        @forelse ($applications as $application)
                            @php
                                $job = $application->job;
                                $cvUrl = asset($application->cv_file_path);
                            @endphp
                            <tr>
                                <td class="px-4 py-3 font-semibold">{{ $application->full_name }}</td>
                                <td class="whitespace-nowrap px-4 py-3">{{ $application->phone }}</td>
                                <td class="px-4 py-3">{{ $application->email }}</td>
                                <td class="px-4 py-3">{{ $job?->title ?? 'Deleted job' }}</td>
                                <td class="px-4 py-3">{{ $job?->country?->name ?? '-' }}</td>
                                <td class="px-4 py-3">{{ $job?->jobDesignation?->name ?? $job?->designation ?? '-' }}</td>
                                <td class="px-4 py-3">{{ $application->created_at?->format('M d, Y') }}</td>
                                <td class="px-4 py-3">
                                    <a href="{{ $cvUrl }}" target="_blank" class="inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-default border-opacity-20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-skin-backend-accent hover:text-skin-invert">
                                        <i class="fa-solid fa-file-lines"></i>
                                        Open
                                    </a>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            class="view-cv-app cursor-pointer rounded-[8px] border border-default border-opacity-20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-skin-backend-accent hover:text-skin-invert"
                                            data-name="{{ $application->full_name }}"
                                            data-phone="{{ $application->phone }}"
                                            data-email="{{ $application->email }}"
                                            data-location="{{ $application->current_location }}"
                                            data-message="{{ $application->message }}"
                                            data-job="{{ $job?->title }}"
                                            data-country="{{ $job?->country?->name }}"
                                            data-flag-code="{{ $job?->country?->flag_code }}"
                                            data-designation="{{ $job?->jobDesignation?->name ?? $job?->designation }}"
                                            data-employer="{{ $job?->employer }}"
                                            data-submitted="{{ $application->created_at?->format('M d, Y h:i A') }}"
                                            data-cv="{{ $application->cv_file_name }}"
                                            data-cv-url="{{ $cvUrl }}"
                                            data-job-url="{{ $job ? route('job.view', $job->id) : '' }}"
                                        >
                                            View
                                        </button>
                                        <a href="{{ $cvUrl }}" download class="cursor-pointer rounded-[8px] border border-default border-opacity-20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-skin-backend-accent hover:text-skin-invert">
                                            Download
                                        </a>
                                        @if ($job)
                                            <a href="{{ route('job.view', $job->id) }}" target="_blank" class="cursor-pointer rounded-[8px] border border-default border-opacity-20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-skin-backend-accent hover:text-skin-invert">
                                                Job
                                            </a>
                                        @endif
                                        <form action="{{ route('cvs.destroy', $application) }}" method="POST" onsubmit="return confirm('Delete this CV application?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="cursor-pointer rounded-[8px] border border-red-500 border-opacity-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="9" class="px-4 py-10 text-center text-skin-backend-text-base text-opacity-60">No CV applications found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            <div class="border-t border-default border-opacity-10 px-4 py-3">
                {{ $applications->links() }}
            </div>
        </div>
    </div>

    <div id="cv-details-drawer" class="cv-drawer fixed inset-0 z-[999] hidden">
        <div class="cv-drawer-backdrop absolute inset-0"></div>
        <div id="cv-details-panel" class="cv-drawer-panel absolute inset-y-0 right-0 flex w-full flex-col">
                <div class="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
                    <p class="text-sm font-semibold text-[#64748B]">Applicant</p>
                    <button type="button" data-close-cv-modal class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]" aria-label="Close">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto px-6 py-6">
                    <div class="flex items-center gap-4">
                        <span id="cv-detail-initials" class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF4E6] text-lg font-bold text-[#0B6F49]"></span>
                        <div class="min-w-0">
                            <h2 id="cv-detail-name" class="truncate text-xl font-bold text-[#0F172A]"></h2>
                            <p class="text-sm text-[#64748B]">Submitted <span id="cv-detail-submitted"></span></p>
                        </div>
                    </div>

                    <ul class="mt-6 space-y-3 text-[15px]">
                        <li class="flex items-center gap-3">
                            <i class="fa-solid fa-phone h-4 w-4 text-[#94A3B8]"></i>
                            <a id="cv-detail-phone" href="#" class="font-medium text-[#0F172A] hover:text-[#0B6F49]"></a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-solid fa-envelope h-4 w-4 text-[#94A3B8]"></i>
                            <a id="cv-detail-email" href="#" class="font-medium text-[#0F172A] hover:text-[#0B6F49]"></a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-solid fa-location-dot h-4 w-4 text-[#94A3B8]"></i>
                            <span id="cv-detail-location" class="text-[#334155]"></span>
                        </li>
                    </ul>

                    <section class="mt-7">
                        <h3 class="text-sm font-semibold text-[#0F172A]">Applied for</h3>
                        <div class="mt-3 rounded-xl border border-[#E2E8F0] p-4">
                            <p id="cv-detail-job" class="font-semibold text-[#0F172A]"></p>
                            <dl class="mt-3 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <dt class="text-[#64748B]">Country</dt>
                                    <dd class="mt-0.5 flex items-center gap-1.5 font-medium text-[#0F172A]">
                                        <img id="cv-detail-flag" src="" alt="" class="hidden h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                                        <span id="cv-detail-country"></span>
                                    </dd>
                                </div>
                                <div>
                                    <dt class="text-[#64748B]">Designation</dt>
                                    <dd id="cv-detail-designation" class="mt-0.5 font-medium text-[#0F172A]"></dd>
                                </div>
                                <div class="col-span-2">
                                    <dt class="text-[#64748B]">Employer</dt>
                                    <dd id="cv-detail-employer" class="mt-0.5 font-medium text-[#0F172A]"></dd>
                                </div>
                            </dl>
                            <a id="cv-detail-job-link" href="#" target="_blank" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B6F49] hover:text-[#85B567]">
                                View related job <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                            </a>
                        </div>
                    </section>

                    <section id="cv-detail-message-wrap" class="mt-7">
                        <h3 class="text-sm font-semibold text-[#0F172A]">Message</h3>
                        <p id="cv-detail-message" class="mt-2 whitespace-pre-line rounded-xl bg-[#F8FAFC] p-4 text-[15px] leading-relaxed text-[#334155]"></p>
                    </section>

                    <section class="mt-7">
                        <h3 class="text-sm font-semibold text-[#0F172A]">CV</h3>
                        <div class="mt-3 flex items-center gap-3 rounded-xl border border-[#E2E8F0] p-4">
                            <i class="fa-solid fa-file-lines shrink-0 text-3xl text-[#0B6F49]"></i>
                            <div class="min-w-0 flex-1">
                                <p id="cv-detail-file" class="truncate font-medium text-[#0F172A]"></p>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="grid grid-cols-2 gap-2 border-t border-[#E2E8F0] bg-white px-6 py-4">
                    <a id="cv-detail-open" href="#" target="_blank" class="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#CBD5E1] bg-white px-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]">
                        <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                        Open CV
                    </a>
                    <a id="cv-detail-download" href="#" download class="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#0E8A5B] px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0B6F49]">
                        <i class="fa-solid fa-download text-sm"></i>
                        Download CV
                    </a>
                </div>
        </div>
    </div>
</x-Deshboard-layout>

<style>
    .cv-drawer {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    .cv-drawer.is-open {
        opacity: 1;
    }

    .cv-drawer-backdrop {
        background: rgba(15, 23, 42, 0.4);
    }

    .cv-drawer-panel {
        max-width: 28rem;
        background: #ffffff !important;
        color: #0f172a;
        transform: translateX(100%);
        transition: transform 260ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .cv-drawer.is-open .cv-drawer-panel {
        transform: translateX(0);
    }

    @media (max-width: 767px) {
        .cv-drawer-panel {
            width: 100vw;
            max-width: 100vw;
        }
    }
</style>

<script>
    const cvModal = document.getElementById('cv-details-drawer');
    const cvPanel = document.getElementById('cv-details-panel');

    function closeCvDrawer() {
        if (!cvModal || !cvPanel) return;
        cvModal.classList.remove('is-open');
        setTimeout(() => cvModal.classList.add('hidden'), 260);
    }

    function openCvDrawer() {
        if (!cvModal || !cvPanel) return;
        cvModal.classList.remove('hidden');
        requestAnimationFrame(() => cvModal.classList.add('is-open'));
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.view-cv-app');
        if (button) {
            const details = button.dataset;
            const initials = (details.name || '-')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join('') || '-';
            document.getElementById('cv-detail-initials').textContent = initials;
            document.getElementById('cv-detail-name').textContent = details.name || '-';
            document.getElementById('cv-detail-phone').textContent = details.phone || '-';
            document.getElementById('cv-detail-phone').href = details.phone ? `tel:${details.phone.replace(/\s/g, '')}` : '#';
            document.getElementById('cv-detail-email').textContent = details.email || '-';
            document.getElementById('cv-detail-email').href = details.email ? `mailto:${details.email}` : '#';
            document.getElementById('cv-detail-location').textContent = details.location || '-';
            document.getElementById('cv-detail-submitted').textContent = details.submitted || '-';
            document.getElementById('cv-detail-job').textContent = details.job || '-';
            document.getElementById('cv-detail-country').textContent = details.country || '-';
            const flag = document.getElementById('cv-detail-flag');
            if (details.flagCode) {
                flag.src = `https://flagcdn.com/w40/${details.flagCode}.png`;
                flag.classList.remove('hidden');
            } else {
                flag.src = '';
                flag.classList.add('hidden');
            }
            document.getElementById('cv-detail-designation').textContent = details.designation || '-';
            document.getElementById('cv-detail-employer').textContent = details.employer || '-';
            document.getElementById('cv-detail-message').textContent = details.message || '';
            document.getElementById('cv-detail-message-wrap').classList.toggle('hidden', !details.message);
            document.getElementById('cv-detail-file').textContent = details.cv || '-';
            document.getElementById('cv-detail-open').href = details.cvUrl || '#';
            document.getElementById('cv-detail-download').href = details.cvUrl || '#';
            document.getElementById('cv-detail-job-link').href = details.jobUrl || '#';
            document.getElementById('cv-detail-job-link').classList.toggle('hidden', !details.jobUrl);
            openCvDrawer();
            return;
        }

        if (event.target.closest('[data-close-cv-modal]')) {
            closeCvDrawer();
        }
    });

    cvModal?.addEventListener('click', (event) => {
        if (event.target === cvModal) {
            closeCvDrawer();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !cvModal.classList.contains('hidden')) {
            closeCvDrawer();
        }
    });
</script>
