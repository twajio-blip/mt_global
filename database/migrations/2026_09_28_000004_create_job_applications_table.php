<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('all_cvs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_job_id')->constrained('country_jobs')->cascadeOnDelete();
            $table->string('full_name');
            $table->string('phone');
            $table->string('email');
            $table->string('current_location');
            $table->text('message')->nullable();
            $table->string('cv_file_name');
            $table->string('cv_file_path');
            $table->unsignedBigInteger('cv_file_size')->nullable();
            $table->string('cv_mime_type')->nullable();
            $table->timestamp('consent_accepted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('all_cvs');
    }
};
