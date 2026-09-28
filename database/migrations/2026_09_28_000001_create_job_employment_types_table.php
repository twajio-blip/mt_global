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
        Schema::create('job_employment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('country_jobs', function (Blueprint $table) {
            $table->foreignId('job_employment_type_id')
                ->nullable()
                ->after('job_designation_id')
                ->constrained('job_employment_types')
                ->nullOnDelete();
        });

        $types = DB::table('country_jobs')
            ->whereNotNull('employment_type')
            ->where('employment_type', '!=', '')
            ->distinct()
            ->pluck('employment_type');

        foreach ($types as $type) {
            $name = trim($type);
            if ($name === '') {
                continue;
            }

            $slug = Str::slug($name);
            $base = $slug;
            $count = 1;

            while (DB::table('job_employment_types')->where('slug', $slug)->exists()) {
                $slug = $base . '-' . $count;
                $count++;
            }

            $id = DB::table('job_employment_types')->insertGetId([
                'name' => $name,
                'slug' => $slug,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('country_jobs')->where('employment_type', $type)->update([
                'job_employment_type_id' => $id,
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropConstrainedForeignId('job_employment_type_id');
        });

        Schema::dropIfExists('job_employment_types');
    }
};
