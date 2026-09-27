<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_country_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_country_id')->constrained('job_countries')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['job_country_id', 'slug']);
        });

        Schema::table('country_jobs', function (Blueprint $table) {
            $table->foreignId('job_country_location_id')
                ->nullable()
                ->after('job_country_id')
                ->constrained('job_country_locations')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropConstrainedForeignId('job_country_location_id');
        });

        Schema::dropIfExists('job_country_locations');
    }
};
