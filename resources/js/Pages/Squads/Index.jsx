
export default function Index({ squads }) {
  console.log('squads', squads)

  /** NOT USED */

  return (
    <div className="max-w-sm mx-auto mt-5 px-6">
      <div>
        {squads.map(squad => {
          return (
            <div key={squad.id}>
              {squad.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}