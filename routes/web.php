<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SquadsController;
use App\Http\Controllers\TournamentsController;
use App\Models\Game;
use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;

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

// Show list of squads for user
// Route::get('/clubs', [SquadsController::class, 'index'])->name('clubs.index');

// Show list of tournaments for the given squad
Route::get('/clubs/{squad}', [SquadsController::class, 'show'])->middleware(['auth', 'squad.user'])->name('squads.show');

// Show tournament details
Route::get('/clubs/{squad}/tournament/{tournament}', [TournamentsController::class, 'show'])->middleware(['auth', 'squad.user'])->name('tournament.show');

// Show list of groups with games for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/groups', [GroupsController::class, 'index'])->middleware(['auth', 'squad.user'])->name('groups.index');

// Temporary route to show leagues for a given tournament
Route::get('/clubs/{squad}/tournament/{tournament}/leagues', [TournamentsController::class, 'show_leagues'])->middleware(['auth', 'squad.user'])->name('tournament.league.show');

// Create a tournament
Route::post('/clubs/{squad}/tournament', [TournamentsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('tournament.create');

// Create leagues for a tournament
Route::post('/clubs/{squad}/tournament/{tournament}', [GroupsController::class, 'store'])->middleware(['auth', 'squad.user'])->name('league.create');

Route::get('/torneo/crear', function() {
    return Inertia::render('Tournament/Create', [
        'users' => User::all(),
    ]);
});

Route::get('/', function () {
    $league = Group::where('name', 'Liga 1º')->first();
    $group = Group::where('name', 'Grupo A')->first();

    return Inertia::render('Welcome', [
        'group' => $group,
        'league' => $league,
    ]);
})->name('index');

Route::get('/groups/{group}', function (Request $request, Group $group) {
    $all_groups = collect([]);

    if (Str::of($group->name)->startsWith('Grupo')) {
        $section = 'groups';
        $groups = collect(['Grupo A', 'Grupo B', 'Grupo C']);
        // Puede que sea mejor devolver los tres grupos
        $groups->each(function ($item) use ($all_groups) {
            $all_groups->push(Group::where('name', $item)->with(['games', 'games.users'])->first());
        });
    } else {
        $section = 'leagues';
        $leagues = collect(['Liga 1º', 'Liga 2º', 'Liga 3º']);
        $leagues->each(function ($item) use ($all_groups) {
            $all_groups->push(Group::where('name', $item)->with(['games', 'games.users'])->first());
        });
    }

    $has_leagues = Group::where('name', 'Liga 1º')->first() ? true : false;

    return Inertia::render('Group/Show', [
        'activeGroup' => $group->load(['games', 'games.users']),
        'allGroups' => $all_groups,
        'section' => $section,
        'hasLeagues' => $has_leagues,
    ]);
})->name('group.show');

Route::put('/game/{game}', [GameController::class, 'update'])->name('game.update');

Route::post('league/create', function(Request $request) {
    // FIRST LEAGUE
    $first_league = Group::create([
        'name' => 'Liga 1º',
    ]);

    foreach ($request->first_league as $user_id) {
        $user = User::find($user_id);
        $user->groups()->attach($first_league);
    }

    $game = Game::create([
        'group_id' => $first_league->id,
    ]);
    $game->users()->attach([$request->first_league[0], $request->first_league[1], $request->first_league[2], $request->first_league[3]]);

    $game = Game::create([
        'group_id' => $first_league->id,
    ]);
    $game->users()->attach([$request->first_league[0], $request->first_league[2], $request->first_league[1], $request->first_league[3]]);

    $game = Game::create([
        'group_id' => $first_league->id,
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

    return redirect()->route('group.show', ['group' => $first_league]);
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
