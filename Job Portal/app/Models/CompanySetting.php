<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    use HasFactory;

    protected $table = 'company_settings';

    protected $fillable = [
        'company_name',
        'company_email',
        'phone',
        'address',
        'website',
        'logo_path',
        'qr_image_path',
    ];

    /**
     * Retrieve the singleton company setting record or create default
     */
    public static function getSettings(): self
    {
        return static::firstOrCreate([], [
            'company_name' => 'Greenland Overseas',
            'company_email' => 'gland@glandgroup.com',
            'phone' => '+880 2 48810210-17',
            'address' => "Plot-1, Road-1, Gulshan-1\nDhaka-1212, Bangladesh",
            'website' => 'www.glandgroup.com',
        ]);
    }
}

