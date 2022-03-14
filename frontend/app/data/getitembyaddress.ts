import { constant } from './constant';
import { Address, Item } from './types';

export const getItemByAddress = async (address: Address): Promise<Item> => {
  console.log(address);
  const url = new URL(
    `${constant.api_url}/item/${address.country}/${address.pref}/${address.city}`,
  );
  const res = await fetch(url.href);
  console.log(res);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const data = await res.json();
  return data as Item;
};
