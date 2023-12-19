import GameCard from "@/Components/GameCard";
import GroupSection from "@/Components/GroupSection";
import { ranking } from "@/utils";
import { Link, Head, useForm } from '@inertiajs/react';
import { useMemo } from "react";

export default function Welcome({ groupA, groupB, groupC }) {

  const allMatchesPlayed = useMemo(() => {
    const groupAPlayed = groupA.games.every(m => m.played)
    const groupBPlayed = groupB.games.every(m => m.played)
    const groupCPlayed = groupC.games.every(m => m.played)

    return groupAPlayed && groupBPlayed && groupCPlayed;
  }, [groupA]);

  console.log("allMatchesPlayed", allMatchesPlayed);

  const firstGroupRanking = ranking(groupA.games);
  const secondGroupRanking = ranking(groupB.games);
  const thirdGroupRanking = ranking(groupC.games);

  const firstLeague = [
    firstGroupRanking[0],
    firstGroupRanking[1],
    secondGroupRanking[0],
    secondGroupRanking[1],
  ];

  const secondLeague = [
    firstGroupRanking[2],
    secondGroupRanking[2],
    thirdGroupRanking[0],
    thirdGroupRanking[1],
  ];

  const thirdLeague = [
    firstGroupRanking[3],
    secondGroupRanking[3],
    thirdGroupRanking[2],
    thirdGroupRanking[3],
  ];

  console.log(firstLeague);
  console.log(secondLeague);
  console.log(thirdLeague);

  // Make the useForm
  const { data, post, processing, errors } = useForm({
    first_league: firstLeague.map(u => u.id),
    second_league: secondLeague.map(u => u.id),
    third_league: firstLeague.map(u => u.id),
  })

  const handleCreateLeagues = () => {
    post(route('league.create.multiple'))
  };

  return (
    <>
      <Head title="Welcome" />
      <div>
        <button type="button" onClick={handleCreateLeagues} disabled={!allMatchesPlayed}>Crear ligas</button>
      </div>
      <div className="px-6 py-2 container mx-auto">
        <GroupSection group={groupA} />
        <GroupSection group={groupB} />
        <GroupSection group={groupC} />
      </div>
    </>
  );
}
