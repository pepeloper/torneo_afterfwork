<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function update(Request $request, Game $game)
    {
        $game->played = true;
        $game->save();

        $game->users()->updateExistingPivot($request->first_user_id, [
            'points_in_favor' => $request->first_team_points,
            'points_against' => $request->second_team_points,
        ]);
        $game->users()->updateExistingPivot($request->second_user_id, [
            'points_in_favor' => $request->first_team_points,
            'points_against' => $request->second_team_points,
        ]);
        $game->users()->updateExistingPivot($request->third_user_id, [
            'points_in_favor' => $request->second_team_points,
            'points_against' => $request->first_team_points,
        ]);
        $game->users()->updateExistingPivot($request->fourth_user_id, [
            'points_in_favor' => $request->second_team_points,
            'points_against' => $request->first_team_points,
        ]);

        return back();
    }
}
