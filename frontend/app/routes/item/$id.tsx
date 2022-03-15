import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { ItemDetails } from '~/components/ItemDetails';
import { Logo } from '~/components/Logo';
import { getItemById } from '~/data/getItemById';
import { Item } from '~/data/types';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (id === undefined) throw new Error('Unexpected error (id=null)');
  try {
    const item = await getItemById(id);
    return json(item);
  } catch (e) {
    console.error(e);
    throw new Response('loader error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

export const meta: MetaFunction = ({ data }) => {
  const ogImage = `https://inol.cf/png/${data.id}`;
  const description =
    'PRAY WITH YOU, PRAY WITH ME. インターネット神社inolで祈誓しました';
  return {
    description,
    'og:title': 'inolで祈誓しました',
    'og:description': description,
    'og:image': ogImage,
    'twitter:description': description,
    'twitter:image': ogImage,
  };
};

export default function Inol() {
  const item = useLoaderData<Item>();
  return (
    <>
      <Logo className="w-1/3" />
      <main className="flex justify-center items-center h-4/6">
        <ItemDetails item={item} />
      </main>
    </>
  );
}
