import { Control } from '../types';

export type SyncData = {
  controls: Control[];
  background: string;
};

export type NetworkControllerEventMap = {
  open: never | undefined;
  stroke: Control;
  background: string;
  sync: SyncData;
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
  sync(data: SyncData): Promise<void>;
  syncRequest(): Promise<void>;
  changeBackground(background: string): Promise<void>;
  close(): Promise<void>;
  complete(): Promise<void>;
}
