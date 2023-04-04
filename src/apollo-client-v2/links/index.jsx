import { errorLink } from './errorLink.jsx';
import { httpLink } from './httpLink.jsx';
import { from } from '@apollo/client';

export const clientLink = from([errorLink, httpLink]);
