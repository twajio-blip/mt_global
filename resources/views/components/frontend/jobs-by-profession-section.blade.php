@props(['data' => []])

@php
    $sectionData = [];

    foreach ($data as $item) {
        if (is_array($item) && isset($item['group']) && $item['group'] == 2) {
            $sectionData = is_array($item[0] ?? null) ? $item[0] : [];
            break;
        }
    }

    $sectionTitle = $sectionData['title'] ?? 'Jobs by Profession';
    $sectionSubtitle = $sectionData['subtitl'] ?? 'Pick your trade or profession to see matching openings in every country.';

    $groups = \App\Models\JobDesignationCategory::query()
        ->where('is_active', true)
        ->with(['designations' => function ($query) {
            $query->where('is_active', true)
                ->withCount(['jobs as jobs_count' => fn ($jobQuery) => $jobQuery->where('is_active', true)])
                ->orderBy('name');
        }])
        ->orderBy('name')
        ->get()
        ->map(function ($category) {
            $category->setRelation(
                'designations',
                $category->designations->filter(fn ($designation) => $designation->jobs_count > 0)->values()
            );

            return $category;
        })
        ->filter(fn ($category) => $category->designations->isNotEmpty())
        ->values();
@endphp

<section class="bg-[#F8FAFC] py-16 lg:py-24" aria-labelledby="professions-title">
    <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 id="professions-title" class="text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl">
            {{ $sectionTitle }}
        </h2>
        <p class="mt-3 max-w-xl text-base text-[#475569]">
            {{ $sectionSubtitle }}
        </p>

        <div class="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            @forelse ($groups as $group)
                <div>
                    <h3 class="border-b border-[#D9E3F2] pb-3 text-sm font-semibold text-[#64748B]">
                        {{ $group->name }}
                    </h3>

                    <ul class="mt-2">
                        @foreach ($group->designations as $designation)
                            <li>
                                <a
                                    href="{{ url('/jobs?designation=' . urlencode($designation->slug)) }}"
                                    class="-mx-3 flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-[15px] font-medium text-[#0F1B2D] transition-colors duration-150 ease-out hover:bg-white hover:text-[#1F4580]">
                                    <span>{{ $designation->name }}</span>
                                    <span class="min-w-[28px] rounded-md bg-white px-2 py-0.5 text-center text-[13px] font-semibold tabular-nums text-[#1F4580] ring-1 ring-[#D9E3F2]">
                                        {{ $designation->jobs_count }}
                                    </span>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @empty
                <div class="col-span-full rounded-xl border border-[#E2E8F0] bg-white p-6 text-[#475569]">
                    Add active designations with jobs from admin to show professions here.
                </div>
            @endforelse
        </div>
    </div>
</section>