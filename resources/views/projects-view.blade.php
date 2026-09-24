<x-Guest-layout :pageinfo="$page">

    @php
    // Single record is at $data[0] when URL has ?group= (component-wise detail)
    $projectData = $data[0] ?? $data[1] ?? [];
    $groups = collect($projectData)
        ->filter(fn ($v, $k) => is_int($k) && is_array($v) && isset($v['group_name']))
        ->keyBy('group_name');

    $info     = $groups['Project Information'] ?? [];
    $specs    = $groups['Technical Specifications'] ?? [];
    $overview = $groups['Project Overview']['project_overview'] ?? '';
    $features = $groups['Key Features']['instances'] ?? [];
    $timeline = $groups['Construction Timeline']['instances'] ?? [];

    $galleryRaw = $groups['Image Gallery']['instances'][1]['gallery_image'] ?? '[]';
    $gallery = json_decode($galleryRaw, true) ?? [];
@endphp


<div class="">

    {{-- HERO --}}
    <x-frontend.breadcrumbs :data="$page" >
        <div class="h-[60vh] relative overflow-hidden">
            <img
                src="{{ asset('images/' . $info['project_image']) }}"
                alt="{{ $info['title'] }}"
                class="w-full h-full object-cover"
            />
    
            <div class="absolute inset-0 bg-navy-900/60"></div>
    
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="container mx-auto px-4 text-center text-white">
    
                    <span class="inline-block bg-industrial-red px-4 py-1 text-sm font-bold uppercase tracking-wider mb-6">
                        {{ $info['category'] }}
                    </span>
    
                    <h1 class="text-4xl md:text-6xl font-serif font-bold mb-6 max-w-4xl mx-auto leading-tight">
                        {{ $info['title'] }}
                    </h1>
    
                    <div class="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-gray-300">
                        <span class="flex items-center gap-2">
                            Delivered: {{ $info['delivery_year'] }}
                        </span>
                        <span class="flex items-center gap-2">
                            Client: {{ $info['clients_name'] }}
                        </span>
                    </div>
    
                </div>
            </div>
        </div>
    </x-frontend.breadcrumbs>
    


    {{-- QUICK SPECS BAR --}}
    <div class="bg-navy-800 text-white py-8 border-b border-navy-700">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x divide-navy-600/30">

                <div>
                    <div class="text-gray-400 text-xs uppercase tracking-wider mb-1">Length</div>
                    <div class="font-bold text-lg">{{ $specs['length'] ?? '' }}</div>
                </div>

                <div>
                    <div class="text-gray-400 text-xs uppercase tracking-wider mb-1">Beam</div>
                    <div class="font-bold text-lg">{{ $specs['beam'] ?? '' }}</div>
                </div>

                <div>
                    <div class="text-gray-400 text-xs uppercase tracking-wider mb-1">Draft</div>
                    <div class="font-bold text-lg">{{ $specs['draft'] ?? '' }}</div>
                </div>

                <div>
                    <div class="text-gray-400 text-xs uppercase tracking-wider mb-1">Deadweight</div>
                    <div class="font-bold text-lg">{{ $specs['deadweight'] ?? '' }}</div>
                </div>

                <div>
                    <div class="text-gray-400 text-xs uppercase tracking-wider mb-1">Speed</div>
                    <div class="font-bold text-lg">{{ $specs['speed'] ?? '' }}</div>
                </div>

            </div>
        </div>
    </div>


    {{-- MAIN SECTION --}}
    <section class="bg-white py-20">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {{-- MAIN CONTENT --}}
                <div class="lg:col-span-2">

                    <a href="/projects"
                       class="inline-flex items-center text-gray-500 hover:text-industrial-red mb-8 transition-colors">
                        ← Back to Projects
                    </a>

                    <h2 class="text-3xl font-serif font-bold text-navy-900 mb-6">
                        Project Overview
                    </h2>

                    <div class="text-gray-600 text-lg leading-relaxed mb-12">
                        {!! $overview !!}
                    </div>


                    {{-- KEY FEATURES --}}
                    <h3 class="text-2xl font-bold text-navy-900 mb-6">
                        Key Features
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        @foreach($features as $feature)
                            <div class="flex items-center gap-3 bg-gray-50 p-4 rounded-sm border-l-4 border-industrial-red">
                                <span class="font-medium text-navy-900">
                                    {{ $feature['key_feature'] }}
                                </span>
                            </div>
                        @endforeach
                    </div>


                    {{-- TECHNICAL SPEC TABLE --}}
                    <h3 class="text-2xl font-bold text-navy-900 mb-6">
                        Technical Specifications
                    </h3>

                    <div class="bg-white border border-gray-200 rounded-sm overflow-hidden mb-12">
                        <table class="w-full">
                            <tbody>
                                @foreach($specs as $key => $value)
                                    @if($key !== 'group_name')
                                        <tr class="{{ $loop->even ? 'bg-gray-50' : 'bg-white' }}">
                                            <td class="py-4 px-6 font-bold text-navy-900 capitalize w-1/3 border-r border-gray-200">
                                                {{ str_replace('_',' ', $key) }}
                                            </td>
                                            <td class="py-4 px-6 text-gray-600">
                                                {{ $value }}
                                            </td>
                                        </tr>
                                    @endif
                                @endforeach
                            </tbody>
                        </table>
                    </div>


                    {{-- IMAGE GALLERY --}}
                    <h3 class="text-2xl font-bold text-navy-900 mb-6">
                        Image Gallery
                    </h3>

                    <div class="grid grid-cols-2 gap-4">
                        @foreach($gallery as $index => $img)
                            <div class="h-48 overflow-hidden cursor-pointer group relative gallery-item"
                                 data-index="{{ $index }}"
                                 data-image="{{ asset('images/' . $img) }}">
                    
                                <img
                                    src="{{ asset('images/' . $img) }}"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                    
                                <div class="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors flex items-center justify-center">
                                    <div class="w-10 h-10 bg-industrial-red rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                                        +
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    

                </div>


                {{-- SIDEBAR --}}
                <div class="lg:col-span-1 space-y-8">

                    {{-- TIMELINE --}}
                    <div class="bg-white p-6 shadow-lg border-t-4 border-navy-900">
                        <h3 class="text-xl font-bold text-navy-900 mb-6">
                            Construction Timeline
                        </h3>

                        <div class="relative pl-4 border-l-2 border-gray-200 space-y-8">
                            @foreach($timeline as $item)
                                <div class="relative">
                                    <div class="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-industrial-red border-2 border-white"></div>
                                    <div class="text-sm text-gray-500 font-bold mb-1">
                                        {{ $item['milestone_date'] }}
                                    </div>
                                    <div class="text-navy-900 font-bold">
                                        {{ $item['milestone_title'] }}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>


                    {{-- CTA --}}
                    <div class="bg-navy-900 text-white p-8 text-center">
                        <h3 class="text-xl font-bold mb-2">
                            Interested in a Similar Vessel?
                        </h3>
                        <p class="text-gray-400 text-sm mb-6">
                            Our team can customize this design to meet your specific operational requirements.
                        </p>
                        <a href="/contact"
                           class="inline-block bg-industrial-red px-6 py-3 font-bold hover:opacity-90 transition w-full">
                            Contact Sales
                        </a>
                    </div>

                </div>

            </div>
        </div>
    </section>

