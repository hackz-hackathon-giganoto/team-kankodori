import { CSSProperties, VFC } from 'react';
import { Link } from 'remix';

export type Props = {
  className?: string;
  style?: CSSProperties;
};

const links = [
  {
    to: '/new',
    el: (
      <span className="text-[10vw]">
        <span className="text-[12vw]">祈</span>りを
        <span className="text-[12vw]">書</span>く
      </span>
    ),
  },
  {
    to: '/items',
    el: (
      <span className="text-[10vw]">
        <span className="text-[12vw]">祈</span>りを
        <span className="text-[12vw]">見</span>る
      </span>
    ),
  },
];

export const Menu: VFC<Props> = ({ className, style }) => (
  <div className={className} style={style}>
    <ul className="text-[#492d22] font-bold">
      {links.map(({ to, el }) => (
        <li key={to} className="text-right">
          <Link to={to}>{el}</Link>
        </li>
      ))}
    </ul>
  </div>
);
