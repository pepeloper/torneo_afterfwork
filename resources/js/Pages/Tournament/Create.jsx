import { useForm } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PlayerAutocomplete from "@/Components/PlayerAutocomplete";

export default function Create({ users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    points: 16,
    players: [[{ name: '' }], [{ name: '' }], [{ name: '' }], [{ name: '' }]],
  });

  const addPlayer = (player, index) => {
    data.players[index] = player;
  }

  return (
    <div className="max-w-sm mx-auto mt-5 px-6">
      <form className="space-y-6">
        <div>
          <InputLabel htmlFor="tournament_name" value="Nombre del torneo" />

          <TextInput
            id="tournament_name"
            type="text"
            name="tournament_name"
            value={data.name}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="points" value="Puntos por partido" />

          <TextInput
            id="points"
            type="tel"
            inputMode="numeric"
            name="points"
            value={data.points}
            className="mt-1 block w-full"
            onChange={(e) => setData('points', e.target.value)}
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="">
          <InputLabel htmlFor="points" value="Jugadores" />
          <div className="space-y-3 mt-3">
            {data.players.map((player, index) => {
              return <PlayerAutocomplete
                key={`player-${index}`}
                players={users}
                addPlayer={addPlayer}
                player={player}
                />
            })}
          </div>
        </div>
      </form>
    </div>
  )
}