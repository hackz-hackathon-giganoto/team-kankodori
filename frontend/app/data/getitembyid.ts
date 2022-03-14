import { constant } from './constant';
import { Item } from './types';

export const getItemById = async (id: string): Promise<Item> => {
  const url = new URL(`${constant.api_url}/item/${id}`);
  const res = await fetch(url.href);
  console.log(res.status);
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const data = await res.json();
  return data as Item;
};
