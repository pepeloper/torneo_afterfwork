import { Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { RadioGroup } from '@headlessui/react'
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import AppAvatar from "@/Components/AppAvatar";


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
  const [showModeElection, setShowModeElection] = useState(false);
  const [invalidNumberOfPlayers, setInvalidNumberOfPlayers] = useState(false);
  const { auth } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    players: [],
    mode: 'groups',
  });

  useEffect(() => {
    if (data.players.length % 4 !== 0) {
      setInvalidNumberOfPlayers(true);
    } else {
      setInvalidNumberOfPlayers(false);
    }

    if (data.players.length >= 8) {
      setShowModeElection(true);
    } else {
      setShowModeElection(false);
      setData('mode', 'groups');
    }
  }, [data.players]);

  const invalidState = useMemo(() => {
    return !data.players.length || data.name === '';
  }, [data]);

  const addPlayers = (user) => {
    const players = [...data.players];

    const index = players.findIndex((p) => p === user.id)
    if (index < 0) {
      players.push(user.id)
    } else {
      players.splice(index, 1);
    }
    setData('players', players)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const header = (
    <>
      <div className="flex space-x-0.5">
        {auth.user && <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>}
        <div>
          <Typography variant="h3">Crear torneo</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">{squad.name}</Typography>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout header={header}>
      <form className="space-y-6 mt-5 px-6" onSubmit={handleSubmit}>
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

        <div className="">
          <InputLabel htmlFor="points" value="Jugadores" />
          <div className="space-y-3 mt-2">
            {users.map(user => {
              return <div className="flex w-full justify-between" key={user.id}>
                <label htmlFor={`user_${user.id}`} className="flex flex-1">
                  <AppAvatar user={user} />
                  <div className="ml-2 flex flex-col justify-center">
                    <p className="leading-tight">{user.name}</p>
                    <p className="text-sm leading-tight">{user.email}</p>
                  </div>
                </label>
                <Checkbox color="light-green" name={`user_${user.id}`} id={`user_${user.id}`} className="before:bg-light-green-500 text-light-green-500 focus:ring-light-green-500" onChange={() => addPlayers(user)} />
              </div>;
            })}
            {invalidNumberOfPlayers && <InputError message="El número de jugadores tiene que ser 4, 8 o 12" className="mt-2" />}
          </div>
        </div>

        {showModeElection && <div>
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
        </div>}


        <Button type="submit" fullWidth disabled={invalidNumberOfPlayers || invalidState}>Crear torneo</Button>
      </form>
    </AppLayout>
  )
}