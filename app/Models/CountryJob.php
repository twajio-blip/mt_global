<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CountryJob extends BaseModel
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'deadline' => 'date',
        'is_active' => 'boolean',
        'benefit_accommodation' => 'boolean',
        'benefit_food' => 'boolean',
        'benefit_transportation' => 'boolean',
        'benefit_medical' => 'boolean',
        'benefit_air_ticket' => 'boolean',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(JobCountry::class, 'job_country_id');
    }

    public function countryLocation(): BelongsTo
    {
        return $this->belongsTo(JobCountryLocation::class, 'job_country_location_id');
    }

    public function jobDesignation(): BelongsTo
    {
        return $this->belongsTo(JobDesignation::class, 'job_designation_id');
    }

    public function employmentType(): BelongsTo
    {
        return $this->belongsTo(JobEmploymentType::class, 'job_employment_type_id');
    }

    public function benefits(): BelongsToMany
    {
        return $this->belongsToMany(JobBenefit::class, 'country_job_benefit')->withTimestamps();
    }
}
