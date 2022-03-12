import { PointerEvent, useCallback, useEffect, VFC } from 'react';
import { useCanvasFrame } from '~/utils/useCanvasFrame';
import { usePointerIdRef, useStrokeRef, useStrokes } from './hooks';
import { NetworkController } from './network';
import { Svg } from './Svg';
import { drawFrame, getCanvasPoint, roundPoint } from './utils';

export type Props = {
  width?: number;
  height?: number;
  backgroundSvg?: string;
  networkController?: NetworkController;
};

export const SvgCanvas: VFC<Props> = ({
  width = 640,
  height = 640,
  networkController,
}: Props) => {
  const { strokeRef, appendPoint, setStroke } = useStrokeRef();
  const canvasRef = useCanvasFrame((ctx) => drawFrame(ctx, strokeRef.current));
  const [pointerIdRef, setPointerId] = usePointerIdRef();
  const [strokes, appendStroke] = useStrokes();

  // stroke handlers
  const onStrokeBegin = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      canvasRef.current.setPointerCapture(e.pointerId);
      setPointerId(e.pointerId);
      setStroke([getCanvasPoint(e)]);
    },
    [canvasRef, setPointerId, setStroke],
  );
  const onStrokeMove = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      if (e.pointerId !== pointerIdRef.current) return;
      appendPoint(getCanvasPoint(e));
    },
    [appendPoint, canvasRef, pointerIdRef],
  );
  const onStrokeEnd = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (canvasRef.current === null)
        throw new Error('Unexpected Error: Canvas element is null');
      if (e.pointerId !== pointerIdRef.current) return;
      const roundedStroke = strokeRef.current.map(roundPoint);
      canvasRef.current.releasePointerCapture(e.pointerId);
      setPointerId(undefined);
      appendStroke(roundedStroke);
      networkController?.addStroke(roundedStroke);
      setTimeout(() => setStroke([]), 0);
    },
    [
      appendStroke,
      canvasRef,
      networkController,
      pointerIdRef,
      setPointerId,
      setStroke,
      strokeRef,
    ],
  );

  useEffect(() => {
    if (networkController === undefined) return;
    const sync = () => networkController.sync(strokes);
    networkController.addEventListener('stroke', appendStroke);
    networkController.addEventListener('syncrequest', sync);
    networkController.addEventListener('close', location.reload);
    networkController.addEventListener('error', location.reload);
    return () => {
      networkController.removeEventListener('stroke', appendStroke);
      networkController.removeEventListener('syncrequest', sync);
      networkController.removeEventListener('close', location.reload);
      networkController.removeEventListener('error', location.reload);
    };
  }, [appendStroke, networkController, strokes]);

  return (
    <div style={{ position: 'relative', width: '50vmin', height: '50vmin' }}>
      <Svg
        width={width}
        height={height}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        strokes={strokes}
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
