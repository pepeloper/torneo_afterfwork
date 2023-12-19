<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Game;
use App\Models\Group;
use Illuminate\Database\Seeder;

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

        $pepe = \App\Models\User::create([
            'name' => 'Pepe Garcia',
            'username' => 'pepegarciag',
            'email' => 'pgarciag93@gmail.com',
        ]);
        $pepe->groups()->attach($a);

        $pablo = \App\Models\User::create([
            'name' => 'Pablo Peña',
            'username' => 'pablopese',
            'email' => 'pablo@pablo.es',
        ]);
        $pablo->groups()->attach($a);

        $javi = \App\Models\User::create([
            'name' => 'Javi',
            'username' => 'javicidoncha',
            'email' => 'javi@javi.es',
        ]);
        $javi->groups()->attach($a);

        $domingo = \App\Models\User::create([
            'name' => 'Domingo',
            'username' => 'dogarcial',
            'email' => 'domingo@domingo.es',
        ]);
        $domingo->groups()->attach($a);

        $sampe = \App\Models\User::create([
            'name' => 'Sampe',
            'username' => 'rubensampe',
            'email' => 'sampe@sampe.es',
        ]);
        $sampe->groups()->attach($b);

        $nito = \App\Models\User::create([
            'name' => 'Antonio',
            'username' => 'antoniohs',
            'email' => 'antonio@antonio.es',
        ]);
        $nito->groups()->attach($b);

        $tolosa = \App\Models\User::create([
            'name' => 'Tolosa',
            'username' => 'carlostolosa',
            'email' => 'tolosa@tolosa.es',
        ]);
        $tolosa->groups()->attach($b);

        $bulio = \App\Models\User::create([
            'name' => 'Bulio',
            'username' => 'bulio',
            'email' => 'bulio@bulio.es',
        ]);
        $bulio->groups()->attach($b);

        $fer = \App\Models\User::create([
            'name' => 'Fernando',
            'username' => 'fereclu',
            'email' => 'fernando@fernando.es',
        ]);
        $fer->groups()->attach($c);

        $carlos = \App\Models\User::create([
            'name' => 'Carlos',
            'username' => 'carlosmiguelgij',
            'email' => 'carlos@carlos.es',
        ]);
        $carlos->groups()->attach($c);

        $gon = \App\Models\User::create([
            'name' => 'Gon',
            'username' => 'gvilgue',
            'email' => 'gon@gon.es',
        ]);
        $gon->groups()->attach($c);

        $juanjo = \App\Models\User::create([
            'name' => 'Juanjo',
            'username' => 'juanjog',
            'email' => 'juanjo@juanjo.es',
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
