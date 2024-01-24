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


export default function Show({ squad }) {
  const { auth } = usePage().props

  const header = (
      <>
        <div>
          <Typography variant="h3">{squad.name}</Typography>
          <Typography variant="small" className="-mt-2 text-gray-500">Grupo de padel</Typography>
        </div>
        <Link href={route('tournament.create', { squad })}>
          <Button variant="gradient" size="sm" color="light-green" ripple>Crear torneo</Button>
        </Link>
      </>
  );

  return (
    <>
      <Head title="Torneos" />
      <AppLayout header={header}>
        {squad.tournaments.map((tournament, key) => {
          return (
            <Card key={tournament.id} className={classNames("border-gray-200 rounded-none border-l-0 border-r-0 bg-white/70", { 'border-t-0': key === 0, 'border-t': key > 0 })} shadow={false}>
              <CardBody>
                <Typography variant="h4">{tournament.name}</Typography>
                {/* <Typography variant="paragraph">¡Bienvenidos al Torneo Navideño de Pádel de Afterwork! 🎾🎄</Typography> */}

                <Link href={route('tournament.show', { squad, tournament })} className="block mt-5">
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