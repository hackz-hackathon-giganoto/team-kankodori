import { CSSProperties, VFC } from 'react';
import { Link } from 'remix';
import svg from './logo.svg';

export type Props = {
  className?: string;
  style?: CSSProperties;
  link?: boolean;
};

export const Logo: VFC<Props> = ({ className = '', style, link = true }) =>
  link ? (
    <Link to="/" className={`block ${className}`} style={style}>
      <img src={svg} alt="inol" className="w-full" />
    </Link>
  ) : (
    <img src={svg} alt="inol" className={className} style={style} />
  );
