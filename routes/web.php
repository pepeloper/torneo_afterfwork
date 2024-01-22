<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SquadsController;
use App\Http\Controllers\TournamentsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserSettingsControler;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use App\Notifications\UserInvitation;
use App\Services\RoundRobin;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

Route::get('/mailable', function () {
    $squad = Squad::first();
    $user = User::first();
    $invitation = Invitation::first();

    if (!$invitation) {
        $invitation = Invitation::create([
            'user_id' => $user->id,
            'used_at' => null,
            'token' => (string) Uuid::uuid4(),
        ]);
    }
    return (new UserInvitation($squad, $user, $invitation))->toMail($user);
});

Route::get('/crear-torneo-{number}-jugadores', function ($number) {
    if (!collect([4,8,12])->contains($number)) {
        return redirect('/');
    }

    return Inertia::render('Onboarding', [
        'players' => $number,
    ]);
})->name('onboarding');

Route::get('/crear-torneo-{number}-jugadores/jugadores', function ($number, Request $request) {
    if (!collect([4,8,12])->contains($number)) {
        return redirect('/');
    }

    return Inertia::render('Onboarding/Players', [
        'name' => $request->query('name'),
        'number_of_players' => $request->query('number_of_players'),
        'courts' => $request->query('courts'),
    ]);
})->name('onboarding.players');

Route::post('/crear-torneo-{number}-jugadores', [RegisterUserController::class, 'store'])->name('onboarding.store');

// Show list of squads for user. For now is not needed
// Route::get('/clubs', [SquadsController::class, 'index'])->name('clubs.index');

// Show list of tournaments for the given squad
Route::get('/clubs/{squad}', [SquadsController::class, 'show'])->middleware(['auth', 'squad.user'])->name('squads.show');

// Show list of groups with games for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/groups', [GroupsController::class, 'index'])->name('groups.index');

// Temporary route to show leagues for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/leagues', [GroupsController::class, 'show_leagues'])->name('tournament.league.show');

// Create a tournament form
Route::get('/clubs/{squad}/tournament/create', [TournamentsController::class, 'create'])->middleware(['auth', 'squad.user'])->name('tournament.create');

// Show tournament details
Route::get('/clubs/{squad}/tournament/{tournament}', [TournamentsController::class, 'show'])->name('tournament.show');

// Store a tournament
Route::post('/clubs/{squad}/tournament', [TournamentsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('tournament.store');

// Create leagues for a tournament
Route::post('/clubs/{squad}/tournament/{tournament}', [GroupsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('league.create');

// List users in a squad
Route::get('/clubs/{squad}/users', [UsersController::class, 'index'])->middleware(['auth', 'squad.user'])->name('users.show');

// Update users permissions from squad
Route::put('/clubs/{squad}/users', [UsersController::class, 'update'])->middleware(['auth', 'squad.user'])->name('users.update');

// Authenticated user settings
Route::get('/settings', [UserSettingsControler::class, 'index'])->middleware(['auth'])->name('users.settings');

// Show invitation to register for a squad
Route::get('/clubs/{squad}/invitation/{token}', [InvitationController::class, 'show'])->name('invitation.show');

// Process the invitation, creating user password
Route::post('/clubs/{squad}/invitation/{token}', [InvitationController::class, 'store'])->name('invitation.store');

// Invite a usar to a squad
Route::post('/clubs/{squad}/invite', [InvitationController::class, 'create'])->name('invitation.create');

Route::get('/', function () {
    // TODO: LANDING
    return Inertia::render('Welcome');
})->name('index');

// TODO: Add squad and tournament parameters
Route::put('/game/{game}', [GameController::class, 'update'])->name('game.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
