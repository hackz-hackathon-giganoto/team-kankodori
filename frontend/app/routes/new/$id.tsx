import { useMemo } from 'react';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { SvgCanvas } from '~/components/SvgCanvas';
import {
  AyameController,
  DummyController,
  NetworkController,
} from '~/components/SvgCanvas/network';

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.id);
};

export default function Index() {
  const id = useLoaderData<string>();
  const controller = useMemo<NetworkController>(
    () =>
      typeof document === 'undefined'
        ? new DummyController()
        : new AyameController({
            signalingUrl: 'wss://ayame-labo.shiguredo.jp/signaling',
            roomId: `ssssota@${id}`,
            audio: { enabled: false, direction: 'recvonly' },
            video: { enabled: false, direction: 'recvonly' },
            signalingKey: 'UZx5O6SOthD4S7DETySkP748GfmwSEcrmzdKfG6Ng3LfjHSe',
            debug: true,
          }),
    [id],
  );
  return (
    <div>
      <SvgCanvas networkController={controller} />
    </div>
  );
}
