<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use App\Notifications\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class InvitationController extends Controller
{
    public function show(Request $request, Squad $squad, String $token)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        $invitation = Invitation::where('token', $token)->with('user')->firstOrFail();

        return Inertia::render('Invitation/Show', [
            'squad' => $squad,
            'invitation' => $invitation,
        ]);
    }

    public function store(Request $request, Squad $squad, String $token)
    {
        $user = User::find($request->user);
        $invitation = Invitation::where('token', $token)->with('user')->firstOrFail();

        if ($invitation->used_at) {
            return abort(Response::HTTP_FORBIDDEN);
        }

        if ($invitation->user->id !== $user->id) {
            return abort(Response::HTTP_NOT_FOUND);
        }

        $invitation->used_at = Carbon::now();
        $invitation->save();

        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        Auth::login($user);

        return redirect("/clubs/{$squad->id}");
    }

    public function create(Request $request, Squad $squad)
    {
        if ($request->input('user_id')) {
            $user = User::find($request->input('user_id'));
            $user->email = $request->input('email');
            $user->save();
        } else {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
            ]);
            $user->squads()->attach($squad, ['role' => 'member']);
        }

        $invitation = Invitation::create([
            'user_id' => $user->id,
            'used_at' => null,
            'token' => (string) Uuid::uuid4(),
        ]);

        $user->notify(new UserInvitation($squad, $user, $invitation));

        return back();
    }
}
