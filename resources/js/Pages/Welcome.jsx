import { Link, Head } from '@inertiajs/react';

const stats = [
  { id: 1, name: 'Participantes entre todas las ediciones', value: '+15' },
  { id: 2, name: 'Celebrando el torneo navideño', value: '3 años' },
  { id: 3, name: 'Entregados en premios', value: '+50€' },
  { id: 4, name: 'Disfrutando del padel', value: '+7h' },
]

export default function Welcome({ group, league }) {


  return (
    <>
      <Head title="Torneo Afterwork" />
      <div className="bg-gray-900 min-h-screen">
        <main className="pb-12">
          {/* Hero section */}
          <div className="isolate relative overflow-hidden pb-20">
            <svg
              className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
            <div
              className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
              aria-hidden="true"
            >
              <div
                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80ff88] to-[#46e596] opacity-20"
                style={{
                  clipPath:
                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                }}
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
              <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                <img
                  className="h-11"
                  src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
                  alt="Your Company"
                />
                <div className="mt-12 sm:mt-16 lg:mt-16">
                  <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-light-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-light-green-400 ring-1 ring-inset ring-light-green-500/20">
                      24 Diciembre 2023 - 10:00
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Torneo Americano Afterwork
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  ¡Bienvenidos al Torneo Navideño de Pádel de Afterwork! 🎾🎄
                  <br />
                  Nos vemos en Don Tello el 24 de diciembre a las 10:00. ¡Prepárense para una mañana llena de diversión y competitividad! 🏆
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href={route('group.show', { group })}
                    className="rounded-md bg-light-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-400"
                  >
                    Fase de grupos
                  </Link>
                  {
                    league ?
                      <Link href={route('group.show', { group: league })} className="text-sm font-semibold leading-6 text-white">
                        Ligas finales <span aria-hidden="true">→</span>
                      </Link> : ""
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto -mt-24 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h2 className="text-base font-semibold leading-8 text-light-green-400">Nuestro recorrido</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Navidad tras navidad
              </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                  <dt className="text-sm leading-6">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </main>
      </div>
    </>
  );
}
