<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TournamentInvitationController extends Controller
{
    public function show(Tournament $tournament)
    {
        if (auth()->check()) {
            $userTournaments = auth()->user()->tournaments;
            $alreadyInTournament = $userTournaments->first(function ($t) use ($tournament) {
                return $t->id === $tournament->id;
            });

            if ($alreadyInTournament) {
                return redirect("/torneo/{$tournament->id}");
            }

            $tournament->load(['users' => function ($query) {
                $query->where('name', 'like', 'Jugador%');
            }]);

            $tournamentUserId = $tournament->users->first()->id;
            $currentUserId = auth()->user()->id;
            DB::table('tournament_user')
                ->where('user_id', $tournamentUserId)
                ->where('tournament_id', $tournament->id)
                ->update(['user_id' => $currentUserId]);

            $tournament->groups->each(function ($group) use ($tournamentUserId, $currentUserId) {
                DB::table('group_user')
                ->where('user_id', $tournamentUserId)
                ->where('group_id', $group->id)
                ->update(['user_id' => $currentUserId]);
            });

            $tournament->games->each(function ($game) use ($tournamentUserId, $currentUserId) {
                DB::table('game_user')
                ->where('user_id', $tournamentUserId)
                ->where('game_id', $game->id)
                ->update(['user_id' => $currentUserId]);
            });

            return redirect("/torneo/{$tournament->id}");
        }

        return Inertia::render('Tournament/Invitation', [
            'tournament' => $tournament,
        ]);
    }

    public function store(Tournament $tournament, Request $request)
    {
        if ($request->input('action') == "register") {
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
        } else {
            if (!auth()->attempt($request->only('email', 'password'), true)) {
                throw ValidationException::withMessages([
                    'email' => "El correo electrónico o contraseña es incorrecto, inténtalo de nuevo",
                ]);
            }

            $request->session()->regenerate();

            $tournament->load(['users' => function ($query) {
                $query->where('name', 'like', 'Jugador%');
            }]);

            $tournamentUserId = $tournament->users->first()->id;
            $currentUserId = auth()->user()->id;
            DB::table('tournament_user')
                ->where('user_id', $tournamentUserId)
                ->where('tournament_id', $tournament->id)
                ->update(['user_id' => $currentUserId]);

            $tournament->groups->each(function ($group) use ($tournamentUserId, $currentUserId) {
                DB::table('group_user')
                ->where('user_id', $tournamentUserId)
                ->where('group_id', $group->id)
                ->update(['user_id' => $currentUserId]);
            });

            $tournament->games->each(function ($game) use ($tournamentUserId, $currentUserId) {
                DB::table('game_user')
                ->where('user_id', $tournamentUserId)
                ->where('game_id', $game->id)
                ->update(['user_id' => $currentUserId]);
            });
        }


        return redirect("/mis-torneos");
    }
}
