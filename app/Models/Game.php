<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $casts = [
        'played' => 'boolean',
    ];

    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot(['points_in_favor', 'points_against']);
    }

    public static function createGamesForLeague($league, $users)
    {
        return true;
    }
}
