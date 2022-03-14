import { useCallback, useMemo, useState } from 'react';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { Padlock } from '~/components/baseSvg';
import { Selector } from '~/components/Selector';
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
  const [mode, setMode] = useState<number>(0);
  const onModeChange = useCallback((i: number) => setMode(i), []);
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
        mode={mode === 0 ? 'pen' : 'eraser'}
        className="h-[90vmin] w-[90vmin] mx-auto bg-white/50 rounded-xl"
      />
      <div>
        <Selector
          selectedIndex={mode}
          items={[
            {
              el: () => <span className="px-4 py-2">pen</span>,
              key: 'pen',
            },
            {
              el: () => <span className="px-4 py-2">eraser</span>,
              key: 'eraser',
            },
          ]}
          name="tool"
          onChange={onModeChange}
          className="bg-white/50"
        />
      </div>
    </div>
  );
}
