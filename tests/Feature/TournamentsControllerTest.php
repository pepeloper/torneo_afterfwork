<?php

namespace Tests\Feature;

use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TournamentsControllerTest extends TestCase
{

    use RefreshDatabase;

    public function test_create_tournament_with_four_players(): void
    {
        $squad = Squad::factory()->create();

        $user_one = User::factory()->create();
        $user_one->squads()->attach($squad);

        $user_two = User::factory()->create();
        $user_two->squads()->attach($squad);

        $user_three = User::factory()->create();
        $user_three->squads()->attach($squad);

        $user_four = User::factory()->create();
        $user_four->squads()->attach($squad);

        $this->actingAs($user_one);
        $response = $this->post("/clubs/{$squad->id}/tournament", [
            'name' => 'Mi primer torneo',
            'points' => 16,
            'players' => [$user_one->id, $user_two->id, $user_three->id, $user_four->id],
            'mode' => 'groups',
        ]);

        $response->assertStatus(302);

        // TOURNAMENT CHECK
        $this->assertDatabaseHas('tournaments', [
            'name' => 'Mi primer torneo',
            'squad_id' => $squad->id,
            'user_id' => $user_one->id,
        ]);

        $this->assertDatabaseCount('tournament_user', 4);
        $this->assertDatabaseHas('tournament_user', [
            'tournament_id' => 1,
            'user_id' => $user_one->id,
        ]);
        $this->assertDatabaseHas('tournament_user', [
            'tournament_id' => 1,
            'user_id' => $user_two->id,
        ]);
        $this->assertDatabaseHas('tournament_user', [
            'tournament_id' => 1,
            'user_id' => $user_three->id,
        ]);
        $this->assertDatabaseHas('tournament_user', [
            'tournament_id' => 1,
            'user_id' => $user_four->id,
        ]);

        // GROUP CHECK
        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseCount('group_user', 4);
        $this->assertDatabaseHas('group_user', [
            'group_id' => 1,
            'user_id' => $user_one->id,
        ]);
        $this->assertDatabaseHas('group_user', [
            'group_id' => 1,
            'user_id' => $user_two->id,
        ]);
        $this->assertDatabaseHas('group_user', [
            'group_id' => 1,
            'user_id' => $user_three->id,
        ]);
        $this->assertDatabaseHas('group_user', [
            'group_id' => 1,
            'user_id' => $user_four->id,
        ]);

        // GAMES CHECK
        // GAMES ONE
        $this->assertDatabaseHas('games', [
            'id' => 1,
            'squad_id' => $squad->id,
            'tournament_id' => 1,
            'group_id' => 1,
            'played' => false,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 1,
            'user_id' => $user_one->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 1,
            'user_id' => $user_two->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 1,
            'user_id' => $user_three->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 1,
            'user_id' => $user_four->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);

        // GAME TWO
        $this->assertDatabaseHas('games', [
            'id' => 2,
            'squad_id' => $squad->id,
            'tournament_id' => 1,
            'group_id' => 1,
            'played' => false,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 2,
            'user_id' => $user_one->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 2,
            'user_id' => $user_two->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 2,
            'user_id' => $user_three->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 2,
            'user_id' => $user_four->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);

        // GAME THREE
        $this->assertDatabaseHas('games', [
            'id' => 3,
            'squad_id' => $squad->id,
            'tournament_id' => 1,
            'group_id' => 1,
            'played' => false,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 3,
            'user_id' => $user_one->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 3,
            'user_id' => $user_two->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 3,
            'user_id' => $user_three->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);
        $this->assertDatabaseHas('game_user', [
            'game_id' => 3,
            'user_id' => $user_four->id,
            'points_in_favor' => null,
            'points_against' => null,
        ]);

        $tournament = Tournament::first();
        $tournament->groups->first()->games->each(function ($game, $index) {
            switch ($index) {
                case 0:
                    $this->assertEquals([1, 2, 3, 4], $game->users->pluck('id')->toArray());
                    break;
                case 1:
                    $this->assertEquals([1, 3, 2, 4], $game->users->pluck('id')->toArray());
                    break;
                case 2:
                    $this->assertEquals([2, 3, 1, 4], $game->users->pluck('id')->toArray());
                    break;
            }
        });
    }

    public function test_create_tournament_with_eight_players(): void
    {
        $squad = Squad::factory()->create();

        $user_one = User::factory()->create();
        $user_one->squads()->attach($squad);

        $user_two = User::factory()->create();
        $user_two->squads()->attach($squad);

        $user_three = User::factory()->create();
        $user_three->squads()->attach($squad);

        $user_four = User::factory()->create();
        $user_four->squads()->attach($squad);

        $user_five = User::factory()->create();
        $user_five->squads()->attach($squad);

        $user_six = User::factory()->create();
        $user_six->squads()->attach($squad);

        $user_seven = User::factory()->create();
        $user_seven->squads()->attach($squad);

        $user_eight = User::factory()->create();
        $user_eight->squads()->attach($squad);

        $players = [
            $user_one->id,
            $user_two->id,
            $user_three->id,
            $user_four->id,
            $user_five->id,
            $user_six->id,
            $user_seven->id,
            $user_eight->id,
        ];

        $this->actingAs($user_one);
        $response = $this->post("/clubs/{$squad->id}/tournament", [
            'name' => 'Mi segundo torneo',
            'points' => 16,
            'players' => $players,
            'mode' => 'groups',
        ]);

        $response->assertStatus(302);

        // TOURNAMENT CHECK
        $this->assertDatabaseHas('tournaments', [
            'name' => 'Mi segundo torneo',
            'squad_id' => $squad->id,
            'user_id' => $user_one->id,
        ]);

        $this->assertDatabaseCount('tournament_user', 8);

        foreach ($players as $player) {
            $this->assertDatabaseHas('tournament_user', [
                'tournament_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GROUP CHECK
        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseCount('group_user', 8);
        foreach ($players as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GAMES CHECK
        $player_indexes_for_games = [
            /* 1 */  [0, 1, 2, 3],
            /* 2 */  [4, 5, 6, 7],

            /* 3 */  [0, 2, 4, 6],
            /* 4 */  [1, 3, 5, 7],

            /* 5 */  [1, 2, 5, 6],
            /* 6 */  [0, 3, 4, 7],

            /* 7 */  [0, 4, 1, 5],
            /* 8 */  [2, 6, 3, 7],

            /* 9 */  [1, 4, 3, 6],
            /* 10 */ [0, 5, 2, 7],

            /* 11 */ [1, 7, 2, 4],
            /* 12 */ [0, 6, 3, 5],

            /* 13 */ [2, 5, 3, 4],
            /* 14 */ [0, 7, 1, 6],
        ];

        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                'id' => $key + 1,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 1,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    'game_id' => $key + 1,
                    'user_id' => $players[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }
    }

    public function test_create_tournament_with_eight_players_league_mode(): void
    {
        $squad = Squad::factory()->create();

        $user_one = User::factory()->create();
        $user_one->squads()->attach($squad);

        $user_two = User::factory()->create();
        $user_two->squads()->attach($squad);

        $user_three = User::factory()->create();
        $user_three->squads()->attach($squad);

        $user_four = User::factory()->create();
        $user_four->squads()->attach($squad);

        $user_five = User::factory()->create();
        $user_five->squads()->attach($squad);

        $user_six = User::factory()->create();
        $user_six->squads()->attach($squad);

        $user_seven = User::factory()->create();
        $user_seven->squads()->attach($squad);

        $user_eight = User::factory()->create();
        $user_eight->squads()->attach($squad);

        $players = [
            $user_one->id,
            $user_two->id,
            $user_three->id,
            $user_four->id,
            $user_five->id,
            $user_six->id,
            $user_seven->id,
            $user_eight->id,
        ];

        $this->actingAs($user_one);
        $response = $this->post("/clubs/{$squad->id}/tournament", [
            'name' => 'Mi tercer torneo',
            'points' => 16,
            'players' => $players,
            'mode' => 'league',
        ]);

        $response->assertStatus(302);

        // TOURNAMENT CHECK
        $this->assertDatabaseHas('tournaments', [
            'name' => 'Mi tercer torneo',
            'squad_id' => $squad->id,
            'user_id' => $user_one->id,
        ]);

        $this->assertDatabaseCount('tournament_user', 8);

        foreach ($players as $player) {
            $this->assertDatabaseHas('tournament_user', [
                'tournament_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GROUP CHECK
        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo B',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseCount('group_user', 8);

        foreach (array_slice($players, 0, 4) as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 1,
                'user_id' => $player,
            ]);
        }

        foreach (array_slice($players, 4, 4) as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 2,
                'user_id' => $player,
            ]);
        }

        // GAMES CHECK
        $player_indexes_for_games = [
            [0, 1, 2, 3],
            [0, 2, 1, 3],
            [1, 2, 0, 3],
        ];

        // FIRST GROUP
        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                'id' => $key + 1,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 1,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    'game_id' => $key + 1,
                    'user_id' => $players[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }

        // SECOND GROUP
        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                // STARTS FROM 3, 3 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                'id' => $key + 1 + 3,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 2,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    // STARTS FROM 3, 3 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                    'game_id' => $key + 1 + 3,
                    // NEED TO SLICE DE PLAYERS ARRAY TO CHECK ONLY THE LAST 4 PLAYERS
                    'user_id' => array_slice($players, 4, 4)[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }
    }

    public function test_create_tournament_with_twelve_players(): void
    {
        $squad = Squad::factory()->create();

        $user_one = User::factory()->create();
        $user_one->squads()->attach($squad);

        $user_two = User::factory()->create();
        $user_two->squads()->attach($squad);

        $user_three = User::factory()->create();
        $user_three->squads()->attach($squad);

        $user_four = User::factory()->create();
        $user_four->squads()->attach($squad);

        $user_five = User::factory()->create();
        $user_five->squads()->attach($squad);

        $user_six = User::factory()->create();
        $user_six->squads()->attach($squad);

        $user_seven = User::factory()->create();
        $user_seven->squads()->attach($squad);

        $user_eight = User::factory()->create();
        $user_eight->squads()->attach($squad);

        $user_nine = User::factory()->create();
        $user_nine->squads()->attach($squad);

        $user_ten = User::factory()->create();
        $user_ten->squads()->attach($squad);

        $user_eleven = User::factory()->create();
        $user_eleven->squads()->attach($squad);

        $user_twelve = User::factory()->create();
        $user_twelve->squads()->attach($squad);


        $players = [
            $user_one->id,
            $user_two->id,
            $user_three->id,
            $user_four->id,
            $user_five->id,
            $user_six->id,
            $user_seven->id,
            $user_eight->id,
            $user_nine->id,
            $user_ten->id,
            $user_eleven->id,
            $user_twelve->id,
        ];

        $this->actingAs($user_one);
        $response = $this->post("/clubs/{$squad->id}/tournament", [
            'name' => 'Mi segundo torneo',
            'points' => 16,
            'players' => $players,
            'mode' => 'groups',
        ]);

        $response->assertStatus(302);

        // TOURNAMENT CHECK
        $this->assertDatabaseHas('tournaments', [
            'name' => 'Mi segundo torneo',
            'squad_id' => $squad->id,
            'user_id' => $user_one->id,
        ]);

        $this->assertDatabaseCount('tournament_user', 12);

        foreach ($players as $player) {
            $this->assertDatabaseHas('tournament_user', [
                'tournament_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GROUP CHECK
        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseCount('group_user', 12);

        foreach ($players as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GAMES CHECK
        $player_indexes_for_games = [
            /* 1 */  [4, 6, 8, 9],
            /* 2 */  [0, 11, 1, 7],
            /* 3 */  [2, 5, 3, 10],

            /* 4 */  [3, 11, 4, 10],
            /* 5 */  [5, 8, 2, 6],
            /* 6 */  [7, 9, 0 , 1],

            /* 7 */  [0, 8, 5, 9],
            /* 8 */  [1, 10, 3, 4],
            /* 9 */  [6, 11, 2, 7],

            /* 10 */  [2, 4, 6, 7],
            /* 11 */  [9, 11, 5, 10],
            /* 12 */  [0, 3, 1, 8],

            /* 13 */  [1, 11, 2, 8],
            /* 14 */  [3, 6, 0, 4],
            /* 15 */  [5, 7, 9, 10],

            /* 16 */  [6, 9, 3, 7],
            /* 17 */  [8, 10, 1, 2],
            /* 18 */  [4, 11, 0, 5],

            /* 19 */  [0, 2, 4, 5],
            /* 20 */  [7, 11, 3, 8],
            /* 21 */  [1, 9, 6, 10],

            /* 22 */  [10, 11, 0, 6],
            /* 23 */  [1, 4, 2, 9],
            /* 24 */  [3, 5, 7, 8],

            /* 25 */  [4, 7, 1, 5],
            /* 26 */  [6, 8, 0, 10],
            /* 27 */  [2, 11, 3, 9],

            /* 28 */  [0, 9, 2, 3],
            /* 29 */  [5, 11, 1, 6],
            /* 30 */  [7, 10, 4, 8],

            /* 31 */  [8, 11, 4, 9],
            /* 32 */  [2, 10, 0, 7],
            /* 33 */  [1, 3, 5, 6],
        ];

        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                'id' => $key + 1,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 1,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    'game_id' => $key + 1,
                    'user_id' => $players[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }
    }

    public function test_create_tournament_with_twelve_players_league_mode(): void
    {
        $squad = Squad::factory()->create();

        $user_one = User::factory()->create();
        $user_one->squads()->attach($squad);

        $user_two = User::factory()->create();
        $user_two->squads()->attach($squad);

        $user_three = User::factory()->create();
        $user_three->squads()->attach($squad);

        $user_four = User::factory()->create();
        $user_four->squads()->attach($squad);

        $user_five = User::factory()->create();
        $user_five->squads()->attach($squad);

        $user_six = User::factory()->create();
        $user_six->squads()->attach($squad);

        $user_seven = User::factory()->create();
        $user_seven->squads()->attach($squad);

        $user_eight = User::factory()->create();
        $user_eight->squads()->attach($squad);

        $user_nine = User::factory()->create();
        $user_nine->squads()->attach($squad);

        $user_ten = User::factory()->create();
        $user_ten->squads()->attach($squad);

        $user_eleven = User::factory()->create();
        $user_eleven->squads()->attach($squad);

        $user_twelve = User::factory()->create();
        $user_twelve->squads()->attach($squad);

        $players = [
            $user_one->id,
            $user_two->id,
            $user_three->id,
            $user_four->id,
            $user_five->id,
            $user_six->id,
            $user_seven->id,
            $user_eight->id,
            $user_nine->id,
            $user_ten->id,
            $user_eleven->id,
            $user_twelve->id,
        ];

        $this->actingAs($user_one);
        $response = $this->post("/clubs/{$squad->id}/tournament", [
            'name' => 'Mi tercer torneo',
            'points' => 16,
            'players' => $players,
            'mode' => 'league',
        ]);

        $response->assertStatus(302);

        // TOURNAMENT CHECK
        $this->assertDatabaseHas('tournaments', [
            'name' => 'Mi tercer torneo',
            'squad_id' => $squad->id,
            'user_id' => $user_one->id,
        ]);

        $this->assertDatabaseCount('tournament_user', 12);

        foreach ($players as $player) {
            $this->assertDatabaseHas('tournament_user', [
                'tournament_id' => 1,
                'user_id' => $player,
            ]);
        }

        // GROUP CHECK
        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo A',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo B',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseHas('groups', [
            'name' => 'Grupo C',
            'squad_id' => $squad->id,
            'tournament_id' => 1,
        ]);

        $this->assertDatabaseCount('group_user', 12);

        foreach (array_slice($players, 0, 4) as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 1,
                'user_id' => $player,
            ]);
        }

        foreach (array_slice($players, 4, 4) as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 2,
                'user_id' => $player,
            ]);
        }

        foreach (array_slice($players, 8, 4) as $player) {
            $this->assertDatabaseHas('group_user', [
                'group_id' => 3,
                'user_id' => $player,
            ]);
        }

        // GAMES CHECK
        $player_indexes_for_games = [
            [0, 1, 2, 3],
            [0, 2, 1, 3],
            [1, 2, 0, 3],
        ];

        // FIRST GROUP
        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                'id' => $key + 1,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 1,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    'game_id' => $key + 1,
                    'user_id' => $players[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }

        // SECOND GROUP
        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                // STARTS FROM 3, 3 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                'id' => $key + 1 + 3,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 2,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    // STARTS FROM 3, 3 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                    'game_id' => $key + 1 + 3,
                    // NEED TO SLICE DE PLAYERS ARRAY TO CHECK ONLY THE LAST 4 PLAYERS
                    'user_id' => array_slice($players, 4, 4)[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }

        // THIRD GROUP
        foreach ($player_indexes_for_games as $key => $game_indexes) {
            $this->assertDatabaseHas('games', [
                // STARTS FROM 6, 6 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                'id' => $key + 1 + 6,
                'squad_id' => $squad->id,
                'tournament_id' => 1,
                'group_id' => 3,
                'played' => false,
            ]);

            foreach ($game_indexes as $index) {
                $this->assertDatabaseHas('game_user', [
                    // STARTS FROM 6, 6 GAMES ARE ALREADY CREATED FOR FIRST GROUP
                    'game_id' => $key + 1 + 6,
                    // NEED TO SLICE DE PLAYERS ARRAY TO CHECK ONLY THE LAST 4 PLAYERS
                    'user_id' => array_slice($players, 8, 4)[$index],
                    'points_in_favor' => null,
                    'points_against' => null,
                ]);
            }
        }
    }
}
