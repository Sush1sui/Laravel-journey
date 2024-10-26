<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'email',
        'address',
        'city',
        'state',
        'postal_code'
    ];

    // set relationship to has many invoices
    // invoice will be reverse,
    // instead of has many, it will be just "belongs to"
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
