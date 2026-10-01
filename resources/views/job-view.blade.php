@php
    $country = $job->country;
    $countryName = $country?->name ?? 'Overseas';
    $location = $job->countryLocation?->name ?? $job->location;
    $designation = $job->jobDesignation?->name ?? $job->designation;
    $benefits = $job->benefits ?? collect();
    $summaryFields = collect([
        ['Country', $countryName],
        ['Job Location', $location],
        ['Designation', $designation],
        ['Employer / Company', $job->employer],
        ['Number of Vacancies', $job->vacancies !== null ? (string) number_format((int) $job->vacancies) : null],
        ['Salary', $job->salary, true],
        ['Employment Type', $job->employment_type],
        ['Contract Duration', $job->contract_duration],
        ['Working Hours', $job->working_hours],
        ['Overtime', $job->overtime],
        ['Experience', $job->experience],
        ['Education', $job->education],
        ['Age', $job->age],
        ['Gender', $job->gender],
        ['Application Deadline', $job->deadline?->format('M d, Y')],
    ])->filter(fn ($field) => filled($field[1]));
    $contentSections = collect([
        ['id' => 'description', 'title' => 'Job Description', 'html' => $job->description],
        ['id' => 'responsibilities', 'title' => 'Responsibilities', 'html' => $job->responsibilities],
        ['id' => 'requirements', 'title' => 'Candidate Requirements', 'html' => $job->requirements],
        ['id' => 'additional', 'title' => 'Additional Information', 'html' => $job->additional_info],
    ])->filter(fn ($section) => filled($section['html']));
@endphp

