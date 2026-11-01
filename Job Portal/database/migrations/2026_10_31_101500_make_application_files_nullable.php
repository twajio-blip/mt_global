<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('passport_file_path')->nullable()->change();
            $table->string('photo_file_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('passport_file_path')->nullable(false)->change();
            $table->string('photo_file_path')->nullable(false)->change();
        });
    }
};

