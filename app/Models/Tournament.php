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

    public function createMatches($players_ids, $squad, $mode = 'groups')
    {
        $number_of_players = count($players_ids);
        $players = User::whereIn('id', $players_ids)->get();

        if ($mode === 'groups') {
            if ($number_of_players === 4) {
                $this->createMatchesForFourPlayers($players, $squad);
            }

            if ($number_of_players === 8) {
                $this->createMatchesForEightPlayers($players, $squad);
            }
        } else {
            if ($number_of_players === 8) {
                $this->createMatchesForEightPlayersLeagueMode($players, $squad);
            }
        }


        return true;
    }

    private function createGamesForGroup($players, $indexes, $group)
    {
        foreach ($indexes as $game_indexes) {
            $game = Game::create([
                'squad_id' => $this->squad_id,
                'tournament_id' => $this->id,
                'group_id' => $group->id,
            ]);

            foreach ($game_indexes as $index) {
                $game->users()->attach($players[$index]);
            }
        }
    }

    private function createMatchesForFourPlayers($players, $squad)
    {
        $group = Group::create([
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $players->each(function ($player) use ($group) {
            $player->tournaments()->attach($this->id);
            $player->groups()->attach($group->id);
        });

        $player_indexes_for_games = [
            [0, 1, 2, 3],
            [0, 2, 1, 3],
            [1, 2, 0, 3],
        ];

        $this->createGamesForGroup($players, $player_indexes_for_games, $group);
    }

    private function createMatchesForEightPlayers($players, $squad)
    {
        $group = Group::create([
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $players->each(function ($player) use ($group) {
            $player->tournaments()->attach($this->id);
            $player->groups()->attach($group->id);
        });

        $player_indexes_for_games = [
            /* 1 */  [0, 1, 2, 3],
            /* 2 */  [4, 5, 6, 7],

            /* 3 */  [0, 2, 4, 6],
            /* 4 */  [1, 3, 5, 7],

            /* 5 */  [1, 2, 5, 6],
            /* 6 */  [0, 3, 4, 7],

            /* 7 */  [0, 4, 1, 5],
            /* 8 */  [2, 6, 3, 7],

            /* 9 */  [1, 4, 3, 6],
            /* 10 */ [0, 5, 2, 7],

            /* 11 */ [1, 7, 2, 4],
            /* 12 */ [0, 6, 3, 5],

            /* 13 */ [2, 5, 3, 4],
            /* 14 */ [0, 7, 1, 6],
        ];

        $this->createGamesForGroup($players, $player_indexes_for_games, $group);
    }

    private function createMatchesForEightPlayersLeagueMode($players, $squad)
    {
        $player_indexes_for_games = [
            [0, 1, 2, 3],
            [0, 2, 1, 3],
            [1, 2, 0, 3],
        ];

        // FIRST GROUP
        $group_a = Group::create([
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $group_a_players = collect([$players[0], $players[1], $players[2], $players[3]]);

        $group_a_players->each(function ($player) use ($group_a) {
            $player->tournaments()->attach($this->id);
            $player->groups()->attach($group_a->id);
        });

        $this->createGamesForGroup($group_a_players, $player_indexes_for_games, $group_a);

        // SECOND GROUP
        $group_b = Group::create([
            'name' => 'Grupo B',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $group_b_players = collect([$players[4], $players[5], $players[6], $players[7]]);

        $group_b_players->each(function ($player) use ($group_b) {
            $player->tournaments()->attach($this->id);
            $player->groups()->attach($group_b->id);
        });

        $this->createGamesForGroup($group_b_players, $player_indexes_for_games, $group_b);
    }
}
