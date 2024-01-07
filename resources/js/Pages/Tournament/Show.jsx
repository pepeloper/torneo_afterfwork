import { useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Typography,
  Avatar,
  Button,
  ButtonGroup,
  Drawer,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, UserCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import GameCard from "@/Components/GameCard";
import EditGame from "@/Components/Game/EditGame";
import AppLayout from "@/Layouts/AppLayout";

export default function Show({ squad, tournament, hasLeagues, section, ranking }) {
  console.log(tournament)
  console.log(ranking)

  const { auth } = usePage().props;

  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [backdropClicked, setBackdropBlicked] = useState(false);

  const openDrawer = (game) => {
    if (!auth.user) {
      setOpen(false)
      return
    }

    if (backdropClicked) {
      setBackdropBlicked(false);
      return
    }
    setActiveGame(game)
    setOpen(true)
  };

  const handleCloseDrawer = () => {
    setOpen(false)
    setActiveGame(null)
  };

  const AVATARS_TO_SHOW = 8;

  const usersAvatars = useMemo(() => {
    return tournament.users.slice(0, AVATARS_TO_SHOW);
  }, [tournament.users]);

  const showMatches = useMemo(() => {
    return tournament.users.length === 4;
  }, [tournament.users]);

  const header = (
    <>
      <div className="flex space-x-0.5">
        {auth.user && <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>}
        <div>
          <Typography variant="h3">{tournament.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Torneo Americano</Typography>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout header={header}>
      <>
        <div className="px-6 py-5">
          <div className="flex items-center gap-x-2">
            <UserCircleIcon className="w-6 h-6" />
            <Typography variant="h5">
              {tournament.users.length} Jugadores
            </Typography>
          </div>
          <div className="flex -space-x-3 mt-5">
            {usersAvatars.map(u => <Avatar key={u.id} src={u.photo} className="border-2 border-white hover:z-10 focus:z-10" />)}
            {tournament.users.length > AVATARS_TO_SHOW && <div className="border-2 border-white hover:z-10 focus:z-10 bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-white">
              +{tournament.users.length - AVATARS_TO_SHOW}
            </div>}
          </div>
        </div>

        {!showMatches &&
          <>
            <div className="px-6 mb-6">
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
            <div className="px-6 border-t border-gray-200 py-6">
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
          </>
        }

        {showMatches &&
          <div className="px-6 border-t border-gray-200 py-6">
            <div className="space-y-3.5 mt-3">
              {ranking.map((u, index) => {
                return (
                  <div key={u.id} className="w-full">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center">
                        {index === 0 ? <span className="text-2xl">🥇</span> : ''}
                        {index === 1 ? <span className="text-2xl">🥈</span> : ''}
                        {index === 2 ? <span className="text-2xl">🥉</span> : ''}
                        {index > 2 ? <span className="text-2xl">☠️</span> : ''}
                        <p className="font-medium text-lg ml-1.5" key={u.username}>{u.name}</p>
                      </div>
                      <div className="flex space-x-4">
                        <p className="text-light-green-500 font-semibold">{u.total_points_in_favor}</p>
                        <p className="text-red-300 font-semibold"> {u.total_points_against}</p>
                      </div>
                    </div>
                    <div className="flex mt-0.5">
                      {u.total_points_against || u.total_points_in_favor ?
                        <>
                          <div className="bg-light-green-500 h-2 rounded-r-none rounded-lg" style={{ width: `${(100 * u.total_points_in_favor) / 48}%` }} />
                          <div className="bg-red-300 h-2 rounded-l-none rounded-lg" style={{ width: `${(100 * u.total_points_against) / 48}%` }} />
                        </> :
                        <div className="bg-gray-300 h-2 rounded-lg w-full" />
                      }
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="space-y-6 mt-10">
              {tournament.groups[0].games.map(game => {
                return (
                  <GameCard key={game.id} game={game} onClick={openDrawer} activeGame={activeGame} />
                )
              })}
            </div>
          </div>
        }

        {activeGame && <Drawer dismiss={{
          outsidePress: (event) => {
            setBackdropBlicked(true);
            return true;
          }
        }} open={open} onClose={handleCloseDrawer} placement="bottom" className="p-4 rounded-t-xl">
          <EditGame game={activeGame} handleClose={() => handleCloseDrawer()} />
        </Drawer>}
      </>
    </AppLayout>
  );
}