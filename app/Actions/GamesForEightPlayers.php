<?php

namespace App\Actions;

class GamesForEightPlayers
{
    public static function get(int $courts)
    {
        if ($courts === 2) {
            return self::twoCourts();
        }

        return self::oneCourt();
    }

    private static function oneCourt()
    {
        return [
            [
                [0, 1, 2, 3],
                [4, 5, 6, 7],

                [0, 2, 4, 6],
                [1, 3, 5, 7],

                [1, 2, 5, 6],
                [0, 3, 4, 7],

                [0, 4, 1, 5],
                [2, 6, 3, 7],

                [1, 4, 3, 6],
                [0, 5, 2, 7],

                [1, 7, 2, 4],
                [0, 6, 3, 5],

                [2, 5, 3, 4],
                [0, 7, 1, 6],
            ],
        ];
    }

    private static function twoCourts()
    {
        $oneCourtMatches = self::oneCourt();
        return [
            [
                $oneCourtMatches[0][0],
                $oneCourtMatches[0][2],
                $oneCourtMatches[0][4],
                $oneCourtMatches[0][6],
                $oneCourtMatches[0][8],
                $oneCourtMatches[0][10],
                $oneCourtMatches[0][12],
            ],
            [
                $oneCourtMatches[0][1],
                $oneCourtMatches[0][3],
                $oneCourtMatches[0][5],
                $oneCourtMatches[0][7],
                $oneCourtMatches[0][9],
                $oneCourtMatches[0][11],
                $oneCourtMatches[0][13],
            ],
        ];
    }
}
