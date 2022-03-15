import { ButtonHTMLAttributes, FC } from 'react';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => (
  <button
    className={`rounded-lg px-2 border-4 border-white text-white bg-gray-800/10 active:bg-white active:text-black ${className}`}
    {...props}
  >
    {children}
  </button>
);
