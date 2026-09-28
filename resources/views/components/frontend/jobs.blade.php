@props(['data' => []])

@php
    $selectedCountry = request('country', '');
    $selectedDesignation = request('designation', '');
    $query = trim((string) request('q', ''));

    $countrySummaries = \App\Models\JobCountry::query()
        ->where('is_active', true)
        ->withCount(['jobs as jobs_count' => fn ($jobQuery) => $jobQuery->where('is_active', true)])
        ->withSum(['jobs as vacancies_count' => fn ($jobQuery) => $jobQuery->where('is_active', true)], 'vacancies')
        ->get()
        ->filter(fn ($country) => $country->jobs_count > 0)
        ->sortByDesc('jobs_count')
        ->values();

    $designationSummaries = \App\Models\JobDesignation::query()
        ->where('is_active', true)
        ->withCount(['jobs as jobs_count' => fn ($jobQuery) => $jobQuery->where('is_active', true)])
        ->get()
        ->filter(fn ($designation) => $designation->jobs_count > 0)
        ->sortBy('name')
        ->values();

    $jobs = \App\Models\CountryJob::query()
        ->with(['country', 'jobDesignation', 'benefits'])
        ->where('is_active', true)
        ->when($selectedCountry, fn ($jobQuery) => $jobQuery->whereHas('country', fn ($countryQuery) => $countryQuery->where('slug', $selectedCountry)))
        ->when($selectedDesignation, fn ($jobQuery) => $jobQuery->whereHas('jobDesignation', fn ($designationQuery) => $designationQuery->where('slug', $selectedDesignation)))
        ->when($query, function ($jobQuery) use ($query) {
            $jobQuery->where(function ($nestedQuery) use ($query) {
                $nestedQuery->where('title', 'like', '%' . $query . '%')
                    ->orWhere('designation', 'like', '%' . $query . '%')
                    ->orWhereHas('jobDesignation', fn ($designationQuery) => $designationQuery->where('name', 'like', '%' . $query . '%'));
            });
        })
        ->latest()
        ->get();

    $selectedCountryName = $countrySummaries->firstWhere('slug', $selectedCountry)?->name;
    $selectedDesignationName = $designationSummaries->firstWhere('slug', $selectedDesignation)?->name;
    $summaryLine = collect([$selectedDesignationName, $selectedCountryName ? 'in ' . $selectedCountryName : null])->filter()->join(' ');
    $hasFilters = $selectedCountry || $selectedDesignation || $query;
@endphp

