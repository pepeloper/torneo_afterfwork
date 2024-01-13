<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Game;
use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
            'email' => 'antonio@antonio.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/antonio.jpg',
            'last_year_position' => 4,
            'email_verified_at' => now(),
        ]);

        $pablo = \App\Models\User::create([
            'name' => 'Pablo Peña',
            'email' => 'pablo@pablo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/pablo.jpg',
            'last_year_position' => 3,
            'email_verified_at' => now(),
        ]);

        $javi = \App\Models\User::create([
            'name' => 'Javi',
            'email' => 'javi@javi.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/javi.jpg',
            'last_year_position' => 5,
            'email_verified_at' => now(),
        ]);

        $domingo = \App\Models\User::create([
            'name' => 'Domingo',
            'email' => 'domingo@domingo.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/domingo.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $sampe = \App\Models\User::create([
            'name' => 'Sampe',
            'email' => 'sampe@sampe.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/sampe.jpg',
            'last_year_position' => 2,
            'email_verified_at' => now(),
        ]);

        // Real Antonio es Pablo
        $nito = \App\Models\User::create([
            'name' => 'Pablo',
            'email' => 'pablo_2@pablo_2.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/avatar.webp',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $tolosa = \App\Models\User::create([
            'name' => 'Tolosa',
            'email' => 'tolosa@tolosa.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/tolosa.jpg',
            'last_year_position' => 7,
            'email_verified_at' => now(),
        ]);

        $bulio = \App\Models\User::create([
            'name' => 'Bulio',
            'email' => 'bulio@bulio.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/bulio.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $fer = \App\Models\User::create([
            'name' => 'Fernando',
            'email' => 'fernando@fernando.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/fer.jpg',
            'last_year_position' => 9,
            'email_verified_at' => now(),
        ]);

        $carlos = \App\Models\User::create([
            'name' => 'Carlos',
            'email' => 'carlos@carlos.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/carlos.jpg',
            'last_year_position' => 10,
            'email_verified_at' => now(),
        ]);

        $gon = \App\Models\User::create([
            'name' => 'Gon',
            'email' => 'gon@gon.es',
            'password' => Hash::make('password'),
            'photo' => '/storage/gon.jpg',
            'last_year_position' => null,
            'email_verified_at' => now(),
        ]);

        $juanjo = \App\Models\User::create([
            'name' => 'Juanjo',
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
            'mode' => 'league',
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
            'played' => true,
        ]);
        // $game->users()->attach([$pepe->id, $pablo->id, $javi->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$pepe->id, $javi->id, $pablo->id, $domingo->id]);

        $game = Game::create([
            'group_id' => $a->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$pablo->id, $javi->id, $pepe->id, $domingo->id]);

        // GRUPO B
        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$sampe->id, $nito->id, $tolosa->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$sampe->id, $tolosa->id, $nito->id, $bulio->id]);

        $game = Game::create([
            'group_id' => $b->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$nito->id, $tolosa->id, $sampe->id, $bulio->id]);

        // GRUPO C
        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$fer->id, $carlos->id, $gon->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$fer->id, $gon->id, $carlos->id, $juanjo->id]);

        $game = Game::create([
            'group_id' => $c->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);
        // $game->users()->attach([$carlos->id, $gon->id, $fer->id, $juanjo->id]);

        DB::insert("INSERT INTO `game_user` (`game_id`, `user_id`, `points_in_favor`, `points_against`, `created_at`, `updated_at`) VALUES (1, 1, 16, 7, NULL, NULL), (1, 2, 16, 7, NULL, NULL), (1, 3, 7, 16, NULL, NULL), (1, 4, 7, 16, NULL, NULL), (2, 1, 6, 16, NULL, NULL), (2, 3, 6, 16, NULL, NULL), (2, 2, 16, 6, NULL, NULL), (2, 4, 16, 6, NULL, NULL), (3, 2, 13, 16, NULL, NULL), (3, 3, 13, 16, NULL, NULL), (3, 1, 16, 13, NULL, NULL), (3, 4, 16, 13, NULL, NULL), (4, 5, 12, 16, NULL, NULL), (4, 6, 12, 16, NULL, NULL), (4, 7, 16, 12, NULL, NULL), (4, 8, 16, 12, NULL, NULL), (5, 5, 16, 12, NULL, NULL), (5, 7, 16, 12, NULL, NULL), (5, 6, 12, 16, NULL, NULL), (5, 8, 12, 16, NULL, NULL), (6, 6, 11, 16, NULL, NULL), (6, 7, 11, 16, NULL, NULL), (6, 5, 16, 11, NULL, NULL), (6, 8, 16, 11, NULL, NULL), (7, 9, 16, 12, NULL, NULL), (7, 10, 16, 12, NULL, NULL), (7, 11, 12, 16, NULL, NULL), (7, 12, 12, 16, NULL, NULL), (8, 9, 13, 16, NULL, NULL), (8, 11, 13, 16, NULL, NULL), (8, 10, 16, 13, NULL, NULL), (8, 12, 16, 13, NULL, NULL), (9, 10, 7, 16, NULL, NULL), (9, 11, 7, 16, NULL, NULL), (9, 9, 16, 7, NULL, NULL), (9, 12, 16, 7, NULL, NULL);");


        // Create leagues
        $tournament->load(['groups' => function ($query) {
            $query->where('name', 'like', 'Grupo%');
        }]);

        $rankings = [];

        $first_league_data = [];
        $second_league_data = [];
        $third_league_data = [];

        foreach ($tournament->groups as $group) {
            $rankings[] = $group->ranking();
        }

        $first_league_data = [
            $rankings[0][0]->id,
            $rankings[0][1]->id,
            $rankings[1][0]->id,
            $rankings[1][1]->id,
        ];

        $second_league_data = [
            $rankings[0][2]->id,
            $rankings[1][2]->id,
            $rankings[2][0]->id,
            $rankings[2][1]->id,
        ];

        $third_league_data = [
            $rankings[0][3]->id,
            $rankings[1][3]->id,
            $rankings[2][2]->id,
            $rankings[2][3]->id,
        ];

        /* FIRST LEAGUE */
        $first_league = Group::create([
            'name' => 'Liga 1ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($first_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($first_league);
        }

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $first_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        /* SECOND LEAGUE */
        $second_league = Group::create([
            'name' => 'Liga 2ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($second_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($second_league);
        }

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $second_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        /* THIRD LEAGUE */
        $third_league = Group::create([
            'name' => 'Liga 3ª',
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
        ]);

        foreach ($third_league_data as $user_id) {
            $user = User::find($user_id);
            $user->groups()->attach($third_league);
        }

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        $game = Game::create([
            'group_id' => $third_league->id,
            'squad_id' => $squad->id,
            'tournament_id' => $tournament->id,
            'played' => true,
        ]);

        DB::insert("INSERT INTO `game_user` (`game_id`, `user_id`, `points_in_favor`, `points_against`, `created_at`, `updated_at`) VALUES (10, 2, 12, 16, NULL, NULL), (10, 4, 12, 16, NULL, NULL), (10, 5, 16, 12, NULL, NULL), (10, 8, 16, 12, NULL, NULL), (11, 2, 7, 16, NULL, NULL), (11, 5, 7, 16, NULL, NULL), (11, 4, 16, 7, NULL, NULL), (11, 8, 16, 7, NULL, NULL), (12, 4, 8, 16, NULL, NULL), (12, 5, 8, 16, NULL, NULL), (12, 2, 16, 8, NULL, NULL), (12, 8, 16, 8, NULL, NULL), (13, 1, 13, 16, NULL, NULL), (13, 7, 13, 16, NULL, NULL), (13, 9, 16, 13, NULL, NULL), (13, 12, 16, 13, NULL, NULL), (14, 1, 16, 10, NULL, NULL), (14, 9, 16, 10, NULL, NULL), (14, 7, 10, 16, NULL, NULL), (14, 12, 10, 16, NULL, NULL), (15, 7, 10, 16, NULL, NULL), (15, 9, 10, 16, NULL, NULL), (15, 1, 16, 10, NULL, NULL), (15, 12, 16, 10, NULL, NULL), (16, 3, 16, 11, NULL, NULL), (16, 6, 16, 11, NULL, NULL), (16, 10, 11, 16, NULL, NULL), (16, 11, 11, 16, NULL, NULL), (17, 3, 16, 13, NULL, NULL), (17, 10, 16, 13, NULL, NULL), (17, 6, 13, 16, NULL, NULL), (17, 11, 13, 16, NULL, NULL), (18, 6, 7, 16, NULL, NULL), (18, 10, 7, 16, NULL, NULL), (18, 3, 16, 7, NULL, NULL), (18, 11, 16, 7, NULL, NULL);");
    }
}
