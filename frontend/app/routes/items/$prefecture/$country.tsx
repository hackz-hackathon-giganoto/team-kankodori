import { Link, Outlet } from 'remix';

export default function Inols() {
  return (
    <main>
      <h1>一覧を見るページ</h1>
      <p>グリッドで表示</p>

      <Link to="/items/1/1/1">最初のイノりを見る</Link>
      <Outlet />
    </main>
  );
}
