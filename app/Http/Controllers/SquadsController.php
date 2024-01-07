<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SquadsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load('squads');
        return Inertia::render('Squads/Index', ['squads' => $user->squads]);
    }

    public function show(Request $request, Squad $squad)
    {
        $squad->load('tournaments');
        return Inertia::render('Squads/Show', ['squad' => $squad]);
    }
}
