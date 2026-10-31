<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Job extends Model
{
    use HasFactory;

    protected $table = 'portal_jobs';

    protected $fillable = [
        'title_en',
        'title_bn',
        'prefix',
        'serial_number',
        'job_code',
        'country_id',
        'designation_id',
        'employer_name',
        'employer_name_bn',
        'location',
        'location_bn',
        'vacancy',
        'salary',
        'salary_bn',
        'contract_duration',
        'contract_duration_bn',
        'working_hours',
        'working_hours_bn',
        'interview_date',
        'interview_type',
        'interview_venue',
        'interview_venue_bn',
        'req_experience',
        'req_experience_bn',
        'req_education',
        'req_education_bn',
        'req_age',
        'req_age_bn',
        'req_gender',
        'desc_en',
        'desc_bn',
        'req_candidate_en',
        'req_candidate_bn',
        'responsibilities_en',
        'responsibilities_bn',
        'additional_info_en',
        'additional_info_bn',
        'benefits',
        'visa_fee_type',
        'visa_type',
        'visa_notes_en',
        'visa_notes_bn',
        'application_deadline',
        'status',
    ];

    protected $casts = [
        'benefits' => 'array',
        'interview_date' => 'date',
        'application_deadline' => 'date',
        'serial_number' => 'integer',
        'vacancy' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (Job $job) {
            if (!$job->serial_number) {
                $maxSerial = DB::table('portal_jobs')->max('serial_number') ?? 0;
                $job->serial_number = $maxSerial + 1;
            }
            if (!$job->job_code && $job->prefix) {
                $cleanPrefix = strtoupper(trim($job->prefix));
                $job->job_code = $cleanPrefix . '-' . str_pad((string)$job->serial_number, 4, '0', STR_PAD_LEFT);
            }
        });
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function designation(): BelongsTo
    {
        return $this->belongsTo(Designation::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'job_id');
    }
}

