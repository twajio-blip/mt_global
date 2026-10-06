<x-Guest-layout :pageinfo="$page">
    @if ((int) $page->is_breadcrumb && view()->exists('components.frontend.breadcrumbs'))
        <x-frontend.breadcrumbs :data="$page" />
    @endif

    @php
        $leftKeys = is_array($general->left_sidebar_components ?? null) 
            ? $general->left_sidebar_components 
            : ['PrayerTimes', 'LeaderMessage', 'LatestNotices'];
        $rightKeys = is_array($general->right_sidebar_components ?? null) 
            ? $general->right_sidebar_components 
            : ['NBRLinks', 'PortLinks', 'CurrencyConverter', 'CondolenceWidget', 'LinkListModule'];
        $allSidebarKeys = array_merge($leftKeys, $rightKeys);
    @endphp

    <div class="mx-auto w-full max-w-[1320px] flex-1 px-4 py-5 lg:px-6">
        <div class="lg:flex lg:items-start lg:gap-5">
            {{-- Left Sidebar: Sticky 260px --}}
            <aside aria-label="Association information" class="hidden shrink-0 space-y-5 lg:block lg:w-[260px] lg:sticky lg:top-[68px] self-start">
                @foreach ($leftKeys as $lk)
                    @php
                        $vName = $lk;
                        if (!view()->exists('components.frontend.' . $vName)) {
                            $mapped = str_replace(['Widget', 'Links', 'Notices'], ['', 'Information', 'Notice'], $vName);
                            if (str_starts_with($vName, 'NBR')) { $mapped = 'NbrInformation'; }
                            if (str_starts_with($vName, 'Port')) { $mapped = 'PortInformation'; }
                            if (view()->exists('components.frontend.' . $mapped)) { $vName = $mapped; }
                        }
                        $cData = $components[$lk] ?? $components[$vName] ?? null;
                    @endphp
                    @if ($cData && view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName, ['data' => $cData])
                        @endcomponent
                    @elseif (view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName)
                        @endcomponent
                    @endif
                @endforeach
            </aside>

            {{-- Middle Main Column: Flexible width (flex-1), page-specific content --}}
            <main class="min-w-0 lg:flex-1 space-y-5">
                @foreach ($components as $key => $component)
                    @if (!in_array($key, $allSidebarKeys))
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
            <aside aria-label="Regulatory and service information" class="hidden shrink-0 space-y-5 lg:block lg:w-[260px] lg:sticky lg:top-[68px] self-start">
                @foreach ($rightKeys as $rk)
                    @php
                        $vName = $rk;
                        if (!view()->exists('components.frontend.' . $vName)) {
                            $mapped = str_replace(['Widget', 'Links', 'Notices'], ['', 'Information', 'Notice'], $vName);
                            if (str_starts_with($vName, 'NBR')) { $mapped = 'NbrInformation'; }
                            if (str_starts_with($vName, 'Port')) { $mapped = 'PortInformation'; }
                            if (view()->exists('components.frontend.' . $mapped)) { $vName = $mapped; }
                        }
                        $cData = $components[$rk] ?? $components[$vName] ?? null;
                    @endphp
                    @if ($cData && view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName, ['data' => $cData])
                        @endcomponent
                    @elseif (view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName)
                        @endcomponent
                    @endif
                @endforeach
            </aside>
        </div>

        {{-- Mobile & Tablet Layout: Sidebars stacked below main content --}}
        <div class="mt-5 grid gap-5 md:grid-cols-2 lg:hidden">
            <div class="space-y-5">
                @foreach ($leftKeys as $lk)
                    @php
                        $vName = $lk;
                        if (!view()->exists('components.frontend.' . $vName)) {
                            $mapped = str_replace(['Widget', 'Links', 'Notices'], ['', 'Information', 'Notice'], $vName);
                            if (str_starts_with($vName, 'NBR')) { $mapped = 'NbrInformation'; }
                            if (str_starts_with($vName, 'Port')) { $mapped = 'PortInformation'; }
                            if (view()->exists('components.frontend.' . $mapped)) { $vName = $mapped; }
                        }
                        $cData = $components[$lk] ?? $components[$vName] ?? null;
                    @endphp
                    @if ($cData && view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName, ['data' => $cData])
                        @endcomponent
                    @elseif (view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName)
                        @endcomponent
                    @endif
                @endforeach
            </div>
            <div class="space-y-5">
                @foreach ($rightKeys as $rk)
                    @php
                        $vName = $rk;
                        if (!view()->exists('components.frontend.' . $vName)) {
                            $mapped = str_replace(['Widget', 'Links', 'Notices'], ['', 'Information', 'Notice'], $vName);
                            if (str_starts_with($vName, 'NBR')) { $mapped = 'NbrInformation'; }
                            if (str_starts_with($vName, 'Port')) { $mapped = 'PortInformation'; }
                            if (view()->exists('components.frontend.' . $mapped)) { $vName = $mapped; }
                        }
                        $cData = $components[$rk] ?? $components[$vName] ?? null;
                    @endphp
                    @if ($cData && view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName, ['data' => $cData])
                        @endcomponent
                    @elseif (view()->exists('components.frontend.' . $vName))
                        @component('components.frontend.' . $vName)
                        @endcomponent
                    @endif
                @endforeach
            </div>
        </div>
    </div>
</x-Guest-layout>
