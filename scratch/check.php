<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = \App\Models\Page::first();
$sidebarComp = \App\Models\ComponentMaster::find(54);

$fields = $sidebarComp->componentFiled()->get();

$reflector = new \ReflectionClass(\App\Http\Controllers\Frontend\PageController::class);
$controller = new \App\Http\Controllers\Frontend\PageController();
$buildMethod = $reflector->getMethod('buildGroupWiseComponentData');
$buildMethod->setAccessible(true);

$groupWiseData = $buildMethod->invoke($controller, $fields, $sidebarComp, $page->id);

echo "groupWiseData: " . json_encode($groupWiseData, JSON_PRETTY_PRINT) . "\n";
