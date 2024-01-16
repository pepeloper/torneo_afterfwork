<?php

namespace Tests\Unit;

use App\Actions\GamesForTwelvePlayers;
use PHPUnit\Framework\TestCase;

class GamesForTwelvePlayersTest extends TestCase
{
    public function test_twelve_players_one_court(): void
    {
        $player_indexes = buildPlayerIndexes(12);
        $courts_matches = GamesForTwelvePlayers::get(1);

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 12);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }

    public function test_twelve_players_two_courts(): void
    {
        $player_indexes = buildPlayerIndexes(12);
        $courts_matches = GamesForTwelvePlayers::get(2);

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 12);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }

    public function test_twelve_players_three_courts(): void
    {
        $player_indexes = buildPlayerIndexes(12);
        $courts_matches = GamesForTwelvePlayers::get(3);

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 12);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }
}
