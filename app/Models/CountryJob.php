<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CountryJob extends BaseModel
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'deadline' => 'date',
        'is_active' => 'boolean',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(JobCountry::class, 'job_country_id');
    }

    public function jobDesignation(): BelongsTo
    {
        return $this->belongsTo(JobDesignation::class, 'job_designation_id');
    }
}
