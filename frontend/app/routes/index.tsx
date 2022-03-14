import { CatchPhrase } from '~/components/CatchPhrase';
import { Hinomaru } from '~/components/Hinomaru';
import { Menu } from '~/components/Menu';

export default function Index() {
  return (
    <>
      <Hinomaru className="absolute -top-1/4 -right-1/4 w-[110%]" />
      <CatchPhrase className="absolute top-0 w-full -translate-y-full rotate-90 origin-bottom-left" />
      <Menu className="absolute bottom-0 right-0" />
    </>
  );
}
