import { CSSProperties, VFC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
  items: {
    content: string;
    key: string;
  }[];
  selectedIndex: number;
  name: string;
  onChange?: (selectedIndex: number) => void;
};

export const Selector: VFC<Props> = ({
  items,
  selectedIndex,
  name,
  onChange,
  style,
  className,
}) => (
  <div className={`inline-flex rounded-lg ${className}`} style={style}>
    {items.map(({ content, key }, i) => (
      <div
        className={`
          ${i === 0 ? 'rounded-l-lg' : ''}
          ${i === items.length - 1 ? 'rounded-r-lg' : ''}
          ${
            selectedIndex === i
              ? 'text-gray-800 bg-white'
              : 'text-white bg-gray-800/10'
          }
          border-4
          border-white
          px-2
          cursor-pointer
        `}
        key={key}
      >
        <label className="cursor-pointer">
          <input
            type="radio"
            name={name}
            className="hidden"
            checked={selectedIndex === i}
            onChange={(e) => e.target.checked && onChange?.(i)}
          />
          {content}
        </label>
      </div>
    ))}
  </div>
);
