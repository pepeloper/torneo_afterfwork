import GameCard from "@/Components/GameCard";
import GroupSection from "@/Components/GroupSection";
import { ranking } from "@/utils";
import { Link, Head, useForm } from '@inertiajs/react';
import { useMemo } from "react";

export default function Welcome({ group, league }) {


  return (
    <>
      <Head title="Welcome" />
      <div className="px-6 py-2 container mx-auto flex flex-col space-y-12">
        <h1 className="text-3xl font-medium mt-5">Americano Afterwork 2023</h1>
        <Link className="w-full bg-gray-800 text-gray-50 py-3 rounded-md text-center text-xl" href={route('group.show', { group })}>Ver grupos</Link>
        {
          league ?
            <Link className="w-full bg-gray-800 text-gray-50 py-3 rounded-md text-center text-xl" href={route('group.show', { group })}>Ver ligas</Link> :
            <button className="w-full bg-gray-800 opacity-50 text-gray-50 py-3 rounded-md text-center text-xl" disabled>Ver ligas</button>
        }
      </div>
    </>
  );
}
