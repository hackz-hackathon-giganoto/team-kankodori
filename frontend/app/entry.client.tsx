import liff from '@line/liff';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

liff
  .init({ liffId: '1656968667-pzoJ0Do7' || '' })
  .then(() => {
    hydrate(<RemixBrowser />, document);
  })
  .catch((e) => {
    console.error(e);
  });
