<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class JobBenefit extends BaseModel
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function jobs(): BelongsToMany
    {
        return $this->belongsToMany(CountryJob::class, 'country_job_benefit')->withTimestamps();
    }
}
