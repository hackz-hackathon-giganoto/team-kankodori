import { CSSProperties, FC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
  ping?: boolean;
};

export const Circle: FC<Props> = ({ className = '', style, children }) => (
  <div className={`rounded-full aspect-square ${className}`} style={style}>
    {children}
  </div>
);
