import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import AppAvatar from "@/Components/AppAvatar";

export default function Settings({ user }) {

  const { post } = useForm();
  const urlPrev = usePage().props.urlPrev;


  const header = (
    <>
      <div className="flex space-x-0.5">
        <Link href={urlPrev ?? route('tournaments.list')} className="mt-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <Typography variant="h5">Configuración</Typography>
          <Typography variant="small" className="-mt-1 text-gray-500">Mi cuenta</Typography>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head title="Configuración cuenta" />
      <AppLayout header={header}>
        <div className="px-6 mt-6">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-5">
              <AppAvatar user={user} />
              <div>
                <Typography variant="lead">{user.name}</Typography>
                <Typography variant="small" className="-mt-2">{user.email}</Typography>
              </div>
            </div>
            <Button variant="outlined" onClick={() => post(route('logout'))}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </AppLayout>
    </>
  )
};