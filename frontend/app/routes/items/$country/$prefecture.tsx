import { useDrag } from '@use-gesture/react';
import { Link, Outlet, useLocation, useNavigate } from 'remix';

export default function Items() {
  const navigate = useNavigate();
  const location = useLocation();
  const bind = useDrag(({ movement, cancel, active }) => {
    const [, my] = movement;
    const path = location.pathname.match(/(.+)\/(\d+)\/?$/i);
    if (path === null) throw Error('Unexpected error');

    const [, rest, current] = path;
    const city = Number(current);
    console.log({ rest, current });
    if (my > 40) {
      if (city < 2) return;
      cancel();
      console.log('-1');
      navigate(`${rest}/${Number(current) - 1}`);
    } else if (my < -40) {
      cancel();
      console.log('+1');
      navigate(`${rest}/${Number(current) + 1}`);
    }
  });
  return (
    <>
      <main className="w-full h-full" {...bind()}>
        <div className="overflow-x-auto flex touch-pan-x">
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
          <Link
            to="./1"
            className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
          >
            item svg
          </Link>
        </div>
      </main>
      <Outlet />
    </>
  );
}
