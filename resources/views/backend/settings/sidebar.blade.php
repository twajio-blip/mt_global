<x-Deshboard-layout>
    <div class="py-10 space-y-6">
        <!-- Header -->
        <div class="space-y-2">
            <h2 class="text-[24px] font-bold text-skin-backend-text-base">
                <a href="{{ route('theme-option.index') }}" class="font-bold text-skin-backend-text-base">Settings</a> /
                <span class="text-skin-backend-text-base text-opacity-50">Global Sidebar Settings</span>
            </h2>
            <p class="text-[14px] text-skin-backend-text-base text-opacity-50 max-w-2xl">
                Manage the global Left Sidebar and Right Sidebar components that appear consistently across all pages, and edit their field values.
            </p>
        </div>

        <form action="{{ route('sidebar.settings.store') }}" method="post">
            @csrf

            <div class="grid grid-cols-12 gap-6">
                <!-- Left Sidebar Settings -->
                <div class="col-span-12 lg:col-span-6 p-6 bg-skin-backend-secondary rounded-[10px] space-y-4 border border-default border-opacity-25">
                    <div class="flex items-center justify-between pb-3 border-b border-default border-opacity-50">
                        <h3 class="text-lg font-bold text-white flex items-center gap-2">
                            <i class="fa-solid fa-bars-staggered text-[#105493]"></i> Left Sidebar Components
                        </h3>
                    </div>

                    <!-- Filter Existing List -->
                    <div class="relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-xs">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" class="filter-sidebar-items w-full bg-slate-900/60 text-xs text-white border border-gray-700 rounded-md pl-8 py-2 focus:outline-none focus:border-[#105493]" placeholder="Filter items in left sidebar..." data-target="#left-sidebar-sortable">
                    </div>

                    <div id="left-sidebar-sortable" class="space-y-2 min-h-[160px] max-h-[400px] overflow-y-auto p-2 bg-slate-900/40 rounded-lg">
                        @foreach ($leftSidebar as $item)
                            @php
                                $compObj = $components->firstWhere('name', $item);
                            @endphp
                            <div class="sidebar-item flex items-center justify-between py-3 px-4 bg-skin-backend-secondary border border-default border-opacity-25 rounded-[8px] cursor-grab">
                                <div class="flex items-center gap-3">
                                    <i class="fa-solid fa-grip-vertical text-gray-400"></i>
                                    <span class="font-medium text-white item-name">{{ $item }}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    @if($compObj)
                                        <button type="button" data-name="{{ $item }}" data="{{ e(json_encode($compObj)) }}" class="edit-sidebar-component size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-blue-200 bg-blue-600 hover:bg-blue-500" title="Edit Component Fields">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    @endif
                                    <input type="hidden" name="left_sidebar_components[]" value="{{ $item }}">
                                    <button type="button" class="remove-sidebar-item size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-red-200 bg-red-600 hover:bg-red-500" title="Remove Component">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <!-- Add Component Section with Search/Select -->
                    <div class="pt-2 space-y-2">
                        <label class="text-xs font-semibold text-gray-300">Add Component to Left Sidebar</label>
                        <div class="flex gap-2">
                            <div class="relative flex-1">
                                <input type="text" list="left-available-components" id="left-add-name" placeholder="Search or select component..." class="w-full text-sm bg-slate-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#105493]">
                                <datalist id="left-available-components">
                                    <option value="PrayerTimes">
                                    <option value="LeaderMessage">
                                    <option value="LatestNotices">
                                    <option value="NBRLinks">
                                    <option value="PortLinks">
                                    <option value="CurrencyConverter">
                                    <option value="CondolenceWidget">
                                    <option value="LinkListModule">
                                    <option value="HomeSlider">
                                    @foreach($components as $comp)
                                        <option value="{{ $comp->name }}">
                                    @endforeach
                                </datalist>
                            </div>
                            <button type="button" id="btn-add-left" class="px-4 py-2 bg-[#105493] text-white rounded text-sm font-semibold hover:bg-opacity-90 shrink-0">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar Settings -->
                <div class="col-span-12 lg:col-span-6 p-6 bg-skin-backend-secondary rounded-[10px] space-y-4 border border-default border-opacity-25">
                    <div class="flex items-center justify-between pb-3 border-b border-default border-opacity-50">
                        <h3 class="text-lg font-bold text-white flex items-center gap-2">
                            <i class="fa-solid fa-bars-staggered text-[#D5A63F]"></i> Right Sidebar Components
                        </h3>
                    </div>

                    <!-- Filter Existing List -->
                    <div class="relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-xs">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" class="filter-sidebar-items w-full bg-slate-900/60 text-xs text-white border border-gray-700 rounded-md pl-8 py-2 focus:outline-none focus:border-[#D5A63F]" placeholder="Filter items in right sidebar..." data-target="#right-sidebar-sortable">
                    </div>

                    <div id="right-sidebar-sortable" class="space-y-2 min-h-[160px] max-h-[400px] overflow-y-auto p-2 bg-slate-900/40 rounded-lg">
                        @foreach ($rightSidebar as $item)
                            @php
                                $compObj = $components->firstWhere('name', $item);
                            @endphp
                            <div class="sidebar-item flex items-center justify-between py-3 px-4 bg-skin-backend-secondary border border-default border-opacity-25 rounded-[8px] cursor-grab">
                                <div class="flex items-center gap-3">
                                    <i class="fa-solid fa-grip-vertical text-gray-400"></i>
                                    <span class="font-medium text-white item-name">{{ $item }}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    @if($compObj)
                                        <button type="button" data-name="{{ $item }}" data="{{ e(json_encode($compObj)) }}" class="edit-sidebar-component size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-blue-200 bg-blue-600 hover:bg-blue-500" title="Edit Component Fields">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    @endif
                                    <input type="hidden" name="right_sidebar_components[]" value="{{ $item }}">
                                    <button type="button" class="remove-sidebar-item size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-red-200 bg-red-600 hover:bg-red-500" title="Remove Component">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <!-- Add Component Section with Search/Select -->
                    <div class="pt-2 space-y-2">
                        <label class="text-xs font-semibold text-gray-300">Add Component to Right Sidebar</label>
                        <div class="flex gap-2">
                            <div class="relative flex-1">
                                <input type="text" list="right-available-components" id="right-add-name" placeholder="Search or select component..." class="w-full text-sm bg-slate-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#D5A63F]">
                                <datalist id="right-available-components">
                                    <option value="NBRLinks">
                                    <option value="PortLinks">
                                    <option value="CurrencyConverter">
                                    <option value="CondolenceWidget">
                                    <option value="LinkListModule">
                                    <option value="PrayerTimes">
                                    <option value="LeaderMessage">
                                    <option value="LatestNotices">
                                    <option value="HomeSlider">
                                    @foreach($components as $comp)
                                        <option value="{{ $comp->name }}">
                                    @endforeach
                                </datalist>
                            </div>
                            <button type="button" id="btn-add-right" class="px-4 py-2 bg-[#D5A63F] text-black rounded text-sm font-semibold hover:bg-opacity-90 shrink-0">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 pt-4">
                    <button type="submit" class="px-8 py-3 bg-skin-backend-accent text-skin-invert font-semibold rounded-[10px] hover:bg-opacity-90 transition-opacity shadow-md">
                        Save Global Sidebar Settings
                    </button>
                </div>
            </div>
        </form>
    </div>

    <!-- Hidden Component Registry for JS Lookup -->
    <script>
        window._sidebarComponentRegistry = {
            @foreach($components as $comp)
                "{{ $comp->name }}": {!! json_encode($comp) !!},
            @endforeach
        };
    </script>

    @include('backend.pages.pages.model.field-data-model')

    @if ($message = Session::get('success'))
        <x-backend.flash-error :message="$message" :type="'success'" />
    @endif
</x-Deshboard-layout>

<script>
    $(function() {
        $("#left-sidebar-sortable").sortable();
        $("#right-sidebar-sortable").sortable();

        // Remove item
        $(document).on('click', '.remove-sidebar-item', function() {
            $(this).closest('.sidebar-item').remove();
        });

        // Edit component fields modal trigger
        $(document).on('click', '.edit-sidebar-component', function() {
            let compName = $(this).attr('data-name') || $(this).closest('.sidebar-item').find('.item-name').text().trim();
            let data = (window._sidebarComponentRegistry && window._sidebarComponentRegistry[compName]) ? window._sidebarComponentRegistry[compName] : null;

            if (!data) {
                let rawData = $(this).attr('data');
                if (rawData) {
                    try {
                        let unescaped = rawData.replace(/&quot;/g, '"').replace(/&apos;/g, "'");
                        data = JSON.parse(unescaped);
                    } catch (e) {
                        console.error('Could not parse component data', e);
                    }
                }
            }

            if (!data) return;

            let dummy = $('<button class="add-field-value hidden"></button>');
            dummy.attr('data', JSON.stringify(data));
            dummy.attr('dataBase', '');
            $('body').append(dummy);
            dummy.trigger('click');
            setTimeout(() => dummy.remove(), 500);
        });

        // Live Filter in List
        $(document).on('keyup', '.filter-sidebar-items', function() {
            let query = $(this).val().toLowerCase().trim();
            let targetContainer = $($(this).data('target'));
            
            targetContainer.find('.sidebar-item').each(function() {
                let text = $(this).find('.item-name').text().toLowerCase();
                if (text.indexOf(query) !== -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        // Add to Left
        $('#btn-add-left').on('click', function() {
            let val = $('#left-add-name').val().trim();
            if (val) {
                let compObj = window._sidebarComponentRegistry[val] || null;
                let editBtnHtml = compObj ? `
                    <button type="button" data="${JSON.stringify(compObj).replace(/"/g, '&quot;')}" class="edit-sidebar-component size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-blue-200 bg-blue-600 hover:bg-blue-500" title="Edit Component Fields">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                ` : '';

                let html = `
                    <div class="sidebar-item flex items-center justify-between py-3 px-4 bg-skin-backend-secondary border border-default border-opacity-25 rounded-[8px] cursor-grab">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-grip-vertical text-gray-400"></i>
                            <span class="font-medium text-white item-name">${val}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            ${editBtnHtml}
                            <input type="hidden" name="left_sidebar_components[]" value="${val}">
                            <button type="button" class="remove-sidebar-item size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-red-200 bg-red-600 hover:bg-red-500" title="Remove Component">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                `;
                $('#left-sidebar-sortable').append(html);
                $('#left-add-name').val('');
            }
        });

        // Add to Right
        $('#btn-add-right').on('click', function() {
            let val = $('#right-add-name').val().trim();
            if (val) {
                let compObj = window._sidebarComponentRegistry[val] || null;
                let editBtnHtml = compObj ? `
                    <button type="button" data="${JSON.stringify(compObj).replace(/"/g, '&quot;')}" class="edit-sidebar-component size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-blue-200 bg-blue-600 hover:bg-blue-500" title="Edit Component Fields">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                ` : '';

                let html = `
                    <div class="sidebar-item flex items-center justify-between py-3 px-4 bg-skin-backend-secondary border border-default border-opacity-25 rounded-[8px] cursor-grab">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-grip-vertical text-gray-400"></i>
                            <span class="font-medium text-white item-name">${val}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            ${editBtnHtml}
                            <input type="hidden" name="right_sidebar_components[]" value="${val}">
                            <button type="button" class="remove-sidebar-item size-7 inline-flex justify-center items-center text-xs font-semibold rounded-full border border-transparent text-red-200 bg-red-600 hover:bg-red-500" title="Remove Component">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                `;
                $('#right-sidebar-sortable').append(html);
                $('#right-add-name').val('');
            }
        });
    });
</script>
