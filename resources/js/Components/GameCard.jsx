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
    if (data.first_team_points == 0 && data.first_team_points === 0) {
      setEditMode(false)
      return
    }
    put(route('game.update', { game }), {
      onSuccess: () => setEditMode(false),
    });
  };

  return (
    <>
      <div className="border">
        <div className="court relative">
          { game.played && <div
            className="absolute top-0 left-0 mx-auto flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)", width: "98.75%", height: "97.5%", marginTop: "2px", marginLeft: "2px" }}
          >
            <span className="text-white uppercase text-xl select-none">PARTIDO JUGADO</span>
            <div className="select-none">
              <div className="text-white text-2xl mx-3 flex space-x-2">
                <p>{data.first_team_points}</p>
                <p>vs</p>
                <p>{data.second_team_points}</p>
              </div>
            </div>
          </div> }
          <div className="court__grid">
            <div className="court__cell court__nml--left" />
            <div className="court__cell court__ad--left">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
            </div>
            <div className="court__cell court__ad--right">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
            </div>
            <div className="court__cell court__dc--left">
              <div
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
              </div>
            </div>
            <div className="court__cell court__dc--right">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
            </div>
            <div className="court__cell court__nml--right" />
          </div>
        </div>
        <div className="pt-2 text-sm">
          <div className="grid grid-cols-3 grid-rows-1 gap-x-4 items-center px-8">
            <div className="flex flex-col">
              <span className="block whitespace-nowrap">
                {game.users[0].name}
              </span>
              <span className="block whitespace-nowrap">
                {game.users[1].name}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              {editMode ?
                <input className="w-4 h-10 p-0 text-sm" type="text" value={data.first_team_points} onChange={e => setData('first_team_points', e.target.value)} /> :
                <p>{data.first_team_points}</p>
              }
              <p className="text-sm text-center">vs</p>
              {editMode ?
                <input className="w-4 h-10 p-0 text-sm" type="text" value={data.second_team_points} onChange={e => setData('second_team_points', e.target.value)} /> :
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
            <button type="button" className="bg-gray-100 mt-2 w-full py-2" onClick={handleEditGame}>Guardar puntuación</button> :
            <button type="button" className="bg-gray-100 mt-2 w-full py-2" onClick={() => setEditMode(!editMode)}>Añadir puntuación</button>
          }
        </div>
      </div>
    </>
  );
}
