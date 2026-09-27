<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $jobs = DB::table('country_jobs')
            ->whereNotNull('location')
            ->where('location', '!=', '')
            ->get(['id', 'job_country_id', 'location']);

        foreach ($jobs as $job) {
            $name = trim($job->location);
            if ($name === '') {
                continue;
            }

            $slug = Str::slug($name);

            $location = DB::table('job_country_locations')
                ->where('job_country_id', $job->job_country_id)
                ->where('slug', $slug)
                ->first();

            if (!$location) {
                $id = DB::table('job_country_locations')->insertGetId([
                    'job_country_id' => $job->job_country_id,
                    'name' => $name,
                    'slug' => $slug,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $id = $location->id;
            }

            DB::table('country_jobs')->where('id', $job->id)->update([
                'job_country_location_id' => $id,
            ]);
        }
    }

    public function down(): void
    {
        DB::table('country_jobs')->update([
            'job_country_location_id' => null,
        ]);
    }
};
