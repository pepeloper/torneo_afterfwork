<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Group extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function ranking()
    {
        $ranking = DB::table('users')
            ->select(
                'users.id',
                'users.name',
                'users.last_year_position',
                DB::raw('SUM(game_user.points_in_favor) as points_in_favor'),
                DB::raw('SUM(game_user.points_against) as points_against')
            )
            ->join('game_user', 'users.id', '=', 'game_user.user_id')
            ->join('games', 'games.id', '=', 'game_user.game_id')
            ->where('games.group_id', $this->id)
            ->groupBy('users.id', 'users.name', 'users.last_year_position')
            ->orderByRaw('SUM(game_user.points_in_favor) - SUM(game_user.points_against) DESC,
                  CASE WHEN users.last_year_position IS NULL THEN 1 ELSE 0 END,
                  users.last_year_position ASC')
            ->get();

            return $ranking;
    }
}
