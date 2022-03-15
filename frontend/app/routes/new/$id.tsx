import { useEffect, useMemo, useState } from 'react';
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
import { useLiffUserId } from '~/utils/liff';

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.id);
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const backgroundString = body.get('background')?.toString();
  const controlsString = body.get('strokes')?.toString();
  const owner = body.get('owner')?.toString();
  if (controlsString == null || backgroundString == null || owner == null)
    throw new Response('Unexpected error', { status: 500 });
  const controls = JSON.parse(controlsString) as Control[];
  const svg = renderSvgComponent(
    controls,
    backgroundString === 'ema' ? Ema : Padlock,
  );

  const item = await uplodeItem({ owner, svg });
  return redirect(`/item/${item.name}`);
};

export const meta: MetaFunction = () => {
  const description = 'PRAY WITH YOU. inolで一緒に祈誓しませんか？';
  return {
    'og:description': description,
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
  const userId = useLiffUserId();
  return (
    <>
      <div>
        <div>
          <Selector
            className="m-2"
            selectedIndex={mode}
            items={[
              { content: 'ペン', key: 'pen' },
              { content: '消しゴム', key: 'eraser' },
            ]}
            name="tool"
            onChange={setMode}
          />
          <Selector
            className="m-2"
            selectedIndex={background}
            items={[
              { content: '絵馬', key: 'ema' },
              { content: '南京錠', key: 'padlock' },
            ]}
            name="background"
            onChange={setBackground}
          />
          <Selector
            className="m-2"
            selectedIndex={color}
            items={[
              { content: '黒', key: 'black' },
              { content: '赤', key: 'red' },
              { content: '青', key: 'blue' },
            ]}
            name="background"
            onChange={setColor}
          />
          <Button
            className="m-2"
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
          <Form method="post" className="inline">
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
            <input
              type="hidden"
              name="owner"
              value={userId ?? 'anonymous_user'}
            />
            <Button type="submit" className="m-2 bg-red-400">
              完了
            </Button>
          </Form>
        </div>
        <SvgCanvas
          controls={controls}
          appendControl={appendControl}
          networkController={controller}
          background={background === 0 ? 'ema' : 'padlock'}
          onBackgroundChange={(bg) => setBackground(bg === 'ema' ? 0 : 1)}
          mode={mode === 0 ? 'pen' : 'eraser'}
          className="h-[90vmin] w-[90vmin] mx-auto bg-white/50 rounded-xl select-none m-4"
          color={color === 0 ? 'black' : color === 1 ? 'red' : 'blue'}
        />
      </div>
      {(transition.state === 'submitting' ||
        transition.state === 'loading') && (
        <Overlay
          className={`
            ${transition.state === 'loading' ? 'opacity-100' : 'opacity-50'}
            transition-opacity
          `}
        />
      )}
    </>
  );
}
