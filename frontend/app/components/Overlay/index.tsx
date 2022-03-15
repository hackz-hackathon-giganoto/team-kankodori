import { CSSProperties, VFC } from 'react';
import seikaiha from './seikaiha.svg';

export type Props = {
  className?: string;
  style?: CSSProperties;
};

export const Overlay: VFC<Props> = ({ style = {}, className = '' }) => (
  <div
    className={`top-0 left-0 w-screen h-screen bg-repeat fixed bg-slate-400 ${className}`}
    style={{ ...style, backgroundImage: `url(${seikaiha})` }}
  />
);
