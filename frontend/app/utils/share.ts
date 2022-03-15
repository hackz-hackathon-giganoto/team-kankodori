import type { Liff } from '@line/liff';

export type ShareContent = {
  url: string;
  text: string;
  title: string;
};

export type ShareType = 'liff' | 'share' | 'clipboard';

export const share = async (
  content: ShareContent,
  liff?: Liff,
): Promise<ShareType> => {
  if (typeof window === 'undefined') throw new Error('Invalid Environment');
  if (liff?.isApiAvailable('shareTargetPicker')) {
    return liff
      .shareTargetPicker([
        {
          type: 'text',
          text: `${content.text}\n\n${content.url}`,
        },
      ])
      .then(() => 'liff');
  }
  if (typeof window.navigator.share === 'function') {
    return window.navigator.share(content).then(() => 'share');
  }
  return window.navigator.clipboard
    .writeText(`${content.text}\n\n${content.url}`)
    .then(() => 'clipboard');
};
