import { Resolver } from '@apollo/client'

import { LocalCacheId, LocalCacheName } from 'apollo-client/cache'
import { ResolverContext } from 'apollo-client/types'

export const updateIsLoggedIn: Resolver = (
  rootr,
  args,
  context: ResolverContext,
  info,
) => {
  const { cache } = context
  const { value } = args

  cache.modify({
    id: cache.identify({
      __typename: LocalCacheName.COMMON,
      id: LocalCacheId.COMMON,
    }),
    fields: {
      isLoggedIn: () => value,
    },
  })
}
