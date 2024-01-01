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
            'group_id' => $squad->id,
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
                    $this->assertEquals([1,2,3,4], $game->users->pluck('id')->toArray());
                    break;
                case 1:
                    $this->assertEquals([1,3,2,4], $game->users->pluck('id')->toArray());
                    break;
                    case 2:
                        $this->assertEquals([2,3,1,4], $game->users->pluck('id')->toArray());
                    break;
            }
        });
    }
}
