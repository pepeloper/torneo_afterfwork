import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Footer from "@/Components/Landing/Footer";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Typography } from "@material-tailwind/react";
import CookieConsent from "react-cookie-consent";

export default function Invitation({ tournament }) {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    action: "register",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post(route('invitation.tournament.store', { tournament }));
  };

  const { data: loginData, setData: setLoginData, post: loginPost, errors: loginErrors } = useForm({
    email: '',
    password: '',
    action: "login",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    loginPost(route('invitation.tournament.store', { tournament }));
  }

  return (
    <>
      <Head title="Invitación" />
      <div className="w-full mx-auto flex flex-col min-h-[100dvh]">
        <header className="">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href={route('index')} className="-m-1.5 p-1.5">
                <span className="sr-only">Americano Padel</span>
                <ApplicationLogo className="w-10 h-10" />
              </Link>
            </div>
          </nav>
        </header>
        <section className="flex-1 pb-12">
          <div className="w-full flex justify-between items-center py-5">
            <div className="container px-4 md:px-0 mx-auto">
              <Typography variant="h3">Te han invitado a jugar un torneo de padel americano.</Typography>
              <Typography variant="small">
                Inicia sesión o crea tu cuenta para poder acceder al torneo.
                Puedes jugar y ver los datos del torneo sin crear una cuenta, pero no podrás añadir resultados
              </Typography>
              <div className="mt-5">
                <Typography variant="h4">Crea tu cuenta</Typography>
                <form onSubmit={handleSubmit}>
                  <div className="mt-3">
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                      id="name"
                      name="name"
                      value={data.name}
                      className="mt-1.5 block w-full"
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
                      className="mt-1.5 block w-full"
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
                      className="mt-1.5 block w-full"
                      autoComplete="new-password"
                      onChange={(e) => setData('password', e.target.value)}
                      required
                    />

                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Repite la contraseña" />

                    <TextInput
                      id="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      value={data.password_confirmation}
                      className="mt-1.5 block w-full"
                      autoComplete="new-password"
                      onChange={(e) => setData('password_confirmation', e.target.value)}
                      required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                  </div>

                  <div className="flex items-center justify-end mt-5">
                    <Button type="submit" variant="gradient" color="light-green" fullWidth disabled={processing}>
                      Apúntate al torneo
                    </Button>
                  </div>
                </form>
              </div>
              <section className="mt-5">
                <Typography variant="h4">Inicia sesión</Typography>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="mt-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Correo electrónico
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={loginData.email}
                        onChange={(e) => setLoginData('email', e.target.value)}
                      />
                      <InputError message={loginErrors.email} className="mt-2" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Contraseña
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setLoginData('password', e.target.value)}
                      />
                      <InputError message={loginErrors.password} className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="gradient"
                      color="light-green"
                      disabled={processing}
                    >
                      Iniciar sesión
                    </Button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </section>
        <Footer />
        <CookieConsent
          location="bottom"
          buttonText="Aceptar"
          cookieName="torneospadel"
          style={{ background: "#1f2937" }}
          buttonStyle={{ color: "#FFFFFF", fontSize: "13px", background: "#7cb342", padding: "5px 25px" }}
          declineButtonText="Rechazar"
          declineButtonStyle={{ color: "#FFFFFF", fontSize: "13px", background: "transparent", padding: "5px 20px" }}
          enableDeclineButton
          onAccept={() => hotjar.initialize(3836237)}
          flipButtons
          expires={150}
        >
          Este sitio web utiliza cookies para mejorar la experiencia del usuario.
        </CookieConsent>
      </div>
    </>
  );
};
