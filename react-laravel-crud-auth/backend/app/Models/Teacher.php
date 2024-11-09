<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'id',
        'fn',
        'ln',
        'email',
        'subjects',
        'isAdmin',
    ];

    protected function casts(): array
    {
        return [
            'subjects' => 'array'
        ];
    }
}
