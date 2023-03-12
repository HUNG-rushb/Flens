import { from } from '@apollo/client'

import { errorLink } from './errorLink'
import { httpLink } from './httpLink'

export const clientLink = from([errorLink, httpLink])
