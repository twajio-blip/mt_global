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
    $loginUrl = \Illuminate\Support\Facades\Route::has('login') ? route('login') : url('/admin/login');
    $isFixed = ($position ?? '') === 'fix';
@endphp

<header
    x-data="{ isMobileMenuOpen: false, mobileActiveDropdown: null }"
    class="{{ $isFixed ? 'fixed' : 'sticky' }} top-0 left-0 right-0 z-50 bg-white"
    style="font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;">

    <div class="hidden bg-[#07152A] text-[13px] text-[#D9E3F2] md:block">
        <div class="mx-auto flex h-9 w-full max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
            @if ($licence)
                <p class="flex items-center gap-2">
                    <svg class="h-3.5 w-3.5 text-[#E43D30]" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>{{ $licence }}</span>
                </p>
            @else
                <span></span>
            @endif

            <div class="flex items-center gap-5">
                @if ($phone)
                    <a href="tel:{{ $phoneHref }}" class="flex items-center gap-1.5 transition-colors duration-150 hover:text-white">
                        <i class="fa-solid fa-phone text-[#E43D30]"></i>
                        <span>{{ $phone }}</span>
                    </a>
                @endif

                <a href="{{ $loginUrl }}" class="flex items-center gap-1.5 transition-colors duration-150 hover:text-white">
                    <i class="fa-solid fa-lock text-[#E43D30]"></i>
                    <span>Client Login</span>
                </a>
            </div>
        </div>
    </div>

    <div class="relative border-b border-[#E2E8F0] bg-white">
        <div class="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 md:h-[72px] lg:px-8">
            <a href="{{ url('/') }}" aria-label="Home" class="flex h-full items-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#B9CCE7] py-4">
                <img src="{{ $logo }}" alt="Logo" class="h-full w-auto object-contain">
            </a>

            <nav aria-label="Main navigation" class="hidden items-center gap-1 lg:flex">
                @foreach ($widgets as $widget)
                    @php
                        $hasChildren = $widget->children && $widget->children->count() > 0;
                        $currentPath = request()->path();
                        $checkLink = trim($widget->link, '/') === '' ? '/' : trim($widget->link, '/');
                        $isActive = request()->is($checkLink) ||
                            ($hasChildren && $widget->children->pluck('link')->map(fn ($link) => trim($link, '/'))->contains($currentPath));
                    @endphp

                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <a
                            href="{{ $hasChildren ? 'javascript:void(0)' : url($widget->link) }}"
                            class="flex items-center rounded-md px-4 py-2 text-[15px] font-medium transition-colors duration-150 {{ $isActive ? 'bg-[#EEF3FA] text-[#1F4580]' : 'text-[#475569] hover:text-[#1F4580]' }}">
                            <span>{{ $widget->name }}</span>
                            @if ($hasChildren)
                                <i class="fa-solid fa-chevron-down ml-2 text-[10px] transition-transform duration-150" :class="open ? 'rotate-180' : ''"></i>
                            @endif
                        </a>

                        @if ($hasChildren)
                            <div
                                x-show="open"
                                x-transition:enter="transition ease-out duration-150"
                                x-transition:enter-start="opacity-0 translate-y-1"
                                x-transition:enter-end="opacity-100 translate-y-0"
                                x-transition:leave="transition ease-in duration-100"
                                x-transition:leave-start="opacity-100 translate-y-0"
                                x-transition:leave-end="opacity-0 translate-y-1"
                                class="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-[#E2E8F0] bg-white py-2 shadow-xl"
                                x-cloak>
                                @foreach ($widget->children as $child)
                                    <a
                                        href="{{ url($child->link) }}"
                                        class="block px-4 py-2.5 text-sm font-medium transition-colors {{ request()->is(trim($child->link, '/')) ? 'bg-[#EEF3FA] text-[#1F4580]' : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1F4580]' }}">
                                        {{ $child->name }}
                                    </a>
                                @endforeach
                            </div>
                        @endif
                    </div>
                @endforeach
            </nav>

            <div class="flex items-center gap-2">
                <a
                    href="{{ url('/jobs') }}"
                    class="hidden h-10 items-center rounded-md bg-btn-primary px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-btn-primary-hover sm:inline-flex md:h-11">
                    <span class="sm:hidden">Find Jobs</span>
                    <span class="hidden sm:inline">Find Overseas Jobs</span>
                </a>

                <button
                    type="button"
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                    :aria-expanded="isMobileMenuOpen.toString()"
                    aria-controls="mobile-nav"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#0F1B2D] lg:hidden">
                    <i class="fa-solid" :class="isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
                </button>
            </div>
        </div>

        <div
            id="mobile-nav"
            x-show="isMobileMenuOpen"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 -translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 -translate-y-2"
            class="absolute inset-x-0 top-full border-b border-[#E2E8F0] bg-white shadow-xl lg:hidden"
            x-cloak>
            <nav aria-label="Mobile navigation" class="mx-auto flex w-full max-w-[1240px] flex-col px-4 py-3 sm:px-6">
                @foreach ($widgets as $widget)
                    @php
                        $hasChildren = $widget->children && $widget->children->count() > 0;
                        $checkLink = trim($widget->link, '/') === '' ? '/' : trim($widget->link, '/');
                        $isActive = request()->is($checkLink);
                    @endphp

                    @if ($hasChildren)
                        <div>
                            <button
                                type="button"
                                @click="mobileActiveDropdown === '{{ $widget->id }}' ? mobileActiveDropdown = null : mobileActiveDropdown = '{{ $widget->id }}'"
                                class="flex h-12 w-full items-center justify-between rounded-lg px-3 text-base font-medium {{ $isActive ? 'bg-[#EEF3FA] text-[#1F4580]' : 'text-[#0F1B2D]' }}">
                                <span>{{ $widget->name }}</span>
                                <i class="fa-solid fa-chevron-down text-xs transition-transform duration-150" :class="mobileActiveDropdown === '{{ $widget->id }}' ? 'rotate-180' : ''"></i>
                            </button>

                            <div x-show="mobileActiveDropdown === '{{ $widget->id }}'" class="pb-2 pl-3" x-cloak>
                                @foreach ($widget->children as $child)
                                    <a
                                        href="{{ url($child->link) }}"
                                        @click="isMobileMenuOpen = false; mobileActiveDropdown = null"
                                        class="flex h-10 items-center rounded-md px-3 text-sm font-medium {{ request()->is(trim($child->link, '/')) ? 'bg-[#EEF3FA] text-[#1F4580]' : 'text-[#475569]' }}">
                                        {{ $child->name }}
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    @else
                        <a
                            href="{{ url($widget->link) }}"
                            @click="isMobileMenuOpen = false"
                            class="flex h-12 items-center rounded-lg px-3 text-base font-medium {{ $isActive ? 'bg-[#EEF3FA] text-[#1F4580]' : 'text-[#0F1B2D]' }}">
                            {{ $widget->name }}
                        </a>
                    @endif
                @endforeach

                <div class="mt-3 flex flex-col gap-2 border-t border-[#E2E8F0] pt-4">
                    @if ($phone)
                        <a href="tel:{{ $phoneHref }}" class="flex h-11 items-center gap-2 px-3 text-[15px] text-[#475569]">
                            <i class="fa-solid fa-phone text-[#E43D30]"></i>
                            <span>{{ $phone }}</span>
                        </a>
                    @endif

                    @if ($licence)
                        <div class="flex h-11 items-center gap-2 px-3 text-[15px] text-[#475569]">
                            <svg class="h-4 w-4 text-[#E43D30]" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span>{{ $licence }}</span>
                        </div>
                    @endif

                    <a href="{{ $loginUrl }}" class="flex h-11 items-center gap-2 px-3 text-[15px] font-medium text-[#0F1B2D]">
                        <i class="fa-solid fa-lock text-[#E43D30]"></i>
                        <span>Client Login</span>
                    </a>

                    <a href="{{ url('/jobs') }}" class="flex h-11 items-center justify-center rounded-md bg-btn-primary px-4 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-btn-primary-hover">
                        Find Overseas Jobs
                    </a>
                </div>
            </nav>
        </div>
    </div>
</header>
