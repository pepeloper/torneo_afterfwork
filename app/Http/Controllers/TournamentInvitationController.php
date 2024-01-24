<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class TournamentInvitationController extends Controller
{
    public function show(Squad $squad, Tournament $tournament)
    {
        return Inertia::render('Tournament/Invitation', [
            'squad' => $squad,
            'tournament' => $tournament,
        ]);
    }

    public function store(Squad $squad, Tournament $tournament, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ], [
            'name.required' => "El nombre es obligatorio",
            'email.required' => 'El correo electrónico es obligatorio',
            'email.unique' => 'El correo electrónico ya está en uso',
            'password.required' => 'La contraseña es obligatoria',
        ]);

        $validated = $validator->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->squads()->attach($squad, ['role' => 'member']);
        $user->tournaments()->attach($tournament->id);

        return back()->with(['success' => true]);
    }
}
