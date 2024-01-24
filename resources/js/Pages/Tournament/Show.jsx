import { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  Typography,
  Button,
  Drawer,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import GameCard from "@/Components/GameCard";
import EditGame from "@/Components/Game/EditGame";
import AppLayout from "@/Layouts/AppLayout";
import AppAvatar from "@/Components/AppAvatar";

export default function Show({ squad, tournament, hasLeagues, section, ranking }) {
  const { auth } = usePage().props;

  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [backdropClicked, setBackdropBlicked] = useState(false);

  useEffect(() => {
    if (!open) {
      setTimeout(() => setBackdropBlicked(false), 200);
    }
  }, [open]);

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
    return tournament.mode === "groups";
    // return tournament.users.length === 4 || tournament.groups.length === 1;
  }, [tournament.users]);

  const header = (
    <>
      <div className="flex space-x-0.5">
        {auth.user && <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>}
        <div>
          <Typography variant="h3" className="break-words">{tournament.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Torneo Americano</Typography>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head title={`Torneo ${tournament.name}`} />
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
              {usersAvatars.map(u => <AppAvatar key={u.id} user={u} className="border-2 border-white hover:z-10 focus:z-10" />)}
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
                  {hasLeagues && tournament.mode !== 'groups' ?
                    <Link disabled={!hasLeagues} href={route('tournament.league.show', { squad, tournament })} className="w-1/2">
                      <Button disabled={!hasLeagues} fullWidth variant="outlined" className="rounded-l-none">Ligas</Button>
                    </Link> :
                    <Button disabled={!hasLeagues} fullWidth variant="outlined" className="rounded-l-none w-1/2">Ligas</Button>
                  }
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
                <Tabs className="mt-5" value={tournament.groups[0].id}>
                  <TabsHeader>
                    {tournament.groups.map(({ name, id }) => (
                      <Tab key={id} value={id}>
                        {name}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {tournament.groups.map((group) => (
                      <TabPanel key={group.id} value={group.id} className="px-1">
                        <div className="space-y-3.5 mt-3">
                          {group.games.map(game => {
                            return (
                              <GameCard key={game.id} game={game} onClick={openDrawer} activeGame={activeGame} />
                            )
                          })}
                        </div>
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          }

          {activeGame && <Drawer dismiss={{
            outsidePress: () => {
              setBackdropBlicked(true);
              return true;
            }
          }} open={open} onClose={handleCloseDrawer} placement="bottom" className="p-4 rounded-t-xl">
            <EditGame game={activeGame} handleClose={() => handleCloseDrawer()} />
          </Drawer>}
        </>
      </AppLayout>
    </>
  );
}