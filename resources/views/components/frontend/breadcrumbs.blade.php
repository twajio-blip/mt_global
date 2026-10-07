@props(['data'])

@php
    $isObj = is_object($data);
    $name = $isObj ? ($data->name ?? '') : ($data['name'] ?? '');
    $permalink = $isObj ? ($data->permalink ?? '') : ($data['permalink'] ?? '');
    $label = $name ?: ($isObj ? ($data->seo_title ?? 'Page') : ($data['seo_title'] ?? 'Page'));
    $currentUrl = $permalink ? url('/' . ltrim($permalink, '/')) : '';
    $description = $isObj ? ($data->description ?? '') : ($data['description'] ?? '');
@endphp

@if(isset($slot) && $slot->isNotEmpty())
    <div class="relative pt-32 pb-20 bg-brand-charcoal overflow-hidden mb-6">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <nav class="flex items-center space-x-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
                <a href="{{ url('/') }}" class="hover:text-brand-red transition-colors focus:outline-none">Home</a>
                <span>/</span>
                <span class="text-white">{{ $label }}</span>
            </nav>
            {{ $slot }}
        </div>
    </div>
@else
    <header class="mb-4">
        <nav aria-label="Breadcrumb">
            <ol class="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[13px] text-gray-500">
                <li class="flex items-center gap-1">
                    <a href="{{ url('/') }}" class="hover:text-[#3762ED] hover:underline">Home</a>
                </li>
                <li class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span class="text-gray-800 font-medium">{{ $label }}</span>
                </li>
            </ol>
        </nav>
        @if(!empty($description) && trim(strip_tags($description)) !== '')
            <div class="mt-1 text-[16px] text-gray-600 prevent-tailwind-css">
                {!! $description !!}
            </div>
        @endif
        <div class="mt-3 h-px w-full bg-gray-200"></div>
    </header>
@endif