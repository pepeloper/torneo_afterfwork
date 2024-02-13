import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props) {
  return (
    <Link {...props} href={route('index')} className="mx-auto inline-flex items-center space-x-2 text-center">
      <span className="sr-only">Americano Padel</span>
      <img className="w-10 h-10 mx-auto" src="/storage/ball.png" alt="Torneospadel Logo" />
      <p className="uppercase font-black text-xl">torneospadel.app</p>
    </Link>
  );
}
