@props(['data' => []])

@php
    $headerTitle = 'Condolence';
    $moreLink = '/condolence';
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
                        if (!is_array($inst))
                            continue;

                        if ($group === 0 || $group === '0') {
                            if (!empty($inst['title']))
                                $headerTitle = $inst['title'];
                            if (!empty($inst['more_link']))
                                $moreLink = $inst['more_link'];
                            if (!empty($inst['link']))
                                $moreLink = $inst['link'];
                        } else {
                            $items[] = $inst;
                        }
                    }
                }
            }

            if (empty($items) && (isset($record['name']) || isset($record['Name']) || isset($record['title']))) {
                if ($group === 0 || $group === '0' || isset($record['more_link']) || isset($record['link'])) {
                    if (!empty($record['title']))
                        $headerTitle = $record['title'];
                    if (!empty($record['more_link']))
                        $moreLink = $record['more_link'];
                    if (!empty($record['link']))
                        $moreLink = $record['link'];
                } else {
                    $items[] = $record;
                }
            }
        }
    }

    $isExternalMore = str_starts_with($moreLink, 'http://') || str_starts_with($moreLink, 'https://');
    $moreHref = $isExternalMore ? $moreLink : url($moreLink);
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    <h2 class="bg-[#105493] px-3 py-2 text-[14px] font-semibold uppercase tracking-wide text-white">
        {{ $headerTitle }}
    </h2>
    <div class="p-3 text-[14px] leading-relaxed text-[#1E2933]">
        @if(!empty($items))
            <div class="space-y-4">
                @foreach($items as $idx => $item)
                    @php
                        $name = $item['name'] ?? $item['Name'] ?? '';
                        $company = $item['company'] ?? $item['Company'] ?? '';
                        $role = $item['role'] ?? $item['Role'] ?? $item['designation'] ?? '';
                        $dateOfDeath = $item['date_of_death'] ?? $item['date'] ?? $item['dateOfDeath'] ?? $item['Date'] ?? '';
                        $message = $item['message'] ?? $item['Message'] ?? $item['description'] ?? '';
                        $image = $item['portrait'] ?? $item['image'] ?? $item['Image'] ?? '';

                        $src = asset('defualt/placeholder.png');
                        if ($image) {
                            $filePath = parse_url($image, PHP_URL_PATH) ?? $image;
                            $filePath = ltrim($filePath, '/');
                            if (!str_contains($filePath, '/')) {
                                $filePath = 'images/' . $filePath;
                            }
                            $src = asset($filePath);
                        }

                        $formattedDate = '';
                        if ($dateOfDeath) {
                            try {
                                $formattedDate = \Carbon\Carbon::parse($dateOfDeath)->format('d M Y');
                            } catch (\Exception $e) {
                                $formattedDate = $dateOfDeath;
                            }
                        }
                    @endphp
                    @if($idx > 0)
                        <div class="border-t border-[#D8E0E6] pt-3"></div>
                    @endif
                    <div>
                        <div class="flex gap-3">
                            <img src="{{ $src }}" alt="{{ $name }}"
                                class="h-[62px] w-[62px] shrink-0 rounded-[5px] border border-[#D8E0E6] object-cover">
                            <div class="min-w-0">
                                @if($name)
                                    <p class="text-[14px] font-semibold leading-snug text-[#073B6B]">{{ $name }}</p>
                                @endif
                                @if($company)
                                    <p class="text-[13px] leading-snug text-[#64717C]">{{ $company }}</p>
                                @endif
                                @if($role)
                                    <p class="text-[13px] leading-snug text-[#64717C]">{{ $role }}</p>
                                @endif
                                @if($formattedDate)
                                    <p class="mt-0.5 text-[13px] text-[#1E2933]">Died: {{ $formattedDate }}</p>
                                @endif
                            </div>
                        </div>
                        @if($message)
                            <p class="mt-2.5 border-t border-[#D8E0E6] pt-2 text-[13.5px] leading-relaxed text-[#64717C]">
                                {{ $message }}
                            </p>
                        @endif
                    </div>
                @endforeach
            </div>
        @else
            <p class="text-xs text-[#64717C] text-center py-2">No condolence records available.</p>
        @endif
    </div>
    <div class="border-t border-[#D8E0E6] bg-[#EDF5FB] px-3 py-2 text-[13px]">
        <a href="{{ $moreHref }}" @if($isExternalMore) target="_blank" rel="noopener noreferrer" @endif
            class="font-medium text-[#105493] hover:underline">
            View Details &rarr;
        </a>
    </div>
</section>