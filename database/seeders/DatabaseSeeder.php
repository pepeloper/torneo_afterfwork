<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Game;
use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Antonio pasa a ser pepe
        $pepe = \App\Models\User::create([
            'name' => 'Antonio',
            'username' => 'antoniohs',
            'email' => 'antonio@antonio.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/antonio.jpg',
            'last_year_position' => 4,
            'email_verified_at' => now(),
        ]);

        $pablo = \App\Models\User::create([
            'name' => 'Pablo Peña',
            'username' => 'pablopese',
            'email' => 'pablo@pablo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/pablo.jpg',
            'last_year_position' => 3,
            'email_verified_at' => now(),
        ]);

        $javi = \App\Models\User::create([
            'name' => 'Javi',
            'username' => 'javicidoncha',
            'email' => 'javi@javi.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/javi.jpg',
            'last_year_position' => 5,
            'email_verified_at' => now(),
        ]);

        $domingo = \App\Models\User::create([
            'name' => 'Domingo',
            'username' => 'dogarcial',
            'email' => 'domingo@domingo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/domingo.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $sampe = \App\Models\User::create([
            'name' => 'Sampe',
            'username' => 'rubensampe',
            'email' => 'sampe@sampe.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/sampe.jpg',
            'last_year_position' => 2,
            'email_verified_at' => now(),
        ]);

        // Real Antonio es Pablo
        $nito = \App\Models\User::create([
            'name' => 'Pablo',
            'username' => 'pablo',
            'email' => 'pablo_2@pablo_2.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/avatar.webp',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $tolosa = \App\Models\User::create([
            'name' => 'Tolosa',
            'username' => 'carlostolosa',
            'email' => 'tolosa@tolosa.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/tolosa.jpg',
            'last_year_position' => 7,
            'email_verified_at' => now(),
        ]);

        $bulio = \App\Models\User::create([
            'name' => 'Bulio',
            'username' => 'bulio',
            'email' => 'bulio@bulio.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/bulio.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $fer = \App\Models\User::create([
            'name' => 'Fernando',
            'username' => 'fereclu',
            'email' => 'fernando@fernando.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/fer.jpg',
            'last_year_position' => 9,
            'email_verified_at' => now(),
        ]);

        $carlos = \App\Models\User::create([
            'name' => 'Carlos',
            'username' => 'carlosmiguelgij',
            'email' => 'carlos@carlos.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/carlos.jpg',
            'last_year_position' => 10,
            'email_verified_at' => now(),
        ]);

        $gon = \App\Models\User::create([
            'name' => 'Gon',
            'username' => 'gvilgue',
            'email' => 'gon@gon.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/gon.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $juanjo = \App\Models\User::create([
            'name' => 'Juanjo',
            'username' => 'juanjog',
            'email' => 'juanjo@juanjo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/juanjo.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $squad = Squad::create([
            'name' => 'Afterwork',
        ]);

        $tournament = Tournament::create([
            'name' => 'Navidad 2023',
            'squad_id' => $squad->id,
            'user_id' => $pepe->id,
        ]);

        $a = Group::create([
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $b = Group::create([
            'name' => 'Grupo B',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $c = Group::create([
            'name' => 'Grupo C',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        $pepe->groups()->attach($a);
        $pepe->squads()->attach($squad);
        $pepe->tournaments()->attach($tournament);

        $pablo->groups()->attach($a);
        $pablo->squads()->attach($squad);
        $pablo->tournaments()->attach($tournament);

        $javi->groups()->attach($a);
        $javi->squads()->attach($squad);
        $javi->tournaments()->attach($tournament);

        $domingo->groups()->attach($a);
        $domingo->squads()->attach($squad);
        $domingo->tournaments()->attach($tournament);

        $sampe->groups()->attach($b);
        $sampe->squads()->attach($squad);
        $sampe->tournaments()->attach($tournament);

        $nito->groups()->attach($b);
        $nito->squads()->attach($squad);
        $nito->tournaments()->attach($tournament);

        $tolosa->groups()->attach($b);
        $tolosa->squads()->attach($squad);
        $tolosa->tournaments()->attach($tournament);

        $bulio->groups()->attach($b);
        $bulio->squads()->attach($squad);
        $bulio->tournaments()->attach($tournament);

        $fer->groups()->attach($c);
        $fer->squads()->attach($squad);
        $fer->tournaments()->attach($tournament);

        $carlos->groups()->attach($c);
        $carlos->squads()->attach($squad);
        $carlos->tournaments()->attach($tournament);

        $gon->groups()->attach($c);
        $gon->squads()->attach($squad);
        $gon->tournaments()->attach($tournament);

        $juanjo->groups()->attach($c);
        $juanjo->squads()->attach($squad);
        $juanjo->tournaments()->attach($tournament);

        // GRUPO A
        $game = Game::create([
            'group_id' => $a->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$pepe->id, $pablo->id, $javi->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$pepe->id, $javi->id, $pablo->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$pablo->id, $javi->id, $pepe->id, $domingo->id]);

        // GRUPO B
        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$sampe->id, $nito->id, $tolosa->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$sampe->id, $tolosa->id, $nito->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$nito->id, $tolosa->id, $sampe->id, $bulio->id]);

        // GRUPO C
        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$fer->id, $carlos->id, $gon->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$fer->id, $gon->id, $carlos->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);
        $game->users()->attach([$carlos->id, $gon->id, $fer->id, $juanjo->id]);
    }
}
