import GameCard from "@/Components/GameCard";
import { ranking } from "@/utils";
import { Link, Head } from '@inertiajs/react';

export default function GroupSection({ group, onlyRanking = false }) {
  return (
    <>
      <div>
        <h2 className="text-2xl mt-6">{group.name}</h2>
        {ranking(group.games).map(u => {
          return (
            <p key={u.username}>{u.name} - {u.total_points_in_favor} - {u.total_points_against}</p>
          )
        })}
        {!onlyRanking && <div className="space-y-6 mt-5">
          {group.games.map(game => {
            return (
              <GameCard key={game.id} game={game} />
            )
          })}
        </div>}
      </div>
    </>
  );
}
