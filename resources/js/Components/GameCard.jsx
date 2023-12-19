import { Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function GameCard({ game }) {
  const [editMode, setEditMode] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    first_user_id: game.users[0].id,
    second_user_id: game.users[1].id,
    third_user_id: game.users[2].id,
    fourth_user_id: game.users[3].id,
    first_team_points: game.users[0].pivot.points_in_favor ?? 0,
    second_team_points: game.users[2].pivot.points_in_favor ?? 0,
  })

  const handleEditGame = () => {
    put(route('game.update', { game }), {
      onSuccess: () => setEditMode(false),
    });
  };

  return (
    <div className="border px-4 py-2 rounded-md">
      <div className="grid grid-cols-3 grid-rows-1 gap-x-4 items-center">
        <div className="flex flex-col">
          <span className="block whitespace-nowrap">
            {game.users[0].name}
          </span>
          <span className="block whitespace-nowrap">
            {game.users[1].name}
          </span>
        </div>
        <div className="flex items-end justify-center space-x-4">
          {editMode ?
            <input className="w-4 h-10 p-0" type="text" value={data.first_team_points} onChange={e => setData('first_team_points', e.target.value)} /> :
            <p>{data.first_team_points}</p>
          }
          <p className="text-xl text-center">vs</p>
          {editMode ?
            <input className="w-4 h-10 p-0" type="text" value={data.second_team_points} onChange={e => setData('second_team_points', e.target.value)} /> :
            <p>{data.second_team_points}</p>
          }
        </div>
        <div className="flex flex-col items-end">
          <span className="block whitespace-nowrap">
            {game.users[2].name}
          </span>
          <span className="block whitespace-nowrap">
            {game.users[3].name}
          </span>
        </div>
      </div>
      {editMode ?
        <button type="button" onClick={handleEditGame}>Guardar puntuación</button> :
        <button type="button" onClick={() => setEditMode(!editMode)}>Añadir puntuación</button>
      }
    </div>
  );
}
