import { Control } from '../types';

export type NetworkControllerEventMap = {
  open: never | undefined;
  stroke: Control;
  background: string;
  sync: Control[];
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

  addControl(control: Control): Promise<void>;
  sync(controls: Control[]): Promise<void>;
  syncRequest(): Promise<void>;
  changeBackground(background: string): Promise<void>;
  close(): Promise<void>;
  complete(): Promise<void>;
}
