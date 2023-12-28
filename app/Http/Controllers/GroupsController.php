<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    // Create a new league based on the groups
    public function store(Request $request, Squad $squad, Tournament $tournament)
    {
        $tournament->load(['groups' => function ($query) {
            $query->where('name', 'like', 'Grupo%');
        }]);

        $rankings = [];

        $first_league_data = [];
        $second_league_data = [];
        $third_league_data = [];

        foreach ($tournament->groups as $group) {
            $rankings[] = $group->ranking();
        }

        $first_league_data = [
            $rankings[0][0]->id,
            $rankings[0][1]->id,
            $rankings[1][0]->id,
            $rankings[1][1]->id,
        ];

        $second_league_data = [
            $rankings[0][2]->id,
            $rankings[1][2]->id,
            $rankings[2][0]->id,
            $rankings[2][1]->id,
        ];

        $third_league_data = [
            $rankings[0][3]->id,
            $rankings[1][3]->id,
            $rankings[2][2]->id,
            $rankings[2][3]->id,
        ];

        /* FIRST LEAGUE */
        $first_league = Group::create([
            'name' => 'Liga 1ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($first_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($first_league);
        }

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$first_league_data[0], $first_league_data[1], $first_league_data[2], $first_league_data[3]]);

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$first_league_data[0], $first_league_data[2], $first_league_data[1], $first_league_data[3]]);

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$first_league_data[1], $first_league_data[2], $first_league_data[0], $first_league_data[3]]);

        /* SECOND LEAGUE */
        $second_league = Group::create([
            'name' => 'Liga 2ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($second_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($second_league);
        }

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$second_league_data[0], $second_league_data[1], $second_league_data[2], $second_league_data[3]]);

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$second_league_data[0], $second_league_data[2], $second_league_data[1], $second_league_data[3]]);

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$second_league_data[1], $second_league_data[2], $second_league_data[0], $second_league_data[3]]);

        /* THIRD LEAGUE */
        $third_league = Group::create([
            'name' => 'Liga 3ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($third_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($third_league);
        }

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$third_league_data[0], $third_league_data[1], $third_league_data[2], $third_league_data[3]]);

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$third_league_data[0], $third_league_data[2], $third_league_data[1], $third_league_data[3]]);

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$third_league_data[1], $third_league_data[2], $third_league_data[0], $third_league_data[3]]);

        return redirect()->route('group.show', ['group' => $first_league]);
    }
}