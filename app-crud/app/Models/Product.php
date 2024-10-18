<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;


    /**
     * MANAGE TABLE
     *
     * This is the column name
     * that we want the user
     * to input information
     * into the database
     */
    protected $fillable = [
        'name',
        'qty',
        'price',
        'description'
    ];
}
