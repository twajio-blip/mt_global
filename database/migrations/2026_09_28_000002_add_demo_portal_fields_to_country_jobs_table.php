<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->string('contract_duration')->nullable()->after('employment_type');
            $table->string('working_hours')->nullable()->after('contract_duration');
            $table->string('overtime')->nullable()->after('working_hours');
            $table->string('experience')->nullable()->after('overtime');
            $table->string('education')->nullable()->after('experience');
            $table->string('age')->nullable()->after('education');
            $table->string('gender')->nullable()->after('age');
            $table->string('visa_type')->nullable()->after('gender');
            $table->longText('visa_info')->nullable()->after('visa_type');
            $table->longText('responsibilities')->nullable()->after('description');
            $table->longText('requirements')->nullable()->after('responsibilities');
            $table->longText('additional_info')->nullable()->after('requirements');
        });
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropColumn([
                'contract_duration',
                'working_hours',
                'overtime',
                'experience',
                'education',
                'age',
                'gender',
                'visa_type',
                'visa_info',
                'responsibilities',
                'requirements',
                'additional_info',
            ]);
        });
    }
};
