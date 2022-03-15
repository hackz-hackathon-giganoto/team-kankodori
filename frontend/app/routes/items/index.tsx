import { Link } from 'remix';

export default function CountrySelector() {
  return (
    <main className="h-full w-full">
      <div className="overflow-x-auto flex touch-pan-x text-[20vw]">
        <Link
          to="./1"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の壱
          </span>
        </Link>
        <Link
          to="./2"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の弐
          </span>
        </Link>
        <Link
          to="./3"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の参
          </span>
        </Link>
        <Link
          to="./4"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の肆
          </span>
        </Link>
        <Link
          to="./5"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の伍
          </span>
        </Link>
        <Link
          to="./6"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          <span className="block rotate-45 -translate-y-1/2 origin-bottom-left">
            其の陸
          </span>
        </Link>
      </div>
    </main>
  );
}
