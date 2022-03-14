import type { Params } from 'react-router';

export async function getItemByAddress(params: Params<string>) {
  const url = new URL(
    `https://api.inol.cf/v1/item/${params.country}/${params.prefecture}/${params.city}`,
  );
  const item = await fetch(url.href);
  console.log(item.status);
  if (item.status !== 200) throw new Error('Failed to fetch');
  return item;
}
