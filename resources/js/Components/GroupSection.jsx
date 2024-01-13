import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";

export default function GroupSection({ group, onlyRanking = false }) {
  return (
    <>
      <div className="text-gray-900">
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
        {!onlyRanking &&
          <>
            <div className="space-y-6 mt-10">
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
