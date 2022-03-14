import type { Params } from 'react-router';

export async function getItemByCity(params: Params<string>) {
  const url = new URL(
    `https://api.inol.cf/v1/item/${params.country}/${params.prefecture}/${params.city}`,
  );
  const item = await fetch(url.href);
  return item;
}
