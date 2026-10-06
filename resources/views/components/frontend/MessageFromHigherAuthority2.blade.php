@props(['data' => []])

@php
    $item = [];

    if (is_array($data)) {
        foreach ($data as $record) {
            if (!is_array($record)) {
                continue;
            }

            foreach ($record as $subVal) {
                if (is_array($subVal)) {
                    if (isset($subVal['instances']) && is_array($subVal['instances'])) {
                        foreach ($subVal['instances'] as $inst) {
                            if (is_array($inst) && !empty($inst)) {
                                $item = array_merge($item, $inst);
                            }
                        }
                    } else {
                        $item = array_merge($item, $subVal);
                    }
                }
            }

            if (empty($item)) {
                $item = array_merge($item, $record);
            }
        }
    }

    $title = $item['title'] ?? $item['Title'] ?? 'Message from General Secretary';
    $name = $item['name'] ?? $item['Name'] ?? '';
    $designation = $item['designation'] ?? $item['Designation'] ?? '';
    $company = $item['location'] ?? $item['Company'] ?? $item['company'] ?? '';
    $image = $item['image'] ?? $item['Image'] ?? '';
    $message = $item['message'] ?? $item['Message'] ?? $item['Excerpt'] ?? '';
    $link = $item['link'] ?? $item['Link'] ?? '';

    $src = asset('defualt/placeholder.png');
    if ($image) {
        $filePath = parse_url($image, PHP_URL_PATH) ?? $image;
        $filePath = ltrim($filePath, '/');
        if (!str_contains($filePath, '/')) {
            $filePath = 'images/' . $filePath;
        }
        $src = asset($filePath);
    }

    $isExternalLink = str_starts_with($link, 'http://') || str_starts_with($link, 'https://');
    $linkHref = $isExternalLink ? $link : url($link);
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    @if($title)
        <h2 class="bg-[#105493] px-3 py-[9px] text-[14px] font-semibold uppercase tracking-wide text-white">
            {{ $title }}
        </h2>
    @endif

    <div class="p-3 space-y-2">
        <div class="flex gap-3 items-start">
            @if($image)
                <img src="{{ $src }}" alt="{{ $name }}"
                    class="h-[74px] w-[62px] shrink-0 rounded-[4px] border border-[#D8E0E6] object-cover">
            @endif
            <div class="min-w-0">
                @if($name)
                    <p class="text-[14px] font-semibold leading-snug text-[#073B6B]">{{ $name }}</p>
                @endif
                @if($designation)
                    <p class="text-[13px] font-medium text-[#105493]">{{ $designation }}</p>
                @endif
                @if($company)
                    <p class="text-[13px] leading-snug text-[#55697A]">{{ $company }}</p>
                @endif
            </div>
        </div>

        @if($message)
            <div class="text-[14px] leading-relaxed text-[#1E2933] line-clamp-4 prevent-tailwind-css">
                @if (strip_tags($message) === $message)
                    <p>{{ $message }}</p>
                @else
                    {!! $message !!}
                @endif
            </div>
        @endif

        @if($link)
            <a href="{{ $linkHref }}"
               @if($isExternalLink) target="_blank" rel="noopener noreferrer" @endif
               class="inline-flex items-center gap-1 text-[13px] font-medium text-[#105493] hover:underline">
                <span>Read Full Message</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
        @endif
    </div>
</section>