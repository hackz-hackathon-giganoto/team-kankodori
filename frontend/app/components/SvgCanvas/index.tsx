import { PointerEvent, useCallback, useEffect, useRef, VFC } from 'react';
import { v4 as uuid } from 'uuid';
import { useCanvasFrame } from '~/utils/useCanvasFrame';
import { useControls, usePointerIdRef, useStrokeRef } from './hooks';
import { NetworkController } from './network';
import { Svg } from './Svg';
import { Mode, Point } from './types';
import {
  controlsToStrokes,
  createControlFromPoints,
  drawFrame,
  getCanvasPoint,
  intersect,
  roundPoint,
} from './utils';

export type Props = {
  width?: number;
  height?: number;
  BackgroundSvg?: () => JSX.Element;
  networkController?: NetworkController;
  mode?: Mode;
};

export const SvgCanvas: VFC<Props> = ({
  width = 640,
  height = 640,
  networkController,
  BackgroundSvg,
  mode = 'pen',
}: Props) => {
  const { strokeRef, appendPoint, setStroke } = useStrokeRef();
  const canvasRef = useCanvasFrame((ctx) => drawFrame(ctx, strokeRef.current));
  const [pointerIdRef, setPointerId] = usePointerIdRef();
  const [controls, appendControl] = useControls();
  const prevErasePointRef = useRef<Point>();

  // stroke handlers
  const onStrokeBegin = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      const p = getCanvasPoint(e);
      canvasRef.current.setPointerCapture(e.pointerId);
      setPointerId(e.pointerId);
      switch (mode) {
        case 'pen':
          setStroke([p]);
          break;
        case 'eraser':
          prevErasePointRef.current = p;
          break;
      }
    },
    [canvasRef, mode, setPointerId, setStroke],
  );
  const onStrokeMove = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      if (e.pointerId !== pointerIdRef.current) return;
      const p = getCanvasPoint(e);
      switch (mode) {
        case 'pen':
          appendPoint(p);
          break;
        case 'eraser':
          if (prevErasePointRef.current !== undefined) {
            const erasingIds = controlsToStrokes(controls)
              .filter((stroke) => {
                let prev: Point | undefined;
                return stroke.points.some((cur) => {
                  if (prev === undefined) {
                    prev = cur;
                    return false;
                  }
                  return intersect(
                    [prev, cur],
                    [prevErasePointRef.current!, p],
                  );
                });
              })
              .map(({ id }) => id);
            if (erasingIds.length > 0) {
              appendControl({
                type: 'eraser',
                id: uuid(),
                erasedStrokeIds: erasingIds,
              });
            }
          }
          prevErasePointRef.current = p;
          break;
      }
    },
    [appendControl, appendPoint, canvasRef, controls, mode, pointerIdRef],
  );
  const onStrokeEnd = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      if (e.pointerId !== pointerIdRef.current) return;
      canvasRef.current.releasePointerCapture(e.pointerId);
      setPointerId(undefined);
      switch (mode) {
        case 'pen':
          const control = createControlFromPoints(
            strokeRef.current.map(roundPoint),
          );
          appendControl(control);
          networkController?.addControl(control);
          setTimeout(() => setStroke([]), 0);
          break;
        case 'eraser':
          break;
      }
    },
    [
      appendControl,
      canvasRef,
      mode,
      networkController,
      pointerIdRef,
      setPointerId,
      setStroke,
      strokeRef,
    ],
  );

  useEffect(() => {
    if (networkController === undefined) return;
    const sync = () => networkController.sync(controls);
    networkController.addEventListener('stroke', appendControl);
    networkController.addEventListener('syncrequest', sync);
    networkController.addEventListener('close', location.reload);
    networkController.addEventListener('error', location.reload);
    return () => {
      networkController.removeEventListener('stroke', appendControl);
      networkController.removeEventListener('syncrequest', sync);
      networkController.removeEventListener('close', location.reload);
      networkController.removeEventListener('error', location.reload);
    };
  }, [appendControl, networkController, controls]);

  return (
    <div style={{ position: 'relative', width: '50vmin', height: '50vmin' }}>
      <Svg
        width={width}
        height={height}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        controls={controls}
        BackgroundSvg={BackgroundSvg}
      />
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
