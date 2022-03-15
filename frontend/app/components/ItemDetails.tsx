import { VFC } from 'react';
import { Item } from '~/data/types';

export const ItemDetails: VFC<{ item: Item }> = ({ item }) => (
  <article
    className="w-11/12 px-4 py-4 bg-slate-50 rounded-2xl"
    onClick={(e) => e.stopPropagation()}
  >
    <h3 className="text-2xl font-bold">{item.name}</h3>
    <p className="flex justify-center">
      <img src={item.svg_url} alt={item.name} />
    </p>
  </article>
);
