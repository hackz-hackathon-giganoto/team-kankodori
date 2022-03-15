import liffLib from '@line/liff';
import { createContext, FC, useContext, useEffect, useState } from 'react';

export type Liff = typeof liffLib;

// 初期値
// SSR を考慮すると undefined
const initialValue = undefined;
const LiffContext = createContext<Liff | undefined>(initialValue);

type Props = {
  liffId: string;
};

export const LiffProvider: FC<Props> = ({ children, liffId }) => {
  const [liff, setLiff] = useState<Liff | undefined>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      await liffLib.init({ liffId }).catch((e) => {
        console.error(e);
      });
      setLiff(liffLib);
    })();
  }, [setLiff]);

  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>;
};

export const useLiff = () => useContext(LiffContext);
