<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'id',
        'fn',
        'ln',
        'email',
        'section_id',
        'tasks',
        'grades'
    ];

    protected function casts(): array
    {
        return [
            'tasks' => 'array',
            'grades' => 'array'
        ];
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
