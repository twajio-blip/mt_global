<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvAcademicQualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_profile_id',
        'degree',
        'institution',
        'passing_year',
        'result_grade',
    ];

    public function cvProfile(): BelongsTo
    {
        return $this->belongsTo(CvProfile::class, 'cv_profile_id');
    }
}

