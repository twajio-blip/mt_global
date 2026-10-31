<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CvProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'photo_path',
        'father_name',
        'mother_name',
        'dob',
        'pob',
        'nationality',
        'gender',
        'marital_status',
        'religion',
        'height',
        'weight',
        'passport_expiry',
        'passport_issue_place',
        'village_area',
        'post_office',
        'police_station',
        'district',
        'country',
        'email',
        'languages',
    ];

    protected $casts = [
        'dob' => 'date',
        'passport_expiry' => 'date',
        'languages' => 'array',
    ];

    protected $appends = ['total_experience_formatted'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function qualifications(): HasMany
    {
        return $this->hasMany(CvAcademicQualification::class, 'cv_profile_id');
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(CvWorkExperience::class, 'cv_profile_id')->orderBy('start_date', 'desc');
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(CvTraining::class, 'cv_profile_id');
    }

    public function getTotalExperienceFormattedAttribute(): string
    {
        $totalMonths = 0;
        foreach ($this->experiences as $exp) {
            if ($exp->start_date) {
                $start = Carbon::parse($exp->start_date);
                $end = $exp->is_current || !$exp->end_date ? Carbon::now() : Carbon::parse($exp->end_date);
                if ($end->greaterThanOrEqualTo($start)) {
                    $totalMonths += $start->diffInMonths($end);
                }
            }
        }

        if ($totalMonths <= 0) {
            return 'No experience entered';
        }

        $years = intdiv($totalMonths, 12);
        $months = $totalMonths % 12;

        if ($years > 0 && $months > 0) {
            return "{$years} " . ($years === 1 ? 'year' : 'years') . " {$months} " . ($months === 1 ? 'month' : 'months');
        } elseif ($years > 0) {
            return "{$years} " . ($years === 1 ? 'year' : 'years');
        } else {
            return "{$months} " . ($months === 1 ? 'month' : 'months');
        }
    }
}

