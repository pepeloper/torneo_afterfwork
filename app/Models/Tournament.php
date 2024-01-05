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

            if ($number_of_players === 12) {
                $this->createMatchesForTwelvePlayers($players, $squad);
            }
        } else {
            if ($number_of_players === 8) {
                $this->createMatchesForEightPlayersLeagueMode($players, $squad);
            }

            if ($number_of_players === 12) {
                $this->createMatchesForTwelvePlayersLeagueMode($players, $squad);
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

    private function createMatchesForTwelvePlayers($players, $squad)
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
            /* 1 */  [4, 6, 8, 9],
            /* 2 */  [0, 11, 1, 7],
            /* 3 */  [2, 5, 3, 10],

            /* 4 */  [3, 11, 4, 10],
            /* 5 */  [5, 8, 2, 6],
            /* 6 */  [7, 9, 0 , 1],

            /* 7 */  [0, 8, 5, 9],
            /* 8 */  [1, 10, 3, 4],
            /* 9 */  [6, 11, 2, 7],

            /* 10 */  [2, 4, 6, 7],
            /* 11 */  [9, 11, 5, 10],
            /* 12 */  [0, 3, 1, 8],

            /* 13 */  [1, 11, 2, 8],
            /* 14 */  [3, 6, 0, 4],
            /* 15 */  [5, 7, 9, 10],

            /* 16 */  [6, 9, 3, 7],
            /* 17 */  [8, 10, 1, 2],
            /* 18 */  [4, 11, 0, 5],

            /* 19 */  [0, 2, 4, 5],
            /* 20 */  [7, 11, 3, 8],
            /* 21 */  [1, 9, 6, 10],

            /* 22 */  [10, 11, 0, 6],
            /* 23 */  [1, 4, 2, 9],
            /* 24 */  [3, 5, 7, 8],

            /* 25 */  [4, 7, 1, 5],
            /* 26 */  [6, 8, 0, 10],
            /* 27 */  [2, 11, 3, 9],

            /* 28 */  [0, 9, 2, 3],
            /* 29 */  [5, 11, 1, 6],
            /* 30 */  [7, 10, 4, 8],

            /* 31 */  [8, 11, 4, 9],
            /* 32 */  [2, 10, 0, 7],
            /* 33 */  [1, 3, 5, 6],
        ];

        $this->createGamesForGroup($players, $player_indexes_for_games, $group);
    }

    private function createMatchesForTwelvePlayersLeagueMode($players, $squad)
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

        // THIRD GROUP
        $group_c = Group::create([
            'name' => 'Grupo C',
            'squad_id' => $squad->id,
            'tournament_id' => $this->id,
        ]);

        $group_c_players = collect([$players[8], $players[9], $players[10], $players[11]]);

        $group_c_players->each(function ($player) use ($group_c) {
            $player->tournaments()->attach($this->id);
            $player->groups()->attach($group_c->id);
        });

        $this->createGamesForGroup($group_c_players, $player_indexes_for_games, $group_c);
    }
}
