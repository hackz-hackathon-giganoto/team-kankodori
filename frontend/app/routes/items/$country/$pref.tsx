import { json, Link, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { getItems } from '~/data/getItems';
import { Address, Item } from '~/data/types';

export const loader: LoaderFunction = async ({ params }) => {
  if (params.country === undefined || params.pref === undefined) {
    throw new Response('params is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  try {
    const items = getItems({
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

export default function Inols() {
  const items = useLoaderData<Item[]>();
  return (
    <main>
      <h1>一覧を見るページ</h1>
      <p>グリッドで表示</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.svg_url} alt="test"></img>
          </li>
        ))}
      </ul>

      <Link to="/items/5/5/5">最初のイノりを見る</Link>
      <Outlet />
    </main>
  );
}
