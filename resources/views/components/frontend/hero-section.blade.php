@props(['data' => []])

@php
    $jobCountries = \App\Models\JobCountry::withCount(['jobs' => fn ($query) => $query->where('is_active', true)])
        ->where('is_active', true)
        ->orderBy('name')
        ->get();

    $jobDesignations = \App\Models\JobDesignation::where('is_active', true)
        ->orderBy('name')
        ->get();

    $openJobsCount = \App\Models\CountryJob::where('is_active', true)->count();
    $vacanciesCount = \App\Models\CountryJob::where('is_active', true)->sum('vacancies');
    $countryCount = $jobCountries->count();
    $popularJobs = \App\Models\CountryJob::with(['country', 'jobDesignation'])
        ->where('is_active', true)
        ->latest()
        ->limit(4)
        ->get();
@endphp

<section class="relative bg-background overflow-hidden" aria-labelledby="hero-title">
    <div class="hidden lg:block right-0 absolute inset-y-0 w-[42%]">
        <img
            src="{{ asset('defualt/placeholder.png') }}"
            alt="Skilled construction workers at an overseas project site"
            class="w-full h-full object-cover"
        >
    </div>

    <div class="relative container">
        <div class="py-12 sm:py-16 lg:py-24 lg:pr-12 lg:w-[62%]">
            <p class="flex items-center gap-2 font-medium text-[#B3C6E4] text-sm">
                <i class="w-4 h-4 text-[#12A06A] fa-solid fa-shield-halved"></i>
                RL-123456 Government Approved Recruiting Agencys
            </p>

            <h1
                id="hero-title"
                class="mt-4 font-bold text-[34px] text-white lg:text-[48px] sm:text-5xl leading-[1.1] tracking-tight"
            >
                Find Your Next Overseas Job Opportunity
            </h1>

            <p class="mt-5 max-w-xl text-[#D9E3F2] text-base sm:text-lg leading-relaxed">
                Explore verified job opportunities across the Middle East and other international destinations. Find jobs by
                country and profession and submit your CV directly.
            </p>

            <div class="bg-white shadow-[0_2px_4px_rgba(15,27,45,0.06),0_12px_28px_rgba(15,27,45,0.10)] mt-8 p-3 sm:p-4 rounded-2xl max-w-2xl">
                <form action="#" method="GET" class="gap-3 grid md:grid-cols-[1fr_1fr_auto]">
                    <label class="block">
                        <span class="flex items-center gap-1.5 mb-1.5 font-semibold text-[#4B5A6E] text-xs uppercase tracking-wide">
                            <i class="text-[#0E8A5B] fa-solid fa-location-dot"></i>
                            Country
                        </span>
                        <select
                            name="country"
                            class="block bg-white px-3.5 border border-[#E2E8F0] focus:border-[#1F4580] rounded-lg outline-none focus:ring-[#D9E3F2] focus:ring-4 w-full h-12 text-[#0F1B2D] text-[15px] transition-[border-color,box-shadow] duration-150 ease-out"
                        >
                            <option value="">Any country</option>
                            @foreach ($jobCountries as $country)
                                <option value="{{ $country->slug }}">{{ $country->name }}</option>
                            @endforeach
                        </select>
                    </label>

                    <label class="block">
                        <span class="flex items-center gap-1.5 mb-1.5 font-semibold text-[#4B5A6E] text-xs uppercase tracking-wide">
                            <i class="text-[#0E8A5B] fa-solid fa-briefcase"></i>
                            Profession
                        </span>
                        <select
                            name="designation"
                            class="block bg-white px-3.5 border border-[#E2E8F0] focus:border-[#1F4580] rounded-lg outline-none focus:ring-[#D9E3F2] focus:ring-4 w-full h-12 text-[#0F1B2D] text-[15px] transition-[border-color,box-shadow] duration-150 ease-out"
                        >
                            <option value="">Any profession</option>
                            @foreach ($jobDesignations as $designation)
                                <option value="{{ $designation->slug }}">{{ $designation->name }}</option>
                            @endforeach
                        </select>
                    </label>

                    <button
                        type="submit"
                        class="inline-flex justify-center items-center self-end gap-2 bg-[#0E8A5B] hover:bg-[#0B6F49] px-5 rounded-lg focus-visible:outline-none focus-visible:ring-[#CDEEDD] focus-visible:ring-4 h-12 font-semibold text-[15px] text-white whitespace-nowrap transition-colors duration-150 ease-out"
                    >
                        Search jobs
                        <i class="fa-arrow-right text-sm fa-solid"></i>
                    </button>
                </form>
            </div>

            <div class="flex flex-wrap items-center gap-x-2 gap-y-2 mt-5 text-sm">
                <span class="text-[#B3C6E4]">Popular:</span>
                @forelse ($popularJobs as $job)
                    <a href="#" class="px-3 py-1 border border-white/20 hover:border-white/50 rounded-full text-white transition-colors duration-150 ease-out">
                        {{ $job->jobDesignation?->name ?? $job->designation }} in {{ $job->country?->name }}
                    </a>
                @empty
                    <span class="px-3 py-1 border border-white/20 rounded-full text-white">
                        Add jobs from admin
                    </span>
                @endforelse
            </div>

            <p class="mt-10 text-[#B3C6E4] text-sm">
                <span class="font-semibold text-white">{{ number_format($vacanciesCount) }} vacancies</span> across
                <span class="font-semibold text-white">{{ number_format($openJobsCount) }} open jobs</span> in
                <span class="font-semibold text-white">{{ number_format($countryCount) }} countries</span>
            </p>
        </div>
    </div>
</section>
