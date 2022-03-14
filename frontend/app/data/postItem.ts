import { API_ENDPOINT } from './constants';
import { Item, Post } from './types';

export const postItem = async (post: Post): Promise<Item> => {
  const url = new URL(`${API_ENDPOINT}/item`);
  const encoded = Buffer.from(post.svg).toString('base64');
  console.log(encoded);
  const res = await fetch(url.href, {
    method: 'POST',
    body: '',
  });
  if (res.status !== 200) {
    throw new Error('fetch error');
  }
  const data = await res.json();
  console.log(data);
  return data as Item;
};
