@props(['data'])

@php
  // Header (always first)
  $header = $data[0][0] ?? [];

  // All service cards (from index 1 onward)
  $services = collect($data)
    ->skip(1)
    ->map(fn($item) => $item[0] ?? [])
    ->filter(fn($item) => ($item['group_name'] ?? '') === 'Service Cards')
    ->values();
@endphp

<section class="relative bg-navy-900 custom_py overflow-hidden">

  {{-- Diagonal top --}}
  <div class="absolute top-0 left-0 w-full h-32 bg-white transform -skew-y-3 origin-top-left z-10"></div>

  <div class="relative z-20 container mx-auto px-4 sm:px-6 md:px-8">

    {{-- Heading --}}
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        {{ $header['title'] ?? '' }}
      </h2>

      <p class="text-gray-400">
        {{ $header['subtitle'] ?? '' }}
      </p>
    </div>

    {{-- Cards grid --}}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      @foreach($services as $service)
        <div class="bg-navy-800 border border-navy-700 p-8 hover:border-industrial-red transition-colors duration-300">

          {{-- Icon --}}
          <div class="w-12 h-12 bg-navy-900 flex items-center justify-center mb-6">
            <span class="text-white text-xl">
              {!! $service['card_icon'] ?? '' !!}
            </span>
          </div>

          {{-- Title --}}
          <h3 class="text-xl font-bold text-white mb-3">
            {{ $service['card_title'] ?? '' }}
          </h3>

          {{-- Description --}}
          @if(!empty($service['card_description']))
            <p class="text-gray-400 mb-6">
              {{ $service['card_description'] }}
            </p>
          @endif

          {{-- Button --}}
          {{-- <a href="/services"
            class="inline-flex items-center gap-2 text-industrial-red font-bold uppercase text-sm tracking-wider hover:text-white transition-colors">
            Read More
            <span>→</span>
          </a>
          --}}
        </div>
      @endforeach

    </div>

  </div>
</section>