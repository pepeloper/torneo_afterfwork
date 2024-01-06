import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Typography } from "@material-tailwind/react";

export default function Index({ squad }) {

  const header = (
    <div className="w-full flex justify-between items-center px-6 mt-5">
      <div className="flex space-x-0.5">
        <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <Typography variant="h3">{squad.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Grupo de padel</Typography>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout header={header}>
      Hola
    </AppLayout>
  )
};