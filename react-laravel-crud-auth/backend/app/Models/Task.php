<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_name',
        'tests',
        'student_id',
        'score',
        'type',
        'total_score',
        'subject_code'
    ];

    protected function casts(): array
    {
        return [
            'tests' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(Student::class);
    }
}
