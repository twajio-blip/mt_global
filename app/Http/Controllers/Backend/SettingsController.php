<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class SettingsController extends Controller
{
    public function write_on_env_file(Request $request)
    {
        foreach ($request->types as $key => $type) {
            $this->writeOnENV($type, $request[$type]);
        }
        clear_cache();
        return back()->with(['success' => "Updated successfully!"]);
    }

    public function writeOnENV($type, $val)
    {
        // dd($type, $val);
        $path = base_path('.env');
        if (file_exists($path)) {
            $val = '"' . trim($val) . '"';
            if (is_numeric(strpos(file_get_contents($path), $type)) && strpos(file_get_contents($path), $type) >= 0) {
                file_put_contents($path, str_replace(
                    $type . '="' . env($type) . '"',
                    $type . '=' . $val,
                    file_get_contents($path)
                ));
            } else {
                file_put_contents($path, file_get_contents($path) . "\r\n" . $type . '=' . $val);
            }
        }
    }

    function clearCache(Request $request)
    {
        clear_cache();
        Artisan::call('optimize:clear');
        return redirect()->back();
    }

    function headerFooterSettings(Request $request)
    {

        // Prepare the data for header and footer
        $data = [
            'setting' => General::first(),
        ];


        return view('backend.settings.headerFooter', compact('data'));
    }

    function preparedHeaderFooterSettings($src)
    {
        // Header array
        $data = [];
        foreach ($src as $file) {
            $filename = $file->getFilename();

            // Step 1: Remove .blade.php
            $nameWithoutExtension = str_replace('.blade.php', '', $filename);

            // Step 2: Insert spaces before capital letters (CamelCase split)
            $spacedName = preg_replace('/(?<!^)([A-Z])/', ' $1', $nameWithoutExtension);
            // Step 3: Make it lowercase and capitalize words
            $formatted = ucwords(strtolower($spacedName));
            $data[] = ['level' => $formatted, 'value' => $nameWithoutExtension];
        }

        return $data;
    }


    public function storeHeaderFooterSettings(Request $request)
    {

        if (request()->header) {
            // Update the header in the database
            General::updateOrCreate(
                ['id' => 1],
                [
                    'header_component' => request()->header,
                    'header_component_position' => request()->position,

                ]
            );
        } else if (request()->footer) {
            // Update the footer in the database
            General::updateOrCreate(
                ['id' => 1],
                [
                    'footer_component' => request()->footer,

                ]
            );
        }
        return redirect()->back()->with(['success' => 'Header and Footer settings updated successfully!']);
    }

    public function sidebarSettings(Request $request)
    {
        $general = General::first();
        $components = \App\Models\ComponentMaster::orderBy('name')->get();

        $leftSidebar = $general->left_sidebar_components ?? ['PrayerTimes', 'LeaderMessage', 'LatestNotices'];
        $rightSidebar = $general->right_sidebar_components ?? ['NBRLinks', 'PortLinks', 'CurrencyConverter', 'CondolenceWidget', 'LinkListModule'];

        return view('backend.settings.sidebar', compact('general', 'components', 'leftSidebar', 'rightSidebar'));
    }

    public function storeSidebarSettings(Request $request)
    {
        $left = array_values(array_filter($request->input('left_sidebar_components', [])));
        $right = array_values(array_filter($request->input('right_sidebar_components', [])));

        General::updateOrCreate(
            ['id' => 1],
            [
                'left_sidebar_components' => $left,
                'right_sidebar_components' => $right,
            ]
        );

        \Illuminate\Support\Facades\Cache::forget('general_settings');

        return redirect()->back()->with('success', 'Global Sidebar Settings updated successfully!');
    }
}
