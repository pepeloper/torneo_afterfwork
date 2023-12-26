<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Http\Request;

class TournamentsController extends Controller
{
    public function show(Request $request, Squad $squad, Tournament $tournament)
    {
        dd($tournament->load('groups')->toArray());
    }
}
