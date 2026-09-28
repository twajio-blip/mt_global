<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_countries', function (Blueprint $table) {
            $table->string('flag_code', 2)->nullable()->after('slug');
        });

        $codes = [
            'Saudi Arabia' => 'sa',
            'UAE' => 'ae',
            'Qatar' => 'qa',
            'Kuwait' => 'kw',
            'Oman' => 'om',
            'Bahrain' => 'bh',
            'Malaysia' => 'my',
            'Singapore' => 'sg',
            'Romania' => 'ro',
            'Croatia' => 'hr',
            'Poland' => 'pl',
        ];

        foreach ($codes as $name => $code) {
            DB::table('job_countries')->where('name', $name)->update([
                'flag_code' => $code,
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('job_countries', function (Blueprint $table) {
            $table->dropColumn('flag_code');
        });
    }
};
