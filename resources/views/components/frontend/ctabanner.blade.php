@props(['data' => []])

@php
    $content = $data[0][0] ?? [];
    $placeholder = asset('21ea1e0c-a409-4e2b-8c5b-ac92f542fe62.jpg');
    $image = $placeholder;

    if (!empty($content['image'])) {
        $imagePath = ltrim($content['image'], '/');
        $image = \Illuminate\Support\Str::startsWith($imagePath, ['http://', 'https://'])
            ? $imagePath
            : asset('images/' . $imagePath);
    }
@endphp

<section class="py-16 lg:py-24 bg-white" aria-labelledby="cta-title">
    <div class="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div class="grid overflow-hidden rounded-2xl bg-[#1F4580] lg:grid-cols-2">
            <div class="p-8 sm:p-12 lg:p-14">
                <h2 id="cta-title" class="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {{ $content['title'] ?? '' }}
                </h2>

                <p class="mt-4 max-w-md text-base leading-relaxed text-[#D9E3F2]">
                    {{ $content['subtitle'] ?? '' }}
                </p>

                <a
                    href="{{ url($content['btn_link'] ?? '#') }}"
                    class="mt-8 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#0E8A5B] px-5 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[#0B6F49] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#BFE7D7]"
                >
                    {{ $content['btn_text'] ?? '' }}
                    <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                </a>
            </div>

            <img
                src="{{ $image }}"
                alt="{{ $content['title'] ?? 'CTA banner' }}"
                loading="lazy"
                class="h-64 w-full object-cover lg:h-full"
                onerror="this.onerror=null; this.src='{{ $placeholder }}';"
            >
        </div>
    </div>
</section>
