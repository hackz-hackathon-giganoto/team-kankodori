import { CSSProperties, useCallback, VFC } from 'react';
import { toast } from 'react-toastify';
import { pathToLiffUrl } from '~/utils/liff';
import icon from './ShareIcon.svg';

export type Props = {
  style?: CSSProperties;
  className?: string;
  liffId: string;
  path: string;
  title?: string;
  text?: string;
};

export const ShareButton: VFC<Props> = ({
  style,
  className,
  liffId,
  path,
  title = 'Inol',
  text = '',
}) => {
  const onClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    const url = pathToLiffUrl(path, liffId);
    if (typeof window.navigator.share === 'function') {
      window.navigator.share({
        title,
        text,
        url,
      });
    } else {
      window.navigator.clipboard
        .writeText(url)
        .then(() => toast.info('Copy URL into clipboard!'));
    }
  }, [liffId, path, text, title]);

  return (
    <button className={className} style={style} onClick={onClick}>
      <img src={icon} alt="共有" className="max-h-full max-w-full" />
    </button>
  );
};
