<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\Squad;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'squad_id' => Squad::first()->id,
            'group_id' => Group::first()->id,
            'tournament_id' => Tournament::first()->id,
        ];
    }
}
