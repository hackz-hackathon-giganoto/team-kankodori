import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import { Button } from '~/components/Button';
import { ItemDetails } from '~/components/ItemDetails';
import { Logo } from '~/components/Logo';
import { Overlay } from '~/components/Overlay';
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
  const description = 'PRAY WITH YOU, PRAY WITH ME. inolを捧げました';
  return {
    description,
    title: 'inolを捧げました',
    'og:title': 'inol',
    'og:description': description,
    'og:image': ogImage,
    'twitter:description': description,
    'twitter:image': ogImage,
  };
};

type MintResult = {
  url: string;
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
  const result: MintResult = {
    url: 'https://wallet.bitmax.me/items/',
  };
  return json(result);
};

export default function Inol() {
  const item = useLoaderData<Item>();
  const res = useActionData<MintResult | undefined>();
  const transition = useTransition();
  const userId = useLiffUserId();
  return (
    <>
      <main>
        <Logo className="w-1/3" />
        <div className="flex justify-center items-center">
          <ItemDetails item={item} />
        </div>
        {transition.state === 'idle' ? (
          res === undefined ? (
            item.owner === userId && (
              <Form method="post">
                <input type="hidden" name="owner" value={item.owner} />
                <input type="hidden" name="userId" value={userId} />
                <Button type="submit">Mint</Button>
              </Form>
            )
          ) : (
            <p>
              <a href={res.url}>NFTを見るならこちら</a>
            </p>
          )
        ) : (
          <Overlay className="opacity-50" />
        )}
      </main>
    </>
  );
}
