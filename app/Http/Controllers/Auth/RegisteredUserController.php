<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use App\Notifications\UserInvitation;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Ramsey\Uuid\Uuid;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'squad' => 'required',
            'members' => 'nullable|array',
        ], [
            'name.required' => "El nombre es obligatorio",
            'email.required'    => 'El correo electrónico es obligatorio',
            'email.unique' => 'El correo electrónico ya está en uso',
            'password.required'    => 'La contraseña es obligatoria',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $squad = Squad::create([
            'name' => $validated['squad'],
        ]);

        $user->squads()->attach($squad, ['role' => 'admin']);

        foreach ($validated['members'] as $key => $member) {
            $member = User::create([
                'email' => $member['email'],
                'name' => $member['name'],
            ]);
            $member->squads()->attach($squad);
            $invitation = Invitation::create([
                'user_id' => $member->id,
                'used_at' => null,
                'token' => (string) Uuid::uuid4(),
            ]);
            $member->notify(new UserInvitation($squad, $member, $invitation));
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect("/clubs/{$squad->id}");
    }
}
