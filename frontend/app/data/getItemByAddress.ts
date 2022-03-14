import { API_ENDPOINT } from './constants';
import { Address, Item } from './types';

export const getItemByAddress = async (address: Address): Promise<Item> => {
  const url = new URL(
    `${API_ENDPOINT}/item/${address.country}/${address.pref}/${address.city}`,
  );
  const res = await fetch(url.href);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const data = await res.json();
  return data as Item;
};
