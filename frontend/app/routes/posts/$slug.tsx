import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.slug);
};

export default function PostSlug() {
  const slug = useLoaderData();
  return (
    <main>
      <h1>投げられたナメクジ: {slug}</h1>
    </main>
  );
}
