import { Link, Head, useForm } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import CookieConsent from "react-cookie-consent";
import { Button, ButtonGroup, Dialog, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import classNames from "classnames";
import Footer from "@/Components/Landing/Footer";
import { useMemo, useState } from "react";
import AppAvatar from "@/Components/AppAvatar";
import FakeGameCard from "./FakeGameCard";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Welcome({ players, courts }) {
  const [registerModal, setRegisterModal] = useState(false);

  const { data } = useForm({
    number_of_players: players,
    courts: courts,
  });

  const playersArray = useMemo(() => {
    const result = []
    for (let index = 0; index < players; index++) {
      result.push({ id: index, name: `Jugador ${index + 1}` })
    }
    return result;
  }, [data.number_of_players]);

  const tournament = {
    groups: [],
  };

  for (let index = 0; index < courts; index++) {
    tournament.groups.push({
      id: index,
      name: `Pista ${index + 1}`,
      games: [
        {
          id: 1,
          users: [playersArray[0], playersArray[1], playersArray[2], playersArray[3]],
          played: false,
        },
        {
          id: 2,
          users: [playersArray[1], playersArray[3], playersArray[0], playersArray[2]],
          played: false,
        },
        {
          id: 3,
          users: [playersArray[0], playersArray[3], playersArray[1], playersArray[2]],
          played: false,
        },
      ]
    })
  }

  const { data: accountData, setData, post, processing, errors, reset } = useForm({
    number_of_players: Number(players),
    courts: Number(courts),
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    if (typeof fathom !== "undefined") fathom.trackEvent('onboarding done')
    post(route('onboarding.store', { number: players }));
  };

  return (
    <>
      <Head title="Bienvenido" />

      <header className="text-gray-50 px-4 pt-7 pb-10 flex flex-col items-start bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/images/landing.png')" }}>
        <Link href={route('index')} className="mx-auto -m-1.5 p-1.5 flex items-center space-x-2">
          <span className="sr-only">Americano Padel</span>
          <ApplicationLogo className="w-10 h-10" />
          <p className="uppercase font-black text-xl">torneospadel.app</p>
        </Link>
        <h1 className="mt-9 text-[28px] font-black leading-7 uppercase">
          Torneo americano
        </h1>
      </header>
      <main className="">
        <section className="flex -space-x-3 -mt-6 px-4">
          {playersArray.map(u => <AppAvatar key={u.id} user={u} className="border-2 border-white hover:z-10 focus:z-10" />)}
        </section>
        <section className="px-4 mt-5">
          <button onClick={() => setRegisterModal(true)} className="flex items-center space-x-3 px-4 py-3 border border-deep-orange-600 rounded-lg bg-deep-orange-50 text-gray-800">
            <svg className="min-w-[24px] min-h-[24px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V12.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12ZM12 15.75H12.008V15.758H12V15.75Z" stroke="#E64A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-medium leading-5">Para poder añadir jugadores necesitas crear una cuenta. Haz click aquí</p>
          </button>
        </section>
        <section className="px-4 mt-7">
          <Typography variant="h4" className="text-gray-900">Ranking</Typography>
          <div className="flex flex-col space-y-2 mt-4">
            {playersArray.map((player, index) => {
              if (index < 3) {
                return (
                  <div key={player.id} className="shadow-card border border-white bg-[#f2f2f2] px-6 py-2 text-gray-900 w-full rounded-md relative">
                    <span className={classNames('text-xs uppercase font-bold text-white px-3 py-1 rounded-tl-md absolute left-0 top-0', {
                      'bg-amber-700': index === 0,
                      'bg-blue-gray-500': index === 1,
                      'bg-deep-orange-700': index === 2,
                    })}>Top {index + 1}</span>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center space-x-2 mt-3">
                        <AppAvatar user={player} className="border-2 border-white hover:z-10 focus:z-10" />
                        <span className="text-lg text-gray-900">{player.name}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="text-center py-2.5">
                          <p className="font-medium text-gray-800">PF</p>
                          <p className="text-light-green-600 text-lg font-semibold">0</p>
                        </div>
                        <div className="mx-auto h-full w-px bg-gray-300" />
                        <div className="text-center py-2.5">
                          <p className="font-medium text-gray-800">PC</p>
                          <p className="text-gray-700 text-lg font-semibold">0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </section>
        <section className="px-4 mt-7 relative">
          <Typography variant="h4" className="text-gray-900">Partidos</Typography>
          <div className="mt-4 overflow-hidden">
            <div className="w-full absolute inset-0 top-32 z-50" style={{ background: "linear-gradient(0deg, rgba(250,250,250,1) 25%, rgba(250,250,250,0.5) 60%, rgba(250,250,250,0) 100%)" }} />
            <button onClick={() => setRegisterModal(true)} className="absolute right-4 left-4 bottom-32 opacity-80 z-50 flex items-center space-x-3 px-4 py-3 border border-gray-600 rounded-lg bg-gray-50 text-gray-800">
              <svg className="min-w-[24px] min-h-[24px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V12.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12ZM12 15.75H12.008V15.758H12V15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-medium leading-5">Para poder añadir jugadores necesitas crear una cuenta. Haz click aquí</p>
            </button>
            <Tabs value={tournament.groups[0].id}>
              <TabsHeader>
                {tournament.groups.map(({ name, id }) => (
                  <Tab key={id} value={id}>
                    {name}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {tournament.groups.map((group) => (
                  <TabPanel key={group.id} value={group.id} className="px-1">
                    <div className="space-y-3.5">
                      {group.games.map(game => {
                        return (
                          <FakeGameCard key={game.id} game={game} />
                        )
                      })}
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </section>
      </main>
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
      <Dialog open={registerModal} handler={() => setRegisterModal(false)}>
        <form onSubmit={handleSubmit} className="w-full px-6 py-6 space-y-5">
          <Typography variant="h4" className="text-gray-900">Crea tu cuenta</Typography>

          <div>
            <InputLabel htmlFor="name" value="Nombre" />

            <TextInput
              id="name"
              name="name"
              value={accountData.name}
              className="mt-1.5 block w-full"
              autoComplete="name"
              onChange={(e) => setData('name', e.target.value)}
              required
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Correo electrónico" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={accountData.email}
              className="mt-1.5 block w-full"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="Contraseña" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={accountData.password}
              className="mt-1.5 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" value="Repite la contraseña" />

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={accountData.password_confirmation}
              className="mt-1.5 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
            />

            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <Button type="submit" variant="gradient" color="light-green" fullWidth>Enviar</Button>
        </form>
      </Dialog>
    </>
  );
}
