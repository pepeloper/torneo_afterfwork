<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SquadsController;
use App\Http\Controllers\TournamentsController;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Show list of squads for user. For now is not needed
// Route::get('/clubs', [SquadsController::class, 'index'])->name('clubs.index');

// Show list of tournaments for the given squad
Route::get('/clubs/{squad}', [SquadsController::class, 'show'])->middleware(['auth', 'squad.user'])->name('squads.show');

// Show list of groups with games for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/groups', [GroupsController::class, 'index'])->middleware(['auth', 'squad.user'])->name('groups.index');

// Temporary route to show leagues for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/leagues', [GroupsController::class, 'show_leagues'])->middleware(['auth', 'squad.user'])->name('tournament.league.show');

// Create a tournament form
Route::get('/clubs/{squad}/tournament/create', [TournamentsController::class, 'create'])->middleware(['auth', 'squad.user'])->name('tournament.create');

// Show tournament details
Route::get('/clubs/{squad}/tournament/{tournament}', [TournamentsController::class, 'show'])->middleware(['auth', 'squad.user'])->name('tournament.show');

// Store a tournament
Route::post('/clubs/{squad}/tournament', [TournamentsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('tournament.store');

// Create leagues for a tournament
Route::post('/clubs/{squad}/tournament/{tournament}', [GroupsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('league.create');

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
