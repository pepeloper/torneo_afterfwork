import { useMemo, useState } from "react";
import EditGame from "@/Components/Game/EditGame";
import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";
import { Link, usePage } from "@inertiajs/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Drawer,
  Typography,
  Button,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import AppLayout from "@/Layouts/AppLayout";

export default function Show({ squad, tournament, hasLeagues, section }) {
  console.log(tournament);
  console.log(hasLeagues);
  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [backdropClicked, setBackdropBlicked] = useState(false);
  const { auth } = usePage().props;

  const canCreateLeagues = useMemo(() => {
    return tournament.groups.every(g => {
      return g.games.every(game => game.played);
    })
  }, [tournament.groups]);

  console.log('canCreateLeagues', canCreateLeagues);

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

  const header = (
    <div className="w-full flex justify-between items-center px-6 mt-5">
      <div className="flex space-x-0.5">
        <Link href={route('tournament.show', { squad, tournament })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <Typography variant="h3">{tournament.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Torneo Americano</Typography>
        </div>
      </div>
      {hasLeagues ? section === 'groups' ?
        <Link href={route('tournament.league.show', { squad, tournament })}>
          <Button variant="gradient" size="sm" color="light-green" ripple>Ver ligas</Button>
        </Link> :
        <Link href={route('groups.index', { squad, tournament })}>
          <Button variant="gradient" size="sm" color="light-green" ripple>Ver grupos</Button>
        </Link> :
        canCreateLeagues ?
          <Link href={route('league.create', { squad, tournament })} method="post" as="div">
            <Button variant="gradient" size="sm" color="light-green" ripple>Crear ligas</Button>
          </Link> :
          <Button variant="gradient" size="sm" color="light-green" ripple disabled>Crear ligas</Button>
      }
    </div>
  );

  return (
    <AppLayout header={header}>
      <>
        <div className="px-6 mt-5">
          <Typography variant="h5">
            {section === 'groups' ? 'Fase de grupos' : 'Ligas'}
          </Typography>
        </div>
        <Tabs className="mt-5 px-6" value={tournament.groups[0].id}>
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
                  {ranking(group.games).map((u, index) => {
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
                    {/* return (
                      <div key={u.id} className="w-full flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {index === 0 ? <span className="text-2xl">🥇</span> : ''}
                          {index === 1 ? <span className="text-2xl">🥈</span> : ''}
                          {index === 2 ? <span className="text-2xl">🥉</span> : ''}
                          {index > 2 ? <span className="text-2xl">☠️</span> : ''}
                          <p className="font-medium text-lg" key={u.username}>{u.name}</p>
                        </div>
                        <div className="flex space-x-4">
                          <p className="text-green-500 text-lg font-semibold">{u.total_points_in_favor}</p>
                          <p className="text-red-500 text-lg font-semibold"> {u.total_points_against}</p>
                        </div>
                      </div>
                    ) */}
                  })}
                </div>
                <div className="space-y-6 mt-10">
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