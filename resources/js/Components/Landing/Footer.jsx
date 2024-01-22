import { Link } from "@inertiajs/react"

const navigation = {
  solutions: [
    { name: 'Torneo 4 jugadores', href: route('onboarding', { number: 4 }) },
    { name: 'Torneo 8 jugadores', href: route('onboarding', { number: 8 }) },
    { name: 'Torneo 12 jugadores', href: route('onboarding', { number: 12 }) },
  ],
  legal: [
    { name: 'Iniciar sesión', href: route('login') },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white w-full" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto container flex items-start justify-between">
        <div className="w-1/2 text-center">
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Torneos Padel Americano</h3>
            <ul role="list" className="mt-3 space-y-4">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
        </div>
        <div className="w-1/2 text-center">
          <h3 className="text-sm font-semibold leading-6 text-gray-900">Sobre nosotros</h3>
          <ul role="list" className="mt-3 space-y-4">
            {navigation.legal.map((item) => (
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
      </div>
    </footer>
  )
}
