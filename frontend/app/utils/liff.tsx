import { createContext, FC, useContext, useEffect, useState } from 'react';
import type { Liff } from '@line/liff';

// 初期値
// SSR を考慮すると undefined
const initialValue = {
  liff: undefined,
  liffId: '',
};

type LiffContextValue = {
  liff: Liff | undefined;
  liffId: string;
};

const LiffContext = createContext<LiffContextValue>(initialValue);

type Props = {
  liffId: string;
};

export const LiffProvider: FC<Props> = ({ children, liffId }) => {
  const [liff, setLiff] = useState<Liff | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      const liffLib = (await import('@line/liff')).default;
      await liffLib.init({ liffId }).catch((e) => {
        console.error(e);
      });
      setLiff(liffLib);
    })();
  }, [liffId, setLiff]);

  return (
    <LiffContext.Provider value={{ liff, liffId }}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiff = () => useContext(LiffContext);

export const useLiffUserId = (): string | undefined => {
  const { liff } = useLiff();
  const [userId, setUserId] = useState<string | undefined>();
  useEffect(() => {
    // ユーザーの生ID
    (async () => {
      const prof = await liff?.getProfile();
      setUserId(prof?.userId);
    })();
  }, [liff]);
  return userId;
};

export const pathToLiffUrl = (path: string, liffId: string): string =>
  new URL(`https://liff.line.me/${liffId}${path}`).href;
