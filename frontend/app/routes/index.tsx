import { Link } from 'remix';

export default function Index() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>
        <li>
          <Link to="/new">イノる</Link>
        </li>
        <li>
          <Link to="/items/1/1">みんなのイノりを見る</Link>
        </li>
      </ul>
    </div>
  );
}
