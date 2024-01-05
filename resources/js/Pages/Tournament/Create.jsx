import { useForm } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PlayerAutocomplete from "@/Components/PlayerAutocomplete";
import { Button } from "@material-tailwind/react";
import { RadioGroup } from '@headlessui/react'


function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Create({ squad, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    points: 16,
    players: [],
    mode: null,
  });

  const addPlayers = (players) => {
    data.players = players;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('data', data);
    post(route('tournament.store', { squad }));
  }

  const plans = [
    {
      name: 'Americano',
      description: "Ideal cuando todos los jugadores tienen un nivel similar, jugaréis todos contra todos como en un Torneo Americano normal.",
      value: 'groups',
    },
    {
      name: 'Americano con Superliga',
      description: 'Ideal para jugadores con un nivel diferente, solo jugarás con los jugadores de tu grupo y los ganadores pasarán a formar un grupo de SuperLiga.',
      value: 'league',
    },
  ]

  return (
    <div className="max-w-xl mx-auto mt-5 px-6">
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
          <div className="space-y-3 mt-2">
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

        <div>
          <InputLabel htmlFor="points" value="Modo de juego" />

          <RadioGroup value={data.mode} onChange={(value) => setData('mode', value)}>
            <RadioGroup.Label className="sr-only">Modo de juego</RadioGroup.Label>
            <div className="space-y-2 mt-2">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.value}
                  value={plan.value}
                  className={({ active, checked }) =>
                    `${active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                      : ''
                    }
                  ${checked ? 'bg-light-green-800 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-start justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                              {plan.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                            >
                              <span>{plan.description}</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <InputError message={errors.name} className="mt-2" />
        </div>


        <Button type="submit" fullWidth>Crear torneo</Button>
      </form>
    </div>
  )
}