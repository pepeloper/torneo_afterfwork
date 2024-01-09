import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";
import { Button, Typography } from "@material-tailwind/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    squad: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  const header = (
    <>
      <div className="flex space-x-0.5">
        <div>
          <Typography variant="h3">Registro</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Crea tu cuenta</Typography>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout header={header}>
      <Head title="Register" />

      <form onSubmit={submit} className="px-6 mt-5">
        <Typography variant="h3">Datos personales</Typography>
        <div className="mt-3">
          <InputLabel htmlFor="name" value="Nombre" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
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

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Contraseña" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Repite la constraseña" />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <Typography variant="h3" className="mt-4">Grupo de padel</Typography>

        <div className="mt-3">
          <InputLabel htmlFor="squad" value="Nombre del grupo" />

          <TextInput
            id="squad"
            type="text"
            name="squad"
            value={data.squad}
            className="mt-1 block w-full"
            onChange={(e) => setData('squad', e.target.value)}
            required
          />

          <InputError message={errors.squad} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-10">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>

          <Button type="submit" className="ms-4" disabled={processing}>
            Registrate
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}
