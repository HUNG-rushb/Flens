import { InMemoryCache } from '@apollo/client'

import { Common } from './common/type-policy'

export const cache = new InMemoryCache({
  typePolicies: {
    Common,
  },
})
