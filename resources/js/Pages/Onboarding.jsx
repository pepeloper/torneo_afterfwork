import AppAvatar from "@/Components/AppAvatar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, ButtonGroup, Chip, Typography } from "@material-tailwind/react";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function Onboarding({ players }) {
  const { data, setData, get, processing, errors, reset } = useForm({
    name: '',
    number_of_players: Number(players),
    courts: null,
  });

  const addPlayers = (name, index) => {
    const players = [...data.players];
    players[index] = name;

    setData('players', players)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    get(route('onboarding.players', { number: players }));
  }

  return (
    <div className="w-full mx-auto flex flex-col min-h-[100dvh]">
      <header className="">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href={route('index')} className="-m-1.5 p-1.5">
              <span className="sr-only">Americano Padel</span>
              <ApplicationLogo className="w-10 h-10" />
            </a>
          </div>
        </nav>
      </header>
      <section className="flex-1 pb-12">
        <div className="w-full flex justify-between items-center py-5">
          <div className="container px-4 md:px-0 mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Organiza tu torneo de padel
            </h1>
            <p className="mt-6 md:text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
              Un americano de pádel es un torneo de varios partidos cambiando de pista y de compañeros donde te enfrentarás con todos los participantes en un circuito con puntuación.
              <br />
              Crea tu torneo americano personalizado de {players} jugadores, nosotros nos encargamos de la organización de los partidos y de generar el ranking que se actualiza en tiempo real.
            </p>
          </div>
        </div>
        <div className="container px-4 md:px-0 mx-auto mt-3">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="mt-3">
              <InputLabel htmlFor="name" value="Nombre del torneo" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1.5 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              {/* <p className="text-sm text-gray-600 mt-0.5">¡Pónle nombre al torneo!</p> */}

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
              <InputLabel value="¿Cuántas personas vais a jugar?" />

              <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 4 })} onClick={() => {
                  const newData = {
                    number_of_players: 4,
                    courts: null,
                    players: ['', '', '', ''],
                  };
                  setData({ ...data, ...newData });
                }}>4</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 8 })} onClick={() => {
                  const newData = {
                    number_of_players: 8,
                    courts: null,
                    players: ['', '', '', '', '', '', '', ''],
                  };
                  setData({ ...data, ...newData });
                }}>8</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 12 })} onClick={() => {
                  const newData = {
                    number_of_players: 12,
                    courts: null,
                    players: ['', '', '', '', '', '', '', '', '', '', '', ''],
                  };
                  setData({ ...data, ...newData });
                }}>12</Button>
              </ButtonGroup>
            </div>

            {data.number_of_players !== null && data.number_of_players !== 4 && (
              <div>
                <InputLabel value="¿En cuántas pistas vais a jugar?" />

                {data.number_of_players === 8 ?
                  (
                    <>
                      <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                        <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                        <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                      </ButtonGroup>
                      <Typography variant="small" className="mt-0.5" color="gray">Para {players} jugadores te recomendamos jugar en 2 pistas</Typography>
                    </>
                  ) :
                  (
                    <>
                      <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                        <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                        <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                        <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 3 })} onClick={() => setData('courts', 3)}>3</Button>
                      </ButtonGroup>
                      <Typography variant="small" className="mt-0.5" color="gray">Para {players} jugadores te recomendamos jugar en 3 pistas</Typography>
                    </>
                  )
                }
              </div>
            )}

            <Button type="submit" variant="gradient" color="light-green" fullWidth disabled={data.name === '' || (data.number_of_players > 4 && data.courts === null)}>Siguiente</Button>
          </form>
        </div>
      </section>
      <section className=" bg-white px-12 border-t border-gray-200 w-full py-4 flex items-center justify-center">
        FOOTER
      </section>
    </div>
  );
}
