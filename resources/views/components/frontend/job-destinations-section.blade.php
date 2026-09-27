@props(['data' => []])

@php
    $sectionData = [];

    foreach ($data as $item) {
        if (is_array($item) && isset($item['group']) && $item['group'] == 2) {
            $sectionData = $item[0] ?? [];
            break;
        }
    }

    $sectionTitle = $sectionData['Title'] ?? 'Popular Job Destinations';
    $sectionSubtitle = $sectionData['Subtitle'] ?? 'Choose a country to see every open manpower requirement there.';

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

    $summaries = \App\Models\JobCountry::query()
        ->where('is_active', true)
        ->withCount(['jobs as jobs_count' => fn ($query) => $query->where('is_active', true)])
        ->withSum(['jobs as vacancies_count' => fn ($query) => $query->where('is_active', true)], 'vacancies')
        ->get()
        ->filter(fn ($country) => $country->jobs_count > 0)
        ->sort(fn ($a, $b) => [$b->jobs_count, $b->vacancies_count ?? 0] <=> [$a->jobs_count, $a->vacancies_count ?? 0])
        ->values();

    $featured = $summaries->take(6);
    $others = $summaries->slice(6)->values();
@endphp

<section class="py-16 lg:py-24 bg-white" aria-labelledby="destinations-title">
    <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h2 id="destinations-title" class="text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl">
                    {{ $sectionTitle }}
                </h2>
                <p class="mt-3 max-w-xl text-base text-[#475569]">
                    {{ $sectionSubtitle }}
                </p>
            </div>

            <a href="{{ url('/jobs') }}" class="flex items-center gap-1.5 text-[15px] font-semibold text-[#1F4580] transition-colors hover:text-[#0B1F3A]">
                All destinations
                <i class="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>

        <ul class="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            @forelse ($featured as $country)
                @php
                    $flagCode = $countryCodes[$country->name] ?? null;
                    $vacancies = (int) ($country->vacancies_count ?? 0);
                @endphp

                <li>
                    <a
                        href="{{ url('/jobs?country=' . urlencode($country->slug)) }}"
                        class="group flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#B9CCE7] hover:shadow-[0_10px_24px_rgba(15,27,45,0.10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9E3F2]">
                        @if ($flagCode)
                            <img
                                src="https://flagcdn.com/w80/{{ $flagCode }}.png"
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                class="h-8 w-11 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10">
                        @endif

                        <span class="mt-5 text-lg font-bold text-[#0F1B2D]">{{ $country->name }}</span>
                        <span class="mt-1 text-[15px] font-semibold text-[#0E8A5B]">
                            {{ $country->jobs_count }} Available {{ \Illuminate\Support\Str::plural('Job', $country->jobs_count) }}
                        </span>
                        <span class="mt-auto flex items-center justify-between pt-4 text-[13px] text-[#64748B]">
                            {{ number_format($vacancies) }} {{ \Illuminate\Support\Str::plural('vacancy', $vacancies) }}
                            <i class="fa-solid fa-arrow-right text-sm text-[#1F4580] transition-transform duration-150 ease-out group-hover:translate-x-0.5"></i>
                        </span>
                    </a>
                </li>
            @empty
                <li class="col-span-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-[#475569]">
                    Add active jobs from admin to show destinations here.
                </li>
            @endforelse
        </ul>

        @if ($others->isNotEmpty())
            <div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span class="mr-1 text-[#64748B]">Also hiring in</span>

                @foreach ($others as $country)
                    @php $flagCode = $countryCodes[$country->name] ?? null; @endphp
                    <a
                        href="{{ url('/jobs?country=' . urlencode($country->slug)) }}"
                        class="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-1.5 font-medium text-[#0F1B2D] transition-colors duration-150 ease-out hover:border-[#B9CCE7] hover:text-[#1F4580]">
                        @if ($flagCode)
                            <img
                                src="https://flagcdn.com/w80/{{ $flagCode }}.png"
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                class="h-3.5 w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10">
                        @endif
                        {{ $country->name }}
                        <span class="text-[#64748B]">{{ $country->jobs_count }}</span>
                    </a>
                @endforeach
            </div>
        @endif
    </div>
</section>
