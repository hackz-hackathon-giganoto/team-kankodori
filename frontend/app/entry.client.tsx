import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import { LiffProvider } from './utils/liff';

hydrate(
  <LiffProvider liffId="1656968667-pzoJ0Do7">
    <RemixBrowser />
  </LiffProvider>,
  document,
);
