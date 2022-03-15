import type { PointerEvent } from 'react';
import type {
  Point,
  Control,
  Stroke,
  Erase,
  BoundingRect,
  StrokeColor,
} from './types';
import { v4 as uuid } from 'uuid';

const getElementOffset = (
  elem: HTMLElement,
): { offsetLeft: number; offsetTop: number } => {
  let offsetLeft = 0;
  let offsetTop = 0;
  while (true) {
    if (!isNaN(elem.offsetTop)) offsetTop += elem.offsetTop;
    if (!isNaN(elem.offsetLeft)) offsetLeft += elem.offsetLeft;
    if (elem.parentElement === null) break;
    elem = elem.parentElement;
  }
  return { offsetLeft, offsetTop };
};

export const getCanvasPoint = (e: PointerEvent<HTMLCanvasElement>) => {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();
  const { offsetLeft, offsetTop } = getElementOffset(canvas);

  return {
    x: ((e.pageX - offsetLeft) / rect.width) * canvas.width,
    y: ((e.pageY - offsetTop) / rect.height) * canvas.height,
  };
};

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  stroke: Point[],
  color: StrokeColor,
): number | undefined => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (stroke.length < 2) return undefined;
  const [first, ...rest] = stroke;
  ctx.save();
  ctx.strokeStyle = color;
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

export const createControlFromPoints = (
  pts: Point[],
  color: StrokeColor,
): Control => ({
  type: 'pen',
  id: uuid(),
  points: pts,
  color,
});

export const controlsToStrokes = (controls: Control[]): Stroke[] => {
  const strokes: Stroke[] = [];
  const erases: Erase[] = [];
  for (const control of controls) {
    switch (control.type) {
      case 'pen':
        strokes.push(control);
        break;
      case 'eraser':
        erases.push(control);
    }
  }
  const erasedStrokes = erases
    .map(({ erasedStrokeIds }) => erasedStrokeIds)
    .flat();
  return strokes.filter(({ id }) => !erasedStrokes.includes(id));
};

export const getStrokeRect = (stroke: readonly Point[]): BoundingRect => {
  if (stroke.length === 0) throw new Error('Stroke is blank.');
  return stroke.reduce(
    (acc, cur) => ({
      top: acc.top > cur.y ? cur.y : acc.top,
      left: acc.left > cur.x ? cur.x : acc.left,
      bottom: acc.bottom < cur.y ? cur.y : acc.bottom,
      right: acc.right < cur.x ? cur.x : acc.right,
    }),
    {
      top: stroke[0].y,
      left: stroke[0].x,
      bottom: stroke[0].y,
      right: stroke[0].x,
    },
  );
};

export const intersect = (
  [p1, p2]: [Point, Point],
  [p3, p4]: [Point, Point],
): boolean => {
  const s1 = (p1.x - p2.x) * (p3.y - p1.y) - (p1.y - p2.y) * (p3.x - p1.x);
  const t1 = (p1.x - p2.x) * (p4.y - p1.y) - (p1.y - p2.y) * (p4.x - p1.x);
  if (s1 * t1 > 0) return false;
  const s2 = (p3.x - p4.x) * (p1.y - p3.y) - (p3.y - p4.y) * (p1.x - p3.x);
  const t2 = (p3.x - p4.x) * (p2.y - p3.y) - (p3.y - p4.y) * (p2.x - p3.x);
  if (s2 * t2 > 0) return false;
  return isInCollision(getStrokeRect([p1, p2]), getStrokeRect([p3, p4]));
};

export const isInCollision = (
  rect1: BoundingRect,
  rect2: BoundingRect,
): boolean =>
  rect1.left <= rect2.right &&
  rect2.left <= rect1.right &&
  rect1.top <= rect2.bottom &&
  rect2.top <= rect1.bottom;
