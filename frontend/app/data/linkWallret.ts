import { API_ENDPOINT } from './constants';
import { Wallet } from './types';

export const linkWallet = async ({ user_id, nft_id }: Wallet) => {
  const url = new URL(`${API_ENDPOINT}/item`);
  const input = {
    user_id,
    nft_id,
  };
  const res = await fetch(url.href, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (res.status !== 200) {
    throw new Error('fetch error');
  }

  return res;
};
