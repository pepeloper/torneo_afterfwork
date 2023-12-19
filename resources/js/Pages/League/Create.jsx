import GameCard from "@/Components/GameCard";
import GroupSection from "@/Components/GroupSection";
import { ranking } from "@/utils";
import { Link, Head, useForm } from '@inertiajs/react';

export default function Create({ groupA, groupB, groupC }) {

  return (
    <>
      <Head title="Welcome" />
      <div className="px-6 py-2 container mx-auto">
        <GroupSection group={groupA} only-ranking />
        <GroupSection group={groupB} only-ranking />
        <GroupSection group={groupC} only-ranking />
      </div>
    </>
  );
}
