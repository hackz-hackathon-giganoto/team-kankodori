import { Stroke } from '../types';

export type NetworkControllerEventMap = {
  open: never | undefined;
  stroke: Stroke;
  sync: Stroke[];
  syncrequest: never | undefined;
  close: string;
  error: Error;
};

export interface NetworkController {
  addEventListener<T extends keyof NetworkControllerEventMap>(
    type: T,
    listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void;

  removeEventListener<T extends keyof NetworkControllerEventMap>(
    type: T,
    listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void;

  addStroke(stroke: Stroke): Promise<void>;
  sync(strokes: Stroke[]): Promise<void>;
  close(): Promise<void>;
  complete(): Promise<void>;
}
