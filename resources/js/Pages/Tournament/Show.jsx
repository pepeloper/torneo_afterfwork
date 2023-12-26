import { useState } from "react";
import EditGame from "@/Components/Game/EditGame";
import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";
import { Link } from "@inertiajs/react";
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

export default function Show({ squad, tournament }) {
  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  const openDrawer = (game) => {
    setActiveGame(game)
    setOpen(true)
  };

  const handleCloseDrawer = () => {
    setOpen(false)
    setActiveGame(null)
  };

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col min-h-[100dvh] relative">
      <section className="flex-1 mb-6">
        <div className="w-full flex justify-between items-center px-6 mt-5">
          <div>
            <Typography variant="h3">{tournament.name}</Typography>
            <Typography variant="small" className="-mt-2 text-gray-500">Torneo Americano</Typography>
          </div>
          <Link href="#">
            <Button variant="gradient" size="sm" color="light-green" ripple>Crear ligas</Button>
          </Link>
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
                <div className="space-y-2.5 mt-4">
                  {ranking(group.games).map((u, index) => {
                    return (
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
                    )
                  })}
                </div>
                <div className="space-y-6 mt-10">
                  {group.games.map(game => {
                    return (
                      <GameCard key={game.id} game={game} onClick={openDrawer} />
                    )
                  })}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </section>
      <section className="px-12 z-50 bg-white sticky bottom-0 border-t border-gray-200 w-full py-4 flex justify-between items-center">
        <Link href={route('squads.show', { squad })}>
          <HomeIcon className="w-6 text-gray-600" />
        </Link>
        <UserGroupIcon className="w-6 text-gray-600" />
        <Cog6ToothIcon className="w-6 text-gray-600" />
        {/* <Menu placement="bottom-start">
          <MenuHandler>
            <Avatar
              size="sm"
              variant="circular"
              alt={auth.user.name}
              className="cursor-pointer"
              src={auth.user.photo}
            />
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                  fill="#90A4AE"
                />
              </svg>

              <Typography variant="small" className="font-medium">
                {auth.user.name}
              </Typography>
            </MenuItem>
            <hr className="my-2 border-blue-gray-50" />
            <MenuItem>
              <Link href={route('logout')} method="post" className="flex items-center gap-2" as="div">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                    fill="#90A4AE"
                  />
                </svg>
                <Typography variant="small" className="font-medium">
                  Cerrar sesión
                </Typography>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu> */}
      </section>
      {activeGame && <Drawer open={open} onClose={handleCloseDrawer} placement="bottom" className="p-4 rounded-t-xl">
        <EditGame game={activeGame} handleClose={() => handleCloseDrawer()} />
      </Drawer>
      }
    </div>
  )
}