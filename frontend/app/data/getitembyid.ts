import { API_ENDPOINT } from './constants';
import { Item } from './types';

export const getItemById = async (id: string): Promise<Item> => {
  const url = new URL(`${API_ENDPOINT}/item/${id}`);
  const res = await fetch(url.href);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const data = await res.json();
  return data as Item;
};
