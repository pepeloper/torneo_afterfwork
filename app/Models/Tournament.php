<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tournament extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function ranking()
    {
        $ranking = DB::table('users')
            ->select(
                'users.id',
                'users.name',
                'users.last_year_position',
                'users.photo',
                DB::raw('SUM(game_user.points_in_favor) as points_in_favor'),
                DB::raw('SUM(game_user.points_against) as points_against')
            )
            ->join('game_user', 'users.id', '=', 'game_user.user_id')
            ->join('games', 'games.id', '=', 'game_user.game_id')
            ->join('groups', 'groups.id', '=', 'games.group_id')
            ->where('groups.tournament_id', $this->id)
            ->groupBy('users.id', 'users.name', 'users.last_year_position')
            ->orderByRaw('SUM(game_user.points_in_favor) - SUM(game_user.points_against) DESC,
              CASE WHEN users.last_year_position IS NULL THEN 1 ELSE 0 END,
              users.last_year_position ASC')
            ->get();

        return $ranking;
    }

    public function createMatches($players_ids, $squad)
    {
        $number_of_players = count($players_ids);
        $players = User::whereIn('id', $players_ids)->get();

        if ($number_of_players === 4) {
            $this->createMatchesForFourPlayers($players, $squad);
        }

        return true;
    }

    private function createMatchesForFourPlayers($players, $squad)
    {
        $group = Group::create([
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $players[0]->tournaments()->attach($this->id);
        $players[0]->groups()->attach($group->id);

        $players[1]->tournaments()->attach($this->id);
        $players[1]->groups()->attach($group->id);

        $players[2]->tournaments()->attach($this->id);
        $players[2]->groups()->attach($group->id);

        $players[3]->tournaments()->attach($this->id);
        $players[3]->groups()->attach($group->id);

        $game_one = Game::create([
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
            'group_id' => $group->id,
        ]);
        $game_one->users()->attach($players->pluck('id'));

        $game_two = Game::create([
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
            'group_id' => $group->id,
        ]);
        $game_two->users()->attach([$players[0]->id, $players[2]->id, $players[1]->id, $players[3]->id]);

        $game_three = Game::create([
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
            'group_id' => $group->id,
        ]);
        $game_three->users()->attach([$players[1]->id, $players[2]->id, $players[0]->id, $players[3]->id]);
    }
}
