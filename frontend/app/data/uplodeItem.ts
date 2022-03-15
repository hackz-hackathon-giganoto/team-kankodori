import { API_ENDPOINT } from './constants';
import { Item, ItemInput } from './types';

export const uplodeItem = async ({ owner, svg }: ItemInput): Promise<Item> => {
  const url = new URL(`${API_ENDPOINT}/item/`);

  const res = await fetch(url.href, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      owner,
      svg: btoa(svg),
    }),
  });

  if (res.status !== 200) {
    throw new Error('fetch error');
  }

  const data = await res.json();
  return data as Item;
};
