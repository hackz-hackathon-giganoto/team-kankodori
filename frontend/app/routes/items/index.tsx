import { Link } from 'remix';
import { Logo } from '~/components/Logo';

export default function CountrySelector() {
  return (
    <main className="h-full w-full">
      <h1>
        <Logo className="w-1/4" />
      </h1>
      <ul className="text-[7.5vw]">
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./1" className="flex">
            <div className="w-[5vw] bg-red-700" />
            其の壱
          </Link>
        </li>
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./2" className="flex">
            <div className="w-[5vw] bg-orange-700" />
            其の弐
          </Link>
        </li>
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./3" className="flex">
            <div className="w-[5vw] bg-yellow-600" />
            其の参
          </Link>
        </li>
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./4" className="flex">
            <div className="w-[5vw] bg-green-700" />
            其の肆
          </Link>
        </li>
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./5" className="flex">
            <div className="w-[5vw] bg-blue-700" />
            其の伍
          </Link>
        </li>
        <li className="hover:translate-x-[2.5vw] transition-transform">
          <Link to="./6" className="flex">
            <div className="w-[5vw] bg-purple-800" />
            其の陸
          </Link>
        </li>
      </ul>
    </main>
  );
}
