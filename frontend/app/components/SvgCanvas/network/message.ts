import { Control } from '../types';

export type ControlMessage = {
  type: 'stroke';
  data: Control;
};

export type BackgroundMessage = {
  type: 'background';
  data: string;
};

export type SyncMessage = {
  type: 'sync';
  data: Control[];
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
