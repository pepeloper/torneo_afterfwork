<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Squad extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tournaments()
    {
        return $this->hasMany(Tournament::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
