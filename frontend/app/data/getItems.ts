import { API_ENDPOINT } from './constants';
import { Address, Item } from './types';

export const getItems = async (
  address: Omit<Address, 'city'>,
): Promise<Item[]> => {
  const url = new URL(
    `${API_ENDPOINT}/items/${address.country}/${address.pref}`,
  );
  const res = await fetch(url.href);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const items = await res.json();
  return items as Item[];
};
