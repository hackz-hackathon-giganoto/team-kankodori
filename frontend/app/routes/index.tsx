import { useEffect } from 'react';
import { CatchPhrase } from '~/components/CatchPhrase';
import { Circle } from '~/components/Circle';
import { Menu } from '~/components/Menu';
import { useLiffUserId } from '~/utils/liff';

export default function Index() {
  const userId = useLiffUserId();
  useEffect(() => {
    if (userId !== undefined) {
      alert(userId);
    }
  }, [userId]);

  return (
    <main>
      <Circle className="fixed -top-1/4 -right-1/4 w-[110%] bg-red-600" />
      <CatchPhrase className="fixed top-0 w-full -translate-y-full rotate-90 origin-bottom-left" />
      <Menu className="fixed bottom-0 right-0" />
    </main>
  );
}
