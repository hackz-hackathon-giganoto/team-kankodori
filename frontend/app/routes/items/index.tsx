import { Link } from 'remix';
import { Circle } from '~/components/Circle';

export default function CountrySelectScreen() {
  return (
    <div className="font-bold text-[20vw]">
      <Link
        to="./1"
        className="fixed rounded-full w-[70%] top-[-10%] left-[-10%]"
      >
        <Circle
          className={`
            bg-red-600/80
            animate-[heart_1.1s_ease_1s_infinite]
          `}
        />
      </Link>
      <Link
        to="./2"
        className="fixed rounded-full w-[50%] top-[-10%] left-[45%]"
      >
        <Circle
          className={`
            bg-orange-500/80
            animate-[heart_1s_ease_0.3s_infinite]
          `}
        />
      </Link>
      <Link to="./5" className="fixed rounded-full w-2/5 top-[30%] left-[40%]">
        <Circle
          className={`
            bg-blue-500/80
            animate-[heart_0.9s_ease_0.5s_infinite]
          `}
        />
      </Link>
      <Link
        to="./6"
        className="fixed rounded-full w-[60%] top-[55%] left-[50%]"
      >
        <Circle
          className={`
            bg-purple-700/80
            animate-[heart_1s_ease_0.6s_infinite]
          `}
        />
      </Link>
      <Link
        to="./3"
        className="fixed rounded-full w-[40%] top-[20%] left-[70%]"
      >
        <Circle
          className={`
            bg-yellow-400/80
            animate-[heart_1.4s_ease_0s_infinite]
          `}
        />
      </Link>
      <Link
        to="./4"
        className="fixed rounded-full w-[60%] top-[40%] left-[-10%]"
      >
        <Circle
          className={`
            bg-green-600/80
            animate-[heart_1.6s_ease_0.9s_infinite]
          `}
        />
      </Link>
    </div>
  );
}
