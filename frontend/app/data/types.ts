export type Item = {
  id: string;
  svg_url: string;
  name: string;
  country: number;
  pref: number;
  city: number;
  owner: string;
  created_at: string;
};

export type Address = {
  country: string;
  pref: string;
  city: string;
};

export type ItemInput = {
  owner: string;
  svg: string;
};

export type MintRequestInput = {
  userId: string;
  itemId: string;
};
