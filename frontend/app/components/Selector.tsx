import { CSSProperties, VFC } from 'react';

export type Props = {
  className?: string;
  style?: CSSProperties;
  items: {
    el: (props: { selected: boolean }) => JSX.Element;
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
    {items.map(({ el, key }, i) => (
      <div
        className={`
          ${i === 0 ? 'rounded-l-lg' : ''}
          ${i === items.length - 1 ? 'rounded-r-lg' : ''}
          ${selectedIndex === i ? 'border-indigo-500' : 'border-slate-400'}
          border-2
        `}
        key={key}
      >
        <label>
          <input
            type="radio"
            name={name}
            className="hidden"
            checked={selectedIndex === i}
            onChange={(e) => e.target.checked && onChange?.(i)}
          />
          {el({ selected: selectedIndex === i })}
        </label>
      </div>
    ))}
  </div>
);
