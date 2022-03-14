import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { getItemById } from '~/data/getitembyid';
import { Item } from '~/data/type';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const id: string | undefined = params.id;
    const item = getItemById(id);
    return item;
  } catch (e) {
    console.error(e);
    throw new Response('loader error', {
      status: 500,
      statusText: 'getItemById could not be done',
    });
  }
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'いい感じのタイトル',
    description: 'いい感じの説明',
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
