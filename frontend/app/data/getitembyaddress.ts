import { Address, Item } from './type';

export async function getItemByAddress(address: Address): Promise<Item> {
  if (
    address.country === undefined ||
    address.pref === undefined ||
    address.city === undefined
  ) {
    console.log('error');
    throw new Response('address is not defind', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  console.log(address);
  const url = new URL(
    `https://api.inol.cf/v1/item/${address.country}/${address.pref}/${address.city}`,
  );
  const res = await fetch(url.href);
  console.log(res);
  if (res.status !== 200) {
    throw new Response('fetch error', {
      status: res.status,
      statusText: res.statusText,
    });
  }
  const data = await res.json();
  return data as Item;
}
