import { useMemo, useState } from 'react';
import { json, LoaderFunction, useLoaderData, useLocation } from 'remix';
import { Ema, Padlock } from '~/components/baseSvg';
import { Button } from '~/components/Button';
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
  const [background, setBackground] = useState<number>(0);
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
        BackgroundSvg={background === 0 ? Ema : Padlock}
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
          onChange={setMode}
          className="bg-white/50"
        />
        <Selector
          selectedIndex={background}
          items={[
            {
              el: () => <span className="px-4 py-2">絵馬</span>,
              key: 'ema',
            },
            {
              el: () => <span className="px-4 py-2">南京錠</span>,
              key: 'padlock',
            },
          ]}
          name="background"
          onChange={setBackground}
          className="bg-white/50"
        />
        <Button
          onClick={() =>
            window.navigator.share({
              url: window.location.href,
              text: '一緒に祈りましょう！',
              title: 'PRAY WITH YOU - Inol',
            })
          }
        >
          一緒に描く
        </Button>
      </div>
    </div>
  );
}
