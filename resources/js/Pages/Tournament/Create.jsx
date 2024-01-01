import { useForm } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PlayerAutocomplete from "@/Components/PlayerAutocomplete";
import { Button } from "@material-tailwind/react";

export default function Create({ squad, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    points: 16,
    players: [],
  });

  const addPlayers = (players) => {
    data.players = players;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('data', data);
    post(route('tournament.store', { squad }));
  }

  return (
    <div className="max-w-sm mx-auto mt-5 px-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            <PlayerAutocomplete
              players={users}
              addPlayers={addPlayers}
            />
            {/* {data.players.map((player, index) => {
              return <PlayerAutocomplete
                key={`player-${index}`}
                players={users}
                addPlayers={addPlayers}
                player={player}
                />
            })} */}
          </div>
        </div>

        <Button type="submit" fullWidth>Crear torneo</Button>
      </form>
    </div>
  )
}