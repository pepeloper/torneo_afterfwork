<?php

namespace Tests\Unit;

use App\Actions\GamesForEightPlayers;
use App\Services\RoundRobin;
use PHPUnit\Framework\TestCase;

class GamesForEightPlayersTest extends TestCase
{
    public function test_eight_players_one_court(): void
    {
        $player_indexes = buildPlayerIndexes(8);
        $courts_matches = GamesForEightPlayers::get(1);

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 8);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }

    public function test_eight_players_two_courts(): void
    {
        $player_indexes = buildPlayerIndexes(8);
        $courts_matches = GamesForEightPlayers::get(2);

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 8);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }
}
