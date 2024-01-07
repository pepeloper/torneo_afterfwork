import classNames from "classnames";

export default function GameCard({ game, onClick, activeGame }) {
  return (
    <>
      <div className={classNames("bg-gray-100 rounded-lg py-4 px-3 flex flex-col transition-all duration-500", { "scale-105": game.id === activeGame?.id })} onClick={() => onClick(game)}>
        <div className="flex justify-between">
          <div className="flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col justify-center items-center">
                <img src={game.users[0].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[0].name}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={game.users[1].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[1].name}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-400/50 w-px min-h-full" />
          <div className="flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col justify-center items-center">
                <img src={game.users[2].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[2].name}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={game.users[3].photo} className="w-11 h-11 z-10 bg-gray-700 rounded-full flex items-center justify-center font-sans text-white text-sm" />
                <p className="text-xs mt-0.5 truncate w-12 text-center text-gray-900">{game.users[3].name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-2 px-4 flex justify-center">
          {game.played ?
            <div className="flex items-end tabular-nums">
              <p className="text-xl font-medium w-8 text-center">{game.users[0].pivot.points_in_favor}</p>
              <p className="w-10 text-center">vs</p>
              <p className="text-xl font-medium w-8 text-center">{game.users[2].pivot.points_in_favor}</p>
            </div>
            :
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Sin resultado
            </span>
          }
        </div>
      </div>
    </>
  );
}
