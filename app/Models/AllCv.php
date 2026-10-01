<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AllCv extends BaseModel
{
    use HasFactory;

    protected $table = 'all_cvs';

    protected $guarded = [];

    protected $casts = [
        'consent_accepted_at' => 'datetime',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(CountryJob::class, 'country_job_id');
    }
}
