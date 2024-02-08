import { Link, Head, useForm } from '@inertiajs/react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import CookieConsent from "react-cookie-consent";
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import classNames from "classnames";

export default function Welcome({ auth }) {

  const { user } = auth;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { data, setData, get, processing, errors, reset } = useForm({
    name: '',
    number_of_players: null,
    courts: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof fathom !== "undefined") fathom.trackEvent('onboarding next');
    get(route('onboarding.players', { number: data.number_of_players }));
  }

  return (
    <>
      <Head title="Bienvenido" />

      <div className="bg-white">
        <header className="inset-x-0 top-0 z-50">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Americano Padel</span>
                <ApplicationLogo className="w-10 h-10" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {auth.user ?
                <Link href={route('squads.show', { squad: auth.user.squads[0] })} className="text-sm font-semibold leading-6 text-gray-900">
                  Mis torneos <span aria-hidden="true">&rarr;</span>
                </Link>
                : <Link href={route('login')} onClick={() => fathom && fathom.trackEvent('login')} className="text-sm font-semibold leading-6 text-gray-900">
                  Iniciar sesión <span aria-hidden="true">&rarr;</span>
                </Link>}
            </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Americano Padel</span>
                  <ApplicationLogo className="w-10 h-10" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6">
                    {auth.user ?
                      <Link href={route('squads.show', { squad: auth.user.squads[0] })} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Mis torneos
                      </Link>
                      : <Link href={route('login')} onClick={() => fathom && fathom.trackEvent('login')} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Iniciar sesión
                      </Link>}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
        <main className="px-4">
          <h1 className="mt-3 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-6xl uppercase">
            Organiza tu torneo <br /> de padel americano
          </h1>
          <p className="mt-3 md:text-lg leading-7 text-gray-600 sm:max-w-md lg:max-w-none">
            Un Americano es un torneo de varios partidos cambiando de pista y de compañeros donde nos cruzaremos con todos los participantes en un circuito con puntuación
          </p>
          <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
            <div>
              <InputLabel value="¿Cuántas personas vais a jugar?" />

              <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 4 })} onClick={() => {
                  const newData = {
                    number_of_players: 4,
                    courts: 1,
                  };
                  setData({ ...data, ...newData });
                }}>4</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 8 })} onClick={() => {
                  const newData = {
                    number_of_players: 8,
                    courts: null,
                  };
                  setData({ ...data, ...newData });
                }}>8</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.number_of_players === 12 })} onClick={() => {
                  const newData = {
                    number_of_players: 12,
                    courts: null,
                  };
                  setData({ ...data, ...newData });
                }}>12</Button>
              </ButtonGroup>
            </div>

            <div>
              <InputLabel value="¿En cuántas pistas vais a jugar?" />

              <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                <Button type="button" className={classNames("text-sm border-gray-300", { "bg-gray-800 text-white": data.courts === 3 })} onClick={() => setData('courts', 3)}>3</Button>
              </ButtonGroup>
              { data.number_of_players && <Typography variant="small" className="mt-0.5" color="gray">Para {data.number_of_players} jugadores te recomendamos jugar en 3 pistas</Typography>}
            </div>


            <Button type="submit" variant="gradient" color="light-green" fullWidth disabled={data.name === '' || (data.number_of_players > 4 && data.courts === null)}>Siguiente</Button>
          </form>
        </main>
      </div>
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
