import { renderToStaticMarkup } from 'react-dom/server';
import { Svg } from '~/components/SvgCanvas/Svg';
import { Control } from '~/components/SvgCanvas/types';

const width = 640;
const height = 640;

export const renderSvgComponent = (
  controls: Control[],
  BackgroundSvg: (() => JSX.Element) | undefined,
) => renderToStaticMarkup(Svg({ controls, width, height, BackgroundSvg }));
