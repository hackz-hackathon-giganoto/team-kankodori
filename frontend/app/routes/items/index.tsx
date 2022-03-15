import { Link } from 'remix';

export default function CountrySelector() {
  return (
    <main className="h-full w-full">
      <div className="overflow-x-auto flex touch-pan-x">
        <Link
          to="./1"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
        <Link
          to="./2"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
        <Link
          to="./3"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
        <Link
          to="./4"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
        <Link
          to="./5"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
        <Link
          to="./6"
          className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
        >
          絵馬掛所の絵？？？？
        </Link>
      </div>
    </main>
  );
}
