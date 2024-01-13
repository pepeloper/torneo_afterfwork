import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Show({ squad, invitation }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: invitation.user.email,
    user: invitation.user.id,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('invitation.store', { squad, token: invitation.token }));
  };

  const header = (
    <div>
      <Typography variant="h3">Invitación</Typography>
      <Typography variant="small" className="-mt-2 text-gray-500">Grupo de padel {squad.name}</Typography>
    </div>
  );
  return (
    <AppLayout header={header}>
      <div className="px-6 py-5">
        <Typography variant="paragraph">
          Has recibido una invitación para el grupo de padel {squad.name}, crea una contraseña para tu cuenta y así podrás acceder a los torneos
        </Typography>

        <form onSubmit={submit} className="mt-5">
          <div>
            <InputLabel htmlFor="email" value="Correo electrónico" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full bg-gray-100"
              autoComplete="email"
              onChange={(e) => setData('email', e.target.value)}
              disabled
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Contraseña" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              isFocused={true}
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Repite la contraseña" />

            <TextInput
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />

            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button type="submit" className="ms-4" disabled={processing}>
              Crear cuenta
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};