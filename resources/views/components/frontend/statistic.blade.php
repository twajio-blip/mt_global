@props(['data' => []])

@php
    /**
     * Data Mapping
     */
    $stats = $data[0][0]['instances'] ?? [];
@endphp

<link rel="stylesheet" href="{{ asset('css/aos.css') }}">

<div class="py-16 lg:py-24 bg-brand-red relative overflow-hidden">

    <div class="max-w-7xl mx-auto px-4 relative z-10">

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">

            @foreach($stats as $index => $stat)

                @php
                    $rawNumber = trim($stat['states_number'] ?? '0');

                    /**
                     * Special case for 24/7
                     */
                    if ($rawNumber === '24/7') {

                        $numberOnly = 24;
                        $suffix = '/7';
                        $isCustom = true;

                    } else {

                        /**
                         * Standard numbers
                         * Example:
                         * 500+ => 500 + "+"
                         */

                        $numberOnly = preg_replace('/[^0-9]/', '', $rawNumber);

                        if (empty($numberOnly)) {
                            $numberOnly = 0;
                        }

                        $suffix = preg_replace('/[0-9]/', '', $rawNumber);

                        $isCustom = false;
                    }
                @endphp

                {{-- Stat Item --}}
                <div
                    class="flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-delay="{{ $index * 100 }}"
                >

                    {{-- Number --}}
                    <div class="mb-0 lg:mb-2 flex items-baseline justify-center">

                        {{-- Animated Number --}}
                        <span
                            class="purecounter text-size-title font-bold text-white"
                            data-target="{{ $numberOnly }}"
                        >
                            0
                        </span>

                        {{-- Suffix --}}
                        @if(!empty($suffix))

                            <span
                                class="
                                    text-size-title
                                    font-bold
                                    text-white
                                    {{ $isCustom ? 'ml-[2px]' : 'ml-1' }}
                                "
                            >
                                {{ $suffix }}
                            </span>

                        @endif

                    </div>

                    {{-- Description --}}
                    <p class="text-white/80 font-medium text-size-sub-header uppercase tracking-wider">
                        {{ $stat['stats_desc'] ?? 'Statistic' }}
                    </p>

                </div>

            @endforeach

        </div>

    </div>

</div>

<script src="{{ asset('js/aos.js') }}"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {

        /**
         * Initialize AOS
         */
        if (typeof AOS !== 'undefined') {
            AOS.init();
        }

        /**
         * Counter Animation
         */
        const counters = document.querySelectorAll('.purecounter');

        const duration = 2000;

        const animateCounter = (el) => {

            const targetAttr = el.getAttribute('data-target');

            const target = parseInt(targetAttr) || 0;

            let startTime = null;

            if (target === 0) {

                el.innerText = "0";

                return;
            }

            const step = (currentTime) => {

                if (!startTime) {
                    startTime = currentTime;
                }

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                /**
                 * Ease Out Expo
                 */
                const easeProgress =
                    progress === 1
                        ? 1
                        : 1 - Math.pow(2, -10 * progress);

                el.innerText = Math.floor(
                    easeProgress * target
                );

                if (progress < 1) {

                    requestAnimationFrame(step);

                } else {

                    el.innerText = target;

                }

            };

            requestAnimationFrame(step);

        };

        /**
         * Start animation when visible
         */
        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    setTimeout(() => {

                        animateCounter(entry.target);

                    }, 400);

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        counters.forEach(counter => observer.observe(counter));

    });
</script>