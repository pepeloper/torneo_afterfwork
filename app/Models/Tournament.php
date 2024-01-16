<?php

namespace App\Models;

use App\Actions\GamesForEightPlayers;
use App\Actions\GamesForFourPlayers;
use Illuminate\Database\Eloquent\Collection;
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

    public function createMatches($players_ids, $squad, $courts)
    {
        $number_of_players = count($players_ids);
        $players = User::whereIn('id', $players_ids)->get();

        if ($this->mode === 'groups') {
            if ($number_of_players === 4) {
                $this->createMatchesForFourPlayers($players, $squad);
            }

            if ($number_of_players === 8) {
                $this->createMatchesForEightPlayers($players, $squad, $courts);
            }

            if ($number_of_players === 12) {
                $this->createMatchesForTwelvePlayers($players, $squad, $courts);
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

    private function createGamesAndGroups(Collection $players, $courts)
    {
        $players->each(function ($player) {
            $player->tournaments()->attach($this->id);
        });

        foreach ($courts as $key => $court) {
            $court_number = $key + 1;
            $group = Group::create([
                'name' => "Pista {$court_number}",
                'squad_id' => $this->squad_id,
                'tournament_id' => $this->id,
            ]);

            $players->each(function ($player) use ($group) {
                $player->groups()->attach($group->id);
            });

            foreach ($court as $game) {
                $match = Game::create([
                    'squad_id' => $this->squad_id,
                    'tournament_id' => $this->id,
                    'group_id' => $group->id,
                ]);

                foreach ($game as $index) {
                    $match->users()->attach($players[$index]);
                }
            }
        }
    }

    private function createMatchesForFourPlayers($players)
    {
        $courts = GamesForFourPlayers::get();
        $this->createGamesAndGroups($players, $courts);
    }

    private function createMatchesForEightPlayers($players, $squad, $courts)
    {
        $courts = GamesForEightPlayers::get($courts);
        $this->createGamesAndGroups($players, $courts);
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
            'name' => 'Pista 1',
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
            'name' => 'Pista 2',
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

    private function createMatchesForTwelvePlayers($players, $squad, $courts)
    {
        $courtsArray = range(1, $courts);
        $courts_groups = [];
        foreach ($courtsArray as $key => $value) {
            $courts_groups[] = Group::create([
                'name' => "Pista {$value}",
                'squad_id' => $squad->id,
                'tournament_id' => $this->id,
            ]);
        }

        // $group = Group::create([
        //     'name' => 'Grupo A',
        //     'squad_id' => $squad->id,
        //     'tournament_id' => $this->id,
        // ]);

        $players->each(function ($player) use ($courts_groups) {
            $player->tournaments()->attach($this->id);
            foreach ($courts_groups as $group) {
                $player->groups()->attach($group->id);
            }
        });

        $player_indexes_for_games = [
            /* 1 */  [4, 6, 8, 9],
            /* 2 */  [0, 11, 1, 7],
            /* 3 */  [2, 5, 3, 10],

            /* 4 */  [3, 11, 4, 10],
            /* 5 */  [5, 8, 2, 6],
            /* 6 */  [7, 9, 0, 1],

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

        $courts_games = array_fill(0, $courts, []);
        foreach ($player_indexes_for_games as $key => $value) {
            $court_index = $key % $courts;
            $courts_games[$court_index][] = $value;
        }

        foreach ($courts_games as $key => $games) {
            $this->createGamesForGroup($players, $games, $courts_groups[$key]);
        }
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
