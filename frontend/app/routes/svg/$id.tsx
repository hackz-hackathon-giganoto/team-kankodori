import { LoaderFunction } from 'remix';
import { getItemById } from '~/data/getItemById';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (id === undefined) {
    throw new Response('address is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const item = await getItemById(id);
  const svg = await fetch(item.svg_url);
  return svg;
};
