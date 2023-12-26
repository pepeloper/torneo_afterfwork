import EditGame from "@/Components/Game/EditGame";
import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Drawer,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Show({ tournament }) {
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
    <div className="max-w-2xl mx-auto mt-5 px-3 text-gray-800">
      <div>
        <h1 className="text-3xl font-medium">{tournament.name}</h1>
      </div>
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
            <TabPanel key={group.id} value={group.id}>
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
      {activeGame && <Drawer open={open} onClose={handleCloseDrawer} placement="bottom" className="p-4 rounded-t-xl">
        <EditGame game={activeGame} handleClose={() => handleCloseDrawer()} />
      </Drawer>
      }
    </div>
  )
}