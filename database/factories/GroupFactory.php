<?php

namespace Database\Factories;

use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "Grupo " . fake()->word(),
            'squad_id' => Squad::first()->id,
            'tournament_id' => Tournament::first()->id,
        ];
    }
}
