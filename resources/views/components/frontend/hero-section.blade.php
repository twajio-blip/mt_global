@props(['data' => []])

@php
    // Extract text content from Group 0 safely with fallback defaults
    $textContent = $data[0][0] ?? [];
    $title = $textContent['title'] ?? 'Precision Vertical Transport';
    $subtitle = $textContent['subtitle'] ?? 'Architecture in motion.';
    $description = $textContent['description'] ?? '';
    $btnLink = $textContent['btn_link'] ?? 'contact';
    $btnText = $textContent['btn_text'] ?? 'Request a quote';

    // Extract dynamic backend video if present, otherwise fall back to static asset
    $backendVideo = $data[1][0]['video'] ?? null;
    $videoSrc = $backendVideo ? asset('images/' . $backendVideo) : asset('images/0514 (1).mp4'); 
@endphp

<section
    id="hero-section"
    class="w-full bg-[#F8F6F2] overflow-hidden"
>
    <div class="max-w-7xl mx-auto px-0 md:pl-4 xl:px-4">
        <div class="relative flex flex-col md:flex-row items-center min-h-screen lg:h-screen gap-0">

            {{-- TEXT (40%) --}}
            <div class="w-full md:basis-[40%] z-10 py-16 md:py-0 px-4 md:pr-8 md:pl-0">

                <div class="flex items-center gap-3 mb-4">
                    <span class="text-brand-red font-bold uppercase tracking-widest text-size-sub-header">
                        {{ $title }}
                    </span>
                </div>

                <h1
                    class="text-size-title font-light tracking-tight leading-[1.1] mb-6 text-neutral-900"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    @if(str_contains($subtitle, 'in motion.'))
                        {!! str_replace(
                            'in motion.',
                            '<span class="italic font-normal text-neutral-600">in motion.</span>',
                            e($subtitle)
                        ) !!}
                    @else
                        {{ $subtitle }}
                    @endif
                </h1>

                <p
                    class="text-size-body text-justify text-neutral-600 mb-10 font-light leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {{ $description }}
                </p>

                <div
                    class="flex justify-start"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    <a
                        href="/{{ ltrim($btnLink, '/') }}"
                        class="inline-flex items-center px-4 lg:px-8 py-4 text-size-body bg-brand-charcoal text-white rounded-lg font-bold hover:bg-brand-red transition-all duration-300 shadow-xl group"
                    >
                        {{ $btnText }}
                        <i class="fa-solid fa-arrow-right text-size-sub-header ml-2 group-hover:translate-x-2 transition-transform"></i>
                    </a>
                </div>

            </div>

            {{-- VIDEO (60%) --}}
            <div class="relative w-full md:basis-[60%] h-[320px] sm:h-[420px] md:h-full bg-neutral-950">

                <video
                    autoplay
                    muted
                    loop
                    playsinline
                    class="w-full h-full object-cover opacity-85 transition-opacity duration-700"
                >
                    <source src="{{ $videoSrc }}" type="video/mp4">
                </video>

                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-neutral-950/20 pointer-events-none"></div>

            </div>

            {{-- Divider (Centered perfectly on the 40% line using -translate-x-1/2) --}}
            <div
                class="hidden md:block absolute inset-y-0 left-[40%] -translate-x-1/2 pointer-events-none z-20"
                style="width:2px;"
            >
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red/20 to-transparent"></div>

                <div
                    id="hero-center-beam"
                    class="absolute flex flex-col items-center"
                    style="width:2px; top:-200px;"
                >
                    <div
                        style="width:2px;height:180px;background:linear-gradient(to bottom,transparent 0%,rgba(227,0,43,0.3) 40%,rgba(255,58,92,0.8) 80%,#fff 100%);border-radius:9999px;"
                    ></div>

                    <div
                        style="width:6px;height:18px;background:#fff;border-radius:9999px;box-shadow:0 0 15px 6px rgba(255,58,92,.9),0 0 30px 8px rgba(227,0,43,.6);margin-top:-8px;"
                    ></div>
                </div>
            </div>
        </div>

    </div>
</section>

@once
    @push('css')
        <style>
            @keyframes horizontal-scan {
                0% { top: -5px; opacity: 0; }
                5% { opacity: 0.8; }
                95% { opacity: 0.8; }
                100% { top: 100%; opacity: 0; }
            }

            @keyframes hero-center-scan {
                0% { top: -200px; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }

            #hero-center-beam {
                animation: hero-center-scan 5s linear infinite;
            }
        </style>
    @endpush
@endonce