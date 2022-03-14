import { Item } from './type';

export async function getItemById(id: string | undefined): Promise<Item> {
  if (id === undefined) {
    throw new Response('address is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const url = new URL(`https://api.inol.cf/v1/item/${id}`);
  const res = await fetch(url.href);
  console.log(res.status);
  if (res.status !== 200) {
    throw new Response('fetch error', {
      status: res.status,
      statusText: res.statusText,
    });
  }
  const data = await res.json();
  return data as Item;
}
