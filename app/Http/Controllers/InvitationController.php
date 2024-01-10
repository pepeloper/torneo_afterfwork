<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
}
