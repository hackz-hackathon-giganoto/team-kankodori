import { CSSProperties, VFC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
};

export const Hinomaru: VFC<Props> = ({ className = '', style }) => (
  <div
    className={`bg-red-600 rounded-full aspect-square ${className}`}
    style={style}
  />
);
