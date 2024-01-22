import { Avatar } from "@material-tailwind/react";

export default function AppAvatar({ user }) {
  const stringToHslColor = (str, s = 50, l = 60) => {
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
        <Avatar key={user.id} src={user.photo} className="border-2 border-white hover:z-10 focus:z-10" /> :
        <div className="uppercase text-xs font-medium border-2 border-white hover:z-10 focus:z-10 rounded-full w-10 h-10 flex items-center justify-center text-white" style={{ backgroundColor: stringToHslColor(user.name) }}>
          <span>{getInitials(user.name)}</span>
        </div>
      }
      {/* w-12 h-12 */}
    </div>
  )
};
