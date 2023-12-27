import { useForm } from "@inertiajs/react";
import { Typography, Button } from "@material-tailwind/react";

export default function EditGame({ game, handleClose }) {
  // TODO: Cuando se abre dos veces el Drawer pierde el autofocus
  const { data, setData, put, processing, errors } = useForm({
    first_user_id: game.users[0].id,
    second_user_id: game.users[1].id,
    third_user_id: game.users[2].id,
    fourth_user_id: game.users[3].id,
    first_team_points: game.users[0].pivot.points_in_favor ?? '',
    second_team_points: game.users[2].pivot.points_in_favor ?? '',
  })

  const handleEditGame = (e) => {
    e.preventDefault();

    if (data.first_team_points === "" && data.second_team_points === "") {
      return
    }

    put(route('game.update', { game }), {
      preserveScroll: true,
      onSuccess: () => handleClose(),
    });
  };

  return (
    <form onSubmit={handleEditGame}>
      <Typography variant="h4">Añadir resultados</Typography>
      <div className="flex justify-between mt-6 px-6">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col justify-center items-center">
              <img src={game.users[0].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
              <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[0].name}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src={game.users[1].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
              <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[1].name}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-400/50 w-px min-h-full" />
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col justify-center items-center">
              <img src={game.users[2].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
              <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[2].name}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src={game.users[3].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
              <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[3].name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-x-20 flex mt-6 w-full items-center justify-center">
        <input type="tel" autoFocus inputMode="numeric" className="w-10 h-14 rounded-xl p-0 text-gray-900 text-center" value={data.first_team_points} onChange={e => setData('first_team_points', e.target.value)} />
        <input type="tel" inputMode="numeric" className="w-10 h-14 rounded-xl p-0 text-gray-900 text-center" value={data.second_team_points} onChange={e => setData('second_team_points', e.target.value)} />
      </div>
      <Button type="submit" className="mt-6" color="light-green" variant="gradient" fullWidth ripple>Guardar</Button>
    </form>
  )
}