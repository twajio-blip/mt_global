<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'user_id',
        'full_name',
        'passport_number',
        'mobile_number',
        'experience_years',
        'has_overseas_experience',
        'current_location',
        'cv_file_path',
        'cv_file_name',
        'passport_file_path',
        'passport_file_name',
        'photo_file_path',
        'photo_file_name',
        'status',
    ];

    protected $casts = [
        'has_overseas_experience' => 'boolean',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function locationCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'current_location');
    }
}

