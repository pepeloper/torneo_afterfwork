import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";
import { Link, Head } from '@inertiajs/react';

export default function GroupSection({ group, onlyRanking = false }) {
  return (
    <>
      <div>
        <h2 className="text-2xl mt-6">Ranking</h2>
        <div className="space-y-2 mt-2.5">
          {ranking(group.games).map((u, index) => {
            return (
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {index === 0 ? <span className="rounded-full w-3 h-3 inline-block bg-yellow-400" /> : ''}
                  {index === 1 ? <span className="rounded-full w-3 h-3 inline-block bg-gray-300" /> : ''}
                  {index === 2 ? <span className="rounded-full w-3 h-3 inline-block bg-amber-500" /> : ''}
                  {index > 2 ? <span className="rounded-full w-3 h-3 inline-block bg-red-400" /> : ''}
                  <p key={u.username}>{u.name}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-green-600 font-medium">{u.total_points_in_favor}</p>
                  <p className="text-red-600 font-medium"> {u.total_points_against}</p>
                </div>
              </div>
            )
          })}
        </div>
        {!onlyRanking &&
          <>
            <h2 className="text-2xl mt-6">Partidos</h2>
            <div className="space-y-6 mt-2.5">
              {group.games.map(game => {
                return (
                  <GameCard key={game.id} game={game} />
                )
              })}
            </div>
          </>
        }
      </div>
    </>
  );
}
