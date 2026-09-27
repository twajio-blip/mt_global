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
        Schema::create('job_benefits', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('country_job_benefit', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_job_id')->constrained('country_jobs')->cascadeOnDelete();
            $table->foreignId('job_benefit_id')->constrained('job_benefits')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['country_job_id', 'job_benefit_id']);
        });

        $benefits = [
            'benefit_accommodation' => 'Accommodation',
            'benefit_food' => 'Food',
            'benefit_transportation' => 'Transportation',
            'benefit_medical' => 'Medical',
            'benefit_air_ticket' => 'Air Ticket',
        ];

        foreach ($benefits as $column => $name) {
            $benefitId = DB::table('job_benefits')->insertGetId([
                'name' => $name,
                'slug' => Str::slug($name),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if (Schema::hasColumn('country_jobs', $column)) {
                DB::table('country_jobs')
                    ->where($column, true)
                    ->orderBy('id')
                    ->pluck('id')
                    ->each(function ($jobId) use ($benefitId) {
                        DB::table('country_job_benefit')->insertOrIgnore([
                            'country_job_id' => $jobId,
                            'job_benefit_id' => $benefitId,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    });
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('country_job_benefit');
        Schema::dropIfExists('job_benefits');
    }
};
