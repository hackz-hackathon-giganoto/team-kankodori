import { LoaderFunction, redirect } from 'remix';
import { v4 as uuid } from 'uuid';

export const loader: LoaderFunction = () => redirect(`/new/${uuid()}`, 303);
