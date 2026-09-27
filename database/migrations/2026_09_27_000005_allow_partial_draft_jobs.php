<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropForeign(['job_country_id']);
        });

        DB::statement('ALTER TABLE country_jobs MODIFY job_country_id BIGINT UNSIGNED NULL');
        DB::statement('ALTER TABLE country_jobs MODIFY title VARCHAR(255) NULL');
        DB::statement('ALTER TABLE country_jobs MODIFY designation VARCHAR(255) NULL');

        Schema::table('country_jobs', function (Blueprint $table) {
            $table->foreign('job_country_id')->references('id')->on('job_countries')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropForeign(['job_country_id']);
        });

        DB::statement("UPDATE country_jobs SET title = 'Untitled Job' WHERE title IS NULL");
        DB::statement("UPDATE country_jobs SET designation = 'Unassigned' WHERE designation IS NULL");
        DB::statement('ALTER TABLE country_jobs MODIFY job_country_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE country_jobs MODIFY title VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE country_jobs MODIFY designation VARCHAR(255) NOT NULL');

        Schema::table('country_jobs', function (Blueprint $table) {
            $table->foreign('job_country_id')->references('id')->on('job_countries')->cascadeOnDelete();
        });
    }
};
