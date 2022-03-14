export type Item = {
  id: string;
  svg_url: string;
  name: string;
  country: number;
  pref: number;
  city: number;
  owner: string;
};

export type Address = {
  country: string;
  pref: string;
  city: string;
};
