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
import toast from 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  { rel: 'stylesheet', href: toast },
  ...googleFontLinks(),
];

export const meta: MetaFunction = () => {
  const ogImage = `https://inol.cf/brand/logo.png`;
  const description =
    'PRAY WITH YOU, PRAY WITH ME. 願い事,叶えたいことをInolで祈誓(きせい)しよう!';
  return {
    title: 'Inol',
    description: description,
    'og:title': 'Inol',
    'og:description': description,
    'og:image': ogImage,
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Inol',
    'twitter:description': description,
    'twitter:image': ogImage,
  };
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
        <ToastContainer />
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
