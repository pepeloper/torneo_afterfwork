import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Avatar, Typography } from "@material-tailwind/react";

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
      <div className="px-6 mt-5">
        <div className="flex flex-col space-y-3">
          {squad.users.map(u => {
            return (
              <div className="flex space-x-4 border-t border-gray-200 pt-3">
                <Avatar key={u.id} src={u.photo} className="border-2 border-white hover:z-10 focus:z-10" />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-gray-500 text-sm">{u.email}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
};