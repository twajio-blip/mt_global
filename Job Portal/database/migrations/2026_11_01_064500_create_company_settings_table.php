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
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->default('Greenland Overseas');
            $table->string('company_email')->nullable()->default('gland@glandgroup.com');
            $table->string('phone')->nullable()->default('+880 2 48810210-17');
            $table->text('address')->nullable();
            $table->string('website')->nullable()->default('www.glandgroup.com');
            $table->string('logo_path')->nullable();
            $table->string('qr_image_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_settings');
    }
};

