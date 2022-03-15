import { useMemo, useState } from 'react';
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useTransition,
} from 'remix';
import { Ema, Padlock } from '~/components/baseSvg';
import { Button } from '~/components/Button';
import { Overlay } from '~/components/Overlay';
import { Selector } from '~/components/Selector';
import { SvgCanvas } from '~/components/SvgCanvas';
import { useControls } from '~/components/SvgCanvas/hooks';
import {
  AyameController,
  NetworkController,
} from '~/components/SvgCanvas/network';
import { Control } from '~/components/SvgCanvas/types';
import { renderSvgComponent } from '~/data/renderSvgComponent.server';
import { uplodeItem } from '~/data/uplodeItem';

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.id);
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const backgroundString = body.get('background')?.toString();
  const controlsString = body.get('strokes')?.toString();
  if (controlsString == null || backgroundString == null)
    throw new Response('Unexpected error', { status: 500 });
  const controls = JSON.parse(controlsString) as Control[];
  const svg = renderSvgComponent(
    controls,
    backgroundString === 'ema' ? Ema : Padlock,
  );

  const item = await uplodeItem({ owner: 'test-user', svg });
  return redirect(`/item/${item.name}`);
};

export const meta: MetaFunction = () => {
  const description = 'PRAY WITH YOU. inolで一緒に誓いを立てませんか？';
  return {
    title: 'inolで一緒に祈誓しませんか？',
    description,
  };
};

export default function Index() {
  const transition = useTransition();
  const [controls, appendControl] = useControls();
  const [mode, setMode] = useState<number>(0);
  const [color, setColor] = useState<number>(0);
  const [background, setBackground] = useState<number>(0);
  const id = useLoaderData<string>();
  const controller = useMemo<NetworkController | undefined>(
    () =>
      typeof document === 'undefined'
        ? undefined
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
    <>
      <div>
        <SvgCanvas
          controls={controls}
          appendControl={appendControl}
          networkController={controller}
          background={background === 0 ? 'ema' : 'padlock'}
          onBackgroundChange={(bg) => setBackground(bg === 'ema' ? 0 : 1)}
          mode={mode === 0 ? 'pen' : 'eraser'}
          className="h-[90vmin] w-[90vmin] mx-auto bg-white/50 rounded-xl select-none"
          color={color === 0 ? 'black' : color === 1 ? 'red' : 'blue'}
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
          <Selector
            selectedIndex={color}
            items={[
              {
                el: () => <span className="px-4 py-2">黒</span>,
                key: 'black',
              },
              {
                el: () => <span className="px-4 py-2">赤</span>,
                key: 'red',
              },
              {
                el: () => <span className="px-4 py-2">青</span>,
                key: 'blue',
              },
            ]}
            name="background"
            onChange={setColor}
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
            className="bg-white/50"
          >
            一緒に描く
          </Button>
        </div>
        <Form method="post">
          <input
            type="hidden"
            name="background"
            value={background === 0 ? 'ema' : 'padlock'}
          />
          <input
            type="hidden"
            name="strokes"
            value={JSON.stringify(controls)}
          />
          <input type="submit" value="完了" />
        </Form>
      </div>
      {(transition.state === 'submitting' ||
        transition.state === 'loading') && (
        <Overlay
          className={`${
            transition.state === 'loading' ? 'opacity-100' : 'opacity-50'
          } transition-opacity`}
        />
      )}
    </>
  );
}
