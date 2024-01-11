import AppLayout from "@/Layouts/AppLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Chip, Select, Typography, Option } from "@material-tailwind/react";
import classNames from "classnames";
import { getUserRoleForSquad } from "@/utils";
import AppAvatar from "@/Components/AppAvatar";

export default function Index({ squad }) {

  const { auth } = usePage().props;

  const squadRole = getUserRoleForSquad(auth.user, squad);

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

  const handleRolChange = (user, value) => {
    router.put(route('users.update', { squad }), {
      role: value,
      user: user.id,
    })
  }

  return (
    <AppLayout header={header}>
      <div className="flex flex-col space-y-3">
        {squad.users.map((u, index) => {
          return (
            <div key={u.id} className={classNames("px-6 flex justify-between border-gray-200 items-center pt-3", { "border-t": index > 0 })}>
              <div className="flex space-x-4 flex-1">
                <AppAvatar key={u.id} user={u} className="border-2 border-white hover:z-10 focus:z-10" />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-gray-500 text-sm">{u.email}</p>
                </div>
              </div>
              {squadRole === "admin" && u.id !== auth.user.id ? <div>
                <Select
                  value={u.pivot.role}
                  variant="outlined"
                  labelProps={{ className: "after:ml-0 before:mr-0" }}
                  onChange={(value) => handleRolChange(u, value)}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="member">Miembro</Option>
                </Select>
              </div> :
                <Chip className="w-20 text-center" value={u.pivot.role === "admin" ? "Admin" : "Miembro"} variant="outlined" />}
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
};