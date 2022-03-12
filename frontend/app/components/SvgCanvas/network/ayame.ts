import { connection, defaultOptions } from '@open-ayame/ayame-web-sdk';
import type { ConnectionOptions } from '@open-ayame/ayame-web-sdk/dist/connection/options';
import { eventmit, Eventmitter } from 'eventmit';
import type { Stroke } from '../types';
import type { NetworkController, NetworkControllerEventMap } from './interface';
import type {
  CompleteMessage,
  Message,
  StrokeMessage,
  SyncMessage,
} from './message';

export type AyameOptions = Partial<ConnectionOptions> & {
  signalingUrl: string;
  roomId: string;
  debug?: boolean;
  isRelay?: boolean;
  dcLabel?: string;
};

export class AyameController implements NetworkController {
  eventmitters: {
    [K in keyof NetworkControllerEventMap]: Eventmitter<
      NetworkControllerEventMap[K]
    >;
  } = {
    open: eventmit(),
    stroke: eventmit(),
    sync: eventmit(),
    close: eventmit(),
    error: eventmit(),
    syncrequest: eventmit(),
  };
  dataChannel: RTCDataChannel | null = null;

  constructor({
    signalingUrl,
    roomId,
    debug,
    isRelay,
    dcLabel,
    audio,
    video,
    signalingKey,
    clientId,
    iceServers,
  }: AyameOptions) {
    const conn = connection(
      signalingUrl,
      roomId,
      defaultOptions,
      debug,
      isRelay,
    );
    if (audio !== undefined) conn.options.audio = audio;
    if (video !== undefined) conn.options.video = video;
    if (signalingKey !== undefined) conn.options.signalingKey = signalingKey;
    if (clientId !== undefined) conn.options.clientId = clientId;
    if (iceServers !== undefined) conn.options.iceServers = iceServers;
    conn.on('open', async () => {
      const dc = await conn.createDataChannel(dcLabel ?? 'stroke-channel');
      if (dc !== null) this.registerDatachannel(dc);
    });
    conn.on('datachannel', (dc: RTCDataChannel) =>
      this.registerDatachannel(dc),
    );
    conn.connect(null);
  }

  addEventListener<T extends keyof NetworkControllerEventMap>(
    type: T,
    listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void {
    const eventmitter = this.eventmitters[type] as unknown as Eventmitter<
      NetworkControllerEventMap[T]
    >;
    eventmitter.on(listener);
  }
  removeEventListener<T extends keyof NetworkControllerEventMap>(
    type: T,
    listener: (e: NetworkControllerEventMap[T]) => unknown,
  ): void {
    const eventmitter = this.eventmitters[type] as unknown as Eventmitter<
      NetworkControllerEventMap[T]
    >;
    eventmitter.off(listener);
  }
  async addStroke(stroke: Stroke): Promise<void> {
    const message: StrokeMessage = {
      type: 'stroke',
      data: stroke,
    };
    this.send(message);
  }
  async sync(strokes: Stroke[]): Promise<void> {
    const message: SyncMessage = {
      type: 'sync',
      data: strokes,
    };
    this.send(message);
  }
  async complete(): Promise<void> {
    const message: CompleteMessage = { type: 'complete' };
    this.send(message);
  }

  async close(message = 'success'): Promise<void> {
    this.eventmitters.close.emit(message);
    Object.values(this.eventmitters).forEach((e) => e.offAll());
  }

  private send(message: Message) {
    this.dataChannel?.send(JSON.stringify(message));
  }

  private handleMessage(message: Message) {
    console.log(message);
    switch (message.type) {
      case 'stroke':
        this.eventmitters.stroke.emit(message.data);
        break;
      case 'sync':
        this.eventmitters.sync.emit(message.data);
        break;
      case 'syncrequest':
        this.eventmitters.syncrequest.emit(undefined);
        break;
    }
  }

  private registerDatachannel(dc: RTCDataChannel) {
    this.dataChannel = dc;
    dc.addEventListener('open', () => this.eventmitters.open.emit(undefined));
    dc.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data) as Message;
      this.handleMessage(msg);
    });
    dc.addEventListener('close', () =>
      this.close('Unexpected from datachannel'),
    );
    dc.addEventListener('error', (e) =>
      this.eventmitters.error.emit(new Error('Unexpected datachannel error')),
    );
  }
}