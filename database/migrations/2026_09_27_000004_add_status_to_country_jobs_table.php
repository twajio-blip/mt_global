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
            $table->string('status')->default('active')->after('description');
        });

        DB::table('country_jobs')->where('is_active', true)->update(['status' => 'active']);
        DB::table('country_jobs')->where('is_active', false)->update(['status' => 'inactive']);
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
