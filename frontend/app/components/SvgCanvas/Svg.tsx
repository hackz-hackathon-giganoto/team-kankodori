import { CSSProperties } from 'react';
import {
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  strokeLineWidth,
} from './constants';
import { Control } from './types';
import { controlsToStrokes } from './utils';

export type Props = {
  width: number;
  height: number;
  style?: CSSProperties;
  className?: string;
  controls: Control[];
  BackgroundSvg?: () => JSX.Element;
};

export const Svg = ({
  width,
  height,
  style,
  className,
  controls,
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
      {controlsToStrokes(controls).map((stroke, k) => {
        const d = stroke.points
          .map(({ x, y }, i) => `${i === 0 ? 'M' : ''}${x},${y}`)
          .join(' ');
        return <path key={k} d={d} />;
      })}
    </g>
  </svg>
);
