import AppAvatar from "@/Components/AppAvatar";

export default function FakeGameCard({ game, onClick, activeGame }) {
  return (
    <>
      <div className="bg-gray-100 rounded-lg py-4 px-3 flex flex-col transition-all duration-500">
        <div className="flex justify-between">
          <div className="flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col justify-center items-center">
                <AppAvatar user={game.users[0]} />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[0].name}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <AppAvatar user={game.users[1]} />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[1].name}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-400/50 w-px min-h-full" />
          <div className="flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col justify-center items-center">
                <AppAvatar user={game.users[2]} />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[2].name}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <AppAvatar user={game.users[3]} />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[3].name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-2 px-4 flex justify-center">
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Sin resultado
            </span>
        </div>
      </div>
    </>
  );
}
