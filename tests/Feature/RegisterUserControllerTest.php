<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterUserControllerTest extends TestCase
{

    use RefreshDatabase;

    public function test_example(): void
    {
        $response = $this->post('/crear-torneo-8-jugadores', [
            'number_of_players' => 8,
            'courts' => 2,
            'name' => 'Pepe',
            'email' => 'pepe@pepe.es',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('users', [
            'name' => 'Pepe',
            'email' => 'pepe@pepe.es',
        ]);

        $this->assertDatabaseHas('tournament_user', [
            'tournament_id' => 1,
            'user_id' => 1,
        ]);
    }
}
