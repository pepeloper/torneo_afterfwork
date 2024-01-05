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
    public function show(Request $request, Squad $squad, Tournament $tournament)
    {
        $tournament->load([
            'groups' => function ($query) {
                $query->where('name', 'like', 'Grupo%');
            },
            'groups.games',
            'groups.games.users',
            'users' => function ($query) {
                $query->inRandomOrder();
            },
        ]);

        $has_leagues = Group::where('name', 'like', 'Liga%')->where('tournament_id', $tournament->id)->first() ? true : false;

        return Inertia::render('Tournament/Show', [
            'squad' => $squad,
            'tournament' => $tournament,
            'hasLeagues' => $has_leagues,
            'ranking' => $tournament->ranking(),
            'section' => 'groups',
        ]);
    }

    public function create(Request $request, Squad $squad)
    {
        return Inertia::render('Tournament/Create', [
            'squad' => $squad,
            'users' => $squad->users,
        ]);
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

        $tournament->createMatches($request->input('players'), $squad);

        return Redirect::route('squads.show', ['squad' => $squad]);
    }
}
