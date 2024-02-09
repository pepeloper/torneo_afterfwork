import { Avatar } from "@material-tailwind/react";

export default function AppAvatar({ user }) {
  const stringToHslColor = (str, s = 50, l = 60) => {
    if (str.startsWith('Jugador')) {
      str = (Math.random() + 1).toString(36).substring(7);
    }
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  const getInitials = (name) => {
    const [first, second] = name.split(' ');
    if (first && second) {
      return `${first.charAt(0)}${second.charAt(0)}`
    }

    return `${first.charAt(0)}${first.charAt(1)}`
  }

  return (
    <div>
      {user.photo ?
        <Avatar key={user.id} src={user.photo} className="border border-white hover:z-10 focus:z-10" /> :
        <div
          className="uppercase text-sm font-semibold border bg-gray-700 border-white hover:z-10 focus:z-10 rounded-full w-10 h-10 flex items-center justify-center text-white"
          style={user.name.startsWith('Jugador') ? null : { backgroundColor: stringToHslColor(user.name) }}
        >
          <span>{getInitials(user.name)}</span>
        </div>
      }
      {/* w-12 h-12 */}
    </div>
  )
};
