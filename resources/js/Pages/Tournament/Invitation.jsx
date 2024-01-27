import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Footer from "@/Components/Landing/Footer";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Typography } from "@material-tailwind/react";
import CookieConsent from "react-cookie-consent";

export default function Invitation({ squad, tournament }) {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("data", data);
    post(route('invitation.tournament.store', { squad, tournament }));
  };

  return (
    <>
      <Head title="Invitación" />
      <div className="w-full mx-auto flex flex-col min-h-[100dvh]">
        <header className="">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href={route('index')} className="-m-1.5 p-1.5">
                <span className="sr-only">Americano Padel</span>
                <ApplicationLogo className="w-10 h-10" />
              </a>
            </div>
          </nav>
        </header>
        <section className="flex-1 pb-12">
          <div className="w-full flex justify-between items-center py-5">
            <div className="container px-4 md:px-0 mx-auto">
              <form onSubmit={handleSubmit}>
                <Typography variant="lead" className="font-semibold text-base">Te han invitado a jugar el torneo de padel americano "{tournament.name}"</Typography>
                <Typography variant="h4" className="mt-3">Crea tu cuenta</Typography>
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
                  <Button type="submit" fullWidth disabled={processing}>
                    Apúntate al torneo
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section className="w-full bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-start">
          <Footer />
        </section>
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
