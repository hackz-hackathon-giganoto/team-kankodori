import { CSSProperties, FC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => unknown;
};

export const Button: FC<Props> = ({ onClick, style, className, children }) => (
  <div
    className={`rounded-lg ${className} border-2 border-slate-400 focus:border-indigo-500`}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
);
