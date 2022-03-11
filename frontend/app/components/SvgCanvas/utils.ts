import type { PointerEvent } from 'react';
import type { Point, Stroke } from './types';

export const getCanvasPoint = (e: PointerEvent<HTMLCanvasElement>) => {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.top) / rect.width) * canvas.width,
    y: ((e.clientY - rect.left) / rect.height) * canvas.height,
  };
};

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
): number | undefined => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (stroke.length < 2) return undefined;
  console.log('rendering');
  const [first, ...rest] = stroke;
  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  rest.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.stroke();
  ctx.restore();
};

export const roundNum = (n: number): number => Math.trunc(n * 10) / 10;
export const roundPoint = ({ x, y }: Point): Point => ({
  x: roundNum(x),
  y: roundNum(y),
});