<x-Guest-layout :pageinfo="$page">
    <div class="bg-[#F8FAFC] font-sans text-[#0F1B2D]">
    @if (session('success'))
        <div class="bg-[#DCFCE7] text-[#166534]">
            <p class="mx-auto w-full max-w-[1240px] px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
                {{ session('success') }}
            </p>
        </div>
    @endif

    @if ($errors->any())
        <div class="bg-[#FEE2E2] text-[#991B1B]">
            <div class="mx-auto w-full max-w-[1240px] px-4 py-3 text-sm sm:px-6 lg:px-8">
                <p class="font-semibold">CV was not submitted. Please check the form below.</p>
                <p class="mt-1">{{ $errors->first() }}</p>
            </div>
        </div>
    @endif

    @if (($job->status ?? 'active') !== 'active')
        <div class="bg-[#FEF3C7] text-[#92400E]">
            <p class="mx-auto flex w-full max-w-[1240px] items-center gap-2 px-4 py-2.5 text-sm font-medium sm:px-6 lg:px-8">
                <i class="fa-solid fa-triangle-exclamation text-sm" aria-hidden="true"></i>
                Preview only - this job is {{ $job->status }} and not visible to job seekers.
            </p>
        </div>
    @endif

    <section class="border-b border-[#E2E8F0] bg-white">
        <div class="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 md:py-10 lg:px-8">
            <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-1 text-sm text-[#64748B]">
                <a href="{{ url('/jobs') }}" class="hover:text-[#1F4580]">Jobs</a>
                <i class="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
                <a href="{{ url('/jobs?' . http_build_query(['country' => $country?->slug])) }}" class="hover:text-[#1F4580]">{{ $countryName }}</a>
                <i class="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
                <span class="truncate text-[#334155]" aria-current="page">{{ $job->title }}</span>
            </nav>

            <div class="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div class="min-w-0">
                    <p class="flex items-center gap-2 text-[15px] font-semibold text-[#1F4580]">
                        @if ($country?->flag_code)
                            <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" aria-hidden="true" class="h-5 w-7 rounded-[2px] object-cover ring-1 ring-black/10">
                        @endif
                        {{ $countryName }}
                        @if ($location)
                            <span class="font-normal text-[#64748B]">/ {{ $location }}</span>
                        @endif
                    </p>
                    <h1 class="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#0F1B2D] md:text-[40px]">{{ $job->title }}</h1>
                    <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-[#475569]">
                        @if ($job->employer)
                            <span class="flex items-center gap-1.5">
                                <i class="fa-regular fa-building text-[#94A3B8]" aria-hidden="true"></i>
                                {{ $job->employer }}
                            </span>
                        @endif
                        <span class="flex items-center gap-1.5">
                            <i class="fa-solid fa-briefcase text-[#94A3B8]" aria-hidden="true"></i>
                            {{ $designation }}
                        </span>
                        <span class="flex items-center gap-1.5">
                            <i class="fa-regular fa-calendar text-[#94A3B8]" aria-hidden="true"></i>
                            Published {{ $job->created_at?->format('M d, Y') }}
                        </span>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button type="button" onclick="navigator.share ? navigator.share({title: document.title, url: location.href}) : navigator.clipboard.writeText(location.href)" class="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-[15px] font-semibold text-[#0F1B2D] transition-colors hover:border-[#B9CCE7] hover:text-[#1F4580]">
                        <i class="fa-solid fa-share-nodes text-sm" aria-hidden="true"></i>
                        Share
                    </button>
                    <a href="#apply" class="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0E8A5B] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#0B6F49] lg:flex-none">
                        <i class="fa-solid fa-upload text-sm" aria-hidden="true"></i>
                        Submit Your CV
                    </a>
                </div>
            </div>
        </div>
    </section>

    <main class="mx-auto mt-6 grid w-full max-w-[1240px] gap-6 px-4 pb-28 sm:px-6 md:mt-8 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20">
        <div class="space-y-6 lg:col-span-8">
            <section aria-labelledby="summary-title" class="rounded-2xl border border-[#E2E8F0] bg-white">
                <h2 id="summary-title" class="border-b border-[#E2E8F0] px-5 py-4 text-lg font-semibold text-[#0F1B2D] md:px-6">
                    Job Summary
                </h2>
                <dl class="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 md:grid-cols-3 md:px-6">
                    @foreach ($summaryFields as $field)
                        <div>
                            <dt class="text-[13px] text-[#64748B]">{{ $field[0] }}</dt>
                            <dd class="mt-1 text-[15px] font-medium {{ !empty($field[2]) ? 'text-[#0E8A5B]' : 'text-[#0F1B2D]' }}">
                                {{ $field[1] }}
                            </dd>
                        </div>
                    @endforeach
                </dl>

                @if ($benefits->isNotEmpty())
                    <div class="border-t border-[#E2E8F0] px-5 py-5 md:px-6">
                        <h3 class="text-sm font-semibold text-[#0F1B2D]">Benefits / Facilities</h3>
                        <ul class="mt-3 flex flex-wrap gap-2">
                            @foreach ($benefits as $benefit)
                                <li class="flex items-center gap-1.5 rounded-lg bg-[#ECFDF5] px-3 py-2 text-sm font-medium text-[#0E8A5B]">
                                    <i class="fa-solid fa-circle-check text-sm"></i>
                                    {{ $benefit->name }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </section>

            @if ($contentSections->isNotEmpty())
                <div class="divide-y divide-[#E2E8F0] rounded-2xl border border-[#E2E8F0] bg-white">
                    @foreach ($contentSections as $section)
                        <section aria-labelledby="sec-{{ $section['id'] }}" class="px-5 py-6 md:px-6">
                            <h2 id="sec-{{ $section['id'] }}" class="text-lg font-semibold text-[#0F1B2D]">{{ $section['title'] }}</h2>
                            <div class="rich-content mt-3 prose prose-slate max-w-none text-[#475569]">
                                {!! $section['html'] !!}
                            </div>
                        </section>
                    @endforeach
                </div>
            @endif

            @if ($job->visa_type)
                <section aria-labelledby="visa-title" class="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-6 md:px-6">
                    <h2 id="visa-title" class="flex items-center gap-2 text-lg font-semibold text-[#0F1B2D]">
                        <i class="fa-solid fa-stamp text-[#1F4580]" aria-hidden="true"></i>
                        Visa Information
                    </h2>
                    <dl class="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                            <dt class="text-[13px] text-[#64748B]">Visa Type</dt>
                            <dd class="mt-1 text-[15px] font-medium text-[#0F1B2D]">{{ $job->visa_type }}</dd>
                        </div>
                        <div>
                            <dt class="text-[13px] text-[#64748B]">Country</dt>
                            <dd class="mt-1 flex items-center gap-2 text-[15px] font-medium text-[#0F1B2D]">
                                @if ($country?->flag_code)
                                    <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" aria-hidden="true" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                                @endif
                                {{ $countryName }}
                            </dd>
                        </div>
                        @if ($job->contract_duration)
                            <div>
                                <dt class="text-[13px] text-[#64748B]">Contract Duration</dt>
                                <dd class="mt-1 text-[15px] font-medium text-[#0F1B2D]">{{ $job->contract_duration }}</dd>
                            </div>
                        @endif
                    </dl>
                    @if ($job->visa_info)
                        <div class="rich-content mt-4 prose prose-slate max-w-none text-[#475569]">{!! $job->visa_info !!}</div>
                    @endif
                    <p class="mt-4 text-[13px] text-[#64748B]">Visa approval is decided by the destination country's authorities and is not guaranteed.</p>
                </section>
            @endif

            <section id="apply" aria-labelledby="apply-title" class="scroll-mt-28 overflow-hidden rounded-2xl border border-[#1F4580] bg-white">
                <div class="bg-[#1F4580] px-5 py-5 md:px-8">
                    <h2 id="apply-title" class="text-xl font-bold text-white md:text-2xl">
                        Apply for This Job
                    </h2>
                    <p class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-[#D9E3F2]">
                        <span>Applying for</span>
                        <span class="font-semibold text-white">{{ $job->title }}</span>
                        <span aria-hidden="true">/</span>
                        <span class="flex items-center gap-1.5 font-semibold text-white">
                            @if ($country?->flag_code)
                                <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" aria-hidden="true" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                            @endif
                            {{ $countryName }}
                        </span>
                    </p>
                </div>

                <div class="p-5 md:p-8">
                    @if (session('success'))
                        <div class="mb-6 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm font-semibold text-[#166534]">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if ($errors->any())
                        <div class="mb-6 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                            <p class="font-semibold">Please fix the highlighted fields and try again.</p>
                            <ul class="mt-2 list-disc space-y-1 pl-5">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <p class="mb-6 text-[15px] text-[#475569]">
                        Upload your existing CV - no account or CV builder needed. Your application is linked to this job automatically.
                    </p>

                    <form action="{{ route('job.apply', $job) }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <label for="apply-fullName" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Full Name <span class="text-[#DC2626]">*</span></label>
                                <input id="apply-fullName" name="full_name" value="{{ old('full_name') }}" type="text" autocomplete="name" placeholder="As written on your passport" required class="block h-12 w-full rounded-lg border border-[#CBD5E1] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                            </div>
                            <div>
                                <label for="apply-phone" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Phone Number <span class="text-[#DC2626]">*</span></label>
                                <input id="apply-phone" name="phone" value="{{ old('phone') }}" type="tel" autocomplete="tel" placeholder="+880 1XXX-XXXXXX" required class="block h-12 w-full rounded-lg border border-[#CBD5E1] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                                <p class="mt-1 text-[12px] text-[#64748B]">WhatsApp number preferred</p>
                            </div>
                            <div>
                                <label for="apply-email" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Email Address <span class="text-[#DC2626]">*</span></label>
                                <input id="apply-email" name="email" value="{{ old('email') }}" type="email" autocomplete="email" placeholder="you@example.com" required class="block h-12 w-full rounded-lg border border-[#CBD5E1] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                            </div>
                            <div>
                                <label for="apply-currentLocation" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Current Country / Location <span class="text-[#DC2626]">*</span></label>
                                <input id="apply-currentLocation" name="current_location" value="{{ old('current_location') }}" type="text" autocomplete="address-level2" placeholder="e.g. Dhaka, Bangladesh" required class="block h-12 w-full rounded-lg border border-[#CBD5E1] bg-white px-3.5 text-[15px] text-[#0F1B2D] outline-none placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">
                            </div>
                            <div class="md:col-span-2">
                                <label for="apply-cv" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Upload CV <span class="text-[#DC2626]">*</span></label>
                                <label for="apply-cv" class="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-5 py-8 text-center transition-colors hover:border-[#1F4580]">
                                    <i class="fa-solid fa-file-arrow-up text-3xl text-[#1F4580]"></i>
                                    <span class="mt-3 text-sm font-semibold text-[#0F1B2D]">Choose your CV file</span>
                                    <span class="mt-1 text-xs text-[#64748B]">PDF, DOC or DOCX preferred</span>
                                </label>
                                <input id="apply-cv" name="cv" type="file" accept=".pdf,.doc,.docx" required class="sr-only">
                            </div>
                            <div class="md:col-span-2">
                                <label for="apply-message" class="mb-1.5 block text-sm font-semibold text-[#0F1B2D]">Short Message <span class="font-normal text-[#64748B]">(optional)</span></label>
                                <textarea id="apply-message" name="message" rows="3" placeholder="Years of experience, current job, notice period..." class="block w-full rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-3 text-[15px] text-[#0F1B2D] outline-none placeholder:text-[#94A3B8] focus:border-[#1F4580] focus:ring-4 focus:ring-[#D9E3F2]">{{ old('message') }}</textarea>
                            </div>
                        </div>

                        <div class="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                            <label for="apply-consent" class="flex gap-3 text-[14px] leading-relaxed text-[#334155]">
                                <input id="apply-consent" name="consent" value="1" type="checkbox" required class="mt-1 h-4 w-4 shrink-0 rounded border-[#CBD5E1] text-[#1F4580] focus:ring-[#D9E3F2]">
                                <span>
                                    I confirm that the information I have provided is accurate and I consent to the processing of my personal information and CV for recruitment and overseas employment purposes.
                                </span>
                            </label>
                            <p class="mt-3 text-[13px] leading-relaxed text-[#64748B]">
                                By submitting your CV, you acknowledge that submission does not guarantee employment, selection or visa approval.
                            </p>
                        </div>

                        <div class="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p class="flex items-center gap-2 text-[13px] text-[#64748B]">
                                <i class="fa-solid fa-lock text-xs" aria-hidden="true"></i>
                                Your CV is only shared with our recruitment team and this employer.
                            </p>
                            <button type="submit" class="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#0E8A5B] px-8 text-base font-semibold text-white transition-colors hover:bg-[#0B6F49] sm:w-auto">
                                Submit CV
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>

        <aside class="lg:col-span-4">
            <div class="space-y-6 lg:sticky lg:top-32">
                <div class="hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:block">
                    <p class="text-[13px] text-[#64748B]">Salary</p>
                    <p class="mt-1 text-2xl font-bold text-[#0E8A5B]">{{ $job->salary ?? 'On request' }}</p>
                    <ul class="mt-5 space-y-3 border-t border-[#E2E8F0] pt-5 text-[15px] text-[#334155]">
                        <li class="flex items-center gap-2.5"><i class="fa-solid fa-users text-[#94A3B8]"></i>{{ number_format((int) $job->vacancies) }} vacancies</li>
                        @if ($job->contract_duration)
                            <li class="flex items-center gap-2.5"><i class="fa-regular fa-clock text-[#94A3B8]"></i>{{ $job->contract_duration }}</li>
                        @endif
                        @if ($job->deadline)
                            <li class="flex items-center gap-2.5"><i class="fa-regular fa-calendar text-[#94A3B8]"></i>Apply by {{ $job->deadline->format('M d, Y') }}</li>
                        @endif
                    </ul>
                    <a href="#apply" class="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0E8A5B] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0B6F49]">
                        <i class="fa-solid fa-upload text-sm" aria-hidden="true"></i>
                        Submit Your CV
                    </a>
                    <p class="mt-3 text-center text-[13px] text-[#64748B]">Takes about 2 minutes with your existing CV</p>
                </div>

                @if ($relatedJobs->isNotEmpty())
                    <div class="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                        <h2 class="text-base font-semibold text-[#0F1B2D]">More jobs in {{ $countryName }}</h2>
                        <ul class="mt-3 divide-y divide-[#E2E8F0]">
                            @foreach ($relatedJobs as $related)
                                <li>
                                    <a href="{{ route('job.view', $related->id) }}" class="group block py-3">
                                        <p class="font-medium text-[#0F1B2D] group-hover:text-[#1F4580]">{{ $related->title }}</p>
                                        <p class="mt-0.5 flex items-center gap-1.5 text-[13px] text-[#64748B]">
                                            <i class="fa-solid fa-location-dot text-xs" aria-hidden="true"></i>
                                            {{ $related->countryLocation?->name ?? $related->location ?? $related->country?->name }}
                                            / {{ number_format((int) $related->vacancies) }} vacancies
                                        </p>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </aside>
    </main>

    <div class="fixed inset-x-0 bottom-0 z-30 border-t border-[#E2E8F0] bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,27,45,0.10)] backdrop-blur lg:hidden">
        <div class="mx-auto flex max-w-[1240px] items-center justify-between gap-3">
            <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-[#0E8A5B]">{{ $job->salary ?? 'Salary on request' }}</p>
                <p class="text-xs text-[#64748B]">{{ number_format((int) $job->vacancies) }} vacancies</p>
            </div>
            <a href="#apply" class="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#0E8A5B] px-4 text-sm font-semibold text-white">Submit CV</a>
        </div>
    </div>
    </div>
</x-Guest-layout>
