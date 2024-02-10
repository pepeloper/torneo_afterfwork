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
            'users' => function ($query) {
                $query->inRandomOrder();
            },
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
        return Inertia::render('Tournament/Create');
    }

    public function store(Request $request, Squad $squad, Tournament $tournament)
    {
        $user = $request->user();

        $tournament = Tournament::create([
            'name' => $request->input('name'),
            'squad_id' => $squad->id,
            'user_id' => $user->id,
            'mode' => $request->input('mode') ?? 'groups',
        ]);

        $tournament->createMatches($request->input('players'), $squad, intval($request->input('courts')));

        return Redirect::route('squads.show', ['squad' => $squad]);
    }
}
