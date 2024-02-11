<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class TournamentInvitationController extends Controller
{
    public function show(Tournament $tournament)
    {
        return Inertia::render('Tournament/Invitation', [
            'tournament' => $tournament,
        ]);
    }

    public function store(Tournament $tournament, Request $request)
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

        $tournament->load(['users' => function ($query) {
            $query->where('name', 'like', 'Jugador%');
        }]);

        $user = $tournament->users->first();

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);
        $user->save();

        event(new Registered($user));

        Auth::login($user);

        return redirect("/mis-torneos");
    }
}
