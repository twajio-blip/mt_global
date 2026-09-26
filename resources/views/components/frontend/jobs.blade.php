@props(['data' => []])

@php
    $countries = \App\Models\JobCountry::with(['jobs' => fn ($query) => $query->where('is_active', true)->latest()])
        ->where('is_active', true)
        ->withCount(['jobs' => fn ($query) => $query->where('is_active', true)])
        ->orderBy('name')
        ->get();

    $jobs = \App\Models\CountryJob::with(['country', 'jobDesignation'])
        ->where('is_active', true)
        ->latest()
        ->limit(6)
        ->get();
@endphp

<section class="bg-white py-16 sm:py-20">
    <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p class="text-sm font-semibold uppercase tracking-wide text-[#0E8A5B]">Overseas opportunities</p>
                <h2 class="mt-2 text-3xl font-bold tracking-tight text-[#0F1B2D] sm:text-4xl">Latest Jobs By Country</h2>
            </div>
            <a href="{{ url('/jobs') }}" class="inline-flex h-11 items-center justify-center rounded-md bg-btn-primary px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-btn-primary-hover">
                View All Jobs
            </a>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @forelse ($countries as $country)
                <div class="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="font-semibold text-[#0F1B2D]">{{ $country->name }}</h3>
                        <span class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#1F4580]">
                            {{ $country->jobs_count }} jobs
                        </span>
                    </div>
                </div>
            @empty
                <div class="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-[#475569]">
                    Add countries from admin to show them here.
                </div>
            @endforelse
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            @forelse ($jobs as $job)
                <article class="rounded-lg border border-[#E2E8F0] p-5 transition-colors duration-150 hover:border-[#B9CCE7]">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-sm font-semibold text-[#0E8A5B]">{{ $job->country?->name }}</p>
                            <h3 class="mt-1 text-lg font-bold text-[#0F1B2D]">{{ $job->title }}</h3>
                        </div>
                        @if ($job->vacancies)
                            <span class="rounded-full bg-[#EEF3FA] px-2.5 py-1 text-xs font-semibold text-[#1F4580]">
                                {{ $job->vacancies }} vacancies
                            </span>
                        @endif
                    </div>

                    <div class="mt-4 space-y-2 text-sm text-[#475569]">
                        <p class="flex items-center gap-2">
                            <i class="fa-solid fa-briefcase text-[#0E8A5B]"></i>
                            {{ $job->jobDesignation?->name ?? $job->designation }}
                        </p>
                        @if ($job->salary)
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-money-bill-wave text-[#0E8A5B]"></i>
                                {{ $job->salary }}
                            </p>
                        @endif
                        @if ($job->deadline)
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-calendar-days text-[#0E8A5B]"></i>
                                Deadline {{ $job->deadline->format('M d, Y') }}
                            </p>
                        @endif
                    </div>
                </article>
            @empty
                <div class="rounded-lg border border-[#E2E8F0] p-5 text-[#475569]">
                    Add jobs from admin to show them here.
                </div>
            @endforelse
        </div>
    </div>
</section>
