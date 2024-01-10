<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SquadsController;
use App\Http\Controllers\TournamentsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserSettingsControler;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use App\Notifications\UserInvitation;
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

Route::get('/clubs/{squad}/users', [UsersController::class, 'index'])->middleware(['auth', 'squad.user'])->name('users.show');

Route::put('/clubs/{squad}/users', [UsersController::class, 'update'])->middleware(['auth', 'squad.user'])->name('users.update');

Route::get('/settings', [UserSettingsControler::class, 'index'])->middleware(['auth'])->name('users.settings');

Route::get('/clubs/{squad}/invitation/{token}', [InvitationController::class, 'show'])->name('invitation.show');

Route::post('/clubs/{squad}/invitation/{token}', [InvitationController::class, 'store'])->name('invitation.store');

Route::get('/', function () {
    // TODO: LANDING
    $league = Group::where('name', 'Liga 1º')->first();
    $group = Group::where('name', 'Grupo A')->first();

    return Inertia::render('Welcome', [
        'group' => $group,
        'league' => $league,
    ]);
})->name('index');

// TODO: Add squad and tournament parameters
Route::put('/game/{game}', [GameController::class, 'update'])->name('game.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
