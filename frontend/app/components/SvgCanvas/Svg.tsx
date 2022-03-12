import { CSSProperties } from 'react';
import {
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  strokeLineWidth,
} from './constants';
import { Stroke } from './types';

export type Props = {
  width: number;
  height: number;
  style?: CSSProperties;
  className?: string;
  strokes: Stroke[];
  BackgroundSvg?: () => JSX.Element;
};

export const Svg = ({
  width,
  height,
  style,
  className,
  strokes,
  BackgroundSvg,
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {BackgroundSvg && <BackgroundSvg />}
    <g
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeLineWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      {strokes.map((stroke, k) => {
        const d = stroke
          .map(({ x, y }, i) => `${i === 0 ? 'M' : ''}${x},${y}`)
          .join(' ');
        return <path key={k} d={d} />;
      })}
    </g>
  </svg>
);
