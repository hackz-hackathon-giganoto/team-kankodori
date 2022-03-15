import { Control } from '../types';
import {
  NetworkController,
  NetworkControllerEventMap,
  SyncData,
} from './interface';

const noop = () => {};

export class DummyController implements NetworkController {
  addEventListener<T extends keyof NetworkControllerEventMap>(
    _type: T,
    _listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void {
    noop();
  }
  removeEventListener<T extends keyof NetworkControllerEventMap>(
    _type: T,
    _listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void {
    noop();
  }
  async addControl(control: Control): Promise<void> {
    noop();
  }
  async changeBackground(background: string): Promise<void> {
    noop();
  }
  async sync(data: SyncData): Promise<void> {
    noop();
  }
  async syncRequest(): Promise<void> {
    noop();
  }
  async close(): Promise<void> {
    noop();
  }
  async complete(): Promise<void> {
    noop();
  }
}
