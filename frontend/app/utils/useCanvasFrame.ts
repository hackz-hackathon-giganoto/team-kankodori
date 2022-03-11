import { RefObject, useEffect, useRef } from "react";
import { useCallbackRef } from "use-callback-ref";

/**
 * canvasに毎フレームレンダリングするカスタムフック
 * @param drawFrame 毎フレームのレンダリングコールバック
 * @returns canvas用のRefObject
 */
export const useCanvasFrame = (
  drawFrame: (ctx: CanvasRenderingContext2D) => void
): RefObject<HTMLCanvasElement> => {
  const rafId = useRef<number>();
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const canvasRef = useCallbackRef<HTMLCanvasElement>(null, (el) => {
    canvasContextRef.current = el?.getContext('2d') ?? undefined;
  });

  useEffect(() => {
    const render = () => {
      if (canvasContextRef.current !== undefined) drawFrame(canvasContextRef.current);
      rafId.current = window.requestAnimationFrame(render);
    };
    rafId.current = window.requestAnimationFrame(render);
    return () => {
      if (rafId.current !== undefined) window.cancelAnimationFrame(rafId.current);
    };
  }, [drawFrame]);

  return canvasRef;
};
