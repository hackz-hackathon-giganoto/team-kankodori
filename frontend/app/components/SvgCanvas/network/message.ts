import { Stroke } from '../types';

export type StrokeMessage = {
  type: 'stroke';
  data: Stroke;
};

export type SyncMessage = {
  type: 'sync';
  data: Stroke[];
};

export type SyncRequestMessage = {
  type: 'syncrequest';
};

export type CompleteMessage = {
  type: 'complete';
};

export type Message =
  | StrokeMessage
  | SyncMessage
  | SyncRequestMessage
  | CompleteMessage;
