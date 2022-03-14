import { json, Link, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { getItems } from '~/data/getItems';
import { Item } from '~/data/types';

const prefCount = 6;

export const loader: LoaderFunction = async ({ params }) => {
  const { country } = params;
  if (country === undefined) throw new Error('Unexpected error ($country)');
  const results = await Promise.allSettled(
    Array(prefCount)
      .fill(0)
      .map((_, i) => getItems({ country, pref: `${i + 1}` })),
  );
  const items = results.map((result) =>
    result.status === 'fulfilled' ? result.value : [],
  );
  // // mock
  // const items = Array(prefCount)
  //   .fill(0)
  //   .map((_, y) =>
  //     Array(prefCount)
  //       .fill(0)
  //       .map((_, x) => ({
  //         name: `${country}-${y + 1}-${x + 1}`,
  //         country,
  //         pref: `${y + 1}`,
  //         city: `${x + 1}`,
  //         svg_url:
  //           'https://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg',
  //       })),
  //   );
  return json(items);
};

export default function Country() {
  const itemsArray = useLoaderData<Item[][]>();
  return (
    <>
      <main className="h-full w-full relative">
        {itemsArray.flatMap((items) =>
          items.map((item) => (
            <div
              key={item.name}
              className="absolute w-[30%]"
              style={{
                top: `${(Number(item.city) - 1) * 12}%`,
                left: `${(Number(item.pref) - 1) * 14}%`,
              }}
            >
              <Link to={`./${item.pref}/${item.city}`}>
                <img src={item.svg_url} alt={item.name} />
              </Link>
            </div>
          )),
        )}
      </main>
      <Outlet />
    </>
  );
}
