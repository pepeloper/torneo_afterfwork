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
    number_of_players: 8,
    courts: 2,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof fathom !== "undefined") fathom.trackEvent('onboarding next');
    get(route('onboarding.players', { number: data.number_of_players }));
  }

  return (
    <>
      <Head title="Bienvenido" />

      <div className="bg-white pb-12">
        <header className="text-gray-50 px-4 pt-7 pb-16 flex flex-col items-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/images/landing.png')" }}>
          <a href={route('index')} className="-m-1.5 p-1.5 flex items-center space-x-2">
            <span className="sr-only">Americano Padel</span>
            <ApplicationLogo className="w-10 h-10" />
            <p className="uppercase font-black text-xl">torneospadel.app</p>
          </a>
          <h1 className="mt-7 text-[28px] font-black leading-7 uppercase text-center">
            Organiza torneos <br /> americanos de padel
          </h1>
          <h2 className="mt-3 font-semibold text-sm text-center">
            Un Americano es un torneo de varios partidos cambiando de compañeros donde nos cruzaremos con todos los participantes en un circuito con puntuación
          </h2>
        </header>
        <main className="">
          <section className="flex -mt-8 overflow-x-auto gap-x-2.5 pb-4 scroll-px-3 snap-x px-4">
            <div className="snap-start rounded-md shadow-card border border-white bg-[#f2f2f2] p-4 text-gray-900 w-full min-w-[160px] space-y-3.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20H4V4" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="inline-block text-base font-medium">Ranking en tiempo real</span>
            </div>
            <div className="snap-start rounded-md shadow-card border border-white bg-[#f2f2f2] p-4 text-gray-900 w-full min-w-[160px] space-y-3.5">
              <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18V17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17V18" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 18V17C1 15.3431 2.34315 14 4 14" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="inline-block text-base font-medium">Invita a tus compañeros</span>
            </div>
            <div className="snap-start rounded-md shadow-card border border-white bg-[#f2f2f2] p-4 text-gray-900 w-full min-w-[160px] space-y-3.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="inline-block text-base font-medium">Personaliza tu torneo</span>
            </div>
            <div className="snap-start rounded-md shadow-card border border-white bg-[#f2f2f2] p-4 text-gray-900 w-full min-w-[160px] space-y-3.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9V7C22 5.89543 21.1046 5 20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H12M22 9H6M22 9V13" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.9995 16.05C20.3643 15.402 19.4791 15 18.5 15C16.567 15 15 16.567 15 18.5C15 19.4539 15.3816 20.3187 16.0005 20.95M20.9995 16.05C21.6184 16.6813 22 17.5461 22 18.5C22 20.433 20.433 22 18.5 22C17.5209 22 16.6357 21.598 16.0005 20.95M20.9995 16.05L16.0005 20.95" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="inline-block text-base font-medium">Gratis, sin ningún coste</span>
            </div>
          </section>
          <section className="px-4 border-t border-b py-7 mt-3">
            <Typography variant="h4">¡Crea tu primer torneo!</Typography>
            <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
              <div>
                <InputLabel value="¿Cuántas personas vais a jugar?" />

                <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 4 })} onClick={() => {
                    const newData = {
                      number_of_players: 4,
                      courts: 1,
                    };
                    setData({ ...data, ...newData });
                  }}>4</Button>
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 8 })} onClick={() => {
                    const newData = {
                      number_of_players: 8,
                      courts: 2,
                    };
                    setData({ ...data, ...newData });
                  }}>8</Button>
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.number_of_players === 12 })} onClick={() => {
                    const newData = {
                      number_of_players: 12,
                      courts: 3,
                    };
                    setData({ ...data, ...newData });
                  }}>12</Button>
                </ButtonGroup>
              </div>

              <div>
                <InputLabel value="¿En cuántas pistas vais a jugar?" />

                <ButtonGroup fullWidth variant="outlined" ripple className="mt-1.5">
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 1 })} onClick={() => setData('courts', 1)}>1</Button>
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 2 })} onClick={() => setData('courts', 2)}>2</Button>
                  <Button type="button" className={classNames("text-sm border-gray-300 hover:opacity-90 active:opacity-95", { "bg-gray-800 text-white": data.courts === 3 })} onClick={() => setData('courts', 3)}>3</Button>
                </ButtonGroup>
                {data.number_of_players && <Typography variant="small" className="mt-0.5" color="gray">Para {data.number_of_players} jugadores te recomendamos jugar en {data.number_of_players == 4 ? '1' : data.number_of_players === 8 ? '2' : '3'} {data.courts === 1 ? 'pista' : 'pistas'}</Typography>}
              </div>

              <Button type="submit" variant="gradient" color="light-green" fullWidth disabled={data.name === '' || (data.number_of_players > 4 && data.courts === null)}>Organizar torneo</Button>
            </form>
          </section>
          <section className="px-4 mt-4">
            <Typography className="text-light-green-800 font-medium">Simplifica la organización</Typography>
            <Typography variant="h4" className="text-gray-900 leading-7">Organiza torneos de una manera sencilla e intuitiva</Typography>
            <Typography className="mt-1 text-gray-700 text-sm font-normal">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
            </Typography>
            <div>
              <div className="flex items-center space-x-2 mt-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20H4V4" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#689F38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="inline-block text-base font-medium">Ranking en tiempo real</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 mt-3">
                <div className="w-full h-44 bg-gray-800 rounded-md border border-gray-300" />
                <Typography className="text-gray-700 text-sm">
                  Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
                  Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
                </Typography>
              </div>
            </div>
          </section>
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
