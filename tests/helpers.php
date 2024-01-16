<?php

function buildPlayerIndexes($number_of_players)
{
    $array = range(0, $number_of_players - 1);
    foreach ($array as $key => $value) {
        $array[$key] = ['id' => $key + 1, 'played' => false];
    }

    return $array;
}

function checkMatches($user_index, $courts_matches, $number_of_players)
{
    $plays_with = buildPlayerIndexes($number_of_players);

    $plays_with[$user_index]['played'] = true;

    foreach ($courts_matches as $match) {
        foreach ($match as $court_index => $game) {
            $key = array_search($user_index, $game);
            if ($key === 0) {
                $plays_with[$match[$court_index][1]]['played'] = true;
            } elseif ($key === 1) {
                $plays_with[$match[$court_index][0]]['played'] = true;
            } elseif ($key === 2) {
                $plays_with[$match[$court_index][3]]['played'] = true;
            } elseif ($key === 3) {
                $plays_with[$match[$court_index][2]]['played'] = true;
            }
        }
    }

    return $plays_with;
}
