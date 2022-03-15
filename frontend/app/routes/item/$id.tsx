import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';
import { Button } from '~/components/Button';
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
  const itemId = params.id;
  const body = await request.formData();
  const ownerString = body.get('owner')?.toString();
  const userId = body.get('userId')?.toString();
  if (ownerString == null || userId == null || itemId == null) {
    throw new Response('Unexpected error', { status: 500 });
  }
  if (ownerString === userId) await linkWallet({ userId, itemId });
  return json({});
};

export default function Inol() {
  const item = useLoaderData<Item>();
  const userId = useLiffUserId();
  return (
    <>
      <main>
        <Logo className="w-1/3" />
        <div className="flex justify-center items-center">
          <ItemDetails item={item} />
        </div>
        {item.owner === userId && (
          <Form method="post">
            <input type="hidden" name="owner" value={item.owner} />
            <input type="hidden" name="userId" value={userId} />
            <Button type="submit">Mint</Button>
          </Form>
        )}
      </main>
    </>
  );
}
