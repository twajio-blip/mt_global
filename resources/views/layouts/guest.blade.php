@props(['pageinfo' => false])
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <meta property="og:title" content="{{ $pageinfo->seo_title ?? '' }}">
    <meta property="og:description" content="{{ $pageinfo->seo_description ?? '' }}">
    <meta property="og:image" content="{{ asset('images/' . ($pageinfo->seo_image ?? '')) }}">
    <meta name="robots" content="{{ $pageinfo->seo_index ?? '' }}">

    {{-- favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('images/' . ($general->fav_icon ?? 'placeholder.png')) }}">
    <!-- font inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    {{-- Font --}}
    @if ($font_frontend)
        {!! $font_frontend->font_links !!}
    @endif

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer">
    <!-- Swiper js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

    <link rel="stylesheet" href="{{ asset('magnific-popup/magnific-popup.css') }}">

    <!-- jquery (must load before Vite bundle) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Swiper js -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    {{-- Flowbite --}}
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    <script src="{{ asset('magnific-popup/magnific-popup.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>
        {{ is_object($pageinfo) && $pageinfo->permalink == '/' ? $general->website_name ?? '' : (is_object($pageinfo) ? $pageinfo->name : 'Default Title') }}
    </title>
    <!-- Global Preloader -->
    <style>
        @keyframes spin-preloader {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes pulse-preloader {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: .5;
            }
        }
    </style>
    @stack('css')
</head>


<body class="bg-skin-primary">


    @if (false)
    <div id="global-preloader"
        style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999999; display: flex; align-items: center; justify-content: center; background-color: #ffffff; transition: opacity 0.7s ease;">
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            {{-- Modern Spinner --}}
            <div style="position: relative; width: 64px; height: 64px;">
                <div
                    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: 50%; border: 4px solid #f1f5f9;">
                </div>
                <div
                    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: 50%; border: 4px solid #dc2626; border-top-color: transparent; animation: spin-preloader 1s linear infinite;">
                </div>
            </div>
            <div
                style="margin-top: 16px; color: #1e293b; font-weight: bold; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; animation: pulse-preloader 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;">
                Loading
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', function () {
            const preloader = document.getElementById('global-preloader');
            if (preloader) {
                // Fade out
                preloader.style.opacity = '0';
                // Remove from DOM after fade completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 700);
            }
        });
    </script>
    @endif

    <div class="min-h-screen bg-brand-light font-body selection:bg-brand-red selection:text-white">
        {{-- <x-frontend.top-header /> --}}
        @php
            $headerComponent = $pageinfo->header_component ?? $general->header_component;
            $headerPosition = $pageinfo->header_component_position ?? $general->header_component_position;
        @endphp

        @if ($headerComponent)
            @component('components.frontend.header.' . $headerComponent, ['position' => $headerPosition])
            @endcomponent
        @endif

        <!-- Main -->
        <main class="bg-brand-light mt-27.25">

            {{ $slot }}

        </main>


        @php
            $footerComponent = $pageinfo->footer_component ?? $general->footer_component;

        @endphp

        @if ($footerComponent)
            @component('components.frontend.footer.' . $footerComponent)
            @endcomponent
        @endif
    </div>


    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $general?->google_analytics }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '{{ $general?->google_analytics }}');
    </script>
    @stack('js')
</body>

</html>
