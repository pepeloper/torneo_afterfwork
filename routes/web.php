<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Models\Game;
use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $group_a = Group::find(1)->load(['games', 'games.users']);
    $group_b = Group::find(2)->load(['games', 'games.users']);
    $group_c = Group::find(3)->load(['games', 'games.users']);

    return Inertia::render('Welcome', [
        'groupA' => $group_a,
        'groupB' => $group_b,
        'groupC' => $group_c,
    ]);
});

Route::put('/game/{game}', [GameController::class, 'update'])->name('game.update');

Route::get('/league/create', function() {
    $group_a = Group::find(1)->load(['games', 'games.users']);
    $group_b = Group::find(2)->load(['games', 'games.users']);
    $group_c = Group::find(3)->load(['games', 'games.users']);
    $users = User::all();

    return Inertia::render('League/Create', [
        'groupA' => $group_a,
        'groupB' => $group_b,
        'groupC' => $group_c,
        'users' => $users,
    ]);
});

Route::get('/ligas', function(Request $request) {
    $group_a = Group::find(4)->load(['games', 'games.users']);
    $group_b = Group::find(5)->load(['games', 'games.users']);
    $group_c = Group::find(6)->load(['games', 'games.users']);

    return Inertia::render('Welcome', [
        'groupA' => $group_a,
        'groupB' => $group_b,
        'groupC' => $group_c,
    ]);
})->name('leagues');

Route::post('league/create', function(Request $request) {
    // FIRST LEAGUE
    $league = Group::create([
        'name' => 'Liga 1º',
    ]);

    foreach ($request->first_league as $user_id) {
        $user = User::find($user_id);
        $user->groups()->attach($league);
    }

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->first_league[0], $request->first_league[1], $request->first_league[2], $request->first_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->first_league[0], $request->first_league[2], $request->first_league[1], $request->first_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->first_league[1], $request->first_league[2], $request->first_league[0], $request->first_league[3]]);

    // SECOND LEAGUE
    $league = Group::create([
        'name' => 'Liga 2º',
    ]);

    foreach ($request->second_league as $user_id) {
        $user = User::find($user_id);
        $user->groups()->attach($league);
    }

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->second_league[0], $request->second_league[1], $request->second_league[2], $request->second_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->second_league[0], $request->second_league[2], $request->second_league[1], $request->second_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->second_league[1], $request->second_league[2], $request->second_league[0], $request->second_league[3]]);

    // THIRD LEAGUE
    $league = Group::create([
        'name' => 'Liga 3º',
    ]);

    foreach ($request->third_league as $user_id) {
        $user = User::find($user_id);
        $user->groups()->attach($league);
    }

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->third_league[0], $request->third_league[1], $request->third_league[2], $request->third_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->third_league[0], $request->third_league[2], $request->third_league[1], $request->third_league[3]]);

    $game = Game::create([
        'group_id' => $league->id,
    ]);
    $game->users()->attach([$request->third_league[1], $request->third_league[2], $request->third_league[0], $request->third_league[3]]);

    return redirect('/ligas');
})->name('league.create.multiple');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
