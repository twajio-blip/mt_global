<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobCountryLocation extends BaseModel
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(JobCountry::class, 'job_country_id');
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(CountryJob::class, 'job_country_location_id');
    }
}
