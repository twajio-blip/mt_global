<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->boolean('benefit_accommodation')->default(false)->after('employment_type');
            $table->boolean('benefit_food')->default(false)->after('benefit_accommodation');
            $table->boolean('benefit_transportation')->default(false)->after('benefit_food');
            $table->boolean('benefit_medical')->default(false)->after('benefit_transportation');
            $table->boolean('benefit_air_ticket')->default(false)->after('benefit_medical');
        });
    }

    public function down(): void
    {
        Schema::table('country_jobs', function (Blueprint $table) {
            $table->dropColumn([
                'benefit_accommodation',
                'benefit_food',
                'benefit_transportation',
                'benefit_medical',
                'benefit_air_ticket',
            ]);
        });
    }
};
