@props(['data' => null])
@php
    $title = is_object($data) ? ($data->name ?? $data->title ?? '') : ($data['name'] ?? $data['title'] ?? '');
@endphp
@if($title && $title !== '/' && strtolower($title) !== 'home')
    <div class="w-full bg-[#073B6B] py-3 text-white border-b border-[#D5A63F]">
        <div class="mx-auto max-w-[1320px] px-4 lg:px-6 flex items-center justify-between text-sm">
            <h1 class="text-base font-semibold text-white">{{ $title }}</h1>
            <nav class="flex items-center space-x-2 text-xs text-[#9FC2DE]">
                <a href="{{ url('/') }}" class="hover:text-white">Home</a>
                <span>/</span>
                <span class="text-white">{{ $title }}</span>
            </nav>
        </div>
    </div>
@endif
