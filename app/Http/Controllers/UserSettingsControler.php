<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSettingsControler extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Users/Settings', [
            'user' => $user,
            'squad' => $user->squads()->first(),
        ]);
    }
}
