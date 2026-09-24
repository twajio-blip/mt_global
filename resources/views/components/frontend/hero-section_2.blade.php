@props(['data' => []])

<section class="relative overflow-hidden bg-[#0B1F3A]" aria-labelledby="hero-title">
    <div class="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <img
            src="{{ asset('defualt/placeholder.png') }}"
            alt="Skilled construction workers at an overseas project site"
            class="h-full w-full object-cover"
        >
    </div>

    <div class="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="py-12 sm:py-16 lg:w-[62%] lg:py-24 lg:pr-12">
            <p class="flex items-center gap-2 text-sm font-medium text-[#B3C6E4]">
                <i class="fa-solid fa-shield-halved h-4 w-4 text-[#12A06A]"></i>
                RL-123456 Government Approved Recruiting Agency
            </p>

            <h1
                id="hero-title"
                class="mt-4 text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]"
            >
                Find Your Next Overseas Job Opportunity
            </h1>

            <p class="mt-5 max-w-xl text-base leading-relaxed text-[#D9E3F2] sm:text-lg">
                Explore verified job opportunities across the Middle East and other international destinations. Find jobs by
                country and profession and submit your CV directly.
            </p>

            <div class="mt-8 max-w-2xl rounded-2xl bg-white p-3 shadow-[0_2px_4px_rgba(15,27,45,0.06),0_12px_28px_rgba(15,27,45,0.10)] sm:p-4">
                <form action="#" method="GET" class="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <label class="block">
                        <span class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4B5A6E]">
                            <i class="fa-solid fa-location-dot text-[#0E8A5B]"></i>
                            Country
                        </span>
                        <select
                            name="country"
                            class="block h-12 w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]"
                        >
                            <option value="">Any country</option>
                            <option>Saudi Arabia</option>
                            <option>UAE</option>
                            <option>Qatar</option>
                            <option>Romania</option>
                        </select>
                    </label>

                    <label class="block">
                        <span class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4B5A6E]">
                            <i class="fa-solid fa-briefcase text-[#0E8A5B]"></i>
                            Profession
                        </span>
                        <select
                            name="designation"
                            class="block h-12 w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]"
                        >
                            <option value="">Any profession</option>
                            <option>Electrical Technician</option>
                            <option>Heavy Vehicle Driver</option>
                            <option>Construction Worker</option>
                            <option>Factory Worker</option>
                        </select>
                    </label>

                    <button
                        type="submit"
                        class="inline-flex h-12 items-center justify-center gap-2 self-end whitespace-nowrap rounded-lg bg-[#0E8A5B] px-5 text-[15px] font-semibold text-white transition-colors duration-150 ease-out hover:bg-[#0B6F49] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CDEEDD]"
                    >
                        Search jobs
                        <i class="fa-solid fa-arrow-right text-sm"></i>
                    </button>
                </form>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                <span class="text-[#B3C6E4]">Popular:</span>
                <a href="#" class="rounded-full border border-white/20 px-3 py-1 text-white transition-colors duration-150 ease-out hover:border-white/50">
                    Electrician in Saudi Arabia
                </a>
                <a href="#" class="rounded-full border border-white/20 px-3 py-1 text-white transition-colors duration-150 ease-out hover:border-white/50">
                    Driver in UAE
                </a>
                <a href="#" class="rounded-full border border-white/20 px-3 py-1 text-white transition-colors duration-150 ease-out hover:border-white/50">
                    Construction in Qatar
                </a>
                <a href="#" class="rounded-full border border-white/20 px-3 py-1 text-white transition-colors duration-150 ease-out hover:border-white/50">
                    Factory jobs in Romania
                </a>
            </div>

            <p class="mt-10 text-sm text-[#B3C6E4]">
                <span class="font-semibold text-white">2,450 vacancies</span> across
                <span class="font-semibold text-white">86 open jobs</span> in
                <span class="font-semibold text-white">12 countries</span>
            </p>
        </div>
    </div>
</section>