<div class="bg-[#F8FAFC] pb-20">
    <section class="bg-[#0B1F3A] pb-24 pt-10 md:pb-28 md:pt-14" aria-labelledby="jobs-title">
        <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <h1 id="jobs-title" class="text-3xl font-bold tracking-tight text-white md:text-[40px]">
                Available Overseas Jobs
            </h1>
            <p class="mt-3 max-w-2xl text-base text-[#D9E3F2] md:text-lg">
                Explore current manpower requirements and employment opportunities by country and profession.
            </p>
        </div>
    </section>

    <div class="mx-auto -mt-16 w-full max-w-[1240px] px-4 sm:px-6 md:-mt-20 lg:px-8">
        <form method="GET" action="{{ url('/jobs') }}" class="rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(15,27,45,0.14)] sm:p-5" role="search" aria-label="Filter jobs">
            <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
                <div>
                    <label for="filter-country" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Country</label>
                    <div class="relative">
                        <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-xs text-[#94A3B8]"></i>
                        <select id="filter-country" name="country" class="h-14 w-full rounded-lg border border-[#CBD5E1] bg-white pl-10 pr-4 text-base text-[#0F1B2D] outline-none transition-colors focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                            <option value="">All Countries</option>
                            @foreach ($countrySummaries as $country)
                                <option value="{{ $country->slug }}" @selected($selectedCountry === $country->slug)>
                                    {{ $country->name }} ({{ $country->jobs_count }})
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div>
                    <label for="filter-designation" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Designation</label>
                    <div class="relative">
                        <i class="fa-solid fa-chevron-down pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-xs text-[#94A3B8]"></i>
                        <select id="filter-designation" name="designation" class="h-14 w-full rounded-lg border border-[#CBD5E1] bg-white pl-10 pr-4 text-base text-[#0F1B2D] outline-none transition-colors focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                            <option value="">All Designations</option>
                            @foreach ($designationSummaries as $designation)
                                <option value="{{ $designation->slug }}" @selected($selectedDesignation === $designation->slug)>
                                    {{ $designation->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="md:col-span-2 lg:col-span-1">
                    <label for="filter-q" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Search by Job Title</label>
                    <div class="relative">
                        <i class="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#94A3B8]"></i>
                        <input
                            id="filter-q"
                            type="search"
                            name="q"
                            value="{{ $query }}"
                            placeholder="e.g. Welder, Driver, Chef"
                            class="h-14 w-full rounded-lg border border-[#CBD5E1] bg-white pl-11 pr-4 text-base text-[#0F1B2D] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                    </div>
                </div>
            </div>

            <div class="mt-4 flex justify-end">
                <button type="submit" class="inline-flex h-11 items-center justify-center rounded-lg bg-[#0E8A5B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0B6F49]">
                    Search Jobs
                </button>
            </div>
        </form>

        <div class="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Quick country filters">
            <a
                href="{{ url('/jobs' . ($selectedDesignation || $query ? '?' . http_build_query(array_filter(['designation' => $selectedDesignation, 'q' => $query])) : '')) }}"
                aria-pressed="{{ $selectedCountry ? 'false' : 'true' }}"
                class="flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors {{ !$selectedCountry ? 'border-[#1F4580] bg-[#1F4580] text-white' : 'border-[#E2E8F0] bg-white text-[#0F1B2D] hover:border-[#B9CCE7]' }}">
                All
            </a>

            @foreach ($countrySummaries as $country)
                @php
                    $active = $selectedCountry === $country->slug;
                    $url = url('/jobs?' . http_build_query(array_filter([
                        'country' => $active ? null : $country->slug,
                        'designation' => $selectedDesignation,
                        'q' => $query,
                    ])));
                @endphp

                <a
                    href="{{ $url }}"
                    aria-pressed="{{ $active ? 'true' : 'false' }}"
                    class="flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors {{ $active ? 'border-[#1F4580] bg-[#1F4580] text-white' : 'border-[#E2E8F0] bg-white text-[#0F1B2D] hover:border-[#B9CCE7]' }}">
                    @if ($country->flag_code)
                        <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" aria-hidden="true" loading="lazy" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                    @endif
                    {{ $country->name }}
                    <span class="{{ $active ? 'text-[#D9E3F2]' : 'text-[#64748B]' }}">{{ $country->jobs_count }}</span>
                </a>
            @endforeach
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p class="text-[15px] text-[#334155]" aria-live="polite">
                <span class="font-semibold text-[#0F1B2D]">{{ $jobs->count() }}</span>
                {{ \Illuminate\Support\Str::plural('job', $jobs->count()) }} found
                @if ($summaryLine)
                    <span> for {{ $summaryLine }}</span>
                @endif
                @if ($query)
                    <span> matching "{{ $query }}"</span>
                @endif
            </p>

            @if ($hasFilters)
                <a href="{{ url('/jobs') }}" class="flex items-center gap-1.5 text-sm font-semibold text-[#1F4580] hover:text-[#0B1F3A]">
                    <i class="fa-solid fa-xmark text-sm"></i>
                    Clear filters
                </a>
            @endif
        </div>

        @if ($jobs->isNotEmpty())
            <ul class="mt-4 space-y-3">
                @foreach ($jobs as $job)
                    @php
                        $country = $job->country;
                        $designation = $job->jobDesignation?->name ?? $job->designation;
                        $benefits = $job->benefits->pluck('name')->take(3);
                    @endphp

                    <li>
                        <a href="{{ route('job.view', $job->id) }}" class="group block rounded-xl border border-[#E2E8F0] bg-white p-5 transition-[border-color,box-shadow] hover:border-[#B9CCE7] hover:shadow-[0_10px_24px_rgba(15,27,45,0.10)]">
                            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div class="min-w-0">
                                    <div class="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#1F4580]">
                                        @if ($country?->flag_code)
                                            <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" aria-hidden="true" loading="lazy" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                                        @endif
                                        <span>{{ $country?->name ?? 'Overseas' }}</span>
                                        @if ($job->countryLocation?->name ?? $job->location)
                                            <span class="text-[#CBD5E1]">/</span>
                                            <span>{{ $job->countryLocation?->name ?? $job->location }}</span>
                                        @endif
                                    </div>

                                    <h2 class="mt-2 text-xl font-semibold text-[#0F1B2D] transition-colors group-hover:text-[#1F4580]">
                                        {{ $job->title }}
                                    </h2>

                                    <p class="mt-1 text-sm text-[#64748B]">
                                        {{ $designation }}
                                        @if ($job->employer)
                                            <span class="mx-1">/</span>{{ $job->employer }}
                                        @endif
                                    </p>
                                </div>

                                <div class="shrink-0 rounded-lg bg-[#ECFDF5] px-3 py-2 text-right">
                                    <p class="text-sm font-semibold text-[#0E8A5B]">{{ number_format((int) $job->vacancies) }}</p>
                                    <p class="text-xs text-[#64748B]">{{ \Illuminate\Support\Str::plural('vacancy', (int) $job->vacancies) }}</p>
                                </div>
                            </div>

                            <dl class="mt-4 grid gap-3 border-t border-[#E2E8F0] pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                                @if ($job->salary)
                                    <div>
                                        <dt class="text-[13px] text-[#64748B]">Salary</dt>
                                        <dd class="mt-0.5 font-semibold text-[#0E8A5B]">{{ $job->salary }}</dd>
                                    </div>
                                @endif

                                @if ($job->employment_type)
                                    <div>
                                        <dt class="text-[13px] text-[#64748B]">Employment Type</dt>
                                        <dd class="mt-0.5 font-medium text-[#0F1B2D]">{{ $job->employment_type }}</dd>
                                    </div>
                                @endif

                                @if ($job->deadline)
                                    <div>
                                        <dt class="text-[13px] text-[#64748B]">Deadline</dt>
                                        <dd class="mt-0.5 font-medium text-[#0F1B2D]">{{ $job->deadline->format('M d, Y') }}</dd>
                                    </div>
                                @endif

                                <div>
                                    <dt class="text-[13px] text-[#64748B]">Published</dt>
                                    <dd class="mt-0.5 font-medium text-[#0F1B2D]">{{ $job->created_at?->diffForHumans() }}</dd>
                                </div>
                            </dl>

                            @if ($benefits->isNotEmpty())
                                <div class="mt-4 flex flex-wrap gap-2">
                                    @foreach ($benefits as $benefit)
                                        <span class="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#475569]">{{ $benefit }}</span>
                                    @endforeach
                                </div>
                            @endif

                            <div class="mt-4 flex justify-end">
                                <span class="flex items-center gap-1 text-sm font-semibold text-[#1F4580]">
                                    View Details
                                    <i class="fa-solid fa-arrow-right text-sm transition-transform group-hover:translate-x-0.5"></i>
                                </span>
                            </div>
                        </a>
                    </li>
                @endforeach
            </ul>
        @else
            <div class="mt-4 flex flex-col items-center rounded-xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center">
                <i class="fa-solid fa-magnifying-glass-minus text-4xl text-[#94A3B8]"></i>
                <h2 class="mt-4 text-lg font-semibold text-[#0F1B2D]">No jobs match these filters</h2>
                <p class="mt-2 max-w-sm text-[15px] text-[#64748B]">
                    Try another country or designation. New requirements are published every week.
                </p>
                <a href="{{ url('/jobs') }}" class="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F1B2D] transition-colors hover:border-[#B9CCE7] hover:text-[#1F4580]">
                    Show all jobs
                </a>
            </div>
        @endif
    </div>
</div>
