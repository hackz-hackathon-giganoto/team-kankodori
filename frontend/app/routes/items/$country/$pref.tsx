import { useDrag } from '@use-gesture/react';
import {
  json,
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'remix';
import { getItems } from '~/data/getItems';
import { Item } from '~/data/types';

export const loader: LoaderFunction = async ({ params }) => {
  if (params.country === undefined || params.pref === undefined) {
    throw new Response('params is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  try {
    const items = await getItems({
      country: params.country,
      pref: params.pref,
    });
    return json(items);
  } catch (e) {
    console.error(e);
    throw new Response('loader error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

const parseLocation = (
  loc: ReturnType<typeof useLocation>,
): [string, string] => {
  const path = loc.pathname.match(/(.+)\/(\d+)\/?$/i);
  if (path === null) throw Error('Unexpected error');
  const [, rest, current] = path;
  return [rest, current];
};

const dragThreshold = 40;

export default function Items() {
  const data = useLoaderData<Item[]>();
  const navigate = useNavigate();
  const location = useLocation();
  const bind = useDrag(({ movement, cancel }) => {
    const [, my] = movement;
    if (Math.abs(my) <= dragThreshold) return;

    const [rest, current] = parseLocation(location);
    const city = Number(current);
    if (my > 0) {
      if (city < 2) return;
      cancel();
      console.log('-1');
      setTimeout(() => navigate(`${rest}/${Number(current) - 1}`), 100);
    } else if (my < 0) {
      cancel();
      console.log('+1');
      setTimeout(() => navigate(`${rest}/${Number(current) + 1}`), 100);
    }
  });
  return (
    <>
      <main className="w-full h-full" {...bind()}>
        <div className="overflow-x-auto flex touch-pan-x gap-[-10%]">
          {data.map(({ svg_url, city, name }) => (
            <Link
              key={name}
              to={`./${city}`}
              className="aspect-square w-2/3 flex-shrink-0 flex-grow-0"
            >
              <img src={svg_url} alt="祈り" />
            </Link>
          ))}
        </div>
      </main>
      <Outlet />
    </>
  );
}
