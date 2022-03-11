import { PointerEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';
import { useCallbackRef } from 'use-callback-ref';

export type Props = {
  width?: number;
  height?: number;
};

type Point = {
  x: number;
  y: number;
};

const getCanvasPoint = (e: PointerEvent<HTMLCanvasElement>) => {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.top) / rect.width * canvas.width,
    y: (e.clientY - rect.left) / rect.height * canvas.height,
  };
};

const drawFrame = (ctx: CanvasRenderingContext2D, stroke: Point[]): number | undefined => {
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

const roundNum = (n: number): number => Math.trunc(n * 10) / 10;
const roundPoint = ({ x, y }: Point): Point => ({ x: roundNum(x), y: roundNum(y) });

export const SvgCanvas: VFC<Props> = ({
  width = 640, height = 640
}: Props) => {
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const canvasRef = useCallbackRef<HTMLCanvasElement>(null, (el) => {
    canvasContextRef.current = el?.getContext('2d') ?? undefined;
  });
  const stroke = useRef<Point[]>([]);
  const pointerId = useRef<number>();
  const renderingCallbackId = useRef<number>();
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const onStrokeBegin = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (canvasRef.current === null) throw new Error('Unexpected Error: Canvas element is null');
    canvasRef.current.setPointerCapture(e.pointerId);
    pointerId.current = e.pointerId;
    stroke.current = [getCanvasPoint(e)];
  }, [canvasRef]);
  const onStrokeMove = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (canvasRef.current === null) throw new Error('Unexpected Error: Canvas element is null');
    if (e.pointerId !== pointerId.current) return;
    stroke.current.push(getCanvasPoint(e));
  }, [canvasRef]);
  const onStrokeEnd = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (canvasRef.current === null) throw new Error('Unexpected Error: Canvas element is null');
    if (e.pointerId !== pointerId.current) return;
    canvasRef.current.releasePointerCapture(e.pointerId);
    pointerId.current = undefined;
    console.log(strokes, stroke);
    setStrokes((s) => [...s, stroke.current]);
    setTimeout(() => stroke.current = [], 0);
  }, [canvasRef, strokes]);

  useEffect(() => {
    const render = () => {
      const ctx = canvasContextRef.current;
      if (ctx === undefined) return;
      drawFrame(ctx, stroke.current);
      renderingCallbackId.current = window.requestAnimationFrame(render);
    };
    renderingCallbackId.current = window.requestAnimationFrame(render);
    return () => {
      if (renderingCallbackId.current !== undefined) window.cancelAnimationFrame(renderingCallbackId.current);
    }
  }, []);
  return (
    <div style={{ position: 'relative', width: '50vmin', height: '50vmin' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', position: 'absolute' }}>
        {strokes.map((stroke, k) => {
          const d = stroke.map(roundPoint).map(({ x, y }, i) => `${i === 0 ? 'M' : ''}${x},${y}`).join(' ');
          return <path fill="none" stroke="#000" strokeWidth={5} strokeLinecap="round" strokeLinejoin='round' key={k} d={d} />;
        })}
      </svg>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        onPointerDown={onStrokeBegin}
        onPointerMove={onStrokeMove}
        onPointerUp={onStrokeEnd}
      />
    </div>
  );
};
