import { CSSProperties, VFC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
};

export const CatchPhrase: VFC<Props> = ({ className = 'p-0', style = {} }) => {
  return (
    <p className={className} style={style}>
      <img
        className="h-full w-full"
        src="/assets/playwith.svg"
        alt="PLAY WITH YOU"
      />
    </p>
  );
};
