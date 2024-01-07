import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Avatar, Button, Typography } from "@material-tailwind/react";

export default function Settings({ user, squad }) {

  const { post } = useForm();


  const header = (
    <>
      <div className="flex space-x-0.5">
        <Link href={route('squads.show', { squad })} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <Typography variant="h3">{user.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Configuración de usuario</Typography>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout header={header}>
      <div className="px-6 mt-6">
        <div className="flex flex-col space-y-3">
          <Button variant="outlined" className="mt-12" onClick={() => post(route('logout'))}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </AppLayout>
  )
};