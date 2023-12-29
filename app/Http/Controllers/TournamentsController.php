<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TournamentsController extends Controller
{
    // TODO: Delete
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

        $has_leagues = Group::where('name', 'like', 'Liga%')->first() ? true : false;

        return Inertia::render('Tournament/Show', [
            'squad' => $squad,
            'tournament' => $tournament,
            'hasLeagues' => $has_leagues,
            'ranking' => $tournament->ranking(),
            'section' => 'groups',
        ]);
    }
}