</div>
<div id="lightbox" class="fixed inset-0 bg-black/90 hidden items-center justify-center z-50 p-6">

    <button id="lightbox-close"
            class="absolute top-6 right-6 text-white text-4xl hover:text-industrial-red transition">
        &times;
    </button>

    <button id="lightbox-prev"
            class="absolute left-6 text-white text-4xl hover:text-industrial-red transition">
        &#10094;
    </button>

    <img id="lightbox-image"
         src=""
         class="max-w-full max-h-[90vh] object-contain">

    <button id="lightbox-next"
            class="absolute right-6 text-white text-4xl hover:text-industrial-red transition">
        &#10095;
    </button>

</div>


   

</x-Guest-layout>

<script>
    $(document).ready(function () {
    
        let images = [];
        let currentIndex = 0;
    
        $('.gallery-item').each(function () {
            images.push($(this).data('image'));
        });
    
        $('.gallery-item').on('click', function () {
            currentIndex = $(this).data('index');
            openLightbox();
        });
    
        function openLightbox() {
            $('#lightbox-image').attr('src', images[currentIndex]);
            $('#lightbox').removeClass('hidden').addClass('flex');
        }
    
        function closeLightbox() {
            $('#lightbox').removeClass('flex').addClass('hidden');
        }
    
        $('#lightbox-close').on('click', closeLightbox);
    
        $('#lightbox-prev').on('click', function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            $('#lightbox-image').attr('src', images[currentIndex]);
        });
    
        $('#lightbox-next').on('click', function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            $('#lightbox-image').attr('src', images[currentIndex]);
        });
    
        $('#lightbox').on('click', function (e) {
            if (e.target.id === 'lightbox') {
                closeLightbox();
            }
        });
    
    });
    </script>
    
