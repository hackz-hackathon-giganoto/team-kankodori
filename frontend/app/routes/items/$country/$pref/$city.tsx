import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import type { MetaFunction } from 'remix';
import type { Item, Address } from '~/data/types';
import { getItemByAddress } from '~/data/getItemByAddress';
import { ItemDetails } from '~/components/ItemDetails';

export const loader: LoaderFunction = async ({ params }) => {
  if (
    params.country === undefined ||
    params.pref === undefined ||
    params.city === undefined
  ) {
    throw new Response('params is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  try {
    const address: Address = {
      country: params.country,
      pref: params.pref,
      city: params.city,
    };
    const item = await getItemByAddress(address);
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
  return {
    title: 'inolが成就しますように',
    'og:title': 'inol',
    'og:image': ogImage,
    'twitter:image': ogImage,
  };
};

export default function Inol() {
  const navigate = useNavigate();
  const item = useLoaderData<Item>();

  const onOutsideClick = () => {
    navigate('../..');
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      onClick={onOutsideClick}
    >
      <ItemDetails item={item} />
    </div>
  );
}
