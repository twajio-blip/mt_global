<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_designation_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('job_designations', function (Blueprint $table) {
            $table->foreignId('job_designation_category_id')
                ->nullable()
                ->after('id')
                ->constrained('job_designation_categories')
                ->nullOnDelete();
        });

        $categories = [
            'Construction & Trades',
            'Technical',
            'Engineering & Supervision',
            'Driving & Transport',
            'Industrial & Facilities',
            'Hospitality',
            'Office & Retail',
            'Other Roles',
        ];

        foreach ($categories as $category) {
            DB::table('job_designation_categories')->insert([
                'name' => $category,
                'slug' => Str::slug($category),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('job_designations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('job_designation_category_id');
        });

        Schema::dropIfExists('job_designation_categories');
    }
};
