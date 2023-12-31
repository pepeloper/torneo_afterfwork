<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Game;
use App\Models\Group;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $a = Group::create([
            'name' => 'Grupo A',
        ]);
        $b = Group::create([
            'name' => 'Grupo B',
        ]);
        $c = Group::create([
            'name' => 'Grupo C',
        ]);

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
        $pepe->groups()->attach($a);

        $pablo = \App\Models\User::create([
            'name' => 'Pablo Peña',
            'username' => 'pablopese',
            'email' => 'pablo@pablo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/pablo.jpg',
            'last_year_position' => 3,
            'email_verified_at' => now(),
        ]);
        $pablo->groups()->attach($a);

        $javi = \App\Models\User::create([
            'name' => 'Javi',
            'username' => 'javicidoncha',
            'email' => 'javi@javi.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/javi.jpg',
            'last_year_position' => 5,
            'email_verified_at' => now(),
        ]);
        $javi->groups()->attach($a);

        $domingo = \App\Models\User::create([
            'name' => 'Domingo',
            'username' => 'dogarcial',
            'email' => 'domingo@domingo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/domingo.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);
        $domingo->groups()->attach($a);

        $sampe = \App\Models\User::create([
            'name' => 'Sampe',
            'username' => 'rubensampe',
            'email' => 'sampe@sampe.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/sampe.jpg',
            'last_year_position' => 2,
            'email_verified_at' => now(),
        ]);
        $sampe->groups()->attach($b);

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
        $nito->groups()->attach($b);

        $tolosa = \App\Models\User::create([
            'name' => 'Tolosa',
            'username' => 'carlostolosa',
            'email' => 'tolosa@tolosa.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/tolosa.jpg',
            'last_year_position' => 7,
            'email_verified_at' => now(),
        ]);
        $tolosa->groups()->attach($b);

        $bulio = \App\Models\User::create([
            'name' => 'Bulio',
            'username' => 'bulio',
            'email' => 'bulio@bulio.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/bulio.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);
        $bulio->groups()->attach($b);

        $fer = \App\Models\User::create([
            'name' => 'Fernando',
            'username' => 'fereclu',
            'email' => 'fernando@fernando.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/fer.jpg',
            'last_year_position' => 9,
            'email_verified_at' => now(),
        ]);
        $fer->groups()->attach($c);

        $carlos = \App\Models\User::create([
            'name' => 'Carlos',
            'username' => 'carlosmiguelgij',
            'email' => 'carlos@carlos.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/carlos.jpg',
            'last_year_position' => 10,
            'email_verified_at' => now(),
        ]);
        $carlos->groups()->attach($c);

        $gon = \App\Models\User::create([
            'name' => 'Gon',
            'username' => 'gvilgue',
            'email' => 'gon@gon.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/gon.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);
        $gon->groups()->attach($c);

        $juanjo = \App\Models\User::create([
            'name' => 'Juanjo',
            'username' => 'juanjog',
            'email' => 'juanjo@juanjo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/juanjo.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);
        $juanjo->groups()->attach($c);

        // GRUPO A
        $game = Game::create([
            'group_id' => $a->id,
        ]);
        $game->users()->attach([$pepe->id, $pablo->id, $javi->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
        ]);
        $game->users()->attach([$pepe->id, $javi->id, $pablo->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
        ]);
        $game->users()->attach([$pablo->id, $javi->id, $pepe->id, $domingo->id]);

        // GRUPO B
        $game = Game::create([
            'group_id' => $b->id,
        ]);
        $game->users()->attach([$sampe->id, $nito->id, $tolosa->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
        ]);
        $game->users()->attach([$sampe->id, $tolosa->id, $nito->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
        ]);
        $game->users()->attach([$nito->id, $tolosa->id, $sampe->id, $bulio->id]);

        // GRUPO C
        $game = Game::create([
            'group_id' => $c->id,
        ]);
        $game->users()->attach([$fer->id, $carlos->id, $gon->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
        ]);
        $game->users()->attach([$fer->id, $gon->id, $carlos->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
        ]);
        $game->users()->attach([$carlos->id, $gon->id, $fer->id, $juanjo->id]);
    }
}
