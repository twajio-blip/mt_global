@props(['data' => [], 'general' => null, 'position' => null])

@php
    $widgets = \App\Models\widget::with('children')
        ->whereNull('parent_id')
        ->orderBy('position')
        ->get();

    $licence = $general->licence ?? '';
    $phone = $general->contact ?? '';
    $phoneHref = preg_replace('/[^0-9+]/', '', $phone);
    $logo = !empty($general?->header) ? asset('logo/' . $general->header) : asset('image.png');
    $websiteName = $general->website_name ?? "Mongla Customs Agents' Association";
    $loginUrl = \Illuminate\Support\Facades\Route::has('login') ? route('login') : url('/admin/login');
@endphp

<!-- Top Header Banner (Takes normal flow at top of page) -->
<header class="w-full bg-[#105493]" style="background-color: #105493; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;">
    <div class="mx-auto flex max-w-[1320px] items-center justify-center gap-4 px-4 py-4 sm:gap-6 sm:py-5 lg:px-8">
        <a href="{{ url('/') }}" class="shrink-0" aria-label="Home">
            <img src="{{ $logo }}" alt="{{ $websiteName }}" class="w-[108px] h-[109px] object-contain"
                style="width: 108px; height: 109px;">
        </a>
        <div class="min-w-0">
            <p class="mt-1 text-[16px] font-medium leading-snug text-white sm:text-[20px] lg:text-[62px]">
                {{ $websiteName }}
            </p>
        </div>
    </div>
</header>

<!-- Sticky Navigation Bar (Sticks top-0 on scroll down) -->
<nav x-data="{ isMobileMenuOpen: false, mobileActiveDropdown: null }" aria-label="Main navigation"
    class="sticky top-0 z-50 w-full border-b-2 border-[#D5A63F] bg-[#073B6B]"
    style="background-color: #073B6B; border-bottom: 2px solid #D5A63F; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;">
    <div class="mx-auto max-w-[1320px] px-4 lg:px-6">
        <button type="button" @click="isMobileMenuOpen = !isMobileMenuOpen" :aria-expanded="isMobileMenuOpen"
            aria-controls="mcaa-mobile-nav"
            class="flex min-h-[48px] w-full items-center gap-2 text-[15px] font-medium text-white lg:hidden">
            <i class="fa-solid" :class="isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
            <span>Menu</span>
        </button>

        <!-- Desktop Menu -->
        <ul class="hidden lg:flex lg:flex-wrap lg:justify-center">
            @foreach ($widgets as $widget)
                @php
                    $hasChildren = $widget->children && $widget->children->count() > 0;
                    $currentPath = request()->path();
                    $checkLink = trim($widget->link, '/') === '' ? '/' : trim($widget->link, '/');
                    $isActive = request()->is($checkLink) ||
                        ($hasChildren && $widget->children->pluck('link')->map(fn($link) => trim($link, '/'))->contains($currentPath));
                @endphp

                @if (!$hasChildren)
                    <li>
                        <a href="{{ url($widget->link) }}"
                            class="relative block px-4 py-3 text-[15px] font-medium transition-colors {{ $isActive ? 'bg-[#105493] text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[#D5A63F]' : 'text-[#DCE9F4] hover:bg-[#105493] hover:text-white' }}"
                            style="{{ $isActive ? 'background-color: #105493;' : '' }}">
                            {{ $widget->name }}
                        </a>
                    </li>
                @else
                    <li class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button type="button" @click="open = !open" :aria-expanded="open"
                            class="relative flex items-center gap-1 px-4 py-3 text-[15px] font-medium transition-colors {{ $isActive ? 'bg-[#105493] text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[#D5A63F]' : 'text-[#DCE9F4] hover:bg-[#105493] hover:text-white' }}"
                            style="{{ $isActive ? 'background-color: #105493;' : '' }}">
                            <span>{{ $widget->name }}</span>
                            <i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-150"
                                :class="open ? 'rotate-180' : ''"></i>
                        </button>

                        <ul x-show="open" x-transition:enter="transition ease-out duration-150"
                            x-transition:enter-start="opacity-0 translate-y-1"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-100"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-1"
                            class="absolute left-0 top-full z-30 w-[264px] border border-[#D8E0E6] border-t-0 bg-white py-1 shadow-sm"
                            x-cloak>
                            @foreach ($widget->children as $child)
                                @php
                                    $childLink = trim($child->link, '/');
                                    $isChildActive = request()->is($childLink);
                                @endphp
                                <li>
                                    <a href="{{ url($child->link) }}"
                                        class="block px-4 py-2 text-[14px] {{ $isChildActive ? 'bg-[#EDF5FB] font-medium text-[#105493]' : 'text-[#1E2933] hover:bg-[#EDF5FB] hover:text-[#105493]' }}">
                                        {{ $child->name }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @endif
            @endforeach
        </ul>

        <!-- Mobile Menu -->
        <ul id="mcaa-mobile-nav" x-show="isMobileMenuOpen" class="pb-3 lg:hidden" x-cloak>
            @foreach ($widgets as $widget)
                @php
                    $hasChildren = $widget->children && $widget->children->count() > 0;
                    $checkLink = trim($widget->link, '/') === '' ? '/' : trim($widget->link, '/');
                    $isActive = request()->is($checkLink);
                @endphp

                <li class="border-t border-[#0F4C86]">
                    @if (!$hasChildren)
                        <a href="{{ url($widget->link) }}" @click="isMobileMenuOpen = false"
                            class="block min-h-[46px] py-3 text-[15px] {{ $isActive ? 'font-semibold text-[#D5A63F]' : 'text-white' }}">
                            {{ $widget->name }}
                        </a>
                    @else
                        <div class="py-2">
                            <p class="py-1 text-[13px] font-semibold uppercase tracking-wide text-[#9FC2DE]">
                                {{ $widget->name }}
                            </p>
                            <ul>
                                @foreach ($widget->children as $child)
                                    @php
                                        $isChildActive = request()->is(trim($child->link, '/'));
                                    @endphp
                                    <li>
                                        <a href="{{ url($child->link) }}" @click="isMobileMenuOpen = false"
                                            class="block min-h-[44px] py-2.5 pl-3 text-[15px] {{ $isChildActive ? 'font-semibold text-[#D5A63F]' : 'text-white' }}">
                                            {{ $child->name }}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</nav>