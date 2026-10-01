<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('job_applications') && !Schema::hasTable('all_cvs')) {
            Schema::rename('job_applications', 'all_cvs');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('all_cvs') && !Schema::hasTable('job_applications')) {
            Schema::rename('all_cvs', 'job_applications');
        }
    }
};
