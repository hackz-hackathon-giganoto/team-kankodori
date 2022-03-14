import { LoaderFunction, useLoaderData } from 'remix';
import type { MetaFunction } from 'remix';
import type { Item } from '~/type/item';

export const loader: LoaderFunction = async ({ params }) => {
  console.log('params', params.country);
  const item = await fetch(
    'https://api.inol.cf/v1/item/' +
      params.country +
      '/' +
      params.prefecture +
      '/' +
      params.city,
  );

  return item;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'いい感じのタイトル',
    description: 'いい感じの説明',
    url: 'https://inol.cf/item/' + data.id,
    image: data.svg_url,
  };
};

export default function SingleInol() {
  const item = useLoaderData<Item>();
  return (
    <div>
      <h1>単体で見るページ</h1>
      <p>OGP画像とかが生える</p>
      <img src={item.svg_url} alt="test" />
      <p></p>
    </div>
  );
}
