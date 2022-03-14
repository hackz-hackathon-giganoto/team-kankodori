import { CatchPhrase } from '~/components/CatchPhrase';
import { Hinomaru } from '~/components/Hinomaru';
import { Menu } from '~/components/Menu';

export default function Index() {
  return (
    <main className="bg-gradient-to-b from-[#fae5b9] to-[#f7db8e] relative min-h-screen max-h-screen overflow-hidden">
      <Hinomaru className="absolute -top-1/4 -right-1/4 w-[110%]" />
      <CatchPhrase className="absolute top-0 w-full -translate-y-full rotate-90 origin-bottom-left" />
      <Menu className="absolute bottom-0 right-0" />
    </main>
  );
}
