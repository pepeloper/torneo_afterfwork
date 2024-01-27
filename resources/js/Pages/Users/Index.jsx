import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Chip, Select, Typography, Option, Button, Drawer } from "@material-tailwind/react";
import classNames from "classnames";
import { getUserRoleForSquad } from "@/utils";
import AppAvatar from "@/Components/AppAvatar";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Index({ squad }) {

  const { auth } = usePage().props;
  const [activeUser, setActiveUser] = useState(null);

  const squadRole = getUserRoleForSquad(auth.user, squad);
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    user_id: null,
  });

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
      <Button size="sm" onClick={() => setShowInviteDrawer(true)}>
        Invitar jugadores
      </Button>
    </>
  );

  const handleRolChange = (user, value) => {
    router.put(route('users.update', { squad }), {
      role: value,
      user: user.id,
    })
  };

  const handleInviteUser = (user) => {
    setActiveUser(user);
    setData({
      name: user.name,
      email: '',
      user_id: user.id,
    });
    setShowInviteDrawer(true)
  }

  const handleSendInvitation = (e) => {
    e.preventDefault();
    post(route('invitation.create', { squad }), {
      onSuccess: () => {
        setShowInviteDrawer(false);
        reset('name', 'email');
      }
    });
  }

  return (
    <>
      <Head title="Jugadores" />
      <AppLayout header={header}>
        <div className="flex flex-col space-y-3">
          {squad.users.map((u, index) => {
            return (
              <div key={u.id} className={classNames("px-6 flex justify-between border-gray-200 items-center pt-3", { "border-t": index > 0 })}>
                <div className="flex space-x-4 flex-1">
                  <AppAvatar key={u.id} user={u} className="border-2 border-white hover:z-10 focus:z-10" />
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold first-letter:uppercase">{u.name}</p>
                    <p className="text-gray-500 text-sm">{u.email}</p>
                  </div>
                </div>
                {squadRole === "admin" && u.id !== auth.user.id ? u.email ?
                  <div>
                    <div className="w-28 [&>div]:min-w-0">
                      <Select
                        value={u.pivot.role}
                        variant="outlined"
                        labelProps={{ className: "after:ml-0 before:mr-0" }}
                        onChange={(value) => handleRolChange(u, value)}
                      >
                        <Option value="admin">Admin</Option>
                        <Option value="member">Miembro</Option>
                      </Select>
                    </div>
                  </div> :
                  <Button size="sm" onClick={() => handleInviteUser(u)}>
                    Invitar
                  </Button> :
                  <Chip className="w-20 text-center" value={u.pivot.role === "admin" ? "Admin" : "Miembro"} variant="outlined" />}
              </div>
            )
          })}
        </div>
        <Drawer open={showInviteDrawer} onClose={() => {
          setShowInviteDrawer(false);
          setActiveUser(null);
          setData({
            name: '',
            email: '',
            user_id: null,
          })
        }} placement="bottom" size={310} overlayProps={{ className: 'fixed' }}>
          <div className="flex flex-col mt-6 px-6">
            <Typography variant="h4">Invitar al grupo</Typography>
            <form onSubmit={handleSendInvitation}>
              <div className="mt-3">
                <InputLabel htmlFor="name" value="Nombre" />

                <TextInput
                  id="name"
                  name="name"
                  value={data.name}
                  className={classNames("mt-1 block w-full", { 'disabled:bg-gray-100': activeUser })}
                  autoComplete="name"
                  isFocused={true}
                  onChange={(e) => setData('name', e.target.value)}
                  disabled={activeUser}
                  required
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-3">
                <InputLabel htmlFor="email" value="Correo electrónico" />

                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />

                <InputError message={errors.email} className="mt-2" />
              </div>
              <Button className="mt-6" type="submit" color="light-green" variant="gradient" fullWidth ripple>Invitar jugador</Button>
            </form>
          </div>
        </Drawer>
      </AppLayout>
    </>
  )
};