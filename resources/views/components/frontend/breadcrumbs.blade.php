@props(['data'])

@php
    $isObj = is_object($data);
    $name = $isObj ? ($data->name ?? '') : ($data['name'] ?? '');
    $permalink = $isObj ? ($data->permalink ?? '') : ($data['permalink'] ?? '');
    $label = $isObj ? ($data->seo_title ?? ucfirst($name)) : ($data['seo_title'] ?? ucfirst($name ?: 'Page'));
    $currentUrl = $permalink ? url('/' . ltrim($permalink, '/')) : '';
    $description = $isObj ? ($data->description ?? '') : ($data['description'] ?? '');
@endphp

<div class="relative pt-32 pb-20 bg-brand-charcoal overflow-hidden">
    <div class="absolute inset-0 opacity-10 w-full">
        <div class="absolute left-1/4 top-0 bottom-0 w-px bg-white"></div>
        <div class="absolute right-1/4 top-0 bottom-0 w-px bg-white"></div>
        <div class="absolute left-0 right-0 top-1/2 h-px bg-white"></div>
    </div>

    <div
        class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/20 to-transparent pointer-events-none">
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div>
            <nav class="flex items-center space-x-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
                <a href="{{ url('/') }}" class="hover:text-brand-red transition-colors focus:outline-none">Home</a>
                <span>/</span>
                @if($currentUrl)
                    <a href="{{ $currentUrl }}"
                        class="hover:text-brand-red transition-colors focus:outline-none">{{ $label ?: 'Page' }}</a>
                @else
                    <span class="text-white">{{ $label ?: 'Page' }}</span>
                @endif
            </nav>

            @if(!empty($description))
                <div class="container z-10 prevent-tailwind-css">
                    {!! $description !!}
                </div>
            @endif
        </div>
    </div>
</div>
