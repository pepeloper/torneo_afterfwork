import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import {
  Typography,
  Avatar,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, UserCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Show({ squad, tournament, hasLeagues, section, ranking }) {
  console.log(tournament)
  console.log(ranking)
  const AVATARS_TO_SHOW = 8;

  const usersAvatars = useMemo(() => {
    return tournament.users.slice(0, AVATARS_TO_SHOW);
  }, [tournament.users]);

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col min-h-[100dvh] relative">
      <section className="flex-1 mb-6">
        <div className="w-full flex justify-between items-center px-6 mt-5">
          <div>
            <Typography variant="h3">{tournament.name}</Typography>
            <Typography variant="small" className="-mt-2 text-gray-500">Torneo Americano</Typography>
          </div>
          {/* {hasLeagues ? section === 'groups' ?
            <Link href={route('tournament.league.show', { squad, tournament })}>
              <Button variant="gradient" size="sm" color="light-green" ripple>Ver ligas</Button>
            </Link> :
            <Link href={route('tournament.show', { squad, tournament })}>
              <Button variant="gradient" size="sm" color="light-green" ripple>Ver grupos</Button>
            </Link> :
            <Link href="#">
              <Button variant="gradient" size="sm" color="light-green" ripple>Crear ligas</Button>
            </Link>
          } */}
        </div>
        <div className="px-6 mt-5 border-t border-gray-200 py-6">
          <div className="flex items-center gap-x-2">
            <UserCircleIcon className="w-6 h-6" />
            <Typography variant="h5">
              {tournament.users.length} Jugadores
            </Typography>
          </div>
          <div className="flex -space-x-3 mt-5">
            {usersAvatars.map(u => <Avatar key={u.id} src={u.photo} className="border-2 border-white hover:z-10 focus:z-10" />)}
            <div className="border-2 border-white hover:z-10 focus:z-10 bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-white">
              +{tournament.users.length - AVATARS_TO_SHOW}
            </div>
          </div>
        </div>

        <div className="px-6 border-gray-200">
          <div className="flex w-full">
            <Link href={route('groups.index', { squad, tournament })} className="w-1/2">
              <Button fullWidth variant="outlined" className="rounded-r-none border-r-0">
                Grupos
              </Button>
            </Link>
            {hasLeagues ?
              <Link disabled={!hasLeagues} href={route('tournament.league.show', { squad, tournament })} className="w-1/2">
                <Button disabled={!hasLeagues} fullWidth variant="outlined" className="rounded-l-none">Ligas</Button>
              </Link> :
              <Button disabled={!hasLeagues} fullWidth variant="outlined" className="rounded-l-none w-1/2">Ligas</Button>
            }
          </div>
        </div>

        <div className="px-6 mt-5 border-t border-gray-200 py-6">
          <Typography variant="h5">
            Estadísticas globales
          </Typography>
          <Typography variant="paragraph" className="mt-3 flex items-center" color="gray">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polyline points="224 208 32 208 32 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="200 72 128 144 96 112 32 176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="200 112 200 72 160 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
            Mayores puntuadores
          </Typography>
          <div className="space-y-3.5 mt-1">
            {ranking.slice(0, 3).map((u, index) => {
              return (
                <div key={u.id} className="w-full">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="font-medium text-base" key={u.username}>{u.name}</p>
                    </div>
                    <div className="flex space-x-4">
                      <p className="text-light-green-500 font-semibold">{u.points_in_favor}</p>
                      <p className="text-red-300 font-semibold"> {u.points_against}</p>
                    </div>
                  </div>
                  <div className="flex mt-0.5">
                    {u.points_against || u.points_in_favor ?
                      <>
                        <div className="bg-light-green-500 h-2 rounded-r-none rounded-lg" style={{ width: `${(100 * u.points_in_favor) / 48}%` }} />
                        <div className="bg-red-300 h-2 rounded-l-none rounded-lg" style={{ width: `${(100 * u.points_against) / 48}%` }} />
                      </> :
                      <div className="bg-gray-300 h-2 rounded-lg w-full" />
                    }
                  </div>
                </div>
              )
            })}
          </div>

          <Typography variant="paragraph" className="mt-6 flex items-center" color="gray">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polyline points="200 168 128 96 96 128 32 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="200 128 200 168 160 168" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="224 208 32 208 32 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
            Menores puntuadores
          </Typography>
          <div className="space-y-3.5 mt-1">
            {[...ranking].reverse().slice(0, 3).map((u, index) => {
              return (
                <div key={u.id} className="w-full">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="font-medium text-base" key={u.username}>{u.name}</p>
                    </div>
                    <div className="flex space-x-4">
                      <p className="text-light-green-500 font-semibold">{u.points_in_favor}</p>
                      <p className="text-red-300 font-semibold"> {u.points_against}</p>
                    </div>
                  </div>
                  <div className="flex mt-0.5">
                    {u.points_against || u.points_in_favor ?
                      <>
                        <div className="bg-red-300 h-2 rounded-r-none rounded-lg" style={{ width: `${(100 * u.points_against) / 48}%` }} />
                        <div className="bg-light-green-500 h-2 rounded-l-none rounded-lg" style={{ width: `${(100 * u.points_in_favor) / 48}%` }} />
                      </> :
                      <div className="bg-gray-300 h-2 rounded-lg w-full" />
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </section>
      <section className="px-12 z-50 bg-white sticky bottom-0 border-t border-gray-200 w-full py-4 flex justify-between items-center">
        <Link href={route('squads.show', { squad })}>
          <HomeIcon className="w-6 text-gray-600" />
        </Link>
        <UserGroupIcon className="w-6 text-gray-600" />
        <Cog6ToothIcon className="w-6 text-gray-600" />
      </section>
    </div>
  )
}