import { Dispatch, MutableRefObject, useRef, useState } from 'react';
import { Point, Stroke } from './types';

export const usePointerIdRef = (): [
  Readonly<MutableRefObject<number | undefined>>,
  Dispatch<number | undefined>,
] => {
  const pointerIdRef = useRef<number>();
  return [
    pointerIdRef,
    (id) => {
      pointerIdRef.current = id;
    },
  ];
};

export const useStrokes = (
  initialStrokes: Stroke[] = [],
): [Stroke[], React.Dispatch<Stroke>] => {
  const [strokes, setStrokes] = useState<Stroke[]>(initialStrokes);
  return [strokes, (stroke: Stroke) => setStrokes((s) => [...s, stroke])];
};

export const useStrokeRef = (): {
  strokeRef: Readonly<MutableRefObject<Stroke>>;
  appendPoint: Dispatch<Point>;
  setStroke: Dispatch<Point[]>;
} => {
  const strokeRef = useRef<Stroke>([]);
  return {
    strokeRef,
    appendPoint: (point: Point) => {
      strokeRef.current = [...strokeRef.current, point];
    },
    setStroke: (points: Point[]) => {
      strokeRef.current = [...points];
    },
  };
};
