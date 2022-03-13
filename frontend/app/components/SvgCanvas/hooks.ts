import { Dispatch, MutableRefObject, useRef, useState } from 'react';
import { Point, Control } from './types';

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

export const useControls = (
  initialControls: Control[] = [],
): [Control[], React.Dispatch<Control>] => {
  const [controls, setControls] = useState<Control[]>(initialControls);
  return [controls, (control: Control) => setControls((c) => [...c, control])];
};

export const useStrokeRef = (): {
  strokeRef: Readonly<MutableRefObject<Point[]>>;
  appendPoint: Dispatch<Point>;
  setStroke: Dispatch<Point[]>;
} => {
  const strokeRef = useRef<Point[]>([]);
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
