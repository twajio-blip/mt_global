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
        Schema::create('job_designations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::table('country_jobs', function (Blueprint $table) {
            $table->foreignId('job_designation_id')->nullable()->after('job_country_id')->constrained('job_designations')->nullOnDelete();
        });

        $designations = DB::table('country_jobs')
            ->whereNotNull('designation')
            ->where('designation', '!=', '')
            ->distinct()
            ->pluck('designation');

        foreach ($designations as $designation) {
            $slug = Str::slug($designation);
            $baseSlug = $slug;
            $count = 1;

            while (DB::table('job_designations')->where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $id = DB::table('job_designations')->insertGetId([
                'name' => $designation,
                'slug' => $slug,
                'is_active' => true,
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('country_jobs')->where('designation', $designation)->update([
                'job_designation_id' => $id,
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropConstrainedForeignId('job_designation_id');
        });

        Schema::dropIfExists('job_designations');
    }
};
