import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import AppLayout from "@/Layouts/AppLayout";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export default function Create({ previousPlayers }) {
  const { auth } = usePage().props;
  console.log("previousPlayers", previousPlayers);

  const { data, setData, post, processing, errors, reset } = useForm({
    number_of_players: null,
    courts: null,
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    post(route('tournament.store'));
  }

  const header = (
    <>
      <div className="flex space-x-0.5">
        {auth.user && <Link href={route('tournaments.list')} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>}
        <div>
          <Typography variant="h5">Crear torneo</Typography>
          {/* <Typography variant="small" className="-mt-2 text-gray-500">{squad.name}</Typography> */}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head title="Crear torneo" />
      <AppLayout header={header}>
        <form className="space-y-5 mt-5 px-4" onSubmit={handleSubmit}>
          <div>
            <InputLabel value="¿Cuántas personas vais a jugar?" />

            <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 4 })} onClick={() => {
                const newData = {
                  number_of_players: 4,
                  courts: 1,
                };
                setData({ ...data, ...newData });
              }}>4</Button>
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 8 })} onClick={() => {
                const newData = {
                  number_of_players: 8,
                  courts: 2,
                };
                setData({ ...data, ...newData });
              }}>8</Button>
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 12 })} onClick={() => {
                const newData = {
                  number_of_players: 12,
                  courts: 3,
                };
                setData({ ...data, ...newData });
              }}>12</Button>
            </ButtonGroup>
          </div>

          <div>
            <InputLabel value="¿En cuántas pistas vais a jugar?" />

            <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
              <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 3 })} onClick={() => setData('courts', 3)}>3</Button>
            </ButtonGroup>
            {data.number_of_players && <Typography variant="small" className="mt-0.5" color="gray">Para {data.number_of_players} jugadores te recomendamos jugar en {data.number_of_players == 4 ? '1' : data.number_of_players === 8 ? '2' : '3'} {data.courts === 1 ? 'pista' : 'pistas'}</Typography>}
          </div>

          <Button type="submit" variant="gradient" color="light-green" fullWidth disabled={data.number_of_players === null && data.courts === null}>Crear torneo</Button>
        </form>
      </AppLayout>
    </>
  )
}