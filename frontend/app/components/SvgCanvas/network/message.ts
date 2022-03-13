import { Control } from '../types';

export type ControlMessage = {
  type: 'stroke';
  data: Control;
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
  | SyncMessage
  | SyncRequestMessage
  | CompleteMessage;
