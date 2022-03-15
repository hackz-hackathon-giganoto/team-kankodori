import { Link } from 'remix';
import { Logo } from '~/components/Logo';
import { areas } from '~/utils/areas';

export default function CountrySelector() {
  return (
    <main className="h-full w-full">
      <h1>
        <Logo className="w-1/3" />
      </h1>
      <ul className="text-[12vw]">
        {areas.map(({ name, color }, i) => (
          <li
            key={name}
            className="hover:translate-x-[2.5vw] transition-transform"
          >
            <Link to={`./${i + 1}`} className="flex">
              <div className="w-[5vw]" style={{ backgroundColor: color }} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
