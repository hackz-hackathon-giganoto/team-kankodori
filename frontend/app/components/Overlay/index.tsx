import seikaiha from './seikaiha.svg';

export const Overlay = () => (
  <div
    className="w-screen h-screen bg-repeat fixed bg-slate-400"
    style={{ backgroundImage: `url(${seikaiha})` }}
  />
);
