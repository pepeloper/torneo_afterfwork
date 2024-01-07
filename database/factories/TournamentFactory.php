<?php

namespace Database\Factories;

use App\Models\Squad;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tournament>
 */
class TournamentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Torneo ' . fake()->userName,
            'squad_id' => Squad::first()->id,
            'tournament_id' => Tournament::first()->id,
            'user_id' => User::first()->id,
        ];
    }
}
