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
            'number_of_players' => 'required|numeric',
            'courts' => 'required|numeric',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
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
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $players[] = $user->id;

        for ($i=1; $i < $validated['number_of_players']; $i++) {
            // Needs to start from player number 2. The first one is the onboarded user
            $position = $i +1;
            $member = User::create([
                'email' => null,
                'name' => "Jugador {$position}",
            ]);
            $players[] = $member->id;
        }

        $tournament = Tournament::create([
            'user_id' => $user->id,
            'mode' => 'groups',
        ]);

        $tournament->createMatches($players, intval($validated['courts']));

        event(new Registered($user));

        Auth::login($user);

        return redirect("/mis-torneos");
    }
}
