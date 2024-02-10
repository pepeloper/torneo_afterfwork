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
import classNames from "classnames";

export default function Show({ tournament, ranking }) {
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

  const header = (
    <>
      <div className="flex space-x-0.5">
        {auth.user && <Link href={route('tournaments.list')} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>}
        <div>
          <Typography variant="h5" className="break-words">Torneo Americano</Typography>
          <Typography variant="small" className="-mt-1 text-gray-500">
            {tournament.users.length} jugadores en {tournament.groups.length} {" "} {tournament.groups.length > 1 ? 'pistas' : 'pista'}
          </Typography>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head title="Torneo Americano" />
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

          <div className="px-6 border-t border-gray-200 py-6">
            <Typography variant="h4" className="text-gray-900">Ranking</Typography>
            <div className="mt-4 tabular-nums">
              {ranking.map((u, index) => {
                if (index < 3) {
                  return (
                    <div key={u.id} className="mt-3 shadow-card border border-white bg-[#f2f2f2] px-6 py-2 text-gray-900 w-full rounded-md relative">
                      <span className={classNames('text-xs uppercase font-bold text-white px-3 py-1 rounded-tl-md absolute left-0 top-0', {
                        'bg-amber-700': index === 0,
                        'bg-blue-gray-500': index === 1,
                        'bg-deep-orange-700': index === 2,
                      })}>Top {index + 1}</span>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex items-center space-x-2 mt-3">
                          <AppAvatar user={u} className="border-2 border-white" />
                          <span className="text-lg text-gray-900">{u.name}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="text-center py-2.5">
                            <p className="font-medium text-gray-800">PF</p>
                            <p className="text-light-green-600 text-lg font-semibold">{u.points_in_favor}</p>
                          </div>
                          <div className="mx-auto h-full w-px bg-gray-300" />
                          <div className="text-center py-2.5">
                            <p className="font-medium text-gray-800">PC</p>
                            <p className="text-gray-700 text-lg font-semibold">{u.points_against}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={u.id} className="w-full pr-6 pl-7 mt-3">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AppAvatar size="sm" user={u} className="border-2 border-white" />
                          <span className="text-lg text-gray-900">{u.name}</span>
                        </div>
                        <div className="flex space-x-6">
                          <p className="text-light-green-600 text-lg font-semibold">{u.points_in_favor ?? "0"}</p>
                          <p className="text-gray-700  text-lg font-semibold">{u.points_against ?? "0"}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            <div className="mt-7">
              <Typography variant="h4" className="text-gray-900">Partidos</Typography>
              <Tabs className="mt-2" value={tournament.groups[0].id}>
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
                      <div className="space-y-3">
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

          {activeGame && <Drawer dismiss={{
            outsidePress: () => {
              setBackdropBlicked(true);
              return true;
            }
          }} open={open} overlayProps={{ className: 'fixed' }} onClose={handleCloseDrawer} placement="bottom" className="p-4 rounded-t-xl">
            <EditGame game={activeGame} handleClose={() => handleCloseDrawer()} />
          </Drawer>}
        </>
      </AppLayout>
    </>
  );
}