export type Post = {
  slug: string;
  title: string;
};

export function getPosts() {
  const posts: Post[] = [
    {
      slug: "なめくじ1",
      title: "タイトル1",
    },
    {
      slug: "なめくじ2",
      title: "タイトル2",
    },
    {
      slug: "なめくじ3",
      title: "タイトル3",
    },
  ];
  return posts;
}
