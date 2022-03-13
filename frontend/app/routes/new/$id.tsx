import { useMemo, useState } from 'react';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { Padlock } from '~/components/baseSvg';
import { SvgCanvas } from '~/components/SvgCanvas';
import {
  AyameController,
  DummyController,
  NetworkController,
} from '~/components/SvgCanvas/network';
import { Mode } from '~/components/SvgCanvas/types';

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.id);
};

export default function Index() {
  const [mode, setMode] = useState<Mode>('pen');
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
      <SvgCanvas
        networkController={controller}
        BackgroundSvg={Padlock}
        mode={mode}
      />
      <input
        type="checkbox"
        checked={mode === 'pen'}
        onChange={(e) => setMode(e.target.checked ? 'pen' : 'eraser')}
      />
    </div>
  );
}
