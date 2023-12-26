import { Link } from "@inertiajs/react"
import { Button, Card, CardBody, Chip, Typography } from "@material-tailwind/react"

export default function Show({ squad }) {
  console.log('squad', squad)

  return (
    <div className="max-w-sm mx-auto mt-5 px-6">
      <div className="w-full flex justify-between items-center">
        <Typography variant="h3">{squad.name}</Typography>
        <Link href={route('tournament.create', { squad })}>
          <Button variant="outlined" size="sm" color="light-green" ripple>Crear torneo</Button>
        </Link>
      </div>
      <div className="mt-5">
        {squad.tournaments.map(tournament => {
          return (
            <Card key={tournament.id} className="border border-gray-200" shadow={false}>
              <CardBody>
                <Typography variant="h4">{tournament.name}</Typography>
                <Link href={route('tournament.show', { squad, tournament })} className="block mt-5">
                  <Button variant="text" className="flex items-center gap-2 px-0 py-0">
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
      </div>
    </div>
  )
}