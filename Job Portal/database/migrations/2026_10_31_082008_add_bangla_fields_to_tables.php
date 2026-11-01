<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Countries: add name_bn
        Schema::table('countries', function (Blueprint $table) {
            $table->string('name_bn')->nullable()->after('name');
        });

        // 2. Designations: add name_bn, drop category if present
        Schema::table('designations', function (Blueprint $table) {
            $table->string('name_bn')->nullable()->after('name');
            if (Schema::hasColumn('designations', 'category')) {
                $table->dropColumn('category');
            }
        });

        // 3. Portal Jobs: add remaining bangla bilingual fields
        Schema::table('portal_jobs', function (Blueprint $table) {
            $table->string('employer_name_bn')->nullable()->after('employer_name');
            $table->string('location_bn')->nullable()->after('location');
            $table->string('salary_bn')->nullable()->after('salary');
            $table->string('contract_duration_bn')->nullable()->after('contract_duration');
            $table->string('working_hours_bn')->nullable()->after('working_hours');
            $table->string('interview_venue_bn')->nullable()->after('interview_venue');
            $table->string('req_experience_bn')->nullable()->after('req_experience');
            $table->string('req_education_bn')->nullable()->after('req_education');
            $table->string('req_age_bn')->nullable()->after('req_age');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('countries', function (Blueprint $table) {
            $table->dropColumn('name_bn');
        });

        Schema::table('designations', function (Blueprint $table) {
            $table->dropColumn('name_bn');
            $table->string('category', 100)->nullable();
        });

        Schema::table('portal_jobs', function (Blueprint $table) {
            $table->dropColumn([
                'employer_name_bn',
                'location_bn',
                'salary_bn',
                'contract_duration_bn',
                'working_hours_bn',
                'interview_venue_bn',
                'req_experience_bn',
                'req_education_bn',
                'req_age_bn',
            ]);
        });
    }
};
