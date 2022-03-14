import { CatchPhrase } from '~/components/CatchPhrase';

export default function Index() {
  return (
    <main className="bg-gradient-to-b from-[#f3d9a0] to-[#f7db8e] min-h-screen relative max-h-screen overflow-hidden">
      <CatchPhrase className="absolute top-0 w-full -translate-y-full rotate-90 origin-bottom-left" />
    </main>
  );
}
