import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { getItemById } from '~/data/getItemById';
import { Item } from '~/data/types';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const id: string | undefined = params.id;
    if (id === undefined) {
      throw new Response('address is not defind', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    const item = getItemById(id);
    return item;
  } catch (e) {
    console.error(e);
    throw new Response('loader error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'inol',
    description: 'PRAY WITH YOU, PRAY WITH ME',
    url: `https://inol.cf/item/${data.id}`,
    image: `https://svg2png.deno.dev/${data.svg_url}`,
  };
};

export default function Inol() {
  const item = useLoaderData<Item>();
  return (
    <main>
      <h1>単体で見るページ</h1>
      <p>OGP画像とかが生える</p>
      <img src={item.svg_url} alt="test" />
    </main>
  );
}
