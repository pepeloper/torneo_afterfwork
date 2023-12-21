import GameCard from "@/Components/GameCard";
import GroupSection from "@/Components/GroupSection";
import { ranking } from "@/utils";
import { Link, Head, useForm } from '@inertiajs/react';
import { useMemo } from "react";

export default function Welcome({ activeGroup, allGroups, section }) {
  const allMatchesPlayed = useMemo(() => {
    const groupOne = allGroups[0].games.every(m => m.played)
    const groupTwo = allGroups[1].games.every(m => m.played)
    const groupThree = allGroups[2].games.every(m => m.played)

    return groupOne && groupTwo && groupThree;
  }, [activeGroup, allGroups]);

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

  const { data, post, processing, errors } = useForm({
    first_league: firstLeague.map(u => u.id),
    second_league: secondLeague.map(u => u.id),
    third_league: thirdLeague.map(u => u.id),
  })

  const handleCreateLeagues = () => {
    post(route('league.create.multiple'))
  };

  return (
    <>
      <div className="bg-gray-900">
        <main className="">
          {/* Hero section */}
          <div className="isolate relative overflow-hidden">
            <svg
              className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
            <div
              className="absolute opacity-30 left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
              aria-hidden="true"
            >
              <div
                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80ff88] to-[#46e596] opacity-20"
                style={{
                  clipPath:
                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                }}
              />
            </div>
            <div className="mx-auto flex flex-col max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
              <div className="mx-auto flex flex-col max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                <div className="w-full flex items-center justify-between">
                  <Link href={route('index')}>
                    <img
                      className="h-11"
                      src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
                      alt="Your Company"
                    />
                  </Link>
                  <button className="inline-flex space-x-6 disabled:opacity-60" disabled={!allMatchesPlayed} onClick={handleCreateLeagues}>
                    <span className="rounded-full bg-light-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-light-green-400 ring-1 ring-inset ring-light-green-500/20">
                      Crear ligas
                    </span>
                  </button>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Torneo Americano Afterwork
                </h1>
              </div>

              <div className="grid grid-cols-3 mt-5 py-2 space-x-1">
                {allGroups.map(group => {
                  return group.name === activeGroup.name ?
                    <Link className="text-center rounded-full bg-light-green-800/40 px-3 py-1 text-sm font-semibold leading-6 text-light-green-200 ring-1 ring-inset ring-light-green-500/60" href={route('group.show', { group })}>{group.name}</Link> :
                    <Link className="text-center rounded-full bg-light-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-light-green-400 ring-1 ring-inset ring-light-green-500/20" href={route('group.show', { group })}>{group.name}</Link>
                })}
              </div>
              <GroupSection group={activeGroup} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
