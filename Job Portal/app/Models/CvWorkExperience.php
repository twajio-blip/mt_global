<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvWorkExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_profile_id',
        'job_title',
        'company',
        'country',
        'salary',
        'start_date',
        'end_date',
        'is_current',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
    ];

    public function cvProfile(): BelongsTo
    {
        return $this->belongsTo(CvProfile::class, 'cv_profile_id');
    }
}

