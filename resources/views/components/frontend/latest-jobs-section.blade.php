@props(['data' => []])

@php
    $countryCodes = [
        'Saudi Arabia' => 'sa',
        'UAE' => 'ae',
        'Qatar' => 'qa',
        'Kuwait' => 'kw',
        'Oman' => 'om',
        'Bahrain' => 'bh',
        'Malaysia' => 'my',
        'Singapore' => 'sg',
        'Romania' => 'ro',
        'Croatia' => 'hr',
        'Poland' => 'pl',
    ];

    $jobs = \App\Models\CountryJob::query()
        ->where('is_active', true)
        ->with(['country', 'jobDesignation'])
        ->latest()
        ->take(6)
        ->get();
@endphp

<section class="py-16 lg:py-24 bg-white" aria-labelledby="latest-title">
    <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 id="latest-title" class="text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl">
            Latest Overseas Job Opportunities
        </h2>
        <p class="mt-3 max-w-xl text-base text-[#475569]">
            Newly published manpower requirements from our employers.
        </p>

        <ul class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            @forelse ($jobs as $job)
                @php
                    $countryName = $job->country?->name ?? 'Overseas';
                    $flagCode = $countryCodes[$countryName] ?? null;
                    $designation = $job->jobDesignation?->name ?? $job->designation;
                    $vacancies = (int) ($job->vacancies ?: 0);
                    $publishedAt = $job->created_at?->diffForHumans();
                @endphp

                <li>
                    <a
                        href="{{ route('job.view', $job->id) }}"
                        class="group flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#B9CCE7] hover:shadow-[0_10px_24px_rgba(15,27,45,0.10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9E3F2]">
                        <div class="flex items-center justify-between gap-3">
                            <span class="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#1F4580]">
                                @if ($flagCode)
                                    <img
                                        src="https://flagcdn.com/w40/{{ $flagCode }}.png"
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        class="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10">
                                @endif
                                <span class="truncate">{{ $countryName }}</span>
                            </span>
                            @if ($publishedAt)
                                <span class="shrink-0 text-[13px] text-[#64748B]">{{ $publishedAt }}</span>
                            @endif
                        </div>

                        <h3 class="mt-3 text-lg font-semibold leading-snug text-[#0F1B2D] transition-colors group-hover:text-[#1F4580]">
                            {{ $job->title }}
                        </h3>

                        @if ($job->employer)
                            <p class="mt-1 text-sm text-[#64748B]">{{ $job->employer }}</p>
                        @endif

                        <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#E2E8F0] pt-4 text-sm">
                            <div>
                                <dt class="text-[13px] text-[#64748B]">Designation</dt>
                                <dd class="mt-0.5 font-medium text-[#0F1B2D]">{{ $designation }}</dd>
                            </div>

                            <div>
                                <dt class="text-[13px] text-[#64748B]">Vacancy</dt>
                                <dd class="mt-0.5 font-medium text-[#0F1B2D]">
                                    {{ number_format($vacancies) }} {{ \Illuminate\Support\Str::plural('position', $vacancies) }}
                                </dd>
                            </div>

                            @if ($job->salary)
                                <div class="col-span-2">
                                    <dt class="text-[13px] text-[#64748B]">Salary</dt>
                                    <dd class="mt-0.5 font-semibold text-[#0E8A5B]">{{ $job->salary }}</dd>
                                </div>
                            @endif
                        </dl>

                        <div class="mt-auto flex items-center justify-between gap-3 pt-5">
                            @if ($job->employment_type)
                                <span class="flex min-w-0 items-center gap-1.5 text-[13px] text-[#475569]">
                                    <i class="fa-solid fa-stamp text-[13px]" aria-hidden="true"></i>
                                    <span class="truncate">{{ $job->employment_type }}</span>
                                </span>
                            @else
                                <span></span>
                            @endif

                            <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1F4580]">
                                View Details
                                <i class="fa-solid fa-arrow-right text-sm transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true"></i>
                            </span>
                        </div>
                    </a>
                </li>
            @empty
                <li class="col-span-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-[#475569]">
                    Add active jobs from admin to show latest opportunities here.
                </li>
            @endforelse
        </ul>

        <div class="mt-10 flex justify-center">
            <a
                href="{{ url('/jobs') }}"
                class="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-white px-5 text-[15px] font-semibold text-[#0F1B2D] transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-[#B9CCE7] hover:text-[#1F4580] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9E3F2]">
                Browse Jobs
            </a>
        </div>
    </div>
</section>
