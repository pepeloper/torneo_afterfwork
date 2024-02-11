<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TournamentsController extends Controller
{
    public function show(Request $request, Tournament $tournament)
    {
        $tournament->load([
            'groups' => function ($query) {
                $query->where('name', 'not like', 'Liga%');
            },
            'groups.games',
            'groups.games.users',
            'users',
        ]);

        $has_leagues = Group::where('name', 'like', 'Liga%')->where('tournament_id', $tournament->id)->first() ? true : false;

        // dd([
        //     'tournament' => $tournament,
        //     'hasLeagues' => $has_leagues,
        //     'ranking' => $tournament->ranking(),
        //     'section' => 'groups',
        // ]);

        return Inertia::render('Tournament/Show', [
            'tournament' => $tournament,
            'hasLeagues' => $has_leagues,
            'ranking' => $tournament->ranking(),
            'section' => 'groups',
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user()->load(['tournaments', 'tournaments.users']);

        $previous_players = $user->tournaments
            ->flatMap(function ($tournament) {
                return $tournament->users;
            })
            ->unique('name');

        return Inertia::render('Tournament/Create', [
            'previousPlayers' => $previous_players,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $tournament = Tournament::create([
            'user_id' => $user->id,
            'mode' => 'groups',
        ]);

        $players = [];
        $players[] = $user->id;

        for ($i=1; $i < $request->input('number_of_players'); $i++) {
            // Needs to start from player number 2. The first one is the onboarded user
            $position = $i +1;
            $member = User::create([
                'email' => null,
                'name' => "Jugador {$position}",
            ]);
            $players[] = $member->id;
        }

        $tournament->createMatches($players, intval($request->input('courts')));

        return Redirect::route('tournaments.list');
    }
}
