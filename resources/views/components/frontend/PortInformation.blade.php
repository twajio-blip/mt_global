@props(['data' => []])

@php
    $title = 'Port Information';
    $links = [];

    $fieldMap = [
        'berthing_schedule_link' => 'Berthing schedule',
        'port_tariff_link' => 'Port Tariff',
    ];

    $itemData = [];

    if (is_array($data)) {
        foreach ($data as $key => $record) {
            if (!is_array($record)) {
                continue;
            }

            foreach ($record as $subKey => $subVal) {
                if (is_array($subVal)) {
                    if (isset($subVal['instances']) && is_array($subVal['instances'])) {
                        foreach ($subVal['instances'] as $inst) {
                            if (is_array($inst)) {
                                $itemData = array_merge($itemData, $inst);
                            }
                        }
                    } else {
                        $itemData = array_merge($itemData, $subVal);
                    }
                }
            }

            if (empty($itemData)) {
                $itemData = array_merge($itemData, $record);
            }
        }
    }

    if (!empty($itemData['title'])) {
        $title = $itemData['title'];
    } elseif (!empty($itemData['Title'])) {
        $title = $itemData['Title'];
    }

    foreach ($fieldMap as $key => $label) {
        $rawUrl = $itemData[$key] ?? '#';
        $links[] = [
            'label' => $label,
            'to' => $rawUrl,
        ];
    }
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    <h2 class="bg-[#105493] px-3 py-2 text-[14px] font-semibold uppercase tracking-wide text-white">
        {{ $title }}
    </h2>
    <div class="p-3 text-[14px] leading-relaxed text-[#1E2933]">
        <ul class="divide-y divide-[#D8E0E6]">
            @foreach($links as $index => $link)
                @php
                    $isExternal = str_starts_with($link['to'], 'http://') || str_starts_with($link['to'], 'https://');
                    $href = $isExternal ? $link['to'] : url($link['to']);
                @endphp
                <li class="{{ $index === 0 ? 'pb-1' : 'py-1 last:pb-0' }}">
                    <a href="{{ $href }}" @if($isExternal) target="_blank" rel="noopener noreferrer" @endif
                        class="flex min-h-[36px] items-center gap-1.5 text-[14px] text-[#1E2933] hover:text-[#105493] hover:underline">
                        <svg class="h-3.5 w-3.5 shrink-0 text-[#D5A63F]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" aria-hidden="true">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        <span class="min-w-0">{{ $link['label'] }}</span>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</section>