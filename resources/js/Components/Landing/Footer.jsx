import { Link } from "@inertiajs/react"

const navigation = {
  solutions: [
    { name: 'Torneo para 4 jugadores', href: route('onboarding', { number: 4 }) },
    { name: 'Torneo para 8 jugadores', href: route('onboarding', { number: 8 }) },
    { name: 'Torneo para 12 jugadores', href: route('onboarding', { number: 12 }) },
  ],
  legal: [
    { name: 'Iniciar sesión', href: route('login') },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white w-full border-t border-gray-300 py-5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto container flex flex-col items-center justify-between">
        <h3 className="text-base font-medium leading-6 text-gray-900 text-center">Torneos Americanos de padel</h3>
        <ul role="list" className="mt-3 space-y-4 text-center">
          {navigation.solutions.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a href="mailto:pgarciag93@gmail.com?Subject=Torneos%20Americanos%20Padel" target="_blank" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
