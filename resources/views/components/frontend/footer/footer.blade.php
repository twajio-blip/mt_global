{{-- Cookies --}}
@if (isset($general) && $general?->cookie_title)
    <div
        class="cookie-alert hidden fixed bottom-0 sm:bottom-4 sm:right-4 z-50 sm:w-[300px] bg-white p-4 py-6 rounded-md shadow-md">
        <div class="space-y-6">
            <div class="space-y-3">
                <h5 class="font-semibold text-lg">&#x1F36A; {{ $general?->cookie_title }}</h5>
                <p class="">{{ $general?->cookie_description }}</p>
            </div>
            <div class="space-x-2 text-end">
                <a href="http://cookiesandyou.com/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
                <a href="#"
                    class="cookie-accept px-3 py-2.5 rounded-md font-semibold bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white">Accept</a>
            </div>
        </div>
    </div>
@endif

@php
    $general = $general ?? null;
    $footerGroups = $footerGroups ?? collect();

    $footerLogo = $general?->footer ?? $general?->logo ?? $general?->header ?? $general?->fav_icon ?? null;
    $footerLogoUrl = $footerLogo ? asset('logo/' . $footerLogo) : null;

    $nameEn = $general?->website_name ?? "Mongla Customs Agents' Association";

    $footerDescription = $general?->description ?? $general?->tagline ?? 'MCAA is the recognised association of licensed customs clearing and forwarding agents operating through Mongla Custom House and Mongla Port, representing member firms before customs, port and government authorities.';
    $footerAddress = $general?->location ?? $general?->address ?? 'MCAA Bhaban, Customs House Road, Mongla, Bagerhat-9351, Bangladesh';

    $footerPhoneRaw = $general?->contact ?? $general?->phone ?? '';
    $footerPhones = array_filter(array_map('trim', preg_split('/[\r\n]+/', $footerPhoneRaw)));
    if (empty($footerPhones)) {
        $footerPhones = ['+880 2477 775 210', '+880 1711 456 902'];
    }

    $footerEmail = $general?->email ?? 'info@mcaa.org.bd';
    $footerHours = $general?->office_hours ?? $general?->hours ?? $general?->opening_hours ?? 'Sunday – Thursday, 9:00 AM – 5:00 PM';

    $formattedUrl = function ($url) {
        if (empty($url) || $url === '#') {
            return '#';
        }
        if (\Illuminate\Support\Str::startsWith($url, ['http://', 'https://', '//'])) {
            return $url;
        }
        if (\Illuminate\Support\Str::startsWith($url, '/')) {
            return url($url);
        }
        return url('/' . $url);
    };

    // Group 1 (Quick Links)
    $group1 = $footerGroups->first();
    $group1Title = $group1?->name ?? 'Quick Links';
    $group1Details = ($group1 && $group1->details && $group1->details->count() > 0)
        ? $group1->details
        : collect([
            (object) ['name' => 'Home', 'url' => '/'],
            (object) ['name' => 'About', 'url' => '/about'],
            (object) ['name' => 'Committee', 'url' => '/committee/executive'],
            (object) ['name' => 'General Members', 'url' => '/committee/general-members'],
            (object) ['name' => 'Notices', 'url' => '/notices'],
            (object) ['name' => 'Gallery', 'url' => '/gallery'],
            (object) ['name' => 'Contact', 'url' => '/contact'],
        ]);

    // Group 2 (Important Links)
    $group2 = $footerGroups->skip(1)->first();
    $group2Title = $group2?->name ?? 'Important Links';
    $group2Details = ($group2 && $group2->details && $group2->details->count() > 0)
        ? $group2->details
        : collect([
            (object) ['name' => 'National Board of Revenue', 'url' => 'https://nbr.gov.bd'],
            (object) ['name' => 'Bangladesh Customs', 'url' => 'https://customs.gov.bd'],
            (object) ['name' => 'Mongla Custom House', 'url' => 'https://customs.gov.bd'],
            (object) ['name' => 'Mongla Port Authority', 'url' => 'https://mpa.gov.bd'],
            (object) ['name' => 'Ministry of Shipping', 'url' => 'https://mos.gov.bd'],
            (object) ['name' => 'Ministry of Finance', 'url' => 'https://mof.gov.bd'],
            (object) ['name' => 'ASYCUDAWorld', 'url' => 'https://asycuda.gov.bd'],
        ]);
@endphp

