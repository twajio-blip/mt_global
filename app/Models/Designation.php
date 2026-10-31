<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Designation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_bn',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }
}
