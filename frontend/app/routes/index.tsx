import { CatchPhrase } from '~/components/CatchPhrase';
import { Circle } from '~/components/Circle';
import { Logo } from '~/components/Logo';
import { Menu } from '~/components/Menu';

export default function Index() {
  return (
    <main>
      <Circle className="fixed -top-1/4 -right-1/4 w-[110%] bg-red-600" />
      <CatchPhrase className="fixed top-0 w-full -translate-y-full rotate-90 origin-bottom-left" />
      <Menu className="fixed bottom-0 right-0" />
      <Logo link={false} className="fixed bottom-0 left-0 w-[20vw]" />
    </main>
  );
}
