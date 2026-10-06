@props(['data' => []])

@php
    $item = $data[0][0] ?? $data[0] ?? $data ?? [];
    $title = $item['Title'] ?? $item['title'] ?? 'Welcome to Mongla Customs Agents’ Association';
    $titleBangla = $item['Title (Bangla)'] ?? $item['title_bangla'] ?? 'মোংলা কাস্টমস্ এজেন্টস্ এসোসিয়েশন';
    $description = $item['Description'] ?? $item['description'] ?? '';
    $readMoreLink = $item['Read more link'] ?? $item['read_more_link'] ?? '';
@endphp

<article class="rounded-[4px] border border-[#D8E0E6] bg-white p-4 sm:p-5">
    @if ($title)
        <h1 class="text-[22px] font-semibold leading-snug text-[#073B6B] sm:text-[26px]">
            {{ $title }}
        </h1>
    @endif

    @if ($titleBangla)
        <p class="mt-1 text-[16px] text-[#55697A]">
            {{ $titleBangla }}
        </p>
    @endif

    <div class="mt-3 h-px w-full bg-[#D8E0E6]"></div>

    @if ($description)
        <div class="mt-3 space-y-3 text-[15.5px] leading-relaxed text-[#1E2933] prevent-tailwind-css">
            @if (strip_tags($description) === $description)
                @foreach (explode("\n", str_replace("\r", "", $description)) as $paragraph)
                    @if (trim($paragraph) !== '')
                        <p>{{ trim($paragraph) }}</p>
                    @endif
                @endforeach
            @else
                {!! $description !!}
            @endif
        </div>
    @endif

    @if ($readMoreLink)
        <a href="{{ url($readMoreLink) }}"
            class="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#105493] hover:underline">
            <span>Read More</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>
    @endif
</article>