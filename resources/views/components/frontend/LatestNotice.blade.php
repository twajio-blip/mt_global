@props(['data' => []])

@php
    $headerTitle = 'Latest Notices';
    $moreLink = '/notices';
    $items = [];

    if (is_array($data)) {
        foreach ($data as $key => $record) {
            if (!is_array($record)) {
                continue;
            }

            $group = $record['group'] ?? null;

            foreach ($record as $subKey => $subVal) {
                if (is_array($subVal) && isset($subVal['instances']) && is_array($subVal['instances'])) {
                    foreach ($subVal['instances'] as $inst) {
                        if (!is_array($inst)) {
                            continue;
                        }

                        if ($group === 0 || $group === '0') {
                            if (!empty($inst['title'])) {
                                $headerTitle = $inst['title'];
                            }
                            if (!empty($inst['more_link'])) {
                                $moreLink = $inst['more_link'];
                            }
                        } else {
                            $items[] = $inst;
                        }
                    }
                }
            }

            if (empty($items) && (isset($record['notice']) || isset($record['title']) || isset($record['Title']))) {
                if ($group === 0 || isset($record['more_link'])) {
                    if (!empty($record['title'])) {
                        $headerTitle = $record['title'];
                    }
                    if (!empty($record['more_link'])) {
                        $moreLink = $record['more_link'];
                    }
                } else {
                    $items[] = $record;
                }
            }
        }
    }

    if (empty($moreLink)) {
        $moreLink = '/notices';
    }

    $items = array_slice($items, 0, 6);
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    <h2 class="bg-[#105493] px-3 py-2 text-[14px] font-semibold uppercase tracking-wide text-white">
        {{ $headerTitle }}
    </h2>
    <div class="p-3 text-[14px] leading-relaxed text-[#1E2933]">
        <ul class="divide-y divide-[#D8E0E6]">
            @forelse($items as $item)
                @php
                    $title = $item['notice'] ?? $item['title'] ?? $item['Title'] ?? $item['Notice'] ?? '';
                    $date = $item['date'] ?? $item['Date'] ?? $item['created_at'] ?? '';
                    $file = $item['file'] ?? $item['File'] ?? $item['attachment'] ?? '';

                    $formattedDate = '';
                    if ($date) {
                        try {
                            $formattedDate = \Carbon\Carbon::parse($date)->format('d M Y');
                        } catch (\Exception $e) {
                            $formattedDate = $date;
                        }
                    }

                    $hasFile = !empty($file);
                    if ($hasFile) {
                        $filePath = parse_url($file, PHP_URL_PATH) ?? $file;
                        $filePath = ltrim($filePath, '/');
                        if (!str_contains($filePath, '/')) {
                            $filePath = 'images/' . $filePath;
                        }
                        $itemUrl = asset($filePath);
                    } else {
                        $itemUrl = url($moreLink);
                    }
                @endphp
                <li class="{{ $loop->first ? 'pb-2' : 'py-2 last:pb-0' }}">
                    <a href="{{ $itemUrl }}" @if($hasFile) target="_blank" download @endif class="group flex gap-2">
                        <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#105493]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" aria-hidden="true">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            <path d="M10 9H8" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                        </svg>
                        <span class="min-w-0">
                            @if($formattedDate)
                                <span class="block text-[12.5px] text-[#64717C]">{{ $formattedDate }}</span>
                            @endif
                            <span
                                class="block text-[14px] leading-snug text-[#1E2933] group-hover:text-[#105493] group-hover:underline">
                                {{ $title }}
                            </span>
                        </span>
                    </a>
                </li>
            @empty
                <li class="py-2 text-xs text-[#64717C] text-center">No notices available.</li>
            @endforelse
        </ul>
    </div>
    <div class="border-t border-[#D8E0E6] bg-[#EDF5FB] px-3 py-2 text-[13px]">
        @php
            $isExternalMore = str_starts_with($moreLink, 'http://') || str_starts_with($moreLink, 'https://');
            $moreHref = $isExternalMore ? $moreLink : url($moreLink);
        @endphp
        <a href="{{ $moreHref }}" @if($isExternalMore) target="_blank" rel="noopener noreferrer" @endif
            class="font-medium text-[#105493] hover:underline">
            View All Notices &rarr;
        </a>
    </div>
</section>