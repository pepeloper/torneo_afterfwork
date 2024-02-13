<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SquadsController;
use App\Http\Controllers\TournamentInvitationController;
use App\Http\Controllers\TournamentsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserSettingsControler;
use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use App\Notifications\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

if (app()->isLocal()) {
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
}

Route::get('/crear-torneo-{number}-jugadores', function ($number) {
    if (!collect([4, 8, 12])->contains($number)) {
        return redirect('/');
    }

    $court = ($number === 4) ? 1 : (($number === 8) ? 2 : 3);
    return redirect("/torneo-{$number}-jugadores-{$court}-pistas");
})->name('onboarding');

Route::get('/crear-torneo', function () {
    return redirect("/");
})->name('onboarding.create');

Route::get('/organizar-torneo', function () {
    return redirect("/");
})->name('onboarding.organize');

Route::get('/crear-torneo-{number}-jugadores/jugadores', function ($number, Request $request) {
    if (!collect([4, 8, 12])->contains($number)) {
        return redirect('/');
    }

    if ($number == 4 && ($request->query('courts') !== null && $request->query('courts') != 1)) {
        return redirect('/');
    }

    if ($number == 8 && !collect([1, 2])->contains($request->query('courts'))) {
        return redirect('/');
    }

    if ($number == 12 && !collect([1, 2, 3])->contains($request->query('courts'))) {
        return redirect('/');
    }

    $court = ($number === 4) ? 1 : (($number === 8) ? 2 : 3);
    return redirect("/torneo-{$number}-jugadores-{$court}-pistas");
})->name('onboarding.players');

Route::post('/crear-torneo-{number}-jugadores', [RegisterUserController::class, 'store'])->name('onboarding.store');

// Show list of squads for user. For now is not needed
// Route::get('/clubs', [SquadsController::class, 'index'])->name('clubs.index');

// Show list of tournaments for the given squad
Route::get('/clubs/{squad}', [SquadsController::class, 'show'])->middleware(['auth'])->name('squads.show');

// Show list of groups with games for a given tournament
Route::get('/clubs/{squad}/torneo/{tournament}/grupos', [GroupsController::class, 'index'])->name('groups.index');

// Temporary route to show leagues for a given tournament
Route::get('/clubs/{squad}/{tournament}/ligas', [GroupsController::class, 'show_leagues'])->name('tournament.league.show');

// Create a tournament form
Route::get('/torneo/crear', [TournamentsController::class, 'create'])->middleware(['auth'])->name('tournament.create');

// Show tournament details
Route::get('/torneo/{tournament}', [TournamentsController::class, 'show'])->name('tournament.show');

// Store a tournament
Route::post('/torneo', [TournamentsController::class, 'store'])->middleware(['auth'])->name('tournament.store');

// Update tournament players
Route::post('/torneo/{tournament}/jugadores', [TournamentsController::class, 'update'])->middleware(['auth'])->name('tournament.update');

// Create leagues for a tournament
Route::post('/clubs/{squad}/torneo/{tournament}', [GroupsController::class, 'store'])->middleware(['auth'])->name('league.create');

// List users in a squad
Route::get('/clubs/{squad}/usuarios', [UsersController::class, 'index'])->middleware(['auth'])->name('users.show');

// Update users permissions from squad
Route::put('/clubs/{squad}/users', [UsersController::class, 'update'])->middleware(['auth'])->name('users.update');

// Authenticated user settings
Route::get('/configuración', [UserSettingsControler::class, 'index'])->middleware(['auth'])->name('users.settings');

// General invite to a tournament
Route::get('/torneo/{tournament}/invitacion', [TournamentInvitationController::class, 'show'])->name('invitation.tournament.show');

Route::post('/torneo/{tournament}/invitacion', [TournamentInvitationController::class, 'store'])->name('invitation.tournament.store');

// Show invitation to register for a squad
Route::get('/clubs/{squad}/invitacion/{token}', [InvitationController::class, 'show'])->name('invitation.show');

// Process the invitation, creating user password
Route::post('/clubs/{squad}/invitacion/{token}', [InvitationController::class, 'store'])->name('invitation.store');

// Invite a usar to a squad
Route::post('/clubs/{squad}/invitar', [InvitationController::class, 'create'])->name('invitation.create');

Route::get('/', function () {
    // TODO: LANDING
    return Inertia::render('Welcome');
})->name('index');

Route::get('/torneo-{players}-jugadores-{courts}-pistas', function ($players, $courts) {
    if (!collect([4, 8, 12])->contains($players)) {
        return redirect('/');
    }

    if ($players == 4 && ($courts !== null && $courts != 1)) {
        return redirect('/');
    }

    if ($players == 8 && !collect([1, 2])->contains($courts)) {
        return redirect('/');
    }

    if ($players == 12 && !collect([1, 2, 3])->contains($courts)) {
        return redirect('/');
    }

    return Inertia::render('Onboarding/Tournament', [
        'players' => $players,
        'courts' => $courts,
    ]);
})->name('onboarding.tournament');

Route::get('/mis-torneos', function () {
    $user = auth()->user()->load(['tournaments', 'tournaments.users', 'tournaments.groups']);
    return Inertia::render('Tournament/List', [
        'tournaments' => $user->tournaments,
    ]);
})->name('tournaments.list');

// TODO: Add squad and tournament parameters
Route::put('/partido/{game}', [GameController::class, 'update'])->name('game.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
