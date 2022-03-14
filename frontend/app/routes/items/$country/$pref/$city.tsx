import { LoaderFunction, useLoaderData } from 'remix';
import type { MetaFunction } from 'remix';
import type { Item, Address } from '~/data/type';
import { getItemByAddress } from '~/data/getitembyaddress';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const address: Address = {
      country: params.country,
      pref: params.pref,
      city: params.city,
    };
    const item = getItemByAddress(address);
    return item;
  } catch (e) {
    throw new Response('loader error', {
      status: 500,
      statusText: 'getItemByAddress could not be done',
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
    <div>
      <h1>単体で見るページ</h1>
      <p>OGP画像とかが生える</p>
      <img src={item.svg_url} alt="test" />
    </div>
  );
}
