<?php

namespace App\Actions;

class GamesForFourPlayers
{
    public static function get()
    {
        return [
            [
                [0, 1, 2, 3],
                [0, 2, 1, 3],
                [1, 2, 0, 3],
            ]
        ];
    }
}
