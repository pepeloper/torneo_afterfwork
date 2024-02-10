import ApplicationLogo from "@/Components/ApplicationLogo"
import { Head, Link, usePage } from "@inertiajs/react"
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react"
import classNames from "classnames"
import AppLayout from "@/Layouts/AppLayout"
import AppAvatar from "@/Components/AppAvatar"


export default function Show({ tournaments }) {
  const header = (
      <>
        <div>
          <Typography variant="h5">Mis torneos</Typography>
        </div>
        <Link href={route('tournament.create')}>
          <Button variant="gradient" size="sm" color="light-green" ripple>Crear torneo</Button>
        </Link>
      </>
  );

  return (
    <>
      <Head title="Torneos" />
      <AppLayout header={header}>
        {tournaments.map((tournament, key) => {
          const number_of_players = tournament.users.length;
          const number_of_courts = tournament.groups.length;

          return (
            <Card key={tournament.id} className={classNames("border-gray-200 rounded-none border-l-0 border-r-0 bg-gray-50", { 'border-t-0': key === 0, 'border-t': key > 0 })} shadow={false}>
              <CardBody>
                <Typography variant="h4">Torneo {number_of_players} jugadores en {number_of_courts} {" "} {number_of_courts > 1 ? 'pistas' : 'pista'}</Typography>
                <section className="flex -space-x-3 mt-3">
                  {tournament.users.map(u => <AppAvatar key={u.id} user={u} className="border-2 border-white hover:z-10 focus:z-10" />)}
                </section>

                <Link href={route('tournament.show', { tournament })} className="block mt-5">
                  <Button variant="gradient" className="flex items-center gap-2">
                    Ver torneo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </CardBody>
            </Card>
          )
        })}
      </AppLayout>
    </>
  );

}