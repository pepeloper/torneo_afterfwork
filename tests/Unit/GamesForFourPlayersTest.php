<?php

namespace Tests\Unit;

use App\Actions\GamesForFourPlayers;
use PHPUnit\Framework\TestCase;

class GamesForFourPlayersTest extends TestCase
{
    public function test_four_players_one_court(): void
    {
        $player_indexes = buildPlayerIndexes(4);
        $courts_matches = GamesForFourPlayers::get();

        foreach ($player_indexes as $index => $player) {
            $plays_with = checkMatches($index, $courts_matches, 4);

            foreach ($plays_with as $value) {
                $this->assertTrue($value['played']);
            }
        }
    }
}
