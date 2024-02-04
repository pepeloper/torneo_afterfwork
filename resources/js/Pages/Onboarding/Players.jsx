import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Footer from "@/Components/Landing/Footer";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from '@inertiajs/react';
import { Button, Drawer, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";

export default function Players({ name, number_of_players, courts }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: name,
    number_of_players: Number(number_of_players),
    courts: Number(courts),
    players: Number(number_of_players) === 4 ? ['', '', '', ''] : Number(number_of_players) === 8 ? ['', '', '', '', '', '', '', ''] : ['', '', '', '', '', '', '', '', '', '', '', ''],
    user_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_player: null,
  });

  const addPlayers = (name, index) => {
    const players = [...data.players];
    players[index] = name;

    setData('players', players)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!data.players.includes(data.user_name)) {
      setShowUserModal(true);
    } else {
      if (typeof fathom !== "undefined") fathom.trackEvent('onboarding done')
      post(route('onboarding.store', { number: number_of_players }));
    }
  }

  const handleCreate = (event) => {
    if (typeof fathom !== "undefined") fathom.trackEvent('onboarding done')
    post(route('onboarding.store', { number: number_of_players }));
  }

  return (
    <>
      <Head title="Organizar torneo" />
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
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {data.name.toLowerCase().includes('torneo') ? data.name : `Torneo ${data.name}`}
              </h1>
              <p className="mt-3 md:text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                Vas a crear un torneo de {data.number_of_players} jugadores en {data.courts} {data.courts === 1 ? 'pista' : 'pistas'}.
                A continuación añade a los jugadores. ¡Después invítalos para que puedan añadir los resultados!
              </p>
            </div>
          </div>
          <div className="container px-4 md:px-0 mx-auto mt-3">
            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* <Typography variant="h4">Nombre de los jugadores</Typography> */}

              <div className="space-y-3">
                {data.players.map((player, index) => {
                  return <div className="w-full justify-between" key={`player_${index}`}>
                    <InputLabel htmlFor={`player_${index}`} value={`Nombre del jugador ${index + 1}`} />
                    <TextInput
                      name={`user_${index}`}
                      id={`user_${index}`}
                      className="mt-1.5 block w-full"
                      onChange={(e) => addPlayers(e.target.value, index)}
                      required
                    />
                  </div>;
                })}
              </div>

              <div>
                <Typography variant="h4">Crea tu cuenta</Typography>
                <Typography className="text-gray-700">Para poder acceder a la plataforma y gestionar el torneo, deberás crear una cuenta. Próximamente implementaremos el crear torneos de manera anónima sin necesidad de crear una cuenta</Typography>
              </div>

              <div className="mt-3">
                <InputLabel htmlFor="name" value="Nombre" />

                <TextInput
                  id="name"
                  name="name"
                  value={data.user_name}
                  className="mt-1.5 block w-full"
                  autoComplete="name"
                  onChange={(e) => setData('user_name', e.target.value)}
                  required
                />

                <InputError message={errors.user_name} className="mt-2" />
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

              <Button type="submit" variant="gradient" color="light-green" fullWidth>Crear torneo</Button>
              {/* <Button variant="gradient" color="light-green" fullWidth onClick={() => get(route('onboarding.players', { number: players }))}>Crear torneo como invitado</Button> */}
            </form>
          </div>
        </section>
        <section className="w-full bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-start">
          <Footer />
        </section>
      </div>
      <Drawer placement="bottom" open={showUserModal} overlayProps={{ className: 'fixed' }} size={350}>
        <div className="flex flex-col mt-6 px-6">
          <Typography variant="h4">¿Vas a jugar el torneo?</Typography>
          <Typography>No hemos podido asociarte automáticamente con un jugador, si vas a jugar el torneo selecciona quién eres de los jugadores</Typography>
          <select onChange={(event) => setData('user_player', event.target.value)} name="user_player" id="user_player" className="mt-5 border border-gray-300 rounded-md">
            {data.players.map((p, index) => <option key={index} value={p}>{p}</option>)}
          </select>
          <Button onClick={handleCreate} className="mt-5" variant="gradient" color="light-green" fullWidth>Asociar jugador</Button>
          <Button onClick={handleCreate} className="mt-1" variant="text" color="light-green" fullWidth>No voy a jugar el torneo</Button>
        </div>
      </Drawer>
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
    </>
  );
}
