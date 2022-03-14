import { API_ENDPOINT } from './constants';
import { Address, Item } from './types';

export const getItems = async (
  address: Omit<Address, 'city'>,
): Promise<Item[]> => {
  console.log(address);
  const url = new URL(
    `${API_ENDPOINT}/items/${address.country}/${address.pref}`,
  );
  const res = await fetch(url.href);
  console.log(res);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const datas = await res.json();
  return datas as Item[];
};
