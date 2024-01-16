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
use App\Services\RoundRobin;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

Route::get('/test', function () {
    $teams = [1, 2, 3, 4, 5, 6, 7, 8];
    $rr = new RoundRobin($teams);
    $schedule = $rr->doubleRoundRobin()->make();
    dd($schedule);
    $players = [1, 2, 3, 4, 5, 6, 7, 8];

    $n = count($players);
    for ($r = 0; $r < $n - 1; $r++) {
        for ($i = 0; $i < $n / 2; $i++) {
            $rounds[$r][] = [$players[$i], $players[$n - 1 - $i]];
        }
        // Perform round-robin shift, keeping first player in its spot:
        $players[] = array_splice($players, 1, 1)[0];
    }
    // shift once more to put array in its original sequence:
    $players[] = array_splice($players, 1, 1)[0];
    $output = collect($rounds)->collapse()->chunk(2)->chunk(3);
    echo "<pre>" . json_encode($output, JSON_PRETTY_PRINT) . "</pre>";
    dd(collect($rounds)->collapse()->chunk(2)->chunk(2));
    echo "===========================================================================</br>";

    function generateRoundRobinDoubles(Collection $players, int $courts): Collection
    {
        if ($players->count() % 2 !== 0) {
            throw new Exception("Number of players must be even for doubles tournament");
        }

        $numPlayers = $players->count();
        $numRounds = $numPlayers - 1;
        $half = $numPlayers / 2;

        $schedule = collect();

        for ($round = 0; $round < $numRounds; $round++) {
            $roundMatches = collect();

            for ($i = 0; $i < $half; $i++) {
                $playerA = $players[$i];
                $playerB = $players[($i + $round) % ($numPlayers - 1)];
                $playerC = $players[($i + $round + 1) % ($numPlayers - 1)];
                $playerD = $players[$numPlayers - 1 - $i];

                // Avoid pairing a player with themselves
                if ($playerA === $playerB || $playerC === $playerD || $playerA === $playerC || $playerA === $playerD || $playerB === $playerC || $playerB === $playerD) {
                    continue;
                }

                $match = [[$playerA, $playerB], [$playerC, $playerD]];
                $roundMatches->push($match);
            }
            if ($roundMatches->isEmpty()) {
                continue;
            }

            $schedule->push($roundMatches);
        }

        // dd($schedule->collapse());
        $schedule->collapse()->filter(function ($match) {
            dd($match);
        });

        return $schedule->collapse()->chunk(2);
    }

    // Example usage:
    $players = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    $courts = 2;
    $schedule = generateRoundRobinDoubles($players, $courts);
    // dd($schedule);

    // Output the schedule
    $schedule->each(function ($round, $index) {
        echo "Round " . ($index + 1) . ":</br>";
        $round->each(function ($match) {
            echo "Match: (" . implode(' & ', $match[0]) . ") vs (" . implode(' & ', $match[1]) . ")</br>";
        });
        echo "</br>";
    });
});

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
