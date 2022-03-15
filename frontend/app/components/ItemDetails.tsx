import { useEffect, useState, VFC } from 'react';
import { Link } from 'remix';
import { Item } from '~/data/types';
import { areas } from '~/utils/areas';

export const ItemDetails: VFC<{ item: Item }> = ({ item }) => {
  const [createdAt, setCreatedAt] = useState(
    new Date(item.created_at).toLocaleString(),
  );
  useEffect(() => {
    setCreatedAt(new Date(item.created_at).toLocaleString());
  }, [item.created_at]);
  return (
    <article
      className="w-11/12 px-4 py-4 bg-slate-50 rounded-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-2xl font-bold flex items-center gap-2">
        {item.name}
        <Link
          to={`/items/${item.country}`}
          className="block text-white text-sm rounded-md p-1"
          style={{ backgroundColor: areas[item.country - 1].color }}
        >
          {areas[item.country - 1].name}
        </Link>
      </h3>
      <pre className="text-sm">created at: {createdAt}</pre>
      <p className="flex justify-center">
        <img src={item.svg_url} alt={item.name} />
      </p>
    </article>
  );
};
