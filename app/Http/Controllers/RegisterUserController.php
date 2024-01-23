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
use Illuminate\Validation\Rules;

class RegisterUserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'number_of_players' => 'required|numeric',
            'courts' => 'required|numeric',
            'players' => 'required|array',
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_player' => 'nullable',
        ], [
            'name.required' => "El nombre es obligatorio",
            'email.required'    => 'El correo electrónico es obligatorio',
            'email.unique' => 'El correo electrónico ya está en uso',
            'password.required'    => 'La contraseña es obligatoria',
            // TODO: Add more cases
        ]);
        $players = [];

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        $user = User::create([
            'name' => $validated['user_player'] ?? $validated['user_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $squad = Squad::create([
            'name' => 'Grupo de padel',
        ]);

        $user->squads()->attach($squad, ['role' => 'admin']);

        foreach ($validated['players'] as $key => $member) {
            if ($member === $validated['user_player'] || $member = $validated['user_name']) {
                $players[] = $user->id;
                continue;
            }

            $member = User::create([
                'email' => null,
                'name' => $member,
            ]);
            $players[] = $member->id;
            $member->squads()->attach($squad);
        }

        $tournament = Tournament::create([
            'name' => $validated['name'],
            'squad_id' => $squad->id,
            'user_id' => $user->id,
            'mode' => 'groups',
        ]);

        $tournament->createMatches($players, $squad, intval($validated['courts']));

        event(new Registered($user));

        Auth::login($user);

        return redirect("/clubs/{$squad->id}");
    }
}
