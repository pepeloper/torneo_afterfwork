import { Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Button, ButtonGroup, Checkbox, Typography } from "@material-tailwind/react";
import { RadioGroup } from '@headlessui/react'
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import AppAvatar from "@/Components/AppAvatar";
import { Stepper, Step } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, ClipboardDocumentCheckIcon, UsersIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

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
    mode: null,
    number_of_players: null,
    courts: null,
  });

  useEffect(() => {
    if (data.players.length % 4 !== 0) {
      setInvalidNumberOfPlayers(true);
    } else {
      setInvalidNumberOfPlayers(false);
    }

    if (data.number_of_players >= 8) {
      setShowModeElection(true);
    } else {
      setShowModeElection(false);
      setData('mode', null);
    }
  }, [data.players, data.number_of_players]);

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

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const canChangeStep = useMemo(() => {
    if (activeStep === 0) {
      if (data.name !== '' && data.number_of_players !== null) {
        if (data.number_of_players === 4) {
          return true;
        } else {
          return data.courts !== null && data.mode !== null;
        }
      }

      return false
    }

    if (activeStep === 1) {
      return data.players.length === data.number_of_players;
    }

    return false;
  }, [data.players, activeStep, data.name, data.number_of_players, data.courts, data.mode]);

  return (
    <AppLayout header={header}>
      <div className="px-6">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className="w-[90%] mt-5 mx-auto"
        >
          <Step onClick={() => setActiveStep(0)}>
            <AdjustmentsVerticalIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                color={activeStep === 0 ? "blue-gray" : "gray"}
                className="font-normal"
              >
                Configuración
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <UsersIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                color={activeStep === 1 ? "blue-gray" : "gray"}
                className="font-normal"
              >
                Jugadores
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                color={activeStep === 2 ? "blue-gray" : "gray"}
                className="font-normal"
              >
                Resumen
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      <form className="space-y-6 mt-14 px-6" onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <>
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
              <InputLabel value="¿Cuántos jugadores sois?" />

              <ButtonGroup fullWidth variant="outlined" ripple className="mt-1">
                <Button type="button" className={classNames({ "bg-black text-white": data.number_of_players === 4 })} onClick={() => {
                  const newData = {
                    number_of_players: 4,
                    mode: null,
                    courts: null,
                  };
                  setData({ ...data, ...newData });
                }}>4</Button>
                <Button type="button" className={classNames({ "bg-black text-white": data.number_of_players === 8 })} onClick={() => setData('number_of_players', 8)}>8</Button>
                <Button type="button" className={classNames({ "bg-black text-white": data.number_of_players === 12 })} onClick={() => setData('number_of_players', 12)}>12</Button>
              </ButtonGroup>
            </div>

            {data.number_of_players !== null && data.number_of_players !== 4 && (
              <div>
                <InputLabel value="¿En cuántas pistas vais a jugar?" />

                {data.number_of_players === 8 ?
                  (
                    <ButtonGroup fullWidth variant="outlined" ripple className="mt-1">
                      <Button type="button" className={classNames({ "bg-black text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                      <Button type="button" className={classNames({ "bg-black text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                    </ButtonGroup>
                  ) :
                  (
                    <ButtonGroup fullWidth variant="outlined" ripple className="mt-1">
                      <Button type="button" className={classNames({ "bg-black text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                      <Button type="button" className={classNames({ "bg-black text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                      <Button type="button" className={classNames({ "bg-black text-white": data.courts === 3 })} onClick={() => setData('courts', 3)}>3</Button>
                    </ButtonGroup>
                  )
                }
                <Typography variant="small" className="mt-0.5" color="gray">Esto nos ayudará a organizar el torneo de la forma más eficiente</Typography>
              </div>
            )}

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
          </>
        )}

        {activeStep === 1 && (
          <div className="">
            <InputLabel value={`Selecciona ${data.number_of_players} jugadores`} />
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
                  <Checkbox
                    color="light-green"
                    name={`user_${user.id}`}
                    id={`user_${user.id}`}
                    className="before:bg-light-green-500 text-light-green-500 focus:ring-light-green-500"
                    onChange={() => addPlayers(user)}
                    defaultChecked={data.players.includes(user.id)}
                    disabled={data.number_of_players === data.players.length && !data.players.includes(user.id)}
                  />
                </div>;
              })}
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-2">
            <div className="flex w-full justify-between">
              <Typography variant="h6">Nombre</Typography>
              <Typography>{data.name}</Typography>
            </div>
            {data.courts && (
              <div className="flex w-full justify-between">
                <Typography variant="h6">Pistas disponibles</Typography>
                <Typography>{data.courts}</Typography>
              </div>
            )}
            {data.mode && (
              <div className="flex w-full justify-between">
                <Typography variant="h6">Modo de torneo</Typography>
                <Typography>{data.mode === "groups" ? "Americano" : "Americano con Superliga"}</Typography>
              </div>
            )}
            <div className="flex w-full justify-between">
              <Typography variant="h6">Jugadores</Typography>
              <Typography>{data.number_of_players}</Typography>
            </div>
            <div className="space-y-3 mt-2">
              {data.players.map(userId => {
                const user = users.find((u) => u.id === userId);

                return <div key={user.id} className="flex flex-1">
                  <AppAvatar user={user} />
                  <div className="ml-2 flex flex-col justify-center">
                    <p className="leading-tight">{user.name}</p>
                    <p className="text-sm leading-tight">{user.email}</p>
                  </div>
                </div>;
              })}
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-between">
          <Button type="button" onClick={handlePrev} disabled={isFirstStep}>
            Anterior
          </Button>
          {isLastStep ? (
            <Button type="submit" disabled={invalidNumberOfPlayers || invalidState}>Crear torneo</Button>
          ) : (
            <Button type="button" onClick={handleNext} disabled={isLastStep || !canChangeStep}>
              Siguiente
            </Button>
          )}
        </div>
      </form>
    </AppLayout>
  )
}