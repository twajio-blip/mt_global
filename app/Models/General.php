<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class General extends  BaseModel
{
    use HasFactory;
    protected $guarded = [];

    protected $casts = [
        'left_sidebar_components' => 'array',
        'right_sidebar_components' => 'array',
    ];
}