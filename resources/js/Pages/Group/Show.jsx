import GameCard from "@/Components/GameCard";
import GroupSection from "@/Components/GroupSection";
import { ranking } from "@/utils";
import { Link, Head, useForm } from '@inertiajs/react';
import { useMemo } from "react";

export default function Welcome({ activeGroup, allGroups, section }) {
  // section = groups | leagues
  console.log(activeGroup);
  console.log(allGroups);
  // TODO: Addapt this to the new payload;
  const allMatchesPlayed = useMemo(() => {
    const groupOne = allGroups[0].games.every(m => m.played)
    const groupTwo = allGroups[1].games.every(m => m.played)
    const groupThree = allGroups[2].games.every(m => m.played)

    return groupOne && groupTwo && groupThree;
  }, [activeGroup, allGroups]);

  console.log("allMatchesPlayed", allMatchesPlayed);

  const firstGroupRanking = ranking(allGroups[0].games);
  const secondGroupRanking = ranking(allGroups[1].games);
  const thirdGroupRanking = ranking(allGroups[2].games);

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
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-between mt-5 px-2 space-x-3">
          <div className="flex items-center">
            <Link href={route('index')}>
              <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M15 6L9 12L15 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Link>
            <h1 className="text-2xl font-medium">Americano Afterwork 2023</h1>
          </div>
          <button className="bg-green-800 text-gray-50 px-3 py-1 rounded-md text-sm disabled:opacity-70" type="button" onClick={handleCreateLeagues} disabled={!allMatchesPlayed}>Crear ligas</button>
        </div>
        <div className="grid grid-cols-3 mt-5 border px-2 py-2 space-x-1 bg-white">
          {allGroups.map(group => {
            return group.name === activeGroup.name ?
              <Link className="border border-green-900 text-center rounded-md bg-green-800 py-0.5 text-gray-50" href={route('group.show', { group })}>{group.name}</Link> :
              <Link className="border border-gray-300 text-center rounded-md bg-gray-100 py-0.5 text-gray-900" href={route('group.show', { group })}>{group.name}</Link>
          })}
        </div>
        <div className="px-6 py-2 container mx-auto">
          <GroupSection group={activeGroup} />
        </div>
      </div>
    </>
  );
}
