import { Control } from '../types';
import { SyncData } from './interface';

export type ControlMessage = {
  type: 'control';
  control: Control;
};

export type BackgroundMessage = {
  type: 'background';
  background: string;
};

export type SyncMessage = {
  type: 'sync';
  data: SyncData;
};

export type SyncRequestMessage = {
  type: 'syncrequest';
};

export type CompleteMessage = {
  type: 'complete';
};

export type Message =
  | ControlMessage
  | BackgroundMessage
  | SyncMessage
  | SyncRequestMessage
  | CompleteMessage;
