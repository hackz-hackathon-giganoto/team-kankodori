import { Control, Stroke } from '../types';
import { NetworkController, NetworkControllerEventMap } from './interface';

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
  async sync(_strokes: Stroke[]): Promise<void> {
    noop();
  }
  async close(): Promise<void> {
    noop();
  }
  async complete(): Promise<void> {
    noop();
  }
}
