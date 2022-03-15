import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
} from 'remix';
import { ItemDetails } from '~/components/ItemDetails';
import { Logo } from '~/components/Logo';
import { getItemById } from '~/data/getItemById';
import { linkWallet } from '~/data/linkWallret';
import { Item } from '~/data/types';
import { useLiffUserId } from '~/utils/liff';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (id === undefined) throw new Error('Unexpected error (id=null)');
  try {
    const item = await getItemById(id);
    return json(item);
  } catch (e) {
    console.error(e);
    throw new Response('loader error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

export const meta: MetaFunction = ({ data }) => {
  const ogImage = `https://inol.cf/png/${data.id}`;
  const description =
    'PRAY WITH YOU, PRAY WITH ME. インターネット神社inolで祈誓しました';
  return {
    description,
    'og:title': 'inolで祈誓しました',
    'og:description': description,
    'og:image': ogImage,
    'twitter:description': description,
    'twitter:image': ogImage,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const item_id = params.id;
  const body = await request.formData();
  const ownerString = body.get('owner')?.toString();
  const user_id = body.get('userId')?.toString();
  if (ownerString == null || user_id == null || item_id == null) {
    throw new Response('Unexpected error', { status: 500 });
  }
  if (ownerString === user_id) {
    linkWallet({ user_id, item_id });
  }
  return redirect(`/item/${item_id}`);
};

export default function Inol() {
  const item = useLoaderData<Item>();
  const userId = useLiffUserId();
  return (
    <>
      <Logo className="w-1/3" />
      <main className="flex justify-center items-center">
        <ItemDetails item={item} />
      </main>
      <Form method="post">
        <input type="hidden" name="owner" value={item.owner} />
        <input type="hidden" name="userId" value={userId} />
        <input type="submit" value="NFTを作成する" />
      </Form>
    </>
  );
}