<footer class="mt-8 mt-auto w-full bg-[#062E53] text-[14px] text-[#C6D6E5]">
    <div class="mx-auto grid max-w-[1320px] gap-8 px-4 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
            <div class="flex items-center gap-3">
                @if ($footerLogoUrl)
                    <a href="{{ url('/') }}" class="shrink-0" aria-label="Home">
                        <img src="{{ $footerLogoUrl }}" alt="{{ $nameEn }}" class="h-[54px] w-[54px] object-contain">
                    </a>
                @else
                    <a href="{{ url('/') }}" class="shrink-0" aria-label="Home">
                        <svg width="54" height="54" viewBox="0 0 120 120" role="img"
                            aria-label="Mongla Customs Agents' Association emblem">
                            <circle cx="60" cy="60" r="58" fill="#FFFFFF" />
                            <circle cx="60" cy="60" r="58" fill="none" stroke="#D5A63F" stroke-width="3" />
                            <circle cx="60" cy="60" r="50" fill="#105493" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#073B6B" stroke-width="2" />
                            @foreach([0, 45, 90, 135, 180, 225, 270, 315] as $deg)
                                <rect x="58.5" y="4" width="3" height="12" rx="1" fill="#D5A63F"
                                    transform="rotate({{ $deg }} 60 60)" />
                            @endforeach
                            <circle cx="60" cy="60" r="40" fill="none" stroke="#EDF5FB" stroke-width="1.5" />
                            <g stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none">
                                <path d="M60 34v52" />
                                <path d="M60 46h-9m9 0h9" />
                                <path d="M40 68c0 11 9 19 20 19s20-8 20-19" />
                            </g>
                            <circle cx="60" cy="33" r="5.5" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
                            <text x="60" y="106" text-anchor="middle" fill="#073B6B" font-size="13" font-weight="700"
                                font-family="Inter, sans-serif" letter-spacing="1">MCAA</text>
                        </svg>
                    </a>
                @endif

                <div class="min-w-0">
                    <p class="text-[13px] text-[#9FC2DE]">
                        {{ $nameEn }}
                    </p>
                </div>
            </div>
            <p class="mt-3 leading-relaxed">
                {{ $footerDescription }}
            </p>
        </div>

        <nav aria-label="{{ $group1Title }}">
            <h2
                class="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
                {{ $group1Title }}
            </h2>
            <ul class="space-y-2">
                @foreach ($group1Details as $detail)
                    @php
                        $detailName = is_object($detail) ? $detail->name : ($detail['name'] ?? '');
                        $detailUrl = is_object($detail) ? $detail->url : ($detail['url'] ?? '#');
                        $targetUrl = $formattedUrl($detailUrl);
                    @endphp
                    <li>
                        <a href="{{ $targetUrl }}" class="hover:text-white hover:underline">
                            {{ $detailName }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </nav>

        <nav aria-label="{{ $group2Title }}">
            <h2
                class="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
                {{ $group2Title }}
            </h2>
            <ul class="space-y-2">
                @foreach ($group2Details as $detail)
                    @php
                        $detailName = is_object($detail) ? $detail->name : ($detail['name'] ?? '');
                        $detailUrl = is_object($detail) ? $detail->url : ($detail['url'] ?? '#');
                        $targetUrl = $formattedUrl($detailUrl);
                        $isExternal = \Illuminate\Support\Str::startsWith($detailUrl, ['http://', 'https://', '//']);
                    @endphp
                    <li>
                        <a href="{{ $targetUrl }}" @if($isExternal) target="_blank" rel="noreferrer" @endif
                            class="inline-flex items-center gap-1.5 hover:text-white hover:underline">
                            {{ $detailName }}
                            <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </li>
                @endforeach
            </ul>
        </nav>

        <div>
            <h2
                class="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
                Contact Information
            </h2>
            <ul class="space-y-3">
                <li class="flex gap-2">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#D5A63F]" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ $footerAddress }}</span>
                </li>
                <li class="flex gap-2">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#D5A63F]" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>
                        @foreach ($footerPhones as $phone)
                            <a href="tel:{{ preg_replace('/[^\d+]/', '', $phone) }}" class="hover:text-white">
                                {{ $phone }}
                            </a>
                            @if (!$loop->last)
                                <br />
                            @endif
                        @endforeach
                    </span>
                </li>
                <li class="flex gap-2">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#D5A63F]" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:{{ $footerEmail }}" class="break-all hover:text-white">
                        {{ $footerEmail }}
                    </a>
                </li>
                <li class="flex gap-2">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#D5A63F]" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ $footerHours }}</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="border-t border-[#0C3A64] bg-[#04223E]">
        <div
            class="mx-auto flex max-w-[1320px] flex-col gap-1 px-4 py-4 text-[13px] text-[#9FC2DE] sm:flex-row sm:items-center sm:justify-between lg:px-6">
            <p>© {{ date('Y') }} {{ $nameEn }}. All Rights Reserved.</p>
            <p>Mongla, Bagerhat, Bangladesh</p>
        </div>
    </div>
</footer>