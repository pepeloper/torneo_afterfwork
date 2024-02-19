import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@material-tailwind/react";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    console.log("data", data)
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center flex-col">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Restablece tu contraseña
            </h2>
        </div>

        <div className="my-4 text-sm text-gray-600 max-w-xl mx-auto text-center">
          ¿Has olvidado tu contraseña? No te preocupes. Rellena tu dirección de correo electrónico y te enviaremos un enlace
          para que puedas restablecer la contraseña
        </div>

        {status && <div className="mb-4 max-w-xl text-center mx-auto font-medium text-sm text-green-600">{status}</div>}

        <form onSubmit={submit} className="max-w-xl w-full mx-auto">
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <div className="flex items-center justify-end mt-4">
            <Button type="submit" disabled={processing} fullWidth>
              Enviar enlace por email
            </Button>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
