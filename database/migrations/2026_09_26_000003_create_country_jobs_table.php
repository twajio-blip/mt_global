<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('country_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_country_id')->constrained('job_countries')->cascadeOnDelete();
            $table->string('title');
            $table->string('designation');
            $table->string('location')->nullable();
            $table->string('employer')->nullable();
            $table->unsignedInteger('vacancies')->nullable();
            $table->string('salary')->nullable();
            $table->string('employment_type')->nullable();
            $table->date('deadline')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('country_jobs');
    }
};
