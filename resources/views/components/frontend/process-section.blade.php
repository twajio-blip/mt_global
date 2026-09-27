@props(['data' => []])

@php
    $steps = [
        [
            'title' => 'Find a Job',
            'text' => 'Browse jobs by country or profession.',
        ],
        [
            'title' => 'Review the Opportunity',
            'text' => 'Check job details, requirements, salary, vacancies, and destination.',
        ],
        [
            'title' => 'Submit Your CV',
            'text' => 'Upload your existing CV directly for the selected job.',
        ],
    ];
@endphp

<section class="border-y border-[#E2E8F0] bg-white py-16 lg:py-24" aria-labelledby="process-title">
    <div class="mx-auto grid w-full max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div class="lg:col-span-5">
            <h2 id="process-title" class="text-3xl font-bold tracking-tight text-[#0F1B2D] md:text-4xl">
                Find and Apply for Overseas Jobs Easily
            </h2>
            <p class="mt-4 max-w-md text-base leading-relaxed text-[#475569]">
                No account, no long forms. If you already have a CV, you can apply for any job in about two minutes from your phone.
            </p>
        </div>

        <ol class="relative lg:col-span-7">
            @foreach ($steps as $index => $step)
                <li class="relative flex gap-5 pb-10 last:pb-0">
                    @if ($index < count($steps) - 1)
                        <span class="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-[#E2E8F0]" aria-hidden="true"></span>
                    @endif

                    <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F4580] text-[15px] font-bold text-white">
                        {{ $index + 1 }}
                    </span>

                    <div class="pt-1.5">
                        <h3 class="text-lg font-semibold text-[#0F1B2D]">{{ $step['title'] }}</h3>
                        <p class="mt-1 text-[15px] text-[#475569]">{{ $step['text'] }}</p>
                    </div>
                </li>
            @endforeach
        </ol>
    </div>
</section>
