import { API_ENDPOINT } from './constants';
import { Item, ItemInput } from './types';

export const uplodeItem = async ({ owner, svg }: ItemInput): Promise<Item> => {
  const url = new URL(`${API_ENDPOINT}/item`);
  const encoded = Buffer.from(svg).toString('base64');

  const input = {
    owner: owner,
    svg: encoded,
  };

  const res = await fetch(url.href, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (res.status !== 200) {
    throw new Error('fetch error');
  }

  const data = await res.json();
  return data as Item;
};
