import { CSSProperties, useCallback, VFC } from 'react';
import { toast } from 'react-toastify';
import icon from './ShareIcon.svg';

export type Props = {
  style?: CSSProperties;
  className?: string;
  path: string;
  title?: string;
  text?: string;
};

export const ShareButton: VFC<Props> = ({
  style,
  className,
  path,
  title = 'Inol',
  text = '',
}) => {
  const onClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    const url = `https://inol.cf${path}`;
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
  }, [path, text, title]);

  return (
    <button className={className} style={style} onClick={onClick}>
      <img src={icon} alt="共有" className="max-h-full max-w-full" />
    </button>
  );
};
