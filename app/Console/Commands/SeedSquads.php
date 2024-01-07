<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Group;
use App\Models\Squad;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedSquads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:seed-squads';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create squad and teams for existing users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $squad = Squad::create([
            'name' => 'Afterwork',
        ]);

        $tournament = Tournament::create([
            'name' => 'Navidad 2023',
            'squad_id' => $squad->id,
            'user_id' => User::first()->id,
        ]);

        Group::query()->update([
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        Game::query()->update([
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        User::all()->each(function ($user) use ($squad, $tournament) {
            DB::table('tournament_user')->insert([
                'tournament_id' => $tournament->id,
                'user_id' => $user->id,
            ]);
            DB::table('squad_user')->insert([
                'squad_id' => $squad->id,
                'user_id' => $user->id,
            ]);
        });
    }
}
