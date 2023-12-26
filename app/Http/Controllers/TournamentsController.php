<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TournamentsController extends Controller
{
    public function show(Request $request, Squad $squad, Tournament $tournament)
    {
        $tournament->load(['groups', 'groups.games', 'groups.games.users']);

        return Inertia::render('Tournament/Show', [
            'squad' => $squad,
            'tournament' => $tournament,
        ]);
    }
}
