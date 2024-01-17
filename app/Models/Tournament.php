<?php

namespace App\Models;

use App\Actions\GamesForEightPlayers;
use App\Actions\GamesForFourPlayers;
use App\Actions\GamesForTwelvePlayers;
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
                $this->createMatchesForFourPlayers($players);
            }

            if ($number_of_players === 8) {
                $this->createMatchesForEightPlayers($players, $courts);
            }

            if ($number_of_players === 12) {
                $this->createMatchesForTwelvePlayers($players, $courts);
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

    private function createMatchesForEightPlayers($players, $courts)
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

    private function createMatchesForTwelvePlayers($players, $courts)
    {
        $courts = GamesForTwelvePlayers::get($courts);
        $this->createGamesAndGroups($players, $courts);
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
