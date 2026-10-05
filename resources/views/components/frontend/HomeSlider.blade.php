@props(['data' => []])

@php
    $slides = [];
    $rawInstances = null;

    if (isset($data[0][0]['instances'])) {
        $rawInstances = $data[0][0]['instances'];
    } elseif (isset($data[0]['instances'])) {
        $rawInstances = $data[0]['instances'];
    } elseif (isset($data['instances'])) {
        $rawInstances = $data['instances'];
    }

    if (is_array($rawInstances)) {
        foreach ($rawInstances as $item) {
            $img = $item['Image'] ?? $item['image'] ?? '';
            $caption = $item['Caption'] ?? $item['caption'] ?? '';
            if ($img) {
                $src = (str_starts_with($img, 'http') || str_starts_with($img, '/')) ? $img : asset('images/' . $img);
                $slides[] = [
                    'image' => $src,
                    'caption' => $caption,
                ];
            }
        }
    }
@endphp

@if (count($slides) > 0)
    <section aria-roledescription="carousel" aria-label="Association image slider"
        class="relative overflow-hidden rounded-[4px] border border-[#D8E0E6] bg-white"
        x-data="{
            index: 0,
            total: {{ count($slides) }},
            timer: null,
            init() {
                this.startTimer();
            },
            startTimer() {
                this.stopTimer();
                this.timer = setInterval(() => {
                    this.next();
                }, 6000);
            },
            stopTimer() {
                if (this.timer) clearInterval(this.timer);
            },
            next() {
                this.index = (this.index + 1) % this.total;
            },
            prev() {
                this.index = (this.index - 1 + this.total) % this.total;
            },
            goTo(i) {
                this.index = i;
                this.startTimer();
            }
        }"
        @mouseenter="stopTimer()"
        @mouseleave="startTimer()">

        <div class="relative h-[210px] sm:h-[300px] lg:h-[356px]">
            @foreach ($slides as $i => $slide)
                <img src="{{ $slide['image'] }}" alt="{{ $slide['caption'] }}"
                    x-show="index === {{ $i }}"
                    x-transition:enter="transition-opacity duration-500"
                    x-transition:enter-start="opacity-0"
                    x-transition:enter-end="opacity-100"
                    x-transition:leave="transition-opacity duration-500"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                    class="absolute inset-0 h-full w-full object-cover">
            @endforeach

            <!-- Prev button -->
            <button type="button" @click="prev(); startTimer();" aria-label="Previous slide"
                class="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[4px] bg-black/45 text-white hover:bg-black/65 focus:outline-none">
                <i class="fa-solid fa-chevron-left text-sm"></i>
            </button>

            <!-- Next button -->
            <button type="button" @click="next(); startTimer();" aria-label="Next slide"
                class="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[4px] bg-black/45 text-white hover:bg-black/65 focus:outline-none">
                <i class="fa-solid fa-chevron-right text-sm"></i>
            </button>

            <!-- Dots -->
            <div class="absolute bottom-[10px] right-3 flex gap-1.5 z-10">
                @foreach ($slides as $i => $slide)
                    <button type="button" @click="goTo({{ $i }})"
                        aria-label="Go to slide {{ $i + 1 }}"
                        :class="index === {{ $i }} ? 'bg-[#D5A63F]' : 'bg-white/40'"
                        class="h-2.5 w-2.5 rounded-full border border-white/70 transition-colors focus:outline-none">
                    </button>
                @endforeach
            </div>
        </div>

        <!-- Caption bar -->
        <div class="bg-[#073B6B] px-3 py-2">
            @foreach ($slides as $i => $slide)
                <p x-show="index === {{ $i }}" class="truncate text-[14px] text-white font-medium">
                    {{ $slide['caption'] }}
                </p>
            @endforeach
        </div>
    </section>
@endif