import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import type { MetaFunction } from 'remix';
import tailwind from '~/styles/generated.css';
import { googleFontLinks } from '~/utils/googleFontLinks';
import liff from '@line/liff';

liff.init({
  liffId: '1656968667-pzoJ0Do7',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  ...googleFontLinks(),
];

export const meta: MetaFunction = () => {
  return { title: 'Inol' };
};

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-gradient-to-b from-[#fae5b9] to-[#f7db8e] h-screen max-h-screen overflow-hidden">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <h1>{error.name}</h1>
      <pre>{error.message}</pre>
    </div>
  );
};
