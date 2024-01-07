import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Avatar, Typography } from "@material-tailwind/react";
import classNames from "classnames";

export default function Index({ squad }) {

  const header = (
    <>
      <div className="flex space-x-0.5">
        <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <Typography variant="h3">{squad.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Grupo de padel</Typography>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout header={header}>
      <div className="flex flex-col space-y-3">
        {squad.users.map((u, index) => {
          return (
            <div className={classNames("px-6 flex space-x-4 border-gray-200 pt-3", { "border-t": index > 0 })}>
              <Avatar key={u.id} src={u.photo} className="border-2 border-white hover:z-10 focus:z-10" />
              <div className="flex flex-col justify-center">
                <p className="font-semibold">{u.name}</p>
                <p className="text-gray-500 text-sm">{u.email}</p>
              </div>
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
};