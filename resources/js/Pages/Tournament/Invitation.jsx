import Footer from "@/Components/Landing/Footer";
import { Head } from "@inertiajs/react";
import CookieConsent from "react-cookie-consent";

export default function Invitation({ squad, tournament }) {

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
          CONTENIDO
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
