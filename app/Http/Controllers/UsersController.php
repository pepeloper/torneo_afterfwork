<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(Request $request, Squad $squad) {
        $squad->load('users');

        return Inertia::render('Users/Index', [
            'squad' => $squad,
        ]);
    }

    public function update(Request $request, Squad $squad)
    {
        if ($request->user()->squads->first()->pivot->role !== "admin") {
            return back();
        }

        $userToUpdate = User::find($request->user);
        $userToUpdate->squads()->updateExistingPivot($squad->id, [
            'role' => $request->role,
        ]);

        return back();
    }
}
