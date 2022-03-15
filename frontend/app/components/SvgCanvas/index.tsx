import {
  CSSProperties,
  Dispatch,
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  VFC,
} from 'react';
import { v4 as uuid } from 'uuid';
import { useCanvasFrame } from '~/utils/useCanvasFrame';
import { Ema, Padlock } from '../baseSvg';
import { usePointerIdRef, useStrokeRef } from './hooks';
import { NetworkController } from './network';
import { SyncData } from './network/interface';
import { Svg } from './Svg';
import { Background, Control, Mode, Point, StrokeColor } from './types';
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
  controls: Control[];
  appendControl: Dispatch<Control>;
  background?: Background;
  onBackgroundChange?: (bg: Background) => unknown;
  networkController?: NetworkController;
  mode?: Mode;
  className?: string;
  style?: CSSProperties;
  color?: StrokeColor;
};

export const SvgCanvas: VFC<Props> = ({
  width = 640,
  height = 640,
  controls,
  appendControl,
  networkController,
  background,
  onBackgroundChange,
  mode = 'pen',
  className = '',
  style,
  color = 'black',
}: Props) => {
  const { strokeRef, appendPoint, setStroke } = useStrokeRef();
  const canvasRef = useCanvasFrame((ctx) =>
    drawFrame(ctx, strokeRef.current, color),
  );
  const [pointerIdRef, setPointerId] = usePointerIdRef();
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
      e.preventDefault();
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
              const control: Control = {
                type: 'eraser',
                id: uuid(),
                erasedStrokeIds: erasingIds,
              };
              appendControl(control);
              networkController?.addControl(control);
            }
          }
          prevErasePointRef.current = p;
          break;
      }
    },
    [
      appendControl,
      appendPoint,
      canvasRef,
      controls,
      mode,
      networkController,
      pointerIdRef,
    ],
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
            color,
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
      color,
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
    const onSyncRequest = () =>
      networkController.sync({ controls, background });
    const onSync = (data: SyncData) => {
      if (onBackgroundChange !== undefined && data.background !== undefined)
        onBackgroundChange(data.background);
      data.controls.forEach((c) => appendControl(c));
    };
    const onOpen = () => networkController.syncRequest();
    networkController.addEventListener('open', onOpen);
    networkController.addEventListener('stroke', appendControl);
    if (onBackgroundChange !== undefined)
      networkController.addEventListener('background', onBackgroundChange);
    networkController.addEventListener('syncrequest', onSyncRequest);
    networkController.addEventListener('sync', onSync);
    // if (typeof window !== 'undefined') {
    //   networkController.addEventListener('close', window.location.reload);
    //   networkController.addEventListener('error', window.location.reload);
    // }
    return () => {
      networkController.removeEventListener('open', onOpen);
      networkController.removeEventListener('stroke', appendControl);
      if (onBackgroundChange !== undefined)
        networkController.removeEventListener('background', onBackgroundChange);

      networkController.removeEventListener('syncrequest', onSyncRequest);
      networkController.removeEventListener('sync', onSync);
      // if (typeof window !== 'undefined') {
      //   networkController.removeEventListener('close', window.location.reload);
      //   networkController.removeEventListener('error', window.location.reload);
      // }
    };
  }, [
    appendControl,
    networkController,
    controls,
    onBackgroundChange,
    background,
  ]);

  useEffect(() => {
    if (background !== undefined)
      networkController?.changeBackground(background);
  }, [background, networkController]);

  return (
    <div className={`relative ${className}`} style={style}>
      <Svg
        width={width}
        height={height}
        className="absolute w-full h-full"
        controls={controls}
        BackgroundSvg={background === 'ema' ? Ema : Padlock}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute w-full h-full touch-none"
        onPointerDown={onStrokeBegin}
        onPointerMove={onStrokeMove}
        onPointerUp={onStrokeEnd}
      />
    </div>
  );
};
