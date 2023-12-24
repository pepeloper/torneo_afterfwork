import { Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function GameCard({ game }) {
  const [editMode, setEditMode] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    first_user_id: game.users[0].id,
    second_user_id: game.users[1].id,
    third_user_id: game.users[2].id,
    fourth_user_id: game.users[3].id,
    first_team_points: game.users[0].pivot.points_in_favor ?? '',
    second_team_points: game.users[2].pivot.points_in_favor ?? '',
  })

  const handleEditGame = () => {
    // if (!data.first_team_points.length && !data.first_team_points.length) {
      setEditMode(false)
    //   return
    // }
    // put(route('game.update', { game }), {
    //   onSuccess: () => setEditMode(false),
    //   preserveScroll: true,
    // });
  };

  return (
    <>
      <div className="border border-gray-700/30 bg-gray-700/10 rounded-md">
        <div className="p-4">
          <div className="court relative">
            { game.played && <div
              className="absolute top-0 left-0 mx-auto flex flex-col items-center justify-center"
              style={{ background: "rgba(0,0,0,0.6)", width: "98.75%", height: "97.5%", marginTop: "2px", marginLeft: "2px" }}
            >
              <span className="text-white uppercase text-2xl select-none font-bold">PARTIDO JUGADO</span>
              <div className="select-none">
                <div className="text-white text-2xl font-medium mx-3 flex space-x-2">
                  <p>{game.users[0].pivot.points_in_favor}</p>
                  <p>vs</p>
                  <p>{game.users[2].pivot.points_in_favor}</p>
                </div>
              </div>
            </div> }
            <div className="court__grid">
              <div className="court__cell court__nml--left" />
              <div className="court__cell court__ad--left">
                <img src={game.users[0].photo} className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
              </div>
              <div className="court__cell court__ad--right">
                <img src={game.users[2].photo} className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
              </div>
              <div className="court__cell court__dc--left">
                  <img src={game.users[1].photo} className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
              </div>
              <div className="court__cell court__dc--right">
                <img src={game.users[3].photo} className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white border-2 border-white text-sm shadow-lg"/>
              </div>
              <div className="court__cell court__nml--right" />
            </div>
          </div>
        </div>
        <div className="text-base">
          <div className="grid grid-cols-3 grid-rows-1 items-center px-4">
            <div className="flex flex-col">
              <span className="block whitespace-nowrap">
                {game.users[0].name}
              </span>
              <span className="block whitespace-nowrap">
                {game.users[1].name}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xl">
              {editMode ?
                <input type="tel" inputmode="numeric" className="w-6 h-10 p-0 text-gray-900 text-center" autoFocus value={data.first_team_points} onChange={e => setData('first_team_points', e.target.value)} /> :
                <p>{data.first_team_points}</p>
              }
              <p className="text-center">vs</p>
              {editMode ?
                <input type="tel" inputmode="numeric" className="w-6 h-10 p-0 text-gray-900 text-center" value={data.second_team_points} onChange={e => setData('second_team_points', e.target.value)} /> :
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
            <button type="button" className="bg-light-green-500/10 mt-2 w-full py-2 rounded-b-md" onClick={handleEditGame}>Guardar puntuación</button> :
            <button type="button" className="bg-gray-950/50 mt-2 w-full py-2 rounded-b-md" onClick={() => setEditMode(!editMode)}>Añadir puntuación</button>
          }
        </div>
      </div>
    </>
  );
}
