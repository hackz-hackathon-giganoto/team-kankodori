import { Link, Outlet } from 'remix';

export default function Inols() {
  return (
    <main>
      <h1>一覧を見るページ</h1>
      <p>グリッドで表示</p>

      <Link to="/items/5/5/5">最初のイノりを見る</Link>
      <Outlet />
    </main>
  );
}