<x-Guest-layout :pageinfo="$page">
    @if ((int) $page->is_breadcrumb && view()->exists('components.frontend.breadcrumbs'))
        <x-frontend.breadcrumbs :data="$page" />
    @endif

    <div class="mx-auto w-full max-w-[1320px] flex-1 px-4 py-5 lg:px-6">
        <div class="lg:flex lg:items-start lg:gap-5">
            {{-- Left Sidebar: Sticky 260px --}}
            <aside aria-label="Association information" class="hidden shrink-0 space-y-5 lg:block lg:w-[260px] lg:sticky lg:top-[220px] self-start">
                @php
                    $leftKeys = ['PrayerTimes', 'LeaderMessage', 'LatestNotices'];
                    $hasLeft = false;
                @endphp
                @foreach ($leftKeys as $lk)
                    @if (isset($components[$lk]))
                        @php $hasLeft = true; @endphp
                        @component('components.frontend.' . $lk, ['data' => $components[$lk]])
                        @endcomponent
                    @endif
                @endforeach

                @if (!$hasLeft)
                    @component('components.frontend.PrayerTimes')
                    @endcomponent
                @endif
            </aside>

            {{-- Middle Main Column: Flexible width (flex-1), takes remaining space --}}
            <main class="min-w-0 lg:flex-1 space-y-5">
                @php
                    $sidebarKeys = ['PrayerTimes', 'LeaderMessage', 'LatestNotices', 'NBRLinks', 'PortLinks', 'CurrencyConverter', 'CondolenceWidget', 'LinkListModule'];
                @endphp

                @foreach ($components as $key => $component)
                    @if (!in_array($key, $sidebarKeys))
                        @if (view()->exists('components.frontend.' . $key))
                            @component('components.frontend.' . $key, ['data' => $component])
                            @endcomponent
                        @endif
                    @endif
                @endforeach

                @if($page->page_text_content && $page->page_text_content != '<p><br></p>')
                    <div class="prevent-tailwind-css">
                        {!! $page->page_text_content !!}
                    </div>
                @endif
            </main>

            {{-- Right Sidebar: Sticky 260px --}}
            <aside aria-label="Regulatory and service information" class="hidden shrink-0 space-y-5 lg:block lg:w-[260px] lg:sticky lg:top-[220px] self-start">
                @php
                    $rightKeys = ['NBRLinks', 'PortLinks', 'CurrencyConverter', 'CondolenceWidget', 'LinkListModule'];
                @endphp
                @foreach ($rightKeys as $rk)
                    @if (isset($components[$rk]))
                        @component('components.frontend.' . $rk, ['data' => $components[$rk]])
                        @endcomponent
                    @endif
                @endforeach
            </aside>
        </div>

        {{-- Mobile & Tablet Layout: Sidebars stacked below main content --}}
        <div class="mt-5 grid gap-5 md:grid-cols-2 lg:hidden">
            <div class="space-y-5">
                @foreach ($leftKeys as $lk)
                    @if (isset($components[$lk]))
                        @component('components.frontend.' . $lk, ['data' => $components[$lk]])
                        @endcomponent
                    @endif
                @endforeach
                @if (!$hasLeft)
                    @component('components.frontend.PrayerTimes')
                    @endcomponent
                @endif
            </div>
            <div class="space-y-5">
                @foreach ($rightKeys as $rk)
                    @if (isset($components[$rk]))
                        @component('components.frontend.' . $rk, ['data' => $components[$rk]])
                        @endcomponent
                    @endif
                @endforeach
            </div>
        </div>
    </div>
</x-Guest-layout>

